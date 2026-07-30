import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { PageHeader } from '../../shared/components/page-header/page-header';

/** Una fila de la tabla de preservación de muestras. */
export interface PreservacionRow {
  preservacion: string;
  volumen: number | null;
  tipoRecipiente: string;
}

@Component({
  selector: 'app-ticket-entrega-muestras',
  standalone: true,
  imports: [CommonModule, FormsModule, PageHeader],
  templateUrl: './ticket-entrega-muestras.html',
  styleUrl: './ticket-entrega-muestras.css',
})
export class TicketEntregaMuestras {
  // TODO(datos): todo lo de abajo es contenido de maqueta. Cuando se defina la
  // funcionalidad hay que reemplazarlo por el detalle del plan de muestreo y la
  // metadata del formulario que devuelva el backend.

  // ── Cabecera ─────────────────────────────────────────────────────────────
  readonly codigoFormulario = 'F-I-53-01';
  readonly edicion = '02';
  readonly elaboradoPor = 'Tec. Jorge Diaz';
  readonly fechaSolicitud = new Date(2025, 4, 27);

  // ── Información de las muestras ──────────────────────────────────────────
  readonly planMuestreoNo = 'PM-058-25';
  codigoMuestra = '';
  /** Se llenará con los códigos de muestra del plan seleccionado. */
  readonly codigosMuestra: { id: string; nombre: string }[] = [];

  // ── Recepción de las muestras ────────────────────────────────────────────
  readonly entregadaPor = 'José Luis Montenegro';
  readonly recibidaPor = 'Karen Guerron';

  // ── Preservación de las muestras ─────────────────────────────────────────
  preservaciones: PreservacionRow[] = [
    { preservacion: 'Temperatura 0°C a 6°C', volumen: 7, tipoRecipiente: 'Vidrio opaco' },
    { preservacion: 'H2SO4', volumen: 3, tipoRecipiente: 'Vidrio opaco' },
    { preservacion: 'HNO3', volumen: 4, tipoRecipiente: 'Vidrio opaco' },
  ];

  // TODO(funcionalidad): armar el payload y llamar al servicio.
  guardar(): void {
    return;
  }
}
