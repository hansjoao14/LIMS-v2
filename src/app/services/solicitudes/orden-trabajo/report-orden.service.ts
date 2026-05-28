import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ReportOrden, ReportOrdenCollectionResponse } from '../../../interfaces/solicitudes/orden-trabajo/report-orden.interface';
import { META_FIELDS } from '../../../graphql/fragments';

const CLIENT_NAME = 'reportes';

const GET_COLLECTION_REPORT_ORDEN = gql`
  query CollectionReportOrden {
    collectionReportOrden {
      count
      data {
        actualizado_en
        actualizado_por
        creado_en
        creado_por
        ctambiente_id
        ctambiente_nombre
        ctcaracteristica_horaria_id
        ctcaracteristica_horaria_nombre
        ctestado_id
        ctestado_nombre
        ctformulario_id
        ctformulario_nombre
        ctpunto_critico_id
        ctpunto_critico_nombre
        ctuso_suelo_id
        ctuso_suelo_nombre
        direccion_pca
        entidad_id
        entidad_nombre
        estado
        id
        num_secuencial
        observacion
        periodo_anio
        periodo_id
        periodo_nombre_mes
        secuencial_id
        solicitud_id
        solicitud_num_secuencial
        telefono_pca
        usuario_id
        usuario_nombre_completo
      }
      meta { ${META_FIELDS} }
    }
  }
`;

@Injectable({ providedIn: 'root' })
export class ReportOrdenService {
  constructor(private apollo: Apollo) {}

  getOrdenes(): Observable<ReportOrden[]> {
    return this.apollo
      .use(CLIENT_NAME)
      .query<{ collectionReportOrden: ReportOrdenCollectionResponse }>({
        query: GET_COLLECTION_REPORT_ORDEN,
        fetchPolicy: 'network-only',
      })
      .pipe(map((result) => result.data?.collectionReportOrden?.data ?? []));
  }
}
