import { gql } from 'apollo-angular';
import { META_FIELDS } from '../../fragments';

const REPORT_TICKET_ENTREGA_FIELDS = `
  id
  plan_muestreo_id
  plan_num_secuencial
  plan_codigo_muestreo
  solicitud_id
  solicitud_num_secuencial
  ctambiente_id
  ctambiente_nombre
  entregado_por_id
  entregado_por_nombre
  recibido_por_id
  recibido_por_nombre
  fecha_recepcion
  observaciones
  num_secuencial
  ctestado_id
  ctestado_nombre
  motivo_rechazo
  autorizado_por_id
  autorizado_por_nombre
  fecha_autorizacion
  estado
  creado_en
  creado_por
`;

/**
 * Listado paginado de tickets de entrega activos. El orden lo fija el
 * repositorio en api-reportes (`creado_en` descendente): el ticket recién
 * guardado sale primero.
 *
 * El `query` va como variable, no escrito en el documento, para armar el
 * `where` en TypeScript según el campo por el que se busca. El WhereInput no
 * expone `OR`, así que se busca por un campo a la vez. Mismo criterio que el
 * listado de plan de muestreo.
 */
export const GET_COLLECTION_REPORT_TICKET_ENTREGA = gql`
  query CollectionReportTicketEntrega($q: ReportTicketEntregaQueryInput) {
    collectionReportTicketEntrega(query: $q) {
      count
      data { ${REPORT_TICKET_ENTREGA_FIELDS} }
      meta { ${META_FIELDS} }
    }
  }
`;
