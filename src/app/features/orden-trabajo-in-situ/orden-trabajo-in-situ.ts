import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormArray, FormsModule } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import Swal from 'sweetalert2';

import { ReportSolicitudService } from '../../services/solicitudes/lista-solicitudes/report-solicitud.service';
import { ReportSolicitud } from '../../interfaces/solicitudes/lista-solicitudes/report-solicitud.interface';
import { ItemCatalogo, PaginationMeta } from '../../interfaces/catalogos/catalogo.interface';
import { CatalogoService } from '../../services/catalogo.service';
import { SolicitudDetalleService } from '../../services/solicitudes/solicitud-detalle/solicitud-detalle.service';
import { PageHeader } from '../../shared/components/page-header/page-header';

@Component({
  selector: 'app-orden-trabajo-in-situ',
  imports: [CommonModule, ReactiveFormsModule, FormsModule, PageHeader],
  templateUrl: './orden-trabajo-in-situ.html',
  styleUrl: './orden-trabajo-in-situ.css',
})
export class OrdenTrabajoInSitu implements OnInit, OnDestroy {
  form: FormGroup;

  // ── Tipo de ensayo (catálogo 17: Agua / Aire / Ruido) ────────────────────
  private readonly CATALOGO_TIPO_ENSAYO    = 17;
  private readonly CATALOGO_USO_SUELO      = 1003;
  private readonly CATALOGO_CARACTERIZACION = 1005;
  private readonly TIPOS_ENSAYO_PERMITIDOS = [90, 91]; // Aire, Ruido
  private readonly OTROS_ID                = 2015;

  tiposEnsayo: ItemCatalogo[] = [];
  usoSueloOpciones: ItemCatalogo[] = [];
  caracterizacionOpciones: ItemCatalogo[] = [];
  loadingTipos = true;
  tipoEnsayoId: number | null = null;

  get esOtrosOperador(): boolean {
    return this.form.get('usoSuelo.usoSueloOperadorId')?.value === this.OTROS_ID;
  }
  get esOtrosPca(): boolean {
    return this.form.get('usoSuelo.usoSueloPcaId')?.value === this.OTROS_ID;
  }

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
  loadingDetalle = false;
  operadorAtributos: { pregunta: string; valor: string }[] = [];

  private readonly destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private reportSolicitudService: ReportSolicitudService,
    private solicitudDetalleService: SolicitudDetalleService,
    private catalogoService: CatalogoService,
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
      observaciones: [''],
      usoSuelo: this.fb.group({
        usoSueloOperadorId:  [null],
        usoSueloOperadorOtro: [''],
        usoSueloPcaId:       [null],
        usoSueloPcaOtro:     [''],
        caracterizacionId:   [null],
        direccionPca:        [''],
        telefonoPca:         [''],
      }),
    });
  }

  ngOnInit(): void {
    this.catalogoService.getItemsByCatalogoId(this.CATALOGO_TIPO_ENSAYO)
      .pipe(takeUntil(this.destroy$))
      .subscribe({ next: (res) => {
        this.tiposEnsayo  = res.data.filter(t => this.TIPOS_ENSAYO_PERMITIDOS.includes(t.id));
        this.loadingTipos = false;
      }});

    this.catalogoService.getItemsByCatalogoId(this.CATALOGO_USO_SUELO)
      .pipe(takeUntil(this.destroy$))
      .subscribe({ next: (res) => { this.usoSueloOpciones = res.data; }});

    this.catalogoService.getItemsByCatalogoId(this.CATALOGO_CARACTERIZACION)
      .pipe(takeUntil(this.destroy$))
      .subscribe({ next: (res) => { this.caracterizacionOpciones = res.data; }});
  }

  onTipoEnsayoChange(): void {
    if (!this.solicitudSeleccionada) return;
    this.cargarDetalle();
  }

  private cargarDetalle(): void {
    this.loadingDetalle = true;
    this.solicitudDetalleService
      .getSolicitudDetalle(this.solicitudSeleccionada!.id_solicitud)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (detalle) => {
          this.poblarFormulario(detalle);
          this.loadingDetalle = false;
        },
        error: () => {
          this.loadingDetalle = false;
          Swal.fire('Error', 'No se pudo cargar el detalle de la solicitud', 'error');
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
    this.ensayosArray.clear();
    this.operadorAtributos = [];
  }

  private poblarFormulario(detalle: import('../../services/solicitudes/solicitud-detalle/solicitud-detalle.service').SolicitudDetalle): void {
    const f = detalle.formularios?.[0];
    if (!f) return;

    const attr = (nombre: string) =>
      f.atributos?.find(a => a.nombre_atributo_formulario === nombre)?.valor_texto ?? '';

    const fechaEmision = f.fecha_emision_solicitud
      ? new Date(f.fecha_emision_solicitud)
      : null;
    const fechaMaxima = fechaEmision
      ? new Date(new Date(fechaEmision).setDate(fechaEmision.getDate() + 15))
          .toISOString().split('T')[0]
      : '';

    this.form.patchValue({
      solicitudTrabajoNo:   f.num_secuencial_solicitud,
      fechaEmision:         fechaEmision ? fechaEmision.toISOString().split('T')[0] : '',
      fechaMaximaEntrega:   fechaMaxima,
      cliente: {
        solicitadoPor:    f.nombre_completo,
        correoElectronico: attr('val_correo'),
      },
    });

    this.operadorAtributos = (f.atributos ?? [])
      .filter(a => a.nombre_atributo_formulario.endsWith('_op'))
      .sort((a, b) => a.orden - b.orden)
      .map(a => ({
        pregunta: a.pregunta_atributo_formulario,
        valor: a.nombre_valor_catalogo || a.valor_multiple_format || a.valor_texto || '',
      }));

    const ensayosFiltrados = (f.ensayos ?? []).filter(
      e => this.tipoEnsayoId === null || e.parent_ambiental === this.tipoEnsayoId,
    );

    this.ensayosArray.clear();
    for (const e of ensayosFiltrados) {
      const partes = (e.metodo ?? '').split(',');
      this.ensayosArray.push(this.fb.group({
        seleccionado:     [true],
        ensayo:           [e.analisis ?? ''],
        identificacion:   [e.identificacion ?? ''],
        metodoInterno:    [partes[0]?.trim() ?? ''],
        metodoReferencia: [partes.slice(1).join(',').trim()],
        unidad:           [''],
      }));
    }
  }

  limpiarSolicitud(): void {
    this.solicitudSeleccionada = null;
    this.tipoEnsayoId = null;
    this.busqueda = '';
    this.operadorAtributos = [];
    this.form.reset();
    this.ensayosArray.clear();
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
