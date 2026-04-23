import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
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
import { META_FIELDS } from '../../graphql/fragments';

const CLIENT_NAME = 'reportes';

const GET_COLLECTION_REPORT_FORMULARIO = gql`
  query CollectionReportFormulario {
    collectionReportFormulario {
      count
      data {
        ctformulario_id
        descripcion
        estado
        fecha_actualizacion
        fecha_creacion
        fecha_emision
        id
        nombre
        sigla
        tipo_formulario
        usuario_actualizacion
        usuario_creacion
        version
      }
      meta { ${META_FIELDS} }
    }
  }
`;

const GET_ATRIBUTOS_BY_FORMULARIO = gql`
  query CollectionReportAtributoFormulario($formularioId: String!) {
    collectionReportAtributoFormulario(
      query: { where: { formulario_id: { equals: $formularioId } } }
    ) {
      count
      data {
        atributo_formulario_id
        atributo_formulario_nombre
        atributo_formulario_pregunta
        atributo_formulario_ayuda
        atributo_id
        catalogo_id
        ctipo_dato_id
        ctipo_dato_nombre
        ctipo_respuesta_id
        ctipo_respuesta_nombre
        estado_atributo_formulario
        formulario_id
        formulario_nombre
        formulario_sigla
        formulario_version
        hidden
        is_dependent
        is_dependent_catalogo
        is_ws_civil
        is_ws_iess
        is_ws_sri
        item_catalogo_id
        jornada_id
        jornada_nombre
        multivaluado
        num_caracter
        obligatorio
        orden
        readonly
        tipo_formulario
      }
    }
  }
`;

export interface FormulariosResult {
  data: ReportFormulario[];
  count: number;
  meta: PaginationMeta;
}

@Injectable({ providedIn: 'root' })
export class ReportFormularioService {
  constructor(private apollo: Apollo) {}

  getAtributosByFormulario(formularioId: string): Observable<ReportAtributoFormulario[]> {
    return this.apollo
      .use(CLIENT_NAME)
      .query<{ collectionReportAtributoFormulario: ReportAtributoFormularioCollectionResponse }>({
        query: GET_ATRIBUTOS_BY_FORMULARIO,
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

  getFormularios(): Observable<FormulariosResult> {
    return this.apollo
      .use(CLIENT_NAME)
      .watchQuery<{ collectionReportFormulario: ReportFormularioCollectionResponse }>({
        query: GET_COLLECTION_REPORT_FORMULARIO,
        fetchPolicy: 'network-only',
      })
      .valueChanges.pipe(
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
