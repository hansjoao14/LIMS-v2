import {
  Router
} from "./chunk-UAQD7B5Z.js";
import {
  DefaultValueAccessor,
  FormsModule,
  NgControlStatus,
  NgModel
} from "./chunk-NAO2WYRM.js";
import "./chunk-GSQNXGZJ.js";
import {
  PageHeader
} from "./chunk-ULA2XVM4.js";
import {
  CommonModule
} from "./chunk-CIDLATYD.js";
import {
  Component,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnamespaceHTML,
  ɵɵnamespaceSVG,
  ɵɵnextContext,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIndex,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-WHOAKDIK.js";

// src/app/features/plan-muestreo/paso3/plan-muestreo-paso3.ts
function PlanMuestreoPaso3_For_30_Conditional_0_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 23)(1, "span", 24);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 25)(4, "button", 26);
    \u0275\u0275listener("click", function PlanMuestreoPaso3_For_30_Conditional_0_Conditional_9_Template_button_click_4_listener() {
      \u0275\u0275restoreView(_r4);
      const \u0275$index_53_r2 = \u0275\u0275nextContext(2).$index;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.soluciones[\u0275$index_53_r2 + 1].activo = !ctx_r2.soluciones[\u0275$index_53_r2 + 1].activo);
    });
    \u0275\u0275element(5, "span", 27);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "span", 28);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const \u0275$index_53_r2 = \u0275\u0275nextContext(2).$index;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275classProp("border-l-2", ctx_r2.soluciones[\u0275$index_53_r2 + 1].activo)("border-l-[#1e3a8a]", ctx_r2.soluciones[\u0275$index_53_r2 + 1].activo);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r2.soluciones[\u0275$index_53_r2 + 1].nombre);
    \u0275\u0275advance(2);
    \u0275\u0275classProp("bg-[#1e3a8a]", ctx_r2.soluciones[\u0275$index_53_r2 + 1].activo)("bg-slate-300", !ctx_r2.soluciones[\u0275$index_53_r2 + 1].activo);
    \u0275\u0275advance();
    \u0275\u0275classProp("translate-x-6", ctx_r2.soluciones[\u0275$index_53_r2 + 1].activo)("translate-x-1", !ctx_r2.soluciones[\u0275$index_53_r2 + 1].activo);
    \u0275\u0275advance();
    \u0275\u0275classProp("text-[#1e3a8a]", ctx_r2.soluciones[\u0275$index_53_r2 + 1].activo)("text-slate-400", !ctx_r2.soluciones[\u0275$index_53_r2 + 1].activo);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r2.soluciones[\u0275$index_53_r2 + 1].activo ? "S\xCD" : "NO", " ");
  }
}
function PlanMuestreoPaso3_For_30_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 22)(1, "div", 23)(2, "span", 24);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 25)(5, "button", 26);
    \u0275\u0275listener("click", function PlanMuestreoPaso3_For_30_Conditional_0_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r1);
      const \u0275$index_53_r2 = \u0275\u0275nextContext().$index;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.soluciones[\u0275$index_53_r2].activo = !ctx_r2.soluciones[\u0275$index_53_r2].activo);
    });
    \u0275\u0275element(6, "span", 27);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "span", 28);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()()();
    \u0275\u0275conditionalCreate(9, PlanMuestreoPaso3_For_30_Conditional_0_Conditional_9_Template, 8, 18, "div", 29);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const \u0275$index_53_r2 = \u0275\u0275nextContext().$index;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275classProp("border-l-2", ctx_r2.soluciones[\u0275$index_53_r2].activo)("border-l-[#1e3a8a]", ctx_r2.soluciones[\u0275$index_53_r2].activo);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r2.soluciones[\u0275$index_53_r2].nombre);
    \u0275\u0275advance(2);
    \u0275\u0275classProp("bg-[#1e3a8a]", ctx_r2.soluciones[\u0275$index_53_r2].activo)("bg-slate-300", !ctx_r2.soluciones[\u0275$index_53_r2].activo);
    \u0275\u0275advance();
    \u0275\u0275classProp("translate-x-6", ctx_r2.soluciones[\u0275$index_53_r2].activo)("translate-x-1", !ctx_r2.soluciones[\u0275$index_53_r2].activo);
    \u0275\u0275advance();
    \u0275\u0275classProp("text-[#1e3a8a]", ctx_r2.soluciones[\u0275$index_53_r2].activo)("text-slate-400", !ctx_r2.soluciones[\u0275$index_53_r2].activo);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r2.soluciones[\u0275$index_53_r2].activo ? "S\xCD" : "NO", " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(\u0275$index_53_r2 + 1 < ctx_r2.soluciones.length ? 9 : -1);
  }
}
function PlanMuestreoPaso3_For_30_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, PlanMuestreoPaso3_For_30_Conditional_0_Template, 10, 19, "div", 22);
  }
  if (rf & 2) {
    const \u0275$index_53_r2 = ctx.$index;
    \u0275\u0275conditional(\u0275$index_53_r2 % 2 === 0 ? 0 : -1);
  }
}
function PlanMuestreoPaso3_For_44_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 18);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const nota_r5 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(nota_r5);
  }
}
var PlanMuestreoPaso3 = class _PlanMuestreoPaso3 {
  router;
  equipamientoSeguridad = "Casco, overol con cintas reflectivas, zapatos punta de acero, gafas, mascarilla para vapores \xE1cidos, guantes de nitrilo, guantes de hilo, botiqu\xEDn de primeros auxilios, gel antibacterial, conos";
  soluciones = [
    { nombre: "BUFFER DE PH 2 C\xD3D. QC-18", activo: false },
    { nombre: "BUFFER DE PH 4 C\xD3D. QC-17", activo: false },
    { nombre: "BUFFER DE PH 7 C\xD3D. QC-16", activo: false },
    { nombre: "BUFFER DE PH 10 C\xD3D. QC-14", activo: false },
    { nombre: "PE DE PH 6.63", activo: false },
    { nombre: "EST\xC1NDAR OX\xCDGENO DISUELTO 0 MG/L C\xD3D. RV-42", activo: false },
    { nombre: "EST\xC1NDAR CONDUCTIVIDAD 1413 C\xD3D. RV-63", activo: false },
    { nombre: "EST\xC1NDAR CONDUCTIVIDAD 147 C\xD3D. RV-62", activo: false }
  ];
  observaciones = "";
  notas = [
    "Nota 1: El muestreador debe lavar los frascos de muestra con el agua del sitio de muestreo antes de recolectar la muestra.",
    "Nota 2: En caso de que el punto de muestreo se encuentre en una zona de dif\xEDcil acceso, se debe notificar al responsable del \xE1rea."
  ];
  constructor(router) {
    this.router = router;
  }
  regresar() {
    this.router.navigate(["/plan-muestreo/paso2"]);
  }
  guardar() {
    console.log("[plan-muestreo-paso3:guardar]", {
      equipamientoSeguridad: this.equipamientoSeguridad,
      soluciones: this.soluciones,
      observaciones: this.observaciones
    });
  }
  static \u0275fac = function PlanMuestreoPaso3_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _PlanMuestreoPaso3)(\u0275\u0275directiveInject(Router));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _PlanMuestreoPaso3, selectors: [["app-plan-muestreo-paso3"]], decls: 50, vars: 2, consts: [[1, "p-6", "bg-slate-50", "min-h-screen", "text-slate-700", "font-sans", "pb-24"], [1, "max-w-7xl", "mx-auto"], [1, "animate-in", "fade-in"], ["breadcrumbSection", "Operaciones de campo", "title", "Plan de muestreo", "subtitle", "Aqu\xED podr\xE1s visualizar los detalles del plan de muestreo", "codigoFormulario", "F-PEE-42-01", "edicion", "11"], [1, "bg-white", "rounded-lg", "shadow-sm", "border", "border-slate-200", "p-8", "space-y-8", "animate-in", "fade-in", "slide-in-from-right-4"], [1, "mb-6", "border-b", "border-slate-300", "pb-4"], [1, "text-lg", "font-bold", "text-[#1e3a8a]", "mb-1"], [1, "border", "border-slate-200", "rounded-sm", "overflow-hidden", "shadow-sm"], [1, "bg-[#f8fafc]", "border-b", "border-slate-200", "px-5", "py-3"], [1, "font-bold", "text-[#1e3a8a]", "text-sm", "uppercase"], [1, "p-5"], [1, "inline-flex", "items-center", "gap-2", "bg-[#1e3a8a]", "text-white", "text-xs", "font-bold", "px-4", "py-2", "rounded", "select-none"], ["fill", "none", "stroke", "currentColor", "viewBox", "0 0 24 24", 1, "w-4", "h-4", "shrink-0"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"], ["rows", "4", 1, "w-full", "border", "border-slate-300", "rounded", "p-3", "text-sm", "resize-none", "outline-none", "focus:border-[#1e3a8a]", "bg-white", "text-slate-700", "transition-colors", 3, "ngModelChange", "ngModel"], [1, "divide-y", "divide-slate-100"], ["rows", "4", "placeholder", "Ingrese observaciones...", 1, "w-full", "border", "border-slate-300", "rounded", "p-3", "text-sm", "resize-none", "outline-none", "focus:border-[#1e3a8a]", "bg-white", "text-slate-700", "transition-colors", 3, "ngModelChange", "ngModel"], [1, "p-5", "space-y-2"], [1, "text-xs", "text-slate-600"], [1, "flex", "justify-between", "pt-4", "border-t", "border-slate-300"], ["type", "button", 1, "bg-white", "border", "border-slate-300", "text-slate-700", "px-8", "py-2.5", "rounded", "text-sm", "font-bold", "shadow-sm", "hover:bg-slate-50", "transition-all", 3, "click"], ["type", "button", 1, "bg-[#1e3a8a]", "text-white", "px-8", "py-2.5", "rounded", "text-sm", "font-bold", "shadow-md", "hover:bg-[#2541b2]", "transition-all", 3, "click"], [1, "grid", "grid-cols-1", "md:grid-cols-2", "divide-y", "md:divide-y-0", "md:divide-x", "divide-slate-100"], [1, "px-5", "py-3", "flex", "items-center", "justify-between", "gap-4", "hover:bg-slate-50", "transition-colors"], [1, "text-[11px]", "font-bold", "text-[#1e3a8a]", "uppercase"], [1, "flex", "items-center", "gap-2", "shrink-0"], ["type", "button", 1, "relative", "inline-flex", "h-6", "w-11", "items-center", "rounded-full", "transition-colors", "focus:outline-none", 3, "click"], [1, "inline-block", "h-4", "w-4", "transform", "rounded-full", "bg-white", "shadow", "transition-transform"], [1, "text-xs", "font-bold", "w-6"], [1, "px-5", "py-3", "flex", "items-center", "justify-between", "gap-4", "hover:bg-slate-50", "transition-colors", 3, "border-l-2", "border-l-[#1e3a8a]"]], template: function PlanMuestreoPaso3_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div", 2);
      \u0275\u0275element(3, "app-page-header", 3);
      \u0275\u0275elementStart(4, "div", 4)(5, "div", 5)(6, "h3", 6);
      \u0275\u0275text(7, "Paso 3: Procedimiento y Est\xE1ndares");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(8, "section", 7)(9, "div", 8)(10, "h4", 9);
      \u0275\u0275text(11, "Procedimiento de Muestreo del Recurso H\xEDdrico");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(12, "div", 10)(13, "span", 11);
      \u0275\u0275namespaceSVG();
      \u0275\u0275elementStart(14, "svg", 12);
      \u0275\u0275element(15, "path", 13);
      \u0275\u0275elementEnd();
      \u0275\u0275text(16, " PEE/IAMQ/42 ");
      \u0275\u0275elementEnd()()();
      \u0275\u0275namespaceHTML();
      \u0275\u0275elementStart(17, "section", 7)(18, "div", 8)(19, "h4", 9);
      \u0275\u0275text(20, "Equipamiento de Seguridad");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(21, "div", 10)(22, "textarea", 14);
      \u0275\u0275twoWayListener("ngModelChange", function PlanMuestreoPaso3_Template_textarea_ngModelChange_22_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.equipamientoSeguridad, $event) || (ctx.equipamientoSeguridad = $event);
        return $event;
      });
      \u0275\u0275text(23, "            ");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(24, "section", 7)(25, "div", 8)(26, "h4", 9);
      \u0275\u0275text(27, "Soluciones Buffer y Est\xE1ndares");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(28, "div", 15);
      \u0275\u0275repeaterCreate(29, PlanMuestreoPaso3_For_30_Template, 1, 1, null, null, \u0275\u0275repeaterTrackByIndex);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(31, "section", 7)(32, "div", 8)(33, "h4", 9);
      \u0275\u0275text(34, "Observaciones");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(35, "div", 10)(36, "textarea", 16);
      \u0275\u0275twoWayListener("ngModelChange", function PlanMuestreoPaso3_Template_textarea_ngModelChange_36_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.observaciones, $event) || (ctx.observaciones = $event);
        return $event;
      });
      \u0275\u0275text(37, "            ");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(38, "section", 7)(39, "div", 8)(40, "h4", 9);
      \u0275\u0275text(41, "Notas");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(42, "div", 17);
      \u0275\u0275repeaterCreate(43, PlanMuestreoPaso3_For_44_Template, 2, 1, "p", 18, \u0275\u0275repeaterTrackByIndex);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(45, "div", 19)(46, "button", 20);
      \u0275\u0275listener("click", function PlanMuestreoPaso3_Template_button_click_46_listener() {
        return ctx.regresar();
      });
      \u0275\u0275text(47, " REGRESAR ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(48, "button", 21);
      \u0275\u0275listener("click", function PlanMuestreoPaso3_Template_button_click_48_listener() {
        return ctx.guardar();
      });
      \u0275\u0275text(49, " GUARDAR ");
      \u0275\u0275elementEnd()()()()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(22);
      \u0275\u0275twoWayProperty("ngModel", ctx.equipamientoSeguridad);
      \u0275\u0275advance(7);
      \u0275\u0275repeater(ctx.soluciones);
      \u0275\u0275advance(7);
      \u0275\u0275twoWayProperty("ngModel", ctx.observaciones);
      \u0275\u0275advance(7);
      \u0275\u0275repeater(ctx.notas);
    }
  }, dependencies: [CommonModule, FormsModule, DefaultValueAccessor, NgControlStatus, NgModel, PageHeader], styles: ["\n\n.animate-in[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_animateIn 0.3s ease-out forwards;\n}\n.fade-in[_ngcontent-%COMP%] {\n  opacity: 0;\n}\n.slide-in-from-bottom-4[_ngcontent-%COMP%] {\n  transform: translateY(1rem);\n}\n.slide-in-from-right-4[_ngcontent-%COMP%] {\n  transform: translateX(1rem);\n}\n@keyframes _ngcontent-%COMP%_animateIn {\n  to {\n    opacity: 1;\n    transform: translate(0);\n  }\n}\n.custom-scroll[_ngcontent-%COMP%]::-webkit-scrollbar {\n  width: 6px;\n  height: 6px;\n}\n.custom-scroll[_ngcontent-%COMP%]::-webkit-scrollbar-track {\n  background: #f1f5f9;\n  border-radius: 4px;\n}\n.custom-scroll[_ngcontent-%COMP%]::-webkit-scrollbar-thumb {\n  background: #cbd5e1;\n  border-radius: 4px;\n}\n.custom-scroll[_ngcontent-%COMP%]::-webkit-scrollbar-thumb:hover {\n  background: #94a3b8;\n}\ninput[_ngcontent-%COMP%]:focus, \nselect[_ngcontent-%COMP%]:focus, \ntextarea[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: #1e3a8a;\n  box-shadow: 0 0 0 1px #1e3a8a;\n}\n/*# sourceMappingURL=plan-muestreo.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PlanMuestreoPaso3, [{
    type: Component,
    args: [{ selector: "app-plan-muestreo-paso3", standalone: true, imports: [CommonModule, FormsModule, PageHeader], template: `<div class="p-6 bg-slate-50 min-h-screen text-slate-700 font-sans pb-24">
  <div class="max-w-7xl mx-auto">
    <div class="animate-in fade-in">

      <app-page-header
        breadcrumbSection="Operaciones de campo"
        title="Plan de muestreo"
        subtitle="Aqu\xED podr\xE1s visualizar los detalles del plan de muestreo"
        codigoFormulario="F-PEE-42-01"
        edicion="11"
      />

      <!-- Step-card -->
      <div class="bg-white rounded-lg shadow-sm border border-slate-200 p-8 space-y-8 animate-in fade-in slide-in-from-right-4">

        <!-- Step-header -->
        <div class="mb-6 border-b border-slate-300 pb-4">
          <h3 class="text-lg font-bold text-[#1e3a8a] mb-1">Paso 3: Procedimiento y Est\xE1ndares</h3>
        </div>

        <!-- Section: Procedimiento de Muestreo -->
        <section class="border border-slate-200 rounded-sm overflow-hidden shadow-sm">
          <div class="bg-[#f8fafc] border-b border-slate-200 px-5 py-3">
            <h4 class="font-bold text-[#1e3a8a] text-sm uppercase">Procedimiento de Muestreo del Recurso H\xEDdrico</h4>
          </div>
          <div class="p-5">
            <span class="inline-flex items-center gap-2 bg-[#1e3a8a] text-white text-xs font-bold px-4 py-2 rounded select-none">
              <svg class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              PEE/IAMQ/42
            </span>
          </div>
        </section>

        <!-- Section: Equipamiento de Seguridad -->
        <section class="border border-slate-200 rounded-sm overflow-hidden shadow-sm">
          <div class="bg-[#f8fafc] border-b border-slate-200 px-5 py-3">
            <h4 class="font-bold text-[#1e3a8a] text-sm uppercase">Equipamiento de Seguridad</h4>
          </div>
          <div class="p-5">
            <textarea [(ngModel)]="equipamientoSeguridad" rows="4"
              class="w-full border border-slate-300 rounded p-3 text-sm resize-none outline-none focus:border-[#1e3a8a] bg-white text-slate-700 transition-colors">
            </textarea>
          </div>
        </section>

        <!-- Section: Soluciones Buffer y Est\xE1ndares -->
        <section class="border border-slate-200 rounded-sm overflow-hidden shadow-sm">
          <div class="bg-[#f8fafc] border-b border-slate-200 px-5 py-3">
            <h4 class="font-bold text-[#1e3a8a] text-sm uppercase">Soluciones Buffer y Est\xE1ndares</h4>
          </div>
          <div class="divide-y divide-slate-100">
            @for (sol of soluciones; track $index; let i = $index) {
              @if (i % 2 === 0) {
                <div class="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-100">
                  <!-- left item -->
                  <div class="px-5 py-3 flex items-center justify-between gap-4 hover:bg-slate-50 transition-colors"
                    [class.border-l-2]="soluciones[i].activo"
                    [class.border-l-[#1e3a8a]]="soluciones[i].activo">
                    <span class="text-[11px] font-bold text-[#1e3a8a] uppercase">{{ soluciones[i].nombre }}</span>
                    <div class="flex items-center gap-2 shrink-0">
                      <button type="button"
                        class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none"
                        [class.bg-[#1e3a8a]]="soluciones[i].activo"
                        [class.bg-slate-300]="!soluciones[i].activo"
                        (click)="soluciones[i].activo = !soluciones[i].activo">
                        <span class="inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform"
                          [class.translate-x-6]="soluciones[i].activo"
                          [class.translate-x-1]="!soluciones[i].activo">
                        </span>
                      </button>
                      <span class="text-xs font-bold w-6"
                        [class.text-[#1e3a8a]]="soluciones[i].activo"
                        [class.text-slate-400]="!soluciones[i].activo">
                        {{ soluciones[i].activo ? 'S\xCD' : 'NO' }}
                      </span>
                    </div>
                  </div>
                  <!-- right item (if exists) -->
                  @if (i + 1 < soluciones.length) {
                    <div class="px-5 py-3 flex items-center justify-between gap-4 hover:bg-slate-50 transition-colors"
                      [class.border-l-2]="soluciones[i + 1].activo"
                      [class.border-l-[#1e3a8a]]="soluciones[i + 1].activo">
                      <span class="text-[11px] font-bold text-[#1e3a8a] uppercase">{{ soluciones[i + 1].nombre }}</span>
                      <div class="flex items-center gap-2 shrink-0">
                        <button type="button"
                          class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none"
                          [class.bg-[#1e3a8a]]="soluciones[i + 1].activo"
                          [class.bg-slate-300]="!soluciones[i + 1].activo"
                          (click)="soluciones[i + 1].activo = !soluciones[i + 1].activo">
                          <span class="inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform"
                            [class.translate-x-6]="soluciones[i + 1].activo"
                            [class.translate-x-1]="!soluciones[i + 1].activo">
                          </span>
                        </button>
                        <span class="text-xs font-bold w-6"
                          [class.text-[#1e3a8a]]="soluciones[i + 1].activo"
                          [class.text-slate-400]="!soluciones[i + 1].activo">
                          {{ soluciones[i + 1].activo ? 'S\xCD' : 'NO' }}
                        </span>
                      </div>
                    </div>
                  }
                </div>
              }
            }
          </div>
        </section>

        <!-- Section: Observaciones -->
        <section class="border border-slate-200 rounded-sm overflow-hidden shadow-sm">
          <div class="bg-[#f8fafc] border-b border-slate-200 px-5 py-3">
            <h4 class="font-bold text-[#1e3a8a] text-sm uppercase">Observaciones</h4>
          </div>
          <div class="p-5">
            <textarea [(ngModel)]="observaciones" rows="4" placeholder="Ingrese observaciones..."
              class="w-full border border-slate-300 rounded p-3 text-sm resize-none outline-none focus:border-[#1e3a8a] bg-white text-slate-700 transition-colors">
            </textarea>
          </div>
        </section>

        <!-- Section: Notas -->
        <section class="border border-slate-200 rounded-sm overflow-hidden shadow-sm">
          <div class="bg-[#f8fafc] border-b border-slate-200 px-5 py-3">
            <h4 class="font-bold text-[#1e3a8a] text-sm uppercase">Notas</h4>
          </div>
          <div class="p-5 space-y-2">
            @for (nota of notas; track $index) {
              <p class="text-xs text-slate-600">{{ nota }}</p>
            }
          </div>
        </section>

        <!-- Nav buttons -->
        <div class="flex justify-between pt-4 border-t border-slate-300">
          <button type="button" (click)="regresar()"
            class="bg-white border border-slate-300 text-slate-700 px-8 py-2.5 rounded text-sm font-bold shadow-sm hover:bg-slate-50 transition-all">
            REGRESAR
          </button>
          <button type="button" (click)="guardar()"
            class="bg-[#1e3a8a] text-white px-8 py-2.5 rounded text-sm font-bold shadow-md hover:bg-[#2541b2] transition-all">
            GUARDAR
          </button>
        </div>

      </div>

    </div>
  </div>
</div>
`, styles: ["/* src/app/features/plan-muestreo/plan-muestreo.css */\n.animate-in {\n  animation: animateIn 0.3s ease-out forwards;\n}\n.fade-in {\n  opacity: 0;\n}\n.slide-in-from-bottom-4 {\n  transform: translateY(1rem);\n}\n.slide-in-from-right-4 {\n  transform: translateX(1rem);\n}\n@keyframes animateIn {\n  to {\n    opacity: 1;\n    transform: translate(0);\n  }\n}\n.custom-scroll::-webkit-scrollbar {\n  width: 6px;\n  height: 6px;\n}\n.custom-scroll::-webkit-scrollbar-track {\n  background: #f1f5f9;\n  border-radius: 4px;\n}\n.custom-scroll::-webkit-scrollbar-thumb {\n  background: #cbd5e1;\n  border-radius: 4px;\n}\n.custom-scroll::-webkit-scrollbar-thumb:hover {\n  background: #94a3b8;\n}\ninput:focus,\nselect:focus,\ntextarea:focus {\n  outline: none;\n  border-color: #1e3a8a;\n  box-shadow: 0 0 0 1px #1e3a8a;\n}\n/*# sourceMappingURL=plan-muestreo.css.map */\n"] }]
  }], () => [{ type: Router }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(PlanMuestreoPaso3, { className: "PlanMuestreoPaso3", filePath: "src/app/features/plan-muestreo/paso3/plan-muestreo-paso3.ts", lineNumber: 19 });
})();
export {
  PlanMuestreoPaso3
};
//# sourceMappingURL=chunk-4HXP7U6M.js.map
