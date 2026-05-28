export interface ReportOrden {
  actualizado_en: string | null;
  actualizado_por: string | null;
  creado_en: string;
  creado_por: string;
  ctambiente_id: number;
  ctambiente_nombre: string;
  ctcaracteristica_horaria_id: number | null;
  ctcaracteristica_horaria_nombre: string | null;
  ctestado_id: number;
  ctestado_nombre: string;
  ctformulario_id: number;
  ctformulario_nombre: string | null;
  ctpunto_critico_id: number | null;
  ctpunto_critico_nombre: string | null;
  ctuso_suelo_id: number | null;
  ctuso_suelo_nombre: string | null;
  direccion_pca: string | null;
  entidad_id: string;
  entidad_nombre: string;
  estado: boolean;
  id: string;
  num_secuencial: string | null;
  observacion: string | null;
  periodo_anio: string;
  periodo_id: number;
  periodo_nombre_mes: string;
  secuencial_id: string | null;
  solicitud_id: string;
  solicitud_num_secuencial: string;
  telefono_pca: string | null;
  usuario_id: string;
  usuario_nombre_completo: string;
}

export interface ReportOrdenDetalle {
  id: string;
  orden_trabajo_id: string;
  solicitud_ensayo_id: string;
  analisis: string;
  identificacion: string;
  metodo: string;
  ctambiente_id: string;
  ctambiente_nombre: string;
  ctambiente_id_padre: string;
  ctambiente_nombre_padre: string;
  ensayo_id_ensayo: number;
  estado: string;
}

export interface ReportOrdenCollectionResponse {
  count: number;
  data: ReportOrden[];
  meta: {
    hasNextPage: boolean;
    hasPrevPage: boolean;
    limit: number;
    nextPage: number | null;
    page: number;
    prevPage: number | null;
    skip: number;
    total: number;
    totalPages: number;
  };
}
