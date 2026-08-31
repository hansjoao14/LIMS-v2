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
import { PaginationMeta } from '../../../interfaces/catalogos/catalogo.interface';
import { AuthService } from '../../auth/service/auth-service';
import { ToastrAlertService } from '../../../services/toastr.service';
import { AlertService } from '../../../services/alert.service';
import { AppRole, MenuKey, hasPermission } from '../../../core/utils/roles.constans';
import { abrirMenuHaciaArriba } from '../../../core/utils/dropdown-position.utils';
import { TableSkeleton } from '../../../ui/table-skeleton/table-skeleton';
import { PaginationComponent } from '../../../shared/components/pagination/pagination';

/**
 * Estados del flujo (catálogo "Estado de Registro"). Una verificación nace en
 * Pendiente —es el default de SOLI_CALIBRACION— y de ahí sale hacia Autorizado
 * o Rechazado, en una sola vía.
 *
 * El N° Formulario se asigna al autorizar, no al guardar: lo hace el SP
 * `sp_generar_secuencial_calibracion` junto con el cambio de estado.
 */
const ESTADO_PENDIENTE = 2;
const ESTADO_AUTORIZADO = 387;
const ESTADO_RECHAZADO = 51;

@Component({
  selector: 'app-calibracion-equipos-lista',
  imports: [CommonModule, TableSkeleton, PaginationComponent],
  templateUrl: './calibracion-equipos-lista.html',
})
export class CalibracionEquiposLista implements OnInit, OnDestroy {
  @Output() nuevaCalibracion = new EventEmitter<void>();
  @Output() editar = new EventEmitter<CalibracionEquipo>();

  loading = true;
  calibraciones: CalibracionEquipo[] = [];

  readonly PAGE_SIZE = 10;
  currentPage = 1;
  meta: PaginationMeta | null = null;

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

  canAutorizar = computed(() => {
    const role = this.userAppRole();
    return role ? hasPermission(MenuKey.CALIBRACION_EQUIPOS, role, 'autorizar') : false;
  });

  canRechazar = computed(() => {
    const role = this.userAppRole();
    return role ? hasPermission(MenuKey.CALIBRACION_EQUIPOS, role, 'rechazar') : false;
  });

  get hasAnyAction(): boolean {
    return this.canEdit() || this.canDelete() || this.canAutorizar() || this.canRechazar();
  }

  /**
   * Autorizar y rechazar salen solo de "Pendiente" y sobre un registro vigente:
   * la transición es de una sola vía. El backend revalida, pero ofrecer el
   * botón sobre algo ya resuelto solo sirve para que el usuario choque contra
   * el error.
   */
  estaPendiente(item: CalibracionEquipo): boolean {
    return item.ctestado_id === ESTADO_PENDIENTE && item.estado === true;
  }

  estaAutorizada(item: CalibracionEquipo): boolean {
    return item.ctestado_id === ESTADO_AUTORIZADO;
  }

  estaRechazada(item: CalibracionEquipo): boolean {
    return item.ctestado_id === ESTADO_RECHAZADO;
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
    this.irAPagina(this.currentPage);
  }

  irAPagina(page: number): void {
    this.loading = true;
    this.currentPage = page;

    this.calibracionService
      .getCalibraciones(page, this.PAGE_SIZE)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: ({ data, meta }) =>
          this.zone.run(() => {
            this.calibraciones = data;
            this.meta = meta;
            this.loading = false;
          }),
        error: () =>
          this.zone.run(() => {
            this.loading = false;
            this.toastrAlert.showError('No se pudieron cargar las verificaciones.', 'Error');
          }),
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

  async autorizarCalibracion(item: CalibracionEquipo): Promise<void> {
    if (!this.estaPendiente(item)) return;

    const confirmado = await this.alertService.confirm({
      icon: 'question',
      title: '¿Autorizar verificación?',
      text: 'Se aprobará la verificación y se le asignará su N° Formulario.',
      confirmButtonColor: '#16a34a',
      confirmButtonText: 'Sí, autorizar',
    });
    if (!confirmado) return;

    this.procesandoId = item.id;
    this.calibracionService
      .autorizarCalibracion(item.id)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => {
          this.procesandoId = null;
        }),
      )
      .subscribe({
        next: (secuencial) =>
          this.zone.run(() => {
            this.toastrAlert.showSuccess(
              secuencial
                ? `Verificación autorizada con el N° ${secuencial}.`
                : 'Verificación autorizada correctamente.',
              '¡Autorizado!',
            );
            this.cargarDatos();
          }),
        error: () =>
          this.zone.run(() =>
            this.toastrAlert.showError('No se pudo autorizar la verificación.', 'Error'),
          ),
      });
  }

  async rechazarCalibracion(item: CalibracionEquipo): Promise<void> {
    if (!this.estaPendiente(item)) return;

    const confirmado = await this.alertService.confirm({
      icon: 'warning',
      title: '¿Rechazar verificación?',
      text: 'La verificación quedará rechazada y no recibirá N° Formulario.',
      confirmButtonColor: '#d33',
      confirmButtonText: 'Sí, rechazar',
    });
    if (!confirmado) return;

    this.procesandoId = item.id;
    this.calibracionService
      .rechazarCalibracion(item.id)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => {
          this.procesandoId = null;
        }),
      )
      .subscribe({
        next: () =>
          this.zone.run(() => {
            this.toastrAlert.showWarning('Verificación rechazada.', 'Rechazado');
            this.cargarDatos();
          }),
        error: () =>
          this.zone.run(() =>
            this.toastrAlert.showError('No se pudo rechazar la verificación.', 'Error'),
          ),
      });
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
