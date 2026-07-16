import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

import { ReportSolicitudService } from '../../services/solicitudes/lista-solicitudes/report-solicitud.service';
import { ReportFormularioService } from '../../services/admin-formularios/report-formulario.service';
import { ReportSolicitud } from '../../interfaces/solicitudes/lista-solicitudes/report-solicitud.interface';
import { ReportFormulario } from '../../interfaces/admin-formularios/report-formulario.interface';
import { PaginationMeta } from '../../interfaces/catalogos/catalogo.interface';
import { SolicitudDetalleService } from '../../services/solicitudes/solicitud-detalle/solicitud-detalle.service';
import { PageHeader } from '../../shared/components/page-header/page-header';
import { AlertService } from '../../services/alert.service';

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

export interface GrupoLaboratorio {
  preservante: string;
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

  ensayosLaboratorio: GrupoLaboratorio[] = [
    {
      preservante: 'H2SO4',
      ensayos: [
        {
          activo: false,
          ensayo: 'DEMANDA QUÍMICA DE OXÍGENO',
          identificacion: 'DQO',
          metodoInterno: 'PEE/IAM-Q/03',
          metodoReferencia: 'APHA 5220D',
          unidad: 'mg/L',
        },
        {
          activo: false,
          ensayo: 'ACEITES Y GRASAS',
          identificacion: 'AyG',
          metodoInterno: 'PEE/IAM-Q/05',
          metodoReferencia: 'EPA 1664',
          unidad: 'mg/L',
        },
      ],
    },
    {
      preservante: 'TEMPERATURA',
      ensayos: [
        {
          activo: false,
          ensayo: 'DEMANDA BIOQUÍMICA DE OXÍGENO',
          identificacion: 'DBO5',
          metodoInterno: 'PEE/IAM-Q/27',
          metodoReferencia: 'APHA 5210B',
          unidad: 'mg/L',
        },
        {
          activo: false,
          ensayo: 'SÓLIDOS SUSPENDIDOS TOTALES',
          identificacion: 'SST',
          metodoInterno: 'PEE/IAM-Q/02',
          metodoReferencia: 'APHA 2540D',
          unidad: 'mg/L',
        },
        {
          activo: false,
          ensayo: 'TURBIDEZ',
          identificacion: '-',
          metodoInterno: 'PEE/IAM-Q/31',
          metodoReferencia: 'SM 2130 B',
          unidad: 'NTU',
        },
      ],
    },
  ];

  private readonly destroy$ = new Subject<void>();

  constructor(
    private reportSolicitudService: ReportSolicitudService,
    private reportFormularioService: ReportFormularioService,
    private solicitudDetalleService: SolicitudDetalleService,
    private router: Router,
    private alertService: AlertService,
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
    this.solicitudSeleccionada = sol;
    this.panelAbierto = false;
    this.detalleEnsayos = [];
    this.cargarDetalle();
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
    // propio detalle de la solicitud (posición 0 del arreglo de ensayos).
    this.tipoAguaId = f.ensayos?.[0]?.ctambiental_id ?? null;
    this.tipoAguaNombre = f.ensayos?.[0]?.nombre_ensayo ?? '';

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

    this.detalleEnsayos = (f.ensayos ?? [])
      .filter((e) => this.tipoAguaId === null || e.ctambiental_id === this.tipoAguaId)
      .map((e) => {
        const parts = (e.metodo ?? '').split(', ');
        return {
          analisis: e.analisis ?? '',
          identificacion: e.identificacion ?? '',
          metodoInterno: parts[0] ?? '',
          metodoReferencia: parts[1] ?? '',
        };
      });
  }

  limpiarSolicitud(): void {
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
  }

  siguiente(): void {
    this.router.navigate(['/plan-muestreo/paso2']);
  }
}
