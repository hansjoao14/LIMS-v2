import { Component, OnInit, OnDestroy, Output, EventEmitter, Input, NgZone, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subject, takeUntil, finalize } from 'rxjs';
import Swal from 'sweetalert2';

import { EnsayoService } from '../../../../services/ensayo.service';
import { Ensayo } from '../../../../interfaces/ensayos/ensayo.interface';
import { PaginationMeta } from '../../../../interfaces/catalogos/catalogo.interface';
import { PaginationComponent } from '../../../../shared/components/pagination/pagination';
import { AuthService } from '../../../auth/service/auth-service';
import { ToastrAlertService } from '../../../../services/toastr.service';
import { AppRole, MenuKey, hasPermission } from '../../../../core/utils/roles.constans';
import { TableSkeleton } from '../../../../ui/table-skeleton/table-skeleton';

@Component({
  selector: 'app-ensayo-lista',
  imports: [CommonModule, FormsModule, PaginationComponent, TableSkeleton],
  templateUrl: './ensayo-lista.html',
})
export class EnsayoLista implements OnInit, OnDestroy {
  @Input() selectedId: number | null = null;
  @Input() reloadTrigger = 0;
  @Output() seleccionar = new EventEmitter<Ensayo>();
  @Output() nuevo = new EventEmitter<void>();
  @Output() editar = new EventEmitter<Ensayo>();

  loading = true;
  ensayos: Ensayo[] = [];
  meta: PaginationMeta | null = null;
  currentPage = 1;
  readonly PAGE_SIZE = 10;
  busqueda = '';

  openMenuId: number | null = null;
  procesandoId: number | null = null;

  private readonly destroy$ = new Subject<void>();

  private userAppRole = computed<AppRole | null>(() => {
    const roles = this.authService.userProfile()?.roles ?? [];
    return (Object.values(AppRole) as AppRole[]).find(r => roles.includes(r)) ?? null;
  });

  canEdit = computed(() => {
    const role = this.userAppRole();
    return role ? hasPermission(MenuKey.ADMIN_ENSAYOS, role, 'editar') : false;
  });

  canDelete = computed(() => {
    const role = this.userAppRole();
    return role ? hasPermission(MenuKey.ADMIN_ENSAYOS, role, 'eliminar') : false;
  });

  canCrear = computed(() => {
    const role = this.userAppRole();
    return role ? hasPermission(MenuKey.ADMIN_ENSAYOS, role, 'crear') : false;
  });

  get hasAnyAction(): boolean {
    return this.canEdit() || this.canDelete();
  }

  constructor(
    private ensayoService: EnsayoService,
    private authService: AuthService,
    private zone: NgZone,
    private toastrAlert: ToastrAlertService,
  ) {}

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
    const analisis = this.busqueda.trim();
    this.ensayoService.getCollectionEnsayo(page, this.PAGE_SIZE, analisis)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: ({ data, meta }) => {
          this.ensayos = data;
          this.meta = meta;
          this.loading = false;
        },
        error: () => { this.loading = false; },
      });
  }

  toggleMenu(id: number, event: MouseEvent): void {
    event.stopPropagation();
    this.openMenuId = this.openMenuId === id ? null : id;
  }

  closeMenu(): void {
    this.openMenuId = null;
  }

  async toggleEstadoEnsayo(item: Ensayo): Promise<void> {
    const accion = item.estado ? 'deshabilitar' : 'habilitar';
    const confirm = await Swal.fire({
      icon: 'warning',
      title: `¿${item.estado ? 'Deshabilitar' : 'Habilitar'} ensayo?`,
      text: `Se ${accion}á "${item.analisis}".`,
      showCancelButton: true,
      confirmButtonColor: item.estado ? '#d33' : '#16a34a',
      cancelButtonColor: '#6b7280',
      confirmButtonText: `Sí, ${accion}`,
      cancelButtonText: 'Cancelar',
    });
    if (!confirm.isConfirmed) return;
    this.procesandoId = item.id;
    const call$ = this.ensayoService.toggleEnsayo(item.id, !item.estado);
    call$
      .pipe(takeUntil(this.destroy$), finalize(() => { this.procesandoId = null; }))
      .subscribe({
        next: () => this.zone.run(() => {
          this.toastrAlert.showSuccess(`Ensayo ${item.estado ? 'deshabilitado' : 'habilitado'}.`, '¡Listo!');
          this.cargarPagina(this.currentPage);
        }),
        error: () => this.zone.run(() =>
          this.toastrAlert.showError(`No se pudo ${accion} el ensayo.`, 'Error')
        ),
      });
  }
}
