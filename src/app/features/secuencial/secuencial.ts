import { Component } from '@angular/core';
import { PageHeader } from '../../shared/components/page-header/page-header';
import { SecuencialLista } from './lista/secuencial-lista';
import { SecuencialFormulario } from './formulario/secuencial-formulario';
import { Secuencial as SecuencialModel } from '../../interfaces/secuencial/secuencial.interface';

@Component({
  selector: 'app-secuencial',
  imports: [PageHeader, SecuencialLista, SecuencialFormulario],
  templateUrl: './secuencial.html',
  styleUrl: './secuencial.css',
})
export class Secuencial {
  vista: 'lista' | 'formulario' = 'lista';
  editingRecord: SecuencialModel | null = null;

  irAFormulario(): void {
    this.editingRecord = null;
    this.vista = 'formulario';
  }

  onEditar(record: SecuencialModel): void {
    this.editingRecord = record;
    this.vista = 'formulario';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  volverALista(): void {
    this.editingRecord = null;
    this.vista = 'lista';
  }
}
