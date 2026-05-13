import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { FormularioLaboratorio } from '../../../features/solicitud-trabajo/model/solicitud-trabajo.model';
import { environment } from '../../../../environments/environment';
import {
  ValorSolicitudItem,
  SolicitudEnsayoItem,
  SolicitudPayload,
  FinalizarSolicitudPayload,
} from '../../../interfaces/solicitudes/solicitud-trabajo/solicitud.interface';

export type {
  ValorSolicitudItem,
  SolicitudEnsayoItem,
  SolicitudPayload,
  FinalizarSolicitudPayload,
};

@Injectable({ providedIn: 'root' })
export class SolicitudService {
  api_reportes: string = environment.api_reportes;
  private api_solicitud: string = environment.api_solicitud;

  constructor(private http: HttpClient) {}

  getFormulario(idTipoFormulario: string | number, idEmpleado: string | number): Observable<FormularioLaboratorio> {
    const url = `${this.api_reportes}/report-parametro/formulario-dinamico/${idTipoFormulario}/${idEmpleado}`;

    return this.http.get<any>(url).pipe(
      map((res) => {
        const formRaw = res.data ?? null;

        if (!formRaw) {
          throw new Error('La API no devolvió data');
        }

        return {
          ...formRaw,
          preguntas: formRaw.preguntas
            ? [...formRaw.preguntas].sort((a: any, b: any) => a.orden - b.orden)
            : [],
        } as FormularioLaboratorio;
      }),
    );
  }

  guardarValoresSolicitud(payload: { valorSolicitud: ValorSolicitudItem[] }): Observable<any> {
    return this.http.post<any>(`${this.api_solicitud}/valor-solicitud/create-many`, payload);
  }

  actualizarValoresSolicitud(idSolicitud: string, payload: { valorSolicitud: ValorSolicitudItem[] }): Observable<any> {
    return this.http.put<any>(`${this.api_solicitud}/valor-solicitud/update-many/${idSolicitud}`, payload);
  }

  registrarSolicitud(payload: SolicitudPayload): Observable<any> {
    return this.http.post<any>(`${this.api_solicitud}/solicitud`, payload);
  }

  guardarEnsayosSolicitud(payload: { solicitudEnsayo: SolicitudEnsayoItem[] }): Observable<any> {
    return this.http.post<any>(`${this.api_solicitud}/solicitud-ensayo/create-many`, payload);
  }

  finalizarSolicitud(payload: FinalizarSolicitudPayload): Observable<any> {
    const result = this.http.post<any>(`${this.api_solicitud}/solicitud/finalizar`, payload);
    return result;
  }

  getPdfSolicitud(solicitudId: string): Observable<Blob> {
    return this.http.get(`${this.api_reportes}/report-solicitud/pdf/${solicitudId}`, {
      responseType: 'blob',
    });
  }

  createSolicitud(payload: any): Observable<any> {
    return this.http.post<any>(`${this.api_reportes}/solicitud-trabajo`, payload);
  }

  getSolicitudes(): Observable<any[]> {
    return this.http.get<any[]>(`${this.api_reportes}/solicitud-trabajo`);
  }
}
