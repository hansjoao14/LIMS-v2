import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subject, takeUntil, switchMap, of, map } from 'rxjs';

import { CatalogoService } from '../../../../services/catalogo.service';
import { ToastrAlertService } from '../../../../services/toastr.service';
import { Catalogo, ItemCatalogo } from '../../../../interfaces/catalogos/catalogo.interface';
import { FieldSkeleton } from '../../../../ui/field-skeleton/field-skeleton';

export interface ItemPadreOpcion {
  id: number;
  label: string;
  level: number;
}

@Component({
  selector: 'app-item-catalogo-formulario',
  imports: [CommonModule, FormsModule, FieldSkeleton],
  templateUrl: './item-catalogo-formulario.html',
})
export class ItemCatalogoFormulario implements OnInit, OnDestroy {
  @Input() catalogo!: Catalogo;
  @Input() editingRecord: ItemCatalogo | null = null;
  @Output() guardado = new EventEmitter<void>();
  @Output() cancelado = new EventEmitter<void>();

  private readonly destroy$ = new Subject<void>();

  saving = false;
  loadingPadres = true;
  opcionesPadre: ItemPadreOpcion[] = [];

  nombre = '';
  sigla = '';
  valor = '';
  grupo = '';
  orden: number | null = null;
  itemCatalogoId: number | null = null;

  get modoEdicion(): boolean {
    return !!this.editingRecord;
  }

  constructor(
    private catService: CatalogoService,
    private toastrAlert: ToastrAlertService,
  ) {}

  ngOnInit(): void {
    if (this.editingRecord) {
      this.nombre = this.editingRecord.nombre;
      this.sigla = this.editingRecord.sigla ?? '';
      this.valor = this.editingRecord.valor ?? '';
      this.grupo = this.editingRecord.grupo ?? '';
      this.orden = this.editingRecord.orden;
      this.itemCatalogoId = this.editingRecord.item_catalogo_id;
    }
    this.cargarPadres();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  cargarPadres(): void {
    this.loadingPadres = true;
    this.catService.getAllItemsAdmin(this.catalogo.id)
      .pipe(
        takeUntil(this.destroy$),
        switchMap((items) => {
          const knownIds = new Set(items.map(i => i.id));

          // IDs that appear as a parent reference in this catalog
          const parentIdsInUse = new Set(
            items.map(i => i.item_catalogo_id).filter((id): id is number => id !== null),
          );

          // Todos los ítems de este catálogo pueden ser padre (no solo los
          // que ya tienen un hijo) — excluye el que se está editando para
          // evitar ciclos.
          const internalParents = items.filter(
            i => i.id !== this.editingRecord?.id,
          );

          // External parent IDs: referenced by items in this catalog but not belonging to it
          const externalParentIds = [...new Set(
            [...parentIdsInUse].filter(id => !knownIds.has(id)),
          )];

          if (externalParentIds.length === 0) {
            return of({ internalParents, externalParents: [] as ItemCatalogo[] });
          }
          return this.catService.getItemsByIds(externalParentIds).pipe(
            map(ext => ({ internalParents, externalParents: ext })),
          );
        }),
      )
      .subscribe({
        next: ({ internalParents, externalParents }) => {
          this.opcionesPadre = [
            ...externalParents.map(p => ({ id: p.id, label: p.nombre, level: 0 })),
            ...internalParents.map(p => ({ id: p.id, label: p.nombre, level: 0 })),
          ];
          this.loadingPadres = false;
        },
        error: () => { this.loadingPadres = false; },
      });
  }

  get indentLabel(): (op: ItemPadreOpcion) => string {
    return (op) => ' '.repeat(op.level * 4) + (op.level > 0 ? '└ ' : '') + op.label;
  }

  guardar(): void {
    if (!this.nombre.trim()) {
      this.toastrAlert.showError('El nombre es obligatorio.', 'Campo requerido');
      return;
    }
    this.saving = true;
    const payload = {
      catalogo_id: this.catalogo.id,
      nombre: this.nombre.trim(),
      sigla: this.sigla.trim() || null,
      valor: this.valor.trim() || null,
      grupo: this.grupo.trim() || null,
      orden: this.orden,
      item_catalogo_id: this.itemCatalogoId,
    };

    const op$ = this.modoEdicion
      ? this.catService.updateItemCatalogo(this.editingRecord!.id, payload)
      : this.catService.createItemCatalogo(payload);

    op$.pipe(takeUntil(this.destroy$)).subscribe({
      next: () => {
        this.saving = false;
        this.toastrAlert.showSuccess(
          this.modoEdicion ? 'Ítem actualizado correctamente.' : 'Ítem creado correctamente.',
          this.modoEdicion ? '¡Actualizado!' : '¡Creado!',
        );
        this.guardado.emit();
      },
      error: () => {
        this.saving = false;
        this.toastrAlert.showError('No se pudo guardar el ítem.', 'Error');
      },
    });
  }

  onOrdenChange(val: string): void {
    const n = parseInt(val, 10);
    this.orden = isNaN(n) ? null : n;
  }

  onPadreChange(val: string): void {
    const n = parseInt(val, 10);
    this.itemCatalogoId = isNaN(n) ? null : n;
  }
}
