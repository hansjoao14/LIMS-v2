import {
  Component,
  OnInit,
  OnDestroy,
  OnChanges,
  SimpleChanges,
  Output,
  EventEmitter,
  Input,
  NgZone,
  computed,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject, takeUntil, finalize, switchMap, of, map } from 'rxjs';

import { EnsayoService } from '../../../../services/ensayo.service';
import { CatalogoService } from '../../../../services/catalogo.service';
import { EnsayoItem, EnsayoItemNode } from '../../../../interfaces/ensayos/ensayo.interface';
import { ItemCatalogo } from '../../../../interfaces/catalogos/catalogo.interface';
import { buildFlatNodes } from '../../../../core/utils/ensayo-tree.utils';
import { AuthService } from '../../../auth/service/auth-service';
import { ToastrAlertService } from '../../../../services/toastr.service';
import { AlertService } from '../../../../services/alert.service';
import { AppRole, MenuKey, hasPermission } from '../../../../core/utils/roles.constans';
import { abrirMenuHaciaArriba } from '../../../../core/utils/dropdown-position.utils';
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

  // La clave real de un EnsayoItem es compuesta (ctambiental_id +
  // cttipo_ensayo_id + ensayo_id) — un mismo ctambiental_id puede repetirse
  // con distinto cttipo_ensayo_id, así que ctambiental_id solo no identifica
  // la fila de forma única (ver itemKey()).
  openMenuId: string | null = null;
  procesandoId: string | null = null;

  private readonly destroy$ = new Subject<void>();

  private userAppRole = computed<AppRole | null>(() => {
    const roles = this.authService.userProfile()?.roles ?? [];
    return (Object.values(AppRole) as AppRole[]).find((r) => roles.includes(r)) ?? null;
  });

  canEdit = computed(() => {
    const r = this.userAppRole();
    return r ? hasPermission(MenuKey.ADMIN_ENSAYOS, r, 'editar') : false;
  });
  canDelete = computed(() => {
    const r = this.userAppRole();
    return r ? hasPermission(MenuKey.ADMIN_ENSAYOS, r, 'eliminar') : false;
  });
  canCrear = computed(() => {
    const r = this.userAppRole();
    return r ? hasPermission(MenuKey.ADMIN_ENSAYOS, r, 'crear') : false;
  });

  get hasAnyAction(): boolean {
    return this.canEdit() || this.canDelete();
  }

  constructor(
    private ensayoService: EnsayoService,
    private catService: CatalogoService,
    private authService: AuthService,
    private zone: NgZone,
    private toastrAlert: ToastrAlertService,
    private alertService: AlertService,
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

    this.ensayoService
      .getEnsayoItems(this.ensayoId)
      .pipe(
        switchMap((items) => {
          const knownIds = new Set(items.map((ei) => ei.ctambiental_id));

          const externalIds = [
            ...new Set(
              items
                .map((ei) => ei.item_catalogo?.item_catalogo_id)
                .filter((id): id is number => id !== null && id !== undefined && !knownIds.has(id)),
            ),
          ];

          if (externalIds.length === 0) {
            return of({ items, externalParents: [] as ItemCatalogo[] });
          }

          return this.catService
            .getItemsByIds(externalIds)
            .pipe(map((parents) => ({ items, externalParents: parents })));
        }),
        takeUntil(this.destroy$),
      )
      .subscribe({
        next: ({ items, externalParents }) => {
          const knownIds = new Set(items.map((ei) => ei.ctambiental_id));
          const extMap = new Map(externalParents.map((p) => [p.id, p]));
          this.flatNodes = buildFlatNodes(items, extMap, knownIds, null, 0);
          this.loading = false;
        },
        error: () => {
          this.loading = false;
        },
      });
  }

  itemKey(item: EnsayoItem): string {
    return `${item.ctambiental_id}-${item.cttipo_ensayo_id}-${item.ensayo_id}`;
  }

  toggleMenu(id: string, event: MouseEvent): void {
    event.stopPropagation();
    this.openMenuId = this.openMenuId === id ? null : id;
  }

  abrirHaciaArriba(index: number): boolean {
    return abrirMenuHaciaArriba(index, this.flatNodes.length);
  }

  closeMenu(): void {
    this.openMenuId = null;
  }

  async toggleEstadoItem(item: EnsayoItem): Promise<void> {
    const accion = item.estado ? 'deshabilitar' : 'habilitar';
    const nombre = item.item_catalogo?.nombre ?? `ítem #${item.ctambiental_id}`;
    // El endpoint identifica la fila por los tres ids de la clave compuesta:
    // sin cttipo_ensayo_id no hay ruta que llamar.
    if (item.cttipo_ensayo_id === null) {
      this.toastrAlert.showError(
        `"${nombre}" no tiene tipo de ensayo asociado, no se puede ${accion}.`,
        'Error',
      );
      return;
    }
    const confirmado = await this.alertService.confirm({
      title: `¿${item.estado ? 'Deshabilitar' : 'Habilitar'} ítem?`,
      text: `Se ${accion}á "${nombre}".`,
      confirmButtonColor: item.estado ? '#d33' : '#16a34a',
      confirmButtonText: `Sí, ${accion}`,
    });
    if (!confirmado) return;
    this.procesandoId = this.itemKey(item);
    this.ensayoService
      .toggleEnsayoItem(item.ensayo_id, item.ctambiental_id, item.cttipo_ensayo_id, !item.estado)
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
              `Ítem ${item.estado ? 'deshabilitado' : 'habilitado'}.`,
              '¡Listo!',
            );
            this.cargarDatos();
          }),
        error: () =>
          this.zone.run(() => this.toastrAlert.showError(`No se pudo ${accion} el ítem.`, 'Error')),
      });
  }
}
