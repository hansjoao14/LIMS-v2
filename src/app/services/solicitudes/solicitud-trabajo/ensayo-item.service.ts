import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable, map } from 'rxjs';
import {
  EnsayoItem,
  EnsayoItemCollectionResponse,
} from '../../../interfaces/solicitudes/solicitud-trabajo';
import { GET_ENSAYOS_BY_CT_AMBIENTAL } from '../../../graphql/solicitudes/solicitud-trabajo/ensayo-item.queries';

const CLIENT_NAME = 'catalogo';

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
