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
  // El backend a veces omite este campo por completo (no llega ni como
  // null) en vez de mandar un array vacío — tratar siempre como opcional.
  notas?: ReportCatalogoNota[];
  Ensayos: ReportCatalogoEnsayoDetalle[];
}
