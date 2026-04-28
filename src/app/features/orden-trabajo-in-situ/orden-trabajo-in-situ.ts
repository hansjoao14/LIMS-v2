import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormArray } from '@angular/forms';

@Component({
  selector: 'app-orden-trabajo-in-situ',
  imports: [ReactiveFormsModule, NgFor],
  templateUrl: './orden-trabajo-in-situ.html',
  styleUrl: './orden-trabajo-in-situ.css',
})
export class OrdenTrabajoInSitu {
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      solicitudTrabajoNo: [''],
      ordenTrabajoNo: [''],
      fechaMaximaEntrega: [''],
      fechaEmision: [''],
      cliente: this.fb.group({
        solicitadoPor: [''],
        direccion: [''],
        solicitudNo: [''],
        correoElectronico: [''],
      }),
      operador: this.fb.group({
        razonSocial: [''],
        nombreComercial: [''],
        ruc: [''],
        direccion: [''],
      }),
      ensayos: this.fb.array([this.crearEnsayo(), this.crearEnsayo()]),
      tiposUsoSuelo: this.fb.group({
        usoSuelo: [''],
        caracterizacionHoraria: [''],
      }),
    });
  }

  crearEnsayo(): FormGroup {
    return this.fb.group({
      seleccionado: [false],
      ensayo: [''],
      identificacion: [''],
      metodoInterno: [''],
      metodoReferencia: [''],
      unidad: [''],
    });
  }

  get ensayosArray(): FormArray {
    return this.form.get('ensayos') as FormArray;
  }

  agregarEnsayo(): void {
    this.ensayosArray.push(this.crearEnsayo());
  }

  toggleEnsayo(index: number): void {
    const control = this.ensayosArray.at(index).get('seleccionado');
    control?.setValue(!control.value);
  }

  guardar(): void {
    console.log('Orden de trabajo In Situ:', this.form.value);
  }
}
