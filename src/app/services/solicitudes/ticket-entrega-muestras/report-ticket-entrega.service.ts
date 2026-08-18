import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { EstadoOrden } from '../../../core/utils/orden-tabla.utils';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import {
  ReportTicketEntregaCollectionResponse,
  TicketsEntregaPage,
} from '../../../interfaces/ticket-entrega-muestras/ticket-entrega-muestras.interface';
import { PaginationMeta } from '../../../interfaces/catalogos/catalogo.interface';
import { GET_COLLECTION_REPORT_TICKET_ENTREGA } from '../../../graphql/solicitudes/ticket-entrega/report-ticket-entrega.queries';

const CLIENT_NAME = 'reportes';

/** Campos del listado por los que se puede buscar, como los nombra la vista. */
/** Columnas del listado por las que se puede ordenar. */
export type CampoOrdenTicket =
  | 'num_secuencial'
  | 'plan_num_secuencial'
  | 'entregado_por_nombre'
  | 'recibido_por_nombre'
  | 'fecha_recepcion'
  | 'ctestado_nombre'
  | 'creado_en';

/**
 * Orden inicial: lo último registrado primero. Coincide con el default del
 * repositorio de api-reportes, pero se manda explícito para que el orden viva
 * junto a la consulta y no dependa de un default del backend.
 *
 * Por `creado_en` y no por `num_secuencial`: el número recién se asigna al
 * autorizar, así que los tickets pendientes lo tienen en NULL y quedarían al
 * final — justo los que hay que atender.
 */
export const ORDEN_INICIAL_TICKET: EstadoOrden<CampoOrdenTicket> = {
  campo: 'creado_en',
  direccion: 'DESC',
};

/** Columnas de fecha: al ordenarlas por primera vez conviene DESC. */
export const CAMPOS_FECHA_TICKET: readonly CampoOrdenTicket[] = ['fecha_recepcion', 'creado_en'];

export type CampoBusquedaTicket = 'num_secuencial' | 'plan_num_secuencial';

/**
 * Listado de tickets de entrega. Va por GraphQL contra api-reportes, igual que
 * el resto de los listados; la escritura (crear / dar de baja) va por REST en
 * `TicketEntregaMuestrasService`.
 */
@Injectable({ providedIn: 'root' })
export class ReportTicketEntregaService {
  constructor(private apollo: Apollo) {}

  /**
   * Listado de tickets. `campo` y `texto` son el buscador: se filtra por UN
   * campo a la vez, porque el WhereInput no expone `OR`. El filtro va en el
   * `where` del servidor para no romper la paginación.
   */
  getTickets(
    page = 1,
    take = 10,
    campo: CampoBusquedaTicket | null = null,
    texto = '',
    orden: EstadoOrden<CampoOrdenTicket> = ORDEN_INICIAL_TICKET,
  ): Observable<TicketsEntregaPage> {
    const termino = texto.trim();
    return this.apollo
      .use(CLIENT_NAME)
      .query<{ collectionReportTicketEntrega: ReportTicketEntregaCollectionResponse }>({
        query: GET_COLLECTION_REPORT_TICKET_ENTREGA,
        variables: {
          q: {
            where: {
              estado: { equals: true },
              // La clave solo se agrega si hay texto: `contains: null` lo
              // rechaza Prisma ("Argument `contains` must not be null").
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
          const res = result.data?.collectionReportTicketEntrega;
          return {
            data: res?.data ?? [],
            meta: (res?.meta ?? null) as PaginationMeta | null,
          };
        }),
      );
  }
}
