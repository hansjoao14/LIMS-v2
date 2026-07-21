import {
  META_FIELDS,
  REPORT_SOLICITUD_FIELDS,
  REPORT_VALOR_SOLICITUD_FIELDS
} from "./chunk-XIRXEHG5.js";
import {
  Apollo,
  gql
} from "./chunk-DPKW7NRU.js";
import {
  EMPTY,
  Injectable,
  delay,
  expand,
  map,
  of,
  reduce,
  setClassMetadata,
  ɵɵdefineInjectable,
  ɵɵinject
} from "./chunk-WHOAKDIK.js";

// src/app/services/solicitudes/lista-solicitudes/report-solicitud.service.ts
var CLIENT_NAME = "reportes";
var GET_COLLECTION_REPORT_SOLICITUD = gql`
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
var GET_VALORES_SOLICITUD = gql`
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
var GET_VALORES_BY_TIPO_FORMULARIO = gql`
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
var GET_SOLICITUDES_FINALIZADAS = gql`
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
var GET_SOLICITUDES_ESTADO_388 = gql`
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
var GET_SOLICITUDES_BY_FORMULARIO = gql`
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
var GET_SOLICITUD_BY_ID = gql`
  query CollectionReportSolicitudById($id: String!) {
    collectionReportSolicitud(
      query: { where: { id_solicitud: { equals: $id } } }
    ) {
      data { ${REPORT_SOLICITUD_FIELDS} }
    }
  }
`;
var GET_ENSAYOS_SOLICITUD = gql`
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
var ReportSolicitudService = class _ReportSolicitudService {
  apollo;
  constructor(apollo) {
    this.apollo = apollo;
  }
  getEnsayosSolicitud(solicitudId) {
    const PAGE_SIZE = 100;
    const fetchPage = (page) => this.apollo.use(CLIENT_NAME).query({
      query: GET_ENSAYOS_SOLICITUD,
      variables: { solicitudId, page, take: PAGE_SIZE },
      fetchPolicy: "network-only"
    }).pipe(map((result) => {
      const res = result.data?.collectionReportSolicitudEnsayo;
      return {
        data: res?.data ?? [],
        meta: res?.meta
      };
    }));
    return fetchPage(1).pipe(expand(({ meta }) => meta?.hasNextPage ? fetchPage(meta.nextPage) : EMPTY), reduce((acc, { data }) => acc.concat(data), []));
  }
  getSolicitudById(id) {
    return this.apollo.use(CLIENT_NAME).query({
      query: GET_SOLICITUD_BY_ID,
      variables: { id },
      fetchPolicy: "network-only"
    }).pipe(map((result) => result.data?.collectionReportSolicitud?.data?.[0] ?? null));
  }
  getValoresSolicitud(id) {
    return this.apollo.use(CLIENT_NAME).query({
      query: GET_VALORES_SOLICITUD,
      variables: { id },
      fetchPolicy: "network-only"
    }).pipe(map((result) => {
      const all = result.data?.collectionReportValorSolicitud?.data ?? [];
      const sorted = [...all].sort((a, b) => a.fecha_creacion.localeCompare(b.fecha_creacion));
      const dedup = /* @__PURE__ */ new Map();
      for (const v of sorted)
        dedup.set(v.atributo_formulario_nombre, v);
      return Array.from(dedup.values());
    }));
  }
  getValoresByTipoFormulario(tipoFormularioId) {
    const PAGE_SIZE = 200;
    const fetchPage = (page) => this.apollo.use(CLIENT_NAME).query({
      query: GET_VALORES_BY_TIPO_FORMULARIO,
      variables: { tipoFormularioId, page, take: PAGE_SIZE },
      fetchPolicy: "network-only"
    }).pipe(map((result) => {
      const res = result.data?.collectionReportValorSolicitud;
      return {
        data: res?.data ?? [],
        meta: res?.meta
      };
    }));
    return fetchPage(1).pipe(expand(({ meta }) => meta?.hasNextPage ? fetchPage(meta.nextPage) : EMPTY), reduce((acc, { data }) => acc.concat(data), []));
  }
  getSolicitudesFinalizadas(page, limit) {
    return this.apollo.use(CLIENT_NAME).query({
      query: GET_SOLICITUDES_FINALIZADAS,
      variables: { page, take: limit },
      fetchPolicy: "network-only"
    }).pipe(map((result) => {
      const res = result.data?.collectionReportSolicitud;
      return {
        data: res?.data ?? [],
        meta: res?.meta
      };
    }));
  }
  getSolicitudesEstado388(page, limit) {
    return this.apollo.use(CLIENT_NAME).query({
      query: GET_SOLICITUDES_ESTADO_388,
      variables: { page, take: limit },
      fetchPolicy: "network-only"
    }).pipe(map((result) => {
      const res = result.data?.collectionReportSolicitud;
      return {
        data: res?.data ?? [],
        meta: res?.meta
      };
    }));
  }
  getSolicitudesByFormulario(formularioId) {
    const PAGE_SIZE = 200;
    const fetchPage = (page) => this.apollo.use(CLIENT_NAME).query({
      query: GET_SOLICITUDES_BY_FORMULARIO,
      variables: { formularioId, page, take: PAGE_SIZE },
      fetchPolicy: "network-only"
    }).pipe(map((result) => {
      const res = result.data?.collectionReportSolicitud;
      return {
        data: res?.data ?? [],
        meta: res?.meta
      };
    }));
    return fetchPage(1).pipe(expand(({ meta }) => meta?.hasNextPage ? fetchPage(meta.nextPage) : EMPTY), reduce((acc, { data }) => acc.concat(data), []));
  }
  getSolicitudes(page, limit) {
    return this.apollo.use(CLIENT_NAME).query({
      query: GET_COLLECTION_REPORT_SOLICITUD,
      variables: { page, take: limit },
      fetchPolicy: "network-only"
    }).pipe(map((result) => {
      const res = result.data?.collectionReportSolicitud;
      return {
        data: res?.data ?? [],
        meta: res?.meta
      };
    }));
  }
  // TODO: reemplazar con mutación GraphQL real cuando el endpoint esté disponible
  eliminarVehiculo(id) {
    return of(void 0).pipe(delay(400));
  }
  // TODO: reemplazar con mutación GraphQL real cuando el endpoint esté disponible
  actualizarVehiculo(id, valores) {
    return of(void 0).pipe(delay(400));
  }
  // TODO: reemplazar con mutación GraphQL real cuando el endpoint esté disponible
  autorizarVehiculo(id) {
    return of(void 0).pipe(delay(400));
  }
  // TODO: reemplazar con mutación GraphQL real cuando el endpoint esté disponible
  rechazarVehiculo(id, motivo) {
    return of(void 0).pipe(delay(400));
  }
  // TODO: reemplazar con mutación GraphQL real cuando el endpoint esté disponible
  eliminarContraloria(id) {
    return of(void 0).pipe(delay(400));
  }
  // TODO: reemplazar con mutación GraphQL real cuando el endpoint esté disponible
  actualizarContraloria(id, valores) {
    return of(void 0).pipe(delay(400));
  }
  // TODO: reemplazar con mutación GraphQL real cuando el endpoint esté disponible
  autorizarContraloria(id) {
    return of(void 0).pipe(delay(400));
  }
  // TODO: reemplazar con mutación GraphQL real cuando el endpoint esté disponible
  rechazarContraloria(id, motivo) {
    return of(void 0).pipe(delay(400));
  }
  static \u0275fac = function ReportSolicitudService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ReportSolicitudService)(\u0275\u0275inject(Apollo));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _ReportSolicitudService, factory: _ReportSolicitudService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ReportSolicitudService, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], () => [{ type: Apollo }], null);
})();

export {
  ReportSolicitudService
};
//# sourceMappingURL=chunk-62VLVXUV.js.map
