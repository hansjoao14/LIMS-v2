import {
  CatalogoService
} from "./chunk-JQDQ7LNR.js";
import {
  AppRole,
  MenuKey,
  hasPermission
} from "./chunk-O4XHAB45.js";
import {
  SolicitudService
} from "./chunk-WQQ4FWBU.js";
import {
  ReportSolicitudService
} from "./chunk-IW66RJTG.js";
import {
  require_sweetalert2_all
} from "./chunk-TTWGDTQR.js";
import {
  PaginationComponent
} from "./chunk-5SMDVGDD.js";
import "./chunk-XIRXEHG5.js";
import {
  PageHeader
} from "./chunk-2W4SUA4N.js";
import "./chunk-7OA5XFJQ.js";
import {
  AuthService,
  CommonModule,
  DatePipe
} from "./chunk-FYBL3SR2.js";
import {
  Component,
  Subject,
  __toESM,
  computed,
  setClassMetadata,
  takeUntil,
  timeout,
  ɵsetClassDebugInfo,
  ɵɵadvance,
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
  ɵɵpipe,
  ɵɵpipeBind2,
  ɵɵproperty,
  ɵɵpureFunction0,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIndex,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtext,
  ɵɵtextInterpolate1
} from "./chunk-4XEQTJJK.js";

// src/app/features/lista-cotizaciones/lista-cotizaciones.ts
var import_sweetalert2 = __toESM(require_sweetalert2_all());
var _c0 = () => [1, 2, 3, 4, 5, 6, 7, 8];
var _forTrack0 = ($index, $item) => $item.id_solicitud;
function ListaCotizaciones_Conditional_28_For_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr", 15)(1, "td", 16);
    \u0275\u0275element(2, "div", 17);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "td", 16);
    \u0275\u0275element(4, "div", 18);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "td", 16);
    \u0275\u0275element(6, "div", 19);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "td", 16);
    \u0275\u0275element(8, "div", 20);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "td", 16);
    \u0275\u0275element(10, "div", 21);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "td", 22)(12, "div", 23);
    \u0275\u0275element(13, "div", 24)(14, "div", 24);
    \u0275\u0275elementEnd()()();
  }
}
function ListaCotizaciones_Conditional_28_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275repeaterCreate(0, ListaCotizaciones_Conditional_28_For_1_Template, 15, 0, "tr", 15, \u0275\u0275repeaterTrackByIndex);
  }
  if (rf & 2) {
    \u0275\u0275repeater(\u0275\u0275pureFunction0(0, _c0));
  }
}
function ListaCotizaciones_Conditional_29_For_1_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 32);
    \u0275\u0275listener("click", function ListaCotizaciones_Conditional_29_For_1_Conditional_14_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r1);
      const doc_r2 = \u0275\u0275nextContext().$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.cotizarSolicitud(doc_r2));
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 33);
    \u0275\u0275element(2, "path", 34);
    \u0275\u0275elementEnd()();
  }
}
function ListaCotizaciones_Conditional_29_For_1_Conditional_15_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 35);
    \u0275\u0275listener("click", function ListaCotizaciones_Conditional_29_For_1_Conditional_15_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r4);
      const doc_r2 = \u0275\u0275nextContext().$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.rechazarSolicitud(doc_r2));
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 33);
    \u0275\u0275element(2, "path", 36);
    \u0275\u0275elementEnd()();
  }
}
function ListaCotizaciones_Conditional_29_For_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr", 25)(1, "td", 26);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "td", 27);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "td", 27);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "td", 28);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "td", 29);
    \u0275\u0275text(10);
    \u0275\u0275pipe(11, "date");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "td", 13)(13, "div", 23);
    \u0275\u0275conditionalCreate(14, ListaCotizaciones_Conditional_29_For_1_Conditional_14_Template, 3, 0, "button", 30);
    \u0275\u0275conditionalCreate(15, ListaCotizaciones_Conditional_29_For_1_Conditional_15_Template, 3, 0, "button", 31);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const doc_r2 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(2);
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
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(11, 11, doc_r2.fecha_creacion, "dd/MM/yyyy"), " ");
    \u0275\u0275advance(4);
    \u0275\u0275conditional(ctx_r2.canAutorizar() ? 14 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.canRechazar() ? 15 : -1);
  }
}
function ListaCotizaciones_Conditional_29_ForEmpty_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td", 37);
    \u0275\u0275text(2, " No hay solicitudes pendientes de cotizaci\xF3n. ");
    \u0275\u0275elementEnd()();
  }
}
function ListaCotizaciones_Conditional_29_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275repeaterCreate(0, ListaCotizaciones_Conditional_29_For_1_Template, 16, 14, "tr", 25, _forTrack0, false, ListaCotizaciones_Conditional_29_ForEmpty_2_Template, 3, 0, "tr");
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275repeater(ctx_r2.solicitudes);
  }
}
var ESTADO_AUTORIZADO = 387;
var ESTADO_RECHAZADO = 51;
var CATALOGO_PRIORIDAD_ID = 30;
var ListaCotizaciones = class _ListaCotizaciones {
  reportSolicitudService;
  catalogoService;
  solicitudService;
  authService;
  solicitudes = [];
  meta = null;
  loading = true;
  currentPage = 1;
  PAGE_SIZE = 10;
  prioridades = [];
  destroy$ = new Subject();
  // ── Permisos ─────────────────────────────────────────────────────────────
  userAppRole = computed(() => {
    const roles = this.authService.userProfile()?.roles ?? [];
    return Object.values(AppRole).find((r) => roles.includes(r)) ?? null;
  }, ...ngDevMode ? [{ debugName: "userAppRole" }] : []);
  canAutorizar = computed(() => {
    const role = this.userAppRole();
    return role ? hasPermission(MenuKey.LISTA_COTIZACIONES, role, "autorizar") : false;
  }, ...ngDevMode ? [{ debugName: "canAutorizar" }] : []);
  canRechazar = computed(() => {
    const role = this.userAppRole();
    return role ? hasPermission(MenuKey.LISTA_COTIZACIONES, role, "rechazar") : false;
  }, ...ngDevMode ? [{ debugName: "canRechazar" }] : []);
  constructor(reportSolicitudService, catalogoService, solicitudService, authService) {
    this.reportSolicitudService = reportSolicitudService;
    this.catalogoService = catalogoService;
    this.solicitudService = solicitudService;
    this.authService = authService;
  }
  ngOnInit() {
    this.cargarPrioridades();
    this.cargarPagina(1);
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  cargarPrioridades() {
    this.catalogoService.getItemsByCatalogoId(CATALOGO_PRIORIDAD_ID).pipe(takeUntil(this.destroy$)).subscribe({ next: (res) => this.prioridades = res.data });
  }
  cargarPagina(page) {
    this.loading = true;
    this.currentPage = page;
    this.reportSolicitudService.getSolicitudesEstado388(page, this.PAGE_SIZE).pipe(takeUntil(this.destroy$)).subscribe({
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
  async cotizarSolicitud(doc) {
    const opcionesPrioridad = this.prioridades.map((p) => `<option value="${p.id}">${p.nombre}</option>`).join("");
    const result = await import_sweetalert2.default.fire({
      title: "Autorizar Solicitud",
      html: `
        <p style="font-size:13px;color:#475569;margin-bottom:12px;">
          Solicitud: <strong>${doc.num_secuencial ?? doc.id_solicitud}</strong>
        </p>
        <label style="font-size:11px;font-weight:700;color:#1e3a8a;text-transform:uppercase;display:block;text-align:left;margin-bottom:4px;">
          Prioridad *
        </label>
        <select id="swal-prioridad" class="swal2-input" style="margin:0;width:100%;">
          <option value="">Seleccione...</option>
          ${opcionesPrioridad}
        </select>
      `,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#16a34a",
      cancelButtonColor: "#64748b",
      confirmButtonText: "Autorizar",
      cancelButtonText: "Cancelar",
      focusConfirm: false,
      preConfirm: () => {
        const selPrioridad = document.getElementById("swal-prioridad");
        if (!selPrioridad?.value) {
          import_sweetalert2.default.showValidationMessage("Debe seleccionar una prioridad");
          return false;
        }
        return { prioridad: selPrioridad.value };
      }
    });
    if (!result.isConfirmed || !result.value)
      return;
    const { prioridad } = result.value;
    const prioridadId = Number(prioridad);
    this.solicitudes = this.solicitudes.filter((s) => s.id_solicitud !== doc.id_solicitud);
    this.solicitudService.actualizarSolicitud(doc.id_solicitud, {
      ctestado_id: ESTADO_AUTORIZADO,
      ctprioridad_id: prioridadId,
      formulario_id: doc.formulario_id,
      usuario_id: doc.usuario_id,
      entidad_id: doc.establecimiento_id,
      secuencial_id: doc.secuencial_id,
      periodo_id: doc.periodo_id,
      descripcion: doc.descripcion_solicitud,
      estado: doc.estado_logico_solicitud,
      num_secuencial: doc.num_secuencial
    }).pipe(timeout(1e4), takeUntil(this.destroy$)).subscribe({
      next: () => {
        this.cargarPagina(this.currentPage);
        import_sweetalert2.default.fire({
          title: "\xA1Autorizado!",
          text: `La solicitud ${doc.num_secuencial ?? doc.id_solicitud} fue autorizada correctamente.`,
          icon: "success",
          confirmButtonColor: "#1d2b64",
          timer: 2e3,
          showConfirmButton: false
        });
      },
      error: () => {
        this.cargarPagina(this.currentPage);
        import_sweetalert2.default.fire("Error", "No se pudo autorizar la solicitud", "error");
      }
    });
  }
  async rechazarSolicitud(doc) {
    const { isConfirmed } = await import_sweetalert2.default.fire({
      title: "\xBFEst\xE1 seguro de rechazar?",
      text: `Se rechazar\xE1 la solicitud ${doc.num_secuencial ?? doc.id_solicitud}. Esta acci\xF3n no se puede deshacer.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#64748b",
      confirmButtonText: "S\xED, rechazar",
      cancelButtonText: "Cancelar"
    });
    if (!isConfirmed)
      return;
    this.solicitudes = this.solicitudes.filter((s) => s.id_solicitud !== doc.id_solicitud);
    this.solicitudService.actualizarSolicitud(doc.id_solicitud, {
      ctestado_id: ESTADO_RECHAZADO,
      formulario_id: doc.formulario_id,
      usuario_id: doc.usuario_id,
      entidad_id: doc.establecimiento_id,
      secuencial_id: doc.secuencial_id,
      periodo_id: doc.periodo_id,
      descripcion: doc.descripcion_solicitud,
      estado: doc.estado_logico_solicitud,
      num_secuencial: doc.num_secuencial
    }).pipe(timeout(1e4), takeUntil(this.destroy$)).subscribe({
      next: () => {
        this.cargarPagina(this.currentPage);
        import_sweetalert2.default.fire({
          title: "\xA1Rechazada!",
          text: `La solicitud ${doc.num_secuencial ?? doc.id_solicitud} fue rechazada.`,
          icon: "success",
          confirmButtonColor: "#1d2b64",
          timer: 2e3,
          showConfirmButton: false
        });
      },
      error: () => {
        this.cargarPagina(this.currentPage);
        import_sweetalert2.default.fire("Error", "No se pudo rechazar la solicitud", "error");
      }
    });
  }
  static \u0275fac = function ListaCotizaciones_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ListaCotizaciones)(\u0275\u0275directiveInject(ReportSolicitudService), \u0275\u0275directiveInject(CatalogoService), \u0275\u0275directiveInject(SolicitudService), \u0275\u0275directiveInject(AuthService));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ListaCotizaciones, selectors: [["app-lista-cotizaciones"]], decls: 31, vars: 4, consts: [[1, "p-6", "bg-slate-50", "min-h-screen", "text-slate-700", "font-sans", "pb-24"], [1, "max-w-7xl", "mx-auto"], [1, "animate-in", "fade-in"], ["breadcrumbSection", "Lista de Autorizaciones", "title", "Por Autorizar", "subtitle", "Solicitudes finalizadas pendientes de autorizaci\xF3n o rechazo.", "codigoFormulario", "F-PG-09-01", "edicion", "24"], [1, "bg-white", "rounded-lg", "shadow-sm", "border", "border-slate-200", "overflow-hidden"], [1, "w-full", "text-sm", "border-collapse", "table-fixed"], [1, "w-[150px]"], [1, "w-[90px]"], [1, "w-[105px]"], [1, "w-[120px]"], [1, "bg-slate-50", "text-[10px]", "font-bold", "text-slate-500", "uppercase", "border-b", "border-slate-200", "tracking-wider"], [1, "px-3", "py-2.5", "border-r", "border-slate-100", "text-left"], [1, "px-3", "py-2.5", "border-r", "border-slate-100", "text-center"], [1, "px-2", "py-2.5", "text-center"], ["itemLabel", "solicitudes", 3, "pageChange", "meta", "currentPage", "itemsShown"], [1, "border-b", "border-slate-200", "animate-pulse"], [1, "px-3", "py-3", "border-r", "border-slate-100"], [1, "h-3", "bg-slate-200", "rounded", "w-3/4"], [1, "h-3", "bg-slate-200", "rounded", "w-4/5"], [1, "h-3", "bg-slate-200", "rounded", "w-2/3"], [1, "h-3", "bg-slate-200", "rounded", "w-1/2", "mx-auto"], [1, "h-3", "bg-slate-200", "rounded", "w-3/4", "mx-auto"], [1, "px-2", "py-3"], [1, "flex", "items-center", "justify-center", "gap-1.5"], [1, "h-8", "w-8", "bg-slate-200", "rounded"], [1, "border-b", "border-slate-200", "hover:bg-slate-50", "transition-colors"], [1, "px-3", "py-2.5", "border-r", "border-slate-100", "font-bold", "text-[#1e3a8a]", "break-words", 3, "title"], [1, "px-3", "py-2.5", "border-r", "border-slate-100", "text-slate-600", "truncate", 3, "title"], [1, "px-3", "py-2.5", "border-r", "border-slate-100", "text-center", "text-slate-500", "truncate", 3, "title"], [1, "px-3", "py-2.5", "border-r", "border-slate-100", "text-center", "text-slate-500", "whitespace-nowrap", "text-xs"], ["type", "button", "title", "Autorizar solicitud", 1, "h-8", "w-8", "flex", "items-center", "justify-center", "rounded", "border", "border-green-400", "text-green-700", "bg-green-50", "hover:bg-green-100", "transition-colors", "shrink-0"], ["type", "button", "title", "Rechazar solicitud", 1, "h-8", "w-8", "flex", "items-center", "justify-center", "rounded", "border", "border-red-300", "text-red-600", "bg-red-50", "hover:bg-red-100", "transition-colors", "shrink-0"], ["type", "button", "title", "Autorizar solicitud", 1, "h-8", "w-8", "flex", "items-center", "justify-center", "rounded", "border", "border-green-400", "text-green-700", "bg-green-50", "hover:bg-green-100", "transition-colors", "shrink-0", 3, "click"], ["xmlns", "http://www.w3.org/2000/svg", "fill", "none", "viewBox", "0 0 24 24", "stroke", "currentColor", 1, "h-3.5", "w-3.5"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"], ["type", "button", "title", "Rechazar solicitud", 1, "h-8", "w-8", "flex", "items-center", "justify-center", "rounded", "border", "border-red-300", "text-red-600", "bg-red-50", "hover:bg-red-100", "transition-colors", "shrink-0", 3, "click"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"], ["colspan", "6", 1, "p-10", "text-slate-400", "italic", "text-center"]], template: function ListaCotizaciones_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div", 2);
      \u0275\u0275element(3, "app-page-header", 3);
      \u0275\u0275elementStart(4, "div", 4)(5, "table", 5)(6, "colgroup");
      \u0275\u0275element(7, "col", 6)(8, "col", 6)(9, "col")(10, "col", 7)(11, "col", 8)(12, "col", 9);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(13, "thead")(14, "tr", 10)(15, "th", 11);
      \u0275\u0275text(16, "N\xB0 Secuencial");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(17, "th", 11);
      \u0275\u0275text(18, "Establecimiento");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(19, "th", 11);
      \u0275\u0275text(20, "Solicitante");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(21, "th", 12);
      \u0275\u0275text(22, "Periodo");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(23, "th", 12);
      \u0275\u0275text(24, "F. Creaci\xF3n");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(25, "th", 13);
      \u0275\u0275text(26, "Acciones");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(27, "tbody");
      \u0275\u0275conditionalCreate(28, ListaCotizaciones_Conditional_28_Template, 2, 1)(29, ListaCotizaciones_Conditional_29_Template, 3, 1);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(30, "app-pagination", 14);
      \u0275\u0275listener("pageChange", function ListaCotizaciones_Template_app_pagination_pageChange_30_listener($event) {
        return ctx.cargarPagina($event);
      });
      \u0275\u0275elementEnd()()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(28);
      \u0275\u0275conditional(ctx.loading ? 28 : 29);
      \u0275\u0275advance(2);
      \u0275\u0275property("meta", ctx.meta)("currentPage", ctx.currentPage)("itemsShown", ctx.solicitudes.length);
    }
  }, dependencies: [CommonModule, PaginationComponent, PageHeader, DatePipe], styles: ["\n\n.animate-in[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_animateIn 0.3s ease-out forwards;\n}\n.fade-in[_ngcontent-%COMP%] {\n  opacity: 0;\n}\n@keyframes _ngcontent-%COMP%_animateIn {\n  to {\n    opacity: 1;\n    transform: translate(0);\n  }\n}\ninput[_ngcontent-%COMP%]:focus, \nselect[_ngcontent-%COMP%]:focus, \ntextarea[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: #1e3a8a;\n  box-shadow: 0 0 0 1px #1e3a8a;\n}\n/*# sourceMappingURL=lista-cotizaciones.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ListaCotizaciones, [{
    type: Component,
    args: [{ selector: "app-lista-cotizaciones", standalone: true, imports: [CommonModule, PaginationComponent, PageHeader], template: `<div class="p-6 bg-slate-50 min-h-screen text-slate-700 font-sans pb-24">
  <div class="max-w-7xl mx-auto">

    <div class="animate-in fade-in">

      <app-page-header
        breadcrumbSection="Lista de Autorizaciones"
        title="Por Autorizar"
        subtitle="Solicitudes finalizadas pendientes de autorizaci\xF3n o rechazo."
        codigoFormulario="F-PG-09-01"
        edicion="24"
      />

      <!-- Table-card: sin padding interior, overflow-hidden para respetar border-radius -->
      <div class="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
        <table class="w-full text-sm border-collapse table-fixed">
          <colgroup>
            <col class="w-[150px]">
            <col class="w-[150px]">
            <col>
            <col class="w-[90px]">
            <col class="w-[105px]">
            <col class="w-[120px]">
          </colgroup>
          <thead>
            <tr class="bg-slate-50 text-[10px] font-bold text-slate-500 uppercase border-b border-slate-200 tracking-wider">
              <th class="px-3 py-2.5 border-r border-slate-100 text-left">N\xB0 Secuencial</th>
              <th class="px-3 py-2.5 border-r border-slate-100 text-left">Establecimiento</th>
              <th class="px-3 py-2.5 border-r border-slate-100 text-left">Solicitante</th>
              <th class="px-3 py-2.5 border-r border-slate-100 text-center">Periodo</th>
              <th class="px-3 py-2.5 border-r border-slate-100 text-center">F. Creaci\xF3n</th>
              <th class="px-2 py-2.5 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            @if (loading) {
              @for (_ of [1,2,3,4,5,6,7,8]; track $index) {
                <tr class="border-b border-slate-200 animate-pulse">
                  <td class="px-3 py-3 border-r border-slate-100"><div class="h-3 bg-slate-200 rounded w-3/4"></div></td>
                  <td class="px-3 py-3 border-r border-slate-100"><div class="h-3 bg-slate-200 rounded w-4/5"></div></td>
                  <td class="px-3 py-3 border-r border-slate-100"><div class="h-3 bg-slate-200 rounded w-2/3"></div></td>
                  <td class="px-3 py-3 border-r border-slate-100"><div class="h-3 bg-slate-200 rounded w-1/2 mx-auto"></div></td>
                  <td class="px-3 py-3 border-r border-slate-100"><div class="h-3 bg-slate-200 rounded w-3/4 mx-auto"></div></td>
                  <td class="px-2 py-3">
                    <div class="flex items-center justify-center gap-1.5">
                      <div class="h-8 w-8 bg-slate-200 rounded"></div>
                      <div class="h-8 w-8 bg-slate-200 rounded"></div>
                    </div>
                  </td>
                </tr>
              }
            } @else {
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
                  <td class="px-2 py-2.5 text-center">
                    <div class="flex items-center justify-center gap-1.5">
                      @if (canAutorizar()) {
                        <button
                          type="button"
                          (click)="cotizarSolicitud(doc)"
                          title="Autorizar solicitud"
                          class="h-8 w-8 flex items-center justify-center rounded border border-green-400 text-green-700 bg-green-50 hover:bg-green-100 transition-colors shrink-0">
                          <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </button>
                      }
                      @if (canRechazar()) {
                        <button
                          type="button"
                          (click)="rechazarSolicitud(doc)"
                          title="Rechazar solicitud"
                          class="h-8 w-8 flex items-center justify-center rounded border border-red-300 text-red-600 bg-red-50 hover:bg-red-100 transition-colors shrink-0">
                          <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </button>
                      }
                    </div>
                  </td>
                </tr>
              } @empty {
                <tr>
                  <td colspan="6" class="p-10 text-slate-400 italic text-center">
                    No hay solicitudes pendientes de cotizaci\xF3n.
                  </td>
                </tr>
              }
            }
          </tbody>
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

  </div>
</div>
`, styles: ["/* src/app/features/lista-cotizaciones/lista-cotizaciones.css */\n.animate-in {\n  animation: animateIn 0.3s ease-out forwards;\n}\n.fade-in {\n  opacity: 0;\n}\n@keyframes animateIn {\n  to {\n    opacity: 1;\n    transform: translate(0);\n  }\n}\ninput:focus,\nselect:focus,\ntextarea:focus {\n  outline: none;\n  border-color: #1e3a8a;\n  box-shadow: 0 0 0 1px #1e3a8a;\n}\n/*# sourceMappingURL=lista-cotizaciones.css.map */\n"] }]
  }], () => [{ type: ReportSolicitudService }, { type: CatalogoService }, { type: SolicitudService }, { type: AuthService }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ListaCotizaciones, { className: "ListaCotizaciones", filePath: "src/app/features/lista-cotizaciones/lista-cotizaciones.ts", lineNumber: 27 });
})();
export {
  ListaCotizaciones
};
//# sourceMappingURL=chunk-GPESQXAZ.js.map
