import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { PageHeader } from '../../shared/components/page-header/page-header';

export interface ControlCalidad {
  tipo: string;
  filas: { analisis: string; muestrasFaltantes: number }[];
}

export interface PreservacionMuestra {
  preservacion: string;
  volumen: number | null;
  tipoRecipiente: string;
}

export interface Equipo {
  nombre: string;
  seleccion: string;
}

export interface Material {
  nombre: string;
  activo: boolean;
}

@Component({
  selector: 'app-plan-muestreo-paso2',
  standalone: true,
  imports: [CommonModule, FormsModule, PageHeader],
  templateUrl: './plan-muestreo-paso2.html',
  styleUrl: './plan-muestreo.css',
})
export class PlanMuestreoPaso2 {
  tipoMuestreo = '';

  controlesCalidad: ControlCalidad[] = [
    {
      tipo: 'REPETIBILIDAD',
      filas: [
        { analisis: 'pH, TEMPERATURA', muestrasFaltantes: 4 },
        { analisis: 'MUESTREO', muestrasFaltantes: 9 },
      ],
    },
    {
      tipo: 'REPRODUCIBILIDAD',
      filas: [
        { analisis: 'pH, TEMPERATURA', muestrasFaltantes: 4 },
        { analisis: 'MUESTREO', muestrasFaltantes: 29 },
      ],
    },
    {
      tipo: 'BLANCO DE CONTROL',
      filas: [{ analisis: 'MUESTREO', muestrasFaltantes: 29 }],
    },
  ];

  preservaciones: PreservacionMuestra[] = [
    { preservacion: 'Temperatura 0ºC a 6ºC', volumen: null, tipoRecipiente: 'Vidrio opaco' },
    { preservacion: 'H2SO4', volumen: null, tipoRecipiente: 'Vidrio opaco' },
    { preservacion: 'HNO3', volumen: null, tipoRecipiente: 'Vidrio opaco' },
  ];

  equiposMedicion: Equipo[] = [
    { nombre: 'MULTIPARÁMETROS', seleccion: '' },
    { nombre: 'TERMÓMETRO DIGITAL', seleccion: '' },
    { nombre: 'AFORADOR DOPPLER', seleccion: '' },
    { nombre: 'MEDIDOR DE CAUDAL MAGNÉTICO', seleccion: '' },
  ];

  equiposPreservacion: Equipo[] = [
    { nombre: 'FRIGORÍFICO PORTÁTIL', seleccion: '' },
  ];

  materiales: Material[] = [
    { nombre: 'PÉRTIGA EXTENSIBLE', activo: false },
    { nombre: 'BALDE PLÁSTICO CON TAPA', activo: false },
    { nombre: 'VASO ANGULAR O DE CUCHARA', activo: false },
    { nombre: 'SOGA DE ESCALADA 30 METROS DE LARGO', activo: false },
    { nombre: 'JARRA DE VIDRIO DE 1 LITRO', activo: false },
  ];

  personasEnCampo = 2;
  movilizacion = 'En camioneta desde la Secretaria de Ambiente al punto de muestreo aprox. XX km, XX min.';
  tiempoPermanencia = 2;
  duracionMuestreo = 2;

  constructor(private router: Router) {}

  regresar(): void {
    this.router.navigate(['/plan-muestreo']);
  }

  siguiente(): void {
    // navegar al siguiente paso
  }
}
