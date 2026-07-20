import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  ReportFormulario,
  ReportFormularioCollectionResponse,
} from '../../interfaces/admin-formularios/report-formulario.interface';
import {
  ReportAtributoFormulario,
  ReportAtributoFormularioCollectionResponse,
} from '../../interfaces/admin-formularios/report-atributo-formulario.interface';
import { PaginationMeta } from '../../interfaces/catalogos/catalogo.interface';
import {
  GET_ATRIBUTOS_BY_FORMULARIO,
  GET_ATRIBUTOS_DEPENDIENTES,
  GET_COLLECTION_REPORT_FORMULARIO,
  GET_FORMULARIO_BY_CT_ID,
} from '../../graphql/admin-formularios/report-formulario.queries';

const CLIENT_NAME = 'reportes';

export interface FormulariosResult {
  data: ReportFormulario[];
  count: number;
  meta: PaginationMeta;
}

export interface AtributosPageResult {
  data: ReportAtributoFormulario[];
  meta: PaginationMeta;
}

@Injectable({ providedIn: 'root' })
export class ReportFormularioService {
  constructor(private apollo: Apollo) {}

  getAtributosByFormulario(
    formularioId: string,
    page = 1,
    take = 10,
    pregunta = '',
  ): Observable<AtributosPageResult> {
    return this.apollo
      .use(CLIENT_NAME)
      .query<{ collectionReportAtributoFormulario: ReportAtributoFormularioCollectionResponse }>({
        query: GET_ATRIBUTOS_BY_FORMULARIO,
        variables: { formularioId, page, take, pregunta },
        fetchPolicy: 'network-only',
      })
      .pipe(
        map((result) => {
          const res = result.data?.collectionReportAtributoFormulario;
          const data = [...(res?.data ?? [])].sort((a, b) => a.orden - b.orden);
          return { data, meta: res?.meta as PaginationMeta };
        }),
      );
  }

  getAtributosDependientes(formularioId: string): Observable<ReportAtributoFormulario[]> {
    return this.apollo
      .use(CLIENT_NAME)
      .query<{ collectionReportAtributoFormulario: ReportAtributoFormularioCollectionResponse }>({
        query: GET_ATRIBUTOS_DEPENDIENTES,
        variables: { formularioId },
        fetchPolicy: 'network-only',
      })
      .pipe(
        map((result) => {
          const data = result.data?.collectionReportAtributoFormulario?.data ?? [];
          return [...data].sort((a, b) => a.orden - b.orden) as ReportAtributoFormulario[];
        }),
      );
  }

  getFormularioByCTId(ctformularioId: number): Observable<ReportFormulario | null> {
    return this.apollo
      .use(CLIENT_NAME)
      .query<{ collectionReportFormulario: ReportFormularioCollectionResponse }>({
        query: GET_FORMULARIO_BY_CT_ID,
        variables: { ctformularioId },
        fetchPolicy: 'network-only',
      })
      .pipe(map((result) => result.data?.collectionReportFormulario?.data?.[0] ?? null));
  }

  getFormularios(): Observable<FormulariosResult> {
    return this.apollo
      .use(CLIENT_NAME)
      .query<{ collectionReportFormulario: ReportFormularioCollectionResponse }>({
        query: GET_COLLECTION_REPORT_FORMULARIO,
        fetchPolicy: 'network-only',
      })
      .pipe(
        map((result) => {
          const res = result.data?.collectionReportFormulario;
          return {
            data: (res?.data ?? []) as ReportFormulario[],
            count: res?.count ?? 0,
            meta: res?.meta as PaginationMeta,
          };
        }),
      );
  }
}
