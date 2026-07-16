import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Apollo } from 'apollo-angular';
import { Observable, map } from 'rxjs';
import { environment } from '../../environments/environment';
import { GET_COLLECTION_ENSAYO_ADMIN, GET_ENSAYO_BY_ID } from '../graphql/ensayo/ensayo.queries';
import {
  GET_ENSAYO_ITEMS,
  GET_ITEM_CATALOGO_BY_ID,
  GET_ITEM_CATALOGO_OPTIONS_BY_CATALOGO_PAGINADO,
  GET_ITEM_CATALOGO_OPTIONS_PAGINADO,
} from '../graphql/ensayo/ensayo-item.queries';
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

@Injectable({ providedIn: 'root' })
export class EnsayoService {
  private readonly baseEnsayo = `${environment.api_catalogo}/ensayo`;
  private readonly baseEnsayoItem = `${environment.api_catalogo}/ensayo-item`;

  constructor(
    private apollo: Apollo,
    private http: HttpClient,
  ) {}

  getCollectionEnsayo(
    page: number,
    take: number,
    analisis = '',
  ): Observable<{ data: Ensayo[]; meta: PaginationMeta }> {
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

  getItemCatalogoOptionsPaginado(
    page: number,
    take: number,
    nombre = '',
    catalogoId: number | null = null,
  ): Observable<{ data: ItemCatalogoOption[]; meta: PaginationMeta }> {
    const query =
      catalogoId != null
        ? GET_ITEM_CATALOGO_OPTIONS_BY_CATALOGO_PAGINADO
        : GET_ITEM_CATALOGO_OPTIONS_PAGINADO;
    const variables =
      catalogoId != null ? { page, take, nombre, catalogoId } : { page, take, nombre };
    return this.apollo
      .use(CLIENT_NAME)
      .query<{ collectionItemCatalogo: { data: ItemCatalogoOption[]; meta: PaginationMeta } }>({
        query,
        variables,
        fetchPolicy: 'network-only',
      })
      .pipe(
        map((result) => ({
          data: result.data?.collectionItemCatalogo?.data ?? [],
          meta: result.data?.collectionItemCatalogo?.meta as PaginationMeta,
        })),
      );
  }

  getEnsayoById(id: number): Observable<Ensayo | null> {
    return this.apollo
      .use(CLIENT_NAME)
      .query<{ collectionEnsayo: { data: Ensayo[] } }>({
        query: GET_ENSAYO_BY_ID,
        variables: { id },
        fetchPolicy: 'network-only',
      })
      .pipe(map((result) => result.data?.collectionEnsayo?.data?.[0] ?? null));
  }

  getItemCatalogoById(id: number): Observable<ItemCatalogoOption | null> {
    return this.apollo
      .use(CLIENT_NAME)
      .query<{ collectionItemCatalogo: { data: ItemCatalogoOption[] } }>({
        query: GET_ITEM_CATALOGO_BY_ID,
        variables: { id },
        fetchPolicy: 'network-only',
      })
      .pipe(map((result) => result.data?.collectionItemCatalogo?.data?.[0] ?? null));
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

  updateEnsayoItem(
    ctambientalId: number,
    ensayoId: number,
    payload: EnsayoItemPayload,
  ): Observable<EnsayoItem> {
    return this.http.put<EnsayoItem>(`${this.baseEnsayoItem}/${ctambientalId}`, payload);
  }

  toggleEnsayoItem(ctambientalId: number, ensayoId: number, estado: boolean): Observable<void> {
    return this.http.patch<void>(`${this.baseEnsayoItem}/${ctambientalId}/disable`, { estado });
  }
}
