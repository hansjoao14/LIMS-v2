import { Component, OnDestroy, OnInit, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, finalize, takeUntil } from 'rxjs';

import { EstadoOrden, alternarOrden, iconoOrden } from '../../../core/utils/orden-tabla.utils';
import { abrirMenuHaciaArriba } from '../../../core/utils/dropdown-position.utils';
import { AppRole, MenuKey, hasPermission } from '../../../core/utils/roles.constans';
import { AuthService } from '../../auth/service/auth-service';
import { PageHeader } from '../../../shared/components/page-header/page-header';
import { PaginationComponent } from '../../../shared/components/pagination/pagination';
import { TableSkeleton } from '../../../ui/table-skeleton/table-skeleton';
import { PaginationMeta } from '../../../interfaces/catalogos/catalogo.interface';
import { ReportFormulario } from '../../../interfaces/admin-formularios/report-formulario.interface';
import { ReportFormularioService } from '../../../services/admin-formularios/report-formulario.service';
import {
  CampoBusquedaGases,
  CampoOrdenGases,
  ReportGasesCombustion,
} from '../../../interfaces/gases-combustion/report-gases-combustion.interface';
import {
  CAMPOS_FECHA_GASES,
  ORDEN_INICIAL_GASES,
  ReportGasesCombustionService,
} from '../../../services/gases-combustion/report-gases-combustion.service';
import {
  ESTADO_GASES,
  GasesCombustionService,
  TIPO_FORMULARIO_GASES,
} from '../../../services/gases-combustion/gases-combustion.service';
import { AlertService } from '../../../services/alert.service';
import { ToastrAlertService } from '../../../services/toastr.service';

@Component({
  selector: 'app-gases-combustion-lista',
  standalone: true,
  imports: [CommonModule, FormsModule, PageHeader, PaginationComponent, TableSkeleton],
  templateUrl: './gases-combustion-lista.html',
  styleUrl: '../gases-combustion.css',
})
export class GasesCombustionLista implements OnInit, OnDestroy {
  private readonly router = inject(Router);
  private readonly reportService = inject(ReportGasesCombustionService);
  private readonly gasesService = inject(GasesCombustionService);
  private readonly reportFormularioService = inject(ReportFormularioService);
  private readonly alertService = inject(AlertService);
  private readonly toastr = inject(ToastrAlertService);
  private readonly authService = inject(AuthService);

  /**
   * Ítem de catálogo del F-PEE-07-01. Con él, `collectionReportFormulario`
   * devuelve el código, la edición y la fecha de emisión de la cabecera. Mismo
   * patrón que la pantalla de registro y que ticket-entrega-muestras.
   */
  readonly TIPO_FORMULARIO_ID = TIPO_FORMULARIO_GASES;
  formulario: ReportFormulario | null = null;
  fechaEmision: Date | null = null;

  /**
   * Buscador: un campo a la vez. El `WhereInput` de la colección no expone OR,
   * así que no se pueden consultar los dos de una sola vez.
   */
  readonly CAMPOS_BUSQUEDA: { valor: CampoBusquedaGases; etiqueta: string }[] = [
    { valor: 'num_secuencial', etiqueta: 'N° Formulario' },
    { valor: 'analista_nombre', etiqueta: 'Analista' },
  ];
  campoBusqueda: CampoBusquedaGases = 'num_secuencial';
  busqueda = '';

  orden: EstadoOrden<CampoOrdenGases> = { ...ORDEN_INICIAL_GASES };

  loading = true;
  registros: ReportGasesCombustion[] = [];

  meta: PaginationMeta | null = null;
  currentPage = 1;
  readonly PAGE_SIZE = 10;

  openMenuId: string | null = null;
  procesandoId: string | null = null;

  private readonly destroy$ = new Subject<void>();

  private userAppRole = computed<AppRole | null>(() => {
    const roles = this.authService.userProfile()?.roles ?? [];
    return (Object.values(AppRole) as AppRole[]).find((r) => roles.includes(r)) ?? null;
  });

  canCrear = computed(() => {
    const role = this.userAppRole();
    return role ? hasPermission(MenuKey.GASES_COMBUSTION, role, 'crear') : false;
  });

  canEditar = computed(() => {
    const role = this.userAppRole();
    return role ? hasPermission(MenuKey.GASES_COMBUSTION, role, 'editar') : false;
  });

  canEliminar = computed(() => {
    const role = this.userAppRole();
    return role ? hasPermission(MenuKey.GASES_COMBUSTION, role, 'eliminar') : false;
  });

  /**
   * Numerar es la acción que vuelve oficial a la hoja, así que va con el mismo
   * permiso que editarla: quien puede cargar la verificación es quien la cierra.
   */
  canNumerar = computed(() => this.canEditar());

  /**
   * ESTANDARES.md §5.1: la columna de acciones solo existe si hay alguna acción.
   *
   * Acá son solo editar y eliminar, las dos en el menú ⋮ como manda §5.2. No hay
   * botones de autorizar ni de rechazar todavía: el Anexo 08 no describe ningún
   * flujo de aprobación para este formato y está como pregunta abierta en el
   * diseño. Cuando se confirme, entran como botón directo antes del menú.
   */
  /**
   * Siempre hay al menos una acción: ver la hoja. Quien entra al listado puede
   * abrirla, aunque no tenga permiso para editarla.
   */
  get hasAnyAction(): boolean {
    return true;
  }

  /**
   * Solo se numera una hoja pendiente y vigente. Una ya numerada no vuelve a
   * numerarse: el backend la rechaza con `GASES_COMBUSTION_NO_EDITABLE`.
   */
  puedeNumerar(registro: ReportGasesCombustion): boolean {
    return this.canNumerar() && registro.estado && this.esPendiente(registro);
  }

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

    this.cargarRegistros();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  // ── Tabla ────────────────────────────────────────────────────────────────

  /** Clic en un encabezado: alterna la dirección o cambia de columna. */
  ordenarPor(campo: CampoOrdenGases): void {
    this.orden = alternarOrden(this.orden, campo, CAMPOS_FECHA_GASES);
    this.closeMenu();
    this.cargarRegistros(1);
  }

  /** ▲ / ▼ en la columna activa, vacío en el resto. */
  icono(campo: CampoOrdenGases): string {
    return iconoOrden(this.orden, campo);
  }

  /** Relanza la búsqueda desde la primera página. */
  filtrar(): void {
    this.closeMenu();
    this.cargarRegistros(1);
  }

  cargarRegistros(page = this.currentPage): void {
    this.loading = true;
    this.currentPage = page;
    this.reportService
      .getRegistros(page, this.PAGE_SIZE, this.campoBusqueda, this.busqueda, this.orden)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: ({ data, meta }) => {
          this.registros = data;
          this.meta = meta;
          // Si la página quedó vacía al dar de baja el último registro, se
          // retrocede a la anterior.
          if (data.length === 0 && page > 1) {
            this.cargarRegistros(page - 1);
            return;
          }
          this.loading = false;
        },
        error: () => {
          this.loading = false;
          this.alertService.error('No se pudo cargar la lista de verificaciones');
        },
      });
  }

  irAPagina(page: number): void {
    this.closeMenu();
    this.cargarRegistros(page);
  }

  // ── Menú contextual ──────────────────────────────────────────────────────
  // ESTANDARES.md §5.3: `div.relative` + desplegable `absolute`, nunca `fixed`
  // con coordenadas calculadas. La capa de cierre va DENTRO del `.animate-in`.

  toggleMenu(id: string, event: MouseEvent): void {
    event.stopPropagation();
    this.openMenuId = this.openMenuId === id ? null : id;
  }

  closeMenu(): void {
    this.openMenuId = null;
  }

  abrirHaciaArriba(index: number): boolean {
    return abrirMenuHaciaArriba(index, this.registros.length);
  }

  // ── Estado del flujo ─────────────────────────────────────────────────────

  esPendiente(registro: ReportGasesCombustion): boolean {
    return registro.ctestado_id === ESTADO_GASES.PENDIENTE;
  }

  esFinalizado(registro: ReportGasesCombustion): boolean {
    return registro.ctestado_id === ESTADO_GASES.FINALIZADO;
  }

  esRechazado(registro: ReportGasesCombustion): boolean {
    return registro.ctestado_id === ESTADO_GASES.RECHAZADO;
  }

  /**
   * El catálogo lo nombra "Finalizado Solicitud", pero acá el sufijo no aporta:
   * ya se sabe que la fila es una hoja de verificación. Mismo criterio que
   * `ticket-entrega-muestras-lista.ts` y `plan-muestreo-lista.ts`.
   */
  etiquetaEstado(registro: ReportGasesCombustion): string {
    if (this.esFinalizado(registro)) return 'Finalizado';
    return registro.ctestado_nombre ?? 'Pendiente';
  }

  /** Etiqueta principal de la fila, para los mensajes de confirmación. */
  etiquetaRegistro(registro: ReportGasesCombustion): string {
    return registro.num_secuencial ?? `la hoja del año ${registro.anio}`;
  }

  /**
   * Cuántas mediciones no cumplen, para el resumen de la fila. Reemplaza a una
   * evaluación global: el Anexo define CUMPLE por medición, no por hoja.
   */
  resumenMediciones(registro: ReportGasesCombustion): string {
    const total = registro.total_mediciones ?? 0;
    if (total === 0) return 'Sin mediciones';
    const fallan = registro.mediciones_no_cumplen ?? 0;
    return fallan === 0 ? `${total} · todas cumplen` : `${total} · ${fallan} no cumplen`;
  }

  tieneMedicionesQueNoCumplen(registro: ReportGasesCombustion): boolean {
    return (registro.mediciones_no_cumplen ?? 0) > 0;
  }

  /**
   * Editar solo mientras la hoja está pendiente: una vez numerada es un
   * documento oficial y el backend corta con `GASES_COMBUSTION_NO_EDITABLE`.
   */
  puedeEditar(registro: ReportGasesCombustion): boolean {
    return this.canEditar() && this.esPendiente(registro);
  }

  /**
   * Dar de baja NO depende del estado: el endpoint la acepta en cualquiera, y
   * una hoja numerada por error tiene que poder retirarse del listado. Es lo
   * mismo que hace calibración. No borra nada: es baja lógica.
   */
  puedeEliminar(registro: ReportGasesCombustion): boolean {
    return this.canEliminar();
  }

  // ── Acciones ─────────────────────────────────────────────────────────────

  nuevaVerificacion(): void {
    this.router.navigate(['/gases-combustion/nuevo']);
  }

  editar(registro: ReportGasesCombustion): void {
    this.abrir(registro);
  }

  /**
   * Abre la hoja en modo lectura. Es la misma pantalla y la misma ruta que
   * editar: el formulario decide si se puede tocar según el estado, así que una
   * hoja numerada se muestra completa pero bloqueada.
   *
   * Se ofrece cuando editar no está disponible —hoja ya numerada, o sin permiso
   * de edición—; con las dos juntas, el menú tendría dos entradas que hacen lo
   * mismo.
   */
  ver(registro: ReportGasesCombustion): void {
    this.abrir(registro);
  }

  private abrir(registro: ReportGasesCombustion): void {
    this.closeMenu();
    this.router.navigate(['/gases-combustion', registro.id]);
  }

  /**
   * Numera la hoja. El backend revisa antes todo lo que después ya no se puede
   * arreglar —patrones sin el gas que se les midió, pares de lecturas a medias,
   * mediciones sin veredicto, inspecciones con novedad y sin observaciones— y
   * corta con un `code` que se traduce acá abajo.
   *
   * @see faq-monorepo/docs/gases-combustion.md §10.2
   */
  async numerar(registro: ReportGasesCombustion): Promise<void> {
    this.closeMenu();
    if (!this.puedeNumerar(registro)) return;

    const confirmado = await this.alertService.confirm({
      icon: 'warning',
      title: '¿Numerar la verificación?',
      text: `Se le asigna el número de formulario a ${this.etiquetaRegistro(registro)} y la hoja deja de ser editable.`,
      confirmButtonText: 'Sí, numerar',
    });
    if (!confirmado) return;

    this.procesandoId = registro.id;
    this.gasesService
      .finalizar(registro.id)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => (this.procesandoId = null)),
      )
      .subscribe({
        next: (respuesta) => {
          const numero = respuesta?.[0]?.secuencialAsignado;
          this.toastr.showSuccess(
            numero ? `La hoja quedó numerada como ${numero}.` : 'La hoja quedó numerada.',
            'Verificación numerada',
          );
          this.cargarRegistros();
        },
        error: (error: unknown) => this.mostrarErrorDeNumeracion(error),
      });
  }

  /**
   * Los errores de regla de negocio traen un `code`: se traduce a un mensaje que
   * dice qué corregir, en vez de mostrar el texto crudo del servidor.
   */
  private mostrarErrorDeNumeracion(error: unknown): void {
    const codigo = (error as { error?: { code?: string } })?.error?.code;
    const mensaje = (error as { error?: { message?: string } })?.error?.message;

    const conocidos: Record<string, string> = {
      GASES_COMBUSTION_NO_EDITABLE: 'La hoja ya fue numerada y no admite cambios.',
      GASES_COMBUSTION_DADO_DE_BAJA: 'La hoja está dada de baja.',
      GASES_COMBUSTION_SIN_MEDICIONES: 'La hoja no tiene mediciones cargadas.',
      GASES_COMBUSTION_SECUENCIAL_ERROR:
        'No se pudo generar el número de formulario. Revisá la configuración del secuencial.',
      GASES_SP_SECUENCIAL_FALTANTE:
        'Falta instalar el procedimiento que numera las hojas. Avisá al equipo de base de datos.',
      GASES_SECUENCIAL_NO_CONFIGURADO:
        'No hay un secuencial configurado para gases de combustión. Avisá al equipo de base de datos.',
      GASES_MEDICION_PATRON_SIN_GAS:
        'Hay una medición contra un patrón que no lleva ese gas: sin la concentración certificada no hay porcentaje de recuperación.',
      GASES_MEDICION_PAR_INCOMPLETO: 'Hay un par de lecturas a medias: va X1 antes que X2.',
      GASES_MEDICION_SIN_VEREDICTO:
        'Hay una medición sin CUMPLE: su promedio no cae en ningún rango de criterio vigente.',
      GASES_INSPECCION_SIN_OBSERVACIONES:
        'Una inspección con novedades o con diagnóstico distinto de APROBADA debe registrar observaciones.',
      GASES_CRITERIO_AMBIGUO:
        'Los criterios de aceptación están mal parametrizados: hay rangos superpuestos.',
    };

    this.alertService.error(
      (codigo && conocidos[codigo]) || mensaje || 'No se pudo numerar la verificación.',
      'No se pudo numerar',
    );
  }

  async eliminar(registro: ReportGasesCombustion): Promise<void> {
    this.closeMenu();
    if (!this.puedeEliminar(registro)) return;

    const confirmado = await this.alertService.confirm({
      icon: 'warning',
      title: '¿Dar de baja la verificación?',
      text: `Se dará de baja ${this.etiquetaRegistro(registro)}. No se borra: deja de aparecer en el listado.`,
      confirmButtonColor: '#dc2626',
      confirmButtonText: 'Sí, dar de baja',
    });
    if (!confirmado) return;

    this.procesandoId = registro.id;
    this.reportService
      .darDeBaja(registro.id)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => (this.procesandoId = null)),
      )
      .subscribe({
        next: () => {
          this.toastr.showSuccess(
            `${this.etiquetaRegistro(registro)} quedó dada de baja.`,
            'Verificación dada de baja',
          );
          this.cargarRegistros();
        },
        error: () => this.alertService.error('No se pudo dar de baja la verificación'),
      });
  }
}
