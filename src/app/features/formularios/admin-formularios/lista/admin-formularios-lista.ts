import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';

import { ReportFormularioService } from '../../../../services/admin-formularios/report-formulario.service';
import { ReportFormulario } from '../../../../interfaces/admin-formularios/report-formulario.interface';
import { PaginationMeta } from '../../../../interfaces/catalogos/catalogo.interface';
import { ToastrAlertService } from '../../../../services/toastr.service';
import { TableSkeleton } from '../../../../ui/table-skeleton/table-skeleton';

@Component({
  selector: 'app-admin-formularios-lista',
  imports: [CommonModule, FormsModule, TableSkeleton],
  templateUrl: './admin-formularios-lista.html',
})
export class AdminFormulariosLista implements OnInit, OnDestroy {
  @Output() nuevo = new EventEmitter<void>();
  @Output() verDetalle = new EventEmitter<ReportFormulario>();

  loading = true;
  formularios: ReportFormulario[] = [];
  formulariosFiltrados: ReportFormulario[] = [];
  meta: PaginationMeta | null = null;
  busqueda = '';

  private readonly destroy$ = new Subject<void>();

  constructor(
    private reportFormularioService: ReportFormularioService,
    private toastr: ToastrAlertService,
  ) {}

  ngOnInit(): void {
    this.cargarListaFormularios();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  cargarListaFormularios(): void {
    this.loading = true;
    this.reportFormularioService
      .getFormularios()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: ({ data, meta }) => {
          this.formularios = data;
          this.formulariosFiltrados = data;
          this.meta = meta;
          this.loading = false;
        },
        error: () => {
          this.loading = false;
          this.toastr.showError('No se pudo cargar la lista de formularios', 'Error');
        },
      });
  }

  filtrar(): void {
    const q = this.busqueda.toLowerCase().trim();
    this.formulariosFiltrados = q
      ? this.formularios.filter(
          (f) =>
            f.nombre.toLowerCase().includes(q) ||
            f.tipo_formulario.toLowerCase().includes(q) ||
            f.sigla.toLowerCase().includes(q),
        )
      : [...this.formularios];
  }
}
