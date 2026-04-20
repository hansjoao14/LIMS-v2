import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { CatalogoService } from '../../../../services/catalogo.service';
import { ItemCatalogo } from '../../../../services/interfaces/catalogo.interface';

export interface ItemCatalogoUI extends ItemCatalogo {
  activo: boolean;
  cantidad: number | null;
}

export interface MatrizConHijosUI {
  matriz: ItemCatalogo;
  hijos: ItemCatalogoUI[];
  collapsed: boolean;
}

@Component({
  selector: 'app-step3-catalogo',
  standalone: true,
  imports: [CommonModule, FormsModule, NgxSpinnerModule],
  templateUrl: './step3-catalogo.html',
})
export class Step3CatalogoComponent implements OnInit {
  @Input() ensayosMuestreo: any[] = [];
  @Input() ensayosResiduales: any[] = [];
  @Input() ensayosAire: any[] = [];
  @Input() ensayosRuido: any[] = [];
  @Input() ruidoInfo: any = {};
  @Input() notasAgua: string[] = [];
  @Input() notasAire: string[] = [];
  @Input() notasRuido: string[] = [];
  @Output() next = new EventEmitter<MatrizConHijosUI[]>();
  @Output() prev = new EventEmitter<void>();

  readonly CATALOGO_MATRICES_ID = 17;

  matricesConHijos: MatrizConHijosUI[] = [];
  loading = true;

  constructor(
    private catalogoService: CatalogoService,
    private spinner: NgxSpinnerService,
  ) {}

  ngOnInit(): void {
    this.spinner.show('catalogo-step3');
    this.catalogoService.getMatricesConHijos(this.CATALOGO_MATRICES_ID).subscribe({
      next: (data) => {
        this.matricesConHijos = data.map((item) => ({
          collapsed: false,
          matriz: item.matriz,
          hijos: item.hijos.map((h) => ({ ...h, activo: false, cantidad: null })),
        }));
        this.loading = false;
        this.spinner.hide('catalogo-step3');
      },
      error: () => {
        this.loading = false;
        this.spinner.hide('catalogo-step3');
      },
    });
  }

  toggleMatrizCollapse(idx: number): void {
    this.matricesConHijos[idx].collapsed = !this.matricesConHijos[idx].collapsed;
  }

  toggleHijo(matrizIdx: number, hijoIdx: number): void {
    const hijo = this.matricesConHijos[matrizIdx].hijos[hijoIdx];
    hijo.activo = !hijo.activo;
    if (!hijo.activo) hijo.cantidad = null;
  }

  isMatriz(grupo: MatrizConHijosUI, nombre: string): boolean {
    return grupo.matriz.nombre.toLowerCase() === nombre.toLowerCase();
  }

  getAplicableLabel(matrizNombre: string): string {
    const nombre = matrizNombre.toLowerCase();
    if (nombre === 'agua') return 'NÚMERO DE MUESTRAS';
    if (nombre === 'aire') return 'NÚMERO DE FUENTES';
    if (nombre === 'ruido') return 'NÚMERO DE PUNTOS CRÍTICOS DE AFECTACIÓN';
    return 'CANTIDAD';
  }

  toggleEnsayoMuestreo(idx: number): void { this.ensayosMuestreo[idx].activo = !this.ensayosMuestreo[idx].activo; }
  toggleEnsayoResidual(idx: number): void { this.ensayosResiduales[idx].activo = !this.ensayosResiduales[idx].activo; }
  toggleEnsayoAire(idx: number): void { this.ensayosAire[idx].activo = !this.ensayosAire[idx].activo; }
  toggleEnsayoRuido(idx: number): void { this.ensayosRuido[idx].activo = !this.ensayosRuido[idx].activo; }
}
