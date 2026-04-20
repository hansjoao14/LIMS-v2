import { Component, EventEmitter, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlContainer, FormGroup, FormGroupDirective, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-step4-confirmacion',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective }],
  templateUrl: './step4-confirmacion.html',
})
export class Step4ConfirmacionComponent {
  @Output() prev = new EventEmitter<void>();
  @Output() iniciarAcuerdos = new EventEmitter<void>();

  private controlContainer = inject(ControlContainer);

  get form(): FormGroup {
    return this.controlContainer.control as FormGroup;
  }
}
