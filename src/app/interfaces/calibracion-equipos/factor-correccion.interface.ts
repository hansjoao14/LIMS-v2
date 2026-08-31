/**
 * Una fila de la tabla "Factores de corrección" del F-PEE-11-02, tal como está
 * en `src/app/data/factores_de_correccion.json`.
 *
 * Es la hoja del mismo nombre del archivo Excel: una fila por equipo, año de
 * calibración y nivel verificado, con los factores y la tolerancia que el
 * certificado le asigna a esa combinación.
 */
export interface FactorCorreccion {
  /** Certificado de calibración del que sale la fila (`CQC-0959-003-24`). */
  certificado: string;
  /** Fecha del certificado, `yyyy-MM-dd`. */
  fechaCalibracion: string;
  /** Código del equipo, como está en el catálogo (`A-21-45`, `IMD-21-07`). */
  equipo: string;
  /** Nivel verificado, en dB (94, 114, …). */
  nivel: number;
  /**
   * Clave de búsqueda: año de calibración + código de equipo + nivel, pegados
   * sin separador (`2024A-21-45114`).
   *
   * Es exactamente la que arma el `VLOOKUP` del formato:
   * `YEAR(E17) & E15 & ROUND(E24,0)`.
   */
  id: string;
  /** Factor de corrección ascendente. */
  fca: number | null;
  /** Factor de corrección descendente. */
  fcd: number | null;
  /** El mayor de los dos factores, en valor absoluto. */
  fcmax: number | null;
  /** Tolerancia admitida para ese equipo y nivel, en dB. */
  tolerancia: number | null;
  histeresis: number | null;
  incertidumbre: number | null;
  fechaReferencia: string;
}
