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
}
