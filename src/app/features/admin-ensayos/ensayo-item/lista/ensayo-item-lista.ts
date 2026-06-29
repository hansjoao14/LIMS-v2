import {
  Component, OnInit, OnDestroy, OnChanges, SimpleChanges,
  Output, EventEmitter, Input, NgZone, computed,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject, takeUntil, finalize, switchMap, of, map } from 'rxjs';
import Swal from 'sweetalert2';

import { EnsayoService } from '../../../../services/ensayo.service';
import { CatalogoService } from '../../../../services/catalogo.service';
import { EnsayoItem, EnsayoItemNode } from '../../../../interfaces/ensayos/ensayo.interface';
import { ItemCatalogo } from '../../../../interfaces/catalogos/catalogo.interface';
import { buildFlatNodes } from '../../../../core/utils/ensayo-tree.utils';
import { AuthService } from '../../../auth/service/auth-service';
import { ToastrAlertService } from '../../../../services/toastr.service';
import { AppRole, MenuKey, hasPermission } from '../../../../core/utils/roles.constans';
import { TableSkeleton } from '../../../../ui/table-skeleton/table-skeleton';

@Component({
  selector: 'app-ensayo-item-lista',
  imports: [CommonModule, TableSkeleton],
  templateUrl: './ensayo-item-lista.html',
})
export class EnsayoItemLista implements OnInit, OnDestroy, OnChanges {
  @Input() ensayoId: number | null = null;
  @Input() reloadTrigger = 0;
  @Output() nuevo = new EventEmitter<void>();
  @Output() editar = new EventEmitter<EnsayoItem>();

  loading = true;
  flatNodes: EnsayoItemNode[] = [];

  openMenuId: number | null = null; // ctambiental_id
  menuItem: EnsayoItem | null = null;
  menuPos: { top: number; right: number } | null = null;
  procesandoId: number | null = null; // ctambiental_id

  private readonly destroy$ = new Subject<void>();

  private userAppRole = computed<AppRole | null>(() => {
    const roles = this.authService.userProfile()?.roles ?? [];
    return (Object.values(AppRole) as AppRole[]).find(r => roles.includes(r)) ?? null;
  });

  canEdit   = computed(() => { const r = this.userAppRole(); return r ? hasPermission(MenuKey.ADMIN_ENSAYOS, r, 'editar')   : false; });
  canDelete = computed(() => { const r = this.userAppRole(); return r ? hasPermission(MenuKey.ADMIN_ENSAYOS, r, 'eliminar') : false; });
  canCrear  = computed(() => { const r = this.userAppRole(); return r ? hasPermission(MenuKey.ADMIN_ENSAYOS, r, 'crear')    : false; });

  get hasAnyAction(): boolean { return this.canEdit() || this.canDelete(); }

  constructor(
    private ensayoService: EnsayoService,
    private catService: CatalogoService,
    private authService: AuthService,
    private zone: NgZone,
    private toastrAlert: ToastrAlertService,
  ) {}

  ngOnInit(): void {
    if (this.ensayoId !== null) this.cargarDatos();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (
      (changes['ensayoId'] && !changes['ensayoId'].firstChange) ||
      (changes['reloadTrigger'] && !changes['reloadTrigger'].firstChange)
    ) {
      if (this.ensayoId !== null) this.cargarDatos();
      else this.flatNodes = [];
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  cargarDatos(): void {
    if (this.ensayoId === null) return;
    this.loading = true;

    this.ensayoService.getEnsayoItems(this.ensayoId)
      .pipe(
        switchMap((items) => {
          const knownIds = new Set(items.map(ei => ei.ctambiental_id));

          const externalIds = [...new Set(
            items
              .map(ei => ei.item_catalogo?.item_catalogo_id)
              .filter((id): id is number => id !== null && id !== undefined && !knownIds.has(id)),
          )];

          if (externalIds.length === 0) {
            return of({ items, externalParents: [] as ItemCatalogo[] });
          }

          return this.catService.getItemsByIds(externalIds).pipe(
            map(parents => ({ items, externalParents: parents })),
          );
        }),
        takeUntil(this.destroy$),
      )
      .subscribe({
        next: ({ items, externalParents }) => {
          const knownIds = new Set(items.map(ei => ei.ctambiental_id));
          const extMap = new Map(externalParents.map(p => [p.id, p]));
          this.flatNodes = buildFlatNodes(items, extMap, knownIds, null, 0);
          this.loading = false;
        },
        error: () => { this.loading = false; },
      });
  }

  toggleMenu(id: number, item: EnsayoItem, event: MouseEvent): void {
    event.stopPropagation();
    if (this.openMenuId === id) {
      this.openMenuId = null; this.menuItem = null; this.menuPos = null;
    } else {
      const btn = event.currentTarget as HTMLElement;
      const rect = btn.getBoundingClientRect();
      this.openMenuId = id;
      this.menuItem = item;
      this.menuPos = { top: rect.bottom + 4, right: window.innerWidth - rect.right };
    }
  }

  closeMenu(): void {
    this.openMenuId = null; this.menuItem = null; this.menuPos = null;
  }

  async toggleEstadoItem(item: EnsayoItem): Promise<void> {
    const accion = item.estado ? 'deshabilitar' : 'habilitar';
    const nombre = item.item_catalogo?.nombre ?? `ítem #${item.ctambiental_id}`;
    const confirm = await Swal.fire({
      icon: 'warning',
      title: `¿${item.estado ? 'Deshabilitar' : 'Habilitar'} ítem?`,
      text: `Se ${accion}á "${nombre}".`,
      showCancelButton: true,
      confirmButtonColor: item.estado ? '#d33' : '#16a34a',
      cancelButtonColor: '#6b7280',
      confirmButtonText: `Sí, ${accion}`,
      cancelButtonText: 'Cancelar',
    });
    if (!confirm.isConfirmed) return;
    this.procesandoId = item.ctambiental_id;
    this.ensayoService.toggleEnsayoItem(item.ctambiental_id, item.ensayo_id, !item.estado)
      .pipe(takeUntil(this.destroy$), finalize(() => { this.procesandoId = null; }))
      .subscribe({
        next: () => this.zone.run(() => {
          this.toastrAlert.showSuccess(`Ítem ${item.estado ? 'deshabilitado' : 'habilitado'}.`, '¡Listo!');
          this.cargarDatos();
        }),
        error: () => this.zone.run(() =>
          this.toastrAlert.showError(`No se pudo ${accion} el ítem.`, 'Error'),
        ),
      });
  }
}
