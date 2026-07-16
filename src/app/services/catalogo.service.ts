import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Apollo } from 'apollo-angular';
import { Observable, filter, map, switchMap, take } from 'rxjs';
import {
  Catalogo,
  CatalogoPayload,
  CollectionCatalogoResponse,
  CollectionItemCatalogoResponse,
  ItemCatalogo,
  ItemCatalogoPayload,
  PaginationMeta,
} from '../interfaces/catalogos/catalogo.interface';
import {
  GET_ALL_ITEMS_ADMIN,
  GET_CATALOGO,
  GET_CHILDREN_BY_PARENT_IDS,
  GET_COLLECTION_CATALOGO,
  GET_COLLECTION_CATALOGO_ADMIN,
  GET_ITEMS_BY_CATALOGO_ID,
  GET_ITEMS_BY_IDS,
} from '../graphql/catalogo/catalogo.queries';
import { environment } from '../../environments/environment';

const CLIENT_NAME = 'catalogo';

@Injectable({
  providedIn: 'root',
})
export class CatalogoService {
  private readonly baseCatalogo = `${environment.api_catalogo}/catalogo`;
  private readonly baseItemCatalogo = `${environment.api_catalogo}/item-catalogo`;

  constructor(
    private apollo: Apollo,
    private http: HttpClient,
  ) {}

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

  getCollectionCatalogoAdmin(
    page: number,
    limit: number,
    nombre = '',
  ): Observable<{ data: Catalogo[]; meta: PaginationMeta }> {
    return this.apollo
      .use(CLIENT_NAME)
      .query<{ collectionCatalogo: CollectionCatalogoResponse }>({
        query: GET_COLLECTION_CATALOGO_ADMIN,
        variables: { page, take: limit, nombre },
        fetchPolicy: 'network-only',
      })
      .pipe(
        map((result) => ({
          data: (result.data?.collectionCatalogo?.data ?? []) as Catalogo[],
          meta: result.data?.collectionCatalogo?.meta as PaginationMeta,
        })),
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

  getAllItemsAdmin(catalogoId: number): Observable<ItemCatalogo[]> {
    return this.apollo
      .use(CLIENT_NAME)
      .query<{ collectionItemCatalogo: CollectionItemCatalogoResponse }>({
        query: GET_ALL_ITEMS_ADMIN,
        variables: { catalogoId, page: null, take: 200 },
        fetchPolicy: 'network-only',
      })
      .pipe(map((result) => result.data?.collectionItemCatalogo?.data ?? []));
  }

  getItemsByIds(ids: number[]): Observable<ItemCatalogo[]> {
    return this.apollo
      .use(CLIENT_NAME)
      .query<{ collectionItemCatalogo: CollectionItemCatalogoResponse }>({
        query: GET_ITEMS_BY_IDS,
        variables: { ids },
        fetchPolicy: 'network-only',
      })
      .pipe(map((result) => result.data?.collectionItemCatalogo?.data ?? []));
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
      filter((response) => response.data.length > 0),
      take(1),
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

  // ── Catálogo mutations ────────────────────────────────────────────────────

  createCatalogo(payload: CatalogoPayload): Observable<Catalogo> {
    return this.http.post<Catalogo>(this.baseCatalogo, payload);
  }

  updateCatalogo(id: number, payload: CatalogoPayload): Observable<Catalogo> {
    return this.http.put<Catalogo>(`${this.baseCatalogo}/${id}`, payload);
  }

  toggleCatalogo(id: number, estado: boolean): Observable<void> {
    return this.http.patch<void>(`${this.baseCatalogo}/${id}/disable`, { estado });
  }

  // ── ItemCatálogo mutations ────────────────────────────────────────────────

  createItemCatalogo(payload: ItemCatalogoPayload): Observable<ItemCatalogo> {
    return this.http.post<ItemCatalogo>(this.baseItemCatalogo, payload);
  }

  updateItemCatalogo(id: number, payload: ItemCatalogoPayload): Observable<ItemCatalogo> {
    return this.http.put<ItemCatalogo>(`${this.baseItemCatalogo}/${id}`, payload);
  }

  toggleItemCatalogo(id: number, estado: boolean): Observable<void> {
    return this.http.patch<void>(`${this.baseItemCatalogo}/${id}/disable`, { estado });
  }
}
