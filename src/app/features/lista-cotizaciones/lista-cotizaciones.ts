import { Component, OnDestroy, OnInit, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject, takeUntil, finalize, timeout } from 'rxjs';
import Swal from 'sweetalert2';

import { ReportSolicitudService } from '../../services/solicitudes/lista-solicitudes/report-solicitud.service';
import { ReportFormularioService } from '../../services/admin-formularios/report-formulario.service';
import { ReportSolicitud } from '../../interfaces/solicitudes/lista-solicitudes/report-solicitud.interface';
import { ReportFormulario } from '../../interfaces/admin-formularios/report-formulario.interface';
import { PaginationMeta, ItemCatalogo } from '../../interfaces/catalogos/catalogo.interface';
import { PaginationComponent } from '../../shared/components/pagination/pagination';
import { CatalogoService } from '../../services/catalogo.service';
import { SolicitudService } from '../../services/solicitudes/solicitud-trabajo/solicitud-trabajo.service';
import { AuthService } from '../auth/service/auth-service';
import { AppRole, MenuKey, hasPermission } from '../../core/utils/roles.constans';
import { PageHeader } from '../../shared/components/page-header/page-header';
import { TableSkeleton } from '../../ui/table-skeleton/table-skeleton';
import { AlertService } from '../../services/alert.service';

const ESTADO_AUTORIZADO = 387;
const ESTADO_RECHAZADO = 51;
const CATALOGO_PRIORIDAD_ID = 30;

@Component({
  selector: 'app-lista-cotizaciones',
  standalone: true,
  imports: [CommonModule, PaginationComponent, PageHeader, TableSkeleton],
  templateUrl: './lista-cotizaciones.html',
  styleUrl: './lista-cotizaciones.css',
})
export class ListaCotizaciones implements OnInit, OnDestroy {
  formulario: ReportFormulario | null = null;
  fechaEmision: Date | null = null;

  solicitudes: ReportSolicitud[] = [];
  meta: PaginationMeta | null = null;
  loading = true;
  currentPage = 1;
  readonly PAGE_SIZE = 10;

  prioridades: ItemCatalogo[] = [];

  private readonly destroy$ = new Subject<void>();

  // ── Permisos ─────────────────────────────────────────────────────────────
  private userAppRole = computed<AppRole | null>(() => {
    const roles = this.authService.userProfile()?.roles ?? [];
    return (Object.values(AppRole) as AppRole[]).find((r) => roles.includes(r)) ?? null;
  });

  canAutorizar = computed(() => {
    const role = this.userAppRole();
    return role ? hasPermission(MenuKey.LISTA_COTIZACIONES, role, 'autorizar') : false;
  });

  canRechazar = computed(() => {
    const role = this.userAppRole();
    return role ? hasPermission(MenuKey.LISTA_COTIZACIONES, role, 'rechazar') : false;
  });

  constructor(
    private reportSolicitudService: ReportSolicitudService,
    private reportFormularioService: ReportFormularioService,
    private catalogoService: CatalogoService,
    private solicitudService: SolicitudService,
    private authService: AuthService,
    private alertService: AlertService,
  ) {}

  ngOnInit(): void {
    this.cargarFormulario();
    this.cargarPrioridades();
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

  cargarPrioridades(): void {
    this.catalogoService
      .getItemsByCatalogoId(CATALOGO_PRIORIDAD_ID)
      .pipe(takeUntil(this.destroy$))
      .subscribe({ next: (res) => (this.prioridades = res.data) });
  }

  cargarPagina(page: number): void {
    this.loading = true;
    this.currentPage = page;
    this.reportSolicitudService
      .getSolicitudesEstado388(page, this.PAGE_SIZE)
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

  async cotizarSolicitud(doc: ReportSolicitud): Promise<void> {
    const opcionesPrioridad = this.prioridades
      .map((p) => `<option value="${p.id}">${p.nombre}</option>`)
      .join('');

    const result = await Swal.fire<{ prioridad: string }>({
      title: 'Autorizar Solicitud',
      html: `
        <p style="font-size:13px;color:#475569;margin-bottom:12px;">
          Solicitud: <strong>${doc.num_secuencial ?? doc.id_solicitud}</strong>
        </p>
        <label style="font-size:11px;font-weight:700;color:#1e3a8a;text-transform:uppercase;display:block;text-align:left;margin-bottom:4px;">
          Prioridad *
        </label>
        <select id="swal-prioridad" class="swal2-input" style="margin:0;width:100%;">
          <option value="">Seleccione...</option>
          ${opcionesPrioridad}
        </select>
      `,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#16a34a',
      cancelButtonColor: '#64748b',
      confirmButtonText: 'Autorizar',
      cancelButtonText: 'Cancelar',
      focusConfirm: false,
      preConfirm: () => {
        const selPrioridad = document.getElementById('swal-prioridad') as HTMLSelectElement;
        if (!selPrioridad?.value) {
          Swal.showValidationMessage('Debe seleccionar una prioridad');
          return false;
        }
        return { prioridad: selPrioridad.value };
      },
    });

    if (!result.isConfirmed || !result.value) return;

    const { prioridad } = result.value;
    const prioridadId = Number(prioridad);

    // Remove row immediately — UI must not wait for the server
    this.solicitudes = this.solicitudes.filter((s) => s.id_solicitud !== doc.id_solicitud);

    this.solicitudService
      .actualizarSolicitud(doc.id_solicitud, {
        ctestado_id: ESTADO_AUTORIZADO,
        ctprioridad_id: prioridadId,
        formulario_id: doc.formulario_id,
        usuario_id: doc.usuario_id,
        entidad_id: doc.establecimiento_id,
        secuencial_id: doc.secuencial_id,
        periodo_id: doc.periodo_id,
        descripcion: doc.descripcion_solicitud,
        estado: doc.estado_logico_solicitud,
        num_secuencial: doc.num_secuencial,
      })
      .pipe(timeout(10000), takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.cargarPagina(this.currentPage);
          this.alertService.successAutoClose(
            `La solicitud ${doc.num_secuencial ?? doc.id_solicitud} fue autorizada correctamente.`,
            '¡Autorizado!',
            2000,
            '#1d2b64',
          );
        },
        error: () => {
          this.cargarPagina(this.currentPage);
          this.alertService.error('No se pudo autorizar la solicitud');
        },
      });
  }

  async rechazarSolicitud(doc: ReportSolicitud): Promise<void> {
    const confirmado = await this.alertService.confirm({
      title: '¿Está seguro de rechazar?',
      text: `Se rechazará la solicitud ${doc.num_secuencial ?? doc.id_solicitud}. Esta acción no se puede deshacer.`,
      confirmButtonColor: '#dc2626',
      cancelButtonColor: '#64748b',
      confirmButtonText: 'Sí, rechazar',
    });

    if (!confirmado) return;

    // Remove row immediately — UI must not wait for the server
    this.solicitudes = this.solicitudes.filter((s) => s.id_solicitud !== doc.id_solicitud);

    this.solicitudService
      .actualizarSolicitud(doc.id_solicitud, {
        ctestado_id: ESTADO_RECHAZADO,
        formulario_id: doc.formulario_id,
        usuario_id: doc.usuario_id,
        entidad_id: doc.establecimiento_id,
        secuencial_id: doc.secuencial_id,
        periodo_id: doc.periodo_id,
        descripcion: doc.descripcion_solicitud,
        estado: doc.estado_logico_solicitud,
        num_secuencial: doc.num_secuencial,
      })
      .pipe(timeout(10000), takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.cargarPagina(this.currentPage);
          this.alertService.successAutoClose(
            `La solicitud ${doc.num_secuencial ?? doc.id_solicitud} fue rechazada.`,
            '¡Rechazada!',
            2000,
            '#1d2b64',
          );
        },
        error: () => {
          this.cargarPagina(this.currentPage);
          this.alertService.error('No se pudo rechazar la solicitud');
        },
      });
  }
}
