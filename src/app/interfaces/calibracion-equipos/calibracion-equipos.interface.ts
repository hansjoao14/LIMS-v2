export interface CalibracionEquipo {
  id: string;
  num_secuencial: string | null;
  analista_id: string;
  analista_nombre: string;
  tipo_calibrador: string;
  fecha_verificacion: string;
  evaluacion: 'CUMPLE' | 'NO CUMPLE';
  ctestado_id: number;
  ctestado_nombre: string;
  estado: boolean;
  creado_en: string;
  creado_por: string;
  observaciones: string | null;
}

export interface CalibracionEquipoCollectionResponse {
  count: number;
  data: CalibracionEquipo[];
}

export interface ItemEquipo {
  id: string;
  codigo: string;
  nombre: string;
  ultima_calibracion: string | null;
}
