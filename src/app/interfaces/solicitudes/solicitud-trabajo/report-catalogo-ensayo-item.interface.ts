export interface ReportCatalogoNota {
  header: string;
  detail: string;
}

export interface ReportCatalogoEnsayoDetalle {
  id: number;
  analisis: string;
  identificacion: string;
  metodo: string;
  unidad_medida: string;
  unidad_id: number;
}

export interface ReportCatalogoEnsayoItem {
  id: number;
  nombre: string;
  ensayo_catalogo: number;
  ensayo_nombre: string;
  notas: ReportCatalogoNota[];
  Ensayos: ReportCatalogoEnsayoDetalle[];
}
