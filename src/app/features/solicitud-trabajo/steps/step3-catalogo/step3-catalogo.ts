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

import { Observable, Subject, takeUntil, forkJoin, of, map, filter, take, tap } from 'rxjs';
import { CatalogoService } from '../../../../services/catalogo.service';
import { EnsayoItemService } from '../../../../services/solicitudes/solicitud-trabajo/ensayo-item.service';

import {
  ItemCatalogo,
  EnsayoLaboratorio,
  EnsayoMuestreo,
  ReportCatalogoEnsayoDetalle,
  ReportCatalogoNota,
} from '../../../../interfaces';

export interface ItemCatalogoUI extends ItemCatalogo {
  activo: boolean;
}

export interface MatrizConHijosUI {
  matriz: ItemCatalogo;
  hijos: ItemCatalogoUI[];
  collapsed: boolean;
  // Los hijos se cargan bajo demanda (al seleccionar la matriz), no todos de
  // una vez al iniciar el paso — este flag evita refetch si ya se cargaron.
  hijosCargados?: boolean;
}

// Una tabla de laboratorio por cada hijo activo del grupo Agua (Superficiales,
// Residuales, o cualquier otro hijo que se agregue al catálogo) — el backend
// puede devolver más de una tabla por hijo (ver ENSAYO_ID_MUESTREO), pero el
// muestreo se maneja aparte porque no depende de qué hijo lo originó.
export interface TablaAguaUI {
  hijoId: number;
  hijoNombre: string;
  titulo: string;
  notas: ReportCatalogoNota[];
  ensayos: EnsayoLaboratorio[];
}

@Component({
  selector: 'app-step3-catalogo',
  standalone: true,
  imports: [CommonModule, FormsModule, NgxSpinnerModule],
  templateUrl: './step3-catalogo.html',
})
export class Step3CatalogoComponent implements OnInit, OnChanges, OnDestroy {
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

  // Aunque el catálogo tenga más ítems bajo la matriz Agua (p. ej. H2SO4,
  // H2SO3, TEMPERATURA), en este formulario solo Aguas Superficiales (92) y
  // Aguas Residuales (93) deben ofrecerse como hijos seleccionables.
  readonly HIJOS_AGUA_PERMITIDOS = [92, 93];

  matricesConHijos: MatrizConHijosUI[] = [];
  matrizSeleccionada = '';
  loading = true;
  loadingHijos = false;

  ensayosMuestreo: EnsayoMuestreo[] = [];
  // Una tabla de laboratorio por cada hijo activo del grupo Agua (ver
  // TablaAguaUI) — reemplaza los antiguos ensayosSuperficiales/ensayosResiduales
  // fijos, que solo contemplaban los dos primeros hijos del grupo.
  tablasAgua: TablaAguaUI[] = [];
  ensayosAireServer: EnsayoLaboratorio[] = [];
  ensayosRuidoServer: EnsayoLaboratorio[] = [];

  // Título y notas de cada tabla, provistos por el backend
  // (report-catalogo/ensayo-item/:id) — nada queda hardcodeado en el
  // frontend. Un mismo servicio puede traer varias tablas (p. ej. Aguas
  // Superficiales trae "Muestreo" y "Físico-Químico" por separado), cada
  // una con su propio título/notas.
  tituloMuestreo = '';
  notasMuestreo: ReportCatalogoNota[] = [];
  tituloAire = '';
  notasAire: ReportCatalogoNota[] = [];
  tituloRuido = '';
  notasRuido: ReportCatalogoNota[] = [];

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
      this.tablasAgua.some((t) => t.ensayos.some((e) => e.activo)) ||
      this.ensayosAireServer.some((e) => e.activo) ||
      this.ensayosRuidoServer.some((e) => e.activo)
    );
  }

  // Solo trae la lista de matrices (Agua/Aire/Ruido) — los hijos de cada una
  // se cargan bajo demanda (ver onMatrizSeleccionadaChange), salvo que venga
  // un estado previo con hijos activos (volviendo desde un paso posterior),
  // en cuyo caso esa matriz puntual se carga de una vez para no perder la
  // selección ya hecha.
  private getMatricesConHijos(): void {
    this.catalogoService
      .getItemsByCatalogoId(this.CATALOGO_MATRICES_ID)
      .pipe(
        filter((r) => r.data.length > 0),
        take(1),
        takeUntil(this.destroy$),
      )
      .subscribe({
        next: (response) => {
          this.matricesConHijos = response.data.map((matriz) => ({
            collapsed: false,
            matriz,
            hijos: [],
            hijosCargados: false,
          }));
          this.loading = false;
          this.spinner.hide('catalogo-step3');
          this.restaurarActivosPrevios();
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

  // Carga los hijos de las matrices que tengan alguno activo en estadoPrevio
  // (por eso siempre se piden frescos al servidor en vez de reusar los del
  // snapshot previo tal cual: si el catálogo agregó ítems nuevos desde que
  // se guardó ese snapshot, deben aparecer igual) y luego les aplica los
  // flags .activo que traía ese snapshot. Se usa tanto en la carga inicial
  // como cuando estadoPrevio llega después (ver ngOnChanges).
  private restaurarActivosPrevios(): void {
    const gruposConPrevioActivo = this.matricesConHijos.filter((grupo) =>
      this.estadoPrevio.some(
        (m) => m.matriz.id === grupo.matriz.id && m.hijos.some((h) => h.activo),
      ),
    );
    const pendientes = gruposConPrevioActivo.filter((g) => !g.hijosCargados);

    const carga$: Observable<unknown> = pendientes.length
      ? forkJoin(pendientes.map((grupo) => this.cargarHijosDeMatriz$(grupo)))
      : of(null);

    carga$.pipe(takeUntil(this.destroy$)).subscribe(() => {
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
      // Defer to avoid NG0100: parent already read catalogosSeleccionados
      // in this CD cycle — emitting synchronously changes it mid-check.
      Promise.resolve().then(() => this.estadoCambiado.emit(this.matricesConHijos));
    });
  }

  private aplicarEstadoPrevio(): void {
    this.restaurarActivosPrevios();
  }

  // Se dispara al cambiar la matriz seleccionada en el <select> — trae sus
  // hijos del servidor solo la primera vez (bajo demanda), en vez de traer
  // los hijos de las 3 matrices de una sola vez al iniciar el paso.
  onMatrizSeleccionadaChange(nombre: string): void {
    this.matrizSeleccionada = nombre;
    const grupo = this.matricesConHijos.find((g) => this.isMatriz(g, nombre));
    if (!grupo || grupo.hijosCargados) return;
    this.loadingHijos = true;
    this.cargarHijosDeMatriz$(grupo)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.loadingHijos = false;
        },
        error: () => {
          this.loadingHijos = false;
        },
      });
  }

  private cargarHijosDeMatriz$(grupo: MatrizConHijosUI) {
    const fuente$ = this.esMatriz(grupo, this.MATRIZ_ID_AGUA)
      ? this.catalogoService.getChildrenByParentIdsAndIds(
          [grupo.matriz.id],
          this.HIJOS_AGUA_PERMITIDOS,
        )
      : this.catalogoService.getChildrenByParentIdsOnDemand([grupo.matriz.id]);

    return fuente$.pipe(
      take(1),
      tap((response) => {
        grupo.hijos = response.data.map((h) => ({ ...h, activo: false }));
        grupo.hijosCargados = true;
      }),
    );
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

  // Cada hijo activo del grupo Agua (Superficiales, Residuales, o cualquier
  // otro que se agregue al catálogo) aporta su propia tabla, independiente
  // de las demás: solo se concatenan para el único @Output de guardado que
  // existe para "ensayos de agua".
  private emitEnsayosAgua(): void {
    this.ensayosResidualesCambiado.emit(this.tablasAgua.flatMap((t) => t.ensayos));
  }

  // Recorre TODOS los hijos activos del grupo Agua (no solo los dos
  // primeros) — cada uno llama a report-catalogo/ensayo-item/:id de forma
  // independiente y puede devolver más de una tabla (p. ej. "Muestreo" y
  // "Físico-Químico" por separado, distinguibles por ENSAYO_ID_MUESTREO).
  private cargarEnsayosAgua(grupo: MatrizConHijosUI): void {
    const hijosActivos = grupo.hijos.filter((h) => h.activo);

    if (hijosActivos.length === 0) {
      this.ensayosMuestreo = [];
      this.tituloMuestreo = '';
      this.notasMuestreo = [];
      this.tablasAgua = [];
      Promise.resolve().then(() => {
        this.ensayosMuestreoCambiado.emit([]);
        this.emitEnsayosAgua();
      });
      return;
    }

    forkJoin(
      hijosActivos.map((hijo) =>
        this.ensayoItemService
          .getReportCatalogoEnsayoItem(hijo.id)
          .pipe(map((data) => ({ hijo, data }))),
      ),
    )
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (resultados) => {
          let muestreoEntry: (typeof resultados)[number]['data'][number] | null = null;
          let muestreoHijo: ItemCatalogoUI | null = null;
          const tablas: TablaAguaUI[] = [];

          for (const { hijo, data } of resultados) {
            for (const entry of data) {
              const esMuestreo = entry.Ensayos.some((e) => e.id === this.ENSAYO_ID_MUESTREO);
              if (esMuestreo) {
                muestreoEntry = entry;
                muestreoHijo = hijo;
                continue;
              }
              tablas.push({
                hijoId: hijo.id,
                hijoNombre: hijo.nombre,
                titulo: entry.ensayo_nombre,
                notas: entry.notas ?? [],
                ensayos: entry.Ensayos.filter((i) => i.id !== this.ENSAYO_ID_MUESTREO).map((i) => {
                  const base = this.mapDetalleToLaboratorio(i, hijo.id, entry.ensayo_catalogo);
                  const previo = this.buscarPrevioLaboratorio(base);
                  return { ...base, activo: previo?.activo ?? false };
                }),
              });
            }
          }

          if (muestreoEntry && muestreoHijo) {
            this.tituloMuestreo = muestreoEntry.ensayo_nombre;
            this.notasMuestreo = muestreoEntry.notas ?? [];
            this.ensayosMuestreo = muestreoEntry.Ensayos.map((i) => {
              const base = this.mapDetalleToMuestreo(
                i,
                muestreoHijo!.id,
                muestreoEntry!.ensayo_catalogo,
              );
              const previo = this.ensayosMuestreoPrevio.find((p) => p.parametro === base.parametro);
              return { ...base, activo: previo?.activo ?? false };
            });
          } else {
            this.tituloMuestreo = '';
            this.notasMuestreo = [];
            this.ensayosMuestreo = [];
          }

          this.tablasAgua = tablas;
          this.ensayosMuestreoCambiado.emit(this.ensayosMuestreo);
          this.emitEnsayosAgua();
        },
      });
  }

  toggleEnsayoTablaAgua(tablaIdx: number, filaIdx: number): void {
    const fila = this.tablasAgua[tablaIdx].ensayos[filaIdx];
    fila.activo = !fila.activo;
    this.emitEnsayosAgua();
  }

  private cargarEnsayosAire(grupo: MatrizConHijosUI): void {
    const hijoActivo = grupo.hijos.find((h) => h.activo);
    if (!hijoActivo) {
      this.ensayosAireServer = [];
      this.tituloAire = '';
      this.notasAire = [];
      Promise.resolve().then(() => this.ensayosAireCambiado.emit([]));
      return;
    }
    this.ensayoItemService
      .getReportCatalogoEnsayoItem(hijoActivo.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => {
          const entry = data[0] ?? null;
          this.tituloAire = entry?.ensayo_nombre ?? '';
          this.notasAire = entry?.notas ?? [];
          this.ensayosAireServer = (entry?.Ensayos ?? []).map((i) => {
            const base = this.mapDetalleToLaboratorio(i, hijoActivo.id, entry?.ensayo_catalogo);
            const previo = this.ensayosAirePrevio.find(
              (p) => p.identificacion === base.identificacion,
            );
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
      this.tituloRuido = '';
      this.notasRuido = [];
      Promise.resolve().then(() => this.ensayosRuidoCambiado.emit([]));
      return;
    }
    this.ensayoItemService
      .getReportCatalogoEnsayoItem(hijoActivo.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => {
          const entry = data[0] ?? null;
          this.tituloRuido = entry?.ensayo_nombre ?? '';
          this.notasRuido = entry?.notas ?? [];
          this.ensayosRuidoServer = (entry?.Ensayos ?? []).map((i) => {
            const base = this.mapDetalleToLaboratorio(i, hijoActivo.id, entry?.ensayo_catalogo);
            const previo = this.ensayosRuidoPrevio.find(
              (p) => p.identificacion === base.identificacion,
            );
            return { ...base, activo: previo?.activo ?? false };
          });
          this.ensayosRuidoCambiado.emit(this.ensayosRuidoServer);
        },
      });
  }

  private mapDetalleToMuestreo(
    item: ReportCatalogoEnsayoDetalle,
    ctambientalId: number,
    cttipoEnsayoId?: number,
  ): EnsayoMuestreo {
    const partes = item.metodo.split(',');
    return {
      activo: false,
      ensayo_id: item.id,
      ctambiental_id: ctambientalId,
      cttipo_ensayo_id: cttipoEnsayoId,
      producto: item.analisis,
      parametro: item.identificacion,
      metodoInterno: partes[0]?.trim() ?? '',
      metodoReferencia: partes.slice(1).join(',').trim(),
    };
  }

  private mapDetalleToLaboratorio(
    item: ReportCatalogoEnsayoDetalle,
    ctambientalId: number,
    cttipoEnsayoId?: number,
  ): EnsayoLaboratorio {
    const partes = item.metodo.split(',');
    return {
      activo: false,
      ensayo_id: item.id,
      ctambiental_id: ctambientalId,
      cttipo_ensayo_id: cttipoEnsayoId,
      ensayo: item.analisis,
      identificacion: item.identificacion,
      metodoInterno: partes[0]?.trim() ?? '',
      metodoReferencia: partes.slice(1).join(',').trim(),
      unidad: item.unidad_medida,
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
