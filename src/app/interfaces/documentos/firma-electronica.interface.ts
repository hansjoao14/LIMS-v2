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
