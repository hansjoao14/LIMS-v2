import {
  CommonModule
} from "./chunk-CIDLATYD.js";
import {
  Component,
  EventEmitter,
  Input,
  Output,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵdomElement,
  ɵɵdomElementEnd,
  ɵɵdomElementStart,
  ɵɵdomListener,
  ɵɵdomProperty,
  ɵɵgetCurrentView,
  ɵɵnamespaceHTML,
  ɵɵnamespaceSVG,
  ɵɵnextContext,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵsanitizeResourceUrl,
  ɵɵtext,
  ɵɵtextInterpolate
} from "./chunk-WHOAKDIK.js";

// src/app/shared/components/pdf-viewer/pdf-viewer.ts
function PdfViewerComponent_Conditional_0_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "div", 9);
    \u0275\u0275domElement(1, "span", 12);
    \u0275\u0275domElementEnd();
  }
}
function PdfViewerComponent_Conditional_0_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElement(0, "iframe", 10);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275domProperty("src", ctx_r1.pdfUrl, \u0275\u0275sanitizeResourceUrl);
  }
}
function PdfViewerComponent_Conditional_0_Conditional_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "div", 11);
    \u0275\u0275text(1, " No se pudo cargar el documento. ");
    \u0275\u0275domElementEnd();
  }
}
function PdfViewerComponent_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "div", 0)(1, "div", 1)(2, "h3", 2);
    \u0275\u0275text(3);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(4, "div", 3)(5, "button", 4);
    \u0275\u0275domListener("click", function PdfViewerComponent_Conditional_0_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.downloaded.emit());
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275domElementStart(6, "svg", 5);
    \u0275\u0275domElement(7, "path", 6);
    \u0275\u0275domElementEnd();
    \u0275\u0275text(8, " Descargar ");
    \u0275\u0275domElementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275domElementStart(9, "button", 7);
    \u0275\u0275domListener("click", function PdfViewerComponent_Conditional_0_Template_button_click_9_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.closed.emit());
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275domElementStart(10, "svg", 5);
    \u0275\u0275domElement(11, "path", 8);
    \u0275\u0275domElementEnd();
    \u0275\u0275text(12, " Cerrar ");
    \u0275\u0275domElementEnd()()();
    \u0275\u0275conditionalCreate(13, PdfViewerComponent_Conditional_0_Conditional_13_Template, 2, 0, "div", 9)(14, PdfViewerComponent_Conditional_0_Conditional_14_Template, 1, 1, "iframe", 10)(15, PdfViewerComponent_Conditional_0_Conditional_15_Template, 2, 0, "div", 11);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.titulo);
    \u0275\u0275advance(10);
    \u0275\u0275conditional(ctx_r1.loading ? 13 : ctx_r1.pdfUrl ? 14 : 15);
  }
}
var PdfViewerComponent = class _PdfViewerComponent {
  visible = false;
  loading = false;
  pdfUrl = null;
  titulo = "Documento PDF";
  closed = new EventEmitter();
  downloaded = new EventEmitter();
  static \u0275fac = function PdfViewerComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _PdfViewerComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _PdfViewerComponent, selectors: [["app-pdf-viewer"]], inputs: { visible: "visible", loading: "loading", pdfUrl: "pdfUrl", titulo: "titulo" }, outputs: { closed: "closed", downloaded: "downloaded" }, decls: 1, vars: 1, consts: [[1, "fixed", "inset-0", "z-50", "flex", "flex-col", "bg-white"], [1, "flex", "items-center", "justify-between", "px-6", "py-3", "border-b", "border-slate-200", "bg-white", "shadow-sm", "shrink-0"], [1, "font-bold", "text-[#1e3a8a]", "text-sm", "uppercase", "tracking-wide"], [1, "flex", "items-center", "gap-3"], ["type", "button", 1, "flex", "items-center", "gap-1.5", "text-xs", "font-bold", "text-[#1e3a8a]", "border", "border-[#1e3a8a]", "px-3", "py-1.5", "rounded", "hover:bg-blue-50", "transition-colors", 3, "click"], ["fill", "none", "viewBox", "0 0 24 24", "stroke", "currentColor", 1, "w-3.5", "h-3.5"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"], ["type", "button", 1, "flex", "items-center", "gap-1.5", "text-xs", "font-bold", "text-slate-600", "border", "border-slate-300", "px-3", "py-1.5", "rounded", "hover:bg-slate-50", "transition-colors", 3, "click"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M6 18L18 6M6 6l12 12"], [1, "flex-1", "flex", "items-center", "justify-center"], [1, "flex-1", "w-full", "border-0", 3, "src"], [1, "flex-1", "flex", "items-center", "justify-center", "text-slate-400", "text-sm", "italic"], [1, "animate-spin", "h-8", "w-8", "border-4", "border-[#1e3a8a]", "border-t-transparent", "rounded-full"]], template: function PdfViewerComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275conditionalCreate(0, PdfViewerComponent_Conditional_0_Template, 16, 2, "div", 0);
    }
    if (rf & 2) {
      \u0275\u0275conditional(ctx.visible ? 0 : -1);
    }
  }, dependencies: [CommonModule], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PdfViewerComponent, [{
    type: Component,
    args: [{ selector: "app-pdf-viewer", standalone: true, imports: [CommonModule], template: '@if (visible) {\n  <div class="fixed inset-0 z-50 flex flex-col bg-white">\n\n    <!-- Header -->\n    <div class="flex items-center justify-between px-6 py-3 border-b border-slate-200 bg-white shadow-sm shrink-0">\n      <h3 class="font-bold text-[#1e3a8a] text-sm uppercase tracking-wide">{{ titulo }}</h3>\n      <div class="flex items-center gap-3">\n        <button type="button" (click)="downloaded.emit()"\n          class="flex items-center gap-1.5 text-xs font-bold text-[#1e3a8a] border border-[#1e3a8a] px-3 py-1.5 rounded hover:bg-blue-50 transition-colors">\n          <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">\n            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"\n              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>\n          </svg>\n          Descargar\n        </button>\n        <button type="button" (click)="closed.emit()"\n          class="flex items-center gap-1.5 text-xs font-bold text-slate-600 border border-slate-300 px-3 py-1.5 rounded hover:bg-slate-50 transition-colors">\n          <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">\n            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>\n          </svg>\n          Cerrar\n        </button>\n      </div>\n    </div>\n\n    <!-- Body -->\n    @if (loading) {\n      <div class="flex-1 flex items-center justify-center">\n        <span class="animate-spin h-8 w-8 border-4 border-[#1e3a8a] border-t-transparent rounded-full"></span>\n      </div>\n    } @else if (pdfUrl) {\n      <iframe [src]="pdfUrl" class="flex-1 w-full border-0"></iframe>\n    } @else {\n      <div class="flex-1 flex items-center justify-center text-slate-400 text-sm italic">\n        No se pudo cargar el documento.\n      </div>\n    }\n\n  </div>\n}\n' }]
  }], null, { visible: [{
    type: Input
  }], loading: [{
    type: Input
  }], pdfUrl: [{
    type: Input
  }], titulo: [{
    type: Input
  }], closed: [{
    type: Output
  }], downloaded: [{
    type: Output
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(PdfViewerComponent, { className: "PdfViewerComponent", filePath: "src/app/shared/components/pdf-viewer/pdf-viewer.ts", lineNumber: 11 });
})();

export {
  PdfViewerComponent
};
//# sourceMappingURL=chunk-TN4ZILQR.js.map
