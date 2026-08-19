import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { EstadoOrden } from '../../../core/utils/orden-tabla.utils';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  PlanesMuestreoOpcionPage,
  PlanesMuestreoPage,
  PlanMuestreoOpcion,
  ReportPlanMuestreo,
  ReportPlanMuestreoCollectionResponse,
} from '../../../interfaces/solicitudes/plan-muestreo/report-plan-muestreo.interface';
import { PaginationMeta } from '../../../interfaces/catalogos/catalogo.interface';
import {
  GET_COLLECTION_REPORT_PLAN_MUESTREO,
  GET_PLANES_MUESTREO_POR_ESTADO,
} from '../../../graphql/solicitudes/plan-muestreo/report-plan-muestreo.queries';

const CLIENT_NAME = 'reportes';

/** Campos del listado por los que se puede buscar, tal como los nombra la vista. */
/**
 * Columnas del listado por las que se puede ordenar. Son las que se muestran en
 * la tabla; el `orderBy` de la colección admite muchas más.
 */
export type CampoOrdenPlan =
  | 'num_secuencial'
  | 'solicitud_num_secuencial'
  | 'codigo_muestreo'
  | 'usuario_nombre_completo'
  | 'ctestado_nombre'
  | 'creado_en';

/**
 * Orden inicial. El backend, si no se le manda nada, ordena por `id: 'asc'` —
 * o sea por UUID, que es orden aleatorio y hacía que los planes salieran
 * mezclados.
 *
 * Se arranca por `creado_en` y no por `num_secuencial` a propósito: el número
 * es NULL hasta que el plan se finaliza, y los NULL caen al final del DESC, con
 * lo que un borrador recién hecho quedaría escondido en las últimas páginas.
 */
export const ORDEN_INICIAL_PLAN: EstadoOrden<CampoOrdenPlan> = {
  campo: 'creado_en',
  direccion: 'DESC',
};

/** Columnas de fecha: al ordenarlas por primera vez conviene DESC. */
export const CAMPOS_FECHA_PLAN: readonly CampoOrdenPlan[] = ['creado_en'];

export type CampoBusquedaPlan = 'num_secuencial' | 'solicitud_num_secuencial' | 'codigo_muestreo';

/** Finalizado Solicitud: el plan ya está autorizado y su muestra puede entregarse. */
export const ESTADO_PLAN_FINALIZADO = 2023;

@Injectable({ providedIn: 'root' })
export class ReportPlanMuestreoService {
  constructor(private apollo: Apollo) {}

  /**
   * Listado de planes. `campo` y `texto` son el buscador: se filtra por UN campo
   * a la vez porque el WhereInput no expone `OR`. El filtro va en el `where` del
   * servidor y no sobre la página ya recibida, para no romper la paginación.
   */
  getPlanes(
    page = 1,
    take = 10,
    campo: CampoBusquedaPlan | null = null,
    texto = '',
    orden: EstadoOrden<CampoOrdenPlan> = ORDEN_INICIAL_PLAN,
  ): Observable<PlanesMuestreoPage> {
    const termino = texto.trim();
    return this.apollo
      .use(CLIENT_NAME)
      .query<{ collectionReportPlanMuestreo: ReportPlanMuestreoCollectionResponse }>({
        query: GET_COLLECTION_REPORT_PLAN_MUESTREO,
        variables: {
          q: {
            where: {
              estado: { equals: true },
              // Solo se agrega la clave si hay texto: `contains: null` o `''`
              // no sirven como "sin filtro" (Prisma rechaza el null).
              ...(campo && termino ? { [campo]: { contains: termino } } : {}),
            },
            pagination: { page, take },
            orderBy: { [orden.campo]: orden.direccion },
          },
        },
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
