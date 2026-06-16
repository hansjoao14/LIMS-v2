import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Apollo, gql } from 'apollo-angular';
import { Observable, map } from 'rxjs';
import { META_FIELDS } from '../graphql/fragments';
import { environment } from '../../environments/environment';
import {
  Ensayo,
  EnsayoItem,
  EnsayoPayload,
  EnsayoItemPayload,
  CollectionEnsayoResponse,
  CollectionEnsayoItemResponse,
  ItemCatalogoOption,
} from '../interfaces/ensayos/ensayo.interface';
import { PaginationMeta } from '../interfaces/catalogos/catalogo.interface';

const CLIENT_NAME = 'catalogo';

const GET_COLLECTION_ENSAYO_ADMIN = gql`
  query CollectionEnsayoAdmin($page: Int, $take: Int, $analisis: String) {
    collectionEnsayo(query: {
      where: { analisis: { contains: $analisis } }
      pagination: { page: $page, take: $take }
    }) {
      count
      data { id analisis identificacion metodo ctunidad_id estado }
      meta { ${META_FIELDS} }
    }
  }
`;

const GET_ENSAYO_ITEMS = gql`
  query GetEnsayoItems($ensayoId: Int) {
    collectionEnsayoItem(query: {
      where: { ensayo_id: { equals: $ensayoId } }
      pagination: { take: 100, page: null }
    }) {
      count
      data {
        ctambiental_id
        ensayo_id
        estado
        item_catalogo { id nombre catalogo_id }
      }
    }
  }
`;

const GET_ITEM_CATALOGO_OPTIONS = gql`
  query GetItemCatalogoOptions {
    collectionItemCatalogo(query: {
      where: { estado: { equals: true } }
      pagination: { take: 200, page: null }
    }) {
      data { id nombre catalogo_id }
    }
  }
`;

@Injectable({ providedIn: 'root' })
export class EnsayoService {
  private readonly baseEnsayo = `${environment.api_catalogo}/ensayo`;
  private readonly baseEnsayoItem = `${environment.api_catalogo}/ensayo-item`;

  constructor(private apollo: Apollo, private http: HttpClient) {}

  getCollectionEnsayo(page: number, take: number, analisis = ''): Observable<{ data: Ensayo[]; meta: PaginationMeta }> {
    return this.apollo
      .use(CLIENT_NAME)
      .query<{ collectionEnsayo: CollectionEnsayoResponse }>({
        query: GET_COLLECTION_ENSAYO_ADMIN,
        variables: { page, take, analisis },
        fetchPolicy: 'network-only',
      })
      .pipe(
        map((result) => ({
          data: result.data?.collectionEnsayo?.data ?? [],
          meta: result.data?.collectionEnsayo?.meta as PaginationMeta,
        })),
      );
  }

  getEnsayoItems(ensayoId: number): Observable<EnsayoItem[]> {
    return this.apollo
      .use(CLIENT_NAME)
      .query<{ collectionEnsayoItem: CollectionEnsayoItemResponse }>({
        query: GET_ENSAYO_ITEMS,
        variables: { ensayoId },
        fetchPolicy: 'network-only',
      })
      .pipe(map((result) => result.data?.collectionEnsayoItem?.data ?? []));
  }

  getItemCatalogoOptions(): Observable<ItemCatalogoOption[]> {
    return this.apollo
      .use(CLIENT_NAME)
      .query<{ collectionItemCatalogo: { data: ItemCatalogoOption[] } }>({
        query: GET_ITEM_CATALOGO_OPTIONS,
        fetchPolicy: 'network-only',
      })
      .pipe(map((result) => result.data?.collectionItemCatalogo?.data ?? []));
  }

  // ── Ensayo mutations ──────────────────────────────────────────────────────

  createEnsayo(payload: EnsayoPayload): Observable<Ensayo> {
    return this.http.post<Ensayo>(this.baseEnsayo, payload);
  }

  updateEnsayo(id: number, payload: EnsayoPayload): Observable<Ensayo> {
    return this.http.put<Ensayo>(`${this.baseEnsayo}/${id}`, payload);
  }

  toggleEnsayo(id: number, estado: boolean): Observable<void> {
    return this.http.patch<void>(`${this.baseEnsayo}/${id}/disable`, { estado });
  }

  // ── EnsayoItem mutations ──────────────────────────────────────────────────

  createEnsayoItem(payload: EnsayoItemPayload): Observable<EnsayoItem> {
    return this.http.post<EnsayoItem>(this.baseEnsayoItem, payload);
  }

  updateEnsayoItem(ctambientalId: number, ensayoId: number, payload: EnsayoItemPayload): Observable<EnsayoItem> {
    return this.http.put<EnsayoItem>(`${this.baseEnsayoItem}/${ctambientalId}`, payload);
  }

  toggleEnsayoItem(ctambientalId: number, ensayoId: number, estado: boolean): Observable<void> {
    return this.http.patch<void>(`${this.baseEnsayoItem}/${ctambientalId}/disable`, { estado });
  }
}
