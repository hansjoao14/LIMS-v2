import { PaginationMeta } from '../../catalogos';

export interface ReportSolicitud {
  ctestado_id: number;
  descripcion_solicitud: string;
  establecimiento_id: string;
  establecimiento_nombre: string;
  estado_logico_solicitud: boolean;
  estado_solicitud: string;
  fecha_actualizacion: string | null;
  fecha_creacion: string;
  formulario_ct_id: number | null;
  formulario_id: string;
  formulario_nombre: string;
  id_solicitud: string;
  nombres_completos: string;
  num_secuencial: string | null;
  periodo_id: number;
  periodo_nombre: string;
  prioridad_id: number | null;
  prioridad_nombre: string | null;
  secuencial_id: string | null;
  tecnico_id: string;
  tipo_formulario_id: number;
  usuario_actualizacion: string | null;
  usuario_creacion: string;
  usuario_id: string;
  usuario_nombre: string;
}

export interface ReportValorSolicitud {
  atributo_formulario_id: string;
  atributo_formulario_nombre: string;
  atributo_formulario_pregunta: string;
  atributo_id: string | null;
  ctipo_dato_nombre: string;
  fecha_creacion: string;
  id_solicitud: string;
  item_catalogo_id: string | null;
  nombres_completos: string;
  valor_catalogo: string | null;
  valor_texto: string | null;
  valor_numero: number | null;
  valor_fecha: string | null;
  valor_booleano: boolean | null;
  valor_multiple: string | null;
  valor_solicitud_id: string;
}

export interface ReportValorSolicitudCollectionResponse {
  data: ReportValorSolicitud[];
  count: number;
  meta?: PaginationMeta;
}

export interface ReportSolicitudCollectionResponse {
  data: ReportSolicitud[];
  count: number;
  meta: PaginationMeta;
}

export interface ReportSolicitudEnsayo {
  actualizado_en: string | null;
  actualizado_por: string | null;
  analisis: string;
  creado_en: string;
  creado_por: string;
  ctambiental_id: string;
  ctipo_ambiental_nombre: string;
  ensayo_id: string;
  estado: string;
  id: string;
  identificacion: string;
  metodo: string;
  solicitud_id: string;
}

export interface ReportSolicitudEnsayoCollectionResponse {
  count: number;
  data: ReportSolicitudEnsayo[];
  meta?: import('../../catalogos/catalogo.interface').PaginationMeta;
}
