import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { PageHeader } from '../../shared/components/page-header/page-header';

export interface SolucionBuffer {
  nombre: string;
  activo: boolean;
}

@Component({
  selector: 'app-plan-muestreo-paso3',
  standalone: true,
  imports: [CommonModule, FormsModule, PageHeader],
  templateUrl: './plan-muestreo-paso3.html',
  styleUrl: './plan-muestreo.css',
})
export class PlanMuestreoPaso3 {
  equipamientoSeguridad =
    'Casco, overol con cintas reflectivas, zapatos punta de acero, gafas, mascarilla para vapores ácidos, guantes de nitrilo, guantes de hilo, botiquín de primeros auxilios, gel antibacterial, conos';

  soluciones: SolucionBuffer[] = [
    { nombre: 'BUFFER DE PH 2 CÓD. QC-18', activo: true },
    { nombre: 'BUFFER DE PH 4 CÓD. QC-17', activo: true },
    { nombre: 'BUFFER DE PH 7 CÓD. QC-16', activo: true },
    { nombre: 'BUFFER DE PH 10 CÓD. QC-14', activo: true },
    { nombre: 'PE DE PH 6.63', activo: false },
    { nombre: 'ESTÁNDAR OXÍGENO DISUELTO 0 MG/L CÓD. RV-42', activo: true },
    { nombre: 'ESTÁNDAR CONDUCTIVIDAD 1413 CÓD. RV-63', activo: true },
    { nombre: 'ESTÁNDAR CONDUCTIVIDAD 147 CÓD. RV-62', activo: false },
  ];

  observaciones = '';

  notas = [
    'Nota 1: El muestreador debe lavar los frascos de muestra con el agua del sitio de muestreo antes de recolectar la muestra.',
    'Nota 2: En caso de que el punto de muestreo se encuentre en una zona de difícil acceso, se debe notificar al responsable del área.',
  ];

  constructor(private router: Router) {}

  regresar(): void {
    this.router.navigate(['/plan-muestreo/paso2']);
  }

  guardar(): void {
    console.log('[plan-muestreo-paso3:guardar]', {
      equipamientoSeguridad: this.equipamientoSeguridad,
      soluciones: this.soluciones,
      observaciones: this.observaciones,
    });
  }
}
