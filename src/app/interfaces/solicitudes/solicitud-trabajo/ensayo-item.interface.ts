import { ItemCatalogo } from '../catalogos/catalogo.interface';

export interface EnsayoDetalle {
  analisis: string;
  ctunidad_id: number;
  estado: boolean;
  id: number;
  identificacion: string;
  metodo: string;
  item_catalogo: ItemCatalogo;
}

export interface EnsayoItem {
  ctambiental_id: number;
  ensayo_id: number;
  estado: boolean;
  ensayo: EnsayoDetalle;
}

export interface EnsayoItemCollectionResponse {
  count: number;
  data: EnsayoItem[];
}
