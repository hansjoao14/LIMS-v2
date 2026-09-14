import {
  CriterioAceptacion,
  FamiliaPatron,
  FilaPatron,
  GasId,
  GrupoCriterio,
  RangoVeracidad,
} from '../../../interfaces/gases-combustion/gases-combustion.interface';

/**
 * Modelo de presentación del Registro de Verificación de Gases de Combustión.
 *
 * Acá vive lo que es de esta pantalla y no del contrato del API: qué columnas
 * pinta cada tabla, cómo se rotula cada gas y las cuatro cuentas que la hoja
 * hace sola (promedio, repetibilidad observada, recuperación y cumplimiento).
 * Los tipos del API viven en `interfaces/gases-combustion/`.
 */

/** Columna de valores de una tabla de patrones. */
export interface ColumnaPatron {
  gas: GasId;
  etiqueta: string;
}

/** Configuración de una de las dos tablas de patrones. */
export interface ConfigTablaPatrones {
  titulo: string;
  familia: FamiliaPatron;
  columnas: ColumnaPatron[];
}

/** Configuración de la tabla de mediciones de un gas. */
export interface ConfigTablaMediciones {
  gas: GasId;
  titulo: string;
  /** De qué tabla de patrones salen las opciones de la columna "No. GAS". */
  familia: FamiliaPatron;
  /** Grupo de criterios contra el que se evalúa CUMPLE. */
  grupoCriterio: GrupoCriterio;
  /** Decimales con los que se muestran los valores calculados. */
  decimales: number;
}

/** MEZCLA, ppm — un cilindro certificado para NO, CO y SO2. */
export const TABLA_PATRONES_MEZCLA: ConfigTablaPatrones = {
  titulo: 'Mezcla, ppm',
  familia: 'mezcla',
  columnas: [
    { gas: 'NO', etiqueta: 'NO' },
    { gas: 'CO', etiqueta: 'CO' },
    { gas: 'SO2', etiqueta: 'SO2' },
  ],
};

/** OXÍGENO, % — cilindro aparte, con un solo gas. */
export const TABLA_PATRONES_OXIGENO: ConfigTablaPatrones = {
  titulo: 'Oxígeno, %',
  familia: 'oxigeno',
  columnas: [{ gas: 'O2', etiqueta: 'O2' }],
};

/**
 * Las cuatro tablas de mediciones, en el orden de la hoja impresa. El O2 usa
 * los patrones de oxígeno y su propio grupo de criterios.
 */
export const TABLAS_MEDICIONES: ConfigTablaMediciones[] = [
  {
    gas: 'CO',
    titulo: 'CO, ppm',
    familia: 'mezcla',
    grupoCriterio: 'MEZCLA_PPM',
    decimales: 2,
  },
  {
    gas: 'SO2',
    titulo: 'SO2, ppm',
    familia: 'mezcla',
    grupoCriterio: 'MEZCLA_PPM',
    decimales: 2,
  },
  {
    gas: 'NO',
    titulo: 'NO, ppm',
    familia: 'mezcla',
    grupoCriterio: 'MEZCLA_PPM',
    decimales: 2,
  },
  {
    gas: 'O2',
    titulo: 'O2, %',
    familia: 'oxigeno',
    grupoCriterio: 'O2_PORCENTAJE',
    decimales: 3,
  },
];

/** Orden de los gases en las cabeceras de la tabla de control de calidad. */
export const GASES_CONTROL_CALIDAD: ColumnaPatron[] = [
  { gas: 'CO', etiqueta: 'CO' },
  { gas: 'SO2', etiqueta: 'SO2' },
  { gas: 'NO', etiqueta: 'NO' },
  { gas: 'O2', etiqueta: 'O2' },
];

/** Rótulo del grupo de rangos, en la primera columna de control de calidad. */
export const ETIQUETA_GRUPO_CRITERIO: Record<GrupoCriterio, string> = {
  MEZCLA_PPM: 'Mezcla ppm',
  O2_PORCENTAJE: 'O2 %',
};

/** Resultado de evaluar una fila contra los criterios de aceptación. */
export type ResultadoCumple = 'SI' | 'NO' | null;

// ── Cálculos de la hoja ────────────────────────────────────────────────────
// Las tres columnas grises del formulario impreso (Xmed, r95,45% y %R) no se
// digitan: salen de X1, X2 y del valor nominal del patrón elegido. CUMPLE sale
// de compararlas contra la tabla de control de calidad.

/** XMED — promedio de los dos valores medidos. */
export function promedio(x1: number | null, x2: number | null): number | null {
  if (x1 === null || x2 === null) return null;
  return (x1 + x2) / 2;
}

/** r95,45% observado — diferencia absoluta entre los dos valores medidos. */
export function repetibilidadObservada(x1: number | null, x2: number | null): number | null {
  if (x1 === null || x2 === null) return null;
  return Math.abs(x2 - x1);
}

/**
 * %R — porcentaje de recuperación: el promedio medido contra la concentración
 * nominal del cilindro patrón (el "valor teórico" de la definición).
 */
export function porcentajeRecuperacion(
  xmed: number | null,
  valorTeorico: number | null,
): number | null {
  if (xmed === null || valorTeorico === null || valorTeorico === 0) return null;
  return (xmed / valorTeorico) * 100;
}

/** Fila de criterios cuyo rango contiene al valor, dentro de un grupo. */
export function buscarCriterio(
  criterios: CriterioAceptacion[],
  grupo: GrupoCriterio,
  valor: number | null,
): CriterioAceptacion | null {
  if (valor === null) return null;
  return (
    criterios.find(
      (criterio) => criterio.grupo === grupo && valor >= criterio.desde && valor <= criterio.hasta,
    ) ?? null
  );
}

/**
 * CUMPLE — la fila pasa cuando la repetibilidad y la reproducibilidad
 * observadas no superan su límite y el %R cae dentro del rango de veracidad.
 * Devuelve `null` mientras falte un dato: la columna se queda vacía en vez de
 * afirmar un "NO" que todavía nadie puede sostener.
 */
export function evaluarCumple(
  criterio: CriterioAceptacion | null,
  gas: GasId,
  repetibilidad: number | null,
  reproducibilidad: number | null,
  recuperacion: number | null,
): ResultadoCumple {
  if (!criterio || recuperacion === null || repetibilidad === null) return null;

  const limiteRepetibilidad = criterio.repetibilidad[gas] ?? null;
  const limiteReproducibilidad = criterio.reproducibilidad[gas] ?? null;
  const rangoVeracidad: RangoVeracidad | null = criterio.veracidad[gas] ?? null;
  if (limiteRepetibilidad === null || rangoVeracidad === null) return null;

  const pasaRepetibilidad = repetibilidad <= limiteRepetibilidad;
  const pasaReproducibilidad =
    limiteReproducibilidad === null || reproducibilidad === null
      ? true
      : reproducibilidad <= limiteReproducibilidad;
  const pasaVeracidad = recuperacion >= rangoVeracidad.min && recuperacion <= rangoVeracidad.max;

  return pasaRepetibilidad && pasaReproducibilidad && pasaVeracidad ? 'SI' : 'NO';
}

/** Concentración nominal del patrón elegido para ese gas. */
export function valorTeoricoDe(
  patrones: FilaPatron[],
  patronId: string,
  gas: GasId,
): number | null {
  const patron = patrones.find((fila) => fila.patronId === patronId);
  return patron?.valores[gas] ?? null;
}
