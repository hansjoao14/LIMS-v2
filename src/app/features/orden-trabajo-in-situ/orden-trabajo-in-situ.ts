import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormArray } from '@angular/forms';
import Swal from 'sweetalert2';

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

  private readonly COLOR_PRIMARIO = '#1e3a8a';

  guardar(): void {
    this.form.reset();
    while (this.ensayosArray.length > 2) {
      this.ensayosArray.removeAt(this.ensayosArray.length - 1);
    }
    Swal.fire({
      title: '¡Guardado con éxito!',
      text: 'La orden de trabajo In Situ ha sido guardada correctamente.',
      icon: 'success',
      confirmButtonColor: this.COLOR_PRIMARIO,
      timer: 2500,
    });
  }
}
