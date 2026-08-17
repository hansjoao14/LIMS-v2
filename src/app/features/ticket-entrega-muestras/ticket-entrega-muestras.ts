import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

import { AuthService } from '../auth/service/auth-service';
import { PageHeader } from '../../shared/components/page-header/page-header';
import { PaginationMeta } from '../../interfaces/catalogos/catalogo.interface';
import { ReportPlanMuestreoService } from '../../services/solicitudes/plan-muestreo/report-plan-muestreo.service';
import { PlanMuestreoOpcion } from '../../interfaces/solicitudes/plan-muestreo/report-plan-muestreo.interface';
import { PlanMuestreoService } from '../../services/solicitudes/plan-muestreo/plan-muestreo.service';
import { PreservacionRow } from '../../interfaces/ticket-entrega-muestras/ticket-entrega-muestras.interface';
import { TicketEntregaMuestrasService } from '../../services/solicitudes/ticket-entrega-muestras/ticket-entrega-muestras.service';
import { ToastrAlertService } from '../../services/toastr.service';
import { ReportFormularioService } from '../../services/admin-formularios/report-formulario.service';
import { ReportFormulario } from '../../interfaces/admin-formularios/report-formulario.interface';

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
  imports: [CommonModule, FormsModule, ReactiveFormsModule, PageHeader],
  templateUrl: './ticket-entrega-muestras.html',
  styleUrl: './ticket-entrega-muestras.css',
})
export class TicketEntregaMuestras implements OnInit, OnDestroy {
  // ── Cabecera ─────────────────────────────────────────────────────────────
  // Ítem de catálogo "Formulario Código de Ticket de Entrega" (catalogo_id 9).
  // La metadata sale del API, igual que en plan-muestreo. `elaboradoPor` no se
  // pasa: <app-page-header> cae al usuario logueado cuando es null.
  readonly TIPO_FORMULARIO_ID = 2085;
  formulario: ReportFormulario | null = null;
  fechaEmision: Date | null = null;

  // ── Información de las muestras ──────────────────────────────────────────
  // El usuario busca un PLAN; el código de muestra se deriva del plan elegido.
  /** `num_secuencial` del plan, confirmado con su detalle. */
  planMuestreoNo = '';
  /** `codigo_muestreo` del plan elegido. Varios planes aún no lo tienen. */
  codigoMuestra = '';

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
  // "Entregada por" es el técnico del plan elegido (`usuario_id`); "Recibida
  // por" es el usuario logueado, que es quien recibe en laboratorio. Ninguno
  // se edita a mano: no hay endpoint de empleados — el único listado
  // (`listado_empleado`) llega embebido en formularios dinámicos que esta
  // pantalla no usa.
  form!: FormGroup;
  guardando = false;

  /** Nombre del usuario logueado, para mostrarlo en "Recibida por". */
  get recibidaPorNombre(): string {
    return this.authService.currentUser().nombre || 'Usuario actual';
  }

  /** Nombre del técnico del plan, para mostrarlo en "Entregada por". */
  get entregadaPorNombre(): string {
    return this.planSeleccionado?.usuario_nombre_completo ?? '';
  }

  // ── Preservación de las muestras ─────────────────────────────────────────
  preservaciones: PreservacionRow[] = [];
  cargandoDetalle = false;

  private readonly destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private reportPlanMuestreoService: ReportPlanMuestreoService,
    private planMuestreoService: PlanMuestreoService,
    private ticketEntregaService: TicketEntregaMuestrasService,
    private toastrAlert: ToastrAlertService,
    private reportFormularioService: ReportFormularioService,
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

    this.form = this.fb.group({
      fecha_recepcion: [this.ahoraParaInput(), Validators.required],
      observaciones: ['', Validators.maxLength(500)],
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /** Marca en rojo el campo solo después de que el usuario lo tocó. */
  esCampoInvalido(campo: string): boolean {
    const control = this.form?.get(campo);
    return !!control && control.invalid && (control.touched || control.dirty);
  }

  /** `YYYY-MM-DDTHH:mm` en hora local, que es lo que espera datetime-local. */
  private ahoraParaInput(): string {
    const ahora = new Date();
    const offset = ahora.getTimezoneOffset() * 60000;
    return new Date(ahora.getTime() - offset).toISOString().slice(0, 16);
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
      ? this.todosLosPlanes.filter((p) => this.etiquetaPlan(p).toLowerCase().includes(q))
      : this.todosLosPlanes;
  }

  seleccionarPlan(plan: PlanMuestreoOpcion): void {
    this.planSeleccionado = plan;
    this.panelAbierto = false;
    // El detalle no devuelve `codigo_muestreo`: sale del propio listado.
    this.codigoMuestra = plan.codigo_muestreo ?? '';
    this.cargarDetallePlan(plan.id);
  }

  limpiarPlan(): void {
    this.planSeleccionado = null;
    this.planMuestreoNo = '';
    this.codigoMuestra = '';
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

  volverAlListado(): void {
    this.router.navigate(['/ticket-entrega-muestras']);
  }

  /** Etiqueta principal del plan en el buscador y en el chip de selección. */
  etiquetaPlan(plan: PlanMuestreoOpcion): string {
    return plan.num_secuencial ?? plan.id;
  }

  guardar(): void {
    if (this.guardando) return;

    if (!this.planSeleccionado) {
      this.toastrAlert.showWarning(
        'Selecciona un plan de muestreo antes de guardar el ticket.',
        'Requerido',
      );
      return;
    }

    // El plan tiene que traer su técnico: es el `entregado_por_id` del ticket
    // y el backend lo exige como UUID.
    if (!this.planSeleccionado.usuario_id) {
      this.toastrAlert.showError(
        'El plan de muestreo seleccionado no tiene técnico asignado.',
        'No se puede guardar',
      );
      return;
    }

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.toastrAlert.showWarning(
        'Revisa la fecha de recepción y las observaciones.',
        'Datos incompletos',
      );
      return;
    }

    const { fecha_recepcion, observaciones } = this.form.value;
    const observacionesLimpias = (observaciones ?? '').trim();

    this.guardando = true;
    this.ticketEntregaService
      .crearTicketEntrega({
        plan_muestreo_id: this.planSeleccionado.id,
        entregado_por_id: this.planSeleccionado.usuario_id,
        recibido_por_id: this.authService.currentUser().id,
        fecha_recepcion: new Date(fecha_recepcion).toISOString(),
        // El backend rechaza `''` en un campo opcional con `@IsString`: se
        // omite mandando null cuando no hay observaciones.
        observaciones: observacionesLimpias || null,
      })
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.toastrAlert.showSuccess('El ticket de entrega ha sido guardado.', '¡Guardado!');
          this.limpiarPlan();
          this.form.reset({ fecha_recepcion: this.ahoraParaInput(), observaciones: '' });
          this.guardando = false;
          // Igual que el plan de muestreo: al guardar se vuelve al listado,
          // que recarga solo en su ngOnInit.
          this.router.navigate(['/ticket-entrega-muestras']);
        },
        error: (err) => {
          this.toastrAlert.showError(
            err?.error?.message ?? 'No se pudo guardar el ticket de entrega.',
            'Error',
          );
          this.guardando = false;
        },
      });
  }
}
