import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-step3-catalogo',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './step3-catalogo.html',
})
export class Step3CatalogoComponent {
  @Input() catalogoServicios: any[] = [];
  @Input() ensayosMuestreo: any[] = [];
  @Input() ensayosResiduales: any[] = [];
  @Input() ensayosAire: any[] = [];
  @Input() ensayosRuido: any[] = [];
  @Input() ruidoInfo: any = {};
  @Input() notasAgua: string[] = [];
  @Input() notasAire: string[] = [];
  @Input() notasRuido: string[] = [];
  @Output() next = new EventEmitter<void>();
  @Output() prev = new EventEmitter<void>();

  toggleMatrizCollapse(idx: number): void {
    this.catalogoServicios[idx].collapsed = !this.catalogoServicios[idx].collapsed;
  }

  toggleServicio(matrizIdx: number, servicioIdx: number): void {
    const s = this.catalogoServicios[matrizIdx].servicios[servicioIdx];
    s.activo = !s.activo;
    if (!s.activo) s.cantidad = null;
  }

  toggleEnsayoMuestreo(idx: number): void { this.ensayosMuestreo[idx].activo = !this.ensayosMuestreo[idx].activo; }
  toggleEnsayoResidual(idx: number): void { this.ensayosResiduales[idx].activo = !this.ensayosResiduales[idx].activo; }
  toggleEnsayoAire(idx: number): void { this.ensayosAire[idx].activo = !this.ensayosAire[idx].activo; }
  toggleEnsayoRuido(idx: number): void { this.ensayosRuido[idx].activo = !this.ensayosRuido[idx].activo; }
}
