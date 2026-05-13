import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgFor } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormArray, FormsModule } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import Swal from 'sweetalert2';

import { ReportSolicitudService } from '../../services/solicitudes/lista-solicitudes/report-solicitud.service';
import { ReportSolicitud } from '../../interfaces/solicitudes/lista-solicitudes/report-solicitud.interface';
import { PaginationMeta } from '../../interfaces/catalogos/catalogo.interface';
import { PaginationComponent } from '../../shared/components/pagination/pagination';
import { SolicitudDetalleService } from '../../services/solicitudes/solicitud-detalle/solicitud-detalle.service';

@Component({
  selector: 'app-orden-trabajo-in-situ',
  imports: [CommonModule, ReactiveFormsModule, NgFor, FormsModule, PaginationComponent],
  templateUrl: './orden-trabajo-in-situ.html',
  styleUrl: './orden-trabajo-in-situ.css',
})
export class OrdenTrabajoInSitu implements OnInit, OnDestroy {
  form: FormGroup;

  // ── Búsqueda de solicitudes finalizadas ──────────────────────────────────
  panelAbierto = false;
  loadingBusqueda = false;
  private todasSolicitudes: ReportSolicitud[] = [];
  solicitudesFinalizadas: ReportSolicitud[] = [];
  meta: PaginationMeta | null = null;
  currentPage = 1;
  readonly PAGE_SIZE = 8;
  busqueda = '';
  solicitudSeleccionada: ReportSolicitud | null = null;

  private readonly destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private reportSolicitudService: ReportSolicitudService,
    private solicitudDetalleService: SolicitudDetalleService,
  ) {
    this.form = this.fb.group({
      solicitudTrabajoNo: [''],
      ordenTrabajoNo: [''],
      fechaMaximaEntrega: [''],
      fechaEmision: [''],
      cliente: this.fb.group({
        solicitadoPor: [''],
        direccion: [''],
        solicitudNo: [''],
        correoElectronico: [''],
      }),
      operador: this.fb.group({
        razonSocial: [''],
        nombreComercial: [''],
        ruc: [''],
        direccion: [''],
      }),
      ensayos: this.fb.array([]),
      tiposUsoSuelo: this.fb.group({
        usoSuelo: [''],
        caracterizacionHoraria: [''],
      }),
    });
  }

  ngOnInit(): void {}

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
        console.log('[OrdenTrabajoInSitu] Detalle solicitud:', detalle);
        this.poblarFormulario(detalle);
      });
  }

  private poblarFormulario(detalle: import('../../services/solicitudes/solicitud-detalle/solicitud-detalle.service').SolicitudDetalle): void {
    const f = detalle.formularios?.[0];
    if (!f) return;

    const attr = (nombre: string) =>
      f.atributos?.find(a => a.nombre_atributo_formulario === nombre)?.valor_texto ?? '';

    this.form.patchValue({
      solicitudTrabajoNo: f.num_secuencial_solicitud,
      fechaEmision: f.fecha_emision_solicitud
        ? new Date(f.fecha_emision_solicitud).toISOString().split('T')[0]
        : '',
      cliente: {
        solicitadoPor:    f.nombre_completo,
        correoElectronico: attr('val_correo'),
      },
      operador: {
        razonSocial:     attr('val_razon_op'),
        nombreComercial: attr('val_come_op'),
        ruc:             attr('val_ruc_op'),
        direccion:       attr('val_dir_op'),
      },
    });

    this.ensayosArray.clear();
    for (const e of f.ensayos ?? []) {
      const parts = (e.metodo ?? '').split(', ');
      this.ensayosArray.push(this.fb.group({
        seleccionado:     [true],
        ensayo:           [e.analisis ?? ''],
        identificacion:   [e.identificacion ?? ''],
        metodoInterno:    [parts[0] ?? ''],
        metodoReferencia: [parts[1] ?? ''],
        unidad:           [''],
      }));
    }
    if (this.ensayosArray.length === 0) {
      this.ensayosArray.push(this.crearEnsayo());
      this.ensayosArray.push(this.crearEnsayo());
    }
  }

  limpiarSolicitud(): void {
    this.solicitudSeleccionada = null;
    this.busqueda = '';
    this.form.patchValue({ solicitudTrabajoNo: '', cliente: { solicitadoPor: '' } });
  }

  // ── Ensayos ──────────────────────────────────────────────────────────────

  crearEnsayo(): FormGroup {
    return this.fb.group({
      seleccionado: [false],
      ensayo: [''],
      identificacion: [''],
      metodoInterno: [''],
      metodoReferencia: [''],
      unidad: [''],
    });
  }

  get ensayosArray(): FormArray {
    return this.form.get('ensayos') as FormArray;
  }

  agregarEnsayo(): void {
    this.ensayosArray.push(this.crearEnsayo());
  }

  toggleEnsayo(index: number): void {
    const control = this.ensayosArray.at(index).get('seleccionado');
    control?.setValue(!control.value);
  }

  private readonly COLOR_PRIMARIO = '#1e3a8a';

  guardar(): void {
    this.form.reset();
    this.solicitudSeleccionada = null;
    while (this.ensayosArray.length > 2) {
      this.ensayosArray.removeAt(this.ensayosArray.length - 1);
    }
    Swal.fire({
      title: '¡Guardado con éxito!',
      text: 'La orden de trabajo In Situ ha sido guardada correctamente.',
      icon: 'success',
      confirmButtonColor: this.COLOR_PRIMARIO,
      timer: 2500,
    });
  }
}
