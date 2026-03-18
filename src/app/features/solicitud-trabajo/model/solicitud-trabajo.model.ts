export interface JornadaItem {
  dia_laboral: string;
  hora_inicio: string;
  hora_fin: string;
}

export interface CatalogoItem {
  nombre: string;
  id: number;
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
  atributo_id: string | null;      // ID de la pregunta de la que depende
  item_catalogo_id: string | null; // Valor que dispara la visibilidad
  is_dependent: boolean | null;
  is_ws_sri: boolean;
  is_ws_civil: boolean;
}

export interface UserSession {
  nombreCompleto: string;
  cargo: string;
  jefatura: string;
  idJefatura: number;
  // Otros datos del login...
}