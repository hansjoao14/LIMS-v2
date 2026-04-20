import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlContainer, FormGroup, FormGroupDirective, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-step1-solicitud',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective }],
  templateUrl: './step1-solicitud.html',
})
export class Step1SolicitudComponent {
  @Input() entidadesMock: { id: string; nombre: string }[] = [];
  @Input() tecnicosFiltrados: { id: string; nombre: string }[] = [];
  @Output() next = new EventEmitter<void>();

  private controlContainer = inject(ControlContainer);

  get form(): FormGroup {
    return this.controlContainer.control as FormGroup;
  }

  esCampoInvalido(key: string): boolean {
    const control = this.form.get(key);
    return control ? control.invalid && (control.touched || control.dirty) : false;
  }
}
