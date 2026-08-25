import { Component, NgZone, OnDestroy, OnInit, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EstadoOrden, alternarOrden, iconoOrden } from '../../../core/utils/orden-tabla.utils';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, finalize, takeUntil } from 'rxjs';

import { PageHeader } from '../../../shared/components/page-header/page-header';
import { TableSkeleton } from '../../../ui/table-skeleton/table-skeleton';
import { PaginationComponent } from '../../../shared/components/pagination/pagination';
import { PdfViewerComponent } from '../../../shared/components/pdf-viewer/pdf-viewer';
import { FirmaElectronicaComponent } from '../../../shared/components/firma-electronica/firma-electronica';
import { PaginationMeta } from '../../../interfaces/catalogos/catalogo.interface';
import {
  CAMPOS_FECHA_PLAN,
  ESTADO_PLAN_FINALIZADO,
  ESTADO_PLAN_RECHAZADO,
  CampoBusquedaPlan,
  CampoOrdenPlan,
  ORDEN_INICIAL_PLAN,
  ReportPlanMuestreoService,
} from '../../../services/solicitudes/plan-muestreo/report-plan-muestreo.service';
import { ReportPlanMuestreo } from '../../../interfaces/solicitudes/plan-muestreo/report-plan-muestreo.interface';
import { ReportFormularioService } from '../../../services/admin-formularios/report-formulario.service';
import { ReportFormulario } from '../../../interfaces/admin-formularios/report-formulario.interface';
import { AlertService } from '../../../services/alert.service';
import { ToastrAlertService } from '../../../services/toastr.service';
import { abrirMenuHaciaArriba } from '../../../core/utils/dropdown-position.utils';
import { AppRole, MenuKey, hasPermission } from '../../../core/utils/roles.constans';
import { AuthService } from '../../auth/service/auth-service';
import {
  IDENTIFICADOR_SECUENCIAL_PLAN_MUESTREO,
  PlanMuestreoService,
} from '../../../services/solicitudes/plan-muestreo/plan-muestreo.service';
import { PlanMuestreoStore } from '../model/plan-muestreo.store';
import {
  CampoFirmaElectronica,
  DatosFirmaElectronica,
  ErrorFirmaElectronica,
} from '../../../interfaces/documentos/firma-electronica.interface';

@Component({
  selector: 'app-plan-muestreo-lista',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    PageHeader,
    TableSkeleton,
    PaginationComponent,
    PdfViewerComponent,
    FirmaElectronicaComponent,
  ],
  templateUrl: './plan-muestreo-lista.html',
  styleUrl: '../plan-muestreo.css',
})
export class PlanMuestreoLista implements OnInit, OnDestroy {
  // Formulario "PLAN DE MUESTREO", solo para los metadatos de la cabecera.
  readonly TIPO_FORMULARIO_ID = 2019;

  // Buscador: un campo a la vez. El WhereInput de la colección no soporta OR,
  // así que no se puede buscar en los tres de una sola consulta; el selector
  // deja elegir cuál. Es el mismo criterio de secuencial, catálogo y ensayo,
  // que también buscan por un único campo.
  readonly CAMPOS_BUSQUEDA: { valor: CampoBusquedaPlan; etiqueta: string }[] = [
    { valor: 'num_secuencial', etiqueta: 'N° Plan' },
    { valor: 'solicitud_num_secuencial', etiqueta: 'N° Solicitud' },
    { valor: 'codigo_muestreo', etiqueta: 'Código de Muestreo' },
  ];
  campoBusqueda: CampoBusquedaPlan = 'num_secuencial';
  busqueda = '';

  // Ordenamiento por columna. La colección solo admite UN campo en el orderBy,
  // así que al hacer clic se reemplaza el anterior en vez de acumularse.
  orden: EstadoOrden<CampoOrdenPlan> = { ...ORDEN_INICIAL_PLAN };

  formulario: ReportFormulario | null = null;
  fechaEmision: Date | null = null;

  loading = true;
  planes: ReportPlanMuestreo[] = [];

  meta: PaginationMeta | null = null;
  currentPage = 1;
  readonly PAGE_SIZE = 10;

  openMenuId: string | null = null;
  procesandoId: string | null = null;

  // ── Firma electrónica ────────────────────────────────────────────────────
  mostrarModalFirma = false;
  cargandoPdfFirma = false;
  procesandoFirma = false;
  planFirmando: ReportPlanMuestreo | null = null;
  pdfFirmaBlob: Blob | null = null;
  errorFirma: ErrorFirmaElectronica | null = null;

  /**
   * Códigos que el firmador devuelve para algo que el usuario puede corregir
   * sin salir del modal, y el paso al que corresponde cada uno. Lo que no está
   * acá (plan sin autorizar, PDF ausente, fallo del firmador) no se arregla
   * reintentando: eso cierra el modal y se avisa por toast.
   */
  private readonly camposPorCodigoFirma: Record<string, CampoFirmaElectronica> = {
    CERTIFICADO_INVALIDO: 'password',
    PASSWORD_REQUERIDA: 'password',
    CERTIFICADO_VACIO: 'certificado',
    POSICION_FIRMA_INVALIDA: 'posicion',
  };

  showPdfModal = false;
  isPdfCargando = false;
  pdfPreviewBlob: Blob | null = null;
  pdfNombre = 'plan-muestreo.pdf';

  private readonly destroy$ = new Subject<void>();

  private userAppRole = computed<AppRole | null>(() => {
    const roles = this.authService.userProfile()?.roles ?? [];
    return (Object.values(AppRole) as AppRole[]).find((r) => roles.includes(r)) ?? null;
  });

  canCrear = computed(() => {
    const role = this.userAppRole();
    return role ? hasPermission(MenuKey.PLAN_MUESTREO, role, 'crear') : false;
  });

  canDelete = computed(() => {
    const role = this.userAppRole();
    return role ? hasPermission(MenuKey.PLAN_MUESTREO, role, 'eliminar') : false;
  });

  canAutorizar = computed(() => {
    const role = this.userAppRole();
    return role ? hasPermission(MenuKey.PLAN_MUESTREO, role, 'autorizar') : false;
  });

  canRechazar = computed(() => {
    const role = this.userAppRole();
    return role ? hasPermission(MenuKey.PLAN_MUESTREO, role, 'rechazar') : false;
  });

  constructor(
    private router: Router,
    private reportPlanMuestreoService: ReportPlanMuestreoService,
    private reportFormularioService: ReportFormularioService,
    private planMuestreoService: PlanMuestreoService,
    private alertService: AlertService,
    private toastrAlert: ToastrAlertService,
    private zone: NgZone,
    private store: PlanMuestreoStore,
    private authService: AuthService,
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

  /** Clic en un encabezado: alterna la dirección o cambia de columna. */
  ordenarPor(campo: CampoOrdenPlan): void {
    this.orden = alternarOrden(this.orden, campo, CAMPOS_FECHA_PLAN);
    this.closeMenu();
    this.cargarPlanes(1);
  }

  /** ▲ / ▼ en la columna activa, vacío en el resto. */
  icono(campo: CampoOrdenPlan): string {
    return iconoOrden(this.orden, campo);
  }

  /** Relanza la búsqueda desde la primera página. */
  filtrar(): void {
    this.closeMenu();
    this.cargarPlanes(1);
  }

  cargarPlanes(page = this.currentPage): void {
    this.loading = true;
    this.currentPage = page;
    this.reportPlanMuestreoService
      .getPlanes(page, this.PAGE_SIZE, this.campoBusqueda, this.busqueda, this.orden)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: ({ data, meta }) => {
          this.planes = data;
          this.meta = meta;
          // Si la página quedó vacía al eliminar el último registro, se
          // retrocede a la anterior.
          if (data.length === 0 && page > 1) {
            this.cargarPlanes(page - 1);
            return;
          }
          this.loading = false;
        },
        error: () => {
          this.loading = false;
          this.alertService.error('No se pudo cargar la lista de planes de muestreo');
        },
      });
  }

  irAPagina(page: number): void {
    this.closeMenu();
    this.cargarPlanes(page);
  }

  // ── Menú contextual ──────────────────────────────────────────────────────

  toggleMenu(id: string, event: MouseEvent): void {
    event.stopPropagation();
    this.openMenuId = this.openMenuId === id ? null : id;
  }

  closeMenu(): void {
    this.openMenuId = null;
  }

  abrirHaciaArriba(index: number): boolean {
    return abrirMenuHaciaArriba(index, this.planes.length);
  }

  // ── Acciones ─────────────────────────────────────────────────────────────

  esFinalizado(plan: ReportPlanMuestreo): boolean {
    return plan.ctestado_id === ESTADO_PLAN_FINALIZADO;
  }

  // El catálogo nombra al estado "Finalizado Solicitud", pero en el listado de
  // planes el sufijo no aporta: ya se sabe que la fila es un plan.
  etiquetaEstado(plan: ReportPlanMuestreo): string {
    return this.esFinalizado(plan) ? 'Finalizado' : plan.ctestado_nombre;
  }

  // Un plan finalizado ya está autorizado y tiene PDF: no se elimina, aunque el
  // rol tenga el permiso.
  puedeEliminar(plan: ReportPlanMuestreo): boolean {
    return this.canDelete() && !this.esFinalizado(plan);
  }

  esRechazado(plan: ReportPlanMuestreo): boolean {
    return plan.ctestado_id === ESTADO_PLAN_RECHAZADO;
  }

  /** Autorizar y rechazar son de una sola vía: solo desde un plan sin resolver. */
  private sinResolver(plan: ReportPlanMuestreo): boolean {
    return !this.esFinalizado(plan) && !this.esRechazado(plan);
  }

  puedeAutorizar(plan: ReportPlanMuestreo): boolean {
    return this.canAutorizar() && this.sinResolver(plan);
  }

  puedeRechazar(plan: ReportPlanMuestreo): boolean {
    return this.canRechazar() && this.sinResolver(plan);
  }

  async rechazarPlan(plan: ReportPlanMuestreo): Promise<void> {
    if (!this.puedeRechazar(plan)) return;
    const confirmado = await this.alertService.confirm({
      title: '¿Rechazar plan de muestreo?',
      text: `Se rechazará el plan de la solicitud ${plan.solicitud_num_secuencial ?? plan.id}.`,
      confirmButtonColor: '#d33',
      confirmButtonText: 'Sí, rechazar',
    });
    if (!confirmado) return;

    this.procesandoId = plan.id;
    this.planMuestreoService
      .rechazarPlan(plan.id, ESTADO_PLAN_RECHAZADO)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => {
          this.procesandoId = null;
        }),
      )
      .subscribe({
        next: () =>
          this.zone.run(() => {
            this.toastrAlert.showSuccess('Plan de muestreo rechazado.', '¡Rechazado!');
            this.cargarPlanes();
          }),
        error: () =>
          this.zone.run(() =>
            this.toastrAlert.showError('No se pudo rechazar el plan de muestreo.', 'Error'),
          ),
      });
  }

  async finalizarPlan(plan: ReportPlanMuestreo): Promise<void> {
    const confirmado = await this.alertService.confirm({
      icon: 'question',
      title: '¿Autorizar plan de muestreo?',
      text: `Se autorizará el plan de la solicitud ${plan.solicitud_num_secuencial ?? plan.id}.`,
      confirmButtonColor: '#16a34a',
      confirmButtonText: 'Sí, autorizar',
    });
    if (!confirmado) return;

    this.procesandoId = plan.id;
    this.planMuestreoService
      .finalizarPlan({
        idPlanMuestreo: plan.id,
        identificadorSecuencial: IDENTIFICADOR_SECUENCIAL_PLAN_MUESTREO,
        ctestado: ESTADO_PLAN_FINALIZADO,
      })
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => {
          this.procesandoId = null;
        }),
      )
      .subscribe({
        next: () =>
          this.zone.run(() => {
            this.toastrAlert.showSuccess('Plan de muestreo autorizado.', '¡Autorizado!');
            this.cargarPlanes();
          }),
        error: () =>
          this.zone.run(() =>
            this.toastrAlert.showError('No se pudo autorizar el plan de muestreo.', 'Error'),
          ),
      });
  }

  async eliminarPlan(plan: ReportPlanMuestreo): Promise<void> {
    if (!this.puedeEliminar(plan)) return;
    const confirmado = await this.alertService.confirm({
      title: '¿Eliminar plan de muestreo?',
      text: `Se eliminará el plan de la solicitud ${plan.solicitud_num_secuencial ?? plan.id}. Esta acción no se puede deshacer.`,
      confirmButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
    });
    if (!confirmado) return;

    this.procesandoId = plan.id;
    this.planMuestreoService
      .deshabilitarPlan(plan.id)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => {
          this.procesandoId = null;
        }),
      )
      .subscribe({
        next: () =>
          this.zone.run(() => {
            this.toastrAlert.showSuccess('Plan de muestreo eliminado.', '¡Eliminado!');
            this.cargarPlanes();
          }),
        error: () =>
          this.zone.run(() =>
            this.toastrAlert.showError('No se pudo eliminar el plan de muestreo.', 'Error'),
          ),
      });
  }

  // ── Firma electrónica ────────────────────────────────────────────────────

  /**
   * Firmar depende del estado del documento, no del rol.
   *
   * El backend acepta la firma de cualquier usuario autenticado: lo que
   * acredita la identidad es el certificado .p12, no el perfil en el sistema.
   * Lo que sí exige es que exista el PDF congelado, y eso solo ocurre al
   * autorizar el plan — de ahí la condición.
   */
  puedeFirmar(plan: ReportPlanMuestreo): boolean {
    return this.esFinalizado(plan);
  }

  abrirFirma(plan: ReportPlanMuestreo): void {
    this.closeMenu();

    this.planFirmando = plan;
    this.pdfFirmaBlob = null;
    this.errorFirma = null;
    this.cargandoPdfFirma = true;
    this.procesandoFirma = false;
    this.mostrarModalFirma = true;

    /*
     * Se pide el PDF a api_solicitud y no a api_reportes: este trae el archivo
     * congelado CON las firmas que ya tenga. El de reportes lo regenera y
     * siempre viene sin firmar, así que firmar sobre él perdería las
     * anteriores.
     */
    this.planMuestreoService
      .getPdfDocumento(plan.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (blob) =>
          this.zone.run(() => {
            this.pdfFirmaBlob = blob;
            this.cargandoPdfFirma = false;
          }),
        error: () =>
          this.zone.run(() => {
            this.cargandoPdfFirma = false;
            this.cerrarFirma();
            this.toastrAlert.showError('No se pudo cargar el documento para firmarlo.', 'Error');
          }),
      });
  }

  confirmarFirma(datos: DatosFirmaElectronica): void {
    if (!this.planFirmando || this.procesandoFirma) return;

    const plan = this.planFirmando;
    const usuario = this.authService.currentUser();

    this.errorFirma = null;
    this.procesandoFirma = true;

    this.planMuestreoService
      .firmarPlan(plan.id, {
        ...datos,
        usuarioId: usuario.id,
        nombreFirmante: usuario.nombre,
      })
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => {
          this.procesandoFirma = false;
        }),
      )
      .subscribe({
        next: (respuesta) =>
          this.zone.run(() => {
            this.cerrarFirma();
            this.toastrAlert.showSuccess(
              `El documento quedó con ${respuesta.totalFirmas} firma(s).`,
              '¡Firmado!',
            );
            this.cargarPlanes();
          }),
        error: (error) =>
          this.zone.run(() => {
            this.mostrarErrorDeFirma(error);
          }),
      });
  }

  /**
   * Un error de contraseña o de posición se muestra dentro del modal, junto al
   * paso que hay que corregir: cerrarlo obligaría a volver a cargar el PDF y a
   * reubicar la firma solo por haberse equivocado al teclear. El resto son
   * condiciones del documento que no cambian por reintentar, y esos sí cierran.
   */
  private mostrarErrorDeFirma(error: unknown): void {
    const respuesta = (error as { error?: { message?: string; code?: string } })?.error;

    const mensaje =
      respuesta?.message || 'No se pudo firmar el documento. Revisa el certificado y su contraseña.';

    const campo = respuesta?.code ? this.camposPorCodigoFirma[respuesta.code] : undefined;

    // Sin código no se puede clasificar (típicamente un fallo de red): se deja
    // en el modal como error general, porque reintentar sí tiene sentido.
    if (campo || !respuesta?.code) {
      this.errorFirma = { mensaje, campo: campo ?? 'general' };
      return;
    }

    // `finalize` corre después de este handler, así que la bandera sigue en
    // alto y la guarda de `cerrarFirma()` bloquearía el cierre.
    this.procesandoFirma = false;
    this.cerrarFirma();
    this.toastrAlert.showError(mensaje, 'Error de firma');
  }

  cerrarFirma(): void {
    if (this.procesandoFirma) return;

    this.mostrarModalFirma = false;
    this.cargandoPdfFirma = false;
    this.pdfFirmaBlob = null;
    this.planFirmando = null;
    this.errorFirma = null;
  }

  nombreDocumentoFirma(): string {
    if (!this.planFirmando) return 'plan-muestreo.pdf';
    return `${this.planFirmando.num_secuencial ?? 'plan-muestreo'}.pdf`;
  }

  // ── PDF ──────────────────────────────────────────────────────────────────

  imprimirPlan(plan: ReportPlanMuestreo): void {
    this.showPdfModal = true;
    this.isPdfCargando = true;
    this.pdfPreviewBlob = null;
    this.pdfNombre = `${plan.num_secuencial ?? 'plan-muestreo'}.pdf`;

    /*
     * Imprimir usa el mismo documento que firmar, no una regeneración de
     * api_reportes. Además de verse idénticos, la primera impresión de un plan
     * autorizado es la que archiva el PDF: a partir de ahí ese archivo es el
     * documento oficial y ya no cambia.
     */
    this.planMuestreoService
      .getPdfDocumento(plan.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (blob) =>
          this.zone.run(() => {
            this.pdfPreviewBlob = blob;
            this.isPdfCargando = false;
          }),
        error: () =>
          this.zone.run(() => {
            this.isPdfCargando = false;
            this.toastrAlert.showError('No se pudo cargar el documento PDF.', 'Error');
          }),
      });
  }

  cerrarPdf(): void {
    this.showPdfModal = false;
    this.pdfPreviewBlob = null;
  }

  // El asistente arranca siempre en blanco: se descarta cualquier borrador que
  // haya quedado en memoria de un intento anterior.
  nuevoPlan(): void {
    this.store.limpiar();
    this.router.navigate(['/plan-muestreo/nuevo']);
  }
}
