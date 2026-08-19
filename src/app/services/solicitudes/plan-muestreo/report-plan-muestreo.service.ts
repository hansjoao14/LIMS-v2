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
  GET_SOLICITUD_IDS_CON_PLAN_VIGENTE,
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

/** Rechazado: el plan ya no cuenta, ni para el índice único ni para el selector. */
export const ESTADO_PLAN_RECHAZADO = 51;

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
  /**
   * Ids de las solicitudes que YA tienen un plan de muestreo vigente.
   *
   * "Vigente" es la misma condición del índice único de la base
   * (UQ_plan_muestreo_solicitud_ambiente_vigente): activo y no rechazado. Un
   * plan rechazado o dado de baja no cuenta, así que su solicitud vuelve a
   * quedar disponible.
   *
   * ⚠️ 200 es el MÁXIMO que acepta la paginación de la colección: con un valor
   * mayor la consulta falla con "La cantidad de registros no puede ser mayor a
   * 200", el catch deja la lista vacía y no se excluye nada — el bug se ve como
   * "el filtro no hace nada".
   *
   * Con más de 200 planes vigentes los excedentes no se excluirían y volvería a
   * aparecer el P2002 al elegirlos. Si el volumen crece hay que resolverlo con
   * una columna calculada en la vista de solicitudes, como
   * `tiene_ticket_en_curso`; desde el front no hay forma de subir ese tope.
   */
  getSolicitudIdsConPlanVigente(take = 200): Observable<string[]> {
    return this.apollo
      .use(CLIENT_NAME)
      .query<{ collectionReportPlanMuestreo: { data: { solicitud_id: string }[] } }>({
        query: GET_SOLICITUD_IDS_CON_PLAN_VIGENTE,
        variables: {
          q: {
            where: {
              estado: { equals: true },
              ctestado_id: { notIn: [ESTADO_PLAN_RECHAZADO] },
            },
            pagination: { page: 1, take },
          },
        },
        fetchPolicy: 'network-only',
      })
      .pipe(
        map((result) => [
          ...new Set(
            (result.data?.collectionReportPlanMuestreo?.data ?? []).map((p) => p.solicitud_id),
          ),
        ]),
      );
  }
}
