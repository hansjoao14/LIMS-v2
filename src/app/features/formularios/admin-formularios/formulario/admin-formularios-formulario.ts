import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';

import { AdminFormularioService } from '../services/admin-formulario-service';
import { CatalogoService } from '../../../../services/catalogo.service';
import { ToastrAlertService } from '../../../../services/toastr.service';
import { FormularioPayload } from '../../../../interfaces/admin-formularios/formulario-payload.interface';
import { ItemCatalogo } from '../../../../interfaces/catalogos/catalogo.interface';
import { FieldSkeleton } from '../../../../ui/field-skeleton/field-skeleton';

const CATALOGO_TIPOS_FORMULARIO_ID = 9;

@Component({
  selector: 'app-admin-formularios-formulario',
  imports: [CommonModule, FormsModule, FieldSkeleton],
  templateUrl: './admin-formularios-formulario.html',
})
export class AdminFormulariosFormulario implements OnInit, OnDestroy {
  @Output() guardado = new EventEmitter<void>();
  @Output() cancelado = new EventEmitter<void>();

  private readonly destroy$ = new Subject<void>();

  guardando = false;
  loadingTipos = true;
  tiposFormulario: ItemCatalogo[] = [];

  formData: FormularioPayload = this.emptyForm();

  constructor(
    private adminFormularioService: AdminFormularioService,
    private catService: CatalogoService,
    private toastr: ToastrAlertService,
  ) {}

  ngOnInit(): void {
    this.cargarTiposFormulario();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private cargarTiposFormulario(): void {
    this.loadingTipos = true;
    this.catService.getAllItemsAdmin(CATALOGO_TIPOS_FORMULARIO_ID)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (items) => {
          this.tiposFormulario = items;
          this.loadingTipos = false;
        },
        error: () => {
          this.loadingTipos = false;
          this.toastr.showError('No se pudo cargar los tipos de formulario', 'Error');
        },
      });
  }

  guardar(): void {
    if (!this.formData.nombre.trim() || !this.formData.sigla.trim()) {
      this.toastr.showError('Nombre y sigla son obligatorios.', 'Campo requerido');
      return;
    }
    if (!this.formData.ctformulario_id) {
      this.toastr.showError('Debes seleccionar un tipo de formulario.', 'Campo requerido');
      return;
    }

    this.guardando = true;
    const payload: FormularioPayload = {
      ...this.formData,
      fecha_emision: new Date(this.formData.fecha_emision).toISOString(),
    };

    this.adminFormularioService.crear(payload)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.guardando = false;
          this.toastr.showSuccess('Formulario creado correctamente.', 'Éxito');
          this.guardado.emit();
        },
        error: () => {
          this.guardando = false;
          this.toastr.showError('No se pudo crear el formulario.', 'Error');
        },
      });
  }

  private emptyForm(): FormularioPayload {
    return {
      nombre: '',
      sigla: '',
      version: 1,
      descripcion: '',
      fecha_emision: new Date().toISOString().split('T')[0],
      ctformulario_id: 0,
    };
  }
}
