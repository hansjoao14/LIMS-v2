import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-lista-solicitudes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lista-solicitudes.html',
  styleUrl: './lista-solicitudes.css',
})
export class ListaSolicitudes {
  solicitudes = [
    { id: 'ST-001', fecha: '2026-02-10', solicitante: 'Ing. Rosa Fonseca', actividad: 'Mantenimiento Preventivo', prioridad: 'Alta', estado: 'Pendiente' },
    { id: 'ST-002', fecha: '2026-02-11', solicitante: 'Arq. Luis Narváez', actividad: 'Inspección de Obra', prioridad: 'Media', estado: 'En Proceso' },
    { id: 'ST-003', fecha: '2026-02-12', solicitante: 'Dra. Ana Lucía', actividad: 'Toma de Muestras', prioridad: 'Baja', estado: 'Completado' },
    { id: 'ST-004', fecha: '2026-02-12', solicitante: 'Ing. Carlos Ruiz', actividad: 'Revisión LIMS', prioridad: 'Alta', estado: 'Cancelado' },
    { id: 'ST-005', fecha: '2026-02-13', solicitante: 'Lcda. María López', actividad: 'Monitoreo Ambiental', prioridad: 'Media', estado: 'Pendiente' },
    { id: 'ST-006', fecha: '2026-02-14', solicitante: 'Tec. Jorge Díaz', actividad: 'Calibración de Equipos', prioridad: 'Alta', estado: 'En Proceso' },
    { id: 'ST-007', fecha: '2026-02-15', solicitante: 'Dra. Elena Prado', actividad: 'Auditoría Interna', prioridad: 'Media', estado: 'Pendiente' },
    { id: 'ST-008', fecha: '2026-02-15', solicitante: 'Ing. Pablo Soria', actividad: 'Levantamiento de Datos', prioridad: 'Baja', estado: 'Completado' },
    { id: 'ST-009', fecha: '2026-02-16', solicitante: 'Soc. Roberto Cruz', actividad: 'Gestión Comunitaria', prioridad: 'Alta', estado: 'Pendiente' },
    { id: 'ST-010', fecha: '2026-02-17', solicitante: 'Ing. Rosa Fonseca', actividad: 'Control de Descargas', prioridad: 'Media', estado: 'Completado' },
  ];

  getBadgeClass(estado: string): string {
    const classes: any = {
      'Pendiente': 'badge-warning',
      'En Proceso': 'badge-info',
      'Completado': 'badge-success',
      'Cancelado': 'badge-danger'
    };
    return classes[estado] || 'badge-default';
  }
}