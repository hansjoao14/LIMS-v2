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
    collectionEnsayoItem(
      query: { where: { ensayo_id: { equals: $ensayoId } }, pagination: { take: 100, page: null } }
    ) {
      count
      data {
        ctambiental_id
        cttipo_ensayo_id
        ensayo_id
        estado
        item_catalogo {
          id
          nombre
          catalogo_id
          item_catalogo_id
        }
      }
    }
  }
`;

const GET_ITEM_CATALOGO_OPTIONS_PAGINADO = gql`
  query GetItemCatalogoOptionsPaginado($page: Int, $take: Int, $nombre: String) {
    collectionItemCatalogo(query: {
      where: { estado: { equals: true }, nombre: { contains: $nombre } }
      pagination: { page: $page, take: $take }
    }) {
      count
      data { id nombre catalogo_id }
      meta { ${META_FIELDS} }
    }
  }
`;

// Igual que GET_ITEM_CATALOGO_OPTIONS_PAGINADO pero acotada a los hijos de un
// catalogo_id específico (p. ej. 18 = Tipo Ambiental), en vez de todo item_catalogo.
const GET_ITEM_CATALOGO_OPTIONS_BY_CATALOGO_PAGINADO = gql`
  query GetItemCatalogoOptionsByCatalogoPaginado($page: Int, $take: Int, $nombre: String, $catalogoId: Int) {
    collectionItemCatalogo(query: {
      where: { estado: { equals: true }, nombre: { contains: $nombre }, catalogo_id: { equals: $catalogoId } }
      pagination: { page: $page, take: $take }
    }) {
      count
      data { id nombre catalogo_id }
      meta { ${META_FIELDS} }
    }
  }
`;

const GET_ITEM_CATALOGO_BY_ID = gql`
  query GetItemCatalogoById($id: Int!) {
    collectionItemCatalogo(
      query: { where: { id: { equals: $id } }, pagination: { take: 1, page: null } }
    ) {
      data {
        id
        nombre
        catalogo_id
      }
    }
  }
`;

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
