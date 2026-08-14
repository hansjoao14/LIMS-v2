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

/**
 * Fila del listado. Sale de `collectionReportTicketEntrega` (GraphQL de
 * api-reportes, sobre la vista `REPORTES.vw_ticket_entrega_report`), igual que
 * el listado del plan de muestreo — por eso trae los nombres ya resueltos y no
 * solo los UUID.
 */
export interface ReportTicketEntrega {
  id: string;
  plan_muestreo_id: string;
  plan_num_secuencial: string | null;
  plan_codigo_muestreo: string | null;
  solicitud_id: string;
  solicitud_num_secuencial: string | null;
  ctambiente_id: number;
  ctambiente_nombre: string | null;
  entregado_por_id: string;
  entregado_por_nombre: string | null;
  recibido_por_id: string;
  recibido_por_nombre: string | null;
  fecha_recepcion: string;
  observaciones: string | null;
  num_secuencial: string | null;
  estado: boolean;
  creado_en: string;
  creado_por: string;
  actualizado_en: string | null;
  actualizado_por: string | null;
}

export interface ReportTicketEntregaCollectionResponse {
  count: number;
  data: ReportTicketEntrega[];
  meta: import('../catalogos/catalogo.interface').PaginationMeta;
}

export interface TicketsEntregaPage {
  data: ReportTicketEntrega[];
  meta: import('../catalogos/catalogo.interface').PaginationMeta | null;
}
