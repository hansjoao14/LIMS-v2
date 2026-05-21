import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-acceso-autorizado',
  imports: [],
  templateUrl: './acceso-autorizado.html',
  styleUrl: './acceso-autorizado.css',
})
export class AccesoAutorizado {
  @Input() size = 1.2;
  @Input() color = '#ffffff';
}
