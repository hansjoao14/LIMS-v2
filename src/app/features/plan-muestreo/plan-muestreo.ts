import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import Swal from 'sweetalert2';

import { ReportSolicitudService } from '../../services/solicitudes/lista-solicitudes/report-solicitud.service';
import { ReportSolicitud } from '../../interfaces/solicitudes/lista-solicitudes/report-solicitud.interface';
import { PaginationMeta } from '../../interfaces/catalogos/catalogo.interface';
import { SolicitudDetalleService } from '../../services/solicitudes/solicitud-detalle/solicitud-detalle.service';

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
  imports: [CommonModule, FormsModule],
  templateUrl: './plan-muestreo.html',
  styleUrl: './plan-muestreo.css',
})
export class PlanMuestreo implements OnInit, OnDestroy {
  panelAbierto = false;
  loadingBusqueda = false;
  private todasSolicitudes: ReportSolicitud[] = [];
  solicitudesFinalizadas: ReportSolicitud[] = [];
  meta: PaginationMeta | null = null;
  currentPage = 1;
  readonly PAGE_SIZE = 8;
  busqueda = '';
  solicitudSeleccionada: ReportSolicitud | null = null;

  detalleFechaEmision = '';
  detalleCliente = '';
  detalleLatitud = '';
  detalleLongitud = '';
  detalleDireccion = '';
  detalleEnsayos: EnsayoRow[] = [];

  ensayosLaboratorio: GrupoLaboratorio[] = [
    {
      preservante: 'H2SO4',
      ensayos: [
        { activo: true, ensayo: 'DEMANDA QUÍMICA DE OXÍGENO', identificacion: 'DQO', metodoInterno: 'PEE/IAM-Q/03', metodoReferencia: 'APHA 5220D', unidad: 'mg/L' },
        { activo: true, ensayo: 'ACEITES Y GRASAS', identificacion: 'AyG', metodoInterno: 'PEE/IAM-Q/05', metodoReferencia: 'EPA 1664', unidad: 'mg/L' },
      ],
    },
    {
      preservante: 'TEMPERATURA',
      ensayos: [
        { activo: true, ensayo: 'DEMANDA BIOQUÍMICA DE OXÍGENO', identificacion: 'DBO5', metodoInterno: 'PEE/IAM-Q/27', metodoReferencia: 'APHA 5210B', unidad: 'mg/L' },
        { activo: true, ensayo: 'SÓLIDOS SUSPENDIDOS TOTALES', identificacion: 'SST', metodoInterno: 'PEE/IAM-Q/02', metodoReferencia: 'APHA 2540D', unidad: 'mg/L' },
        { activo: true, ensayo: 'TURBIDEZ', identificacion: '-', metodoInterno: 'PEE/IAM-Q/31', metodoReferencia: 'SM 2130 B', unidad: 'NTU' },
      ],
    },
  ];

  private readonly destroy$ = new Subject<void>();

  constructor(
    private reportSolicitudService: ReportSolicitudService,
    private solicitudDetalleService: SolicitudDetalleService,
    private router: Router,
  ) {}

  siguiente(): void {
    this.router.navigate(['/plan-muestreo/paso2']);
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

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
      .getSolicitudesFinalizadas(page, this.PAGE_SIZE)
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
          Swal.fire('Error', 'No se pudo cargar la lista de solicitudes', 'error');
        },
      });
  }

  private aplicarFiltro(): void {
    const q = this.busqueda.trim().toLowerCase();
    this.solicitudesFinalizadas = q
      ? this.todasSolicitudes.filter(s =>
          (s.num_secuencial ?? '').toLowerCase().includes(q)
        )
      : this.todasSolicitudes;
  }

  seleccionarSolicitud(sol: ReportSolicitud): void {
    this.solicitudSeleccionada = sol;
    this.panelAbierto = false;
    this.solicitudDetalleService
      .getSolicitudDetalle(sol.id_solicitud)
      .pipe(takeUntil(this.destroy$))
      .subscribe(detalle => {
        this.poblarDetalle(detalle);
      });
  }

  private poblarDetalle(detalle: import('../../services/solicitudes/solicitud-detalle/solicitud-detalle.service').SolicitudDetalle): void {
    const f = detalle.formularios?.[0];
    if (!f) return;

    const attr = (nombre: string) =>
      f.atributos?.find(a => a.nombre_atributo_formulario === nombre)?.valor_texto ?? '';

    this.detalleFechaEmision = f.fecha_emision_solicitud
      ? new Date(f.fecha_emision_solicitud).toLocaleDateString('es-EC')
      : '';
    this.detalleCliente   = f.nombre_completo;
    this.detalleLatitud   = attr('val_lati');
    this.detalleLongitud  = attr('val_long');
    this.detalleDireccion = attr('val_dir_op');

    this.detalleEnsayos = (f.ensayos ?? []).map(e => {
      const parts = (e.metodo ?? '').split(', ');
      return {
        analisis:        e.analisis ?? '',
        identificacion:  e.identificacion ?? '',
        metodoInterno:   parts[0] ?? '',
        metodoReferencia: parts[1] ?? '',
      };
    });
  }

  limpiarSolicitud(): void {
    this.solicitudSeleccionada = null;
    this.busqueda = '';
    this.detalleFechaEmision = '';
    this.detalleCliente      = '';
    this.detalleLatitud      = '';
    this.detalleLongitud     = '';
    this.detalleDireccion    = '';
    this.detalleEnsayos      = [];
  }
}
