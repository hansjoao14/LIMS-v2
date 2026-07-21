import {
  Component,
  Input,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵclassMap,
  ɵɵdefineComponent,
  ɵɵdomElement
} from "./chunk-WHOAKDIK.js";

// src/app/ui/field-skeleton/field-skeleton.ts
var FieldSkeleton = class _FieldSkeleton {
  // Tailwind v4 detecta estas clases en el archivo: h-8 h-9 h-10 h-11 h-12
  height = "h-10";
  static \u0275fac = function FieldSkeleton_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _FieldSkeleton)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _FieldSkeleton, selectors: [["app-field-skeleton"]], inputs: { height: "height" }, decls: 1, vars: 2, template: function FieldSkeleton_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275domElement(0, "div");
    }
    if (rf & 2) {
      \u0275\u0275classMap("bg-slate-100 rounded animate-pulse " + ctx.height);
    }
  }, encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FieldSkeleton, [{
    type: Component,
    args: [{ selector: "app-field-skeleton", standalone: true, template: `<div [class]="'bg-slate-100 rounded animate-pulse ' + height"></div>
` }]
  }], null, { height: [{
    type: Input
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(FieldSkeleton, { className: "FieldSkeleton", filePath: "src/app/ui/field-skeleton/field-skeleton.ts", lineNumber: 8 });
})();

export {
  FieldSkeleton
};
//# sourceMappingURL=chunk-WVAGNUPQ.js.map
