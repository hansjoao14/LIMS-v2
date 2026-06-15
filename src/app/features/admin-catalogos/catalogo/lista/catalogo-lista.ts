import { Component, OnInit, OnDestroy, Output, EventEmitter, Input, NgZone, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subject, takeUntil, finalize } from 'rxjs';
import Swal from 'sweetalert2';

import { CatalogoService } from '../../../../services/catalogo.service';
import { Catalogo, PaginationMeta } from '../../../../interfaces/catalogos/catalogo.interface';
import { PaginationComponent } from '../../../../shared/components/pagination/pagination';
import { AuthService } from '../../../auth/service/auth-service';
import { ToastrAlertService } from '../../../../services/toastr.service';
import { AppRole, MenuKey, hasPermission } from '../../../../core/utils/roles.constans';

@Component({
  selector: 'app-catalogo-lista',
  imports: [CommonModule, FormsModule, PaginationComponent],
  templateUrl: './catalogo-lista.html',
})
export class CatalogoLista implements OnInit, OnDestroy {
  @Input() selectedId: number | null = null;
  @Output() seleccionar = new EventEmitter<Catalogo>();
  @Output() nuevo = new EventEmitter<void>();
  @Output() editar = new EventEmitter<Catalogo>();

  loading = true;
  catalogos: Catalogo[] = [];
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
    return role ? hasPermission(MenuKey.ADMIN_CATALOGOS, role, 'editar') : false;
  });

  canDelete = computed(() => {
    const role = this.userAppRole();
    return role ? hasPermission(MenuKey.ADMIN_CATALOGOS, role, 'eliminar') : false;
  });

  canCrear = computed(() => {
    const role = this.userAppRole();
    return role ? hasPermission(MenuKey.ADMIN_CATALOGOS, role, 'crear') : false;
  });

  get hasAnyAction(): boolean {
    return this.canEdit() || this.canDelete();
  }

  constructor(
    private catService: CatalogoService,
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
    const nombre = this.busqueda.trim();
    this.catService.getCollectionCatalogoAdmin(page, this.PAGE_SIZE, nombre)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: ({ data, meta }) => {
          this.catalogos = data;
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

  async deshabilitarCatalogo(item: Catalogo): Promise<void> {
    const confirm = await Swal.fire({
      icon: 'warning',
      title: '¿Deshabilitar catálogo?',
      text: `Se deshabilitará "${item.nombre}".`,
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Sí, deshabilitar',
      cancelButtonText: 'Cancelar',
    });
    if (!confirm.isConfirmed) return;
    this.procesandoId = item.id;
    this.catService.disableCatalogo(item.id)
      .pipe(takeUntil(this.destroy$), finalize(() => { this.procesandoId = null; }))
      .subscribe({
        next: () => this.zone.run(() => {
          this.toastrAlert.showSuccess('Catálogo deshabilitado.', '¡Listo!');
          this.cargarPagina(this.currentPage);
        }),
        error: () => this.zone.run(() =>
          this.toastrAlert.showError('No se pudo deshabilitar el catálogo.', 'Error')
        ),
      });
  }
}
