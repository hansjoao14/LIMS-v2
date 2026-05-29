import {
  META_FIELDS
} from "./chunk-XIRXEHG5.js";
import {
  Apollo,
  gql
} from "./chunk-7OA5XFJQ.js";
import {
  Injectable,
  firstValueFrom,
  map,
  setClassMetadata,
  ɵɵdefineInjectable,
  ɵɵinject
} from "./chunk-4XEQTJJK.js";

// src/app/services/solicitudes/solicitud-trabajo/periodo.service.ts
var CLIENT_NAME = "catalogo";
var GET_EJERCICIO_BY_ANIO = gql`
  query GetEjercicioByAnio($anio: Int!) {
    collectionEjercicio(
      query: { where: { anio: { equals: $anio }, estado: { equals: true } } }
    ) {
      data {
        anio
        ctestado_id
        descripcion
        id
      }
      meta { ${META_FIELDS} }
    }
  }
`;
var GET_PERIODO_BY_EJERCICIO_MES = gql`
  query GetPeriodoByEjercicioMes($ejercicioId: Int!, $mes: Int!) {
    collectionPeriodo(
      query: {
        where: {
          ejercicio: { id: { equals: $ejercicioId } }
          estado: { equals: true }
          mes: { equals: $mes }
        }
      }
    ) {
      count
      data {
        ctestado_id
        ejercicio_id
        estado
        id
        mes
        nombre_mes
      }
      meta { ${META_FIELDS} }
    }
  }
`;
var PeriodoService = class _PeriodoService {
  apollo;
  constructor(apollo) {
    this.apollo = apollo;
  }
  async getEjercicioByAnio(anio) {
    const result = await firstValueFrom(this.apollo.use(CLIENT_NAME).query({
      query: GET_EJERCICIO_BY_ANIO,
      variables: { anio }
    }).pipe(map((r) => r.data?.collectionEjercicio?.data ?? [])));
    return result[0] ?? null;
  }
  async getPeriodoByEjercicioAndMes(ejercicioId, mes) {
    const result = await firstValueFrom(this.apollo.use(CLIENT_NAME).query({
      query: GET_PERIODO_BY_EJERCICIO_MES,
      variables: { ejercicioId, mes }
    }).pipe(map((r) => r.data?.collectionPeriodo?.data ?? [])));
    return result[0] ?? null;
  }
  static \u0275fac = function PeriodoService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _PeriodoService)(\u0275\u0275inject(Apollo));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _PeriodoService, factory: _PeriodoService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PeriodoService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [{ type: Apollo }], null);
})();

export {
  PeriodoService
};
//# sourceMappingURL=chunk-YDUHZXBQ.js.map
