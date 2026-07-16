import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { firstValueFrom } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  Ejercicio,
  EjercicioCollectionResponse,
  Periodo,
  PeriodoCollectionResponse,
} from '../../../interfaces/catalogos/periodo.interface';
import {
  GET_EJERCICIO_BY_ANIO,
  GET_PERIODO_BY_EJERCICIO_MES,
} from '../../../graphql/solicitudes/solicitud-trabajo/periodo.queries';

const CLIENT_NAME = 'catalogo';

@Injectable({
  providedIn: 'root',
})
export class PeriodoService {
  constructor(private apollo: Apollo) {}

  async getEjercicioByAnio(anio: number): Promise<Ejercicio | null> {
    const result = await firstValueFrom(
      this.apollo
        .use(CLIENT_NAME)
        .query<{ collectionEjercicio: EjercicioCollectionResponse }>({
          query: GET_EJERCICIO_BY_ANIO,
          variables: { anio },
        })
        .pipe(map((r) => (r.data?.collectionEjercicio?.data ?? []) as Ejercicio[])),
    );
    return result[0] ?? null;
  }

  async getPeriodoByEjercicioAndMes(ejercicioId: number, mes: number): Promise<Periodo | null> {
    const result = await firstValueFrom(
      this.apollo
        .use(CLIENT_NAME)
        .query<{ collectionPeriodo: PeriodoCollectionResponse }>({
          query: GET_PERIODO_BY_EJERCICIO_MES,
          variables: { ejercicioId, mes },
        })
        .pipe(map((r) => (r.data?.collectionPeriodo?.data ?? []) as Periodo[])),
    );
    return result[0] ?? null;
  }
}
