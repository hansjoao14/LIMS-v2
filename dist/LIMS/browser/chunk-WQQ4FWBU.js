import {
  HttpClient,
  environment
} from "./chunk-FYBL3SR2.js";
import {
  Injectable,
  __spreadProps,
  __spreadValues,
  delay,
  map,
  of,
  setClassMetadata,
  ɵɵdefineInjectable,
  ɵɵinject
} from "./chunk-4XEQTJJK.js";

// src/app/services/solicitudes/solicitud-trabajo/solicitud-trabajo.service.ts
var SolicitudService = class _SolicitudService {
  http;
  api_reportes = environment.api_reportes;
  api_solicitud = environment.api_solicitud;
  constructor(http) {
    this.http = http;
  }
  getFormulario(idTipoFormulario, idEmpleado) {
    const url = `${this.api_reportes}/report-parametro/formulario-dinamico/${idTipoFormulario}/${idEmpleado}`;
    return this.http.get(url).pipe(map((res) => {
      const formRaw = res.data ?? null;
      if (!formRaw) {
        throw new Error("La API no devolvi\xF3 data");
      }
      return __spreadProps(__spreadValues({}, formRaw), {
        preguntas: formRaw.preguntas ? [...formRaw.preguntas].sort((a, b) => a.orden - b.orden) : []
      });
    }));
  }
  guardarValoresSolicitud(payload) {
    return this.http.post(`${this.api_solicitud}/valor-solicitud/create-many`, payload);
  }
  actualizarValoresSolicitud(idSolicitud, payload) {
    return this.http.put(`${this.api_solicitud}/valor-solicitud/update-many/${idSolicitud}`, payload);
  }
  registrarSolicitud(payload) {
    return this.http.post(`${this.api_solicitud}/solicitud`, payload);
  }
  guardarEnsayosSolicitud(payload) {
    return this.http.post(`${this.api_solicitud}/solicitud-ensayo/create-many`, payload);
  }
  actualizarEnsayosSolicitud(idSolicitud, payload) {
    return this.http.put(`${this.api_solicitud}/solicitud-ensayo/update-many/${idSolicitud}`, payload);
  }
  finalizarSolicitud(payload) {
    const result = this.http.post(`${this.api_solicitud}/solicitud/finalizar`, payload);
    return result;
  }
  actualizarSolicitud(id, payload) {
    return this.http.put(`${this.api_solicitud}/solicitud/${id}`, payload);
  }
  getPdfSolicitud(solicitudId) {
    return this.http.get(`${this.api_reportes}/report-solicitud/pdf/${solicitudId}`, {
      responseType: "blob"
    });
  }
  getPdfVehiculo(solicitudId) {
    return this.http.get(`${this.api_reportes}/report-solicitud/pdf-vehiculo/${solicitudId}`, {
      responseType: "blob"
    });
  }
  createSolicitud(payload) {
    return this.http.post(`${this.api_reportes}/solicitud-trabajo`, payload);
  }
  getSolicitudes() {
    return this.http.get(`${this.api_reportes}/solicitud-trabajo`);
  }
  // TODO: reemplazar con PUT /solicitud/:id { ctestado_id: 387 }
  autorizarSolicitudById(id) {
    return of(void 0).pipe(delay(400));
  }
  // TODO: reemplazar con PUT /solicitud/:id { ctestado_id: 51, motivo_rechazo: motivo }
  rechazarSolicitudById(id, motivo) {
    return of(void 0).pipe(delay(400));
  }
  // TODO: reemplazar con DELETE /solicitud/:id
  eliminarSolicitudById(id) {
    return of(void 0).pipe(delay(400));
  }
  static \u0275fac = function SolicitudService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _SolicitudService)(\u0275\u0275inject(HttpClient));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _SolicitudService, factory: _SolicitudService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SolicitudService, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], () => [{ type: HttpClient }], null);
})();

export {
  SolicitudService
};
//# sourceMappingURL=chunk-WQQ4FWBU.js.map
