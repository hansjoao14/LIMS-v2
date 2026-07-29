import { PaginationMeta } from '../../catalogos/catalogo.interface';

// Ojo: en ReportMuestreoDataType `ctambiente_id` y `periodo_id` llegan como
// String, a diferencia de ReportOrdenDataType donde son Int.
export interface ReportPlanMuestreo {
  actualizado_en: string | null;
  actualizado_por: string | null;
  // Se asigna al finalizar el plan: los que siguen en curso lo traen en null.
  codigo_muestreo: string | null;
  creado_en: string;
  creado_por: string;
  ctambiente_id: string;
  ctambiente_nombre: string;
  ctestado_id: number;
  ctestado_nombre: string;
  ctformulario_id: number;
  ctformulario_nombre: string | null;
  entidad_id: string;
  entidad_nombre: string;
  estado: boolean;
  id: string;
  num_secuencial: string | null;
  periodo_anio: string;
  periodo_id: string;
  periodo_nombre_mes: string;
  solicitud_id: string;
  solicitud_num_secuencial: string | null;
  usuario_id: string;
  usuario_nombre_completo: string;
}

export interface ReportPlanMuestreoCollectionResponse {
  count: number;
  data: ReportPlanMuestreo[];
  meta: PaginationMeta;
}
