import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  EstablecimientoUsuario,
  EstablecimientoUsuarioCollectionResponse,
} from '../../../interfaces/solicitudes/solicitud-trabajo/establecimiento-usuario.interface';
import { Tecnico } from '../../../interfaces/solicitudes/solicitud-trabajo/tecnico.interface';
import { GET_USUARIOS_BY_ESTABLECIMIENTO } from '../../../graphql/solicitudes/solicitud-trabajo/establecimiento-usuario.queries';

const CLIENT_NAME = 'reportes';

@Injectable({
  providedIn: 'root',
})
export class EstablecimientoUsuarioService {
  constructor(private apollo: Apollo) {}

  getUsuariosByEstablecimiento(establecimientoId: string): Observable<Tecnico[]> {
    return this.apollo
      .use(CLIENT_NAME)
      .watchQuery<{
        collectionReportEstablecimientoUsuario: EstablecimientoUsuarioCollectionResponse;
      }>({
        query: GET_USUARIOS_BY_ESTABLECIMIENTO,
        variables: { establecimientoId },
      })
      .valueChanges.pipe(
        map((result) => {
          const data = (result.data?.collectionReportEstablecimientoUsuario?.data ??
            []) as EstablecimientoUsuario[];
          return data
            .filter((u) => u.estado)
            .map((u) => ({
              id: u.usuario_id,
              entidadId: u.establecimiento_id,
              nombre: u.nombres_completos,
              cargo: u.ctipo_cargo_nombre,
              correo: u.correo,
            }));
        }),
      );
  }
}
