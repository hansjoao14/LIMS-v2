import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import {
  FirmarOrdenTrabajoPayload,
  FirmarOrdenTrabajoResponse,
  FirmaOrdenTrabajo,
} from '../../../interfaces/solicitudes/orden-trabajo/firma-orden-trabajo.interface';
import { RespuestaApi } from '../../../interfaces/comunes/respuesta-api.interface';

export interface OrdenTrabajoPayload {
  solicitud_id: string;
  usuario_id: string;
  entidad_id: string;
  ctambiente_id: number | null;
  periodo_id: number;
  secuencial_id: string | null;
  num_secuencial: string | null;
  // Opcionales: salieron del contrato (ver CrearOrdenTrabajoPayload) y el
  // reporte ya no los devuelve, así que no hay de dónde releerlos para un PUT
  // parcial. Se omiten en vez de mandarlos en null para no borrar en BD lo que
  // pueda quedar guardado.
  ctuso_suelo_id?: number | null;
  ctcaracteristica_horaria_id?: number | null;
  ctpunto_critico_id?: number | null;
  direccion_pca?: string | null;
  telefono_pca?: string | null;
  observacion?: string | null;
  ctestado_id: number;
  estado: boolean;
  ctformulario_id: number; //tipo_formulario_id
}

// Shape mínimo de ordenTrabajo que acepta POST /orden-trabajo/create-detalle
// (sin ctuso_suelo_id/ctcaracteristica_horaria_id/ctpunto_critico_id/
// direccion_pca/telefono_pca/observacion — esos quedaron fuera del nuevo
// contrato; ver valorOrdenTrabajo).
export interface CrearOrdenTrabajoPayload {
  solicitud_id: string;
  usuario_id: string;
  entidad_id: string;
  ctambiente_id: number | null;
  periodo_id: number;
  secuencial_id: string | null;
  num_secuencial: string | null;
  ctestado_id: number;
  estado: boolean;
  ctformulario_id: number | null;
}

export interface OrdenTrabajoDetallePayload {
  // TODO: el backend exige orden_trabajo_id (UUID) aun en el POST de creación,
  // donde la orden todavía no existe. Se manda un valor quemado temporal
  // (ver TEMP_ORDEN_TRABAJO_ID) hasta que backend defina el contrato real.

  estado: boolean;
  ctambiental_id: number;
  ensayo_id: number;
  cttipo_ensayo_id: number;
}

export interface ValorOrdenTrabajoPayload {
  atributo_formulario_id: string;
  valor_texto: string | null;
  valor_numero: number | null;
  valor_fecha: string | null;
  valor_booleano: boolean | null;
  valor_multiple: string | null;
  estado: boolean;
  valor_catalogo: number;
  valor_uuid: string | null;
}

export interface CrearOrdenTrabajoConDetallePayload {
  ordenTrabajo: CrearOrdenTrabajoPayload;
  ordenTrabajoDetalle: OrdenTrabajoDetallePayload[];
  valorOrdenTrabajo: ValorOrdenTrabajoPayload[];
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

  /**
   * PDF de la orden. Sale de `api_solicitud` y no de `api_reportes` a
   * propósito: este devuelve el archivo congelado **con las firmas que ya
   * tenga**, mientras que el de reportes lo regenera desde cero y siempre viene
   * sin firmar. Imprimir y firmar tienen que ver exactamente el mismo
   * documento.
   */
  getPdfOrden(id: string): Observable<Blob> {
    return this.http.get(`${this.apiSolicitud}/orden-trabajo/${id}/pdf`, {
      responseType: 'blob',
    });
  }

  /** Estampa una firma electrónica sobre el PDF congelado. */
  firmarOrden(
    id: string,
    payload: FirmarOrdenTrabajoPayload,
  ): Observable<FirmarOrdenTrabajoResponse> {
    return this.http
      .post<RespuestaApi<FirmarOrdenTrabajoResponse>>(
        `${this.apiSolicitud}/orden-trabajo/${id}/firmar`,
        payload,
      )
      .pipe(map((res) => res.data));
  }

  /** Bitácora: quién firmó el documento, con qué cargo y cuándo. */
  getFirmasOrden(id: string): Observable<FirmaOrdenTrabajo[]> {
    return this.http
      .get<RespuestaApi<FirmaOrdenTrabajo[]>>(
        `${this.apiSolicitud}/orden-trabajo/${id}/firmas`,
      )
      .pipe(map((res) => res.data ?? []));
  }

  deshabilitarOrden(id: string): Observable<any> {
    return this.http.patch<any>(`${this.apiSolicitud}/orden-trabajo/${id}/disable`, {});
  }
}
