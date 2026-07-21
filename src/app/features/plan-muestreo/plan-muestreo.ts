import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, takeUntil, forkJoin } from 'rxjs';

import { ReportSolicitudService } from '../../services/solicitudes/lista-solicitudes/report-solicitud.service';
import { ReportFormularioService } from '../../services/admin-formularios/report-formulario.service';
import { ReportSolicitud } from '../../interfaces/solicitudes/lista-solicitudes/report-solicitud.interface';
import { ReportFormulario } from '../../interfaces/admin-formularios/report-formulario.interface';
import { PaginationMeta } from '../../interfaces/catalogos/catalogo.interface';
import { SolicitudDetalleService } from '../../services/solicitudes/solicitud-detalle/solicitud-detalle.service';
import { PageHeader } from '../../shared/components/page-header/page-header';
import { AlertService } from '../../services/alert.service';
import { EnsayoItemService } from '../../services/solicitudes/solicitud-trabajo/ensayo-item.service';
import { ReportCatalogoNota } from '../../interfaces/solicitudes/solicitud-trabajo';
import { PlanMuestreoStore } from './model/plan-muestreo.store';
import { PlanMuestreoDetallePayload } from '../../services/solicitudes/plan-muestreo/plan-muestreo.service';

export interface EnsayoRow {
  analisis: string;
  identificacion: string;
  metodoInterno: string;
  metodoReferencia: string;
}

export interface EnsayoLaboratorioRow {
  activo: boolean;
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
  selector: 'app-plan-muestreo',
  imports: [CommonModule, FormsModule, PageHeader],
  templateUrl: './plan-muestreo.html',
  styleUrl: './plan-muestreo.css',
})
export class PlanMuestreo implements OnInit, OnDestroy {
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
  detalleEnsayos: EnsayoRow[] = [];
  // Los mismos ensayos, con los ids que necesita el POST create-detalle.
  private ensayosDetalle: PlanMuestreoDetallePayload[] = [];

  // TODO: prueba temporal — ids quemados de las 3 tablas de laboratorio
  // (H2SO4, H2SO3, TEMPERATURA) mientras se define de dónde deben derivarse
  // dinámicamente (ver el mismo listado en step3-catalogo).
  readonly IDS_LABORATORIO_PRUEBA = [2035, 2036, 2037];
  tablasLaboratorio: TablaLaboratorioUI[] = [];

  private readonly destroy$ = new Subject<void>();

  constructor(
    private reportSolicitudService: ReportSolicitudService,
    private reportFormularioService: ReportFormularioService,
    private solicitudDetalleService: SolicitudDetalleService,
    private ensayoItemService: EnsayoItemService,
    private router: Router,
    private alertService: AlertService,
    private store: PlanMuestreoStore,
  ) {}

  ngOnInit(): void {
    this.reportFormularioService
      .getFormularioByCTId(2019)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (formulario) => {
          this.formulario = formulario;
          if (formulario?.fecha_emision) {
            this.fechaEmision = new Date(Number(formulario.fecha_emision));
          }
        },
      });
  }

  // TODO: prueba temporal — trae las 3 tablas de IDS_LABORATORIO_PRUEBA
  // (fijos, no derivados de la solicitud) para "Análisis Requerido en
  // Laboratorio", con el mismo formato dinámico (título/notas/ensayos) que
  // ya se usa en step3-catalogo.
  private cargarAnalisisLaboratorio(): void {
    forkJoin(
      this.IDS_LABORATORIO_PRUEBA.map((id) =>
        this.ensayoItemService.getReportCatalogoEnsayoItem(id),
      ),
    )
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (resultados) => {
          this.tablasLaboratorio = resultados.flat().map((entry) => ({
            titulo: entry.ensayo_nombre,
            notas: entry.notas ?? [],
            ensayos: entry.Ensayos.map((i) => {
              const partes = i.metodo.split(',');
              return {
                activo: false,
                ensayo: i.analisis,
                identificacion: i.identificacion,
                metodoInterno: partes[0]?.trim() ?? '',
                metodoReferencia: partes.slice(1).join(',').trim(),
                unidad: i.unidad_medida,
              };
            }),
          }));
        },
        error: () => {
          this.tablasLaboratorio = [];
        },
      });
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
    this.detalleEnsayos = [];
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
    detalle: import('../../services/solicitudes/solicitud-detalle/solicitud-detalle.service').SolicitudDetalle,
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
      ? new Date(new Date(fechaEmision).setDate(fechaEmision.getDate() + 10)).toLocaleDateString(
          'es-EC',
        )
      : '';
    this.detalleCliente = f.nombre_completo;
    this.detalleLatitud = attr('val_lati');
    this.detalleLongitud = attr('val_long');
    this.detalleDireccion = attr('val_dir_op');

    this.detalleEnsayos = (f.tabla_ensayos ?? [])
      .flatMap((t) => t.detalle_ensayo ?? [])
      .map((e) => {
        const parts = (e.metodo ?? '').split(', ');
        return {
          analisis: e.analisis ?? '',
          identificacion: e.identificacion ?? '',
          metodoInterno: parts[0] ?? '',
          metodoReferencia: parts[1] ?? '',
        };
      });

    // Los ids que la tabla no muestra pero sí necesita `planMuestreoDetalle`:
    // el ambiental y el tipo de ensayo salen del grupo, el ensayo de la fila.
    this.ensayosDetalle = (f.tabla_ensayos ?? []).flatMap((t) =>
      (t.detalle_ensayo ?? []).map((e) => ({
        estado: true,
        ctambiental_id: t.id_ambiental,
        ensayo_id: e.ensayo_id,
        cttipo_ensayo_id: t.ensayo_id,
      })),
    );
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
    this.detalleEnsayos = [];
    this.ensayosDetalle = [];
    this.tablasLaboratorio = [];
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
        ctformularioId: this.solicitudSeleccionada.formulario_ct_id ?? 0,
        tipoAguaId: this.tipoAguaId,
        tipoAguaNombre: this.tipoAguaNombre,
        ensayos: this.ensayosDetalle,
      };
    }
    this.router.navigate(['/plan-muestreo/paso2']);
  }
}
