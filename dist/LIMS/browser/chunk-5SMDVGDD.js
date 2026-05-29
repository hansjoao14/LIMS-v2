import {
  CommonModule
} from "./chunk-FYBL3SR2.js";
import {
  Component,
  EventEmitter,
  Input,
  Output,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵdomElementEnd,
  ɵɵdomElementStart,
  ɵɵdomListener,
  ɵɵdomProperty,
  ɵɵgetCurrentView,
  ɵɵnextContext,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIdentity,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtext,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate5
} from "./chunk-4XEQTJJK.js";

// src/app/shared/components/pagination/pagination.ts
function PaginationComponent_Conditional_0_For_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "button", 5);
    \u0275\u0275domListener("click", function PaginationComponent_Conditional_0_For_7_Template_button_click_0_listener() {
      const p_r4 = \u0275\u0275restoreView(_r3).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.pageChange.emit(p_r4));
    });
    \u0275\u0275text(1);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const p_r4 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275classProp("bg-[#1d2b64]", p_r4 === ctx_r1.currentPage)("text-white", p_r4 === ctx_r1.currentPage)("border-[#1d2b64]", p_r4 === ctx_r1.currentPage)("border-slate-200", p_r4 !== ctx_r1.currentPage)("text-slate-600", p_r4 !== ctx_r1.currentPage)("hover:bg-slate-100", p_r4 !== ctx_r1.currentPage);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", p_r4, " ");
  }
}
function PaginationComponent_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "div", 0)(1, "p", 1);
    \u0275\u0275text(2);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(3, "div", 2)(4, "button", 3);
    \u0275\u0275domListener("click", function PaginationComponent_Conditional_0_Template_button_click_4_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.pageChange.emit(ctx_r1.currentPage - 1));
    });
    \u0275\u0275text(5, " \u2039 Anterior ");
    \u0275\u0275domElementEnd();
    \u0275\u0275repeaterCreate(6, PaginationComponent_Conditional_0_For_7_Template, 2, 13, "button", 4, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275domElementStart(8, "button", 3);
    \u0275\u0275domListener("click", function PaginationComponent_Conditional_0_Template_button_click_8_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.pageChange.emit(ctx_r1.currentPage + 1));
    });
    \u0275\u0275text(9, " Siguiente \u203A ");
    \u0275\u0275domElementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate5(" Mostrando ", ctx_r1.itemsShown, " de ", ctx_r1.meta.total, " ", ctx_r1.itemLabel, " \u2014 P\xE1gina ", ctx_r1.meta.page, " de ", ctx_r1.meta.totalPages, " ");
    \u0275\u0275advance(2);
    \u0275\u0275classProp("border-slate-200", !ctx_r1.meta.hasPrevPage)("text-slate-300", !ctx_r1.meta.hasPrevPage)("cursor-not-allowed", !ctx_r1.meta.hasPrevPage)("border-[#1d2b64]", ctx_r1.meta.hasPrevPage)("text-[#1d2b64]", ctx_r1.meta.hasPrevPage)("hover:bg-[#1d2b64]", ctx_r1.meta.hasPrevPage)("hover:text-white", ctx_r1.meta.hasPrevPage);
    \u0275\u0275domProperty("disabled", !ctx_r1.meta.hasPrevPage);
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r1.pages);
    \u0275\u0275advance(2);
    \u0275\u0275classProp("border-slate-200", !ctx_r1.meta.hasNextPage)("text-slate-300", !ctx_r1.meta.hasNextPage)("cursor-not-allowed", !ctx_r1.meta.hasNextPage)("border-[#1d2b64]", ctx_r1.meta.hasNextPage)("text-[#1d2b64]", ctx_r1.meta.hasNextPage)("hover:bg-[#1d2b64]", ctx_r1.meta.hasNextPage)("hover:text-white", ctx_r1.meta.hasNextPage);
    \u0275\u0275domProperty("disabled", !ctx_r1.meta.hasNextPage);
  }
}
var PaginationComponent = class _PaginationComponent {
  meta = null;
  currentPage = 1;
  itemsShown = 0;
  itemLabel = "registros";
  pageChange = new EventEmitter();
  get pages() {
    if (!this.meta)
      return [];
    return Array.from({ length: this.meta.totalPages }, (_, i) => i + 1);
  }
  static \u0275fac = function PaginationComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _PaginationComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _PaginationComponent, selectors: [["app-pagination"]], inputs: { meta: "meta", currentPage: "currentPage", itemsShown: "itemsShown", itemLabel: "itemLabel" }, outputs: { pageChange: "pageChange" }, decls: 1, vars: 1, consts: [[1, "flex", "items-center", "justify-between", "px-6", "py-4", "border-t", "border-slate-200"], [1, "text-xs", "text-slate-500"], [1, "flex", "items-center", "gap-1"], [1, "px-3", "py-1.5", "rounded", "border", "text-xs", "font-bold", "transition-colors", 3, "click", "disabled"], [1, "px-3", "py-1.5", "rounded", "border", "text-xs", "font-bold", "transition-colors", 3, "bg-[#1d2b64]", "text-white", "border-[#1d2b64]", "border-slate-200", "text-slate-600", "hover:bg-slate-100"], [1, "px-3", "py-1.5", "rounded", "border", "text-xs", "font-bold", "transition-colors", 3, "click"]], template: function PaginationComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275conditionalCreate(0, PaginationComponent_Conditional_0_Template, 10, 35, "div", 0);
    }
    if (rf & 2) {
      \u0275\u0275conditional(ctx.meta && ctx.meta.totalPages > 1 ? 0 : -1);
    }
  }, dependencies: [CommonModule], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PaginationComponent, [{
    type: Component,
    args: [{ selector: "app-pagination", standalone: true, imports: [CommonModule], template: '@if (meta && meta.totalPages > 1) {\n  <div class="flex items-center justify-between px-6 py-4 border-t border-slate-200">\n    <p class="text-xs text-slate-500">\n      Mostrando {{ itemsShown }} de {{ meta.total }} {{ itemLabel }} \u2014 P\xE1gina {{ meta.page }} de {{ meta.totalPages }}\n    </p>\n    <div class="flex items-center gap-1">\n\n      <button (click)="pageChange.emit(currentPage - 1)"\n              [disabled]="!meta.hasPrevPage"\n              class="px-3 py-1.5 rounded border text-xs font-bold transition-colors"\n              [class.border-slate-200]="!meta.hasPrevPage"\n              [class.text-slate-300]="!meta.hasPrevPage"\n              [class.cursor-not-allowed]="!meta.hasPrevPage"\n              [class.border-[#1d2b64]]="meta.hasPrevPage"\n              [class.text-[#1d2b64]]="meta.hasPrevPage"\n              [class.hover:bg-[#1d2b64]]="meta.hasPrevPage"\n              [class.hover:text-white]="meta.hasPrevPage">\n        \u2039 Anterior\n      </button>\n\n      @for (p of pages; track p) {\n        <button (click)="pageChange.emit(p)"\n                class="px-3 py-1.5 rounded border text-xs font-bold transition-colors"\n                [class.bg-[#1d2b64]]="p === currentPage"\n                [class.text-white]="p === currentPage"\n                [class.border-[#1d2b64]]="p === currentPage"\n                [class.border-slate-200]="p !== currentPage"\n                [class.text-slate-600]="p !== currentPage"\n                [class.hover:bg-slate-100]="p !== currentPage">\n          {{ p }}\n        </button>\n      }\n\n      <button (click)="pageChange.emit(currentPage + 1)"\n              [disabled]="!meta.hasNextPage"\n              class="px-3 py-1.5 rounded border text-xs font-bold transition-colors"\n              [class.border-slate-200]="!meta.hasNextPage"\n              [class.text-slate-300]="!meta.hasNextPage"\n              [class.cursor-not-allowed]="!meta.hasNextPage"\n              [class.border-[#1d2b64]]="meta.hasNextPage"\n              [class.text-[#1d2b64]]="meta.hasNextPage"\n              [class.hover:bg-[#1d2b64]]="meta.hasNextPage"\n              [class.hover:text-white]="meta.hasNextPage">\n        Siguiente \u203A\n      </button>\n\n    </div>\n  </div>\n}\n' }]
  }], null, { meta: [{
    type: Input
  }], currentPage: [{
    type: Input
  }], itemsShown: [{
    type: Input
  }], itemLabel: [{
    type: Input
  }], pageChange: [{
    type: Output
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(PaginationComponent, { className: "PaginationComponent", filePath: "src/app/shared/components/pagination/pagination.ts", lineNumber: 11 });
})();

export {
  PaginationComponent
};
//# sourceMappingURL=chunk-5SMDVGDD.js.map
