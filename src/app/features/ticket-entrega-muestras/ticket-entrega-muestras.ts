import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';

import { PageHeader } from '../../shared/components/page-header/page-header';
import { PaginationMeta } from '../../interfaces/catalogos/catalogo.interface';
import { ReportPlanMuestreoService } from '../../services/solicitudes/plan-muestreo/report-plan-muestreo.service';
import { PlanMuestreoOpcion } from '../../interfaces/solicitudes/plan-muestreo/report-plan-muestreo.interface';
import { PlanMuestreoService } from '../../services/solicitudes/plan-muestreo/plan-muestreo.service';
import { PreservacionRow } from '../../interfaces/ticket-entrega-muestras/ticket-entrega-muestras.interface';

/** Grupo del que sale la tabla de preservación dentro del detalle del plan. */
const GRUPO_PRESERVACION = 'PRESERVACIÓN DE LAS MUESTRAS';

/**
 * Tipo de recipiente por preservación. El detalle del plan no lo devuelve, así
 * que se completa con este mapa — el mismo criterio (y el mismo TODO) que en
 * `plan-muestreo/model/plan-muestreo-form.model.ts`.
 * TODO(backend): exponerlo en el detalle y borrar esta constante.
 */
const TIPO_RECIPIENTE: Record<string, string> = {
  temperatura_0_6_c: 'Vidrio opaco',
  h2so4: 'Vidrio opaco',
  hno3: 'Vidrio opaco',
};

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
  /** Sale del plan seleccionado; vacío mientras no se elija ninguno. */
  planMuestreoNo = '';

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
  preservaciones: PreservacionRow[] = [];
  cargandoDetalle = false;

  private readonly destroy$ = new Subject<void>();

  constructor(
    private reportPlanMuestreoService: ReportPlanMuestreoService,
    private planMuestreoService: PlanMuestreoService,
  ) {}

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
    this.cargarDetallePlan(plan.id);
  }

  limpiarPlan(): void {
    this.planSeleccionado = null;
    this.planMuestreoNo = '';
    this.preservaciones = [];
  }

  // ── Detalle del plan ─────────────────────────────────────────────────────

  private cargarDetallePlan(id: string): void {
    this.cargandoDetalle = true;
    this.planMuestreoService
      .getPlanMuestreoDetalle(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (detalle) => {
          const formulario = detalle?.formularios?.[0];
          this.planMuestreoNo = formulario?.num_secuencial_muestreo ?? '';
          // Match exacto: por substring "PRESERVACIÓN" también entraría el
          // grupo "EQUIPOS PRESERVACIÓN", que no va en esta tabla.
          const grupo = formulario?.atributos?.find((g) => g.grupo_texto === GRUPO_PRESERVACION);
          this.preservaciones = (grupo?.detalle_seccion ?? []).map((a) => ({
            preservacion: a.pregunta_atributo_formulario,
            volumen: a.valor_texto ?? '',
            tipoRecipiente: TIPO_RECIPIENTE[a.nombre_atributo_formulario] ?? '—',
          }));
          this.cargandoDetalle = false;
        },
        error: () => {
          this.planMuestreoNo = '';
          this.preservaciones = [];
          this.cargandoDetalle = false;
        },
      });
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
