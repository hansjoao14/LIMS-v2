import { Component, OnDestroy, OnInit, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject, takeUntil, finalize } from 'rxjs';
import Swal from 'sweetalert2';

import { ReportSolicitudService } from '../../services/solicitudes/lista-solicitudes/report-solicitud.service';
import { ReportSolicitud } from '../../interfaces/solicitudes/lista-solicitudes/report-solicitud.interface';
import { PaginationMeta, ItemCatalogo } from '../../interfaces/catalogos/catalogo.interface';
import { PaginationComponent } from '../../shared/components/pagination/pagination';
import { CatalogoService } from '../../services/catalogo.service';
import { SolicitudService } from '../../services/solicitudes/solicitud-trabajo/solicitud-trabajo.service';
import { AuthService } from '../auth/service/auth-service';
import { AppRole, MenuKey, hasPermission } from '../../core/utils/roles.constans';

const ESTADO_AUTORIZADO = 387;
const ESTADO_RECHAZADO = 51;
const CATALOGO_PRIORIDAD_ID = 30;

@Component({
  selector: 'app-lista-cotizaciones',
  standalone: true,
  imports: [CommonModule, PaginationComponent],
  templateUrl: './lista-cotizaciones.html',
})
export class ListaCotizaciones implements OnInit, OnDestroy {
  solicitudes: ReportSolicitud[] = [];
  meta: PaginationMeta | null = null;
  loading = true;
  procesandoId: string | null = null;
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
    private catalogoService: CatalogoService,
    private solicitudService: SolicitudService,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.cargarPrioridades();
    this.cargarPagina(1);
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
          Swal.fire('Error', 'No se pudo cargar la lista de solicitudes', 'error');
        },
      });
  }

  async cotizarSolicitud(doc: ReportSolicitud): Promise<void> {
    const opcionesHtml = this.prioridades
      .map((p) => `<option value="${p.id}">${p.nombre}</option>`)
      .join('');

    const result = await Swal.fire<string>({
      title: 'Autorizar Solicitud',
      html: `
        <p style="font-size:13px;color:#475569;margin-bottom:12px;">
          Solicitud: <strong>${doc.num_secuencial ?? doc.id_solicitud}</strong>
        </p>
        <label style="font-size:11px;font-weight:700;color:#1e3a8a;text-transform:uppercase;display:block;text-align:left;margin-bottom:4px;">
          Seleccione la Prioridad *
        </label>
        <select id="swal-prioridad" class="swal2-input" style="margin:0;width:100%;">
          <option value="">Seleccione...</option>
          ${opcionesHtml}
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
        const sel = document.getElementById('swal-prioridad') as HTMLSelectElement;
        if (!sel?.value) {
          Swal.showValidationMessage('Debe seleccionar una prioridad');
          return false;
        }
        return sel.value;
      },
    });

    if (!result.isConfirmed || !result.value) return;

    const prioridadId = Number(result.value);
    this.procesandoId = doc.id_solicitud;

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
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => { this.procesandoId = null; }),
      )
      .subscribe({
        next: async () => {
          this.solicitudes = this.solicitudes.filter(s => s.id_solicitud !== doc.id_solicitud);
          await Swal.fire({
            title: '¡Autorizado!',
            text: `La solicitud ${doc.num_secuencial ?? doc.id_solicitud} fue autorizada correctamente.`,
            icon: 'success',
            confirmButtonColor: '#1d2b64',
          });
          this.cargarPagina(this.currentPage);
        },
        error: () => {
          Swal.fire('Error', 'No se pudo autorizar la solicitud', 'error');
        },
      });
  }

  async rechazarSolicitud(doc: ReportSolicitud): Promise<void> {
    const { isConfirmed } = await Swal.fire({
      title: '¿Está seguro de rechazar?',
      text: `Se rechazará la solicitud ${doc.num_secuencial ?? doc.id_solicitud}. Esta acción no se puede deshacer.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc2626',
      cancelButtonColor: '#64748b',
      confirmButtonText: 'Sí, rechazar',
      cancelButtonText: 'Cancelar',
    });

    if (!isConfirmed) return;

    this.procesandoId = doc.id_solicitud;

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
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => { this.procesandoId = null; }),
      )
      .subscribe({
        next: async () => {
          this.solicitudes = this.solicitudes.filter(s => s.id_solicitud !== doc.id_solicitud);
          await Swal.fire({
            title: '¡Rechazada!',
            text: `La solicitud ${doc.num_secuencial ?? doc.id_solicitud} fue rechazada.`,
            icon: 'success',
            confirmButtonColor: '#1d2b64',
          });
          this.cargarPagina(this.currentPage);
        },
        error: () => {
          Swal.fire('Error', 'No se pudo rechazar la solicitud', 'error');
        },
      });
  }
}
