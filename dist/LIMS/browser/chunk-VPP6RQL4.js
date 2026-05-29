import {
  Component,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵdefineComponent,
  ɵɵdomElement,
  ɵɵdomElementEnd,
  ɵɵdomElementStart
} from "./chunk-4XEQTJJK.js";

// src/app/shared/components/loading/loading.ts
var LoadingComponent = class _LoadingComponent {
  static \u0275fac = function LoadingComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _LoadingComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _LoadingComponent, selectors: [["app-loading"]], decls: 2, vars: 0, consts: [[1, "flex", "items-center", "justify-center", "p-16"], [1, "animate-spin", "rounded-full", "h-10", "w-10", "border-b-2", "border-[#1e3a8a]"]], template: function LoadingComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275domElementStart(0, "div", 0);
      \u0275\u0275domElement(1, "div", 1);
      \u0275\u0275domElementEnd();
    }
  }, encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(LoadingComponent, [{
    type: Component,
    args: [{ selector: "app-loading", standalone: true, template: '<div class="flex items-center justify-center p-16">\n  <div class="animate-spin rounded-full h-10 w-10 border-b-2 border-[#1e3a8a]"></div>\n</div>\n' }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(LoadingComponent, { className: "LoadingComponent", filePath: "src/app/shared/components/loading/loading.ts", lineNumber: 8 });
})();

export {
  LoadingComponent
};
//# sourceMappingURL=chunk-VPP6RQL4.js.map
