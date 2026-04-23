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
  formulario_id: string;
  formulario_nombre: string;
  id_solicitud: string;
  nombres_completos: string;
  num_secuencial: string | null;
  periodo_id: number;
  periodo_nombre: string;
  secuencial_id: string | null;
  usuario_actualizacion: string | null;
  usuario_creacion: string;
  usuario_id: string;
  usuario_nombre: string;
}

export interface ReportSolicitudCollectionResponse {
  data: ReportSolicitud[];
  count: number;
  meta: PaginationMeta;
}
