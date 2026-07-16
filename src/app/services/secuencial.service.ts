import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Apollo } from 'apollo-angular';
import { Observable, map } from 'rxjs';
import {
  CollectionSecuencialResponse,
  Secuencial,
  SecuencialGraphQL,
  SecuencialPayload,
} from '../interfaces/secuencial/secuencial.interface';
import { PaginationMeta } from '../interfaces/catalogos/catalogo.interface';
import { GET_COLLECTION_SECUENCIAL_ADMIN } from '../graphql/secuencial/secuencial.queries';
import { environment } from '../../environments/environment';

const CLIENT_NAME = 'reportes';

function normalizar(item: SecuencialGraphQL): Secuencial {
  return {
    ...item,
    numero: Number(item.numero),
    anio: Number(item.anio),
    ctformulario_id: Number(item.ctformulario_id),
    estado: item.estado === 'true' || (item.estado as unknown as boolean) === true,
  };
}

@Injectable({
  providedIn: 'root',
})
export class SecuencialService {
  private readonly base = `${environment.api_formulario}/secuencial`;

  constructor(
    private apollo: Apollo,
    private http: HttpClient,
  ) {}

  getCollectionSecuencialAdmin(
    page: number,
    limit: number,
    busqueda = '',
  ): Observable<{ data: Secuencial[]; meta: PaginationMeta }> {
    return this.apollo
      .use(CLIENT_NAME)
      .query<{ collectionSecuencial: CollectionSecuencialResponse }>({
        query: GET_COLLECTION_SECUENCIAL_ADMIN,
        variables: { page, take: limit, busqueda },
        fetchPolicy: 'network-only',
      })
      .pipe(
        map((result) => ({
          data: (result.data?.collectionSecuencial?.data ?? []).map(normalizar),
          meta: result.data?.collectionSecuencial?.meta as PaginationMeta,
        })),
      );
  }

  createSecuencial(payload: SecuencialPayload): Observable<Secuencial> {
    return this.http.post<Secuencial>(this.base, payload);
  }

  updateSecuencial(id: string, payload: SecuencialPayload): Observable<Secuencial> {
    return this.http.put<Secuencial>(`${this.base}/${id}`, payload);
  }

  toggleSecuencial(id: string, estado: boolean): Observable<void> {
    return this.http.patch<void>(`${this.base}/${id}/disable`, { estado });
  }
}
