import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  ReportSolicitud,
  ReportSolicitudCollectionResponse,
  ReportValorSolicitud,
  ReportValorSolicitudCollectionResponse,
} from '../../../interfaces/solicitudes/lista-solicitudes/report-solicitud.interface';
import { PaginationMeta } from '../../../interfaces/catalogos/catalogo.interface';
import { META_FIELDS, REPORT_SOLICITUD_FIELDS, REPORT_VALOR_SOLICITUD_FIELDS } from '../../../graphql/fragments';

const CLIENT_NAME = 'reportes';

const GET_COLLECTION_REPORT_SOLICITUD = gql`
  query CollectionReportSolicitud($page: Int, $take: Int) {
    collectionReportSolicitud(
      query: {
        orderBy: { fecha_creacion: DESC }
        pagination: { page: $page, take: $take }
      }
    ) {
      data { ${REPORT_SOLICITUD_FIELDS} }
      count
      meta { ${META_FIELDS} }
    }
  }
`;

const GET_VALORES_SOLICITUD = gql`
  query CollectionReportValorSolicitud($id: String!) {
    collectionReportValorSolicitud(
      query: { where: { id_solicitud: { equals: $id } } }
    ) {
      count
      data { ${REPORT_VALOR_SOLICITUD_FIELDS} }
    }
  }
`;

const GET_SOLICITUD_BY_ID = gql`
  query CollectionReportSolicitudById($id: String!) {
    collectionReportSolicitud(
      query: { where: { id_solicitud: { equals: $id } } }
    ) {
      data { ${REPORT_SOLICITUD_FIELDS} }
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

  getSolicitudById(id: string): Observable<ReportSolicitud | null> {
    return this.apollo
      .use(CLIENT_NAME)
      .query<{ collectionReportSolicitud: ReportSolicitudCollectionResponse }>({
        query: GET_SOLICITUD_BY_ID,
        variables: { id },
        fetchPolicy: 'network-only',
      })
      .pipe(map((result) => result.data?.collectionReportSolicitud?.data?.[0] ?? null));
  }

  getValoresSolicitud(id: string): Observable<ReportValorSolicitud[]> {
    return this.apollo
      .use(CLIENT_NAME)
      .query<{ collectionReportValorSolicitud: ReportValorSolicitudCollectionResponse }>({
        query: GET_VALORES_SOLICITUD,
        variables: { id },
        fetchPolicy: 'network-only',
      })
      .pipe(map((result) => result.data?.collectionReportValorSolicitud?.data ?? []));
  }

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
