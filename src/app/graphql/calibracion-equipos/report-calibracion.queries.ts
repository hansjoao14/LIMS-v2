import { gql } from 'apollo-angular';
import { META_FIELDS } from '../fragments';

const REPORT_CALIBRACION_FIELDS = `
  id
  num_secuencial
  secuencial_id
  ctformulario_id
  ctformulario_nombre
  analista_id
  analista_nombre
  fecha_verificacion
  evaluacion
  observaciones
  tipo_calibrador_id
  tipo_calibrador
  ctestado_id
  ctestado_nombre
  entidad_id
  estado
  creado_en
  creado_por
`;

const REPORT_VALOR_CALIBRACION_FIELDS = `
  valor_calibracion_id
  calibracion_id
  atributo_formulario_id
  atributo_formulario_nombre
  ctipo_dato_nombre
  valor_texto
  valor_numero
  valor_fecha
  valor_booleano
  valor_multiple
  valor_catalogo
  estado
`;

/**
 * Listado paginado de verificaciones. Sale de `REPORTES.vw_calibracion_report`,
 * que ya resuelve analista, calibrador y estado: el front no arma la fila.
 *
 * El orden lo fija el repositorio en api-reportes (`creado_en` descendente).
 * `estado` deja fuera las dadas de baja, que siguen en la base.
 */
export const GET_COLLECTION_REPORT_CALIBRACION = gql`
  query CollectionReportCalibracion($page: Int, $take: Int) {
    collectionReportCalibracion(
      query: { where: { estado: { equals: true } }, pagination: { page: $page, take: $take } }
    ) {
      count
      data { ${REPORT_CALIBRACION_FIELDS} }
      meta { ${META_FIELDS} }
    }
  }
`;

/**
 * Respuestas vigentes de una verificación, para precargar el formulario al
 * editar. Al editar se dan de baja las anteriores, así que `estado` deja una
 * sola respuesta por pregunta.
 */
export const GET_RESPUESTAS_CALIBRACION = gql`
  query CollectionReportValorCalibracion($idCalibracion: String!) {
    collectionReportValorCalibracion(
      query: {
        where: { calibracion_id: { equals: $idCalibracion } estado: { equals: true } }
        pagination: { page: 1, take: 100 }
      }
    ) {
      count
      data { ${REPORT_VALOR_CALIBRACION_FIELDS} }
      meta { ${META_FIELDS} }
    }
  }
`;
