import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, takeUntil, forkJoin, map, catchError, of } from 'rxjs';

import { ReportSolicitudService } from '../../../../services/solicitudes/lista-solicitudes/report-solicitud.service';
import { ReportSolicitud } from '../../../../interfaces/solicitudes/lista-solicitudes/report-solicitud.interface';
import { ReportFormulario } from '../../../../interfaces/admin-formularios/report-formulario.interface';
import { PaginationMeta } from '../../../../interfaces/catalogos/catalogo.interface';
import { SolicitudDetalleService } from '../../../../services/solicitudes/solicitud-detalle/solicitud-detalle.service';
import { PageHeader } from '../../../../shared/components/page-header/page-header';
import { AlertService } from '../../../../services/alert.service';
import { EnsayoItemService } from '../../../../services/solicitudes/solicitud-trabajo/ensayo-item.service';
import {
  ReportCatalogoNota,
  ReportCatalogoEnsayoItem,
} from '../../../../interfaces/solicitudes/solicitud-trabajo';
import {
  DynamicField,
  DynamicGroup,
  aplicarDependencias,
  camposDe,
  construirGrupos,
  generarControles,
} from '../../../../shared/dynamic-form';
import { PLAN_MUESTREO_FORM_CONFIG } from '../../model/plan-muestreo-form.model';
import { ReportPlanMuestreoService } from '../../../../services/solicitudes/plan-muestreo/report-plan-muestreo.service';
import { PlanMuestreoStore } from '../../model/plan-muestreo.store';
import { PlanMuestreoDetallePayload } from '../../../../interfaces/solicitudes/plan-muestreo/plan-muestreo.interface';

// `nombre` del atributo en el esquema dinámico. Reemplaza al viejo
// CATALOGO_OBJETIVO_ID = 1014: el id del catálogo ya viene en la pregunta, no
// hace falta conocerlo ni pedirlo aparte.
const CAMPO_OBJETIVO = 'objetivo';

export interface EnsayoLaboratorioRow {
  activo: boolean;
  // El ensayo ya viene exigido In Situ por la solicitud: se marca solo y el
  // usuario no puede desmarcarlo.
  bloqueado: boolean;
  // Ids que no se muestran, pero que necesita `planMuestreoDetalle` al guardar
  // (mismo criterio que mapDetalleToLaboratorio en step3-catalogo).
  ensayo_id: number;
  ctambiental_id: number;
  cttipo_ensayo_id: number;
  ensayo: string;
  identificacion: string;
  metodoInterno: string;
  metodoReferencia: string;
  unidad: string;
}

// Una tabla por cada entrada de laboratorio que devuelva
// report-catalogo/ensayo-item/:id.
export interface TablaLaboratorioUI {
  titulo: string;
  notas: ReportCatalogoNota[];
  ensayos: EnsayoLaboratorioRow[];
}

@Component({
  selector: 'app-plan-muestreo-step1',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, PageHeader],
  templateUrl: './step1-solicitud.html',
  styleUrl: '../../plan-muestreo.css',
})
export class Step1SolicitudComponent implements OnInit, OnDestroy {
  // Posición en el asistente, para el stepper de la cabecera.
  readonly PASO = 1;
  readonly TOTAL_PASOS = 3;

  // Sección del formulario dinámico que se renderiza en este paso. Hoy trae un
  // único grupo, "Objetivo", que el usuario elige de un catálogo. Antes ninguna
  // pantalla pintaba la sección 1: el atributo existía en el esquema pero
  // quedaba huérfano, nunca se respondía y por eso no llegaba al PDF.
  readonly SECCION = 1;
  form: FormGroup;
  grupos: DynamicGroup[] = [];

  formulario: ReportFormulario | null = null;
  fechaEmision: Date | null = null;

  // ── Objetivo del muestreo ────────────────────────────────────────────────

  // ── Tipo de matriz (Aguas Superficiales=92 / Aguas Residuales=93) ───────
  tipoAguaId: number | null = null;
  tipoAguaNombre = '';

  // ── Búsqueda de solicitudes finalizadas ──────────────────────────────────
  panelAbierto = false;
  loadingBusqueda = false;
  loadingDetalle = false;
  private todasSolicitudes: ReportSolicitud[] = [];
  solicitudesFinalizadas: ReportSolicitud[] = [];
  meta: PaginationMeta | null = null;
  currentPage = 1;
  readonly PAGE_SIZE = 8;
  // Solo se listan solicitudes de este formulario_ct_id (formulario válido
  // para generar un plan de muestreo).
  readonly FORMULARIO_CT_IDS = [2030];
  busqueda = '';
  solicitudSeleccionada: ReportSolicitud | null = null;

  // ── Detalle de la solicitud ───────────────────────────────────────────────
  detalleFechaEmision = '';
  detalleFechaMaxima = '';
  detalleCliente = '';
  detalleLatitud = '';
  detalleLongitud = '';
  detalleDireccion = '';
  /** Jornadas del operador, ya formateadas por el backend en `val_jor_la`. */
  detalleHorarios: string[] = [];

  // TODO: prueba temporal — ids quemados de las tablas de laboratorio
  // (H2SO4, HNO3, TEMPERATURA, Aguas Residuales/Aguas) mientras se define de
  // dónde deben derivarse dinámicamente (ver el mismo listado en step3-catalogo).
  readonly IDS_LABORATORIO_PRUEBA = [2073, 2035, 2036, 2037];
  tablasLaboratorio: TablaLaboratorioUI[] = [];
  // `ensayo_id` de los análisis que la solicitud ya exige In Situ. El cruce va
  // por ensayo: el ctambiental_id de la solicitud nunca coincide con el de las
  // tablas de laboratorio, que son catálogos distintos.
  private ensayosInSituIds = new Set<number>();

  /**
   * Solicitudes que ya tienen un plan de muestreo vigente (Pendiente o
   * Finalizado). Se excluyen del panel: elegir una de esas termina en P2002
   * contra el índice único de la base.
   *
   * Se cargan una sola vez al entrar; el panel se abre y pagina muchas veces y
   * la lista no cambia mientras el usuario está en este paso.
   */
  private solicitudesConPlan: string[] = [];

  private readonly destroy$ = new Subject<void>();

  constructor(
    private reportSolicitudService: ReportSolicitudService,
    private solicitudDetalleService: SolicitudDetalleService,
    private ensayoItemService: EnsayoItemService,
    private router: Router,
    private alertService: AlertService,
    private store: PlanMuestreoStore,
    private fb: FormBuilder,
    private reportPlanMuestreoService: ReportPlanMuestreoService,
  ) {
    this.form = this.fb.group({});
  }

  ngOnInit(): void {
    this.cargarSolicitudesConPlan();
    this.cargarSeccionDinamica();

    // Cabecera compartida por los tres pasos: el store la cachea.
    this.store
      .getMetaFormulario()
      .pipe(takeUntil(this.destroy$))
      .subscribe((formulario) => {
        this.formulario = formulario;
        if (formulario?.fecha_emision) {
          this.fechaEmision = new Date(Number(formulario.fecha_emision));
        }
      });
    // Las tablas de laboratorio son ids fijos: no dependen de la solicitud.
    this.cargarAnalisisLaboratorio();
  }

  // TODO: prueba temporal — trae las tablas de IDS_LABORATORIO_PRUEBA
  // (fijos, no derivados de la solicitud) para "Análisis Requerido en
  // Laboratorio", con el mismo formato dinámico (título/notas/ensayos) que
  // ya se usa en step3-catalogo.
  private cargarAnalisisLaboratorio(): void {
    forkJoin(
      // Se conserva el id consultado: es el `ctambiental_id` de sus ensayos.
      this.IDS_LABORATORIO_PRUEBA.map((id) =>
        this.ensayoItemService.getReportCatalogoEnsayoItem(id).pipe(
          // Un id sin datos (o que falle) no debe tumbar las demás tablas:
          // forkJoin aborta con el primer error.
          map((data) => ({ id, data: data ?? [] })),
          catchError(() => of({ id, data: [] as ReportCatalogoEnsayoItem[] })),
        ),
      ),
    )
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (resultados) => {
          this.tablasLaboratorio = resultados.flatMap(({ id, data }) =>
            data.map((entry) => ({
              titulo: entry.ensayo_nombre,
              notas: entry.notas ?? [],
              ensayos: entry.Ensayos.map((i) => {
                const partes = i.metodo.split(',');
                return {
                  activo: false,
                  bloqueado: false,
                  ensayo_id: i.id,
                  ctambiental_id: id,
                  cttipo_ensayo_id: entry.ensayo_catalogo,
                  ensayo: i.analisis,
                  identificacion: i.identificacion,
                  metodoInterno: partes[0]?.trim() ?? '',
                  metodoReferencia: partes.slice(1).join(',').trim(),
                  unidad: i.unidad_medida,
                };
              }),
            })),
          );
          // Las tablas y el detalle se cargan en paralelo: quien termine
          // último es el que deja el bloqueo aplicado.
          this.aplicarBloqueoInSitu();
        },
        error: () => {
          this.tablasLaboratorio = [];
        },
      });
  }

  // Marca y bloquea, en las tablas de laboratorio, los ensayos que la solicitud
  // ya exige In Situ.
  private aplicarBloqueoInSitu(): void {
    for (const tabla of this.tablasLaboratorio) {
      for (const ensayo of tabla.ensayos) {
        ensayo.bloqueado = this.ensayosInSituIds.has(ensayo.ensayo_id);
        if (ensayo.bloqueado) {
          ensayo.activo = true;
        }
      }
    }
  }

  alternarEnsayoLaboratorio(ensayo: EnsayoLaboratorioRow): void {
    if (ensayo.bloqueado) return;
    ensayo.activo = !ensayo.activo;
  }

  ngOnDestroy(): void {
    // Las respuestas quedan en el store, que arma el payload final en el paso 3.
    // Sin esto el objetivo se perdería al navegar al paso 2.
    this.store.guardarSeccion(this.SECCION, camposDe(this.grupos), this.form.getRawValue());
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * El único campo de la sección 1. Se busca por `key` y no por posición para
   * que siga funcionando si mañana se agrega otra pregunta a esta sección.
   */
  get campoObjetivo(): DynamicField | undefined {
    return this.grupos.flatMap((g) => g.campos).find((c) => c.key === CAMPO_OBJETIVO);
  }

  /** Texto completo del objetivo elegido, para mostrarlo bajo el desplegable. */
  get objetivoTexto(): string {
    const valor = this.form.get(CAMPO_OBJETIVO)?.value;
    return this.campoObjetivo?.opciones.find((o) => o.id === valor)?.nombre ?? '';
  }

  /**
   * Sección 1 del formulario dinámico. Mismo patrón que los pasos 2 y 3: el
   * store cachea el esquema, se arman los grupos y se generan los controles.
   */
  private cargarSeccionDinamica(): void {
    this.store
      .getFormulario()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (formulario) => {
          this.grupos = construirGrupos(
            formulario.preguntas ?? [],
            this.SECCION,
            PLAN_MUESTREO_FORM_CONFIG,
          );
          generarControles(this.form, this.grupos, {});
          // Repuebla lo ya respondido al volver desde el paso 2.
          this.form.patchValue(this.store.respuestasDe(this.SECCION));
          aplicarDependencias(this.form, this.grupos, this.destroy$);
        },
        error: () => this.alertService.error('No se pudo cargar el formulario dinámico'),
      });
  }

  // ── Panel de búsqueda ────────────────────────────────────────────────────

  abrirPanel(): void {
    this.panelAbierto = true;
    this.busqueda = '';
    this.cargarPagina(1);
  }

  cerrarPanel(): void {
    this.panelAbierto = false;
  }

  onBusquedaChange(valor: string): void {
    this.busqueda = valor;
    this.aplicarFiltro();
  }

  /**
   * Ids a excluir del selector. Si falla, se sigue sin excluir nada: es
   * preferible ofrecer de más —y que el alta avise con su mensaje— antes que
   * dejar el panel vacío por un error de esta consulta auxiliar.
   */
  private cargarSolicitudesConPlan(): void {
    this.reportPlanMuestreoService
      .getSolicitudIdsConPlanVigente()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (ids) => (this.solicitudesConPlan = ids),
        error: () => (this.solicitudesConPlan = []),
      });
  }

  cargarPagina(page: number): void {
    this.loadingBusqueda = true;
    this.currentPage = page;
    this.reportSolicitudService
      .getSolicitudesFinalizadas(
        page,
        this.PAGE_SIZE,
        this.FORMULARIO_CT_IDS,
        this.solicitudesConPlan,
      )
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: ({ data, meta }) => {
          this.todasSolicitudes = data;
          this.meta = meta;
          this.aplicarFiltro();
          this.loadingBusqueda = false;
        },
        error: () => {
          this.loadingBusqueda = false;
          this.alertService.error('No se pudo cargar la lista de solicitudes');
        },
      });
  }

  private aplicarFiltro(): void {
    const q = this.busqueda.trim().toLowerCase();
    this.solicitudesFinalizadas = q
      ? this.todasSolicitudes.filter((s) => (s.num_secuencial ?? '').toLowerCase().includes(q))
      : this.todasSolicitudes;
  }

  seleccionarSolicitud(sol: ReportSolicitud): void {
    // Cambiar de solicitud invalida las respuestas capturadas en los pasos
    // siguientes: el payload se arma siempre contra una sola solicitud.
    this.store.limpiar();
    this.solicitudSeleccionada = sol;
    this.panelAbierto = false;
    // El bloqueo depende de la solicitud: se descarta hasta que llegue el
    // detalle de la nueva.
    this.ensayosInSituIds.clear();
    this.cargarDetalle();
    this.cargarAnalisisLaboratorio();
  }

  private cargarDetalle(): void {
    this.loadingDetalle = true;
    this.solicitudDetalleService
      .getSolicitudDetalle(this.solicitudSeleccionada!.id_solicitud)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (detalle) => {
          this.poblarDetalle(detalle);
          this.loadingDetalle = false;
        },
        error: () => {
          this.loadingDetalle = false;
          this.alertService.error('No se pudo cargar el detalle de la solicitud');
        },
      });
  }

  private poblarDetalle(
    detalle: import('../../../../services/solicitudes/solicitud-detalle/solicitud-detalle.service').SolicitudDetalle,
  ): void {
    const f = detalle.formularios?.[0];
    if (!f) return;

    // El tipo de matriz ya no se selecciona manualmente: se deriva del
    // propio detalle de la solicitud (posición 0 del arreglo de tabla_ensayos).
    this.tipoAguaId = f.tabla_ensayos?.[0]?.id_ambiental ?? null;
    this.tipoAguaNombre = f.tabla_ensayos?.[0]?.ensayo_nombre ?? '';

    const buscarAtributo = (nombre: string) =>
      f.atributos?.find((a) => a.nombre_atributo_formulario === nombre);
    const attr = (nombre: string) => buscarAtributo(nombre)?.valor_texto ?? '';

    const fechaEmision = f.fecha_emision_solicitud ? new Date(f.fecha_emision_solicitud) : null;
    this.detalleFechaEmision = fechaEmision ? fechaEmision.toLocaleDateString('es-EC') : '';
    this.detalleFechaMaxima = fechaEmision
      ? new Date(new Date(fechaEmision).setDate(fechaEmision.getDate() + 30)).toLocaleDateString(
          'es-EC',
        )
      : '';
    this.detalleCliente = f.nombre_completo;
    this.detalleLatitud = attr('val_lati');
    this.detalleLongitud = attr('val_long');
    this.detalleDireccion = attr('val_dir_op');

    // El backend ya arma el texto de las jornadas ("Lunes (08:00 - 09:00) |
    // Martes (09:00 - 10:00)"); aquí solo se separa en bloques para listarlos.
    this.detalleHorarios = (buscarAtributo('val_jor_la')?.valor_multiple_format ?? '')
      .split('|')
      .map((bloque) => bloque.trim())
      .filter((bloque) => bloque.length > 0);

    // Los ensayos In Situ ya no se listan ni se envían: solo sirven para saber
    // qué filas de laboratorio quedan marcadas y bloqueadas.
    this.ensayosInSituIds = new Set(
      (f.tabla_ensayos ?? []).flatMap((t) => (t.detalle_ensayo ?? []).map((e) => e.ensayo_id)),
    );
    this.aplicarBloqueoInSitu();
  }

  limpiarSolicitud(): void {
    this.store.limpiar();
    this.solicitudSeleccionada = null;
    this.tipoAguaId = null;
    this.tipoAguaNombre = '';
    this.busqueda = '';
    this.detalleFechaEmision = '';
    this.detalleFechaMaxima = '';
    this.detalleCliente = '';
    this.detalleLatitud = '';
    this.detalleLongitud = '';
    this.detalleDireccion = '';
    this.detalleHorarios = [];
    this.ensayosInSituIds.clear();
    this.tablasLaboratorio = [];
  }

  // Solo se envían los ensayos de laboratorio: los marcados por el usuario y
  // los que quedaron bloqueados por venir exigidos In Situ en la solicitud.
  private ensayosLaboratorioSeleccionados(): PlanMuestreoDetallePayload[] {
    return this.tablasLaboratorio
      .flatMap((t) => t.ensayos)
      .filter((e) => e.activo)
      .map((e) => ({
        estado: true,
        ctambiental_id: e.ctambiental_id,
        ensayo_id: e.ensayo_id,
        cttipo_ensayo_id: e.cttipo_ensayo_id,
      }));
  }

  // Volver a la lista descarta el borrador: el asistente no guarda nada hasta
  // el paso 3.
  cancelar(): void {
    this.store.limpiar();
    this.router.navigate(['/plan-muestreo']);
  }

  siguiente(): void {
    // El contexto de la solicitud viaja en el store hasta el guardado final
    // del paso 3.
    if (this.solicitudSeleccionada) {
      this.store.contexto = {
        solicitudId: this.solicitudSeleccionada.id_solicitud,
        numSecuencial: this.solicitudSeleccionada.num_secuencial ?? '',
        tipoAguaId: this.tipoAguaId,
        tipoAguaNombre: this.tipoAguaNombre,
        ensayos: this.ensayosLaboratorioSeleccionados(),
      };
    }
    this.router.navigate(['/plan-muestreo/paso2']);
  }
}
