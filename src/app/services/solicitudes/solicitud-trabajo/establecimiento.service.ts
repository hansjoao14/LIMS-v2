import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable, map } from 'rxjs';
import {
  Establecimiento,
  EstablecimientoCollectionResponse,
} from '../../../interfaces/solicitudes/solicitud-trabajo/establecimiento.interface';
import { GET_ESTABLECIMIENTOS } from '../../../graphql/solicitudes/solicitud-trabajo/establecimiento.queries';

const CLIENT_NAME = 'establecimiento';

@Injectable({
  providedIn: 'root',
})
export class EstablecimientoService {
  constructor(private apollo: Apollo) {}

  getEstablecimientos(): Observable<Establecimiento[]> {
    return this.apollo
      .use(CLIENT_NAME)
      .watchQuery<{ collectionEstablecimientos: EstablecimientoCollectionResponse }>({
        query: GET_ESTABLECIMIENTOS,
      })
      .valueChanges.pipe(
        map((result) => (result.data?.collectionEstablecimientos?.data ?? []) as Establecimiento[]),
      );
  }
}
