import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

import { PageHeader } from '../../../../shared/components/page-header/page-header';
import { LoadingComponent } from '../../../../shared/components/loading/loading';
import { AlertService } from '../../../../services/alert.service';
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
  tipoRecipiente,
} from '../../model/plan-muestreo-form.model';
import { ReportFormulario } from '../../../../interfaces/admin-formularios/report-formulario.interface';
import { PlanMuestreoStore } from '../../model/plan-muestreo.store';

@Component({
  selector: 'app-plan-muestreo-step2',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PageHeader,
    LoadingComponent,
    DynamicFormGroupComponent,
  ],
  templateUrl: './step2-planificacion.html',
  styleUrl: '../../plan-muestreo.css',
})
export class Step2PlanificacionComponent implements OnInit, OnDestroy {
  // Posición en el asistente, para el stepper de la cabecera.
  readonly PASO = 2;
  readonly TOTAL_PASOS = 3;

  readonly FILAS_TEXTAREA = FILAS_TEXTAREA;
  readonly tipoRecipiente = tipoRecipiente;

  // Preguntas del formulario dinámico que corresponden a este paso.
  readonly SECCION = 2;

  form: FormGroup;
  grupos: DynamicGroup[] = [];
  formulario: ReportFormulario | null = null;
  fechaEmision: Date | null = null;
  loading = true;

  private readonly destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private store: PlanMuestreoStore,
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

  // Al salir del paso —por los botones o por el historial del navegador— las
  // respuestas quedan en el store, que arma el payload final en el paso 3.
  ngOnDestroy(): void {
    if (!this.loading) {
      this.store.guardarSeccion(this.SECCION, camposDe(this.grupos), this.form.getRawValue());
    }
    this.destroy$.next();
    this.destroy$.complete();
  }

  regresar(): void {
    this.router.navigate(['/plan-muestreo/nuevo']);
  }

  siguiente(): void {
    this.router.navigate(['/plan-muestreo/paso3']);
  }
}
