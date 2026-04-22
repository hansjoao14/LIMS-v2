import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { FormularioLaboratorio } from '../model/solicitud-trabajo.model';
import { environment } from '../../../../environments/environment';

export interface SolicitudPayload {
  formulario_id: string | number | null;
  usuario_id: string;
  entidad_id: string;
  secuencial: null;
  ctestado_id: number;
  periodo_id: number;
  descripcion: string;
  ejercicio_id: number;
}

@Injectable({ providedIn: 'root' })
export class SolicitudService {

  api_reportes: string = environment.api_reportes;
  private api_solicitud: string = environment.api_solicitud;

  constructor(private http: HttpClient) {}

  getFormulario(idTipoFormulario: string | number): Observable<FormularioLaboratorio> {
    const url = `${this.api_reportes}/report-parametro/formulario-dinamico/${idTipoFormulario}`;

    return this.http.get<any>(url).pipe(
      map((res) => {
        // ---------------------------------------------------------
        // AQUI ESTÁ LA CORRECCIÓN:
        // Tu API devuelve un objeto { success: true, data: [ ... ] }
        // Entramos a res.data y tomamos el primer elemento [0]
        // ---------------------------------------------------------
        const formRaw = res.data && res.data.length > 0 ? res.data[0] : null;

        if (!formRaw) {
          throw new Error('El arreglo data de la API vino vacío');
        }

        return {
          ...formRaw,
          // Ordenamos las preguntas usando el campo "orden" de tu JSON
          preguntas: formRaw.preguntas
            ? [...formRaw.preguntas].sort((a: any, b: any) => a.orden - b.orden)
            : []
        } as FormularioLaboratorio;
      })
    );
  }

  registrarSolicitud(payload: SolicitudPayload): Observable<any> {
    return this.http.post(this.api_solicitud, payload);
  }

  // Persistencia real en base de datos
  createSolicitud(payload: any): Observable<any> {
    return this.http.post(`${this.api_reportes}/solicitud-trabajo`, payload);
  }

  // Para el listado del panel de administración
  getSolicitudes(): Observable<any[]> {
    return this.http.get<any[]>(`${this.api_reportes}/solicitud-trabajo`);
  }
}
