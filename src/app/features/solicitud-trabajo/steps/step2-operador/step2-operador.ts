import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlContainer, FormControl, FormGroup, FormGroupDirective, ReactiveFormsModule } from '@angular/forms';
import { FieldConfig, FieldSectionId } from '../../model/solicitud-trabajo.model';

type MotivoFlujo = '' | 'seguimiento' | 'denuncia' | 'licenciamiento';

@Component({
  selector: 'app-step2-operador',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective }],
  templateUrl: './step2-operador.html',
})
export class Step2OperadorComponent {
  @Input() fields: FieldConfig[] = [];
  @Input() buscandoIntegracion: { [key: string]: boolean } = {};
  @Input() selectedScheduleIndexes!: Set<number>;
  @Input() motivoFlujo: MotivoFlujo = '';
  @Input() isPasaporteSelected = false;
  @Output() next = new EventEmitter<void>();
  @Output() prev = new EventEmitter<void>();
  @Output() openMap = new EventEmitter<void>();
  @Output() buscarIntegracion = new EventEmitter<FieldConfig>();
  @Output() toggleSchedule = new EventEmitter<number>();

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

  getFieldInputType(field: FieldConfig): string {
    const key = field.key.toLowerCase();
    if (key.includes('ruc') || key.includes('ced') || key.includes('num')) return 'tel';
    return 'text';
  }

  isScheduleSelected(index: number): boolean {
    return this.selectedScheduleIndexes.has(index);
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
