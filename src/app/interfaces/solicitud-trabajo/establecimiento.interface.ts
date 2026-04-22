export interface Establecimiento {
  id: string;
  nombre: string;
  descripcion: string | null;
  direccion: string | null;
  dpa_id: string | null;
  establecimiento_id: string | null;
  estado: boolean;
  nui: string | null;
  representante_legal: string | null;
}

export interface EstablecimientoCollectionResponse {
  count?: number;
  data: Establecimiento[];
}
