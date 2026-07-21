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
  AppRole,
  MenuKey,
  hasPermission
} from "./chunk-JI325HE7.js";
import {
  SolicitudService
} from "./chunk-QVQTLUKW.js";
import {
  ReportSolicitudService
} from "./chunk-62VLVXUV.js";
import {
  require_sweetalert2_all
} from "./chunk-ZCY535AF.js";
import {
  ReportFormularioService
} from "./chunk-AWRFUGXV.js";
import {
  PaginationComponent
} from "./chunk-NMFNKURB.js";
import {
  TableSkeleton
} from "./chunk-4XRDASKB.js";
import "./chunk-XIRXEHG5.js";
import {
  PageHeader
} from "./chunk-ULA2XVM4.js";
import "./chunk-DPKW7NRU.js";
import {
  AuthService,
  CommonModule,
  DatePipe
} from "./chunk-CIDLATYD.js";
import {
  Component,
  Subject,
  __toESM,
  computed,
  firstValueFrom,
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
  ɵɵnamespaceHTML,
  ɵɵnamespaceSVG,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind2,
  ɵɵproperty,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-WHOAKDIK.js";

// src/app/features/lista-solicitudes/lista-solicitudes.ts
var import_sweetalert2 = __toESM(require_sweetalert2_all());
var _forTrack0 = ($index, $item) => $item.id_solicitud;
function ListaSolicitudes_Conditional_2_Conditional_31_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "tbody", 15);
  }
  if (rf & 2) {
    \u0275\u0275property("rows", 8)("cols", 7)("actionButtons", 2);
  }
}
function ListaSolicitudes_Conditional_2_Conditional_32_For_2_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 22);
    \u0275\u0275text(1, " Creado ");
    \u0275\u0275elementEnd();
  }
}
function ListaSolicitudes_Conditional_2_Conditional_32_For_2_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 23);
    \u0275\u0275text(1, " Pendiente ");
    \u0275\u0275elementEnd();
  }
}
function ListaSolicitudes_Conditional_2_Conditional_32_For_2_Conditional_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 24);
    \u0275\u0275text(1, " Autorizado ");
    \u0275\u0275elementEnd();
  }
}
function ListaSolicitudes_Conditional_2_Conditional_32_For_2_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 25);
    \u0275\u0275text(1, " Rechazado ");
    \u0275\u0275elementEnd();
  }
}
function ListaSolicitudes_Conditional_2_Conditional_32_For_2_Conditional_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 26);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const doc_r2 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", doc_r2.estado_solicitud, " ");
  }
}
function ListaSolicitudes_Conditional_2_Conditional_32_For_2_Conditional_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 25);
    \u0275\u0275text(1, " Urgente ");
    \u0275\u0275elementEnd();
  }
}
function ListaSolicitudes_Conditional_2_Conditional_32_For_2_Conditional_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 27);
    \u0275\u0275text(1, " Normal ");
    \u0275\u0275elementEnd();
  }
}
function ListaSolicitudes_Conditional_2_Conditional_32_For_2_Conditional_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 28);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const doc_r2 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", doc_r2.prioridad_nombre ?? "\u2014", " ");
  }
}
function ListaSolicitudes_Conditional_2_Conditional_32_For_2_Conditional_24_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 34);
  }
}
function ListaSolicitudes_Conditional_2_Conditional_32_For_2_Conditional_24_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 35);
    \u0275\u0275element(1, "path", 36);
    \u0275\u0275elementEnd();
  }
}
function ListaSolicitudes_Conditional_2_Conditional_32_For_2_Conditional_24_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 33);
    \u0275\u0275listener("click", function ListaSolicitudes_Conditional_2_Conditional_32_For_2_Conditional_24_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r3);
      const doc_r2 = \u0275\u0275nextContext().$implicit;
      const ctx_r3 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r3.editarSolicitud(doc_r2));
    });
    \u0275\u0275conditionalCreate(1, ListaSolicitudes_Conditional_2_Conditional_32_For_2_Conditional_24_Conditional_1_Template, 1, 0, "span", 34)(2, ListaSolicitudes_Conditional_2_Conditional_32_For_2_Conditional_24_Conditional_2_Template, 2, 0, ":svg:svg", 35);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const doc_r2 = \u0275\u0275nextContext().$implicit;
    const ctx_r3 = \u0275\u0275nextContext(3);
    \u0275\u0275property("disabled", ctx_r3.cargandoEdicionId === doc_r2.id_solicitud);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r3.cargandoEdicionId === doc_r2.id_solicitud ? 1 : 2);
  }
}
function ListaSolicitudes_Conditional_2_Conditional_32_For_2_Conditional_25_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 37);
    \u0275\u0275listener("click", function ListaSolicitudes_Conditional_2_Conditional_32_For_2_Conditional_25_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r5);
      const doc_r2 = \u0275\u0275nextContext().$implicit;
      const ctx_r3 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r3.abrirPanelFirma(doc_r2));
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 35);
    \u0275\u0275element(2, "path", 38);
    \u0275\u0275elementEnd()();
  }
}
function ListaSolicitudes_Conditional_2_Conditional_32_For_2_Conditional_26_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 39);
    \u0275\u0275listener("click", function ListaSolicitudes_Conditional_2_Conditional_32_For_2_Conditional_26_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r6);
      const doc_r2 = \u0275\u0275nextContext().$implicit;
      const ctx_r3 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r3.eliminarSolicitud(doc_r2));
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 35);
    \u0275\u0275element(2, "path", 40);
    \u0275\u0275elementEnd()();
  }
}
function ListaSolicitudes_Conditional_2_Conditional_32_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr", 17)(1, "td", 18);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "td", 19);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "td", 19);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "td", 20);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "td", 21);
    \u0275\u0275text(10);
    \u0275\u0275pipe(11, "date");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "td", 13);
    \u0275\u0275conditionalCreate(13, ListaSolicitudes_Conditional_2_Conditional_32_For_2_Conditional_13_Template, 2, 0, "span", 22)(14, ListaSolicitudes_Conditional_2_Conditional_32_For_2_Conditional_14_Template, 2, 0, "span", 23)(15, ListaSolicitudes_Conditional_2_Conditional_32_For_2_Conditional_15_Template, 2, 0, "span", 24)(16, ListaSolicitudes_Conditional_2_Conditional_32_For_2_Conditional_16_Template, 2, 0, "span", 25)(17, ListaSolicitudes_Conditional_2_Conditional_32_For_2_Conditional_17_Template, 2, 1, "span", 26);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "td", 13);
    \u0275\u0275conditionalCreate(19, ListaSolicitudes_Conditional_2_Conditional_32_For_2_Conditional_19_Template, 2, 0, "span", 25)(20, ListaSolicitudes_Conditional_2_Conditional_32_For_2_Conditional_20_Template, 2, 0, "span", 27)(21, ListaSolicitudes_Conditional_2_Conditional_32_For_2_Conditional_21_Template, 2, 1, "span", 28);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "td", 14)(23, "div", 29);
    \u0275\u0275conditionalCreate(24, ListaSolicitudes_Conditional_2_Conditional_32_For_2_Conditional_24_Template, 3, 2, "button", 30)(25, ListaSolicitudes_Conditional_2_Conditional_32_For_2_Conditional_25_Template, 3, 0, "button", 31);
    \u0275\u0275conditionalCreate(26, ListaSolicitudes_Conditional_2_Conditional_32_For_2_Conditional_26_Template, 3, 0, "button", 32);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const doc_r2 = ctx.$implicit;
    const ctx_r3 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275property("title", doc_r2.num_secuencial ?? "\u2014");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", doc_r2.num_secuencial ?? "\u2014", " ");
    \u0275\u0275advance();
    \u0275\u0275property("title", doc_r2.establecimiento_nombre);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", doc_r2.establecimiento_nombre, " ");
    \u0275\u0275advance();
    \u0275\u0275property("title", doc_r2.nombres_completos);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", doc_r2.nombres_completos, " ");
    \u0275\u0275advance();
    \u0275\u0275property("title", doc_r2.periodo_nombre);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", doc_r2.periodo_nombre, " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(11, 13, doc_r2.fecha_creacion, "dd/MM/yyyy"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275conditional(doc_r2.ctestado_id === 388 ? 13 : doc_r2.ctestado_id === 2 ? 14 : doc_r2.ctestado_id === 387 ? 15 : doc_r2.ctestado_id === 51 ? 16 : 17);
    \u0275\u0275advance(6);
    \u0275\u0275conditional(doc_r2.prioridad_id === 386 ? 19 : doc_r2.prioridad_id === 385 ? 20 : 21);
    \u0275\u0275advance(5);
    \u0275\u0275conditional(doc_r2.ctestado_id === 2 && ctx_r3.canEdit() ? 24 : doc_r2.ctestado_id === 387 && ctx_r3.canFirmar() ? 25 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r3.canDelete() ? 26 : -1);
  }
}
function ListaSolicitudes_Conditional_2_Conditional_32_ForEmpty_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td", 41);
    \u0275\u0275text(2, " No hay solicitudes registradas. ");
    \u0275\u0275elementEnd()();
  }
}
function ListaSolicitudes_Conditional_2_Conditional_32_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tbody");
    \u0275\u0275repeaterCreate(1, ListaSolicitudes_Conditional_2_Conditional_32_For_2_Template, 27, 16, "tr", 17, _forTrack0, false, ListaSolicitudes_Conditional_2_Conditional_32_ForEmpty_3_Template, 3, 0, "tr");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r3.solicitudes);
  }
}
function ListaSolicitudes_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 3);
    \u0275\u0275element(1, "app-page-header", 4);
    \u0275\u0275elementStart(2, "div", 5)(3, "table", 6)(4, "colgroup");
    \u0275\u0275element(5, "col", 7)(6, "col", 8)(7, "col")(8, "col", 9)(9, "col", 10)(10, "col", 10)(11, "col", 10)(12, "col", 10);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "thead")(14, "tr", 11)(15, "th", 12);
    \u0275\u0275text(16, "N\xB0 Secuencial");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "th", 12);
    \u0275\u0275text(18, "Establecimiento");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "th", 12);
    \u0275\u0275text(20, "Solicitante");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "th", 13);
    \u0275\u0275text(22, "Periodo");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(23, "th", 13);
    \u0275\u0275text(24, "F. Creaci\xF3n");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "th", 13);
    \u0275\u0275text(26, "Estado");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(27, "th", 13);
    \u0275\u0275text(28, "Prioridad");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(29, "th", 14);
    \u0275\u0275text(30, "Acciones");
    \u0275\u0275elementEnd()()();
    \u0275\u0275conditionalCreate(31, ListaSolicitudes_Conditional_2_Conditional_31_Template, 1, 3, "tbody", 15)(32, ListaSolicitudes_Conditional_2_Conditional_32_Template, 4, 1, "tbody");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(33, "app-pagination", 16);
    \u0275\u0275listener("pageChange", function ListaSolicitudes_Conditional_2_Template_app_pagination_pageChange_33_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.cargarPagina($event));
    });
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("codigoFormulario", (ctx_r3.formulario == null ? null : ctx_r3.formulario.descripcion) ?? null)("edicion", (ctx_r3.formulario == null ? null : ctx_r3.formulario.version) ?? null)("fechaSolicitud", ctx_r3.fechaEmision);
    \u0275\u0275advance(30);
    \u0275\u0275conditional(ctx_r3.loading ? 31 : 32);
    \u0275\u0275advance(2);
    \u0275\u0275property("meta", ctx_r3.meta)("currentPage", ctx_r3.currentPage)("itemsShown", ctx_r3.solicitudes.length);
  }
}
function ListaSolicitudes_Conditional_3_Conditional_61_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 82);
    \u0275\u0275element(1, "path", 83);
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(2, "p", 84);
    \u0275\u0275text(3, "ARRASTRA AQU\xCD O SUBE UN ARCHIVO (.p12)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "button", 85);
    \u0275\u0275text(5, " Escoger un archivo ");
    \u0275\u0275elementEnd();
  }
}
function ListaSolicitudes_Conditional_3_Conditional_62_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 86);
    \u0275\u0275element(1, "path", 87);
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(2, "p", 88);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "p", 89);
    \u0275\u0275text(5, "Click para cambiar de archivo");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r3.archivoFirma.name);
  }
}
function ListaSolicitudes_Conditional_3_Conditional_72_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 90);
    \u0275\u0275text(1, " Firmando... ");
  }
}
function ListaSolicitudes_Conditional_3_Conditional_73_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " FIRMAR ");
  }
}
function ListaSolicitudes_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "app-page-header", 42)(1, "div", 43, 0)(3, "p", 44);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p");
    \u0275\u0275text(6, "Solicitante: ");
    \u0275\u0275elementStart(7, "span", 45);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "p");
    \u0275\u0275text(10, "Establecimiento: ");
    \u0275\u0275elementStart(11, "span", 45);
    \u0275\u0275text(12);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(13, "p");
    \u0275\u0275text(14, "Fecha: ");
    \u0275\u0275elementStart(15, "span", 45);
    \u0275\u0275text(16);
    \u0275\u0275pipe(17, "date");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(18, "div", 46)(19, "div", 47)(20, "h3", 48);
    \u0275\u0275text(21, "Firma Electr\xF3nica en L\xEDnea");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "p", 49);
    \u0275\u0275text(23, "Firmar directamente usando certificado digital en archivo (solo se aceptan archivos .p12)");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(24, "div", 50)(25, "div", 51)(26, "div", 52)(27, "div", 53);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(28, "svg", 54);
    \u0275\u0275element(29, "path", 55);
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(30, "span");
    \u0275\u0275text(31);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(32, "div", 56)(33, "span");
    \u0275\u0275text(34, "1 / 1");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(35, "span");
    \u0275\u0275text(36, "- 100% +");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(37, "div", 57)(38, "div", 58);
    \u0275\u0275element(39, "div", 59);
    \u0275\u0275elementStart(40, "div", 60)(41, "strong", 61);
    \u0275\u0275text(42, "ORDEN DE TRABAJO");
    \u0275\u0275elementEnd();
    \u0275\u0275element(43, "br");
    \u0275\u0275text(44);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(45, "div", 62);
    \u0275\u0275element(46, "div", 63)(47, "div", 64);
    \u0275\u0275elementStart(48, "div", 65);
    \u0275\u0275element(49, "div", 66)(50, "div", 66);
    \u0275\u0275elementEnd();
    \u0275\u0275element(51, "div", 67)(52, "div", 63)(53, "div", 68);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(54, "div", 69);
    \u0275\u0275text(55, " ESPACIO FIRMA ");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(56, "div", 70)(57, "h4", 71);
    \u0275\u0275text(58, "Seleccionar certificado digital (.p12)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(59, "div", 72)(60, "input", 73);
    \u0275\u0275listener("change", function ListaSolicitudes_Conditional_3_Template_input_change_60_listener($event) {
      \u0275\u0275restoreView(_r7);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.onFileSelected($event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(61, ListaSolicitudes_Conditional_3_Conditional_61_Template, 6, 0)(62, ListaSolicitudes_Conditional_3_Conditional_62_Template, 6, 1);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(63, "div", 74)(64, "div", 75);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(65, "svg", 76);
    \u0275\u0275element(66, "path", 77);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(67, "input", 78);
    \u0275\u0275twoWayListener("ngModelChange", function ListaSolicitudes_Conditional_3_Template_input_ngModelChange_67_listener($event) {
      \u0275\u0275restoreView(_r7);
      const ctx_r3 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r3.claveFirma, $event) || (ctx_r3.claveFirma = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(68, "div", 79)(69, "button", 80);
    \u0275\u0275listener("click", function ListaSolicitudes_Conditional_3_Template_button_click_69_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.regresarLista());
    });
    \u0275\u0275text(70, " REGRESAR ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(71, "button", 81);
    \u0275\u0275listener("click", function ListaSolicitudes_Conditional_3_Template_button_click_71_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.ejecutarFirma());
    });
    \u0275\u0275conditionalCreate(72, ListaSolicitudes_Conditional_3_Conditional_72_Template, 2, 0)(73, ListaSolicitudes_Conditional_3_Conditional_73_Template, 1, 0);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275property("subtitle", "N\xB0 secuencial: " + ((ctx_r3.selectedDoc == null ? null : ctx_r3.selectedDoc.num_secuencial) ?? "\u2014"));
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r3.selectedDoc == null ? null : ctx_r3.selectedDoc.formulario_nombre);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r3.selectedDoc == null ? null : ctx_r3.selectedDoc.nombres_completos);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r3.selectedDoc == null ? null : ctx_r3.selectedDoc.establecimiento_nombre);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(17, 18, ctx_r3.selectedDoc == null ? null : ctx_r3.selectedDoc.fecha_creacion, "dd/MM/yyyy"));
    \u0275\u0275advance(15);
    \u0275\u0275textInterpolate1("", (ctx_r3.selectedDoc == null ? null : ctx_r3.selectedDoc.num_secuencial) ?? (ctx_r3.selectedDoc == null ? null : ctx_r3.selectedDoc.id_solicitud), ".pdf");
    \u0275\u0275advance(13);
    \u0275\u0275textInterpolate1(" ", (ctx_r3.selectedDoc == null ? null : ctx_r3.selectedDoc.num_secuencial) ?? (ctx_r3.selectedDoc == null ? null : ctx_r3.selectedDoc.id_solicitud), " ");
    \u0275\u0275advance(15);
    \u0275\u0275classProp("border-green-400", ctx_r3.archivoFirma)("bg-green-50", ctx_r3.archivoFirma);
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r3.isFirmando);
    \u0275\u0275advance();
    \u0275\u0275conditional(!ctx_r3.archivoFirma ? 61 : 62);
    \u0275\u0275advance(6);
    \u0275\u0275twoWayProperty("ngModel", ctx_r3.claveFirma);
    \u0275\u0275property("disabled", ctx_r3.isFirmando);
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r3.isFirmando);
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r3.isFirmando || !ctx_r3.archivoFirma || !ctx_r3.claveFirma);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r3.isFirmando ? 72 : 73);
  }
}
var ListaSolicitudes = class _ListaSolicitudes {
  reportSolicitudService;
  solicitudService;
  reportFormularioService;
  router;
  authService;
  // ── Firma ────────────────────────────────────────────────────────────────
  viewingSignature = false;
  selectedDoc = null;
  archivoFirma = null;
  claveFirma = "";
  isFirmando = false;
  // ── Formulario metadata ──────────────────────────────────────────────────
  formulario = null;
  fechaEmision = null;
  // ── Lista ────────────────────────────────────────────────────────────────
  solicitudes = [];
  meta = null;
  loading = true;
  cargandoEdicionId = null;
  currentPage = 1;
  PAGE_SIZE = 10;
  COLOR_PRIMARIO = "#1d2b64";
  fechaActual = /* @__PURE__ */ new Date();
  destroy$ = new Subject();
  // ── Permisos ─────────────────────────────────────────────────────────────
  userAppRole = computed(() => {
    const roles = this.authService.userProfile()?.roles ?? [];
    return Object.values(AppRole).find((r) => roles.includes(r)) ?? null;
  }, ...ngDevMode ? [{ debugName: "userAppRole" }] : []);
  canEdit = computed(() => {
    const role = this.userAppRole();
    return role ? hasPermission(MenuKey.LISTA_SOLICITUDES, role, "editar") : false;
  }, ...ngDevMode ? [{ debugName: "canEdit" }] : []);
  canDelete = computed(() => {
    const role = this.userAppRole();
    return role ? hasPermission(MenuKey.LISTA_SOLICITUDES, role, "eliminar") : false;
  }, ...ngDevMode ? [{ debugName: "canDelete" }] : []);
  canFirmar = computed(() => this.userAppRole() === AppRole.RESPONSABLE_LAB, ...ngDevMode ? [{ debugName: "canFirmar" }] : []);
  constructor(reportSolicitudService, solicitudService, reportFormularioService, router, authService) {
    this.reportSolicitudService = reportSolicitudService;
    this.solicitudService = solicitudService;
    this.reportFormularioService = reportFormularioService;
    this.router = router;
    this.authService = authService;
  }
  ngOnInit() {
    this.cargarFormulario();
    this.cargarPagina(1);
  }
  cargarFormulario() {
    this.reportFormularioService.getFormularioByCTId(380).pipe(takeUntil(this.destroy$)).subscribe({
      next: (formulario) => {
        this.formulario = formulario;
        if (formulario?.fecha_emision) {
          this.fechaEmision = new Date(Number(formulario.fecha_emision));
        }
      }
    });
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  cargarPagina(page) {
    this.loading = true;
    this.currentPage = page;
    this.reportSolicitudService.getSolicitudes(page, this.PAGE_SIZE).pipe(takeUntil(this.destroy$)).subscribe({
      next: ({ data, meta }) => {
        this.solicitudes = data;
        this.meta = meta;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        import_sweetalert2.default.fire("Error", "No se pudo cargar la lista de solicitudes", "error");
      }
    });
  }
  // ── Firma ────────────────────────────────────────────────────────────────
  editarSolicitud(doc) {
    this.cargandoEdicionId = doc.id_solicitud;
    this.reportSolicitudService.getSolicitudById(doc.id_solicitud).pipe(takeUntil(this.destroy$)).subscribe({
      next: (solicitud) => {
        this.cargandoEdicionId = null;
        if (!solicitud) {
          import_sweetalert2.default.fire("Error", "No se encontr\xF3 la solicitud", "error");
          return;
        }
        this.router.navigate(["/solicitud-trabajo"], { state: { solicitud } });
      },
      error: () => {
        this.cargandoEdicionId = null;
        import_sweetalert2.default.fire("Error", "No se pudo cargar la solicitud", "error");
      }
    });
  }
  async eliminarSolicitud(doc) {
    const confirm = await import_sweetalert2.default.fire({
      title: "\xBFEliminar solicitud?",
      text: `Se eliminar\xE1 la solicitud${doc.num_secuencial ? " " + doc.num_secuencial : ""}. Esta acci\xF3n no se puede deshacer.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#64748b",
      confirmButtonText: "S\xED, eliminar",
      cancelButtonText: "Cancelar"
    });
    if (!confirm.isConfirmed)
      return;
    try {
      await firstValueFrom(this.solicitudService.eliminarSolicitudById(doc.id_solicitud));
      import_sweetalert2.default.fire({ title: "\xA1Eliminado!", text: "La solicitud fue eliminada.", icon: "success", confirmButtonColor: this.COLOR_PRIMARIO, timer: 2e3 });
      this.cargarPagina(this.currentPage);
    } catch {
      import_sweetalert2.default.fire("Error", "No se pudo eliminar la solicitud.", "error");
    }
  }
  abrirPanelFirma(doc) {
    this.selectedDoc = doc;
    this.archivoFirma = null;
    this.claveFirma = "";
    this.viewingSignature = true;
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  regresarLista() {
    this.viewingSignature = false;
    this.selectedDoc = null;
  }
  onFileSelected(event) {
    const input = event.target;
    if (!input.files?.length)
      return;
    const file = input.files[0];
    if (file.name.toLowerCase().endsWith(".p12")) {
      this.archivoFirma = file;
    } else {
      import_sweetalert2.default.fire({
        title: "Archivo no v\xE1lido",
        text: "Solo se aceptan certificados digitales en formato .p12",
        icon: "warning",
        confirmButtonColor: this.COLOR_PRIMARIO
      });
      input.value = "";
      this.archivoFirma = null;
    }
  }
  ejecutarFirma() {
    if (!this.archivoFirma || !this.claveFirma) {
      import_sweetalert2.default.fire({
        title: "Datos Incompletos",
        text: "Por favor cargue su certificado .p12 e ingrese la contrase\xF1a para firmar.",
        icon: "warning",
        confirmButtonColor: this.COLOR_PRIMARIO
      });
      return;
    }
    this.isFirmando = true;
    setTimeout(() => {
      this.isFirmando = false;
      import_sweetalert2.default.fire({
        title: "\xA1Documento Firmado!",
        text: `El documento ${this.selectedDoc?.num_secuencial ?? this.selectedDoc?.id_solicitud} ha sido firmado electr\xF3nicamente con \xE9xito.`,
        icon: "success",
        confirmButtonColor: this.COLOR_PRIMARIO,
        timer: 3e3
      }).then(() => this.regresarLista());
    }, 1500);
  }
  static \u0275fac = function ListaSolicitudes_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ListaSolicitudes)(\u0275\u0275directiveInject(ReportSolicitudService), \u0275\u0275directiveInject(SolicitudService), \u0275\u0275directiveInject(ReportFormularioService), \u0275\u0275directiveInject(Router), \u0275\u0275directiveInject(AuthService));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ListaSolicitudes, selectors: [["app-lista-solicitudes"]], decls: 4, vars: 2, consts: [["pageAction", ""], [1, "p-6", "bg-slate-50", "min-h-screen", "text-slate-700", "font-sans", "pb-24"], [1, "max-w-7xl", "mx-auto"], [1, "animate-in", "fade-in"], ["breadcrumbSection", "Lista de Solicitudes", "title", "Lista de Solicitudes", "subtitle", "Listado de solicitudes de trabajo registradas en el sistema.", 3, "codigoFormulario", "edicion", "fechaSolicitud"], [1, "bg-white", "rounded-lg", "shadow-sm", "border", "border-slate-200", "overflow-hidden"], [1, "w-full", "text-sm", "border-collapse", "table-fixed"], [1, "w-[150px]"], [1, "w-[140px]"], [1, "w-[90px]"], [1, "w-[100px]"], [1, "bg-slate-50", "text-[10px]", "font-bold", "text-slate-500", "uppercase", "border-b", "border-slate-200", "tracking-wider"], [1, "px-3", "py-2.5", "border-r", "border-slate-100", "text-left"], [1, "px-3", "py-2.5", "border-r", "border-slate-100", "text-center"], [1, "px-2", "py-2.5", "text-center"], ["appTableSkeleton", "", 3, "rows", "cols", "actionButtons"], ["itemLabel", "solicitudes", 3, "pageChange", "meta", "currentPage", "itemsShown"], [1, "border-b", "border-slate-200", "hover:bg-slate-50", "transition-colors"], [1, "px-3", "py-2.5", "border-r", "border-slate-100", "font-bold", "text-[#1e3a8a]", "break-words", 3, "title"], [1, "px-3", "py-2.5", "border-r", "border-slate-100", "text-slate-600", "truncate", 3, "title"], [1, "px-3", "py-2.5", "border-r", "border-slate-100", "text-center", "text-slate-500", "truncate", 3, "title"], [1, "px-3", "py-2.5", "border-r", "border-slate-100", "text-center", "text-slate-500", "whitespace-nowrap", "text-xs"], [1, "block", "w-full", "text-center", "py-0.5", "border", "border-blue-400", "text-blue-700", "font-bold", "text-[10px]", "rounded", "bg-blue-50"], [1, "block", "w-full", "text-center", "py-0.5", "border", "border-amber-400", "text-amber-700", "font-bold", "text-[10px]", "rounded", "bg-amber-50"], [1, "block", "w-full", "text-center", "py-0.5", "border", "border-green-400", "text-green-700", "font-bold", "text-[10px]", "rounded", "bg-green-50"], [1, "block", "w-full", "text-center", "py-0.5", "border", "border-red-400", "text-red-700", "font-bold", "text-[10px]", "rounded", "bg-red-50"], [1, "block", "w-full", "text-center", "py-0.5", "border", "border-slate-300", "text-slate-500", "font-bold", "text-[10px]", "rounded", "bg-slate-50"], [1, "block", "w-full", "text-center", "py-0.5", "border", "border-slate-300", "text-slate-600", "font-bold", "text-[10px]", "rounded", "bg-slate-50"], [1, "block", "w-full", "text-center", "py-0.5", "border", "border-slate-200", "text-slate-400", "font-bold", "text-[10px]", "rounded", "bg-slate-50"], [1, "flex", "items-center", "justify-center", "gap-1.5"], ["type", "button", "title", "Editar solicitud", 1, "h-8", "w-8", "flex", "items-center", "justify-center", "rounded", "border", "border-amber-400", "text-amber-700", "bg-amber-50", "hover:bg-amber-100", "transition-colors", "disabled:opacity-60", "disabled:cursor-not-allowed", "shrink-0", 3, "disabled"], ["type", "button", "title", "Firmar documento", 1, "h-8", "w-8", "flex", "items-center", "justify-center", "rounded", "bg-[#1e3a8a]", "text-white", "hover:bg-[#2541b2]", "transition-colors", "shrink-0"], ["type", "button", "title", "Eliminar solicitud", 1, "h-8", "w-8", "flex", "items-center", "justify-center", "rounded", "border", "border-red-300", "text-red-600", "bg-red-50", "hover:bg-red-100", "transition-colors", "shrink-0"], ["type", "button", "title", "Editar solicitud", 1, "h-8", "w-8", "flex", "items-center", "justify-center", "rounded", "border", "border-amber-400", "text-amber-700", "bg-amber-50", "hover:bg-amber-100", "transition-colors", "disabled:opacity-60", "disabled:cursor-not-allowed", "shrink-0", 3, "click", "disabled"], [1, "animate-spin", "h-3.5", "w-3.5", "border-2", "border-amber-600", "border-t-transparent", "rounded-full"], ["xmlns", "http://www.w3.org/2000/svg", "fill", "none", "viewBox", "0 0 24 24", "stroke", "currentColor", 1, "h-3.5", "w-3.5"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"], ["type", "button", "title", "Firmar documento", 1, "h-8", "w-8", "flex", "items-center", "justify-center", "rounded", "bg-[#1e3a8a]", "text-white", "hover:bg-[#2541b2]", "transition-colors", "shrink-0", 3, "click"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"], ["type", "button", "title", "Eliminar solicitud", 1, "h-8", "w-8", "flex", "items-center", "justify-center", "rounded", "border", "border-red-300", "text-red-600", "bg-red-50", "hover:bg-red-100", "transition-colors", "shrink-0", 3, "click"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"], ["colspan", "8", 1, "p-10", "text-slate-400", "italic", "text-center"], ["breadcrumbSection", "Lista de Solicitudes", "title", "Firma de solicitud", 3, "subtitle"], ["pageAction", "", 1, "text-right", "text-[13px]", "leading-relaxed", "text-slate-700"], [1, "font-bold", "text-[#1e3a8a]", "text-sm", "mb-1", "uppercase"], [1, "font-medium"], [1, "bg-white", "rounded-lg", "shadow-sm", "border", "border-slate-200", "p-8", "animate-in", "slide-in-from-right-4"], [1, "mb-6", "border-b", "border-slate-300", "pb-4"], [1, "text-lg", "font-bold", "text-[#1e3a8a]", "mb-1"], [1, "text-sm", "text-slate-700"], [1, "grid", "grid-cols-1", "lg:grid-cols-2", "gap-8"], [1, "bg-[#323639]", "rounded-lg", "p-4", "flex", "flex-col", "items-center", "justify-center", "overflow-hidden", "min-h-[500px]", "relative", "shadow-inner"], [1, "absolute", "top-0", "left-0", "right-0", "h-10", "bg-[#282c2f]", "flex", "items-center", "px-4", "justify-between", "text-slate-300", "text-xs"], [1, "flex", "items-center", "gap-2"], ["xmlns", "http://www.w3.org/2000/svg", "fill", "none", "viewBox", "0 0 24 24", "stroke", "currentColor", 1, "h-4", "w-4"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M4 6h16M4 12h16M4 18h7"], [1, "flex", "gap-4"], [1, "w-full", "max-w-[380px]", "bg-white", "h-[450px]", "mt-8", "shadow-lg", "p-6", "flex", "flex-col", "text-[8px]", "text-slate-500", "overflow-hidden", "relative"], [1, "flex", "justify-between", "items-center", "border-b", "pb-2", "mb-4"], [1, "w-20", "h-6", "bg-blue-900", "rounded"], [1, "text-right"], [1, "text-black"], [1, "space-y-3"], [1, "h-2", "w-full", "bg-slate-200", "rounded"], [1, "h-2", "w-5/6", "bg-slate-200", "rounded"], [1, "grid", "grid-cols-2", "gap-4", "mt-4"], [1, "h-16", "bg-slate-100", "rounded", "border", "border-slate-200"], [1, "h-2", "w-3/4", "bg-slate-200", "rounded", "mt-4"], [1, "h-2", "w-2/3", "bg-slate-200", "rounded"], [1, "absolute", "bottom-6", "left-6", "w-32", "h-10", "border-2", "border-dashed", "border-blue-200", "flex", "items-center", "justify-center", "text-blue-300", "font-bold", "bg-blue-50/50"], [1, "flex", "flex-col", "justify-center"], [1, "text-lg", "font-bold", "text-[#1e3a8a]", "mb-4"], [1, "border-2", "border-dashed", "border-blue-300", "bg-[#f8fafc]", "rounded-lg", "p-10", "text-center", "hover:bg-blue-50", "transition-colors", "relative", "cursor-pointer", "group", "mb-6"], ["type", "file", "accept", ".p12", 1, "absolute", "inset-0", "w-full", "h-full", "opacity-0", "cursor-pointer", "disabled:cursor-not-allowed", "z-10", 3, "change", "disabled"], [1, "relative", "mb-6"], [1, "absolute", "inset-y-0", "left-0", "pl-3", "flex", "items-center", "pointer-events-none"], ["xmlns", "http://www.w3.org/2000/svg", "fill", "none", "viewBox", "0 0 24 24", "stroke", "currentColor", 1, "h-5", "w-5", "text-slate-400"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"], ["type", "password", "placeholder", "Ingrese su contrase\xF1a", 1, "w-full", "bg-slate-50", "border", "border-slate-300", "text-slate-700", "p-2.5", "pl-10", "rounded", "outline-none", "focus:border-[#1e3a8a]", "transition-colors", "disabled:opacity-50", 3, "ngModelChange", "ngModel", "disabled"], [1, "flex", "justify-between", "pt-4", "border-t", "border-slate-300", "mt-8"], ["type", "button", 1, "bg-white", "border", "border-slate-300", "text-slate-700", "px-8", "py-2.5", "rounded", "text-sm", "font-bold", "shadow-sm", "hover:bg-slate-50", "transition-all", "disabled:opacity-50", 3, "click", "disabled"], ["type", "button", 1, "bg-[#1e3a8a]", "text-white", "px-8", "py-2.5", "rounded", "text-sm", "font-bold", "shadow-md", "hover:bg-[#2541b2]", "transition-all", "disabled:opacity-60", "disabled:cursor-not-allowed", "flex", "items-center", "gap-2", 3, "click", "disabled"], ["xmlns", "http://www.w3.org/2000/svg", "fill", "none", "viewBox", "0 0 24 24", "stroke", "currentColor", 1, "h-12", "w-12", "mx-auto", "text-slate-400", "mb-3", "group-hover:text-[#1e3a8a]", "transition-colors"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "1.5", "d", "M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"], [1, "text-sm", "font-bold", "text-slate-500", "uppercase", "tracking-wide"], ["type", "button", 1, "mt-4", "bg-[#1e3a8a]", "text-white", "px-6", "py-2", "rounded", "text-xs", "font-bold", "uppercase", "shadow-sm", "hover:bg-[#2541b2]", "transition-colors"], ["xmlns", "http://www.w3.org/2000/svg", "fill", "none", "viewBox", "0 0 24 24", "stroke", "currentColor", 1, "h-12", "w-12", "mx-auto", "text-green-500", "mb-3"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"], [1, "text-sm", "font-bold", "text-green-700"], [1, "text-xs", "text-slate-500", "mt-2"], [1, "animate-spin", "h-4", "w-4", "border-2", "border-white", "border-t-transparent", "rounded-full"]], template: function ListaSolicitudes_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 1)(1, "div", 2);
      \u0275\u0275conditionalCreate(2, ListaSolicitudes_Conditional_2_Template, 34, 7, "div", 3);
      \u0275\u0275conditionalCreate(3, ListaSolicitudes_Conditional_3_Template, 74, 21);
      \u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      \u0275\u0275advance(2);
      \u0275\u0275conditional(!ctx.viewingSignature ? 2 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.viewingSignature ? 3 : -1);
    }
  }, dependencies: [CommonModule, FormsModule, DefaultValueAccessor, NgControlStatus, NgModel, PaginationComponent, PageHeader, TableSkeleton, DatePipe], styles: ["\n\n.animate-in[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_animateIn 0.3s ease-out forwards;\n}\n.fade-in[_ngcontent-%COMP%] {\n  opacity: 0;\n}\n.slide-in-from-right-4[_ngcontent-%COMP%] {\n  transform: translateX(1rem);\n  opacity: 0;\n}\n@keyframes _ngcontent-%COMP%_animateIn {\n  to {\n    opacity: 1;\n    transform: translate(0);\n  }\n}\ninput[_ngcontent-%COMP%]:focus, \nselect[_ngcontent-%COMP%]:focus, \ntextarea[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: #1e3a8a;\n  box-shadow: 0 0 0 1px #1e3a8a;\n}\n/*# sourceMappingURL=lista-solicitudes.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ListaSolicitudes, [{
    type: Component,
    args: [{ selector: "app-lista-solicitudes", standalone: true, imports: [CommonModule, FormsModule, PaginationComponent, PageHeader, TableSkeleton], template: `<div class="p-6 bg-slate-50 min-h-screen text-slate-700 font-sans pb-24">
  <div class="max-w-7xl mx-auto">

    @if (!viewingSignature) {
      <div class="animate-in fade-in">

        <app-page-header
          breadcrumbSection="Lista de Solicitudes"
          title="Lista de Solicitudes"
          subtitle="Listado de solicitudes de trabajo registradas en el sistema."
          [codigoFormulario]="formulario?.descripcion ?? null"
          [edicion]="formulario?.version ?? null"
          [fechaSolicitud]="fechaEmision"
        />

        <!-- Table-card: borde y sombra propia, sin padding interno -->
        <div class="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
          <table class="w-full text-sm border-collapse table-fixed">
            <colgroup>
              <col class="w-[150px]">
              <col class="w-[140px]">
              <col>
              <col class="w-[90px]">
              <col class="w-[100px]">
              <col class="w-[100px]">
              <col class="w-[100px]">
              <col class="w-[100px]">
            </colgroup>
            <thead>
              <tr class="bg-slate-50 text-[10px] font-bold text-slate-500 uppercase border-b border-slate-200 tracking-wider">
                <th class="px-3 py-2.5 border-r border-slate-100 text-left">N\xB0 Secuencial</th>
                <th class="px-3 py-2.5 border-r border-slate-100 text-left">Establecimiento</th>
                <th class="px-3 py-2.5 border-r border-slate-100 text-left">Solicitante</th>
                <th class="px-3 py-2.5 border-r border-slate-100 text-center">Periodo</th>
                <th class="px-3 py-2.5 border-r border-slate-100 text-center">F. Creaci\xF3n</th>
                <th class="px-3 py-2.5 border-r border-slate-100 text-center">Estado</th>
                <th class="px-3 py-2.5 border-r border-slate-100 text-center">Prioridad</th>
                <th class="px-2 py-2.5 text-center">Acciones</th>
              </tr>
            </thead>
            @if (loading) {
              <tbody appTableSkeleton [rows]="8" [cols]="7" [actionButtons]="2"></tbody>
            } @else {
            <tbody>
                @for (doc of solicitudes; track doc.id_solicitud) {
                  <tr class="border-b border-slate-200 hover:bg-slate-50 transition-colors">
                    <td class="px-3 py-2.5 border-r border-slate-100 font-bold text-[#1e3a8a] break-words" [title]="doc.num_secuencial ?? '\u2014'">
                      {{ doc.num_secuencial ?? '\u2014' }}
                    </td>
                    <td class="px-3 py-2.5 border-r border-slate-100 text-slate-600 truncate" [title]="doc.establecimiento_nombre">
                      {{ doc.establecimiento_nombre }}
                    </td>
                    <td class="px-3 py-2.5 border-r border-slate-100 text-slate-600 truncate" [title]="doc.nombres_completos">
                      {{ doc.nombres_completos }}
                    </td>
                    <td class="px-3 py-2.5 border-r border-slate-100 text-center text-slate-500 truncate" [title]="doc.periodo_nombre">
                      {{ doc.periodo_nombre }}
                    </td>
                    <td class="px-3 py-2.5 border-r border-slate-100 text-center text-slate-500 whitespace-nowrap text-xs">
                      {{ doc.fecha_creacion | date:'dd/MM/yyyy' }}
                    </td>
                    <td class="px-3 py-2.5 border-r border-slate-100 text-center">
                      @if (doc.ctestado_id === 388) {
                        <span class="block w-full text-center py-0.5 border border-blue-400 text-blue-700 font-bold text-[10px] rounded bg-blue-50">
                          Creado
                        </span>
                      } @else if (doc.ctestado_id === 2) {
                        <span class="block w-full text-center py-0.5 border border-amber-400 text-amber-700 font-bold text-[10px] rounded bg-amber-50">
                          Pendiente
                        </span>
                      } @else if (doc.ctestado_id === 387) {
                        <span class="block w-full text-center py-0.5 border border-green-400 text-green-700 font-bold text-[10px] rounded bg-green-50">
                          Autorizado
                        </span>
                      } @else if (doc.ctestado_id === 51) {
                        <span class="block w-full text-center py-0.5 border border-red-400 text-red-700 font-bold text-[10px] rounded bg-red-50">
                          Rechazado
                        </span>
                      } @else {
                        <span class="block w-full text-center py-0.5 border border-slate-300 text-slate-500 font-bold text-[10px] rounded bg-slate-50">
                          {{ doc.estado_solicitud }}
                        </span>
                      }
                    </td>
                    <td class="px-3 py-2.5 border-r border-slate-100 text-center">
                      @if (doc.prioridad_id === 386) {
                        <span class="block w-full text-center py-0.5 border border-red-400 text-red-700 font-bold text-[10px] rounded bg-red-50">
                          Urgente
                        </span>
                      } @else if (doc.prioridad_id === 385) {
                        <span class="block w-full text-center py-0.5 border border-slate-300 text-slate-600 font-bold text-[10px] rounded bg-slate-50">
                          Normal
                        </span>
                      } @else {
                        <span class="block w-full text-center py-0.5 border border-slate-200 text-slate-400 font-bold text-[10px] rounded bg-slate-50">
                          {{ doc.prioridad_nombre ?? '\u2014' }}
                        </span>
                      }
                    </td>
                    <td class="px-2 py-2.5 text-center">
                      <div class="flex items-center justify-center gap-1.5">
                        @if (doc.ctestado_id === 2 && canEdit()) {
                          <button
                            type="button"
                            (click)="editarSolicitud(doc)"
                            [disabled]="cargandoEdicionId === doc.id_solicitud"
                            title="Editar solicitud"
                            class="h-8 w-8 flex items-center justify-center rounded border border-amber-400 text-amber-700 bg-amber-50 hover:bg-amber-100 transition-colors disabled:opacity-60 disabled:cursor-not-allowed shrink-0">
                            @if (cargandoEdicionId === doc.id_solicitud) {
                              <span class="animate-spin h-3.5 w-3.5 border-2 border-amber-600 border-t-transparent rounded-full"></span>
                            } @else {
                              <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                              </svg>
                            }
                          </button>
                        } @else if (doc.ctestado_id === 387 && canFirmar()) {
                          <button
                            type="button"
                            (click)="abrirPanelFirma(doc)"
                            title="Firmar documento"
                            class="h-8 w-8 flex items-center justify-center rounded bg-[#1e3a8a] text-white hover:bg-[#2541b2] transition-colors shrink-0">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                            </svg>
                          </button>
                        }
                        @if (canDelete()) {
                          <button
                            type="button"
                            (click)="eliminarSolicitud(doc)"
                            title="Eliminar solicitud"
                            class="h-8 w-8 flex items-center justify-center rounded border border-red-300 text-red-600 bg-red-50 hover:bg-red-100 transition-colors shrink-0">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        }
                      </div>
                    </td>
                  </tr>
                } @empty {
                  <tr>
                    <td colspan="8" class="p-10 text-slate-400 italic text-center">
                      No hay solicitudes registradas.
                    </td>
                  </tr>
                }
            </tbody>
            }
          </table>
        </div>

        <app-pagination
          [meta]="meta"
          [currentPage]="currentPage"
          [itemsShown]="solicitudes.length"
          itemLabel="solicitudes"
          (pageChange)="cargarPagina($event)">
        </app-pagination>

      </div>
    }

    @if (viewingSignature) {

      <!-- PageHeader a nivel de p\xE1gina, fuera de la step-card -->
      <app-page-header
        breadcrumbSection="Lista de Solicitudes"
        title="Firma de solicitud"
        [subtitle]="'N\xB0 secuencial: ' + (selectedDoc?.num_secuencial ?? '\u2014')"
      >
        <div #pageAction pageAction class="text-right text-[13px] leading-relaxed text-slate-700">
          <p class="font-bold text-[#1e3a8a] text-sm mb-1 uppercase">{{ selectedDoc?.formulario_nombre }}</p>
          <p>Solicitante: <span class="font-medium">{{ selectedDoc?.nombres_completos }}</span></p>
          <p>Establecimiento: <span class="font-medium">{{ selectedDoc?.establecimiento_nombre }}</span></p>
          <p>Fecha: <span class="font-medium">{{ selectedDoc?.fecha_creacion | date:'dd/MM/yyyy' }}</span></p>
        </div>
      </app-page-header>

      <!-- Step-card (Nivel 1A) \u2014 igual que los pasos de solicitud-trabajo -->
      <div class="bg-white rounded-lg shadow-sm border border-slate-200 p-8 animate-in slide-in-from-right-4">

        <!-- Step-header (Nivel 2A) -->
        <div class="mb-6 border-b border-slate-300 pb-4">
          <h3 class="text-lg font-bold text-[#1e3a8a] mb-1">Firma Electr\xF3nica en L\xEDnea</h3>
          <p class="text-sm text-slate-700">Firmar directamente usando certificado digital en archivo (solo se aceptan archivos .p12)</p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">

          <!-- Visor de documento simulado -->
          <div class="bg-[#323639] rounded-lg p-4 flex flex-col items-center justify-center overflow-hidden min-h-[500px] relative shadow-inner">
            <div class="absolute top-0 left-0 right-0 h-10 bg-[#282c2f] flex items-center px-4 justify-between text-slate-300 text-xs">
              <div class="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7" />
                </svg>
                <span>{{ selectedDoc?.num_secuencial ?? selectedDoc?.id_solicitud }}.pdf</span>
              </div>
              <div class="flex gap-4"><span>1 / 1</span><span>- 100% +</span></div>
            </div>

            <div class="w-full max-w-[380px] bg-white h-[450px] mt-8 shadow-lg p-6 flex flex-col text-[8px] text-slate-500 overflow-hidden relative">
              <div class="flex justify-between items-center border-b pb-2 mb-4">
                <div class="w-20 h-6 bg-blue-900 rounded"></div>
                <div class="text-right">
                  <strong class="text-black">ORDEN DE TRABAJO</strong><br>
                  {{ selectedDoc?.num_secuencial ?? selectedDoc?.id_solicitud }}
                </div>
              </div>
              <div class="space-y-3">
                <div class="h-2 w-full bg-slate-200 rounded"></div>
                <div class="h-2 w-5/6 bg-slate-200 rounded"></div>
                <div class="grid grid-cols-2 gap-4 mt-4">
                  <div class="h-16 bg-slate-100 rounded border border-slate-200"></div>
                  <div class="h-16 bg-slate-100 rounded border border-slate-200"></div>
                </div>
                <div class="h-2 w-3/4 bg-slate-200 rounded mt-4"></div>
                <div class="h-2 w-full bg-slate-200 rounded"></div>
                <div class="h-2 w-2/3 bg-slate-200 rounded"></div>
              </div>
              <div class="absolute bottom-6 left-6 w-32 h-10 border-2 border-dashed border-blue-200 flex items-center justify-center text-blue-300 font-bold bg-blue-50/50">
                ESPACIO FIRMA
              </div>
            </div>
          </div>

          <!-- Panel de carga del certificado -->
          <div class="flex flex-col justify-center">
            <h4 class="text-lg font-bold text-[#1e3a8a] mb-4">Seleccionar certificado digital (.p12)</h4>

            <div class="border-2 border-dashed border-blue-300 bg-[#f8fafc] rounded-lg p-10 text-center hover:bg-blue-50 transition-colors relative cursor-pointer group mb-6"
                 [class.border-green-400]="archivoFirma"
                 [class.bg-green-50]="archivoFirma">
              <input type="file" (change)="onFileSelected($event)" accept=".p12" [disabled]="isFirmando"
                     class="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed z-10">
              @if (!archivoFirma) {
                <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto text-slate-400 mb-3 group-hover:text-[#1e3a8a] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <p class="text-sm font-bold text-slate-500 uppercase tracking-wide">ARRASTRA AQU\xCD O SUBE UN ARCHIVO (.p12)</p>
                <button type="button" class="mt-4 bg-[#1e3a8a] text-white px-6 py-2 rounded text-xs font-bold uppercase shadow-sm hover:bg-[#2541b2] transition-colors">
                  Escoger un archivo
                </button>
              } @else {
                <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto text-green-500 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p class="text-sm font-bold text-green-700">{{ archivoFirma.name }}</p>
                <p class="text-xs text-slate-500 mt-2">Click para cambiar de archivo</p>
              }
            </div>

            <div class="relative mb-6">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                </svg>
              </div>
              <input type="password" [(ngModel)]="claveFirma" [disabled]="isFirmando"
                     placeholder="Ingrese su contrase\xF1a"
                     class="w-full bg-slate-50 border border-slate-300 text-slate-700 p-2.5 pl-10 rounded outline-none focus:border-[#1e3a8a] transition-colors disabled:opacity-50">
            </div>
          </div>

        </div>

        <!-- Nav buttons (Nivel est\xE1ndar: border-t + justify-between) -->
        <div class="flex justify-between pt-4 border-t border-slate-300 mt-8">
          <button type="button" (click)="regresarLista()" [disabled]="isFirmando"
                  class="bg-white border border-slate-300 text-slate-700 px-8 py-2.5 rounded text-sm font-bold shadow-sm hover:bg-slate-50 transition-all disabled:opacity-50">
            REGRESAR
          </button>
          <button type="button" (click)="ejecutarFirma()"
                  [disabled]="isFirmando || !archivoFirma || !claveFirma"
                  class="bg-[#1e3a8a] text-white px-8 py-2.5 rounded text-sm font-bold shadow-md hover:bg-[#2541b2] transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-2">
            @if (isFirmando) {
              <span class="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
              Firmando...
            } @else {
              FIRMAR
            }
          </button>
        </div>

      </div>
    }

  </div>
</div>
`, styles: ["/* src/app/features/lista-solicitudes/lista-solicitudes.css */\n.animate-in {\n  animation: animateIn 0.3s ease-out forwards;\n}\n.fade-in {\n  opacity: 0;\n}\n.slide-in-from-right-4 {\n  transform: translateX(1rem);\n  opacity: 0;\n}\n@keyframes animateIn {\n  to {\n    opacity: 1;\n    transform: translate(0);\n  }\n}\ninput:focus,\nselect:focus,\ntextarea:focus {\n  outline: none;\n  border-color: #1e3a8a;\n  box-shadow: 0 0 0 1px #1e3a8a;\n}\n/*# sourceMappingURL=lista-solicitudes.css.map */\n"] }]
  }], () => [{ type: ReportSolicitudService }, { type: SolicitudService }, { type: ReportFormularioService }, { type: Router }, { type: AuthService }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ListaSolicitudes, { className: "ListaSolicitudes", filePath: "src/app/features/lista-solicitudes/lista-solicitudes.ts", lineNumber: 27 });
})();
export {
  ListaSolicitudes
};
//# sourceMappingURL=chunk-QPDHQPCL.js.map
