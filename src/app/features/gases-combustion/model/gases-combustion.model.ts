import { AbstractControl, ValidationErrors } from '@angular/forms';

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
 *
 * Los decimales no se configuran por gas: **todas las columnas calculadas van
 * con dos**, y eso vive en `DECIMALES_CALCULADOS` de la tabla de mediciones.
 */
export const TABLAS_MEDICIONES: ConfigTablaMediciones[] = [
  {
    gas: 'CO',
    titulo: 'CO, ppm',
    familia: 'mezcla',
    grupoCriterio: 'MEZCLA_PPM',
  },
  {
    gas: 'SO2',
    titulo: 'SO2, ppm',
    familia: 'mezcla',
    grupoCriterio: 'MEZCLA_PPM',
  },
  {
    gas: 'NO',
    titulo: 'NO, ppm',
    familia: 'mezcla',
    grupoCriterio: 'MEZCLA_PPM',
  },
  {
    gas: 'O2',
    titulo: 'O2, %',
    familia: 'oxigeno',
    grupoCriterio: 'O2_PORCENTAJE',
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

/**
 * Orden de los grupos en la tabla de control de calidad: mezcla arriba, oxígeno
 * abajo, como en el formato impreso.
 *
 * Va explícito porque los criterios llegan ordenados por `desde` ascendente, y
 * los rangos de oxígeno —6 a 18— son más chicos que los de mezcla —20 a 1000—:
 * dejarlos en el orden de llegada pone el O2 primero.
 */
export const ORDEN_GRUPOS_CRITERIO: GrupoCriterio[] = ['MEZCLA_PPM', 'O2_PORCENTAJE'];

/**
 * Las cinco condiciones de la inspección trimestral de la sonda.
 *
 * Todas se responden sí/no y **el "sí" es la novedad**, no lo normal: la sonda
 * está bien cuando las cinco dan que no. Por eso el rótulo pregunta por el
 * problema y no por el estado.
 *
 * @see faq-monorepo/docs/gases-combustion.md §7.6
 */
export interface CondicionSonda {
  control: string;
  etiqueta: string;
  ayuda: string;
}

export const CONDICIONES_SONDA: CondicionSonda[] = [
  {
    control: 'medidaFluctuaciones',
    etiqueta: 'Fluctuaciones en la medida',
    ayuda: 'Marcar si la medida presenta fluctuaciones. Sin marcar = condición normal',
  },
  {
    control: 'termocuplaContacto',
    etiqueta: 'Termocupla en contacto',
    ayuda: 'Marcar si la termocupla toca las paredes. Sin marcar = condición adecuada',
  },
  {
    control: 'conexionesFugas',
    etiqueta: 'Conexiones o fugas',
    ayuda: 'Marcar si hay conexiones en mal estado o fugas',
  },
  {
    control: 'deformaciones',
    etiqueta: 'Deformaciones',
    ayuda: 'Marcar si la sonda presenta deformaciones visibles',
  },
  {
    control: 'marcasUso',
    etiqueta: 'Marcas de uso',
    ayuda: 'Marcar si la sonda presenta marcas o desgaste por uso',
  },
];

/** Resultado de evaluar una fila contra los criterios de aceptación. */
export type ResultadoCumple = 'SI' | 'NO' | null;

// ── Validadores de las lecturas ────────────────────────────────────────────
// X1 y X2 son concentraciones medidas: no hay lectura negativa ni lectura que no
// sea un número. Y no existe una segunda lectura sin la primera — lo dice el
// CHECK `CK_gases_medicion_pares` de la base, que rechaza la fila entera.

/** Errores que puede devolver `lecturaValida`, para traducirlos en la tabla. */
export const ERRORES_LECTURA = {
  noNumerica: 'lecturaNoNumerica',
  negativa: 'lecturaNegativa',
} as const;

/**
 * Una lectura válida es un número finito y no negativo.
 *
 * **Vacío pasa**: la fila puede estar a medias mientras el analista carga, y X2
 * es opcional por diseño —con una sola lectura, Xmed es X1—. Lo que no puede
 * quedar a medias es el par, y de eso se encarga `parDeLecturas`.
 */
export function lecturaValida(control: AbstractControl): ValidationErrors | null {
  const valor: unknown = control.value;
  if (valor === null || valor === undefined || valor === '') return null;

  const numero = Number(valor);
  if (!Number.isFinite(numero)) return { [ERRORES_LECTURA.noNumerica]: true };
  if (numero < 0) return { [ERRORES_LECTURA.negativa]: true };
  return null;
}

/**
 * X2 sin X1 no existe. Va como validador del grupo y no del control porque
 * necesita ver los dos: el error queda en la fila y la tabla lo pinta sobre X2,
 * que es el campo que sobra.
 */
export function parDeLecturas(grupo: AbstractControl): ValidationErrors | null {
  const vacio = (valor: unknown) => valor === null || valor === undefined || valor === '';
  return vacio(grupo.get('x1')?.value) && !vacio(grupo.get('x2')?.value) ? { x2SinX1: true } : null;
}

// ── Cálculos de la hoja ────────────────────────────────────────────────────
// Las cuatro columnas grises del formulario impreso (Xmed, r95,45%, R95,45% y
// %R) no se digitan: salen de X1, X2, del par XR y del valor nominal del patrón
// elegido. CUMPLE sale de compararlas contra la tabla de control de calidad.
//
// ⚠️ Esto es la contraparte de `gases-combustion.criterio.ts` en
// `api-solicitud`. **Las dos tienen que decir lo mismo**: acá se calcula en
// vivo para dar respuesta inmediata, pero la fuente de verdad de lo que queda
// guardado es el backend. Si divergen, la pantalla y lo persistido se
// contradicen.

/** XMED — promedio de las lecturas; con una sola, es esa misma. */
export function promedio(x1: number | null, x2: number | null): number | null {
  if (x1 === null) return null;
  return x2 === null ? x1 : (x1 + x2) / 2;
}

/** r95,45% observado — |X2 − X1|. Nulo si falta cualquiera de las dos. */
export function repetibilidadObservada(x1: number | null, x2: number | null): number | null {
  if (x1 === null || x2 === null) return null;
  return Math.abs(x2 - x1);
}

/**
 * R95,45% observado — **la misma diferencia que r95,45%**: `|X2 − X1|`.
 *
 * No es un copiar y pegar: es lo que declara el encabezado de la tabla de
 * control de calidad del formato, que escribe la misma fórmula para las dos.
 * Lo que las distingue no es el cálculo sino el límite contra el que se compara
 * cada una: repetibilidad máxima en un caso, reproducibilidad máxima en el otro.
 *
 * Existe como función propia, y no reusando `repetibilidadObservada`, para que
 * el día que el formato adopte el par XR1/XR2 que describe el Anexo 08 (§2.4 del
 * contraste) se cambie acá adentro y nada más.
 */
export function reproducibilidadObservada(x1: number | null, x2: number | null): number | null {
  if (x1 === null || x2 === null) return null;
  return Math.abs(x2 - x1);
}

/**
 * %R — porcentaje de recuperación: el promedio medido contra la concentración
 * nominal del cilindro patrón (el "valor teórico" de la definición).
 *
 * Es la fórmula del libro del Anexo, que busca el cilindro elegido en la tabla
 * de patrones y toma la columna del gas de esa fila:
 *
 *     =IF(B400="";"";E400/VLOOKUP(B400;$A$321:$E$326;4;0))
 *
 * Sin patrón elegido no hay valor teórico y la celda queda en blanco, que es el
 * `null` de acá. El `× 100` no está en la fórmula porque en Excel lo pone el
 * formato de porcentaje de la celda; se multiplica acá para guardar y comparar
 * el número tal como lo escriben los criterios de aceptación (90-110, no
 * 0,90-1,10). El redondeo es solo de presentación.
 */
export function porcentajeRecuperacion(
  xmed: number | null,
  valorTeorico: number | null,
): number | null {
  if (xmed === null || valorTeorico === null || valorTeorico === 0) return null;
  return (xmed / valorTeorico) * 100;
}

/**
 * Fila de criterios cuyo rango contiene al valor, dentro de un grupo.
 *
 * Devuelve `null` cuando el promedio cae en un hueco entre rangos: los del
 * formato están escritos 20–50 y 51–100, así que 50,5 no cae en ninguno. Es la
 * misma decisión del backend, que en ese caso deja el veredicto sin resolver.
 */
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

/** Lo que hace falta para evaluar una fila, ya calculado. */
export interface ObservadosMedicion {
  recuperacion: number | null;
  repetibilidad: number | null;
  reproducibilidad: number | null;
}

/**
 * CUMPLE — el veredicto de una fila contra su criterio.
 *
 * `null` es "no evaluada", que no es lo mismo que "no cumple": la columna se
 * queda vacía en vez de afirmar un NO que todavía nadie puede sostener. Pasa
 * cuando falta el dato con el que se evalúa —sin X1 no hay Xmed, sin criterio
 * no hay contra qué comparar, con el límite en "---" ese gas no se evalúa en
 * ese rango— o cuando el criterio exige veracidad y no hay patrón con el que
 * calcular el %R.
 *
 * Lo que sí se omite sin anular el veredicto son los criterios que el Anexo
 * declara opcionales: la repetibilidad cuando no hay X2 y la reproducibilidad
 * cuando el par XR viene vacío. Se **omiten**, no se dan por buenas.
 */
export function evaluarCumple(
  criterio: CriterioAceptacion | null,
  gas: GasId,
  observados: ObservadosMedicion,
): ResultadoCumple {
  if (!criterio) return null;

  const limiteRepetibilidad = criterio.repetibilidad[gas] ?? null;
  const limiteReproducibilidad = criterio.reproducibilidad[gas] ?? null;
  const rangoVeracidad: RangoVeracidad | null = criterio.veracidad[gas] ?? null;

  // Un límite sin ningún tope es el "---" de la hoja impresa.
  if (limiteRepetibilidad === null && limiteReproducibilidad === null && rangoVeracidad === null) {
    return null;
  }

  const evaluaciones: boolean[] = [];

  if (rangoVeracidad !== null) {
    if (observados.recuperacion === null) return null;
    evaluaciones.push(
      observados.recuperacion >= rangoVeracidad.min &&
        observados.recuperacion <= rangoVeracidad.max,
    );
  }

  if (limiteRepetibilidad !== null && observados.repetibilidad !== null) {
    evaluaciones.push(observados.repetibilidad <= limiteRepetibilidad);
  }

  if (limiteReproducibilidad !== null && observados.reproducibilidad !== null) {
    evaluaciones.push(observados.reproducibilidad <= limiteReproducibilidad);
  }

  // Un criterio con topes pero ninguno aplicable a lo que se digitó tampoco
  // tiene veredicto.
  if (evaluaciones.length === 0) return null;

  return evaluaciones.every(Boolean) ? 'SI' : 'NO';
}

/** Concentración nominal del patrón elegido para ese gas. */
export function valorTeoricoDe(
  patrones: FilaPatron[],
  cilindroId: number | null,
  gas: GasId,
): number | null {
  if (cilindroId === null) return null;
  const patron = patrones.find((fila) => fila.cilindroId === cilindroId);
  return patron?.valores[gas] ?? null;
}
