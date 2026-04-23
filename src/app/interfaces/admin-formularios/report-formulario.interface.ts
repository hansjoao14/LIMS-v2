export interface ReportFormulario {
  ctformulario_id: number;
  descripcion: string | null;
  estado: boolean;
  fecha_actualizacion: string | null;
  fecha_creacion: string;
  fecha_emision: string;
  id: string;
  nombre: string;
  sigla: string;
  tipo_formulario: string;
  usuario_actualizacion: string | null;
  usuario_creacion: string;
  version: number;
}

export interface ReportFormularioCollectionResponse {
  count: number;
  data: ReportFormulario[];
  meta: import('../catalogos/catalogo.interface').PaginationMeta;
}
