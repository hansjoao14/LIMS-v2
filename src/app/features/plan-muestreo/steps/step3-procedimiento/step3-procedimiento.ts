import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, firstValueFrom, takeUntil } from 'rxjs';

import { PageHeader } from '../../../../shared/components/page-header/page-header';
import { LoadingComponent } from '../../../../shared/components/loading/loading';
import { AlertService } from '../../../../services/alert.service';
import { ToastrAlertService } from '../../../../services/toastr.service';
import { AuthService } from '../../../auth/service/auth-service';
import { PeriodoService } from '../../../../services/solicitudes/solicitud-trabajo/periodo.service';
import { PlanMuestreoService } from '../../../../services/solicitudes/plan-muestreo/plan-muestreo.service';
import { CrearPlanMuestreoConDetallePayload } from '../../../../interfaces/solicitudes/plan-muestreo/plan-muestreo.interface';
import {
  DynamicFormGroupComponent,
  DynamicGroup,
  aplicarDependencias,
  camposDe,
  construirGrupos,
  generarControles,
} from '../../../../shared/dynamic-form';
import {
  FILAS_TEXTAREA,
  LAYOUTS_NUMERO_VACIO,
  PLAN_MUESTREO_FORM_CONFIG,
  procedimientoDeMuestreo,
  tipoRecipiente,
} from '../../model/plan-muestreo-form.model';
import { ReportFormulario } from '../../../../interfaces/admin-formularios/report-formulario.interface';
import { PlanMuestreoStore } from '../../model/plan-muestreo.store';
import { TecnicoPlanMuestreo } from '../../../../interfaces/solicitudes/plan-muestreo/tecnico-plan-muestreo.interface';

@Component({
  selector: 'app-plan-muestreo-step3',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    PageHeader,
    LoadingComponent,
    DynamicFormGroupComponent,
  ],
  templateUrl: './step3-procedimiento.html',
  styleUrl: '../../plan-muestreo.css',
})
export class Step3ProcedimientoComponent implements OnInit, OnDestroy {
  // Posición en el asistente, para el stepper de la cabecera.
  readonly PASO = 3;
  readonly TOTAL_PASOS = 3;

  readonly FILAS_TEXTAREA = FILAS_TEXTAREA;
  readonly tipoRecipiente = tipoRecipiente;

  // Preguntas del formulario dinámico que corresponden a este paso.
  readonly SECCION = 3;

  form: FormGroup;
  grupos: DynamicGroup[] = [];
  formulario: ReportFormulario | null = null;
  fechaEmision: Date | null = null;
  loading = true;
  saving = false;

  /**
   * Procedimiento del recurso hídrico: depende del tipo de matriz que fijó el
   * paso 1 (Aguas Superficiales → PEE/IAMQ/42, Aguas Residuales → PG/IAMQ/08).
   */
  get procedimiento(): string {
    return procedimientoDeMuestreo(this.store.contexto?.tipoAguaId);
  }

  // ── Modal del técnico responsable ────────────────────────────────────────
  showTecnicoModal = false;
  tecnicoSeleccionado: TecnicoPlanMuestreo | null = null;
  busquedaTecnico = '';

  // TODO(datos): listado de maqueta. El backend todavía no expone un endpoint
  // de técnicos; hoy solo llega embebido en el formulario dinámico
  // (`listado_empleado`).
  readonly tecnicos: TecnicoPlanMuestreo[] = [
    { id: '1', nombre: 'Juan Ledesma', cargo: 'Técnico/a de Muestreo en Campo' },
    { id: '2', nombre: 'José Luis Montenegro', cargo: 'Técnico/a de Muestreo en Campo' },
    { id: '3', nombre: 'Karen Guerron', cargo: 'Analista de Laboratorio' },
    { id: '4', nombre: 'Jorge Diaz', cargo: 'Técnico/a de Muestreo en Campo' },
    { id: '5', nombre: 'María Fernanda Salazar', cargo: 'Analista de Calidad' },
  ];

  get tecnicosFiltrados(): TecnicoPlanMuestreo[] {
    const q = this.busquedaTecnico.trim().toLowerCase();
    if (!q) return this.tecnicos;
    return this.tecnicos.filter(
      (t) => t.nombre.toLowerCase().includes(q) || t.cargo.toLowerCase().includes(q),
    );
  }

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
      .getMetaFormulario()
      .pipe(takeUntil(this.destroy$))
      .subscribe((formulario) => {
        this.formulario = formulario;
        if (formulario?.fecha_emision) {
          this.fechaEmision = new Date(Number(formulario.fecha_emision));
        }
      });

    this.store
      .getFormulario()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (formulario) => {
          this.grupos = construirGrupos(
            formulario.preguntas ?? [],
            this.SECCION,
            PLAN_MUESTREO_FORM_CONFIG,
          );
          generarControles(this.form, this.grupos, {
            numeroVacioEnLayouts: LAYOUTS_NUMERO_VACIO,
            togglesActivosPorDefecto: true,
          });
          // Repuebla lo que el usuario ya había respondido en este paso.
          this.form.patchValue(this.store.respuestasDe(this.SECCION));
          // Muestra/oculta los campos dependientes según sus campos padre.
          aplicarDependencias(this.form, this.grupos, this.destroy$);
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

  // ── Selección del técnico ────────────────────────────────────────────────

  /**
   * Guardar no envía de inmediato: primero valida y luego pide el técnico
   * responsable. El envío real ocurre en `confirmarGuardado()`.
   */
  guardar(): void {
    if (!this.puedeGuardar()) return;
    this.tecnicoSeleccionado = null;
    this.busquedaTecnico = '';
    this.showTecnicoModal = true;
  }

  cerrarTecnicoModal(): void {
    this.showTecnicoModal = false;
  }

  seleccionarTecnico(tecnico: TecnicoPlanMuestreo): void {
    this.tecnicoSeleccionado = tecnico;
  }

  confirmarGuardado(): void {
    if (!this.tecnicoSeleccionado) return;
    this.store.tecnico = this.tecnicoSeleccionado;
    this.showTecnicoModal = false;
    void this.enviarPlan();
  }

  /** Validaciones previas: sin esto no tiene sentido pedir el técnico. */
  private puedeGuardar(): boolean {
    this.persistir();
    const contexto = this.store.contexto;
    if (!contexto?.solicitudId) {
      this.toastrAlert.showWarning(
        'Seleccione una solicitud de trabajo en el paso 1 antes de guardar.',
        'Requerido',
      );
      return false;
    }

    const faltantes = this.store.camposFaltantes();
    if (faltantes.length > 0) {
      this.form.markAllAsTouched();
      this.toastrAlert.showWarning(
        'Complete todos los campos obligatorios antes de guardar.',
        'Requerido',
      );
      return false;
    }

    if (!contexto.tipoAguaId) {
      this.toastrAlert.showWarning(
        'No se pudo determinar el tipo de matriz de la solicitud seleccionada.',
        'Requerido',
      );
      return false;
    }

    return true;
  }

  // Último paso: se envían de una sola vez las respuestas acumuladas en los
  // pasos anteriores, con el mismo formato que la orden de trabajo in situ.
  private async enviarPlan(): Promise<void> {
    const contexto = this.store.contexto;
    if (!contexto?.solicitudId || !contexto.tipoAguaId) return;

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
          // El del formulario "PLAN DE MUESTREO" (F-PEE-42-01), no el de la
          // solicitud de la que se parte.
          ctformulario_id: this.store.TIPO_FORMULARIO_ID,
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
