import { gql } from 'apollo-angular';
import { META_FIELDS } from '../fragments';
import { REPORT_FORMULARIO_FIELDS } from './report-formulario.fragments';

export const GET_COLLECTION_REPORT_FORMULARIO = gql`
  query CollectionReportFormulario {
    collectionReportFormulario {
      count
      data { ${REPORT_FORMULARIO_FIELDS} }
      meta { ${META_FIELDS} }
    }
  }
`;

export const GET_FORMULARIO_BY_CT_ID = gql`
  query CollectionReportFormularioByCTId($ctformularioId: Int!) {
    collectionReportFormulario(
      query: { where: { ctformulario_id: { equals: $ctformularioId } } }
    ) {
      count
      data { ${REPORT_FORMULARIO_FIELDS} }
    }
  }
`;

// Nota: trae 3 campos extra (num_rango, num_atras, num_adelante) que
// GET_ATRIBUTOS_BY_FORMULARIO no necesita — por eso no comparten fragment.
export const GET_ATRIBUTOS_DEPENDIENTES = gql`
  query CollectionReportAtributoFormularioDependientes($formularioId: String!) {
    collectionReportAtributoFormulario(
      query: { where: { formulario_id: { equals: $formularioId }, is_dependent: { equals: true } } }
    ) {
      count
      data {
        atributo_formulario_id
        atributo_formulario_nombre
        atributo_formulario_pregunta
        formulario_id
        is_dependent
        orden
        ctipo_dato_id
        ctipo_dato_nombre
        ctipo_respuesta_id
        ctipo_respuesta_nombre
        catalogo_id
        item_catalogo_id
        jornada_id
        atributo_id
        num_caracter
        num_rango
        num_atras
        num_adelante
        is_dependent_catalogo
        estado_atributo_formulario
        formulario_nombre
        formulario_sigla
        formulario_version
        atributo_formulario_ayuda
        hidden
        is_ws_civil
        is_ws_iess
        is_ws_sri
        jornada_nombre
        multivaluado
        obligatorio
        readonly
        tipo_formulario
        is_list_empleado
      }
    }
  }
`;

export const GET_ATRIBUTOS_BY_FORMULARIO = gql`
  query CollectionReportAtributoFormulario($formularioId: String!, $page: Int, $take: Int) {
    collectionReportAtributoFormulario(
      query: {
        where: { formulario_id: { equals: $formularioId } }
        pagination: { page: $page, take: $take }
      }
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
        is_list_empleado
      }
      meta { ${META_FIELDS} }
    }
  }
`;
