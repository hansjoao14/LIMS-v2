import { Component, Input, TemplateRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ControlContainer,
  FormControl,
  FormGroup,
  FormGroupDirective,
  ReactiveFormsModule,
} from '@angular/forms';
import { DynamicField, DynamicGroup } from '../dynamic-form.model';

/**
 * Renderiza una tarjeta del formulario dinámico. El layout de la tarjeta y el
 * control de cada campo salen del schema; el FormGroup se toma del
 * `<form [formGroup]>` del componente que la contiene.
 *
 * Sabe pintar los layouts base (`campos`, `toggles`, `toggles-2col`). Un módulo
 * con un layout propio — una tabla, un bloque a medida — lo pasa por
 * `plantillaLayout` y este componente lo delega, sin que el layout del feature
 * ensucie el motor compartido.
 */
@Component({
  selector: 'app-dynamic-form-group',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective }],
  templateUrl: './dynamic-form-group.html',
  styleUrl: './dynamic-form-group.css',
})
export class DynamicFormGroupComponent {
  @Input({ required: true }) grupo!: DynamicGroup;

  /** Plantilla para los layouts que este componente no conoce. */
  @Input() plantillaLayout: TemplateRef<{ $implicit: DynamicGroup }> | null = null;

  /** Alto de los textarea por clave de campo; por defecto 3 filas. */
  @Input() filasTextarea: Record<string, number> = {};

  // Campos que el motor de dependencias mantiene visibles en esta tarjeta.
  get camposVisibles(): DynamicField[] {
    return this.grupo.campos.filter((campo) => !campo.hidden);
  }

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

  alternar(campo: DynamicField): void {
    const control = this.control(campo.key);
    control?.setValue(!control.value);
    control?.markAsDirty();
  }

  sumar(campo: DynamicField, delta: number): void {
    const control = this.control(campo.key);
    if (!control) return;
    control.setValue(Math.max(0, Number(control.value ?? 0) + delta));
    control.markAsDirty();
  }

  filas(campo: DynamicField): number {
    return this.filasTextarea[campo.key] ?? 3;
  }
}
