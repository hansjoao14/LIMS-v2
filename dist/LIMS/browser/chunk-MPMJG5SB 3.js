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
  NgControlStatus,
  NgModel,
  NgSelectOption,
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
import {
  META_FIELDS
} from "./chunk-XIRXEHG5.js";
import {
  PageHeader
} from "./chunk-ULA2XVM4.js";
import {
  Apollo,
  gql
} from "./chunk-DPKW7NRU.js";
import {
  AuthService,
  CommonModule,
  HttpClient,
  environment
} from "./chunk-CIDLATYD.js";
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
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵdefineInjectable,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵinject,
  ɵɵlistener,
  ɵɵnamespaceHTML,
  ɵɵnamespaceSVG,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIndex,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵstyleProp,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-WHOAKDIK.js";

// src/app/features/admin-ensayos/ensayo/lista/ensayo-lista.ts
var import_sweetalert2 = __toESM(require_sweetalert2_all());

// src/app/services/ensayo.service.ts
var CLIENT_NAME = "catalogo";
var GET_COLLECTION_ENSAYO_ADMIN = gql`
  query CollectionEnsayoAdmin($page: Int, $take: Int, $analisis: String) {
    collectionEnsayo(query: {
      where: { analisis: { contains: $analisis } }
      pagination: { page: $page, take: $take }
    }) {
      count
      data { id analisis identificacion metodo ctunidad_id estado }
      meta { ${META_FIELDS} }
    }
  }
`;
var GET_ENSAYO_ITEMS = gql`
  query GetEnsayoItems($ensayoId: Int) {
    collectionEnsayoItem(query: {
      where: { ensayo_id: { equals: $ensayoId } }
      pagination: { take: 100, page: null }
    }) {
      count
      data {
        ctambiental_id
        ensayo_id
        estado
        item_catalogo { id nombre catalogo_id item_catalogo_id }
      }
    }
  }
`;
var GET_ITEM_CATALOGO_OPTIONS = gql`
  query GetItemCatalogoOptions {
    collectionItemCatalogo(query: {
      where: { estado: { equals: true } }
      pagination: { take: 200, page: null }
    }) {
      data { id nombre catalogo_id }
    }
  }
`;
var EnsayoService = class _EnsayoService {
  apollo;
  http;
  baseEnsayo = `${environment.api_catalogo}/ensayo`;
  baseEnsayoItem = `${environment.api_catalogo}/ensayo-item`;
  constructor(apollo, http) {
    this.apollo = apollo;
    this.http = http;
  }
  getCollectionEnsayo(page, take, analisis = "") {
    return this.apollo.use(CLIENT_NAME).query({
      query: GET_COLLECTION_ENSAYO_ADMIN,
      variables: { page, take, analisis },
      fetchPolicy: "network-only"
    }).pipe(map((result) => ({
      data: result.data?.collectionEnsayo?.data ?? [],
      meta: result.data?.collectionEnsayo?.meta
    })));
  }
  getEnsayoItems(ensayoId) {
    return this.apollo.use(CLIENT_NAME).query({
      query: GET_ENSAYO_ITEMS,
      variables: { ensayoId },
      fetchPolicy: "network-only"
    }).pipe(map((result) => result.data?.collectionEnsayoItem?.data ?? []));
  }
  getItemCatalogoOptions() {
    return this.apollo.use(CLIENT_NAME).query({
      query: GET_ITEM_CATALOGO_OPTIONS,
      fetchPolicy: "network-only"
    }).pipe(map((result) => result.data?.collectionItemCatalogo?.data ?? []));
  }
  // ── Ensayo mutations ──────────────────────────────────────────────────────
  createEnsayo(payload) {
    return this.http.post(this.baseEnsayo, payload);
  }
  updateEnsayo(id, payload) {
    return this.http.put(`${this.baseEnsayo}/${id}`, payload);
  }
  toggleEnsayo(id, estado) {
    return this.http.patch(`${this.baseEnsayo}/${id}/disable`, { estado });
  }
  // ── EnsayoItem mutations ──────────────────────────────────────────────────
  createEnsayoItem(payload) {
    return this.http.post(this.baseEnsayoItem, payload);
  }
  updateEnsayoItem(ctambientalId, ensayoId, payload) {
    return this.http.put(`${this.baseEnsayoItem}/${ctambientalId}`, payload);
  }
  toggleEnsayoItem(ctambientalId, ensayoId, estado) {
    return this.http.patch(`${this.baseEnsayoItem}/${ctambientalId}/disable`, { estado });
  }
  static \u0275fac = function EnsayoService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _EnsayoService)(\u0275\u0275inject(Apollo), \u0275\u0275inject(HttpClient));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _EnsayoService, factory: _EnsayoService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(EnsayoService, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], () => [{ type: Apollo }, { type: HttpClient }], null);
})();

// src/app/features/admin-ensayos/ensayo/lista/ensayo-lista.ts
var _forTrack0 = ($index, $item) => $item.id;
function EnsayoLista_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 20);
    \u0275\u0275listener("click", function EnsayoLista_Conditional_4_Template_button_click_0_listener() {
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
function EnsayoLista_Conditional_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "col", 13);
  }
}
function EnsayoLista_Conditional_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 17);
    \u0275\u0275text(1, "Acc.");
    \u0275\u0275elementEnd();
  }
}
function EnsayoLista_Conditional_25_For_1_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 29);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r4 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(item_r4.metodo);
  }
}
function EnsayoLista_Conditional_25_For_1_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 30);
    \u0275\u0275text(1, "Activo");
    \u0275\u0275elementEnd();
  }
}
function EnsayoLista_Conditional_25_For_1_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 31);
    \u0275\u0275text(1, "Inactivo");
    \u0275\u0275elementEnd();
  }
}
function EnsayoLista_Conditional_25_For_1_Conditional_10_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 35);
    \u0275\u0275element(1, "circle", 37)(2, "path", 38);
    \u0275\u0275elementEnd();
  }
}
function EnsayoLista_Conditional_25_For_1_Conditional_10_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 36);
    \u0275\u0275element(1, "path", 39);
    \u0275\u0275elementEnd();
  }
}
function EnsayoLista_Conditional_25_For_1_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "td", 32);
    \u0275\u0275listener("click", function EnsayoLista_Conditional_25_For_1_Conditional_10_Template_td_click_0_listener($event) {
      \u0275\u0275restoreView(_r5);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275elementStart(1, "div", 33)(2, "button", 34);
    \u0275\u0275listener("click", function EnsayoLista_Conditional_25_For_1_Conditional_10_Template_button_click_2_listener($event) {
      \u0275\u0275restoreView(_r5);
      const item_r4 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.toggleMenu(item_r4.id, item_r4, $event));
    });
    \u0275\u0275conditionalCreate(3, EnsayoLista_Conditional_25_For_1_Conditional_10_Conditional_3_Template, 3, 0, ":svg:svg", 35)(4, EnsayoLista_Conditional_25_For_1_Conditional_10_Conditional_4_Template, 2, 0, ":svg:svg", 36);
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
function EnsayoLista_Conditional_25_For_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tr", 24);
    \u0275\u0275listener("click", function EnsayoLista_Conditional_25_For_1_Template_tr_click_0_listener() {
      const item_r4 = \u0275\u0275restoreView(_r3).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.seleccionar.emit(item_r4));
    });
    \u0275\u0275elementStart(1, "td", 25)(2, "div", 26)(3, "div", 27)(4, "p", 28);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(6, EnsayoLista_Conditional_25_For_1_Conditional_6_Template, 2, 1, "p", 29);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(7, "td", 16);
    \u0275\u0275conditionalCreate(8, EnsayoLista_Conditional_25_For_1_Conditional_8_Template, 2, 0, "span", 30)(9, EnsayoLista_Conditional_25_For_1_Conditional_9_Template, 2, 0, "span", 31);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(10, EnsayoLista_Conditional_25_For_1_Conditional_10_Template, 5, 2, "td", 17);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r4 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275classProp("bg-blue-50", ctx_r1.selectedId === item_r4.id)("hover:bg-slate-50", ctx_r1.selectedId !== item_r4.id);
    \u0275\u0275advance(4);
    \u0275\u0275classProp("text-[#1e3a8a]", ctx_r1.selectedId === item_r4.id)("text-slate-700", ctx_r1.selectedId !== item_r4.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", item_r4.analisis, " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(item_r4.metodo ? 6 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(item_r4.estado ? 8 : 9);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.hasAnyAction ? 10 : -1);
  }
}
function EnsayoLista_Conditional_25_ForEmpty_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td", 40);
    \u0275\u0275text(2, " No hay ensayos registrados. ");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275attribute("colspan", ctx_r1.hasAnyAction ? 3 : 2);
  }
}
function EnsayoLista_Conditional_25_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275repeaterCreate(0, EnsayoLista_Conditional_25_For_1_Template, 11, 12, "tr", 23, _forTrack0, false, EnsayoLista_Conditional_25_ForEmpty_2_Template, 3, 1, "tr");
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275repeater(ctx_r1.ensayos);
  }
}
function EnsayoLista_Conditional_27_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 45);
    \u0275\u0275listener("click", function EnsayoLista_Conditional_27_Conditional_1_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r1 = \u0275\u0275nextContext(2);
      ctx_r1.editar.emit(ctx_r1.menuItem);
      return \u0275\u0275resetView(ctx_r1.closeMenu());
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 46);
    \u0275\u0275element(2, "path", 47);
    \u0275\u0275elementEnd();
    \u0275\u0275text(3, " Editar ");
    \u0275\u0275elementEnd();
  }
}
function EnsayoLista_Conditional_27_Conditional_2_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 46);
    \u0275\u0275element(1, "path", 49);
    \u0275\u0275elementEnd();
    \u0275\u0275text(2, " Deshabilitar ");
  }
}
function EnsayoLista_Conditional_27_Conditional_2_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 46);
    \u0275\u0275element(1, "path", 50);
    \u0275\u0275elementEnd();
    \u0275\u0275text(2, " Habilitar ");
  }
}
function EnsayoLista_Conditional_27_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 48);
    \u0275\u0275listener("click", function EnsayoLista_Conditional_27_Conditional_2_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r8);
      const ctx_r1 = \u0275\u0275nextContext(2);
      ctx_r1.toggleEstadoEnsayo(ctx_r1.menuItem);
      return \u0275\u0275resetView(ctx_r1.closeMenu());
    });
    \u0275\u0275conditionalCreate(1, EnsayoLista_Conditional_27_Conditional_2_Conditional_1_Template, 3, 0)(2, EnsayoLista_Conditional_27_Conditional_2_Conditional_2_Template, 3, 0);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275classMap(ctx_r1.menuItem.estado ? "w-full flex items-center gap-2.5 px-3 py-2 text-xs text-red-600 hover:bg-red-50" : "w-full flex items-center gap-2.5 px-3 py-2 text-xs text-green-700 hover:bg-green-50");
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.menuItem.estado ? 1 : 2);
  }
}
function EnsayoLista_Conditional_27_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 41);
    \u0275\u0275conditionalCreate(1, EnsayoLista_Conditional_27_Conditional_1_Template, 4, 0, "button", 42);
    \u0275\u0275conditionalCreate(2, EnsayoLista_Conditional_27_Conditional_2_Template, 3, 3, "button", 43);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 44);
    \u0275\u0275listener("click", function EnsayoLista_Conditional_27_Template_div_click_3_listener() {
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
var EnsayoLista = class _EnsayoLista {
  ensayoService;
  authService;
  zone;
  toastrAlert;
  selectedId = null;
  reloadTrigger = 0;
  seleccionar = new EventEmitter();
  nuevo = new EventEmitter();
  editar = new EventEmitter();
  loading = true;
  ensayos = [];
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
    return role ? hasPermission(MenuKey.ADMIN_ENSAYOS, role, "editar") : false;
  }, ...ngDevMode ? [{ debugName: "canEdit" }] : []);
  canDelete = computed(() => {
    const role = this.userAppRole();
    return role ? hasPermission(MenuKey.ADMIN_ENSAYOS, role, "eliminar") : false;
  }, ...ngDevMode ? [{ debugName: "canDelete" }] : []);
  canCrear = computed(() => {
    const role = this.userAppRole();
    return role ? hasPermission(MenuKey.ADMIN_ENSAYOS, role, "crear") : false;
  }, ...ngDevMode ? [{ debugName: "canCrear" }] : []);
  get hasAnyAction() {
    return this.canEdit() || this.canDelete();
  }
  constructor(ensayoService, authService, zone, toastrAlert) {
    this.ensayoService = ensayoService;
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
    const analisis = this.busqueda.trim();
    this.ensayoService.getCollectionEnsayo(page, this.PAGE_SIZE, analisis).pipe(takeUntil(this.destroy$)).subscribe({
      next: ({ data, meta }) => {
        this.ensayos = data;
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
  async toggleEstadoEnsayo(item) {
    const accion = item.estado ? "deshabilitar" : "habilitar";
    const confirm = await import_sweetalert2.default.fire({
      icon: "warning",
      title: `\xBF${item.estado ? "Deshabilitar" : "Habilitar"} ensayo?`,
      text: `Se ${accion}\xE1 "${item.analisis}".`,
      showCancelButton: true,
      confirmButtonColor: item.estado ? "#d33" : "#16a34a",
      cancelButtonColor: "#6b7280",
      confirmButtonText: `S\xED, ${accion}`,
      cancelButtonText: "Cancelar"
    });
    if (!confirm.isConfirmed)
      return;
    this.procesandoId = item.id;
    const call$ = this.ensayoService.toggleEnsayo(item.id, !item.estado);
    call$.pipe(takeUntil(this.destroy$), finalize(() => {
      this.procesandoId = null;
    })).subscribe({
      next: () => this.zone.run(() => {
        this.toastrAlert.showSuccess(`Ensayo ${item.estado ? "deshabilitado" : "habilitado"}.`, "\xA1Listo!");
        this.cargarPagina(this.currentPage);
      }),
      error: () => this.zone.run(() => this.toastrAlert.showError(`No se pudo ${accion} el ensayo.`, "Error"))
    });
  }
  static \u0275fac = function EnsayoLista_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _EnsayoLista)(\u0275\u0275directiveInject(EnsayoService), \u0275\u0275directiveInject(AuthService), \u0275\u0275directiveInject(NgZone), \u0275\u0275directiveInject(ToastrAlertService));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _EnsayoLista, selectors: [["app-ensayo-lista"]], inputs: { selectedId: "selectedId", reloadTrigger: "reloadTrigger" }, outputs: { seleccionar: "seleccionar", nuevo: "nuevo", editar: "editar" }, decls: 28, vars: 12, consts: [[1, "bg-white", "rounded-lg", "shadow-sm", "border", "border-slate-200", "p-4"], [1, "flex", "items-center", "justify-between", "mb-3"], [1, "text-sm", "font-bold", "text-slate-700", "uppercase", "tracking-wide"], ["type", "button", 1, "bg-[#1e3a8a]", "text-white", "px-3", "py-1.5", "rounded", "text-xs", "font-bold", "shadow-sm", "hover:bg-[#2541b2]", "transition-all", "flex", "items-center", "gap-1.5"], [1, "relative", "mb-3"], ["type", "text", "placeholder", "Buscar por an\xE1lisis...", 1, "w-full", "border", "border-slate-300", "rounded", "pl-9", "pr-4", "py-2", "text-sm", "text-slate-700", "outline-none", "focus:border-[#1e3a8a]", "transition-colors", 3, "ngModelChange", "ngModel"], ["fill", "none", "viewBox", "0 0 24 24", "stroke", "currentColor", 1, "w-4", "h-4", "text-slate-400", "absolute", "left-2.5", "top-1/2", "-translate-y-1/2"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"], [1, "border", "border-slate-200", "rounded", "overflow-hidden"], [1, "overflow-x-auto"], [1, "w-full", "text-sm", "border-collapse", "table-fixed"], [1, "w-full"], [1, "w-[76px]"], [1, "w-[50px]"], [1, "bg-slate-50", "text-[10px]", "font-bold", "text-slate-500", "uppercase", "border-b", "border-slate-200", "tracking-wider"], [1, "px-3", "py-2.5", "border-r", "border-slate-100", "text-left"], [1, "px-3", "py-2.5", "border-r", "border-slate-100", "text-center"], [1, "px-2", "py-2.5", "text-center"], ["appTableSkeleton", "", 3, "rows", "cols", "actionButtons"], ["itemLabel", "ensayos", 3, "pageChange", "meta", "currentPage", "itemsShown"], ["type", "button", 1, "bg-[#1e3a8a]", "text-white", "px-3", "py-1.5", "rounded", "text-xs", "font-bold", "shadow-sm", "hover:bg-[#2541b2]", "transition-all", "flex", "items-center", "gap-1.5", 3, "click"], ["fill", "none", "viewBox", "0 0 24 24", "stroke", "currentColor", 1, "w-3.5", "h-3.5"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M12 4v16m8-8H4"], [1, "border-b", "border-slate-100", "transition-colors", "cursor-pointer", 3, "bg-blue-50", "hover:bg-slate-50"], [1, "border-b", "border-slate-100", "transition-colors", "cursor-pointer", 3, "click"], [1, "px-3", "py-2.5", "border-r", "border-slate-100"], [1, "flex", "items-start", "gap-2"], [1, "min-w-0"], [1, "text-xs", "font-medium", "leading-snug"], [1, "text-[10px]", "text-slate-400", "mt-0.5", "truncate"], [1, "inline-flex", "items-center", "px-1.5", "py-0.5", "rounded", "text-[10px]", "font-semibold", "bg-green-100", "text-green-700"], [1, "inline-flex", "items-center", "px-1.5", "py-0.5", "rounded", "text-[10px]", "font-semibold", "bg-slate-100", "text-slate-500"], [1, "px-2", "py-2.5", "text-center", 3, "click"], [1, "flex", "items-center", "justify-center"], ["type", "button", "title", "M\xE1s acciones", 1, "h-8", "w-8", "flex", "items-center", "justify-center", "rounded", "border", "border-slate-300", "text-slate-500", "bg-white", "hover:bg-slate-100", "disabled:opacity-40", "transition-colors", "shrink-0", 3, "click", "disabled"], ["fill", "none", "viewBox", "0 0 24 24", 1, "h-3.5", "w-3.5", "animate-spin"], ["fill", "currentColor", "viewBox", "0 0 20 20", 1, "h-4", "w-4"], ["cx", "12", "cy", "12", "r", "10", "stroke", "currentColor", "stroke-width", "4", 1, "opacity-25"], ["fill", "currentColor", "d", "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z", 1, "opacity-75"], ["d", "M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"], [1, "p-10", "text-slate-400", "italic", "text-center", "text-xs"], [1, "fixed", "z-50", "bg-white", "border", "border-slate-200", "rounded-lg", "shadow-lg", "py-1", "w-40"], ["type", "button", 1, "w-full", "flex", "items-center", "gap-2.5", "px-3", "py-2", "text-xs", "text-amber-700", "hover:bg-amber-50"], ["type", "button", 3, "class"], [1, "fixed", "inset-0", "z-40", 3, "click"], ["type", "button", 1, "w-full", "flex", "items-center", "gap-2.5", "px-3", "py-2", "text-xs", "text-amber-700", "hover:bg-amber-50", 3, "click"], ["fill", "none", "viewBox", "0 0 24 24", "stroke", "currentColor", 1, "h-3.5", "w-3.5", "shrink-0"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"], ["type", "button", 3, "click"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"]], template: function EnsayoLista_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "h3", 2);
      \u0275\u0275text(3, "Ensayos");
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(4, EnsayoLista_Conditional_4_Template, 4, 0, "button", 3);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(5, "div", 4)(6, "input", 5);
      \u0275\u0275twoWayListener("ngModelChange", function EnsayoLista_Template_input_ngModelChange_6_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.busqueda, $event) || (ctx.busqueda = $event);
        return $event;
      });
      \u0275\u0275listener("ngModelChange", function EnsayoLista_Template_input_ngModelChange_6_listener() {
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
      \u0275\u0275conditionalCreate(15, EnsayoLista_Conditional_15_Template, 1, 0, "col", 13);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(16, "thead")(17, "tr", 14)(18, "th", 15);
      \u0275\u0275text(19, "An\xE1lisis");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(20, "th", 16);
      \u0275\u0275text(21, "Estado");
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(22, EnsayoLista_Conditional_22_Template, 2, 0, "th", 17);
      \u0275\u0275elementEnd()();
      \u0275\u0275element(23, "tbody", 18);
      \u0275\u0275elementStart(24, "tbody");
      \u0275\u0275conditionalCreate(25, EnsayoLista_Conditional_25_Template, 3, 1);
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(26, "app-pagination", 19);
      \u0275\u0275listener("pageChange", function EnsayoLista_Template_app_pagination_pageChange_26_listener($event) {
        return ctx.cargarPagina($event);
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(27, EnsayoLista_Conditional_27_Template, 4, 6);
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
      \u0275\u0275property("meta", ctx.meta)("currentPage", ctx.currentPage)("itemsShown", ctx.ensayos.length);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.openMenuId !== null && ctx.menuItem && ctx.menuPos ? 27 : -1);
    }
  }, dependencies: [CommonModule, FormsModule, DefaultValueAccessor, NgControlStatus, NgModel, PaginationComponent, TableSkeleton], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(EnsayoLista, [{
    type: Component,
    args: [{ selector: "app-ensayo-lista", imports: [CommonModule, FormsModule, PaginationComponent, TableSkeleton], template: `<div class="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
  <div class="flex items-center justify-between mb-3">
    <h3 class="text-sm font-bold text-slate-700 uppercase tracking-wide">Ensayos</h3>
    @if (canCrear()) {
      <button
        type="button"
        (click)="nuevo.emit()"
        class="bg-[#1e3a8a] text-white px-3 py-1.5 rounded text-xs font-bold shadow-sm hover:bg-[#2541b2] transition-all flex items-center gap-1.5"
      >
        <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 4v16m8-8H4"
          />
        </svg>
        Nuevo
      </button>
    }
  </div>

  <div class="relative mb-3">
    <input
      type="text"
      [(ngModel)]="busqueda"
      (ngModelChange)="filtrar()"
      placeholder="Buscar por an\xE1lisis..."
      class="w-full border border-slate-300 rounded pl-9 pr-4 py-2 text-sm text-slate-700 outline-none focus:border-[#1e3a8a] transition-colors"
    />
    <svg
      class="w-4 h-4 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
      />
    </svg>
  </div>

  <div class="border border-slate-200 rounded overflow-hidden">
    <div class="overflow-x-auto">
      <table class="w-full text-sm border-collapse table-fixed">
        <colgroup>
          <col class="w-full" />
          <col class="w-[76px]" />
          @if (hasAnyAction) {
            <col class="w-[50px]" />
          }
        </colgroup>
        <thead>
          <tr
            class="bg-slate-50 text-[10px] font-bold text-slate-500 uppercase border-b border-slate-200 tracking-wider"
          >
            <th class="px-3 py-2.5 border-r border-slate-100 text-left">An\xE1lisis</th>
            <th class="px-3 py-2.5 border-r border-slate-100 text-center">Estado</th>
            @if (hasAnyAction) {
              <th class="px-2 py-2.5 text-center">Acc.</th>
            }
          </tr>
        </thead>
        <tbody appTableSkeleton [rows]="loading ? 8 : 0" [cols]="2" [actionButtons]="hasAnyAction ? 1 : 0"></tbody>
        <tbody>
          @if (!loading) {
            @for (item of ensayos; track item.id) {
              <tr
                class="border-b border-slate-100 transition-colors cursor-pointer"
                [class.bg-blue-50]="selectedId === item.id"
                [class.hover:bg-slate-50]="selectedId !== item.id"
                (click)="seleccionar.emit(item)"
              >
                <td class="px-3 py-2.5 border-r border-slate-100">
                  <div class="flex items-start gap-2">
                    <div class="min-w-0">
                      <p
                        class="text-xs font-medium leading-snug"
                        [class.text-[#1e3a8a]]="selectedId === item.id"
                        [class.text-slate-700]="selectedId !== item.id"
                      >
                        {{ item.analisis }}
                      </p>
                      @if (item.metodo) {
                        <p class="text-[10px] text-slate-400 mt-0.5 truncate">{{ item.metodo }}</p>
                      }
                    </div>
                  </div>
                </td>
                <td class="px-3 py-2.5 border-r border-slate-100 text-center">
                  @if (item.estado) {
                    <span
                      class="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold bg-green-100 text-green-700"
                      >Activo</span
                    >
                  } @else {
                    <span
                      class="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold bg-slate-100 text-slate-500"
                      >Inactivo</span
                    >
                  }
                </td>
                @if (hasAnyAction) {
                  <td class="px-2 py-2.5 text-center" (click)="$event.stopPropagation()">
                    <div class="flex items-center justify-center">
                      <button
                        type="button"
                        title="M\xE1s acciones"
                        (click)="toggleMenu(item.id, item, $event)"
                        [disabled]="procesandoId === item.id"
                        class="h-8 w-8 flex items-center justify-center rounded border border-slate-300 text-slate-500 bg-white hover:bg-slate-100 disabled:opacity-40 transition-colors shrink-0"
                      >
                        @if (procesandoId === item.id) {
                          <svg class="h-3.5 w-3.5 animate-spin" fill="none" viewBox="0 0 24 24">
                            <circle
                              class="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              stroke-width="4"
                            />
                            <path
                              class="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                            />
                          </svg>
                        } @else {
                          <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                            <path
                              d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"
                            />
                          </svg>
                        }
                      </button>
                    </div>
                  </td>
                }
              </tr>
            } @empty {
              <tr>
                <td
                  [attr.colspan]="hasAnyAction ? 3 : 2"
                  class="p-10 text-slate-400 italic text-center text-xs"
                >
                  No hay ensayos registrados.
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
    [itemsShown]="ensayos.length"
    itemLabel="ensayos"
    (pageChange)="cargarPagina($event)"
  >
  </app-pagination>
</div>

@if (openMenuId !== null && menuItem && menuPos) {
  <div
    class="fixed z-50 bg-white border border-slate-200 rounded-lg shadow-lg py-1 w-40"
    [style.top.px]="menuPos.top"
    [style.right.px]="menuPos.right"
  >
    @if (canEdit()) {
      <button
        type="button"
        (click)="editar.emit(menuItem); closeMenu()"
        class="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-amber-700 hover:bg-amber-50"
      >
        <svg class="h-3.5 w-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
          />
        </svg>
        Editar
      </button>
    }
    @if (canDelete()) {
      <button
        type="button"
        (click)="toggleEstadoEnsayo(menuItem); closeMenu()"
        [class]="
          menuItem.estado
            ? 'w-full flex items-center gap-2.5 px-3 py-2 text-xs text-red-600 hover:bg-red-50'
            : 'w-full flex items-center gap-2.5 px-3 py-2 text-xs text-green-700 hover:bg-green-50'
        "
      >
        @if (menuItem.estado) {
          <svg class="h-3.5 w-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
            />
          </svg>
          Deshabilitar
        } @else {
          <svg class="h-3.5 w-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          Habilitar
        }
      </button>
    }
  </div>
  <div class="fixed inset-0 z-40" (click)="closeMenu()"></div>
}
` }]
  }], () => [{ type: EnsayoService }, { type: AuthService }, { type: NgZone }, { type: ToastrAlertService }], { selectedId: [{
    type: Input
  }], reloadTrigger: [{
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
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(EnsayoLista, { className: "EnsayoLista", filePath: "src/app/features/admin-ensayos/ensayo/lista/ensayo-lista.ts", lineNumber: 21 });
})();

// src/app/features/admin-ensayos/ensayo/formulario/ensayo-formulario.ts
var _forTrack02 = ($index, $item) => $item.id;
function EnsayoFormulario_Conditional_31_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "app-field-skeleton");
  }
}
function EnsayoFormulario_Conditional_32_For_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 18);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r3 = ctx.$implicit;
    \u0275\u0275property("value", item_r3.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2(" ", item_r3.nombre, " (cat\xE1logo: ", item_r3.catalogo_id, ") ");
  }
}
function EnsayoFormulario_Conditional_32_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "select", 16);
    \u0275\u0275listener("ngModelChange", function EnsayoFormulario_Conditional_32_Template_select_ngModelChange_0_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onUnidadChange($event));
    });
    \u0275\u0275elementStart(1, "option", 17);
    \u0275\u0275text(2, "\u2014 Seleccionar unidad \u2014");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(3, EnsayoFormulario_Conditional_32_For_4_Template, 2, 3, "option", 18, _forTrack02);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("ngModel", ctx_r1.ctunidad_id ?? "")("disabled", ctx_r1.saving);
    \u0275\u0275advance(3);
    \u0275\u0275repeater(ctx_r1.itemOptions);
  }
}
function EnsayoFormulario_Conditional_35_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 19);
    \u0275\u0275element(1, "circle", 20)(2, "path", 21);
    \u0275\u0275elementEnd();
    \u0275\u0275text(3, " Guardando... ");
  }
}
function EnsayoFormulario_Conditional_36_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275textInterpolate1(" ", ctx_r1.modoEdicion ? "Actualizar" : "Crear ensayo", " ");
  }
}
var EnsayoFormulario = class _EnsayoFormulario {
  ensayoService;
  toastrAlert;
  editingRecord = null;
  guardado = new EventEmitter();
  cancelado = new EventEmitter();
  destroy$ = new Subject();
  saving = false;
  loadingOptions = true;
  itemOptions = [];
  analisis = "";
  identificacion = "";
  metodo = "";
  ctunidad_id = null;
  get modoEdicion() {
    return !!this.editingRecord;
  }
  constructor(ensayoService, toastrAlert) {
    this.ensayoService = ensayoService;
    this.toastrAlert = toastrAlert;
  }
  ngOnInit() {
    if (this.editingRecord) {
      this.analisis = this.editingRecord.analisis;
      this.identificacion = this.editingRecord.identificacion;
      this.metodo = this.editingRecord.metodo;
      this.ctunidad_id = this.editingRecord.ctunidad_id;
    }
    this.cargarOpciones();
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  cargarOpciones() {
    this.loadingOptions = true;
    this.ensayoService.getItemCatalogoOptions().pipe(takeUntil(this.destroy$)).subscribe({
      next: (data) => {
        this.itemOptions = data;
        this.loadingOptions = false;
      },
      error: () => {
        this.loadingOptions = false;
      }
    });
  }
  onUnidadChange(val) {
    const n = parseInt(val, 10);
    this.ctunidad_id = isNaN(n) ? null : n;
  }
  guardar() {
    if (!this.analisis.trim()) {
      this.toastrAlert.showError("El an\xE1lisis es obligatorio.", "Campo requerido");
      return;
    }
    if (!this.identificacion.trim()) {
      this.toastrAlert.showError("La identificaci\xF3n es obligatoria.", "Campo requerido");
      return;
    }
    if (!this.metodo.trim()) {
      this.toastrAlert.showError("El m\xE9todo es obligatorio.", "Campo requerido");
      return;
    }
    if (!this.ctunidad_id) {
      this.toastrAlert.showError("La unidad es obligatoria.", "Campo requerido");
      return;
    }
    this.saving = true;
    const payload = {
      analisis: this.analisis.trim(),
      identificacion: this.identificacion.trim(),
      metodo: this.metodo.trim(),
      ctunidad_id: this.ctunidad_id
    };
    const op$ = this.modoEdicion ? this.ensayoService.updateEnsayo(this.editingRecord.id, payload) : this.ensayoService.createEnsayo(payload);
    op$.pipe(takeUntil(this.destroy$)).subscribe({
      next: (result) => {
        this.saving = false;
        this.toastrAlert.showSuccess(this.modoEdicion ? "Ensayo actualizado correctamente." : "Ensayo creado correctamente.", this.modoEdicion ? "\xA1Actualizado!" : "\xA1Creado!");
        this.guardado.emit(result);
      },
      error: () => {
        this.saving = false;
        this.toastrAlert.showError("No se pudo guardar el ensayo.", "Error");
      }
    });
  }
  static \u0275fac = function EnsayoFormulario_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _EnsayoFormulario)(\u0275\u0275directiveInject(EnsayoService), \u0275\u0275directiveInject(ToastrAlertService));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _EnsayoFormulario, selectors: [["app-ensayo-formulario"]], inputs: { editingRecord: "editingRecord" }, outputs: { guardado: "guardado", cancelado: "cancelado" }, decls: 39, vars: 11, consts: [[1, "bg-white", "rounded-lg", "shadow-sm", "border", "border-slate-200", "p-6", "max-w-lg"], [1, "flex", "items-center", "gap-3", "mb-6"], ["type", "button", 1, "h-8", "w-8", "flex", "items-center", "justify-center", "rounded", "border", "border-slate-200", "text-slate-500", "hover:bg-slate-100", "transition-colors", 3, "click"], ["fill", "none", "viewBox", "0 0 24 24", "stroke", "currentColor", 1, "h-4", "w-4"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M15 19l-7-7 7-7"], [1, "text-sm", "font-bold", "text-slate-700"], [1, "space-y-4"], [1, "block", "text-xs", "font-semibold", "text-slate-600", "mb-1"], [1, "text-red-500"], ["type", "text", "placeholder", "Nombre del an\xE1lisis", 1, "w-full", "border", "border-slate-300", "rounded", "px-3", "py-2", "text-sm", "text-slate-700", "focus:outline-none", "focus:ring-2", "focus:ring-blue-300", "focus:border-blue-400", "transition", 3, "ngModelChange", "ngModel", "disabled"], ["type", "text", "placeholder", "C\xF3digo de identificaci\xF3n", 1, "w-full", "border", "border-slate-300", "rounded", "px-3", "py-2", "text-sm", "text-slate-700", "focus:outline-none", "focus:ring-2", "focus:ring-blue-300", "focus:border-blue-400", "transition", 3, "ngModelChange", "ngModel", "disabled"], ["type", "text", "placeholder", "M\xE9todo del ensayo", 1, "w-full", "border", "border-slate-300", "rounded", "px-3", "py-2", "text-sm", "text-slate-700", "focus:outline-none", "focus:ring-2", "focus:ring-blue-300", "focus:border-blue-400", "transition", 3, "ngModelChange", "ngModel", "disabled"], [1, "w-full", "border", "border-slate-300", "rounded", "px-3", "py-2", "text-sm", "text-slate-700", "focus:outline-none", "focus:ring-2", "focus:ring-blue-300", "focus:border-blue-400", "transition", "bg-white", 3, "ngModel", "disabled"], [1, "flex", "items-center", "gap-3", "mt-6"], ["type", "button", 1, "bg-[#1e3a8a]", "text-white", "px-5", "py-2", "rounded", "text-sm", "font-bold", "shadow-sm", "hover:bg-[#2541b2]", "disabled:opacity-50", "disabled:cursor-not-allowed", "transition-all", "flex", "items-center", "gap-2", 3, "click", "disabled"], ["type", "button", 1, "px-5", "py-2", "rounded", "text-sm", "font-medium", "border", "border-slate-300", "text-slate-600", "hover:bg-slate-50", "disabled:opacity-50", "transition-all", 3, "click", "disabled"], [1, "w-full", "border", "border-slate-300", "rounded", "px-3", "py-2", "text-sm", "text-slate-700", "focus:outline-none", "focus:ring-2", "focus:ring-blue-300", "focus:border-blue-400", "transition", "bg-white", 3, "ngModelChange", "ngModel", "disabled"], ["value", ""], [3, "value"], ["fill", "none", "viewBox", "0 0 24 24", 1, "h-4", "w-4", "animate-spin"], ["cx", "12", "cy", "12", "r", "10", "stroke", "currentColor", "stroke-width", "4", 1, "opacity-25"], ["fill", "currentColor", "d", "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z", 1, "opacity-75"]], template: function EnsayoFormulario_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "button", 2);
      \u0275\u0275listener("click", function EnsayoFormulario_Template_button_click_2_listener() {
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
      \u0275\u0275text(10, " An\xE1lisis ");
      \u0275\u0275elementStart(11, "span", 8);
      \u0275\u0275text(12, "*");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(13, "input", 9);
      \u0275\u0275twoWayListener("ngModelChange", function EnsayoFormulario_Template_input_ngModelChange_13_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.analisis, $event) || (ctx.analisis = $event);
        return $event;
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(14, "div")(15, "label", 7);
      \u0275\u0275text(16, " Identificaci\xF3n ");
      \u0275\u0275elementStart(17, "span", 8);
      \u0275\u0275text(18, "*");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(19, "input", 10);
      \u0275\u0275twoWayListener("ngModelChange", function EnsayoFormulario_Template_input_ngModelChange_19_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.identificacion, $event) || (ctx.identificacion = $event);
        return $event;
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(20, "div")(21, "label", 7);
      \u0275\u0275text(22, " M\xE9todo ");
      \u0275\u0275elementStart(23, "span", 8);
      \u0275\u0275text(24, "*");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(25, "input", 11);
      \u0275\u0275twoWayListener("ngModelChange", function EnsayoFormulario_Template_input_ngModelChange_25_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.metodo, $event) || (ctx.metodo = $event);
        return $event;
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(26, "div")(27, "label", 7);
      \u0275\u0275text(28, " Unidad ");
      \u0275\u0275elementStart(29, "span", 8);
      \u0275\u0275text(30, "*");
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(31, EnsayoFormulario_Conditional_31_Template, 1, 0, "app-field-skeleton")(32, EnsayoFormulario_Conditional_32_Template, 5, 2, "select", 12);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(33, "div", 13)(34, "button", 14);
      \u0275\u0275listener("click", function EnsayoFormulario_Template_button_click_34_listener() {
        return ctx.guardar();
      });
      \u0275\u0275conditionalCreate(35, EnsayoFormulario_Conditional_35_Template, 4, 0)(36, EnsayoFormulario_Conditional_36_Template, 1, 1);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(37, "button", 15);
      \u0275\u0275listener("click", function EnsayoFormulario_Template_button_click_37_listener() {
        return ctx.cancelado.emit();
      });
      \u0275\u0275text(38, " Cancelar ");
      \u0275\u0275elementEnd()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(6);
      \u0275\u0275textInterpolate1(" ", ctx.modoEdicion ? "Editar ensayo" : "Nuevo ensayo", " ");
      \u0275\u0275advance(7);
      \u0275\u0275twoWayProperty("ngModel", ctx.analisis);
      \u0275\u0275property("disabled", ctx.saving);
      \u0275\u0275advance(6);
      \u0275\u0275twoWayProperty("ngModel", ctx.identificacion);
      \u0275\u0275property("disabled", ctx.saving);
      \u0275\u0275advance(6);
      \u0275\u0275twoWayProperty("ngModel", ctx.metodo);
      \u0275\u0275property("disabled", ctx.saving);
      \u0275\u0275advance(6);
      \u0275\u0275conditional(ctx.loadingOptions ? 31 : 32);
      \u0275\u0275advance(3);
      \u0275\u0275property("disabled", ctx.saving || ctx.loadingOptions);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.saving ? 35 : 36);
      \u0275\u0275advance(2);
      \u0275\u0275property("disabled", ctx.saving);
    }
  }, dependencies: [CommonModule, FormsModule, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, SelectControlValueAccessor, NgControlStatus, NgModel, FieldSkeleton], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(EnsayoFormulario, [{
    type: Component,
    args: [{ selector: "app-ensayo-formulario", imports: [CommonModule, FormsModule, FieldSkeleton], template: `<div class="bg-white rounded-lg shadow-sm border border-slate-200 p-6 max-w-lg">

  <div class="flex items-center gap-3 mb-6">
    <button type="button" (click)="cancelado.emit()"
      class="h-8 w-8 flex items-center justify-center rounded border border-slate-200 text-slate-500 hover:bg-slate-100 transition-colors">
      <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
      </svg>
    </button>
    <h3 class="text-sm font-bold text-slate-700">
      {{ modoEdicion ? 'Editar ensayo' : 'Nuevo ensayo' }}
    </h3>
  </div>

  <div class="space-y-4">

    <div>
      <label class="block text-xs font-semibold text-slate-600 mb-1">
        An\xE1lisis <span class="text-red-500">*</span>
      </label>
      <input type="text" [(ngModel)]="analisis" placeholder="Nombre del an\xE1lisis"
        class="w-full border border-slate-300 rounded px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition"
        [disabled]="saving" />
    </div>

    <div>
      <label class="block text-xs font-semibold text-slate-600 mb-1">
        Identificaci\xF3n <span class="text-red-500">*</span>
      </label>
      <input type="text" [(ngModel)]="identificacion" placeholder="C\xF3digo de identificaci\xF3n"
        class="w-full border border-slate-300 rounded px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition"
        [disabled]="saving" />
    </div>

    <div>
      <label class="block text-xs font-semibold text-slate-600 mb-1">
        M\xE9todo <span class="text-red-500">*</span>
      </label>
      <input type="text" [(ngModel)]="metodo" placeholder="M\xE9todo del ensayo"
        class="w-full border border-slate-300 rounded px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition"
        [disabled]="saving" />
    </div>

    <div>
      <label class="block text-xs font-semibold text-slate-600 mb-1">
        Unidad <span class="text-red-500">*</span>
      </label>
      @if (loadingOptions) {
        <app-field-skeleton />
      } @else {
        <select
          [ngModel]="ctunidad_id ?? ''"
          (ngModelChange)="onUnidadChange($event)"
          class="w-full border border-slate-300 rounded px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition bg-white"
          [disabled]="saving">
          <option value="">\u2014 Seleccionar unidad \u2014</option>
          @for (item of itemOptions; track item.id) {
            <option [value]="item.id">
              {{ item.nombre }} (cat\xE1logo: {{ item.catalogo_id }})
            </option>
          }
        </select>
      }
    </div>

  </div>

  <div class="flex items-center gap-3 mt-6">
    <button type="button" (click)="guardar()" [disabled]="saving || loadingOptions"
      class="bg-[#1e3a8a] text-white px-5 py-2 rounded text-sm font-bold shadow-sm hover:bg-[#2541b2] disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2">
      @if (saving) {
        <svg class="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
        </svg>
        Guardando...
      } @else {
        {{ modoEdicion ? 'Actualizar' : 'Crear ensayo' }}
      }
    </button>
    <button type="button" (click)="cancelado.emit()" [disabled]="saving"
      class="px-5 py-2 rounded text-sm font-medium border border-slate-300 text-slate-600 hover:bg-slate-50 disabled:opacity-50 transition-all">
      Cancelar
    </button>
  </div>

</div>
` }]
  }], () => [{ type: EnsayoService }, { type: ToastrAlertService }], { editingRecord: [{
    type: Input
  }], guardado: [{
    type: Output
  }], cancelado: [{
    type: Output
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(EnsayoFormulario, { className: "EnsayoFormulario", filePath: "src/app/features/admin-ensayos/ensayo/formulario/ensayo-formulario.ts", lineNumber: 16 });
})();

// src/app/features/admin-ensayos/ensayo-item/lista/ensayo-item-lista.ts
var import_sweetalert22 = __toESM(require_sweetalert2_all());

// src/app/core/utils/ensayo-tree.utils.ts
function buildFlatNodes(ensayoItems, externalParents, knownIds, parentCatId, nivel) {
  const result = [];
  if (parentCatId === null) {
    externalParents.forEach((ext) => {
      const ownParentKnown = ext.item_catalogo_id !== null && (knownIds.has(ext.item_catalogo_id) || externalParents.has(ext.item_catalogo_id));
      if (!ownParentKnown) {
        result.push({ isExternal: true, nivel, catId: ext.id, catNombre: ext.nombre });
        result.push(...buildFlatNodes(ensayoItems, externalParents, knownIds, ext.id, nivel + 1));
      }
    });
    ensayoItems.filter((ei) => {
      const pid = ei.item_catalogo?.item_catalogo_id;
      return pid === null || pid === void 0 || !knownIds.has(pid) && !externalParents.has(pid);
    }).forEach((ei) => result.push({ isExternal: false, nivel, ensayoItem: ei }));
  } else {
    ensayoItems.filter((ei) => ei.item_catalogo?.item_catalogo_id === parentCatId).forEach((ei) => result.push({ isExternal: false, nivel, ensayoItem: ei }));
    externalParents.forEach((ext) => {
      if (ext.item_catalogo_id === parentCatId) {
        result.push({ isExternal: true, nivel, catId: ext.id, catNombre: ext.nombre });
        result.push(...buildFlatNodes(ensayoItems, externalParents, knownIds, ext.id, nivel + 1));
      }
    });
  }
  return result;
}

// src/app/features/admin-ensayos/ensayo-item/lista/ensayo-item-lista.ts
function EnsayoItemLista_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 16);
    \u0275\u0275listener("click", function EnsayoItemLista_Conditional_7_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.nuevo.emit());
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 17);
    \u0275\u0275element(2, "path", 18);
    \u0275\u0275elementEnd();
    \u0275\u0275text(3, " Nuevo \xEDtem ");
    \u0275\u0275elementEnd();
  }
}
function EnsayoItemLista_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "col", 10);
  }
}
function EnsayoItemLista_Conditional_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 14);
    \u0275\u0275text(1, "Acc.");
    \u0275\u0275elementEnd();
  }
}
function EnsayoItemLista_Conditional_24_For_1_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr", 19)(1, "td", 21)(2, "div", 22);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(3, "svg", 23);
    \u0275\u0275element(4, "path", 24);
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(5, "span", 25);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "span", 26);
    \u0275\u0275text(8, "cat\xE1logo externo");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const node_r3 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275attribute("colspan", ctx_r1.hasAnyAction ? 3 : 2);
    \u0275\u0275advance();
    \u0275\u0275styleProp("padding-left", node_r3.nivel * 16, "px");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(node_r3.catNombre);
  }
}
function EnsayoItemLista_Conditional_24_For_1_Conditional_1_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 29);
    \u0275\u0275text(1, "\u2514");
    \u0275\u0275elementEnd();
  }
}
function EnsayoItemLista_Conditional_24_For_1_Conditional_1_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 31);
    \u0275\u0275text(1, "Activo");
    \u0275\u0275elementEnd();
  }
}
function EnsayoItemLista_Conditional_24_For_1_Conditional_1_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 32);
    \u0275\u0275text(1, "Inactivo");
    \u0275\u0275elementEnd();
  }
}
function EnsayoItemLista_Conditional_24_For_1_Conditional_1_Conditional_9_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 35);
    \u0275\u0275element(1, "circle", 37)(2, "path", 38);
    \u0275\u0275elementEnd();
  }
}
function EnsayoItemLista_Conditional_24_For_1_Conditional_1_Conditional_9_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 36);
    \u0275\u0275element(1, "path", 39);
    \u0275\u0275elementEnd();
  }
}
function EnsayoItemLista_Conditional_24_For_1_Conditional_1_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "td", 14)(1, "div", 33)(2, "button", 34);
    \u0275\u0275listener("click", function EnsayoItemLista_Conditional_24_For_1_Conditional_1_Conditional_9_Template_button_click_2_listener($event) {
      \u0275\u0275restoreView(_r4);
      const node_r3 = \u0275\u0275nextContext(2).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.toggleMenu(node_r3.ensayoItem.ctambiental_id, node_r3.ensayoItem, $event));
    });
    \u0275\u0275conditionalCreate(3, EnsayoItemLista_Conditional_24_For_1_Conditional_1_Conditional_9_Conditional_3_Template, 3, 0, ":svg:svg", 35)(4, EnsayoItemLista_Conditional_24_For_1_Conditional_1_Conditional_9_Conditional_4_Template, 2, 0, ":svg:svg", 36);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const node_r3 = \u0275\u0275nextContext(2).$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r1.procesandoId === node_r3.ensayoItem.ctambiental_id);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.procesandoId === node_r3.ensayoItem.ctambiental_id ? 3 : 4);
  }
}
function EnsayoItemLista_Conditional_24_For_1_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr", 20)(1, "td", 27)(2, "div", 28);
    \u0275\u0275conditionalCreate(3, EnsayoItemLista_Conditional_24_For_1_Conditional_1_Conditional_3_Template, 2, 0, "span", 29);
    \u0275\u0275elementStart(4, "span", 30);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(6, "td", 13);
    \u0275\u0275conditionalCreate(7, EnsayoItemLista_Conditional_24_For_1_Conditional_1_Conditional_7_Template, 2, 0, "span", 31)(8, EnsayoItemLista_Conditional_24_For_1_Conditional_1_Conditional_8_Template, 2, 0, "span", 32);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(9, EnsayoItemLista_Conditional_24_For_1_Conditional_1_Conditional_9_Template, 5, 2, "td", 14);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const node_r3 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275styleProp("padding-left", node_r3.nivel * 16, "px");
    \u0275\u0275advance();
    \u0275\u0275conditional(node_r3.nivel > 0 ? 3 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", (node_r3.ensayoItem.item_catalogo == null ? null : node_r3.ensayoItem.item_catalogo.nombre) ?? "\u2014", " ");
    \u0275\u0275advance(2);
    \u0275\u0275conditional(node_r3.ensayoItem.estado ? 7 : 8);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.hasAnyAction ? 9 : -1);
  }
}
function EnsayoItemLista_Conditional_24_For_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, EnsayoItemLista_Conditional_24_For_1_Conditional_0_Template, 9, 4, "tr", 19)(1, EnsayoItemLista_Conditional_24_For_1_Conditional_1_Template, 10, 6, "tr", 20);
  }
  if (rf & 2) {
    const node_r3 = ctx.$implicit;
    \u0275\u0275conditional(node_r3.isExternal ? 0 : 1);
  }
}
function EnsayoItemLista_Conditional_24_ForEmpty_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td", 40);
    \u0275\u0275text(2, " No hay \xEDtems para este ensayo. ");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275attribute("colspan", ctx_r1.hasAnyAction ? 3 : 2);
  }
}
function EnsayoItemLista_Conditional_24_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275repeaterCreate(0, EnsayoItemLista_Conditional_24_For_1_Template, 2, 1, null, null, \u0275\u0275repeaterTrackByIndex, false, EnsayoItemLista_Conditional_24_ForEmpty_2_Template, 3, 1, "tr");
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275repeater(ctx_r1.flatNodes);
  }
}
function EnsayoItemLista_Conditional_25_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 45);
    \u0275\u0275listener("click", function EnsayoItemLista_Conditional_25_Conditional_1_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r1 = \u0275\u0275nextContext(2);
      ctx_r1.editar.emit(ctx_r1.menuItem);
      return \u0275\u0275resetView(ctx_r1.closeMenu());
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 46);
    \u0275\u0275element(2, "path", 47);
    \u0275\u0275elementEnd();
    \u0275\u0275text(3, " Editar ");
    \u0275\u0275elementEnd();
  }
}
function EnsayoItemLista_Conditional_25_Conditional_2_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 46);
    \u0275\u0275element(1, "path", 49);
    \u0275\u0275elementEnd();
    \u0275\u0275text(2, " Deshabilitar ");
  }
}
function EnsayoItemLista_Conditional_25_Conditional_2_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 46);
    \u0275\u0275element(1, "path", 50);
    \u0275\u0275elementEnd();
    \u0275\u0275text(2, " Habilitar ");
  }
}
function EnsayoItemLista_Conditional_25_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 48);
    \u0275\u0275listener("click", function EnsayoItemLista_Conditional_25_Conditional_2_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r1 = \u0275\u0275nextContext(2);
      ctx_r1.toggleEstadoItem(ctx_r1.menuItem);
      return \u0275\u0275resetView(ctx_r1.closeMenu());
    });
    \u0275\u0275conditionalCreate(1, EnsayoItemLista_Conditional_25_Conditional_2_Conditional_1_Template, 3, 0)(2, EnsayoItemLista_Conditional_25_Conditional_2_Conditional_2_Template, 3, 0);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275classMap(ctx_r1.menuItem.estado ? "w-full flex items-center gap-2.5 px-3 py-2 text-xs text-red-600 hover:bg-red-50" : "w-full flex items-center gap-2.5 px-3 py-2 text-xs text-green-700 hover:bg-green-50");
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.menuItem.estado ? 1 : 2);
  }
}
function EnsayoItemLista_Conditional_25_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 41);
    \u0275\u0275conditionalCreate(1, EnsayoItemLista_Conditional_25_Conditional_1_Template, 4, 0, "button", 42);
    \u0275\u0275conditionalCreate(2, EnsayoItemLista_Conditional_25_Conditional_2_Template, 3, 3, "button", 43);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 44);
    \u0275\u0275listener("click", function EnsayoItemLista_Conditional_25_Template_div_click_3_listener() {
      \u0275\u0275restoreView(_r5);
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
var EnsayoItemLista = class _EnsayoItemLista {
  ensayoService;
  catService;
  authService;
  zone;
  toastrAlert;
  ensayoId = null;
  reloadTrigger = 0;
  nuevo = new EventEmitter();
  editar = new EventEmitter();
  loading = true;
  flatNodes = [];
  openMenuId = null;
  // ctambiental_id
  menuItem = null;
  menuPos = null;
  procesandoId = null;
  // ctambiental_id
  destroy$ = new Subject();
  userAppRole = computed(() => {
    const roles = this.authService.userProfile()?.roles ?? [];
    return Object.values(AppRole).find((r) => roles.includes(r)) ?? null;
  }, ...ngDevMode ? [{ debugName: "userAppRole" }] : []);
  canEdit = computed(() => {
    const r = this.userAppRole();
    return r ? hasPermission(MenuKey.ADMIN_ENSAYOS, r, "editar") : false;
  }, ...ngDevMode ? [{ debugName: "canEdit" }] : []);
  canDelete = computed(() => {
    const r = this.userAppRole();
    return r ? hasPermission(MenuKey.ADMIN_ENSAYOS, r, "eliminar") : false;
  }, ...ngDevMode ? [{ debugName: "canDelete" }] : []);
  canCrear = computed(() => {
    const r = this.userAppRole();
    return r ? hasPermission(MenuKey.ADMIN_ENSAYOS, r, "crear") : false;
  }, ...ngDevMode ? [{ debugName: "canCrear" }] : []);
  get hasAnyAction() {
    return this.canEdit() || this.canDelete();
  }
  constructor(ensayoService, catService, authService, zone, toastrAlert) {
    this.ensayoService = ensayoService;
    this.catService = catService;
    this.authService = authService;
    this.zone = zone;
    this.toastrAlert = toastrAlert;
  }
  ngOnInit() {
    if (this.ensayoId !== null)
      this.cargarDatos();
  }
  ngOnChanges(changes) {
    if (changes["ensayoId"] && !changes["ensayoId"].firstChange || changes["reloadTrigger"] && !changes["reloadTrigger"].firstChange) {
      if (this.ensayoId !== null)
        this.cargarDatos();
      else
        this.flatNodes = [];
    }
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  cargarDatos() {
    if (this.ensayoId === null)
      return;
    this.loading = true;
    this.ensayoService.getEnsayoItems(this.ensayoId).pipe(switchMap((items) => {
      const knownIds = new Set(items.map((ei) => ei.ctambiental_id));
      const externalIds = [...new Set(items.map((ei) => ei.item_catalogo?.item_catalogo_id).filter((id) => id !== null && id !== void 0 && !knownIds.has(id)))];
      if (externalIds.length === 0) {
        return of({ items, externalParents: [] });
      }
      return this.catService.getItemsByIds(externalIds).pipe(map((parents) => ({ items, externalParents: parents })));
    }), takeUntil(this.destroy$)).subscribe({
      next: ({ items, externalParents }) => {
        const knownIds = new Set(items.map((ei) => ei.ctambiental_id));
        const extMap = new Map(externalParents.map((p) => [p.id, p]));
        this.flatNodes = buildFlatNodes(items, extMap, knownIds, null, 0);
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
  async toggleEstadoItem(item) {
    const accion = item.estado ? "deshabilitar" : "habilitar";
    const nombre = item.item_catalogo?.nombre ?? `\xEDtem #${item.ctambiental_id}`;
    const confirm = await import_sweetalert22.default.fire({
      icon: "warning",
      title: `\xBF${item.estado ? "Deshabilitar" : "Habilitar"} \xEDtem?`,
      text: `Se ${accion}\xE1 "${nombre}".`,
      showCancelButton: true,
      confirmButtonColor: item.estado ? "#d33" : "#16a34a",
      cancelButtonColor: "#6b7280",
      confirmButtonText: `S\xED, ${accion}`,
      cancelButtonText: "Cancelar"
    });
    if (!confirm.isConfirmed)
      return;
    this.procesandoId = item.ctambiental_id;
    this.ensayoService.toggleEnsayoItem(item.ctambiental_id, item.ensayo_id, !item.estado).pipe(takeUntil(this.destroy$), finalize(() => {
      this.procesandoId = null;
    })).subscribe({
      next: () => this.zone.run(() => {
        this.toastrAlert.showSuccess(`\xCDtem ${item.estado ? "deshabilitado" : "habilitado"}.`, "\xA1Listo!");
        this.cargarDatos();
      }),
      error: () => this.zone.run(() => this.toastrAlert.showError(`No se pudo ${accion} el \xEDtem.`, "Error"))
    });
  }
  static \u0275fac = function EnsayoItemLista_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _EnsayoItemLista)(\u0275\u0275directiveInject(EnsayoService), \u0275\u0275directiveInject(CatalogoService), \u0275\u0275directiveInject(AuthService), \u0275\u0275directiveInject(NgZone), \u0275\u0275directiveInject(ToastrAlertService));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _EnsayoItemLista, selectors: [["app-ensayo-item-lista"]], inputs: { ensayoId: "ensayoId", reloadTrigger: "reloadTrigger" }, outputs: { nuevo: "nuevo", editar: "editar" }, features: [\u0275\u0275NgOnChangesFeature], decls: 26, vars: 8, consts: [[1, "bg-white", "rounded-lg", "shadow-sm", "border", "border-slate-200", "p-4"], [1, "flex", "items-center", "justify-between", "mb-4"], [1, "text-sm", "font-bold", "text-slate-700", "uppercase", "tracking-wide"], [1, "text-[11px]", "text-slate-400", "mt-0.5"], ["type", "button", 1, "bg-[#1e3a8a]", "text-white", "px-3", "py-1.5", "rounded", "text-xs", "font-bold", "shadow-sm", "hover:bg-[#2541b2]", "transition-all", "flex", "items-center", "gap-1.5"], [1, "border", "border-slate-200", "rounded", "overflow-hidden"], [1, "overflow-x-auto"], [1, "w-full", "text-sm", "border-collapse", "table-fixed"], [1, "w-full"], [1, "w-[76px]"], [1, "w-[50px]"], [1, "bg-slate-50", "text-[10px]", "font-bold", "text-slate-500", "uppercase", "border-b", "border-slate-200", "tracking-wider"], [1, "px-3", "py-2.5", "border-r", "border-slate-100", "text-left"], [1, "px-3", "py-2.5", "border-r", "border-slate-100", "text-center"], [1, "px-2", "py-2.5", "text-center"], ["appTableSkeleton", "", 3, "rows", "cols", "actionButtons"], ["type", "button", 1, "bg-[#1e3a8a]", "text-white", "px-3", "py-1.5", "rounded", "text-xs", "font-bold", "shadow-sm", "hover:bg-[#2541b2]", "transition-all", "flex", "items-center", "gap-1.5", 3, "click"], ["fill", "none", "viewBox", "0 0 24 24", "stroke", "currentColor", 1, "w-3.5", "h-3.5"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M12 4v16m8-8H4"], [1, "border-b", "border-slate-100", "bg-slate-50"], [1, "border-b", "border-slate-100", "hover:bg-slate-50", "transition-colors"], [1, "px-3", "py-2"], [1, "flex", "items-center", "gap-2"], ["fill", "none", "viewBox", "0 0 24 24", "stroke", "currentColor", 1, "h-3.5", "w-3.5", "text-slate-400", "shrink-0"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M3 7a2 2 0 012-2h4l2 2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V7z"], [1, "text-[11px]", "font-semibold", "text-slate-500"], [1, "text-[9px]", "font-bold", "px-1.5", "py-0.5", "rounded", "bg-slate-200", "text-slate-500", "uppercase", "tracking-wide"], [1, "px-3", "py-2.5", "border-r", "border-slate-100"], [1, "flex", "items-center", "gap-1"], [1, "text-slate-300", "text-xs", "shrink-0"], [1, "text-xs", "text-slate-700"], [1, "inline-flex", "items-center", "px-1.5", "py-0.5", "rounded", "text-[10px]", "font-semibold", "bg-green-100", "text-green-700"], [1, "inline-flex", "items-center", "px-1.5", "py-0.5", "rounded", "text-[10px]", "font-semibold", "bg-slate-100", "text-slate-500"], [1, "flex", "items-center", "justify-center"], ["type", "button", "title", "M\xE1s acciones", 1, "h-8", "w-8", "flex", "items-center", "justify-center", "rounded", "border", "border-slate-300", "text-slate-500", "bg-white", "hover:bg-slate-100", "disabled:opacity-40", "transition-colors", "shrink-0", 3, "click", "disabled"], ["fill", "none", "viewBox", "0 0 24 24", 1, "h-3.5", "w-3.5", "animate-spin"], ["fill", "currentColor", "viewBox", "0 0 20 20", 1, "h-4", "w-4"], ["cx", "12", "cy", "12", "r", "10", "stroke", "currentColor", "stroke-width", "4", 1, "opacity-25"], ["fill", "currentColor", "d", "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z", 1, "opacity-75"], ["d", "M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"], [1, "p-10", "text-slate-400", "italic", "text-center", "text-xs"], [1, "fixed", "z-50", "bg-white", "border", "border-slate-200", "rounded-lg", "shadow-lg", "py-1", "w-40"], ["type", "button", 1, "w-full", "flex", "items-center", "gap-2.5", "px-3", "py-2", "text-xs", "text-amber-700", "hover:bg-amber-50"], ["type", "button", 3, "class"], [1, "fixed", "inset-0", "z-40", 3, "click"], ["type", "button", 1, "w-full", "flex", "items-center", "gap-2.5", "px-3", "py-2", "text-xs", "text-amber-700", "hover:bg-amber-50", 3, "click"], ["fill", "none", "viewBox", "0 0 24 24", "stroke", "currentColor", 1, "h-3.5", "w-3.5", "shrink-0"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"], ["type", "button", 3, "click"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"]], template: function EnsayoItemLista_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div")(3, "h3", 2);
      \u0275\u0275text(4, "Tipos Ambientales");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(5, "p", 3);
      \u0275\u0275text(6, "\xCDtems del ensayo seleccionado");
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(7, EnsayoItemLista_Conditional_7_Template, 4, 0, "button", 4);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(8, "div", 5)(9, "div", 6)(10, "table", 7)(11, "colgroup");
      \u0275\u0275element(12, "col", 8)(13, "col", 9);
      \u0275\u0275conditionalCreate(14, EnsayoItemLista_Conditional_14_Template, 1, 0, "col", 10);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(15, "thead")(16, "tr", 11)(17, "th", 12);
      \u0275\u0275text(18, "Tipo Ambiental");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(19, "th", 13);
      \u0275\u0275text(20, "Estado");
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(21, EnsayoItemLista_Conditional_21_Template, 2, 0, "th", 14);
      \u0275\u0275elementEnd()();
      \u0275\u0275element(22, "tbody", 15);
      \u0275\u0275elementStart(23, "tbody");
      \u0275\u0275conditionalCreate(24, EnsayoItemLista_Conditional_24_Template, 3, 1);
      \u0275\u0275elementEnd()()()()();
      \u0275\u0275conditionalCreate(25, EnsayoItemLista_Conditional_25_Template, 4, 6);
    }
    if (rf & 2) {
      \u0275\u0275advance(7);
      \u0275\u0275conditional(ctx.canCrear() ? 7 : -1);
      \u0275\u0275advance(7);
      \u0275\u0275conditional(ctx.hasAnyAction ? 14 : -1);
      \u0275\u0275advance(7);
      \u0275\u0275conditional(ctx.hasAnyAction ? 21 : -1);
      \u0275\u0275advance();
      \u0275\u0275property("rows", ctx.loading ? 8 : 0)("cols", 2)("actionButtons", ctx.hasAnyAction ? 1 : 0);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(!ctx.loading ? 24 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.openMenuId !== null && ctx.menuItem && ctx.menuPos ? 25 : -1);
    }
  }, dependencies: [CommonModule, TableSkeleton], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(EnsayoItemLista, [{
    type: Component,
    args: [{ selector: "app-ensayo-item-lista", imports: [CommonModule, TableSkeleton], template: `<div class="bg-white rounded-lg shadow-sm border border-slate-200 p-4">

  <div class="flex items-center justify-between mb-4">
    <div>
      <h3 class="text-sm font-bold text-slate-700 uppercase tracking-wide">Tipos Ambientales</h3>
      <p class="text-[11px] text-slate-400 mt-0.5">\xCDtems del ensayo seleccionado</p>
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
          <col class="w-full">
          <col class="w-[76px]">
          @if (hasAnyAction) {
            <col class="w-[50px]">
          }
        </colgroup>
        <thead>
          <tr class="bg-slate-50 text-[10px] font-bold text-slate-500 uppercase border-b border-slate-200 tracking-wider">
            <th class="px-3 py-2.5 border-r border-slate-100 text-left">Tipo Ambiental</th>
            <th class="px-3 py-2.5 border-r border-slate-100 text-center">Estado</th>
            @if (hasAnyAction) {
              <th class="px-2 py-2.5 text-center">Acc.</th>
            }
          </tr>
        </thead>
        <tbody appTableSkeleton [rows]="loading ? 8 : 0" [cols]="2" [actionButtons]="hasAnyAction ? 1 : 0"></tbody>
        <tbody>
          @if (!loading) {
            @for (node of flatNodes; track $index) {

              @if (node.isExternal) {
                <!-- Fila cabecera: padre de otro cat\xE1logo -->
                <tr class="border-b border-slate-100 bg-slate-50">
                  <td [attr.colspan]="hasAnyAction ? 3 : 2" class="px-3 py-2">
                    <div class="flex items-center gap-2" [style.padding-left.px]="node.nivel * 16">
                      <svg class="h-3.5 w-3.5 text-slate-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M3 7a2 2 0 012-2h4l2 2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V7z"/>
                      </svg>
                      <span class="text-[11px] font-semibold text-slate-500">{{ node.catNombre }}</span>
                      <span class="text-[9px] font-bold px-1.5 py-0.5 rounded bg-slate-200 text-slate-500 uppercase tracking-wide">cat\xE1logo externo</span>
                    </div>
                  </td>
                </tr>

              } @else {
                <!-- Fila normal: ensayo-item real -->
                <tr class="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                  <td class="px-3 py-2.5 border-r border-slate-100">
                    <div class="flex items-center gap-1" [style.padding-left.px]="node.nivel * 16">
                      @if (node.nivel > 0) {
                        <span class="text-slate-300 text-xs shrink-0">\u2514</span>
                      }
                      <span class="text-xs text-slate-700">
                        {{ node.ensayoItem!.item_catalogo?.nombre ?? '\u2014' }}
                      </span>
                    </div>
                  </td>
                  <td class="px-3 py-2.5 border-r border-slate-100 text-center">
                    @if (node.ensayoItem!.estado) {
                      <span class="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold bg-green-100 text-green-700">Activo</span>
                    } @else {
                      <span class="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold bg-slate-100 text-slate-500">Inactivo</span>
                    }
                  </td>
                  @if (hasAnyAction) {
                    <td class="px-2 py-2.5 text-center">
                      <div class="flex items-center justify-center">
                        <button type="button" title="M\xE1s acciones"
                          (click)="toggleMenu(node.ensayoItem!.ctambiental_id, node.ensayoItem!, $event)"
                          [disabled]="procesandoId === node.ensayoItem!.ctambiental_id"
                          class="h-8 w-8 flex items-center justify-center rounded border border-slate-300 text-slate-500 bg-white hover:bg-slate-100 disabled:opacity-40 transition-colors shrink-0">
                          @if (procesandoId === node.ensayoItem!.ctambiental_id) {
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
              }

            } @empty {
              <tr>
                <td [attr.colspan]="hasAnyAction ? 3 : 2" class="p-10 text-slate-400 italic text-center text-xs">
                  No hay \xEDtems para este ensayo.
                </td>
              </tr>
            }
          }
        </tbody>
      </table>
    </div>
  </div>

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
  }], () => [{ type: EnsayoService }, { type: CatalogoService }, { type: AuthService }, { type: NgZone }, { type: ToastrAlertService }], { ensayoId: [{
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
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(EnsayoItemLista, { className: "EnsayoItemLista", filePath: "src/app/features/admin-ensayos/ensayo-item/lista/ensayo-item-lista.ts", lineNumber: 24 });
})();

// src/app/features/admin-ensayos/ensayo-item/formulario/ensayo-item-formulario.ts
var _forTrack03 = ($index, $item) => $item.id;
function EnsayoItemFormulario_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "app-field-skeleton");
  }
}
function EnsayoItemFormulario_Conditional_17_For_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 16);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r3 = ctx.$implicit;
    \u0275\u0275property("value", item_r3.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(item_r3.nombre);
  }
}
function EnsayoItemFormulario_Conditional_17_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "select", 14);
    \u0275\u0275listener("ngModelChange", function EnsayoItemFormulario_Conditional_17_Template_select_ngModelChange_0_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onAmbientalChange($event));
    });
    \u0275\u0275elementStart(1, "option", 15);
    \u0275\u0275text(2, "\u2014 Seleccionar tipo ambiental \u2014");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(3, EnsayoItemFormulario_Conditional_17_For_4_Template, 2, 2, "option", 16, _forTrack03);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("ngModel", ctx_r1.ctambiental_id ?? "")("disabled", ctx_r1.saving);
    \u0275\u0275advance(3);
    \u0275\u0275repeater(ctx_r1.itemOptions);
  }
}
function EnsayoItemFormulario_Conditional_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 17);
    \u0275\u0275element(1, "circle", 18)(2, "path", 19);
    \u0275\u0275elementEnd();
    \u0275\u0275text(3, " Guardando... ");
  }
}
function EnsayoItemFormulario_Conditional_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275textInterpolate1(" ", ctx_r1.modoEdicion ? "Actualizar" : "Crear \xEDtem", " ");
  }
}
var EnsayoItemFormulario = class _EnsayoItemFormulario {
  ensayoService;
  toastrAlert;
  ensayo;
  editingRecord = null;
  guardado = new EventEmitter();
  cancelado = new EventEmitter();
  destroy$ = new Subject();
  saving = false;
  loadingOptions = true;
  itemOptions = [];
  ctambiental_id = null;
  get modoEdicion() {
    return !!this.editingRecord;
  }
  constructor(ensayoService, toastrAlert) {
    this.ensayoService = ensayoService;
    this.toastrAlert = toastrAlert;
  }
  ngOnInit() {
    if (this.editingRecord) {
      this.ctambiental_id = this.editingRecord.ctambiental_id;
    }
    this.cargarOpciones();
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  cargarOpciones() {
    this.loadingOptions = true;
    this.ensayoService.getItemCatalogoOptions().pipe(takeUntil(this.destroy$)).subscribe({
      next: (data) => {
        this.itemOptions = data;
        this.loadingOptions = false;
      },
      error: () => {
        this.loadingOptions = false;
      }
    });
  }
  onAmbientalChange(val) {
    const n = parseInt(val, 10);
    this.ctambiental_id = isNaN(n) ? null : n;
  }
  guardar() {
    if (!this.ctambiental_id) {
      this.toastrAlert.showError("El tipo ambiental es obligatorio.", "Campo requerido");
      return;
    }
    this.saving = true;
    const payload = {
      ctambiental_id: this.ctambiental_id,
      ensayo_id: this.ensayo.id
    };
    const op$ = this.modoEdicion ? this.ensayoService.updateEnsayoItem(this.editingRecord.ctambiental_id, this.editingRecord.ensayo_id, payload) : this.ensayoService.createEnsayoItem(payload);
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
  static \u0275fac = function EnsayoItemFormulario_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _EnsayoItemFormulario)(\u0275\u0275directiveInject(EnsayoService), \u0275\u0275directiveInject(ToastrAlertService));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _EnsayoItemFormulario, selectors: [["app-ensayo-item-formulario"]], inputs: { ensayo: "ensayo", editingRecord: "editingRecord" }, outputs: { guardado: "guardado", cancelado: "cancelado" }, decls: 24, vars: 6, consts: [[1, "bg-white", "rounded-lg", "shadow-sm", "border", "border-slate-200", "p-6", "max-w-lg"], [1, "flex", "items-center", "gap-3", "mb-6"], ["type", "button", 1, "h-8", "w-8", "flex", "items-center", "justify-center", "rounded", "border", "border-slate-200", "text-slate-500", "hover:bg-slate-100", "transition-colors", 3, "click"], ["fill", "none", "viewBox", "0 0 24 24", "stroke", "currentColor", 1, "h-4", "w-4"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M15 19l-7-7 7-7"], [1, "text-sm", "font-bold", "text-slate-700"], [1, "text-[11px]", "text-slate-400", "mt-0.5"], [1, "space-y-4"], [1, "block", "text-xs", "font-semibold", "text-slate-600", "mb-1"], [1, "text-red-500"], [1, "w-full", "border", "border-slate-300", "rounded", "px-3", "py-2", "text-sm", "text-slate-700", "focus:outline-none", "focus:ring-2", "focus:ring-blue-300", "focus:border-blue-400", "transition", "bg-white", 3, "ngModel", "disabled"], [1, "flex", "items-center", "gap-3", "mt-6"], ["type", "button", 1, "bg-[#1e3a8a]", "text-white", "px-5", "py-2", "rounded", "text-sm", "font-bold", "shadow-sm", "hover:bg-[#2541b2]", "disabled:opacity-50", "disabled:cursor-not-allowed", "transition-all", "flex", "items-center", "gap-2", 3, "click", "disabled"], ["type", "button", 1, "px-5", "py-2", "rounded", "text-sm", "font-medium", "border", "border-slate-300", "text-slate-600", "hover:bg-slate-50", "disabled:opacity-50", "transition-all", 3, "click", "disabled"], [1, "w-full", "border", "border-slate-300", "rounded", "px-3", "py-2", "text-sm", "text-slate-700", "focus:outline-none", "focus:ring-2", "focus:ring-blue-300", "focus:border-blue-400", "transition", "bg-white", 3, "ngModelChange", "ngModel", "disabled"], ["value", ""], [3, "value"], ["fill", "none", "viewBox", "0 0 24 24", 1, "h-4", "w-4", "animate-spin"], ["cx", "12", "cy", "12", "r", "10", "stroke", "currentColor", "stroke-width", "4", 1, "opacity-25"], ["fill", "currentColor", "d", "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z", 1, "opacity-75"]], template: function EnsayoItemFormulario_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "button", 2);
      \u0275\u0275listener("click", function EnsayoItemFormulario_Template_button_click_2_listener() {
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
      \u0275\u0275text(13, " Tipo Ambiental ");
      \u0275\u0275elementStart(14, "span", 9);
      \u0275\u0275text(15, "*");
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(16, EnsayoItemFormulario_Conditional_16_Template, 1, 0, "app-field-skeleton")(17, EnsayoItemFormulario_Conditional_17_Template, 5, 2, "select", 10);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(18, "div", 11)(19, "button", 12);
      \u0275\u0275listener("click", function EnsayoItemFormulario_Template_button_click_19_listener() {
        return ctx.guardar();
      });
      \u0275\u0275conditionalCreate(20, EnsayoItemFormulario_Conditional_20_Template, 4, 0)(21, EnsayoItemFormulario_Conditional_21_Template, 1, 1);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(22, "button", 13);
      \u0275\u0275listener("click", function EnsayoItemFormulario_Template_button_click_22_listener() {
        return ctx.cancelado.emit();
      });
      \u0275\u0275text(23, " Cancelar ");
      \u0275\u0275elementEnd()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(7);
      \u0275\u0275textInterpolate1(" ", ctx.modoEdicion ? "Editar \xEDtem" : "Nuevo \xEDtem", " ");
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate1("Ensayo: ", ctx.ensayo.analisis);
      \u0275\u0275advance(7);
      \u0275\u0275conditional(ctx.loadingOptions ? 16 : 17);
      \u0275\u0275advance(3);
      \u0275\u0275property("disabled", ctx.saving || ctx.loadingOptions);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.saving ? 20 : 21);
      \u0275\u0275advance(2);
      \u0275\u0275property("disabled", ctx.saving);
    }
  }, dependencies: [CommonModule, FormsModule, NgSelectOption, \u0275NgSelectMultipleOption, SelectControlValueAccessor, NgControlStatus, NgModel, FieldSkeleton], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(EnsayoItemFormulario, [{
    type: Component,
    args: [{ selector: "app-ensayo-item-formulario", imports: [CommonModule, FormsModule, FieldSkeleton], template: `<div class="bg-white rounded-lg shadow-sm border border-slate-200 p-6 max-w-lg">

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
      <p class="text-[11px] text-slate-400 mt-0.5">Ensayo: {{ ensayo.analisis }}</p>
    </div>
  </div>

  <div class="space-y-4">

    <div>
      <label class="block text-xs font-semibold text-slate-600 mb-1">
        Tipo Ambiental <span class="text-red-500">*</span>
      </label>
      @if (loadingOptions) {
        <app-field-skeleton />
      } @else {
        <select
          [ngModel]="ctambiental_id ?? ''"
          (ngModelChange)="onAmbientalChange($event)"
          class="w-full border border-slate-300 rounded px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition bg-white"
          [disabled]="saving">
          <option value="">\u2014 Seleccionar tipo ambiental \u2014</option>
          @for (item of itemOptions; track item.id) {
            <option [value]="item.id">{{ item.nombre }}</option>
          }
        </select>
      }
    </div>

  </div>

  <div class="flex items-center gap-3 mt-6">
    <button type="button" (click)="guardar()" [disabled]="saving || loadingOptions"
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
  }], () => [{ type: EnsayoService }, { type: ToastrAlertService }], { ensayo: [{
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
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(EnsayoItemFormulario, { className: "EnsayoItemFormulario", filePath: "src/app/features/admin-ensayos/ensayo-item/formulario/ensayo-item-formulario.ts", lineNumber: 16 });
})();

// src/app/features/admin-ensayos/admin-ensayos.ts
function AdminEnsayos_Conditional_4_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 9)(1, "app-ensayo-item-lista", 11);
    \u0275\u0275listener("nuevo", function AdminEnsayos_Conditional_4_Conditional_4_Template_app_ensayo_item_lista_nuevo_1_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.onNuevoItem());
    })("editar", function AdminEnsayos_Conditional_4_Conditional_4_Template_app_ensayo_item_lista_editar_1_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.onEditarItem($event));
    });
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("ensayoId", ctx_r1.selectedEnsayo.id)("reloadTrigger", ctx_r1.reloadItemsTrigger);
  }
}
function AdminEnsayos_Conditional_4_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 10);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 12);
    \u0275\u0275element(2, "path", 13);
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(3, "p", 14);
    \u0275\u0275text(4, "Selecciona un ensayo para ver sus tipos ambientales");
    \u0275\u0275elementEnd()();
  }
}
function AdminEnsayos_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 4)(1, "div", 6)(2, "app-ensayo-lista", 7);
    \u0275\u0275listener("seleccionar", function AdminEnsayos_Conditional_4_Template_app_ensayo_lista_seleccionar_2_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onSeleccionar($event));
    })("nuevo", function AdminEnsayos_Conditional_4_Template_app_ensayo_lista_nuevo_2_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onNuevoEnsayo());
    })("editar", function AdminEnsayos_Conditional_4_Template_app_ensayo_lista_editar_2_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onEditarEnsayo($event));
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(3, "div", 8);
    \u0275\u0275conditionalCreate(4, AdminEnsayos_Conditional_4_Conditional_4_Template, 2, 2, "div", 9)(5, AdminEnsayos_Conditional_4_Conditional_5_Template, 5, 0, "div", 10);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275property("selectedId", (ctx_r1.selectedEnsayo == null ? null : ctx_r1.selectedEnsayo.id) ?? null)("reloadTrigger", ctx_r1.reloadItemsTrigger);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.selectedEnsayo ? 4 : 5);
  }
}
function AdminEnsayos_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "app-ensayo-formulario", 15);
    \u0275\u0275listener("guardado", function AdminEnsayos_Conditional_5_Template_app_ensayo_formulario_guardado_0_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onGuardadoEnsayo($event));
    })("cancelado", function AdminEnsayos_Conditional_5_Template_app_ensayo_formulario_cancelado_0_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onCanceladoEnsayo());
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("editingRecord", ctx_r1.editingEnsayo);
  }
}
function AdminEnsayos_Conditional_6_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "app-ensayo-item-formulario", 17);
    \u0275\u0275listener("guardado", function AdminEnsayos_Conditional_6_Conditional_0_Template_app_ensayo_item_formulario_guardado_0_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.onGuardadoItem());
    })("cancelado", function AdminEnsayos_Conditional_6_Conditional_0_Template_app_ensayo_item_formulario_cancelado_0_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.onCanceladoItem());
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275property("ensayo", ctx_r1.selectedEnsayo)("editingRecord", ctx_r1.editingItem);
  }
}
function AdminEnsayos_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, AdminEnsayos_Conditional_6_Conditional_0_Template, 1, 2, "app-ensayo-item-formulario", 16);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275conditional(ctx_r1.selectedEnsayo ? 0 : -1);
  }
}
var AdminEnsayos = class _AdminEnsayos {
  vista = "main";
  selectedEnsayo = null;
  editingEnsayo = null;
  editingItem = null;
  reloadItemsTrigger = 0;
  onSeleccionar(e) {
    this.selectedEnsayo = e;
  }
  onNuevoEnsayo() {
    this.editingEnsayo = null;
    this.vista = "form-ensayo";
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  onEditarEnsayo(e) {
    this.editingEnsayo = e;
    this.vista = "form-ensayo";
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  onGuardadoEnsayo(e) {
    this.selectedEnsayo = e;
    this.vista = "main";
    this.editingEnsayo = null;
  }
  onCanceladoEnsayo() {
    this.editingEnsayo = null;
    this.vista = "main";
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
  onGuardadoItem() {
    this.vista = "main";
    this.editingItem = null;
    this.reloadItemsTrigger++;
  }
  onCanceladoItem() {
    this.editingItem = null;
    this.vista = "main";
  }
  static \u0275fac = function AdminEnsayos_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AdminEnsayos)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AdminEnsayos, selectors: [["app-admin-ensayos"]], decls: 7, vars: 3, consts: [[1, "p-6", "bg-slate-50", "min-h-screen", "text-slate-700", "font-sans", "pb-24"], [1, "max-w-7xl", "mx-auto"], [1, "animate-in", "fade-in"], ["breadcrumbSection", "Administraci\xF3n", "title", "Ensayos", "subtitle", "Gestiona ensayos y sus tipos ambientales"], [1, "grid", "grid-cols-1", "lg:grid-cols-5", "gap-4"], [3, "editingRecord"], [1, "lg:col-span-2"], [3, "seleccionar", "nuevo", "editar", "selectedId", "reloadTrigger"], [1, "lg:col-span-3"], [1, "flex", "flex-col", "gap-4"], [1, "bg-white", "rounded-lg", "shadow-sm", "border", "border-slate-200", "p-12", "flex", "flex-col", "items-center", "justify-center", "text-center", "min-h-[200px]"], [3, "nuevo", "editar", "ensayoId", "reloadTrigger"], ["fill", "none", "viewBox", "0 0 24 24", "stroke", "currentColor", 1, "w-10", "h-10", "text-slate-300", "mb-3"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "1.5", "d", "M19.428 15.428a2 2 0 00-1.022-.822l-5.406-2.702V4h1a1 1 0 000-2H8a1 1 0 000 2h1v7.906l-5.406 2.702a2 2 0 00-1.022.822l-.99 1.65A1.5 1.5 0 002.868 21h18.264a1.5 1.5 0 001.286-2.272l-.99-1.65z"], [1, "text-sm", "text-slate-400", "font-medium"], [3, "guardado", "cancelado", "editingRecord"], [3, "ensayo", "editingRecord"], [3, "guardado", "cancelado", "ensayo", "editingRecord"]], template: function AdminEnsayos_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div", 2);
      \u0275\u0275element(3, "app-page-header", 3);
      \u0275\u0275conditionalCreate(4, AdminEnsayos_Conditional_4_Template, 6, 3, "div", 4);
      \u0275\u0275conditionalCreate(5, AdminEnsayos_Conditional_5_Template, 1, 1, "app-ensayo-formulario", 5);
      \u0275\u0275conditionalCreate(6, AdminEnsayos_Conditional_6_Template, 1, 1);
      \u0275\u0275elementEnd()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(4);
      \u0275\u0275conditional(ctx.vista === "main" ? 4 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.vista === "form-ensayo" ? 5 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.vista === "form-item" ? 6 : -1);
    }
  }, dependencies: [CommonModule, PageHeader, EnsayoLista, EnsayoFormulario, EnsayoItemLista, EnsayoItemFormulario], styles: ["\n\n.animate-in[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_animateIn 0.3s ease-out forwards;\n}\n.fade-in[_ngcontent-%COMP%] {\n  opacity: 0;\n}\n@keyframes _ngcontent-%COMP%_animateIn {\n  to {\n    opacity: 1;\n  }\n}\n/*# sourceMappingURL=admin-ensayos.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AdminEnsayos, [{
    type: Component,
    args: [{ selector: "app-admin-ensayos", imports: [CommonModule, PageHeader, EnsayoLista, EnsayoFormulario, EnsayoItemLista, EnsayoItemFormulario], template: `<div class="p-6 bg-slate-50 min-h-screen text-slate-700 font-sans pb-24">
  <div class="max-w-7xl mx-auto">
    <div class="animate-in fade-in">

      <app-page-header
        breadcrumbSection="Administraci\xF3n"
        title="Ensayos"
        subtitle="Gestiona ensayos y sus tipos ambientales"
      />

      @if (vista === 'main') {
        <div class="grid grid-cols-1 lg:grid-cols-5 gap-4">

          <!-- Panel izquierdo: lista de ensayos -->
          <div class="lg:col-span-2">
            <app-ensayo-lista
              [selectedId]="selectedEnsayo?.id ?? null"
              [reloadTrigger]="reloadItemsTrigger"
              (seleccionar)="onSeleccionar($event)"
              (nuevo)="onNuevoEnsayo()"
              (editar)="onEditarEnsayo($event)"
            />
          </div>

          <!-- Panel derecho: \xEDtems del ensayo seleccionado -->
          <div class="lg:col-span-3">
            @if (selectedEnsayo) {
              <div class="flex flex-col gap-4">
                <app-ensayo-item-lista
                  [ensayoId]="selectedEnsayo.id"
                  [reloadTrigger]="reloadItemsTrigger"
                  (nuevo)="onNuevoItem()"
                  (editar)="onEditarItem($event)"
                />
              </div>
            } @else {
              <div class="bg-white rounded-lg shadow-sm border border-slate-200 p-12 flex flex-col items-center justify-center text-center min-h-[200px]">
                <svg class="w-10 h-10 text-slate-300 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19.428 15.428a2 2 0 00-1.022-.822l-5.406-2.702V4h1a1 1 0 000-2H8a1 1 0 000 2h1v7.906l-5.406 2.702a2 2 0 00-1.022.822l-.99 1.65A1.5 1.5 0 002.868 21h18.264a1.5 1.5 0 001.286-2.272l-.99-1.65z"/>
                </svg>
                <p class="text-sm text-slate-400 font-medium">Selecciona un ensayo para ver sus tipos ambientales</p>
              </div>
            }
          </div>

        </div>
      }

      @if (vista === 'form-ensayo') {
        <app-ensayo-formulario
          [editingRecord]="editingEnsayo"
          (guardado)="onGuardadoEnsayo($event)"
          (cancelado)="onCanceladoEnsayo()"
        />
      }

      @if (vista === 'form-item') {
        @if (selectedEnsayo) {
          <app-ensayo-item-formulario
            [ensayo]="selectedEnsayo"
            [editingRecord]="editingItem"
            (guardado)="onGuardadoItem()"
            (cancelado)="onCanceladoItem()"
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
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AdminEnsayos, { className: "AdminEnsayos", filePath: "src/app/features/admin-ensayos/admin-ensayos.ts", lineNumber: 15 });
})();
export {
  AdminEnsayos
};
//# sourceMappingURL=chunk-MPMJG5SB.js.map
