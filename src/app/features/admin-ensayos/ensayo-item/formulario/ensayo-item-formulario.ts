import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';

import { EnsayoService } from '../../../../services/ensayo.service';
import { ToastrAlertService } from '../../../../services/toastr.service';
import { Ensayo, EnsayoItem, EnsayoItemPayload, ItemCatalogoOption } from '../../../../interfaces/ensayos/ensayo.interface';
import { FieldSkeleton } from '../../../../ui/field-skeleton/field-skeleton';

@Component({
  selector: 'app-ensayo-item-formulario',
  imports: [CommonModule, FormsModule, FieldSkeleton],
  templateUrl: './ensayo-item-formulario.html',
})
export class EnsayoItemFormulario implements OnInit, OnDestroy {
  @Input() ensayo!: Ensayo;
  @Input() editingRecord: EnsayoItem | null = null;
  @Output() guardado = new EventEmitter<void>();
  @Output() cancelado = new EventEmitter<void>();

  private readonly destroy$ = new Subject<void>();

  saving = false;
  loadingOptions = true;
  itemOptions: ItemCatalogoOption[] = [];

  ctambiental_id: number | null = null;

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
    }
    this.cargarOpciones();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  cargarOpciones(): void {
    this.loadingOptions = true;
    this.ensayoService.getItemCatalogoOptions()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => {
          this.itemOptions = data;
          this.loadingOptions = false;
        },
        error: () => { this.loadingOptions = false; },
      });
  }

  onAmbientalChange(val: string): void {
    const n = parseInt(val, 10);
    this.ctambiental_id = isNaN(n) ? null : n;
  }

  guardar(): void {
    if (!this.ctambiental_id) {
      this.toastrAlert.showError('El tipo ambiental es obligatorio.', 'Campo requerido');
      return;
    }

    this.saving = true;
    const payload: EnsayoItemPayload = {
      ctambiental_id: this.ctambiental_id,
      ensayo_id: this.ensayo.id,
    };

    const op$ = this.modoEdicion
      ? this.ensayoService.updateEnsayoItem(this.editingRecord!.ctambiental_id, this.editingRecord!.ensayo_id, payload)
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
