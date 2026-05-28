import { Component, OnInit, OnDestroy, Output, EventEmitter, NgZone, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject, takeUntil, finalize } from 'rxjs';
import Swal from 'sweetalert2';

import { ReportOrdenService } from '../../../services/solicitudes/orden-trabajo/report-orden.service';
import { OrdenTrabajoService, FinalizarOrdenPayload } from '../../../services/solicitudes/orden-trabajo/orden-trabajo.service';
import { ReportOrden } from '../../../interfaces/solicitudes/orden-trabajo/report-orden.interface';
import { AuthService } from '../../auth/service/auth-service';
import { ToastrAlertService } from '../../../services/toastr.service';
import { AppRole, MenuKey, hasPermission } from '../../../core/utils/roles.constans';

const ESTADO_FINALIZADO = 3;
const ESTADO_RECHAZADO  = 51;

@Component({
  selector: 'app-orden-trabajo-in-situ-lista',
  imports: [CommonModule],
  templateUrl: './orden-trabajo-in-situ-lista.html',
})
export class OrdenTrabajoInSituLista implements OnInit, OnDestroy {
  @Output() nuevaOrden = new EventEmitter<void>();
  @Output() editar     = new EventEmitter<ReportOrden>();

  loading = true;
  ordenes: ReportOrden[] = [];

  openMenuId:  string | null = null;
  procesandoId: string | null = null;

  private readonly destroy$ = new Subject<void>();

  private userAppRole = computed<AppRole | null>(() => {
    const roles = this.authService.userProfile()?.roles ?? [];
    return (Object.values(AppRole) as AppRole[]).find(r => roles.includes(r)) ?? null;
  });

  canFinalizar = computed(() => {
    const role = this.userAppRole();
    return role ? hasPermission(MenuKey.ORDEN_TRABAJO_IN_SITU, role, 'autorizar') : false;
  });

  canRechazar = computed(() => {
    const role = this.userAppRole();
    return role ? hasPermission(MenuKey.ORDEN_TRABAJO_IN_SITU, role, 'rechazar') : false;
  });

  canEdit = computed(() => {
    const role = this.userAppRole();
    return role ? hasPermission(MenuKey.ORDEN_TRABAJO_IN_SITU, role, 'editar') : false;
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
  ) {}

  ngOnInit(): void {
    this.cargarOrdenes();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  cargarOrdenes(): void {
    this.loading = true;
    this.reportOrdenService.getOrdenes()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => {
          this.ordenes = data;
          this.loading = false;
        },
        error: () => {
          this.loading = false;
        },
      });
  }

  toggleMenu(id: string, event: MouseEvent): void {
    event.stopPropagation();
    this.openMenuId = this.openMenuId === id ? null : id;
  }

  closeMenu(): void {
    this.openMenuId = null;
  }

  private getIdentificadorSecuencial(orden: ReportOrden): string {
    const nombre = (orden.ctambiente_nombre ?? '').toLowerCase();
    return nombre.includes('ruido') ? 'ORD_RDO' : 'ORD_AIR';
  }

  async finalizarOrden(orden: ReportOrden): Promise<void> {
    const confirm = await Swal.fire({
      icon: 'question',
      title: '¿Autorizar orden?',
      text: `Se autorizará la orden ${orden.num_secuencial ?? orden.id}.`,
      showCancelButton: true,
      confirmButtonColor: '#16a34a',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Sí, autorizar',
      cancelButtonText: 'Cancelar',
    });
    if (!confirm.isConfirmed) return;
    this.procesandoId = orden.id;
    const payload: FinalizarOrdenPayload = {
      idOrden:                orden.id,
      identifcadorSecuecnial: this.getIdentificadorSecuencial(orden),
      ctestado:               ESTADO_FINALIZADO,
    };
    this.ordenTrabajoService
      .autorizarOrden(payload)
      .pipe(takeUntil(this.destroy$), finalize(() => { this.procesandoId = null; }))
      .subscribe({
        next:  () => this.zone.run(() => {
          this.toastrAlert.showSuccess('Orden autorizada correctamente.', '¡Autorizado!');
          this.cargarOrdenes();
        }),
        error: () => this.zone.run(() =>
          this.toastrAlert.showError('No se pudo autorizar la orden.', 'Error')
        ),
      });
  }

  async rechazarOrden(orden: ReportOrden): Promise<void> {
    const { isConfirmed } = await Swal.fire({
      icon: 'warning',
      title: 'Rechazar orden',
      text: `Se rechazará la orden ${orden.num_secuencial ?? orden.id}.`,
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Sí, rechazar',
      cancelButtonText: 'Cancelar',
    });
    if (!isConfirmed) return;
    this.procesandoId = orden.id;
    this.ordenTrabajoService
      .actualizarOrden(orden.id, {
        solicitud_id:                orden.solicitud_id,
        usuario_id:                  orden.usuario_id,
        entidad_id:                  orden.entidad_id,
        ctambiente_id:               orden.ctambiente_id,
        periodo_id:                  orden.periodo_id,
        secuencial_id:               orden.secuencial_id,
        num_secuencial:              orden.num_secuencial,
        ctuso_suelo_id:              orden.ctuso_suelo_id,
        ctcaracteristica_horaria_id: orden.ctcaracteristica_horaria_id,
        ctpunto_critico_id:          orden.ctpunto_critico_id,
        direccion_pca:               orden.direccion_pca,
        telefono_pca:                orden.telefono_pca,
        observacion:                 orden.observacion,
        ctestado_id:                 ESTADO_RECHAZADO,
        estado:                      orden.estado,
        ctformulario_id:             orden.ctformulario_id,
      })
      .pipe(takeUntil(this.destroy$), finalize(() => { this.procesandoId = null; }))
      .subscribe({
        next:  () => this.zone.run(() => {
          this.toastrAlert.showWarning('Orden rechazada.', 'Rechazado');
          this.cargarOrdenes();
        }),
        error: () => this.zone.run(() =>
          this.toastrAlert.showError('No se pudo rechazar la orden.', 'Error')
        ),
      });
  }

  editarOrden(orden: ReportOrden): void {
    this.editar.emit(orden);
  }

  async eliminarOrden(orden: ReportOrden): Promise<void> {
    const confirm = await Swal.fire({
      icon: 'warning',
      title: '¿Eliminar orden?',
      text: `Se eliminará la orden ${orden.num_secuencial ?? orden.id}. Esta acción no se puede deshacer.`,
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    });
    if (!confirm.isConfirmed) return;
    this.procesandoId = orden.id;
    this.ordenTrabajoService
      .deshabilitarOrden(orden.id)
      .pipe(takeUntil(this.destroy$), finalize(() => { this.procesandoId = null; }))
      .subscribe({
        next:  () => this.zone.run(() => {
          this.toastrAlert.showSuccess('Orden eliminada correctamente.', '¡Eliminado!');
          this.cargarOrdenes();
        }),
        error: () => this.zone.run(() =>
          this.toastrAlert.showError('No se pudo eliminar la orden.', 'Error')
        ),
      });
  }

  imprimirOrden(orden: ReportOrden): void {
    console.log('[orden-in-situ:imprimir]', orden);
  }
}
