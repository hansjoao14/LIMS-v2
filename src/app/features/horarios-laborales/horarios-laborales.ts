import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, FormsModule, FormControl } from '@angular/forms';
import Swal from 'sweetalert2'; // Importación de SweetAlert2

interface SolicitudVehiculo {
  id: string;
  fecha: string;
  ocupantes: number;
  destino: string;
  horaSalida: string;
  horaRetorno: string;
  vehiculo: string;
  funcionario: string;
  actividad: string;
  observaciones: string;
}

@Component({
  selector: 'app-horarios-laborales',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './horarios-laborales.html',
  styleUrls: ['./horarios-laborales.css']
})
export class HorariosLaborales implements OnInit {
  
  form: FormGroup;
  solicitudes: SolicitudVehiculo[] = [];
  readonly STORAGE_KEY = 'lims_gestion_vehiculos';
  readonly COLOR_PRIMARIO = '#1d2b64'; // Color institucional para botones de SweetAlert

  // Datos para el select según tu diseño
  funcionarios = [
    { id: '1', nombre: 'TÉCNICO DE APOYO - QUIM. OSCAR CASTILLO' },
    { id: '2', nombre: 'COORDINADOR DE FLOTA - ING. JUAN PÉREZ' },
    { id: '3', nombre: 'RESP. LOGÍSTICA - LIC. MARÍA LOPEZ' },
    { id: '4', nombre: 'ING. FRANCISCO SOSA (CC:1716986086; CEL:0958998622)' }
  ];

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      fecha: ['', Validators.required],
      ocupantes: [null, [Validators.required, Validators.min(1)]],
      destino: ['', Validators.required],
      horaSalida: ['', Validators.required],
      horaRetorno: ['', Validators.required],
      vehiculo: ['', Validators.required],
      funcionario: ['', Validators.required],
      actividad: ['', Validators.required],
      observaciones: ['', [Validators.required, Validators.maxLength(250)]],
    });
  }

  ngOnInit(): void {
    this.cargarDatos();
  }

  // --- HELPERS PARA LA VISTA (Validación de colores) ---
  
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

  // -------------------------------------------------------------

  // Carga desde localStorage
  cargarDatos() {
    const data = localStorage.getItem(this.STORAGE_KEY);
    if (data) {
      this.solicitudes = JSON.parse(data);
      // Ordenar por fecha y luego por hora
      this.solicitudes.sort((a, b) => a.fecha.localeCompare(b.fecha) || a.horaSalida.localeCompare(b.horaSalida));
    }
  }

  // Agrupamiento por día para la tabla (Lunes, Martes...)
  get solicitudesAgrupadas() {
    const dias = ['DOMINGO', 'LUNES', 'MARTES', 'MIÉRCOLES', 'JUEVES', 'VIERNES', 'SÁBADO'];
    const grupos: { diaNombre: string, items: SolicitudVehiculo[] }[] = [];

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

    const nuevaSolicitud: SolicitudVehiculo = {
      id: (crypto.randomUUID?.() ?? Math.random().toString(36).slice(2) + Date.now().toString(36)),
      ...this.form.value
    };

    this.solicitudes.push(nuevaSolicitud);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.solicitudes));
    
    this.form.reset();
    this.cargarDatos();

    // SweetAlert de Éxito
    Swal.fire({
      title: '¡Programación Guardada!',
      text: 'El vehículo ha sido programado correctamente en el cronograma.',
      icon: 'success',
      confirmButtonColor: this.COLOR_PRIMARIO,
      timer: 2500
    });
  }

  eliminar(id: string) {
    // SweetAlert de Confirmación
    Swal.fire({
      title: '¿Está seguro de eliminar?',
      text: "Esta programación se quitará del cronograma y no se puede revertir.",
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
          text: 'La programación ha sido borrada.',
          icon: 'success',
          confirmButtonColor: this.COLOR_PRIMARIO,
          timer: 1500
        });
      }
    });
  }
}