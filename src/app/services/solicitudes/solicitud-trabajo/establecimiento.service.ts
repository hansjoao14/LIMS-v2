import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable, map } from 'rxjs';
import {
  Establecimiento,
  EstablecimientoCollectionResponse,
} from '../../../interfaces/solicitud-trabajo/establecimiento.interface';

const CLIENT_NAME = 'establecimiento';

const GET_ESTABLECIMIENTOS = gql`
  query CollectionEstablecimientos {
    collectionEstablecimientos {
      data {
        id
        nombre
        descripcion
        direccion
        dpa_id
        establecimiento_id
        estado
        nui
        representante_legal
      }
    }
  }
`;

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
        map(
          (result) =>
            (result.data?.collectionEstablecimientos?.data ?? []) as Establecimiento[],
        ),
      );
  }
}
