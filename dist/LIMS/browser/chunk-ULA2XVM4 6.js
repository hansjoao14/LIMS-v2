import {
  AuthService,
  DatePipe
} from "./chunk-CIDLATYD.js";
import {
  Component,
  ContentChild,
  Input,
  computed,
  inject,
  input,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵProvidersFeature,
  ɵɵadvance,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵcontentQuery,
  ɵɵdefineComponent,
  ɵɵdomElementEnd,
  ɵɵdomElementStart,
  ɵɵloadQuery,
  ɵɵnextContext,
  ɵɵprojection,
  ɵɵprojectionDef,
  ɵɵqueryRefresh,
  ɵɵtext,
  ɵɵtextInterpolate
} from "./chunk-WHOAKDIK.js";

// src/app/shared/components/page-header/page-header.ts
var _c0 = ["pageAction"];
var _c1 = [[["", "pageAction", ""]]];
var _c2 = ["[pageAction]"];
function PageHeader_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "h2", 3);
    \u0275\u0275text(1);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.title());
  }
}
function PageHeader_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "p", 4);
    \u0275\u0275text(1);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.subtitle());
  }
}
function PageHeader_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275projection(0);
  }
}
function PageHeader_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "div", 5)(1, "p", 6);
    \u0275\u0275text(2);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(3, "p", 7);
    \u0275\u0275text(4, "Elaborado por: ");
    \u0275\u0275domElementStart(5, "span", 8);
    \u0275\u0275text(6);
    \u0275\u0275domElementEnd()();
    \u0275\u0275domElementStart(7, "p", 7);
    \u0275\u0275text(8, "Fecha Emisi\xF3n: ");
    \u0275\u0275domElementStart(9, "span", 8);
    \u0275\u0275text(10);
    \u0275\u0275domElementEnd()();
    \u0275\u0275domElementStart(11, "p", 7);
    \u0275\u0275text(12, "Edici\xF3n: ");
    \u0275\u0275domElementStart(13, "span", 8);
    \u0275\u0275text(14);
    \u0275\u0275domElementEnd()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.codigoFormulario() ?? "\u2014");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r0.resolvedElaboradoPor() ?? "\u2014");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r0.resolvedFecha() ?? "\u2014");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r0.edicion() ?? "\u2014");
  }
}
var PageHeader = class _PageHeader {
  datePipe = inject(DatePipe);
  authService = inject(AuthService);
  breadcrumbSection = input.required(...ngDevMode ? [{ debugName: "breadcrumbSection" }] : []);
  title = input(null, ...ngDevMode ? [{ debugName: "title" }] : []);
  subtitle = input(null, ...ngDevMode ? [{ debugName: "subtitle" }] : []);
  codigoFormulario = input(null, ...ngDevMode ? [{ debugName: "codigoFormulario" }] : []);
  edicion = input(null, ...ngDevMode ? [{ debugName: "edicion" }] : []);
  elaboradoPor = input(null, ...ngDevMode ? [{ debugName: "elaboradoPor" }] : []);
  fechaSolicitud = input(null, ...ngDevMode ? [{ debugName: "fechaSolicitud" }] : []);
  hasProjectedContent = false;
  pageAction;
  ngAfterContentInit() {
    this.hasProjectedContent = !!this.pageAction;
  }
  resolvedElaboradoPor = computed(() => this.elaboradoPor() ?? this.authService.userProfile()?.name ?? null, ...ngDevMode ? [{ debugName: "resolvedElaboradoPor" }] : []);
  resolvedFecha = computed(() => {
    const f = this.fechaSolicitud() ?? /* @__PURE__ */ new Date();
    if (f instanceof Date)
      return this.datePipe.transform(f, "dd/MM/yyyy");
    return f;
  }, ...ngDevMode ? [{ debugName: "resolvedFecha" }] : []);
  static \u0275fac = function PageHeader_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _PageHeader)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _PageHeader, selectors: [["app-page-header"]], contentQueries: function PageHeader_ContentQueries(rf, ctx, dirIndex) {
    if (rf & 1) {
      \u0275\u0275contentQuery(dirIndex, _c0, 5);
    }
    if (rf & 2) {
      let _t;
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.pageAction = _t.first);
    }
  }, inputs: { breadcrumbSection: [1, "breadcrumbSection"], title: [1, "title"], subtitle: [1, "subtitle"], codigoFormulario: [1, "codigoFormulario"], edicion: [1, "edicion"], elaboradoPor: [1, "elaboradoPor"], fechaSolicitud: [1, "fechaSolicitud"] }, features: [\u0275\u0275ProvidersFeature([DatePipe])], ngContentSelectors: _c2, decls: 10, vars: 4, consts: [[1, "flex", "justify-between", "items-start", "mb-8"], [1, "text-sm", "font-medium", "text-slate-500", "mb-1"], [1, "font-bold", "text-[#1d2b64]"], [1, "text-2xl", "font-bold", "text-[#1d2b64]", "uppercase"], [1, "text-sm", "text-slate-600", "mt-1"], [1, "text-right", "space-y-0.5"], [1, "font-bold", "text-[#1d2b64]", "text-sm"], [1, "text-[13px]", "text-slate-700"], [1, "font-medium"]], template: function PageHeader_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275projectionDef(_c1);
      \u0275\u0275domElementStart(0, "div", 0)(1, "div")(2, "p", 1);
      \u0275\u0275text(3, " Sistema LIMS / ");
      \u0275\u0275domElementStart(4, "span", 2);
      \u0275\u0275text(5);
      \u0275\u0275domElementEnd()();
      \u0275\u0275conditionalCreate(6, PageHeader_Conditional_6_Template, 2, 1, "h2", 3);
      \u0275\u0275conditionalCreate(7, PageHeader_Conditional_7_Template, 2, 1, "p", 4);
      \u0275\u0275domElementEnd();
      \u0275\u0275conditionalCreate(8, PageHeader_Conditional_8_Template, 1, 0)(9, PageHeader_Conditional_9_Template, 15, 4, "div", 5);
      \u0275\u0275domElementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance(5);
      \u0275\u0275textInterpolate(ctx.breadcrumbSection());
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.title() ? 6 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.subtitle() ? 7 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.hasProjectedContent ? 8 : 9);
    }
  }, encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PageHeader, [{
    type: Component,
    args: [{ selector: "app-page-header", standalone: true, imports: [], providers: [DatePipe], template: `<div class="flex justify-between items-start mb-8">

  <!-- LEFT: breadcrumb + title -->
  <div>
    <p class="text-sm font-medium text-slate-500 mb-1">
      Sistema LIMS / <span class="font-bold text-[#1d2b64]">{{ breadcrumbSection() }}</span>
    </p>
    @if (title()) {
      <h2 class="text-2xl font-bold text-[#1d2b64] uppercase">{{ title() }}</h2>
    }
    @if (subtitle()) {
      <p class="text-sm text-slate-600 mt-1">{{ subtitle() }}</p>
    }
  </div>

  <!-- RIGHT: bot\xF3n proyectado (admin) O metadata de documento (resto de m\xF3dulos) -->
  @if (hasProjectedContent) {
    <ng-content select="[pageAction]" />
  } @else {
    <div class="text-right space-y-0.5">
      <p class="font-bold text-[#1d2b64] text-sm">{{ codigoFormulario() ?? '\u2014' }}</p>
      <p class="text-[13px] text-slate-700">Elaborado por: <span class="font-medium">{{ resolvedElaboradoPor() ?? '\u2014' }}</span></p>
      <p class="text-[13px] text-slate-700">Fecha Emisi\xF3n: <span class="font-medium">{{ resolvedFecha() ?? '\u2014' }}</span></p>
      <p class="text-[13px] text-slate-700">Edici\xF3n: <span class="font-medium">{{ edicion() ?? '\u2014' }}</span></p>
    </div>
  }

</div>
` }]
  }], null, { breadcrumbSection: [{ type: Input, args: [{ isSignal: true, alias: "breadcrumbSection", required: true }] }], title: [{ type: Input, args: [{ isSignal: true, alias: "title", required: false }] }], subtitle: [{ type: Input, args: [{ isSignal: true, alias: "subtitle", required: false }] }], codigoFormulario: [{ type: Input, args: [{ isSignal: true, alias: "codigoFormulario", required: false }] }], edicion: [{ type: Input, args: [{ isSignal: true, alias: "edicion", required: false }] }], elaboradoPor: [{ type: Input, args: [{ isSignal: true, alias: "elaboradoPor", required: false }] }], fechaSolicitud: [{ type: Input, args: [{ isSignal: true, alias: "fechaSolicitud", required: false }] }], pageAction: [{
    type: ContentChild,
    args: ["pageAction"]
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(PageHeader, { className: "PageHeader", filePath: "src/app/shared/components/page-header/page-header.ts", lineNumber: 12 });
})();

export {
  PageHeader
};
//# sourceMappingURL=chunk-ULA2XVM4.js.map
