import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';

import { Subject, takeUntil } from 'rxjs';
import { CatalogoService } from '../../../../services/catalogo.service';
import { EnsayoItemService } from '../../../../services/solicitudes/solicitud-trabajo/ensayo-item.service';

import {
  ItemCatalogo,
  EnsayoItem,
  EnsayoLaboratorio,
  EnsayoMuestreo,
} from '../../../../interfaces';

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
export class Step3CatalogoComponent implements OnInit, OnDestroy {
  @Input() ensayosAire: EnsayoLaboratorio[] = [];
  @Input() ensayosRuido: EnsayoLaboratorio[] = [];
  @Input() ruidoInfo: any = {};
  @Input() notasAgua: string[] = [];
  @Input() notasAire: string[] = [];
  @Input() notasRuido: string[] = [];
  @Output() next = new EventEmitter<MatrizConHijosUI[]>();
  @Output() prev = new EventEmitter<void>();

  readonly CATALOGO_MATRICES_ID = 17;
  readonly ENSAYO_ID_MUESTREO = 19;

  matricesConHijos: MatrizConHijosUI[] = [];
  loading = true;
  loadingEnsayos = false;

  ensayosMuestreo: EnsayoMuestreo[] = [];
  ensayosResiduales: EnsayoLaboratorio[] = [];

  private destroy$ = new Subject<void>();

  constructor(
    private catalogoService: CatalogoService,
    private ensayoItemService: EnsayoItemService,
    private spinner: NgxSpinnerService,
  ) {}

  ngOnInit(): void {
    this.spinner.show('catalogo-step3');
    this.getMatricesConHijos();
  }

  toggleMatrizCollapse(idx: number): void {
    this.matricesConHijos[idx].collapsed = !this.matricesConHijos[idx].collapsed;
  }

  toggleHijo(matrizIdx: number, hijoIdx: number): void {
    const grupo = this.matricesConHijos[matrizIdx];
    const hijo = grupo.hijos[hijoIdx];
    hijo.activo = !hijo.activo;
    if (!hijo.activo) hijo.cantidad = null;

    if (this.isMatriz(grupo, 'agua')) {
      this.cargarEnsayosAgua(grupo);
    }
  }

  private getMatricesConHijos(): void {
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

  private cargarEnsayosAgua(grupo: MatrizConHijosUI): void {
    const hijoActivo = grupo.hijos.find((h) => h.activo);
    if (!hijoActivo) {
      this.ensayosMuestreo = [];
      this.ensayosResiduales = [];
      return;
    }

    this.loadingEnsayos = true;
    this.ensayoItemService
      .getEnsayosByCtAmbiental(hijoActivo.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (items) => {
          this.ensayosMuestreo = items
            .filter((i) => i.ensayo_id === this.ENSAYO_ID_MUESTREO)
            .map((i) => this.mapToMuestreo(i));
          this.ensayosResiduales = items
            .filter((i) => i.ensayo_id !== this.ENSAYO_ID_MUESTREO)
            .map((i) => this.mapToLaboratorio(i));
          this.loadingEnsayos = false;
        },
        error: () => (this.loadingEnsayos = false),
      });
  }

  private mapToMuestreo(item: EnsayoItem): EnsayoMuestreo {
    const partes = item.ensayo.metodo.split(',');
    return {
      activo: false,
      producto: item.ensayo.analisis,
      parametro: item.ensayo.identificacion,
      metodoInterno: partes[0]?.trim() ?? '',
      metodoReferencia: partes.slice(1).join(',').trim(),
    };
  }

  private mapToLaboratorio(item: EnsayoItem): EnsayoLaboratorio {
    const partes = item.ensayo.metodo.split(',');
    return {
      activo: false,
      ensayo: item.ensayo.analisis,
      identificacion: item.ensayo.identificacion,
      metodoInterno: partes[0]?.trim() ?? '',
      metodoReferencia: partes.slice(1).join(',').trim(),
      unidad: item.ensayo.item_catalogo?.sigla ?? item.ensayo.item_catalogo?.nombre ?? '',
    };
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

  toggleEnsayoMuestreo(idx: number): void {
    this.ensayosMuestreo[idx].activo = !this.ensayosMuestreo[idx].activo;
  }
  toggleEnsayoResidual(idx: number): void {
    this.ensayosResiduales[idx].activo = !this.ensayosResiduales[idx].activo;
  }
  toggleEnsayoAire(idx: number): void {
    this.ensayosAire[idx].activo = !this.ensayosAire[idx].activo;
  }
  toggleEnsayoRuido(idx: number): void {
    this.ensayosRuido[idx].activo = !this.ensayosRuido[idx].activo;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
