import {
  ToastrAlertService
} from "./chunk-ECH5TBPN.js";
import "./chunk-PWNMWNUA.js";
import {
  DefaultValueAccessor,
  FormsModule,
  MaxLengthValidator,
  NgControlStatus,
  NgModel,
  NgSelectOption,
  NumberValueAccessor,
  SelectControlValueAccessor,
  ɵNgSelectMultipleOption
} from "./chunk-J76B35JM.js";
import "./chunk-XTPUTV4O.js";
import {
  AppRole,
  MenuKey,
  hasPermission
} from "./chunk-O4XHAB45.js";
import {
  require_sweetalert2_all
} from "./chunk-TTWGDTQR.js";
import {
  PageHeader
} from "./chunk-2W4SUA4N.js";
import {
  AuthService,
  CommonModule,
  DatePipe
} from "./chunk-FYBL3SR2.js";
import {
  Component,
  EventEmitter,
  Injectable,
  Input,
  NgZone,
  Output,
  Subject,
  __toESM,
  computed,
  finalize,
  inject,
  of,
  setClassMetadata,
  takeUntil,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵdefineInjectable,
  ɵɵdirectiveInject,
  ɵɵdomElement,
  ɵɵdomElementEnd,
  ɵɵdomElementStart,
  ɵɵdomListener,
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
  ɵɵpureFunction0,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIndex,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-4XEQTJJK.js";

// src/app/features/calibracion-equipos/lista/calibracion-equipos-lista.ts
var import_sweetalert2 = __toESM(require_sweetalert2_all());

// src/app/services/calibracion-equipos/calibracion-equipos.service.ts
var CalibracionEquiposService = class _CalibracionEquiposService {
  getCalibraciones() {
    return of([]);
  }
  deshabilitarCalibracion(_id) {
    return of(void 0);
  }
  static \u0275fac = function CalibracionEquiposService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CalibracionEquiposService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _CalibracionEquiposService, factory: _CalibracionEquiposService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CalibracionEquiposService, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], null, null);
})();

// src/app/features/calibracion-equipos/lista/calibracion-equipos-lista.ts
var _c0 = () => [1, 2, 3, 4, 5, 6, 7, 8];
var _forTrack0 = ($index, $item) => $item.id;
function CalibracionEquiposLista_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "div", 1)(1, "button", 16);
    \u0275\u0275domListener("click", function CalibracionEquiposLista_Conditional_1_Template_button_click_1_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.nuevaCalibracion.emit());
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275domElementStart(2, "svg", 17);
    \u0275\u0275domElement(3, "path", 18);
    \u0275\u0275domElementEnd();
    \u0275\u0275text(4, " Nueva Calibraci\xF3n ");
    \u0275\u0275domElementEnd()();
  }
}
function CalibracionEquiposLista_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElement(0, "col", 10);
  }
}
function CalibracionEquiposLista_Conditional_27_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "th", 14);
    \u0275\u0275text(1, "Acciones");
    \u0275\u0275domElementEnd();
  }
}
function CalibracionEquiposLista_Conditional_29_For_1_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "td", 25)(1, "div", 26);
    \u0275\u0275domElement(2, "div", 27)(3, "div", 27);
    \u0275\u0275domElementEnd()();
  }
}
function CalibracionEquiposLista_Conditional_29_For_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "tr", 19)(1, "td", 20);
    \u0275\u0275domElement(2, "div", 21);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(3, "td", 20);
    \u0275\u0275domElement(4, "div", 22);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(5, "td", 20);
    \u0275\u0275domElement(6, "div", 21);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(7, "td", 20);
    \u0275\u0275domElement(8, "div", 23);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(9, "td", 20);
    \u0275\u0275domElement(10, "div", 24);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(11, "td", 20);
    \u0275\u0275domElement(12, "div", 21);
    \u0275\u0275domElementEnd();
    \u0275\u0275conditionalCreate(13, CalibracionEquiposLista_Conditional_29_For_1_Conditional_13_Template, 4, 0, "td", 25);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(13);
    \u0275\u0275conditional(ctx_r1.hasAnyAction ? 13 : -1);
  }
}
function CalibracionEquiposLista_Conditional_29_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275repeaterCreate(0, CalibracionEquiposLista_Conditional_29_For_1_Template, 14, 1, "tr", 19, \u0275\u0275repeaterTrackByIndex);
  }
  if (rf & 2) {
    \u0275\u0275repeater(\u0275\u0275pureFunction0(0, _c0));
  }
}
function CalibracionEquiposLista_Conditional_30_For_1_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "span", 32);
    \u0275\u0275text(1, "CUMPLE");
    \u0275\u0275domElementEnd();
  }
}
function CalibracionEquiposLista_Conditional_30_For_1_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "span", 33);
    \u0275\u0275text(1, "NO CUMPLE");
    \u0275\u0275domElementEnd();
  }
}
function CalibracionEquiposLista_Conditional_30_For_1_Conditional_16_Conditional_2_Conditional_4_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "button", 42);
    \u0275\u0275domListener("click", function CalibracionEquiposLista_Conditional_30_For_1_Conditional_16_Conditional_2_Conditional_4_Conditional_1_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r5);
      const item_r4 = \u0275\u0275nextContext(4).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      ctx_r1.editarCalibracion(item_r4);
      return \u0275\u0275resetView(ctx_r1.closeMenu());
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275domElementStart(1, "svg", 43);
    \u0275\u0275domElement(2, "path", 44);
    \u0275\u0275domElementEnd();
    \u0275\u0275text(3, " Editar ");
    \u0275\u0275domElementEnd();
  }
}
function CalibracionEquiposLista_Conditional_30_For_1_Conditional_16_Conditional_2_Conditional_4_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "button", 45);
    \u0275\u0275domListener("click", function CalibracionEquiposLista_Conditional_30_For_1_Conditional_16_Conditional_2_Conditional_4_Conditional_2_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r6);
      const item_r4 = \u0275\u0275nextContext(4).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      ctx_r1.eliminarCalibracion(item_r4);
      return \u0275\u0275resetView(ctx_r1.closeMenu());
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275domElementStart(1, "svg", 43);
    \u0275\u0275domElement(2, "path", 46);
    \u0275\u0275domElementEnd();
    \u0275\u0275text(3, " Eliminar ");
    \u0275\u0275domElementEnd();
  }
}
function CalibracionEquiposLista_Conditional_30_For_1_Conditional_16_Conditional_2_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "div", 39);
    \u0275\u0275conditionalCreate(1, CalibracionEquiposLista_Conditional_30_For_1_Conditional_16_Conditional_2_Conditional_4_Conditional_1_Template, 4, 0, "button", 40);
    \u0275\u0275conditionalCreate(2, CalibracionEquiposLista_Conditional_30_For_1_Conditional_16_Conditional_2_Conditional_4_Conditional_2_Template, 4, 0, "button", 41);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(5);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.canEdit() ? 1 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.canDelete() ? 2 : -1);
  }
}
function CalibracionEquiposLista_Conditional_30_For_1_Conditional_16_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "div", 35)(1, "button", 36);
    \u0275\u0275domListener("click", function CalibracionEquiposLista_Conditional_30_For_1_Conditional_16_Conditional_2_Template_button_click_1_listener($event) {
      \u0275\u0275restoreView(_r3);
      const item_r4 = \u0275\u0275nextContext(2).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.toggleMenu(item_r4.id, $event));
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275domElementStart(2, "svg", 37);
    \u0275\u0275domElement(3, "path", 38);
    \u0275\u0275domElementEnd()();
    \u0275\u0275conditionalCreate(4, CalibracionEquiposLista_Conditional_30_For_1_Conditional_16_Conditional_2_Conditional_4_Template, 3, 2, "div", 39);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const item_r4 = \u0275\u0275nextContext(2).$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275conditional(ctx_r1.openMenuId === item_r4.id ? 4 : -1);
  }
}
function CalibracionEquiposLista_Conditional_30_For_1_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "td", 14)(1, "div", 26);
    \u0275\u0275conditionalCreate(2, CalibracionEquiposLista_Conditional_30_For_1_Conditional_16_Conditional_2_Template, 5, 1, "div", 35);
    \u0275\u0275domElementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.canEdit() || ctx_r1.canDelete() ? 2 : -1);
  }
}
function CalibracionEquiposLista_Conditional_30_For_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "tr", 28)(1, "td", 29);
    \u0275\u0275text(2);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(3, "td", 30);
    \u0275\u0275text(4);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(5, "td", 30);
    \u0275\u0275text(6);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(7, "td", 31);
    \u0275\u0275text(8);
    \u0275\u0275pipe(9, "date");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(10, "td", 13);
    \u0275\u0275conditionalCreate(11, CalibracionEquiposLista_Conditional_30_For_1_Conditional_11_Template, 2, 0, "span", 32)(12, CalibracionEquiposLista_Conditional_30_For_1_Conditional_12_Template, 2, 0, "span", 33);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(13, "td", 34);
    \u0275\u0275text(14);
    \u0275\u0275pipe(15, "date");
    \u0275\u0275domElementEnd();
    \u0275\u0275conditionalCreate(16, CalibracionEquiposLista_Conditional_30_For_1_Conditional_16_Template, 3, 1, "td", 14);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const item_r4 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", item_r4.num_secuencial ?? "\u2014", " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", item_r4.analista_nombre, " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", item_r4.tipo_calibrador, " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(9, 7, item_r4.fecha_verificacion, "dd/MM/yyyy"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275conditional(item_r4.evaluacion === "CUMPLE" ? 11 : 12);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(15, 10, +item_r4.creado_en, "dd/MM/yyyy"), " ");
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.hasAnyAction ? 16 : -1);
  }
}
function CalibracionEquiposLista_Conditional_30_ForEmpty_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "tr")(1, "td", 47);
    \u0275\u0275text(2, " No hay registros. ");
    \u0275\u0275domElementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275attribute("colspan", ctx_r1.hasAnyAction ? 7 : 6);
  }
}
function CalibracionEquiposLista_Conditional_30_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275repeaterCreate(0, CalibracionEquiposLista_Conditional_30_For_1_Template, 17, 13, "tr", 28, _forTrack0, false, CalibracionEquiposLista_Conditional_30_ForEmpty_2_Template, 3, 1, "tr");
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275repeater(ctx_r1.calibraciones);
  }
}
function CalibracionEquiposLista_Conditional_31_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "div", 48);
    \u0275\u0275domListener("click", function CalibracionEquiposLista_Conditional_31_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.closeMenu());
    });
    \u0275\u0275domElementEnd();
  }
}
var CalibracionEquiposLista = class _CalibracionEquiposLista {
  calibracionService;
  authService;
  zone;
  toastrAlert;
  nuevaCalibracion = new EventEmitter();
  editar = new EventEmitter();
  loading = true;
  calibraciones = [];
  openMenuId = null;
  procesandoId = null;
  destroy$ = new Subject();
  userAppRole = computed(() => {
    const roles = this.authService.userProfile()?.roles ?? [];
    return Object.values(AppRole).find((r) => roles.includes(r)) ?? null;
  }, ...ngDevMode ? [{ debugName: "userAppRole" }] : []);
  canEdit = computed(() => {
    const role = this.userAppRole();
    return role ? hasPermission(MenuKey.CALIBRACION_EQUIPOS, role, "editar") : false;
  }, ...ngDevMode ? [{ debugName: "canEdit" }] : []);
  canDelete = computed(() => {
    const role = this.userAppRole();
    return role ? hasPermission(MenuKey.CALIBRACION_EQUIPOS, role, "eliminar") : false;
  }, ...ngDevMode ? [{ debugName: "canDelete" }] : []);
  canCrear = computed(() => {
    const role = this.userAppRole();
    return role ? hasPermission(MenuKey.CALIBRACION_EQUIPOS, role, "crear") : false;
  }, ...ngDevMode ? [{ debugName: "canCrear" }] : []);
  get hasAnyAction() {
    return this.canEdit() || this.canDelete();
  }
  constructor(calibracionService, authService, zone, toastrAlert) {
    this.calibracionService = calibracionService;
    this.authService = authService;
    this.zone = zone;
    this.toastrAlert = toastrAlert;
  }
  ngOnInit() {
    this.cargarDatos();
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  cargarDatos() {
    this.loading = true;
    this.calibracionService.getCalibraciones().pipe(takeUntil(this.destroy$)).subscribe({
      next: (data) => {
        this.calibraciones = data;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }
  toggleMenu(id, event) {
    event.stopPropagation();
    this.openMenuId = this.openMenuId === id ? null : id;
  }
  closeMenu() {
    this.openMenuId = null;
  }
  editarCalibracion(item) {
    this.editar.emit(item);
  }
  async eliminarCalibracion(item) {
    const confirm = await import_sweetalert2.default.fire({
      icon: "warning",
      title: "\xBFEliminar registro?",
      text: `Se eliminar\xE1 el registro ${item.num_secuencial ?? item.id}. Esta acci\xF3n no se puede deshacer.`,
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "S\xED, eliminar",
      cancelButtonText: "Cancelar"
    });
    if (!confirm.isConfirmed)
      return;
    this.procesandoId = item.id;
    this.calibracionService.deshabilitarCalibracion(item.id).pipe(takeUntil(this.destroy$), finalize(() => {
      this.procesandoId = null;
    })).subscribe({
      next: () => this.zone.run(() => {
        this.toastrAlert.showSuccess("Registro eliminado correctamente.", "\xA1Eliminado!");
        this.cargarDatos();
      }),
      error: () => this.zone.run(() => this.toastrAlert.showError("No se pudo eliminar el registro.", "Error"))
    });
  }
  static \u0275fac = function CalibracionEquiposLista_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CalibracionEquiposLista)(\u0275\u0275directiveInject(CalibracionEquiposService), \u0275\u0275directiveInject(AuthService), \u0275\u0275directiveInject(NgZone), \u0275\u0275directiveInject(ToastrAlertService));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _CalibracionEquiposLista, selectors: [["app-calibracion-equipos-lista"]], outputs: { nuevaCalibracion: "nuevaCalibracion", editar: "editar" }, decls: 32, vars: 5, consts: [[1, "bg-white", "rounded-lg", "shadow-sm", "border", "border-slate-200", "p-6"], [1, "flex", "justify-end", "mb-4"], [1, "border", "border-slate-200", "rounded", "overflow-hidden"], [1, "overflow-x-auto", "custom-scroll"], [1, "w-full", "text-sm", "border-collapse", "table-fixed"], [1, "w-[140px]"], [1, "w-[180px]"], [1, "w-[130px]"], [1, "w-[110px]"], [1, "w-[120px]"], [1, "w-[100px]"], [1, "bg-slate-50", "text-[10px]", "font-bold", "text-slate-500", "uppercase", "border-b", "border-slate-200", "tracking-wider"], [1, "px-3", "py-2.5", "border-r", "border-slate-100", "text-left"], [1, "px-3", "py-2.5", "border-r", "border-slate-100", "text-center"], [1, "px-2", "py-2.5", "text-center"], [1, "fixed", "inset-0", "z-40"], ["type", "button", 1, "bg-[#1e3a8a]", "text-white", "px-5", "py-2", "rounded", "text-sm", "font-bold", "shadow-md", "hover:bg-[#2541b2]", "transition-all", "flex", "items-center", "gap-2", 3, "click"], ["fill", "none", "viewBox", "0 0 24 24", "stroke", "currentColor", 1, "w-4", "h-4"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M12 4v16m8-8H4"], [1, "border-b", "border-slate-200", "animate-pulse"], [1, "px-3", "py-3", "border-r", "border-slate-100"], [1, "h-3", "bg-slate-200", "rounded", "w-3/4"], [1, "h-3", "bg-slate-200", "rounded", "w-4/5"], [1, "h-3", "bg-slate-200", "rounded", "w-3/4", "mx-auto"], [1, "h-5", "bg-slate-200", "rounded", "w-4/5", "mx-auto"], [1, "px-2", "py-3"], [1, "flex", "items-center", "justify-center", "gap-1.5"], [1, "h-8", "w-8", "bg-slate-200", "rounded"], [1, "border-b", "border-slate-100", "hover:bg-slate-50", "transition-colors"], [1, "px-3", "py-2.5", "border-r", "border-slate-100", "text-xs", "font-semibold", "text-[#1e3a8a]", "truncate"], [1, "px-3", "py-2.5", "border-r", "border-slate-100", "text-xs", "text-slate-600", "truncate"], [1, "px-3", "py-2.5", "border-r", "border-slate-100", "text-xs", "text-slate-500", "text-center"], [1, "text-[10px]", "font-bold", "px-2", "py-0.5", "rounded", "border", "border-green-400", "text-green-700", "bg-green-50"], [1, "text-[10px]", "font-bold", "px-2", "py-0.5", "rounded", "border", "border-red-300", "text-red-600", "bg-red-50"], [1, "px-3", "py-2.5", "border-r", "border-slate-100", "text-xs", "text-slate-500"], [1, "relative"], ["type", "button", "title", "M\xE1s acciones", 1, "h-8", "w-8", "flex", "items-center", "justify-center", "rounded", "border", "border-slate-300", "text-slate-500", "bg-white", "hover:bg-slate-100", "transition-colors", "shrink-0", 3, "click"], ["fill", "currentColor", "viewBox", "0 0 20 20", 1, "h-4", "w-4"], ["d", "M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"], [1, "absolute", "right-0", "top-full", "mt-1", "z-50", "bg-white", "border", "border-slate-200", "rounded-lg", "shadow-lg", "py-1", "w-40"], ["type", "button", 1, "w-full", "flex", "items-center", "gap-2.5", "px-3", "py-2", "text-xs", "text-amber-700", "hover:bg-amber-50"], ["type", "button", 1, "w-full", "flex", "items-center", "gap-2.5", "px-3", "py-2", "text-xs", "text-red-600", "hover:bg-red-50"], ["type", "button", 1, "w-full", "flex", "items-center", "gap-2.5", "px-3", "py-2", "text-xs", "text-amber-700", "hover:bg-amber-50", 3, "click"], ["fill", "none", "viewBox", "0 0 24 24", "stroke", "currentColor", 1, "h-3.5", "w-3.5", "shrink-0"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"], ["type", "button", 1, "w-full", "flex", "items-center", "gap-2.5", "px-3", "py-2", "text-xs", "text-red-600", "hover:bg-red-50", 3, "click"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"], [1, "p-10", "text-slate-400", "italic", "text-center"], [1, "fixed", "inset-0", "z-40", 3, "click"]], template: function CalibracionEquiposLista_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275domElementStart(0, "div", 0);
      \u0275\u0275conditionalCreate(1, CalibracionEquiposLista_Conditional_1_Template, 5, 0, "div", 1);
      \u0275\u0275domElementStart(2, "div", 2)(3, "div", 3)(4, "table", 4)(5, "colgroup");
      \u0275\u0275domElement(6, "col", 5)(7, "col", 6)(8, "col", 6)(9, "col", 7)(10, "col", 8)(11, "col", 9);
      \u0275\u0275conditionalCreate(12, CalibracionEquiposLista_Conditional_12_Template, 1, 0, "col", 10);
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(13, "thead")(14, "tr", 11)(15, "th", 12);
      \u0275\u0275text(16, "N\xB0 Formulario");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(17, "th", 12);
      \u0275\u0275text(18, "Analista");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(19, "th", 12);
      \u0275\u0275text(20, "Tipo de Calibrador");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(21, "th", 13);
      \u0275\u0275text(22, "Fecha Verificaci\xF3n");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(23, "th", 13);
      \u0275\u0275text(24, "Evaluaci\xF3n");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(25, "th", 12);
      \u0275\u0275text(26, "Fecha Registro");
      \u0275\u0275domElementEnd();
      \u0275\u0275conditionalCreate(27, CalibracionEquiposLista_Conditional_27_Template, 2, 0, "th", 14);
      \u0275\u0275domElementEnd()();
      \u0275\u0275domElementStart(28, "tbody");
      \u0275\u0275conditionalCreate(29, CalibracionEquiposLista_Conditional_29_Template, 2, 1)(30, CalibracionEquiposLista_Conditional_30_Template, 3, 1);
      \u0275\u0275domElementEnd()()()()();
      \u0275\u0275conditionalCreate(31, CalibracionEquiposLista_Conditional_31_Template, 1, 0, "div", 15);
    }
    if (rf & 2) {
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.canCrear() ? 1 : -1);
      \u0275\u0275advance(11);
      \u0275\u0275conditional(ctx.hasAnyAction ? 12 : -1);
      \u0275\u0275advance(15);
      \u0275\u0275conditional(ctx.hasAnyAction ? 27 : -1);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.loading ? 29 : 30);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.openMenuId !== null ? 31 : -1);
    }
  }, dependencies: [CommonModule, DatePipe], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CalibracionEquiposLista, [{
    type: Component,
    args: [{ selector: "app-calibracion-equipos-lista", imports: [CommonModule], template: `<div class="bg-white rounded-lg shadow-sm border border-slate-200 p-6">

  <!-- Bot\xF3n nuevo registro -->
  @if (canCrear()) {
    <div class="flex justify-end mb-4">
      <button type="button" (click)="nuevaCalibracion.emit()"
        class="bg-[#1e3a8a] text-white px-5 py-2 rounded text-sm font-bold shadow-md hover:bg-[#2541b2] transition-all flex items-center gap-2">
        <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
        </svg>
        Nueva Calibraci\xF3n
      </button>
    </div>
  }

  <!-- Tabla con skeleton loader -->
  <div class="border border-slate-200 rounded overflow-hidden">
    <div class="overflow-x-auto custom-scroll">
      <table class="w-full text-sm border-collapse table-fixed">
        <colgroup>
          <col class="w-[140px]">
          <col class="w-[180px]">
          <col class="w-[180px]">
          <col class="w-[130px]">
          <col class="w-[110px]">
          <col class="w-[120px]">
          @if (hasAnyAction) {
            <col class="w-[100px]">
          }
        </colgroup>
        <thead>
          <tr class="bg-slate-50 text-[10px] font-bold text-slate-500 uppercase border-b border-slate-200 tracking-wider">
            <th class="px-3 py-2.5 border-r border-slate-100 text-left">N\xB0 Formulario</th>
            <th class="px-3 py-2.5 border-r border-slate-100 text-left">Analista</th>
            <th class="px-3 py-2.5 border-r border-slate-100 text-left">Tipo de Calibrador</th>
            <th class="px-3 py-2.5 border-r border-slate-100 text-center">Fecha Verificaci\xF3n</th>
            <th class="px-3 py-2.5 border-r border-slate-100 text-center">Evaluaci\xF3n</th>
            <th class="px-3 py-2.5 border-r border-slate-100 text-left">Fecha Registro</th>
            @if (hasAnyAction) {
              <th class="px-2 py-2.5 text-center">Acciones</th>
            }
          </tr>
        </thead>
        <tbody>
          @if (loading) {
            @for (_ of [1,2,3,4,5,6,7,8]; track $index) {
              <tr class="border-b border-slate-200 animate-pulse">
                <td class="px-3 py-3 border-r border-slate-100"><div class="h-3 bg-slate-200 rounded w-3/4"></div></td>
                <td class="px-3 py-3 border-r border-slate-100"><div class="h-3 bg-slate-200 rounded w-4/5"></div></td>
                <td class="px-3 py-3 border-r border-slate-100"><div class="h-3 bg-slate-200 rounded w-3/4"></div></td>
                <td class="px-3 py-3 border-r border-slate-100"><div class="h-3 bg-slate-200 rounded w-3/4 mx-auto"></div></td>
                <td class="px-3 py-3 border-r border-slate-100"><div class="h-5 bg-slate-200 rounded w-4/5 mx-auto"></div></td>
                <td class="px-3 py-3 border-r border-slate-100"><div class="h-3 bg-slate-200 rounded w-3/4"></div></td>
                @if (hasAnyAction) {
                  <td class="px-2 py-3">
                    <div class="flex items-center justify-center gap-1.5">
                      <div class="h-8 w-8 bg-slate-200 rounded"></div>
                      <div class="h-8 w-8 bg-slate-200 rounded"></div>
                    </div>
                  </td>
                }
              </tr>
            }
          } @else {
            @for (item of calibraciones; track item.id) {
              <tr class="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                <td class="px-3 py-2.5 border-r border-slate-100 text-xs font-semibold text-[#1e3a8a] truncate">
                  {{ item.num_secuencial ?? '\u2014' }}
                </td>
                <td class="px-3 py-2.5 border-r border-slate-100 text-xs text-slate-600 truncate">
                  {{ item.analista_nombre }}
                </td>
                <td class="px-3 py-2.5 border-r border-slate-100 text-xs text-slate-600 truncate">
                  {{ item.tipo_calibrador }}
                </td>
                <td class="px-3 py-2.5 border-r border-slate-100 text-xs text-slate-500 text-center">
                  {{ item.fecha_verificacion | date:'dd/MM/yyyy' }}
                </td>
                <td class="px-3 py-2.5 border-r border-slate-100 text-center">
                  @if (item.evaluacion === 'CUMPLE') {
                    <span class="text-[10px] font-bold px-2 py-0.5 rounded border border-green-400 text-green-700 bg-green-50">CUMPLE</span>
                  } @else {
                    <span class="text-[10px] font-bold px-2 py-0.5 rounded border border-red-300 text-red-600 bg-red-50">NO CUMPLE</span>
                  }
                </td>
                <td class="px-3 py-2.5 border-r border-slate-100 text-xs text-slate-500">
                  {{ +item.creado_en | date:'dd/MM/yyyy' }}
                </td>
                @if (hasAnyAction) {
                  <td class="px-2 py-2.5 text-center">
                    <div class="flex items-center justify-center gap-1.5">
                      @if (canEdit() || canDelete()) {
                        <div class="relative">
                          <button type="button" title="M\xE1s acciones"
                            (click)="toggleMenu(item.id, $event)"
                            class="h-8 w-8 flex items-center justify-center rounded border border-slate-300 text-slate-500 bg-white hover:bg-slate-100 transition-colors shrink-0">
                            <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"/>
                            </svg>
                          </button>
                          @if (openMenuId === item.id) {
                            <div class="absolute right-0 top-full mt-1 z-50 bg-white border border-slate-200 rounded-lg shadow-lg py-1 w-40">
                              @if (canEdit()) {
                                <button type="button" (click)="editarCalibracion(item); closeMenu()"
                                  class="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-amber-700 hover:bg-amber-50">
                                  <svg class="h-3.5 w-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                  </svg>
                                  Editar
                                </button>
                              }
                              @if (canDelete()) {
                                <button type="button" (click)="eliminarCalibracion(item); closeMenu()"
                                  class="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-red-600 hover:bg-red-50">
                                  <svg class="h-3.5 w-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                  </svg>
                                  Eliminar
                                </button>
                              }
                            </div>
                          }
                        </div>
                      }
                    </div>
                  </td>
                }
              </tr>
            } @empty {
              <tr>
                <td [attr.colspan]="hasAnyAction ? 7 : 6" class="p-10 text-slate-400 italic text-center">
                  No hay registros.
                </td>
              </tr>
            }
          }
        </tbody>
      </table>
    </div>
  </div>

</div>

@if (openMenuId !== null) {
  <div class="fixed inset-0 z-40" (click)="closeMenu()"></div>
}
` }]
  }], () => [{ type: CalibracionEquiposService }, { type: AuthService }, { type: NgZone }, { type: ToastrAlertService }], { nuevaCalibracion: [{
    type: Output
  }], editar: [{
    type: Output
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(CalibracionEquiposLista, { className: "CalibracionEquiposLista", filePath: "src/app/features/calibracion-equipos/lista/calibracion-equipos-lista.ts", lineNumber: 17 });
})();

// src/app/features/calibracion-equipos/formulario/calibracion-equipos-formulario.ts
var _forTrack02 = ($index, $item) => $item.id;
var _forTrack1 = ($index, $item) => $item.key;
function CalibracionEquiposFormulario_For_41_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 25);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const eq_r1 = ctx.$implicit;
    \u0275\u0275property("ngValue", eq_r1.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2("", eq_r1.codigo, " \u2014 ", eq_r1.nombre);
  }
}
function CalibracionEquiposFormulario_For_55_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 25);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const eq_r2 = ctx.$implicit;
    \u0275\u0275property("ngValue", eq_r2.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2("", eq_r2.codigo, " \u2014 ", eq_r2.nombre);
  }
}
function CalibracionEquiposFormulario_For_69_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 25);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const eq_r3 = ctx.$implicit;
    \u0275\u0275property("ngValue", eq_r3.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2("", eq_r3.codigo, " \u2014 ", eq_r3.nombre);
  }
}
function CalibracionEquiposFormulario_For_81_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 25);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const eq_r4 = ctx.$implicit;
    \u0275\u0275property("ngValue", eq_r4.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2("", eq_r4.codigo, " \u2014 ", eq_r4.nombre);
  }
}
function CalibracionEquiposFormulario_Conditional_190_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 49);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 54);
    \u0275\u0275element(2, "path", 64);
    \u0275\u0275elementEnd();
    \u0275\u0275text(3, " CUMPLE ");
    \u0275\u0275elementEnd();
  }
}
function CalibracionEquiposFormulario_Conditional_191_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 50);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 54);
    \u0275\u0275element(2, "path", 65);
    \u0275\u0275elementEnd();
    \u0275\u0275text(3, " NO CUMPLE ");
    \u0275\u0275elementEnd();
  }
}
function CalibracionEquiposFormulario_Conditional_192_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 51);
    \u0275\u0275text(1, "Ingrese lecturas y tolerancia para evaluar");
    \u0275\u0275elementEnd();
  }
}
function CalibracionEquiposFormulario_For_206_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 57)(1, "span", 66);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 67)(4, "button", 68);
    \u0275\u0275listener("click", function CalibracionEquiposFormulario_For_206_Template_button_click_4_listener() {
      const item_r6 = \u0275\u0275restoreView(_r5).$implicit;
      const ctx_r6 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r6.toggleChecklist(item_r6));
    });
    \u0275\u0275element(5, "span", 69);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "span", 70);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const item_r6 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", item_r6.label, ":");
    \u0275\u0275advance(2);
    \u0275\u0275classProp("bg-[#1e3a8a]", item_r6.valor)("bg-slate-300", !item_r6.valor);
    \u0275\u0275advance();
    \u0275\u0275classProp("translate-x-4", item_r6.valor)("translate-x-0", !item_r6.valor);
    \u0275\u0275advance();
    \u0275\u0275classProp("text-[#1e3a8a]", item_r6.valor)("text-slate-400", !item_r6.valor);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", item_r6.valor ? "S\xED" : "No", " ");
  }
}
function CalibracionEquiposFormulario_Conditional_222_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 71);
    \u0275\u0275text(1);
  }
  if (rf & 2) {
    const ctx_r6 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r6.modoEdicion ? "Actualizando..." : "Registrando...", " ");
  }
}
function CalibracionEquiposFormulario_Conditional_223_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
  }
  if (rf & 2) {
    const ctx_r6 = \u0275\u0275nextContext();
    \u0275\u0275textInterpolate1(" ", ctx_r6.modoEdicion ? "ACTUALIZAR" : "REGISTRAR", " ");
  }
}
var OPCIONES_EQUIPO_STUB = [
  { id: "EQ-001", codigo: "SN-001", nombre: "Son\xF3metro SVANTEK SV 971A", ultima_calibracion: "2024-11-27" },
  { id: "EQ-002", codigo: "SN-002", nombre: "Son\xF3metro Br\xFCel & Kj\xE6r 2250", ultima_calibracion: "2024-11-28" }
];
var OPCIONES_CALIBRADOR_STUB = [
  { id: "CA-001", codigo: "CAL-001", nombre: "Calibrador Br\xFCel & Kj\xE6r 4231", ultima_calibracion: "2024-11-28" },
  { id: "CA-002", codigo: "CAL-002", nombre: "Calibrador G.R.A.S. 42AB", ultima_calibracion: "2024-11-29" }
];
var OPCIONES_PATRON_STUB = [
  { id: "PL-001", codigo: "PL-001", nombre: "Patr\xF3n de Laboratorio CESVA SC310", ultima_calibracion: "2024-11-28" }
];
var OPCIONES_ESTACION_STUB = [
  { id: "ME-001", codigo: "ME-001", nombre: "Estaci\xF3n Davis Vantage Pro2", ultima_calibracion: "2024-10-15" }
];
var CalibracionEquiposFormulario = class _CalibracionEquiposFormulario {
  editingRecord = null;
  guardado = new EventEmitter();
  cancelado = new EventEmitter();
  authService = inject(AuthService);
  toastrAlert = inject(ToastrAlertService);
  destroy$ = new Subject();
  saving = false;
  nombreAnalista = computed(() => this.authService.userProfile()?.name ?? "\u2014", ...ngDevMode ? [{ debugName: "nombreAnalista" }] : []);
  // Fecha verificación
  fechaVerificacion = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
  // Opciones de catálogos (stubs para el modelo)
  opcionesSonometro = OPCIONES_EQUIPO_STUB;
  opcionesCalibrador = OPCIONES_CALIBRADOR_STUB;
  opcionesPatron = OPCIONES_PATRON_STUB;
  opcionesEstacion = OPCIONES_ESTACION_STUB;
  // Selecciones de códigos
  codigoSonometroId = null;
  codigoCalibradorId = null;
  codigoPatronId = null;
  codigoEstacionId = null;
  // Lecturas
  lecturaPC = "";
  lecturaPL = "";
  toleranciaPatron = "";
  // Checklist
  checklist = [
    { key: "bateria_aa_sonometro", label: "4 Bater\xEDas AA adicionales para Son\xF3metro", valor: false },
    { key: "bateria_aaa_pistofono", label: "2 Bater\xEDas AAA adicionales para Pist\xF3fono", valor: false },
    { key: "bateria_aaa_estacion", label: "2 Bater\xEDas AAA adicionales para Estaci\xF3n Meteorol\xF3gica", valor: false },
    { key: "cargador_baterias", label: "Cargador para bater\xEDas AA y AAA", valor: false },
    { key: "gps", label: "GPS", valor: false },
    { key: "tripode_sonometro", label: "Tr\xEDpode para Son\xF3metro", valor: false },
    { key: "tripode_estacion", label: "Tr\xEDpode para Estaci\xF3n Meteorol\xF3gica", valor: false },
    { key: "procesador_formato", label: "Procesador con formato F-PEE-11-01 (Laptop, celular o ...)", valor: false }
  ];
  observaciones = "";
  get modoEdicion() {
    return !!this.editingRecord;
  }
  // Computados de aseguramiento
  get errorPC() {
    const lectura = parseFloat(this.lecturaPC);
    if (isNaN(lectura))
      return "\u2014";
    return Math.abs(lectura - 114).toFixed(1) + " DB";
  }
  get errorPL() {
    const lectura = parseFloat(this.lecturaPL);
    if (isNaN(lectura))
      return "\u2014";
    return Math.abs(lectura - 114).toFixed(1) + " DB";
  }
  get evaluacion() {
    const tolerancia = parseFloat(this.toleranciaPatron);
    const lecPC = parseFloat(this.lecturaPC);
    const lecPL = parseFloat(this.lecturaPL);
    if (isNaN(tolerancia) || isNaN(lecPC) || isNaN(lecPL))
      return null;
    const errPC = Math.abs(lecPC - 114);
    const errPL = Math.abs(lecPL - 114);
    return errPC <= tolerancia && errPL <= tolerancia ? "CUMPLE" : "NO CUMPLE";
  }
  get sonometroSeleccionado() {
    return this.opcionesSonometro.find((e) => e.id === this.codigoSonometroId) ?? null;
  }
  get calibradorSeleccionado() {
    return this.opcionesCalibrador.find((e) => e.id === this.codigoCalibradorId) ?? null;
  }
  get patronSeleccionado() {
    return this.opcionesPatron.find((e) => e.id === this.codigoPatronId) ?? null;
  }
  get estacionSeleccionada() {
    return this.opcionesEstacion.find((e) => e.id === this.codigoEstacionId) ?? null;
  }
  ngOnInit() {
    if (this.editingRecord) {
      this.fechaVerificacion = this.editingRecord.fecha_verificacion ?? (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
      this.observaciones = this.editingRecord.observaciones ?? "";
    }
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  toggleChecklist(item) {
    item.valor = !item.valor;
  }
  cargarArchivos() {
  }
  verificar() {
  }
  guardar() {
    if (!this.codigoSonometroId || !this.codigoCalibradorId || !this.codigoPatronId) {
      this.toastrAlert.showError("Complete los c\xF3digos de equipos requeridos.", "Campos requeridos");
      return;
    }
    this.saving = true;
    setTimeout(() => {
      this.saving = false;
      this.toastrAlert.showSuccess(this.modoEdicion ? "Registro actualizado correctamente." : "Registro guardado correctamente.", this.modoEdicion ? "\xA1Actualizado!" : "\xA1Guardado!");
      this.guardado.emit();
    }, 800);
  }
  formatFecha(fecha) {
    if (!fecha)
      return "\u2014";
    const [y, m, d] = fecha.split("-");
    return `${d}/${m}/${y}`;
  }
  static \u0275fac = function CalibracionEquiposFormulario_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CalibracionEquiposFormulario)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _CalibracionEquiposFormulario, selectors: [["app-calibracion-equipos-formulario"]], inputs: { editingRecord: "editingRecord" }, outputs: { guardado: "guardado", cancelado: "cancelado" }, decls: 224, vars: 99, consts: [[1, "bg-white", "rounded-lg", "shadow-sm", "border", "border-slate-200", "p-8"], [1, "border", "border-slate-200", "rounded-sm", "overflow-hidden", "shadow-sm", "mb-6"], [1, "bg-[#f0f4ff]", "border-b", "border-slate-200", "px-5", "py-3"], [1, "font-bold", "text-[#1e3a8a]", "text-xs", "uppercase", "tracking-wider"], [1, "p-5", "grid", "grid-cols-1", "md:grid-cols-2", "gap-4"], [1, "flex", "items-center", "gap-3", "border", "border-slate-200", "rounded", "p-3", "bg-slate-50"], [1, "flex-shrink-0", "w-8", "h-8", "rounded-full", "bg-[#1e3a8a]", "flex", "items-center", "justify-center"], ["fill", "none", "viewBox", "0 0 24 24", "stroke", "currentColor", 1, "w-4", "h-4", "text-white"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"], [1, "text-[10px]", "font-bold", "text-[#1e3a8a]", "uppercase", "tracking-wider"], [1, "text-sm", "font-semibold", "text-slate-700"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"], [1, "flex-1"], ["type", "date", 1, "mt-0.5", "text-sm", "font-semibold", "text-slate-700", "border-none", "bg-transparent", "outline-none", "w-full", 3, "ngModelChange", "ngModel"], [1, "bg-[#f8fafc]", "border-b", "border-slate-200", "px-5", "py-3"], [1, "p-5", "grid", "grid-cols-1", "md:grid-cols-2", "gap-5"], [1, "flex", "flex-col"], [1, "flex", "items-center", "gap-2", "mb-1.5"], [1, "w-6", "h-6", "rounded", "bg-slate-100", "flex", "items-center", "justify-center", "flex-shrink-0"], ["fill", "none", "viewBox", "0 0 24 24", "stroke", "currentColor", 1, "w-3.5", "h-3.5", "text-slate-600"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"], [1, "text-[11px]", "font-bold", "text-[#1e3a8a]", "uppercase"], [1, "text-red-500"], [1, "w-full", "border", "border-slate-300", "bg-white", "text-slate-700", "p-2.5", "rounded", "text-sm", "outline-none", "focus:border-[#1e3a8a]", "transition-colors", 3, "ngModelChange", "ngModel"], ["disabled", "", 3, "ngValue"], [3, "ngValue"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M15.536 8.464a5 5 0 010 7.072M12 18.36a9 9 0 010-12.72M8.464 15.536a5 5 0 010-7.072"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"], [1, "p-5"], [1, "text-[11px]", "font-bold", "text-slate-500", "uppercase", "tracking-widest", "mb-3"], [1, "grid", "grid-cols-1", "sm:grid-cols-3", "gap-4", "mb-6"], [1, "border", "border-slate-200", "rounded-lg", "p-4", "flex", "flex-col", "items-center", "gap-2", "bg-white", "shadow-sm"], [1, "w-14", "h-14", "flex", "items-center", "justify-center"], ["fill", "none", "viewBox", "0 0 24 24", "stroke", "currentColor", "stroke-width", "1.5", 1, "w-12", "h-12", "text-[#1e3a8a]"], ["stroke-linecap", "round", "stroke-linejoin", "round", "d", "M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"], [1, "text-xs", "font-bold", "text-[#1e3a8a]", "uppercase", "text-center"], [1, "text-[10px]", "text-slate-400", "uppercase", "tracking-wider"], [1, "text-xs", "font-bold", "px-3", "py-1", "rounded", "border"], ["stroke-linecap", "round", "stroke-linejoin", "round", "d", "M15.536 8.464a5 5 0 010 7.072M12 18.36a9 9 0 010-12.72M8.464 15.536a5 5 0 010-7.072"], ["stroke-linecap", "round", "stroke-linejoin", "round", "d", "M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"], [1, "grid", "grid-cols-1", "sm:grid-cols-3", "gap-4"], [1, "text-[11px]", "font-bold", "text-[#1e3a8a]", "uppercase", "mb-1"], [1, "text-blue-600"], ["type", "number", "placeholder", "ej. 114.5 DB", 1, "w-full", "border", "border-slate-300", "bg-white", "text-slate-700", "p-2.5", "rounded", "text-sm", "outline-none", "focus:border-[#1e3a8a]", "transition-colors", 3, "ngModelChange", "ngModel"], ["type", "number", "placeholder", "ej. 114.2 DB", 1, "w-full", "border", "border-slate-300", "bg-white", "text-slate-700", "p-2.5", "rounded", "text-sm", "outline-none", "focus:border-[#1e3a8a]", "transition-colors", 3, "ngModelChange", "ngModel"], [1, "w-full", "border", "border-slate-200", "bg-slate-50", "text-slate-600", "p-2.5", "rounded", "text-sm", "font-semibold"], ["type", "number", "placeholder", "Ingrese mediciones", 1, "w-full", "border", "border-slate-300", "bg-white", "text-slate-700", "p-2.5", "rounded", "text-sm", "outline-none", "focus:border-[#1e3a8a]", "transition-colors", 3, "ngModelChange", "ngModel"], [1, "flex", "items-center", "gap-2", "p-2.5"], [1, "text-sm", "font-bold", "text-green-700", "px-3", "py-1", "rounded", "border", "border-green-400", "bg-green-50", "flex", "items-center", "gap-1.5"], [1, "text-sm", "font-bold", "text-red-600", "px-3", "py-1", "rounded", "border", "border-red-300", "bg-red-50", "flex", "items-center", "gap-1.5"], [1, "text-sm", "text-slate-400", "italic"], [1, "md:col-span-2", "flex", "items-center", "gap-3", "pt-2"], ["type", "button", 1, "border", "border-slate-300", "text-slate-600", "px-5", "py-2", "rounded", "text-sm", "font-bold", "hover:bg-slate-50", "transition-all", "flex", "items-center", "gap-2", 3, "click"], ["fill", "none", "viewBox", "0 0 24 24", "stroke", "currentColor", 1, "w-4", "h-4"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"], ["type", "button", 1, "bg-[#16a34a]", "text-white", "px-5", "py-2", "rounded", "text-sm", "font-bold", "shadow-sm", "hover:bg-[#15803d]", "transition-all", 3, "click"], [1, "flex", "items-center", "justify-between", "gap-3"], [1, "text-slate-400", "font-normal", "normal-case"], ["maxlength", "350", "placeholder", "ej. PC no cumple con criterio", 1, "w-full", "border", "border-slate-300", "rounded", "p-3", "text-sm", "resize-none", "outline-none", "focus:border-[#1e3a8a]", "bg-white", "text-slate-700", 3, "ngModelChange", "ngModel", "rows"], [1, "text-right", "text-[10px]", "text-slate-400", "mt-1"], [1, "flex", "items-center", "gap-3", "pt-4", "border-t", "border-slate-300"], ["type", "button", 1, "border", "border-slate-300", "text-slate-600", "px-6", "py-2.5", "rounded", "text-sm", "font-bold", "hover:bg-slate-50", "transition-all", 3, "click"], ["type", "button", 1, "bg-[#1e3a8a]", "text-white", "px-8", "py-2.5", "rounded", "text-sm", "font-bold", "shadow-md", "hover:bg-[#2541b2]", "transition-all", "disabled:opacity-60", "disabled:cursor-not-allowed", "flex", "items-center", "gap-2", 3, "click", "disabled"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2.5", "d", "M5 13l4 4L19 7"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2.5", "d", "M6 18L18 6M6 6l12 12"], [1, "text-xs", "text-slate-700", "leading-tight"], [1, "flex", "items-center", "gap-1.5", "flex-shrink-0"], ["type", "button", 1, "relative", "inline-flex", "h-5", "w-9", "items-center", "rounded-full", "transition-colors", "focus:outline-none", 3, "click"], [1, "inline-block", "h-3.5", "w-3.5", "transform", "rounded-full", "bg-white", "shadow", "transition-transform"], [1, "text-[11px]", "font-bold", "w-5"], [1, "animate-spin", "h-4", "w-4", "border-2", "border-white", "border-t-transparent", "rounded-full"]], template: function CalibracionEquiposFormulario_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "section", 1)(2, "div", 2)(3, "h4", 3);
      \u0275\u0275text(4, "Informaci\xF3n de Verificaci\xF3n:");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(5, "div", 4)(6, "div", 5)(7, "div", 6);
      \u0275\u0275namespaceSVG();
      \u0275\u0275elementStart(8, "svg", 7);
      \u0275\u0275element(9, "path", 8);
      \u0275\u0275elementEnd()();
      \u0275\u0275namespaceHTML();
      \u0275\u0275elementStart(10, "div")(11, "p", 9);
      \u0275\u0275text(12, "Nombre del Analista");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(13, "p", 10);
      \u0275\u0275text(14);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(15, "div", 5)(16, "div", 6);
      \u0275\u0275namespaceSVG();
      \u0275\u0275elementStart(17, "svg", 7);
      \u0275\u0275element(18, "path", 11);
      \u0275\u0275elementEnd()();
      \u0275\u0275namespaceHTML();
      \u0275\u0275elementStart(19, "div", 12)(20, "p", 9);
      \u0275\u0275text(21, "Fecha de Verificaci\xF3n");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(22, "input", 13);
      \u0275\u0275twoWayListener("ngModelChange", function CalibracionEquiposFormulario_Template_input_ngModelChange_22_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.fechaVerificacion, $event) || (ctx.fechaVerificacion = $event);
        return $event;
      });
      \u0275\u0275elementEnd()()()()();
      \u0275\u0275elementStart(23, "section", 1)(24, "div", 14)(25, "h4", 3);
      \u0275\u0275text(26, "C\xF3digos de Equipos e Instrumentos de Monitoreo");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(27, "div", 15)(28, "div", 16)(29, "div", 17)(30, "div", 18);
      \u0275\u0275namespaceSVG();
      \u0275\u0275elementStart(31, "svg", 19);
      \u0275\u0275element(32, "path", 20);
      \u0275\u0275elementEnd()();
      \u0275\u0275namespaceHTML();
      \u0275\u0275elementStart(33, "label", 21);
      \u0275\u0275text(34, "C\xF3digo del Son\xF3metro ");
      \u0275\u0275elementStart(35, "span", 22);
      \u0275\u0275text(36, "*");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(37, "select", 23);
      \u0275\u0275twoWayListener("ngModelChange", function CalibracionEquiposFormulario_Template_select_ngModelChange_37_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.codigoSonometroId, $event) || (ctx.codigoSonometroId = $event);
        return $event;
      });
      \u0275\u0275elementStart(38, "option", 24);
      \u0275\u0275text(39, "Selecciona el tipo de equipo");
      \u0275\u0275elementEnd();
      \u0275\u0275repeaterCreate(40, CalibracionEquiposFormulario_For_41_Template, 2, 3, "option", 25, _forTrack02);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(42, "div", 16)(43, "div", 17)(44, "div", 18);
      \u0275\u0275namespaceSVG();
      \u0275\u0275elementStart(45, "svg", 19);
      \u0275\u0275element(46, "path", 26);
      \u0275\u0275elementEnd()();
      \u0275\u0275namespaceHTML();
      \u0275\u0275elementStart(47, "label", 21);
      \u0275\u0275text(48, "C\xF3digo del Calibrador Ac\xFAstico de Campo (PC) ");
      \u0275\u0275elementStart(49, "span", 22);
      \u0275\u0275text(50, "*");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(51, "select", 23);
      \u0275\u0275twoWayListener("ngModelChange", function CalibracionEquiposFormulario_Template_select_ngModelChange_51_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.codigoCalibradorId, $event) || (ctx.codigoCalibradorId = $event);
        return $event;
      });
      \u0275\u0275elementStart(52, "option", 24);
      \u0275\u0275text(53, "Selecciona el tipo de equipo");
      \u0275\u0275elementEnd();
      \u0275\u0275repeaterCreate(54, CalibracionEquiposFormulario_For_55_Template, 2, 3, "option", 25, _forTrack02);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(56, "div", 16)(57, "div", 17)(58, "div", 18);
      \u0275\u0275namespaceSVG();
      \u0275\u0275elementStart(59, "svg", 19);
      \u0275\u0275element(60, "path", 27);
      \u0275\u0275elementEnd()();
      \u0275\u0275namespaceHTML();
      \u0275\u0275elementStart(61, "label", 21);
      \u0275\u0275text(62, "C\xF3digo del Patr\xF3n de Laboratorio (PL) ");
      \u0275\u0275elementStart(63, "span", 22);
      \u0275\u0275text(64, "*");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(65, "select", 23);
      \u0275\u0275twoWayListener("ngModelChange", function CalibracionEquiposFormulario_Template_select_ngModelChange_65_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.codigoPatronId, $event) || (ctx.codigoPatronId = $event);
        return $event;
      });
      \u0275\u0275elementStart(66, "option", 24);
      \u0275\u0275text(67, "Selecciona el tipo de equipo");
      \u0275\u0275elementEnd();
      \u0275\u0275repeaterCreate(68, CalibracionEquiposFormulario_For_69_Template, 2, 3, "option", 25, _forTrack02);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(70, "div", 16)(71, "div", 17)(72, "div", 18);
      \u0275\u0275namespaceSVG();
      \u0275\u0275elementStart(73, "svg", 19);
      \u0275\u0275element(74, "path", 28);
      \u0275\u0275elementEnd()();
      \u0275\u0275namespaceHTML();
      \u0275\u0275elementStart(75, "label", 21);
      \u0275\u0275text(76, "C\xF3digo de la Estaci\xF3n Meteorol\xF3gica");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(77, "select", 23);
      \u0275\u0275twoWayListener("ngModelChange", function CalibracionEquiposFormulario_Template_select_ngModelChange_77_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.codigoEstacionId, $event) || (ctx.codigoEstacionId = $event);
        return $event;
      });
      \u0275\u0275elementStart(78, "option", 24);
      \u0275\u0275text(79, "Selecciona el tipo de equipo");
      \u0275\u0275elementEnd();
      \u0275\u0275repeaterCreate(80, CalibracionEquiposFormulario_For_81_Template, 2, 3, "option", 25, _forTrack02);
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(82, "section", 1)(83, "div", 14)(84, "h4", 3);
      \u0275\u0275text(85, "Detalles de Fechas de los Equipos");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(86, "div", 29)(87, "p", 30);
      \u0275\u0275text(88, "Ac\xFAsticos");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(89, "div", 31)(90, "div", 32)(91, "div", 33);
      \u0275\u0275namespaceSVG();
      \u0275\u0275elementStart(92, "svg", 34);
      \u0275\u0275element(93, "path", 35);
      \u0275\u0275elementEnd()();
      \u0275\u0275namespaceHTML();
      \u0275\u0275elementStart(94, "p", 36);
      \u0275\u0275text(95, "Son\xF3metro");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(96, "p", 37);
      \u0275\u0275text(97, "\xDAltima Calibraci\xF3n");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(98, "span", 38);
      \u0275\u0275text(99);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(100, "div", 32)(101, "div", 33);
      \u0275\u0275namespaceSVG();
      \u0275\u0275elementStart(102, "svg", 34);
      \u0275\u0275element(103, "path", 39);
      \u0275\u0275elementEnd()();
      \u0275\u0275namespaceHTML();
      \u0275\u0275elementStart(104, "p", 36);
      \u0275\u0275text(105, "Calibrador Ac\xFAstico de Campo");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(106, "p", 37);
      \u0275\u0275text(107, "\xDAltima Calibraci\xF3n");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(108, "span", 38);
      \u0275\u0275text(109);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(110, "div", 32)(111, "div", 33);
      \u0275\u0275namespaceSVG();
      \u0275\u0275elementStart(112, "svg", 34);
      \u0275\u0275element(113, "path", 40);
      \u0275\u0275elementEnd()();
      \u0275\u0275namespaceHTML();
      \u0275\u0275elementStart(114, "p", 36);
      \u0275\u0275text(115, "Patr\xF3n de Laboratorio");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(116, "p", 37);
      \u0275\u0275text(117, "\xDAltima Calibraci\xF3n");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(118, "span", 38);
      \u0275\u0275text(119);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(120, "p", 30);
      \u0275\u0275text(121, "Ambientales");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(122, "div", 41)(123, "div", 32)(124, "div", 33);
      \u0275\u0275namespaceSVG();
      \u0275\u0275elementStart(125, "svg", 34);
      \u0275\u0275element(126, "path", 35);
      \u0275\u0275elementEnd()();
      \u0275\u0275namespaceHTML();
      \u0275\u0275elementStart(127, "p", 36);
      \u0275\u0275text(128, "Son\xF3metro");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(129, "p", 37);
      \u0275\u0275text(130, "\xDAltima Calibraci\xF3n");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(131, "span", 38);
      \u0275\u0275text(132);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(133, "div", 32)(134, "div", 33);
      \u0275\u0275namespaceSVG();
      \u0275\u0275elementStart(135, "svg", 34);
      \u0275\u0275element(136, "path", 39);
      \u0275\u0275elementEnd()();
      \u0275\u0275namespaceHTML();
      \u0275\u0275elementStart(137, "p", 36);
      \u0275\u0275text(138, "Calibrador Ac\xFAstico de Campo");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(139, "p", 37);
      \u0275\u0275text(140, "\xDAltima Calibraci\xF3n");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(141, "span", 38);
      \u0275\u0275text(142);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(143, "div", 32)(144, "div", 33);
      \u0275\u0275namespaceSVG();
      \u0275\u0275elementStart(145, "svg", 34);
      \u0275\u0275element(146, "path", 40);
      \u0275\u0275elementEnd()();
      \u0275\u0275namespaceHTML();
      \u0275\u0275elementStart(147, "p", 36);
      \u0275\u0275text(148, "Patr\xF3n de Laboratorio");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(149, "p", 37);
      \u0275\u0275text(150, "\xDAltima Calibraci\xF3n");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(151, "span", 38);
      \u0275\u0275text(152);
      \u0275\u0275elementEnd()()()()();
      \u0275\u0275elementStart(153, "section", 1)(154, "div", 14)(155, "h4", 3);
      \u0275\u0275text(156, "Aseguramiento de la Validez de Resultados");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(157, "div", 15)(158, "div", 16)(159, "label", 42);
      \u0275\u0275text(160, " Lectura Observada en Son\xF3metro (IS 5) ");
      \u0275\u0275elementStart(161, "span", 43);
      \u0275\u0275text(162, "PC");
      \u0275\u0275elementEnd();
      \u0275\u0275text(163, " Nivel 114 DB: ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(164, "input", 44);
      \u0275\u0275twoWayListener("ngModelChange", function CalibracionEquiposFormulario_Template_input_ngModelChange_164_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.lecturaPC, $event) || (ctx.lecturaPC = $event);
        return $event;
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(165, "div", 16)(166, "label", 42);
      \u0275\u0275text(167, " Lectura Observada en Son\xF3metro (IS 5) ");
      \u0275\u0275elementStart(168, "span", 43);
      \u0275\u0275text(169, "PL");
      \u0275\u0275elementEnd();
      \u0275\u0275text(170, " Nivel 114 DB: ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(171, "input", 45);
      \u0275\u0275twoWayListener("ngModelChange", function CalibracionEquiposFormulario_Template_input_ngModelChange_171_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.lecturaPL, $event) || (ctx.lecturaPL = $event);
        return $event;
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(172, "div", 16)(173, "label", 42);
      \u0275\u0275text(174, "Error PC Nivel 114 DB:");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(175, "div", 46);
      \u0275\u0275text(176);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(177, "div", 16)(178, "label", 42);
      \u0275\u0275text(179, "Error PL Nivel 114 DB:");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(180, "div", 46);
      \u0275\u0275text(181);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(182, "div", 16)(183, "label", 42);
      \u0275\u0275text(184, "Tolerancia del Patr\xF3n de Laboratorio, DB");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(185, "input", 47);
      \u0275\u0275twoWayListener("ngModelChange", function CalibracionEquiposFormulario_Template_input_ngModelChange_185_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.toleranciaPatron, $event) || (ctx.toleranciaPatron = $event);
        return $event;
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(186, "div", 16)(187, "label", 42);
      \u0275\u0275text(188, "Evaluaci\xF3n:");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(189, "div", 48);
      \u0275\u0275conditionalCreate(190, CalibracionEquiposFormulario_Conditional_190_Template, 4, 0, "span", 49)(191, CalibracionEquiposFormulario_Conditional_191_Template, 4, 0, "span", 50)(192, CalibracionEquiposFormulario_Conditional_192_Template, 2, 0, "span", 51);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(193, "div", 52)(194, "button", 53);
      \u0275\u0275listener("click", function CalibracionEquiposFormulario_Template_button_click_194_listener() {
        return ctx.cargarArchivos();
      });
      \u0275\u0275namespaceSVG();
      \u0275\u0275elementStart(195, "svg", 54);
      \u0275\u0275element(196, "path", 55);
      \u0275\u0275elementEnd();
      \u0275\u0275text(197, " Cargar Archivos ");
      \u0275\u0275elementEnd();
      \u0275\u0275namespaceHTML();
      \u0275\u0275elementStart(198, "button", 56);
      \u0275\u0275listener("click", function CalibracionEquiposFormulario_Template_button_click_198_listener() {
        return ctx.verificar();
      });
      \u0275\u0275text(199, " Verificar ");
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(200, "section", 1)(201, "div", 14)(202, "h4", 3);
      \u0275\u0275text(203, "Checklist");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(204, "div", 4);
      \u0275\u0275repeaterCreate(205, CalibracionEquiposFormulario_For_206_Template, 8, 14, "div", 57, _forTrack1);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(207, "section", 1)(208, "div", 14)(209, "h4", 3);
      \u0275\u0275text(210, " Observaciones ");
      \u0275\u0275elementStart(211, "span", 58);
      \u0275\u0275text(212, "(opcional)");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(213, "div", 29)(214, "textarea", 59);
      \u0275\u0275twoWayListener("ngModelChange", function CalibracionEquiposFormulario_Template_textarea_ngModelChange_214_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.observaciones, $event) || (ctx.observaciones = $event);
        return $event;
      });
      \u0275\u0275text(215, "      ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(216, "p", 60);
      \u0275\u0275text(217);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(218, "div", 61)(219, "button", 62);
      \u0275\u0275listener("click", function CalibracionEquiposFormulario_Template_button_click_219_listener() {
        return ctx.cancelado.emit();
      });
      \u0275\u0275text(220, " Cancelar ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(221, "button", 63);
      \u0275\u0275listener("click", function CalibracionEquiposFormulario_Template_button_click_221_listener() {
        return ctx.guardar();
      });
      \u0275\u0275conditionalCreate(222, CalibracionEquiposFormulario_Conditional_222_Template, 2, 1)(223, CalibracionEquiposFormulario_Conditional_223_Template, 1, 1);
      \u0275\u0275elementEnd()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(14);
      \u0275\u0275textInterpolate(ctx.nombreAnalista());
      \u0275\u0275advance(8);
      \u0275\u0275twoWayProperty("ngModel", ctx.fechaVerificacion);
      \u0275\u0275advance(15);
      \u0275\u0275twoWayProperty("ngModel", ctx.codigoSonometroId);
      \u0275\u0275advance();
      \u0275\u0275property("ngValue", null);
      \u0275\u0275advance(2);
      \u0275\u0275repeater(ctx.opcionesSonometro);
      \u0275\u0275advance(11);
      \u0275\u0275twoWayProperty("ngModel", ctx.codigoCalibradorId);
      \u0275\u0275advance();
      \u0275\u0275property("ngValue", null);
      \u0275\u0275advance(2);
      \u0275\u0275repeater(ctx.opcionesCalibrador);
      \u0275\u0275advance(11);
      \u0275\u0275twoWayProperty("ngModel", ctx.codigoPatronId);
      \u0275\u0275advance();
      \u0275\u0275property("ngValue", null);
      \u0275\u0275advance(2);
      \u0275\u0275repeater(ctx.opcionesPatron);
      \u0275\u0275advance(9);
      \u0275\u0275twoWayProperty("ngModel", ctx.codigoEstacionId);
      \u0275\u0275advance();
      \u0275\u0275property("ngValue", null);
      \u0275\u0275advance(2);
      \u0275\u0275repeater(ctx.opcionesEstacion);
      \u0275\u0275advance(18);
      \u0275\u0275classProp("border-green-400", ctx.sonometroSeleccionado)("text-green-700", ctx.sonometroSeleccionado)("bg-green-50", ctx.sonometroSeleccionado)("border-slate-300", !ctx.sonometroSeleccionado)("text-slate-400", !ctx.sonometroSeleccionado)("bg-slate-50", !ctx.sonometroSeleccionado);
      \u0275\u0275advance();
      \u0275\u0275textInterpolate1(" ", ctx.sonometroSeleccionado ? ctx.formatFecha(ctx.sonometroSeleccionado.ultima_calibracion) : "\u2014", " ");
      \u0275\u0275advance(9);
      \u0275\u0275classProp("border-green-400", ctx.calibradorSeleccionado)("text-green-700", ctx.calibradorSeleccionado)("bg-green-50", ctx.calibradorSeleccionado)("border-slate-300", !ctx.calibradorSeleccionado)("text-slate-400", !ctx.calibradorSeleccionado)("bg-slate-50", !ctx.calibradorSeleccionado);
      \u0275\u0275advance();
      \u0275\u0275textInterpolate1(" ", ctx.calibradorSeleccionado ? ctx.formatFecha(ctx.calibradorSeleccionado.ultima_calibracion) : "\u2014", " ");
      \u0275\u0275advance(9);
      \u0275\u0275classProp("border-green-400", ctx.patronSeleccionado)("text-green-700", ctx.patronSeleccionado)("bg-green-50", ctx.patronSeleccionado)("border-slate-300", !ctx.patronSeleccionado)("text-slate-400", !ctx.patronSeleccionado)("bg-slate-50", !ctx.patronSeleccionado);
      \u0275\u0275advance();
      \u0275\u0275textInterpolate1(" ", ctx.patronSeleccionado ? ctx.formatFecha(ctx.patronSeleccionado.ultima_calibracion) : "\u2014", " ");
      \u0275\u0275advance(12);
      \u0275\u0275classProp("border-green-400", ctx.sonometroSeleccionado)("text-green-700", ctx.sonometroSeleccionado)("bg-green-50", ctx.sonometroSeleccionado)("border-slate-300", !ctx.sonometroSeleccionado)("text-slate-400", !ctx.sonometroSeleccionado)("bg-slate-50", !ctx.sonometroSeleccionado);
      \u0275\u0275advance();
      \u0275\u0275textInterpolate1(" ", ctx.sonometroSeleccionado ? ctx.formatFecha(ctx.sonometroSeleccionado.ultima_calibracion) : "\u2014", " ");
      \u0275\u0275advance(9);
      \u0275\u0275classProp("border-green-400", ctx.calibradorSeleccionado)("text-green-700", ctx.calibradorSeleccionado)("bg-green-50", ctx.calibradorSeleccionado)("border-slate-300", !ctx.calibradorSeleccionado)("text-slate-400", !ctx.calibradorSeleccionado)("bg-slate-50", !ctx.calibradorSeleccionado);
      \u0275\u0275advance();
      \u0275\u0275textInterpolate1(" ", ctx.calibradorSeleccionado ? ctx.formatFecha(ctx.calibradorSeleccionado.ultima_calibracion) : "\u2014", " ");
      \u0275\u0275advance(9);
      \u0275\u0275classProp("border-green-400", ctx.patronSeleccionado)("text-green-700", ctx.patronSeleccionado)("bg-green-50", ctx.patronSeleccionado)("border-slate-300", !ctx.patronSeleccionado)("text-slate-400", !ctx.patronSeleccionado)("bg-slate-50", !ctx.patronSeleccionado);
      \u0275\u0275advance();
      \u0275\u0275textInterpolate1(" ", ctx.patronSeleccionado ? ctx.formatFecha(ctx.patronSeleccionado.ultima_calibracion) : "\u2014", " ");
      \u0275\u0275advance(12);
      \u0275\u0275twoWayProperty("ngModel", ctx.lecturaPC);
      \u0275\u0275advance(7);
      \u0275\u0275twoWayProperty("ngModel", ctx.lecturaPL);
      \u0275\u0275advance(5);
      \u0275\u0275textInterpolate1(" ", ctx.errorPC, " ");
      \u0275\u0275advance(5);
      \u0275\u0275textInterpolate1(" ", ctx.errorPL, " ");
      \u0275\u0275advance(4);
      \u0275\u0275twoWayProperty("ngModel", ctx.toleranciaPatron);
      \u0275\u0275advance(5);
      \u0275\u0275conditional(ctx.evaluacion === "CUMPLE" ? 190 : ctx.evaluacion === "NO CUMPLE" ? 191 : 192);
      \u0275\u0275advance(15);
      \u0275\u0275repeater(ctx.checklist);
      \u0275\u0275advance(9);
      \u0275\u0275twoWayProperty("ngModel", ctx.observaciones);
      \u0275\u0275property("rows", 3);
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate1("", ctx.observaciones.length, "/350");
      \u0275\u0275advance(4);
      \u0275\u0275property("disabled", ctx.saving);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.saving ? 222 : 223);
    }
  }, dependencies: [CommonModule, FormsModule, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, NumberValueAccessor, SelectControlValueAccessor, NgControlStatus, MaxLengthValidator, NgModel], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CalibracionEquiposFormulario, [{
    type: Component,
    args: [{ selector: "app-calibracion-equipos-formulario", imports: [CommonModule, FormsModule], template: `<div class="bg-white rounded-lg shadow-sm border border-slate-200 p-8">

  <!-- \u2500\u2500\u2500 INFORMACI\xD3N DE VERIFICACI\xD3N \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 -->
  <section class="border border-slate-200 rounded-sm overflow-hidden shadow-sm mb-6">
    <div class="bg-[#f0f4ff] border-b border-slate-200 px-5 py-3">
      <h4 class="font-bold text-[#1e3a8a] text-xs uppercase tracking-wider">Informaci\xF3n de Verificaci\xF3n:</h4>
    </div>
    <div class="p-5 grid grid-cols-1 md:grid-cols-2 gap-4">
      <div class="flex items-center gap-3 border border-slate-200 rounded p-3 bg-slate-50">
        <div class="flex-shrink-0 w-8 h-8 rounded-full bg-[#1e3a8a] flex items-center justify-center">
          <svg class="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </div>
        <div>
          <p class="text-[10px] font-bold text-[#1e3a8a] uppercase tracking-wider">Nombre del Analista</p>
          <p class="text-sm font-semibold text-slate-700">{{ nombreAnalista() }}</p>
        </div>
      </div>
      <div class="flex items-center gap-3 border border-slate-200 rounded p-3 bg-slate-50">
        <div class="flex-shrink-0 w-8 h-8 rounded-full bg-[#1e3a8a] flex items-center justify-center">
          <svg class="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
        <div class="flex-1">
          <p class="text-[10px] font-bold text-[#1e3a8a] uppercase tracking-wider">Fecha de Verificaci\xF3n</p>
          <input
            type="date"
            [(ngModel)]="fechaVerificacion"
            class="mt-0.5 text-sm font-semibold text-slate-700 border-none bg-transparent outline-none w-full"
          />
        </div>
      </div>
    </div>
  </section>

  <!-- \u2500\u2500\u2500 C\xD3DIGOS DE EQUIPOS \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 -->
  <section class="border border-slate-200 rounded-sm overflow-hidden shadow-sm mb-6">
    <div class="bg-[#f8fafc] border-b border-slate-200 px-5 py-3">
      <h4 class="font-bold text-[#1e3a8a] text-xs uppercase tracking-wider">C\xF3digos de Equipos e Instrumentos de Monitoreo</h4>
    </div>
    <div class="p-5 grid grid-cols-1 md:grid-cols-2 gap-5">

      <!-- Son\xF3metro -->
      <div class="flex flex-col">
        <div class="flex items-center gap-2 mb-1.5">
          <div class="w-6 h-6 rounded bg-slate-100 flex items-center justify-center flex-shrink-0">
            <svg class="w-3.5 h-3.5 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
            </svg>
          </div>
          <label class="text-[11px] font-bold text-[#1e3a8a] uppercase">C\xF3digo del Son\xF3metro <span class="text-red-500">*</span></label>
        </div>
        <select
          [(ngModel)]="codigoSonometroId"
          class="w-full border border-slate-300 bg-white text-slate-700 p-2.5 rounded text-sm outline-none focus:border-[#1e3a8a] transition-colors">
          <option [ngValue]="null" disabled>Selecciona el tipo de equipo</option>
          @for (eq of opcionesSonometro; track eq.id) {
            <option [ngValue]="eq.id">{{ eq.codigo }} \u2014 {{ eq.nombre }}</option>
          }
        </select>
      </div>

      <!-- Calibrador Ac\xFAstico de Campo (PC) -->
      <div class="flex flex-col">
        <div class="flex items-center gap-2 mb-1.5">
          <div class="w-6 h-6 rounded bg-slate-100 flex items-center justify-center flex-shrink-0">
            <svg class="w-3.5 h-3.5 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072M12 18.36a9 9 0 010-12.72M8.464 15.536a5 5 0 010-7.072" />
            </svg>
          </div>
          <label class="text-[11px] font-bold text-[#1e3a8a] uppercase">C\xF3digo del Calibrador Ac\xFAstico de Campo (PC) <span class="text-red-500">*</span></label>
        </div>
        <select
          [(ngModel)]="codigoCalibradorId"
          class="w-full border border-slate-300 bg-white text-slate-700 p-2.5 rounded text-sm outline-none focus:border-[#1e3a8a] transition-colors">
          <option [ngValue]="null" disabled>Selecciona el tipo de equipo</option>
          @for (eq of opcionesCalibrador; track eq.id) {
            <option [ngValue]="eq.id">{{ eq.codigo }} \u2014 {{ eq.nombre }}</option>
          }
        </select>
      </div>

      <!-- Patr\xF3n de Laboratorio (PL) -->
      <div class="flex flex-col">
        <div class="flex items-center gap-2 mb-1.5">
          <div class="w-6 h-6 rounded bg-slate-100 flex items-center justify-center flex-shrink-0">
            <svg class="w-3.5 h-3.5 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
            </svg>
          </div>
          <label class="text-[11px] font-bold text-[#1e3a8a] uppercase">C\xF3digo del Patr\xF3n de Laboratorio (PL) <span class="text-red-500">*</span></label>
        </div>
        <select
          [(ngModel)]="codigoPatronId"
          class="w-full border border-slate-300 bg-white text-slate-700 p-2.5 rounded text-sm outline-none focus:border-[#1e3a8a] transition-colors">
          <option [ngValue]="null" disabled>Selecciona el tipo de equipo</option>
          @for (eq of opcionesPatron; track eq.id) {
            <option [ngValue]="eq.id">{{ eq.codigo }} \u2014 {{ eq.nombre }}</option>
          }
        </select>
      </div>

      <!-- Estaci\xF3n Meteorol\xF3gica -->
      <div class="flex flex-col">
        <div class="flex items-center gap-2 mb-1.5">
          <div class="w-6 h-6 rounded bg-slate-100 flex items-center justify-center flex-shrink-0">
            <svg class="w-3.5 h-3.5 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
            </svg>
          </div>
          <label class="text-[11px] font-bold text-[#1e3a8a] uppercase">C\xF3digo de la Estaci\xF3n Meteorol\xF3gica</label>
        </div>
        <select
          [(ngModel)]="codigoEstacionId"
          class="w-full border border-slate-300 bg-white text-slate-700 p-2.5 rounded text-sm outline-none focus:border-[#1e3a8a] transition-colors">
          <option [ngValue]="null" disabled>Selecciona el tipo de equipo</option>
          @for (eq of opcionesEstacion; track eq.id) {
            <option [ngValue]="eq.id">{{ eq.codigo }} \u2014 {{ eq.nombre }}</option>
          }
        </select>
      </div>

    </div>
  </section>

  <!-- \u2500\u2500\u2500 DETALLES DE FECHAS \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 -->
  <section class="border border-slate-200 rounded-sm overflow-hidden shadow-sm mb-6">
    <div class="bg-[#f8fafc] border-b border-slate-200 px-5 py-3">
      <h4 class="font-bold text-[#1e3a8a] text-xs uppercase tracking-wider">Detalles de Fechas de los Equipos</h4>
    </div>
    <div class="p-5">

      <!-- AC\xDASTICOS -->
      <p class="text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-3">Ac\xFAsticos</p>
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">

        <!-- Card Son\xF3metro -->
        <div class="border border-slate-200 rounded-lg p-4 flex flex-col items-center gap-2 bg-white shadow-sm">
          <div class="w-14 h-14 flex items-center justify-center">
            <svg class="w-12 h-12 text-[#1e3a8a]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
            </svg>
          </div>
          <p class="text-xs font-bold text-[#1e3a8a] uppercase text-center">Son\xF3metro</p>
          <p class="text-[10px] text-slate-400 uppercase tracking-wider">\xDAltima Calibraci\xF3n</p>
          <span class="text-xs font-bold px-3 py-1 rounded border"
            [class.border-green-400]="sonometroSeleccionado"
            [class.text-green-700]="sonometroSeleccionado"
            [class.bg-green-50]="sonometroSeleccionado"
            [class.border-slate-300]="!sonometroSeleccionado"
            [class.text-slate-400]="!sonometroSeleccionado"
            [class.bg-slate-50]="!sonometroSeleccionado">
            {{ sonometroSeleccionado ? formatFecha(sonometroSeleccionado.ultima_calibracion) : '\u2014' }}
          </span>
        </div>

        <!-- Card Calibrador Ac\xFAstico de Campo -->
        <div class="border border-slate-200 rounded-lg p-4 flex flex-col items-center gap-2 bg-white shadow-sm">
          <div class="w-14 h-14 flex items-center justify-center">
            <svg class="w-12 h-12 text-[#1e3a8a]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15.536 8.464a5 5 0 010 7.072M12 18.36a9 9 0 010-12.72M8.464 15.536a5 5 0 010-7.072" />
            </svg>
          </div>
          <p class="text-xs font-bold text-[#1e3a8a] uppercase text-center">Calibrador Ac\xFAstico de Campo</p>
          <p class="text-[10px] text-slate-400 uppercase tracking-wider">\xDAltima Calibraci\xF3n</p>
          <span class="text-xs font-bold px-3 py-1 rounded border"
            [class.border-green-400]="calibradorSeleccionado"
            [class.text-green-700]="calibradorSeleccionado"
            [class.bg-green-50]="calibradorSeleccionado"
            [class.border-slate-300]="!calibradorSeleccionado"
            [class.text-slate-400]="!calibradorSeleccionado"
            [class.bg-slate-50]="!calibradorSeleccionado">
            {{ calibradorSeleccionado ? formatFecha(calibradorSeleccionado.ultima_calibracion) : '\u2014' }}
          </span>
        </div>

        <!-- Card Patr\xF3n de Laboratorio -->
        <div class="border border-slate-200 rounded-lg p-4 flex flex-col items-center gap-2 bg-white shadow-sm">
          <div class="w-14 h-14 flex items-center justify-center">
            <svg class="w-12 h-12 text-[#1e3a8a]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
            </svg>
          </div>
          <p class="text-xs font-bold text-[#1e3a8a] uppercase text-center">Patr\xF3n de Laboratorio</p>
          <p class="text-[10px] text-slate-400 uppercase tracking-wider">\xDAltima Calibraci\xF3n</p>
          <span class="text-xs font-bold px-3 py-1 rounded border"
            [class.border-green-400]="patronSeleccionado"
            [class.text-green-700]="patronSeleccionado"
            [class.bg-green-50]="patronSeleccionado"
            [class.border-slate-300]="!patronSeleccionado"
            [class.text-slate-400]="!patronSeleccionado"
            [class.bg-slate-50]="!patronSeleccionado">
            {{ patronSeleccionado ? formatFecha(patronSeleccionado.ultima_calibracion) : '\u2014' }}
          </span>
        </div>

      </div>

      <!-- AMBIENTALES -->
      <p class="text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-3">Ambientales</p>
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">

        <!-- Card Son\xF3metro Ambiental -->
        <div class="border border-slate-200 rounded-lg p-4 flex flex-col items-center gap-2 bg-white shadow-sm">
          <div class="w-14 h-14 flex items-center justify-center">
            <svg class="w-12 h-12 text-[#1e3a8a]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
            </svg>
          </div>
          <p class="text-xs font-bold text-[#1e3a8a] uppercase text-center">Son\xF3metro</p>
          <p class="text-[10px] text-slate-400 uppercase tracking-wider">\xDAltima Calibraci\xF3n</p>
          <span class="text-xs font-bold px-3 py-1 rounded border"
            [class.border-green-400]="sonometroSeleccionado"
            [class.text-green-700]="sonometroSeleccionado"
            [class.bg-green-50]="sonometroSeleccionado"
            [class.border-slate-300]="!sonometroSeleccionado"
            [class.text-slate-400]="!sonometroSeleccionado"
            [class.bg-slate-50]="!sonometroSeleccionado">
            {{ sonometroSeleccionado ? formatFecha(sonometroSeleccionado.ultima_calibracion) : '\u2014' }}
          </span>
        </div>

        <!-- Card Calibrador Ambiental -->
        <div class="border border-slate-200 rounded-lg p-4 flex flex-col items-center gap-2 bg-white shadow-sm">
          <div class="w-14 h-14 flex items-center justify-center">
            <svg class="w-12 h-12 text-[#1e3a8a]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15.536 8.464a5 5 0 010 7.072M12 18.36a9 9 0 010-12.72M8.464 15.536a5 5 0 010-7.072" />
            </svg>
          </div>
          <p class="text-xs font-bold text-[#1e3a8a] uppercase text-center">Calibrador Ac\xFAstico de Campo</p>
          <p class="text-[10px] text-slate-400 uppercase tracking-wider">\xDAltima Calibraci\xF3n</p>
          <span class="text-xs font-bold px-3 py-1 rounded border"
            [class.border-green-400]="calibradorSeleccionado"
            [class.text-green-700]="calibradorSeleccionado"
            [class.bg-green-50]="calibradorSeleccionado"
            [class.border-slate-300]="!calibradorSeleccionado"
            [class.text-slate-400]="!calibradorSeleccionado"
            [class.bg-slate-50]="!calibradorSeleccionado">
            {{ calibradorSeleccionado ? formatFecha(calibradorSeleccionado.ultima_calibracion) : '\u2014' }}
          </span>
        </div>

        <!-- Card Patr\xF3n Ambiental -->
        <div class="border border-slate-200 rounded-lg p-4 flex flex-col items-center gap-2 bg-white shadow-sm">
          <div class="w-14 h-14 flex items-center justify-center">
            <svg class="w-12 h-12 text-[#1e3a8a]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
            </svg>
          </div>
          <p class="text-xs font-bold text-[#1e3a8a] uppercase text-center">Patr\xF3n de Laboratorio</p>
          <p class="text-[10px] text-slate-400 uppercase tracking-wider">\xDAltima Calibraci\xF3n</p>
          <span class="text-xs font-bold px-3 py-1 rounded border"
            [class.border-green-400]="patronSeleccionado"
            [class.text-green-700]="patronSeleccionado"
            [class.bg-green-50]="patronSeleccionado"
            [class.border-slate-300]="!patronSeleccionado"
            [class.text-slate-400]="!patronSeleccionado"
            [class.bg-slate-50]="!patronSeleccionado">
            {{ patronSeleccionado ? formatFecha(patronSeleccionado.ultima_calibracion) : '\u2014' }}
          </span>
        </div>

      </div>
    </div>
  </section>

  <!-- \u2500\u2500\u2500 ASEGURAMIENTO DE LA VALIDEZ DE RESULTADOS \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 -->
  <section class="border border-slate-200 rounded-sm overflow-hidden shadow-sm mb-6">
    <div class="bg-[#f8fafc] border-b border-slate-200 px-5 py-3">
      <h4 class="font-bold text-[#1e3a8a] text-xs uppercase tracking-wider">Aseguramiento de la Validez de Resultados</h4>
    </div>
    <div class="p-5 grid grid-cols-1 md:grid-cols-2 gap-5">

      <!-- Lectura PC -->
      <div class="flex flex-col">
        <label class="text-[11px] font-bold text-[#1e3a8a] uppercase mb-1">
          Lectura Observada en Son\xF3metro (IS 5) <span class="text-blue-600">PC</span> Nivel 114 DB:
        </label>
        <input
          type="number"
          [(ngModel)]="lecturaPC"
          placeholder="ej. 114.5 DB"
          class="w-full border border-slate-300 bg-white text-slate-700 p-2.5 rounded text-sm outline-none focus:border-[#1e3a8a] transition-colors"
        />
      </div>

      <!-- Lectura PL -->
      <div class="flex flex-col">
        <label class="text-[11px] font-bold text-[#1e3a8a] uppercase mb-1">
          Lectura Observada en Son\xF3metro (IS 5) <span class="text-blue-600">PL</span> Nivel 114 DB:
        </label>
        <input
          type="number"
          [(ngModel)]="lecturaPL"
          placeholder="ej. 114.2 DB"
          class="w-full border border-slate-300 bg-white text-slate-700 p-2.5 rounded text-sm outline-none focus:border-[#1e3a8a] transition-colors"
        />
      </div>

      <!-- Error PC (computed) -->
      <div class="flex flex-col">
        <label class="text-[11px] font-bold text-[#1e3a8a] uppercase mb-1">Error PC Nivel 114 DB:</label>
        <div class="w-full border border-slate-200 bg-slate-50 text-slate-600 p-2.5 rounded text-sm font-semibold">
          {{ errorPC }}
        </div>
      </div>

      <!-- Error PL (computed) -->
      <div class="flex flex-col">
        <label class="text-[11px] font-bold text-[#1e3a8a] uppercase mb-1">Error PL Nivel 114 DB:</label>
        <div class="w-full border border-slate-200 bg-slate-50 text-slate-600 p-2.5 rounded text-sm font-semibold">
          {{ errorPL }}
        </div>
      </div>

      <!-- Tolerancia Patr\xF3n -->
      <div class="flex flex-col">
        <label class="text-[11px] font-bold text-[#1e3a8a] uppercase mb-1">Tolerancia del Patr\xF3n de Laboratorio, DB</label>
        <input
          type="number"
          [(ngModel)]="toleranciaPatron"
          placeholder="Ingrese mediciones"
          class="w-full border border-slate-300 bg-white text-slate-700 p-2.5 rounded text-sm outline-none focus:border-[#1e3a8a] transition-colors"
        />
      </div>

      <!-- Evaluaci\xF3n -->
      <div class="flex flex-col">
        <label class="text-[11px] font-bold text-[#1e3a8a] uppercase mb-1">Evaluaci\xF3n:</label>
        <div class="flex items-center gap-2 p-2.5">
          @if (evaluacion === 'CUMPLE') {
            <span class="text-sm font-bold text-green-700 px-3 py-1 rounded border border-green-400 bg-green-50 flex items-center gap-1.5">
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" />
              </svg>
              CUMPLE
            </span>
          } @else if (evaluacion === 'NO CUMPLE') {
            <span class="text-sm font-bold text-red-600 px-3 py-1 rounded border border-red-300 bg-red-50 flex items-center gap-1.5">
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12" />
              </svg>
              NO CUMPLE
            </span>
          } @else {
            <span class="text-sm text-slate-400 italic">Ingrese lecturas y tolerancia para evaluar</span>
          }
        </div>
      </div>

      <!-- Botones Cargar / Verificar -->
      <div class="md:col-span-2 flex items-center gap-3 pt-2">
        <button type="button" (click)="cargarArchivos()"
          class="border border-slate-300 text-slate-600 px-5 py-2 rounded text-sm font-bold hover:bg-slate-50 transition-all flex items-center gap-2">
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
          </svg>
          Cargar Archivos
        </button>
        <button type="button" (click)="verificar()"
          class="bg-[#16a34a] text-white px-5 py-2 rounded text-sm font-bold shadow-sm hover:bg-[#15803d] transition-all">
          Verificar
        </button>
      </div>

    </div>
  </section>

  <!-- \u2500\u2500\u2500 CHECKLIST \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 -->
  <section class="border border-slate-200 rounded-sm overflow-hidden shadow-sm mb-6">
    <div class="bg-[#f8fafc] border-b border-slate-200 px-5 py-3">
      <h4 class="font-bold text-[#1e3a8a] text-xs uppercase tracking-wider">Checklist</h4>
    </div>
    <div class="p-5 grid grid-cols-1 md:grid-cols-2 gap-4">
      @for (item of checklist; track item.key) {
        <div class="flex items-center justify-between gap-3">
          <span class="text-xs text-slate-700 leading-tight">{{ item.label }}:</span>
          <div class="flex items-center gap-1.5 flex-shrink-0">
            <button type="button" (click)="toggleChecklist(item)"
              class="relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus:outline-none"
              [class.bg-[#1e3a8a]]="item.valor"
              [class.bg-slate-300]="!item.valor">
              <span class="inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow transition-transform"
                    [class.translate-x-4]="item.valor"
                    [class.translate-x-0.5]="!item.valor">
              </span>
            </button>
            <span class="text-[11px] font-bold w-5"
                  [class.text-[#1e3a8a]]="item.valor"
                  [class.text-slate-400]="!item.valor">
              {{ item.valor ? 'S\xED' : 'No' }}
            </span>
          </div>
        </div>
      }
    </div>
  </section>

  <!-- \u2500\u2500\u2500 OBSERVACIONES \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 -->
  <section class="border border-slate-200 rounded-sm overflow-hidden shadow-sm mb-6">
    <div class="bg-[#f8fafc] border-b border-slate-200 px-5 py-3">
      <h4 class="font-bold text-[#1e3a8a] text-xs uppercase tracking-wider">
        Observaciones <span class="text-slate-400 font-normal normal-case">(opcional)</span>
      </h4>
    </div>
    <div class="p-5">
      <textarea
        [(ngModel)]="observaciones"
        [rows]="3"
        maxlength="350"
        placeholder="ej. PC no cumple con criterio"
        class="w-full border border-slate-300 rounded p-3 text-sm resize-none outline-none focus:border-[#1e3a8a] bg-white text-slate-700">
      </textarea>
      <p class="text-right text-[10px] text-slate-400 mt-1">{{ observaciones.length }}/350</p>
    </div>
  </section>

  <!-- \u2500\u2500\u2500 BOTONES \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 -->
  <div class="flex items-center gap-3 pt-4 border-t border-slate-300">
    <button type="button" (click)="cancelado.emit()"
      class="border border-slate-300 text-slate-600 px-6 py-2.5 rounded text-sm font-bold hover:bg-slate-50 transition-all">
      Cancelar
    </button>
    <button type="button" (click)="guardar()"
      [disabled]="saving"
      class="bg-[#1e3a8a] text-white px-8 py-2.5 rounded text-sm font-bold shadow-md hover:bg-[#2541b2] transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-2">
      @if (saving) {
        <span class="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
        {{ modoEdicion ? 'Actualizando...' : 'Registrando...' }}
      } @else {
        {{ modoEdicion ? 'ACTUALIZAR' : 'REGISTRAR' }}
      }
    </button>
  </div>

</div>
` }]
  }], null, { editingRecord: [{
    type: Input
  }], guardado: [{
    type: Output
  }], cancelado: [{
    type: Output
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(CalibracionEquiposFormulario, { className: "CalibracionEquiposFormulario", filePath: "src/app/features/calibracion-equipos/formulario/calibracion-equipos-formulario.ts", lineNumber: 39 });
})();

// src/app/features/calibracion-equipos/calibracion-equipos.ts
function CalibracionEquipos_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "app-calibracion-equipos-lista", 5);
    \u0275\u0275listener("nuevaCalibracion", function CalibracionEquipos_Conditional_4_Template_app_calibracion_equipos_lista_nuevaCalibracion_0_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.irAFormulario());
    })("editar", function CalibracionEquipos_Conditional_4_Template_app_calibracion_equipos_lista_editar_0_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onEditar($event));
    });
    \u0275\u0275elementEnd();
  }
}
function CalibracionEquipos_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "app-calibracion-equipos-formulario", 6);
    \u0275\u0275listener("guardado", function CalibracionEquipos_Conditional_5_Template_app_calibracion_equipos_formulario_guardado_0_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.volverALista());
    })("cancelado", function CalibracionEquipos_Conditional_5_Template_app_calibracion_equipos_formulario_cancelado_0_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.volverALista());
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("editingRecord", ctx_r1.editingRecord);
  }
}
var CalibracionEquipos = class _CalibracionEquipos {
  vista = "lista";
  editingRecord = null;
  irAFormulario() {
    this.editingRecord = null;
    this.vista = "formulario";
  }
  onEditar(record) {
    this.editingRecord = record;
    this.vista = "formulario";
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  volverALista() {
    this.editingRecord = null;
    this.vista = "lista";
  }
  static \u0275fac = function CalibracionEquipos_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CalibracionEquipos)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _CalibracionEquipos, selectors: [["app-calibracion-equipos"]], decls: 6, vars: 2, consts: [[1, "p-6", "bg-slate-50", "min-h-screen", "text-slate-700", "font-sans", "pb-24"], [1, "max-w-7xl", "mx-auto"], [1, "animate-in", "fade-in"], ["breadcrumbSection", "Calibraci\xF3n de equipos", "title", "Verificaci\xF3n Intermedia de Calibradores Ac\xFAsticos", "subtitle", "Aqu\xED podr\xE1s realizar el formulario para Calibradores Ac\xFAsticos", "codigoFormulario", "F-PEE-11-02", "edicion", "3"], [3, "editingRecord"], [3, "nuevaCalibracion", "editar"], [3, "guardado", "cancelado", "editingRecord"]], template: function CalibracionEquipos_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div", 2);
      \u0275\u0275element(3, "app-page-header", 3);
      \u0275\u0275conditionalCreate(4, CalibracionEquipos_Conditional_4_Template, 1, 0, "app-calibracion-equipos-lista");
      \u0275\u0275conditionalCreate(5, CalibracionEquipos_Conditional_5_Template, 1, 1, "app-calibracion-equipos-formulario", 4);
      \u0275\u0275elementEnd()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(4);
      \u0275\u0275conditional(ctx.vista === "lista" ? 4 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.vista === "formulario" ? 5 : -1);
    }
  }, dependencies: [PageHeader, CalibracionEquiposLista, CalibracionEquiposFormulario], styles: ["\n\n.animate-in[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_animateIn 0.3s ease-out forwards;\n}\n.fade-in[_ngcontent-%COMP%] {\n  opacity: 0;\n}\n@keyframes _ngcontent-%COMP%_animateIn {\n  to {\n    opacity: 1;\n    transform: translate(0);\n  }\n}\n.custom-scroll[_ngcontent-%COMP%]::-webkit-scrollbar {\n  width: 6px;\n  height: 6px;\n}\n.custom-scroll[_ngcontent-%COMP%]::-webkit-scrollbar-track {\n  background: #f1f5f9;\n  border-radius: 4px;\n}\n.custom-scroll[_ngcontent-%COMP%]::-webkit-scrollbar-thumb {\n  background: #cbd5e1;\n  border-radius: 4px;\n}\n.custom-scroll[_ngcontent-%COMP%]::-webkit-scrollbar-thumb:hover {\n  background: #94a3b8;\n}\ninput[_ngcontent-%COMP%]:focus, \nselect[_ngcontent-%COMP%]:focus, \ntextarea[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: #1e3a8a;\n  box-shadow: 0 0 0 1px #1e3a8a;\n}\n/*# sourceMappingURL=calibracion-equipos.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CalibracionEquipos, [{
    type: Component,
    args: [{ selector: "app-calibracion-equipos", imports: [PageHeader, CalibracionEquiposLista, CalibracionEquiposFormulario], template: `<div class="p-6 bg-slate-50 min-h-screen text-slate-700 font-sans pb-24">
  <div class="max-w-7xl mx-auto">
    <div class="animate-in fade-in">

      <app-page-header
        breadcrumbSection="Calibraci\xF3n de equipos"
        title="Verificaci\xF3n Intermedia de Calibradores Ac\xFAsticos"
        subtitle="Aqu\xED podr\xE1s realizar el formulario para Calibradores Ac\xFAsticos"
        codigoFormulario="F-PEE-11-02"
        edicion="3"
      />

      @if (vista === 'lista') {
        <app-calibracion-equipos-lista
          (nuevaCalibracion)="irAFormulario()"
          (editar)="onEditar($event)"
        />
      }

      @if (vista === 'formulario') {
        <app-calibracion-equipos-formulario
          [editingRecord]="editingRecord"
          (guardado)="volverALista()"
          (cancelado)="volverALista()"
        />
      }

    </div>
  </div>
</div>
`, styles: ["/* src/app/features/calibracion-equipos/calibracion-equipos.css */\n.animate-in {\n  animation: animateIn 0.3s ease-out forwards;\n}\n.fade-in {\n  opacity: 0;\n}\n@keyframes animateIn {\n  to {\n    opacity: 1;\n    transform: translate(0);\n  }\n}\n.custom-scroll::-webkit-scrollbar {\n  width: 6px;\n  height: 6px;\n}\n.custom-scroll::-webkit-scrollbar-track {\n  background: #f1f5f9;\n  border-radius: 4px;\n}\n.custom-scroll::-webkit-scrollbar-thumb {\n  background: #cbd5e1;\n  border-radius: 4px;\n}\n.custom-scroll::-webkit-scrollbar-thumb:hover {\n  background: #94a3b8;\n}\ninput:focus,\nselect:focus,\ntextarea:focus {\n  outline: none;\n  border-color: #1e3a8a;\n  box-shadow: 0 0 0 1px #1e3a8a;\n}\n/*# sourceMappingURL=calibracion-equipos.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(CalibracionEquipos, { className: "CalibracionEquipos", filePath: "src/app/features/calibracion-equipos/calibracion-equipos.ts", lineNumber: 13 });
})();
export {
  CalibracionEquipos
};
//# sourceMappingURL=chunk-WYHIZFKV.js.map
