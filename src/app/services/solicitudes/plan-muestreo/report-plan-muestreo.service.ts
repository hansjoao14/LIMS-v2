import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  ReportPlanMuestreo,
  ReportPlanMuestreoCollectionResponse,
} from '../../../interfaces/solicitudes/plan-muestreo/report-plan-muestreo.interface';
import { PaginationMeta } from '../../../interfaces/catalogos/catalogo.interface';
import {
  GET_COLLECTION_REPORT_PLAN_MUESTREO,
  GET_PLANES_MUESTREO_POR_ESTADO,
} from '../../../graphql/solicitudes/plan-muestreo/report-plan-muestreo.queries';

const CLIENT_NAME = 'reportes';

/** Finalizado Solicitud: el plan ya está autorizado y su muestra puede entregarse. */
export const ESTADO_PLAN_FINALIZADO = 2023;

/** Subconjunto de campos que pide `GET_PLANES_MUESTREO_POR_ESTADO`. */
export type PlanMuestreoOpcion = Pick<
  ReportPlanMuestreo,
  | 'id'
  | 'codigo_muestreo'
  | 'num_secuencial'
  | 'ctestado_id'
  | 'ctestado_nombre'
  | 'ctambiente_nombre'
  | 'solicitud_id'
  | 'solicitud_num_secuencial'
>;

export interface PlanesMuestreoOpcionPage {
  data: PlanMuestreoOpcion[];
  meta: PaginationMeta | null;
}

export interface PlanesMuestreoPage {
  data: ReportPlanMuestreo[];
  meta: PaginationMeta | null;
}

@Injectable({ providedIn: 'root' })
export class ReportPlanMuestreoService {
  constructor(private apollo: Apollo) {}

  getPlanes(page = 1, take = 10): Observable<PlanesMuestreoPage> {
    return this.apollo
      .use(CLIENT_NAME)
      .query<{ collectionReportPlanMuestreo: ReportPlanMuestreoCollectionResponse }>({
        query: GET_COLLECTION_REPORT_PLAN_MUESTREO,
        variables: { page, take },
        fetchPolicy: 'network-only',
      })
      .pipe(
        map((result) => {
          const res = result.data?.collectionReportPlanMuestreo;
          return {
            data: res?.data ?? [],
            meta: (res?.meta ?? null) as PaginationMeta | null,
          };
        }),
      );
  }

  /** Planes de un estado concreto, paginados: alimenta el panel de búsqueda. */
  getPlanesPorEstado(
    page = 1,
    take = 8,
    ctestadoId = ESTADO_PLAN_FINALIZADO,
  ): Observable<PlanesMuestreoOpcionPage> {
    return this.apollo
      .use(CLIENT_NAME)
      .query<{
        collectionReportPlanMuestreo: {
          count: number;
          data: PlanMuestreoOpcion[];
          meta: PaginationMeta;
        };
      }>({
        query: GET_PLANES_MUESTREO_POR_ESTADO,
        variables: { ctestadoId, page, take },
        fetchPolicy: 'network-only',
      })
      .pipe(
        map((result) => {
          const res = result.data?.collectionReportPlanMuestreo;
          return {
            data: res?.data ?? [],
            meta: (res?.meta ?? null) as PaginationMeta | null,
          };
        }),
      );
  }
}
