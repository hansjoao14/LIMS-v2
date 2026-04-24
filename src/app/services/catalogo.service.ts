import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable, map, switchMap } from 'rxjs';
import {
  Catalogo,
  CollectionCatalogoResponse,
  CollectionItemCatalogoResponse,
  ItemCatalogo,
} from '../interfaces/catalogos/catalogo.interface';
import { META_FIELDS } from '../graphql/fragments';

const CLIENT_NAME = 'catalogo';

const GET_CATALOGO = gql`
  query GetCatalogo {
    catalogo {
      id
      nombre
      descripcion
    }
  }
`;

const GET_COLLECTION_CATALOGO = gql`
  query CollectionCatalogo {
    collectionCatalogo(query: { pagintation: { page: null, take: 100 } }) {
      count
      data {
        descripcion
        estado
        id
        nombre
      }
      meta { ${META_FIELDS} }
    }
  }
`;

const GET_ITEMS_BY_CATALOGO_ID = gql`
  query CollectionItemCatalogo($catalogoId: Int!) {
    collectionItemCatalogo(
      query: { where: { catalogo_id: { equals: $catalogoId }, estado: { equals: true } } }
    ) {
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
      meta { ${META_FIELDS} }
    }
  }
`;

const GET_CHILDREN_BY_PARENT_IDS = gql`
  query CollectionItemCatalogoChildren($parentIds: [Int!]!) {
    collectionItemCatalogo(
      query: { where: { estado: { equals: true }, item_catalogo_id: { in: $parentIds } } }
    ) {
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
      meta { ${META_FIELDS} }
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

  getCollectionCatalogo(): Observable<Catalogo[]> {
    return this.apollo
      .use(CLIENT_NAME)
      .watchQuery<{ collectionCatalogo: CollectionCatalogoResponse }>({
        query: GET_COLLECTION_CATALOGO,
        fetchPolicy: 'cache-first',
      })
      .valueChanges.pipe(
        map((result) => (result.data?.collectionCatalogo?.data ?? []) as Catalogo[]),
      );
  }

  getItemsByCatalogoId(catalogoId: number): Observable<CollectionItemCatalogoResponse> {
    return this.apollo
      .use(CLIENT_NAME)
      .watchQuery<{ collectionItemCatalogo: CollectionItemCatalogoResponse }>({
        query: GET_ITEMS_BY_CATALOGO_ID,
        variables: { catalogoId },
      })
      .valueChanges.pipe(
        map(
          (result) =>
            (result.data?.collectionItemCatalogo ?? {
              count: 0,
              data: [],
            }) as CollectionItemCatalogoResponse,
        ),
      );
  }

  getChildrenByParentIds(parentIds: number[]): Observable<CollectionItemCatalogoResponse> {
    return this.apollo
      .use(CLIENT_NAME)
      .watchQuery<{ collectionItemCatalogo: CollectionItemCatalogoResponse }>({
        query: GET_CHILDREN_BY_PARENT_IDS,
        variables: { parentIds },
      })
      .valueChanges.pipe(
        map(
          (result) =>
            (result.data?.collectionItemCatalogo ?? {
              count: 0,
              data: [],
            }) as CollectionItemCatalogoResponse,
        ),
      );
  }

  getMatricesConHijos(
    catalogoId: number,
  ): Observable<{ matriz: ItemCatalogo; hijos: ItemCatalogo[] }[]> {
    return this.getItemsByCatalogoId(catalogoId).pipe(
      switchMap((response) => {
        const matrices = response.data;
        const parentIds = matrices.map((m) => m.id);
        return this.getChildrenByParentIds(parentIds).pipe(
          map((hijosResponse) => {
            return matrices.map((matriz) => ({
              matriz,
              hijos: hijosResponse.data.filter((h) => h.item_catalogo_id === matriz.id),
            }));
          }),
        );
      }),
    );
  }
}
