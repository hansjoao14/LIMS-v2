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
  @Input() notasAgua: string[] = [];
  @Input() notasAire: string[] = [];
  @Input() notasRuido: string[] = [];
  @Input() estadoPrevio: MatrizConHijosUI[] = [];
  @Input() ensayosMuestreoPrevio: EnsayoMuestreo[] = [];
  @Input() ensayosResidualesPrevio: EnsayoLaboratorio[] = [];
  @Input() ensayosAirePrevio: EnsayoLaboratorio[] = [];
  @Input() ensayosRuidoPrevio: EnsayoLaboratorio[] = [];
  @Input() cargando = false;
  @Output() next = new EventEmitter<MatrizConHijosUI[]>();
  @Output() prev = new EventEmitter<void>();
  @Output() estadoCambiado = new EventEmitter<MatrizConHijosUI[]>();
  @Output() ensayosMuestreoCambiado = new EventEmitter<EnsayoMuestreo[]>();
  @Output() ensayosResidualesCambiado = new EventEmitter<EnsayoLaboratorio[]>();
  @Output() ensayosAireCambiado = new EventEmitter<EnsayoLaboratorio[]>();
  @Output() ensayosRuidoCambiado = new EventEmitter<EnsayoLaboratorio[]>();

  readonly CATALOGO_MATRICES_ID = 17;
  readonly ENSAYO_ID_MUESTREO = 19;

  matricesConHijos: MatrizConHijosUI[] = [];
  loading = true;
  loadingEnsayos = false;

  ensayosMuestreo: EnsayoMuestreo[] = [];
  ensayosResiduales: EnsayoLaboratorio[] = [];
  ensayosAireServer: EnsayoLaboratorio[] = [];
  ensayosRuidoServer: EnsayoLaboratorio[] = [];

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

    if (this.isMatriz(grupo, 'agua')) this.cargarEnsayosAgua(grupo);
    if (this.isMatriz(grupo, 'aire')) this.cargarEnsayosAire(grupo);
    if (this.isMatriz(grupo, 'ruido')) this.cargarEnsayosRuido(grupo);
    this.estadoCambiado.emit(this.matricesConHijos);
  }

  private getMatricesConHijos(): void {
    this.catalogoService.getMatricesConHijos(this.CATALOGO_MATRICES_ID).subscribe({
      next: (data) => {
        const previoHijos = this.estadoPrevio.flatMap((m) => m.hijos);
        this.matricesConHijos = data.map((item) => ({
          collapsed: false,
          matriz: item.matriz,
          hijos: item.hijos.map((h) => {
            const previo = previoHijos.find((ph) => ph.id === h.id);
            return { ...h, activo: previo?.activo ?? false };
          }),
        }));
        this.loading = false;
        this.spinner.hide('catalogo-step3');

        const aguaGrupo = this.matricesConHijos.find((m) => this.isMatriz(m, 'agua'));
        if (aguaGrupo?.hijos.some((h) => h.activo)) {
          this.cargarEnsayosAgua(aguaGrupo);
        }

        const aireGrupo = this.matricesConHijos.find((m) => this.isMatriz(m, 'aire'));
        if (aireGrupo?.hijos.some((h) => h.activo)) {
          this.cargarEnsayosAire(aireGrupo);
        }

        const ruidoGrupo = this.matricesConHijos.find((m) => this.isMatriz(m, 'ruido'));
        if (ruidoGrupo?.hijos.some((h) => h.activo)) {
          this.cargarEnsayosRuido(ruidoGrupo);
        }
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
            .map((i) => {
              const base = this.mapToMuestreo(i);
              const previo = this.ensayosMuestreoPrevio.find((p) => p.parametro === base.parametro);
              return { ...base, activo: previo?.activo ?? false };
            });
          this.ensayosResiduales = items
            .filter((i) => i.ensayo_id !== this.ENSAYO_ID_MUESTREO)
            .map((i) => {
              const base = this.mapToLaboratorio(i);
              const previo = this.ensayosResidualesPrevio.find(
                (p) => p.identificacion === base.identificacion,
              );
              return { ...base, activo: previo?.activo ?? false };
            });
          this.loadingEnsayos = false;
          this.ensayosMuestreoCambiado.emit(this.ensayosMuestreo);
          this.ensayosResidualesCambiado.emit(this.ensayosResiduales);
        },
        error: () => (this.loadingEnsayos = false),
      });
  }

  private cargarEnsayosAire(grupo: MatrizConHijosUI): void {
    const hijoActivo = grupo.hijos.find((h) => h.activo);
    if (!hijoActivo) {
      this.ensayosAireServer = [];
      this.ensayosAireCambiado.emit([]);
      return;
    }
    this.ensayoItemService
      .getEnsayosByCtAmbiental(hijoActivo.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (items) => {
          this.ensayosAireServer = items.map((i) => {
            const base = this.mapToLaboratorio(i);
            const previo = this.ensayosAirePrevio.find((p) => p.identificacion === base.identificacion);
            return { ...base, activo: previo?.activo ?? false };
          });
          this.ensayosAireCambiado.emit(this.ensayosAireServer);
        },
      });
  }

  private cargarEnsayosRuido(grupo: MatrizConHijosUI): void {
    const hijoActivo = grupo.hijos.find((h) => h.activo);
    if (!hijoActivo) {
      this.ensayosRuidoServer = [];
      this.ensayosRuidoCambiado.emit([]);
      return;
    }
    this.ensayoItemService
      .getEnsayosByCtAmbiental(hijoActivo.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (items) => {
          this.ensayosRuidoServer = items.map((i) => {
            const base = this.mapToLaboratorio(i);
            const previo = this.ensayosRuidoPrevio.find((p) => p.identificacion === base.identificacion);
            return { ...base, activo: previo?.activo ?? false };
          });
          this.ensayosRuidoCambiado.emit(this.ensayosRuidoServer);
        },
      });
  }

  private mapToMuestreo(item: EnsayoItem): EnsayoMuestreo {
    const partes = item.ensayo.metodo.split(',');
    return {
      activo: false,
      ensayo_id: item.ensayo_id,
      ctambiental_id: item.ctambiental_id,
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
      ensayo_id: item.ensayo_id,
      ctambiental_id: item.ctambiental_id,
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

  toggleEnsayoMuestreo(idx: number): void {
    this.ensayosMuestreo[idx].activo = !this.ensayosMuestreo[idx].activo;
    this.ensayosMuestreoCambiado.emit(this.ensayosMuestreo);
  }
  toggleEnsayoResidual(idx: number): void {
    this.ensayosResiduales[idx].activo = !this.ensayosResiduales[idx].activo;
    this.ensayosResidualesCambiado.emit(this.ensayosResiduales);
  }
  toggleEnsayoAire(idx: number): void {
    this.ensayosAireServer[idx].activo = !this.ensayosAireServer[idx].activo;
    this.ensayosAireCambiado.emit(this.ensayosAireServer);
  }
  toggleEnsayoRuido(idx: number): void {
    this.ensayosRuidoServer[idx].activo = !this.ensayosRuidoServer[idx].activo;
    this.ensayosRuidoCambiado.emit(this.ensayosRuidoServer);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
