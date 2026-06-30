import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
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
export class Step3CatalogoComponent implements OnInit, OnChanges, OnDestroy {
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
  matrizSeleccionada = '';
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

  ngOnChanges(changes: SimpleChanges): void {
    const cambio = changes['estadoPrevio'];
    if (!cambio || this.loading || this.matricesConHijos.length === 0) return;

    const actual = (cambio.currentValue as MatrizConHijosUI[]) ?? [];

    const hayActivosEnPrevio  = actual.flatMap(m => m.hijos).some(h => h.activo);
    const yaHayActivosEnLocal = this.matricesConHijos.flatMap(m => m.hijos).some(h => h.activo);

    console.log('[step3:ngOnChanges]', JSON.parse(JSON.stringify({
      hayActivosEnPrevio,
      yaHayActivosEnLocal,
      accion: (hayActivosEnPrevio && !yaHayActivosEnLocal) ? 'aplicarEstadoPrevio' : 'omitido',
      previoHijos: actual.flatMap(m => m.hijos).map(h => ({ id: h.id, nombre: (h as any).nombre, activo: h.activo })),
    })));

    if (hayActivosEnPrevio && !yaHayActivosEnLocal) {
      this.aplicarEstadoPrevio();
    }
  }

  toggleMatrizCollapse(idx: number): void {
    this.matricesConHijos[idx].collapsed = !this.matricesConHijos[idx].collapsed;
  }

  toggleHijo(matrizIdx: number, hijoIdx: number): void {
    const grupo = this.matricesConHijos[matrizIdx];
    const hijo = grupo.hijos[hijoIdx];
    hijo.activo = !hijo.activo;

    if (this.isMatriz(grupo, 'agua')) this.cargarEnsayosAgua(grupo, hijoIdx);
    if (this.isMatriz(grupo, 'aire')) this.cargarEnsayosAire(grupo);
    if (this.isMatriz(grupo, 'ruido')) this.cargarEnsayosRuido(grupo);
    this.estadoCambiado.emit(this.matricesConHijos);
  }

  tieneHijosActivos(grupo: MatrizConHijosUI): boolean {
    return grupo.hijos.some((h) => h.activo);
  }

  contarHijosActivos(grupo: MatrizConHijosUI): number {
    return grupo.hijos.filter((h) => h.activo).length;
  }

  private getMatricesConHijos(): void {
    this.catalogoService.getMatricesConHijos(this.CATALOGO_MATRICES_ID).subscribe({
      next: (data) => {
        const previoHijos = this.estadoPrevio.flatMap((m) => m.hijos);
        const mapeo: { id: number; nombre: string; previoEncontrado: boolean; activo: boolean }[] = [];
        this.matricesConHijos = data.map((item) => ({
          collapsed: false,
          matriz: item.matriz,
          hijos: item.hijos.map((h) => {
            const previo = previoHijos.find((ph) => ph.id === h.id);
            mapeo.push({ id: h.id, nombre: h.nombre, previoEncontrado: !!previo, activo: previo?.activo ?? false });
            return { ...h, activo: previo?.activo ?? false };
          }),
        }));
        console.log('[step3:getMatricesConHijos]', JSON.parse(JSON.stringify({
          estadoPrevio: this.estadoPrevio,
          previoHijos: previoHijos.map(h => ({ id: h.id, nombre: (h as any).nombre, activo: h.activo })),
          mapeoHijos: mapeo,
          matricesConHijosFinal: this.matricesConHijos.map(g => ({
            matriz: g.matriz.nombre,
            hijos: g.hijos.map(h => ({ id: h.id, nombre: h.nombre, activo: h.activo })),
          })),
        })));
        this.loading = false;
        this.spinner.hide('catalogo-step3');
        this.cargarEnsayosActivos();
        // Defer to avoid NG0100: parent already read catalogosSeleccionados
        // in this CD cycle — emitting synchronously changes it mid-check.
        Promise.resolve().then(() => this.estadoCambiado.emit(this.matricesConHijos));
      },
      error: () => {
        this.loading = false;
        this.spinner.hide('catalogo-step3');
      },
    });
  }

  private aplicarEstadoPrevio(): void {
    const previoHijos = this.estadoPrevio.flatMap((m) => m.hijos);
    const mapeo: { id: number; nombre: string; previoEncontrado: boolean; activo: boolean }[] = [];
    this.matricesConHijos = this.matricesConHijos.map((grupo) => ({
      ...grupo,
      hijos: grupo.hijos.map((h) => {
        const previo = previoHijos.find((ph) => ph.id === h.id);
        mapeo.push({ id: h.id, nombre: h.nombre, previoEncontrado: !!previo, activo: previo?.activo ?? h.activo });
        return { ...h, activo: previo?.activo ?? h.activo };
      }),
    }));
    console.log('[step3:aplicarEstadoPrevio]', JSON.parse(JSON.stringify({
      previoHijos: previoHijos.map(h => ({ id: h.id, nombre: (h as any).nombre, activo: h.activo })),
      mapeoHijos: mapeo,
      matricesConHijosFinal: this.matricesConHijos.map(g => ({
        matriz: g.matriz.nombre,
        hijos: g.hijos.map(h => ({ id: h.id, nombre: h.nombre, activo: h.activo })),
      })),
    })));
    this.cargarEnsayosActivos();
  }

  private cargarEnsayosActivos(): void {
    const aguaGrupo = this.matricesConHijos.find((m) => this.isMatriz(m, 'agua'));
    if (aguaGrupo?.hijos.some((h) => h.activo)) this.cargarEnsayosAgua(aguaGrupo);

    const aireGrupo = this.matricesConHijos.find((m) => this.isMatriz(m, 'aire'));
    if (aireGrupo?.hijos.some((h) => h.activo)) this.cargarEnsayosAire(aireGrupo);

    const ruidoGrupo = this.matricesConHijos.find((m) => this.isMatriz(m, 'ruido'));
    if (ruidoGrupo?.hijos.some((h) => h.activo)) this.cargarEnsayosRuido(ruidoGrupo);
  }

  private cargarEnsayosAgua(grupo: MatrizConHijosUI, hijoIdx?: number): void {
    // Si se desactivó un hijo específico, limpiar solo su tabla correspondiente
    if (hijoIdx !== undefined && !grupo.hijos[hijoIdx].activo) {
      if (hijoIdx === 0) {
        this.ensayosMuestreo = [];
        Promise.resolve().then(() => this.ensayosMuestreoCambiado.emit([]));
      } else if (hijoIdx === 1) {
        this.ensayosResiduales = [];
        Promise.resolve().then(() => this.ensayosResidualesCambiado.emit([]));
      }
      if (!grupo.hijos.some((h) => h.activo)) {
        this.ensayosMuestreo = [];
        this.ensayosResiduales = [];
        Promise.resolve().then(() => {
          this.ensayosMuestreoCambiado.emit([]);
          this.ensayosResidualesCambiado.emit([]);
        });
      }
      return;
    }

    const hijoActivo = grupo.hijos.find((h) => h.activo);
    if (!hijoActivo) {
      this.ensayosMuestreo = [];
      this.ensayosResiduales = [];
      Promise.resolve().then(() => {
        this.ensayosMuestreoCambiado.emit([]);
        this.ensayosResidualesCambiado.emit([]);
      });
      return;
    }

    this.loadingEnsayos = true;
    this.ensayoItemService
      .getEnsayosByCtAmbiental(hijoActivo.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (items) => {
          const muestreoMapeo: { parametro: string; previoEncontrado: boolean; activo: boolean }[] = [];
          const residualesMapeo: { identificacion: string; previoEncontrado: boolean; activo: boolean }[] = [];
          this.ensayosMuestreo = items
            .filter((i) => i.ensayo_id === this.ENSAYO_ID_MUESTREO)
            .map((i) => {
              const base = this.mapToMuestreo(i);
              const previo = this.ensayosMuestreoPrevio.find((p) => p.parametro === base.parametro);
              muestreoMapeo.push({ parametro: base.parametro, previoEncontrado: !!previo, activo: previo?.activo ?? false });
              return { ...base, activo: previo?.activo ?? false };
            });
          this.ensayosResiduales = items
            .filter((i) => i.ensayo_id !== this.ENSAYO_ID_MUESTREO)
            .map((i) => {
              const base = this.mapToLaboratorio(i);
              const previo = this.ensayosResidualesPrevio.find((p) => p.identificacion === base.identificacion);
              residualesMapeo.push({ identificacion: base.identificacion, previoEncontrado: !!previo, activo: previo?.activo ?? false });
              return { ...base, activo: previo?.activo ?? false };
            });
          console.log('[step3:cargarEnsayosAgua]', JSON.parse(JSON.stringify({
            totalItemsServidor: items.length,
            ensayosMuestreoPrevio: this.ensayosMuestreoPrevio.map(p => ({ parametro: p.parametro, activo: p.activo })),
            ensayosResidualesPrevio: this.ensayosResidualesPrevio.map(p => ({ identificacion: p.identificacion, activo: p.activo })),
            muestreoMapeo,
            residualesMapeo,
          })));
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
      Promise.resolve().then(() => this.ensayosAireCambiado.emit([]));
      return;
    }
    this.ensayoItemService
      .getEnsayosByCtAmbiental(hijoActivo.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (items) => {
          const mapeo: { identificacion: string; previoEncontrado: boolean; activo: boolean }[] = [];
          this.ensayosAireServer = items.map((i) => {
            const base = this.mapToLaboratorio(i);
            const previo = this.ensayosAirePrevio.find((p) => p.identificacion === base.identificacion);
            mapeo.push({ identificacion: base.identificacion, previoEncontrado: !!previo, activo: previo?.activo ?? false });
            return { ...base, activo: previo?.activo ?? false };
          });
          console.log('[step3:cargarEnsayosAire]', JSON.parse(JSON.stringify({
            totalItemsServidor: items.length,
            ensayosAirePrevio: this.ensayosAirePrevio.map(p => ({ identificacion: p.identificacion, activo: p.activo })),
            mapeo,
          })));
          this.ensayosAireCambiado.emit(this.ensayosAireServer);
        },
      });
  }

  private cargarEnsayosRuido(grupo: MatrizConHijosUI): void {
    const hijoActivo = grupo.hijos.find((h) => h.activo);
    if (!hijoActivo) {
      this.ensayosRuidoServer = [];
      Promise.resolve().then(() => this.ensayosRuidoCambiado.emit([]));
      return;
    }
    this.ensayoItemService
      .getEnsayosByCtAmbiental(hijoActivo.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (items) => {
          const mapeo: { identificacion: string; previoEncontrado: boolean; activo: boolean }[] = [];
          this.ensayosRuidoServer = items.map((i) => {
            const base = this.mapToLaboratorio(i);
            const previo = this.ensayosRuidoPrevio.find((p) => p.identificacion === base.identificacion);
            mapeo.push({ identificacion: base.identificacion, previoEncontrado: !!previo, activo: previo?.activo ?? false });
            return { ...base, activo: previo?.activo ?? false };
          });
          console.log('[step3:cargarEnsayosRuido]', JSON.parse(JSON.stringify({
            totalItemsServidor: items.length,
            ensayosRuidoPrevio: this.ensayosRuidoPrevio.map(p => ({ identificacion: p.identificacion, activo: p.activo })),
            mapeo,
          })));
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
