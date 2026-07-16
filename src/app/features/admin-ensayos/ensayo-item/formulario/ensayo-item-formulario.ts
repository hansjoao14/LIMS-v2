import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';

import { EnsayoService } from '../../../../services/ensayo.service';
import { ToastrAlertService } from '../../../../services/toastr.service';
import {
  Ensayo,
  EnsayoItem,
  EnsayoItemPayload,
} from '../../../../interfaces/ensayos/ensayo.interface';
import { ItemCatalogoSelect } from '../../../../shared/components/item-catalogo-select/item-catalogo-select';

@Component({
  selector: 'app-ensayo-item-formulario',
  imports: [CommonModule, FormsModule, ItemCatalogoSelect],
  templateUrl: './ensayo-item-formulario.html',
})
export class EnsayoItemFormulario implements OnInit, OnDestroy {
  @Input() ensayo!: Ensayo;
  @Input() editingRecord: EnsayoItem | null = null;
  @Output() guardado = new EventEmitter<void>();
  @Output() cancelado = new EventEmitter<void>();

  private readonly destroy$ = new Subject<void>();

  // catalogo_id 18 = Tipo Ambiental (los ítems seleccionables son sus hijos).
  readonly CATALOGO_TIPO_AMBIENTAL = 18;
  // catalogo_id 1006 = Tipo de Ensayo (los ítems seleccionables son sus hijos).
  readonly CATALOGO_TIPO_ENSAYO = 1006;

  saving = false;

  ctambiental_id: number | null = null;
  cttipo_ensayo_id: number | null = null;

  get modoEdicion(): boolean {
    return !!this.editingRecord;
  }

  constructor(
    private ensayoService: EnsayoService,
    private toastrAlert: ToastrAlertService,
  ) {}

  ngOnInit(): void {
    if (this.editingRecord) {
      this.ctambiental_id = this.editingRecord.ctambiental_id;
      this.cttipo_ensayo_id = this.editingRecord.cttipo_ensayo_id;
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  guardar(): void {
    if (!this.ctambiental_id) {
      this.toastrAlert.showError('El tipo ambiental es obligatorio.', 'Campo requerido');
      return;
    }
    if (!this.cttipo_ensayo_id) {
      this.toastrAlert.showError('El tipo de ensayo es obligatorio.', 'Campo requerido');
      return;
    }

    this.saving = true;
    const payload: EnsayoItemPayload = {
      ctambiental_id: this.ctambiental_id,
      cttipo_ensayo_id: this.cttipo_ensayo_id,
      ensayo_id: this.ensayo.id,
    };

    const op$ = this.modoEdicion
      ? this.ensayoService.updateEnsayoItem(
          this.editingRecord!.ctambiental_id,
          this.editingRecord!.ensayo_id,
          payload,
        )
      : this.ensayoService.createEnsayoItem(payload);

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
}
