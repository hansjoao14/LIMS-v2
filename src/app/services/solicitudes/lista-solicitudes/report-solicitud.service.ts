import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable, expand, reduce, EMPTY, of } from 'rxjs';
import { map, delay } from 'rxjs/operators';
import {
  ReportSolicitud,
  ReportSolicitudCollectionResponse,
  ReportSolicitudEnsayo,
  ReportSolicitudEnsayoCollectionResponse,
  ReportValorSolicitud,
  ReportValorSolicitudCollectionResponse,
} from '../../../interfaces/solicitudes/lista-solicitudes/report-solicitud.interface';
import { PaginationMeta } from '../../../interfaces/catalogos/catalogo.interface';
import {
  GET_COLLECTION_REPORT_SOLICITUD,
  GET_ENSAYOS_SOLICITUD,
  GET_SOLICITUDES_BY_FORMULARIO,
  GET_SOLICITUDES_ESTADO_388,
  GET_SOLICITUDES_FINALIZADAS,
  GET_SOLICITUDES_FINALIZADAS_BY_FORMULARIO_CT,
  GET_SOLICITUD_BY_ID,
  GET_VALORES_BY_TIPO_FORMULARIO,
  GET_VALORES_SOLICITUD,
} from '../../../graphql/solicitudes/lista-solicitudes/report-solicitud.queries';

const CLIENT_NAME = 'reportes';

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

  // formularioCtIds acota el listado a ciertos tipos de formulario (p. ej.
  // orden-trabajo-in-situ solo admite solicitudes de los formularios
  // 2029/380); si se omite, trae todas las finalizadas sin ese filtro.
  /**
   * `excluirSolicitudIds` saca del listado las solicitudes que ya tienen un
   * plan de muestreo vigente. Solo aplica a la variante por formulario, que es
   * la que usa el selector de plan-muestreo/paso1.
   */
  getSolicitudesFinalizadas(
    page: number,
    limit: number,
    formularioCtIds?: number[],
    excluirSolicitudIds: string[] = [],
  ): Observable<SolicitudesPage> {
    const query =
      formularioCtIds != null
        ? GET_SOLICITUDES_FINALIZADAS_BY_FORMULARIO_CT
        : GET_SOLICITUDES_FINALIZADAS;
    const variables =
      formularioCtIds != null
        ? { page, take: limit, formularioCtIds, excluirSolicitudIds }
        : { page, take: limit };
    return this.apollo
      .use(CLIENT_NAME)
      .query<{ collectionReportSolicitud: ReportSolicitudCollectionResponse }>({
        query,
        variables,
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

  getSolicitudesByFormulario(formularioId: string): Observable<ReportSolicitud[]> {
    const PAGE_SIZE = 200;
    const fetchPage = (page: number) =>
      this.apollo
        .use(CLIENT_NAME)
        .query<{ collectionReportSolicitud: ReportSolicitudCollectionResponse }>({
          query: GET_SOLICITUDES_BY_FORMULARIO,
          variables: { formularioId, page, take: PAGE_SIZE },
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

    return fetchPage(1).pipe(
      expand(({ meta }) => (meta?.hasNextPage ? fetchPage(meta.nextPage!) : EMPTY)),
      reduce((acc, { data }) => acc.concat(data), [] as ReportSolicitud[]),
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

  // TODO: reemplazar con mutación GraphQL real cuando el endpoint esté disponible
  eliminarVehiculo(id: string): Observable<void> {
    return of(undefined).pipe(delay(400));
  }

  // TODO: reemplazar con mutación GraphQL real cuando el endpoint esté disponible
  actualizarVehiculo(id: string, valores: Record<string, unknown>): Observable<void> {
    return of(undefined).pipe(delay(400));
  }

  // TODO: reemplazar con mutación GraphQL real cuando el endpoint esté disponible
  autorizarVehiculo(id: string): Observable<void> {
    return of(undefined).pipe(delay(400));
  }

  // TODO: reemplazar con mutación GraphQL real cuando el endpoint esté disponible
  rechazarVehiculo(id: string, motivo: string): Observable<void> {
    return of(undefined).pipe(delay(400));
  }

  // TODO: reemplazar con mutación GraphQL real cuando el endpoint esté disponible
  eliminarContraloria(id: string): Observable<void> {
    return of(undefined).pipe(delay(400));
  }

  // TODO: reemplazar con mutación GraphQL real cuando el endpoint esté disponible
  actualizarContraloria(id: string, valores: Record<string, unknown>): Observable<void> {
    return of(undefined).pipe(delay(400));
  }

  // TODO: reemplazar con mutación GraphQL real cuando el endpoint esté disponible
  autorizarContraloria(id: string): Observable<void> {
    return of(undefined).pipe(delay(400));
  }

  // TODO: reemplazar con mutación GraphQL real cuando el endpoint esté disponible
  rechazarContraloria(id: string, motivo: string): Observable<void> {
    return of(undefined).pipe(delay(400));
  }
}
