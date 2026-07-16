import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';

import { EnsayoService } from '../../../../services/ensayo.service';
import { ToastrAlertService } from '../../../../services/toastr.service';
import { Ensayo, EnsayoPayload } from '../../../../interfaces/ensayos/ensayo.interface';
import { ItemCatalogoSelect } from '../../../../shared/components/item-catalogo-select/item-catalogo-select';

@Component({
  selector: 'app-ensayo-formulario',
  imports: [CommonModule, FormsModule, ItemCatalogoSelect],
  templateUrl: './ensayo-formulario.html',
})
export class EnsayoFormulario implements OnInit, OnDestroy {
  @Input() editingRecord: Ensayo | null = null;
  @Output() guardado = new EventEmitter<Ensayo>();
  @Output() cancelado = new EventEmitter<void>();

  private readonly destroy$ = new Subject<void>();

  // catalogo_id 2 = Unidad (los ítems seleccionables son sus hijos).
  readonly CATALOGO_UNIDAD = 2;

  saving = false;

  analisis = '';
  identificacion = '';
  metodo = '';
  ctunidad_id: number | null = null;

  get modoEdicion(): boolean {
    return !!this.editingRecord;
  }

  constructor(
    private ensayoService: EnsayoService,
    private toastrAlert: ToastrAlertService,
  ) {}

  ngOnInit(): void {
    if (this.editingRecord) {
      this.analisis = this.editingRecord.analisis;
      this.identificacion = this.editingRecord.identificacion;
      this.metodo = this.editingRecord.metodo;
      this.ctunidad_id = this.editingRecord.ctunidad_id;
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  guardar(): void {
    if (!this.analisis.trim()) {
      this.toastrAlert.showError('El análisis es obligatorio.', 'Campo requerido');
      return;
    }
    if (!this.identificacion.trim()) {
      this.toastrAlert.showError('La identificación es obligatoria.', 'Campo requerido');
      return;
    }
    if (!this.metodo.trim()) {
      this.toastrAlert.showError('El método es obligatorio.', 'Campo requerido');
      return;
    }
    if (!this.ctunidad_id) {
      this.toastrAlert.showError('La unidad es obligatoria.', 'Campo requerido');
      return;
    }

    this.saving = true;
    const payload: EnsayoPayload = {
      analisis: this.analisis.trim(),
      identificacion: this.identificacion.trim(),
      metodo: this.metodo.trim(),
      ctunidad_id: this.ctunidad_id,
    };

    const op$ = this.modoEdicion
      ? this.ensayoService.updateEnsayo(this.editingRecord!.id, payload)
      : this.ensayoService.createEnsayo(payload);

    op$.pipe(takeUntil(this.destroy$)).subscribe({
      next: (result) => {
        this.saving = false;
        this.toastrAlert.showSuccess(
          this.modoEdicion ? 'Ensayo actualizado correctamente.' : 'Ensayo creado correctamente.',
          this.modoEdicion ? '¡Actualizado!' : '¡Creado!',
        );
        this.guardado.emit(result);
      },
      error: () => {
        this.saving = false;
        this.toastrAlert.showError('No se pudo guardar el ensayo.', 'Error');
      },
    });
  }
}
