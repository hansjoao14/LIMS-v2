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
import { FormsModule } from '@angular/forms';
import { Subject, takeUntil, finalize } from 'rxjs';

import { SecuencialService } from '../../../services/secuencial.service';
import { Secuencial } from '../../../interfaces/secuencial/secuencial.interface';
import { PaginationMeta } from '../../../interfaces/catalogos/catalogo.interface';
import { PaginationComponent } from '../../../shared/components/pagination/pagination';
import { AuthService } from '../../auth/service/auth-service';
import { ToastrAlertService } from '../../../services/toastr.service';
import { AlertService } from '../../../services/alert.service';
import { AppRole, MenuKey, hasPermission } from '../../../core/utils/roles.constans';
import { abrirMenuHaciaArriba } from '../../../core/utils/dropdown-position.utils';
import { TableSkeleton } from '../../../ui/table-skeleton/table-skeleton';

@Component({
  selector: 'app-secuencial-lista',
  imports: [CommonModule, FormsModule, PaginationComponent, TableSkeleton],
  templateUrl: './secuencial-lista.html',
})
export class SecuencialLista implements OnInit, OnDestroy {
  @Output() nuevoSecuencial = new EventEmitter<void>();
  @Output() editar = new EventEmitter<Secuencial>();

  loading = true;
  secuenciales: Secuencial[] = [];
  meta: PaginationMeta | null = null;
  currentPage = 1;
  readonly PAGE_SIZE = 10;
  busqueda = '';

  openMenuId: string | null = null;
  procesandoId: string | null = null;

  private readonly destroy$ = new Subject<void>();

  constructor(
    private secuencialService: SecuencialService,
    private authService: AuthService,
    private zone: NgZone,
    private toastrAlert: ToastrAlertService,
    private alertService: AlertService,
  ) {}

  private userAppRole = computed<AppRole | null>(() => {
    const roles = this.authService.userProfile()?.roles ?? [];
    return (Object.values(AppRole) as AppRole[]).find((r) => roles.includes(r)) ?? null;
  });

  canEdit = computed(() => {
    const role = this.userAppRole();
    return role ? hasPermission(MenuKey.SECUENCIAL, role, 'editar') : false;
  });

  canDelete = computed(() => {
    const role = this.userAppRole();
    return role ? hasPermission(MenuKey.SECUENCIAL, role, 'eliminar') : false;
  });

  canCrear = computed(() => {
    const role = this.userAppRole();
    return role ? hasPermission(MenuKey.SECUENCIAL, role, 'crear') : false;
  });

  get hasAnyAction(): boolean {
    return this.canEdit() || this.canDelete();
  }

  ngOnInit(): void {
    this.cargarPagina(1);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  filtrar(): void {
    this.cargarPagina(1);
  }

  cargarPagina(page: number): void {
    this.loading = true;
    this.currentPage = page;
    const busqueda = this.busqueda.trim();
    this.secuencialService
      .getCollectionSecuencialAdmin(page, this.PAGE_SIZE, busqueda)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: ({ data, meta }) => {
          this.secuenciales = data;
          this.meta = meta;
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
    return abrirMenuHaciaArriba(index, this.secuenciales.length);
  }

  async toggleEstadoSecuencial(item: Secuencial): Promise<void> {
    const accion = item.estado ? 'deshabilitar' : 'habilitar';
    const confirmado = await this.alertService.confirm({
      title: `¿${item.estado ? 'Deshabilitar' : 'Habilitar'} secuencial?`,
      text: `Se ${accion}á "${item.identificador_secu}".`,
      confirmButtonColor: item.estado ? '#d33' : '#16a34a',
      confirmButtonText: `Sí, ${accion}`,
    });
    if (!confirmado) return;
    this.procesandoId = item.id;
    this.secuencialService
      .toggleSecuencial(item.id, !item.estado)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => {
          this.procesandoId = null;
        }),
      )
      .subscribe({
        next: () =>
          this.zone.run(() => {
            this.toastrAlert.showSuccess(
              `Secuencial ${item.estado ? 'deshabilitado' : 'habilitado'}.`,
              '¡Listo!',
            );
            this.cargarPagina(this.currentPage);
          }),
        error: () =>
          this.zone.run(() =>
            this.toastrAlert.showError(`No se pudo ${accion} el secuencial.`, 'Error'),
          ),
      });
  }
}
