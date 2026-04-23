import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { SolicitudPdfData } from '../../../interfaces/solicitudes/solicitud-trabajo/solicitud-pdf.interface';

@Component({
  selector: 'app-solicitud-pdf',
  standalone: true,
  imports: [CommonModule, DatePipe],
  templateUrl: './solicitud-pdf.html',
})
export class SolicitudPdfComponent {
  @Input({ required: true }) datos!: SolicitudPdfData;
  @Output() cerrar = new EventEmitter<void>();

  imprimirPDF(): void {
    window.print();
  }
}
