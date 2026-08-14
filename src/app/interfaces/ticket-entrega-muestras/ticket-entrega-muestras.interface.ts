/** Una fila de la tabla de preservación del ticket de entrega de muestras. */
export interface PreservacionRow {
  preservacion: string;
  volumen: string;
  tipoRecipiente: string;
}

/**
 * Body de `POST /ticket-entrega`.
 *
 * El backend valida con `forbidNonWhitelisted: true`: una propiedad de más
 * devuelve 400, así que este tipo tiene exactamente los campos que acepta
 * `CreateSolicitudSoliTicketEntregaDto`.
 */
export interface CrearTicketEntregaPayload {
  plan_muestreo_id: string;
  /** Técnico que hizo el muestreo: sale de `usuario_id` del plan elegido. */
  entregado_por_id: string;
  /** Quien recibe en laboratorio: el usuario logueado. */
  recibido_por_id: string;
  /** ISO 8601, tal como lo exige `@IsDateString()` en el backend. */
  fecha_recepcion: string;
  observaciones?: string | null;
}

/** Ticket ya persistido, tal como lo devuelve el API. */
export interface TicketEntrega {
  id: string;
  plan_muestreo_id: string;
  entregado_por_id: string;
  recibido_por_id: string;
  fecha_recepcion: string;
  observaciones: string | null;
  num_secuencial: string | null;
  estado: boolean;
}
