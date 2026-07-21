import {
  Router
} from "./chunk-UAQD7B5Z.js";
import {
  DefaultValueAccessor,
  FormsModule,
  NgControlStatus,
  NgModel,
  NgSelectOption,
  NumberValueAccessor,
  SelectControlValueAccessor,
  ɵNgSelectMultipleOption
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
  ɵɵattribute,
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
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIdentity,
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

// src/app/features/plan-muestreo/paso2/plan-muestreo-paso2.ts
function PlanMuestreoPaso2_For_41_For_1_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 41);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const control_r1 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275attribute("rowspan", control_r1.filas.length);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", control_r1.tipo, " ");
  }
}
function PlanMuestreoPaso2_For_41_For_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr", 24);
    \u0275\u0275conditionalCreate(1, PlanMuestreoPaso2_For_41_For_1_Conditional_1_Template, 2, 2, "td", 41);
    \u0275\u0275elementStart(2, "td", 42);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "td", 43);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const fila_r2 = ctx.$implicit;
    const \u0275$index_71_r3 = ctx.$index;
    \u0275\u0275advance();
    \u0275\u0275conditional(\u0275$index_71_r3 === 0 ? 1 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(fila_r2.analisis);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(fila_r2.muestrasFaltantes);
  }
}
function PlanMuestreoPaso2_For_41_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275repeaterCreate(0, PlanMuestreoPaso2_For_41_For_1_Template, 6, 3, "tr", 24, \u0275\u0275repeaterTrackByIndex);
  }
  if (rf & 2) {
    const control_r1 = ctx.$implicit;
    \u0275\u0275repeater(control_r1.filas);
  }
}
function PlanMuestreoPaso2_For_58_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tr", 24)(1, "td", 42);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "td", 44)(4, "input", 45);
    \u0275\u0275twoWayListener("ngModelChange", function PlanMuestreoPaso2_For_58_Template_input_ngModelChange_4_listener($event) {
      const p_r5 = \u0275\u0275restoreView(_r4).$implicit;
      \u0275\u0275twoWayBindingSet(p_r5.volumen, $event) || (p_r5.volumen = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "td", 46);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const p_r5 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(p_r5.preservacion);
    \u0275\u0275advance(2);
    \u0275\u0275twoWayProperty("ngModel", p_r5.volumen);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(p_r5.tipoRecipiente);
  }
}
function PlanMuestreoPaso2_For_69_For_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 47);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const opt_r8 = ctx.$implicit;
    \u0275\u0275property("value", opt_r8);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(opt_r8);
  }
}
function PlanMuestreoPaso2_For_69_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 28)(1, "label", 12);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "select", 13);
    \u0275\u0275twoWayListener("ngModelChange", function PlanMuestreoPaso2_For_69_Template_select_ngModelChange_3_listener($event) {
      const eq_r7 = \u0275\u0275restoreView(_r6).$implicit;
      \u0275\u0275twoWayBindingSet(eq_r7.seleccion, $event) || (eq_r7.seleccion = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(4, "option", 14);
    \u0275\u0275text(5, "Seleccione...");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(6, PlanMuestreoPaso2_For_69_For_7_Template, 2, 2, "option", 47, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const eq_r7 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(eq_r7.nombre);
    \u0275\u0275advance();
    \u0275\u0275twoWayProperty("ngModel", eq_r7.seleccion);
    \u0275\u0275advance(3);
    \u0275\u0275repeater(eq_r7.opciones);
  }
}
function PlanMuestreoPaso2_For_75_For_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 47);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const opt_r11 = ctx.$implicit;
    \u0275\u0275property("value", opt_r11);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(opt_r11);
  }
}
function PlanMuestreoPaso2_For_75_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 28)(1, "label", 12);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "select", 13);
    \u0275\u0275twoWayListener("ngModelChange", function PlanMuestreoPaso2_For_75_Template_select_ngModelChange_3_listener($event) {
      const eq_r10 = \u0275\u0275restoreView(_r9).$implicit;
      \u0275\u0275twoWayBindingSet(eq_r10.seleccion, $event) || (eq_r10.seleccion = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(4, "option", 14);
    \u0275\u0275text(5, "Seleccione...");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(6, PlanMuestreoPaso2_For_75_For_7_Template, 2, 2, "option", 47, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const eq_r10 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(eq_r10.nombre);
    \u0275\u0275advance();
    \u0275\u0275twoWayProperty("ngModel", eq_r10.seleccion);
    \u0275\u0275advance(3);
    \u0275\u0275repeater(eq_r10.opciones);
  }
}
function PlanMuestreoPaso2_For_82_Template(rf, ctx) {
  if (rf & 1) {
    const _r12 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 30)(1, "span", 48);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 49)(4, "button", 50);
    \u0275\u0275listener("click", function PlanMuestreoPaso2_For_82_Template_button_click_4_listener() {
      const mat_r13 = \u0275\u0275restoreView(_r12).$implicit;
      return \u0275\u0275resetView(mat_r13.activo = !mat_r13.activo);
    });
    \u0275\u0275element(5, "span", 51);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "span", 52);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const mat_r13 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(mat_r13.nombre);
    \u0275\u0275advance(2);
    \u0275\u0275classProp("bg-[#1e3a8a]", mat_r13.activo)("bg-slate-300", !mat_r13.activo);
    \u0275\u0275advance();
    \u0275\u0275classProp("translate-x-6", mat_r13.activo)("translate-x-1", !mat_r13.activo);
    \u0275\u0275advance();
    \u0275\u0275classProp("text-[#1e3a8a]", mat_r13.activo)("text-slate-400", !mat_r13.activo);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", mat_r13.activo ? "S\xCD" : "NO", " ");
  }
}
var PlanMuestreoPaso2 = class _PlanMuestreoPaso2 {
  router;
  tipoMuestreo = "";
  controlesCalidad = [
    {
      tipo: "REPETIBILIDAD",
      filas: [
        { analisis: "pH, TEMPERATURA", muestrasFaltantes: 4 },
        { analisis: "MUESTREO", muestrasFaltantes: 9 }
      ]
    },
    {
      tipo: "REPRODUCIBILIDAD",
      filas: [
        { analisis: "pH, TEMPERATURA", muestrasFaltantes: 4 },
        { analisis: "MUESTREO", muestrasFaltantes: 29 }
      ]
    },
    {
      tipo: "BLANCO DE CONTROL",
      filas: [{ analisis: "MUESTREO", muestrasFaltantes: 29 }]
    }
  ];
  preservaciones = [
    { preservacion: "Temperatura 0\xBAC a 6\xBAC", volumen: null, tipoRecipiente: "Vidrio opaco" },
    { preservacion: "H2SO4", volumen: null, tipoRecipiente: "Vidrio opaco" },
    { preservacion: "HNO3", volumen: null, tipoRecipiente: "Vidrio opaco" }
  ];
  equiposMedicion = [
    { nombre: "MULTIPAR\xC1METROS", seleccion: "", opciones: ["IDM-21-15", "IDM-21-26"] },
    { nombre: "TERM\xD3METRO DIGITAL", seleccion: "", opciones: ["IDM-21-15"] },
    { nombre: "AFORADOR DOPPLER", seleccion: "", opciones: ["IDM-21-15"] },
    { nombre: "MEDIDOR DE CAUDAL MAGN\xC9TICO - INDUCTIVO", seleccion: "", opciones: ["IDM-21-15"] }
  ];
  equiposPreservacion = [
    { nombre: "FRIGOR\xCDFICO PORT\xC1TIL", seleccion: "", opciones: ["A-21-18", "A-21-19"] }
  ];
  materiales = [
    { nombre: "P\xC9RTIGA EXTENSIBLE", activo: false },
    { nombre: "BALDE PL\xC1STICO CON TAPA", activo: false },
    { nombre: "VASO ANGULAR O DE CUCHARA", activo: false },
    { nombre: "SOGA DE ESCALADA 30 METROS DE LARGO", activo: false },
    { nombre: "JARRA DE VIDRIO DE 1 LITRO", activo: false }
  ];
  personasEnCampo = 0;
  movilizacion = "";
  tiempoPermanencia = 0;
  duracionMuestreo = 0;
  constructor(router) {
    this.router = router;
  }
  regresar() {
    this.router.navigate(["/plan-muestreo"]);
  }
  siguiente() {
    this.router.navigate(["/plan-muestreo/paso3"]);
  }
  static \u0275fac = function PlanMuestreoPaso2_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _PlanMuestreoPaso2)(\u0275\u0275directiveInject(Router));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _PlanMuestreoPaso2, selectors: [["app-plan-muestreo-paso2"]], decls: 134, vars: 6, consts: [[1, "p-6", "bg-slate-50", "min-h-screen", "text-slate-700", "font-sans", "pb-24"], [1, "max-w-7xl", "mx-auto"], [1, "animate-in", "fade-in"], ["breadcrumbSection", "Operaciones de campo", "title", "Plan de muestreo", "subtitle", "Aqu\xED podr\xE1s visualizar los detalles del plan de muestreo", "codigoFormulario", "F-PEE-42-01", "edicion", "11"], [1, "bg-white", "rounded-lg", "shadow-sm", "border", "border-slate-200", "p-8", "space-y-8", "animate-in", "fade-in", "slide-in-from-right-4"], [1, "mb-6", "border-b", "border-slate-300", "pb-4"], [1, "text-lg", "font-bold", "text-[#1e3a8a]", "mb-1"], [1, "border", "border-slate-200", "rounded-sm", "overflow-hidden", "shadow-sm"], [1, "bg-[#f8fafc]", "border-b", "border-slate-200", "px-5", "py-3"], [1, "font-bold", "text-[#1e3a8a]", "text-sm", "uppercase"], [1, "p-5"], [1, "max-w-xs"], [1, "block", "text-[11px]", "font-bold", "text-[#1e3a8a]", "uppercase", "mb-1"], [1, "w-full", "border", "border-slate-300", "bg-white", "text-slate-700", "p-2.5", "rounded", "text-sm", "outline-none", "focus:border-[#1e3a8a]", "transition-colors", 3, "ngModelChange", "ngModel"], ["value", ""], ["value", "simple"], ["value", "compuesto"], ["value", "integrado"], [1, "overflow-x-auto", "custom-scroll"], [1, "w-full", "text-sm", "border-collapse"], [1, "bg-slate-50", "text-[10px]", "font-bold", "text-slate-500", "uppercase", "border-b", "border-gray-200", "tracking-wider"], [1, "px-4", "py-2.5", "border-r", "border-gray-100", "text-left"], [1, "px-4", "py-2.5", "text-center"], [1, "px-4", "py-2.5", "text-left"], [1, "border-b", "border-gray-100", "hover:bg-slate-50", "transition-colors"], [1, "p-5", "space-y-6"], [1, "text-[11px]", "font-bold", "text-[#1e3a8a]", "uppercase", "mb-3"], [1, "grid", "grid-cols-1", "md:grid-cols-2", "gap-4"], [1, "flex", "flex-col"], [1, "divide-y", "divide-slate-100"], [1, "px-5", "py-3", "flex", "items-center", "justify-between", "gap-4", "hover:bg-slate-50", "transition-colors"], [1, "p-5", "grid", "grid-cols-1", "md:grid-cols-2", "gap-6"], [1, "flex", "items-center", "gap-3"], ["type", "button", 1, "w-8", "h-8", "rounded", "border", "border-slate-300", "flex", "items-center", "justify-center", "font-bold", "text-slate-600", "hover:bg-slate-100", "transition-colors", 3, "click"], [1, "text-sm", "font-bold", "text-[#1e3a8a]", "w-8", "text-center"], [1, "text-xs", "text-slate-500"], [1, "flex", "flex-col", "md:col-span-2"], [1, "w-full", "border", "border-slate-300", "rounded", "p-3", "text-sm", "resize-none", "outline-none", "focus:border-[#1e3a8a]", "bg-white", "text-slate-700", 3, "ngModelChange", "ngModel", "rows"], [1, "flex", "justify-between", "pt-4", "border-t", "border-slate-300"], ["type", "button", 1, "bg-white", "border", "border-slate-300", "text-slate-700", "px-8", "py-2.5", "rounded", "text-sm", "font-bold", "shadow-sm", "hover:bg-slate-50", "transition-all", 3, "click"], ["type", "button", 1, "bg-[#1e3a8a]", "text-white", "px-8", "py-2.5", "rounded", "text-sm", "font-bold", "shadow-md", "hover:bg-[#2541b2]", "transition-all", 3, "click"], [1, "px-4", "py-3", "border-r", "border-gray-100", "font-bold", "text-[#1e3a8a]", "text-xs", "uppercase", "align-middle"], [1, "px-4", "py-3", "border-r", "border-gray-100", "text-slate-600", "text-xs"], [1, "px-4", "py-3", "text-center", "font-bold", "text-slate-700", "text-xs"], [1, "px-4", "py-3", "border-r", "border-gray-100"], ["type", "number", "placeholder", "ej. 5", 1, "w-full", "border", "border-slate-300", "bg-white", "text-slate-700", "p-2", "rounded", "text-sm", "outline-none", "focus:border-[#1e3a8a]", "transition-colors", 3, "ngModelChange", "ngModel"], [1, "px-4", "py-3", "text-slate-600", "text-xs"], [3, "value"], [1, "text-[11px]", "font-bold", "text-[#1e3a8a]", "uppercase"], [1, "flex", "items-center", "gap-2", "shrink-0"], ["type", "button", 1, "relative", "inline-flex", "h-6", "w-11", "items-center", "rounded-full", "transition-colors", "focus:outline-none", 3, "click"], [1, "inline-block", "h-4", "w-4", "transform", "rounded-full", "bg-white", "shadow", "transition-transform"], [1, "text-xs", "font-bold", "w-6"]], template: function PlanMuestreoPaso2_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div", 2);
      \u0275\u0275element(3, "app-page-header", 3);
      \u0275\u0275elementStart(4, "div", 4)(5, "div", 5)(6, "h3", 6);
      \u0275\u0275text(7, "Paso 2: Planificaci\xF3n del Muestreo");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(8, "section", 7)(9, "div", 8)(10, "h4", 9);
      \u0275\u0275text(11, "Tipo de Muestreo");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(12, "div", 10)(13, "div", 11)(14, "label", 12);
      \u0275\u0275text(15, "Seleccione el tipo");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(16, "select", 13);
      \u0275\u0275twoWayListener("ngModelChange", function PlanMuestreoPaso2_Template_select_ngModelChange_16_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.tipoMuestreo, $event) || (ctx.tipoMuestreo = $event);
        return $event;
      });
      \u0275\u0275elementStart(17, "option", 14);
      \u0275\u0275text(18, "Selecciona el tipo de muestreo");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(19, "option", 15);
      \u0275\u0275text(20, "Simple");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(21, "option", 16);
      \u0275\u0275text(22, "Compuesto");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(23, "option", 17);
      \u0275\u0275text(24, "Integrado");
      \u0275\u0275elementEnd()()()()();
      \u0275\u0275elementStart(25, "section", 7)(26, "div", 8)(27, "h4", 9);
      \u0275\u0275text(28, "Controles de Calidad");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(29, "div", 18)(30, "table", 19)(31, "thead")(32, "tr", 20)(33, "th", 21);
      \u0275\u0275text(34, "Tipo de Controles");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(35, "th", 21);
      \u0275\u0275text(36, "An\xE1lisis");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(37, "th", 22);
      \u0275\u0275text(38, "Muestras Faltantes");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(39, "tbody");
      \u0275\u0275repeaterCreate(40, PlanMuestreoPaso2_For_41_Template, 2, 0, null, null, \u0275\u0275repeaterTrackByIndex);
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(42, "section", 7)(43, "div", 8)(44, "h4", 9);
      \u0275\u0275text(45, "Preservaci\xF3n de las Muestras");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(46, "div", 18)(47, "table", 19)(48, "thead")(49, "tr", 20)(50, "th", 21);
      \u0275\u0275text(51, "Preservaci\xF3n");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(52, "th", 21);
      \u0275\u0275text(53, "Volumen (L)");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(54, "th", 23);
      \u0275\u0275text(55, "Tipo de Recipiente");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(56, "tbody");
      \u0275\u0275repeaterCreate(57, PlanMuestreoPaso2_For_58_Template, 7, 3, "tr", 24, \u0275\u0275repeaterTrackByIndex);
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(59, "section", 7)(60, "div", 8)(61, "h4", 9);
      \u0275\u0275text(62, "Equipos");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(63, "div", 25)(64, "div")(65, "p", 26);
      \u0275\u0275text(66, "Medici\xF3n In Situ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(67, "div", 27);
      \u0275\u0275repeaterCreate(68, PlanMuestreoPaso2_For_69_Template, 8, 2, "div", 28, \u0275\u0275repeaterTrackByIndex);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(70, "div")(71, "p", 26);
      \u0275\u0275text(72, "Preservaci\xF3n");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(73, "div", 27);
      \u0275\u0275repeaterCreate(74, PlanMuestreoPaso2_For_75_Template, 8, 2, "div", 28, \u0275\u0275repeaterTrackByIndex);
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(76, "section", 7)(77, "div", 8)(78, "h4", 9);
      \u0275\u0275text(79, "Materiales para Muestreo");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(80, "div", 29);
      \u0275\u0275repeaterCreate(81, PlanMuestreoPaso2_For_82_Template, 8, 14, "div", 30, \u0275\u0275repeaterTrackByIndex);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(83, "section", 7)(84, "div", 8)(85, "h4", 9);
      \u0275\u0275text(86, "Condiciones Momento de Muestreo");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(87, "div", 31)(88, "div", 28)(89, "label", 12);
      \u0275\u0275text(90, "No. Personas en Campo");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(91, "div", 32)(92, "button", 33);
      \u0275\u0275listener("click", function PlanMuestreoPaso2_Template_button_click_92_listener() {
        return ctx.personasEnCampo = ctx.personasEnCampo > 0 ? ctx.personasEnCampo - 1 : 0;
      });
      \u0275\u0275text(93, "\u2212");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(94, "span", 34);
      \u0275\u0275text(95);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(96, "button", 33);
      \u0275\u0275listener("click", function PlanMuestreoPaso2_Template_button_click_96_listener() {
        return ctx.personasEnCampo = ctx.personasEnCampo + 1;
      });
      \u0275\u0275text(97, "+");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(98, "span", 35);
      \u0275\u0275text(99, "Personas");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(100, "div", 28)(101, "label", 12);
      \u0275\u0275text(102, "Tiempo de Permanencia");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(103, "div", 32)(104, "button", 33);
      \u0275\u0275listener("click", function PlanMuestreoPaso2_Template_button_click_104_listener() {
        return ctx.tiempoPermanencia = ctx.tiempoPermanencia > 0 ? ctx.tiempoPermanencia - 1 : 0;
      });
      \u0275\u0275text(105, "\u2212");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(106, "span", 34);
      \u0275\u0275text(107);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(108, "button", 33);
      \u0275\u0275listener("click", function PlanMuestreoPaso2_Template_button_click_108_listener() {
        return ctx.tiempoPermanencia = ctx.tiempoPermanencia + 1;
      });
      \u0275\u0275text(109, "+");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(110, "span", 35);
      \u0275\u0275text(111, "Horas");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(112, "div", 28)(113, "label", 12);
      \u0275\u0275text(114, "Duraci\xF3n del Muestreo");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(115, "div", 32)(116, "button", 33);
      \u0275\u0275listener("click", function PlanMuestreoPaso2_Template_button_click_116_listener() {
        return ctx.duracionMuestreo = ctx.duracionMuestreo > 0 ? ctx.duracionMuestreo - 1 : 0;
      });
      \u0275\u0275text(117, "\u2212");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(118, "span", 34);
      \u0275\u0275text(119);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(120, "button", 33);
      \u0275\u0275listener("click", function PlanMuestreoPaso2_Template_button_click_120_listener() {
        return ctx.duracionMuestreo = ctx.duracionMuestreo + 1;
      });
      \u0275\u0275text(121, "+");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(122, "span", 35);
      \u0275\u0275text(123, "Horas");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(124, "div", 36)(125, "label", 12);
      \u0275\u0275text(126, "Movilizaci\xF3n");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(127, "textarea", 37);
      \u0275\u0275twoWayListener("ngModelChange", function PlanMuestreoPaso2_Template_textarea_ngModelChange_127_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.movilizacion, $event) || (ctx.movilizacion = $event);
        return $event;
      });
      \u0275\u0275text(128, "              ");
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(129, "div", 38)(130, "button", 39);
      \u0275\u0275listener("click", function PlanMuestreoPaso2_Template_button_click_130_listener() {
        return ctx.regresar();
      });
      \u0275\u0275text(131, " REGRESAR ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(132, "button", 40);
      \u0275\u0275listener("click", function PlanMuestreoPaso2_Template_button_click_132_listener() {
        return ctx.siguiente();
      });
      \u0275\u0275text(133, " SIGUIENTE ");
      \u0275\u0275elementEnd()()()()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(16);
      \u0275\u0275twoWayProperty("ngModel", ctx.tipoMuestreo);
      \u0275\u0275advance(24);
      \u0275\u0275repeater(ctx.controlesCalidad);
      \u0275\u0275advance(17);
      \u0275\u0275repeater(ctx.preservaciones);
      \u0275\u0275advance(11);
      \u0275\u0275repeater(ctx.equiposMedicion);
      \u0275\u0275advance(6);
      \u0275\u0275repeater(ctx.equiposPreservacion);
      \u0275\u0275advance(7);
      \u0275\u0275repeater(ctx.materiales);
      \u0275\u0275advance(14);
      \u0275\u0275textInterpolate(ctx.personasEnCampo);
      \u0275\u0275advance(12);
      \u0275\u0275textInterpolate(ctx.tiempoPermanencia);
      \u0275\u0275advance(12);
      \u0275\u0275textInterpolate(ctx.duracionMuestreo);
      \u0275\u0275advance(8);
      \u0275\u0275twoWayProperty("ngModel", ctx.movilizacion);
      \u0275\u0275property("rows", 3);
    }
  }, dependencies: [CommonModule, FormsModule, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, NumberValueAccessor, SelectControlValueAccessor, NgControlStatus, NgModel, PageHeader], styles: ["\n\n.animate-in[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_animateIn 0.3s ease-out forwards;\n}\n.fade-in[_ngcontent-%COMP%] {\n  opacity: 0;\n}\n.slide-in-from-bottom-4[_ngcontent-%COMP%] {\n  transform: translateY(1rem);\n}\n.slide-in-from-right-4[_ngcontent-%COMP%] {\n  transform: translateX(1rem);\n}\n@keyframes _ngcontent-%COMP%_animateIn {\n  to {\n    opacity: 1;\n    transform: translate(0);\n  }\n}\n.custom-scroll[_ngcontent-%COMP%]::-webkit-scrollbar {\n  width: 6px;\n  height: 6px;\n}\n.custom-scroll[_ngcontent-%COMP%]::-webkit-scrollbar-track {\n  background: #f1f5f9;\n  border-radius: 4px;\n}\n.custom-scroll[_ngcontent-%COMP%]::-webkit-scrollbar-thumb {\n  background: #cbd5e1;\n  border-radius: 4px;\n}\n.custom-scroll[_ngcontent-%COMP%]::-webkit-scrollbar-thumb:hover {\n  background: #94a3b8;\n}\ninput[_ngcontent-%COMP%]:focus, \nselect[_ngcontent-%COMP%]:focus, \ntextarea[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: #1e3a8a;\n  box-shadow: 0 0 0 1px #1e3a8a;\n}\n/*# sourceMappingURL=plan-muestreo.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PlanMuestreoPaso2, [{
    type: Component,
    args: [{ selector: "app-plan-muestreo-paso2", standalone: true, imports: [CommonModule, FormsModule, PageHeader], template: `<div class="p-6 bg-slate-50 min-h-screen text-slate-700 font-sans pb-24">
  <div class="max-w-7xl mx-auto">
    <div class="animate-in fade-in">

      <app-page-header
        breadcrumbSection="Operaciones de campo"
        title="Plan de muestreo"
        subtitle="Aqu\xED podr\xE1s visualizar los detalles del plan de muestreo"
        codigoFormulario="F-PEE-42-01"
        edicion="11"
      />

      <!-- Step-card (Nivel 1A) -->
      <div class="bg-white rounded-lg shadow-sm border border-slate-200 p-8 space-y-8 animate-in fade-in slide-in-from-right-4">

        <!-- Step-header (Nivel 2A) -->
        <div class="mb-6 border-b border-slate-300 pb-4">
          <h3 class="text-lg font-bold text-[#1e3a8a] mb-1">Paso 2: Planificaci\xF3n del Muestreo</h3>
        </div>

        <!-- Section: Tipo de Muestreo (Nivel 2B) -->
        <section class="border border-slate-200 rounded-sm overflow-hidden shadow-sm">
          <div class="bg-[#f8fafc] border-b border-slate-200 px-5 py-3">
            <h4 class="font-bold text-[#1e3a8a] text-sm uppercase">Tipo de Muestreo</h4>
          </div>
          <div class="p-5">
            <div class="max-w-xs">
              <label class="block text-[11px] font-bold text-[#1e3a8a] uppercase mb-1">Seleccione el tipo</label>
              <select [(ngModel)]="tipoMuestreo"
                class="w-full border border-slate-300 bg-white text-slate-700 p-2.5 rounded text-sm outline-none focus:border-[#1e3a8a] transition-colors">
                <option value="">Selecciona el tipo de muestreo</option>
                <option value="simple">Simple</option>
                <option value="compuesto">Compuesto</option>
                <option value="integrado">Integrado</option>
              </select>
            </div>
          </div>
        </section>

        <!-- Section: Controles de Calidad (Nivel 2B + 2C) -->
        <section class="border border-slate-200 rounded-sm overflow-hidden shadow-sm">
          <div class="bg-[#f8fafc] border-b border-slate-200 px-5 py-3">
            <h4 class="font-bold text-[#1e3a8a] text-sm uppercase">Controles de Calidad</h4>
          </div>
          <div class="overflow-x-auto custom-scroll">
            <table class="w-full text-sm border-collapse">
              <thead>
                <tr class="bg-slate-50 text-[10px] font-bold text-slate-500 uppercase border-b border-gray-200 tracking-wider">
                  <th class="px-4 py-2.5 border-r border-gray-100 text-left">Tipo de Controles</th>
                  <th class="px-4 py-2.5 border-r border-gray-100 text-left">An\xE1lisis</th>
                  <th class="px-4 py-2.5 text-center">Muestras Faltantes</th>
                </tr>
              </thead>
              <tbody>
                @for (control of controlesCalidad; track $index) {
                  @for (fila of control.filas; track $index; let fi = $index) {
                    <tr class="border-b border-gray-100 hover:bg-slate-50 transition-colors">
                      @if (fi === 0) {
                        <td [attr.rowspan]="control.filas.length"
                          class="px-4 py-3 border-r border-gray-100 font-bold text-[#1e3a8a] text-xs uppercase align-middle">
                          {{ control.tipo }}
                        </td>
                      }
                      <td class="px-4 py-3 border-r border-gray-100 text-slate-600 text-xs">{{ fila.analisis }}</td>
                      <td class="px-4 py-3 text-center font-bold text-slate-700 text-xs">{{ fila.muestrasFaltantes }}</td>
                    </tr>
                  }
                }
              </tbody>
            </table>
          </div>
        </section>

        <!-- Section: Preservaci\xF3n de las Muestras (Nivel 2B + 2C) -->
        <section class="border border-slate-200 rounded-sm overflow-hidden shadow-sm">
          <div class="bg-[#f8fafc] border-b border-slate-200 px-5 py-3">
            <h4 class="font-bold text-[#1e3a8a] text-sm uppercase">Preservaci\xF3n de las Muestras</h4>
          </div>
          <div class="overflow-x-auto custom-scroll">
            <table class="w-full text-sm border-collapse">
              <thead>
                <tr class="bg-slate-50 text-[10px] font-bold text-slate-500 uppercase border-b border-gray-200 tracking-wider">
                  <th class="px-4 py-2.5 border-r border-gray-100 text-left">Preservaci\xF3n</th>
                  <th class="px-4 py-2.5 border-r border-gray-100 text-left">Volumen (L)</th>
                  <th class="px-4 py-2.5 text-left">Tipo de Recipiente</th>
                </tr>
              </thead>
              <tbody>
                @for (p of preservaciones; track $index) {
                  <tr class="border-b border-gray-100 hover:bg-slate-50 transition-colors">
                    <td class="px-4 py-3 border-r border-gray-100 text-slate-600 text-xs">{{ p.preservacion }}</td>
                    <td class="px-4 py-3 border-r border-gray-100">
                      <input type="number" [(ngModel)]="p.volumen" placeholder="ej. 5"
                        class="w-full border border-slate-300 bg-white text-slate-700 p-2 rounded text-sm outline-none focus:border-[#1e3a8a] transition-colors" />
                    </td>
                    <td class="px-4 py-3 text-slate-600 text-xs">{{ p.tipoRecipiente }}</td>
                  </tr>
                }
              </tbody>
            </table>
          </div>
        </section>

        <!-- Section: Equipos (Nivel 2B) -->
        <section class="border border-slate-200 rounded-sm overflow-hidden shadow-sm">
          <div class="bg-[#f8fafc] border-b border-slate-200 px-5 py-3">
            <h4 class="font-bold text-[#1e3a8a] text-sm uppercase">Equipos</h4>
          </div>
          <div class="p-5 space-y-6">

            <div>
              <p class="text-[11px] font-bold text-[#1e3a8a] uppercase mb-3">Medici\xF3n In Situ</p>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                @for (eq of equiposMedicion; track $index) {
                  <div class="flex flex-col">
                    <label class="block text-[11px] font-bold text-[#1e3a8a] uppercase mb-1">{{ eq.nombre }}</label>
                    <select [(ngModel)]="eq.seleccion"
                      class="w-full border border-slate-300 bg-white text-slate-700 p-2.5 rounded text-sm outline-none focus:border-[#1e3a8a] transition-colors">
                      <option value="">Seleccione...</option>
                      @for (opt of eq.opciones; track opt) {
                        <option [value]="opt">{{ opt }}</option>
                      }
                    </select>
                  </div>
                }
              </div>
            </div>

            <div>
              <p class="text-[11px] font-bold text-[#1e3a8a] uppercase mb-3">Preservaci\xF3n</p>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                @for (eq of equiposPreservacion; track $index) {
                  <div class="flex flex-col">
                    <label class="block text-[11px] font-bold text-[#1e3a8a] uppercase mb-1">{{ eq.nombre }}</label>
                    <select [(ngModel)]="eq.seleccion"
                      class="w-full border border-slate-300 bg-white text-slate-700 p-2.5 rounded text-sm outline-none focus:border-[#1e3a8a] transition-colors">
                      <option value="">Seleccione...</option>
                      @for (opt of eq.opciones; track opt) {
                        <option [value]="opt">{{ opt }}</option>
                      }
                    </select>
                  </div>
                }
              </div>
            </div>

          </div>
        </section>

        <!-- Section: Materiales para Muestreo (Nivel 2B) -->
        <section class="border border-slate-200 rounded-sm overflow-hidden shadow-sm">
          <div class="bg-[#f8fafc] border-b border-slate-200 px-5 py-3">
            <h4 class="font-bold text-[#1e3a8a] text-sm uppercase">Materiales para Muestreo</h4>
          </div>
          <div class="divide-y divide-slate-100">
            @for (mat of materiales; track $index) {
              <div class="px-5 py-3 flex items-center justify-between gap-4 hover:bg-slate-50 transition-colors">
                <span class="text-[11px] font-bold text-[#1e3a8a] uppercase">{{ mat.nombre }}</span>
                <div class="flex items-center gap-2 shrink-0">
                  <button type="button"
                    class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none"
                    [class.bg-[#1e3a8a]]="mat.activo"
                    [class.bg-slate-300]="!mat.activo"
                    (click)="mat.activo = !mat.activo">
                    <span class="inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform"
                      [class.translate-x-6]="mat.activo"
                      [class.translate-x-1]="!mat.activo">
                    </span>
                  </button>
                  <span class="text-xs font-bold w-6"
                    [class.text-[#1e3a8a]]="mat.activo"
                    [class.text-slate-400]="!mat.activo">
                    {{ mat.activo ? 'S\xCD' : 'NO' }}
                  </span>
                </div>
              </div>
            }
          </div>
        </section>

        <!-- Section: Condiciones Momento de Muestreo (Nivel 2B) -->
        <section class="border border-slate-200 rounded-sm overflow-hidden shadow-sm">
          <div class="bg-[#f8fafc] border-b border-slate-200 px-5 py-3">
            <h4 class="font-bold text-[#1e3a8a] text-sm uppercase">Condiciones Momento de Muestreo</h4>
          </div>
          <div class="p-5 grid grid-cols-1 md:grid-cols-2 gap-6">

            <div class="flex flex-col">
              <label class="block text-[11px] font-bold text-[#1e3a8a] uppercase mb-1">No. Personas en Campo</label>
              <div class="flex items-center gap-3">
                <button type="button"
                  (click)="personasEnCampo = personasEnCampo > 0 ? personasEnCampo - 1 : 0"
                  class="w-8 h-8 rounded border border-slate-300 flex items-center justify-center font-bold text-slate-600 hover:bg-slate-100 transition-colors">\u2212</button>
                <span class="text-sm font-bold text-[#1e3a8a] w-8 text-center">{{ personasEnCampo }}</span>
                <button type="button"
                  (click)="personasEnCampo = personasEnCampo + 1"
                  class="w-8 h-8 rounded border border-slate-300 flex items-center justify-center font-bold text-slate-600 hover:bg-slate-100 transition-colors">+</button>
                <span class="text-xs text-slate-500">Personas</span>
              </div>
            </div>

            <div class="flex flex-col">
              <label class="block text-[11px] font-bold text-[#1e3a8a] uppercase mb-1">Tiempo de Permanencia</label>
              <div class="flex items-center gap-3">
                <button type="button"
                  (click)="tiempoPermanencia = tiempoPermanencia > 0 ? tiempoPermanencia - 1 : 0"
                  class="w-8 h-8 rounded border border-slate-300 flex items-center justify-center font-bold text-slate-600 hover:bg-slate-100 transition-colors">\u2212</button>
                <span class="text-sm font-bold text-[#1e3a8a] w-8 text-center">{{ tiempoPermanencia }}</span>
                <button type="button"
                  (click)="tiempoPermanencia = tiempoPermanencia + 1"
                  class="w-8 h-8 rounded border border-slate-300 flex items-center justify-center font-bold text-slate-600 hover:bg-slate-100 transition-colors">+</button>
                <span class="text-xs text-slate-500">Horas</span>
              </div>
            </div>

            <div class="flex flex-col">
              <label class="block text-[11px] font-bold text-[#1e3a8a] uppercase mb-1">Duraci\xF3n del Muestreo</label>
              <div class="flex items-center gap-3">
                <button type="button"
                  (click)="duracionMuestreo = duracionMuestreo > 0 ? duracionMuestreo - 1 : 0"
                  class="w-8 h-8 rounded border border-slate-300 flex items-center justify-center font-bold text-slate-600 hover:bg-slate-100 transition-colors">\u2212</button>
                <span class="text-sm font-bold text-[#1e3a8a] w-8 text-center">{{ duracionMuestreo }}</span>
                <button type="button"
                  (click)="duracionMuestreo = duracionMuestreo + 1"
                  class="w-8 h-8 rounded border border-slate-300 flex items-center justify-center font-bold text-slate-600 hover:bg-slate-100 transition-colors">+</button>
                <span class="text-xs text-slate-500">Horas</span>
              </div>
            </div>

            <div class="flex flex-col md:col-span-2">
              <label class="block text-[11px] font-bold text-[#1e3a8a] uppercase mb-1">Movilizaci\xF3n</label>
              <textarea [(ngModel)]="movilizacion" [rows]="3"
                class="w-full border border-slate-300 rounded p-3 text-sm resize-none outline-none focus:border-[#1e3a8a] bg-white text-slate-700">
              </textarea>
            </div>

          </div>
        </section>

        <!-- Nav buttons -->
        <div class="flex justify-between pt-4 border-t border-slate-300">
          <button type="button" (click)="regresar()"
            class="bg-white border border-slate-300 text-slate-700 px-8 py-2.5 rounded text-sm font-bold shadow-sm hover:bg-slate-50 transition-all">
            REGRESAR
          </button>
          <button type="button" (click)="siguiente()"
            class="bg-[#1e3a8a] text-white px-8 py-2.5 rounded text-sm font-bold shadow-md hover:bg-[#2541b2] transition-all">
            SIGUIENTE
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
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(PlanMuestreoPaso2, { className: "PlanMuestreoPaso2", filePath: "src/app/features/plan-muestreo/paso2/plan-muestreo-paso2.ts", lineNumber: 36 });
})();
export {
  PlanMuestreoPaso2
};
//# sourceMappingURL=chunk-DSAPIV6Q.js.map
