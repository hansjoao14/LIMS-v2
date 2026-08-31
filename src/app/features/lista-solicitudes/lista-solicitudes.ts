import { Component, NgZone, OnDestroy, OnInit, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Subject, finalize, takeUntil, firstValueFrom } from 'rxjs';

import { ReportSolicitudService } from '../../services/solicitudes/lista-solicitudes/report-solicitud.service';
import { SolicitudService } from '../../services/solicitudes/solicitud-trabajo/solicitud-trabajo.service';
import { ReportFormularioService } from '../../services/admin-formularios/report-formulario.service';
import { ReportSolicitud } from '../../interfaces/solicitudes/lista-solicitudes/report-solicitud.interface';
import { ReportFormulario } from '../../interfaces/admin-formularios/report-formulario.interface';
import { PaginationMeta } from '../../interfaces/catalogos/catalogo.interface';
import { PaginationComponent } from '../../shared/components/pagination/pagination';
import { AuthService } from '../auth/service/auth-service';
import { AppRole, MenuKey, hasPermission } from '../../core/utils/roles.constans';
import { PageHeader } from '../../shared/components/page-header/page-header';
import { TableSkeleton } from '../../ui/table-skeleton/table-skeleton';
import { AlertService } from '../../services/alert.service';
import { ToastrAlertService } from '../../services/toastr.service';
import { abrirMenuHaciaArriba } from '../../core/utils/dropdown-position.utils';
import { PdfViewerComponent } from '../../shared/components/pdf-viewer/pdf-viewer';
import { FirmaElectronicaComponent } from '../../shared/components/firma-electronica/firma-electronica';
import {
  CampoFirmaElectronica,
  DatosFirmaElectronica,
  ErrorFirmaElectronica,
} from '../../interfaces/documentos/firma-electronica.interface';

const ESTADO_PENDIENTE = 2;
const ESTADO_AUTORIZADO = 387;

@Component({
  selector: 'app-lista-solicitudes',
  standalone: true,
  imports: [
    CommonModule,
    PaginationComponent,
    PageHeader,
    TableSkeleton,
    PdfViewerComponent,
    FirmaElectronicaComponent,
  ],
  templateUrl: './lista-solicitudes.html',
  styleUrls: ['./lista-solicitudes.css'],
})
export class ListaSolicitudes implements OnInit, OnDestroy {
  // ── Firma electrónica ────────────────────────────────────────────────────
  // El modal es el compartido (`shared/components/firma-electronica`), no una
  // copia dentro del feature: acá solo vive su estado.
  mostrarModalFirma = false;
  cargandoPdfFirma = false;
  procesandoFirma = false;
  selectedDoc: ReportSolicitud | null = null;
  pdfFirmaBlob: Blob | null = null;
  errorFirma: ErrorFirmaElectronica | null = null;

  /**
   * Códigos que el firmador devuelve para algo que el usuario puede corregir
   * sin salir del modal, y el paso al que corresponde cada uno. Lo que no está
   * acá (solicitud sin autorizar, PDF ausente, fallo del firmador) no se
   * arregla reintentando: eso cierra el modal y se avisa por toast.
   */
  private readonly camposPorCodigoFirma: Record<string, CampoFirmaElectronica> = {
    CERTIFICADO_INVALIDO: 'password',
    PASSWORD_REQUERIDA: 'password',
    CERTIFICADO_VACIO: 'certificado',
    POSICION_FIRMA_INVALIDA: 'posicion',
  };

  // ── Formulario metadata ──────────────────────────────────────────────────
  formulario: ReportFormulario | null = null;
  fechaEmision: Date | null = null;

  // ── Lista ────────────────────────────────────────────────────────────────
  solicitudes: ReportSolicitud[] = [];
  meta: PaginationMeta | null = null;
  loading = true;
  cargandoEdicionId: string | null = null;
  openMenuId: string | null = null;
  currentPage = 1;
  readonly PAGE_SIZE = 10;

  // ── Visor de PDF ─────────────────────────────────────────────────────────
  showPdfModal = false;
  isPdfCargando = false;
  pdfPreviewBlob: Blob | null = null;
  pdfNombre = 'solicitud.pdf';

  readonly COLOR_PRIMARIO = '#1d2b64';
  readonly fechaActual = new Date();
  private readonly destroy$ = new Subject<void>();

  // ── Permisos ─────────────────────────────────────────────────────────────
  private userAppRole = computed<AppRole | null>(() => {
    const roles = this.authService.userProfile()?.roles ?? [];
    return (Object.values(AppRole) as AppRole[]).find((r) => roles.includes(r)) ?? null;
  });

  canEdit = computed(() => {
    const role = this.userAppRole();
    return role ? hasPermission(MenuKey.LISTA_SOLICITUDES, role, 'editar') : false;
  });

  canDelete = computed(() => {
    const role = this.userAppRole();
    return role ? hasPermission(MenuKey.LISTA_SOLICITUDES, role, 'eliminar') : false;
  });

  canFirmar = computed(() => this.userAppRole() === AppRole.RESPONSABLE_LAB);

  constructor(
    private reportSolicitudService: ReportSolicitudService,
    private solicitudService: SolicitudService,
    private reportFormularioService: ReportFormularioService,
    private router: Router,
    public authService: AuthService,
    private alertService: AlertService,
    private toastrAlert: ToastrAlertService,
    private zone: NgZone,
  ) {}

  ngOnInit(): void {
    this.cargarFormulario();
    this.cargarPagina(1);
  }

  cargarFormulario(): void {
    this.reportFormularioService
      .getFormularioByCTId(380)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (formulario) => {
          this.formulario = formulario;
          if (formulario?.fecha_emision) {
            this.fechaEmision = new Date(Number(formulario.fecha_emision));
          }
        },
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  // ── Menú de acciones ─────────────────────────────────────────────────────

  toggleMenu(id: string, event: MouseEvent): void {
    event.stopPropagation();
    this.openMenuId = this.openMenuId === id ? null : id;
  }

  closeMenu(): void {
    this.openMenuId = null;
  }

  abrirHaciaArriba(index: number): boolean {
    return abrirMenuHaciaArriba(index, this.solicitudes.length);
  }

  puedeEditar(doc: ReportSolicitud): boolean {
    return doc.ctestado_id === ESTADO_PENDIENTE && this.canEdit();
  }

  // Firmar es la acción primaria: queda como botón directo, fuera del menú.
  puedeFirmar(doc: ReportSolicitud): boolean {
    return doc.ctestado_id === ESTADO_AUTORIZADO && this.canFirmar();
  }

  tieneMenu(doc: ReportSolicitud): boolean {
    return this.puedeEditar(doc) || this.canDelete() || this.esAutorizado(doc);
  }

  // ── Impresión ────────────────────────────────────────────────────────────

  // El PDF solo tiene sentido una vez autorizada la solicitud.
  /**
   * El PDF nace al autorizar, así que una solicitud pendiente no tiene qué
   * imprimir ni qué firmar. También se exige que esté vigente: sobre una dada
   * de baja el backend responde `SOLICITUD_DADA_DE_BAJA`.
   */
  esAutorizado(doc: ReportSolicitud): boolean {
    return doc.ctestado_id === ESTADO_AUTORIZADO && doc.estado_logico_solicitud === true;
  }

  imprimirSolicitud(doc: ReportSolicitud): void {
    if (!this.esAutorizado(doc)) return;
    this.showPdfModal = true;
    this.isPdfCargando = true;
    this.pdfPreviewBlob = null;
    this.pdfNombre = `${doc.num_secuencial ?? 'solicitud'}.pdf`;

    /*
     * El PDF congelado, no el preview de `api_reportes`. Desde que el módulo
     * firma, imprimir tiene que devolver el mismo archivo que se firmó, con las
     * firmas estampadas; el de reportes lo regenera y saldría siempre sin
     * firmar. (CLAUDE.md, "Imprimir un documento": cuál de los dos PDF pedir.)
     */
    this.solicitudService
      .getPdfDocumentoSolicitud(doc.id_solicitud)
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

  cargarPagina(page: number): void {
    this.loading = true;
    this.currentPage = page;
    this.reportSolicitudService
      .getSolicitudes(page, this.PAGE_SIZE)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: ({ data, meta }) => {
          this.solicitudes = data;
          this.meta = meta;
          this.loading = false;
        },
        error: () => {
          this.loading = false;
          this.alertService.error('No se pudo cargar la lista de solicitudes');
        },
      });
  }

  // ── Firma ────────────────────────────────────────────────────────────────

  editarSolicitud(doc: ReportSolicitud): void {
    this.cargandoEdicionId = doc.id_solicitud;
    this.reportSolicitudService
      .getSolicitudById(doc.id_solicitud)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (solicitud) => {
          this.cargandoEdicionId = null;
          if (!solicitud) {
            this.alertService.error('No se encontró la solicitud');
            return;
          }
          this.router.navigate(['/solicitud-trabajo'], { state: { solicitud } });
        },
        error: () => {
          this.cargandoEdicionId = null;
          this.alertService.error('No se pudo cargar la solicitud');
        },
      });
  }

  async eliminarSolicitud(doc: ReportSolicitud): Promise<void> {
    const confirmado = await this.alertService.confirm({
      title: '¿Eliminar solicitud?',
      text: `Se eliminará la solicitud${doc.num_secuencial ? ' ' + doc.num_secuencial : ''}. Esta acción no se puede deshacer.`,
      confirmButtonColor: '#dc2626',
      cancelButtonColor: '#64748b',
      confirmButtonText: 'Sí, eliminar',
    });

    if (!confirmado) return;

    try {
      await firstValueFrom(this.solicitudService.eliminarSolicitudById(doc.id_solicitud));
      this.alertService.successAutoClose(
        'La solicitud fue eliminada.',
        '¡Eliminado!',
        2000,
        this.COLOR_PRIMARIO,
      );
      this.cargarPagina(this.currentPage);
    } catch {
      this.alertService.error('No se pudo eliminar la solicitud.');
    }
  }

  // ── Firma electrónica ────────────────────────────────────────────────────

  abrirFirma(doc: ReportSolicitud): void {
    if (!this.puedeFirmar(doc)) return;

    this.selectedDoc = doc;
    this.pdfFirmaBlob = null;
    this.errorFirma = null;
    this.cargandoPdfFirma = true;
    this.procesandoFirma = false;
    this.mostrarModalFirma = true;

    /*
     * El mismo PDF que se imprime: el congelado, que trae las firmas ya
     * estampadas. Regenerarlo perdería las anteriores.
     */
    this.solicitudService
      .getPdfDocumentoSolicitud(doc.id_solicitud)
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
    if (!this.selectedDoc || this.procesandoFirma) return;

    const doc = this.selectedDoc;
    const usuario = this.authService.currentUser();

    this.errorFirma = null;
    this.procesandoFirma = true;

    this.solicitudService
      .firmarSolicitud(doc.id_solicitud, {
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
      respuesta?.message ||
      'No se pudo firmar el documento. Revisa el certificado y su contraseña.';

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
    this.selectedDoc = null;
    this.errorFirma = null;
  }

  nombreDocumentoFirma(): string {
    return `${this.selectedDoc?.num_secuencial ?? 'solicitud'}.pdf`;
  }
}
