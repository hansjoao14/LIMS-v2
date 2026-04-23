import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  EstablecimientoUsuario,
  EstablecimientoUsuarioCollectionResponse,
} from '../../../interfaces/solicitudes/solicitud-trabajo/establecimiento-usuario.interface';
import { Tecnico } from '../../../interfaces/solicitudes/solicitud-trabajo/tecnico.interface';

const CLIENT_NAME = 'reportes';

const GET_USUARIOS_BY_ESTABLECIMIENTO = gql`
  query CollectionReportEstablecimientoUsuario($establecimientoId: String) {
    collectionReportEstablecimientoUsuario(
      query: { where: { establecimiento_id: { equals: $establecimientoId } } }
    ) {
      count
      data {
        ctcargo_id
        ctipo_cargo_nombre
        establecimiento_id
        establecimiento_nombre
        establecimiento_usuario_id
        estado
        nombres_completos
        usuario_id
        usuario_usuario
      }
    }
  }
`;

@Injectable({
  providedIn: 'root',
})
export class EstablecimientoUsuarioService {
  constructor(private apollo: Apollo) {}

  getUsuariosByEstablecimiento(establecimientoId: string): Observable<Tecnico[]> {
    return this.apollo
      .use(CLIENT_NAME)
      .watchQuery<{ collectionReportEstablecimientoUsuario: EstablecimientoUsuarioCollectionResponse }>({
        query: GET_USUARIOS_BY_ESTABLECIMIENTO,
        variables: { establecimientoId },
      })
      .valueChanges.pipe(
        map((result) => {
          const data = (result.data?.collectionReportEstablecimientoUsuario?.data ?? []) as EstablecimientoUsuario[];
          return data
            .filter((u) => u.estado)
            .map((u) => ({
              id: u.usuario_id,
              entidadId: u.establecimiento_id,
              nombre: u.nombres_completos,
              cargo: u.ctipo_cargo_nombre,
            }));
        })
      );
  }
}
