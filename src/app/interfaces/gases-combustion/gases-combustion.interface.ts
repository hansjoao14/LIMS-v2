/**
 * Contrato del Registro de Verificación de Gases de Combustión (F-PEE-07-01).
 *
 * Tres capas, y conviene no mezclarlas:
 *
 *   1. `Report*` — las filas tal como las devuelven las colecciones de
 *      `api-reportes`. Viven en `report-gases-combustion.interface.ts` y se
 *      reexportan acá por comodidad.
 *   2. Los tipos de pantalla (`FilaPatron`, `MedicionGas`, …) — lo que el
 *      formulario reactivo maneja, ya con los números parseados.
 *   3. `*Payload` — lo que viaja por REST a `api-solicitud`, en snake_case,
 *      calcado de los DTOs que genera Prisma.
 *
 * El servicio traduce entre las tres. Ningún componente ve la capa 1 ni la 3.
 *
 * Solo tipos: las constantes de runtime del módulo viven en el servicio
 * (`services/gases-combustion/`) y las de presentación en
 * `features/gases-combustion/model/`.
 */
import {
  ReportGasesCilindro,
  ReportGasesCriterio,
  ReportGasesInspeccionSonda,
  ReportGasesMedicion,
  ReportGasesPatron,
} from './report-gases-combustion.interface';

export type {
  ReportGasesCilindro,
  ReportGasesCriterio,
  ReportGasesInspeccionSonda,
  ReportGasesMedicion,
  ReportGasesPatron,
};

// ── Vocabulario de la hoja ──────────────────────────────────────────────────

/**
 * Gas verificado. Es la **sigla** del ítem de catálogo, no su id: los ids son
 * IDENTITY y no coinciden entre bases, así que el front cruza por sigla y el
 * servicio resuelve la sigla al `ctgas_id` que corresponda en cada ambiente.
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

// ── Capa 2: lo que maneja la pantalla ───────────────────────────────────────

/**
 * Cilindro patrón certificado, como opción del combo. `valores` es la
 * concentración nominal: el "valor teórico" contra el que se calcula el
 * porcentaje de recuperación de cada medición.
 */
export interface PatronGas {
  id: number;
  etiqueta: string;
  familia: FamiliaPatron;
  codigo: string;
  /** `yyyy-MM-dd`, lista para un `<input type="date">`. */
  vencimiento: string;
  /** Código y vencimiento juntos, como se imprimen en la hoja. */
  codigoVencimiento: string;
  vencido: boolean;
  valores: ValoresPorGas<number>;
}

/** Catálogo de cilindros separado por familia, como lo consumen las tablas. */
export interface CatalogoPatrones {
  mezcla: PatronGas[];
  oxigeno: PatronGas[];
}

/**
 * Fila registrada en una de las dos tablas de patrones.
 *
 * El código y el vencimiento van **separados**: en la base son dos columnas y
 * la hoja los imprime juntos, no al revés. Se copian del cilindro al elegirlo
 * y quedan editables, porque manda el certificado.
 *
 * Las concentraciones no se editan: son del cilindro. Se guardan igual, como
 * copia, para que una corrección del catálogo no cambie un %R ya firmado.
 */
export interface FilaPatron {
  /** `SOLI_GASES_PATRON.id`. `null` mientras la fila no se haya guardado. */
  id: string | null;
  cilindroId: number | null;
  etiqueta: string;
  codigo: string;
  vencimiento: string;
  valores: ValoresPorGas<number>;
}

/**
 * Fila de la tabla de criterios de aceptación. Los límites son de la norma, no
 * los digita el usuario: la pantalla los muestra en solo lectura y los usa para
 * evaluar la columna CUMPLE de cada medición.
 */
export interface CriterioAceptacion {
  id: number;
  grupo: GrupoCriterio;
  desde: number;
  hasta: number;
  repetibilidad: ValoresPorGas<number>;
  reproducibilidad: ValoresPorGas<number>;
  veracidad: ValoresPorGas<RangoVeracidad>;
}

/** Definición mostrada bajo la tabla de control de calidad. */
export interface DefinicionGases {
  id: number;
  texto: string;
}

/** Una medición de la tabla del gas correspondiente. */
export interface MedicionGas {
  /** `SOLI_GASES_MEDICION.id`. `null` mientras la fila no se haya guardado. */
  id: string | null;
  fecha: string;
  /**
   * Cilindro elegido. La pantalla razona en cilindros porque es lo que el
   * analista ve en la columna "No. GAS"; el servicio lo traduce a la fila de
   * patrón de la hoja al armar el payload.
   */
  cilindroId: number | null;
  x1: number | null;
  x2: number | null;
  /** Datos propios de esta medición. */
  observaciones: string;
  realizadoPorId: string | null;
  realizadoPorNombre: string;
  revisadoPorId: string | null;
  revisadoPorNombre: string;
  /** Veredicto que persistió el backend. La tabla lo recalcula en vivo. */
  cumple: boolean | null;
}

/** Bloque de mediciones de un gas. */
export interface BloqueMediciones {
  gas: GasId;
  filas: MedicionGas[];
}

/** Una inspección trimestral de la sonda. */
export interface InspeccionSonda {
  id: string | null;
  cttrimestreId: number | null;
  fechaInicio: string;
  fechaFin: string | null;
  medidaFluctuaciones: boolean | null;
  termocuplaContacto: boolean | null;
  conexionesFugas: boolean | null;
  deformaciones: boolean | null;
  marcasUso: boolean | null;
  ctdiagnosticoId: number | null;
  observaciones: string;
  realizadoPorId: string | null;
  realizadoPorNombre: string;
  revisadoPorId: string | null;
  revisadoPorNombre: string;
}

/** Registro completo con el que se precarga la pantalla. */
export interface RegistroGasesCombustion {
  id: string | null;
  anio: number;
  fechaVerificacion: string;
  observaciones: string;
  ctestadoId: number;
  numSecuencial: string | null;
  /**
   * Quién realizó y quién revisó, **una vez por hoja**: en el formato no son
   * dato de cada medición. En la base sí son columna de cada fila hija, así que
   * el servicio copia el mismo par en todas al guardar.
   */
  realizadoPorId: string | null;
  realizadoPorNombre: string;
  revisadoPorId: string | null;
  revisadoPorNombre: string;
  patronesMezcla: FilaPatron[];
  patronesOxigeno: FilaPatron[];
  bloques: BloqueMediciones[];
  inspecciones: InspeccionSonda[];
}

/**
 * Catálogos de la pantalla, resueltos por **nombre** y no por id: los ids son
 * IDENTITY y no coinciden entre ambientes.
 */
export interface CatalogosGases {
  /** Sigla del gas a su `ctgas_id` en este ambiente. */
  gasesPorSigla: Partial<Record<GasId, number>>;
  /** Franja del formato: se arma con los hijos del catálogo padre. */
  procedimiento: string;
  codigoEquipo: string;
  definiciones: DefinicionGases[];
  trimestres: OpcionCatalogo[];
  diagnosticos: OpcionCatalogo[];
}

/** Ítem de catálogo reducido a lo que necesita un `<select>`. */
export interface OpcionCatalogo {
  id: number;
  nombre: string;
  sigla: string | null;
}

// ── Capa 3: lo que viaja por REST ───────────────────────────────────────────

/**
 * ⚠️ **Los decimales viajan como texto**, no como número.
 *
 * El DTO que genera Prisma valida las columnas `decimal` con `@IsDecimal`, que
 * solo acepta cadenas: un `20.1` numérico lo rechaza con "is not a valid decimal
 * number". Es el mismo criterio con el que las colecciones de GraphQL los
 * devuelven, así que el contrato es simétrico en los dos sentidos.
 */
export interface GasesPatronValorPayload {
  ctgas_id: number;
  valor_nominal: string | null;
}

export interface GasesPatronPayload {
  /** Solo en `update-many`: con id la fila se actualiza conservándolo. */
  id?: string;
  cilindro_id: number;
  codigo_patron: string;
  vencimiento_patron: string;
  orden: number;
  valores: GasesPatronValorPayload[];
}

export interface GasesMedicionPayload {
  ctgas_id: number;
  /**
   * Cuál de los dos se manda lo decide el servicio: `gases_patron_id` cuando la
   * fila de patrón ya existe, `patron_cilindro_id` cuando todavía no, que es el
   * caso al crear la hoja. El backend resuelve el segundo contra los patrones
   * vigentes de esa hoja.
   */
  gases_patron_id?: string | null;
  patron_cilindro_id?: number | null;
  fecha_medicion: string;
  /** Texto, no número: ver `GasesPatronValorPayload`. */
  x1: string | null;
  x2: string | null;
  /**
   * `xr1`/`xr2`, `estado_celdas`/`estado_filtros` y R95,45% no viajan desde
   * esta pantalla. Las observaciones y responsables sí pertenecen a cada fila.
   */
  observaciones: string | null;
  realizado_por_id: string | null;
  revisado_por_id: string | null;
  orden: number;
}

export interface GasesInspeccionSondaPayload {
  cttrimestre_id: number;
  fecha_inicio: string;
  fecha_fin: string | null;
  medida_fluctuaciones: boolean | null;
  termocupla_contacto: boolean | null;
  conexiones_fugas: boolean | null;
  deformaciones: boolean | null;
  marcas_uso: boolean | null;
  ctdiagnostico_id: number | null;
  observaciones: string | null;
  realizado_por_id: string | null;
  revisado_por_id: string | null;
  orden: number;
}

/** Cabecera de la hoja. `cumple` no va: lo calcula el backend. */
export interface GasesCombustionCabeceraPayload {
  ctformulario_id: number;
  usuario_id: string;
  entidad_id: string;
  anio: number;
  fecha_verificacion: string;
  observaciones: string | null;
}

/** `POST /gases-combustion/create-detalle`. */
export interface CrearGasesCombustionDetallePayload {
  gasesCombustion: GasesCombustionCabeceraPayload;
  patrones: GasesPatronPayload[];
  mediciones: GasesMedicionPayload[];
  inspecciones: GasesInspeccionSondaPayload[];
}

/** `PUT /gases-combustion/:id/update-many`. */
export interface ActualizarDetalleGasesPayload {
  patrones: GasesPatronPayload[];
  mediciones: GasesMedicionPayload[];
  inspecciones: GasesInspeccionSondaPayload[];
}

/** `PUT /gases-combustion/:id` — solo la cabecera. */
export type ActualizarCabeceraGasesPayload = Partial<
  Omit<GasesCombustionCabeceraPayload, 'ctformulario_id'>
>;

/** Respuesta de `create-detalle` y de `update-many`. */
export interface GasesCombustionDetalleResponse {
  gasesCombustion: {
    id: string;
    num_secuencial: string | null;
    ctestado_id: number;
  };
  patrones: { id: string; cilindro_id: number; orden: number }[];
  mediciones: { id: string; ctgas_id: number; cumple: boolean | null }[];
  inspecciones: { id: string; cttrimestre_id: number }[];
}

/** `POST /gases-combustion/finalizar`. */
export interface FinalizarGasesPayload {
  idGasesCombustion: string;
  identificadorSecuencial: string;
  ctestado: number;
}

export interface FinalizarGasesResponse {
  secuencialAsignado: string;
  secuencialId: string;
}
