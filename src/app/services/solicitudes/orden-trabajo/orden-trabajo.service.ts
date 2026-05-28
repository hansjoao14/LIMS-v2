import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

export interface OrdenTrabajoPayload {
  solicitud_id: string;
  usuario_id: string;
  entidad_id: string;
  ctambiente_id: number | null;
  periodo_id: number;
  secuencial_id: string | null;
  num_secuencial: string | null;
  ctuso_suelo_id: number | null;
  ctcaracteristica_horaria_id: number | null;
  ctpunto_critico_id: number | null;
  direccion_pca: string | null;
  telefono_pca: string | null;
  observacion: string | null;
  ctestado_id: number;
  estado: boolean;
  ctformulario_id: number;
}

export interface OrdenTrabajoDetallePayload {
  solicitud_ensayo_id: string;
  estado: boolean;
}

export interface CrearOrdenTrabajoConDetallePayload {
  ordenTrabajo: OrdenTrabajoPayload;
  ordenTrabajoDetalle: OrdenTrabajoDetallePayload[];
}

export interface FinalizarOrdenPayload {
  idOrden: string;
  identifcadorSecuecnial: string;
  ctestado: number;
}

@Injectable({ providedIn: 'root' })
export class OrdenTrabajoService {
  private readonly apiSolicitud = environment.api_solicitud;

  constructor(private http: HttpClient) {}

  crearOrdenTrabajoConDetalle(payload: CrearOrdenTrabajoConDetallePayload): Observable<any> {
    return this.http.post<any>(`${this.apiSolicitud}/orden-trabajo/create-detalle`, payload);
  }

  actualizarOrden(id: string, payload: OrdenTrabajoPayload): Observable<any> {
    return this.http.put<any>(`${this.apiSolicitud}/orden-trabajo/${id}`, payload);
  }

  autorizarOrden(payload: FinalizarOrdenPayload): Observable<any> {
    return this.http.post<any>(`${this.apiSolicitud}/orden-trabajo/finalizar`, payload);
  }

  deshabilitarOrden(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiSolicitud}/orden-trabajo/${id}/disable`);
  }
}
