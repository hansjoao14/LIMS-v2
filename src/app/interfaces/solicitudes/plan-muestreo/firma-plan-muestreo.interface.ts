/**
 * Contratos de la firma electrónica del plan de muestreo.
 * Endpoints en `api_solicitud`: POST /plan-muestreo/:id/firmar,
 * GET /plan-muestreo/:id/firmas y GET /plan-muestreo/:id/pdf.
 */

/**
 * Rectángulo donde se estampa la firma, en el sistema de coordenadas del PDF:
 * origen abajo-izquierda y unidad = punto (1/72").
 *
 * El navegador trabaja al revés (origen arriba-izquierda, unidad = píxel), así
 * que el visor convierte con `viewport.convertToPdfPoint()` antes de enviar.
 * Mandar coordenadas de pantalla acá deja la firma en otro lado de la hoja.
 */
export interface PosicionFirmaPdf {
  /** 1-indexada, como la ve el usuario. */
  pagina: number;
  x: number;
  y: number;
  ancho: number;
  alto: number;
}

/** Payload de POST /plan-muestreo/:id/firmar. */
export interface FirmarPlanMuestreoPayload {
  /** Certificado .p12 en Base64. No se almacena en el servidor. */
  archivoP12Base64: string;
  /** Solo se usa para abrir el certificado; nunca se persiste. */
  passwordP12: string;
  /**
   * Identidad de quien firma. Va explícita porque `api-solicitud` todavía no
   * tiene guard de autenticación y `request.user` nunca se puebla.
   * TODO(auth): quitar ambos cuando el backend resuelva al usuario del token.
   */
  usuarioId: string;
  nombreFirmante: string;
  /** Texto que aparece bajo la firma; lo elige quien firma. */
  cargo?: string;
  posicionFirma: PosicionFirmaPdf;
}

/** Una firma ya estampada, como la devuelve la bitácora. */
export interface FirmaPlanMuestreo {
  id: string;
  plan_muestreo_id: string;
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

/**
 * Lo que aporta el modal de firma: el certificado, su clave y dónde va la
 * firma. La identidad (`usuarioId`, `nombreFirmante`) la agrega el componente
 * padre desde el `AuthService`, porque el modal no sabe quién está logueado.
 */
export type DatosFirmaElectronica = Pick<
  FirmarPlanMuestreoPayload,
  'archivoP12Base64' | 'passwordP12' | 'cargo' | 'posicionFirma'
>;
