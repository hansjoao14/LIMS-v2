import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';

import { ReportFormularioService } from '../../../services/admin-formularios/report-formulario.service';
import { AdminFormularioService } from './services/admin-formulario-service';
import { CatalogoService } from '../../../services/catalogo.service';
import { ToastrAlertService } from '../../../services/toastr.service';
import { ReportFormulario } from '../../../interfaces/admin-formularios/report-formulario.interface';
import { FormularioPayload } from '../../../interfaces/admin-formularios/formulario-payload.interface';
import { ItemCatalogo, PaginationMeta } from '../../../interfaces/catalogos/catalogo.interface';
import { FormularioDetalle } from '../formulario-detalle/formulario-detalle';
import { LoadingComponent } from '../../../shared/components/loading/loading';

@Component({
  selector: 'app-admin-formularios',
  standalone: true,
  imports: [CommonModule, FormsModule, FormularioDetalle, LoadingComponent],
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

  mostrarFormulario = false;
  guardando = false;
  formData: FormularioPayload = this.emptyForm();
  tiposFormulario: ItemCatalogo[] = [];

  private readonly destroy$ = new Subject<void>();

  constructor(
    private reportFormularioService: ReportFormularioService,
    private adminFormularioService: AdminFormularioService,
    private cataloService: CatalogoService,
    private toastr: ToastrAlertService,
    private zone: NgZone,
  ) {}

  ngOnInit(): void {
    this.cargarListaFormularios();
    this.cargarTiposFormulario();
  }

  private cargarTiposFormulario(): void {
    this.cataloService
      .getItemsByCatalogoId(9)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: ({ data }) => (this.tiposFormulario = data),
        error: (err) =>
          this.toastr.showError(
            err?.error?.message ?? 'No se pudo cargar los tipos de formulario',
            'Error',
          ),
      });
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
        error: (err) => {
          this.loading = false;
          this.toastr.showError(
            err?.error?.message ?? 'No se pudo cargar la lista de formularios',
            'Error',
          );
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

  abrirFormNuevo(): void {
    this.formData = this.emptyForm();
    this.mostrarFormulario = true;
  }

  cerrarFormulario(): void {
    this.mostrarFormulario = false;
  }

  guardarFormulario(): void {
    this.guardando = true;
    const payload = {
      ...this.formData,
      fecha_emision: new Date(this.formData.fecha_emision).toISOString(),
    };
    this.adminFormularioService
      .crear(payload)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          console.log('Formulario creado:', res);
          this.zone.run(() => {
            this.guardando = false;
            this.cerrarFormulario();
            this.cargarListaFormularios();
            this.toastr.showSuccess('Formulario creado correctamente.', 'Éxito');
          });
        },
        error: (err) => {
          this.zone.run(() => {
            this.guardando = false;
            this.toastr.showError(
              err?.error?.message ?? 'No se pudo crear el formulario.',
              'Error',
            );
          });
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

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
