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
  item_catalogo_id: number | null;
}

export interface EnsayoItemNode {
  isExternal: boolean;
  nivel: number;
  // solo para filas de cabecera externa
  catId?: number;
  catNombre?: string;
  // solo para filas de ensayo-item real
  ensayoItem?: EnsayoItem;
}

export interface EnsayoItem {
  ctambiental_id: number;
  cttipo_ensayo_id: number | null;
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
  cttipo_ensayo_id: number;
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
