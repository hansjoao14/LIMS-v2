import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  FormsModule,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Subject, takeUntil, firstValueFrom } from 'rxjs';
import { ToastrAlertService } from '../../services/toastr.service';

import {
  SolicitudService,
  ValorSolicitudItem,
  SolicitudPayload,
} from '../../services/solicitudes/solicitud-trabajo/solicitud-trabajo.service';
import { ReportSolicitudService } from '../../services/solicitudes/lista-solicitudes/report-solicitud.service';
import { ReportValorSolicitud } from '../../interfaces/solicitudes/lista-solicitudes/report-solicitud.interface';
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

type ContraloriaRecord = { id: string } & Record<string, unknown>;

@Component({
  selector: 'app-por-contraloria',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, LoadingComponent, PaginationComponent],
  templateUrl: './por-contraloria.html',
  styleUrls: ['./por-contraloria.css'],
})
export class PorContraloria implements OnInit, OnDestroy {
  form: FormGroup;
  formulario: FormularioLaboratorio | null = null;
  fields: FieldConfig[] = [];
  loading = true;
  saving = false;
  loadingTabla = false;
  private todasSolicitudes: ContraloriaRecord[] = [];
  solicitudes: ContraloriaRecord[] = [];
  metaTabla: PaginationMeta | null = null;
  currentPage = 1;
  readonly PAGE_SIZE = 10;

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
    this.cargarDatos();
    this.cargarFormularioDinamico();
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
              .filter((p) => p.estado !== false)
              .map((p) => this.toFieldConfig(p));
            this.generateControls();
            this.applyDependencyLogic();
            this.loading = false;
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
    if (pregunta.is_text_area) return 'textarea';
    return 'text';
  }

  getInputType(field: FieldConfig): string {
    if (field.key === 'val_hora_salida' || field.key === 'val_hora_retorno') return 'time';
    const tipo = field.source.tipo_respuesta;
    if (tipo === 'Fecha') return 'date';
    if (tipo === 'Numerico') return 'number';
    return 'text';
  }

  readonly FIELD_SPAN: Record<string, number> = {
    val_funcionario_id: 2,
    val_motivo_movilizacion: 2,
  };

  getFieldSpanClass(key: string): string {
    const span = this.FIELD_SPAN[key] ?? 1;
    if (span === 2) return 'sm:col-span-2 md:col-span-2';
    return '';
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

  getFieldError(key: string): string | null {
    const ctrl = this.form.get(key);
    if (!ctrl || !ctrl.invalid || (!ctrl.touched && !ctrl.dirty)) return null;
    if (ctrl.errors?.['required']) return 'Este campo es requerido.';
    return null;
  }

  cargarDatos(): void {
    this.loadingTabla = true;
    this.reportSolicitudService
      .getValoresByTipoFormulario(1003)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => {
          this.zone.run(() => {
            this.todasSolicitudes = this.agruparPorSolicitud(data);
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

  private agruparPorSolicitud(items: ReportValorSolicitud[]): ContraloriaRecord[] {
    const grouped = new Map<string, ContraloriaRecord>();
    for (const item of items) {
      if (!grouped.has(item.id_solicitud)) {
        grouped.set(item.id_solicitud, {
          id: item.id_solicitud,
          nombres_completos: item.nombres_completos,
          fecha_creacion: item.fecha_creacion,
        });
      }
      const record = grouped.get(item.id_solicitud)!;
      const valor =
        item.valor_texto ??
        item.valor_fecha ??
        (item.valor_numero != null ? String(item.valor_numero) : null) ??
        (item.valor_booleano != null ? String(item.valor_booleano) : null) ??
        '—';
      record[item.atributo_formulario_nombre] = valor;
    }
    return Array.from(grouped.values());
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

  get solicitudesAgrupadas(): Array<{ groupKey: string; diaLabel: string; items: ContraloriaRecord[] }> {
    const DIAS  = ['DOMINGO', 'LUNES', 'MARTES', 'MIÉRCOLES', 'JUEVES', 'VIERNES', 'SÁBADO'];
    const MESES = ['ENERO', 'FEBRERO', 'MARZO', 'ABRIL', 'MAYO', 'JUNIO',
                   'JULIO', 'AGOSTO', 'SEPTIEMBRE', 'OCTUBRE', 'NOVIEMBRE', 'DICIEMBRE'];

    let flatIdx = 0;
    const groups = new Map<string, { diaLabel: string; sortKey: number; items: ContraloriaRecord[] }>();

    for (const sol of this.solicitudes) {
      const fechaStr = String(sol['val_fecha_movilizacion'] ?? '—');
      const d = this.parseFecha(fechaStr);

      const groupKey = d ? fechaStr : '—';
      const sortKey  = d ? d.getTime() : 0;
      const diaLabel = d
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
        ctestado_id: 3,
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
          const esEmployee = f.controlType === 'employee-list';
          return {
            solicitud_id: solicitudId,
            atributo_formulario_id: String(f.id),
            valor_texto: !esEmployee
              ? value != null && value !== ''
                ? String(value)
                : null
              : null,
            valor_numero: null,
            valor_fecha: null,
            valor_booleano: null,
            valor_multiple: null,
            valor_catalogo: 0,
            valor_uuid: esEmployee ? (value ?? '') : userId,
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

  eliminar(_id: string): void {
    this.toastrAlert.showWarning('La eliminación debe realizarse desde el panel de administración.', 'Aviso');
  }

  getFieldValue(record: ContraloriaRecord, key: string): unknown {
    return record[key] ?? '—';
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
