import { Component } from '@angular/core';
import { PageHeader } from '../../shared/components/page-header/page-header';
import { OrdenTrabajoInSituLista } from './lista/orden-trabajo-in-situ-lista';
import { OrdenTrabajoInSituFormulario } from './formulario/orden-trabajo-in-situ-formulario';
import { ReportOrden } from '../../interfaces/solicitudes/orden-trabajo/report-orden.interface';

@Component({
  selector: 'app-orden-trabajo-in-situ',
  imports: [PageHeader, OrdenTrabajoInSituLista, OrdenTrabajoInSituFormulario],
  templateUrl: './orden-trabajo-in-situ.html',
  styleUrl: './orden-trabajo-in-situ.css',
})
export class OrdenTrabajoInSitu {
  vista: 'lista' | 'formulario' = 'lista';
  editingRecord: ReportOrden | null = null;

  irAFormulario(): void {
    this.editingRecord = null;
    this.vista = 'formulario';
  }

  onEditar(orden: ReportOrden): void {
    this.editingRecord = orden;
    this.vista = 'formulario';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  volverALista(): void {
    this.editingRecord = null;
    this.vista = 'lista';
  }
}
