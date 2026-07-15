import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-step4-confirmacion',
  standalone: true,
  imports: [],
  templateUrl: './step4-confirmacion.html',
})
export class Step4ConfirmacionComponent {
  @Input() secuencialAsignado: string | null = null;
  @Output() prev = new EventEmitter<void>();
  @Output() iniciarAcuerdos = new EventEmitter<void>();
  @Output() nuevaSolicitud = new EventEmitter<void>();
}
