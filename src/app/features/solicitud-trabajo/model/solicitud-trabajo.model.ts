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
}

export interface FormularioLaboratorio {
  formulario_nombre: string;
  formulario_id: string;
  tipo_formulario: string;
  tipo_formulario_id: number;
  preguntas: Pregunta[];
}

export type FieldSectionId =
  | 'identificacion'
  | 'operador'
  | 'ubicacion'
  | 'horario'
  | 'contacto'
  | 'observaciones';

export type FieldControlType = 'text' | 'textarea' | 'select' | 'employee-list' | 'coordinates' | 'schedule';

export interface FieldConfig {
  id: string;
  key: string;
  label: string;
  order: number;
  controlType: FieldControlType;
  section: FieldSectionId;
  placeholder: string;
  required: boolean;
  readonly: boolean;
  hidden: boolean;
  maxLength: number | null;
  options: CatalogoItem[];
  employeeList: EmpleadoItem[];
  scheduleItems: JornadaItem[];
  dependsOn?: {
    fieldId: string;
    triggerValue: string;
  };
  integrations: {
    sri: boolean;
    civil: boolean;
    iess: boolean;
  };
  source: Pregunta;
}
