import { gql } from 'apollo-angular';
import { META_FIELDS } from '../../fragments';

export const GET_COLLECTION_REPORT_PLAN_MUESTREO = gql`
  query CollectionReportPlanMuestreo($page: Int, $take: Int) {
    collectionReportPlanMuestreo(
      query: { where: { estado: { equals: true } }, pagination: { page: $page, take: $take } }
    ) {
      count
      data {
        actualizado_en
        actualizado_por
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
