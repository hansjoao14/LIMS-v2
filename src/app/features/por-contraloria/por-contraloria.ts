import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, FormsModule, FormControl } from '@angular/forms';
import Swal from 'sweetalert2'; // Importamos SweetAlert2

interface SolicitudContraloria {
  id: string;
  fecha: string;
  ocupantes: number;
  vehiculo: string;
  horaSalida: string;
  horaRetorno: string;
  nombreSolicitante: string;
  funcionario: string;
  cargoSolicitante: string;
  motivo: string;
  origen: string;
  destino: string;
  observaciones: string;
}

@Component({
  selector: 'app-por-contraloria',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './por-contraloria.html',
  styleUrls: ['./por-contraloria.css']
})
export class PorContraloria implements OnInit {
  
  form: FormGroup;
  solicitudes: SolicitudContraloria[] = [];
  readonly STORAGE_KEY = 'lims_vehiculos_contraloria';
  readonly COLOR_PRIMARIO = '#1d2b64'; // Color institucional para botones de SweetAlert

  funcionarios = [
    { id: '1', nombre: 'Ing. Francisco Sosa (CC:1716986086; Cel:0958998622)' },
    { id: '2', nombre: 'Ing. Jorge Guanulema (CC:1717914079; Cel:0984092584)' },
    { id: '3', nombre: 'Ing. José Luis Montenegro (CC:1716489202; Cel:0962585483)' }
  ];

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      fecha: ['', Validators.required],
      ocupantes: [null, [Validators.required, Validators.min(1)]],
      vehiculo: ['', Validators.required],
      horaSalida: ['', Validators.required],
      horaRetorno: ['', Validators.required],
      nombreSolicitante: ['', Validators.required],
      funcionario: ['', Validators.required],
      cargoSolicitante: ['', Validators.required],
      motivo: ['', Validators.required],
      origen: ['', Validators.required],
      destino: ['', Validators.required],
      observaciones: ['', [Validators.required, Validators.maxLength(250)]],
    });
  }

  ngOnInit(): void {
    this.cargarDatos();
  }

  get obsLen() {
    return this.form.get('observaciones')?.value?.length || 0;
  }

  getControl(nombreCampo: string): FormControl {
    return this.form.get(nombreCampo) as FormControl;
  }

  esCampoInvalido(nombreCampo: string): boolean {
    const control = this.getControl(nombreCampo);
    return control.invalid && (control.touched || control.dirty);
  }

  cargarDatos() {
    const data = localStorage.getItem(this.STORAGE_KEY);
    if (data) {
      this.solicitudes = JSON.parse(data);
      this.solicitudes.sort((a, b) => a.fecha.localeCompare(b.fecha) || a.horaSalida.localeCompare(b.horaSalida));
    }
  }

  get solicitudesAgrupadas() {
    const dias = ['DOMINGO', 'LUNES', 'MARTES', 'MIÉRCOLES', 'JUEVES', 'VIERNES', 'SÁBADO'];
    const grupos: { diaNombre: string, items: SolicitudContraloria[] }[] = [];

    this.solicitudes.forEach(sol => {
      const fechaObj = new Date(sol.fecha + 'T00:00:00');
      const nombreDia = dias[fechaObj.getDay()];
      
      let grupo = grupos.find(g => g.diaNombre === nombreDia);
      if (!grupo) {
        grupo = { diaNombre: nombreDia, items: [] };
        grupos.push(grupo);
      }
      grupo.items.push(sol);
    });

    return grupos;
  }

  guardar() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      
      // SweetAlert de Advertencia
      Swal.fire({
        title: 'Formulario Incompleto',
        text: 'Por favor, llene todos los campos requeridos marcados en rojo para continuar.',
        icon: 'warning',
        confirmButtonColor: this.COLOR_PRIMARIO,
        confirmButtonText: 'Entendido'
      });
      return;
    }

    const nuevaSolicitud: SolicitudContraloria = {
      id: crypto.randomUUID(),
      ...this.form.value
    };

    this.solicitudes.push(nuevaSolicitud);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.solicitudes));
    
    this.form.reset();
    this.cargarDatos();

    // SweetAlert de Éxito
    Swal.fire({
      title: '¡Guardado!',
      text: 'La orden de movilización se registró correctamente en el sistema.',
      icon: 'success',
      confirmButtonColor: this.COLOR_PRIMARIO,
      timer: 2500
    });
  }

  eliminar(id: string) {
    // SweetAlert de Confirmación (Doble check)
    Swal.fire({
      title: '¿Está seguro de eliminar?',
      text: "Esta acción no se puede revertir y el registro desaparecerá del cronograma.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: this.COLOR_PRIMARIO,
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.solicitudes = this.solicitudes.filter(s => s.id !== id);
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.solicitudes));
        
        Swal.fire({
          title: 'Eliminado',
          text: 'El registro ha sido borrado.',
          icon: 'success',
          confirmButtonColor: this.COLOR_PRIMARIO,
          timer: 1500
        });
      }
    });
  }
}