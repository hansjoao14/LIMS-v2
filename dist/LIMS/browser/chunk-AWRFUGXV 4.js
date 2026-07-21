import {
  META_FIELDS
} from "./chunk-XIRXEHG5.js";
import {
  Apollo,
  gql
} from "./chunk-DPKW7NRU.js";
import {
  Injectable,
  map,
  setClassMetadata,
  ɵɵdefineInjectable,
  ɵɵinject
} from "./chunk-WHOAKDIK.js";

// src/app/services/admin-formularios/report-formulario.service.ts
var CLIENT_NAME = "reportes";
var GET_COLLECTION_REPORT_FORMULARIO = gql`
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
var GET_FORMULARIO_BY_CT_ID = gql`
  query CollectionReportFormularioByCTId($ctformularioId: Int!) {
    collectionReportFormulario(
      query: { where: { ctformulario_id: { equals: $ctformularioId } } }
    ) {
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
    }
  }
`;
var GET_ATRIBUTOS_DEPENDIENTES = gql`
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
var GET_ATRIBUTOS_BY_FORMULARIO = gql`
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
var ReportFormularioService = class _ReportFormularioService {
  apollo;
  constructor(apollo) {
    this.apollo = apollo;
  }
  getAtributosByFormulario(formularioId, page = 1, take = 10) {
    return this.apollo.use(CLIENT_NAME).query({
      query: GET_ATRIBUTOS_BY_FORMULARIO,
      variables: { formularioId, page, take },
      fetchPolicy: "network-only"
    }).pipe(map((result) => {
      const res = result.data?.collectionReportAtributoFormulario;
      const data = [...res?.data ?? []].sort((a, b) => a.orden - b.orden);
      return { data, meta: res?.meta };
    }));
  }
  getAtributosDependientes(formularioId) {
    return this.apollo.use(CLIENT_NAME).query({
      query: GET_ATRIBUTOS_DEPENDIENTES,
      variables: { formularioId },
      fetchPolicy: "network-only"
    }).pipe(map((result) => {
      const data = result.data?.collectionReportAtributoFormulario?.data ?? [];
      return [...data].sort((a, b) => a.orden - b.orden);
    }));
  }
  getFormularioByCTId(ctformularioId) {
    return this.apollo.use(CLIENT_NAME).query({
      query: GET_FORMULARIO_BY_CT_ID,
      variables: { ctformularioId },
      fetchPolicy: "network-only"
    }).pipe(map((result) => result.data?.collectionReportFormulario?.data?.[0] ?? null));
  }
  getFormularios() {
    return this.apollo.use(CLIENT_NAME).query({
      query: GET_COLLECTION_REPORT_FORMULARIO,
      fetchPolicy: "network-only"
    }).pipe(map((result) => {
      const res = result.data?.collectionReportFormulario;
      return {
        data: res?.data ?? [],
        count: res?.count ?? 0,
        meta: res?.meta
      };
    }));
  }
  static \u0275fac = function ReportFormularioService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ReportFormularioService)(\u0275\u0275inject(Apollo));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _ReportFormularioService, factory: _ReportFormularioService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ReportFormularioService, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], () => [{ type: Apollo }], null);
})();

export {
  ReportFormularioService
};
//# sourceMappingURL=chunk-AWRFUGXV.js.map
