import {
  FieldSkeleton
} from "./chunk-WVAGNUPQ.js";
import {
  CatalogoService
} from "./chunk-OZ4IZHSX.js";
import {
  ToastrAlertService
} from "./chunk-V2CIHOHZ.js";
import "./chunk-BBC4P6SM.js";
import {
  DefaultValueAccessor,
  FormsModule,
  MinValidator,
  NgControlStatus,
  NgModel,
  NgSelectOption,
  NumberValueAccessor,
  SelectControlValueAccessor,
  ɵNgSelectMultipleOption
} from "./chunk-NAO2WYRM.js";
import "./chunk-GSQNXGZJ.js";
import {
  AppRole,
  MenuKey,
  hasPermission
} from "./chunk-JI325HE7.js";
import {
  require_sweetalert2_all
} from "./chunk-ZCY535AF.js";
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
  CommonModule
} from "./chunk-CIDLATYD.js";
import {
  Component,
  EventEmitter,
  Input,
  NgZone,
  Output,
  Subject,
  __spreadProps,
  __spreadValues,
  __toESM,
  computed,
  finalize,
  map,
  of,
  setClassMetadata,
  switchMap,
  takeUntil,
  ɵsetClassDebugInfo,
  ɵɵNgOnChangesFeature,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵclassMap,
  ɵɵclassProp,
  ɵɵcomponentInstance,
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
  ɵɵproperty,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵstyleProp,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-WHOAKDIK.js";

// src/app/features/admin-catalogos/catalogo/lista/catalogo-lista.ts
var import_sweetalert2 = __toESM(require_sweetalert2_all());
var _forTrack0 = ($index, $item) => $item.id;
function CatalogoLista_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 20);
    \u0275\u0275listener("click", function CatalogoLista_Conditional_4_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.nuevo.emit());
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 21);
    \u0275\u0275element(2, "path", 22);
    \u0275\u0275elementEnd();
    \u0275\u0275text(3, " Nuevo ");
    \u0275\u0275elementEnd();
  }
}
function CatalogoLista_Conditional_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "col", 13);
  }
}
function CatalogoLista_Conditional_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 17);
    \u0275\u0275text(1, "Acc.");
    \u0275\u0275elementEnd();
  }
}
function CatalogoLista_Conditional_25_For_1_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 27);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r4 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(item_r4.descripcion);
  }
}
function CatalogoLista_Conditional_25_For_1_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 28);
    \u0275\u0275text(1, "Activo");
    \u0275\u0275elementEnd();
  }
}
function CatalogoLista_Conditional_25_For_1_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 29);
    \u0275\u0275text(1, "Inactivo");
    \u0275\u0275elementEnd();
  }
}
function CatalogoLista_Conditional_25_For_1_Conditional_8_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 33);
    \u0275\u0275element(1, "circle", 35)(2, "path", 36);
    \u0275\u0275elementEnd();
  }
}
function CatalogoLista_Conditional_25_For_1_Conditional_8_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 34);
    \u0275\u0275element(1, "path", 37);
    \u0275\u0275elementEnd();
  }
}
function CatalogoLista_Conditional_25_For_1_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "td", 30);
    \u0275\u0275listener("click", function CatalogoLista_Conditional_25_For_1_Conditional_8_Template_td_click_0_listener($event) {
      \u0275\u0275restoreView(_r5);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275elementStart(1, "div", 31)(2, "button", 32);
    \u0275\u0275listener("click", function CatalogoLista_Conditional_25_For_1_Conditional_8_Template_button_click_2_listener($event) {
      \u0275\u0275restoreView(_r5);
      const item_r4 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.toggleMenu(item_r4.id, item_r4, $event));
    });
    \u0275\u0275conditionalCreate(3, CatalogoLista_Conditional_25_For_1_Conditional_8_Conditional_3_Template, 3, 0, ":svg:svg", 33)(4, CatalogoLista_Conditional_25_For_1_Conditional_8_Conditional_4_Template, 2, 0, ":svg:svg", 34);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const item_r4 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r1.procesandoId === item_r4.id);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.procesandoId === item_r4.id ? 3 : 4);
  }
}
function CatalogoLista_Conditional_25_For_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tr", 24);
    \u0275\u0275listener("click", function CatalogoLista_Conditional_25_For_1_Template_tr_click_0_listener() {
      const item_r4 = \u0275\u0275restoreView(_r3).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.seleccionar.emit(item_r4));
    });
    \u0275\u0275elementStart(1, "td", 25)(2, "span", 26);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(4, CatalogoLista_Conditional_25_For_1_Conditional_4_Template, 2, 1, "p", 27);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "td", 16);
    \u0275\u0275conditionalCreate(6, CatalogoLista_Conditional_25_For_1_Conditional_6_Template, 2, 0, "span", 28)(7, CatalogoLista_Conditional_25_For_1_Conditional_7_Template, 2, 0, "span", 29);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(8, CatalogoLista_Conditional_25_For_1_Conditional_8_Template, 5, 2, "td", 17);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r4 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275classProp("bg-blue-50", ctx_r1.selectedId === item_r4.id)("hover:bg-slate-50", ctx_r1.selectedId !== item_r4.id);
    \u0275\u0275advance(2);
    \u0275\u0275classProp("text-[#1e3a8a]", ctx_r1.selectedId === item_r4.id)("text-slate-700", ctx_r1.selectedId !== item_r4.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", item_r4.nombre, " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(item_r4.descripcion ? 4 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(item_r4.estado ? 6 : 7);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.hasAnyAction ? 8 : -1);
  }
}
function CatalogoLista_Conditional_25_ForEmpty_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td", 38);
    \u0275\u0275text(2, " No hay cat\xE1logos registrados. ");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275attribute("colspan", ctx_r1.hasAnyAction ? 3 : 2);
  }
}
function CatalogoLista_Conditional_25_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275repeaterCreate(0, CatalogoLista_Conditional_25_For_1_Template, 9, 12, "tr", 23, _forTrack0, false, CatalogoLista_Conditional_25_ForEmpty_2_Template, 3, 1, "tr");
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275repeater(ctx_r1.catalogos);
  }
}
function CatalogoLista_Conditional_27_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 43);
    \u0275\u0275listener("click", function CatalogoLista_Conditional_27_Conditional_1_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r1 = \u0275\u0275nextContext(2);
      ctx_r1.editar.emit(ctx_r1.menuItem);
      return \u0275\u0275resetView(ctx_r1.closeMenu());
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 44);
    \u0275\u0275element(2, "path", 45);
    \u0275\u0275elementEnd();
    \u0275\u0275text(3, " Editar ");
    \u0275\u0275elementEnd();
  }
}
function CatalogoLista_Conditional_27_Conditional_2_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 44);
    \u0275\u0275element(1, "path", 47);
    \u0275\u0275elementEnd();
    \u0275\u0275text(2, " Deshabilitar ");
  }
}
function CatalogoLista_Conditional_27_Conditional_2_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 44);
    \u0275\u0275element(1, "path", 48);
    \u0275\u0275elementEnd();
    \u0275\u0275text(2, " Habilitar ");
  }
}
function CatalogoLista_Conditional_27_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 46);
    \u0275\u0275listener("click", function CatalogoLista_Conditional_27_Conditional_2_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r8);
      const ctx_r1 = \u0275\u0275nextContext(2);
      ctx_r1.toggleEstadoCatalogo(ctx_r1.menuItem);
      return \u0275\u0275resetView(ctx_r1.closeMenu());
    });
    \u0275\u0275conditionalCreate(1, CatalogoLista_Conditional_27_Conditional_2_Conditional_1_Template, 3, 0)(2, CatalogoLista_Conditional_27_Conditional_2_Conditional_2_Template, 3, 0);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275classMap(ctx_r1.menuItem.estado ? "w-full flex items-center gap-2.5 px-3 py-2 text-xs text-red-600 hover:bg-red-50" : "w-full flex items-center gap-2.5 px-3 py-2 text-xs text-green-700 hover:bg-green-50");
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.menuItem.estado ? 1 : 2);
  }
}
function CatalogoLista_Conditional_27_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 39);
    \u0275\u0275conditionalCreate(1, CatalogoLista_Conditional_27_Conditional_1_Template, 4, 0, "button", 40);
    \u0275\u0275conditionalCreate(2, CatalogoLista_Conditional_27_Conditional_2_Template, 3, 3, "button", 41);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 42);
    \u0275\u0275listener("click", function CatalogoLista_Conditional_27_Template_div_click_3_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.closeMenu());
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275styleProp("top", ctx_r1.menuPos.top, "px")("right", ctx_r1.menuPos.right, "px");
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.canEdit() ? 1 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.canDelete() ? 2 : -1);
  }
}
var CatalogoLista = class _CatalogoLista {
  catService;
  authService;
  zone;
  toastrAlert;
  selectedId = null;
  seleccionar = new EventEmitter();
  nuevo = new EventEmitter();
  editar = new EventEmitter();
  loading = true;
  catalogos = [];
  meta = null;
  currentPage = 1;
  PAGE_SIZE = 10;
  busqueda = "";
  openMenuId = null;
  menuItem = null;
  menuPos = null;
  procesandoId = null;
  destroy$ = new Subject();
  userAppRole = computed(() => {
    const roles = this.authService.userProfile()?.roles ?? [];
    return Object.values(AppRole).find((r) => roles.includes(r)) ?? null;
  }, ...ngDevMode ? [{ debugName: "userAppRole" }] : []);
  canEdit = computed(() => {
    const role = this.userAppRole();
    return role ? hasPermission(MenuKey.ADMIN_CATALOGOS, role, "editar") : false;
  }, ...ngDevMode ? [{ debugName: "canEdit" }] : []);
  canDelete = computed(() => {
    const role = this.userAppRole();
    return role ? hasPermission(MenuKey.ADMIN_CATALOGOS, role, "eliminar") : false;
  }, ...ngDevMode ? [{ debugName: "canDelete" }] : []);
  canCrear = computed(() => {
    const role = this.userAppRole();
    return role ? hasPermission(MenuKey.ADMIN_CATALOGOS, role, "crear") : false;
  }, ...ngDevMode ? [{ debugName: "canCrear" }] : []);
  get hasAnyAction() {
    return this.canEdit() || this.canDelete();
  }
  constructor(catService, authService, zone, toastrAlert) {
    this.catService = catService;
    this.authService = authService;
    this.zone = zone;
    this.toastrAlert = toastrAlert;
  }
  ngOnInit() {
    this.cargarPagina(1);
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  filtrar() {
    this.cargarPagina(1);
  }
  cargarPagina(page) {
    this.loading = true;
    this.currentPage = page;
    const nombre = this.busqueda.trim();
    this.catService.getCollectionCatalogoAdmin(page, this.PAGE_SIZE, nombre).pipe(takeUntil(this.destroy$)).subscribe({
      next: ({ data, meta }) => {
        this.catalogos = data;
        this.meta = meta;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }
  toggleMenu(id, item, event) {
    event.stopPropagation();
    if (this.openMenuId === id) {
      this.openMenuId = null;
      this.menuItem = null;
      this.menuPos = null;
    } else {
      const btn = event.currentTarget;
      const rect = btn.getBoundingClientRect();
      this.openMenuId = id;
      this.menuItem = item;
      this.menuPos = { top: rect.bottom + 4, right: window.innerWidth - rect.right };
    }
  }
  closeMenu() {
    this.openMenuId = null;
    this.menuItem = null;
    this.menuPos = null;
  }
  async toggleEstadoCatalogo(item) {
    const accion = item.estado ? "deshabilitar" : "habilitar";
    const confirm = await import_sweetalert2.default.fire({
      icon: "warning",
      title: `\xBF${item.estado ? "Deshabilitar" : "Habilitar"} cat\xE1logo?`,
      text: `Se ${accion}\xE1 "${item.nombre}".`,
      showCancelButton: true,
      confirmButtonColor: item.estado ? "#d33" : "#16a34a",
      cancelButtonColor: "#6b7280",
      confirmButtonText: `S\xED, ${accion}`,
      cancelButtonText: "Cancelar"
    });
    if (!confirm.isConfirmed)
      return;
    this.procesandoId = item.id;
    const call$ = this.catService.toggleCatalogo(item.id, !item.estado);
    call$.pipe(takeUntil(this.destroy$), finalize(() => {
      this.procesandoId = null;
    })).subscribe({
      next: () => this.zone.run(() => {
        this.toastrAlert.showSuccess(`Cat\xE1logo ${item.estado ? "deshabilitado" : "habilitado"}.`, "\xA1Listo!");
        this.cargarPagina(this.currentPage);
      }),
      error: () => this.zone.run(() => this.toastrAlert.showError(`No se pudo ${accion} el cat\xE1logo.`, "Error"))
    });
  }
  static \u0275fac = function CatalogoLista_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CatalogoLista)(\u0275\u0275directiveInject(CatalogoService), \u0275\u0275directiveInject(AuthService), \u0275\u0275directiveInject(NgZone), \u0275\u0275directiveInject(ToastrAlertService));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _CatalogoLista, selectors: [["app-catalogo-lista"]], inputs: { selectedId: "selectedId" }, outputs: { seleccionar: "seleccionar", nuevo: "nuevo", editar: "editar" }, decls: 28, vars: 12, consts: [[1, "bg-white", "rounded-lg", "shadow-sm", "border", "border-slate-200", "p-4"], [1, "flex", "items-center", "justify-between", "mb-3"], [1, "text-sm", "font-bold", "text-slate-700", "uppercase", "tracking-wide"], ["type", "button", 1, "bg-[#1e3a8a]", "text-white", "px-3", "py-1.5", "rounded", "text-xs", "font-bold", "shadow-sm", "hover:bg-[#2541b2]", "transition-all", "flex", "items-center", "gap-1.5"], [1, "relative", "mb-3"], ["type", "text", "placeholder", "Buscar por nombre...", 1, "w-full", "border", "border-slate-300", "rounded", "pl-9", "pr-4", "py-2", "text-sm", "text-slate-700", "outline-none", "focus:border-[#1e3a8a]", "transition-colors", 3, "ngModelChange", "ngModel"], ["fill", "none", "viewBox", "0 0 24 24", "stroke", "currentColor", 1, "w-4", "h-4", "text-slate-400", "absolute", "left-2.5", "top-1/2", "-translate-y-1/2"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"], [1, "border", "border-slate-200", "rounded", "overflow-hidden"], [1, "overflow-x-auto"], [1, "w-full", "text-sm", "border-collapse", "table-fixed"], [1, "w-full"], [1, "w-[76px]"], [1, "w-[50px]"], [1, "bg-slate-50", "text-[10px]", "font-bold", "text-slate-500", "uppercase", "border-b", "border-slate-200", "tracking-wider"], [1, "px-3", "py-2.5", "border-r", "border-slate-100", "text-left"], [1, "px-3", "py-2.5", "border-r", "border-slate-100", "text-center"], [1, "px-2", "py-2.5", "text-center"], ["appTableSkeleton", "", 3, "rows", "cols", "actionButtons"], ["itemLabel", "cat\xE1logos", 3, "pageChange", "meta", "currentPage", "itemsShown"], ["type", "button", 1, "bg-[#1e3a8a]", "text-white", "px-3", "py-1.5", "rounded", "text-xs", "font-bold", "shadow-sm", "hover:bg-[#2541b2]", "transition-all", "flex", "items-center", "gap-1.5", 3, "click"], ["fill", "none", "viewBox", "0 0 24 24", "stroke", "currentColor", 1, "w-3.5", "h-3.5"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M12 4v16m8-8H4"], [1, "border-b", "border-slate-100", "transition-colors", "cursor-pointer", 3, "bg-blue-50", "hover:bg-slate-50"], [1, "border-b", "border-slate-100", "transition-colors", "cursor-pointer", 3, "click"], [1, "px-3", "py-2.5", "border-r", "border-slate-100"], [1, "text-xs", "font-medium"], [1, "text-[10px]", "text-slate-400", "mt-0.5", "truncate"], [1, "inline-flex", "items-center", "px-1.5", "py-0.5", "rounded", "text-[10px]", "font-semibold", "bg-green-100", "text-green-700"], [1, "inline-flex", "items-center", "px-1.5", "py-0.5", "rounded", "text-[10px]", "font-semibold", "bg-slate-100", "text-slate-500"], [1, "px-2", "py-2.5", "text-center", 3, "click"], [1, "flex", "items-center", "justify-center"], ["type", "button", "title", "M\xE1s acciones", 1, "h-8", "w-8", "flex", "items-center", "justify-center", "rounded", "border", "border-slate-300", "text-slate-500", "bg-white", "hover:bg-slate-100", "disabled:opacity-40", "transition-colors", "shrink-0", 3, "click", "disabled"], ["fill", "none", "viewBox", "0 0 24 24", 1, "h-3.5", "w-3.5", "animate-spin"], ["fill", "currentColor", "viewBox", "0 0 20 20", 1, "h-4", "w-4"], ["cx", "12", "cy", "12", "r", "10", "stroke", "currentColor", "stroke-width", "4", 1, "opacity-25"], ["fill", "currentColor", "d", "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z", 1, "opacity-75"], ["d", "M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"], [1, "p-10", "text-slate-400", "italic", "text-center", "text-xs"], [1, "fixed", "z-50", "bg-white", "border", "border-slate-200", "rounded-lg", "shadow-lg", "py-1", "w-40"], ["type", "button", 1, "w-full", "flex", "items-center", "gap-2.5", "px-3", "py-2", "text-xs", "text-amber-700", "hover:bg-amber-50"], ["type", "button", 3, "class"], [1, "fixed", "inset-0", "z-40", 3, "click"], ["type", "button", 1, "w-full", "flex", "items-center", "gap-2.5", "px-3", "py-2", "text-xs", "text-amber-700", "hover:bg-amber-50", 3, "click"], ["fill", "none", "viewBox", "0 0 24 24", "stroke", "currentColor", 1, "h-3.5", "w-3.5", "shrink-0"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"], ["type", "button", 3, "click"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"]], template: function CatalogoLista_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "h3", 2);
      \u0275\u0275text(3, "Cat\xE1logos");
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(4, CatalogoLista_Conditional_4_Template, 4, 0, "button", 3);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(5, "div", 4)(6, "input", 5);
      \u0275\u0275twoWayListener("ngModelChange", function CatalogoLista_Template_input_ngModelChange_6_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.busqueda, $event) || (ctx.busqueda = $event);
        return $event;
      });
      \u0275\u0275listener("ngModelChange", function CatalogoLista_Template_input_ngModelChange_6_listener() {
        return ctx.filtrar();
      });
      \u0275\u0275elementEnd();
      \u0275\u0275namespaceSVG();
      \u0275\u0275elementStart(7, "svg", 6);
      \u0275\u0275element(8, "path", 7);
      \u0275\u0275elementEnd()();
      \u0275\u0275namespaceHTML();
      \u0275\u0275elementStart(9, "div", 8)(10, "div", 9)(11, "table", 10)(12, "colgroup");
      \u0275\u0275element(13, "col", 11)(14, "col", 12);
      \u0275\u0275conditionalCreate(15, CatalogoLista_Conditional_15_Template, 1, 0, "col", 13);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(16, "thead")(17, "tr", 14)(18, "th", 15);
      \u0275\u0275text(19, "Nombre");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(20, "th", 16);
      \u0275\u0275text(21, "Estado");
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(22, CatalogoLista_Conditional_22_Template, 2, 0, "th", 17);
      \u0275\u0275elementEnd()();
      \u0275\u0275element(23, "tbody", 18);
      \u0275\u0275elementStart(24, "tbody");
      \u0275\u0275conditionalCreate(25, CatalogoLista_Conditional_25_Template, 3, 1);
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(26, "app-pagination", 19);
      \u0275\u0275listener("pageChange", function CatalogoLista_Template_app_pagination_pageChange_26_listener($event) {
        return ctx.cargarPagina($event);
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(27, CatalogoLista_Conditional_27_Template, 4, 6);
    }
    if (rf & 2) {
      \u0275\u0275advance(4);
      \u0275\u0275conditional(ctx.canCrear() ? 4 : -1);
      \u0275\u0275advance(2);
      \u0275\u0275twoWayProperty("ngModel", ctx.busqueda);
      \u0275\u0275advance(9);
      \u0275\u0275conditional(ctx.hasAnyAction ? 15 : -1);
      \u0275\u0275advance(7);
      \u0275\u0275conditional(ctx.hasAnyAction ? 22 : -1);
      \u0275\u0275advance();
      \u0275\u0275property("rows", ctx.loading ? 8 : 0)("cols", 2)("actionButtons", ctx.hasAnyAction ? 1 : 0);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(!ctx.loading ? 25 : -1);
      \u0275\u0275advance();
      \u0275\u0275property("meta", ctx.meta)("currentPage", ctx.currentPage)("itemsShown", ctx.catalogos.length);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.openMenuId !== null && ctx.menuItem && ctx.menuPos ? 27 : -1);
    }
  }, dependencies: [CommonModule, FormsModule, DefaultValueAccessor, NgControlStatus, NgModel, PaginationComponent, TableSkeleton], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CatalogoLista, [{
    type: Component,
    args: [{ selector: "app-catalogo-lista", imports: [CommonModule, FormsModule, PaginationComponent, TableSkeleton], template: `<div class="bg-white rounded-lg shadow-sm border border-slate-200 p-4">

  <div class="flex items-center justify-between mb-3">
    <h3 class="text-sm font-bold text-slate-700 uppercase tracking-wide">Cat\xE1logos</h3>
    @if (canCrear()) {
      <button type="button" (click)="nuevo.emit()"
        class="bg-[#1e3a8a] text-white px-3 py-1.5 rounded text-xs font-bold shadow-sm hover:bg-[#2541b2] transition-all flex items-center gap-1.5">
        <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
        </svg>
        Nuevo
      </button>
    }
  </div>

  <div class="relative mb-3">
    <input type="text" [(ngModel)]="busqueda" (ngModelChange)="filtrar()"
      placeholder="Buscar por nombre..."
      class="w-full border border-slate-300 rounded pl-9 pr-4 py-2 text-sm text-slate-700 outline-none focus:border-[#1e3a8a] transition-colors" />
    <svg class="w-4 h-4 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
    </svg>
  </div>

  <div class="border border-slate-200 rounded overflow-hidden">
    <div class="overflow-x-auto">
      <table class="w-full text-sm border-collapse table-fixed">
        <colgroup>
          <col class="w-full">
          <col class="w-[76px]">
          @if (hasAnyAction) {
            <col class="w-[50px]">
          }
        </colgroup>
        <thead>
          <tr class="bg-slate-50 text-[10px] font-bold text-slate-500 uppercase border-b border-slate-200 tracking-wider">
            <th class="px-3 py-2.5 border-r border-slate-100 text-left">Nombre</th>
            <th class="px-3 py-2.5 border-r border-slate-100 text-center">Estado</th>
            @if (hasAnyAction) {
              <th class="px-2 py-2.5 text-center">Acc.</th>
            }
          </tr>
        </thead>
        <tbody appTableSkeleton [rows]="loading ? 8 : 0" [cols]="2" [actionButtons]="hasAnyAction ? 1 : 0"></tbody>
        <tbody>
          @if (!loading) {
            @for (item of catalogos; track item.id) {
              <tr
                class="border-b border-slate-100 transition-colors cursor-pointer"
                [class.bg-blue-50]="selectedId === item.id"
                [class.hover:bg-slate-50]="selectedId !== item.id"
                (click)="seleccionar.emit(item)"
              >
                <td class="px-3 py-2.5 border-r border-slate-100">
                  <span class="text-xs font-medium"
                    [class.text-[#1e3a8a]]="selectedId === item.id"
                    [class.text-slate-700]="selectedId !== item.id">
                    {{ item.nombre }}
                  </span>
                  @if (item.descripcion) {
                    <p class="text-[10px] text-slate-400 mt-0.5 truncate">{{ item.descripcion }}</p>
                  }
                </td>
                <td class="px-3 py-2.5 border-r border-slate-100 text-center">
                  @if (item.estado) {
                    <span class="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold bg-green-100 text-green-700">Activo</span>
                  } @else {
                    <span class="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold bg-slate-100 text-slate-500">Inactivo</span>
                  }
                </td>
                @if (hasAnyAction) {
                  <td class="px-2 py-2.5 text-center" (click)="$event.stopPropagation()">
                    <div class="flex items-center justify-center">
                      <button type="button" title="M\xE1s acciones"
                        (click)="toggleMenu(item.id, item, $event)"
                        [disabled]="procesandoId === item.id"
                        class="h-8 w-8 flex items-center justify-center rounded border border-slate-300 text-slate-500 bg-white hover:bg-slate-100 disabled:opacity-40 transition-colors shrink-0">
                        @if (procesandoId === item.id) {
                          <svg class="h-3.5 w-3.5 animate-spin" fill="none" viewBox="0 0 24 24">
                            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
                            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                          </svg>
                        } @else {
                          <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"/>
                          </svg>
                        }
                      </button>
                    </div>
                  </td>
                }
              </tr>
            } @empty {
              <tr>
                <td [attr.colspan]="hasAnyAction ? 3 : 2" class="p-10 text-slate-400 italic text-center text-xs">
                  No hay cat\xE1logos registrados.
                </td>
              </tr>
            }
          }
        </tbody>
      </table>
    </div>
  </div>

  <app-pagination
    [meta]="meta"
    [currentPage]="currentPage"
    [itemsShown]="catalogos.length"
    itemLabel="cat\xE1logos"
    (pageChange)="cargarPagina($event)">
  </app-pagination>

</div>

@if (openMenuId !== null && menuItem && menuPos) {
  <div class="fixed z-50 bg-white border border-slate-200 rounded-lg shadow-lg py-1 w-40"
       [style.top.px]="menuPos.top"
       [style.right.px]="menuPos.right">
    @if (canEdit()) {
      <button type="button" (click)="editar.emit(menuItem); closeMenu()"
        class="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-amber-700 hover:bg-amber-50">
        <svg class="h-3.5 w-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
        </svg>
        Editar
      </button>
    }
    @if (canDelete()) {
      <button type="button" (click)="toggleEstadoCatalogo(menuItem); closeMenu()"
        [class]="menuItem.estado
          ? 'w-full flex items-center gap-2.5 px-3 py-2 text-xs text-red-600 hover:bg-red-50'
          : 'w-full flex items-center gap-2.5 px-3 py-2 text-xs text-green-700 hover:bg-green-50'">
        @if (menuItem.estado) {
          <svg class="h-3.5 w-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"/>
          </svg>
          Deshabilitar
        } @else {
          <svg class="h-3.5 w-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
          Habilitar
        }
      </button>
    }
  </div>
  <div class="fixed inset-0 z-40" (click)="closeMenu()"></div>
}
` }]
  }], () => [{ type: CatalogoService }, { type: AuthService }, { type: NgZone }, { type: ToastrAlertService }], { selectedId: [{
    type: Input
  }], seleccionar: [{
    type: Output
  }], nuevo: [{
    type: Output
  }], editar: [{
    type: Output
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(CatalogoLista, { className: "CatalogoLista", filePath: "src/app/features/admin-catalogos/catalogo/lista/catalogo-lista.ts", lineNumber: 20 });
})();

// src/app/features/admin-catalogos/catalogo/formulario/catalogo-formulario.ts
function CatalogoFormulario_Conditional_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 14);
    \u0275\u0275element(1, "circle", 15)(2, "path", 16);
    \u0275\u0275elementEnd();
    \u0275\u0275text(3, " Guardando... ");
  }
}
function CatalogoFormulario_Conditional_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275textInterpolate1(" ", ctx_r0.modoEdicion ? "Actualizar" : "Crear cat\xE1logo", " ");
  }
}
var CatalogoFormulario = class _CatalogoFormulario {
  catService;
  toastrAlert;
  editingRecord = null;
  guardado = new EventEmitter();
  cancelado = new EventEmitter();
  destroy$ = new Subject();
  saving = false;
  nombre = "";
  descripcion = "";
  get modoEdicion() {
    return !!this.editingRecord;
  }
  constructor(catService, toastrAlert) {
    this.catService = catService;
    this.toastrAlert = toastrAlert;
  }
  ngOnInit() {
    if (this.editingRecord) {
      this.nombre = this.editingRecord.nombre;
      this.descripcion = this.editingRecord.descripcion ?? "";
    }
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  guardar() {
    if (!this.nombre.trim()) {
      this.toastrAlert.showError("El nombre es obligatorio.", "Campo requerido");
      return;
    }
    this.saving = true;
    const payload = {
      nombre: this.nombre.trim(),
      descripcion: this.descripcion.trim() || null
    };
    const op$ = this.modoEdicion ? this.catService.updateCatalogo(this.editingRecord.id, payload) : this.catService.createCatalogo(payload);
    op$.pipe(takeUntil(this.destroy$)).subscribe({
      next: (result) => {
        this.saving = false;
        this.toastrAlert.showSuccess(this.modoEdicion ? "Cat\xE1logo actualizado correctamente." : "Cat\xE1logo creado correctamente.", this.modoEdicion ? "\xA1Actualizado!" : "\xA1Creado!");
        this.guardado.emit(result);
      },
      error: () => {
        this.saving = false;
        this.toastrAlert.showError("No se pudo guardar el cat\xE1logo.", "Error");
      }
    });
  }
  static \u0275fac = function CatalogoFormulario_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CatalogoFormulario)(\u0275\u0275directiveInject(CatalogoService), \u0275\u0275directiveInject(ToastrAlertService));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _CatalogoFormulario, selectors: [["app-catalogo-formulario"]], inputs: { editingRecord: "editingRecord" }, outputs: { guardado: "guardado", cancelado: "cancelado" }, decls: 24, vars: 8, consts: [[1, "bg-white", "rounded-lg", "shadow-sm", "border", "border-slate-200", "p-6", "max-w-lg"], [1, "flex", "items-center", "gap-3", "mb-6"], ["type", "button", 1, "h-8", "w-8", "flex", "items-center", "justify-center", "rounded", "border", "border-slate-200", "text-slate-500", "hover:bg-slate-100", "transition-colors", 3, "click"], ["fill", "none", "viewBox", "0 0 24 24", "stroke", "currentColor", 1, "h-4", "w-4"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M15 19l-7-7 7-7"], [1, "text-sm", "font-bold", "text-slate-700"], [1, "space-y-4"], [1, "block", "text-xs", "font-semibold", "text-slate-600", "mb-1"], [1, "text-red-500"], ["type", "text", "placeholder", "Nombre del cat\xE1logo", 1, "w-full", "border", "border-slate-300", "rounded", "px-3", "py-2", "text-sm", "text-slate-700", "focus:outline-none", "focus:ring-2", "focus:ring-blue-300", "focus:border-blue-400", "transition", 3, "ngModelChange", "ngModel", "disabled"], ["rows", "3", "placeholder", "Descripci\xF3n opcional", 1, "w-full", "border", "border-slate-300", "rounded", "px-3", "py-2", "text-sm", "text-slate-700", "focus:outline-none", "focus:ring-2", "focus:ring-blue-300", "focus:border-blue-400", "transition", "resize-none", 3, "ngModelChange", "ngModel", "disabled"], [1, "flex", "items-center", "gap-3", "mt-6"], ["type", "button", 1, "bg-[#1e3a8a]", "text-white", "px-5", "py-2", "rounded", "text-sm", "font-bold", "shadow-sm", "hover:bg-[#2541b2]", "disabled:opacity-50", "disabled:cursor-not-allowed", "transition-all", "flex", "items-center", "gap-2", 3, "click", "disabled"], ["type", "button", 1, "px-5", "py-2", "rounded", "text-sm", "font-medium", "border", "border-slate-300", "text-slate-600", "hover:bg-slate-50", "disabled:opacity-50", "transition-all", 3, "click", "disabled"], ["fill", "none", "viewBox", "0 0 24 24", 1, "h-4", "w-4", "animate-spin"], ["cx", "12", "cy", "12", "r", "10", "stroke", "currentColor", "stroke-width", "4", 1, "opacity-25"], ["fill", "currentColor", "d", "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z", 1, "opacity-75"]], template: function CatalogoFormulario_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "button", 2);
      \u0275\u0275listener("click", function CatalogoFormulario_Template_button_click_2_listener() {
        return ctx.cancelado.emit();
      });
      \u0275\u0275namespaceSVG();
      \u0275\u0275elementStart(3, "svg", 3);
      \u0275\u0275element(4, "path", 4);
      \u0275\u0275elementEnd()();
      \u0275\u0275namespaceHTML();
      \u0275\u0275elementStart(5, "h3", 5);
      \u0275\u0275text(6);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(7, "div", 6)(8, "div")(9, "label", 7);
      \u0275\u0275text(10, " Nombre ");
      \u0275\u0275elementStart(11, "span", 8);
      \u0275\u0275text(12, "*");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(13, "input", 9);
      \u0275\u0275twoWayListener("ngModelChange", function CatalogoFormulario_Template_input_ngModelChange_13_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.nombre, $event) || (ctx.nombre = $event);
        return $event;
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(14, "div")(15, "label", 7);
      \u0275\u0275text(16, "Descripci\xF3n");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(17, "textarea", 10);
      \u0275\u0275twoWayListener("ngModelChange", function CatalogoFormulario_Template_textarea_ngModelChange_17_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.descripcion, $event) || (ctx.descripcion = $event);
        return $event;
      });
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(18, "div", 11)(19, "button", 12);
      \u0275\u0275listener("click", function CatalogoFormulario_Template_button_click_19_listener() {
        return ctx.guardar();
      });
      \u0275\u0275conditionalCreate(20, CatalogoFormulario_Conditional_20_Template, 4, 0)(21, CatalogoFormulario_Conditional_21_Template, 1, 1);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(22, "button", 13);
      \u0275\u0275listener("click", function CatalogoFormulario_Template_button_click_22_listener() {
        return ctx.cancelado.emit();
      });
      \u0275\u0275text(23, " Cancelar ");
      \u0275\u0275elementEnd()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(6);
      \u0275\u0275textInterpolate1(" ", ctx.modoEdicion ? "Editar cat\xE1logo" : "Nuevo cat\xE1logo", " ");
      \u0275\u0275advance(7);
      \u0275\u0275twoWayProperty("ngModel", ctx.nombre);
      \u0275\u0275property("disabled", ctx.saving);
      \u0275\u0275advance(4);
      \u0275\u0275twoWayProperty("ngModel", ctx.descripcion);
      \u0275\u0275property("disabled", ctx.saving);
      \u0275\u0275advance(2);
      \u0275\u0275property("disabled", ctx.saving);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.saving ? 20 : 21);
      \u0275\u0275advance(2);
      \u0275\u0275property("disabled", ctx.saving);
    }
  }, dependencies: [CommonModule, FormsModule, DefaultValueAccessor, NgControlStatus, NgModel], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CatalogoFormulario, [{
    type: Component,
    args: [{ selector: "app-catalogo-formulario", imports: [CommonModule, FormsModule], template: `<div class="bg-white rounded-lg shadow-sm border border-slate-200 p-6 max-w-lg">

  <div class="flex items-center gap-3 mb-6">
    <button type="button" (click)="cancelado.emit()"
      class="h-8 w-8 flex items-center justify-center rounded border border-slate-200 text-slate-500 hover:bg-slate-100 transition-colors">
      <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
      </svg>
    </button>
    <h3 class="text-sm font-bold text-slate-700">
      {{ modoEdicion ? 'Editar cat\xE1logo' : 'Nuevo cat\xE1logo' }}
    </h3>
  </div>

  <div class="space-y-4">

    <div>
      <label class="block text-xs font-semibold text-slate-600 mb-1">
        Nombre <span class="text-red-500">*</span>
      </label>
      <input type="text" [(ngModel)]="nombre" placeholder="Nombre del cat\xE1logo"
        class="w-full border border-slate-300 rounded px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition"
        [disabled]="saving" />
    </div>

    <div>
      <label class="block text-xs font-semibold text-slate-600 mb-1">Descripci\xF3n</label>
      <textarea [(ngModel)]="descripcion" rows="3" placeholder="Descripci\xF3n opcional"
        class="w-full border border-slate-300 rounded px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition resize-none"
        [disabled]="saving"></textarea>
    </div>

  </div>

  <div class="flex items-center gap-3 mt-6">
    <button type="button" (click)="guardar()" [disabled]="saving"
      class="bg-[#1e3a8a] text-white px-5 py-2 rounded text-sm font-bold shadow-sm hover:bg-[#2541b2] disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2">
      @if (saving) {
        <svg class="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
        </svg>
        Guardando...
      } @else {
        {{ modoEdicion ? 'Actualizar' : 'Crear cat\xE1logo' }}
      }
    </button>
    <button type="button" (click)="cancelado.emit()" [disabled]="saving"
      class="px-5 py-2 rounded text-sm font-medium border border-slate-300 text-slate-600 hover:bg-slate-50 disabled:opacity-50 transition-all">
      Cancelar
    </button>
  </div>

</div>
` }]
  }], () => [{ type: CatalogoService }, { type: ToastrAlertService }], { editingRecord: [{
    type: Input
  }], guardado: [{
    type: Output
  }], cancelado: [{
    type: Output
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(CatalogoFormulario, { className: "CatalogoFormulario", filePath: "src/app/features/admin-catalogos/catalogo/formulario/catalogo-formulario.ts", lineNumber: 15 });
})();

// src/app/features/admin-catalogos/item-catalogo/lista/item-catalogo-lista.ts
var import_sweetalert22 = __toESM(require_sweetalert2_all());
function ItemCatalogoLista_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 18);
    \u0275\u0275listener("click", function ItemCatalogoLista_Conditional_7_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.nuevo.emit());
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 19);
    \u0275\u0275element(2, "path", 20);
    \u0275\u0275elementEnd();
    \u0275\u0275text(3, " Nuevo \xEDtem ");
    \u0275\u0275elementEnd();
  }
}
function ItemCatalogoLista_Conditional_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "col", 11);
  }
}
function ItemCatalogoLista_Conditional_30_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 15);
    \u0275\u0275text(1, "Acc.");
    \u0275\u0275elementEnd();
  }
}
function ItemCatalogoLista_Conditional_33_For_1_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tr", 21)(1, "td", 23)(2, "div", 24)(3, "button", 25);
    \u0275\u0275listener("click", function ItemCatalogoLista_Conditional_33_For_1_Conditional_0_Template_button_click_3_listener($event) {
      \u0275\u0275restoreView(_r3);
      const item_r4 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.toggleExpand(item_r4, $event));
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(4, "svg", 26);
    \u0275\u0275element(5, "path", 27);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "svg", 28);
    \u0275\u0275element(7, "path", 29);
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(8, "span", 30);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "span", 31);
    \u0275\u0275text(11, "(cat\xE1logo externo)");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const item_r4 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275attribute("colspan", ctx_r1.hasAnyAction ? 6 : 5);
    \u0275\u0275advance();
    \u0275\u0275styleProp("padding-left", item_r4.level * 16, "px");
    \u0275\u0275advance(2);
    \u0275\u0275classProp("rotate-90", item_r4.expanded);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(item_r4.nombre);
  }
}
function ItemCatalogoLista_Conditional_33_For_1_Conditional_1_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 25);
    \u0275\u0275listener("click", function ItemCatalogoLista_Conditional_33_For_1_Conditional_1_Conditional_3_Template_button_click_0_listener($event) {
      \u0275\u0275restoreView(_r5);
      const item_r4 = \u0275\u0275nextContext(2).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.toggleExpand(item_r4, $event));
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 26);
    \u0275\u0275element(2, "path", 27);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const item_r4 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275advance();
    \u0275\u0275classProp("rotate-90", item_r4.expanded);
  }
}
function ItemCatalogoLista_Conditional_33_For_1_Conditional_1_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 36);
  }
}
function ItemCatalogoLista_Conditional_33_For_1_Conditional_1_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 37);
    \u0275\u0275text(1, "\u2514");
    \u0275\u0275elementEnd();
  }
}
function ItemCatalogoLista_Conditional_33_For_1_Conditional_1_Conditional_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 40);
    \u0275\u0275text(1, "Activo");
    \u0275\u0275elementEnd();
  }
}
function ItemCatalogoLista_Conditional_33_For_1_Conditional_1_Conditional_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 41);
    \u0275\u0275text(1, "Inactivo");
    \u0275\u0275elementEnd();
  }
}
function ItemCatalogoLista_Conditional_33_For_1_Conditional_1_Conditional_20_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 44);
    \u0275\u0275element(1, "circle", 46)(2, "path", 47);
    \u0275\u0275elementEnd();
  }
}
function ItemCatalogoLista_Conditional_33_For_1_Conditional_1_Conditional_20_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 45);
    \u0275\u0275element(1, "path", 48);
    \u0275\u0275elementEnd();
  }
}
function ItemCatalogoLista_Conditional_33_For_1_Conditional_1_Conditional_20_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "td", 15)(1, "div", 42)(2, "button", 43);
    \u0275\u0275listener("click", function ItemCatalogoLista_Conditional_33_For_1_Conditional_1_Conditional_20_Template_button_click_2_listener($event) {
      \u0275\u0275restoreView(_r6);
      const item_r4 = \u0275\u0275nextContext(2).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.toggleMenu(item_r4.id, item_r4, $event));
    });
    \u0275\u0275conditionalCreate(3, ItemCatalogoLista_Conditional_33_For_1_Conditional_1_Conditional_20_Conditional_3_Template, 3, 0, ":svg:svg", 44)(4, ItemCatalogoLista_Conditional_33_For_1_Conditional_1_Conditional_20_Conditional_4_Template, 2, 0, ":svg:svg", 45);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const item_r4 = \u0275\u0275nextContext(2).$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r1.procesandoId === item_r4.id);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.procesandoId === item_r4.id ? 3 : 4);
  }
}
function ItemCatalogoLista_Conditional_33_For_1_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr", 32)(1, "td", 33)(2, "div", 34);
    \u0275\u0275conditionalCreate(3, ItemCatalogoLista_Conditional_33_For_1_Conditional_1_Conditional_3_Template, 3, 2, "button", 35)(4, ItemCatalogoLista_Conditional_33_For_1_Conditional_1_Conditional_4_Template, 1, 0, "span", 36);
    \u0275\u0275conditionalCreate(5, ItemCatalogoLista_Conditional_33_For_1_Conditional_1_Conditional_5_Template, 2, 0, "span", 37);
    \u0275\u0275elementStart(6, "span", 38);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(8, "td", 14)(9, "span", 39);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(11, "td", 14)(12, "span", 39);
    \u0275\u0275text(13);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(14, "td", 14)(15, "span", 39);
    \u0275\u0275text(16);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(17, "td", 14);
    \u0275\u0275conditionalCreate(18, ItemCatalogoLista_Conditional_33_For_1_Conditional_1_Conditional_18_Template, 2, 0, "span", 40)(19, ItemCatalogoLista_Conditional_33_For_1_Conditional_1_Conditional_19_Template, 2, 0, "span", 41);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(20, ItemCatalogoLista_Conditional_33_For_1_Conditional_1_Conditional_20_Template, 5, 2, "td", 15);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r4 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275classProp("opacity-50", !item_r4.estado);
    \u0275\u0275advance(2);
    \u0275\u0275styleProp("padding-left", item_r4.level * 16, "px");
    \u0275\u0275advance();
    \u0275\u0275conditional(item_r4.hasChildren ? 3 : 4);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(item_r4.level > 0 ? 5 : -1);
    \u0275\u0275advance();
    \u0275\u0275classProp("font-semibold", item_r4.level === 0);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", item_r4.nombre, " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(item_r4.sigla ?? "\u2014");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(item_r4.valor ?? "\u2014");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(item_r4.orden ?? "\u2014");
    \u0275\u0275advance(2);
    \u0275\u0275conditional(item_r4.estado ? 18 : 19);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.hasAnyAction ? 20 : -1);
  }
}
function ItemCatalogoLista_Conditional_33_For_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, ItemCatalogoLista_Conditional_33_For_1_Conditional_0_Template, 12, 6, "tr", 21)(1, ItemCatalogoLista_Conditional_33_For_1_Conditional_1_Template, 21, 14, "tr", 22);
  }
  if (rf & 2) {
    const item_r4 = ctx.$implicit;
    \u0275\u0275conditional(item_r4.isExternal ? 0 : 1);
  }
}
function ItemCatalogoLista_Conditional_33_ForEmpty_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td", 49);
    \u0275\u0275text(2, " No hay \xEDtems para este cat\xE1logo. ");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275attribute("colspan", ctx_r1.hasAnyAction ? 6 : 5);
  }
}
function ItemCatalogoLista_Conditional_33_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275repeaterCreate(0, ItemCatalogoLista_Conditional_33_For_1_Template, 2, 1, null, null, \u0275\u0275componentInstance().trackByFn, true, ItemCatalogoLista_Conditional_33_ForEmpty_2_Template, 3, 1, "tr");
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275repeater(ctx_r1.pagedItems);
  }
}
function ItemCatalogoLista_Conditional_35_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 54);
    \u0275\u0275listener("click", function ItemCatalogoLista_Conditional_35_Conditional_1_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r8);
      const ctx_r1 = \u0275\u0275nextContext(2);
      ctx_r1.editar.emit(ctx_r1.menuItem);
      return \u0275\u0275resetView(ctx_r1.closeMenu());
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 55);
    \u0275\u0275element(2, "path", 56);
    \u0275\u0275elementEnd();
    \u0275\u0275text(3, " Editar ");
    \u0275\u0275elementEnd();
  }
}
function ItemCatalogoLista_Conditional_35_Conditional_2_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 55);
    \u0275\u0275element(1, "path", 58);
    \u0275\u0275elementEnd();
    \u0275\u0275text(2, " Deshabilitar ");
  }
}
function ItemCatalogoLista_Conditional_35_Conditional_2_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 55);
    \u0275\u0275element(1, "path", 59);
    \u0275\u0275elementEnd();
    \u0275\u0275text(2, " Habilitar ");
  }
}
function ItemCatalogoLista_Conditional_35_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 57);
    \u0275\u0275listener("click", function ItemCatalogoLista_Conditional_35_Conditional_2_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r9);
      const ctx_r1 = \u0275\u0275nextContext(2);
      ctx_r1.toggleEstadoItem(ctx_r1.menuItem);
      return \u0275\u0275resetView(ctx_r1.closeMenu());
    });
    \u0275\u0275conditionalCreate(1, ItemCatalogoLista_Conditional_35_Conditional_2_Conditional_1_Template, 3, 0)(2, ItemCatalogoLista_Conditional_35_Conditional_2_Conditional_2_Template, 3, 0);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275classMap(ctx_r1.menuItem.estado ? "w-full flex items-center gap-2.5 px-3 py-2 text-xs text-red-600 hover:bg-red-50" : "w-full flex items-center gap-2.5 px-3 py-2 text-xs text-green-700 hover:bg-green-50");
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.menuItem.estado ? 1 : 2);
  }
}
function ItemCatalogoLista_Conditional_35_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 50);
    \u0275\u0275conditionalCreate(1, ItemCatalogoLista_Conditional_35_Conditional_1_Template, 4, 0, "button", 51);
    \u0275\u0275conditionalCreate(2, ItemCatalogoLista_Conditional_35_Conditional_2_Template, 3, 3, "button", 52);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 53);
    \u0275\u0275listener("click", function ItemCatalogoLista_Conditional_35_Template_div_click_3_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.closeMenu());
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275styleProp("top", ctx_r1.menuPos.top, "px")("right", ctx_r1.menuPos.right, "px");
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.canEdit() ? 1 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.canDelete() ? 2 : -1);
  }
}
function buildFlat(items, parentId, level, collapsed) {
  const knownIds = new Set(items.map((i) => i.id));
  const children = items.filter((i) => {
    if (parentId === null) {
      return i.item_catalogo_id === null || !knownIds.has(i.item_catalogo_id);
    }
    return i.item_catalogo_id === parentId;
  }).sort((a, b) => (a.orden ?? 999) - (b.orden ?? 999));
  const result = [];
  for (const item of children) {
    const hasChildren = items.some((i) => i.item_catalogo_id === item.id);
    const isExpanded = !collapsed.has(item.id);
    const isExternal = item["_isExternal"] === true;
    result.push(__spreadProps(__spreadValues({}, item), { level, hasChildren, expanded: isExpanded, isExternal }));
    if (isExpanded) {
      result.push(...buildFlat(items, item.id, level + 1, collapsed));
    }
  }
  return result;
}
function buildFakeMeta(total, page, pageSize) {
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  return {
    total,
    totalPages,
    page,
    limit: pageSize,
    skip: (page - 1) * pageSize,
    hasNextPage: page < totalPages,
    hasPrevPage: page > 1,
    nextPage: page < totalPages ? page + 1 : null,
    prevPage: page > 1 ? page - 1 : null
  };
}
var ItemCatalogoLista = class _ItemCatalogoLista {
  catService;
  authService;
  zone;
  toastrAlert;
  catalogo;
  reloadTrigger = 0;
  nuevo = new EventEmitter();
  editar = new EventEmitter();
  loading = true;
  allItems = [];
  allFlatItems = [];
  pagedItems = [];
  meta = null;
  currentPage = 1;
  PAGE_SIZE = 15;
  collapsedIds = /* @__PURE__ */ new Set();
  openMenuId = null;
  menuItem = null;
  menuPos = null;
  procesandoId = null;
  destroy$ = new Subject();
  userAppRole = computed(() => {
    const roles = this.authService.userProfile()?.roles ?? [];
    return Object.values(AppRole).find((r) => roles.includes(r)) ?? null;
  }, ...ngDevMode ? [{ debugName: "userAppRole" }] : []);
  canEdit = computed(() => {
    const role = this.userAppRole();
    return role ? hasPermission(MenuKey.ADMIN_CATALOGOS, role, "editar") : false;
  }, ...ngDevMode ? [{ debugName: "canEdit" }] : []);
  canDelete = computed(() => {
    const role = this.userAppRole();
    return role ? hasPermission(MenuKey.ADMIN_CATALOGOS, role, "eliminar") : false;
  }, ...ngDevMode ? [{ debugName: "canDelete" }] : []);
  canCrear = computed(() => {
    const role = this.userAppRole();
    return role ? hasPermission(MenuKey.ADMIN_CATALOGOS, role, "crear") : false;
  }, ...ngDevMode ? [{ debugName: "canCrear" }] : []);
  get hasAnyAction() {
    return this.canEdit() || this.canDelete();
  }
  constructor(catService, authService, zone, toastrAlert) {
    this.catService = catService;
    this.authService = authService;
    this.zone = zone;
    this.toastrAlert = toastrAlert;
  }
  ngOnInit() {
    this.cargarDatos();
  }
  ngOnChanges(changes) {
    if (changes["catalogo"] && !changes["catalogo"].firstChange || changes["reloadTrigger"] && !changes["reloadTrigger"].firstChange) {
      this.collapsedIds.clear();
      this.currentPage = 1;
      this.cargarDatos();
    }
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  cargarDatos() {
    this.loading = true;
    this.catService.getAllItemsAdmin(this.catalogo.id).pipe(takeUntil(this.destroy$), switchMap((localItems) => {
      const localIds = new Set(localItems.map((i) => i.id));
      const externalParentIds = [
        ...new Set(localItems.map((i) => i.item_catalogo_id).filter((pid) => pid !== null && !localIds.has(pid)))
      ];
      if (externalParentIds.length === 0) {
        return of({ localItems, externalParents: [] });
      }
      return this.catService.getItemsByIds(externalParentIds).pipe(switchMap((externalParents) => of({ localItems, externalParents })));
    })).subscribe({
      next: ({ localItems, externalParents }) => {
        const virtuales = externalParents.map((p) => __spreadProps(__spreadValues({}, p), { _isExternal: true }));
        this.allItems = [...virtuales, ...localItems];
        this.rebuildFlat();
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }
  rebuildFlat() {
    this.allFlatItems = buildFlat(this.allItems, null, 0, this.collapsedIds);
    this.applyPage(this.currentPage);
  }
  applyPage(page) {
    this.currentPage = page;
    const start = (page - 1) * this.PAGE_SIZE;
    this.pagedItems = this.allFlatItems.slice(start, start + this.PAGE_SIZE);
    this.meta = buildFakeMeta(this.allFlatItems.length, page, this.PAGE_SIZE);
  }
  toggleExpand(item, event) {
    event.stopPropagation();
    if (this.collapsedIds.has(item.id)) {
      this.collapsedIds.delete(item.id);
    } else {
      this.collapsedIds.add(item.id);
    }
    this.rebuildFlat();
  }
  toggleMenu(id, item, event) {
    event.stopPropagation();
    if (this.openMenuId === id) {
      this.openMenuId = null;
      this.menuItem = null;
      this.menuPos = null;
    } else {
      const btn = event.currentTarget;
      const rect = btn.getBoundingClientRect();
      this.openMenuId = id;
      this.menuItem = item;
      this.menuPos = { top: rect.bottom + 4, right: window.innerWidth - rect.right };
    }
  }
  closeMenu() {
    this.openMenuId = null;
    this.menuItem = null;
    this.menuPos = null;
  }
  async toggleEstadoItem(item) {
    const accion = item.estado ? "deshabilitar" : "habilitar";
    const confirm = await import_sweetalert22.default.fire({
      icon: "warning",
      title: `\xBF${item.estado ? "Deshabilitar" : "Habilitar"} \xEDtem?`,
      text: `Se ${accion}\xE1 "${item.nombre}".`,
      showCancelButton: true,
      confirmButtonColor: item.estado ? "#d33" : "#16a34a",
      cancelButtonColor: "#6b7280",
      confirmButtonText: `S\xED, ${accion}`,
      cancelButtonText: "Cancelar"
    });
    if (!confirm.isConfirmed)
      return;
    this.procesandoId = item.id;
    const call$ = this.catService.toggleItemCatalogo(item.id, !item.estado);
    call$.pipe(takeUntil(this.destroy$), finalize(() => {
      this.procesandoId = null;
    })).subscribe({
      next: () => this.zone.run(() => {
        this.toastrAlert.showSuccess(`\xCDtem ${item.estado ? "deshabilitado" : "habilitado"}.`, "\xA1Listo!");
        this.cargarDatos();
      }),
      error: () => this.zone.run(() => this.toastrAlert.showError(`No se pudo ${accion} el \xEDtem.`, "Error"))
    });
  }
  trackByFn(_, item) {
    return item.id;
  }
  static \u0275fac = function ItemCatalogoLista_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ItemCatalogoLista)(\u0275\u0275directiveInject(CatalogoService), \u0275\u0275directiveInject(AuthService), \u0275\u0275directiveInject(NgZone), \u0275\u0275directiveInject(ToastrAlertService));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ItemCatalogoLista, selectors: [["app-item-catalogo-lista"]], inputs: { catalogo: "catalogo", reloadTrigger: "reloadTrigger" }, outputs: { nuevo: "nuevo", editar: "editar" }, features: [\u0275\u0275NgOnChangesFeature], decls: 36, vars: 12, consts: [[1, "bg-white", "rounded-lg", "shadow-sm", "border", "border-slate-200", "p-4"], [1, "flex", "items-center", "justify-between", "mb-4"], [1, "text-sm", "font-bold", "text-slate-700", "uppercase", "tracking-wide"], [1, "text-[11px]", "text-slate-400", "mt-0.5"], ["type", "button", 1, "bg-[#1e3a8a]", "text-white", "px-3", "py-1.5", "rounded", "text-xs", "font-bold", "shadow-sm", "hover:bg-[#2541b2]", "transition-all", "flex", "items-center", "gap-1.5"], [1, "border", "border-slate-200", "rounded", "overflow-hidden"], [1, "overflow-x-auto"], [1, "w-full", "text-sm", "border-collapse", "table-fixed"], [1, "w-[40%]"], [1, "w-[80px]"], [1, "w-[60px]"], [1, "w-[50px]"], [1, "bg-slate-50", "text-[10px]", "font-bold", "text-slate-500", "uppercase", "border-b", "border-slate-200", "tracking-wider"], [1, "px-3", "py-2.5", "border-r", "border-slate-100", "text-left"], [1, "px-3", "py-2.5", "border-r", "border-slate-100", "text-center"], [1, "px-2", "py-2.5", "text-center"], ["appTableSkeleton", "", 3, "rows", "cols", "actionButtons"], ["itemLabel", "\xEDtems", 3, "pageChange", "meta", "currentPage", "itemsShown"], ["type", "button", 1, "bg-[#1e3a8a]", "text-white", "px-3", "py-1.5", "rounded", "text-xs", "font-bold", "shadow-sm", "hover:bg-[#2541b2]", "transition-all", "flex", "items-center", "gap-1.5", 3, "click"], ["fill", "none", "viewBox", "0 0 24 24", "stroke", "currentColor", 1, "w-3.5", "h-3.5"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M12 4v16m8-8H4"], [1, "border-b", "border-slate-100", "bg-slate-50"], [1, "border-b", "border-slate-100", "hover:bg-slate-50", "transition-colors", 3, "opacity-50"], [1, "px-3", "py-2", "border-r", "border-slate-100"], [1, "flex", "items-center", "gap-1.5"], ["type", "button", 1, "h-4", "w-4", "flex", "items-center", "justify-center", "text-slate-400", "hover:text-slate-600", "shrink-0", "transition-colors", 3, "click"], ["fill", "none", "viewBox", "0 0 24 24", "stroke", "currentColor", 1, "h-3", "w-3", "transition-transform", "duration-150"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2.5", "d", "M9 5l7 7-7 7"], ["fill", "none", "viewBox", "0 0 24 24", "stroke", "currentColor", 1, "h-3.5", "w-3.5", "text-slate-400", "shrink-0"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"], [1, "text-[11px]", "font-semibold", "text-slate-500", "italic", "truncate"], [1, "text-[10px]", "text-slate-400", "ml-1"], [1, "border-b", "border-slate-100", "hover:bg-slate-50", "transition-colors"], [1, "px-3", "py-2.5", "border-r", "border-slate-100"], [1, "flex", "items-center", "gap-1"], ["type", "button", 1, "h-4", "w-4", "flex", "items-center", "justify-center", "text-slate-400", "hover:text-slate-600", "shrink-0", "transition-colors"], [1, "w-4", "shrink-0"], [1, "text-slate-300", "text-xs", "mr-1"], [1, "text-xs", "text-slate-700", "truncate"], [1, "text-xs", "text-slate-500"], [1, "inline-flex", "items-center", "px-1.5", "py-0.5", "rounded", "text-[10px]", "font-semibold", "bg-green-100", "text-green-700"], [1, "inline-flex", "items-center", "px-1.5", "py-0.5", "rounded", "text-[10px]", "font-semibold", "bg-slate-100", "text-slate-500"], [1, "flex", "items-center", "justify-center"], ["type", "button", "title", "M\xE1s acciones", 1, "h-8", "w-8", "flex", "items-center", "justify-center", "rounded", "border", "border-slate-300", "text-slate-500", "bg-white", "hover:bg-slate-100", "disabled:opacity-40", "transition-colors", "shrink-0", 3, "click", "disabled"], ["fill", "none", "viewBox", "0 0 24 24", 1, "h-3.5", "w-3.5", "animate-spin"], ["fill", "currentColor", "viewBox", "0 0 20 20", 1, "h-4", "w-4"], ["cx", "12", "cy", "12", "r", "10", "stroke", "currentColor", "stroke-width", "4", 1, "opacity-25"], ["fill", "currentColor", "d", "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z", 1, "opacity-75"], ["d", "M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"], [1, "p-10", "text-slate-400", "italic", "text-center", "text-xs"], [1, "fixed", "z-50", "bg-white", "border", "border-slate-200", "rounded-lg", "shadow-lg", "py-1", "w-40"], ["type", "button", 1, "w-full", "flex", "items-center", "gap-2.5", "px-3", "py-2", "text-xs", "text-amber-700", "hover:bg-amber-50"], ["type", "button", 3, "class"], [1, "fixed", "inset-0", "z-40", 3, "click"], ["type", "button", 1, "w-full", "flex", "items-center", "gap-2.5", "px-3", "py-2", "text-xs", "text-amber-700", "hover:bg-amber-50", 3, "click"], ["fill", "none", "viewBox", "0 0 24 24", "stroke", "currentColor", 1, "h-3.5", "w-3.5", "shrink-0"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"], ["type", "button", 3, "click"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"]], template: function ItemCatalogoLista_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div")(3, "h3", 2);
      \u0275\u0275text(4, "\xCDtems");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(5, "p", 3);
      \u0275\u0275text(6);
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(7, ItemCatalogoLista_Conditional_7_Template, 4, 0, "button", 4);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(8, "div", 5)(9, "div", 6)(10, "table", 7)(11, "colgroup");
      \u0275\u0275element(12, "col", 8)(13, "col", 9)(14, "col", 9)(15, "col", 10)(16, "col", 10);
      \u0275\u0275conditionalCreate(17, ItemCatalogoLista_Conditional_17_Template, 1, 0, "col", 11);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(18, "thead")(19, "tr", 12)(20, "th", 13);
      \u0275\u0275text(21, "Nombre");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(22, "th", 14);
      \u0275\u0275text(23, "Sigla");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(24, "th", 14);
      \u0275\u0275text(25, "Valor");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(26, "th", 14);
      \u0275\u0275text(27, "Orden");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(28, "th", 14);
      \u0275\u0275text(29, "Estado");
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(30, ItemCatalogoLista_Conditional_30_Template, 2, 0, "th", 15);
      \u0275\u0275elementEnd()();
      \u0275\u0275element(31, "tbody", 16);
      \u0275\u0275elementStart(32, "tbody");
      \u0275\u0275conditionalCreate(33, ItemCatalogoLista_Conditional_33_Template, 3, 1);
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(34, "app-pagination", 17);
      \u0275\u0275listener("pageChange", function ItemCatalogoLista_Template_app_pagination_pageChange_34_listener($event) {
        return ctx.applyPage($event);
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(35, ItemCatalogoLista_Conditional_35_Template, 4, 6);
    }
    if (rf & 2) {
      \u0275\u0275advance(6);
      \u0275\u0275textInterpolate(ctx.catalogo.nombre);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.canCrear() ? 7 : -1);
      \u0275\u0275advance(10);
      \u0275\u0275conditional(ctx.hasAnyAction ? 17 : -1);
      \u0275\u0275advance(13);
      \u0275\u0275conditional(ctx.hasAnyAction ? 30 : -1);
      \u0275\u0275advance();
      \u0275\u0275property("rows", ctx.loading ? 8 : 0)("cols", 5)("actionButtons", ctx.hasAnyAction ? 1 : 0);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(!ctx.loading ? 33 : -1);
      \u0275\u0275advance();
      \u0275\u0275property("meta", ctx.meta)("currentPage", ctx.currentPage)("itemsShown", ctx.pagedItems.length);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.openMenuId !== null && ctx.menuItem && ctx.menuPos ? 35 : -1);
    }
  }, dependencies: [CommonModule, PaginationComponent, TableSkeleton], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ItemCatalogoLista, [{
    type: Component,
    args: [{ selector: "app-item-catalogo-lista", imports: [CommonModule, PaginationComponent, TableSkeleton], template: `<div class="bg-white rounded-lg shadow-sm border border-slate-200 p-4">

  <div class="flex items-center justify-between mb-4">
    <div>
      <h3 class="text-sm font-bold text-slate-700 uppercase tracking-wide">\xCDtems</h3>
      <p class="text-[11px] text-slate-400 mt-0.5">{{ catalogo.nombre }}</p>
    </div>
    @if (canCrear()) {
      <button type="button" (click)="nuevo.emit()"
        class="bg-[#1e3a8a] text-white px-3 py-1.5 rounded text-xs font-bold shadow-sm hover:bg-[#2541b2] transition-all flex items-center gap-1.5">
        <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
        </svg>
        Nuevo \xEDtem
      </button>
    }
  </div>

  <div class="border border-slate-200 rounded overflow-hidden">
    <div class="overflow-x-auto">
      <table class="w-full text-sm border-collapse table-fixed">
        <colgroup>
          <col class="w-[40%]">
          <col class="w-[80px]">
          <col class="w-[80px]">
          <col class="w-[60px]">
          <col class="w-[60px]">
          @if (hasAnyAction) {
            <col class="w-[50px]">
          }
        </colgroup>
        <thead>
          <tr class="bg-slate-50 text-[10px] font-bold text-slate-500 uppercase border-b border-slate-200 tracking-wider">
            <th class="px-3 py-2.5 border-r border-slate-100 text-left">Nombre</th>
            <th class="px-3 py-2.5 border-r border-slate-100 text-center">Sigla</th>
            <th class="px-3 py-2.5 border-r border-slate-100 text-center">Valor</th>
            <th class="px-3 py-2.5 border-r border-slate-100 text-center">Orden</th>
            <th class="px-3 py-2.5 border-r border-slate-100 text-center">Estado</th>
            @if (hasAnyAction) {
              <th class="px-2 py-2.5 text-center">Acc.</th>
            }
          </tr>
        </thead>
        <tbody appTableSkeleton [rows]="loading ? 8 : 0" [cols]="5" [actionButtons]="hasAnyAction ? 1 : 0"></tbody>
        <tbody>
          @if (!loading) {
            @for (item of pagedItems; track trackByFn($index, item)) {
              <!-- Fila externa: padre de otro cat\xE1logo, solo cabecera visual -->
              @if (item.isExternal) {
                <tr class="border-b border-slate-100 bg-slate-50">
                  <td [attr.colspan]="hasAnyAction ? 6 : 5" class="px-3 py-2 border-r border-slate-100">
                    <div class="flex items-center gap-1.5" [style.padding-left.px]="item.level * 16">
                      <button type="button" (click)="toggleExpand(item, $event)"
                        class="h-4 w-4 flex items-center justify-center text-slate-400 hover:text-slate-600 shrink-0 transition-colors">
                        <svg class="h-3 w-3 transition-transform duration-150"
                          [class.rotate-90]="item.expanded"
                          fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7"/>
                        </svg>
                      </button>
                      <svg class="h-3.5 w-3.5 text-slate-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"/>
                      </svg>
                      <span class="text-[11px] font-semibold text-slate-500 italic truncate">{{ item.nombre }}</span>
                      <span class="text-[10px] text-slate-400 ml-1">(cat\xE1logo externo)</span>
                    </div>
                  </td>
                </tr>
              } @else {
              <!-- Fila normal -->
              <tr class="border-b border-slate-100 hover:bg-slate-50 transition-colors"
                [class.opacity-50]="!item.estado">
                <td class="px-3 py-2.5 border-r border-slate-100">
                  <div class="flex items-center gap-1" [style.padding-left.px]="item.level * 16">
                    @if (item.hasChildren) {
                      <button type="button"
                        (click)="toggleExpand(item, $event)"
                        class="h-4 w-4 flex items-center justify-center text-slate-400 hover:text-slate-600 shrink-0 transition-colors">
                        <svg class="h-3 w-3 transition-transform duration-150"
                          [class.rotate-90]="item.expanded"
                          fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7"/>
                        </svg>
                      </button>
                    } @else {
                      <span class="w-4 shrink-0"></span>
                    }
                    @if (item.level > 0) {
                      <span class="text-slate-300 text-xs mr-1">\u2514</span>
                    }
                    <span class="text-xs text-slate-700 truncate" [class.font-semibold]="item.level === 0">
                      {{ item.nombre }}
                    </span>
                  </div>
                </td>
                <td class="px-3 py-2.5 border-r border-slate-100 text-center">
                  <span class="text-xs text-slate-500">{{ item.sigla ?? '\u2014' }}</span>
                </td>
                <td class="px-3 py-2.5 border-r border-slate-100 text-center">
                  <span class="text-xs text-slate-500">{{ item.valor ?? '\u2014' }}</span>
                </td>
                <td class="px-3 py-2.5 border-r border-slate-100 text-center">
                  <span class="text-xs text-slate-500">{{ item.orden ?? '\u2014' }}</span>
                </td>
                <td class="px-3 py-2.5 border-r border-slate-100 text-center">
                  @if (item.estado) {
                    <span class="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold bg-green-100 text-green-700">Activo</span>
                  } @else {
                    <span class="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold bg-slate-100 text-slate-500">Inactivo</span>
                  }
                </td>
                @if (hasAnyAction) {
                  <td class="px-2 py-2.5 text-center">
                    <div class="flex items-center justify-center">
                      <button type="button" title="M\xE1s acciones"
                        (click)="toggleMenu(item.id, item, $event)"
                        [disabled]="procesandoId === item.id"
                        class="h-8 w-8 flex items-center justify-center rounded border border-slate-300 text-slate-500 bg-white hover:bg-slate-100 disabled:opacity-40 transition-colors shrink-0">
                        @if (procesandoId === item.id) {
                          <svg class="h-3.5 w-3.5 animate-spin" fill="none" viewBox="0 0 24 24">
                            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
                            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                          </svg>
                        } @else {
                          <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"/>
                          </svg>
                        }
                      </button>
                    </div>
                  </td>
                }
              </tr>
              } <!-- end @else (fila normal) -->
            } @empty {
              <tr>
                <td [attr.colspan]="hasAnyAction ? 6 : 5" class="p-10 text-slate-400 italic text-center text-xs">
                  No hay \xEDtems para este cat\xE1logo.
                </td>
              </tr>
            }
          }
        </tbody>
      </table>
    </div>
  </div>

  <app-pagination
    [meta]="meta"
    [currentPage]="currentPage"
    [itemsShown]="pagedItems.length"
    itemLabel="\xEDtems"
    (pageChange)="applyPage($event)">
  </app-pagination>

</div>

@if (openMenuId !== null && menuItem && menuPos) {
  <div class="fixed z-50 bg-white border border-slate-200 rounded-lg shadow-lg py-1 w-40"
       [style.top.px]="menuPos.top"
       [style.right.px]="menuPos.right">
    @if (canEdit()) {
      <button type="button" (click)="editar.emit(menuItem); closeMenu()"
        class="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-amber-700 hover:bg-amber-50">
        <svg class="h-3.5 w-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
        </svg>
        Editar
      </button>
    }
    @if (canDelete()) {
      <button type="button" (click)="toggleEstadoItem(menuItem); closeMenu()"
        [class]="menuItem.estado
          ? 'w-full flex items-center gap-2.5 px-3 py-2 text-xs text-red-600 hover:bg-red-50'
          : 'w-full flex items-center gap-2.5 px-3 py-2 text-xs text-green-700 hover:bg-green-50'">
        @if (menuItem.estado) {
          <svg class="h-3.5 w-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"/>
          </svg>
          Deshabilitar
        } @else {
          <svg class="h-3.5 w-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
          Habilitar
        }
      </button>
    }
  </div>
  <div class="fixed inset-0 z-40" (click)="closeMenu()"></div>
}
` }]
  }], () => [{ type: CatalogoService }, { type: AuthService }, { type: NgZone }, { type: ToastrAlertService }], { catalogo: [{
    type: Input
  }], reloadTrigger: [{
    type: Input
  }], nuevo: [{
    type: Output
  }], editar: [{
    type: Output
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ItemCatalogoLista, { className: "ItemCatalogoLista", filePath: "src/app/features/admin-catalogos/item-catalogo/lista/item-catalogo-lista.ts", lineNumber: 69 });
})();

// src/app/features/admin-catalogos/item-catalogo/formulario/item-catalogo-formulario.ts
var _forTrack02 = ($index, $item) => $item.id;
function ItemCatalogoFormulario_Conditional_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "app-field-skeleton");
  }
}
function ItemCatalogoFormulario_Conditional_21_For_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 22);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const op_r3 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275property("value", op_r3.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.indentLabel(op_r3), " ");
  }
}
function ItemCatalogoFormulario_Conditional_21_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "select", 20);
    \u0275\u0275listener("ngModelChange", function ItemCatalogoFormulario_Conditional_21_Template_select_ngModelChange_0_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onPadreChange($event));
    });
    \u0275\u0275elementStart(1, "option", 21);
    \u0275\u0275text(2, "\u2014 Ra\xEDz (sin padre) \u2014");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(3, ItemCatalogoFormulario_Conditional_21_For_4_Template, 2, 2, "option", 22, _forTrack02);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("ngModel", ctx_r1.itemCatalogoId ?? "")("disabled", ctx_r1.saving);
    \u0275\u0275advance(3);
    \u0275\u0275repeater(ctx_r1.opcionesPadre);
  }
}
function ItemCatalogoFormulario_Conditional_44_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 23);
    \u0275\u0275element(1, "circle", 24)(2, "path", 25);
    \u0275\u0275elementEnd();
    \u0275\u0275text(3, " Guardando... ");
  }
}
function ItemCatalogoFormulario_Conditional_45_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275textInterpolate1(" ", ctx_r1.modoEdicion ? "Actualizar" : "Crear \xEDtem", " ");
  }
}
var ItemCatalogoFormulario = class _ItemCatalogoFormulario {
  catService;
  toastrAlert;
  catalogo;
  editingRecord = null;
  guardado = new EventEmitter();
  cancelado = new EventEmitter();
  destroy$ = new Subject();
  saving = false;
  loadingPadres = true;
  opcionesPadre = [];
  nombre = "";
  sigla = "";
  valor = "";
  grupo = "";
  orden = null;
  itemCatalogoId = null;
  get modoEdicion() {
    return !!this.editingRecord;
  }
  constructor(catService, toastrAlert) {
    this.catService = catService;
    this.toastrAlert = toastrAlert;
  }
  ngOnInit() {
    if (this.editingRecord) {
      this.nombre = this.editingRecord.nombre;
      this.sigla = this.editingRecord.sigla ?? "";
      this.valor = this.editingRecord.valor ?? "";
      this.grupo = this.editingRecord.grupo ?? "";
      this.orden = this.editingRecord.orden;
      this.itemCatalogoId = this.editingRecord.item_catalogo_id;
    }
    this.cargarPadres();
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  cargarPadres() {
    this.loadingPadres = true;
    this.catService.getAllItemsAdmin(this.catalogo.id).pipe(takeUntil(this.destroy$), switchMap((items) => {
      const knownIds = new Set(items.map((i) => i.id));
      const parentIdsInUse = new Set(items.map((i) => i.item_catalogo_id).filter((id) => id !== null));
      const internalParents = items.filter((i) => parentIdsInUse.has(i.id) && i.id !== this.editingRecord?.id);
      const externalParentIds = [...new Set([...parentIdsInUse].filter((id) => !knownIds.has(id)))];
      if (externalParentIds.length === 0) {
        return of({ internalParents, externalParents: [] });
      }
      return this.catService.getItemsByIds(externalParentIds).pipe(map((ext) => ({ internalParents, externalParents: ext })));
    })).subscribe({
      next: ({ internalParents, externalParents }) => {
        this.opcionesPadre = [
          ...externalParents.map((p) => ({ id: p.id, label: p.nombre, level: 0 })),
          ...internalParents.map((p) => ({ id: p.id, label: p.nombre, level: 0 }))
        ];
        this.loadingPadres = false;
      },
      error: () => {
        this.loadingPadres = false;
      }
    });
  }
  get indentLabel() {
    return (op) => "\xA0".repeat(op.level * 4) + (op.level > 0 ? "\u2514 " : "") + op.label;
  }
  guardar() {
    if (!this.nombre.trim()) {
      this.toastrAlert.showError("El nombre es obligatorio.", "Campo requerido");
      return;
    }
    this.saving = true;
    const payload = {
      catalogo_id: this.catalogo.id,
      nombre: this.nombre.trim(),
      sigla: this.sigla.trim() || null,
      valor: this.valor.trim() || null,
      grupo: this.grupo.trim() || null,
      orden: this.orden,
      item_catalogo_id: this.itemCatalogoId
    };
    const op$ = this.modoEdicion ? this.catService.updateItemCatalogo(this.editingRecord.id, payload) : this.catService.createItemCatalogo(payload);
    op$.pipe(takeUntil(this.destroy$)).subscribe({
      next: () => {
        this.saving = false;
        this.toastrAlert.showSuccess(this.modoEdicion ? "\xCDtem actualizado correctamente." : "\xCDtem creado correctamente.", this.modoEdicion ? "\xA1Actualizado!" : "\xA1Creado!");
        this.guardado.emit();
      },
      error: () => {
        this.saving = false;
        this.toastrAlert.showError("No se pudo guardar el \xEDtem.", "Error");
      }
    });
  }
  onOrdenChange(val) {
    const n = parseInt(val, 10);
    this.orden = isNaN(n) ? null : n;
  }
  onPadreChange(val) {
    const n = parseInt(val, 10);
    this.itemCatalogoId = isNaN(n) ? null : n;
  }
  static \u0275fac = function ItemCatalogoFormulario_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ItemCatalogoFormulario)(\u0275\u0275directiveInject(CatalogoService), \u0275\u0275directiveInject(ToastrAlertService));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ItemCatalogoFormulario, selectors: [["app-item-catalogo-formulario"]], inputs: { catalogo: "catalogo", editingRecord: "editingRecord" }, outputs: { guardado: "guardado", cancelado: "cancelado" }, decls: 48, vars: 16, consts: [[1, "bg-white", "rounded-lg", "shadow-sm", "border", "border-slate-200", "p-6", "max-w-lg"], [1, "flex", "items-center", "gap-3", "mb-6"], ["type", "button", 1, "h-8", "w-8", "flex", "items-center", "justify-center", "rounded", "border", "border-slate-200", "text-slate-500", "hover:bg-slate-100", "transition-colors", 3, "click"], ["fill", "none", "viewBox", "0 0 24 24", "stroke", "currentColor", 1, "h-4", "w-4"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M15 19l-7-7 7-7"], [1, "text-sm", "font-bold", "text-slate-700"], [1, "text-[11px]", "text-slate-400", "mt-0.5"], [1, "space-y-4"], [1, "block", "text-xs", "font-semibold", "text-slate-600", "mb-1"], [1, "text-red-500"], ["type", "text", "placeholder", "Nombre del \xEDtem", 1, "w-full", "border", "border-slate-300", "rounded", "px-3", "py-2", "text-sm", "text-slate-700", "focus:outline-none", "focus:ring-2", "focus:ring-blue-300", "focus:border-blue-400", "transition", 3, "ngModelChange", "ngModel", "disabled"], [1, "w-full", "border", "border-slate-300", "rounded", "px-3", "py-2", "text-sm", "text-slate-700", "focus:outline-none", "focus:ring-2", "focus:ring-blue-300", "focus:border-blue-400", "transition", "bg-white", 3, "ngModel", "disabled"], [1, "text-[10px]", "text-slate-400", "mt-1"], [1, "grid", "grid-cols-2", "gap-3"], ["type", "text", "placeholder", "Ej. m3", 1, "w-full", "border", "border-slate-300", "rounded", "px-3", "py-2", "text-sm", "text-slate-700", "focus:outline-none", "focus:ring-2", "focus:ring-blue-300", "focus:border-blue-400", "transition", 3, "ngModelChange", "ngModel", "disabled"], ["type", "text", "placeholder", "Grupo opcional", 1, "w-full", "border", "border-slate-300", "rounded", "px-3", "py-2", "text-sm", "text-slate-700", "focus:outline-none", "focus:ring-2", "focus:ring-blue-300", "focus:border-blue-400", "transition", 3, "ngModelChange", "ngModel", "disabled"], ["type", "number", "min", "1", "placeholder", "1", 1, "w-full", "border", "border-slate-300", "rounded", "px-3", "py-2", "text-sm", "text-slate-700", "focus:outline-none", "focus:ring-2", "focus:ring-blue-300", "focus:border-blue-400", "transition", 3, "ngModelChange", "ngModel", "disabled"], [1, "flex", "items-center", "gap-3", "mt-6"], ["type", "button", 1, "bg-[#1e3a8a]", "text-white", "px-5", "py-2", "rounded", "text-sm", "font-bold", "shadow-sm", "hover:bg-[#2541b2]", "disabled:opacity-50", "disabled:cursor-not-allowed", "transition-all", "flex", "items-center", "gap-2", 3, "click", "disabled"], ["type", "button", 1, "px-5", "py-2", "rounded", "text-sm", "font-medium", "border", "border-slate-300", "text-slate-600", "hover:bg-slate-50", "disabled:opacity-50", "transition-all", 3, "click", "disabled"], [1, "w-full", "border", "border-slate-300", "rounded", "px-3", "py-2", "text-sm", "text-slate-700", "focus:outline-none", "focus:ring-2", "focus:ring-blue-300", "focus:border-blue-400", "transition", "bg-white", 3, "ngModelChange", "ngModel", "disabled"], ["value", ""], [3, "value"], ["fill", "none", "viewBox", "0 0 24 24", 1, "h-4", "w-4", "animate-spin"], ["cx", "12", "cy", "12", "r", "10", "stroke", "currentColor", "stroke-width", "4", 1, "opacity-25"], ["fill", "currentColor", "d", "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z", 1, "opacity-75"]], template: function ItemCatalogoFormulario_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "button", 2);
      \u0275\u0275listener("click", function ItemCatalogoFormulario_Template_button_click_2_listener() {
        return ctx.cancelado.emit();
      });
      \u0275\u0275namespaceSVG();
      \u0275\u0275elementStart(3, "svg", 3);
      \u0275\u0275element(4, "path", 4);
      \u0275\u0275elementEnd()();
      \u0275\u0275namespaceHTML();
      \u0275\u0275elementStart(5, "div")(6, "h3", 5);
      \u0275\u0275text(7);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(8, "p", 6);
      \u0275\u0275text(9);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(10, "div", 7)(11, "div")(12, "label", 8);
      \u0275\u0275text(13, " Nombre ");
      \u0275\u0275elementStart(14, "span", 9);
      \u0275\u0275text(15, "*");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(16, "input", 10);
      \u0275\u0275twoWayListener("ngModelChange", function ItemCatalogoFormulario_Template_input_ngModelChange_16_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.nombre, $event) || (ctx.nombre = $event);
        return $event;
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(17, "div")(18, "label", 8);
      \u0275\u0275text(19, "\xCDtem padre");
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(20, ItemCatalogoFormulario_Conditional_20_Template, 1, 0, "app-field-skeleton")(21, ItemCatalogoFormulario_Conditional_21_Template, 5, 2, "select", 11);
      \u0275\u0275elementStart(22, "p", 12);
      \u0275\u0275text(23, " Selecciona un \xEDtem padre para crear una estructura jer\xE1rquica, o d\xE9jalo en ra\xEDz. ");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(24, "div", 13)(25, "div")(26, "label", 8);
      \u0275\u0275text(27, "Sigla");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(28, "input", 14);
      \u0275\u0275twoWayListener("ngModelChange", function ItemCatalogoFormulario_Template_input_ngModelChange_28_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.sigla, $event) || (ctx.sigla = $event);
        return $event;
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(29, "div")(30, "label", 8);
      \u0275\u0275text(31, "Valor");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(32, "input", 14);
      \u0275\u0275twoWayListener("ngModelChange", function ItemCatalogoFormulario_Template_input_ngModelChange_32_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.valor, $event) || (ctx.valor = $event);
        return $event;
      });
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(33, "div", 13)(34, "div")(35, "label", 8);
      \u0275\u0275text(36, "Grupo");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(37, "input", 15);
      \u0275\u0275twoWayListener("ngModelChange", function ItemCatalogoFormulario_Template_input_ngModelChange_37_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.grupo, $event) || (ctx.grupo = $event);
        return $event;
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(38, "div")(39, "label", 8);
      \u0275\u0275text(40, "Orden");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(41, "input", 16);
      \u0275\u0275listener("ngModelChange", function ItemCatalogoFormulario_Template_input_ngModelChange_41_listener($event) {
        return ctx.onOrdenChange($event);
      });
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(42, "div", 17)(43, "button", 18);
      \u0275\u0275listener("click", function ItemCatalogoFormulario_Template_button_click_43_listener() {
        return ctx.guardar();
      });
      \u0275\u0275conditionalCreate(44, ItemCatalogoFormulario_Conditional_44_Template, 4, 0)(45, ItemCatalogoFormulario_Conditional_45_Template, 1, 1);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(46, "button", 19);
      \u0275\u0275listener("click", function ItemCatalogoFormulario_Template_button_click_46_listener() {
        return ctx.cancelado.emit();
      });
      \u0275\u0275text(47, " Cancelar ");
      \u0275\u0275elementEnd()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(7);
      \u0275\u0275textInterpolate1(" ", ctx.modoEdicion ? "Editar \xEDtem" : "Nuevo \xEDtem", " ");
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate1("Cat\xE1logo: ", ctx.catalogo.nombre);
      \u0275\u0275advance(7);
      \u0275\u0275twoWayProperty("ngModel", ctx.nombre);
      \u0275\u0275property("disabled", ctx.saving);
      \u0275\u0275advance(4);
      \u0275\u0275conditional(ctx.loadingPadres ? 20 : 21);
      \u0275\u0275advance(8);
      \u0275\u0275twoWayProperty("ngModel", ctx.sigla);
      \u0275\u0275property("disabled", ctx.saving);
      \u0275\u0275advance(4);
      \u0275\u0275twoWayProperty("ngModel", ctx.valor);
      \u0275\u0275property("disabled", ctx.saving);
      \u0275\u0275advance(5);
      \u0275\u0275twoWayProperty("ngModel", ctx.grupo);
      \u0275\u0275property("disabled", ctx.saving);
      \u0275\u0275advance(4);
      \u0275\u0275property("ngModel", ctx.orden ?? "")("disabled", ctx.saving);
      \u0275\u0275advance(2);
      \u0275\u0275property("disabled", ctx.saving || ctx.loadingPadres);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.saving ? 44 : 45);
      \u0275\u0275advance(2);
      \u0275\u0275property("disabled", ctx.saving);
    }
  }, dependencies: [CommonModule, FormsModule, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, NumberValueAccessor, SelectControlValueAccessor, NgControlStatus, MinValidator, NgModel, FieldSkeleton], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ItemCatalogoFormulario, [{
    type: Component,
    args: [{ selector: "app-item-catalogo-formulario", imports: [CommonModule, FormsModule, FieldSkeleton], template: `<div class="bg-white rounded-lg shadow-sm border border-slate-200 p-6 max-w-lg">

  <div class="flex items-center gap-3 mb-6">
    <button type="button" (click)="cancelado.emit()"
      class="h-8 w-8 flex items-center justify-center rounded border border-slate-200 text-slate-500 hover:bg-slate-100 transition-colors">
      <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
      </svg>
    </button>
    <div>
      <h3 class="text-sm font-bold text-slate-700">
        {{ modoEdicion ? 'Editar \xEDtem' : 'Nuevo \xEDtem' }}
      </h3>
      <p class="text-[11px] text-slate-400 mt-0.5">Cat\xE1logo: {{ catalogo.nombre }}</p>
    </div>
  </div>

  <div class="space-y-4">

    <!-- Nombre -->
    <div>
      <label class="block text-xs font-semibold text-slate-600 mb-1">
        Nombre <span class="text-red-500">*</span>
      </label>
      <input type="text" [(ngModel)]="nombre" placeholder="Nombre del \xEDtem"
        class="w-full border border-slate-300 rounded px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition"
        [disabled]="saving" />
    </div>

    <!-- \xCDtem padre (recursivo) -->
    <div>
      <label class="block text-xs font-semibold text-slate-600 mb-1">\xCDtem padre</label>
      @if (loadingPadres) {
        <app-field-skeleton />
      } @else {
        <select
          [ngModel]="itemCatalogoId ?? ''"
          (ngModelChange)="onPadreChange($event)"
          class="w-full border border-slate-300 rounded px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition bg-white"
          [disabled]="saving">
          <option value="">\u2014 Ra\xEDz (sin padre) \u2014</option>
          @for (op of opcionesPadre; track op.id) {
            <option [value]="op.id">
              {{ indentLabel(op) }}
            </option>
          }
        </select>
      }
      <p class="text-[10px] text-slate-400 mt-1">
        Selecciona un \xEDtem padre para crear una estructura jer\xE1rquica, o d\xE9jalo en ra\xEDz.
      </p>
    </div>

    <!-- Sigla y Valor en fila -->
    <div class="grid grid-cols-2 gap-3">
      <div>
        <label class="block text-xs font-semibold text-slate-600 mb-1">Sigla</label>
        <input type="text" [(ngModel)]="sigla" placeholder="Ej. m3"
          class="w-full border border-slate-300 rounded px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition"
          [disabled]="saving" />
      </div>
      <div>
        <label class="block text-xs font-semibold text-slate-600 mb-1">Valor</label>
        <input type="text" [(ngModel)]="valor" placeholder="Ej. m3"
          class="w-full border border-slate-300 rounded px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition"
          [disabled]="saving" />
      </div>
    </div>

    <!-- Grupo y Orden en fila -->
    <div class="grid grid-cols-2 gap-3">
      <div>
        <label class="block text-xs font-semibold text-slate-600 mb-1">Grupo</label>
        <input type="text" [(ngModel)]="grupo" placeholder="Grupo opcional"
          class="w-full border border-slate-300 rounded px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition"
          [disabled]="saving" />
      </div>
      <div>
        <label class="block text-xs font-semibold text-slate-600 mb-1">Orden</label>
        <input type="number" min="1"
          [ngModel]="orden ?? ''"
          (ngModelChange)="onOrdenChange($event)"
          placeholder="1"
          class="w-full border border-slate-300 rounded px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition"
          [disabled]="saving" />
      </div>
    </div>

  </div>

  <div class="flex items-center gap-3 mt-6">
    <button type="button" (click)="guardar()" [disabled]="saving || loadingPadres"
      class="bg-[#1e3a8a] text-white px-5 py-2 rounded text-sm font-bold shadow-sm hover:bg-[#2541b2] disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2">
      @if (saving) {
        <svg class="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
        </svg>
        Guardando...
      } @else {
        {{ modoEdicion ? 'Actualizar' : 'Crear \xEDtem' }}
      }
    </button>
    <button type="button" (click)="cancelado.emit()" [disabled]="saving"
      class="px-5 py-2 rounded text-sm font-medium border border-slate-300 text-slate-600 hover:bg-slate-50 disabled:opacity-50 transition-all">
      Cancelar
    </button>
  </div>

</div>
` }]
  }], () => [{ type: CatalogoService }, { type: ToastrAlertService }], { catalogo: [{
    type: Input
  }], editingRecord: [{
    type: Input
  }], guardado: [{
    type: Output
  }], cancelado: [{
    type: Output
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ItemCatalogoFormulario, { className: "ItemCatalogoFormulario", filePath: "src/app/features/admin-catalogos/item-catalogo/formulario/item-catalogo-formulario.ts", lineNumber: 22 });
})();

// src/app/features/admin-catalogos/admin-catalogos.ts
function AdminCatalogos_Conditional_4_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "app-item-catalogo-lista", 11);
    \u0275\u0275listener("nuevo", function AdminCatalogos_Conditional_4_Conditional_4_Template_app_item_catalogo_lista_nuevo_0_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.onNuevoItem());
    })("editar", function AdminCatalogos_Conditional_4_Conditional_4_Template_app_item_catalogo_lista_editar_0_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.onEditarItem($event));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275property("catalogo", ctx_r1.selectedCatalogo)("reloadTrigger", ctx_r1.reloadItemsTrigger);
  }
}
function AdminCatalogos_Conditional_4_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 10);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 12);
    \u0275\u0275element(2, "path", 13);
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(3, "p", 14);
    \u0275\u0275text(4, "Selecciona un cat\xE1logo para ver sus \xEDtems");
    \u0275\u0275elementEnd()();
  }
}
function AdminCatalogos_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 4)(1, "div", 6)(2, "app-catalogo-lista", 7);
    \u0275\u0275listener("seleccionar", function AdminCatalogos_Conditional_4_Template_app_catalogo_lista_seleccionar_2_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onSelectCatalogo($event));
    })("nuevo", function AdminCatalogos_Conditional_4_Template_app_catalogo_lista_nuevo_2_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onNuevoCatalogo());
    })("editar", function AdminCatalogos_Conditional_4_Template_app_catalogo_lista_editar_2_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onEditarCatalogo($event));
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(3, "div", 8);
    \u0275\u0275conditionalCreate(4, AdminCatalogos_Conditional_4_Conditional_4_Template, 1, 2, "app-item-catalogo-lista", 9)(5, AdminCatalogos_Conditional_4_Conditional_5_Template, 5, 0, "div", 10);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275property("selectedId", (ctx_r1.selectedCatalogo == null ? null : ctx_r1.selectedCatalogo.id) ?? null);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.selectedCatalogo ? 4 : 5);
  }
}
function AdminCatalogos_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "app-catalogo-formulario", 15);
    \u0275\u0275listener("guardado", function AdminCatalogos_Conditional_5_Template_app_catalogo_formulario_guardado_0_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onCatalogoGuardado($event));
    })("cancelado", function AdminCatalogos_Conditional_5_Template_app_catalogo_formulario_cancelado_0_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.volverALista());
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("editingRecord", ctx_r1.editingCatalogo);
  }
}
function AdminCatalogos_Conditional_6_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "app-item-catalogo-formulario", 17);
    \u0275\u0275listener("guardado", function AdminCatalogos_Conditional_6_Conditional_0_Template_app_item_catalogo_formulario_guardado_0_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.onItemGuardado());
    })("cancelado", function AdminCatalogos_Conditional_6_Conditional_0_Template_app_item_catalogo_formulario_cancelado_0_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.volverALista());
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275property("catalogo", ctx_r1.selectedCatalogo)("editingRecord", ctx_r1.editingItem);
  }
}
function AdminCatalogos_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, AdminCatalogos_Conditional_6_Conditional_0_Template, 1, 2, "app-item-catalogo-formulario", 16);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275conditional(ctx_r1.selectedCatalogo ? 0 : -1);
  }
}
var AdminCatalogos = class _AdminCatalogos {
  vista = "main";
  selectedCatalogo = null;
  editingCatalogo = null;
  editingItem = null;
  reloadItemsTrigger = 0;
  onSelectCatalogo(c) {
    this.selectedCatalogo = c;
  }
  onNuevoCatalogo() {
    this.editingCatalogo = null;
    this.vista = "form-catalogo";
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  onEditarCatalogo(c) {
    this.editingCatalogo = c;
    this.vista = "form-catalogo";
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  onCatalogoGuardado(c) {
    this.selectedCatalogo = c;
    this.vista = "main";
    this.editingCatalogo = null;
  }
  onNuevoItem() {
    this.editingItem = null;
    this.vista = "form-item";
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  onEditarItem(item) {
    this.editingItem = item;
    this.vista = "form-item";
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  onItemGuardado() {
    this.vista = "main";
    this.editingItem = null;
    this.reloadItemsTrigger++;
  }
  volverALista() {
    this.editingCatalogo = null;
    this.editingItem = null;
    this.vista = "main";
  }
  static \u0275fac = function AdminCatalogos_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AdminCatalogos)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AdminCatalogos, selectors: [["app-admin-catalogos"]], decls: 7, vars: 3, consts: [[1, "p-6", "bg-slate-50", "min-h-screen", "text-slate-700", "font-sans", "pb-24"], [1, "max-w-7xl", "mx-auto"], [1, "animate-in", "fade-in"], ["breadcrumbSection", "Administraci\xF3n", "title", "Cat\xE1logos", "subtitle", "Gestiona cat\xE1logos y sus \xEDtems"], [1, "grid", "grid-cols-1", "lg:grid-cols-5", "gap-6"], [3, "editingRecord"], [1, "lg:col-span-2"], [3, "seleccionar", "nuevo", "editar", "selectedId"], [1, "lg:col-span-3"], [3, "catalogo", "reloadTrigger"], [1, "bg-white", "rounded-lg", "shadow-sm", "border", "border-slate-200", "p-12", "flex", "flex-col", "items-center", "justify-center", "text-center", "min-h-[200px]"], [3, "nuevo", "editar", "catalogo", "reloadTrigger"], ["fill", "none", "viewBox", "0 0 24 24", "stroke", "currentColor", 1, "w-10", "h-10", "text-slate-300", "mb-3"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "1.5", "d", "M4 6h16M4 10h16M4 14h8M4 18h8"], [1, "text-sm", "text-slate-400", "font-medium"], [3, "guardado", "cancelado", "editingRecord"], [3, "catalogo", "editingRecord"], [3, "guardado", "cancelado", "catalogo", "editingRecord"]], template: function AdminCatalogos_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div", 2);
      \u0275\u0275element(3, "app-page-header", 3);
      \u0275\u0275conditionalCreate(4, AdminCatalogos_Conditional_4_Template, 6, 2, "div", 4);
      \u0275\u0275conditionalCreate(5, AdminCatalogos_Conditional_5_Template, 1, 1, "app-catalogo-formulario", 5);
      \u0275\u0275conditionalCreate(6, AdminCatalogos_Conditional_6_Template, 1, 1);
      \u0275\u0275elementEnd()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(4);
      \u0275\u0275conditional(ctx.vista === "main" ? 4 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.vista === "form-catalogo" ? 5 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.vista === "form-item" ? 6 : -1);
    }
  }, dependencies: [PageHeader, CatalogoLista, CatalogoFormulario, ItemCatalogoLista, ItemCatalogoFormulario], styles: ["\n\n.animate-in[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_animateIn 0.3s ease-out forwards;\n}\n.fade-in[_ngcontent-%COMP%] {\n  opacity: 0;\n}\n@keyframes _ngcontent-%COMP%_animateIn {\n  to {\n    opacity: 1;\n  }\n}\n/*# sourceMappingURL=admin-catalogos.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AdminCatalogos, [{
    type: Component,
    args: [{ selector: "app-admin-catalogos", imports: [PageHeader, CatalogoLista, CatalogoFormulario, ItemCatalogoLista, ItemCatalogoFormulario], template: `<div class="p-6 bg-slate-50 min-h-screen text-slate-700 font-sans pb-24">
  <div class="max-w-7xl mx-auto">
    <div class="animate-in fade-in">

      <app-page-header
        breadcrumbSection="Administraci\xF3n"
        title="Cat\xE1logos"
        subtitle="Gestiona cat\xE1logos y sus \xEDtems"
      />

      @if (vista === 'main') {
        <div class="grid grid-cols-1 lg:grid-cols-5 gap-6">

          <!-- Panel izquierdo: lista de cat\xE1logos -->
          <div class="lg:col-span-2">
            <app-catalogo-lista
              [selectedId]="selectedCatalogo?.id ?? null"
              (seleccionar)="onSelectCatalogo($event)"
              (nuevo)="onNuevoCatalogo()"
              (editar)="onEditarCatalogo($event)"
            />
          </div>

          <!-- Panel derecho: \xEDtems del cat\xE1logo seleccionado -->
          <div class="lg:col-span-3">
            @if (selectedCatalogo) {
              <app-item-catalogo-lista
                [catalogo]="selectedCatalogo"
                [reloadTrigger]="reloadItemsTrigger"
                (nuevo)="onNuevoItem()"
                (editar)="onEditarItem($event)"
              />
            } @else {
              <div class="bg-white rounded-lg shadow-sm border border-slate-200 p-12 flex flex-col items-center justify-center text-center min-h-[200px]">
                <svg class="w-10 h-10 text-slate-300 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 6h16M4 10h16M4 14h8M4 18h8"/>
                </svg>
                <p class="text-sm text-slate-400 font-medium">Selecciona un cat\xE1logo para ver sus \xEDtems</p>
              </div>
            }
          </div>

        </div>
      }

      @if (vista === 'form-catalogo') {
        <app-catalogo-formulario
          [editingRecord]="editingCatalogo"
          (guardado)="onCatalogoGuardado($event)"
          (cancelado)="volverALista()"
        />
      }

      @if (vista === 'form-item') {
        @if (selectedCatalogo) {
          <app-item-catalogo-formulario
            [catalogo]="selectedCatalogo"
            [editingRecord]="editingItem"
            (guardado)="onItemGuardado()"
            (cancelado)="volverALista()"
          />
        }
      }

    </div>
  </div>
</div>

<style>
  .animate-in { animation: animateIn 0.3s ease-out forwards; }
  .fade-in { opacity: 0; }
  @keyframes animateIn { to { opacity: 1; } }
</style>
` }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AdminCatalogos, { className: "AdminCatalogos", filePath: "src/app/features/admin-catalogos/admin-catalogos.ts", lineNumber: 14 });
})();
export {
  AdminCatalogos
};
//# sourceMappingURL=chunk-GRIZRBP2.js.map
