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
  // Formulario dinámico "PLAN DE MUESTREO"; la sección 2 son las preguntas
  // de este paso.
  readonly TIPO_FORMULARIO_ID = 2019;
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
    this.router.navigate(['/plan-muestreo']);
  }

  siguiente(): void {
    // TODO: persistir las respuestas cuando exista el endpoint del plan de
    // muestreo; por ahora solo se deja el payload estándar a la vista.
    console.log('[plan-muestreo-paso2:siguiente]', construirValores(this.form, this.grupos));
    this.router.navigate(['/plan-muestreo/paso3']);
  }
}
