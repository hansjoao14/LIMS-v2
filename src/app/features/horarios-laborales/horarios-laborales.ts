import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, FormsModule, ValidatorFn, Validators } from '@angular/forms';
import { Subject, takeUntil, firstValueFrom } from 'rxjs';
import Swal from 'sweetalert2';

import { SolicitudService, ValorSolicitudItem, SolicitudPayload } from '../../services/solicitudes/solicitud-trabajo/solicitud-trabajo.service';
import { FieldConfig, FormularioLaboratorio, Pregunta } from '../solicitud-trabajo/model/solicitud-trabajo.model';
import { AuthService } from '../auth/service/auth-service';
import { PeriodoService } from '../../services/solicitudes/solicitud-trabajo/periodo.service';
import { LoadingComponent } from '../../shared/components/loading/loading';

type VehiculoRecord = { id: string } & Record<string, unknown>;

@Component({
  selector: 'app-horarios-laborales',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, LoadingComponent],
  templateUrl: './horarios-laborales.html',
  styleUrls: ['./horarios-laborales.css'],
})
export class HorariosLaborales implements OnInit, OnDestroy {
  form: FormGroup;
  formulario: FormularioLaboratorio | null = null;
  fields: FieldConfig[] = [];
  loading = true;
  saving = false;
  solicitudes: VehiculoRecord[] = [];

  readonly STORAGE_KEY = 'lims_gestion_vehiculos';
  readonly COLOR_PRIMARIO = '#1d2b64';

  readonly DISPLAY_ORDER: Record<string, number> = {
    val_fecha_programacion: 1,
    val_num_ocupantes: 2,
    val_destino_direccion: 3,
    val_hora_salida: 4,
    val_hora_retorno: 5,
    val_vehiculo_id: 6,
    val_funcionario_id: 7,
    val_descripcion_actividad: 8,
    val_observaciones: 9,
  };

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
      case 'val_fecha_programacion': return this.getMinDate();
      case 'val_hora_salida': return '08:00';
      case 'val_hora_retorno': return this.form.get('val_hora_salida')?.value || '08:00';
      default: return null;
    }
  }

  getInputMax(field: FieldConfig): string | null {
    switch (field.key) {
      case 'val_fecha_programacion': return this.getMaxDate();
      case 'val_hora_salida':
      case 'val_hora_retorno': return '16:30';
      default: return null;
    }
  }

  getFieldError(key: string): string | null {
    const ctrl = this.form.get(key);
    if (!ctrl || !ctrl.invalid || (!ctrl.touched && !ctrl.dirty)) return null;
    if (ctrl.errors?.['required']) return 'Este campo es requerido.';
    if (ctrl.errors?.['weekend']) return 'Solo se permiten días de lunes a viernes.';
    if (ctrl.errors?.['fueraDeRango']) return 'Solo puede seleccionar días de la semana actual (hasta el viernes).';
    if (ctrl.errors?.['retornoAntesSalida']) return 'La hora de retorno no puede ser anterior a la de salida.';
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

    const retornoCtrl = this.form.get('val_hora_retorno');
    if (retornoCtrl) {
      retornoCtrl.addValidators(this.retornoAfterSalidaValidator());
      retornoCtrl.updateValueAndValidity({ emitEvent: false });
    }

    this.form.get('val_hora_salida')?.valueChanges
      .pipe(takeUntil(this.destroy$))
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

  private readonly destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private solicitudService: SolicitudService,
    private authService: AuthService,
    private periodoService: PeriodoService,
    private zone: NgZone,
  ) {
    this.form = this.fb.group({});
  }

  ngOnInit(): void {
    this.cargarDatos();
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
              .sort((a, b) => (this.DISPLAY_ORDER[a.key] ?? 99) - (this.DISPLAY_ORDER[b.key] ?? 99));
            this.generateControls();
            this.applyBusinessRules();
            this.applyDependencyLogic();
            this.loading = false;
          });
        },
        error: () => {
          this.zone.run(() => {
            this.loading = false;
            Swal.fire('Error', 'No se pudo cargar el formulario', 'error');
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
    const data = localStorage.getItem(this.STORAGE_KEY);
    if (data) {
      this.solicitudes = JSON.parse(data);
    }
  }

  async guardar(): Promise<void> {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      Swal.fire({
        title: 'Formulario Incompleto',
        text: 'Por favor, llene todos los campos requeridos para continuar.',
        icon: 'warning',
        confirmButtonColor: this.COLOR_PRIMARIO,
        confirmButtonText: 'Entendido',
      });
      return;
    }

    this.saving = true;
    const raw = this.form.getRawValue();
    const now = new Date();

    try {
      const ejercicio = await this.periodoService.getEjercicioByAnio(now.getFullYear());
      if (!ejercicio) throw new Error(`No hay ejercicio activo para el año ${now.getFullYear()}`);

      const periodo = await this.periodoService.getPeriodoByEjercicioAndMes(ejercicio.id, now.getMonth() + 1);
      if (!periodo) throw new Error(`No hay periodo activo para el mes ${now.getMonth() + 1}`);

      const { id: userId } = this.authService.currentUser();

      const solicitudPayload: SolicitudPayload = {
        formulario_id: this.formulario?.formulario_id ?? null,
        usuario_id: userId,
        entidad_id: userId,
        secuencial_id: null,
        ctestado_id: 2,
        periodo_id: periodo.id,
        descripcion: '',
        ejercicio_id: ejercicio.id,
      };

      const res = await firstValueFrom(this.solicitudService.registrarSolicitud(solicitudPayload));
      const solicitudId: string = res?.data?.id ?? res?.id ?? null;

      const valorSolicitud: ValorSolicitudItem[] = this.fields
        .filter((f) => !f.hidden)
        .map((f) => {
          const value = raw[f.key];
          const esSelect = f.controlType === 'select';
          const esEmployee = f.controlType === 'employee-list';
          return {
            solicitud_id: solicitudId,
            atributo_formulario_id: String(f.id),
            valor_texto: !esSelect && !esEmployee ? (value ?? null) : null,
            valor_numero: null,
            valor_fecha: null,
            valor_booleano: null,
            valor_multiple: null,
            valor_catalogo: esSelect ? Number(value) || 0 : 0,
            valor_uuid: esEmployee ? (value ?? '') : userId,
            estado: true,
          };
        });

      await firstValueFrom(this.solicitudService.guardarValoresSolicitud({ valorSolicitud }));

      this.zone.run(() => {
        this.saving = false;
        this.form.reset();
        Swal.fire({
          title: '¡Guardado!',
          text: 'El registro ha sido guardado correctamente.',
          icon: 'success',
          confirmButtonColor: this.COLOR_PRIMARIO,
          timer: 2500,
        });
      });
    } catch (err: any) {
      this.zone.run(() => {
        this.saving = false;
        const mensaje = err?.error?.message ?? err?.message ?? 'No se pudo guardar el registro';
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: mensaje,
          confirmButtonColor: this.COLOR_PRIMARIO,
        });
      });
    }
  }

  eliminar(id: string): void {
    Swal.fire({
      title: '¿Está seguro de eliminar?',
      text: 'Esta programación se quitará del cronograma y no se puede revertir.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: this.COLOR_PRIMARIO,
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.solicitudes = this.solicitudes.filter((s) => s.id !== id);
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.solicitudes));
        Swal.fire({
          title: 'Eliminado',
          text: 'La programación ha sido borrada.',
          icon: 'success',
          confirmButtonColor: this.COLOR_PRIMARIO,
          timer: 1500,
        });
      }
    });
  }

  getFieldValue(record: VehiculoRecord, key: string): unknown {
    return record[key] ?? '—';
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
