/**
 * Contratos de la firma electrónica del plan de muestreo.
 * Endpoints en `api_solicitud`: POST /plan-muestreo/:id/firmar,
 * GET /plan-muestreo/:id/firmas y GET /plan-muestreo/:id/pdf.
 */

import {
  DatosFirmaElectronica,
  PosicionFirmaPdf,
} from '../../documentos/firma-electronica.interface';

/** Payload de POST /plan-muestreo/:id/firmar. */
export interface FirmarPlanMuestreoPayload extends DatosFirmaElectronica {
  /**
   * Identidad de quien firma. Va explícita porque `api-solicitud` todavía no
   * tiene guard de autenticación y `request.user` nunca se puebla.
   * TODO(auth): quitar ambos cuando el backend resuelva al usuario del token.
   */
  usuarioId: string;
  nombreFirmante: string;
}

/** Una firma ya estampada, como la devuelve la bitácora. */
export interface FirmaPlanMuestreo {
  id: string;
  /**
   * La bitácora es una sola tabla para todos los formatos
   * (SOLI_DOCUMENTO_FIRMA), así que el documento se identifica con el par
   * tipo + id, no con una columna por entidad.
   */
  tipo_documento: 'PLAN_MUESTREO';
  documento_id: string;
  usuario_id: string;
  nombre_firmante: string;
  cargo?: string | null;
  pagina: number;
  firmado_en: string;
}

/** Respuesta de POST /plan-muestreo/:id/firmar. */
export interface FirmarPlanMuestreoResponse {
  firma: FirmaPlanMuestreo;
  rutaArchivoPdf: string;
  totalFirmas: number;
}
