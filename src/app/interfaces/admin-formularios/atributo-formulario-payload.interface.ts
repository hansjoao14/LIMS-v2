import { ReportAtributoFormulario } from './report-atributo-formulario.interface';

export class AtributoFormularioPayload {
  formulario_id: string;
  nombre: string;
  pregunta: string;
  ayuda: string;
  cttipo_dato_id: number;
  ctipo_respuesta_id: number;
  multivaluado: boolean;
  obligatorio: boolean;
  orden: number;
  catalogo_id: number | null;
  jornada_id: string | null;
  atributo_id: string | null;
  item_catalogo_id: string | null;
  is_ws_sri: boolean;
  is_ws_civil: boolean;
  is_ws_iess: boolean;
  estado: boolean;
  readonly: boolean;
  hidden: boolean;
  num_caracter: number | null;
  num_rango: number | null;
  num_atras: number | null;
  num_adelante: number | null;
  is_dependent: boolean;
  is_dependent_catalogo: boolean;
  is_list_empleado: boolean;
  is_text_area: boolean;

  constructor(formularioId: string, source?: ReportAtributoFormulario) {
    this.formulario_id          = source?.formulario_id ?? formularioId;
    this.nombre                 = source?.atributo_formulario_nombre ?? '';
    this.pregunta               = source?.atributo_formulario_pregunta ?? '';
    this.ayuda                  = source?.atributo_formulario_ayuda ?? '';
    this.cttipo_dato_id         = source?.ctipo_dato_id ? Number(source.ctipo_dato_id) : 0;
    this.ctipo_respuesta_id     = source?.ctipo_respuesta_id ? Number(source.ctipo_respuesta_id) : 0;
    this.multivaluado           = source?.multivaluado ?? false;
    this.obligatorio            = source?.obligatorio ?? false;
    this.orden                  = source?.orden ?? 1;
    this.catalogo_id            = source?.catalogo_id ? Number(source.catalogo_id) : null;
    this.jornada_id             = source?.jornada_id ?? null;
    this.atributo_id            = source?.atributo_id ?? null;
    this.item_catalogo_id       = source?.item_catalogo_id ?? null;
    this.is_ws_sri              = source?.is_ws_sri ?? false;
    this.is_ws_civil            = source?.is_ws_civil ?? false;
    this.is_ws_iess             = source?.is_ws_iess ?? false;
    this.estado                 = source?.estado_atributo_formulario ?? true;
    this.readonly               = String(source?.readonly) === 'true';
    this.hidden                 = String(source?.hidden) === 'true';
    this.num_caracter           = source?.num_caracter ?? null;
    this.num_rango              = source?.num_rango ?? null;
    this.num_atras              = source?.num_atras ?? null;
    this.num_adelante           = source?.num_adelante ?? null;
    this.is_dependent           = String(source?.is_dependent) === 'true';
    this.is_dependent_catalogo  = String(source?.is_dependent_catalogo) === 'true';
    this.is_list_empleado       = false;
    this.is_text_area           = source?.is_text_area ?? false;
  }
}
