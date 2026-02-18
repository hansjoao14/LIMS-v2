import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-horarios-laborales',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './horarios-laborales.html',
})
export class HorariosLaborales {
  
  form;

  funcionarios = [
    { id: '1', nombre: 'TÉCNICO DE APOYO - QUIM. OSCAR CASTILLO' },
    { id: '2', nombre: 'COORDINADOR DE FLOTA - ING. JUAN PÉREZ' },
    { id: '3', nombre: 'RESP. LOGÍSTICA - LIC. MARÍA LOPEZ' },
  ];

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      fecha: ['', Validators.required],
      ocupantes: [null as any, [Validators.required, Validators.min(1)]],
      destino: ['', Validators.required],
      horaSalida: ['', Validators.required],
      horaRetorno: ['', Validators.required],
      vehiculo: ['', Validators.required],
      funcionario: ['', Validators.required],
      actividad: ['', Validators.required],
      observaciones: ['', [Validators.required, Validators.maxLength(250)]],
    });
  }

  get obsLen() {
    return (this.form.value.observaciones?.length ?? 0);
  }

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    console.log(this.form.value);
    alert('Guardado (demo)');
  }
}
