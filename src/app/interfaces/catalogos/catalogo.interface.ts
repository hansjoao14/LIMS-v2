export interface Catalogo {
  id: number;
  nombre: string;
  descripcion: string | null;
  estado: boolean;
}

export interface CollectionCatalogoResponse {
  count: number;
  data: Catalogo[];
  meta: PaginationMeta;
}

export interface ItemCatalogo {
  catalogo_id: number;
  estado: boolean;
  grupo: string | null;
  id: number;
  item_catalogo_id: number | null;
  nombre: string;
  orden: number | null;
  sigla: string | null;
  valor: string | null;
}

export interface PaginationMeta {
  hasNextPage: boolean;
  hasPrevPage: boolean;
  limit: number;
  nextPage: number | null;
  page: number;
  prevPage: number | null;
  skip: number;
  total: number;
  totalPages: number;
}

export interface CollectionItemCatalogoResponse {
  count: number;
  data: ItemCatalogo[];
  meta: PaginationMeta;
}

export interface CatalogoPayload {
  nombre: string;
  descripcion?: string | null;
}

export interface ItemCatalogoPayload {
  catalogo_id: number;
  nombre: string;
  sigla?: string | null;
  valor?: string | null;
  grupo?: string | null;
  orden?: number | null;
  item_catalogo_id?: number | null;
}
