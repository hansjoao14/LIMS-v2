import { gql } from 'apollo-angular';
import { META_FIELDS } from '../../fragments';

/**
 * Planes en un estado concreto, paginados: alimenta el panel de búsqueda del
 * "Código de muestra" en el ticket de entrega.
 */
export const GET_PLANES_MUESTREO_POR_ESTADO = gql`
  query PlanesMuestreoPorEstado($ctestadoId: Int, $page: Int, $take: Int) {
    collectionReportPlanMuestreo(
      query: {
        where: { estado: { equals: true }, ctestado_id: { equals: $ctestadoId } }
        pagination: { page: $page, take: $take }
      }
    ) {
      count
      data {
        id
        codigo_muestreo
        num_secuencial
        ctestado_id
        ctestado_nombre
        ctambiente_nombre
        solicitud_id
        solicitud_num_secuencial
      }
      meta { ${META_FIELDS} }
    }
  }
`;

export const GET_COLLECTION_REPORT_PLAN_MUESTREO = gql`
  query CollectionReportPlanMuestreo($page: Int, $take: Int) {
    collectionReportPlanMuestreo(
      query: { where: { estado: { equals: true } }, pagination: { page: $page, take: $take } }
    ) {
      count
      data {
        actualizado_en
        actualizado_por
        codigo_muestreo
        creado_en
        creado_por
        ctambiente_id
        ctambiente_nombre
        ctestado_id
        ctestado_nombre
        ctformulario_id
        ctformulario_nombre
        entidad_id
        entidad_nombre
        estado
        id
        num_secuencial
        periodo_anio
        periodo_id
        periodo_nombre_mes
        solicitud_id
        solicitud_num_secuencial
        usuario_id
        usuario_nombre_completo
      }
      meta { ${META_FIELDS} }
    }
  }
`;
