/** Rectángulo de firma en coordenadas PDF: puntos y origen inferior izquierdo. */
export interface PosicionFirmaPdf {
  pagina: number;
  x: number;
  y: number;
  ancho: number;
  alto: number;
}

/** Datos genéricos que produce el modal para firmar cualquier documento. */
export interface DatosFirmaElectronica {
  archivoP12Base64: string;
  passwordP12: string;
  cargo?: string;
  posicionFirma: PosicionFirmaPdf;
}

/**
 * Campo del modal al que apunta un error devuelto por el firmador.
 *
 * Permite señalar el paso concreto que el usuario debe corregir en vez de
 * mostrar un mensaje suelto sin contexto.
 */
export type CampoFirmaElectronica = 'posicion' | 'certificado' | 'password' | 'general';

/** Error de firma que el contenedor devuelve al modal para que lo muestre. */
export interface ErrorFirmaElectronica {
  mensaje: string;
  campo: CampoFirmaElectronica;
}
