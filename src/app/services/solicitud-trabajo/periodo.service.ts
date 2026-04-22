import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  Ejercicio,
  EjercicioCollectionResponse,
  Periodo,
  PeriodoCollectionResponse,
} from '../../interfaces/catalogos/periodo.interface';
import { META_FIELDS } from '../../graphql/fragments';

const CLIENT_NAME = 'catalogo';

const GET_EJERCICIO_BY_ANIO = gql`
  query GetEjercicioByAnio($anio: Int!) {
    collectionEjercicio(
      query: { where: { anio: { equals: $anio }, estado: { equals: true } } }
    ) {
      data {
        anio
        ctestado_id
        descripcion
        id
      }
      meta { ${META_FIELDS} }
    }
  }
`;

const GET_PERIODO_BY_EJERCICIO_MES = gql`
  query GetPeriodoByEjercicioMes($ejercicioId: Int!, $mes: Int!) {
    collectionPeriodo(
      query: {
        where: {
          ejercicio: { id: { equals: $ejercicioId } }
          estado: { equals: true }
          mes: { equals: $mes }
        }
      }
    ) {
      count
      data {
        ctestado_id
        ejercicio_id
        estado
        id
        mes
        nombre_mes
      }
      meta { ${META_FIELDS} }
    }
  }
`;

@Injectable({
  providedIn: 'root',
})
export class PeriodoService {
  constructor(private apollo: Apollo) {}

  getEjercicioByAnio(anio: number): Observable<Ejercicio | null> {
    return this.apollo
      .use(CLIENT_NAME)
      .query<{ collectionEjercicio: EjercicioCollectionResponse }>({
        query: GET_EJERCICIO_BY_ANIO,
        variables: { anio },
      })
      .pipe(
        map((result) => {
          console.log(result);

          const data = (result.data?.collectionEjercicio?.data ?? []) as Ejercicio[];
          return data[0] ?? null;
        })
      );
  }

  getPeriodoByEjercicioAndMes(ejercicioId: number, mes: number): Observable<Periodo | null> {
    return this.apollo
      .use(CLIENT_NAME)
      .query<{ collectionPeriodo: PeriodoCollectionResponse }>({
        query: GET_PERIODO_BY_EJERCICIO_MES,
        variables: { ejercicioId, mes },
      })
      .pipe(
        map((result) => {
          const data = (result.data?.collectionPeriodo?.data ?? []) as Periodo[];
          return data[0] ?? null;
        })
      );
  }
}
