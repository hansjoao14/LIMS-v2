import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, of, tap } from 'rxjs';
import { FormularioLaboratorio } from '../model/solicitud-trabajo.model';
import { environment } from '../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class SolicitudService {
  api_reportes: string = environment.api_reportes;

  constructor(private http: HttpClient) {}

  getFormulario(idTipoFormulario: string | number): Observable<FormularioLaboratorio> {
    const url = `${this.api_reportes}/report-parametro/formulario-dinamico/${idTipoFormulario}`;

    return this.http.get<FormularioLaboratorio>(url).pipe(
      map((res) => ({
        ...res,
        preguntas: res?.preguntas ? [...res.preguntas].sort((a, b) => a.orden - b.orden) : [],
      })),
    );
  }

  saveSolicitud(payload: unknown): Observable<unknown> {
    localStorage.setItem('lims_solicitud_payload', JSON.stringify(payload));
    return of(payload);
  }

  getSolicitudLocal<T>(): T | null {
    const raw = localStorage.getItem('lims_solicitud_payload');
    return raw ? (JSON.parse(raw) as T) : null;
  }

  clearSolicitudLocal(): void {
    localStorage.removeItem('lims_solicitud_payload');
  }
}