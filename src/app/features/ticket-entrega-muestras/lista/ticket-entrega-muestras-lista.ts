import { Component, NgZone, OnDestroy, OnInit, computed } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Subject, finalize, takeUntil } from 'rxjs';

import { PageHeader } from '../../../shared/components/page-header/page-header';
import { TableSkeleton } from '../../../ui/table-skeleton/table-skeleton';
import { PaginationComponent } from '../../../shared/components/pagination/pagination';
import { PdfViewerComponent } from '../../../shared/components/pdf-viewer/pdf-viewer';
import { PaginationMeta } from '../../../interfaces/catalogos/catalogo.interface';
import { ReportTicketEntrega } from '../../../interfaces/ticket-entrega-muestras/ticket-entrega-muestras.interface';
import { ReportTicketEntregaService } from '../../../services/solicitudes/ticket-entrega-muestras/report-ticket-entrega.service';
import {
  IDENTIFICADOR_SECUENCIAL_TICKET_ENTREGA,
  TicketEntregaMuestrasService,
} from '../../../services/solicitudes/ticket-entrega-muestras/ticket-entrega-muestras.service';
import { AlertService } from '../../../services/alert.service';
import { ToastrAlertService } from '../../../services/toastr.service';
import { abrirMenuHaciaArriba } from '../../../core/utils/dropdown-position.utils';
import { AppRole, MenuKey, hasPermission } from '../../../core/utils/roles.constans';
import { AuthService } from '../../auth/service/auth-service';
import { ReportFormularioService } from '../../../services/admin-formularios/report-formulario.service';
import { ReportFormulario } from '../../../interfaces/admin-formularios/report-formulario.interface';

// Estados del catálogo "Estado de Registro". El botón dice "Autorizar" pero el
// estado que queda es "Finalizado Solicitud" (2023), no "Autorizado" (387): es
// la convención del plan de muestreo, la entidad padre del ticket. Ver
// plan-muestreo-lista.ts:27 y el CLAUDE.md del backend, sección "Estados del
// flujo". El front lo muestra como "Finalizado" a secas.
const ESTADO_PENDIENTE = 2;
const ESTADO_FINALIZADO = 2023;
const ESTADO_RECHAZADO = 51;

@Component({
  selector: 'app-ticket-entrega-muestras-lista',
  standalone: true,
  imports: [CommonModule, PageHeader, TableSkeleton, PaginationComponent, PdfViewerComponent],
  templateUrl: './ticket-entrega-muestras-lista.html',
  styleUrl: '../ticket-entrega-muestras.css',
})
export class TicketEntregaMuestrasLista implements OnInit, OnDestroy {
  // Ítem de catálogo "Formulario Código de Ticket de Entrega" (catalogo_id 9).
  // La metadata de cabecera sale del API, igual que en plan-muestreo-lista.
  readonly TIPO_FORMULARIO_ID = 2085;
  formulario: ReportFormulario | null = null;
  fechaEmision: Date | null = null;

  loading = true;
  tickets: ReportTicketEntrega[] = [];

  meta: PaginationMeta | null = null;
  currentPage = 1;
  readonly PAGE_SIZE = 10;

  openMenuId: string | null = null;
  procesandoId: string | null = null;

  // ── PDF ──────────────────────────────────────────────────────────────────
  showPdfModal = false;
  isPdfCargando = false;
  pdfPreviewUrl: SafeResourceUrl | null = null;
  private pdfBlobUrl: string | null = null;
  private pdfNombre = 'ticket-entrega.pdf';

  private readonly destroy$ = new Subject<void>();

  private userAppRole = computed<AppRole | null>(() => {
    const roles = this.authService.userProfile()?.roles ?? [];
    return (Object.values(AppRole) as AppRole[]).find((r) => roles.includes(r)) ?? null;
  });

  canCrear = computed(() => {
    const role = this.userAppRole();
    return role ? hasPermission(MenuKey.TICKET_ENTREGA_MUESTRAS, role, 'crear') : false;
  });

  canDelete = computed(() => {
    const role = this.userAppRole();
    return role ? hasPermission(MenuKey.TICKET_ENTREGA_MUESTRAS, role, 'eliminar') : false;
  });

  canAutorizar = computed(() => {
    const role = this.userAppRole();
    return role ? hasPermission(MenuKey.TICKET_ENTREGA_MUESTRAS, role, 'autorizar') : false;
  });

  canRechazar = computed(() => {
    const role = this.userAppRole();
    return role ? hasPermission(MenuKey.TICKET_ENTREGA_MUESTRAS, role, 'rechazar') : false;
  });

  /**
   * ESTANDARES.md §5.1: la columna de acciones solo existe si hay alguna acción.
   * Imprimir no depende del rol — cualquiera que vea el listado puede bajar el
   * PDF de una entrega finalizada — así que también cuenta.
   */
  get hasAnyAction(): boolean {
    return (
      this.canDelete() ||
      this.canAutorizar() ||
      this.canRechazar() ||
      this.tickets.some((t) => this.puedeImprimir(t))
    );
  }

  constructor(
    private router: Router,
    private reportTicketEntregaService: ReportTicketEntregaService,
    private ticketEntregaService: TicketEntregaMuestrasService,
    private alertService: AlertService,
    private toastrAlert: ToastrAlertService,
    private zone: NgZone,
    private authService: AuthService,
    private sanitizer: DomSanitizer,
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

    this.cargarTickets();
  }

  ngOnDestroy(): void {
    this.revocarPdf();
    this.destroy$.next();
    this.destroy$.complete();
  }

  cargarTickets(page = this.currentPage): void {
    this.loading = true;
    this.currentPage = page;
    this.reportTicketEntregaService
      .getTickets(page, this.PAGE_SIZE)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: ({ data, meta }) => {
          this.tickets = data;
          this.meta = meta;
          // Si la página quedó vacía al dar de baja el último registro, se
          // retrocede a la anterior.
          if (data.length === 0 && page > 1) {
            this.cargarTickets(page - 1);
            return;
          }
          this.loading = false;
        },
        error: () => {
          this.loading = false;
          this.alertService.error('No se pudo cargar la lista de tickets de entrega');
        },
      });
  }

  irAPagina(page: number): void {
    this.closeMenu();
    this.cargarTickets(page);
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
    return abrirMenuHaciaArriba(index, this.tickets.length);
  }

  // ── Acciones ─────────────────────────────────────────────────────────────

  /** Etiqueta principal de la fila, para los mensajes de confirmación. */
  etiquetaTicket(ticket: ReportTicketEntrega): string {
    return ticket.num_secuencial ?? ticket.plan_num_secuencial ?? ticket.id;
  }

  // ── Estado del flujo ─────────────────────────────────────────────────────

  esPendiente(ticket: ReportTicketEntrega): boolean {
    return ticket.ctestado_id === ESTADO_PENDIENTE;
  }

  esFinalizado(ticket: ReportTicketEntrega): boolean {
    return ticket.ctestado_id === ESTADO_FINALIZADO;
  }

  esRechazado(ticket: ReportTicketEntrega): boolean {
    return ticket.ctestado_id === ESTADO_RECHAZADO;
  }

  // El catálogo lo nombra "Finalizado Solicitud", pero en el listado de tickets
  // el sufijo no aporta: ya se sabe que la fila es un ticket. Mismo criterio que
  // plan-muestreo-lista.ts.
  etiquetaEstado(ticket: ReportTicketEntrega): string {
    if (this.esFinalizado(ticket)) return 'Finalizado';
    return ticket.ctestado_nombre ?? 'Pendiente';
  }

  /** Un ticket ya resuelto no se vuelve a autorizar ni a rechazar. */
  puedeAutorizar(ticket: ReportTicketEntrega): boolean {
    return this.canAutorizar() && this.esPendiente(ticket);
  }

  puedeRechazar(ticket: ReportTicketEntrega): boolean {
    return this.canRechazar() && this.esPendiente(ticket);
  }

  // Un ticket finalizado ya fue aceptado por el laboratorio: no se elimina,
  // aunque el rol tenga el permiso. Mismo criterio que plan-muestreo.
  puedeEliminar(ticket: ReportTicketEntrega): boolean {
    return this.canDelete() && !this.esFinalizado(ticket);
  }

  // ── Autorizar / Rechazar ─────────────────────────────────────────────────

  async autorizarTicket(ticket: ReportTicketEntrega): Promise<void> {
    if (!this.puedeAutorizar(ticket)) return;
    const confirmado = await this.alertService.confirm({
      icon: 'question',
      title: '¿Autorizar ticket de entrega?',
      text: `Se autorizará la entrega de ${this.etiquetaTicket(ticket)}.`,
      confirmButtonColor: '#16a34a',
      confirmButtonText: 'Sí, autorizar',
    });
    if (!confirmado) return;

    this.procesandoId = ticket.id;
    this.ticketEntregaService
      .autorizarTicketEntrega(ticket.id, IDENTIFICADOR_SECUENCIAL_TICKET_ENTREGA)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => {
          this.procesandoId = null;
        }),
      )
      .subscribe({
        next: () =>
          this.zone.run(() => {
            this.toastrAlert.showSuccess('Ticket de entrega autorizado.', '¡Autorizado!');
            this.cargarTickets();
          }),
        error: () =>
          this.zone.run(() =>
            this.toastrAlert.showError('No se pudo autorizar el ticket de entrega.', 'Error'),
          ),
      });
  }

  async rechazarTicket(ticket: ReportTicketEntrega): Promise<void> {
    if (!this.puedeRechazar(ticket)) return;
    // El backend exige `motivo_rechazo` (400 si falta), así que se pide acá.
    const motivo = await this.alertService.prompt({
      title: '¿Rechazar ticket de entrega?',
      text: `Se rechazará la entrega de ${this.etiquetaTicket(ticket)}.`,
      inputPlaceholder: 'Motivo del rechazo',
      maxLength: 500,
      requiredMessage: 'El motivo del rechazo es obligatorio',
      confirmButtonColor: '#d33',
      confirmButtonText: 'Sí, rechazar',
    });
    if (!motivo) return;

    this.procesandoId = ticket.id;
    this.ticketEntregaService
      .rechazarTicketEntrega(ticket.id, motivo)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => {
          this.procesandoId = null;
        }),
      )
      .subscribe({
        next: () =>
          this.zone.run(() => {
            this.toastrAlert.showSuccess('Ticket de entrega rechazado.', '¡Rechazado!');
            this.cargarTickets();
          }),
        error: () =>
          this.zone.run(() =>
            this.toastrAlert.showError('No se pudo rechazar el ticket de entrega.', 'Error'),
          ),
      });
  }

  async eliminarTicket(ticket: ReportTicketEntrega): Promise<void> {
    if (!this.puedeEliminar(ticket)) return;
    const confirmado = await this.alertService.confirm({
      title: '¿Eliminar ticket de entrega?',
      text: `Se eliminará el ticket de ${this.etiquetaTicket(ticket)}. Esta acción no se puede deshacer.`,
      confirmButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
    });
    if (!confirmado) return;

    this.procesandoId = ticket.id;
    this.ticketEntregaService
      .deshabilitarTicketEntrega(ticket.id)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => {
          this.procesandoId = null;
        }),
      )
      .subscribe({
        next: () =>
          this.zone.run(() => {
            this.toastrAlert.showSuccess('Ticket de entrega eliminado.', '¡Eliminado!');
            this.cargarTickets();
          }),
        error: () =>
          this.zone.run(() =>
            this.toastrAlert.showError('No se pudo eliminar el ticket de entrega.', 'Error'),
          ),
      });
  }

  nuevoTicket(): void {
    this.router.navigate(['/ticket-entrega-muestras/nuevo']);
  }

  // ── PDF ──────────────────────────────────────────────────────────────────

  /**
   * Solo se imprime una entrega finalizada: el backend rechaza con 400 un
   * ticket pendiente o rechazado, así que la opción tampoco se ofrece.
   */
  puedeImprimir(ticket: ReportTicketEntrega): boolean {
    return this.esFinalizado(ticket);
  }

  imprimirTicket(ticket: ReportTicketEntrega): void {
    if (!this.puedeImprimir(ticket)) return;

    this.showPdfModal = true;
    this.isPdfCargando = true;
    this.pdfPreviewUrl = null;
    this.revocarPdf();
    this.pdfNombre = `${this.etiquetaTicket(ticket)}.pdf`;

    this.ticketEntregaService
      .getPdfTicketEntrega(ticket.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (blob) =>
          this.zone.run(() => {
            this.pdfBlobUrl = URL.createObjectURL(blob);
            this.pdfPreviewUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.pdfBlobUrl);
            this.isPdfCargando = false;
          }),
        error: () =>
          this.zone.run(() => {
            this.showPdfModal = false;
            this.isPdfCargando = false;
            this.toastrAlert.showError('No se pudo cargar el documento PDF.', 'Error');
          }),
      });
  }

  cerrarPdf(): void {
    this.showPdfModal = false;
    this.pdfPreviewUrl = null;
    this.revocarPdf();
  }

  descargarPdf(): void {
    if (!this.pdfBlobUrl) return;
    const a = document.createElement('a');
    a.href = this.pdfBlobUrl;
    a.download = this.pdfNombre;
    a.click();
  }

  private revocarPdf(): void {
    if (!this.pdfBlobUrl) return;
    URL.revokeObjectURL(this.pdfBlobUrl);
    this.pdfBlobUrl = null;
  }
}
