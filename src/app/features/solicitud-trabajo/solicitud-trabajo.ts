import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-solicitud-trabajo',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './solicitud-trabajo.html',
  styleUrl: './solicitud-trabajo.css',
})
export class SolicitudTrabajo {
  solicitudForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.solicitudForm = this.fb.group({
      jefatura: ['', Validators.required],
      solicitadoPor: ['', Validators.required],
      ruc: ['', [Validators.required, Validators.pattern('^[0-9]{13}$')]],
      razonSocial: ['', Validators.required],
      nombreComercial: [''],
      direccion: ['', Validators.required],
      latitud: [''],
      longitud: [''],
      horarios: ['', Validators.required],
      motivo: ['', Validators.required],
      observaciones: ['', Validators.maxLength(250)]
    });
  }

  onSubmit() {
    console.log(this.solicitudForm.value);
  }
}