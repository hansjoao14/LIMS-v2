import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

// Contrato de POST /plan-muestreo/create-detalle: mismo esquema que la orden
// de trabajo in situ (cabecera + detalle de ensayos + respuestas del
// formulario dinámico), con la salvedad de que la tercera llave se llama
// `valorMuestreo`, no `valorPlanMuestreo`.

export interface PlanMuestreoPayload {
  solicitud_id: string;
  usuario_id: string;
  entidad_id: string;
  ctambiente_id: number;
  periodo_id: number;
  secuencial_id: string | null;
  num_secuencial: string | null;
  ctestado_id: number;
  estado: boolean;
  ctformulario_id: number;
}

export interface PlanMuestreoDetallePayload {
  estado: boolean;
  ctambiental_id: number;
  ensayo_id: number;
  cttipo_ensayo_id: number;
}

// A diferencia de ValorOrdenTrabajoPayload, este DTO no admite `valor_uuid`:
// el backend rechaza la propiedad (forbidNonWhitelisted).
export interface ValorMuestreoPayload {
  atributo_formulario_id: string;
  valor_texto: string | null;
  valor_numero: number | null;
  valor_fecha: string | null;
  valor_booleano: boolean | null;
  valor_multiple: string | null;
  estado: boolean;
  valor_catalogo: number;
}

export interface CrearPlanMuestreoConDetallePayload {
  planMuestreo: PlanMuestreoPayload;
  planMuestreoDetalle: PlanMuestreoDetallePayload[];
  valorMuestreo: ValorMuestreoPayload[];
}

// Ojo: este DTO sí tiene los nombres bien escritos, a diferencia del de la
// orden de trabajo (`idOrden` / `identifcadorSecuecnial`). Los mensajes de
// error del backend todavía citan los nombres viejos, pero las llaves que
// valida son estas.
export interface FinalizarPlanMuestreoPayload {
  idPlanMuestreo: string;
  identificadorSecuencial: string;
  ctestado: number;
}

// Identificador con el que el backend genera el secuencial del plan de
// muestreo (la orden in situ usa ORD_AIR / ORD_RDO).
export const IDENTIFICADOR_SECUENCIAL_PLAN_MUESTREO = 'PM';


@Injectable({ providedIn: 'root' })
export class PlanMuestreoService {
  private readonly apiSolicitud = environment.api_solicitud;
  private readonly apiReportes = environment.api_reportes;

  constructor(private http: HttpClient) {}

  crearPlanMuestreoConDetalle(payload: CrearPlanMuestreoConDetallePayload): Observable<any> {
    return this.http.post<any>(`${this.apiSolicitud}/plan-muestreo/create-detalle`, payload);
  }

  /** Autoriza el plan y le asigna el secuencial. */
  finalizarPlan(payload: FinalizarPlanMuestreoPayload): Observable<any> {
    return this.http.post<any>(`${this.apiSolicitud}/plan-muestreo/finalizar`, payload);
  }

  deshabilitarPlan(id: string): Observable<any> {
    return this.http.patch<any>(`${this.apiSolicitud}/plan-muestreo/${id}/disable`, {});
  }

  getPdfPlanMuestreo(id: string): Observable<Blob> {
    return this.http.get(`${this.apiReportes}/report-solicitud/pdf-plan-muestreo/${id}`, {
      responseType: 'blob',
    });
  }
}
