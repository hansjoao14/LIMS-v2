import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ControlContainer,
  FormControl,
  FormGroup,
  FormGroupDirective,
  ReactiveFormsModule,
} from '@angular/forms';
import { PlanMuestreoCampo, PlanMuestreoGrupo, tipoRecipiente } from '../model/plan-muestreo-form.model';

/**
 * Renderiza una tarjeta del formulario dinámico del plan de muestreo. El
 * layout de la tarjeta y el control de cada campo salen de la configuración
 * del formulario; el FormGroup se toma del `<form [formGroup]>` del paso.
 */
@Component({
  selector: 'app-plan-muestreo-grupo',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective }],
  templateUrl: './plan-muestreo-grupo.html',
  styleUrl: '../plan-muestreo.css',
})
export class PlanMuestreoGrupoComponent {
  @Input({ required: true }) grupo!: PlanMuestreoGrupo;

  readonly tipoRecipiente = tipoRecipiente;

  private controlContainer = inject(ControlContainer);

  get form(): FormGroup {
    return this.controlContainer.control as FormGroup;
  }

  control(key: string): FormControl {
    return this.form.get(key) as FormControl;
  }

  valor(key: string): unknown {
    return this.control(key)?.value;
  }

  esCampoInvalido(key: string): boolean {
    const control = this.control(key);
    return !!control && control.invalid && (control.touched || control.dirty);
  }

  alternar(campo: PlanMuestreoCampo): void {
    const control = this.control(campo.key);
    control?.setValue(!control.value);
    control?.markAsDirty();
  }

  sumar(campo: PlanMuestreoCampo, delta: number): void {
    const control = this.control(campo.key);
    if (!control) return;
    control.setValue(Math.max(0, Number(control.value ?? 0) + delta));
    control.markAsDirty();
  }

  filas(campo: PlanMuestreoCampo): number {
    return campo.key === 'observaciones' || campo.key === 'equipamiento_de_seguridad' ? 4 : 3;
  }
}
