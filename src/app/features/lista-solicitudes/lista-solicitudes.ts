import { Component, NgZone, OnDestroy, OnInit, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, takeUntil, firstValueFrom } from 'rxjs';

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

const ESTADO_PENDIENTE = 2;
const ESTADO_AUTORIZADO = 387;

@Component({
  selector: 'app-lista-solicitudes',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    PaginationComponent,
    PageHeader,
    TableSkeleton,
    PdfViewerComponent,
  ],
  templateUrl: './lista-solicitudes.html',
  styleUrls: ['./lista-solicitudes.css'],
})
export class ListaSolicitudes implements OnInit, OnDestroy {
  // ── Firma ────────────────────────────────────────────────────────────────
  viewingSignature = false;
  selectedDoc: ReportSolicitud | null = null;
  archivoFirma: File | null = null;
  claveFirma = '';
  isFirmando = false;

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
  esAutorizado(doc: ReportSolicitud): boolean {
    return doc.ctestado_id === ESTADO_AUTORIZADO;
  }

  imprimirSolicitud(doc: ReportSolicitud): void {
    if (!this.esAutorizado(doc)) return;
    this.showPdfModal = true;
    this.isPdfCargando = true;
    this.pdfPreviewBlob = null;
    this.pdfNombre = `${doc.num_secuencial ?? 'solicitud'}.pdf`;

    this.solicitudService
      .getPdfSolicitud(doc.id_solicitud)
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

  abrirPanelFirma(doc: ReportSolicitud): void {
    this.selectedDoc = doc;
    this.archivoFirma = null;
    this.claveFirma = '';
    this.viewingSignature = true;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  regresarLista(): void {
    this.viewingSignature = false;
    this.selectedDoc = null;
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) return;
    const file = input.files[0];
    if (file.name.toLowerCase().endsWith('.p12')) {
      this.archivoFirma = file;
    } else {
      this.alertService.warning(
        'Solo se aceptan certificados digitales en formato .p12',
        'Archivo no válido',
        undefined,
        this.COLOR_PRIMARIO,
      );
      input.value = '';
      this.archivoFirma = null;
    }
  }

  ejecutarFirma(): void {
    if (!this.archivoFirma || !this.claveFirma) {
      this.alertService.warning(
        'Por favor cargue su certificado .p12 e ingrese la contraseña para firmar.',
        'Datos Incompletos',
        undefined,
        this.COLOR_PRIMARIO,
      );
      return;
    }

    this.isFirmando = true;
    setTimeout(async () => {
      this.isFirmando = false;
      await this.alertService.successAutoClose(
        `El documento ${this.selectedDoc?.num_secuencial ?? this.selectedDoc?.id_solicitud} ha sido firmado electrónicamente con éxito.`,
        '¡Documento Firmado!',
        3000,
        this.COLOR_PRIMARIO,
      );
      this.regresarLista();
    }, 1500);
  }
}
