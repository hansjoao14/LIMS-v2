// src/app/graphql/fragments.ts
var META_FIELDS = `
  hasNextPage
  hasPrevPage
  limit
  nextPage
  page
  prevPage
  skip
  total
  totalPages
`;
var REPORT_VALOR_SOLICITUD_FIELDS = `
  atributo_formulario_id
  atributo_formulario_nombre
  atributo_formulario_pregunta
  atributo_id
  ctipo_dato_nombre
  fecha_creacion
  id_solicitud
  item_catalogo_id
  nombres_completos
  valor_catalogo
  valor_texto
  valor_numero
  valor_fecha
  valor_booleano
  valor_multiple
  valor_solicitud_id
`;
var REPORT_SOLICITUD_FIELDS = `
  ctestado_id
  descripcion_solicitud
  establecimiento_id
  establecimiento_nombre
  estado_logico_solicitud
  estado_solicitud
  fecha_actualizacion
  fecha_creacion
  formulario_id
  formulario_nombre
  id_solicitud
  nombres_completos
  num_secuencial
  periodo_id
  periodo_nombre
  prioridad_id
  prioridad_nombre
  secuencial_id
  usuario_actualizacion
  usuario_creacion
  usuario_id
  usuario_nombre
`;

export {
  META_FIELDS,
  REPORT_VALOR_SOLICITUD_FIELDS,
  REPORT_SOLICITUD_FIELDS
};
//# sourceMappingURL=chunk-XIRXEHG5.js.map
