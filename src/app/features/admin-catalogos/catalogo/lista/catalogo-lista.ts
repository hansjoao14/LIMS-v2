import {
  Component,
  OnInit,
  OnDestroy,
  Output,
  EventEmitter,
  Input,
  NgZone,
  computed,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subject, takeUntil, finalize } from 'rxjs';

import { CatalogoService } from '../../../../services/catalogo.service';
import { Catalogo, PaginationMeta } from '../../../../interfaces/catalogos/catalogo.interface';
import { PaginationComponent } from '../../../../shared/components/pagination/pagination';
import { AuthService } from '../../../auth/service/auth-service';
import { ToastrAlertService } from '../../../../services/toastr.service';
import { AlertService } from '../../../../services/alert.service';
import { AppRole, MenuKey, hasPermission } from '../../../../core/utils/roles.constans';
import { TableSkeleton } from '../../../../ui/table-skeleton/table-skeleton';

@Component({
  selector: 'app-catalogo-lista',
  imports: [CommonModule, FormsModule, PaginationComponent, TableSkeleton],
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
    return (Object.values(AppRole) as AppRole[]).find((r) => roles.includes(r)) ?? null;
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
    private alertService: AlertService,
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
    this.catService
      .getCollectionCatalogoAdmin(page, this.PAGE_SIZE, nombre)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: ({ data, meta }) => {
          this.catalogos = data;
          this.meta = meta;
          this.loading = false;
        },
        error: () => {
          this.loading = false;
        },
      });
  }

  toggleMenu(id: number, event: MouseEvent): void {
    event.stopPropagation();
    this.openMenuId = this.openMenuId === id ? null : id;
  }

  closeMenu(): void {
    this.openMenuId = null;
  }

  async toggleEstadoCatalogo(item: Catalogo): Promise<void> {
    const accion = item.estado ? 'deshabilitar' : 'habilitar';
    const confirmado = await this.alertService.confirm({
      title: `¿${item.estado ? 'Deshabilitar' : 'Habilitar'} catálogo?`,
      text: `Se ${accion}á "${item.nombre}".`,
      confirmButtonColor: item.estado ? '#d33' : '#16a34a',
      confirmButtonText: `Sí, ${accion}`,
    });
    if (!confirmado) return;
    this.procesandoId = item.id;
    const call$ = this.catService.toggleCatalogo(item.id, !item.estado);
    call$
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
              `Catálogo ${item.estado ? 'deshabilitado' : 'habilitado'}.`,
              '¡Listo!',
            );
            this.cargarPagina(this.currentPage);
          }),
        error: () =>
          this.zone.run(() =>
            this.toastrAlert.showError(`No se pudo ${accion} el catálogo.`, 'Error'),
          ),
      });
  }
}
