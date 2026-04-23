export interface ReportAtributoFormulario {
  actualizado_en_atributo_formulario: string | null;
  actualizado_por: string | null;
  atributo_formulario_ayuda: string | null;
  atributo_formulario_id: string;
  atributo_formulario_nombre: string;
  atributo_formulario_pregunta: string;
  atributo_id: string | null;
  catalogo_id: number | null;
  creado_en_atributo_formulario: string;
  creado_por_atributo_formulario: string;
  ctipo_dato_id: number;
  ctipo_dato_nombre: string;
  ctipo_respuesta_id: number;
  ctipo_respuesta_nombre: string;
  estado_atributo_formulario: boolean;
  formulario_descripcion: string | null;
  formulario_estado: boolean;
  formulario_fecha_emision: string;
  formulario_id: string;
  formulario_nombre: string;
  formulario_sigla: string;
  formulario_version: number;
  hidden: string;
  is_dependent: boolean | null;
  is_dependent_catalogo: boolean | null;
  is_ws_civil: boolean;
  is_ws_iess: boolean;
  is_ws_sri: boolean;
  item_catalogo_id: string | null;
  jornada_id: string | null;
  jornada_nombre: string | null;
  multivaluado: boolean;
  num_adelante: number | null;
  num_atras: number | null;
  num_caracter: number | null;
  num_rango: number | null;
  obligatorio: boolean;
  orden: number;
  readonly: string;
  tipo_formulario: string;
}

export interface ReportAtributoFormularioCollectionResponse {
  count: number;
  data: ReportAtributoFormulario[];
}
