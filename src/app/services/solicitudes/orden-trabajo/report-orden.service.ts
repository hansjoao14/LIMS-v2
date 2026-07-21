import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  ReportOrden,
  ReportOrdenCollectionResponse,
  ReportOrdenDetalle,
} from '../../../interfaces/solicitudes/orden-trabajo/report-orden.interface';
import {
  GET_COLLECTION_REPORT_ORDEN,
  GET_COLLECTION_REPORT_ORDEN_DETALLE,
} from '../../../graphql/solicitudes/orden-trabajo/report-orden.queries';
import { PaginationMeta } from '../../../interfaces/catalogos/catalogo.interface';

const CLIENT_NAME = 'reportes';

export interface OrdenesPage {
  data: ReportOrden[];
  meta: PaginationMeta | null;
}

@Injectable({ providedIn: 'root' })
export class ReportOrdenService {
  constructor(private apollo: Apollo) {}

  getDetallesByOrdenId(ordenId: string): Observable<ReportOrdenDetalle[]> {
    return this.apollo
      .use(CLIENT_NAME)
      .query<{ collectionReportOrdenDetalle: { data: ReportOrdenDetalle[] } }>({
        query: GET_COLLECTION_REPORT_ORDEN_DETALLE,
        fetchPolicy: 'network-only',
      })
      .pipe(
        map((r) =>
          (r.data?.collectionReportOrdenDetalle?.data ?? []).filter(
            (d) => d.orden_trabajo_id === ordenId,
          ),
        ),
      );
  }

  getOrdenes(page = 1, take = 10): Observable<OrdenesPage> {
    return this.apollo
      .use(CLIENT_NAME)
      .query<{ collectionReportOrden: ReportOrdenCollectionResponse }>({
        query: GET_COLLECTION_REPORT_ORDEN,
        variables: { page, take },
        fetchPolicy: 'network-only',
      })
      .pipe(
        map((result) => {
          const res = result.data?.collectionReportOrden;
          return {
            data: res?.data ?? [],
            meta: (res?.meta ?? null) as PaginationMeta | null,
          };
        }),
      );
  }
}
