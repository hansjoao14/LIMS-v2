/**
 * Filas de las colecciones de `api-reportes` para gases de combustión.
 *
 * Salen de las seis vistas de `REPORTES`, expuestas como colecciones GraphQL.
 * Es el estándar del sistema: escribir es REST, leer es siempre una vista.
 *
 * ⚠️ **Los decimales llegan como texto.** No hay escalar de GraphQL para
 * `decimal` y pasarlos a `Float` perdería precisión en las concentraciones, así
 * que viajan en `String` y el servicio los parsea. Mismo criterio que
 * `report-valor-calibracion`.
 *
 * @see faq-monorepo/docs/gases-combustion.md §8, "Vistas de reportes"
 */
import { PaginationMeta } from '../catalogos/catalogo.interface';

// ── Capa 1: filas de las colecciones de api-reportes ────────────────────────

/** `vw_gases_combustion_report` — una fila del listado. */
export interface ReportGasesCombustion {
  id: string;
  num_secuencial: string | null;
  secuencial_id: string | null;

  ctformulario_id: number;
  tipo_formulario: string | null;

  analista_id: string | null;
  analista_nombre: string | null;

  anio: number;
  fecha_verificacion: string;
  observaciones: string | null;

  /**
   * Resumen de las mediciones vigentes. Reemplaza a una evaluación global en la
   * cabecera: el Anexo 08 define CUMPLE por fila de medición, no por hoja.
   */
  total_mediciones: number | null;
  mediciones_no_cumplen: number | null;
  primera_medicion: string | null;
  ultima_medicion: string | null;

  /** Cuántas inspecciones de sonda tiene cargadas. */
  total_inspecciones: number | null;

  ctestado_id: number;
  ctestado_nombre: string | null;
  entidad_id: string;
  estado: boolean;
  ruta_archivo_pdf: string | null;

  creado_en: string;
  creado_por: string;
  actualizado_en: string | null;
  actualizado_por: string | null;
}

/** `vw_gases_patron_report` — una fila de la tabla de patrones de una hoja. */
export interface ReportGasesPatron {
  id: string;
  gases_combustion_id: string;
  cilindro_id: number;
  etiqueta: string | null;
  familia: string | null;
  codigo_patron: string;
  vencimiento_patron: string;
  codigo_vencimiento: string;
  valor_no: string | null;
  valor_co: string | null;
  valor_so2: string | null;
  valor_o2: string | null;
  orden: number;
  estado: boolean;
}

/** `vw_gases_medicion_report` — una medición con sus cálculos ya resueltos. */
export interface ReportGasesMedicion {
  id: string;
  gases_combustion_id: string;
  ctgas_id: number;
  gas_sigla: string | null;
  gas_nombre: string | null;
  gases_patron_id: string | null;
  patron_etiqueta: string | null;
  fecha_medicion: string;
  x1: string | null;
  x2: string | null;
  xr1: string | null;
  xr2: string | null;
  xmed: string | null;
  r_observada: string | null;
  rr_observada: string | null;
  porcentaje_recuperacion: string | null;
  valor_teorico: string | null;
  cumple: boolean | null;
  criterio_limite_id: number | null;
  estado_celdas: boolean | null;
  estado_filtros: boolean | null;
  observaciones: string | null;
  realizado_por_id: string | null;
  realizado_por_nombre: string | null;
  revisado_por_id: string | null;
  revisado_por_nombre: string | null;
  orden: number;
  estado: boolean;
}

/** `vw_gases_inspeccion_sonda_report` — una inspección trimestral. */
export interface ReportGasesInspeccionSonda {
  id: string;
  gases_combustion_id: string;
  cttrimestre_id: number;
  trimestre_nombre: string | null;
  trimestre_sigla: string | null;
  fecha_inicio: string;
  fecha_fin: string | null;
  medida_fluctuaciones: boolean | null;
  termocupla_contacto: boolean | null;
  conexiones_fugas: boolean | null;
  deformaciones: boolean | null;
  marcas_uso: boolean | null;
  tiene_novedad: boolean | null;
  ctdiagnostico_id: number | null;
  diagnostico_nombre: string | null;
  observaciones: string | null;
  realizado_por_id: string | null;
  realizado_por_nombre: string | null;
  revisado_por_id: string | null;
  revisado_por_nombre: string | null;
  orden: number;
  estado: boolean;
}

/** `vw_gases_criterio_report` — un rango con sus límites por gas, ya pivotado. */
export interface ReportGasesCriterio {
  id: number;
  grupo: string;
  desde: string;
  hasta: string;
  orden: number | null;
  vigente_desde: string;
  vigente_hasta: string | null;
  estado: boolean;
  repetibilidad_co: string | null;
  repetibilidad_so2: string | null;
  repetibilidad_no: string | null;
  repetibilidad_o2: string | null;
  reproducibilidad_co: string | null;
  reproducibilidad_so2: string | null;
  reproducibilidad_no: string | null;
  reproducibilidad_o2: string | null;
  veracidad_min_co: string | null;
  veracidad_max_co: string | null;
  veracidad_min_so2: string | null;
  veracidad_max_so2: string | null;
  veracidad_min_no: string | null;
  veracidad_max_no: string | null;
  veracidad_min_o2: string | null;
  veracidad_max_o2: string | null;
}

/** `vw_gases_cilindro_report` — un cilindro patrón del catálogo. */
export interface ReportGasesCilindro {
  id: number;
  etiqueta: string;
  familia: string;
  codigo: string;
  vencimiento: string;
  codigo_vencimiento: string;
  vencido: boolean | null;
  valor_no: string | null;
  valor_co: string | null;
  valor_so2: string | null;
  valor_o2: string | null;
  orden: number | null;
  estado: boolean;
}

/** Envoltorio `{ count, data, meta }` de cualquier colección. */
export interface CollectionResponse<T> {
  count: number;
  data: T[];
  meta: PaginationMeta;
}

/** Una página del listado, con su metadata de paginación. */
export interface ReportGasesCombustionPage {
  data: ReportGasesCombustion[];
  meta: PaginationMeta | null;
}

/**
 * Campos por los que se puede buscar. Uno a la vez: el `WhereInput` de la
 * colección no expone OR, así que el selector deja elegir cuál. Mismo criterio
 * que el listado de ticket de entrega y el de plan de muestreo.
 */
export type CampoBusquedaGases = 'num_secuencial' | 'analista_nombre';

/** Columnas ordenables. El `orderBy` de la colección acepta una sola. */
export type CampoOrdenGases =
  'num_secuencial' | 'anio' | 'fecha_verificacion' | 'analista_nombre' | 'ctestado_nombre';
