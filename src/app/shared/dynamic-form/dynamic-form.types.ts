/**
 * Contrato de la API de formularios dinámicos.
 *
 * GET /api/reportes/report-parametro/formulario-dinamico/:idFormulario
 *
 * Estos tipos describen lo que devuelve el backend y los comparten todos los
 * módulos con formulario configurable (solicitud de trabajo, plan de muestreo,
 * orden in situ, horarios laborales, por contraloría). Ver
 * `docs/formularios-dinamicos-estandar.md` §2 y `ESTANDARES.md` §7.1.
 */

export interface JornadaItem {
  jornada_id: string;
  fecha_plan: string;
  inicio_bloque: string;
  fin_bloque: string;
  estado_ocupacion: string;
  es_planificable: boolean;
}

export interface CatalogoItem {
  nombre: string;
  id: number;
}

export interface EmpleadoItem {
  nombre_empleado: string;
  empleado_id: string;
}

export interface Pregunta {
  id: string;
  nombre: string;
  pregunta: string;
  orden: number;
  tipo_respuesta: string;
  tipo_respuesta_id: number;
  tipo_pregunta: string;
  obligatorio: boolean;
  readonly: boolean;
  hidden: boolean;
  num_caracter: number | null;
  ayuda: string | null;
  /** Catálogo del que salen las opciones; permite releerlo con sus `valor`. */
  catalogo_id?: number | null;
  catalogos: CatalogoItem[] | null;
  jornada_laboral_item: JornadaItem[] | null;
  atributo_id: string | null; // ID de la pregunta de la que depende
  item_catalogo_id: string | null; // Valor que dispara la visibilidad
  is_dependent: boolean | null;
  is_text_area?: boolean;
  is_list_empleado?: boolean;
  listado_empleado?: EmpleadoItem[];
  is_ws_sri: boolean;
  is_ws_civil: boolean;
  is_ws_iess?: boolean;
  estado?: boolean;
  multivaluado?: boolean;
  num_rango?: number | null;
  num_atras?: number | null;
  num_adelante?: number | null;
  is_dependent_catalogo?: boolean | null;
  // Agrupación configurada en BD: `seccion` reparte las preguntas entre los
  // pasos del formulario y `grupo_texto` entre las tarjetas de cada paso.
  seccion?: number | null;
  grupo_texto?: string | null;
  grupo_numerico?: number | null;
  is_search?: boolean;
}

export interface FormularioLaboratorio {
  formulario_nombre: string;
  formulario_id: string;
  tipo_formulario: string;
  tipo_formulario_id: number;
  preguntas: Pregunta[];
}
