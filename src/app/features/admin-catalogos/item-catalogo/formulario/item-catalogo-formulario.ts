import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';

import { CatalogoService } from '../../../../services/catalogo.service';
import { ToastrAlertService } from '../../../../services/toastr.service';
import { Catalogo, ItemCatalogo } from '../../../../interfaces/catalogos/catalogo.interface';
import { ItemCatalogoSelect } from '../../../../shared/components/item-catalogo-select/item-catalogo-select';
import { NotaValor, parsearNotasValor } from '../../../../core/utils/valor-notas.utils';

@Component({
  selector: 'app-item-catalogo-formulario',
  imports: [CommonModule, FormsModule, ItemCatalogoSelect],
  templateUrl: './item-catalogo-formulario.html',
})
export class ItemCatalogoFormulario implements OnInit, OnDestroy {
  @Input() catalogo!: Catalogo;
  @Input() editingRecord: ItemCatalogo | null = null;
  @Output() guardado = new EventEmitter<void>();
  @Output() cancelado = new EventEmitter<void>();

  private readonly destroy$ = new Subject<void>();

  saving = false;

  nombre = '';
  sigla = '';
  valor = '';
  grupo = '';
  orden: number | null = null;
  itemCatalogoId: number | null = null;

  // "texto" = Valor es un string simple (comportamiento de siempre).
  // "notas" = Valor es la lista de notas en JSON, editada fila por fila.
  modoValor: 'texto' | 'notas' = 'texto';
  notas: NotaValor[] = [];

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

      const notasDetectadas = parsearNotasValor(this.valor);
      if (notasDetectadas) {
        this.modoValor = 'notas';
        this.notas = notasDetectadas;
      }
    }
  }

  activarModoNotas(): void {
    this.modoValor = 'notas';
    if (this.notas.length === 0) this.agregarNota();
  }

  activarModoTexto(): void {
    this.modoValor = 'texto';
  }

  agregarNota(): void {
    this.notas.push({ header: '', detail: '' });
  }

  eliminarNota(idx: number): void {
    this.notas.splice(idx, 1);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  guardar(): void {
    if (!this.nombre.trim()) {
      this.toastrAlert.showError('El nombre es obligatorio.', 'Campo requerido');
      return;
    }
    if (
      this.modoValor === 'notas' &&
      this.notas.some((n) => !n.header.trim() || !n.detail.trim())
    ) {
      this.toastrAlert.showError(
        'Completa el título y el detalle de cada nota, o elimina las filas vacías.',
        'Campo requerido',
      );
      return;
    }
    this.saving = true;
    const valorFinal =
      this.modoValor === 'notas' ? JSON.stringify(this.notas, null, 3) : this.valor.trim() || null;
    const payload = {
      catalogo_id: this.catalogo.id,
      nombre: this.nombre.trim(),
      sigla: this.sigla.trim() || null,
      valor: valorFinal,
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

  onPadreChange(id: number | null): void {
    this.itemCatalogoId = id;
  }
}
