import { gql } from 'apollo-angular';
import {
  META_FIELDS,
  REPORT_SOLICITUD_FIELDS,
  REPORT_VALOR_SOLICITUD_FIELDS,
} from '../../fragments';

//agregar el id del formulario, el tema de los roles acceso
export const GET_COLLECTION_REPORT_SOLICITUD = gql`
  query CollectionReportSolicitud($page: Int, $take: Int) {
    collectionReportSolicitud(
      query: {
        orderBy: { fecha_creacion: DESC }
        where: { ctestado_id: { in: [2, 51, 387, 388] } }
        pagination: { page: $page, take: $take }
      }
    ) {
      data { ${REPORT_SOLICITUD_FIELDS} }
      count
      meta { ${META_FIELDS} }
    }
  }
`;

export const GET_VALORES_SOLICITUD = gql`
  query CollectionReportValorSolicitud($id: String!) {
    collectionReportValorSolicitud(
      query: {
        where: { id_solicitud: { equals: $id } estado: { equals: true } }
        pagination: { page: 1, take: 100 }
      }
    ) {
      count
      data { ${REPORT_VALOR_SOLICITUD_FIELDS} }
    }
  }
`;

export const GET_VALORES_BY_TIPO_FORMULARIO = gql`
  query CollectionReportValorSolicitud($tipoFormularioId: Int!, $page: Int, $take: Int) {
    collectionReportValorSolicitud(
      query: {
        orderBy: { tipo_formulario_id: ASC }
        where: { tipo_formulario_id: { equals: $tipoFormularioId } estado: { equals: true } }
        pagination: { page: $page, take: $take }
      }
    ) {
      count
      data { ${REPORT_VALOR_SOLICITUD_FIELDS} }
      meta { ${META_FIELDS} }
    }
  }
`;

export const GET_SOLICITUDES_FINALIZADAS = gql`
  query CollectionReportSolicitudesFinalizadas($page: Int, $take: Int) {
    collectionReportSolicitud(
      query: {
        orderBy: { fecha_creacion: DESC }
        where: { ctestado_id: { equals: 387 } }
        pagination: { page: $page, take: $take }
      }
    ) {
      data { ${REPORT_SOLICITUD_FIELDS} }
      count
      meta { ${META_FIELDS} }
    }
  }
`;

// Igual que GET_SOLICITUDES_FINALIZADAS pero acotada a un conjunto de
// formulario_ct_id (p. ej. orden-trabajo-in-situ solo admite solicitudes de
// los formularios 2029/380), en vez de todas las finalizadas.
export const GET_SOLICITUDES_FINALIZADAS_BY_FORMULARIO_CT = gql`
  query CollectionReportSolicitudesFinalizadasByFormularioCt(
    $page: Int
    $take: Int
    $formularioCtIds: [Int!]
    $excluirSolicitudIds: [String!]
  ) {
    collectionReportSolicitud(
      query: {
        orderBy: { fecha_creacion: DESC }
        where: {
          ctestado_id: { equals: 387 }
          formulario_ct_id: { in: $formularioCtIds }
          # Solicitudes que ya tienen un plan de muestreo vigente (Pendiente o
          # Finalizado). Los ids los trae getSolicitudIdsConPlanVigente: el
          # WhereInput no puede preguntar por una tabla relacionada, así que la
          # exclusion se arma con notIn. Va en el where del servidor y no
          # sobre el arreglo recibido, para no romper la paginacion.
          # Con la lista vacía, notIn no filtra nada (verificado).
          id_solicitud: { notIn: $excluirSolicitudIds }
        }
        pagination: { page: $page, take: $take }
      }
    ) {
      data { ${REPORT_SOLICITUD_FIELDS} }
      count
      meta { ${META_FIELDS} }
    }
  }
`;

export const GET_SOLICITUDES_ESTADO_388 = gql`
  query CollectionReportSolicitudesEstado388($page: Int, $take: Int) {
    collectionReportSolicitud(
      query: {
        orderBy: { fecha_creacion: DESC }
        where: { ctestado_id: { equals: 388 } }
        pagination: { page: $page, take: $take }
      }
    ) {
      data { ${REPORT_SOLICITUD_FIELDS} }
      count
      meta { ${META_FIELDS} }
    }
  }
`;

export const GET_SOLICITUDES_BY_FORMULARIO = gql`
  query CollectionReportSolicitudByFormulario($formularioId: String!, $page: Int, $take: Int) {
    collectionReportSolicitud(
      query: {
        orderBy: { fecha_creacion: DESC }
        where: { formulario_id: { equals: $formularioId } }
        pagination: { page: $page, take: $take }
      }
    ) {
      data { ${REPORT_SOLICITUD_FIELDS} }
      count
      meta { ${META_FIELDS} }
    }
  }
`;

export const GET_SOLICITUD_BY_ID = gql`
  query CollectionReportSolicitudById($id: String!) {
    collectionReportSolicitud(
      query: { where: { id_solicitud: { equals: $id } } }
    ) {
      data { ${REPORT_SOLICITUD_FIELDS} }
    }
  }
`;

export const GET_ENSAYOS_SOLICITUD = gql`
  query CollectionReportSolicitudEnsayo($solicitudId: String!, $page: Int, $take: Int) {
    collectionReportSolicitudEnsayo(
      query: {
        where: { solicitud_id: { equals: $solicitudId } estado: { equals: true } }
        pagination: { page: $page, take: $take }
      }
    ) {
      count
      data {
        analisis
        ctambiental_id
        ctipo_ambiental_nombre
        ensayo_id
        estado
        id
        identificacion
        metodo
        solicitud_id
      }
      meta { ${META_FIELDS} }
    }
  }
`;
