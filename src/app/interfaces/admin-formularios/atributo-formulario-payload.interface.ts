import { ReportAtributoFormulario } from './report-atributo-formulario.interface';

export class AtributoFormularioPayload {
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

  constructor(formularioId: string, source?: ReportAtributoFormulario) {
    this.formulario_id          = source?.formulario_id ?? formularioId;
    this.nombre                 = source?.atributo_formulario_nombre ?? '';
    this.pregunta               = source?.atributo_formulario_pregunta ?? '';
    this.ayuda                  = source?.atributo_formulario_ayuda ?? '';
    this.cttipo_dato_id         = source?.ctipo_dato_id ? Number(source.ctipo_dato_id) : 0;
    this.ctipo_respuesta_id     = source?.ctipo_respuesta_id ? Number(source.ctipo_respuesta_id) : 0;
    this.orden                  = source?.orden ?? 1;
    this.catalogo_id            = source?.catalogo_id ? Number(source.catalogo_id) : null;
    this.jornada_id             = source?.jornada_id ?? '';
    this.atributo_id            = source?.atributo_id ?? '';
    this.item_catalogo_id       = source?.item_catalogo_id ?? '';
    this.num_caracter           = source?.num_caracter ?? null;
    this.num_rango              = source?.num_rango ?? null;
    this.num_atras              = source?.num_atras ?? null;
    this.num_adelante           = source?.num_adelante ?? null;
    this.is_dependent           = String(source?.is_dependent) === 'true';
    this.is_dependent_catalogo  = String(source?.is_dependent_catalogo) === 'true';
  }
}
