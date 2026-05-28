import { Component } from '@angular/core';
import { PageHeader } from '../../shared/components/page-header/page-header';
import { OrdenTrabajoInSituLista } from './lista/orden-trabajo-in-situ-lista';
import { OrdenTrabajoInSituFormulario } from './formulario/orden-trabajo-in-situ-formulario';

@Component({
  selector: 'app-orden-trabajo-in-situ',
  imports: [PageHeader, OrdenTrabajoInSituLista, OrdenTrabajoInSituFormulario],
  templateUrl: './orden-trabajo-in-situ.html',
  styleUrl: './orden-trabajo-in-situ.css',
})
export class OrdenTrabajoInSitu {
  vista: 'lista' | 'formulario' = 'lista';

  irAFormulario(): void {
    this.vista = 'formulario';
  }

  volverALista(): void {
    this.vista = 'lista';
  }
}
