import {
  Component, OnInit, OnDestroy, OnChanges, SimpleChanges,
  Output, EventEmitter, Input, NgZone, computed,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject, takeUntil, finalize } from 'rxjs';
import Swal from 'sweetalert2';

import { EnsayoService } from '../../../../services/ensayo.service';
import { EnsayoItem } from '../../../../interfaces/ensayos/ensayo.interface';
import { AuthService } from '../../../auth/service/auth-service';
import { ToastrAlertService } from '../../../../services/toastr.service';
import { AppRole, MenuKey, hasPermission } from '../../../../core/utils/roles.constans';

@Component({
  selector: 'app-ensayo-item-lista',
  imports: [CommonModule],
  templateUrl: './ensayo-item-lista.html',
})
export class EnsayoItemLista implements OnInit, OnDestroy, OnChanges {
  @Input() ensayoId: number | null = null;
  @Input() reloadTrigger = 0;
  @Output() nuevo = new EventEmitter<void>();
  @Output() editar = new EventEmitter<EnsayoItem>();

  loading = true;
  items: EnsayoItem[] = [];

  openMenuId: number | null = null; // uses ctambiental_id
  menuItem: EnsayoItem | null = null;
  menuPos: { top: number; right: number } | null = null;
  procesandoId: number | null = null; // uses ctambiental_id

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
    if (this.ensayoId !== null) {
      this.cargarDatos();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (
      (changes['ensayoId'] && !changes['ensayoId'].firstChange) ||
      (changes['reloadTrigger'] && !changes['reloadTrigger'].firstChange)
    ) {
      if (this.ensayoId !== null) {
        this.cargarDatos();
      } else {
        this.items = [];
      }
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
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => {
          this.items = data;
          this.loading = false;
        },
        error: () => { this.loading = false; },
      });
  }

  toggleMenu(id: number, item: EnsayoItem, event: MouseEvent): void {
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
    const call$ = this.ensayoService.toggleEnsayoItem(item.ctambiental_id, item.ensayo_id, !item.estado);
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
}
