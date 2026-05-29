import {
  HttpClient,
  environment
} from "./chunk-FYBL3SR2.js";
import {
  Injectable,
  map,
  setClassMetadata,
  ɵɵdefineInjectable,
  ɵɵinject
} from "./chunk-4XEQTJJK.js";

// src/app/services/solicitudes/solicitud-detalle/solicitud-detalle.service.ts
var SolicitudDetalleService = class _SolicitudDetalleService {
  http;
  apiReportes = environment.api_reportes;
  constructor(http) {
    this.http = http;
  }
  getSolicitudDetalle(id) {
    return this.http.get(`${this.apiReportes}/report-solicitud/${id}`).pipe(map((res) => res.data));
  }
  static \u0275fac = function SolicitudDetalleService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _SolicitudDetalleService)(\u0275\u0275inject(HttpClient));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _SolicitudDetalleService, factory: _SolicitudDetalleService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SolicitudDetalleService, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], () => [{ type: HttpClient }], null);
})();

export {
  SolicitudDetalleService
};
//# sourceMappingURL=chunk-ZPRPER5R.js.map
