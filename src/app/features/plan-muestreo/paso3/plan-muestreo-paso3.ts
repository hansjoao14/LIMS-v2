import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

import { PageHeader } from '../../../shared/components/page-header/page-header';
import { AuthService } from '../../auth/service/auth-service';
import { AlertService } from '../../../services/alert.service';
import { SolicitudService } from '../../../services/solicitudes/solicitud-trabajo/solicitud-trabajo.service';
import { PlanMuestreoGrupo, construirGrupos } from '../model/plan-muestreo-form.model';
import { construirValores, generarControles } from '../model/plan-muestreo-form.utils';
import { PlanMuestreoGrupoComponent } from '../grupo/plan-muestreo-grupo';

@Component({
  selector: 'app-plan-muestreo-paso3',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, PageHeader, PlanMuestreoGrupoComponent],
  templateUrl: './plan-muestreo-paso3.html',
  styleUrl: '../plan-muestreo.css',
})
export class PlanMuestreoPaso3 implements OnInit, OnDestroy {
  // Formulario dinámico "PLAN DE MUESTREO"; la sección 3 son las preguntas
  // de este paso.
  readonly TIPO_FORMULARIO_ID = 2019;
  readonly SECCION = 3;

  form: FormGroup;
  grupos: PlanMuestreoGrupo[] = [];
  loading = true;

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
    private solicitudService: SolicitudService,
    private authService: AuthService,
    private alertService: AlertService,
  ) {
    this.form = this.fb.group({});
  }

  ngOnInit(): void {
    const { id } = this.authService.currentUser();

    this.solicitudService
      .getFormulario(this.TIPO_FORMULARIO_ID, id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (formulario) => {
          this.grupos = construirGrupos(formulario.preguntas ?? [], this.SECCION);
          generarControles(this.form, this.grupos);
          this.loading = false;
        },
        error: () => {
          this.loading = false;
          this.alertService.error('No se pudo cargar el formulario dinámico');
        },
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  regresar(): void {
    this.router.navigate(['/plan-muestreo/paso2']);
  }

  guardar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.alertService.error('Complete los campos obligatorios');
      return;
    }

    // TODO: enviar al endpoint del plan de muestreo cuando esté disponible.
    console.log('[plan-muestreo-paso3:guardar]', construirValores(this.form, this.grupos));
  }
}
