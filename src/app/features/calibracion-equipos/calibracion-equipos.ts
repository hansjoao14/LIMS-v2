import { Component } from '@angular/core';
import { PageHeader } from '../../shared/components/page-header/page-header';
import { CalibracionEquiposLista } from './lista/calibracion-equipos-lista';
import { CalibracionEquiposFormulario } from './formulario/calibracion-equipos-formulario';
import { CalibracionEquipo } from '../../interfaces/calibracion-equipos/calibracion-equipos.interface';

@Component({
  selector: 'app-calibracion-equipos',
  imports: [PageHeader, CalibracionEquiposLista, CalibracionEquiposFormulario],
  templateUrl: './calibracion-equipos.html',
  styleUrl: './calibracion-equipos.css',
})
export class CalibracionEquipos {
  vista: 'lista' | 'formulario' = 'lista';
  editingRecord: CalibracionEquipo | null = null;

  irAFormulario(): void {
    this.editingRecord = null;
    this.vista = 'formulario';
  }

  onEditar(record: CalibracionEquipo): void {
    this.editingRecord = record;
    this.vista = 'formulario';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  volverALista(): void {
    this.editingRecord = null;
    this.vista = 'lista';
  }
}
