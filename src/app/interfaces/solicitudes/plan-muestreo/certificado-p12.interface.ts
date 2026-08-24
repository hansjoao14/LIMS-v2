/** Certificado .p12 guardado en el navegador de quien firma. */
export interface CertificadoP12Guardado {
  id: string;
  /** Nombre del archivo original, para que el usuario reconozca cuál es. */
  nombre: string;
  base64: string;
  /** ISO 8601. */
  guardadoEn: string;
}
