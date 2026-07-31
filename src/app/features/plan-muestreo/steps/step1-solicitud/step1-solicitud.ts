import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
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
import { PlanMuestreoStore } from '../../model/plan-muestreo.store';
import { PlanMuestreoDetallePayload } from '../../../../interfaces/solicitudes/plan-muestreo/plan-muestreo.interface';

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
  imports: [CommonModule, FormsModule, PageHeader],
  templateUrl: './step1-solicitud.html',
  styleUrl: '../../plan-muestreo.css',
})
export class Step1SolicitudComponent implements OnInit, OnDestroy {
  // Posición en el asistente, para el stepper de la cabecera.
  readonly PASO = 1;
  readonly TOTAL_PASOS = 3;

  formulario: ReportFormulario | null = null;
  fechaEmision: Date | null = null;

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

  // TODO: prueba temporal — ids quemados de las tablas de laboratorio
  // (H2SO4, HNO3, TEMPERATURA, Aguas Residuales/Aguas) mientras se define de
  // dónde deben derivarse dinámicamente (ver el mismo listado en step3-catalogo).
  readonly IDS_LABORATORIO_PRUEBA = [2073, 2035, 2036, 2037];
  tablasLaboratorio: TablaLaboratorioUI[] = [];
  // `ensayo_id` de los análisis que la solicitud ya exige In Situ. El cruce va
  // por ensayo: el ctambiental_id de la solicitud nunca coincide con el de las
  // tablas de laboratorio, que son catálogos distintos.
  private ensayosInSituIds = new Set<number>();

  private readonly destroy$ = new Subject<void>();

  constructor(
    private reportSolicitudService: ReportSolicitudService,
    private solicitudDetalleService: SolicitudDetalleService,
    private ensayoItemService: EnsayoItemService,
    private router: Router,
    private alertService: AlertService,
    private store: PlanMuestreoStore,
  ) {}

  ngOnInit(): void {
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
    this.destroy$.next();
    this.destroy$.complete();
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

  cargarPagina(page: number): void {
    this.loadingBusqueda = true;
    this.currentPage = page;
    this.reportSolicitudService
      .getSolicitudesFinalizadas(page, this.PAGE_SIZE, this.FORMULARIO_CT_IDS)
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

    const attr = (nombre: string) =>
      f.atributos?.find((a) => a.nombre_atributo_formulario === nombre)?.valor_texto ?? '';

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
