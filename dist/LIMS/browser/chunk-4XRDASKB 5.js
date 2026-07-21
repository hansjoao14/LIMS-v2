import {
  Component,
  Input,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵclassMap,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵdomElement,
  ɵɵdomElementEnd,
  ɵɵdomElementStart,
  ɵɵnextContext,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIdentity,
  ɵɵrepeaterTrackByIndex
} from "./chunk-WHOAKDIK.js";

// src/app/ui/table-skeleton/table-skeleton.ts
var _c0 = ["appTableSkeleton", ""];
function TableSkeleton_For_1_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "td", 1);
    \u0275\u0275domElement(1, "div");
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const i_r1 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275classMap("h-3 bg-slate-200 rounded " + ctx_r1.widths[i_r1 % 4]);
  }
}
function TableSkeleton_For_1_Conditional_3_For_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElement(0, "div", 4);
  }
}
function TableSkeleton_For_1_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "td", 2)(1, "div", 3);
    \u0275\u0275repeaterCreate(2, TableSkeleton_For_1_Conditional_3_For_3_Template, 1, 0, "div", 4, \u0275\u0275repeaterTrackByIndex);
    \u0275\u0275domElementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r1.actionArr);
  }
}
function TableSkeleton_For_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "tr", 0);
    \u0275\u0275repeaterCreate(1, TableSkeleton_For_1_For_2_Template, 2, 2, "td", 1, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275conditionalCreate(3, TableSkeleton_For_1_Conditional_3_Template, 4, 0, "td", 2);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.colsArr);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.actionButtons > 0 ? 3 : -1);
  }
}
var TableSkeleton = class _TableSkeleton {
  rows = 8;
  cols = 4;
  actionButtons = 0;
  // Tailwind v4 escanea este archivo: todas las clases quedan incluidas en el bundle
  widths = ["w-3/4", "w-4/5", "w-2/3", "w-1/2"];
  get rowsArr() {
    return Array(this.rows).fill(0);
  }
  get colsArr() {
    return Array(this.cols).fill(0).map((_, i) => i);
  }
  get actionArr() {
    return Array(this.actionButtons).fill(0);
  }
  static \u0275fac = function TableSkeleton_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _TableSkeleton)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _TableSkeleton, selectors: [["tbody", "appTableSkeleton", ""]], inputs: { rows: "rows", cols: "cols", actionButtons: "actionButtons" }, attrs: _c0, decls: 2, vars: 0, consts: [[1, "border-b", "border-slate-200", "animate-pulse"], [1, "px-3", "py-3", "border-r", "border-slate-100"], [1, "px-2", "py-3"], [1, "flex", "items-center", "justify-center", "gap-1.5"], [1, "h-8", "w-8", "bg-slate-200", "rounded"]], template: function TableSkeleton_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275repeaterCreate(0, TableSkeleton_For_1_Template, 4, 1, "tr", 0, \u0275\u0275repeaterTrackByIndex);
    }
    if (rf & 2) {
      \u0275\u0275repeater(ctx.rowsArr);
    }
  }, encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TableSkeleton, [{
    type: Component,
    args: [{ selector: "tbody[appTableSkeleton]", standalone: true, template: `@for (_ of rowsArr; track $index) {
  <tr class="border-b border-slate-200 animate-pulse">
    @for (i of colsArr; track i) {
      <td class="px-3 py-3 border-r border-slate-100">
        <div [class]="'h-3 bg-slate-200 rounded ' + widths[i % 4]"></div>
      </td>
    }
    @if (actionButtons > 0) {
      <td class="px-2 py-3">
        <div class="flex items-center justify-center gap-1.5">
          @for (_ of actionArr; track $index) {
            <div class="h-8 w-8 bg-slate-200 rounded"></div>
          }
        </div>
      </td>
    }
  </tr>
}
` }]
  }], null, { rows: [{
    type: Input
  }], cols: [{
    type: Input
  }], actionButtons: [{
    type: Input
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(TableSkeleton, { className: "TableSkeleton", filePath: "src/app/ui/table-skeleton/table-skeleton.ts", lineNumber: 8 });
})();

export {
  TableSkeleton
};
//# sourceMappingURL=chunk-4XRDASKB.js.map
