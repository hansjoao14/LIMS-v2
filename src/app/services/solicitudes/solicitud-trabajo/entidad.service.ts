import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Entidad } from '../../../interfaces/solicitudes/solicitud-trabajo/entidad.interface';
import { Tecnico } from '../../../interfaces/solicitudes/solicitud-trabajo/tecnico.interface';

@Injectable({
  providedIn: 'root',
})
export class EntidadService {
  private entidades: Entidad[] = [
    { id: 'ENT-001', nombre: 'Secretaría de Ambiente' },
    { id: 'ENT-002', nombre: 'Dirección Metropolitana' },
    { id: 'ENT-003', nombre: 'Unidad Técnica Ambiental' },
  ];

  private tecnicos: Tecnico[] = [
    { id: 'TEC-001', entidadId: 'ENT-001', nombre: 'Juan Pérez', cargo: 'Analista Ambiental' },
    { id: 'TEC-002', entidadId: 'ENT-001', nombre: 'María López', cargo: 'Técnico de Laboratorio' },
    { id: 'TEC-003', entidadId: 'ENT-002', nombre: 'Carlos Ruiz', cargo: 'Inspector Ambiental' },
  ];

  getEntidades(): Observable<Entidad[]> {
    return of(this.entidades);
  }

  getTecnicosByEntidad(entidadId: string): Observable<Tecnico[]> {
    return of(this.tecnicos.filter((t) => t.entidadId === entidadId));
  }

  getTecnicoById(id: string): Tecnico | undefined {
    return this.tecnicos.find((t) => t.id === id);
  }
}
