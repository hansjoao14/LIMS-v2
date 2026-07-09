import { Component } from '@angular/core';
import { ReportFormulario } from '../../../interfaces/admin-formularios/report-formulario.interface';
import { FormularioDetalle } from '../formulario-detalle/formulario-detalle';
import { PageHeader } from '../../../shared/components/page-header/page-header';
import { AdminFormulariosLista } from './lista/admin-formularios-lista';
import { AdminFormulariosFormulario } from './formulario/admin-formularios-formulario';

@Component({
  selector: 'app-admin-formularios',
  standalone: true,
  imports: [FormularioDetalle, PageHeader, AdminFormulariosLista, AdminFormulariosFormulario],
  templateUrl: './admin-formularios.html',
  styleUrl: './admin-formularios.css',
})
export class AdminFormularios {
  vista: 'lista' | 'formulario' = 'lista';
  formularioSeleccionado: ReportFormulario | null = null;

  irAFormulario(): void {
    this.vista = 'formulario';
  }

  onGuardado(): void {
    this.vista = 'lista';
  }

  onCancelado(): void {
    this.vista = 'lista';
  }

  abrirDetalle(formulario: ReportFormulario): void {
    this.formularioSeleccionado = formulario;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  regresarLista(): void {
    this.formularioSeleccionado = null;
  }
}
