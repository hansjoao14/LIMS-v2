/**
 * Contratos de la firma electrónica de la orden de trabajo in situ.
 * Endpoints en `api_solicitud`: POST /orden-trabajo/:id/firmar,
 * GET /orden-trabajo/:id/firmas y GET /orden-trabajo/:id/pdf.
 */

import { DatosFirmaElectronica } from '../../documentos/firma-electronica.interface';

/** Payload de POST /orden-trabajo/:id/firmar. */
export interface FirmarOrdenTrabajoPayload extends DatosFirmaElectronica {
  /**
   * Identidad de quien firma. Va explícita porque `api-solicitud` todavía no
   * tiene guard de autenticación y `request.user` nunca se puebla.
   * TODO(auth): quitar ambos cuando el backend resuelva al usuario del token.
   */
  usuarioId: string;
  nombreFirmante: string;
}

/** Una firma ya estampada, como la devuelve la bitácora. */
export interface FirmaOrdenTrabajo {
  id: string;
  orden_trabajo_id: string;
  usuario_id: string;
  nombre_firmante: string;
  cargo?: string | null;
  pagina: number;
  firmado_en: string;
}

/** Respuesta de POST /orden-trabajo/:id/firmar. */
export interface FirmarOrdenTrabajoResponse {
  firma: FirmaOrdenTrabajo;
  rutaArchivoPdf: string;
  totalFirmas: number;
}
