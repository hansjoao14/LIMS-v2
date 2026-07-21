import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, firstValueFrom, takeUntil } from 'rxjs';

import { PageHeader } from '../../../shared/components/page-header/page-header';
import { AlertService } from '../../../services/alert.service';
import { ToastrAlertService } from '../../../services/toastr.service';
import { AuthService } from '../../auth/service/auth-service';
import { PeriodoService } from '../../../services/solicitudes/solicitud-trabajo/periodo.service';
import {
  CrearPlanMuestreoConDetallePayload,
  PlanMuestreoService,
} from '../../../services/solicitudes/plan-muestreo/plan-muestreo.service';
import { PlanMuestreoGrupo, construirGrupos } from '../model/plan-muestreo-form.model';
import { camposDe, generarControles } from '../model/plan-muestreo-form.utils';
import { PlanMuestreoStore } from '../model/plan-muestreo.store';
import { PlanMuestreoGrupoComponent } from '../grupo/plan-muestreo-grupo';

@Component({
  selector: 'app-plan-muestreo-paso3',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, PageHeader, PlanMuestreoGrupoComponent],
  templateUrl: './plan-muestreo-paso3.html',
  styleUrl: '../plan-muestreo.css',
})
export class PlanMuestreoPaso3 implements OnInit, OnDestroy {
  // Preguntas del formulario dinámico que corresponden a este paso.
  readonly SECCION = 3;

  form: FormGroup;
  grupos: PlanMuestreoGrupo[] = [];
  loading = true;
  saving = false;

  // Contenido fijo que no forma parte del formulario dinámico.
  readonly procedimiento = 'PEE/IAMQ/42';
  notas = [
    'Nota 1: El muestreador debe lavar los frascos de muestra con el agua del sitio de muestreo antes de recolectar la muestra.',
    'Nota 2: En caso de que el punto de muestreo se encuentre en una zona de difícil acceso, se debe notificar al responsable del área.',
  ];

  private readonly destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private store: PlanMuestreoStore,
    private planMuestreoService: PlanMuestreoService,
    private authService: AuthService,
    private periodoService: PeriodoService,
    private toastrAlert: ToastrAlertService,
    private alertService: AlertService,
  ) {
    this.form = this.fb.group({});
  }

  ngOnInit(): void {
    this.store
      .getFormulario()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (formulario) => {
          this.grupos = construirGrupos(formulario.preguntas ?? [], this.SECCION);
          generarControles(this.form, this.grupos);
          // Repuebla lo que el usuario ya había respondido en este paso.
          this.form.patchValue(this.store.respuestasDe(this.SECCION));
          this.loading = false;
        },
        error: () => {
          this.loading = false;
          this.alertService.error('No se pudo cargar el formulario dinámico');
        },
      });
  }

  ngOnDestroy(): void {
    this.persistir();
    this.destroy$.next();
    this.destroy$.complete();
  }

  // Deja las respuestas de este paso en el store, que acumula las de todos.
  private persistir(): void {
    if (this.loading) return;
    this.store.guardarSeccion(this.SECCION, camposDe(this.grupos), this.form.getRawValue());
  }

  regresar(): void {
    this.router.navigate(['/plan-muestreo/paso2']);
  }

  // Último paso: se envían de una sola vez las respuestas acumuladas en los
  // pasos anteriores, con el mismo formato que la orden de trabajo in situ.
  async guardar(): Promise<void> {
    this.persistir();

    const contexto = this.store.contexto;
    if (!contexto?.solicitudId) {
      this.toastrAlert.showWarning(
        'Seleccione una solicitud de trabajo en el paso 1 antes de guardar.',
        'Requerido',
      );
      return;
    }

    const faltantes = this.store.camposFaltantes();
    if (faltantes.length > 0) {
      this.form.markAllAsTouched();
      this.toastrAlert.showWarning(
        'Complete todos los campos obligatorios antes de guardar.',
        'Requerido',
      );
      return;
    }

    if (!contexto.tipoAguaId) {
      this.toastrAlert.showWarning(
        'No se pudo determinar el tipo de matriz de la solicitud seleccionada.',
        'Requerido',
      );
      return;
    }

    this.saving = true;
    const { id: userId } = this.authService.currentUser();

    try {
      const ahora = new Date();
      const ejercicio = await this.periodoService.getEjercicioByAnio(ahora.getFullYear());
      if (!ejercicio) throw new Error(`No hay ejercicio activo para ${ahora.getFullYear()}`);

      const periodo = await this.periodoService.getPeriodoByEjercicioAndMes(
        ejercicio.id,
        ahora.getMonth() + 1,
      );
      if (!periodo) throw new Error(`No hay periodo activo para el mes ${ahora.getMonth() + 1}`);

      //TODO: Cambiar el entidad_id
      const payload: CrearPlanMuestreoConDetallePayload = {
        planMuestreo: {
          solicitud_id: contexto.solicitudId,
          usuario_id: userId,
          entidad_id: 'F9687983-F6CF-4706-9004-A1B793E3A987',
          ctambiente_id: contexto.tipoAguaId,
          periodo_id: periodo.id,
          secuencial_id: null,
          num_secuencial: null,
          ctestado_id: 2,
          estado: true,
          ctformulario_id: contexto.ctformularioId,
        },
        planMuestreoDetalle: contexto.ensayos,
        valorMuestreo: this.store.construirValorMuestreo(),
      };

      await firstValueFrom(this.planMuestreoService.crearPlanMuestreoConDetalle(payload));

      this.toastrAlert.showSuccess('El plan de muestreo ha sido guardado.', '¡Guardado!');
      // Se limpia después de navegar: al destruirse este paso vuelve a
      // persistir sus respuestas en el store.
      await this.router.navigate(['/plan-muestreo']);
      this.store.limpiar();
    } catch {
      this.toastrAlert.showError('No se pudo guardar el plan de muestreo.', 'Error');
    } finally {
      this.saving = false;
    }
  }
}
