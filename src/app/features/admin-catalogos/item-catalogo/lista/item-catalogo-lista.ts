import {
  Component, OnInit, OnDestroy, OnChanges, SimpleChanges,
  Output, EventEmitter, Input, NgZone, computed,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject, takeUntil, finalize, switchMap, of } from 'rxjs';
import Swal from 'sweetalert2';

import { CatalogoService } from '../../../../services/catalogo.service';
import { Catalogo, ItemCatalogo, PaginationMeta } from '../../../../interfaces/catalogos/catalogo.interface';
import { PaginationComponent } from '../../../../shared/components/pagination/pagination';
import { AuthService } from '../../../auth/service/auth-service';
import { ToastrAlertService } from '../../../../services/toastr.service';
import { AppRole, MenuKey, hasPermission } from '../../../../core/utils/roles.constans';

export interface ItemTree extends ItemCatalogo {
  level: number;
  hasChildren: boolean;
  expanded: boolean;
  isExternal: boolean; // padre de otro catálogo, solo como cabecera visual
}

function buildFlat(items: ItemCatalogo[], parentId: number | null, level: number, collapsed: Set<number>): ItemTree[] {
  const knownIds = new Set(items.map(i => i.id));

  const children = items
    .filter(i => {
      if (parentId === null) {
        return i.item_catalogo_id === null || !knownIds.has(i.item_catalogo_id!);
      }
      return i.item_catalogo_id === parentId;
    })
    .sort((a, b) => (a.orden ?? 999) - (b.orden ?? 999));

  const result: ItemTree[] = [];
  for (const item of children) {
    const hasChildren = items.some(i => i.item_catalogo_id === item.id);
    const isExpanded = !collapsed.has(item.id);
    const isExternal = (item as any)['_isExternal'] === true;
    result.push({ ...item, level, hasChildren, expanded: isExpanded, isExternal });
    if (isExpanded) {
      result.push(...buildFlat(items, item.id, level + 1, collapsed));
    }
  }
  return result;
}

function buildFakeMeta(total: number, page: number, pageSize: number): PaginationMeta {
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  return {
    total,
    totalPages,
    page,
    limit: pageSize,
    skip: (page - 1) * pageSize,
    hasNextPage: page < totalPages,
    hasPrevPage: page > 1,
    nextPage: page < totalPages ? page + 1 : null,
    prevPage: page > 1 ? page - 1 : null,
  };
}

@Component({
  selector: 'app-item-catalogo-lista',
  imports: [CommonModule, PaginationComponent],
  templateUrl: './item-catalogo-lista.html',
})
export class ItemCatalogoLista implements OnInit, OnDestroy, OnChanges {
  @Input() catalogo!: Catalogo;
  @Input() reloadTrigger = 0;
  @Output() nuevo = new EventEmitter<void>();
  @Output() editar = new EventEmitter<ItemCatalogo>();

  loading = true;
  allItems: ItemCatalogo[] = [];
  allFlatItems: ItemTree[] = [];
  pagedItems: ItemTree[] = [];
  meta: PaginationMeta | null = null;
  currentPage = 1;
  readonly PAGE_SIZE = 15;

  collapsedIds = new Set<number>();
  openMenuId: number | null = null;
  menuItem: ItemTree | null = null;
  menuPos: { top: number; right: number } | null = null;
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
    this.cargarDatos();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (
      (changes['catalogo'] && !changes['catalogo'].firstChange) ||
      (changes['reloadTrigger'] && !changes['reloadTrigger'].firstChange)
    ) {
      this.collapsedIds.clear();
      this.currentPage = 1;
      this.cargarDatos();
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  cargarDatos(): void {
    this.loading = true;

    this.catService.getAllItemsAdmin(this.catalogo.id)
      .pipe(
        takeUntil(this.destroy$),
        switchMap((localItems) => {
          // Detectar IDs de padres que no están en la lista local
          const localIds = new Set(localItems.map(i => i.id));
          const externalParentIds = [
            ...new Set(
              localItems
                .map(i => i.item_catalogo_id)
                .filter((pid): pid is number => pid !== null && !localIds.has(pid))
            ),
          ];

          if (externalParentIds.length === 0) {
            return of({ localItems, externalParents: [] as ItemCatalogo[] });
          }

          return this.catService.getItemsByIds(externalParentIds).pipe(
            switchMap(externalParents => of({ localItems, externalParents }))
          );
        }),
      )
      .subscribe({
        next: ({ localItems, externalParents }) => {
          // Marcar padres externos con flag interno para buildFlat
          const virtuales = externalParents.map(p => ({ ...p, _isExternal: true }));
          this.allItems = [...virtuales, ...localItems];
          this.rebuildFlat();
          this.loading = false;
        },
        error: () => { this.loading = false; },
      });
  }

  rebuildFlat(): void {
    this.allFlatItems = buildFlat(this.allItems, null, 0, this.collapsedIds);
    this.applyPage(this.currentPage);
  }

  applyPage(page: number): void {
    this.currentPage = page;
    const start = (page - 1) * this.PAGE_SIZE;
    this.pagedItems = this.allFlatItems.slice(start, start + this.PAGE_SIZE);
    this.meta = buildFakeMeta(this.allFlatItems.length, page, this.PAGE_SIZE);
  }

  toggleExpand(item: ItemTree, event: MouseEvent): void {
    event.stopPropagation();
    if (this.collapsedIds.has(item.id)) {
      this.collapsedIds.delete(item.id);
    } else {
      this.collapsedIds.add(item.id);
    }
    this.rebuildFlat();
  }

  toggleMenu(id: number, item: ItemTree, event: MouseEvent): void {
    event.stopPropagation();
    if (this.openMenuId === id) {
      this.openMenuId = null;
      this.menuItem = null;
      this.menuPos = null;
    } else {
      const btn = event.currentTarget as HTMLElement;
      const rect = btn.getBoundingClientRect();
      this.openMenuId = id;
      this.menuItem = item;
      this.menuPos = { top: rect.bottom + 4, right: window.innerWidth - rect.right };
    }
  }

  closeMenu(): void {
    this.openMenuId = null;
    this.menuItem = null;
    this.menuPos = null;
  }

  async toggleEstadoItem(item: ItemCatalogo): Promise<void> {
    const accion = item.estado ? 'deshabilitar' : 'habilitar';
    const confirm = await Swal.fire({
      icon: 'warning',
      title: `¿${item.estado ? 'Deshabilitar' : 'Habilitar'} ítem?`,
      text: `Se ${accion}á "${item.nombre}".`,
      showCancelButton: true,
      confirmButtonColor: item.estado ? '#d33' : '#16a34a',
      cancelButtonColor: '#6b7280',
      confirmButtonText: `Sí, ${accion}`,
      cancelButtonText: 'Cancelar',
    });
    if (!confirm.isConfirmed) return;
    this.procesandoId = item.id;
    const call$ = this.catService.toggleItemCatalogo(item.id, !item.estado);
    call$
      .pipe(takeUntil(this.destroy$), finalize(() => { this.procesandoId = null; }))
      .subscribe({
        next: () => this.zone.run(() => {
          this.toastrAlert.showSuccess(`Ítem ${item.estado ? 'deshabilitado' : 'habilitado'}.`, '¡Listo!');
          this.cargarDatos();
        }),
        error: () => this.zone.run(() =>
          this.toastrAlert.showError(`No se pudo ${accion} el ítem.`, 'Error')
        ),
      });
  }

  trackByFn(_: number, item: ItemTree): number {
    return item.id;
  }
}
