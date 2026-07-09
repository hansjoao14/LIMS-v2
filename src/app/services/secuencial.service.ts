import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Apollo, gql } from 'apollo-angular';
import { Observable, map } from 'rxjs';
import {
  CollectionSecuencialResponse,
  Secuencial,
  SecuencialGraphQL,
  SecuencialPayload,
} from '../interfaces/secuencial/secuencial.interface';
import { PaginationMeta } from '../interfaces/catalogos/catalogo.interface';
import { META_FIELDS } from '../graphql/fragments';
import { environment } from '../../environments/environment';

const CLIENT_NAME = 'reportes';

const GET_COLLECTION_SECUENCIAL_ADMIN = gql`
  query CollectionSecuencialAdmin($page: Int, $take: Int, $busqueda: String) {
    collectionSecuencial(query: {
      where: { identificador_secu: { contains: $busqueda } }
      pagination: { page: $page, take: $take }
    }) {
      count
      data {
        actualizado_en
        actualizado_por
        anio
        creado_en
        creado_por
        ctformulario_id
        establecimiento_id
        establecimiento_nombre
        estado
        formato
        formulario_id
        formulario_nombre
        id
        identificador_secu
        modulo_establecimiento_id
        modulo_id
        modulo_nombre
        numero
        numero_secuencial
        sigla
      }
      meta { ${META_FIELDS} }
    }
  }
`;

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

  constructor(private apollo: Apollo, private http: HttpClient) {}

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
