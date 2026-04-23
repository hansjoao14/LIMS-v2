import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import Swal from 'sweetalert2';

import { ReportFormularioService } from '../../../services/admin-formularios/report-formulario.service';
import { ReportFormulario } from '../../../interfaces/admin-formularios/report-formulario.interface';
import { PaginationMeta } from '../../../interfaces/catalogos/catalogo.interface';
import { FormularioDetalle } from '../formulario-detalle/formulario-detalle';

@Component({
  selector: 'app-admin-formularios',
  standalone: true,
  imports: [CommonModule, FormsModule, FormularioDetalle],
  templateUrl: './admin-formularios.html',
  styleUrl: './admin-formularios.css',
})
export class AdminFormularios implements OnInit, OnDestroy {
  formularios: ReportFormulario[] = [];
  formulariosFiltrados: ReportFormulario[] = [];
  meta: PaginationMeta | null = null;
  loading = true;
  busqueda = '';

  formularioSeleccionado: ReportFormulario | null = null;

  private readonly destroy$ = new Subject<void>();

  constructor(private reportFormularioService: ReportFormularioService) {}

  ngOnInit(): void {
    this.cargarListaFormularios();
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
          Swal.fire('Error', 'No se pudo cargar la lista de formularios', 'error');
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

  abrirDetalle(formulario: ReportFormulario): void {
    this.formularioSeleccionado = formulario;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  regresarLista(): void {
    this.formularioSeleccionado = null;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
