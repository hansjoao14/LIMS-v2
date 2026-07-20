import {
  Component,
  EventEmitter,
  Input,
  NgZone,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  computed,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Subject, takeUntil, firstValueFrom, forkJoin, finalize } from 'rxjs';
import { AppRole, MenuKey, hasPermission } from '../../../core/utils/roles.constans';
import { abrirMenuHaciaArriba } from '../../../core/utils/dropdown-position.utils';
import { ToastrAlertService } from '../../../services/toastr.service';
import { AlertService } from '../../../services/alert.service';
import { SolicitudService } from '../../../services/solicitudes/solicitud-trabajo/solicitud-trabajo.service';
import { ReportSolicitudService } from '../../../services/solicitudes/lista-solicitudes/report-solicitud.service';
import {
  ReportSolicitud,
  ReportValorSolicitud,
} from '../../../interfaces/solicitudes/lista-solicitudes/report-solicitud.interface';
import { FieldConfig } from '../../solicitud-trabajo/model/solicitud-trabajo.model';
import { AuthService } from '../../auth/service/auth-service';
import { PaginationComponent } from '../../../shared/components/pagination/pagination';
import { PdfViewerComponent } from '../../../shared/components/pdf-viewer/pdf-viewer';
import { PaginationMeta } from '../../../interfaces/catalogos/catalogo.interface';
import { TableSkeleton } from '../../../ui/table-skeleton/table-skeleton';

const ESTADO_AUTORIZADO = 387;
const ESTADO_RECHAZADO = 51;

type VehiculoRecord = { id: string } & Record<string, unknown>;

@Component({
  selector: 'app-horarios-laborales-lista',
  imports: [CommonModule, PaginationComponent, PdfViewerComponent, TableSkeleton],
  templateUrl: './horarios-laborales-lista.html',
})
export class HorariosLaboralesLista implements OnInit, OnChanges, OnDestroy {
  @Input() formularioId: string | null = null;
  @Input() fields: FieldConfig[] = [];
  @Input() editingRecordId: string | null = null;
  @Output() editar = new EventEmitter<VehiculoRecord>();

  private todasSolicitudes: VehiculoRecord[] = [];
  solicitudes: VehiculoRecord[] = [];
  metaTabla: PaginationMeta | null = null;
  currentPage = 1;
  loadingTabla = false;
  readonly PAGE_SIZE = 10;

  showPdfModal = false;
  isPdfCargando = false;
  pdfPreviewUrl: SafeResourceUrl | null = null;
  private pdfBlobUrl: string | null = null;

  openMenuId: string | null = null;

  procesandoId: string | null = null;

  private userAppRole = computed<AppRole | null>(() => {
    const roles = this.authService.userProfile()?.roles ?? [];
    return (Object.values(AppRole) as AppRole[]).find((r) => roles.includes(r)) ?? null;
  });

  canEdit = computed(() => {
    const role = this.userAppRole();
    return role ? hasPermission(MenuKey.HORARIOS_LABORALES, role, 'editar') : false;
  });

  canDelete = computed(() => {
    const role = this.userAppRole();
    return role ? hasPermission(MenuKey.HORARIOS_LABORALES, role, 'eliminar') : false;
  });

  canAutorizar = computed(() => {
    const role = this.userAppRole();
    return role ? hasPermission(MenuKey.HORARIOS_LABORALES, role, 'autorizar') : false;
  });

  canRechazar = computed(() => {
    const role = this.userAppRole();
    return role ? hasPermission(MenuKey.HORARIOS_LABORALES, role, 'rechazar') : false;
  });

  get hasAnyAction(): boolean {
    return this.canEdit() || this.canDelete() || this.canAutorizar() || this.canRechazar();
  }

  private readonly destroy$ = new Subject<void>();

  constructor(
    private reportSolicitudService: ReportSolicitudService,
    private solicitudService: SolicitudService,
    private authService: AuthService,
    private zone: NgZone,
    private toastrAlert: ToastrAlertService,
    private sanitizer: DomSanitizer,
    private alertService: AlertService,
  ) {}

  ngOnInit(): void {
    if (this.formularioId) {
      this.cargarDatos();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['formularioId']?.currentValue && !changes['formularioId'].isFirstChange()) {
      this.cargarDatos();
    }
  }

  ngOnDestroy(): void {
    if (this.pdfBlobUrl) {
      URL.revokeObjectURL(this.pdfBlobUrl);
    }
    this.destroy$.next();
    this.destroy$.complete();
  }

  toggleMenu(id: string, event: MouseEvent): void {
    event.stopPropagation();
    this.openMenuId = this.openMenuId === id ? null : id;
  }

  closeMenu(): void {
    this.openMenuId = null;
  }

  // Usa _flatIdx (índice plano ya calculado en agruparPorDia) en vez del
  // índice del @for anidado por grupo.
  abrirHaciaArriba(flatIdx: number): boolean {
    return abrirMenuHaciaArriba(flatIdx, this.solicitudes.length);
  }

  cargarDatos(): void {
    if (!this.formularioId) return;
    this.loadingTabla = true;
    forkJoin([
      this.reportSolicitudService.getValoresByTipoFormulario(1002),
      this.reportSolicitudService.getSolicitudesByFormulario(this.formularioId),
    ])
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: ([valores, solicitudes]) => {
          this.zone.run(() => {
            const estadoMap = new Map(solicitudes.map((s) => [s.id_solicitud, s]));
            const records = this.agruparPorSolicitud(valores);
            for (const r of records) {
              const s = estadoMap.get(r.id);
              if (s) {
                r['ctestado_id'] = s.ctestado_id;
                r['estado_solicitud'] = s.estado_solicitud;
                r['_solicitud'] = s;
              }
            }
            this.todasSolicitudes = records;
            this.irAPagina(1);
            this.loadingTabla = false;
          });
        },
        error: () => {
          this.zone.run(() => {
            this.loadingTabla = false;
            this.toastrAlert.showError('No se pudo cargar el cronograma.', 'Error');
          });
        },
      });
  }

  irAPagina(page: number): void {
    this.currentPage = page;
    const start = (page - 1) * this.PAGE_SIZE;
    this.solicitudes = this.todasSolicitudes.slice(start, start + this.PAGE_SIZE);
    const total = this.todasSolicitudes.length;
    const totalPages = Math.ceil(total / this.PAGE_SIZE);
    this.metaTabla = {
      page,
      total,
      totalPages,
      limit: this.PAGE_SIZE,
      skip: start,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1,
      nextPage: page < totalPages ? page + 1 : null,
      prevPage: page > 1 ? page - 1 : null,
    };
  }

  private agruparPorSolicitud(items: ReportValorSolicitud[]): VehiculoRecord[] {
    const grouped = new Map<string, VehiculoRecord>();
    for (const item of items) {
      if (!grouped.has(item.id_solicitud)) {
        grouped.set(item.id_solicitud, {
          id: item.id_solicitud,
          nombres_completos: item.nombres_completos,
          fecha_creacion: item.fecha_creacion,
        });
      }
      const record = grouped.get(item.id_solicitud)!;
      const esSeleccion = item.ctipo_dato_nombre === 'Selección Simple';
      const valor =
        (esSeleccion && item.valor_catalogo != null ? Number(item.valor_catalogo) || null : null) ??
        item.valor_texto ??
        item.valor_fecha ??
        (item.valor_numero != null ? String(item.valor_numero) : null) ??
        (item.valor_booleano != null ? String(item.valor_booleano) : null) ??
        '—';
      record[item.atributo_formulario_nombre] = valor;
    }
    return Array.from(grouped.values());
  }

  async eliminarRegistro(record: VehiculoRecord): Promise<void> {
    const confirmado = await this.alertService.confirm({
      title: '¿Eliminar registro?',
      text: 'Esta acción no se puede deshacer.',
      confirmButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
    });
    if (!confirmado) return;
    try {
      await firstValueFrom(this.reportSolicitudService.eliminarVehiculo(record.id));
      this.zone.run(() => {
        this.toastrAlert.showSuccess('Registro eliminado correctamente.', '¡Eliminado!');
        this.cargarDatos();
      });
    } catch {
      this.zone.run(() => this.toastrAlert.showError('No se pudo eliminar el registro.', 'Error'));
    }
  }

  async autorizarRegistro(record: VehiculoRecord): Promise<void> {
    const sol = record['_solicitud'] as ReportSolicitud | undefined;
    if (!sol) return;
    const confirmado = await this.alertService.confirm({
      icon: 'question',
      title: '¿Autorizar programación?',
      text: 'Se aprobará la solicitud de vehículo seleccionada.',
      confirmButtonColor: '#16a34a',
      confirmButtonText: 'Sí, autorizar',
    });
    if (!confirmado) return;
    this.procesandoId = record.id;
    this.solicitudService
      .actualizarSolicitud(sol.id_solicitud, {
        ctestado_id: ESTADO_AUTORIZADO,
        formulario_id: sol.formulario_id,
        usuario_id: sol.usuario_id,
        entidad_id: sol.establecimiento_id,
        secuencial_id: sol.secuencial_id,
        periodo_id: sol.periodo_id,
        descripcion: sol.descripcion_solicitud,
        estado: sol.estado_logico_solicitud,
        num_secuencial: sol.num_secuencial,
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
            this.toastrAlert.showSuccess('Programación autorizada correctamente.', '¡Autorizado!');
            this.cargarDatos();
          }),
        error: () =>
          this.zone.run(() =>
            this.toastrAlert.showError('No se pudo autorizar el registro.', 'Error'),
          ),
      });
  }

  async rechazarRegistro(record: VehiculoRecord): Promise<void> {
    const sol = record['_solicitud'] as ReportSolicitud | undefined;
    if (!sol) return;
    const confirmado = await this.alertService.confirm({
      title: 'Rechazar programación',
      text: `Se rechazará la solicitud ${sol.num_secuencial ?? sol.id_solicitud}.`,
      confirmButtonColor: '#d33',
      confirmButtonText: 'Sí, rechazar',
    });
    if (!confirmado) return;
    this.procesandoId = record.id;
    this.solicitudService
      .actualizarSolicitud(sol.id_solicitud, {
        ctestado_id: ESTADO_RECHAZADO,
        formulario_id: sol.formulario_id,
        usuario_id: sol.usuario_id,
        entidad_id: sol.establecimiento_id,
        secuencial_id: sol.secuencial_id,
        periodo_id: sol.periodo_id,
        descripcion: sol.descripcion_solicitud,
        estado: sol.estado_logico_solicitud,
        num_secuencial: sol.num_secuencial,
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
            this.toastrAlert.showWarning('Programación rechazada.', 'Rechazado');
            this.cargarDatos();
          }),
        error: () =>
          this.zone.run(() =>
            this.toastrAlert.showError('No se pudo rechazar el registro.', 'Error'),
          ),
      });
  }

  imprimirRegistro(record: VehiculoRecord): void {
    this.showPdfModal = true;
    this.isPdfCargando = true;
    this.pdfPreviewUrl = null;
    if (this.pdfBlobUrl) {
      URL.revokeObjectURL(this.pdfBlobUrl);
      this.pdfBlobUrl = null;
    }
    this.solicitudService
      .getPdfVehiculo(record.id)
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
            this.isPdfCargando = false;
            this.toastrAlert.showError('No se pudo cargar el documento PDF.', 'Error');
          }),
      });
  }

  cerrarPdf(): void {
    this.showPdfModal = false;
    this.pdfPreviewUrl = null;
    if (this.pdfBlobUrl) {
      URL.revokeObjectURL(this.pdfBlobUrl);
      this.pdfBlobUrl = null;
    }
  }

  descargarPdf(): void {
    if (!this.pdfBlobUrl) return;
    const a = document.createElement('a');
    a.href = this.pdfBlobUrl;
    a.download = 'programacion-vehiculo.pdf';
    a.click();
  }

  private parseFecha(fecha: string): Date | null {
    if (!fecha || fecha === '—') return null;
    const iso = new Date(fecha.includes('T') ? fecha : fecha + 'T12:00:00');
    if (!isNaN(iso.getTime())) return iso;
    const parts = fecha.split('/');
    if (parts.length === 3) {
      const [d, m, y] = parts;
      return new Date(`${y}-${m.padStart(2, '0')}-${d.padStart(2, '0')}T12:00:00`);
    }
    return null;
  }

  get solicitudesAgrupadas(): Array<{
    groupKey: string;
    diaLabel: string;
    items: VehiculoRecord[];
  }> {
    const DIAS = ['DOMINGO', 'LUNES', 'MARTES', 'MIÉRCOLES', 'JUEVES', 'VIERNES', 'SÁBADO'];
    const MESES = [
      'ENERO',
      'FEBRERO',
      'MARZO',
      'ABRIL',
      'MAYO',
      'JUNIO',
      'JULIO',
      'AGOSTO',
      'SEPTIEMBRE',
      'OCTUBRE',
      'NOVIEMBRE',
      'DICIEMBRE',
    ];
    let flatIdx = 0;
    const groups = new Map<
      string,
      { diaLabel: string; sortKey: number; items: VehiculoRecord[] }
    >();
    for (const sol of this.solicitudes) {
      const fechaStr = String(sol['val_fecha_programacion'] ?? '—');
      const d = this.parseFecha(fechaStr);
      const groupKey = d ? fechaStr : '—';
      const sortKey = d ? d.getTime() : 0;
      const diaLabel = d
        ? `${d.getDay() === 0 || d.getDay() === 6 ? 'FIN DE SEMANA' : DIAS[d.getDay()]}  ·  ${d.getDate()} DE ${MESES[d.getMonth()]} ${d.getFullYear()}`
        : 'SIN FECHA';
      if (!groups.has(groupKey)) groups.set(groupKey, { diaLabel, sortKey, items: [] });
      groups.get(groupKey)!.items.push({ ...sol, _flatIdx: flatIdx++ });
    }
    return Array.from(groups.entries())
      .sort(([, a], [, b]) => a.sortKey - b.sortKey)
      .map(([groupKey, { diaLabel, items }]) => ({ groupKey, diaLabel, items }));
  }

  getFieldValue(record: VehiculoRecord, key: string): unknown {
    return record[key] ?? '—';
  }

  getEmployeeName(fieldKey: string, value: unknown): string {
    if (!value || value === '—') return '—';
    const field = this.fields.find((f) => f.key === fieldKey);
    if (!field?.employeeList?.length) return String(value);
    const uuid = String(value).toLowerCase();
    const emp = field.employeeList.find((e) => e.empleado_id.toLowerCase() === uuid);
    return emp?.nombre_empleado ?? String(value);
  }

  getFechaCreacion(record: VehiculoRecord): string {
    const raw = record['fecha_creacion'];
    if (!raw) return '—';
    const d = new Date(raw as string);
    if (isNaN(d.getTime())) return String(raw);
    return d.toLocaleDateString('es-EC', { day: '2-digit', month: '2-digit', year: 'numeric' });
  }
}
