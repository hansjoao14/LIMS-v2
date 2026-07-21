import {
  ToastrService
} from "./chunk-BBC4P6SM.js";
import {
  Injectable,
  setClassMetadata,
  ɵɵdefineInjectable,
  ɵɵinject
} from "./chunk-WHOAKDIK.js";

// src/app/services/toastr.service.ts
var ToastrAlertService = class _ToastrAlertService {
  toastr;
  constructor(toastr) {
    this.toastr = toastr;
  }
  showSuccess(message, title) {
    this.toastr.success(message, title, {
      timeOut: 3e3,
      progressBar: true,
      progressAnimation: "increasing",
      positionClass: "toast-top-right",
      closeButton: true,
      tapToDismiss: true,
      enableHtml: true
    });
  }
  showError(message, title) {
    this.toastr.error(message, title, {
      timeOut: 5e3,
      progressBar: true,
      progressAnimation: "decreasing",
      positionClass: "toast-top-right",
      closeButton: true,
      tapToDismiss: true,
      enableHtml: true
    });
  }
  showWarning(message, title) {
    this.toastr.warning(message, title, {
      timeOut: 4e3,
      progressBar: true,
      progressAnimation: "decreasing",
      positionClass: "toast-top-right",
      closeButton: true,
      tapToDismiss: true,
      enableHtml: true
    });
  }
  showInfo(message, title) {
    this.toastr.info(message, title, {
      timeOut: 3500,
      progressBar: true,
      progressAnimation: "increasing",
      positionClass: "toast-top-right",
      closeButton: true,
      tapToDismiss: true,
      enableHtml: true
    });
  }
  static \u0275fac = function ToastrAlertService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ToastrAlertService)(\u0275\u0275inject(ToastrService));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _ToastrAlertService, factory: _ToastrAlertService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ToastrAlertService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [{ type: ToastrService }], null);
})();

export {
  ToastrAlertService
};
//# sourceMappingURL=chunk-V2CIHOHZ.js.map
