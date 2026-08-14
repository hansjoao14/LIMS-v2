import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import {
  ReportTicketEntregaCollectionResponse,
  TicketsEntregaPage,
} from '../../../interfaces/ticket-entrega-muestras/ticket-entrega-muestras.interface';
import { PaginationMeta } from '../../../interfaces/catalogos/catalogo.interface';
import { GET_COLLECTION_REPORT_TICKET_ENTREGA } from '../../../graphql/solicitudes/ticket-entrega/report-ticket-entrega.queries';

const CLIENT_NAME = 'reportes';

/**
 * Listado de tickets de entrega. Va por GraphQL contra api-reportes, igual que
 * el resto de los listados; la escritura (crear / dar de baja) va por REST en
 * `TicketEntregaMuestrasService`.
 */
@Injectable({ providedIn: 'root' })
export class ReportTicketEntregaService {
  constructor(private apollo: Apollo) {}

  getTickets(page = 1, take = 10): Observable<TicketsEntregaPage> {
    return this.apollo
      .use(CLIENT_NAME)
      .query<{ collectionReportTicketEntrega: ReportTicketEntregaCollectionResponse }>({
        query: GET_COLLECTION_REPORT_TICKET_ENTREGA,
        variables: { page, take },
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
