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
  ɵɵclassProp,
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
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIndex,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtext,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate5
} from "./chunk-WHOAKDIK.js";

// src/app/shared/components/pagination/pagination.ts
function PaginationComponent_Conditional_0_For_10_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "button", 10);
    \u0275\u0275domListener("click", function PaginationComponent_Conditional_0_For_10_Conditional_0_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r3);
      const item_r4 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.pageChange.emit(item_r4));
    });
    \u0275\u0275text(1);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const item_r4 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275classProp("bg-[#1d2b64]", item_r4 === ctx_r1.currentPage)("text-white", item_r4 === ctx_r1.currentPage)("border-[#1d2b64]", item_r4 === ctx_r1.currentPage)("border-slate-200", item_r4 !== ctx_r1.currentPage)("text-slate-600", item_r4 !== ctx_r1.currentPage)("hover:bg-slate-100", item_r4 !== ctx_r1.currentPage);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", item_r4, " ");
  }
}
function PaginationComponent_Conditional_0_For_10_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "span", 9);
    \u0275\u0275text(1, "\u2026");
    \u0275\u0275domElementEnd();
  }
}
function PaginationComponent_Conditional_0_For_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, PaginationComponent_Conditional_0_For_10_Conditional_0_Template, 2, 13, "button", 8)(1, PaginationComponent_Conditional_0_For_10_Conditional_1_Template, 2, 0, "span", 9);
  }
  if (rf & 2) {
    const item_r4 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275conditional(ctx_r1.isNumber(item_r4) ? 0 : 1);
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
    \u0275\u0275namespaceSVG();
    \u0275\u0275domElementStart(5, "svg", 4);
    \u0275\u0275domElement(6, "path", 5);
    \u0275\u0275domElementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275domElementStart(7, "span", 6);
    \u0275\u0275text(8, "Anterior");
    \u0275\u0275domElementEnd()();
    \u0275\u0275repeaterCreate(9, PaginationComponent_Conditional_0_For_10_Template, 2, 1, null, null, \u0275\u0275repeaterTrackByIndex);
    \u0275\u0275domElementStart(11, "button", 3);
    \u0275\u0275domListener("click", function PaginationComponent_Conditional_0_Template_button_click_11_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.pageChange.emit(ctx_r1.currentPage + 1));
    });
    \u0275\u0275domElementStart(12, "span", 6);
    \u0275\u0275text(13, "Siguiente");
    \u0275\u0275domElementEnd();
    \u0275\u0275namespaceSVG();
    \u0275\u0275domElementStart(14, "svg", 4);
    \u0275\u0275domElement(15, "path", 7);
    \u0275\u0275domElementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate5(" ", ctx_r1.itemsShown, " de ", ctx_r1.meta.total, " ", ctx_r1.itemLabel, " \u2014 p\xE1gina ", ctx_r1.meta.page, " de ", ctx_r1.meta.totalPages, " ");
    \u0275\u0275advance(2);
    \u0275\u0275classProp("border-slate-200", !ctx_r1.meta.hasPrevPage)("text-slate-300", !ctx_r1.meta.hasPrevPage)("cursor-not-allowed", !ctx_r1.meta.hasPrevPage)("border-slate-300", ctx_r1.meta.hasPrevPage)("text-slate-600", ctx_r1.meta.hasPrevPage)("hover:bg-slate-100", ctx_r1.meta.hasPrevPage);
    \u0275\u0275domProperty("disabled", !ctx_r1.meta.hasPrevPage);
    \u0275\u0275advance(5);
    \u0275\u0275repeater(ctx_r1.pageItems);
    \u0275\u0275advance(2);
    \u0275\u0275classProp("border-slate-200", !ctx_r1.meta.hasNextPage)("text-slate-300", !ctx_r1.meta.hasNextPage)("cursor-not-allowed", !ctx_r1.meta.hasNextPage)("border-slate-300", ctx_r1.meta.hasNextPage)("text-slate-600", ctx_r1.meta.hasNextPage)("hover:bg-slate-100", ctx_r1.meta.hasNextPage);
    \u0275\u0275domProperty("disabled", !ctx_r1.meta.hasNextPage);
  }
}
var PaginationComponent = class _PaginationComponent {
  meta = null;
  currentPage = 1;
  itemsShown = 0;
  itemLabel = "registros";
  pageChange = new EventEmitter();
  get pageItems() {
    if (!this.meta)
      return [];
    const total = this.meta.totalPages;
    const cur = this.currentPage;
    if (total <= 7) {
      return Array.from({ length: total }, (_, i) => i + 1);
    }
    const items = [1];
    if (cur > 3)
      items.push("...");
    const start = Math.max(2, cur - 1);
    const end = Math.min(total - 1, cur + 1);
    for (let i = start; i <= end; i++)
      items.push(i);
    if (cur < total - 2)
      items.push("...");
    items.push(total);
    return items;
  }
  isNumber(item) {
    return typeof item === "number";
  }
  static \u0275fac = function PaginationComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _PaginationComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _PaginationComponent, selectors: [["app-pagination"]], inputs: { meta: "meta", currentPage: "currentPage", itemsShown: "itemsShown", itemLabel: "itemLabel" }, outputs: { pageChange: "pageChange" }, decls: 1, vars: 1, consts: [[1, "border-t", "border-slate-200", "px-4", "pt-3", "pb-2", "flex", "flex-col", "items-center", "gap-2"], [1, "text-[11px]", "text-slate-400"], [1, "flex", "items-center", "gap-1"], [1, "h-8", "px-2.5", "flex", "items-center", "gap-1", "rounded", "border", "text-xs", "font-semibold", "transition-colors", 3, "click", "disabled"], ["fill", "none", "viewBox", "0 0 24 24", "stroke", "currentColor", 1, "w-3.5", "h-3.5"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2.5", "d", "M15 19l-7-7 7-7"], [1, "hidden", "sm:inline"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2.5", "d", "M9 5l7 7-7 7"], [1, "h-8", "w-8", "rounded", "border", "text-xs", "font-semibold", "transition-colors", 3, "bg-[#1d2b64]", "text-white", "border-[#1d2b64]", "border-slate-200", "text-slate-600", "hover:bg-slate-100"], [1, "h-8", "w-6", "flex", "items-end", "justify-center", "pb-1", "text-slate-400", "text-xs", "select-none"], [1, "h-8", "w-8", "rounded", "border", "text-xs", "font-semibold", "transition-colors", 3, "click"]], template: function PaginationComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275conditionalCreate(0, PaginationComponent_Conditional_0_Template, 16, 31, "div", 0);
    }
    if (rf & 2) {
      \u0275\u0275conditional(ctx.meta && ctx.meta.totalPages > 1 ? 0 : -1);
    }
  }, dependencies: [CommonModule], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PaginationComponent, [{
    type: Component,
    args: [{ selector: "app-pagination", standalone: true, imports: [CommonModule], template: '@if (meta && meta.totalPages > 1) {\n  <div class="border-t border-slate-200 px-4 pt-3 pb-2 flex flex-col items-center gap-2">\n\n    <!-- Info -->\n    <p class="text-[11px] text-slate-400">\n      {{ itemsShown }} de {{ meta.total }} {{ itemLabel }} &mdash; p\xE1gina {{ meta.page }} de {{ meta.totalPages }}\n    </p>\n\n    <!-- Botones -->\n    <div class="flex items-center gap-1">\n\n      <!-- Anterior -->\n      <button (click)="pageChange.emit(currentPage - 1)"\n              [disabled]="!meta.hasPrevPage"\n              class="h-8 px-2.5 flex items-center gap-1 rounded border text-xs font-semibold transition-colors"\n              [class.border-slate-200]="!meta.hasPrevPage"\n              [class.text-slate-300]="!meta.hasPrevPage"\n              [class.cursor-not-allowed]="!meta.hasPrevPage"\n              [class.border-slate-300]="meta.hasPrevPage"\n              [class.text-slate-600]="meta.hasPrevPage"\n              [class.hover:bg-slate-100]="meta.hasPrevPage">\n        <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">\n          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 19l-7-7 7-7"/>\n        </svg>\n        <span class="hidden sm:inline">Anterior</span>\n      </button>\n\n      <!-- P\xE1ginas con ellipsis -->\n      @for (item of pageItems; track $index) {\n        @if (isNumber(item)) {\n          <button (click)="pageChange.emit(item)"\n                  class="h-8 w-8 rounded border text-xs font-semibold transition-colors"\n                  [class.bg-[#1d2b64]]="item === currentPage"\n                  [class.text-white]="item === currentPage"\n                  [class.border-[#1d2b64]]="item === currentPage"\n                  [class.border-slate-200]="item !== currentPage"\n                  [class.text-slate-600]="item !== currentPage"\n                  [class.hover:bg-slate-100]="item !== currentPage">\n            {{ item }}\n          </button>\n        } @else {\n          <span class="h-8 w-6 flex items-end justify-center pb-1 text-slate-400 text-xs select-none">\u2026</span>\n        }\n      }\n\n      <!-- Siguiente -->\n      <button (click)="pageChange.emit(currentPage + 1)"\n              [disabled]="!meta.hasNextPage"\n              class="h-8 px-2.5 flex items-center gap-1 rounded border text-xs font-semibold transition-colors"\n              [class.border-slate-200]="!meta.hasNextPage"\n              [class.text-slate-300]="!meta.hasNextPage"\n              [class.cursor-not-allowed]="!meta.hasNextPage"\n              [class.border-slate-300]="meta.hasNextPage"\n              [class.text-slate-600]="meta.hasNextPage"\n              [class.hover:bg-slate-100]="meta.hasNextPage">\n        <span class="hidden sm:inline">Siguiente</span>\n        <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">\n          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7"/>\n        </svg>\n      </button>\n\n    </div>\n  </div>\n}\n' }]
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
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(PaginationComponent, { className: "PaginationComponent", filePath: "src/app/shared/components/pagination/pagination.ts", lineNumber: 13 });
})();

export {
  PaginationComponent
};
//# sourceMappingURL=chunk-NMFNKURB.js.map
