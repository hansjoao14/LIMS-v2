import {
  Component,
  Input,
  OnInit,
  OnChanges,
  OnDestroy,
  Output,
  EventEmitter,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  FormArray,
  FormsModule,
  Validators,
} from '@angular/forms';
import { Subject, takeUntil, firstValueFrom } from 'rxjs';
import Swal from 'sweetalert2';

import { ReportSolicitudService } from '../../../services/solicitudes/lista-solicitudes/report-solicitud.service';
import { ReportSolicitud } from '../../../interfaces/solicitudes/lista-solicitudes/report-solicitud.interface';
import { ItemCatalogo, PaginationMeta } from '../../../interfaces/catalogos/catalogo.interface';
import { CatalogoService } from '../../../services/catalogo.service';
import { SolicitudDetalleService } from '../../../services/solicitudes/solicitud-detalle/solicitud-detalle.service';
import { SolicitudDetalle } from '../../../services/solicitudes/solicitud-detalle/solicitud-detalle.service';
import {
  OrdenTrabajoService,
  OrdenTrabajoPayload,
} from '../../../services/solicitudes/orden-trabajo/orden-trabajo.service';
import { ReportOrdenService } from '../../../services/solicitudes/orden-trabajo/report-orden.service';
import { ReportOrden } from '../../../interfaces/solicitudes/orden-trabajo/report-orden.interface';
import { AuthService } from '../../auth/service/auth-service';
import { PeriodoService } from '../../../services/solicitudes/solicitud-trabajo/periodo.service';
import { ToastrAlertService } from '../../../services/toastr.service';
import { AlertService } from '../../../services/alert.service';

const TECNICOS_HARDCODED = [
  {
    id: 'jose-luis-montenegro',
    nombre: 'José Luis Montenegro',
    cargo: 'Técnico/a de Muestreo en Campo',
  },
];

@Component({
  selector: 'app-orden-trabajo-in-situ-formulario',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './orden-trabajo-in-situ-formulario.html',
})
export class OrdenTrabajoInSituFormulario implements OnInit, OnChanges, OnDestroy {
  @Input() editingRecord: ReportOrden | null = null;
  @Output() guardado = new EventEmitter<void>();
  @Output() cancelado = new EventEmitter<void>();

  modoEdicion = false;

  form: FormGroup;

  private readonly CATALOGO_USO_SUELO = 1003;
  private readonly CATALOGO_CARACTERIZACION = 1005;
  private readonly OTROS_ID = 2015;

  usoSueloOpciones: ItemCatalogo[] = [];
  caracterizacionOpciones: ItemCatalogo[] = [];
  tipoEnsayoId: number | null = null;
  tipoEnsayoNombre = '';

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
  saving = false;
  readonly tecnicos = TECNICOS_HARDCODED;
  operadorAtributos: { pregunta: string; valor: string }[] = [];

  private readonly destroy$ = new Subject<void>();

  get esOtrosOperador(): boolean {
    return this.form.get('usoSuelo.usoSueloOperadorId')?.value === this.OTROS_ID;
  }
  get esOtrosPca(): boolean {
    return this.form.get('usoSuelo.usoSueloPcaId')?.value === this.OTROS_ID;
  }
  get ensayosArray(): FormArray {
    return this.form.get('ensayos') as FormArray;
  }

  constructor(
    private fb: FormBuilder,
    private reportSolicitudService: ReportSolicitudService,
    private solicitudDetalleService: SolicitudDetalleService,
    private catalogoService: CatalogoService,
    private ordenTrabajoService: OrdenTrabajoService,
    private reportOrdenService: ReportOrdenService,
    private authService: AuthService,
    private periodoService: PeriodoService,
    private toastrAlert: ToastrAlertService,
    private alertService: AlertService,
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
        usoSueloOperadorId: [null, Validators.required],
        usoSueloOperadorOtro: [''],
        usoSueloPcaId: [null, Validators.required],
        usoSueloPcaOtro: [''],
        caracterizacionId: [null, Validators.required],
        direccionPca: ['', Validators.required],
        telefonoPca: [''],
      }),
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['editingRecord'] && this.editingRecord) {
      this.cargarParaEditar(this.editingRecord);
    }
    if (changes['editingRecord'] && !this.editingRecord) {
      this.modoEdicion = false;
    }
  }

  ngOnInit(): void {
    this.catalogoService
      .getItemsByCatalogoId(this.CATALOGO_USO_SUELO)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          this.usoSueloOpciones = res.data;
        },
      });

    this.catalogoService
      .getItemsByCatalogoId(this.CATALOGO_CARACTERIZACION)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          this.caracterizacionOpciones = res.data;
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
    this.ensayosArray.clear();
    this.operadorAtributos = [];
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
          this.alertService.error('No se pudo cargar el detalle de la solicitud');
        },
      });
  }

  private poblarFormulario(detalle: SolicitudDetalle): void {
    const f = detalle.formularios?.[0];
    if (!f) return;

    // El tipo de ensayo (Físico-Químico=90 / Ruido=91) ya no se selecciona
    // manualmente: se deriva del propio detalle de la solicitud.
    this.tipoEnsayoId = f.ensayos?.[0]?.parent_ambiental ?? null;
    this.tipoEnsayoNombre = f.ensayos?.[0]?.nombre_ensayo ?? '';

    const attr = (nombre: string) =>
      f.atributos?.find((a) => a.nombre_atributo_formulario === nombre)?.valor_texto ?? '';

    const fechaEmision = f.fecha_emision_solicitud ? new Date(f.fecha_emision_solicitud) : null;
    const fechaMaxima = fechaEmision
      ? new Date(new Date(fechaEmision).setDate(fechaEmision.getDate() + 15))
          .toISOString()
          .split('T')[0]
      : '';

    this.form.patchValue({
      solicitudTrabajoNo: f.num_secuencial_solicitud,
      fechaEmision: fechaEmision ? fechaEmision.toISOString().split('T')[0] : '',
      fechaMaximaEntrega: fechaMaxima,
      cliente: {
        solicitadoPor: f.nombre_completo,
        correoElectronico: attr('val_correo'),
      },
    });

    this.operadorAtributos = (f.atributos ?? [])
      .filter((a) => a.nombre_atributo_formulario.endsWith('_op'))
      .sort((a, b) => a.orden - b.orden)
      .map((a) => ({
        pregunta: a.pregunta_atributo_formulario,
        valor: a.nombre_valor_catalogo || a.valor_multiple_format || a.valor_texto || '',
      }));

    const ensayosFiltrados = (f.ensayos ?? []).filter(
      (e) => this.tipoEnsayoId === null || e.parent_ambiental === this.tipoEnsayoId,
    );

    this.ensayosArray.clear();
    for (const e of ensayosFiltrados) {
      const partes = (e.metodo ?? '').split(',');
      this.ensayosArray.push(
        this.fb.group({
          ensayoId: [e.id ?? ''],
          seleccionado: [true],
          ensayo: [e.analisis ?? ''],
          identificacion: [e.identificacion ?? ''],
          metodoInterno: [partes[0]?.trim() ?? ''],
          metodoReferencia: [partes.slice(1).join(',').trim()],
          unidad: [''],
        }),
      );
    }
  }

  private cargarParaEditar(orden: ReportOrden): void {
    this.modoEdicion = true;
    this.tipoEnsayoId = orden.ctambiente_id;
    this.tipoEnsayoNombre = orden.ctambiente_nombre ?? '';

    const fechaEmision = orden.creado_en
      ? new Date(+orden.creado_en).toISOString().split('T')[0]
      : '';

    this.form.patchValue({
      solicitudTrabajoNo: orden.solicitud_num_secuencial,
      ordenTrabajoNo: orden.num_secuencial ?? '',
      fechaEmision,
      observaciones: orden.observacion ?? '',
      cliente: { solicitadoPor: orden.usuario_nombre_completo },
      usoSuelo: {
        usoSueloOperadorId: orden.ctuso_suelo_id,
        usoSueloPcaId: orden.ctpunto_critico_id,
        caracterizacionId: orden.ctcaracteristica_horaria_id,
        direccionPca: orden.direccion_pca ?? '',
        telefonoPca: orden.telefono_pca ?? '',
      },
    });

    this.solicitudSeleccionada = { id_solicitud: orden.solicitud_id } as ReportSolicitud;

    this.loadingDetalle = true;
    this.reportOrdenService
      .getDetallesByOrdenId(orden.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (detalles) => {
          this.ensayosArray.clear();
          for (const d of detalles) {
            const partes = (d.metodo ?? '').split(',');
            this.ensayosArray.push(
              this.fb.group({
                ensayoId: [d.solicitud_ensayo_id],
                seleccionado: [true],
                ensayo: [d.analisis ?? ''],
                identificacion: [d.identificacion ?? ''],
                metodoInterno: [partes[0]?.trim() ?? ''],
                metodoReferencia: [partes.slice(1).join(',').trim()],
                unidad: [''],
              }),
            );
          }
          this.loadingDetalle = false;
        },
        error: () => {
          this.loadingDetalle = false;
        },
      });
  }

  limpiarSolicitud(): void {
    this.solicitudSeleccionada = null;
    this.tipoEnsayoId = null;
    this.tipoEnsayoNombre = '';
    this.busqueda = '';
    this.operadorAtributos = [];
    this.form.reset();
    this.ensayosArray.clear();
  }

  // ── Ensayos ──────────────────────────────────────────────────────────────

  get ensayosControls() {
    return this.ensayosArray.controls;
  }

  toggleEnsayo(index: number): void {
    const control = this.ensayosArray.at(index).get('seleccionado');
    control?.setValue(!control.value);
  }

  // ── Guardar ──────────────────────────────────────────────────────────────

  async guardar(): Promise<void> {
    if (!this.solicitudSeleccionada) {
      this.toastrAlert.showWarning(
        'Seleccione una solicitud de trabajo antes de guardar.',
        'Requerido',
      );
      return;
    }
    if (!this.tipoEnsayoId) {
      this.toastrAlert.showWarning(
        'No se pudo determinar el tipo de ensayo de la solicitud seleccionada.',
        'Requerido',
      );
      return;
    }

    if (this.tipoEnsayoId === 91) {
      const usoSuelo = this.form.get('usoSuelo') as FormGroup;
      usoSuelo.markAllAsTouched();
      const camposRequeridos = [
        'usoSueloOperadorId',
        'usoSueloPcaId',
        'caracterizacionId',
        'direccionPca',
      ];
      const hayInvalidos = camposRequeridos.some((c) => usoSuelo.get(c)?.invalid);
      if (hayInvalidos) {
        this.toastrAlert.showWarning(
          'Complete todos los campos obligatorios antes de guardar.',
          'Requerido',
        );
        return;
      }
    }

    this.saving = true;
    const raw = this.form.getRawValue();
    const { id: userId } = this.authService.currentUser();

    try {
      if (this.modoEdicion) {
        const ordenPayload: OrdenTrabajoPayload = {
          solicitud_id: this.solicitudSeleccionada.id_solicitud,
          usuario_id: userId,
          entidad_id: this.editingRecord!.entidad_id,
          ctambiente_id: this.tipoEnsayoId,
          periodo_id: this.editingRecord!.periodo_id,
          secuencial_id: this.editingRecord!.secuencial_id ?? null,
          num_secuencial: this.editingRecord!.num_secuencial ?? null,
          ctuso_suelo_id: raw.usoSuelo.usoSueloOperadorId ?? null,
          ctcaracteristica_horaria_id: raw.usoSuelo.caracterizacionId ?? null,
          ctpunto_critico_id: raw.usoSuelo.usoSueloPcaId ?? null,
          direccion_pca: raw.usoSuelo.direccionPca || null,
          telefono_pca: raw.usoSuelo.telefonoPca || null,
          observacion: raw.observaciones || null,
          ctestado_id: this.editingRecord!.ctestado_id,
          estado: this.editingRecord!.estado,
          ctformulario_id: this.editingRecord!.ctformulario_id,
        };

        await firstValueFrom(
          this.ordenTrabajoService.actualizarOrden(this.editingRecord!.id, ordenPayload),
        );
        this.toastrAlert.showSuccess(
          'La orden de trabajo In Situ ha sido actualizada.',
          '¡Actualizado!',
        );
        this.guardado.emit();
        return;
      }

      const opcionesUsuario = this.tecnicos
        .map((u) => `<option value="${u.id}">${u.nombre} — ${u.cargo}</option>`)
        .join('');

      const swalResult = await Swal.fire<{ usuario: string }>({
        title: 'Técnico asignado',
        html: `
          <label style="font-size:11px;font-weight:700;color:#1e3a8a;text-transform:uppercase;display:block;text-align:left;margin-bottom:4px;">
            Técnico asignado *
          </label>
          <select id="swal-usuario" class="swal2-input" style="margin:0;width:100%;">
            <option value="">Seleccione...</option>
            ${opcionesUsuario}
          </select>
        `,
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#1e3a8a',
        cancelButtonColor: '#64748b',
        confirmButtonText: 'Continuar',
        cancelButtonText: 'Cancelar',
        focusConfirm: false,
        preConfirm: () => {
          const sel = document.getElementById('swal-usuario') as HTMLSelectElement;
          if (!sel?.value) {
            Swal.showValidationMessage('Debe seleccionar un técnico asignado');
            return false;
          }
          return { usuario: sel.value };
        },
      });

      if (!swalResult.isConfirmed || !swalResult.value) {
        this.saving = false;
        return;
      }

      const tecnicoSeleccionado =
        this.tecnicos.find((u) => u.id === swalResult.value!.usuario) ?? null;
      console.log('[orden-in-situ:tecnico]', JSON.parse(JSON.stringify({ tecnicoSeleccionado })));

      const now = new Date();
      const ejercicio = await this.periodoService.getEjercicioByAnio(now.getFullYear());
      if (!ejercicio) throw new Error(`No hay ejercicio activo para ${now.getFullYear()}`);

      const periodo = await this.periodoService.getPeriodoByEjercicioAndMes(
        ejercicio.id,
        now.getMonth() + 1,
      );
      if (!periodo) throw new Error(`No hay periodo activo para el mes ${now.getMonth() + 1}`);

      const ensayosSeleccionados = (raw.ensayos as any[]).filter(
        (e: any) => e.seleccionado && e.ensayoId,
      );

      //TODO: Cambiar el entidad_id
      const payload = {
        ordenTrabajo: {
          solicitud_id: this.solicitudSeleccionada.id_solicitud,
          usuario_id: userId,
          entidad_id: 'F9687983-F6CF-4706-9004-A1B793E3A987',
          ctambiente_id: this.tipoEnsayoId,
          periodo_id: periodo.id,
          secuencial_id: null,
          num_secuencial: null,
          ctuso_suelo_id: raw.usoSuelo.usoSueloOperadorId ?? null,
          ctcaracteristica_horaria_id: raw.usoSuelo.caracterizacionId ?? null,
          ctpunto_critico_id: raw.usoSuelo.usoSueloPcaId ?? null,
          direccion_pca: raw.usoSuelo.direccionPca || null,
          telefono_pca: raw.usoSuelo.telefonoPca || null,
          observacion: raw.observaciones || null,
          ctestado_id: 2,
          estado: true,
          ctformulario_id: 0,
        },
        ordenTrabajoDetalle: ensayosSeleccionados.map((e: any) => ({
          solicitud_ensayo_id: e.ensayoId,
          estado: true,
        })),
      };

      console.log('[orden-in-situ:guardar]', JSON.parse(JSON.stringify(payload)));

      await firstValueFrom(this.ordenTrabajoService.crearOrdenTrabajoConDetalle(payload));

      this.toastrAlert.showSuccess('La orden de trabajo In Situ ha sido guardada.', '¡Guardado!');
      this.guardado.emit();
    } catch {
      this.toastrAlert.showError('No se pudo guardar la orden de trabajo.', 'Error');
    } finally {
      this.saving = false;
    }
  }
}
