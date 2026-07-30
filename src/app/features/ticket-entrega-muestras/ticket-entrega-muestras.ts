import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';

import { PageHeader } from '../../shared/components/page-header/page-header';
import { PaginationMeta } from '../../interfaces/catalogos/catalogo.interface';
import {
  PlanMuestreoOpcion,
  ReportPlanMuestreoService,
} from '../../services/solicitudes/plan-muestreo/report-plan-muestreo.service';

/** Una fila de la tabla de preservación de muestras. */
export interface PreservacionRow {
  preservacion: string;
  volumen: number | null;
  tipoRecipiente: string;
}

@Component({
  selector: 'app-ticket-entrega-muestras',
  standalone: true,
  imports: [CommonModule, FormsModule, PageHeader],
  templateUrl: './ticket-entrega-muestras.html',
  styleUrl: './ticket-entrega-muestras.css',
})
export class TicketEntregaMuestras implements OnDestroy {
  // TODO(datos): lo que sigue marcado como maqueta se reemplaza cuando se
  // defina la funcionalidad. El combo de códigos de muestra ya viene del API.

  // ── Cabecera ─────────────────────────────────────────────────────────────
  readonly codigoFormulario = 'F-I-53-01';
  readonly edicion = '02';
  readonly elaboradoPor = 'Tec. Jorge Diaz';
  readonly fechaSolicitud = new Date(2025, 4, 27);

  // ── Información de las muestras ──────────────────────────────────────────
  readonly planMuestreoNo = 'PM-058-25';

  // ── Panel de búsqueda del código de muestra ──────────────────────────────
  // Mismo patrón que "Solicitud de Trabajo No" en plan-muestreo/nuevo.
  planSeleccionado: PlanMuestreoOpcion | null = null;
  panelAbierto = false;
  loadingBusqueda = false;
  busqueda = '';
  meta: PaginationMeta | null = null;
  currentPage = 1;
  readonly PAGE_SIZE = 8;
  /** Página actual del servidor, sin el filtro de texto aplicado. */
  private todosLosPlanes: PlanMuestreoOpcion[] = [];
  planesFiltrados: PlanMuestreoOpcion[] = [];

  // ── Recepción de las muestras ────────────────────────────────────────────
  readonly entregadaPor = 'José Luis Montenegro';
  readonly recibidaPor = 'Karen Guerron';

  // ── Preservación de las muestras ─────────────────────────────────────────
  preservaciones: PreservacionRow[] = [
    { preservacion: 'Temperatura 0°C a 6°C', volumen: 7, tipoRecipiente: 'Vidrio opaco' },
    { preservacion: 'H2SO4', volumen: 3, tipoRecipiente: 'Vidrio opaco' },
    { preservacion: 'HNO3', volumen: 4, tipoRecipiente: 'Vidrio opaco' },
  ];

  private readonly destroy$ = new Subject<void>();

  constructor(private reportPlanMuestreoService: ReportPlanMuestreoService) {}

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  // ── Panel de búsqueda ────────────────────────────────────────────────────

  abrirPanel(): void {
    this.panelAbierto = true;
    this.busqueda = '';
    this.cargarPagina(1);
  }

  cerrarPanel(): void {
    this.panelAbierto = false;
  }

  onBusquedaChange(valor: string): void {
    this.busqueda = valor;
    this.aplicarFiltro();
  }

  cargarPagina(page: number): void {
    this.loadingBusqueda = true;
    this.currentPage = page;
    this.reportPlanMuestreoService
      .getPlanesPorEstado(page, this.PAGE_SIZE)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: ({ data, meta }) => {
          this.todosLosPlanes = data;
          this.meta = meta;
          this.aplicarFiltro();
          this.loadingBusqueda = false;
        },
        error: () => {
          this.todosLosPlanes = [];
          this.planesFiltrados = [];
          this.loadingBusqueda = false;
        },
      });
  }

  // El filtro es sobre la página ya cargada, igual que en plan-muestreo/nuevo.
  private aplicarFiltro(): void {
    const q = this.busqueda.trim().toLowerCase();
    this.planesFiltrados = q
      ? this.todosLosPlanes.filter((p) => this.etiquetaCodigo(p).toLowerCase().includes(q))
      : this.todosLosPlanes;
  }

  seleccionarPlan(plan: PlanMuestreoOpcion): void {
    this.planSeleccionado = plan;
    this.panelAbierto = false;
  }

  limpiarPlan(): void {
    this.planSeleccionado = null;
  }

  /**
   * Etiqueta visible del plan. Varios planes finalizados todavía no tienen
   * `codigo_muestreo`, así que se cae al número de plan para no dejar la fila
   * en blanco.
   */
  etiquetaCodigo(plan: PlanMuestreoOpcion): string {
    return plan.codigo_muestreo ?? plan.num_secuencial ?? plan.id;
  }

  // TODO(funcionalidad): armar el payload y llamar al servicio.
  guardar(): void {
    return;
  }
}
