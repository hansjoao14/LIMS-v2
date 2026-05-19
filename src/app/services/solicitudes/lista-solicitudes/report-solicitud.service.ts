import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable, expand, reduce, EMPTY } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  ReportSolicitud,
  ReportSolicitudCollectionResponse,
  ReportSolicitudEnsayo,
  ReportSolicitudEnsayoCollectionResponse,
  ReportValorSolicitud,
  ReportValorSolicitudCollectionResponse,
} from '../../../interfaces/solicitudes/lista-solicitudes/report-solicitud.interface';
import { PaginationMeta } from '../../../interfaces/catalogos/catalogo.interface';
import { META_FIELDS, REPORT_SOLICITUD_FIELDS, REPORT_VALOR_SOLICITUD_FIELDS } from '../../../graphql/fragments';

const CLIENT_NAME = 'reportes';

//agregar el id del formulario, el tema de los roles acceso
const GET_COLLECTION_REPORT_SOLICITUD = gql`
  query CollectionReportSolicitud($page: Int, $take: Int) {
    collectionReportSolicitud(
      query: {
        orderBy: { fecha_creacion: DESC }
        where: { ctestado_id: { in: [2, 51, 387, 388] } }
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
      query: {
        where: { id_solicitud: { equals: $id } estado: { equals: true } }
        pagination: { page: 1, take: 100 }
      }
    ) {
      count
      data { ${REPORT_VALOR_SOLICITUD_FIELDS} }
    }
  }
`;

const GET_VALORES_BY_TIPO_FORMULARIO = gql`
  query CollectionReportValorSolicitud($tipoFormularioId: Int!, $page: Int, $take: Int) {
    collectionReportValorSolicitud(
      query: {
        orderBy: { tipo_formulario_id: ASC }
        where: { tipo_formulario_id: { equals: $tipoFormularioId } }
        pagination: { page: $page, take: $take }
      }
    ) {
      count
      data { ${REPORT_VALOR_SOLICITUD_FIELDS} }
      meta { ${META_FIELDS} }
    }
  }
`;

const GET_SOLICITUDES_FINALIZADAS = gql`
  query CollectionReportSolicitudesFinalizadas($page: Int, $take: Int) {
    collectionReportSolicitud(
      query: {
        orderBy: { fecha_creacion: DESC }
        where: { ctestado_id: { equals: 3 } }
        pagination: { page: $page, take: $take }
      }
    ) {
      data { ${REPORT_SOLICITUD_FIELDS} }
      count
      meta { ${META_FIELDS} }
    }
  }
`;

const GET_SOLICITUDES_ESTADO_388 = gql`
  query CollectionReportSolicitudesEstado388($page: Int, $take: Int) {
    collectionReportSolicitud(
      query: {
        orderBy: { fecha_creacion: DESC }
        where: { ctestado_id: { equals: 388 } }
        pagination: { page: $page, take: $take }
      }
    ) {
      data { ${REPORT_SOLICITUD_FIELDS} }
      count
      meta { ${META_FIELDS} }
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

const GET_ENSAYOS_SOLICITUD = gql`
  query CollectionReportSolicitudEnsayo($solicitudId: String!, $page: Int, $take: Int) {
    collectionReportSolicitudEnsayo(
      query: {
        where: { solicitud_id: { equals: $solicitudId } estado: { equals: true } }
        pagination: { page: $page, take: $take }
      }
    ) {
      count
      data {
        analisis
        ctambiental_id
        ctipo_ambiental_nombre
        ensayo_id
        estado
        id
        identificacion
        metodo
        solicitud_id
      }
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

  getEnsayosSolicitud(solicitudId: string): Observable<ReportSolicitudEnsayo[]> {
    const PAGE_SIZE = 100;
    const fetchPage = (page: number) =>
      this.apollo
        .use(CLIENT_NAME)
        .query<{ collectionReportSolicitudEnsayo: ReportSolicitudEnsayoCollectionResponse }>({
          query: GET_ENSAYOS_SOLICITUD,
          variables: { solicitudId, page, take: PAGE_SIZE },
          fetchPolicy: 'network-only',
        })
        .pipe(
          map((result) => {
            const res = result.data?.collectionReportSolicitudEnsayo;
            return {
              data: (res?.data ?? []) as ReportSolicitudEnsayo[],
              meta: res?.meta as PaginationMeta,
            };
          }),
        );

    return fetchPage(1).pipe(
      expand(({ meta }) => (meta?.hasNextPage ? fetchPage(meta.nextPage!) : EMPTY)),
      reduce((acc, { data }) => acc.concat(data), [] as ReportSolicitudEnsayo[]),
    );
  }

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
      .pipe(
        map((result) => {
          const all = result.data?.collectionReportValorSolicitud?.data ?? [];
          // ordena por fecha_creacion ASC para que el más reciente gane en el dedup
          const sorted = [...all].sort((a, b) => a.fecha_creacion.localeCompare(b.fecha_creacion));
          const dedup = new Map<string, ReportValorSolicitud>();
          for (const v of sorted) dedup.set(v.atributo_formulario_nombre, v);
          return Array.from(dedup.values());
        }),
      );
  }

  getValoresByTipoFormulario(tipoFormularioId: number): Observable<ReportValorSolicitud[]> {
    const PAGE_SIZE = 200;
    const fetchPage = (page: number) =>
      this.apollo
        .use(CLIENT_NAME)
        .query<{ collectionReportValorSolicitud: ReportValorSolicitudCollectionResponse }>({
          query: GET_VALORES_BY_TIPO_FORMULARIO,
          variables: { tipoFormularioId, page, take: PAGE_SIZE },
          fetchPolicy: 'network-only',
        })
        .pipe(
          map((result) => {
            const res = result.data?.collectionReportValorSolicitud;
            return {
              data: (res?.data ?? []) as ReportValorSolicitud[],
              meta: res?.meta as PaginationMeta,
            };
          }),
        );

    return fetchPage(1).pipe(
      expand(({ meta }) => (meta?.hasNextPage ? fetchPage(meta.nextPage!) : EMPTY)),
      reduce((acc, { data }) => acc.concat(data), [] as ReportValorSolicitud[]),
    );
  }

  getSolicitudesFinalizadas(page: number, limit: number): Observable<SolicitudesPage> {
    return this.apollo
      .use(CLIENT_NAME)
      .query<{ collectionReportSolicitud: ReportSolicitudCollectionResponse }>({
        query: GET_SOLICITUDES_FINALIZADAS,
        variables: { page, take: limit },
        fetchPolicy: 'network-only',
      })
      .pipe(
        map((result) => {
          const res = result.data?.collectionReportSolicitud;
          return {
            data: (res?.data ?? []) as ReportSolicitud[],
            meta: res?.meta as PaginationMeta,
          };
        }),
      );
  }

  getSolicitudesEstado388(page: number, limit: number): Observable<SolicitudesPage> {
    return this.apollo
      .use(CLIENT_NAME)
      .query<{ collectionReportSolicitud: ReportSolicitudCollectionResponse }>({
        query: GET_SOLICITUDES_ESTADO_388,
        variables: { page, take: limit },
        fetchPolicy: 'network-only',
      })
      .pipe(
        map((result) => {
          const res = result.data?.collectionReportSolicitud;
          return {
            data: (res?.data ?? []) as ReportSolicitud[],
            meta: res?.meta as PaginationMeta,
          };
        }),
      );
  }

  getSolicitudes(page: number, limit: number): Observable<SolicitudesPage> {
    return this.apollo
      .use(CLIENT_NAME)
      .query<{ collectionReportSolicitud: ReportSolicitudCollectionResponse }>({
        query: GET_COLLECTION_REPORT_SOLICITUD,
        variables: { page, take: limit },
        fetchPolicy: 'network-only',
      })
      .pipe(
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
