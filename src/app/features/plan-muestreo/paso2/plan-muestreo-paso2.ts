import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

import { PageHeader } from '../../../shared/components/page-header/page-header';
import { AlertService } from '../../../services/alert.service';
import { PlanMuestreoGrupo, construirGrupos } from '../model/plan-muestreo-form.model';
import { aplicarDependencias, camposDe, generarControles } from '../model/plan-muestreo-form.utils';
import { PlanMuestreoStore } from '../model/plan-muestreo.store';
import { PlanMuestreoGrupoComponent } from '../grupo/plan-muestreo-grupo';

export interface ControlCalidad {
  tipo: string;
  filas: { analisis: string; muestrasFaltantes: number }[];
}

@Component({
  selector: 'app-plan-muestreo-paso2',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, PageHeader, PlanMuestreoGrupoComponent],
  templateUrl: './plan-muestreo-paso2.html',
  styleUrl: '../plan-muestreo.css',
})
export class PlanMuestreoPaso2 implements OnInit, OnDestroy {
  // Preguntas del formulario dinámico que corresponden a este paso.
  readonly SECCION = 2;

  form: FormGroup;
  grupos: PlanMuestreoGrupo[] = [];
  loading = true;

  // Los controles de calidad no forman parte del formulario dinámico.
  controlesCalidad: ControlCalidad[] = [
    {
      tipo: 'REPETIBILIDAD',
      filas: [
        { analisis: 'pH, TEMPERATURA', muestrasFaltantes: 4 },
        { analisis: 'MUESTREO', muestrasFaltantes: 9 },
      ],
    },
    {
      tipo: 'REPRODUCIBILIDAD',
      filas: [
        { analisis: 'pH, TEMPERATURA', muestrasFaltantes: 4 },
        { analisis: 'MUESTREO', muestrasFaltantes: 29 },
      ],
    },
    {
      tipo: 'BLANCO DE CONTROL',
      filas: [{ analisis: 'MUESTREO', muestrasFaltantes: 29 }],
    },
  ];

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
      .getFormulario()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (formulario) => {
          this.grupos = construirGrupos(formulario.preguntas ?? [], this.SECCION);
          generarControles(this.form, this.grupos);
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
