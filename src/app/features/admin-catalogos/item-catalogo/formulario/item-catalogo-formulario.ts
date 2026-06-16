import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subject, takeUntil, switchMap, of } from 'rxjs';

import { CatalogoService } from '../../../../services/catalogo.service';
import { ToastrAlertService } from '../../../../services/toastr.service';
import { Catalogo, ItemCatalogo } from '../../../../interfaces/catalogos/catalogo.interface';

export interface ItemPadreOpcion {
  id: number;
  label: string;
  level: number;
}

function buildOpciones(items: ItemCatalogo[], parentId: number | null, level: number, excludeId: number | null): ItemPadreOpcion[] {
  const knownIds = new Set(items.map(i => i.id));
  const children = items
    .filter(i => {
      if (parentId === null) {
        return (i.item_catalogo_id === null || !knownIds.has(i.item_catalogo_id!)) && i.estado && i.id !== excludeId;
      }
      return i.item_catalogo_id === parentId && i.estado && i.id !== excludeId;
    })
    .sort((a, b) => (a.orden ?? 999) - (b.orden ?? 999));
  const result: ItemPadreOpcion[] = [];
  for (const item of children) {
    result.push({ id: item.id, label: item.nombre, level });
    result.push(...buildOpciones(items, item.id, level + 1, excludeId));
  }
  return result;
}

@Component({
  selector: 'app-item-catalogo-formulario',
  imports: [CommonModule, FormsModule],
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
    const parentId = this.editingRecord?.item_catalogo_id ?? null;

    this.catService.getAllItemsAdmin(this.catalogo.id)
      .pipe(
        takeUntil(this.destroy$),
        switchMap((items) => {
          this.opcionesPadre = buildOpciones(items, null, 0, this.editingRecord?.id ?? null);
          // Si el padre actual no está en la lista local, lo buscamos por ID
          const faltaPadre = parentId !== null && !this.opcionesPadre.some(o => o.id === parentId);
          return faltaPadre
            ? this.catService.getItemsByIds([parentId])
            : of([]);
        }),
      )
      .subscribe({
        next: (externos) => {
          if (externos.length > 0) {
            this.opcionesPadre.unshift({ id: externos[0].id, label: externos[0].nombre, level: 0 });
          }
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
