/**
 * Contratos de la firma electrónica de una solicitud.
 * Endpoints en `api_solicitud`: POST /solicitud/:id/firmar,
 * GET /solicitud/:id/firmas y GET /solicitud/:id/pdf.
 *
 * Vive en `solicitud-trabajo` y no dentro de un feature porque el recurso es la
 * solicitud, no la pantalla: sirve a todos los formularios que se guardan en
 * SOLI_SOLICITUD — `horarios-laborales` (1002) y `por-contraloria` (1003)—, que
 * comparten los mismos tres endpoints.
 */

import {
  DatosFirmaElectronica,
  PosicionFirmaPdf,
} from '../../documentos/firma-electronica.interface';

export type { PosicionFirmaPdf };

/** Payload de POST /solicitud/:id/firmar. */
export interface FirmarSolicitudPayload extends DatosFirmaElectronica {
  /**
   * Identidad de quien firma. Va explícita porque `api-solicitud` todavía no
   * tiene guard de autenticación y `request.user` nunca se puebla.
   * TODO(auth): quitar ambos cuando el backend resuelva al usuario del token.
   */
  usuarioId: string;
  nombreFirmante: string;
}

/** Una firma ya estampada, como la devuelve la bitácora. */
export interface FirmaSolicitud {
  id: string;
  /**
   * La bitácora es una sola tabla para todos los formatos
   * (SOLI_DOCUMENTO_FIRMA), así que el documento se identifica con el par
   * tipo + id, no con una columna por entidad.
   */
  tipo_documento: 'SOLICITUD';
  documento_id: string;
  usuario_id: string;
  nombre_firmante: string;
  cargo?: string | null;
  pagina: number;
  firmado_en: string;
}

/** Respuesta de POST /solicitud/:id/firmar. */
export interface FirmarSolicitudResponse {
  firma: FirmaSolicitud;
  rutaArchivoPdf: string;
  totalFirmas: number;
}
