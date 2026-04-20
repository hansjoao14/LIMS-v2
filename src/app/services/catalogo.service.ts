import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable, map } from 'rxjs';

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

const GET_CATALOGO = gql`
  query GetCatalogo {
    catalogo {
      id
      nombre
      descripcion
    }
  }
`;

const GET_ITEMS_BY_CATALOGO_ID = gql`
  query CollectionItemCatalogo($catalogoId: Int!) {
    collectionItemCatalogo(query: { where: { catalogo_id: { equals: $catalogoId }, estado: { equals: true } } }) {
      count
      data {
        catalogo_id
        estado
        grupo
        id
        item_catalogo_id
        nombre
        orden
        sigla
        valor
      }
    }
  }
`;

@Injectable({
  providedIn: 'root',
})
export class CatalogoService {
  constructor(private apollo: Apollo) {}

  getCatalogo(): Observable<any[]> {
    return this.apollo
      .watchQuery<{ catalogo: any[] }>({ query: GET_CATALOGO })
      .valueChanges.pipe(map((result) => result.data?.catalogo ?? []));
  }

  getItemsByCatalogoId(catalogoId: number): Observable<CollectionItemCatalogoResponse> {
    return this.apollo
      .watchQuery<{ collectionItemCatalogo: CollectionItemCatalogoResponse }>({
        query: GET_ITEMS_BY_CATALOGO_ID,
        variables: { catalogoId },
      })
      .valueChanges.pipe(
        map((result) => (result.data?.collectionItemCatalogo ?? { count: 0, data: [] }) as CollectionItemCatalogoResponse)
      );
  }
}
