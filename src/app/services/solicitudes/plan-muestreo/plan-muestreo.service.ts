import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../../../environments/environment';

// Contrato de POST /plan-muestreo/create-detalle: mismo esquema que la orden
// de trabajo in situ (cabecera + detalle de ensayos + respuestas del
// formulario dinámico), con la salvedad de que la tercera llave se llama
// `valorMuestreo`, no `valorPlanMuestreo`.

import {
  CrearPlanMuestreoConDetallePayload,
  FinalizarPlanMuestreoPayload,
  PlanMuestreoAtributoDetalle,
  PlanMuestreoDetalle,
  PlanMuestreoDetallePayload,
  PlanMuestreoFormularioDetalle,
  PlanMuestreoGrupoDetalle,
  PlanMuestreoPayload,
  ValorMuestreoPayload,
} from '../../../interfaces/solicitudes/plan-muestreo/plan-muestreo.interface';

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

  /**
   * Rechaza el plan dejándolo en "Rechazado" (51).
   *
   * Usa el PUT de actualización y NO `finalizarPlan`: ese llama al SP
   * sp_generar_secuencial_muestreo, que consume un número de la secuencia PM y
   * asigna un código de muestra. Un plan rechazado no debe gastar ninguno de
   * los dos.
   *
   * El body va parcial a propósito: los demás campos del plan no cambian y el
   * DTO de actualización los tiene todos opcionales (verificado contra el
   * endpoint: un body con solo ctestado_id pasa la validación).
   */
  rechazarPlan(id: string, ctestado: number): Observable<any> {
    return this.http.put<any>(`${this.apiSolicitud}/plan-muestreo/${id}`, {
      ctestado_id: ctestado,
    });
  }

  deshabilitarPlan(id: string): Observable<any> {
    return this.http.patch<any>(`${this.apiSolicitud}/plan-muestreo/${id}/disable`, {});
  }

  /** Detalle completo de un plan ya guardado (cabecera, atributos y ensayos). */
  getPlanMuestreoDetalle(id: string): Observable<PlanMuestreoDetalle> {
    return this.http
      .get<{ message: string; success: boolean; data: PlanMuestreoDetalle }>(
        `${this.apiReportes}/report-solicitud/plan-muestreo/${id}`,
      )
      .pipe(map((res) => res.data));
  }

  getPdfPlanMuestreo(id: string): Observable<Blob> {
    return this.http.get(`${this.apiReportes}/report-solicitud/pdf-plan-muestreo/${id}`, {
      responseType: 'blob',
    });
  }
}
