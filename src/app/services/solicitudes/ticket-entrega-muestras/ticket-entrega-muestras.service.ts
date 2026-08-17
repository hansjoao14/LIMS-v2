import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

import {
  CrearTicketEntregaPayload,
  TicketEntrega,
} from '../../../interfaces/ticket-entrega-muestras/ticket-entrega-muestras.interface';

// Identificador con el que el backend genera el secuencial del ticket de
// entrega (el plan de muestreo usa PM, la orden in situ ORD_AIR / ORD_RDO).
// Quién lo envía es el componente, no este service: ver
// ticket-entrega-muestras-lista.ts. La fila 'TM' de PARA_SECUENCIAL define la
// sigla ("T-IAMQ"), el separador y los dígitos, así que el formato del número
// se cambia en la base y no acá.
export const IDENTIFICADOR_SECUENCIAL_TICKET_ENTREGA = 'TM';

/**
 * Ticket de entrega de muestras — `api-solicitud`, módulo `ticket-entrega`.
 *
 * En el servidor nginx quita el prefijo `/api/solicitud`; en local
 * `environment.api_solicitud` apunta directo al puerto 3114. En ambos casos la
 * ruta se arma igual, siempre desde el environment.
 */
@Injectable({ providedIn: 'root' })
export class TicketEntregaMuestrasService {
  private readonly apiSolicitud = environment.api_solicitud;
  /** El PDF lo emite api-reportes, no api-solicitud. */
  private readonly apiReportes = environment.api_reportes;

  constructor(private http: HttpClient) {}

  crearTicketEntrega(payload: CrearTicketEntregaPayload): Observable<TicketEntrega> {
    return this.http.post<TicketEntrega>(`${this.apiSolicitud}/ticket-entrega`, payload);
  }

  getTicketEntrega(id: string): Observable<TicketEntrega> {
    return this.http.get<TicketEntrega>(`${this.apiSolicitud}/ticket-entrega/${id}`);
  }

  /** Tickets activos de un plan; el más reciente primero. */
  getTicketsPorPlan(idPlanMuestreo: string): Observable<TicketEntrega[]> {
    return this.http.get<TicketEntrega[]>(
      `${this.apiSolicitud}/ticket-entrega/plan-muestreo/${idPlanMuestreo}`,
    );
  }

  deshabilitarTicketEntrega(id: string): Observable<TicketEntrega> {
    return this.http.patch<TicketEntrega>(`${this.apiSolicitud}/ticket-entrega/${id}/disable`, {});
  }

  /**
   * Deja el ticket en "Finalizado Solicitud" (2023) — el backend fija el estado,
   * el front no lo manda. Solo funciona sobre un ticket pendiente: si ya fue
   * resuelto o está dado de baja, responde 400.
   */
  autorizarTicketEntrega(id: string, identificadorSecuencial: string): Observable<TicketEntrega> {
    return this.http.patch<TicketEntrega>(`${this.apiSolicitud}/ticket-entrega/${id}/autorizar`, {
      identificadorSecuencial,
    });
  }

  /** Deja el ticket en "Rechazado" (51). El motivo es obligatorio. */
  rechazarTicketEntrega(id: string, motivo: string): Observable<TicketEntrega> {
    return this.http.patch<TicketEntrega>(`${this.apiSolicitud}/ticket-entrega/${id}/rechazar`, {
      motivo_rechazo: motivo,
    });
  }

  /**
   * Ticket de entrega en el formato F-I-53-01. El backend solo lo emite para
   * tickets finalizados: con uno pendiente o rechazado responde 400.
   */
  getPdfTicketEntrega(id: string): Observable<Blob> {
    return this.http.get(`${this.apiReportes}/report-solicitud/pdf-ticket-entrega/${id}`, {
      responseType: 'blob',
    });
  }
}
