export interface ReportOrden {
  actualizado_en: string | null;
  actualizado_por: string | null;
  creado_en: string;
  creado_por: string;
  ctambiente_id: number;
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
  periodo_id: number;
  periodo_nombre_mes: string;
  secuencial_id: string | null;
  solicitud_id: string;
  solicitud_num_secuencial: string;
  usuario_id: string;
  usuario_nombre_completo: string;
}
// Nota: ReportOrdenDataType ya no expone ctuso_suelo_*, ctcaracteristica_horaria_*,
// ctpunto_critico_*, direccion_pca, telefono_pca ni observacion. Siguen
// existiendo en OrdenTrabajoPayload (escritura), pero no se pueden leer desde
// el reporte.

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
