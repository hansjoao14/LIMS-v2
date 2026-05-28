import {
  Component, EventEmitter, Input, NgZone, OnChanges, OnDestroy, OnInit,
  Output, SimpleChanges, computed,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder, FormGroup, ReactiveFormsModule, FormsModule, ValidatorFn, Validators,
} from '@angular/forms';
import { Subject, takeUntil, firstValueFrom } from 'rxjs';
import { AppRole, MenuKey, hasPermission } from '../../../core/utils/roles.constans';
import { ToastrAlertService } from '../../../services/toastr.service';
import {
  SolicitudService, ValorSolicitudItem, SolicitudPayload,
} from '../../../services/solicitudes/solicitud-trabajo/solicitud-trabajo.service';
import {
  FieldConfig, FormularioLaboratorio, Pregunta,
} from '../../solicitud-trabajo/model/solicitud-trabajo.model';
import { AuthService } from '../../auth/service/auth-service';
import { PeriodoService } from '../../../services/solicitudes/solicitud-trabajo/periodo.service';
import { LoadingComponent } from '../../../shared/components/loading/loading';

type ContraloriaRecord = { id: string } & Record<string, unknown>;

export interface FormularioReadyEvent {
  nombre: string;
  fields: FieldConfig[];
  formularioId: number;
}

@Component({
  selector: 'app-por-contraloria-formulario',
  imports: [CommonModule, ReactiveFormsModule, FormsModule, LoadingComponent],
  templateUrl: './por-contraloria-formulario.html',
})
export class PorContraloriaFormulario implements OnInit, OnChanges, OnDestroy {
  @Input() editingRecord: ContraloriaRecord | null = null;
  @Output() guardado        = new EventEmitter<void>();
  @Output() cancelado       = new EventEmitter<void>();
  @Output() formularioReady = new EventEmitter<FormularioReadyEvent>();

  form: FormGroup;
  formulario: FormularioLaboratorio | null = null;
  fields: FieldConfig[] = [];
  loading = true;
  saving = false;

  private userAppRole = computed<AppRole | null>(() => {
    const roles = this.authService.userProfile()?.roles ?? [];
    return (Object.values(AppRole) as AppRole[]).find(r => roles.includes(r)) ?? null;
  });

  canCreate = computed(() => {
    const role = this.userAppRole();
    return role ? hasPermission(MenuKey.POR_CONTRALORIA, role, 'crear') : false;
  });

  readonly FIELD_SPAN: Record<string, number> = {
    val_funcionario_id:      2,
    val_motivo_movilizacion: 2,
  };

  getFieldSpanClass(key: string): string {
    return (this.FIELD_SPAN[key] ?? 1) === 2 ? 'sm:col-span-2 md:col-span-2' : '';
  }

  getFieldError(key: string): string | null {
    const ctrl = this.form.get(key);
    if (!ctrl || !ctrl.invalid || (!ctrl.touched && !ctrl.dirty)) return null;
    if (ctrl.errors?.['required']) return 'Este campo es requerido.';
    return null;
  }

  getInputType(field: FieldConfig): string {
    if (field.key === 'val_hora_salida' || field.key === 'val_hora_retorno') return 'time';
    const tipo = field.source.tipo_respuesta;
    if (tipo === 'Fecha')    return 'date';
    if (tipo === 'Numerico') return 'number';
    return 'text';
  }

  get visibleFields(): FieldConfig[] { return this.fields.filter(f => !f.hidden); }
  get regularFields(): FieldConfig[]  { return this.visibleFields.filter(f => f.controlType !== 'textarea'); }
  get textareaFields(): FieldConfig[] { return this.visibleFields.filter(f => f.controlType === 'textarea'); }

  esCampoInvalido(key: string): boolean {
    const c = this.form.get(key);
    return !!c && c.invalid && (c.touched || c.dirty);
  }

  private readonly destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private solicitudService: SolicitudService,
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

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['editingRecord'] && !this.loading) {
      const record = changes['editingRecord'].currentValue as ContraloriaRecord | null;
      if (record) { this.patchForm(record); } else { this.form.reset(); }
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private cargarFormularioDinamico(): void {
    const { id } = this.authService.currentUser();
    this.solicitudService
      .getFormulario('1003', id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (formulario) => {
          this.zone.run(() => {
            this.formulario = formulario;
            this.fields = formulario.preguntas
              .filter(p => p.estado !== false)
              .map(p => this.toFieldConfig(p))
              .sort((a, b) => a.order - b.order);
            this.generateControls();
            this.applyDependencyLogic();
            this.loading = false;
            this.formularioReady.emit({
              nombre:       formulario.formulario_nombre,
              fields:       this.fields,
              formularioId: formulario.formulario_id,
            });
            if (this.editingRecord) { this.patchForm(this.editingRecord); }
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
      id:           pregunta.id,
      key:          pregunta.nombre,
      label:        pregunta.pregunta,
      order:        pregunta.orden,
      controlType:  this.resolveControlType(pregunta),
      section:      'operador',
      placeholder:  typeof pregunta.ayuda === 'string' ? pregunta.ayuda : '',
      required:     pregunta.obligatorio,
      readonly:     pregunta.readonly,
      hidden:       pregunta.hidden,
      maxLength:    typeof pregunta.num_caracter === 'number' ? pregunta.num_caracter : null,
      options:      pregunta.catalogos ?? [],
      employeeList: pregunta.listado_empleado ?? [],
      scheduleItems:pregunta.jornada_laboral_item ?? [],
      dependsOn: pregunta.atributo_id
        ? { fieldId: String(pregunta.atributo_id), triggerValue: String(pregunta.item_catalogo_id ?? '') }
        : undefined,
      integrations: { sri: pregunta.is_ws_sri, civil: pregunta.is_ws_civil, iess: pregunta.is_ws_iess ?? false },
      source: pregunta,
    };
  }

  private resolveControlType(pregunta: Pregunta): FieldConfig['controlType'] {
    if (pregunta.is_list_empleado)                      return 'employee-list';
    if (pregunta.tipo_respuesta === 'Selección Simple') return 'select';
    if (pregunta.is_text_area)                          return 'textarea';
    return 'text';
  }

  private generateControls(): void {
    for (const field of this.fields) {
      if (this.form.contains(field.key)) continue;
      const validators: ValidatorFn[] = [];
      if (field.required && !field.hidden) validators.push(Validators.required);
      if (field.maxLength) validators.push(Validators.maxLength(field.maxLength));
      this.form.addControl(field.key, this.fb.control({ value: '', disabled: field.hidden }, validators));
    }
  }

  private applyDependencyLogic(): void {
    this.updateDependentFields();
    this.form.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(() => this.updateDependentFields());
  }

  private updateDependentFields(): void {
    for (const field of this.fields) {
      if (!field.dependsOn) continue;
      const parentField = this.fields.find(c => c.id === field.dependsOn?.fieldId);
      const parentValue = parentField ? this.form.get(parentField.key)?.value : null;
      const hide = String(parentValue ?? '') !== field.dependsOn.triggerValue;
      field.hidden = hide;
      const control = this.form.get(field.key);
      if (!control) continue;
      if (hide) { control.disable({ emitEvent: false }); control.reset('', { emitEvent: false }); }
      else      { control.enable({ emitEvent: false }); }
    }
  }

  private patchForm(record: ContraloriaRecord): void {
    const patch: Record<string, unknown> = {};
    for (const field of this.fields) {
      const val = record[field.key];
      if (val !== undefined && val !== '—') patch[field.key] = val;
    }
    this.form.patchValue(patch);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  cancelarEdicion(): void {
    this.form.reset();
    this.cancelado.emit();
  }

  async guardar(): Promise<void> {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.toastrAlert.showWarning('Por favor, llene todos los campos requeridos para continuar.', 'Formulario Incompleto');
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

      const periodo = await this.periodoService.getPeriodoByEjercicioAndMes(ejercicio.id, now.getMonth() + 1);
      if (!periodo) throw new Error(`No hay periodo activo para el mes ${now.getMonth() + 1}`);

      const { id: userId } = this.authService.currentUser();

      //TODO: Cambiar el entidad_id
      const solicitudPayload: SolicitudPayload = {
        formulario_id: this.formulario?.formulario_id ?? null,
        usuario_id:    userId,
        entidad_id:    'F9687983-F6CF-4706-9004-A1B793E3A987',
        secuencial_id: null,
        ctestado_id:   388,
        periodo_id:    periodo.id,
        descripcion:   '',
        ejercicio_id:  ejercicio.id,
        tecnico_id:    raw.tecnico_id,
      };

      const res = await firstValueFrom(this.solicitudService.registrarSolicitud(solicitudPayload));
      const solicitudId: string = res?.data?.id ?? res?.id ?? null;

      const valorSolicitud: ValorSolicitudItem[] = this.fields
        .filter(f => !f.hidden)
        .map(f => {
          const value      = raw[f.key];
          const esSelect   = f.controlType === 'select';
          const esEmployee = f.controlType === 'employee-list';
          return {
            solicitud_id:           solicitudId,
            atributo_formulario_id: String(f.id),
            valor_texto:  esEmployee ? ((value as string) ?? '') : (!esSelect && value != null && value !== '' ? String(value) : null),
            valor_numero: null, valor_fecha: null, valor_booleano: null, valor_multiple: null,
            valor_catalogo: esSelect ? Number(value) || 0 : 0,
            valor_uuid:  esEmployee ? ((value as string) ?? '') : null,
            estado: true,
          };
        });

      await firstValueFrom(this.solicitudService.guardarValoresSolicitud({ valorSolicitud }));

      this.zone.run(() => {
        this.saving = false;
        this.form.reset();
        this.toastrAlert.showSuccess('El registro ha sido guardado correctamente.', '¡Guardado!');
        this.guardado.emit();
      });
    } catch {
      this.zone.run(() => {
        this.saving = false;
        this.toastrAlert.showError('No se pudo guardar el registro', 'Error');
      });
    }
  }

  private async actualizarRegistro(raw: Record<string, unknown>): Promise<void> {
    const valorSolicitud: ValorSolicitudItem[] = this.fields
      .filter(f => !f.hidden)
      .map(f => {
        const value      = raw[f.key];
        const esSelect   = f.controlType === 'select';
        const esEmployee = f.controlType === 'employee-list';
        return {
          solicitud_id:           this.editingRecord!.id,
          atributo_formulario_id: String(f.id),
          valor_texto:  esEmployee ? ((value as string) ?? '') : (!esSelect && value != null && value !== '' ? String(value) : null),
          valor_numero: null, valor_fecha: null, valor_booleano: null, valor_multiple: null,
          valor_catalogo: esSelect ? Number(value) || 0 : 0,
          valor_uuid:  esEmployee ? ((value as string) ?? '') : null,
          estado: true,
        };
      });

    try {
      await firstValueFrom(
        this.solicitudService.actualizarValoresSolicitud(this.editingRecord!.id, { valorSolicitud }),
      );
      this.zone.run(() => {
        this.saving = false;
        this.form.reset();
        this.toastrAlert.showSuccess('Registro actualizado correctamente.', '¡Actualizado!');
        this.guardado.emit();
      });
    } catch (err: any) {
      this.zone.run(() => {
        this.saving = false;
        this.toastrAlert.showError('No se pudo actualizar el registro', 'Error');
      });
    }
  }
}
