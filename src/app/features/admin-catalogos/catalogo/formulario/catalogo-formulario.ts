import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';

import { CatalogoService } from '../../../../services/catalogo.service';
import { ToastrAlertService } from '../../../../services/toastr.service';
import { Catalogo } from '../../../../interfaces/catalogos/catalogo.interface';

@Component({
  selector: 'app-catalogo-formulario',
  imports: [CommonModule, FormsModule],
  templateUrl: './catalogo-formulario.html',
})
export class CatalogoFormulario implements OnInit, OnDestroy {
  @Input() editingRecord: Catalogo | null = null;
  @Output() guardado = new EventEmitter<Catalogo>();
  @Output() cancelado = new EventEmitter<void>();

  private readonly destroy$ = new Subject<void>();

  saving = false;
  nombre = '';
  descripcion = '';

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
      this.descripcion = this.editingRecord.descripcion ?? '';
    }
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
    this.saving = true;
    const payload = {
      nombre: this.nombre.trim(),
      descripcion: this.descripcion.trim() || null,
    };

    const op$ = this.modoEdicion
      ? this.catService.updateCatalogo(this.editingRecord!.id, payload)
      : this.catService.createCatalogo(payload);

    op$.pipe(takeUntil(this.destroy$)).subscribe({
      next: (result) => {
        this.saving = false;
        this.toastrAlert.showSuccess(
          this.modoEdicion ? 'Catálogo actualizado correctamente.' : 'Catálogo creado correctamente.',
          this.modoEdicion ? '¡Actualizado!' : '¡Creado!',
        );
        this.guardado.emit(result);
      },
      error: () => {
        this.saving = false;
        this.toastrAlert.showError('No se pudo guardar el catálogo.', 'Error');
      },
    });
  }
}
