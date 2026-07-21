import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

import { PageHeader } from '../../../shared/components/page-header/page-header';
import { TableSkeleton } from '../../../ui/table-skeleton/table-skeleton';
import { PaginationComponent } from '../../../shared/components/pagination/pagination';
import { PaginationMeta } from '../../../interfaces/catalogos/catalogo.interface';
import { ReportPlanMuestreoService } from '../../../services/solicitudes/plan-muestreo/report-plan-muestreo.service';
import { ReportPlanMuestreo } from '../../../interfaces/solicitudes/plan-muestreo/report-plan-muestreo.interface';
import { ReportFormularioService } from '../../../services/admin-formularios/report-formulario.service';
import { ReportFormulario } from '../../../interfaces/admin-formularios/report-formulario.interface';
import { AlertService } from '../../../services/alert.service';
import { PlanMuestreoStore } from '../model/plan-muestreo.store';

@Component({
  selector: 'app-plan-muestreo-lista',
  standalone: true,
  imports: [CommonModule, PageHeader, TableSkeleton, PaginationComponent],
  templateUrl: './plan-muestreo-lista.html',
  styleUrl: '../plan-muestreo.css',
})
export class PlanMuestreoLista implements OnInit, OnDestroy {
  // Formulario "PLAN DE MUESTREO", solo para los metadatos de la cabecera.
  readonly TIPO_FORMULARIO_ID = 2019;

  formulario: ReportFormulario | null = null;
  fechaEmision: Date | null = null;

  loading = true;
  planes: ReportPlanMuestreo[] = [];

  meta: PaginationMeta | null = null;
  currentPage = 1;
  readonly PAGE_SIZE = 10;

  private readonly destroy$ = new Subject<void>();

  constructor(
    private router: Router,
    private reportPlanMuestreoService: ReportPlanMuestreoService,
    private reportFormularioService: ReportFormularioService,
    private alertService: AlertService,
    private store: PlanMuestreoStore,
  ) {}

  ngOnInit(): void {
    this.reportFormularioService
      .getFormularioByCTId(this.TIPO_FORMULARIO_ID)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (formulario) => {
          this.formulario = formulario;
          if (formulario?.fecha_emision) {
            this.fechaEmision = new Date(Number(formulario.fecha_emision));
          }
        },
      });

    this.cargarPlanes();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  cargarPlanes(page = this.currentPage): void {
    this.loading = true;
    this.currentPage = page;
    this.reportPlanMuestreoService
      .getPlanes(page, this.PAGE_SIZE)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: ({ data, meta }) => {
          this.planes = data;
          this.meta = meta;
          this.loading = false;
        },
        error: () => {
          this.loading = false;
          this.alertService.error('No se pudo cargar la lista de planes de muestreo');
        },
      });
  }

  irAPagina(page: number): void {
    this.cargarPlanes(page);
  }

  // El asistente arranca siempre en blanco: se descarta cualquier borrador que
  // haya quedado en memoria de un intento anterior.
  nuevoPlan(): void {
    this.store.limpiar();
    this.router.navigate(['/plan-muestreo/nuevo']);
  }
}
