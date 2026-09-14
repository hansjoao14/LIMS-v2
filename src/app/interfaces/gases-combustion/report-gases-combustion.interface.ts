/**
 * Contrato del listado de Gases de Combustión.
 *
 * Sale de `REPORTES.vw_gases_combustion_report`, expuesta como colección
 * GraphQL desde `api-reportes`. Es el estándar del sistema: escribir es REST,
 * listar es siempre una vista paginada en servidor.
 *
 * Los tipos derivados (la página, los campos de orden y de búsqueda) van junto
 * al contrato del que derivan, no en el servicio que los usa.
 *
 * ⚠️ No trae procedimiento ni código de equipo: son fijos del formato, iguales
 * en todas las filas, y salen del catálogo padre "Formato Gases de Combustión".
 */
import { PaginationMeta } from '../catalogos/catalogo.interface';

/** Una fila del listado, tal como la devuelve la vista. */
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

/** Una página del listado, con su metadata de paginación. */
export interface ReportGasesCombustionPage {
  data: ReportGasesCombustion[];
  meta: PaginationMeta;
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
