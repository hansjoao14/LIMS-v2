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

export interface CollectionItemCatalogoResponse {
  count: number;
  data: ItemCatalogo[];
}
