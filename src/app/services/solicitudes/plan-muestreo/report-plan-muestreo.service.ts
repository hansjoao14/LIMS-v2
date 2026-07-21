import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  ReportPlanMuestreo,
  ReportPlanMuestreoCollectionResponse,
} from '../../../interfaces/solicitudes/plan-muestreo/report-plan-muestreo.interface';
import { PaginationMeta } from '../../../interfaces/catalogos/catalogo.interface';
import { GET_COLLECTION_REPORT_PLAN_MUESTREO } from '../../../graphql/solicitudes/plan-muestreo/report-plan-muestreo.queries';

const CLIENT_NAME = 'reportes';

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
}
