import {
  Component,
  OnInit,
  OnDestroy,
  Output,
  EventEmitter,
  NgZone,
  computed,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject, takeUntil, finalize } from 'rxjs';
import { ReportOrdenService } from '../../../services/solicitudes/orden-trabajo/report-orden.service';
import {
  OrdenTrabajoService,
  FinalizarOrdenPayload,
} from '../../../services/solicitudes/orden-trabajo/orden-trabajo.service';
import { ReportOrden } from '../../../interfaces/solicitudes/orden-trabajo/report-orden.interface';
import { AuthService } from '../../auth/service/auth-service';
import { ToastrAlertService } from '../../../services/toastr.service';
import { AlertService } from '../../../services/alert.service';
import { AppRole, MenuKey, hasPermission } from '../../../core/utils/roles.constans';
import { abrirMenuHaciaArriba } from '../../../core/utils/dropdown-position.utils';
import { TableSkeleton } from '../../../ui/table-skeleton/table-skeleton';
import { PaginationComponent } from '../../../shared/components/pagination/pagination';
import { PdfViewerComponent } from '../../../shared/components/pdf-viewer/pdf-viewer';
import { PaginationMeta } from '../../../interfaces/catalogos/catalogo.interface';

const ESTADO_FINALIZADO = 2023;
// Las órdenes creadas antes del cambio de catálogo quedaron con el estado 3
// ("Finalizado"); se siguen reconociendo como finalizadas para no ofrecer
// autorizarlas de nuevo.
const ESTADOS_FINALIZADOS = [ESTADO_FINALIZADO, 3];

@Component({
  selector: 'app-orden-trabajo-in-situ-lista',
  imports: [CommonModule, TableSkeleton, PaginationComponent, PdfViewerComponent],
  templateUrl: './orden-trabajo-in-situ-lista.html',
})
export class OrdenTrabajoInSituLista implements OnInit, OnDestroy {
  @Output() nuevaOrden = new EventEmitter<void>();
  // La tabla ya no ofrece "Editar", pero el flujo de edición del formulario
  // sigue cableado: basta con volver a emitir este evento para reactivarlo.
  @Output() editar = new EventEmitter<ReportOrden>();

  loading = true;
  ordenes: ReportOrden[] = [];

  // Paginación del lado del servidor (meta de collectionReportOrden).
  meta: PaginationMeta | null = null;
  currentPage = 1;
  readonly PAGE_SIZE = 10;

  openMenuId: string | null = null;
  procesandoId: string | null = null;

  showPdfModal = false;
  isPdfCargando = false;
  pdfPreviewBlob: Blob | null = null;
  pdfNombre = 'orden-trabajo.pdf';

  private readonly destroy$ = new Subject<void>();

  private userAppRole = computed<AppRole | null>(() => {
    const roles = this.authService.userProfile()?.roles ?? [];
    return (Object.values(AppRole) as AppRole[]).find((r) => roles.includes(r)) ?? null;
  });

  canFinalizar = computed(() => {
    const role = this.userAppRole();
    return role ? hasPermission(MenuKey.ORDEN_TRABAJO_IN_SITU, role, 'autorizar') : false;
  });

  canDelete = computed(() => {
    const role = this.userAppRole();
    return role ? hasPermission(MenuKey.ORDEN_TRABAJO_IN_SITU, role, 'eliminar') : false;
  });

  constructor(
    private reportOrdenService: ReportOrdenService,
    private ordenTrabajoService: OrdenTrabajoService,
    private authService: AuthService,
    private zone: NgZone,
    private toastrAlert: ToastrAlertService,
    private alertService: AlertService,
  ) {}

  ngOnInit(): void {
    this.cargarOrdenes();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  cargarOrdenes(page = this.currentPage): void {
    this.loading = true;
    this.currentPage = page;
    this.reportOrdenService
      .getOrdenes(page, this.PAGE_SIZE)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: ({ data, meta }) => {
          this.ordenes = data;
          this.meta = meta;
          // Si la página quedó vacía al eliminar el último registro, se
          // retrocede a la anterior.
          if (data.length === 0 && page > 1) {
            this.cargarOrdenes(page - 1);
            return;
          }
          this.loading = false;
        },
        error: () => {
          this.loading = false;
        },
      });
  }

  irAPagina(page: number): void {
    this.closeMenu();
    this.cargarOrdenes(page);
  }

  toggleMenu(id: string, event: MouseEvent): void {
    event.stopPropagation();
    this.openMenuId = this.openMenuId === id ? null : id;
  }

  closeMenu(): void {
    this.openMenuId = null;
  }

  abrirHaciaArriba(index: number): boolean {
    return abrirMenuHaciaArriba(index, this.ordenes.length);
  }

  esFinalizado(orden: ReportOrden): boolean {
    return ESTADOS_FINALIZADOS.includes(orden.ctestado_id);
  }

  /**
   * Identificador con el que `sp_generar_secuencial_orden` busca la fila de
   * PARAMETRIZACION.PARA_SECUENCIAL (columna `identificador_secu`).
   *
   * Los valores van tal cual están configurados en la base — ojo con que uno
   * lleva guion y el otro guion bajo. Si no coincide, el SP corta con
   * "No existe un secuencial configurado para el identificador indicado".
   */
  private getIdentificadorSecuencial(orden: ReportOrden): string {
    const nombre = (orden.ctambiente_nombre ?? '').toLowerCase();
    return nombre.includes('ruido') ? 'OTIS-Ruido' : 'OTIS_Emision';
  }

  async finalizarOrden(orden: ReportOrden): Promise<void> {
    const confirmado = await this.alertService.confirm({
      icon: 'question',
      title: '¿Autorizar orden?',
      text: `Se autorizará la orden ${orden.num_secuencial ?? orden.id}.`,
      confirmButtonColor: '#16a34a',
      confirmButtonText: 'Sí, autorizar',
    });
    if (!confirmado) return;
    this.procesandoId = orden.id;
    const payload: FinalizarOrdenPayload = {
      idOrden: orden.id,
      identifcadorSecuecnial: this.getIdentificadorSecuencial(orden),
      ctestado: ESTADO_FINALIZADO,
    };
    this.ordenTrabajoService
      .autorizarOrden(payload)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => {
          this.procesandoId = null;
        }),
      )
      .subscribe({
        next: () =>
          this.zone.run(() => {
            this.toastrAlert.showSuccess('Orden autorizada correctamente.', '¡Autorizado!');
            this.cargarOrdenes();
          }),
        error: () =>
          this.zone.run(() =>
            this.toastrAlert.showError('No se pudo autorizar la orden.', 'Error'),
          ),
      });
  }

  async eliminarOrden(orden: ReportOrden): Promise<void> {
    const confirmado = await this.alertService.confirm({
      title: '¿Eliminar orden?',
      text: `Se eliminará la orden ${orden.num_secuencial ?? orden.id}. Esta acción no se puede deshacer.`,
      confirmButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
    });
    if (!confirmado) return;
    this.procesandoId = orden.id;
    this.ordenTrabajoService
      .deshabilitarOrden(orden.id)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => {
          this.procesandoId = null;
        }),
      )
      .subscribe({
        next: () =>
          this.zone.run(() => {
            this.toastrAlert.showSuccess('Orden eliminada correctamente.', '¡Eliminado!');
            this.cargarOrdenes();
          }),
        error: () =>
          this.zone.run(() => this.toastrAlert.showError('No se pudo eliminar la orden.', 'Error')),
      });
  }

  /**
   * Solo se imprime una orden autorizada: hasta entonces sigue en edición y su
   * PDF no es el documento definitivo, así que la opción tampoco se ofrece.
   */
  puedeImprimir(orden: ReportOrden): boolean {
    return this.esFinalizado(orden);
  }

  imprimirOrden(orden: ReportOrden): void {
    if (!this.puedeImprimir(orden)) return;

    this.showPdfModal = true;
    this.isPdfCargando = true;
    this.pdfPreviewBlob = null;
    this.pdfNombre = `${orden.num_secuencial ?? 'orden-trabajo'}.pdf`;

    this.ordenTrabajoService
      .getPdfOrden(orden.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (blob) =>
          this.zone.run(() => {
            this.pdfPreviewBlob = blob;
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
    this.pdfPreviewBlob = null;
  }
}
