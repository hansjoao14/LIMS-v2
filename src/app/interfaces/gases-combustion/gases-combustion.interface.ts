/**
 * Contrato del Registro de Verificación de Gases de Combustión (F-PEE-07-01).
 *
 * Solo tipos: las constantes de runtime del módulo viven en el servicio
 * (`services/gases-combustion/`) y las de presentación en
 * `features/gases-combustion/model/`.
 */

/**
 * Gas verificado. Es la clave con la que se cruzan las tres partes del
 * formulario: el patrón declara su concentración nominal por gas, el criterio
 * de aceptación declara sus límites por gas y la medición se registra por gas.
 */
export type GasId = 'CO' | 'SO2' | 'NO' | 'O2';

/** Familia de patrones. La mezcla cubre NO/CO/SO2; el oxígeno va aparte. */
export type FamiliaPatron = 'mezcla' | 'oxigeno';

/** Grupo de la tabla de criterios de aceptación (control de calidad). */
export type GrupoCriterio = 'MEZCLA_PPM' | 'O2_PORCENTAJE';

/** Valor por gas. Un gas ausente en el mapa no aplica a esa fila. */
export type ValoresPorGas<T> = Partial<Record<GasId, T | null>>;

/** Rango cerrado de veracidad, en porcentaje de recuperación. */
export interface RangoVeracidad {
  min: number;
  max: number;
}

/**
 * Metadata propia de la hoja: la franja de procedimiento, equipo y año.
 *
 * ⚠️ El código del formato, la edición y la fecha de emisión **no están acá**.
 * Viven en `PARAMETRIZACION.PARA_FORMULARIO` y se leen con el estándar del
 * sistema: `ReportFormularioService.getFormularioByCTId()` sobre
 * `collectionReportFormulario`. Es lo mismo que hace `ticket-entrega-muestras`.
 */
export interface GasesCombustionMetadata {
  procedimiento: string;
  codigoEquipo: string;
  anio: number;
}

/**
 * Patrón disponible en catálogo (cilindro de gas certificado). `valores` es la
 * concentración nominal del cilindro: es el "valor teórico" contra el que se
 * calcula el porcentaje de recuperación de cada medición.
 */
export interface PatronGas {
  id: string;
  etiqueta: string;
  familia: FamiliaPatron;
  codigo: string;
  vencimiento: string;
  valores: ValoresPorGas<number>;
}

/** Catálogo de patrones separado por familia, tal como lo consumen las tablas. */
export interface CatalogoPatrones {
  mezcla: PatronGas[];
  oxigeno: PatronGas[];
}

/**
 * Fila registrada en una de las dos tablas de patrones. El código y las
 * concentraciones se precargan del catálogo, pero quedan editables: el
 * certificado del cilindro manda sobre el catálogo.
 */
export interface FilaPatron {
  patronId: string;
  codigoVencimiento: string;
  valores: ValoresPorGas<number>;
}

/**
 * Fila de la tabla de criterios de aceptación. Los límites son de la norma, no
 * los digita el usuario: la pantalla los muestra en solo lectura y los usa para
 * evaluar la columna CUMPLE de cada medición.
 */
export interface CriterioAceptacion {
  id: string;
  grupo: GrupoCriterio;
  desde: number;
  hasta: number;
  repetibilidad: ValoresPorGas<number>;
  reproducibilidad: ValoresPorGas<number>;
  veracidad: ValoresPorGas<RangoVeracidad>;
}

/** Definición mostrada bajo la tabla de control de calidad. */
export interface DefinicionGases {
  id: string;
  texto: string;
}

/** Una medición de la tabla del gas correspondiente. */
export interface MedicionGas {
  id: string | null;
  fecha: string;
  patronId: string;
  x1: number | null;
  x2: number | null;
  /**
   * Reproducibilidad observada. No se deriva de X1/X2 de la misma fila —
   * compara corridas distintas—, así que se digita.
   */
  reproducibilidad: number | null;
  estadoCeldas: string;
  estadoFiltros: string;
  observaciones: string;
  realizadoPor: string;
  revisadoPor: string;
}

/** Bloque de mediciones de un gas, con el toggle de si el gas aplica. */
export interface BloqueMediciones {
  gas: GasId;
  aplica: boolean;
  filas: MedicionGas[];
}

/** Registro completo tal como lo devuelve el API para precargar la pantalla. */
export interface RegistroGasesCombustion {
  id: string | null;
  patronesMezcla: FilaPatron[];
  patronesOxigeno: FilaPatron[];
  bloques: BloqueMediciones[];
}

/** Cuerpo del POST/PUT al guardar la verificación. */
export interface GuardarGasesCombustionPayload {
  id: string | null;
  patronesMezcla: FilaPatron[];
  patronesOxigeno: FilaPatron[];
  bloques: BloqueMediciones[];
}

/** Respuesta del guardado. */
export interface GuardarGasesCombustionResponse {
  id: string;
  mensaje: string;
}
