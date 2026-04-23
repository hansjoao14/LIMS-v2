import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable, map } from 'rxjs';
import {
  EnsayoItem,
  EnsayoItemCollectionResponse,
} from '../../../interfaces/solicitudes/solicitud-trabajo';

const CLIENT_NAME = 'catalogo';

const GET_ENSAYOS_BY_CT_AMBIENTAL = gql`
  query CollectionEnsayoItem($ctambientalId: Int!) {
    collectionEnsayoItem(
      query: {
        where: { ctambiental_id: { equals: $ctambientalId } }
        pagination: { page: 1, take: 100 }
      }
    ) {
      count
      data {
        ctambiental_id
        ensayo_id
        estado
        ensayo {
          analisis
          ctunidad_id
          estado
          id
          identificacion
          metodo
          item_catalogo {
            id
            nombre
            sigla
            valor
          }
        }
      }
    }
  }
`;

@Injectable({
  providedIn: 'root',
})
export class EnsayoItemService {
  constructor(private apollo: Apollo) {}
  getEnsayosByCtAmbiental(ctambientalId: number): Observable<EnsayoItem[]> {
    return this.apollo
      .use(CLIENT_NAME)
      .watchQuery<{ collectionEnsayoItem: EnsayoItemCollectionResponse }>({
        query: GET_ENSAYOS_BY_CT_AMBIENTAL,
        variables: { ctambientalId },
      })
      .valueChanges.pipe(
        map((result) => (result.data?.collectionEnsayoItem?.data ?? []) as EnsayoItem[]),
      );
  }
}
