import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

import {
  CrearTicketEntregaPayload,
  TicketEntrega,
} from '../../../interfaces/ticket-entrega-muestras/ticket-entrega-muestras.interface';

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
  autorizarTicketEntrega(id: string): Observable<TicketEntrega> {
    return this.http.patch<TicketEntrega>(
      `${this.apiSolicitud}/ticket-entrega/${id}/autorizar`,
      {},
    );
  }

  /** Deja el ticket en "Rechazado" (51). El motivo es obligatorio. */
  rechazarTicketEntrega(id: string, motivo: string): Observable<TicketEntrega> {
    return this.http.patch<TicketEntrega>(`${this.apiSolicitud}/ticket-entrega/${id}/rechazar`, {
      motivo_rechazo: motivo,
    });
  }
}
