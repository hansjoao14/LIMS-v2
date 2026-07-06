import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlContainer, FormControl, FormGroup, FormGroupDirective, ReactiveFormsModule } from '@angular/forms';
import { FieldConfig, FieldSectionId } from '../../model/solicitud-trabajo.model';
import { TimePickerComponent } from '../../../../ui/time-picker/time-picker';

type MotivoFlujo = '' | 'seguimiento' | 'denuncia' | 'licenciamiento';

export interface ManualScheduleEntry {
  dias: string[];
  inicio_bloque: string;
  fin_bloque: string;
}

@Component({
  selector: 'app-step2-operador',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TimePickerComponent],
  viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective }],
  templateUrl: './step2-operador.html',
})
export class Step2OperadorComponent {
  @Input() fields: FieldConfig[] = [];
  @Input() buscandoIntegracion: { [key: string]: boolean } = {};
  @Input() manualSchedules: ManualScheduleEntry[] = [];
  @Input() motivoFlujo: MotivoFlujo = '';
  @Input() isPasaporteSelected = false;
  @Input() cargando = false;
  @Output() next = new EventEmitter<void>();
  @Output() prev = new EventEmitter<void>();
  @Output() openMap = new EventEmitter<void>();
  @Output() buscarIntegracion = new EventEmitter<FieldConfig>();
  @Output() addManualSchedule = new EventEmitter<ManualScheduleEntry>();
  @Output() removeManualSchedule = new EventEmitter<number>();

  readonly DIAS_SEMANA = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

  diasSeleccionados: string[] = [];
  draftStart = '08:00';
  draftEnd = '09:00';
  draftError = '';

  private controlContainer = inject(ControlContainer);

  get form(): FormGroup {
    return this.controlContainer.control as FormGroup;
  }

  esCampoInvalido(key: string): boolean {
    const control = this.form.get(key);
    return control ? control.invalid && (control.touched || control.dirty) : false;
  }

  getFieldControl(key: string): FormControl {
    return this.form.get(key) as FormControl;
  }

  getSectionFields(sectionId: FieldSectionId): FieldConfig[] {
    return this.fields.filter((f) => f.section === sectionId && !f.hidden && !this.isMotivoField(f));
  }

  getMotivoBaseFields(): FieldConfig[] {
    return this.fields.filter((f) => !f.hidden && this.isMotivoField(f) && !this.isMotivoSpecificField(f));
  }

  getMotivoSpecificFields(flow: MotivoFlujo): FieldConfig[] {
    if (!flow) return [];
    return this.fields.filter((f) => !f.hidden && this.matchesMotivoFlow(f, flow));
  }

  getFieldRows(field: FieldConfig): number {
    return field.key === 'val_obs' ? 4 : 3;
  }

  getFormatoError(key: string): string | null {
    const control = this.form.get(key);
    if (!control || !(control.touched || control.dirty)) return null;
    if (control.errors?.['cedulaInvalida']) return control.errors['cedulaInvalida'];
    if (control.errors?.['rucInvalido']) return control.errors['rucInvalido'];
    return null;
  }

  getFieldInputType(field: FieldConfig): string {
    const key = field.key.toLowerCase();
    if (key.includes('ruc') || key.includes('ced') || key.includes('num')) return 'tel';
    return 'text';
  }

  toggleDia(dia: string): void {
    this.diasSeleccionados = this.diasSeleccionados.includes(dia)
      ? this.diasSeleccionados.filter((d) => d !== dia)
      : [...this.diasSeleccionados, dia];
  }

  agregarHorario(): void {
    this.draftError = '';
    if (this.diasSeleccionados.length === 0) { this.draftError = 'Seleccione al menos un día.'; return; }
    if (this.draftEnd <= this.draftStart) { this.draftError = 'La hora de fin debe ser posterior a la de inicio.'; return; }
    this.addManualSchedule.emit({
      dias: [...this.diasSeleccionados],
      inicio_bloque: this.draftStart,
      fin_bloque: this.draftEnd,
    });
    this.diasSeleccionados = [];
    this.draftStart = '08:00';
    this.draftEnd = '09:00';
  }

  formatTime(time: string): string {
    const [hStr, mStr] = time.split(':');
    let h = parseInt(hStr, 10);
    const period = h < 12 ? 'AM' : 'PM';
    if (h === 0) h = 12;
    else if (h > 12) h -= 12;
    return `${h}:${mStr ?? '00'} ${period}`;
  }

  private isMotivoField(field: FieldConfig): boolean {
    return (field.key?.toLowerCase() || '').includes('motivo') || (field.label?.toLowerCase() || '').includes('motivo');
  }

  private isMotivoSpecificField(field: FieldConfig): boolean {
    const text = `${field.key} ${field.label}`.toLowerCase();
    return text.includes('seguimiento') || text.includes('denuncia') || text.includes('licenciamiento');
  }

  private matchesMotivoFlow(field: FieldConfig, flow: MotivoFlujo): boolean {
    return `${field.key} ${field.label}`.toLowerCase().includes(flow);
  }
}
