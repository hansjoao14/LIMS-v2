import { PaginationMeta } from '../catalogos/catalogo.interface';

export interface Ensayo {
  id: number;
  analisis: string;
  identificacion: string;
  metodo: string;
  ctunidad_id: number;
  estado: boolean;
}

export interface EnsayoItemCatalogo {
  id: number;
  nombre: string;
  catalogo_id: number;
}

export interface EnsayoItem {
  ctambiental_id: number;
  ensayo_id: number;
  estado: boolean;
  item_catalogo?: EnsayoItemCatalogo;
  ensayo?: {
    id: number;
    analisis: string;
    identificacion: string;
  };
}

export interface EnsayoPayload {
  analisis: string;
  identificacion: string;
  metodo: string;
  ctunidad_id: number;
}

export interface EnsayoItemPayload {
  ctambiental_id: number;
  ensayo_id: number;
}

export interface CollectionEnsayoResponse {
  count: number;
  data: Ensayo[];
  meta: PaginationMeta;
}

export interface CollectionEnsayoItemResponse {
  count: number;
  data: EnsayoItem[];
}

export interface ItemCatalogoOption {
  id: number;
  nombre: string;
  catalogo_id: number;
}
