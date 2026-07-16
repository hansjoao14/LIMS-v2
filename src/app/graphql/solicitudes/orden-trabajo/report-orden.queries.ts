import { gql } from 'apollo-angular';
import { META_FIELDS } from '../../fragments';

export const GET_COLLECTION_REPORT_ORDEN_DETALLE = gql`
  query CollectionReportOrdenDetalle {
    collectionReportOrdenDetalle(query: { where: { estado: { equals: true } } }) {
      data {
        id
        orden_trabajo_id
        solicitud_ensayo_id
        analisis
        identificacion
        metodo
        ctambiente_id
        ctambiente_nombre
        ctambiente_id_padre
        ctambiente_nombre_padre
        ensayo_id_ensayo
        estado
      }
    }
  }
`;

export const GET_COLLECTION_REPORT_ORDEN = gql`
  query CollectionReportOrden {
    collectionReportOrden(query: { where: { estado: { equals: true } } }) {

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
