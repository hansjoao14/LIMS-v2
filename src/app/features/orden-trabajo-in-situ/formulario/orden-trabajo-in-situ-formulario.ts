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
  FormControl,
  FormsModule,
  Validators,
  ValidatorFn,
} from '@angular/forms';
import { Subject, takeUntil, firstValueFrom } from 'rxjs';

import { ReportSolicitudService } from '../../../services/solicitudes/lista-solicitudes/report-solicitud.service';
import {
  ReportSolicitud,
  ReportValorSolicitud,
} from '../../../interfaces/solicitudes/lista-solicitudes/report-solicitud.interface';
import { PaginationMeta } from '../../../interfaces/catalogos/catalogo.interface';
import { SolicitudDetalleService } from '../../../services/solicitudes/solicitud-detalle/solicitud-detalle.service';
import { SolicitudDetalle } from '../../../services/solicitudes/solicitud-detalle/solicitud-detalle.service';
import {
  OrdenTrabajoService,
  OrdenTrabajoPayload,
  CrearOrdenTrabajoConDetallePayload,
  ValorOrdenTrabajoPayload,
} from '../../../services/solicitudes/orden-trabajo/orden-trabajo.service';
import { ReportOrdenService } from '../../../services/solicitudes/orden-trabajo/report-orden.service';
import { ReportOrden } from '../../../interfaces/solicitudes/orden-trabajo/report-orden.interface';
import { AuthService } from '../../auth/service/auth-service';
import { PeriodoService } from '../../../services/solicitudes/solicitud-trabajo/periodo.service';
import { ToastrAlertService } from '../../../services/toastr.service';
import { AlertService } from '../../../services/alert.service';
import {
  SolicitudService,
  ValorSolicitudItem,
} from '../../../services/solicitudes/solicitud-trabajo/solicitud-trabajo.service';
import { FieldConfig, Pregunta } from '../../solicitud-trabajo/model/solicitud-trabajo.model';

/**
 * Formulario dinámico propio de "Orden de Trabajo In Situ" (observaciones,
 * caracterización horaria, uso de suelo del operador y del PCA a la fecha).
 * Sus preguntas se renderizan 100% desde la API — si el backend agrega o
 * quita preguntas, este componente no necesita cambios.
 */
const FORMULARIO_OPERATIVO_ID = '2018';

// TODO: valor quemado temporal — el backend exige orden_trabajo_id (UUID) en
// ordenTrabajoDetalle/valorOrdenTrabajo incluso en el POST de creación, donde
// la orden aún no existe y no hay un id real disponible. Quitar en cuanto
// backend defina cómo debe viajar ese id en la creación.

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

  tipoEnsayoId: number | null = null;
  tipoEnsayoNombre = '';

  panelAbierto = false;
  loadingBusqueda = false;
  private todasSolicitudes: ReportSolicitud[] = [];
  solicitudesFinalizadas: ReportSolicitud[] = [];
  meta: PaginationMeta | null = null;
  currentPage = 1;
  readonly PAGE_SIZE = 8;
  // Solo se listan solicitudes de estos formulario_ct_id (formularios
  // válidos para generar una orden de trabajo in situ).
  readonly FORMULARIO_CT_IDS = [2029, 380];
  busqueda = '';
  solicitudSeleccionada: ReportSolicitud | null = null;
  loadingDetalle = false;
  saving = false;
  operadorAtributos: { pregunta: string; valor: string }[] = [];

  // Campos del formulario dinámico "Orden de Trabajo In Situ" (ver
  // FORMULARIO_OPERATIVO_ID). Se renderizan y validan igual que en
  // solicitud-trabajo.ts (docs/formularios-dinamicos-estandar.md).
  camposOperativos: FieldConfig[] = [];
  loadingCamposOperativos = true;

  private readonly destroy$ = new Subject<void>();

  get ensayosArray(): FormArray {
    return this.form.get('ensayos') as FormArray;
  }

  get visibleCamposOperativos(): FieldConfig[] {
    return this.camposOperativos.filter((f) => !f.hidden);
  }

  getOperativoControl(key: string): FormControl {
    return this.form.get(key) as FormControl;
  }

  constructor(
    private fb: FormBuilder,
    private reportSolicitudService: ReportSolicitudService,
    private solicitudDetalleService: SolicitudDetalleService,
    private ordenTrabajoService: OrdenTrabajoService,
    private reportOrdenService: ReportOrdenService,
    private authService: AuthService,
    private periodoService: PeriodoService,
    private toastrAlert: ToastrAlertService,
    private alertService: AlertService,
    private solicitudService: SolicitudService,
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
      usoSuelo: this.fb.group({
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
    this.cargarFormularioOperativo();
  }

  // Carga el formulario dinámico propio de la orden (FORMULARIO_OPERATIVO_ID),
  // genera sus controles y, si se está editando, precarga los valores ya
  // guardados para la solicitud asociada.
  private cargarFormularioOperativo(): void {
    const { id } = this.authService.currentUser();
    this.solicitudService
      .getFormulario(FORMULARIO_OPERATIVO_ID, id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (formulario) => {
          this.camposOperativos = formulario.preguntas
            .filter((p) => p.estado !== false)
            .map((p) => this.toFieldConfigOperativo(p))
            .sort((a, b) => a.order - b.order);
          this.generateOperativoControls();
          this.applyOperativoDependencyLogic();
          this.loadingCamposOperativos = false;
          if (this.modoEdicion && this.editingRecord) {
            this.precargarValoresOperativos(this.editingRecord.solicitud_id);
          }
        },
        error: () => {
          this.loadingCamposOperativos = false;
          this.alertService.error('No se pudo cargar el formulario dinámico de la orden');
        },
      });
  }

  private toFieldConfigOperativo(pregunta: Pregunta): FieldConfig {
    return {
      id: pregunta.id,
      key: pregunta.nombre,
      label: pregunta.pregunta,
      order: pregunta.orden,
      controlType: this.resolveControlTypeOperativo(pregunta),
      section: 'operador',
      placeholder: typeof pregunta.ayuda === 'string' ? pregunta.ayuda : '',
      required: pregunta.obligatorio,
      readonly: pregunta.readonly,
      hidden: pregunta.hidden,
      maxLength: typeof pregunta.num_caracter === 'number' ? pregunta.num_caracter : null,
      options: pregunta.catalogos ?? [],
      employeeList: pregunta.listado_empleado ?? [],
      scheduleItems: pregunta.jornada_laboral_item ?? [],
      dependsOn: pregunta.atributo_id
        ? {
            fieldId: String(pregunta.atributo_id),
            triggerValue: String(pregunta.item_catalogo_id ?? ''),
          }
        : undefined,
      integrations: { sri: false, civil: false, iess: false },
      source: pregunta,
    };
  }

  private resolveControlTypeOperativo(pregunta: Pregunta): FieldConfig['controlType'] {
    if (pregunta.is_list_empleado) return 'employee-list';
    if (pregunta.tipo_respuesta === 'Selección Simple') return 'select';
    if (pregunta.tipo_respuesta === 'Selección Mutiple') return 'schedule';
    if (pregunta.is_text_area) return 'textarea';
    return 'text';
  }

  private generateOperativoControls(): void {
    for (const field of this.camposOperativos) {
      if (this.form.contains(field.key)) continue;
      this.form.addControl(
        field.key,
        this.fb.control(
          { value: '', disabled: field.hidden },
          this.buildOperativoValidators(field, field.hidden),
        ),
      );
    }
  }

  private buildOperativoValidators(field: FieldConfig, isHidden: boolean): ValidatorFn[] {
    if (isHidden) return [];
    const validators: ValidatorFn[] = [];
    if (field.required) validators.push(Validators.required);
    if (field.maxLength) validators.push(Validators.maxLength(field.maxLength));
    return validators;
  }

  private applyOperativoDependencyLogic(): void {
    this.updateOperativoDependentFields();
    this.form.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.updateOperativoDependentFields());
  }

  private updateOperativoDependentFields(): void {
    for (const field of this.camposOperativos) {
      if (!field.dependsOn) continue;
      const parentField = this.camposOperativos.find((c) => c.id === field.dependsOn?.fieldId);
      const parentValue = parentField ? this.form.get(parentField.key)?.value : null;
      const hidden = String(parentValue ?? '') !== field.dependsOn.triggerValue;
      field.hidden = hidden;
      const control = this.form.get(field.key);
      if (!control) continue;
      if (hidden) {
        control.disable({ emitEvent: false });
        control.reset('', { emitEvent: false });
      } else {
        control.enable({ emitEvent: false });
      }
      control.setValidators(this.buildOperativoValidators(field, hidden));
      control.updateValueAndValidity({ emitEvent: false });
    }
  }

  // Precarga los valores previamente guardados (ValorSolicitudItem) del
  // formulario operativo para la solicitud asociada a la orden en edición.
  private precargarValoresOperativos(solicitudId: string): void {
    this.reportSolicitudService
      .getValoresSolicitud(solicitudId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (valores: ReportValorSolicitud[]) => {
          const patch: Record<string, unknown> = {};
          for (const v of valores) {
            const key = v.atributo_formulario_nombre;
            if (!this.form.get(key)) continue;
            const catalogo = Number(v.valor_catalogo);
            patch[key] =
              catalogo && catalogo !== 0
                ? catalogo
                : (v.valor_texto ?? v.valor_numero ?? v.valor_fecha ?? '');
          }
          this.form.patchValue(patch);
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
    this.tipoEnsayoId = f.tabla_ensayos?.[0]?.id_ambiental ?? null;
    this.tipoEnsayoNombre = f.tabla_ensayos?.[0]?.ensayo_nombre ?? '';

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

    // cttipoEnsayoId sale del "ensayo_id" a nivel de GRUPO en tabla_ensayos
    // (ej. 2026), distinto del ensayo_id de cada fila en detalle_ensayo
    // (ej. 21/20/24) — el grupo representa el tipo de ensayo, no un ensayo puntual.
    const ensayosFiltrados = (f.tabla_ensayos ?? []).flatMap((t) =>
      (t.detalle_ensayo ?? []).map((e) => ({
        ...e,
        ctambientalId: t.id_ambiental,
        cttipoEnsayoId: t.ensayo_id,
      })),
    );

    this.ensayosArray.clear();
    for (const e of ensayosFiltrados) {
      const partes = (e.metodo ?? '').split(',');
      this.ensayosArray.push(
        this.fb.group({
          ensayoId: [e.id ?? ''],
          ensayoIdNumerico: [e.ensayo_id ?? null],
          ctambientalId: [e.ctambientalId ?? null],
          cttipoEnsayoId: [e.cttipoEnsayoId ?? null],
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
      cliente: { solicitadoPor: orden.usuario_nombre_completo },
      usoSuelo: {
        direccionPca: orden.direccion_pca ?? '',
        telefonoPca: orden.telefono_pca ?? '',
      },
    });

    // Si el formulario dinámico ya cargó sus campos (p. ej. el usuario venía
    // en modo creación y cambia a editar otro registro), precargamos los
    // valores ya guardados de una vez; si aún no cargó, cargarFormularioOperativo()
    // lo hará al terminar (ver ngOnInit / cargarFormularioOperativo).
    if (this.camposOperativos.length > 0) {
      this.precargarValoresOperativos(orden.solicitud_id);
    }

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

  // Persiste las respuestas del formulario dinámico operativo como
  // ValorSolicitudItem, igual que solicitud-trabajo.ts — no dependen de
  // columnas fijas en OrdenTrabajoPayload, por lo que el backend puede
  // agregar o quitar preguntas sin requerir cambios aquí.
  private async guardarValoresOperativos(solicitudId: string): Promise<void> {
    const raw = this.form.getRawValue();
    const valorSolicitud: ValorSolicitudItem[] = this.camposOperativos
      .filter((f) => !f.hidden)
      .map((f) => {
        const value = raw[f.key];
        const esSelect = f.controlType === 'select';
        return {
          solicitud_id: solicitudId,
          atributo_formulario_id: String(f.id),
          valor_texto: !esSelect ? (value ?? null) : null,
          valor_numero: null,
          valor_fecha: null,
          valor_booleano: null,
          valor_multiple: null,
          valor_catalogo: esSelect ? Number(value) || 0 : 0,
          valor_uuid: null,
        };
      });

    if (valorSolicitud.length === 0) return;
    const payload = { valorSolicitud };

    if (this.modoEdicion) {
      await firstValueFrom(this.solicitudService.actualizarValoresSolicitud(solicitudId, payload));
    } else {
      await firstValueFrom(this.solicitudService.guardarValoresSolicitud(payload));
    }
  }

  // Igual que guardarValoresOperativos, pero para el alta (POST
  // create-detalle): las respuestas del formulario dinámico operativo van
  // dentro del mismo payload como valorOrdenTrabajo, no en una llamada aparte.
  private buildValorOrdenTrabajo(raw: Record<string, any>): ValorOrdenTrabajoPayload[] {
    return this.camposOperativos
      .filter((f) => !f.hidden)
      .map((f) => {
        const value = raw[f.key];
        const esSelect = f.controlType === 'select';
        return {
          atributo_formulario_id: String(f.id),
          valor_texto: !esSelect ? (value ?? null) : null,
          valor_numero: null,
          valor_fecha: null,
          valor_booleano: null,
          valor_multiple: null,
          estado: true,
          valor_catalogo: esSelect ? Number(value) || 0 : 0,
          valor_uuid: null,
        };
      });
  }

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

    // Los campos del formulario dinámico son siempre visibles (su
    // obligatoriedad la define la API), sin importar el tipo de ensayo.
    this.camposOperativos.forEach((f) => this.form.get(f.key)?.markAsTouched());
    const dinamicosInvalidos = this.camposOperativos.some(
      (f) => !f.hidden && this.form.get(f.key)?.invalid,
    );
    if (dinamicosInvalidos) {
      this.toastrAlert.showWarning(
        'Complete todos los campos obligatorios antes de guardar.',
        'Requerido',
      );
      return;
    }

    // Dirección PCA solo aplica (y es obligatoria) para ensayos de Ruido.
    if (this.tipoEnsayoId === 91) {
      const usoSuelo = this.form.get('usoSuelo') as FormGroup;
      usoSuelo.markAllAsTouched();
      if (usoSuelo.get('direccionPca')?.invalid) {
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
          ctuso_suelo_id: null,
          ctcaracteristica_horaria_id: null,
          ctpunto_critico_id: null,
          direccion_pca: raw.usoSuelo.direccionPca || null,
          telefono_pca: raw.usoSuelo.telefonoPca || null,
          observacion: null,
          ctestado_id: this.editingRecord!.ctestado_id,
          estado: this.editingRecord!.estado,
          ctformulario_id: this.editingRecord!.ctformulario_id,
        };

        await firstValueFrom(
          this.ordenTrabajoService.actualizarOrden(this.editingRecord!.id, ordenPayload),
        );
        await this.guardarValoresOperativos(this.solicitudSeleccionada.id_solicitud);
        this.toastrAlert.showSuccess(
          'La orden de trabajo In Situ ha sido actualizada.',
          '¡Actualizado!',
        );
        this.guardado.emit();
        return;
      }

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

      // Dirección/Teléfono PCA (Ruido) quedan fuera del payload por ahora:
      // ya no tienen campo propio en ordenTrabajo y todavía no tenemos el
      // atributo_formulario_id para mandarlos como valorOrdenTrabajo.
      //TODO: Cambiar el entidad_id
      const payload: CrearOrdenTrabajoConDetallePayload = {
        ordenTrabajo: {
          solicitud_id: this.solicitudSeleccionada.id_solicitud,
          usuario_id: userId,
          entidad_id: 'F9687983-F6CF-4706-9004-A1B793E3A987',
          ctambiente_id: this.tipoEnsayoId,
          periodo_id: periodo.id,
          secuencial_id: null,
          num_secuencial: null,
          ctestado_id: 2,
          estado: true,
          ctformulario_id: this.solicitudSeleccionada.tipo_formulario_id,
        },
        ordenTrabajoDetalle: ensayosSeleccionados.map((e: any) => ({
          estado: true,
          ctambiental_id: e.ctambientalId,
          ensayo_id: e.ensayoIdNumerico,
          cttipo_ensayo_id: e.cttipoEnsayoId,
        })),
        valorOrdenTrabajo: this.buildValorOrdenTrabajo(raw),
      };

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
