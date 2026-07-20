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

import { CalibracionEquiposService } from '../../../services/calibracion-equipos/calibracion-equipos.service';
import { CalibracionEquipo } from '../../../interfaces/calibracion-equipos/calibracion-equipos.interface';
import { AuthService } from '../../auth/service/auth-service';
import { ToastrAlertService } from '../../../services/toastr.service';
import { AlertService } from '../../../services/alert.service';
import { AppRole, MenuKey, hasPermission } from '../../../core/utils/roles.constans';
import { abrirMenuHaciaArriba } from '../../../core/utils/dropdown-position.utils';
import { TableSkeleton } from '../../../ui/table-skeleton/table-skeleton';

@Component({
  selector: 'app-calibracion-equipos-lista',
  imports: [CommonModule, TableSkeleton],
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
    return (Object.values(AppRole) as AppRole[]).find((r) => roles.includes(r)) ?? null;
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
    private alertService: AlertService,
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
    this.calibracionService
      .getCalibraciones()
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

  abrirHaciaArriba(index: number): boolean {
    return abrirMenuHaciaArriba(index, this.calibraciones.length);
  }

  editarCalibracion(item: CalibracionEquipo): void {
    this.editar.emit(item);
  }

  async eliminarCalibracion(item: CalibracionEquipo): Promise<void> {
    const confirmado = await this.alertService.confirm({
      title: '¿Eliminar registro?',
      text: `Se eliminará el registro ${item.num_secuencial ?? item.id}. Esta acción no se puede deshacer.`,
      confirmButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
    });
    if (!confirmado) return;
    this.procesandoId = item.id;
    this.calibracionService
      .deshabilitarCalibracion(item.id)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => {
          this.procesandoId = null;
        }),
      )
      .subscribe({
        next: () =>
          this.zone.run(() => {
            this.toastrAlert.showSuccess('Registro eliminado correctamente.', '¡Eliminado!');
            this.cargarDatos();
          }),
        error: () =>
          this.zone.run(() =>
            this.toastrAlert.showError('No se pudo eliminar el registro.', 'Error'),
          ),
      });
  }
}
