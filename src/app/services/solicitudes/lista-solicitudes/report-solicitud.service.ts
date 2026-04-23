import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  ReportSolicitud,
  ReportSolicitudCollectionResponse,
} from '../../../interfaces/solicitudes/lista-solicitudes/report-solicitud.interface';
import { PaginationMeta } from '../../../interfaces/catalogos/catalogo.interface';
import { META_FIELDS } from '../../../graphql/fragments';

const CLIENT_NAME = 'reportes';

const GET_COLLECTION_REPORT_SOLICITUD = gql`
  query CollectionReportSolicitud($page: Int, $take: Int) {
    collectionReportSolicitud(
      query: {
        orderBy: { fecha_creacion: DESC }
        pagination: { page: $page, take: $take }
      }
    ) {
      data {
        ctestado_id
        descripcion_solicitud
        establecimiento_id
        establecimiento_nombre
        estado_logico_solicitud
        estado_solicitud
        fecha_actualizacion
        fecha_creacion
        formulario_id
        formulario_nombre
        id_solicitud
        nombres_completos
        num_secuencial
        periodo_id
        periodo_nombre
        secuencial_id
        usuario_actualizacion
        usuario_creacion
        usuario_id
        usuario_nombre
      }
      count
      meta { ${META_FIELDS} }
    }
  }
`;

export interface SolicitudesPage {
  data: ReportSolicitud[];
  meta: PaginationMeta;
}

@Injectable({ providedIn: 'root' })
export class ReportSolicitudService {
  constructor(private apollo: Apollo) {}

  getSolicitudes(page: number, limit: number): Observable<SolicitudesPage> {
    return this.apollo
      .use(CLIENT_NAME)
      .watchQuery<{ collectionReportSolicitud: ReportSolicitudCollectionResponse }>({
        query: GET_COLLECTION_REPORT_SOLICITUD,
        variables: { page, take: limit },
        fetchPolicy: 'network-only',
      })
      .valueChanges.pipe(
        map((result) => {
          const res = result.data?.collectionReportSolicitud;
          return {
            data: (res?.data ?? []) as ReportSolicitud[],
            meta: res?.meta as PaginationMeta,
          };
        }),
      );
  }
}
