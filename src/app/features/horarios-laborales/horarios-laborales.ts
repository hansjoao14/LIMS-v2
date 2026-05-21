import { Component, NgZone, OnDestroy, OnInit, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  FormsModule,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Subject, takeUntil, firstValueFrom, forkJoin, finalize } from 'rxjs';
import Swal from 'sweetalert2';
import { AppRole, MenuKey, hasPermission } from '../../core/utils/roles.constans';
import { ToastrAlertService } from '../../services/toastr.service';

import {
  SolicitudService,
  ValorSolicitudItem,
  SolicitudPayload,
} from '../../services/solicitudes/solicitud-trabajo/solicitud-trabajo.service';
import { ReportSolicitudService } from '../../services/solicitudes/lista-solicitudes/report-solicitud.service';
import { ReportSolicitud, ReportValorSolicitud } from '../../interfaces/solicitudes/lista-solicitudes/report-solicitud.interface';
import {
  FieldConfig,
  FormularioLaboratorio,
  Pregunta,
} from '../solicitud-trabajo/model/solicitud-trabajo.model';
import { AuthService } from '../auth/service/auth-service';
import { PeriodoService } from '../../services/solicitudes/solicitud-trabajo/periodo.service';
import { LoadingComponent } from '../../shared/components/loading/loading';
import { PaginationComponent } from '../../shared/components/pagination/pagination';
import { PaginationMeta } from '../../interfaces/catalogos/catalogo.interface';

const ESTADO_AUTORIZADO = 387;
const ESTADO_RECHAZADO  = 51;

type VehiculoRecord = { id: string } & Record<string, unknown>;

@Component({
  selector: 'app-horarios-laborales',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, LoadingComponent, PaginationComponent],
  templateUrl: './horarios-laborales.html',
  styleUrls: ['./horarios-laborales.css'],
})
export class HorariosLaborales implements OnInit, OnDestroy {
  form: FormGroup;
  formulario: FormularioLaboratorio | null = null;
  fields: FieldConfig[] = [];
  loading = true;
  saving = false;
  procesandoId: string | null = null;
  editingRecord: VehiculoRecord | null = null;
  private todasSolicitudes: VehiculoRecord[] = [];
  solicitudes: VehiculoRecord[] = [];
  metaTabla: PaginationMeta | null = null;
  currentPage = 1;
  loadingTabla = false;
  readonly PAGE_SIZE = 10;

  private userAppRole = computed<AppRole | null>(() => {
    const roles = this.authService.userProfile()?.roles ?? [];
    return (Object.values(AppRole) as AppRole[]).find((r) => roles.includes(r)) ?? null;
  });

  canCreate = computed(() => {
    const role = this.userAppRole();
    return role ? hasPermission(MenuKey.HORARIOS_LABORALES, role, 'crear') : false;
  });

  canEdit = computed(() => {
    const role = this.userAppRole();
    return role ? hasPermission(MenuKey.HORARIOS_LABORALES, role, 'editar') : false;
  });

  canDelete = computed(() => {
    const role = this.userAppRole();
    return role ? hasPermission(MenuKey.HORARIOS_LABORALES, role, 'eliminar') : false;
  });

  canAutorizar = computed(() => {
    const role = this.userAppRole();
    return role ? hasPermission(MenuKey.HORARIOS_LABORALES, role, 'autorizar') : false;
  });

  canRechazar = computed(() => {
    const role = this.userAppRole();
    return role ? hasPermission(MenuKey.HORARIOS_LABORALES, role, 'rechazar') : false;
  });

  get hasAnyAction(): boolean {
    return this.canEdit() || this.canDelete() || this.canAutorizar() || this.canRechazar();
  }

  readonly STORAGE_KEY = 'lims_gestion_vehiculos';

  readonly FIELD_SPAN: Record<string, number> = {
    val_funcionario_id: 2,
    val_observaciones: 2,
  };

  getFieldSpanClass(key: string): string {
    const span = this.FIELD_SPAN[key] ?? 1;
    if (span === 2) return 'sm:col-span-2 md:col-span-2';
    return '';
  }

  // --- Restricciones de fecha y hora ---

  private getMinDate(): string {
    return new Date().toISOString().split('T')[0];
  }

  private getMaxDate(): string {
    const date = new Date();
    let businessDays = 0;
    while (businessDays < 10) {
      date.setDate(date.getDate() + 1);
      const day = date.getDay();
      if (day !== 0 && day !== 6) businessDays++;
    }
    return date.toISOString().split('T')[0];
  }

  getInputMin(field: FieldConfig): string | null {
    switch (field.key) {
      case 'val_fecha_programacion':
        return this.getMinDate();
      case 'val_hora_salida':
        return '08:00';
      case 'val_hora_retorno':
        return this.form.get('val_hora_salida')?.value || '08:00';
      default:
        return null;
    }
  }

  getInputMax(field: FieldConfig): string | null {
    switch (field.key) {
      case 'val_fecha_programacion':
        return this.getMaxDate();
      case 'val_hora_salida':
      case 'val_hora_retorno':
        return '16:30';
      default:
        return null;
    }
  }

  getFieldError(key: string): string | null {
    const ctrl = this.form.get(key);
    if (!ctrl || !ctrl.invalid || (!ctrl.touched && !ctrl.dirty)) return null;
    if (ctrl.errors?.['required']) return 'Este campo es requerido.';
    if (ctrl.errors?.['weekend']) return 'Solo se permiten días de lunes a viernes.';
    if (ctrl.errors?.['fueraDeRango'])
      return 'Solo puede seleccionar días de la semana actual (hasta el viernes).';
    if (ctrl.errors?.['retornoAntesSalida'])
      return 'La hora de retorno no puede ser anterior a la de salida.';
    if (ctrl.errors?.['max']) return `Máximo hasta las 16:30.`;
    if (ctrl.errors?.['min']) return `Mínimo desde las 08:00.`;
    return null;
  }

  private applyBusinessRules(): void {
    const fechaCtrl = this.form.get('val_fecha_programacion');
    if (fechaCtrl) {
      fechaCtrl.addValidators(this.weekdayValidator());
      fechaCtrl.updateValueAndValidity({ emitEvent: false });
    }

    const salidaCtrl = this.form.get('val_hora_salida');
    if (salidaCtrl) {
      salidaCtrl.addValidators(this.timeRangeValidator('08:00', '16:30'));
      salidaCtrl.updateValueAndValidity({ emitEvent: false });
    }

    const retornoCtrl = this.form.get('val_hora_retorno');
    if (retornoCtrl) {
      retornoCtrl.addValidators(this.retornoAfterSalidaValidator());
      retornoCtrl.addValidators(this.timeRangeValidator('08:00', '16:30'));
      retornoCtrl.updateValueAndValidity({ emitEvent: false });
    }

    this.form
      .get('val_hora_salida')
      ?.valueChanges.pipe(takeUntil(this.destroy$))
      .subscribe(() => retornoCtrl?.updateValueAndValidity({ emitEvent: false }));
  }

  private weekdayValidator(): ValidatorFn {
    return (control) => {
      if (!control.value) return null;
      const date = new Date(control.value + 'T12:00:00');
      const day = date.getDay();
      if (day === 0 || day === 6) return { weekend: true };
      const min = new Date(this.getMinDate() + 'T12:00:00');
      const max = new Date(this.getMaxDate() + 'T12:00:00');
      if (date < min || date > max) return { fueraDeRango: true };
      return null;
    };
  }

  private retornoAfterSalidaValidator(): ValidatorFn {
    return (control) => {
      const salida = this.form?.get('val_hora_salida')?.value;
      if (!salida || !control.value) return null;
      return control.value < salida ? { retornoAntesSalida: true } : null;
    };
  }

  private timeRangeValidator(min: string, max: string): ValidatorFn {
    return (control) => {
      if (!control.value) return null;
      if (control.value < min) return { min: true };
      if (control.value > max) return { max: true };
      return null;
    };
  }

  private readonly destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private solicitudService: SolicitudService,
    private reportSolicitudService: ReportSolicitudService,
    private authService: AuthService,
    private periodoService: PeriodoService,
    private zone: NgZone,
    private toastrAlert: ToastrAlertService,
  ) {
    this.form = this.fb.group({});
  }

  ngOnInit(): void {
    this.cargarFormularioDinamico();
  }

  private cargarFormularioDinamico(): void {
    const { id } = this.authService.currentUser();
    this.solicitudService
      .getFormulario('1002', id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (formulario) => {
          this.zone.run(() => {
            this.formulario = formulario;
            this.fields = formulario.preguntas
              .filter((p) => p.estado !== false)
              .map((p) => this.toFieldConfig(p))
              .sort((a, b) => a.order - b.order);
            this.generateControls();
            this.applyBusinessRules();
            this.applyDependencyLogic();
            this.loading = false;
            this.cargarDatos();
          });
        },
        error: () => {
          this.zone.run(() => {
            this.loading = false;
            this.toastrAlert.showError('No se pudo cargar el formulario', 'Error');
          });
        },
      });
  }

  private toFieldConfig(pregunta: Pregunta): FieldConfig {
    return {
      id: pregunta.id,
      key: pregunta.nombre,
      label: pregunta.pregunta,
      order: pregunta.orden,
      controlType: this.resolveControlType(pregunta),
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
      integrations: {
        sri: pregunta.is_ws_sri,
        civil: pregunta.is_ws_civil,
        iess: pregunta.is_ws_iess ?? false,
      },
      source: pregunta,
    };
  }

  private resolveControlType(pregunta: Pregunta): FieldConfig['controlType'] {
    if (pregunta.is_list_empleado) return 'employee-list';
    if (pregunta.tipo_respuesta === 'Selección Simple') return 'select';
    if (pregunta.nombre === 'val_observaciones') return 'textarea';
    if (pregunta.is_text_area && pregunta.nombre !== 'val_descripcion_actividad') return 'textarea';
    return 'text';
  }

  getInputType(field: FieldConfig): string {
    if (field.key === 'val_hora_salida' || field.key === 'val_hora_retorno') return 'time';
    const tipo = field.source.tipo_respuesta;
    if (tipo === 'Fecha') return 'date';
    if (tipo === 'Numerico') return 'number';
    return 'text';
  }

  private generateControls(): void {
    for (const field of this.fields) {
      if (this.form.contains(field.key)) continue;
      const validators: ValidatorFn[] = [];
      if (field.required && !field.hidden) validators.push(Validators.required);
      if (field.maxLength) validators.push(Validators.maxLength(field.maxLength));
      this.form.addControl(
        field.key,
        this.fb.control({ value: '', disabled: field.hidden }, validators),
      );
    }
  }

  private applyDependencyLogic(): void {
    this.updateDependentFields();
    this.form.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.updateDependentFields());
  }

  private updateDependentFields(): void {
    for (const field of this.fields) {
      if (!field.dependsOn) continue;
      const parentField = this.fields.find((c) => c.id === field.dependsOn?.fieldId);
      const parentValue = parentField ? this.form.get(parentField.key)?.value : null;
      const hide = String(parentValue ?? '') !== field.dependsOn.triggerValue;
      field.hidden = hide;
      const control = this.form.get(field.key);
      if (!control) continue;
      if (hide) {
        control.disable({ emitEvent: false });
        control.reset('', { emitEvent: false });
      } else {
        control.enable({ emitEvent: false });
      }
    }
  }

  get visibleFields(): FieldConfig[] {
    return this.fields.filter((f) => !f.hidden);
  }

  get regularFields(): FieldConfig[] {
    return this.visibleFields.filter((f) => f.controlType !== 'textarea');
  }

  get textareaFields(): FieldConfig[] {
    return this.visibleFields.filter((f) => f.controlType === 'textarea');
  }

  esCampoInvalido(key: string): boolean {
    const c = this.form.get(key);
    return !!c && c.invalid && (c.touched || c.dirty);
  }

  cargarDatos(): void {
    if (!this.formulario?.formulario_id) return;
    this.loadingTabla = true;
    forkJoin([
      this.reportSolicitudService.getValoresByTipoFormulario(1002),
      this.reportSolicitudService.getSolicitudesByFormulario(this.formulario.formulario_id),
    ])
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: ([valores, solicitudes]) => {
          this.zone.run(() => {
            const estadoMap = new Map(solicitudes.map((s) => [s.id_solicitud, s]));
            const records = this.agruparPorSolicitud(valores);
            for (const r of records) {
              const s = estadoMap.get(r.id);
              if (s) {
                r['ctestado_id']      = s.ctestado_id;
                r['estado_solicitud'] = s.estado_solicitud;
                r['_solicitud']       = s;
              }
            }
            this.todasSolicitudes = records;
            this.irAPagina(1);
            this.loadingTabla = false;
          });
        },
        error: () => {
          this.zone.run(() => {
            this.loadingTabla = false;
            this.toastrAlert.showError('No se pudo cargar el cronograma.', 'Error');
          });
        },
      });
  }

  irAPagina(page: number): void {
    this.currentPage = page;
    const start = (page - 1) * this.PAGE_SIZE;
    this.solicitudes = this.todasSolicitudes.slice(start, start + this.PAGE_SIZE);
    const total = this.todasSolicitudes.length;
    const totalPages = Math.ceil(total / this.PAGE_SIZE);
    this.metaTabla = {
      page,
      total,
      totalPages,
      limit: this.PAGE_SIZE,
      skip: start,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1,
      nextPage: page < totalPages ? page + 1 : null,
      prevPage: page > 1 ? page - 1 : null,
    };
  }

  private agruparPorSolicitud(items: ReportValorSolicitud[]): VehiculoRecord[] {
    const grouped = new Map<string, VehiculoRecord>();
    for (const item of items) {
      if (!grouped.has(item.id_solicitud)) {
        grouped.set(item.id_solicitud, {
          id: item.id_solicitud,
          nombres_completos: item.nombres_completos,
          fecha_creacion: item.fecha_creacion,
        });
      }
      const record = grouped.get(item.id_solicitud)!;
      const esSeleccion = item.ctipo_dato_nombre === 'Selección Simple';
      const valor =
        (esSeleccion && item.valor_catalogo != null ? Number(item.valor_catalogo) || null : null) ??
        item.valor_texto ??
        item.valor_fecha ??
        (item.valor_numero != null ? String(item.valor_numero) : null) ??
        (item.valor_booleano != null ? String(item.valor_booleano) : null) ??
        '—';
      record[item.atributo_formulario_nombre] = valor;
    }
    return Array.from(grouped.values());
  }

  async guardar(): Promise<void> {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.toastrAlert.showWarning(
        'Por favor, llene todos los campos requeridos para continuar.',
        'Formulario Incompleto',
      );
      return;
    }

    this.saving = true;
    const raw = this.form.getRawValue();

    if (this.editingRecord) {
      await this.actualizarRegistro(raw);
      return;
    }

    const now = new Date();

    try {
      const ejercicio = await this.periodoService.getEjercicioByAnio(now.getFullYear());
      if (!ejercicio) throw new Error(`No hay ejercicio activo para el año ${now.getFullYear()}`);

      const periodo = await this.periodoService.getPeriodoByEjercicioAndMes(
        ejercicio.id,
        now.getMonth() + 1,
      );
      if (!periodo) throw new Error(`No hay periodo activo para el mes ${now.getMonth() + 1}`);

      const { id: userId } = this.authService.currentUser();

      //TODO: Cambiar el entidad_id
      const solicitudPayload: SolicitudPayload = {
        formulario_id: this.formulario?.formulario_id ?? null,
        usuario_id: userId,
        entidad_id: 'F9687983-F6CF-4706-9004-A1B793E3A987',
        secuencial_id: null,
        ctestado_id: 388,
        periodo_id: periodo.id,
        descripcion: '',
        ejercicio_id: ejercicio.id,
        tecnico_id: raw.tecnico_id,
      };

      const res = await firstValueFrom(this.solicitudService.registrarSolicitud(solicitudPayload));
      const solicitudId: string = res?.data?.id ?? res?.id ?? null;

      const valorSolicitud: ValorSolicitudItem[] = this.fields
        .filter((f) => !f.hidden)
        .map((f) => {
          const value = raw[f.key];
          const esSelect   = f.controlType === 'select';
          const esEmployee = f.controlType === 'employee-list';
          return {
            solicitud_id: solicitudId,
            atributo_formulario_id: String(f.id),
            valor_texto: esEmployee
              ? ((value as string) ?? '')
              : (!esSelect && value != null && value !== '' ? String(value) : null),
            valor_numero: null,
            valor_fecha: null,
            valor_booleano: null,
            valor_multiple: null,
            valor_catalogo: esSelect ? Number(value) || 0 : 0,
            valor_uuid: esEmployee ? ((value as string) ?? '') : userId,
            estado: true,
          };
        });

      await firstValueFrom(this.solicitudService.guardarValoresSolicitud({ valorSolicitud }));

      this.zone.run(() => {
        this.saving = false;
        this.form.reset();
        this.toastrAlert.showSuccess('El registro ha sido guardado correctamente.', '¡Guardado!');
        this.cargarDatos();
      });
    } catch (err: any) {
      this.zone.run(() => {
        this.saving = false;
        const mensaje = err?.error?.message ?? err?.message ?? 'No se pudo guardar el registro';
        this.toastrAlert.showError(mensaje, 'Error');
      });
    }
  }

  private async actualizarRegistro(raw: Record<string, unknown>): Promise<void> {
    const { id: userId } = this.authService.currentUser();
    const valorSolicitud: ValorSolicitudItem[] = this.fields
      .filter((f) => !f.hidden)
      .map((f) => {
        const value = raw[f.key];
        const esSelect   = f.controlType === 'select';
        const esEmployee = f.controlType === 'employee-list';
        return {
          solicitud_id: this.editingRecord!.id,
          atributo_formulario_id: String(f.id),
          valor_texto: esEmployee
            ? ((value as string) ?? '')
            : (!esSelect && value != null && value !== '' ? String(value) : null),
          valor_numero: null,
          valor_fecha: null,
          valor_booleano: null,
          valor_multiple: null,
          valor_catalogo: esSelect ? Number(value) || 0 : 0,
          valor_uuid: esEmployee ? ((value as string) ?? '') : userId,
          estado: true,
        };
      });

    try {
      await firstValueFrom(
        this.solicitudService.actualizarValoresSolicitud(this.editingRecord!.id, { valorSolicitud }),
      );
      this.zone.run(() => {
        this.saving = false;
        this.editingRecord = null;
        this.form.reset();
        this.toastrAlert.showSuccess('Registro actualizado correctamente.', '¡Actualizado!');
        this.cargarDatos();
      });
    } catch (err: any) {
      this.zone.run(() => {
        this.saving = false;
        const mensaje = err?.error?.message ?? err?.message ?? 'No se pudo actualizar el registro';
        this.toastrAlert.showError(mensaje, 'Error');
      });
    }
  }

  cargarParaEditar(record: VehiculoRecord): void {
    this.editingRecord = record;
    const patch: Record<string, unknown> = {};
    for (const field of this.fields) {
      const val = record[field.key];
      if (val !== undefined && val !== '—') patch[field.key] = val;
    }
    this.form.patchValue(patch);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  cancelarEdicion(): void {
    this.editingRecord = null;
    this.form.reset();
  }

  async eliminarRegistro(record: VehiculoRecord): Promise<void> {
    const confirm = await Swal.fire({
      icon: 'warning',
      title: '¿Eliminar registro?',
      text: 'Esta acción no se puede deshacer.',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    });

    if (!confirm.isConfirmed) return;

    try {
      await firstValueFrom(this.reportSolicitudService.eliminarVehiculo(record.id));
      this.zone.run(() => {
        this.toastrAlert.showSuccess('Registro eliminado correctamente.', '¡Eliminado!');
        this.cargarDatos();
      });
    } catch {
      this.zone.run(() =>
        this.toastrAlert.showError('No se pudo eliminar el registro.', 'Error'),
      );
    }
  }

  async autorizarRegistro(record: VehiculoRecord): Promise<void> {
    const sol = record['_solicitud'] as ReportSolicitud | undefined;
    if (!sol) return;

    const confirm = await Swal.fire({
      icon: 'question',
      title: '¿Autorizar programación?',
      text: 'Se aprobará la solicitud de vehículo seleccionada.',
      showCancelButton: true,
      confirmButtonColor: '#16a34a',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Sí, autorizar',
      cancelButtonText: 'Cancelar',
    });

    if (!confirm.isConfirmed) return;

    this.procesandoId = record.id;
    this.solicitudService
      .actualizarSolicitud(sol.id_solicitud, {
        ctestado_id:  ESTADO_AUTORIZADO,
        formulario_id: sol.formulario_id,
        usuario_id:    sol.usuario_id,
        entidad_id:    sol.establecimiento_id,
        secuencial_id: sol.secuencial_id,
        periodo_id:    sol.periodo_id,
        descripcion:   sol.descripcion_solicitud,
        estado:        sol.estado_logico_solicitud,
        num_secuencial: sol.num_secuencial,
      })
      .pipe(takeUntil(this.destroy$), finalize(() => { this.procesandoId = null; }))
      .subscribe({
        next: () => {
          this.zone.run(() => {
            this.toastrAlert.showSuccess('Programación autorizada correctamente.', '¡Autorizado!');
            this.cargarDatos();
          });
        },
        error: () => {
          this.zone.run(() => this.toastrAlert.showError('No se pudo autorizar el registro.', 'Error'));
        },
      });
  }

  async rechazarRegistro(record: VehiculoRecord): Promise<void> {
    const sol = record['_solicitud'] as ReportSolicitud | undefined;
    if (!sol) return;

    const { isConfirmed } = await Swal.fire({
      icon: 'warning',
      title: 'Rechazar programación',
      text: `Se rechazará la solicitud ${sol.num_secuencial ?? sol.id_solicitud}.`,
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Sí, rechazar',
      cancelButtonText: 'Cancelar',
    });

    if (!isConfirmed) return;

    this.procesandoId = record.id;
    this.solicitudService
      .actualizarSolicitud(sol.id_solicitud, {
        ctestado_id:  ESTADO_RECHAZADO,
        formulario_id: sol.formulario_id,
        usuario_id:    sol.usuario_id,
        entidad_id:    sol.establecimiento_id,
        secuencial_id: sol.secuencial_id,
        periodo_id:    sol.periodo_id,
        descripcion:   sol.descripcion_solicitud,
        estado:        sol.estado_logico_solicitud,
        num_secuencial: sol.num_secuencial,
      })
      .pipe(takeUntil(this.destroy$), finalize(() => { this.procesandoId = null; }))
      .subscribe({
        next: () => {
          this.zone.run(() => {
            this.toastrAlert.showWarning('Programación rechazada.', 'Rechazado');
            this.cargarDatos();
          });
        },
        error: () => {
          this.zone.run(() => this.toastrAlert.showError('No se pudo rechazar el registro.', 'Error'));
        },
      });
  }

  private parseFecha(fecha: string): Date | null {
    if (!fecha || fecha === '—') return null;
    const iso = new Date(fecha.includes('T') ? fecha : fecha + 'T12:00:00');
    if (!isNaN(iso.getTime())) return iso;
    const parts = fecha.split('/');
    if (parts.length === 3) {
      const [d, m, y] = parts;
      return new Date(`${y}-${m.padStart(2, '0')}-${d.padStart(2, '0')}T12:00:00`);
    }
    return null;
  }

  get solicitudesAgrupadas(): Array<{ groupKey: string; diaLabel: string; items: VehiculoRecord[] }> {
    const DIAS  = ['DOMINGO', 'LUNES', 'MARTES', 'MIÉRCOLES', 'JUEVES', 'VIERNES', 'SÁBADO'];
    const MESES = ['ENERO', 'FEBRERO', 'MARZO', 'ABRIL', 'MAYO', 'JUNIO',
                   'JULIO', 'AGOSTO', 'SEPTIEMBRE', 'OCTUBRE', 'NOVIEMBRE', 'DICIEMBRE'];

    let flatIdx = 0;
    const groups = new Map<string, { diaLabel: string; sortKey: number; items: VehiculoRecord[] }>();

    for (const sol of this.solicitudes) {
      const fechaStr = String(sol['val_fecha_programacion'] ?? '—');
      const d = this.parseFecha(fechaStr);

      const groupKey  = d ? fechaStr : '—';
      const sortKey   = d ? d.getTime() : 0;
      const diaLabel  = d
        ? `${d.getDay() === 0 || d.getDay() === 6 ? 'FIN DE SEMANA' : DIAS[d.getDay()]}  ·  ${d.getDate()} DE ${MESES[d.getMonth()]} ${d.getFullYear()}`
        : 'SIN FECHA';

      if (!groups.has(groupKey)) {
        groups.set(groupKey, { diaLabel, sortKey, items: [] });
      }
      groups.get(groupKey)!.items.push({ ...sol, _flatIdx: flatIdx++ });
    }

    return Array.from(groups.entries())
      .sort(([, a], [, b]) => a.sortKey - b.sortKey)
      .map(([groupKey, { diaLabel, items }]) => ({ groupKey, diaLabel, items }));
  }

  getFieldValue(record: VehiculoRecord, key: string): unknown {
    return record[key] ?? '—';
  }

  getEmployeeName(fieldKey: string, value: unknown): string {
    if (!value || value === '—') return '—';
    const field = this.fields.find(f => f.key === fieldKey);
    if (!field?.employeeList?.length) return String(value);
    const uuid = String(value).toLowerCase();
    const emp = field.employeeList.find(e => e.empleado_id.toLowerCase() === uuid);
    return emp?.nombre_empleado ?? String(value);
  }

  getFechaCreacion(record: VehiculoRecord): string {
    const raw = record['fecha_creacion'];
    if (!raw) return '—';
    const d = new Date(raw as string);
    if (isNaN(d.getTime())) return String(raw);
    return d.toLocaleDateString('es-EC', { day: '2-digit', month: '2-digit', year: 'numeric' });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
