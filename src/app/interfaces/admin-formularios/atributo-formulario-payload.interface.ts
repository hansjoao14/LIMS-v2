export interface AtributoFormularioPayload {
  formulario_id: string;
  nombre: string;
  pregunta: string;
  ayuda: string;
  cttipo_dato_id: number;
  ctipo_respuesta_id: number;
  orden: number;
  catalogo_id: number | null;
  jornada_id: string;
  atributo_id: string;
  item_catalogo_id: string;
  num_caracter: number | null;
  num_rango: number | null;
  num_atras: number | null;
  num_adelante: number | null;
  is_dependent: boolean;
  is_dependent_catalogo: boolean;
}
