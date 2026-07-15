import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
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

  // IDs reales del catálogo de matrices (catalogo_id: 17). El nombre puede
  // cambiar en el catálogo; el id no, así que la lógica de negocio debe
  // comparar por id y no por grupo.matriz.nombre.
  readonly MATRIZ_ID_AGUA = 89;
  readonly MATRIZ_ID_AIRE = 90;
  readonly MATRIZ_ID_RUIDO = 91;

  matricesConHijos: MatrizConHijosUI[] = [];
  matrizSeleccionada = '';
  loading = true;

  ensayosMuestreo: EnsayoMuestreo[] = [];
  ensayosSuperficiales: EnsayoLaboratorio[] = [];
  ensayosResiduales: EnsayoLaboratorio[] = [];
  ensayosAireServer: EnsayoLaboratorio[] = [];
  ensayosRuidoServer: EnsayoLaboratorio[] = [];

  // Cuando ambos hijos de agua están activos, la Tabla 2 (Superficiales) es
  // la única que se muestra, pero el guardado debe replicarse también para
  // el ctambiental_id de Residuales — de ahí necesitamos su id y el estado
  // activo de cada hijo disponibles al emitir, no solo al cargar.
  private hijoSuperficialActivo = false;
  private hijoResidualActivo = false;
  private ctambientalResidualId: number | null = null;

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

    const hayActivosEnPrevio = actual.flatMap((m) => m.hijos).some((h) => h.activo);
    const yaHayActivosEnLocal = this.matricesConHijos.flatMap((m) => m.hijos).some((h) => h.activo);

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

    if (this.esMatriz(grupo, this.MATRIZ_ID_AGUA)) this.cargarEnsayosAgua(grupo);
    if (this.esMatriz(grupo, this.MATRIZ_ID_AIRE)) this.cargarEnsayosAire(grupo);
    if (this.esMatriz(grupo, this.MATRIZ_ID_RUIDO)) this.cargarEnsayosRuido(grupo);
    this.estadoCambiado.emit(this.matricesConHijos);
  }

  tieneHijosActivos(grupo: MatrizConHijosUI): boolean {
    return grupo.hijos.some((h) => h.activo);
  }

  contarHijosActivos(grupo: MatrizConHijosUI): number {
    return grupo.hijos.filter((h) => h.activo).length;
  }

  // No basta con activar el switch de una matriz (eso solo revela sus
  // tablas): se exige al menos un ensayo/fila realmente marcado como activo,
  // que es lo que efectivamente se guarda al confirmar la solicitud.
  tieneAlgunaSeleccion(): boolean {
    return (
      this.ensayosMuestreo.some((e) => e.activo) ||
      this.ensayosSuperficiales.some((e) => e.activo) ||
      this.ensayosResiduales.some((e) => e.activo) ||
      this.ensayosAireServer.some((e) => e.activo) ||
      this.ensayosRuidoServer.some((e) => e.activo)
    );
  }

  private getMatricesConHijos(): void {
    this.catalogoService
      .getMatricesConHijos(this.CATALOGO_MATRICES_ID)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
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
          this.restaurarMatrizSeleccionada();
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

  // El componente se destruye y recrea al cambiar de paso (@if en el padre
  // solicitud-trabajo.html), así que matrizSeleccionada se pierde aunque los
  // hijos.activo se restauren desde estadoPrevio. Sin esto, el <select>
  // vuelve al placeholder y el panel de servicios queda oculto al volver.
  private restaurarMatrizSeleccionada(): void {
    if (this.matrizSeleccionada) return;
    const grupoActivo = this.matricesConHijos.find((g) => g.hijos.some((h) => h.activo));
    if (grupoActivo) this.matrizSeleccionada = grupoActivo.matriz.nombre;
  }

  private aplicarEstadoPrevio(): void {
    const previoHijos = this.estadoPrevio.flatMap((m) => m.hijos);
    this.matricesConHijos = this.matricesConHijos.map((grupo) => ({
      ...grupo,
      hijos: grupo.hijos.map((h) => {
        const previo = previoHijos.find((ph) => ph.id === h.id);
        return { ...h, activo: previo?.activo ?? h.activo };
      }),
    }));
    this.restaurarMatrizSeleccionada();
    this.cargarEnsayosActivos();
  }

  private cargarEnsayosActivos(): void {
    const aguaGrupo = this.matricesConHijos.find((m) => this.esMatriz(m, this.MATRIZ_ID_AGUA));
    if (aguaGrupo?.hijos.some((h) => h.activo)) this.cargarEnsayosAgua(aguaGrupo);

    const aireGrupo = this.matricesConHijos.find((m) => this.esMatriz(m, this.MATRIZ_ID_AIRE));
    if (aireGrupo?.hijos.some((h) => h.activo)) this.cargarEnsayosAire(aireGrupo);

    const ruidoGrupo = this.matricesConHijos.find((m) => this.esMatriz(m, this.MATRIZ_ID_RUIDO));
    if (ruidoGrupo?.hijos.some((h) => h.activo)) this.cargarEnsayosRuido(ruidoGrupo);
  }

  private buscarPrevioLaboratorio(base: EnsayoLaboratorio): EnsayoLaboratorio | undefined {
    return this.ensayosResidualesPrevio.find(
      (p) => p.ensayo_id === base.ensayo_id && p.ctambiental_id === base.ctambiental_id,
    );
  }

  // Cuando ambos hijos están activos, la Tabla 2 (Superficiales) es la única
  // visible; el guardado debe replicar cada fila también con el
  // ctambiental_id de Residuales (mismo ensayo_id, mismo estado activo), sin
  // que exista una fila/tabla visible aparte para Residuales.
  private emitEnsayosResidualesCombinado(): void {
    const combinado = [...this.ensayosSuperficiales];
    if (
      this.hijoSuperficialActivo &&
      this.hijoResidualActivo &&
      this.ctambientalResidualId != null
    ) {
      combinado.push(
        ...this.ensayosSuperficiales.map((e) => ({
          ...e,
          ctambiental_id: this.ctambientalResidualId!,
        })),
      );
    }
    combinado.push(...this.ensayosResiduales);
    this.ensayosResidualesCambiado.emit(combinado);
  }

  // hijos[0] = Aguas Superficiales, hijos[1] = Aguas Residuales: cada uno
  // tiene su propio ctambiental_id y su propio conjunto de ensayo_item. Si
  // ambos están activos, solo se muestra la tabla de Superficiales pero el
  // guardado debe replicarse hacia el ctambiental_id de Residuales (ver
  // emitEnsayosResidualesCombinado); si solo Residuales está activo, se
  // carga y guarda de forma independiente con su propio ctambiental_id.
  private cargarEnsayosAgua(grupo: MatrizConHijosUI): void {
    const hijoSuperficial = grupo.hijos[0];
    const hijoResidual = grupo.hijos[1];

    this.hijoSuperficialActivo = !!hijoSuperficial?.activo;
    this.hijoResidualActivo = !!hijoResidual?.activo;
    this.ctambientalResidualId = hijoResidual?.id ?? null;

    if (hijoSuperficial?.activo) {
      this.ensayoItemService
        .getEnsayosByCtAmbiental(hijoSuperficial.id)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (items) => {
            this.ensayosMuestreo = items
              .filter((i) => i.ensayo_id === this.ENSAYO_ID_MUESTREO)
              .map((i) => {
                const base = this.mapToMuestreo(i);
                const previo = this.ensayosMuestreoPrevio.find(
                  (p) => p.parametro === base.parametro,
                );
                return { ...base, activo: previo?.activo ?? false };
              });
            this.ensayosSuperficiales = items
              .filter((i) => i.ensayo_id !== this.ENSAYO_ID_MUESTREO)
              .map((i) => {
                const base = this.mapToLaboratorio(i);
                const previo = this.buscarPrevioLaboratorio(base);
                return { ...base, activo: previo?.activo ?? false };
              });
            console.log('[step3:cargarEnsayosAgua:superficial]', {
              totalItemsServidor: items.length,
              ensayosMuestreo: this.ensayosMuestreo.length,
              ensayosSuperficiales: this.ensayosSuperficiales.length,
            });
            this.ensayosMuestreoCambiado.emit(this.ensayosMuestreo);
            this.emitEnsayosResidualesCombinado();
          },
        });
    } else {
      this.ensayosMuestreo = [];
      this.ensayosSuperficiales = [];
      Promise.resolve().then(() => {
        this.ensayosMuestreoCambiado.emit([]);
        this.emitEnsayosResidualesCombinado();
      });
    }

    // La tabla independiente de Residuales (Tabla 3) solo se carga/muestra
    // cuando Residuales está activo y Superficiales NO lo está: si ambos
    // están activos, Tabla 2 (Superficiales) es la única visible y
    // emitEnsayosResidualesCombinado ya replica el guardado hacia el
    // ctambiental_id de Residuales.
    if (hijoResidual?.activo && !hijoSuperficial?.activo) {
      this.ensayoItemService
        .getEnsayosByCtAmbiental(hijoResidual.id)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (items) => {
            this.ensayosResiduales = items
              .filter((i) => i.ensayo_id !== this.ENSAYO_ID_MUESTREO)
              .map((i) => {
                const base = this.mapToLaboratorio(i);
                const previo = this.buscarPrevioLaboratorio(base);
                return { ...base, activo: previo?.activo ?? false };
              });
            console.log('[step3:cargarEnsayosAgua:residual]', {
              totalItemsServidor: items.length,
              ensayosResiduales: this.ensayosResiduales.length,
            });
            this.emitEnsayosResidualesCombinado();
          },
        });
    } else {
      this.ensayosResiduales = [];
      Promise.resolve().then(() => this.emitEnsayosResidualesCombinado());
    }
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
          const mapeo: { identificacion: string; previoEncontrado: boolean; activo: boolean }[] =
            [];
          this.ensayosAireServer = items.map((i) => {
            const base = this.mapToLaboratorio(i);
            const previo = this.ensayosAirePrevio.find(
              (p) => p.identificacion === base.identificacion,
            );
            mapeo.push({
              identificacion: base.identificacion,
              previoEncontrado: !!previo,
              activo: previo?.activo ?? false,
            });
            return { ...base, activo: previo?.activo ?? false };
          });
          console.log(
            '[step3:cargarEnsayosAire]',
            JSON.parse(
              JSON.stringify({
                totalItemsServidor: items.length,
                ensayosAirePrevio: this.ensayosAirePrevio.map((p) => ({
                  identificacion: p.identificacion,
                  activo: p.activo,
                })),
                mapeo,
              }),
            ),
          );
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
          const mapeo: { identificacion: string; previoEncontrado: boolean; activo: boolean }[] =
            [];
          this.ensayosRuidoServer = items.map((i) => {
            const base = this.mapToLaboratorio(i);
            const previo = this.ensayosRuidoPrevio.find(
              (p) => p.identificacion === base.identificacion,
            );
            mapeo.push({
              identificacion: base.identificacion,
              previoEncontrado: !!previo,
              activo: previo?.activo ?? false,
            });
            return { ...base, activo: previo?.activo ?? false };
          });
          console.log(
            '[step3:cargarEnsayosRuido]',
            JSON.parse(
              JSON.stringify({
                totalItemsServidor: items.length,
                ensayosRuidoPrevio: this.ensayosRuidoPrevio.map((p) => ({
                  identificacion: p.identificacion,
                  activo: p.activo,
                })),
                mapeo,
              }),
            ),
          );
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

  // Solo para comparar contra matrizSeleccionada (el <select> se liga por
  // nombre). Para identificar agua/aire/ruido en lógica de negocio usar
  // esMatriz(grupo, id), que compara por id y no se rompe si cambia el nombre.
  isMatriz(grupo: MatrizConHijosUI, nombre: string): boolean {
    return grupo.matriz.nombre.toLowerCase() === nombre.toLowerCase();
  }

  esMatriz(grupo: MatrizConHijosUI, id: number): boolean {
    return grupo.matriz.id === id;
  }

  toggleEnsayoMuestreo(idx: number): void {
    this.ensayosMuestreo[idx].activo = !this.ensayosMuestreo[idx].activo;
    this.ensayosMuestreoCambiado.emit(this.ensayosMuestreo);
  }
  toggleEnsayoSuperficial(idx: number): void {
    this.ensayosSuperficiales[idx].activo = !this.ensayosSuperficiales[idx].activo;
    this.emitEnsayosResidualesCombinado();
  }
  toggleEnsayoResidual(idx: number): void {
    this.ensayosResiduales[idx].activo = !this.ensayosResiduales[idx].activo;
    this.emitEnsayosResidualesCombinado();
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
    // Si el componente se destruye mientras el spinner sigue mostrado (fetch
    // aún pendiente al cambiar de paso), hay que ocultarlo explícitamente:
    // ngx-spinner identifica el overlay por nombre compartido entre
    // instancias, y un show()/hide() desincronizado entre montajes rápidos
    // lo deja "trabado" en fade-out (opacity 0 pero pointer-events: auto),
    // bloqueando todos los clics de la página sin mostrar nada visible.
    this.spinner.hide('catalogo-step3');
    this.destroy$.next();
    this.destroy$.complete();
  }
}
