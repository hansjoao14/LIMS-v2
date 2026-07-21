import {
  SolicitudDetalleService
} from "./chunk-AA7HODSB.js";
import {
  Router
} from "./chunk-UAQD7B5Z.js";
import {
  CatalogoService
} from "./chunk-OZ4IZHSX.js";
import {
  DefaultValueAccessor,
  FormsModule,
  NgControlStatus,
  NgModel,
  NgSelectOption,
  SelectControlValueAccessor,
  ɵNgSelectMultipleOption
} from "./chunk-NAO2WYRM.js";
import "./chunk-GSQNXGZJ.js";
import {
  ReportSolicitudService
} from "./chunk-62VLVXUV.js";
import {
  require_sweetalert2_all
} from "./chunk-ZCY535AF.js";
import {
  ReportFormularioService
} from "./chunk-AWRFUGXV.js";
import "./chunk-XIRXEHG5.js";
import {
  PageHeader
} from "./chunk-ULA2XVM4.js";
import "./chunk-DPKW7NRU.js";
import {
  CommonModule
} from "./chunk-CIDLATYD.js";
import {
  Component,
  Subject,
  __toESM,
  setClassMetadata,
  takeUntil,
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
  ɵɵnamespaceSVG,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIndex,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate3
} from "./chunk-WHOAKDIK.js";

// src/app/features/plan-muestreo/plan-muestreo.ts
var import_sweetalert2 = __toESM(require_sweetalert2_all());
var _forTrack0 = ($index, $item) => $item.id;
var _forTrack1 = ($index, $item) => $item.id_solicitud;
function PlanMuestreo_Conditional_23_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 16)(1, "span", 40);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "button", 41);
    \u0275\u0275listener("click", function PlanMuestreo_Conditional_23_Template_button_click_3_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.limpiarSolicitud());
    });
    \u0275\u0275text(4, "\u2715");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.solicitudSeleccionada.num_secuencial ?? ctx_r1.solicitudSeleccionada.id_solicitud);
  }
}
function PlanMuestreo_Conditional_24_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 42);
    \u0275\u0275listener("click", function PlanMuestreo_Conditional_24_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.abrirPanel());
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 43);
    \u0275\u0275element(2, "path", 44);
    \u0275\u0275elementEnd();
    \u0275\u0275text(3, " Buscar solicitud finalizada... ");
    \u0275\u0275elementEnd();
  }
}
function PlanMuestreo_Conditional_25_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 48);
    \u0275\u0275text(1, "Buscando...");
    \u0275\u0275elementEnd();
  }
}
function PlanMuestreo_Conditional_25_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 48);
    \u0275\u0275text(1, "No se encontraron solicitudes finalizadas.");
    \u0275\u0275elementEnd();
  }
}
function PlanMuestreo_Conditional_25_Conditional_7_For_2_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 56);
    \u0275\u0275text(1, "Urgente");
    \u0275\u0275elementEnd();
  }
}
function PlanMuestreo_Conditional_25_Conditional_7_For_2_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 57);
    \u0275\u0275text(1, "Normal");
    \u0275\u0275elementEnd();
  }
}
function PlanMuestreo_Conditional_25_Conditional_7_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "li", 52);
    \u0275\u0275listener("click", function PlanMuestreo_Conditional_25_Conditional_7_For_2_Template_li_click_0_listener() {
      const sol_r6 = \u0275\u0275restoreView(_r5).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.seleccionarSolicitud(sol_r6));
    });
    \u0275\u0275elementStart(1, "div", 53)(2, "span", 54);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span", 55);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(6, PlanMuestreo_Conditional_25_Conditional_7_For_2_Conditional_6_Template, 2, 0, "span", 56)(7, PlanMuestreo_Conditional_25_Conditional_7_For_2_Conditional_7_Template, 2, 0, "span", 57);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const sol_r6 = ctx.$implicit;
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(sol_r6.num_secuencial ?? "\u2014");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(sol_r6.nombres_completos);
    \u0275\u0275advance();
    \u0275\u0275conditional(sol_r6.prioridad_id === 386 ? 6 : sol_r6.prioridad_id === 385 ? 7 : -1);
  }
}
function PlanMuestreo_Conditional_25_Conditional_7_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 51)(1, "span", 58);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 59)(4, "button", 60);
    \u0275\u0275listener("click", function PlanMuestreo_Conditional_25_Conditional_7_Conditional_3_Template_button_click_4_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.cargarPagina(ctx_r1.currentPage - 1));
    });
    \u0275\u0275text(5, "\u2039");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "button", 60);
    \u0275\u0275listener("click", function PlanMuestreo_Conditional_25_Conditional_7_Conditional_3_Template_button_click_6_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.cargarPagina(ctx_r1.currentPage + 1));
    });
    \u0275\u0275text(7, "\u203A");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate3("P\xE1gina ", ctx_r1.meta.page, " de ", ctx_r1.meta.totalPages, " \xB7 ", ctx_r1.meta.total, " resultados");
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", !ctx_r1.meta.hasPrevPage);
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", !ctx_r1.meta.hasNextPage);
  }
}
function PlanMuestreo_Conditional_25_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "ul", 49);
    \u0275\u0275repeaterCreate(1, PlanMuestreo_Conditional_25_Conditional_7_For_2_Template, 8, 3, "li", 50, _forTrack1);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(3, PlanMuestreo_Conditional_25_Conditional_7_Conditional_3_Template, 8, 5, "div", 51);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.solicitudesFinalizadas);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.meta && ctx_r1.meta.totalPages > 1 ? 3 : -1);
  }
}
function PlanMuestreo_Conditional_25_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 18)(1, "div", 45)(2, "input", 46);
    \u0275\u0275listener("ngModelChange", function PlanMuestreo_Conditional_25_Template_input_ngModelChange_2_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onBusquedaChange($event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "button", 47);
    \u0275\u0275listener("click", function PlanMuestreo_Conditional_25_Template_button_click_3_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.cerrarPanel());
    });
    \u0275\u0275text(4, "\u2715");
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(5, PlanMuestreo_Conditional_25_Conditional_5_Template, 2, 0, "p", 48)(6, PlanMuestreo_Conditional_25_Conditional_6_Template, 2, 0, "p", 48)(7, PlanMuestreo_Conditional_25_Conditional_7_Template, 4, 1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275property("ngModel", ctx_r1.busqueda);
    \u0275\u0275advance(3);
    \u0275\u0275conditional(ctx_r1.loadingBusqueda ? 5 : ctx_r1.solicitudesFinalizadas.length === 0 ? 6 : 7);
  }
}
function PlanMuestreo_Conditional_61_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 19)(1, "strong");
    \u0275\u0275text(2, "Lat:");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3);
    \u0275\u0275elementStart(4, "strong");
    \u0275\u0275text(5, "Lon:");
    \u0275\u0275elementEnd();
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r1.detalleLatitud, " \xA0 ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r1.detalleLongitud);
  }
}
function PlanMuestreo_Conditional_62_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 25);
    \u0275\u0275text(1, "\u2014");
    \u0275\u0275elementEnd();
  }
}
function PlanMuestreo_For_131_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 32);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const tipo_r8 = ctx.$implicit;
    \u0275\u0275property("ngValue", tipo_r8.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(tipo_r8.nombre);
  }
}
function PlanMuestreo_Conditional_132_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 33)(1, "div")(2, "p", 61);
    \u0275\u0275text(3, "Tipo de Matriz");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "h2", 62);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.tipoAguaNombre);
  }
}
function PlanMuestreo_Conditional_133_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 64);
    \u0275\u0275element(1, "span", 70);
    \u0275\u0275elementEnd();
  }
}
function PlanMuestreo_Conditional_133_Conditional_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td", 71);
    \u0275\u0275text(2, "No hay ensayos para el tipo de matriz seleccionado.");
    \u0275\u0275elementEnd()();
  }
}
function PlanMuestreo_Conditional_133_For_23_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr", 69)(1, "td", 72)(2, "span", 73);
    \u0275\u0275text(3, "SI");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "td", 74);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "td", 74);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "td", 75);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "td", 75);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "td", 76);
    \u0275\u0275text(13, "\u2014");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const e_r9 = ctx.$implicit;
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(e_r9.analisis);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(e_r9.identificacion);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(e_r9.metodoInterno);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(e_r9.metodoReferencia);
  }
}
function PlanMuestreo_Conditional_133_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 63);
    \u0275\u0275conditionalCreate(1, PlanMuestreo_Conditional_133_Conditional_1_Template, 2, 0, "div", 64);
    \u0275\u0275elementStart(2, "div", 36)(3, "h3", 6);
    \u0275\u0275text(4, "An\xE1lisis Requerido In Situ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "table", 65)(6, "thead")(7, "tr", 66)(8, "th", 67);
    \u0275\u0275text(9, "An\xE1lisis Requerido");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "th", 67);
    \u0275\u0275text(11, "Ensayo");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "th", 67);
    \u0275\u0275text(13, "Identificaci\xF3n");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "th", 67);
    \u0275\u0275text(15, "M\xE9todo Interno");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "th", 67);
    \u0275\u0275text(17, "M\xE9todo Referencia");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "th", 68);
    \u0275\u0275text(19, "Unidad");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(20, "tbody");
    \u0275\u0275conditionalCreate(21, PlanMuestreo_Conditional_133_Conditional_21_Template, 3, 0, "tr");
    \u0275\u0275repeaterCreate(22, PlanMuestreo_Conditional_133_For_23_Template, 14, 4, "tr", 69, \u0275\u0275repeaterTrackByIndex);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275classProp("pointer-events-none", ctx_r1.loadingDetalle);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.loadingDetalle ? 1 : -1);
    \u0275\u0275advance(20);
    \u0275\u0275conditional(ctx_r1.detalleEnsayos.length === 0 ? 21 : -1);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.detalleEnsayos);
  }
}
function PlanMuestreo_For_140_For_20_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tr", 69)(1, "td", 72)(2, "div", 79)(3, "button", 80);
    \u0275\u0275listener("click", function PlanMuestreo_For_140_For_20_Template_button_click_3_listener() {
      const e_r11 = \u0275\u0275restoreView(_r10).$implicit;
      return \u0275\u0275resetView(e_r11.activo = !e_r11.activo);
    });
    \u0275\u0275element(4, "span", 81);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "span", 82);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(7, "td", 74);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "td", 74);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "td", 75);
    \u0275\u0275text(12);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "td", 75);
    \u0275\u0275text(14);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "td", 83);
    \u0275\u0275text(16);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const e_r11 = ctx.$implicit;
    \u0275\u0275advance(3);
    \u0275\u0275classProp("bg-[#1e3a8a]", e_r11.activo)("bg-slate-300", !e_r11.activo);
    \u0275\u0275advance();
    \u0275\u0275classProp("translate-x-4", e_r11.activo)("translate-x-0", !e_r11.activo);
    \u0275\u0275advance();
    \u0275\u0275classProp("text-[#1e3a8a]", e_r11.activo)("text-slate-400", !e_r11.activo);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", e_r11.activo ? "S\xED" : "No", " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(e_r11.ensayo);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(e_r11.identificacion);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(e_r11.metodoInterno);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(e_r11.metodoReferencia);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(e_r11.unidad);
  }
}
function PlanMuestreo_For_140_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "h4", 77);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "div", 78)(3, "table", 65)(4, "thead")(5, "tr", 66)(6, "th", 67);
    \u0275\u0275text(7, "An\xE1lisis Requerido");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "th", 67);
    \u0275\u0275text(9, "Ensayo");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "th", 67);
    \u0275\u0275text(11, "Identificaci\xF3n");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "th", 67);
    \u0275\u0275text(13, "M\xE9todo Interno");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "th", 67);
    \u0275\u0275text(15, "M\xE9todo Referencia");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "th", 68);
    \u0275\u0275text(17, "Unidad");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(18, "tbody");
    \u0275\u0275repeaterCreate(19, PlanMuestreo_For_140_For_20_Template, 17, 18, "tr", 69, \u0275\u0275repeaterTrackByIndex);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const grupo_r12 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(grupo_r12.preservante);
    \u0275\u0275advance(18);
    \u0275\u0275repeater(grupo_r12.ensayos);
  }
}
var PlanMuestreo = class _PlanMuestreo {
  reportSolicitudService;
  reportFormularioService;
  solicitudDetalleService;
  catalogoService;
  router;
  formulario = null;
  fechaEmision = null;
  // ── Tipo de agua (catálogo 18: Aguas Superficiales / Aguas Residuales) ───
  CATALOGO_AGUA = 18;
  PERMITIDOS_AGUA = [92, 93];
  tipoAguaOpciones = [];
  loadingTipoAgua = true;
  tipoAguaId = null;
  // ── Búsqueda de solicitudes finalizadas ──────────────────────────────────
  panelAbierto = false;
  loadingBusqueda = false;
  loadingDetalle = false;
  todasSolicitudes = [];
  solicitudesFinalizadas = [];
  meta = null;
  currentPage = 1;
  PAGE_SIZE = 8;
  busqueda = "";
  solicitudSeleccionada = null;
  // ── Detalle de la solicitud ───────────────────────────────────────────────
  detalleFechaEmision = "";
  detalleFechaMaxima = "";
  detalleCliente = "";
  detalleLatitud = "";
  detalleLongitud = "";
  detalleDireccion = "";
  detalleEnsayos = [];
  ensayosLaboratorio = [
    {
      preservante: "H2SO4",
      ensayos: [
        { activo: false, ensayo: "DEMANDA QU\xCDMICA DE OX\xCDGENO", identificacion: "DQO", metodoInterno: "PEE/IAM-Q/03", metodoReferencia: "APHA 5220D", unidad: "mg/L" },
        { activo: false, ensayo: "ACEITES Y GRASAS", identificacion: "AyG", metodoInterno: "PEE/IAM-Q/05", metodoReferencia: "EPA 1664", unidad: "mg/L" }
      ]
    },
    {
      preservante: "TEMPERATURA",
      ensayos: [
        { activo: false, ensayo: "DEMANDA BIOQU\xCDMICA DE OX\xCDGENO", identificacion: "DBO5", metodoInterno: "PEE/IAM-Q/27", metodoReferencia: "APHA 5210B", unidad: "mg/L" },
        { activo: false, ensayo: "S\xD3LIDOS SUSPENDIDOS TOTALES", identificacion: "SST", metodoInterno: "PEE/IAM-Q/02", metodoReferencia: "APHA 2540D", unidad: "mg/L" },
        { activo: false, ensayo: "TURBIDEZ", identificacion: "-", metodoInterno: "PEE/IAM-Q/31", metodoReferencia: "SM 2130 B", unidad: "NTU" }
      ]
    }
  ];
  destroy$ = new Subject();
  constructor(reportSolicitudService, reportFormularioService, solicitudDetalleService, catalogoService, router) {
    this.reportSolicitudService = reportSolicitudService;
    this.reportFormularioService = reportFormularioService;
    this.solicitudDetalleService = solicitudDetalleService;
    this.catalogoService = catalogoService;
    this.router = router;
  }
  ngOnInit() {
    this.reportFormularioService.getFormularioByCTId(2019).pipe(takeUntil(this.destroy$)).subscribe({
      next: (formulario) => {
        this.formulario = formulario;
        if (formulario?.fecha_emision) {
          this.fechaEmision = new Date(Number(formulario.fecha_emision));
        }
      }
    });
    this.catalogoService.getItemsByCatalogoId(this.CATALOGO_AGUA).pipe(takeUntil(this.destroy$)).subscribe({
      next: (res) => {
        this.tipoAguaOpciones = res.data.filter((t) => this.PERMITIDOS_AGUA.includes(t.id));
        this.loadingTipoAgua = false;
      }
    });
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  // ── Panel de búsqueda ────────────────────────────────────────────────────
  abrirPanel() {
    this.panelAbierto = true;
    this.busqueda = "";
    this.cargarPagina(1);
  }
  cerrarPanel() {
    this.panelAbierto = false;
  }
  onBusquedaChange(valor) {
    this.busqueda = valor;
    this.aplicarFiltro();
  }
  cargarPagina(page) {
    this.loadingBusqueda = true;
    this.currentPage = page;
    this.reportSolicitudService.getSolicitudesFinalizadas(page, this.PAGE_SIZE).pipe(takeUntil(this.destroy$)).subscribe({
      next: ({ data, meta }) => {
        this.todasSolicitudes = data;
        this.meta = meta;
        this.aplicarFiltro();
        this.loadingBusqueda = false;
      },
      error: () => {
        this.loadingBusqueda = false;
        import_sweetalert2.default.fire("Error", "No se pudo cargar la lista de solicitudes", "error");
      }
    });
  }
  aplicarFiltro() {
    const q = this.busqueda.trim().toLowerCase();
    this.solicitudesFinalizadas = q ? this.todasSolicitudes.filter((s) => (s.num_secuencial ?? "").toLowerCase().includes(q)) : this.todasSolicitudes;
  }
  seleccionarSolicitud(sol) {
    this.solicitudSeleccionada = sol;
    this.panelAbierto = false;
    this.detalleEnsayos = [];
  }
  get tipoAguaNombre() {
    return this.tipoAguaOpciones.find((t) => t.id === this.tipoAguaId)?.nombre ?? "";
  }
  onTipoAguaChange() {
    if (!this.solicitudSeleccionada)
      return;
    this.cargarDetalle();
  }
  cargarDetalle() {
    this.loadingDetalle = true;
    this.solicitudDetalleService.getSolicitudDetalle(this.solicitudSeleccionada.id_solicitud).pipe(takeUntil(this.destroy$)).subscribe({
      next: (detalle) => {
        this.poblarDetalle(detalle);
        this.loadingDetalle = false;
      },
      error: () => {
        this.loadingDetalle = false;
        import_sweetalert2.default.fire("Error", "No se pudo cargar el detalle de la solicitud", "error");
      }
    });
  }
  poblarDetalle(detalle) {
    const f = detalle.formularios?.[0];
    if (!f)
      return;
    const attr = (nombre) => f.atributos?.find((a) => a.nombre_atributo_formulario === nombre)?.valor_texto ?? "";
    const fechaEmision = f.fecha_emision_solicitud ? new Date(f.fecha_emision_solicitud) : null;
    this.detalleFechaEmision = fechaEmision ? fechaEmision.toLocaleDateString("es-EC") : "";
    this.detalleFechaMaxima = fechaEmision ? new Date(new Date(fechaEmision).setDate(fechaEmision.getDate() + 10)).toLocaleDateString("es-EC") : "";
    this.detalleCliente = f.nombre_completo;
    this.detalleLatitud = attr("val_lati");
    this.detalleLongitud = attr("val_long");
    this.detalleDireccion = attr("val_dir_op");
    this.detalleEnsayos = (f.ensayos ?? []).filter((e) => this.tipoAguaId === null || e.ctambiental_id === this.tipoAguaId).map((e) => {
      const parts = (e.metodo ?? "").split(", ");
      return {
        analisis: e.analisis ?? "",
        identificacion: e.identificacion ?? "",
        metodoInterno: parts[0] ?? "",
        metodoReferencia: parts[1] ?? ""
      };
    });
  }
  limpiarSolicitud() {
    this.solicitudSeleccionada = null;
    this.tipoAguaId = null;
    this.busqueda = "";
    this.detalleFechaEmision = "";
    this.detalleFechaMaxima = "";
    this.detalleCliente = "";
    this.detalleLatitud = "";
    this.detalleLongitud = "";
    this.detalleDireccion = "";
    this.detalleEnsayos = [];
  }
  siguiente() {
    this.router.navigate(["/plan-muestreo/paso2"]);
  }
  static \u0275fac = function PlanMuestreo_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _PlanMuestreo)(\u0275\u0275directiveInject(ReportSolicitudService), \u0275\u0275directiveInject(ReportFormularioService), \u0275\u0275directiveInject(SolicitudDetalleService), \u0275\u0275directiveInject(CatalogoService), \u0275\u0275directiveInject(Router));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _PlanMuestreo, selectors: [["app-plan-muestreo"]], decls: 144, vars: 17, consts: [[1, "p-6", "bg-slate-50", "min-h-screen", "text-slate-700", "font-sans", "pb-24"], [1, "max-w-7xl", "mx-auto"], [1, "animate-in", "fade-in"], ["breadcrumbSection", "Operaciones de campo", "title", "Plan de muestreo", "subtitle", "Aqu\xED podr\xE1s visualizar los detalles del plan de muestreo", 3, "codigoFormulario", "edicion", "fechaSolicitud"], [1, "bg-white", "rounded-lg", "shadow-sm", "border", "border-slate-200", "p-8", "mb-6"], [1, "mb-4", "border-b", "border-slate-300", "pb-4"], [1, "text-xs", "font-bold", "text-[#1e3a8a]", "uppercase", "tracking-wider"], [1, "text-sm", "text-slate-600", "leading-relaxed"], [1, "grid", "grid-cols-2", "gap-6", "mb-6"], [1, "bg-white", "rounded-lg", "shadow-sm", "border", "border-slate-200", "p-8"], [1, "space-y-4"], [1, "flex", "items-start", "gap-3"], [1, "w-9", "h-9", "bg-slate-100", "rounded", "flex", "items-center", "justify-center", "text-base", "flex-shrink-0", "mt-0.5"], [1, "flex-1", "min-w-0"], [1, "block", "text-[11px]", "font-bold", "text-[#1e3a8a]", "uppercase", "mb-1"], [1, "relative"], [1, "flex", "items-center", "justify-between", "bg-blue-50", "border", "border-blue-300", "rounded", "px-3", "py-2"], ["type", "button", 1, "w-full", "flex", "items-center", "gap-2", "bg-white", "border", "border-dashed", "border-slate-300", "text-slate-500", "px-3", "py-2.5", "rounded", "text-sm", "hover:border-[#1e3a8a]", "hover:text-[#1e3a8a]", "transition-colors"], [1, "absolute", "top-full", "left-0", "right-0", "z-50", "mt-1", "bg-white", "border", "border-slate-200", "rounded-lg", "shadow-xl", "overflow-hidden"], [1, "text-sm", "text-slate-700"], [1, "flex-1"], [1, "w-full", "border", "border-slate-300", "bg-white", "text-slate-700", "p-2.5", "rounded", "text-sm", "outline-none", "focus:border-[#1e3a8a]", "transition-colors"], ["value", ""], ["value", "si"], ["value", "no"], [1, "text-sm", "text-slate-400"], [1, "text-sm", "text-slate-400", "italic"], [1, "text-[10px]", "text-slate-400", "mt-0.5"], [1, "mb-4", "max-w-xs"], [1, "text-red-500"], [1, "w-full", "border", "border-slate-300", "bg-white", "text-slate-700", "p-2.5", "rounded", "text-sm", "outline-none", "focus:border-[#1e3a8a]", "transition-opacity", "duration-300", "disabled:opacity-40", "disabled:cursor-not-allowed", 3, "ngModelChange", "disabled", "ngModel"], ["disabled", "", 3, "ngValue"], [3, "ngValue"], [1, "h-24", "bg-gradient-to-r", "from-[#1e3a8a]", "to-[#2541b2]", "rounded-lg", "flex", "items-center", "px-8"], [1, "bg-white", "rounded-lg", "shadow-sm", "border", "border-slate-200", "mb-6", "overflow-hidden", "relative", 3, "pointer-events-none"], [1, "bg-white", "rounded-lg", "shadow-sm", "border", "border-slate-200", "mb-6", "overflow-hidden"], [1, "px-6", "py-4", "border-b", "border-slate-200"], [1, "p-6"], [1, "flex", "items-center", "justify-end", "pt-4", "border-t", "border-slate-300"], ["type", "button", 1, "bg-[#1e3a8a]", "text-white", "font-bold", "text-xs", "uppercase", "px-8", "py-3", "rounded", "hover:bg-[#2541b2]", "transition-colors", 3, "click"], [1, "text-sm", "font-bold", "text-[#1e3a8a]"], ["type", "button", 1, "text-slate-400", "hover:text-red-500", "ml-2", "text-sm", "leading-none", "transition-colors", 3, "click"], ["type", "button", 1, "w-full", "flex", "items-center", "gap-2", "bg-white", "border", "border-dashed", "border-slate-300", "text-slate-500", "px-3", "py-2.5", "rounded", "text-sm", "hover:border-[#1e3a8a]", "hover:text-[#1e3a8a]", "transition-colors", 3, "click"], ["fill", "none", "viewBox", "0 0 24 24", "stroke", "currentColor", 1, "w-4", "h-4", "flex-shrink-0"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"], [1, "flex", "items-center", "gap-2", "px-3", "py-2", "border-b", "border-slate-100", "bg-slate-50"], ["type", "text", "placeholder", "Buscar por c\xF3digo...", "autofocus", "", 1, "flex-1", "border", "border-slate-300", "rounded", "px-2.5", "py-1.5", "text-xs", "outline-none", "focus:border-[#1e3a8a]", "transition-colors", 3, "ngModelChange", "ngModel"], ["type", "button", 1, "text-slate-400", "hover:text-red-500", "text-sm", "leading-none", "px-1", "transition-colors", 3, "click"], [1, "px-4", "py-4", "text-xs", "text-slate-400", "italic", "text-center"], [1, "max-h-64", "overflow-y-auto", "custom-scroll"], [1, "px-3.5", "py-2.5", "border-b", "border-slate-100", "cursor-pointer", "hover:bg-blue-50", "transition-colors", "flex", "items-center", "justify-between", "gap-2"], [1, "flex", "items-center", "justify-between", "px-3", "py-2", "border-t", "border-slate-100", "bg-slate-50"], [1, "px-3.5", "py-2.5", "border-b", "border-slate-100", "cursor-pointer", "hover:bg-blue-50", "transition-colors", "flex", "items-center", "justify-between", "gap-2", 3, "click"], [1, "flex", "flex-col", "min-w-0"], [1, "font-bold", "text-[#1e3a8a]", "text-xs", "truncate"], [1, "text-[10px]", "text-slate-400", "truncate"], [1, "shrink-0", "text-[9px]", "font-bold", "px-2", "py-0.5", "rounded", "border", "border-red-400", "text-red-700", "bg-red-50"], [1, "shrink-0", "text-[9px]", "font-bold", "px-2", "py-0.5", "rounded", "border", "border-slate-300", "text-slate-500", "bg-slate-50"], [1, "text-[10px]", "text-slate-400"], [1, "flex", "gap-1"], ["type", "button", 1, "w-6", "h-6", "flex", "items-center", "justify-center", "border", "border-slate-200", "rounded", "text-xs", "text-[#1e3a8a]", "hover:bg-blue-50", "disabled:opacity-40", "disabled:cursor-not-allowed", "transition-colors", 3, "click", "disabled"], [1, "text-blue-200", "text-[10px]", "font-bold", "uppercase", "tracking-widest", "mb-1"], [1, "text-white", "text-2xl", "font-bold"], [1, "bg-white", "rounded-lg", "shadow-sm", "border", "border-slate-200", "mb-6", "overflow-hidden", "relative"], [1, "absolute", "inset-0", "z-10", "flex", "items-center", "justify-center", "bg-white/60", "rounded"], [1, "w-full", "text-sm", "border-collapse"], [1, "bg-slate-50", "text-[10px]", "font-bold", "text-slate-500", "uppercase", "border-b", "border-slate-200", "tracking-wider"], [1, "px-4", "py-2.5", "border-r", "border-slate-100", "text-left"], [1, "px-4", "py-2.5", "text-left"], [1, "border-b", "border-slate-100", "hover:bg-slate-50", "transition-colors"], [1, "animate-spin", "h-5", "w-5", "border-2", "border-[#1e3a8a]", "border-t-transparent", "rounded-full"], ["colspan", "6", 1, "px-4", "py-8", "text-center", "text-slate-400", "italic", "text-sm"], [1, "px-4", "py-3", "border-r", "border-slate-100"], [1, "inline-block", "bg-[#1e3a8a]", "text-white", "text-[10px]", "font-bold", "px-3", "py-1", "rounded-full"], [1, "px-4", "py-3", "border-r", "border-slate-100", "text-slate-700"], [1, "px-4", "py-3", "border-r", "border-slate-100", "text-slate-700", "font-mono"], [1, "px-4", "py-3", "text-slate-400"], [1, "text-xs", "font-bold", "text-[#1e3a8a]", "uppercase", "tracking-wider", "mt-6", "mb-3", "first:mt-0"], [1, "border", "border-slate-200", "rounded", "overflow-hidden", "shadow-sm", "mb-4"], [1, "flex", "items-center", "gap-2"], ["type", "button", 1, "relative", "inline-flex", "h-5", "w-9", "items-center", "rounded-full", "transition-colors", 3, "click"], [1, "inline-block", "h-3.5", "w-3.5", "transform", "rounded-full", "bg-white", "shadow", "transition-transform"], [1, "text-xs", "font-bold"], [1, "px-4", "py-3", "text-slate-700"]], template: function PlanMuestreo_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div", 2);
      \u0275\u0275element(3, "app-page-header", 3);
      \u0275\u0275elementStart(4, "div", 4)(5, "div", 5)(6, "h3", 6);
      \u0275\u0275text(7, "Objetivo");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(8, "p", 7);
      \u0275\u0275text(9, " Realizar un monitoreo mensual (ENERO) para la caracterizaci\xF3n de la calidad de los r\xEDos que conforman la red h\xEDdrica (Red metropolitana de monitoreo recurso h\xEDdrico -DMQ) ");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(10, "div", 8)(11, "div", 9)(12, "div", 5)(13, "h3", 6);
      \u0275\u0275text(14, "Informaci\xF3n de Solicitud");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(15, "div", 10)(16, "div", 11)(17, "div", 12);
      \u0275\u0275text(18, "\u{1F4BC}");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(19, "div", 13)(20, "label", 14);
      \u0275\u0275text(21, "Solicitud de Trabajo No");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(22, "div", 15);
      \u0275\u0275conditionalCreate(23, PlanMuestreo_Conditional_23_Template, 5, 1, "div", 16)(24, PlanMuestreo_Conditional_24_Template, 4, 0, "button", 17);
      \u0275\u0275conditionalCreate(25, PlanMuestreo_Conditional_25_Template, 8, 2, "div", 18);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(26, "div", 11)(27, "div", 12);
      \u0275\u0275text(28, "\u{1F4C5}");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(29, "div")(30, "label", 14);
      \u0275\u0275text(31, "Fecha de Emisi\xF3n");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(32, "p", 19);
      \u0275\u0275text(33);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(34, "div", 11)(35, "div", 12);
      \u0275\u0275text(36, "\u{1F3E2}");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(37, "div")(38, "label", 14);
      \u0275\u0275text(39, "Cliente");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(40, "p", 19);
      \u0275\u0275text(41);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(42, "div", 11)(43, "div", 12);
      \u0275\u0275text(44, "\u{1F6E1}\uFE0F");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(45, "div", 20)(46, "label", 14);
      \u0275\u0275text(47, "Regulado");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(48, "select", 21)(49, "option", 22);
      \u0275\u0275text(50, "Selecciona...");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(51, "option", 23);
      \u0275\u0275text(52, "S\xED");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(53, "option", 24);
      \u0275\u0275text(54, "No");
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(55, "div", 11)(56, "div", 12);
      \u0275\u0275text(57, "\u{1F310}");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(58, "div")(59, "label", 14);
      \u0275\u0275text(60, "Coordenadas");
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(61, PlanMuestreo_Conditional_61_Template, 7, 2, "p", 19)(62, PlanMuestreo_Conditional_62_Template, 2, 0, "p", 25);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(63, "div", 11)(64, "div", 12);
      \u0275\u0275text(65, "\u{1F4CD}");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(66, "div")(67, "label", 14);
      \u0275\u0275text(68, "Direcci\xF3n");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(69, "p", 19);
      \u0275\u0275text(70);
      \u0275\u0275elementEnd()()()()();
      \u0275\u0275elementStart(71, "div", 9)(72, "div", 5)(73, "h3", 6);
      \u0275\u0275text(74, "Detalles de Muestreo");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(75, "div", 10)(76, "div", 11)(77, "div", 12);
      \u0275\u0275text(78, "\u{1F4C4}");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(79, "div")(80, "label", 14);
      \u0275\u0275text(81, "Plan de Muestreo No");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(82, "p", 26);
      \u0275\u0275text(83, "Se genera autom\xE1ticamente al guardar");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(84, "div", 11)(85, "div", 12);
      \u0275\u0275text(86, "\u{1F5D3}\uFE0F");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(87, "div")(88, "label", 14);
      \u0275\u0275text(89, "Fecha M\xE1xima de Entrega");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(90, "p", 19);
      \u0275\u0275text(91);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(92, "p", 27);
      \u0275\u0275text(93, "Generada autom\xE1ticamente (10 d\xEDas tras la emisi\xF3n)");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(94, "div", 11)(95, "div", 12);
      \u0275\u0275text(96, "\u{1F4CA}");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(97, "div")(98, "label", 14);
      \u0275\u0275text(99, "A\xF1o");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(100, "p", 19);
      \u0275\u0275text(101, "2025");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(102, "div", 11)(103, "div", 12);
      \u0275\u0275text(104, "\u{1F516}");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(105, "div")(106, "label", 14);
      \u0275\u0275text(107, "C\xF3digo de Muestra o Muestras");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(108, "p", 26);
      \u0275\u0275text(109, "Pendiente \u2014 se genera autom\xE1ticamente al guardar");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(110, "div", 11)(111, "div", 12);
      \u0275\u0275text(112, "\u{1F552}");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(113, "div")(114, "label", 14);
      \u0275\u0275text(115, "Hora de Muestreo");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(116, "p", 19);
      \u0275\u0275text(117, "En el lapso de 10:00 am hasta las 14:00 pm");
      \u0275\u0275elementEnd()()()()()();
      \u0275\u0275elementStart(118, "div", 4)(119, "div", 5)(120, "h3", 6);
      \u0275\u0275text(121, "Tipo de Matriz");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(122, "div", 28)(123, "label", 14);
      \u0275\u0275text(124, "Seleccione el tipo de matriz ");
      \u0275\u0275elementStart(125, "span", 29);
      \u0275\u0275text(126, "*");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(127, "select", 30);
      \u0275\u0275listener("ngModelChange", function PlanMuestreo_Template_select_ngModelChange_127_listener($event) {
        ctx.tipoAguaId = +$event;
        return ctx.onTipoAguaChange();
      });
      \u0275\u0275elementStart(128, "option", 31);
      \u0275\u0275text(129, "Selecciona el tipo de matriz");
      \u0275\u0275elementEnd();
      \u0275\u0275repeaterCreate(130, PlanMuestreo_For_131_Template, 2, 2, "option", 32, _forTrack0);
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(132, PlanMuestreo_Conditional_132_Template, 6, 1, "div", 33);
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(133, PlanMuestreo_Conditional_133_Template, 24, 4, "div", 34);
      \u0275\u0275elementStart(134, "div", 35)(135, "div", 36)(136, "h3", 6);
      \u0275\u0275text(137, "An\xE1lisis Requerido en Laboratorio");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(138, "div", 37);
      \u0275\u0275repeaterCreate(139, PlanMuestreo_For_140_Template, 21, 1, null, null, \u0275\u0275repeaterTrackByIndex);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(141, "div", 38)(142, "button", 39);
      \u0275\u0275listener("click", function PlanMuestreo_Template_button_click_142_listener() {
        return ctx.siguiente();
      });
      \u0275\u0275text(143, " Siguiente ");
      \u0275\u0275elementEnd()()()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(3);
      \u0275\u0275property("codigoFormulario", (ctx.formulario == null ? null : ctx.formulario.descripcion) ?? null)("edicion", (ctx.formulario == null ? null : ctx.formulario.version) ?? null)("fechaSolicitud", ctx.fechaEmision);
      \u0275\u0275advance(20);
      \u0275\u0275conditional(ctx.solicitudSeleccionada ? 23 : 24);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.panelAbierto ? 25 : -1);
      \u0275\u0275advance(8);
      \u0275\u0275textInterpolate(ctx.detalleFechaEmision || "\u2014");
      \u0275\u0275advance(8);
      \u0275\u0275textInterpolate(ctx.detalleCliente || "\u2014");
      \u0275\u0275advance(20);
      \u0275\u0275conditional(ctx.detalleLatitud || ctx.detalleLongitud ? 61 : 62);
      \u0275\u0275advance(9);
      \u0275\u0275textInterpolate(ctx.detalleDireccion || "\u2014");
      \u0275\u0275advance(21);
      \u0275\u0275textInterpolate(ctx.detalleFechaMaxima || "\u2014");
      \u0275\u0275advance(36);
      \u0275\u0275classProp("opacity-50", ctx.loadingTipoAgua);
      \u0275\u0275property("disabled", ctx.loadingTipoAgua || !ctx.solicitudSeleccionada)("ngModel", ctx.tipoAguaId);
      \u0275\u0275advance();
      \u0275\u0275property("ngValue", null);
      \u0275\u0275advance(2);
      \u0275\u0275repeater(ctx.tipoAguaOpciones);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.tipoAguaId !== null ? 132 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.tipoAguaId !== null ? 133 : -1);
      \u0275\u0275advance(6);
      \u0275\u0275repeater(ctx.ensayosLaboratorio);
    }
  }, dependencies: [CommonModule, FormsModule, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, SelectControlValueAccessor, NgControlStatus, NgModel, PageHeader], styles: ["\n\n.animate-in[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_animateIn 0.3s ease-out forwards;\n}\n.fade-in[_ngcontent-%COMP%] {\n  opacity: 0;\n}\n.slide-in-from-bottom-4[_ngcontent-%COMP%] {\n  transform: translateY(1rem);\n}\n.slide-in-from-right-4[_ngcontent-%COMP%] {\n  transform: translateX(1rem);\n}\n@keyframes _ngcontent-%COMP%_animateIn {\n  to {\n    opacity: 1;\n    transform: translate(0);\n  }\n}\n.custom-scroll[_ngcontent-%COMP%]::-webkit-scrollbar {\n  width: 6px;\n  height: 6px;\n}\n.custom-scroll[_ngcontent-%COMP%]::-webkit-scrollbar-track {\n  background: #f1f5f9;\n  border-radius: 4px;\n}\n.custom-scroll[_ngcontent-%COMP%]::-webkit-scrollbar-thumb {\n  background: #cbd5e1;\n  border-radius: 4px;\n}\n.custom-scroll[_ngcontent-%COMP%]::-webkit-scrollbar-thumb:hover {\n  background: #94a3b8;\n}\ninput[_ngcontent-%COMP%]:focus, \nselect[_ngcontent-%COMP%]:focus, \ntextarea[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: #1e3a8a;\n  box-shadow: 0 0 0 1px #1e3a8a;\n}\n/*# sourceMappingURL=plan-muestreo.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PlanMuestreo, [{
    type: Component,
    args: [{ selector: "app-plan-muestreo", imports: [CommonModule, FormsModule, PageHeader], template: `<div class="p-6 bg-slate-50 min-h-screen text-slate-700 font-sans pb-24">
  <div class="max-w-7xl mx-auto">
    <div class="animate-in fade-in">

      <app-page-header
        breadcrumbSection="Operaciones de campo"
        title="Plan de muestreo"
        subtitle="Aqu\xED podr\xE1s visualizar los detalles del plan de muestreo"
        [codigoFormulario]="formulario?.descripcion ?? null"
        [edicion]="formulario?.version ?? null"
        [fechaSolicitud]="fechaEmision"
      />

      <!-- OBJETIVO -->
      <div class="bg-white rounded-lg shadow-sm border border-slate-200 p-8 mb-6">
        <div class="mb-4 border-b border-slate-300 pb-4">
          <h3 class="text-xs font-bold text-[#1e3a8a] uppercase tracking-wider">Objetivo</h3>
        </div>
        <p class="text-sm text-slate-600 leading-relaxed">
          Realizar un monitoreo mensual (ENERO) para la caracterizaci\xF3n de la calidad de los r\xEDos que
          conforman la red h\xEDdrica (Red metropolitana de monitoreo recurso h\xEDdrico -DMQ)
        </p>
      </div>

      <!-- INFO GRID -->
      <div class="grid grid-cols-2 gap-6 mb-6">

        <!-- INFORMACI\xD3N DE SOLICITUD -->
        <div class="bg-white rounded-lg shadow-sm border border-slate-200 p-8">
          <div class="mb-4 border-b border-slate-300 pb-4">
            <h3 class="text-xs font-bold text-[#1e3a8a] uppercase tracking-wider">Informaci\xF3n de Solicitud</h3>
          </div>
          <div class="space-y-4">

            <div class="flex items-start gap-3">
              <div class="w-9 h-9 bg-slate-100 rounded flex items-center justify-center text-base flex-shrink-0 mt-0.5">\u{1F4BC}</div>
              <div class="flex-1 min-w-0">
                <label class="block text-[11px] font-bold text-[#1e3a8a] uppercase mb-1">Solicitud de Trabajo No</label>
                <div class="relative">
                  @if (solicitudSeleccionada) {
                    <div class="flex items-center justify-between bg-blue-50 border border-blue-300 rounded px-3 py-2">
                      <span class="text-sm font-bold text-[#1e3a8a]">{{ solicitudSeleccionada.num_secuencial ?? solicitudSeleccionada.id_solicitud }}</span>
                      <button type="button" (click)="limpiarSolicitud()"
                        class="text-slate-400 hover:text-red-500 ml-2 text-sm leading-none transition-colors">\u2715</button>
                    </div>
                  } @else {
                    <button type="button" (click)="abrirPanel()"
                      class="w-full flex items-center gap-2 bg-white border border-dashed border-slate-300 text-slate-500 px-3 py-2.5 rounded text-sm hover:border-[#1e3a8a] hover:text-[#1e3a8a] transition-colors">
                      <svg class="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                      </svg>
                      Buscar solicitud finalizada...
                    </button>
                  }
                  @if (panelAbierto) {
                    <div class="absolute top-full left-0 right-0 z-50 mt-1 bg-white border border-slate-200 rounded-lg shadow-xl overflow-hidden">
                      <div class="flex items-center gap-2 px-3 py-2 border-b border-slate-100 bg-slate-50">
                        <input
                          type="text"
                          class="flex-1 border border-slate-300 rounded px-2.5 py-1.5 text-xs outline-none focus:border-[#1e3a8a] transition-colors"
                          placeholder="Buscar por c\xF3digo..."
                          [ngModel]="busqueda"
                          (ngModelChange)="onBusquedaChange($event)"
                          autofocus
                        />
                        <button type="button" (click)="cerrarPanel()"
                          class="text-slate-400 hover:text-red-500 text-sm leading-none px-1 transition-colors">\u2715</button>
                      </div>
                      @if (loadingBusqueda) {
                        <p class="px-4 py-4 text-xs text-slate-400 italic text-center">Buscando...</p>
                      } @else if (solicitudesFinalizadas.length === 0) {
                        <p class="px-4 py-4 text-xs text-slate-400 italic text-center">No se encontraron solicitudes finalizadas.</p>
                      } @else {
                        <ul class="max-h-64 overflow-y-auto custom-scroll">
                          @for (sol of solicitudesFinalizadas; track sol.id_solicitud) {
                            <li (click)="seleccionarSolicitud(sol)"
                              class="px-3.5 py-2.5 border-b border-slate-100 cursor-pointer hover:bg-blue-50 transition-colors flex items-center justify-between gap-2">
                              <div class="flex flex-col min-w-0">
                                <span class="font-bold text-[#1e3a8a] text-xs truncate">{{ sol.num_secuencial ?? '\u2014' }}</span>
                                <span class="text-[10px] text-slate-400 truncate">{{ sol.nombres_completos }}</span>
                              </div>
                              @if (sol.prioridad_id === 386) {
                                <span class="shrink-0 text-[9px] font-bold px-2 py-0.5 rounded border border-red-400 text-red-700 bg-red-50">Urgente</span>
                              } @else if (sol.prioridad_id === 385) {
                                <span class="shrink-0 text-[9px] font-bold px-2 py-0.5 rounded border border-slate-300 text-slate-500 bg-slate-50">Normal</span>
                              }
                            </li>
                          }
                        </ul>
                        @if (meta && meta.totalPages > 1) {
                          <div class="flex items-center justify-between px-3 py-2 border-t border-slate-100 bg-slate-50">
                            <span class="text-[10px] text-slate-400">P\xE1gina {{ meta.page }} de {{ meta.totalPages }} \xB7 {{ meta.total }} resultados</span>
                            <div class="flex gap-1">
                              <button type="button" [disabled]="!meta.hasPrevPage" (click)="cargarPagina(currentPage - 1)"
                                class="w-6 h-6 flex items-center justify-center border border-slate-200 rounded text-xs text-[#1e3a8a] hover:bg-blue-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors">\u2039</button>
                              <button type="button" [disabled]="!meta.hasNextPage" (click)="cargarPagina(currentPage + 1)"
                                class="w-6 h-6 flex items-center justify-center border border-slate-200 rounded text-xs text-[#1e3a8a] hover:bg-blue-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors">\u203A</button>
                            </div>
                          </div>
                        }
                      }
                    </div>
                  }
                </div>
              </div>
            </div>

            <div class="flex items-start gap-3">
              <div class="w-9 h-9 bg-slate-100 rounded flex items-center justify-center text-base flex-shrink-0 mt-0.5">\u{1F4C5}</div>
              <div>
                <label class="block text-[11px] font-bold text-[#1e3a8a] uppercase mb-1">Fecha de Emisi\xF3n</label>
                <p class="text-sm text-slate-700">{{ detalleFechaEmision || '\u2014' }}</p>
              </div>
            </div>

            <div class="flex items-start gap-3">
              <div class="w-9 h-9 bg-slate-100 rounded flex items-center justify-center text-base flex-shrink-0 mt-0.5">\u{1F3E2}</div>
              <div>
                <label class="block text-[11px] font-bold text-[#1e3a8a] uppercase mb-1">Cliente</label>
                <p class="text-sm text-slate-700">{{ detalleCliente || '\u2014' }}</p>
              </div>
            </div>

            <div class="flex items-start gap-3">
              <div class="w-9 h-9 bg-slate-100 rounded flex items-center justify-center text-base flex-shrink-0 mt-0.5">\u{1F6E1}\uFE0F</div>
              <div class="flex-1">
                <label class="block text-[11px] font-bold text-[#1e3a8a] uppercase mb-1">Regulado</label>
                <select class="w-full border border-slate-300 bg-white text-slate-700 p-2.5 rounded text-sm outline-none focus:border-[#1e3a8a] transition-colors">
                  <option value="">Selecciona...</option>
                  <option value="si">S\xED</option>
                  <option value="no">No</option>
                </select>
              </div>
            </div>

            <div class="flex items-start gap-3">
              <div class="w-9 h-9 bg-slate-100 rounded flex items-center justify-center text-base flex-shrink-0 mt-0.5">\u{1F310}</div>
              <div>
                <label class="block text-[11px] font-bold text-[#1e3a8a] uppercase mb-1">Coordenadas</label>
                @if (detalleLatitud || detalleLongitud) {
                  <p class="text-sm text-slate-700"><strong>Lat:</strong> {{ detalleLatitud }} &nbsp; <strong>Lon:</strong> {{ detalleLongitud }}</p>
                } @else {
                  <p class="text-sm text-slate-400">\u2014</p>
                }
              </div>
            </div>

            <div class="flex items-start gap-3">
              <div class="w-9 h-9 bg-slate-100 rounded flex items-center justify-center text-base flex-shrink-0 mt-0.5">\u{1F4CD}</div>
              <div>
                <label class="block text-[11px] font-bold text-[#1e3a8a] uppercase mb-1">Direcci\xF3n</label>
                <p class="text-sm text-slate-700">{{ detalleDireccion || '\u2014' }}</p>
              </div>
            </div>

          </div>
        </div>

        <!-- DETALLES DE MUESTREO -->
        <div class="bg-white rounded-lg shadow-sm border border-slate-200 p-8">
          <div class="mb-4 border-b border-slate-300 pb-4">
            <h3 class="text-xs font-bold text-[#1e3a8a] uppercase tracking-wider">Detalles de Muestreo</h3>
          </div>
          <div class="space-y-4">

            <div class="flex items-start gap-3">
              <div class="w-9 h-9 bg-slate-100 rounded flex items-center justify-center text-base flex-shrink-0 mt-0.5">\u{1F4C4}</div>
              <div>
                <label class="block text-[11px] font-bold text-[#1e3a8a] uppercase mb-1">Plan de Muestreo No</label>
                <p class="text-sm text-slate-400 italic">Se genera autom\xE1ticamente al guardar</p>
              </div>
            </div>

            <div class="flex items-start gap-3">
              <div class="w-9 h-9 bg-slate-100 rounded flex items-center justify-center text-base flex-shrink-0 mt-0.5">\u{1F5D3}\uFE0F</div>
              <div>
                <label class="block text-[11px] font-bold text-[#1e3a8a] uppercase mb-1">Fecha M\xE1xima de Entrega</label>
                <p class="text-sm text-slate-700">{{ detalleFechaMaxima || '\u2014' }}</p>
                <p class="text-[10px] text-slate-400 mt-0.5">Generada autom\xE1ticamente (10 d\xEDas tras la emisi\xF3n)</p>
              </div>
            </div>

            <div class="flex items-start gap-3">
              <div class="w-9 h-9 bg-slate-100 rounded flex items-center justify-center text-base flex-shrink-0 mt-0.5">\u{1F4CA}</div>
              <div>
                <label class="block text-[11px] font-bold text-[#1e3a8a] uppercase mb-1">A\xF1o</label>
                <p class="text-sm text-slate-700">2025</p>
              </div>
            </div>

            <div class="flex items-start gap-3">
              <div class="w-9 h-9 bg-slate-100 rounded flex items-center justify-center text-base flex-shrink-0 mt-0.5">\u{1F516}</div>
              <div>
                <label class="block text-[11px] font-bold text-[#1e3a8a] uppercase mb-1">C\xF3digo de Muestra o Muestras</label>
                <p class="text-sm text-slate-400 italic">Pendiente \u2014 se genera autom\xE1ticamente al guardar</p>
              </div>
            </div>

            <div class="flex items-start gap-3">
              <div class="w-9 h-9 bg-slate-100 rounded flex items-center justify-center text-base flex-shrink-0 mt-0.5">\u{1F552}</div>
              <div>
                <label class="block text-[11px] font-bold text-[#1e3a8a] uppercase mb-1">Hora de Muestreo</label>
                <p class="text-sm text-slate-700">En el lapso de 10:00 am hasta las 14:00 pm</p>
              </div>
            </div>

          </div>
        </div>

      </div>

      <!-- TIPO DE MATRIZ -->
      <div class="bg-white rounded-lg shadow-sm border border-slate-200 p-8 mb-6">
        <div class="mb-4 border-b border-slate-300 pb-4">
          <h3 class="text-xs font-bold text-[#1e3a8a] uppercase tracking-wider">Tipo de Matriz</h3>
        </div>
        <div class="mb-4 max-w-xs">
          <label class="block text-[11px] font-bold text-[#1e3a8a] uppercase mb-1">Seleccione el tipo de matriz <span class="text-red-500">*</span></label>
          <select
            class="w-full border border-slate-300 bg-white text-slate-700 p-2.5 rounded text-sm outline-none focus:border-[#1e3a8a] transition-opacity duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
            [disabled]="loadingTipoAgua || !solicitudSeleccionada"
            [class.opacity-50]="loadingTipoAgua"
            [ngModel]="tipoAguaId"
            (ngModelChange)="tipoAguaId = +$event; onTipoAguaChange()">
            <option [ngValue]="null" disabled>Selecciona el tipo de matriz</option>
            @for (tipo of tipoAguaOpciones; track tipo.id) {
              <option [ngValue]="tipo.id">{{ tipo.nombre }}</option>
            }
          </select>
        </div>
        @if (tipoAguaId !== null) {
          <div class="h-24 bg-gradient-to-r from-[#1e3a8a] to-[#2541b2] rounded-lg flex items-center px-8">
            <div>
              <p class="text-blue-200 text-[10px] font-bold uppercase tracking-widest mb-1">Tipo de Matriz</p>
              <h2 class="text-white text-2xl font-bold">{{ tipoAguaNombre }}</h2>
            </div>
          </div>
        }
      </div>

      <!-- AN\xC1LISIS IN SITU -->
      @if (tipoAguaId !== null) {
        <div class="bg-white rounded-lg shadow-sm border border-slate-200 mb-6 overflow-hidden relative" [class.pointer-events-none]="loadingDetalle">
          @if (loadingDetalle) {
            <div class="absolute inset-0 z-10 flex items-center justify-center bg-white/60 rounded">
              <span class="animate-spin h-5 w-5 border-2 border-[#1e3a8a] border-t-transparent rounded-full"></span>
            </div>
          }
          <div class="px-6 py-4 border-b border-slate-200">
            <h3 class="text-xs font-bold text-[#1e3a8a] uppercase tracking-wider">An\xE1lisis Requerido In Situ</h3>
          </div>
          <table class="w-full text-sm border-collapse">
            <thead>
              <tr class="bg-slate-50 text-[10px] font-bold text-slate-500 uppercase border-b border-slate-200 tracking-wider">
                <th class="px-4 py-2.5 border-r border-slate-100 text-left">An\xE1lisis Requerido</th>
                <th class="px-4 py-2.5 border-r border-slate-100 text-left">Ensayo</th>
                <th class="px-4 py-2.5 border-r border-slate-100 text-left">Identificaci\xF3n</th>
                <th class="px-4 py-2.5 border-r border-slate-100 text-left">M\xE9todo Interno</th>
                <th class="px-4 py-2.5 border-r border-slate-100 text-left">M\xE9todo Referencia</th>
                <th class="px-4 py-2.5 text-left">Unidad</th>
              </tr>
            </thead>
            <tbody>
              @if (detalleEnsayos.length === 0) {
                <tr>
                  <td colspan="6" class="px-4 py-8 text-center text-slate-400 italic text-sm">No hay ensayos para el tipo de matriz seleccionado.</td>
                </tr>
              }
              @for (e of detalleEnsayos; track $index) {
                <tr class="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                  <td class="px-4 py-3 border-r border-slate-100">
                    <span class="inline-block bg-[#1e3a8a] text-white text-[10px] font-bold px-3 py-1 rounded-full">SI</span>
                  </td>
                  <td class="px-4 py-3 border-r border-slate-100 text-slate-700">{{ e.analisis }}</td>
                  <td class="px-4 py-3 border-r border-slate-100 text-slate-700">{{ e.identificacion }}</td>
                  <td class="px-4 py-3 border-r border-slate-100 text-slate-700 font-mono">{{ e.metodoInterno }}</td>
                  <td class="px-4 py-3 border-r border-slate-100 text-slate-700 font-mono">{{ e.metodoReferencia }}</td>
                  <td class="px-4 py-3 text-slate-400">\u2014</td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      }

      <!-- AN\xC1LISIS LABORATORIO -->
      <div class="bg-white rounded-lg shadow-sm border border-slate-200 mb-6 overflow-hidden">
        <div class="px-6 py-4 border-b border-slate-200">
          <h3 class="text-xs font-bold text-[#1e3a8a] uppercase tracking-wider">An\xE1lisis Requerido en Laboratorio</h3>
        </div>
        <div class="p-6">
          @for (grupo of ensayosLaboratorio; track $index) {
            <h4 class="text-xs font-bold text-[#1e3a8a] uppercase tracking-wider mt-6 mb-3 first:mt-0">{{ grupo.preservante }}</h4>
            <div class="border border-slate-200 rounded overflow-hidden shadow-sm mb-4">
              <table class="w-full text-sm border-collapse">
                <thead>
                  <tr class="bg-slate-50 text-[10px] font-bold text-slate-500 uppercase border-b border-slate-200 tracking-wider">
                    <th class="px-4 py-2.5 border-r border-slate-100 text-left">An\xE1lisis Requerido</th>
                    <th class="px-4 py-2.5 border-r border-slate-100 text-left">Ensayo</th>
                    <th class="px-4 py-2.5 border-r border-slate-100 text-left">Identificaci\xF3n</th>
                    <th class="px-4 py-2.5 border-r border-slate-100 text-left">M\xE9todo Interno</th>
                    <th class="px-4 py-2.5 border-r border-slate-100 text-left">M\xE9todo Referencia</th>
                    <th class="px-4 py-2.5 text-left">Unidad</th>
                  </tr>
                </thead>
                <tbody>
                  @for (e of grupo.ensayos; track $index) {
                    <tr class="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                      <td class="px-4 py-3 border-r border-slate-100">
                        <div class="flex items-center gap-2">
                          <button
                            type="button"
                            class="relative inline-flex h-5 w-9 items-center rounded-full transition-colors"
                            [class.bg-[#1e3a8a]]="e.activo"
                            [class.bg-slate-300]="!e.activo"
                            (click)="e.activo = !e.activo"
                          >
                            <span
                              class="inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow transition-transform"
                              [class.translate-x-4]="e.activo"
                              [class.translate-x-0.5]="!e.activo"
                            ></span>
                          </button>
                          <span class="text-xs font-bold" [class.text-[#1e3a8a]]="e.activo" [class.text-slate-400]="!e.activo">
                            {{ e.activo ? 'S\xED' : 'No' }}
                          </span>
                        </div>
                      </td>
                      <td class="px-4 py-3 border-r border-slate-100 text-slate-700">{{ e.ensayo }}</td>
                      <td class="px-4 py-3 border-r border-slate-100 text-slate-700">{{ e.identificacion }}</td>
                      <td class="px-4 py-3 border-r border-slate-100 text-slate-700 font-mono">{{ e.metodoInterno }}</td>
                      <td class="px-4 py-3 border-r border-slate-100 text-slate-700 font-mono">{{ e.metodoReferencia }}</td>
                      <td class="px-4 py-3 text-slate-700">{{ e.unidad }}</td>
                    </tr>
                  }
                </tbody>
              </table>
            </div>
          }
        </div>
      </div>

      <!-- NAVEGACI\xD3N -->
      <div class="flex items-center justify-end pt-4 border-t border-slate-300">
        <button type="button" (click)="siguiente()"
          class="bg-[#1e3a8a] text-white font-bold text-xs uppercase px-8 py-3 rounded hover:bg-[#2541b2] transition-colors">
          Siguiente
        </button>
      </div>

    </div>
  </div>
</div>
`, styles: ["/* src/app/features/plan-muestreo/plan-muestreo.css */\n.animate-in {\n  animation: animateIn 0.3s ease-out forwards;\n}\n.fade-in {\n  opacity: 0;\n}\n.slide-in-from-bottom-4 {\n  transform: translateY(1rem);\n}\n.slide-in-from-right-4 {\n  transform: translateX(1rem);\n}\n@keyframes animateIn {\n  to {\n    opacity: 1;\n    transform: translate(0);\n  }\n}\n.custom-scroll::-webkit-scrollbar {\n  width: 6px;\n  height: 6px;\n}\n.custom-scroll::-webkit-scrollbar-track {\n  background: #f1f5f9;\n  border-radius: 4px;\n}\n.custom-scroll::-webkit-scrollbar-thumb {\n  background: #cbd5e1;\n  border-radius: 4px;\n}\n.custom-scroll::-webkit-scrollbar-thumb:hover {\n  background: #94a3b8;\n}\ninput:focus,\nselect:focus,\ntextarea:focus {\n  outline: none;\n  border-color: #1e3a8a;\n  box-shadow: 0 0 0 1px #1e3a8a;\n}\n/*# sourceMappingURL=plan-muestreo.css.map */\n"] }]
  }], () => [{ type: ReportSolicitudService }, { type: ReportFormularioService }, { type: SolicitudDetalleService }, { type: CatalogoService }, { type: Router }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(PlanMuestreo, { className: "PlanMuestreo", filePath: "src/app/features/plan-muestreo/plan-muestreo.ts", lineNumber: 44 });
})();
export {
  PlanMuestreo
};
//# sourceMappingURL=chunk-IHKO2PMY.js.map
