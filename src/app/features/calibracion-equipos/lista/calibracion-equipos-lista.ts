import { Component, OnInit, OnDestroy, Output, EventEmitter, NgZone, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject, takeUntil, finalize } from 'rxjs';
import Swal from 'sweetalert2';

import { CalibracionEquiposService } from '../../../services/calibracion-equipos/calibracion-equipos.service';
import { CalibracionEquipo } from '../../../interfaces/calibracion-equipos/calibracion-equipos.interface';
import { AuthService } from '../../auth/service/auth-service';
import { ToastrAlertService } from '../../../services/toastr.service';
import { AppRole, MenuKey, hasPermission } from '../../../core/utils/roles.constans';

@Component({
  selector: 'app-calibracion-equipos-lista',
  imports: [CommonModule],
  templateUrl: './calibracion-equipos-lista.html',
})
export class CalibracionEquiposLista implements OnInit, OnDestroy {
  @Output() nuevaCalibracion = new EventEmitter<void>();
  @Output() editar = new EventEmitter<CalibracionEquipo>();

  loading = true;
  calibraciones: CalibracionEquipo[] = [];

  openMenuId: string | null = null;
  procesandoId: string | null = null;

  private readonly destroy$ = new Subject<void>();

  private userAppRole = computed<AppRole | null>(() => {
    const roles = this.authService.userProfile()?.roles ?? [];
    return (Object.values(AppRole) as AppRole[]).find(r => roles.includes(r)) ?? null;
  });

  canEdit = computed(() => {
    const role = this.userAppRole();
    return role ? hasPermission(MenuKey.CALIBRACION_EQUIPOS, role, 'editar') : false;
  });

  canDelete = computed(() => {
    const role = this.userAppRole();
    return role ? hasPermission(MenuKey.CALIBRACION_EQUIPOS, role, 'eliminar') : false;
  });

  canCrear = computed(() => {
    const role = this.userAppRole();
    return role ? hasPermission(MenuKey.CALIBRACION_EQUIPOS, role, 'crear') : false;
  });

  get hasAnyAction(): boolean {
    return this.canEdit() || this.canDelete();
  }

  constructor(
    private calibracionService: CalibracionEquiposService,
    private authService: AuthService,
    private zone: NgZone,
    private toastrAlert: ToastrAlertService,
  ) {}

  ngOnInit(): void {
    this.cargarDatos();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  cargarDatos(): void {
    this.loading = true;
    this.calibracionService.getCalibraciones()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => {
          this.calibraciones = data;
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

  editarCalibracion(item: CalibracionEquipo): void {
    this.editar.emit(item);
  }

  async eliminarCalibracion(item: CalibracionEquipo): Promise<void> {
    const confirm = await Swal.fire({
      icon: 'warning',
      title: '¿Eliminar registro?',
      text: `Se eliminará el registro ${item.num_secuencial ?? item.id}. Esta acción no se puede deshacer.`,
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    });
    if (!confirm.isConfirmed) return;
    this.procesandoId = item.id;
    this.calibracionService
      .deshabilitarCalibracion(item.id)
      .pipe(takeUntil(this.destroy$), finalize(() => { this.procesandoId = null; }))
      .subscribe({
        next: () => this.zone.run(() => {
          this.toastrAlert.showSuccess('Registro eliminado correctamente.', '¡Eliminado!');
          this.cargarDatos();
        }),
        error: () => this.zone.run(() =>
          this.toastrAlert.showError('No se pudo eliminar el registro.', 'Error')
        ),
      });
  }
}
