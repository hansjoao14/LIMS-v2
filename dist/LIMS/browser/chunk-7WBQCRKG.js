import {
  CatalogoService
} from "./chunk-JQDQ7LNR.js";
import {
  LoadingComponent
} from "./chunk-VPP6RQL4.js";
import {
  ToastrAlertService
} from "./chunk-ECH5TBPN.js";
import "./chunk-PWNMWNUA.js";
import {
  CheckboxControlValueAccessor,
  DefaultValueAccessor,
  FormsModule,
  MinValidator,
  NgControlStatus,
  NgModel,
  NgSelectOption,
  NumberValueAccessor,
  SelectControlValueAccessor,
  ɵNgSelectMultipleOption
} from "./chunk-J76B35JM.js";
import "./chunk-XTPUTV4O.js";
import {
  PaginationComponent
} from "./chunk-5SMDVGDD.js";
import {
  META_FIELDS
} from "./chunk-XIRXEHG5.js";
import {
  PageHeader
} from "./chunk-2W4SUA4N.js";
import {
  Apollo,
  gql
} from "./chunk-7OA5XFJQ.js";
import {
  CommonModule,
  DatePipe,
  HttpClient,
  environment
} from "./chunk-FYBL3SR2.js";
import {
  Component,
  EventEmitter,
  Injectable,
  Input,
  NgZone,
  Output,
  Subject,
  __spreadProps,
  __spreadValues,
  map,
  setClassMetadata,
  takeUntil,
  ɵsetClassDebugInfo,
  ɵɵNgOnChangesFeature,
  ɵɵadvance,
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

// src/app/interfaces/admin-formularios/atributo-formulario-payload.interface.ts
var AtributoFormularioPayload = class {
  formulario_id;
  nombre;
  pregunta;
  ayuda;
  cttipo_dato_id;
  ctipo_respuesta_id;
  multivaluado;
  obligatorio;
  orden;
  catalogo_id;
  jornada_id;
  atributo_id;
  item_catalogo_id;
  is_ws_sri;
  is_ws_civil;
  is_ws_iess;
  estado;
  readonly;
  hidden;
  num_caracter;
  num_rango;
  num_atras;
  num_adelante;
  is_dependent;
  is_dependent_catalogo;
  is_list_empleado;
  is_text_area;
  constructor(formularioId, source) {
    this.formulario_id = source?.formulario_id ?? formularioId;
    this.nombre = source?.atributo_formulario_nombre ?? "";
    this.pregunta = source?.atributo_formulario_pregunta ?? "";
    this.ayuda = source?.atributo_formulario_ayuda ?? "";
    this.cttipo_dato_id = source?.ctipo_dato_id ? Number(source.ctipo_dato_id) : 0;
    this.ctipo_respuesta_id = source?.ctipo_respuesta_id ? Number(source.ctipo_respuesta_id) : 0;
    this.multivaluado = source?.multivaluado ?? false;
    this.obligatorio = source?.obligatorio ?? false;
    this.orden = source?.orden ?? 1;
    this.catalogo_id = source?.catalogo_id ? Number(source.catalogo_id) : null;
    this.jornada_id = source?.jornada_id ?? null;
    this.atributo_id = source?.atributo_id ?? null;
    this.item_catalogo_id = source?.item_catalogo_id ?? null;
    this.is_ws_sri = source?.is_ws_sri ?? false;
    this.is_ws_civil = source?.is_ws_civil ?? false;
    this.is_ws_iess = source?.is_ws_iess ?? false;
    this.estado = source?.estado_atributo_formulario ?? true;
    this.readonly = String(source?.readonly) === "true";
    this.hidden = String(source?.hidden) === "true";
    this.num_caracter = source?.num_caracter ?? null;
    this.num_rango = source?.num_rango ?? null;
    this.num_atras = source?.num_atras ?? null;
    this.num_adelante = source?.num_adelante ?? null;
    this.is_dependent = String(source?.is_dependent) === "true";
    this.is_dependent_catalogo = String(source?.is_dependent_catalogo) === "true";
    this.is_list_empleado = source?.is_list_empleado ?? false;
    this.is_text_area = source?.is_text_area ?? false;
  }
};

// src/app/services/admin-formularios/atributo-formulario.service.ts
var AtributoFormularioService = class _AtributoFormularioService {
  http;
  base = `${environment.api_formulario}/atributo-formulario`;
  constructor(http) {
    this.http = http;
  }
  crear(payload) {
    return this.http.post(this.base, payload);
  }
  actualizar(id, payload) {
    return this.http.put(`${this.base}/${id}`, payload);
  }
  static \u0275fac = function AtributoFormularioService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AtributoFormularioService)(\u0275\u0275inject(HttpClient));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _AtributoFormularioService, factory: _AtributoFormularioService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AtributoFormularioService, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], () => [{ type: HttpClient }], null);
})();

// src/app/features/formularios/formulario-detalle/atributo-form/atributo-form.ts
var _forTrack0 = ($index, $item) => $item.id;
var _forTrack1 = ($index, $item) => $item.atributo_formulario_id;
var _forTrack2 = ($index, $item) => $item.field;
function AtributoFormComponent_For_38_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 16);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const t_r1 = ctx.$implicit;
    \u0275\u0275property("ngValue", t_r1.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(t_r1.nombre);
  }
}
function AtributoFormComponent_For_48_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 16);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const t_r2 = ctx.$implicit;
    \u0275\u0275property("ngValue", t_r2.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(t_r2.nombre);
  }
}
function AtributoFormComponent_Conditional_79_For_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 16);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const c_r5 = ctx.$implicit;
    \u0275\u0275property("ngValue", c_r5.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(c_r5.nombre);
  }
}
function AtributoFormComponent_Conditional_79_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 29);
    \u0275\u0275text(1, " Seleccione un cat\xE1logo primero. ");
    \u0275\u0275elementEnd();
  }
}
function AtributoFormComponent_Conditional_79_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 29);
    \u0275\u0275text(1, "Cargando items...");
    \u0275\u0275elementEnd();
  }
}
function AtributoFormComponent_Conditional_79_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 29);
    \u0275\u0275text(1, "Sin items disponibles.");
    \u0275\u0275elementEnd();
  }
}
function AtributoFormComponent_Conditional_79_Conditional_14_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 31);
    \u0275\u0275element(1, "span", 32);
    \u0275\u0275elementStart(2, "span", 33);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const item_r6 = ctx.$implicit;
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(item_r6.nombre);
  }
}
function AtributoFormComponent_Conditional_79_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 30);
    \u0275\u0275repeaterCreate(1, AtributoFormComponent_Conditional_79_Conditional_14_For_2_Template, 4, 1, "div", 31, _forTrack0);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r3.itemsCatalogo);
  }
}
function AtributoFormComponent_Conditional_79_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div")(1, "label", 8);
    \u0275\u0275text(2, "Cat\xE1logo");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "select", 14);
    \u0275\u0275twoWayListener("ngModelChange", function AtributoFormComponent_Conditional_79_Template_select_ngModelChange_3_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r3 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r3.formData.catalogo_id, $event) || (ctx_r3.formData.catalogo_id = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("ngModelChange", function AtributoFormComponent_Conditional_79_Template_select_ngModelChange_3_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.onCatalogoChange());
    });
    \u0275\u0275elementStart(4, "option", 16);
    \u0275\u0275text(5, "\u2014 Ninguno \u2014");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(6, AtributoFormComponent_Conditional_79_For_7_Template, 2, 2, "option", 16, _forTrack0);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "div")(9, "label", 8);
    \u0275\u0275text(10, " Items del Cat\xE1logo ");
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(11, AtributoFormComponent_Conditional_79_Conditional_11_Template, 2, 0, "p", 29)(12, AtributoFormComponent_Conditional_79_Conditional_12_Template, 2, 0, "p", 29)(13, AtributoFormComponent_Conditional_79_Conditional_13_Template, 2, 0, "p", 29)(14, AtributoFormComponent_Conditional_79_Conditional_14_Template, 3, 0, "div", 30);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275twoWayProperty("ngModel", ctx_r3.formData.catalogo_id);
    \u0275\u0275advance();
    \u0275\u0275property("ngValue", null);
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r3.catalogos);
    \u0275\u0275advance(5);
    \u0275\u0275conditional(!ctx_r3.formData.catalogo_id || ctx_r3.formData.is_dependent ? 11 : ctx_r3.cargandoItems ? 12 : ctx_r3.itemsCatalogo.length === 0 ? 13 : 14);
  }
}
function AtributoFormComponent_For_87_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 16);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const j_r7 = ctx.$implicit;
    \u0275\u0275property("ngValue", j_r7.id.toString());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(j_r7.nombre);
  }
}
function AtributoFormComponent_For_95_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 16);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const a_r8 = ctx.$implicit;
    \u0275\u0275property("ngValue", a_r8.atributo_formulario_id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2(" ", a_r8.atributo_formulario_pregunta, " (", a_r8.atributo_formulario_nombre, ") ");
  }
}
function AtributoFormComponent_For_101_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "label", 24)(1, "input", 34);
    \u0275\u0275twoWayListener("ngModelChange", function AtributoFormComponent_For_101_Template_input_ngModelChange_1_listener($event) {
      const opt_r10 = \u0275\u0275restoreView(_r9).$implicit;
      const ctx_r3 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r3.formData[opt_r10.field], $event) || (ctx_r3.formData[opt_r10.field] = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "span", 35);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const opt_r10 = ctx.$implicit;
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275twoWayProperty("ngModel", ctx_r3.formData[opt_r10.field]);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(opt_r10.label);
  }
}
function AtributoFormComponent_Conditional_106_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 28);
  }
}
var AtributoFormComponent = class _AtributoFormComponent {
  atributoService;
  cataloService;
  toastr;
  zone;
  formulario;
  atributo = null;
  atributos = [];
  cerrado = new EventEmitter();
  guardado = new EventEmitter();
  formData;
  guardando = false;
  booleanOptions = [
    { field: "obligatorio", label: "Obligatorio" },
    { field: "estado", label: "Activo" },
    { field: "hidden", label: "Oculto" },
    { field: "readonly", label: "Solo lectura" },
    { field: "multivaluado", label: "Multivaluado" },
    { field: "is_ws_sri", label: "Integraci\xF3n SRI" },
    { field: "is_ws_civil", label: "Integraci\xF3n Civil" },
    { field: "is_ws_iess", label: "Integraci\xF3n IESS" },
    { field: "is_dependent", label: "Es dependiente" },
    { field: "is_dependent_catalogo", label: "Dependiente de cat\xE1logo" },
    { field: "is_list_empleado", label: "Lista de empleados" },
    { field: "is_text_area", label: "Es \xE1rea de texto" }
  ];
  tiposDato = [];
  tiposRespuesta = [];
  jornadas = [];
  catalogos = [];
  itemsCatalogo = [];
  cargandoItems = false;
  destroy$ = new Subject();
  constructor(atributoService, cataloService, toastr, zone) {
    this.atributoService = atributoService;
    this.cataloService = cataloService;
    this.toastr = toastr;
    this.zone = zone;
  }
  ngOnInit() {
    this.formData = new AtributoFormularioPayload(this.formulario?.id ?? "", this.atributo ?? void 0);
    this.cargarCatalogos();
    if (this.formData.catalogo_id) {
      this.cargarItemsCatalogo(this.formData.catalogo_id);
    }
  }
  onCatalogoChange() {
    this.formData.item_catalogo_id = "";
    this.itemsCatalogo = [];
    if (this.formData.catalogo_id) {
      this.cargarItemsCatalogo(this.formData.catalogo_id);
    }
  }
  cargarItemsCatalogo(catalogoId) {
    this.cargandoItems = true;
    this.cataloService.getItemsByCatalogoId(catalogoId).pipe(takeUntil(this.destroy$)).subscribe({
      next: ({ data }) => {
        this.zone.run(() => {
          this.itemsCatalogo = data;
          this.cargandoItems = false;
        });
      },
      error: (err) => {
        this.zone.run(() => this.cargandoItems = false);
        this.toastr.showError("No se pudo cargar los items del cat\xE1logo", "Error");
      }
    });
  }
  get atributosDependibles() {
    return this.atributos.filter((a) => a.atributo_formulario_id !== this.atributo?.atributo_formulario_id);
  }
  onTipoRespuestaChange() {
    if (this.formData.ctipo_respuesta_id) {
      this.cargarTiposDato([this.formData.ctipo_respuesta_id]);
    } else {
      this.tiposDato = [];
      this.formData.cttipo_dato_id = 0;
    }
  }
  cargarTiposDato(parentIds) {
    this.cataloService.getChildrenByParentIds(parentIds).pipe(takeUntil(this.destroy$)).subscribe({
      next: ({ data }) => this.tiposDato = data,
      error: (err) => this.toastr.showError("No se pudo cargar los tipos de dato", "Error")
    });
  }
  cargarCatalogos() {
    if (this.formData.ctipo_respuesta_id) {
      this.cargarTiposDato([this.formData.ctipo_respuesta_id]);
    }
    this.cataloService.getItemsByCatalogoId(13).pipe(takeUntil(this.destroy$)).subscribe({
      next: ({ data }) => this.tiposRespuesta = data,
      error: (err) => this.toastr.showError("No se pudo cargar los tipos de respuesta", "Error")
    });
    this.cataloService.getItemsByCatalogoId(26).pipe(takeUntil(this.destroy$)).subscribe({
      next: ({ data }) => this.jornadas = data,
      error: (err) => this.toastr.showError("No se pudo cargar las jornadas", "Error")
    });
    this.cataloService.getCollectionCatalogo().pipe(takeUntil(this.destroy$)).subscribe({
      next: (data) => this.catalogos = data,
      error: (err) => this.toastr.showError("No se pudo cargar los cat\xE1logos", "Error")
    });
  }
  guardar() {
    this.guardando = true;
    const payload = __spreadProps(__spreadValues({}, this.formData), {
      atributo_id: this.formData.atributo_id || null,
      item_catalogo_id: this.formData.item_catalogo_id || null,
      jornada_id: this.formData.jornada_id || null
    });
    const op$ = this.atributo ? this.atributoService.actualizar(this.atributo.atributo_formulario_id, payload) : this.atributoService.crear(payload);
    op$.pipe(takeUntil(this.destroy$)).subscribe({
      next: () => {
        this.zone.run(() => {
          this.guardando = false;
          const msg = this.atributo ? "Atributo actualizado correctamente." : "Atributo creado correctamente.";
          this.toastr.showSuccess(msg, "\xC9xito");
          this.guardado.emit();
        });
      },
      error: (err) => {
        this.zone.run(() => {
          this.guardando = false;
          this.toastr.showError("No se pudo guardar el atributo.", "Error");
        });
      }
    });
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  static \u0275fac = function AtributoFormComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AtributoFormComponent)(\u0275\u0275directiveInject(AtributoFormularioService), \u0275\u0275directiveInject(CatalogoService), \u0275\u0275directiveInject(ToastrAlertService), \u0275\u0275directiveInject(NgZone));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AtributoFormComponent, selectors: [["app-atributo-form"]], inputs: { formulario: "formulario", atributo: "atributo", atributos: "atributos" }, outputs: { cerrado: "cerrado", guardado: "guardado" }, decls: 108, vars: 23, consts: [[1, "fixed", "inset-0", "z-50", "flex", "items-start", "justify-center", "pt-10", "pb-6", "px-4", "bg-black/40", "backdrop-blur-sm", 3, "click"], [1, "bg-white", "rounded-xl", "shadow-2xl", "border", "border-slate-200", "w-full", "max-w-2xl", "max-h-[85vh]", "overflow-y-auto", 3, "click"], [1, "p-5", "border-b", "border-slate-200", "flex", "justify-between", "items-center", "sticky", "top-0", "bg-white", "z-10"], [1, "text-base", "font-bold", "text-[#1e3a8a]", "uppercase", "tracking-wide"], [1, "text-xs", "text-slate-500", "mt-0.5"], [1, "text-slate-400", "hover:text-slate-600", "text-xl", "font-bold", "leading-none", "w-8", "h-8", "flex", "items-center", "justify-center", "rounded", "hover:bg-slate-100", "transition-colors", 3, "click"], [1, "p-5", "space-y-5"], [1, "grid", "grid-cols-1", "gap-4"], [1, "block", "text-[11px]", "font-bold", "text-slate-500", "uppercase", "tracking-wide", "mb-1"], [1, "text-red-500"], ["type", "text", "placeholder", "ej. cedula_identidad", 1, "w-full", "border", "border-slate-300", "rounded-md", "px-3", "py-2", "text-sm", "outline-none", "focus:border-[#1e3a8a]", "transition-colors", "font-mono", 3, "ngModelChange", "ngModel"], ["type", "text", "placeholder", "ej. \xBFCu\xE1l es su n\xFAmero de c\xE9dula?", 1, "w-full", "border", "border-slate-300", "rounded-md", "px-3", "py-2", "text-sm", "outline-none", "focus:border-[#1e3a8a]", "transition-colors", 3, "ngModelChange", "ngModel"], ["type", "text", "placeholder", "Texto de ayuda opcional", 1, "w-full", "border", "border-slate-300", "rounded-md", "px-3", "py-2", "text-sm", "outline-none", "focus:border-[#1e3a8a]", "transition-colors", 3, "ngModelChange", "ngModel"], [1, "grid", "grid-cols-3", "gap-4"], [1, "w-full", "border", "border-slate-300", "rounded-md", "px-3", "py-2", "text-sm", "outline-none", "focus:border-[#1e3a8a]", "transition-colors", "bg-white", 3, "ngModelChange", "ngModel"], ["disabled", "", 3, "ngValue"], [3, "ngValue"], ["type", "number", "min", "1", 1, "w-full", "border", "border-slate-300", "rounded-md", "px-3", "py-2", "text-sm", "outline-none", "focus:border-[#1e3a8a]", "transition-colors", 3, "ngModelChange", "ngModel"], [1, "text-[11px]", "font-bold", "text-slate-400", "uppercase", "tracking-wide", "mb-3"], [1, "grid", "grid-cols-4", "gap-4"], ["type", "number", "min", "0", "placeholder", "\u2014", 1, "w-full", "border", "border-slate-300", "rounded-md", "px-3", "py-2", "text-sm", "outline-none", "focus:border-[#1e3a8a]", "transition-colors", 3, "ngModelChange", "ngModel"], ["type", "number", "placeholder", "\u2014", 1, "w-full", "border", "border-slate-300", "rounded-md", "px-3", "py-2", "text-sm", "outline-none", "focus:border-[#1e3a8a]", "transition-colors", 3, "ngModelChange", "ngModel"], [1, "grid", "grid-cols-2", "gap-4"], [1, "grid", "grid-cols-2", "gap-3"], [1, "flex", "items-center", "gap-3", "cursor-pointer", "p-3", "rounded-lg", "border", "border-slate-200", "hover:bg-slate-50", "transition-colors"], [1, "p-5", "border-t", "border-slate-200", "flex", "justify-end", "gap-3", "sticky", "bottom-0", "bg-white"], [1, "px-5", "py-2.5", "border", "border-slate-300", "text-slate-700", "text-xs", "font-bold", "uppercase", "rounded", "hover:bg-slate-50", "transition-colors", "disabled:opacity-50", 3, "click", "disabled"], [1, "px-5", "py-2.5", "bg-[#1e3a8a]", "text-white", "text-xs", "font-bold", "uppercase", "rounded", "shadow-md", "hover:bg-blue-800", "transition-colors", "disabled:opacity-50", "flex", "items-center", "gap-2", 3, "click", "disabled"], [1, "inline-block", "w-3.5", "h-3.5", "border-2", "border-white/30", "border-t-white", "rounded-full", "animate-spin"], [1, "text-[11px]", "text-slate-400", "italic", "py-2"], [1, "border", "border-slate-200", "rounded-md", "max-h-40", "overflow-y-auto", "divide-y", "divide-slate-100"], [1, "flex", "items-center", "gap-2.5", "px-3", "py-2", "hover:bg-blue-50", "transition-colors"], [1, "w-1.5", "h-1.5", "rounded-full", "bg-[#1e3a8a]", "shrink-0"], [1, "text-xs", "text-slate-700"], ["type", "checkbox", 1, "w-4", "h-4", "rounded", "accent-[#1e3a8a]", 3, "ngModelChange", "ngModel"], [1, "text-sm", "font-medium", "text-slate-700"]], template: function AtributoFormComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0);
      \u0275\u0275listener("click", function AtributoFormComponent_Template_div_click_0_listener() {
        return ctx.cerrado.emit();
      });
      \u0275\u0275elementStart(1, "div", 1);
      \u0275\u0275listener("click", function AtributoFormComponent_Template_div_click_1_listener($event) {
        return $event.stopPropagation();
      });
      \u0275\u0275elementStart(2, "div", 2)(3, "div")(4, "h2", 3);
      \u0275\u0275text(5);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(6, "p", 4);
      \u0275\u0275text(7);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(8, "button", 5);
      \u0275\u0275listener("click", function AtributoFormComponent_Template_button_click_8_listener() {
        return ctx.cerrado.emit();
      });
      \u0275\u0275text(9, " \xD7 ");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(10, "div", 6)(11, "div", 7)(12, "div")(13, "label", 8);
      \u0275\u0275text(14, "Nombre ");
      \u0275\u0275elementStart(15, "span", 9);
      \u0275\u0275text(16, "*");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(17, "input", 10);
      \u0275\u0275twoWayListener("ngModelChange", function AtributoFormComponent_Template_input_ngModelChange_17_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.formData.nombre, $event) || (ctx.formData.nombre = $event);
        return $event;
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(18, "div")(19, "label", 8);
      \u0275\u0275text(20, "Pregunta ");
      \u0275\u0275elementStart(21, "span", 9);
      \u0275\u0275text(22, "*");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(23, "input", 11);
      \u0275\u0275twoWayListener("ngModelChange", function AtributoFormComponent_Template_input_ngModelChange_23_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.formData.pregunta, $event) || (ctx.formData.pregunta = $event);
        return $event;
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(24, "div")(25, "label", 8);
      \u0275\u0275text(26, "Ayuda / Descripci\xF3n");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(27, "input", 12);
      \u0275\u0275twoWayListener("ngModelChange", function AtributoFormComponent_Template_input_ngModelChange_27_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.formData.ayuda, $event) || (ctx.formData.ayuda = $event);
        return $event;
      });
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(28, "div", 13)(29, "div")(30, "label", 8);
      \u0275\u0275text(31, "Tipo Respuesta ");
      \u0275\u0275elementStart(32, "span", 9);
      \u0275\u0275text(33, "*");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(34, "select", 14);
      \u0275\u0275twoWayListener("ngModelChange", function AtributoFormComponent_Template_select_ngModelChange_34_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.formData.ctipo_respuesta_id, $event) || (ctx.formData.ctipo_respuesta_id = $event);
        return $event;
      });
      \u0275\u0275listener("ngModelChange", function AtributoFormComponent_Template_select_ngModelChange_34_listener() {
        return ctx.onTipoRespuestaChange();
      });
      \u0275\u0275elementStart(35, "option", 15);
      \u0275\u0275text(36, "Seleccione...");
      \u0275\u0275elementEnd();
      \u0275\u0275repeaterCreate(37, AtributoFormComponent_For_38_Template, 2, 2, "option", 16, _forTrack0);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(39, "div")(40, "label", 8);
      \u0275\u0275text(41, "Tipo Dato ");
      \u0275\u0275elementStart(42, "span", 9);
      \u0275\u0275text(43, "*");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(44, "select", 14);
      \u0275\u0275twoWayListener("ngModelChange", function AtributoFormComponent_Template_select_ngModelChange_44_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.formData.cttipo_dato_id, $event) || (ctx.formData.cttipo_dato_id = $event);
        return $event;
      });
      \u0275\u0275elementStart(45, "option", 15);
      \u0275\u0275text(46, "Seleccione...");
      \u0275\u0275elementEnd();
      \u0275\u0275repeaterCreate(47, AtributoFormComponent_For_48_Template, 2, 2, "option", 16, _forTrack0);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(49, "div")(50, "label", 8);
      \u0275\u0275text(51, "Orden ");
      \u0275\u0275elementStart(52, "span", 9);
      \u0275\u0275text(53, "*");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(54, "input", 17);
      \u0275\u0275twoWayListener("ngModelChange", function AtributoFormComponent_Template_input_ngModelChange_54_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.formData.orden, $event) || (ctx.formData.orden = $event);
        return $event;
      });
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(55, "div")(56, "p", 18);
      \u0275\u0275text(57, " Par\xE1metros num\xE9ricos ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(58, "div", 19)(59, "div")(60, "label", 8);
      \u0275\u0275text(61, "M\xE1x. caracteres");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(62, "input", 20);
      \u0275\u0275twoWayListener("ngModelChange", function AtributoFormComponent_Template_input_ngModelChange_62_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.formData.num_caracter, $event) || (ctx.formData.num_caracter = $event);
        return $event;
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(63, "div")(64, "label", 8);
      \u0275\u0275text(65, "Rango");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(66, "input", 20);
      \u0275\u0275twoWayListener("ngModelChange", function AtributoFormComponent_Template_input_ngModelChange_66_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.formData.num_rango, $event) || (ctx.formData.num_rango = $event);
        return $event;
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(67, "div")(68, "label", 8);
      \u0275\u0275text(69, "Atr\xE1s");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(70, "input", 21);
      \u0275\u0275twoWayListener("ngModelChange", function AtributoFormComponent_Template_input_ngModelChange_70_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.formData.num_atras, $event) || (ctx.formData.num_atras = $event);
        return $event;
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(71, "div")(72, "label", 8);
      \u0275\u0275text(73, "Adelante");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(74, "input", 21);
      \u0275\u0275twoWayListener("ngModelChange", function AtributoFormComponent_Template_input_ngModelChange_74_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.formData.num_adelante, $event) || (ctx.formData.num_adelante = $event);
        return $event;
      });
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(75, "div")(76, "p", 18);
      \u0275\u0275text(77, " Referencias opcionales ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(78, "div", 22);
      \u0275\u0275conditionalCreate(79, AtributoFormComponent_Conditional_79_Template, 15, 3);
      \u0275\u0275elementStart(80, "div")(81, "label", 8);
      \u0275\u0275text(82, "Jornada");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(83, "select", 14);
      \u0275\u0275twoWayListener("ngModelChange", function AtributoFormComponent_Template_select_ngModelChange_83_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.formData.jornada_id, $event) || (ctx.formData.jornada_id = $event);
        return $event;
      });
      \u0275\u0275elementStart(84, "option", 16);
      \u0275\u0275text(85, "\u2014 Ninguna \u2014");
      \u0275\u0275elementEnd();
      \u0275\u0275repeaterCreate(86, AtributoFormComponent_For_87_Template, 2, 2, "option", 16, _forTrack0);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(88, "div")(89, "label", 8);
      \u0275\u0275text(90, "Depende de");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(91, "select", 14);
      \u0275\u0275twoWayListener("ngModelChange", function AtributoFormComponent_Template_select_ngModelChange_91_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.formData.atributo_id, $event) || (ctx.formData.atributo_id = $event);
        return $event;
      });
      \u0275\u0275elementStart(92, "option", 16);
      \u0275\u0275text(93, "\u2014 Ninguno \u2014");
      \u0275\u0275elementEnd();
      \u0275\u0275repeaterCreate(94, AtributoFormComponent_For_95_Template, 2, 3, "option", 16, _forTrack1);
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(96, "div")(97, "p", 18);
      \u0275\u0275text(98, "Opciones");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(99, "div", 23);
      \u0275\u0275repeaterCreate(100, AtributoFormComponent_For_101_Template, 4, 2, "label", 24, _forTrack2);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(102, "div", 25)(103, "button", 26);
      \u0275\u0275listener("click", function AtributoFormComponent_Template_button_click_103_listener() {
        return ctx.cerrado.emit();
      });
      \u0275\u0275text(104, " Cancelar ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(105, "button", 27);
      \u0275\u0275listener("click", function AtributoFormComponent_Template_button_click_105_listener() {
        return ctx.guardar();
      });
      \u0275\u0275conditionalCreate(106, AtributoFormComponent_Conditional_106_Template, 1, 0, "span", 28);
      \u0275\u0275text(107);
      \u0275\u0275elementEnd()()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(5);
      \u0275\u0275textInterpolate1(" ", ctx.atributo ? "Editar Atributo" : "Nuevo Atributo", " ");
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.formulario.nombre);
      \u0275\u0275advance(10);
      \u0275\u0275twoWayProperty("ngModel", ctx.formData.nombre);
      \u0275\u0275advance(6);
      \u0275\u0275twoWayProperty("ngModel", ctx.formData.pregunta);
      \u0275\u0275advance(4);
      \u0275\u0275twoWayProperty("ngModel", ctx.formData.ayuda);
      \u0275\u0275advance(7);
      \u0275\u0275twoWayProperty("ngModel", ctx.formData.ctipo_respuesta_id);
      \u0275\u0275advance();
      \u0275\u0275property("ngValue", 0);
      \u0275\u0275advance(2);
      \u0275\u0275repeater(ctx.tiposRespuesta);
      \u0275\u0275advance(7);
      \u0275\u0275twoWayProperty("ngModel", ctx.formData.cttipo_dato_id);
      \u0275\u0275advance();
      \u0275\u0275property("ngValue", 0);
      \u0275\u0275advance(2);
      \u0275\u0275repeater(ctx.tiposDato);
      \u0275\u0275advance(7);
      \u0275\u0275twoWayProperty("ngModel", ctx.formData.orden);
      \u0275\u0275advance(8);
      \u0275\u0275twoWayProperty("ngModel", ctx.formData.num_caracter);
      \u0275\u0275advance(4);
      \u0275\u0275twoWayProperty("ngModel", ctx.formData.num_rango);
      \u0275\u0275advance(4);
      \u0275\u0275twoWayProperty("ngModel", ctx.formData.num_atras);
      \u0275\u0275advance(4);
      \u0275\u0275twoWayProperty("ngModel", ctx.formData.num_adelante);
      \u0275\u0275advance(5);
      \u0275\u0275conditional(ctx.formData.ctipo_respuesta_id === 73 ? 79 : -1);
      \u0275\u0275advance(4);
      \u0275\u0275twoWayProperty("ngModel", ctx.formData.jornada_id);
      \u0275\u0275advance();
      \u0275\u0275property("ngValue", "");
      \u0275\u0275advance(2);
      \u0275\u0275repeater(ctx.jornadas);
      \u0275\u0275advance(5);
      \u0275\u0275twoWayProperty("ngModel", ctx.formData.atributo_id);
      \u0275\u0275advance();
      \u0275\u0275property("ngValue", "");
      \u0275\u0275advance(2);
      \u0275\u0275repeater(ctx.atributosDependibles);
      \u0275\u0275advance(6);
      \u0275\u0275repeater(ctx.booleanOptions);
      \u0275\u0275advance(3);
      \u0275\u0275property("disabled", ctx.guardando);
      \u0275\u0275advance(2);
      \u0275\u0275property("disabled", ctx.guardando || !ctx.formData.nombre || !ctx.formData.pregunta);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.guardando ? 106 : -1);
      \u0275\u0275advance();
      \u0275\u0275textInterpolate1(" ", ctx.atributo ? "Actualizar" : "Crear Atributo", " ");
    }
  }, dependencies: [CommonModule, FormsModule, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, NumberValueAccessor, CheckboxControlValueAccessor, SelectControlValueAccessor, NgControlStatus, MinValidator, NgModel], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AtributoFormComponent, [{
    type: Component,
    args: [{ selector: "app-atributo-form", standalone: true, imports: [CommonModule, FormsModule], template: `<div
  class="fixed inset-0 z-50 flex items-start justify-center pt-10 pb-6 px-4 bg-black/40 backdrop-blur-sm"
  (click)="cerrado.emit()"
>
  <div
    class="bg-white rounded-xl shadow-2xl border border-slate-200 w-full max-w-2xl max-h-[85vh] overflow-y-auto"
    (click)="$event.stopPropagation()"
  >
    <!-- Header -->
    <div
      class="p-5 border-b border-slate-200 flex justify-between items-center sticky top-0 bg-white z-10"
    >
      <div>
        <h2 class="text-base font-bold text-[#1e3a8a] uppercase tracking-wide">
          {{ atributo ? 'Editar Atributo' : 'Nuevo Atributo' }}
        </h2>
        <p class="text-xs text-slate-500 mt-0.5">{{ formulario.nombre }}</p>
      </div>
      <button
        (click)="cerrado.emit()"
        class="text-slate-400 hover:text-slate-600 text-xl font-bold leading-none w-8 h-8 flex items-center justify-center rounded hover:bg-slate-100 transition-colors"
      >
        \xD7
      </button>
    </div>

    <!-- Body -->
    <div class="p-5 space-y-5">
      <!-- Campos principales -->
      <div class="grid grid-cols-1 gap-4">
        <div>
          <label class="block text-[11px] font-bold text-slate-500 uppercase tracking-wide mb-1"
            >Nombre <span class="text-red-500">*</span></label
          >
          <input
            type="text"
            [(ngModel)]="formData.nombre"
            placeholder="ej. cedula_identidad"
            class="w-full border border-slate-300 rounded-md px-3 py-2 text-sm outline-none focus:border-[#1e3a8a] transition-colors font-mono"
          />
        </div>
        <div>
          <label class="block text-[11px] font-bold text-slate-500 uppercase tracking-wide mb-1"
            >Pregunta <span class="text-red-500">*</span></label
          >
          <input
            type="text"
            [(ngModel)]="formData.pregunta"
            placeholder="ej. \xBFCu\xE1l es su n\xFAmero de c\xE9dula?"
            class="w-full border border-slate-300 rounded-md px-3 py-2 text-sm outline-none focus:border-[#1e3a8a] transition-colors"
          />
        </div>
        <div>
          <label class="block text-[11px] font-bold text-slate-500 uppercase tracking-wide mb-1"
            >Ayuda / Descripci\xF3n</label
          >
          <input
            type="text"
            [(ngModel)]="formData.ayuda"
            placeholder="Texto de ayuda opcional"
            class="w-full border border-slate-300 rounded-md px-3 py-2 text-sm outline-none focus:border-[#1e3a8a] transition-colors"
          />
        </div>
      </div>

      <!-- Tipos y orden -->
      <div class="grid grid-cols-3 gap-4">
        <div>
          <label class="block text-[11px] font-bold text-slate-500 uppercase tracking-wide mb-1"
            >Tipo Respuesta <span class="text-red-500">*</span></label
          >
          <select
            [(ngModel)]="formData.ctipo_respuesta_id"
            (ngModelChange)="onTipoRespuestaChange()"
            class="w-full border border-slate-300 rounded-md px-3 py-2 text-sm outline-none focus:border-[#1e3a8a] transition-colors bg-white"
          >
            <option [ngValue]="0" disabled>Seleccione...</option>
            @for (t of tiposRespuesta; track t.id) {
              <option [ngValue]="t.id">{{ t.nombre }}</option>
            }
          </select>
        </div>
        <div>
          <label class="block text-[11px] font-bold text-slate-500 uppercase tracking-wide mb-1"
            >Tipo Dato <span class="text-red-500">*</span></label
          >
          <select
            [(ngModel)]="formData.cttipo_dato_id"
            class="w-full border border-slate-300 rounded-md px-3 py-2 text-sm outline-none focus:border-[#1e3a8a] transition-colors bg-white"
          >
            <option [ngValue]="0" disabled>Seleccione...</option>
            @for (t of tiposDato; track t.id) {
              <option [ngValue]="t.id">{{ t.nombre }}</option>
            }
          </select>
        </div>
        <div>
          <label class="block text-[11px] font-bold text-slate-500 uppercase tracking-wide mb-1"
            >Orden <span class="text-red-500">*</span></label
          >
          <input
            type="number"
            [(ngModel)]="formData.orden"
            min="1"
            class="w-full border border-slate-300 rounded-md px-3 py-2 text-sm outline-none focus:border-[#1e3a8a] transition-colors"
          />
        </div>
      </div>

      <!-- Par\xE1metros num\xE9ricos -->
      <div>
        <p class="text-[11px] font-bold text-slate-400 uppercase tracking-wide mb-3">
          Par\xE1metros num\xE9ricos
        </p>
        <div class="grid grid-cols-4 gap-4">
          <div>
            <label class="block text-[11px] font-bold text-slate-500 uppercase tracking-wide mb-1"
              >M\xE1x. caracteres</label
            >
            <input
              type="number"
              [(ngModel)]="formData.num_caracter"
              min="0"
              placeholder="\u2014"
              class="w-full border border-slate-300 rounded-md px-3 py-2 text-sm outline-none focus:border-[#1e3a8a] transition-colors"
            />
          </div>
          <div>
            <label class="block text-[11px] font-bold text-slate-500 uppercase tracking-wide mb-1"
              >Rango</label
            >
            <input
              type="number"
              [(ngModel)]="formData.num_rango"
              min="0"
              placeholder="\u2014"
              class="w-full border border-slate-300 rounded-md px-3 py-2 text-sm outline-none focus:border-[#1e3a8a] transition-colors"
            />
          </div>
          <div>
            <label class="block text-[11px] font-bold text-slate-500 uppercase tracking-wide mb-1"
              >Atr\xE1s</label
            >
            <input
              type="number"
              [(ngModel)]="formData.num_atras"
              placeholder="\u2014"
              class="w-full border border-slate-300 rounded-md px-3 py-2 text-sm outline-none focus:border-[#1e3a8a] transition-colors"
            />
          </div>
          <div>
            <label class="block text-[11px] font-bold text-slate-500 uppercase tracking-wide mb-1"
              >Adelante</label
            >
            <input
              type="number"
              [(ngModel)]="formData.num_adelante"
              placeholder="\u2014"
              class="w-full border border-slate-300 rounded-md px-3 py-2 text-sm outline-none focus:border-[#1e3a8a] transition-colors"
            />
          </div>
        </div>
      </div>

      <!-- Referencias opcionales -->
      <div>
        <p class="text-[11px] font-bold text-slate-400 uppercase tracking-wide mb-3">
          Referencias opcionales
        </p>
        <div class="grid grid-cols-2 gap-4">
          @if (formData.ctipo_respuesta_id === 73) {
            <div>
              <label class="block text-[11px] font-bold text-slate-500 uppercase tracking-wide mb-1"
                >Cat\xE1logo</label
              >
              <select
                [(ngModel)]="formData.catalogo_id"
                (ngModelChange)="onCatalogoChange()"
                class="w-full border border-slate-300 rounded-md px-3 py-2 text-sm outline-none focus:border-[#1e3a8a] transition-colors bg-white"
              >
                <option [ngValue]="null">\u2014 Ninguno \u2014</option>
                @for (c of catalogos; track c.id) {
                  <option [ngValue]="c.id">{{ c.nombre }}</option>
                }
              </select>
            </div>
            <div>
              <label
                class="block text-[11px] font-bold text-slate-500 uppercase tracking-wide mb-1"
              >
                Items del Cat\xE1logo
              </label>
              @if (!formData.catalogo_id || formData.is_dependent) {
                <p class="text-[11px] text-slate-400 italic py-2">
                  Seleccione un cat\xE1logo primero.
                </p>
              } @else if (cargandoItems) {
                <p class="text-[11px] text-slate-400 italic py-2">Cargando items...</p>
              } @else if (itemsCatalogo.length === 0) {
                <p class="text-[11px] text-slate-400 italic py-2">Sin items disponibles.</p>
              } @else {
                <div
                  class="border border-slate-200 rounded-md max-h-40 overflow-y-auto divide-y divide-slate-100"
                >
                  @for (item of itemsCatalogo; track item.id) {
                    <div class="flex items-center gap-2.5 px-3 py-2 hover:bg-blue-50 transition-colors">
                      <span class="w-1.5 h-1.5 rounded-full bg-[#1e3a8a] shrink-0"></span>
                      <span class="text-xs text-slate-700">{{ item.nombre }}</span>
                    </div>
                  }
                </div>
              }
            </div>
          }
          <div>
            <label class="block text-[11px] font-bold text-slate-500 uppercase tracking-wide mb-1"
              >Jornada</label
            >
            <select
              [(ngModel)]="formData.jornada_id"
              class="w-full border border-slate-300 rounded-md px-3 py-2 text-sm outline-none focus:border-[#1e3a8a] transition-colors bg-white"
            >
              <option [ngValue]="''">\u2014 Ninguna \u2014</option>
              @for (j of jornadas; track j.id) {
                <option [ngValue]="j.id.toString()">{{ j.nombre }}</option>
              }
            </select>
          </div>
          <div>
            <label class="block text-[11px] font-bold text-slate-500 uppercase tracking-wide mb-1"
              >Depende de</label
            >
            <select
              [(ngModel)]="formData.atributo_id"
              class="w-full border border-slate-300 rounded-md px-3 py-2 text-sm outline-none focus:border-[#1e3a8a] transition-colors bg-white"
            >
              <option [ngValue]="''">\u2014 Ninguno \u2014</option>
              @for (a of atributosDependibles; track a.atributo_formulario_id) {
                <option [ngValue]="a.atributo_formulario_id">
                  {{ a.atributo_formulario_pregunta }} ({{ a.atributo_formulario_nombre }})
                </option>
              }
            </select>

          </div>
        </div>
      </div>

      <!-- Booleanos -->
      <div>
        <p class="text-[11px] font-bold text-slate-400 uppercase tracking-wide mb-3">Opciones</p>
        <div class="grid grid-cols-2 gap-3">
          @for (opt of booleanOptions; track opt.field) {
            <label class="flex items-center gap-3 cursor-pointer p-3 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors">
              <input type="checkbox" [(ngModel)]="$any(formData)[opt.field]" class="w-4 h-4 rounded accent-[#1e3a8a]" />
              <span class="text-sm font-medium text-slate-700">{{ opt.label }}</span>
            </label>
          }
        </div>
      </div>
    </div>

    <!-- Footer -->
    <div class="p-5 border-t border-slate-200 flex justify-end gap-3 sticky bottom-0 bg-white">
      <button
        (click)="cerrado.emit()"
        [disabled]="guardando"
        class="px-5 py-2.5 border border-slate-300 text-slate-700 text-xs font-bold uppercase rounded hover:bg-slate-50 transition-colors disabled:opacity-50"
      >
        Cancelar
      </button>
      <button
        (click)="guardar()"
        [disabled]="guardando || !formData.nombre || !formData.pregunta"
        class="px-5 py-2.5 bg-[#1e3a8a] text-white text-xs font-bold uppercase rounded shadow-md hover:bg-blue-800 transition-colors disabled:opacity-50 flex items-center gap-2"
      >
        @if (guardando) {
          <span
            class="inline-block w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin"
          ></span>
        }
        {{ atributo ? 'Actualizar' : 'Crear Atributo' }}
      </button>
    </div>
  </div>
</div>
` }]
  }], () => [{ type: AtributoFormularioService }, { type: CatalogoService }, { type: ToastrAlertService }, { type: NgZone }], { formulario: [{
    type: Input
  }], atributo: [{
    type: Input
  }], atributos: [{
    type: Input
  }], cerrado: [{
    type: Output
  }], guardado: [{
    type: Output
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AtributoFormComponent, { className: "AtributoFormComponent", filePath: "src/app/features/formularios/formulario-detalle/atributo-form/atributo-form.ts", lineNumber: 20 });
})();

// src/app/services/admin-formularios/report-formulario.service.ts
var CLIENT_NAME = "reportes";
var GET_COLLECTION_REPORT_FORMULARIO = gql`
  query CollectionReportFormulario {
    collectionReportFormulario {
      count
      data {
        ctformulario_id
        descripcion
        estado
        fecha_actualizacion
        fecha_creacion
        fecha_emision
        id
        nombre
        sigla
        tipo_formulario
        usuario_actualizacion
        usuario_creacion
        version
      }
      meta { ${META_FIELDS} }
    }
  }
`;
var GET_ATRIBUTOS_DEPENDIENTES = gql`
  query CollectionReportAtributoFormularioDependientes($formularioId: String!) {
    collectionReportAtributoFormulario(
      query: { where: { formulario_id: { equals: $formularioId }, is_dependent: { equals: true } } }
    ) {
      count
      data {
        atributo_formulario_id
        atributo_formulario_nombre
        atributo_formulario_pregunta
        formulario_id
        is_dependent
        orden
        ctipo_dato_id
        ctipo_dato_nombre
        ctipo_respuesta_id
        ctipo_respuesta_nombre
        catalogo_id
        item_catalogo_id
        jornada_id
        atributo_id
        num_caracter
        num_rango
        num_atras
        num_adelante
        is_dependent_catalogo
        estado_atributo_formulario
        formulario_nombre
        formulario_sigla
        formulario_version
        atributo_formulario_ayuda
        hidden
        is_ws_civil
        is_ws_iess
        is_ws_sri
        jornada_nombre
        multivaluado
        obligatorio
        readonly
        tipo_formulario
        is_list_empleado
      }
    }
  }
`;
var GET_ATRIBUTOS_BY_FORMULARIO = gql`
  query CollectionReportAtributoFormulario($formularioId: String!, $page: Int, $take: Int) {
    collectionReportAtributoFormulario(
      query: {
        where: { formulario_id: { equals: $formularioId } }
        pagination: { page: $page, take: $take }
      }
    ) {
      count
      data {
        atributo_formulario_id
        atributo_formulario_nombre
        atributo_formulario_pregunta
        atributo_formulario_ayuda
        atributo_id
        catalogo_id
        ctipo_dato_id
        ctipo_dato_nombre
        ctipo_respuesta_id
        ctipo_respuesta_nombre
        estado_atributo_formulario
        formulario_id
        formulario_nombre
        formulario_sigla
        formulario_version
        hidden
        is_dependent
        is_dependent_catalogo
        is_ws_civil
        is_ws_iess
        is_ws_sri
        item_catalogo_id
        jornada_id
        jornada_nombre
        multivaluado
        num_caracter
        obligatorio
        orden
        readonly
        tipo_formulario
        is_list_empleado
      }
      meta { ${META_FIELDS} }
    }
  }
`;
var ReportFormularioService = class _ReportFormularioService {
  apollo;
  constructor(apollo) {
    this.apollo = apollo;
  }
  getAtributosByFormulario(formularioId, page = 1, take = 10) {
    return this.apollo.use(CLIENT_NAME).query({
      query: GET_ATRIBUTOS_BY_FORMULARIO,
      variables: { formularioId, page, take },
      fetchPolicy: "network-only"
    }).pipe(map((result) => {
      const res = result.data?.collectionReportAtributoFormulario;
      const data = [...res?.data ?? []].sort((a, b) => a.orden - b.orden);
      return { data, meta: res?.meta };
    }));
  }
  getAtributosDependientes(formularioId) {
    return this.apollo.use(CLIENT_NAME).query({
      query: GET_ATRIBUTOS_DEPENDIENTES,
      variables: { formularioId },
      fetchPolicy: "network-only"
    }).pipe(map((result) => {
      const data = result.data?.collectionReportAtributoFormulario?.data ?? [];
      return [...data].sort((a, b) => a.orden - b.orden);
    }));
  }
  getFormularios() {
    return this.apollo.use(CLIENT_NAME).query({
      query: GET_COLLECTION_REPORT_FORMULARIO,
      fetchPolicy: "network-only"
    }).pipe(map((result) => {
      const res = result.data?.collectionReportFormulario;
      return {
        data: res?.data ?? [],
        count: res?.count ?? 0,
        meta: res?.meta
      };
    }));
  }
  static \u0275fac = function ReportFormularioService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ReportFormularioService)(\u0275\u0275inject(Apollo));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _ReportFormularioService, factory: _ReportFormularioService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ReportFormularioService, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], () => [{ type: Apollo }], null);
})();

// src/app/features/formularios/formulario-detalle/formulario-detalle.ts
var _forTrack02 = ($index, $item) => $item.atributo_formulario_id;
function FormularioDetalle_Conditional_46_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 20);
    \u0275\u0275text(1, "Activo");
    \u0275\u0275elementEnd();
  }
}
function FormularioDetalle_Conditional_47_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 21);
    \u0275\u0275text(1, "Inactivo");
    \u0275\u0275elementEnd();
  }
}
function FormularioDetalle_Conditional_54_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "app-loading");
  }
}
function FormularioDetalle_Conditional_55_For_37_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 46);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const attr_r2 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(attr_r2.atributo_formulario_ayuda);
  }
}
function FormularioDetalle_Conditional_55_For_37_Conditional_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 49);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const attr_r2 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("m\xE1x. ", attr_r2.num_caracter);
  }
}
function FormularioDetalle_Conditional_55_For_37_Conditional_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 50);
    \u0275\u0275text(1, "S\xED");
    \u0275\u0275elementEnd();
  }
}
function FormularioDetalle_Conditional_55_For_37_Conditional_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 51);
    \u0275\u0275text(1, "No");
    \u0275\u0275elementEnd();
  }
}
function FormularioDetalle_Conditional_55_For_37_Conditional_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 52);
    \u0275\u0275text(1, "S\xED");
    \u0275\u0275elementEnd();
  }
}
function FormularioDetalle_Conditional_55_For_37_Conditional_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 51);
    \u0275\u0275text(1, "No");
    \u0275\u0275elementEnd();
  }
}
function FormularioDetalle_Conditional_55_For_37_Conditional_23_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 53);
    \u0275\u0275text(1, "S\xED");
    \u0275\u0275elementEnd();
  }
}
function FormularioDetalle_Conditional_55_For_37_Conditional_24_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 51);
    \u0275\u0275text(1, "No");
    \u0275\u0275elementEnd();
  }
}
function FormularioDetalle_Conditional_55_For_37_Conditional_27_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 55);
    \u0275\u0275text(1, "SRI");
    \u0275\u0275elementEnd();
  }
}
function FormularioDetalle_Conditional_55_For_37_Conditional_28_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 56);
    \u0275\u0275text(1, "CIVIL");
    \u0275\u0275elementEnd();
  }
}
function FormularioDetalle_Conditional_55_For_37_Conditional_29_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 57);
    \u0275\u0275text(1, "IESS");
    \u0275\u0275elementEnd();
  }
}
function FormularioDetalle_Conditional_55_For_37_Conditional_30_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 58);
    \u0275\u0275text(1, "\u2014");
    \u0275\u0275elementEnd();
  }
}
function FormularioDetalle_Conditional_55_For_37_Conditional_32_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 50);
    \u0275\u0275text(1, "Activo");
    \u0275\u0275elementEnd();
  }
}
function FormularioDetalle_Conditional_55_For_37_Conditional_33_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 59);
    \u0275\u0275text(1, "Inactivo");
    \u0275\u0275elementEnd();
  }
}
function FormularioDetalle_Conditional_55_For_37_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tr", 41)(1, "td", 42);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "td", 43)(4, "p", 44);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "p", 45);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(8, FormularioDetalle_Conditional_55_For_37_Conditional_8_Template, 2, 1, "p", 46);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "td", 43)(10, "span", 47);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(12, "td", 43)(13, "span", 48);
    \u0275\u0275text(14);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(15, FormularioDetalle_Conditional_55_For_37_Conditional_15_Template, 2, 1, "span", 49);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "td", 38);
    \u0275\u0275conditionalCreate(17, FormularioDetalle_Conditional_55_For_37_Conditional_17_Template, 2, 0, "span", 50)(18, FormularioDetalle_Conditional_55_For_37_Conditional_18_Template, 2, 0, "span", 51);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "td", 38);
    \u0275\u0275conditionalCreate(20, FormularioDetalle_Conditional_55_For_37_Conditional_20_Template, 2, 0, "span", 52)(21, FormularioDetalle_Conditional_55_For_37_Conditional_21_Template, 2, 0, "span", 51);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "td", 38);
    \u0275\u0275conditionalCreate(23, FormularioDetalle_Conditional_55_For_37_Conditional_23_Template, 2, 0, "span", 53)(24, FormularioDetalle_Conditional_55_For_37_Conditional_24_Template, 2, 0, "span", 51);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "td", 38)(26, "div", 54);
    \u0275\u0275conditionalCreate(27, FormularioDetalle_Conditional_55_For_37_Conditional_27_Template, 2, 0, "span", 55);
    \u0275\u0275conditionalCreate(28, FormularioDetalle_Conditional_55_For_37_Conditional_28_Template, 2, 0, "span", 56);
    \u0275\u0275conditionalCreate(29, FormularioDetalle_Conditional_55_For_37_Conditional_29_Template, 2, 0, "span", 57);
    \u0275\u0275conditionalCreate(30, FormularioDetalle_Conditional_55_For_37_Conditional_30_Template, 2, 0, "span", 58);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(31, "td", 38);
    \u0275\u0275conditionalCreate(32, FormularioDetalle_Conditional_55_For_37_Conditional_32_Template, 2, 0, "span", 50)(33, FormularioDetalle_Conditional_55_For_37_Conditional_33_Template, 2, 0, "span", 59);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(34, "td", 40)(35, "button", 60);
    \u0275\u0275listener("click", function FormularioDetalle_Conditional_55_For_37_Template_button_click_35_listener() {
      const attr_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.abrirFormEditar(attr_r2));
    });
    \u0275\u0275text(36, " Editar ");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const attr_r2 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(attr_r2.orden);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(attr_r2.atributo_formulario_pregunta);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(attr_r2.atributo_formulario_nombre);
    \u0275\u0275advance();
    \u0275\u0275conditional(attr_r2.atributo_formulario_ayuda ? 8 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r2.shortTipoRespuesta(attr_r2.ctipo_respuesta_nombre), " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r2.shortTipoRespuesta(attr_r2.ctipo_dato_nombre), " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(attr_r2.num_caracter ? 15 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(attr_r2.obligatorio ? 17 : 18);
    \u0275\u0275advance(3);
    \u0275\u0275conditional(attr_r2.hidden === "true" ? 20 : 21);
    \u0275\u0275advance(3);
    \u0275\u0275conditional(attr_r2.readonly === "true" ? 23 : 24);
    \u0275\u0275advance(4);
    \u0275\u0275conditional(attr_r2.is_ws_sri ? 27 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(attr_r2.is_ws_civil ? 28 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(attr_r2.is_ws_iess ? 29 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(!attr_r2.is_ws_sri && !attr_r2.is_ws_civil && !attr_r2.is_ws_iess ? 30 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(attr_r2.estado_atributo_formulario ? 32 : 33);
  }
}
function FormularioDetalle_Conditional_55_ForEmpty_38_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td", 61);
    \u0275\u0275text(2, " No hay atributos registrados para este formulario. ");
    \u0275\u0275elementEnd()();
  }
}
function FormularioDetalle_Conditional_55_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 26)(1, "table", 29)(2, "colgroup");
    \u0275\u0275element(3, "col", 30)(4, "col")(5, "col", 31)(6, "col", 32)(7, "col", 33)(8, "col", 34)(9, "col", 33)(10, "col", 35)(11, "col", 36)(12, "col", 36);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "thead")(14, "tr", 37)(15, "th", 38);
    \u0275\u0275text(16, "#");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "th", 39);
    \u0275\u0275text(18, "Pregunta / Campo");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "th", 39);
    \u0275\u0275text(20, "Tipo Respuesta");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "th", 39);
    \u0275\u0275text(22, "Tipo Dato");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(23, "th", 38);
    \u0275\u0275text(24, "Obligatorio");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "th", 38);
    \u0275\u0275text(26, "Oculto");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(27, "th", 38);
    \u0275\u0275text(28, "Solo Lectura");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(29, "th", 38);
    \u0275\u0275text(30, "Integraciones");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(31, "th", 38);
    \u0275\u0275text(32, "Estado");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(33, "th", 40);
    \u0275\u0275text(34, "Acciones");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(35, "tbody");
    \u0275\u0275repeaterCreate(36, FormularioDetalle_Conditional_55_For_37_Template, 37, 15, "tr", 41, _forTrack02, false, FormularioDetalle_Conditional_55_ForEmpty_38_Template, 3, 0, "tr");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(36);
    \u0275\u0275repeater(ctx_r2.atributos);
  }
}
function FormularioDetalle_Conditional_57_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "app-atributo-form", 62);
    \u0275\u0275listener("cerrado", function FormularioDetalle_Conditional_57_Template_app_atributo_form_cerrado_0_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.cerrarFormulario());
    })("guardado", function FormularioDetalle_Conditional_57_Template_app_atributo_form_guardado_0_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.onGuardado());
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275property("formulario", ctx_r2.formulario)("atributo", ctx_r2.atributoEditando)("atributos", ctx_r2.atributos);
  }
}
var FormularioDetalle = class _FormularioDetalle {
  service;
  toastr;
  zone;
  formulario;
  regresar = new EventEmitter();
  atributos = [];
  meta = null;
  loading = false;
  currentPage = 1;
  PAGE_SIZE = 10;
  mostrarFormulario = false;
  atributoEditando = null;
  destroy$ = new Subject();
  constructor(service, toastr, zone) {
    this.service = service;
    this.toastr = toastr;
    this.zone = zone;
  }
  ngOnChanges() {
    if (this.formulario)
      this.cargarPagina(1);
  }
  cargarPagina(page) {
    this.loading = true;
    this.currentPage = page;
    this.atributos = [];
    this.service.getAtributosByFormulario(this.formulario.id, page, this.PAGE_SIZE).pipe(takeUntil(this.destroy$)).subscribe({
      next: ({ data, meta }) => {
        this.zone.run(() => {
          this.atributos = data;
          this.meta = meta;
          this.loading = false;
        });
      },
      error: (err) => {
        this.zone.run(() => this.loading = false);
        this.toastr.showError("No se pudo cargar los atributos del formulario", "Error");
      }
    });
  }
  abrirFormNuevo() {
    this.atributoEditando = null;
    this.mostrarFormulario = true;
  }
  abrirFormEditar(attr) {
    this.atributoEditando = attr;
    this.mostrarFormulario = true;
  }
  cerrarFormulario() {
    this.mostrarFormulario = false;
    this.atributoEditando = null;
  }
  shortTipoRespuesta(nombre) {
    return nombre?.split(" ").pop() ?? nombre ?? "";
  }
  onGuardado() {
    this.cerrarFormulario();
    this.cargarPagina(this.currentPage);
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  static \u0275fac = function FormularioDetalle_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _FormularioDetalle)(\u0275\u0275directiveInject(ReportFormularioService), \u0275\u0275directiveInject(ToastrAlertService), \u0275\u0275directiveInject(NgZone));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _FormularioDetalle, selectors: [["app-formulario-detalle"]], inputs: { formulario: "formulario" }, outputs: { regresar: "regresar" }, features: [\u0275\u0275NgOnChangesFeature], decls: 58, vars: 17, consts: [[1, "bg-white", "p-8", "rounded", "shadow-sm", "border", "border-slate-200", "min-h-[70vh]", "animate-in", "fade-in"], [1, "flex", "justify-between", "items-start", "mb-6"], [1, "text-sm", "font-medium", "text-slate-500", "mb-1"], [1, "text-[#1e3a8a]", "hover:underline", "font-medium", 3, "click"], [1, "font-bold", "text-[#1e3a8a]"], [1, "text-2xl", "font-bold", "text-[#1e3a8a]"], [1, "flex", "items-center", "gap-3", "mt-1.5"], [1, "bg-blue-50", "text-blue-800", "border", "border-blue-200", "px-2.5", "py-1", "rounded-full", "text-[10px]", "font-bold", "uppercase"], [1, "font-mono", "text-xs", "text-slate-500"], [1, "bg-slate-100", "text-slate-600", "font-bold", "text-xs", "px-2", "py-0.5", "rounded"], [1, "flex", "gap-2"], [1, "bg-[#1e3a8a]", "text-white", "px-5", "py-2.5", "rounded", "text-xs", "font-bold", "uppercase", "shadow-md", "hover:bg-blue-800", "transition-colors", "flex", "items-center", "gap-2", 3, "click"], [1, "text-base", "leading-none"], [1, "bg-white", "border", "border-slate-300", "text-slate-700", "px-5", "py-2.5", "rounded", "text-xs", "font-bold", "uppercase", "hover:bg-slate-50", "transition-colors", 3, "click"], [1, "grid", "grid-cols-2", "md:grid-cols-4", "gap-4", "mb-6"], [1, "bg-white", "rounded-lg", "border", "border-slate-200", "p-4"], [1, "text-[10px]", "font-bold", "text-slate-500", "uppercase", "tracking-wide", "mb-1"], [1, "font-mono", "text-xs", "text-slate-700", "break-all"], [1, "font-bold", "text-slate-800", "text-sm"], [1, "font-bold", "text-[#1e3a8a]", "text-2xl"], [1, "px-3", "py-1", "border", "border-green-400", "text-green-700", "font-bold", "text-xs", "rounded", "bg-green-50"], [1, "px-3", "py-1", "border", "border-slate-300", "text-slate-500", "font-bold", "text-xs", "rounded", "bg-slate-50"], [1, "border", "border-slate-200", "rounded"], [1, "px-4", "py-3", "border-b", "border-slate-200", "flex", "justify-between", "items-center", "bg-slate-50"], [1, "text-sm", "font-bold", "text-slate-700", "uppercase", "tracking-wide"], [1, "text-xs", "font-bold", "text-slate-500", "uppercase"], [1, "overflow-x-auto"], ["itemLabel", "atributos", 3, "pageChange", "meta", "currentPage", "itemsShown"], [3, "formulario", "atributo", "atributos"], [1, "w-full", "text-sm", "border-collapse", "table-fixed"], [1, "w-[50px]"], [1, "w-[130px]"], [1, "w-[120px]"], [1, "w-[90px]"], [1, "w-[70px]"], [1, "w-[110px]"], [1, "w-[80px]"], [1, "bg-slate-50", "text-[10px]", "font-bold", "text-slate-500", "uppercase", "border-b", "border-slate-200", "tracking-wider"], [1, "px-3", "py-2.5", "border-r", "border-slate-100", "text-center"], [1, "px-3", "py-2.5", "border-r", "border-slate-100", "text-left"], [1, "px-2", "py-2.5", "text-center"], [1, "border-b", "border-slate-200", "hover:bg-slate-50", "transition-colors"], [1, "px-3", "py-2.5", "border-r", "border-slate-100", "text-center", "font-mono", "text-xs", "text-slate-400"], [1, "px-3", "py-2.5", "border-r", "border-slate-100"], [1, "font-bold", "text-slate-800", "truncate"], [1, "text-[10px]", "font-mono", "text-slate-400", "mt-0.5", "truncate"], [1, "text-[10px]", "text-slate-500", "italic", "mt-0.5", "truncate"], [1, "inline-block", "bg-purple-50", "text-purple-700", "border", "border-purple-200", "px-2", "py-0.5", "rounded", "text-[10px]", "font-bold", "whitespace-nowrap"], [1, "inline-block", "bg-slate-100", "text-slate-600", "px-2", "py-0.5", "rounded", "text-[10px]", "font-bold", "whitespace-nowrap"], [1, "text-[10px]", "text-slate-400", "ml-1", "whitespace-nowrap"], [1, "inline-block", "px-2", "py-0.5", "border", "border-green-400", "text-green-700", "font-bold", "text-[10px]", "rounded", "bg-green-50", "whitespace-nowrap"], [1, "text-slate-400", "text-xs"], [1, "inline-block", "px-2", "py-0.5", "border", "border-amber-400", "text-amber-700", "font-bold", "text-[10px]", "rounded", "bg-amber-50", "whitespace-nowrap"], [1, "inline-block", "px-2", "py-0.5", "border", "border-blue-300", "text-blue-700", "font-bold", "text-[10px]", "rounded", "bg-blue-50", "whitespace-nowrap"], [1, "flex", "items-center", "justify-center", "gap-1"], [1, "bg-orange-50", "text-orange-700", "border", "border-orange-300", "px-1.5", "py-0.5", "rounded", "text-[9px]", "font-bold"], [1, "bg-blue-50", "text-blue-700", "border", "border-blue-300", "px-1.5", "py-0.5", "rounded", "text-[9px]", "font-bold"], [1, "bg-green-50", "text-green-700", "border", "border-green-300", "px-1.5", "py-0.5", "rounded", "text-[9px]", "font-bold"], [1, "text-slate-300", "text-xs"], [1, "inline-block", "px-2", "py-0.5", "border", "border-slate-300", "text-slate-400", "font-bold", "text-[10px]", "rounded", "bg-slate-50", "whitespace-nowrap"], [1, "text-[#1e3a8a]", "hover:text-white", "font-bold", "text-[11px]", "uppercase", "px-3", "py-1.5", "border", "border-[#1e3a8a]", "hover:bg-[#1e3a8a]", "rounded", "transition-all", 3, "click"], ["colspan", "10", 1, "p-10", "text-slate-400", "italic", "text-center"], [3, "cerrado", "guardado", "formulario", "atributo", "atributos"]], template: function FormularioDetalle_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div")(3, "p", 2);
      \u0275\u0275text(4, " Sistema LIMS / ");
      \u0275\u0275elementStart(5, "button", 3);
      \u0275\u0275listener("click", function FormularioDetalle_Template_button_click_5_listener() {
        return ctx.regresar.emit();
      });
      \u0275\u0275text(6, "Administraci\xF3n de Formularios");
      \u0275\u0275elementEnd();
      \u0275\u0275text(7, " / ");
      \u0275\u0275elementStart(8, "span", 4);
      \u0275\u0275text(9, "Detalle");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(10, "h1", 5);
      \u0275\u0275text(11);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(12, "div", 6)(13, "span", 7);
      \u0275\u0275text(14);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(15, "span", 8);
      \u0275\u0275text(16);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(17, "span", 9);
      \u0275\u0275text(18);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(19, "div", 10)(20, "button", 11);
      \u0275\u0275listener("click", function FormularioDetalle_Template_button_click_20_listener() {
        return ctx.abrirFormNuevo();
      });
      \u0275\u0275elementStart(21, "span", 12);
      \u0275\u0275text(22, "+");
      \u0275\u0275elementEnd();
      \u0275\u0275text(23, " Nuevo Atributo ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(24, "button", 13);
      \u0275\u0275listener("click", function FormularioDetalle_Template_button_click_24_listener() {
        return ctx.regresar.emit();
      });
      \u0275\u0275text(25, " \u2190 Regresar ");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(26, "div", 14)(27, "div", 15)(28, "p", 16);
      \u0275\u0275text(29, "ID Formulario");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(30, "p", 17);
      \u0275\u0275text(31);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(32, "div", 15)(33, "p", 16);
      \u0275\u0275text(34, "Fecha Creaci\xF3n");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(35, "p", 18);
      \u0275\u0275text(36);
      \u0275\u0275pipe(37, "date");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(38, "div", 15)(39, "p", 16);
      \u0275\u0275text(40, "Total Atributos");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(41, "p", 19);
      \u0275\u0275text(42);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(43, "div", 15)(44, "p", 16);
      \u0275\u0275text(45, "Estado");
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(46, FormularioDetalle_Conditional_46_Template, 2, 0, "span", 20)(47, FormularioDetalle_Conditional_47_Template, 2, 0, "span", 21);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(48, "div", 22)(49, "div", 23)(50, "h2", 24);
      \u0275\u0275text(51, "Atributos del Formulario");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(52, "span", 25);
      \u0275\u0275text(53);
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(54, FormularioDetalle_Conditional_54_Template, 1, 0, "app-loading")(55, FormularioDetalle_Conditional_55_Template, 39, 1, "div", 26);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(56, "app-pagination", 27);
      \u0275\u0275listener("pageChange", function FormularioDetalle_Template_app_pagination_pageChange_56_listener($event) {
        return ctx.cargarPagina($event);
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(57, FormularioDetalle_Conditional_57_Template, 1, 3, "app-atributo-form", 28);
    }
    if (rf & 2) {
      \u0275\u0275advance(11);
      \u0275\u0275textInterpolate(ctx.formulario.nombre);
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate1(" ", ctx.formulario.tipo_formulario, " ");
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.formulario.sigla);
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate1("v", ctx.formulario.version);
      \u0275\u0275advance(13);
      \u0275\u0275textInterpolate(ctx.formulario.id);
      \u0275\u0275advance(5);
      \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(37, 14, ctx.formulario.fecha_creacion, "dd/MM/yyyy"));
      \u0275\u0275advance(6);
      \u0275\u0275textInterpolate(ctx.atributos.length);
      \u0275\u0275advance(4);
      \u0275\u0275conditional(ctx.formulario.estado ? 46 : 47);
      \u0275\u0275advance(7);
      \u0275\u0275textInterpolate1("", (ctx.meta == null ? null : ctx.meta.total) ?? ctx.atributos.length, " atributos");
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.loading ? 54 : 55);
      \u0275\u0275advance(2);
      \u0275\u0275property("meta", ctx.meta)("currentPage", ctx.currentPage)("itemsShown", ctx.atributos.length);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.mostrarFormulario ? 57 : -1);
    }
  }, dependencies: [CommonModule, AtributoFormComponent, PaginationComponent, LoadingComponent, DatePipe], styles: ["\n\n.animate-in[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_fadeIn 0.25s ease-out forwards;\n}\n.fade-in[_ngcontent-%COMP%] {\n  opacity: 0;\n}\n@keyframes _ngcontent-%COMP%_fadeIn {\n  to {\n    opacity: 1;\n  }\n}\n/*# sourceMappingURL=formulario-detalle.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FormularioDetalle, [{
    type: Component,
    args: [{ selector: "app-formulario-detalle", standalone: true, imports: [CommonModule, AtributoFormComponent, PaginationComponent, LoadingComponent], template: `<div class="bg-white p-8 rounded shadow-sm border border-slate-200 min-h-[70vh] animate-in fade-in">

  <!-- Cabecera -->
  <div class="flex justify-between items-start mb-6">
    <div>
      <p class="text-sm font-medium text-slate-500 mb-1">
        Sistema LIMS /
        <button (click)="regresar.emit()" class="text-[#1e3a8a] hover:underline font-medium">Administraci\xF3n de Formularios</button>
        / <span class="font-bold text-[#1e3a8a]">Detalle</span>
      </p>
      <h1 class="text-2xl font-bold text-[#1e3a8a]">{{ formulario.nombre }}</h1>
      <div class="flex items-center gap-3 mt-1.5">
        <span class="bg-blue-50 text-blue-800 border border-blue-200 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase">
          {{ formulario.tipo_formulario }}
        </span>
        <span class="font-mono text-xs text-slate-500">{{ formulario.sigla }}</span>
        <span class="bg-slate-100 text-slate-600 font-bold text-xs px-2 py-0.5 rounded">v{{ formulario.version }}</span>
      </div>
    </div>
    <div class="flex gap-2">
      <button (click)="abrirFormNuevo()"
              class="bg-[#1e3a8a] text-white px-5 py-2.5 rounded text-xs font-bold uppercase shadow-md hover:bg-blue-800 transition-colors flex items-center gap-2">
        <span class="text-base leading-none">+</span> Nuevo Atributo
      </button>
      <button (click)="regresar.emit()"
              class="bg-white border border-slate-300 text-slate-700 px-5 py-2.5 rounded text-xs font-bold uppercase hover:bg-slate-50 transition-colors">
        \u2190 Regresar
      </button>
    </div>
  </div>

  <!-- Cards de resumen -->
  <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
    <div class="bg-white rounded-lg border border-slate-200 p-4">
      <p class="text-[10px] font-bold text-slate-500 uppercase tracking-wide mb-1">ID Formulario</p>
      <p class="font-mono text-xs text-slate-700 break-all">{{ formulario.id }}</p>
    </div>
    <div class="bg-white rounded-lg border border-slate-200 p-4">
      <p class="text-[10px] font-bold text-slate-500 uppercase tracking-wide mb-1">Fecha Creaci\xF3n</p>
      <p class="font-bold text-slate-800 text-sm">{{ formulario.fecha_creacion | date:'dd/MM/yyyy' }}</p>
    </div>
    <div class="bg-white rounded-lg border border-slate-200 p-4">
      <p class="text-[10px] font-bold text-slate-500 uppercase tracking-wide mb-1">Total Atributos</p>
      <p class="font-bold text-[#1e3a8a] text-2xl">{{ atributos.length }}</p>
    </div>
    <div class="bg-white rounded-lg border border-slate-200 p-4">
      <p class="text-[10px] font-bold text-slate-500 uppercase tracking-wide mb-1">Estado</p>
      @if (formulario.estado) {
        <span class="px-3 py-1 border border-green-400 text-green-700 font-bold text-xs rounded bg-green-50">Activo</span>
      } @else {
        <span class="px-3 py-1 border border-slate-300 text-slate-500 font-bold text-xs rounded bg-slate-50">Inactivo</span>
      }
    </div>
  </div>

  <!-- Tabla de atributos -->
  <div class="border border-slate-200 rounded">
    <div class="px-4 py-3 border-b border-slate-200 flex justify-between items-center bg-slate-50">
      <h2 class="text-sm font-bold text-slate-700 uppercase tracking-wide">Atributos del Formulario</h2>
      <span class="text-xs font-bold text-slate-500 uppercase">{{ meta?.total ?? atributos.length }} atributos</span>
    </div>

    @if (loading) {
      <app-loading />
    } @else {
      <div class="overflow-x-auto">
        <table class="w-full text-sm border-collapse table-fixed">
          <colgroup>
            <col class="w-[50px]">
            <col>
            <col class="w-[130px]">
            <col class="w-[120px]">
            <col class="w-[90px]">
            <col class="w-[70px]">
            <col class="w-[90px]">
            <col class="w-[110px]">
            <col class="w-[80px]">
            <col class="w-[80px]">
          </colgroup>
          <thead>
            <tr class="bg-slate-50 text-[10px] font-bold text-slate-500 uppercase border-b border-slate-200 tracking-wider">
              <th class="px-3 py-2.5 border-r border-slate-100 text-center">#</th>
              <th class="px-3 py-2.5 border-r border-slate-100 text-left">Pregunta / Campo</th>
              <th class="px-3 py-2.5 border-r border-slate-100 text-left">Tipo Respuesta</th>
              <th class="px-3 py-2.5 border-r border-slate-100 text-left">Tipo Dato</th>
              <th class="px-3 py-2.5 border-r border-slate-100 text-center">Obligatorio</th>
              <th class="px-3 py-2.5 border-r border-slate-100 text-center">Oculto</th>
              <th class="px-3 py-2.5 border-r border-slate-100 text-center">Solo Lectura</th>
              <th class="px-3 py-2.5 border-r border-slate-100 text-center">Integraciones</th>
              <th class="px-3 py-2.5 border-r border-slate-100 text-center">Estado</th>
              <th class="px-2 py-2.5 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            @for (attr of atributos; track attr.atributo_formulario_id) {
              <tr class="border-b border-slate-200 hover:bg-slate-50 transition-colors">
                <td class="px-3 py-2.5 border-r border-slate-100 text-center font-mono text-xs text-slate-400">{{ attr.orden }}</td>
                <td class="px-3 py-2.5 border-r border-slate-100">
                  <p class="font-bold text-slate-800 truncate">{{ attr.atributo_formulario_pregunta }}</p>
                  <p class="text-[10px] font-mono text-slate-400 mt-0.5 truncate">{{ attr.atributo_formulario_nombre }}</p>
                  @if (attr.atributo_formulario_ayuda) {
                    <p class="text-[10px] text-slate-500 italic mt-0.5 truncate">{{ attr.atributo_formulario_ayuda }}</p>
                  }
                </td>
                <td class="px-3 py-2.5 border-r border-slate-100">
                  <span class="inline-block bg-purple-50 text-purple-700 border border-purple-200 px-2 py-0.5 rounded text-[10px] font-bold whitespace-nowrap">
                    {{ shortTipoRespuesta(attr.ctipo_respuesta_nombre) }}
                  </span>
                </td>
                <td class="px-3 py-2.5 border-r border-slate-100">
                  <span class="inline-block bg-slate-100 text-slate-600 px-2 py-0.5 rounded text-[10px] font-bold whitespace-nowrap">
                    {{ shortTipoRespuesta(attr.ctipo_dato_nombre) }}
                  </span>
                  @if (attr.num_caracter) {
                    <span class="text-[10px] text-slate-400 ml-1 whitespace-nowrap">m\xE1x. {{ attr.num_caracter }}</span>
                  }
                </td>
                <td class="px-3 py-2.5 border-r border-slate-100 text-center">
                  @if (attr.obligatorio) {
                    <span class="inline-block px-2 py-0.5 border border-green-400 text-green-700 font-bold text-[10px] rounded bg-green-50 whitespace-nowrap">S\xED</span>
                  } @else {
                    <span class="text-slate-400 text-xs">No</span>
                  }
                </td>
                <td class="px-3 py-2.5 border-r border-slate-100 text-center">
                  @if (attr.hidden === 'true') {
                    <span class="inline-block px-2 py-0.5 border border-amber-400 text-amber-700 font-bold text-[10px] rounded bg-amber-50 whitespace-nowrap">S\xED</span>
                  } @else {
                    <span class="text-slate-400 text-xs">No</span>
                  }
                </td>
                <td class="px-3 py-2.5 border-r border-slate-100 text-center">
                  @if (attr.readonly === 'true') {
                    <span class="inline-block px-2 py-0.5 border border-blue-300 text-blue-700 font-bold text-[10px] rounded bg-blue-50 whitespace-nowrap">S\xED</span>
                  } @else {
                    <span class="text-slate-400 text-xs">No</span>
                  }
                </td>
                <td class="px-3 py-2.5 border-r border-slate-100 text-center">
                  <div class="flex items-center justify-center gap-1">
                    @if (attr.is_ws_sri) {
                      <span class="bg-orange-50 text-orange-700 border border-orange-300 px-1.5 py-0.5 rounded text-[9px] font-bold">SRI</span>
                    }
                    @if (attr.is_ws_civil) {
                      <span class="bg-blue-50 text-blue-700 border border-blue-300 px-1.5 py-0.5 rounded text-[9px] font-bold">CIVIL</span>
                    }
                    @if (attr.is_ws_iess) {
                      <span class="bg-green-50 text-green-700 border border-green-300 px-1.5 py-0.5 rounded text-[9px] font-bold">IESS</span>
                    }
                    @if (!attr.is_ws_sri && !attr.is_ws_civil && !attr.is_ws_iess) {
                      <span class="text-slate-300 text-xs">\u2014</span>
                    }
                  </div>
                </td>
                <td class="px-3 py-2.5 border-r border-slate-100 text-center">
                  @if (attr.estado_atributo_formulario) {
                    <span class="inline-block px-2 py-0.5 border border-green-400 text-green-700 font-bold text-[10px] rounded bg-green-50 whitespace-nowrap">Activo</span>
                  } @else {
                    <span class="inline-block px-2 py-0.5 border border-slate-300 text-slate-400 font-bold text-[10px] rounded bg-slate-50 whitespace-nowrap">Inactivo</span>
                  }
                </td>
                <td class="px-2 py-2.5 text-center">
                  <button (click)="abrirFormEditar(attr)"
                          class="text-[#1e3a8a] hover:text-white font-bold text-[11px] uppercase px-3 py-1.5 border border-[#1e3a8a] hover:bg-[#1e3a8a] rounded transition-all">
                    Editar
                  </button>
                </td>
              </tr>
            } @empty {
              <tr>
                <td colspan="10" class="p-10 text-slate-400 italic text-center">
                  No hay atributos registrados para este formulario.
                </td>
              </tr>
            }
          </tbody>
        </table>
      </div>
    }
  </div>

  <!-- Paginado -->
  <app-pagination
    [meta]="meta"
    [currentPage]="currentPage"
    [itemsShown]="atributos.length"
    itemLabel="atributos"
    (pageChange)="cargarPagina($event)">
  </app-pagination>

</div>

@if (mostrarFormulario) {
  <app-atributo-form
    [formulario]="formulario"
    [atributo]="atributoEditando"
    [atributos]="atributos"
    (cerrado)="cerrarFormulario()"
    (guardado)="onGuardado()">
  </app-atributo-form>
}

<style>
  .animate-in { animation: fadeIn 0.25s ease-out forwards; }
  .fade-in { opacity: 0; }
  @keyframes fadeIn { to { opacity: 1; } }
</style>
` }]
  }], () => [{ type: ReportFormularioService }, { type: ToastrAlertService }, { type: NgZone }], { formulario: [{
    type: Input
  }], regresar: [{
    type: Output
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(FormularioDetalle, { className: "FormularioDetalle", filePath: "src/app/features/formularios/formulario-detalle/formulario-detalle.ts", lineNumber: 20 });
})();

// src/app/features/formularios/admin-formularios/services/admin-formulario-service.ts
var AdminFormularioService = class _AdminFormularioService {
  http;
  base = `${environment.api_formulario}/formulario`;
  constructor(http) {
    this.http = http;
  }
  crear(payload) {
    return this.http.post(this.base, payload);
  }
  actualizar(id, payload) {
    return this.http.put(`${this.base}/${id}`, payload);
  }
  static \u0275fac = function AdminFormularioService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AdminFormularioService)(\u0275\u0275inject(HttpClient));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _AdminFormularioService, factory: _AdminFormularioService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AdminFormularioService, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], () => [{ type: HttpClient }], null);
})();

// src/app/features/formularios/admin-formularios/admin-formularios.ts
var _c0 = () => [1, 2, 3, 4, 5, 6, 7, 8];
var _forTrack03 = ($index, $item) => $item.id;
function AdminFormularios_Conditional_2_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 9)(1, "div", 20)(2, "input", 21);
    \u0275\u0275twoWayListener("ngModelChange", function AdminFormularios_Conditional_2_Conditional_7_Template_input_ngModelChange_2_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r1.busqueda, $event) || (ctx_r1.busqueda = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("ngModelChange", function AdminFormularios_Conditional_2_Conditional_7_Template_input_ngModelChange_2_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.filtrar());
    });
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(3, "svg", 22);
    \u0275\u0275element(4, "path", 23);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(5, "span", 24);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.busqueda);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate2(" ", ctx_r1.formulariosFiltrados.length, " de ", ctx_r1.formularios.length, " formularios ");
  }
}
function AdminFormularios_Conditional_2_Conditional_35_For_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr", 25)(1, "td", 26);
    \u0275\u0275element(2, "div", 27)(3, "div", 28);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "td", 26);
    \u0275\u0275element(5, "div", 29);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "td", 26);
    \u0275\u0275element(7, "div", 30);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "td", 26);
    \u0275\u0275element(9, "div", 31);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "td", 26);
    \u0275\u0275element(11, "div", 32);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "td", 26);
    \u0275\u0275element(13, "div", 33);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "td", 34);
    \u0275\u0275element(15, "div", 35);
    \u0275\u0275elementEnd()();
  }
}
function AdminFormularios_Conditional_2_Conditional_35_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275repeaterCreate(0, AdminFormularios_Conditional_2_Conditional_35_For_1_Template, 16, 0, "tr", 25, \u0275\u0275repeaterTrackByIndex);
  }
  if (rf & 2) {
    \u0275\u0275repeater(\u0275\u0275pureFunction0(0, _c0));
  }
}
function AdminFormularios_Conditional_2_Conditional_36_For_1_Conditional_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 44);
    \u0275\u0275text(1, "Activo");
    \u0275\u0275elementEnd();
  }
}
function AdminFormularios_Conditional_2_Conditional_36_For_1_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 45);
    \u0275\u0275text(1, "Inactivo");
    \u0275\u0275elementEnd();
  }
}
function AdminFormularios_Conditional_2_Conditional_36_For_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tr", 37);
    \u0275\u0275listener("click", function AdminFormularios_Conditional_2_Conditional_36_For_1_Template_tr_click_0_listener() {
      const form_r5 = \u0275\u0275restoreView(_r4).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.abrirDetalle(form_r5));
    });
    \u0275\u0275elementStart(1, "td", 38)(2, "p", 39);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "p", 40);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "td", 38)(7, "span", 41);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "td", 42);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "td", 18)(12, "span", 43);
    \u0275\u0275text(13);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(14, "td", 18);
    \u0275\u0275conditionalCreate(15, AdminFormularios_Conditional_2_Conditional_36_For_1_Conditional_15_Template, 2, 0, "span", 44)(16, AdminFormularios_Conditional_2_Conditional_36_For_1_Conditional_16_Template, 2, 0, "span", 45);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "td", 46);
    \u0275\u0275text(18);
    \u0275\u0275pipe(19, "date");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "td", 47);
    \u0275\u0275listener("click", function AdminFormularios_Conditional_2_Conditional_36_For_1_Template_td_click_20_listener($event) {
      \u0275\u0275restoreView(_r4);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275elementStart(21, "button", 48);
    \u0275\u0275listener("click", function AdminFormularios_Conditional_2_Conditional_36_For_1_Template_button_click_21_listener() {
      const form_r5 = \u0275\u0275restoreView(_r4).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.abrirDetalle(form_r5));
    });
    \u0275\u0275text(22, " Configurar ");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const form_r5 = ctx.$implicit;
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(form_r5.nombre);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(form_r5.id);
    \u0275\u0275advance(2);
    \u0275\u0275property("title", form_r5.tipo_formulario);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", form_r5.tipo_formulario, " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", form_r5.sigla, " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("v", form_r5.version);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(form_r5.estado ? 15 : 16);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(19, 8, form_r5.fecha_creacion, "dd/MM/yyyy"), " ");
  }
}
function AdminFormularios_Conditional_2_Conditional_36_ForEmpty_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td", 49);
    \u0275\u0275text(2, " No se encontraron formularios. ");
    \u0275\u0275elementEnd()();
  }
}
function AdminFormularios_Conditional_2_Conditional_36_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275repeaterCreate(0, AdminFormularios_Conditional_2_Conditional_36_For_1_Template, 23, 11, "tr", 36, _forTrack03, false, AdminFormularios_Conditional_2_Conditional_36_ForEmpty_2_Template, 3, 0, "tr");
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275repeater(ctx_r1.formulariosFiltrados);
  }
}
function AdminFormularios_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 3)(1, "app-page-header", 6)(2, "button", 7, 0);
    \u0275\u0275listener("click", function AdminFormularios_Conditional_2_Template_button_click_2_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.abrirFormNuevo());
    });
    \u0275\u0275elementStart(4, "span", 8);
    \u0275\u0275text(5, "+");
    \u0275\u0275elementEnd();
    \u0275\u0275text(6, " Nuevo Formulario ");
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(7, AdminFormularios_Conditional_2_Conditional_7_Template, 7, 3, "div", 9);
    \u0275\u0275elementStart(8, "div", 10)(9, "table", 11)(10, "colgroup");
    \u0275\u0275element(11, "col")(12, "col", 12)(13, "col", 13)(14, "col", 14)(15, "col", 14)(16, "col", 15)(17, "col", 15);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "thead")(19, "tr", 16)(20, "th", 17);
    \u0275\u0275text(21, "Nombre");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "th", 17);
    \u0275\u0275text(23, "Tipo de Formulario");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "th", 18);
    \u0275\u0275text(25, "Sigla");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(26, "th", 18);
    \u0275\u0275text(27, "Versi\xF3n");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(28, "th", 18);
    \u0275\u0275text(29, "Estado");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(30, "th", 18);
    \u0275\u0275text(31, "Fecha Creaci\xF3n");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(32, "th", 19);
    \u0275\u0275text(33, "Acciones");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(34, "tbody");
    \u0275\u0275conditionalCreate(35, AdminFormularios_Conditional_2_Conditional_35_Template, 2, 1)(36, AdminFormularios_Conditional_2_Conditional_36_Template, 3, 1);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(7);
    \u0275\u0275conditional(!ctx_r1.loading ? 7 : -1);
    \u0275\u0275advance(28);
    \u0275\u0275conditional(ctx_r1.loading ? 35 : 36);
  }
}
function AdminFormularios_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 4)(1, "app-formulario-detalle", 50);
    \u0275\u0275listener("regresar", function AdminFormularios_Conditional_3_Template_app_formulario_detalle_regresar_1_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.regresarLista());
    });
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("formulario", ctx_r1.formularioSeleccionado);
  }
}
function AdminFormularios_Conditional_4_For_50_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 68);
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
function AdminFormularios_Conditional_4_Conditional_56_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 73);
  }
}
function AdminFormularios_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 51);
    \u0275\u0275listener("click", function AdminFormularios_Conditional_4_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.cerrarFormulario());
    });
    \u0275\u0275elementStart(1, "div", 52);
    \u0275\u0275listener("click", function AdminFormularios_Conditional_4_Template_div_click_1_listener($event) {
      \u0275\u0275restoreView(_r7);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275elementStart(2, "div", 53)(3, "div")(4, "h3", 54);
    \u0275\u0275text(5, " Nuevo Formulario ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "p", 55);
    \u0275\u0275text(7, " Completa los datos para registrar el formulario. ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "button", 56);
    \u0275\u0275listener("click", function AdminFormularios_Conditional_4_Template_button_click_8_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.cerrarFormulario());
    });
    \u0275\u0275text(9, " \xD7 ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "div", 57)(11, "div")(12, "label", 58);
    \u0275\u0275text(13, " Nombre ");
    \u0275\u0275elementStart(14, "span", 59);
    \u0275\u0275text(15, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(16, "input", 60);
    \u0275\u0275twoWayListener("ngModelChange", function AdminFormularios_Conditional_4_Template_input_ngModelChange_16_listener($event) {
      \u0275\u0275restoreView(_r7);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.formData.nombre, $event) || (ctx_r1.formData.nombre = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(17, "div", 61)(18, "div")(19, "label", 58);
    \u0275\u0275text(20, " Sigla ");
    \u0275\u0275elementStart(21, "span", 59);
    \u0275\u0275text(22, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(23, "input", 62);
    \u0275\u0275twoWayListener("ngModelChange", function AdminFormularios_Conditional_4_Template_input_ngModelChange_23_listener($event) {
      \u0275\u0275restoreView(_r7);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.formData.sigla, $event) || (ctx_r1.formData.sigla = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(24, "div")(25, "label", 58);
    \u0275\u0275text(26, " Versi\xF3n ");
    \u0275\u0275elementStart(27, "span", 59);
    \u0275\u0275text(28, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(29, "input", 63);
    \u0275\u0275twoWayListener("ngModelChange", function AdminFormularios_Conditional_4_Template_input_ngModelChange_29_listener($event) {
      \u0275\u0275restoreView(_r7);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.formData.version, $event) || (ctx_r1.formData.version = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(30, "div")(31, "label", 58);
    \u0275\u0275text(32, " Descripci\xF3n ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(33, "textarea", 64);
    \u0275\u0275twoWayListener("ngModelChange", function AdminFormularios_Conditional_4_Template_textarea_ngModelChange_33_listener($event) {
      \u0275\u0275restoreView(_r7);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.formData.descripcion, $event) || (ctx_r1.formData.descripcion = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(34, "div", 61)(35, "div")(36, "label", 58);
    \u0275\u0275text(37, " Fecha Emisi\xF3n ");
    \u0275\u0275elementStart(38, "span", 59);
    \u0275\u0275text(39, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(40, "input", 65);
    \u0275\u0275twoWayListener("ngModelChange", function AdminFormularios_Conditional_4_Template_input_ngModelChange_40_listener($event) {
      \u0275\u0275restoreView(_r7);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.formData.fecha_emision, $event) || (ctx_r1.formData.fecha_emision = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(41, "div")(42, "label", 58);
    \u0275\u0275text(43, " Tipo Formulario ");
    \u0275\u0275elementStart(44, "span", 59);
    \u0275\u0275text(45, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(46, "select", 66);
    \u0275\u0275twoWayListener("ngModelChange", function AdminFormularios_Conditional_4_Template_select_ngModelChange_46_listener($event) {
      \u0275\u0275restoreView(_r7);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.formData.ctformulario_id, $event) || (ctx_r1.formData.ctformulario_id = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(47, "option", 67);
    \u0275\u0275text(48, "Seleccione un tipo...");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(49, AdminFormularios_Conditional_4_For_50_Template, 2, 2, "option", 68, _forTrack03);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(51, "div", 69)(52, "div", 70)(53, "button", 71);
    \u0275\u0275listener("click", function AdminFormularios_Conditional_4_Template_button_click_53_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.cerrarFormulario());
    });
    \u0275\u0275text(54, " Cancelar ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(55, "button", 72);
    \u0275\u0275listener("click", function AdminFormularios_Conditional_4_Template_button_click_55_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.guardarFormulario());
    });
    \u0275\u0275conditionalCreate(56, AdminFormularios_Conditional_4_Conditional_56_Template, 1, 0, "span", 73);
    \u0275\u0275text(57, " Crear Formulario ");
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(16);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.formData.nombre);
    \u0275\u0275advance(7);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.formData.sigla);
    \u0275\u0275advance(6);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.formData.version);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.formData.descripcion);
    \u0275\u0275advance(7);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.formData.fecha_emision);
    \u0275\u0275advance(6);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.formData.ctformulario_id);
    \u0275\u0275advance();
    \u0275\u0275property("ngValue", 0);
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r1.tiposFormulario);
    \u0275\u0275advance(4);
    \u0275\u0275property("disabled", ctx_r1.guardando);
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r1.guardando || !ctx_r1.formData.nombre || !ctx_r1.formData.sigla);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.guardando ? 56 : -1);
  }
}
var AdminFormularios = class _AdminFormularios {
  reportFormularioService;
  adminFormularioService;
  cataloService;
  toastr;
  zone;
  formularios = [];
  formulariosFiltrados = [];
  meta = null;
  loading = true;
  busqueda = "";
  formularioSeleccionado = null;
  mostrarFormulario = false;
  guardando = false;
  formData = this.emptyForm();
  tiposFormulario = [];
  destroy$ = new Subject();
  constructor(reportFormularioService, adminFormularioService, cataloService, toastr, zone) {
    this.reportFormularioService = reportFormularioService;
    this.adminFormularioService = adminFormularioService;
    this.cataloService = cataloService;
    this.toastr = toastr;
    this.zone = zone;
  }
  ngOnInit() {
    this.cargarListaFormularios();
    this.cargarTiposFormulario();
  }
  cargarTiposFormulario() {
    this.cataloService.getItemsByCatalogoId(9).pipe(takeUntil(this.destroy$)).subscribe({
      next: ({ data }) => this.tiposFormulario = data,
      error: (err) => this.toastr.showError("No se pudo cargar los tipos de formulario", "Error")
    });
  }
  cargarListaFormularios() {
    this.loading = true;
    this.reportFormularioService.getFormularios().pipe(takeUntil(this.destroy$)).subscribe({
      next: ({ data, meta }) => {
        this.formularios = data;
        this.formulariosFiltrados = data;
        this.meta = meta;
        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
        this.toastr.showError("No se pudo cargar la lista de formularios", "Error");
      }
    });
  }
  filtrar() {
    const q = this.busqueda.toLowerCase().trim();
    this.formulariosFiltrados = q ? this.formularios.filter((f) => f.nombre.toLowerCase().includes(q) || f.tipo_formulario.toLowerCase().includes(q) || f.sigla.toLowerCase().includes(q)) : [...this.formularios];
  }
  abrirDetalle(formulario) {
    this.formularioSeleccionado = formulario;
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  regresarLista() {
    this.formularioSeleccionado = null;
  }
  abrirFormNuevo() {
    this.formData = this.emptyForm();
    this.mostrarFormulario = true;
  }
  cerrarFormulario() {
    this.mostrarFormulario = false;
  }
  guardarFormulario() {
    this.guardando = true;
    const payload = __spreadProps(__spreadValues({}, this.formData), {
      fecha_emision: new Date(this.formData.fecha_emision).toISOString()
    });
    this.adminFormularioService.crear(payload).pipe(takeUntil(this.destroy$)).subscribe({
      next: (res) => {
        this.zone.run(() => {
          this.guardando = false;
          this.cerrarFormulario();
          this.cargarListaFormularios();
          this.toastr.showSuccess("Formulario creado correctamente.", "\xC9xito");
        });
      },
      error: (err) => {
        this.zone.run(() => {
          this.guardando = false;
          this.toastr.showError("No se pudo crear el formulario.", "Error");
        });
      }
    });
  }
  emptyForm() {
    return {
      nombre: "",
      sigla: "",
      version: 1,
      descripcion: "",
      fecha_emision: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
      ctformulario_id: 0
    };
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  static \u0275fac = function AdminFormularios_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AdminFormularios)(\u0275\u0275directiveInject(ReportFormularioService), \u0275\u0275directiveInject(AdminFormularioService), \u0275\u0275directiveInject(CatalogoService), \u0275\u0275directiveInject(ToastrAlertService), \u0275\u0275directiveInject(NgZone));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AdminFormularios, selectors: [["app-admin-formularios"]], decls: 5, vars: 2, consts: [["pageAction", ""], [1, "p-6", "bg-slate-50", "min-h-screen", "text-slate-700", "font-sans", "pb-24"], [1, "max-w-7xl", "mx-auto"], [1, "animate-in", "fade-in"], [1, "animate-in", "slide-in-from-right-4"], [1, "fixed", "inset-0", "z-[100]", "flex", "items-center", "justify-center", "bg-black/60", "backdrop-blur-sm", "animate-in", "fade-in", "p-4"], ["breadcrumbSection", "Administraci\xF3n de Formularios", "title", "Administraci\xF3n de Formularios", "subtitle", "Gestione la configuraci\xF3n y atributos de los formularios din\xE1micos."], ["pageAction", "", "type", "button", 1, "bg-[#1e3a8a]", "text-white", "px-6", "py-2.5", "rounded", "text-xs", "font-bold", "uppercase", "shadow-md", "hover:bg-[#2541b2]", "transition-colors", "flex", "items-center", "gap-2", 3, "click"], [1, "text-lg", "leading-none"], [1, "flex", "justify-between", "items-center", "mb-4"], [1, "bg-white", "rounded-lg", "shadow-sm", "border", "border-slate-200", "overflow-hidden"], [1, "w-full", "text-sm", "border-collapse", "table-fixed"], [1, "w-[190px]"], [1, "w-[100px]"], [1, "w-[80px]"], [1, "w-[110px]"], [1, "bg-slate-50", "text-[10px]", "font-bold", "text-slate-500", "uppercase", "border-b", "border-slate-200", "tracking-wider"], [1, "px-3", "py-2.5", "border-r", "border-slate-100", "text-left"], [1, "px-3", "py-2.5", "border-r", "border-slate-100", "text-center"], [1, "px-2", "py-2.5", "text-center"], [1, "relative", "w-80"], ["type", "text", "placeholder", "Buscar por nombre, tipo o sigla...", 1, "w-full", "border", "border-slate-300", "rounded", "pl-10", "pr-4", "py-2.5", "text-sm", "outline-none", "focus:border-[#1e3a8a]", "transition-colors", 3, "ngModelChange", "ngModel"], ["fill", "none", "viewBox", "0 0 24 24", "stroke", "currentColor", 1, "w-4", "h-4", "text-slate-400", "absolute", "left-3", "top-1/2", "-translate-y-1/2"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"], [1, "text-xs", "font-bold", "text-slate-500", "uppercase"], [1, "border-b", "border-slate-200", "animate-pulse"], [1, "px-3", "py-3", "border-r", "border-slate-100"], [1, "h-3", "bg-slate-200", "rounded", "w-3/4", "mb-1.5"], [1, "h-2.5", "bg-slate-100", "rounded", "w-1/2"], [1, "h-5", "bg-slate-200", "rounded", "w-4/5"], [1, "h-3", "bg-slate-200", "rounded", "w-1/2", "mx-auto"], [1, "h-5", "bg-slate-200", "rounded", "w-3/5", "mx-auto"], [1, "h-5", "bg-slate-200", "rounded", "w-4/5", "mx-auto"], [1, "h-3", "bg-slate-200", "rounded", "w-3/4", "mx-auto"], [1, "px-2", "py-3"], [1, "h-7", "bg-slate-200", "rounded", "w-20", "mx-auto"], [1, "border-b", "border-slate-200", "hover:bg-slate-50", "transition-colors", "cursor-pointer"], [1, "border-b", "border-slate-200", "hover:bg-slate-50", "transition-colors", "cursor-pointer", 3, "click"], [1, "px-3", "py-2.5", "border-r", "border-slate-100"], [1, "font-bold", "text-slate-700", "truncate"], [1, "text-[10px]", "text-slate-400", "font-mono", "mt-0.5", "truncate"], [1, "inline-block", "bg-blue-50", "text-blue-800", "border", "border-blue-200", "px-2", "py-0.5", "rounded", "text-[10px]", "font-bold", "uppercase", "truncate", "max-w-full", "whitespace-nowrap", 3, "title"], [1, "px-3", "py-2.5", "border-r", "border-slate-100", "text-center", "font-mono", "font-bold", "text-slate-700", "text-xs", "whitespace-nowrap"], [1, "inline-block", "bg-slate-100", "text-slate-600", "font-bold", "text-xs", "px-2", "py-0.5", "rounded"], [1, "block", "w-full", "text-center", "py-0.5", "border", "border-green-400", "text-green-700", "font-bold", "text-[10px]", "rounded", "bg-green-50", "whitespace-nowrap"], [1, "block", "w-full", "text-center", "py-0.5", "border", "border-slate-300", "text-slate-500", "font-bold", "text-[10px]", "rounded", "bg-slate-50", "whitespace-nowrap"], [1, "px-3", "py-2.5", "border-r", "border-slate-100", "text-center", "text-slate-500", "text-xs", "whitespace-nowrap"], [1, "px-2", "py-2.5", "text-center", 3, "click"], ["type", "button", 1, "text-[#1e3a8a]", "hover:text-white", "font-bold", "text-[11px]", "uppercase", "px-3", "py-1.5", "border", "border-[#1e3a8a]", "hover:bg-[#1e3a8a]", "rounded", "transition-all", 3, "click"], ["colspan", "7", 1, "p-10", "text-slate-400", "italic", "text-center"], [3, "regresar", "formulario"], [1, "fixed", "inset-0", "z-[100]", "flex", "items-center", "justify-center", "bg-black/60", "backdrop-blur-sm", "animate-in", "fade-in", "p-4", 3, "click"], [1, "bg-white", "rounded-lg", "shadow-2xl", "w-full", "max-w-lg", "flex", "flex-col", "max-h-[85vh]", 3, "click"], [1, "flex", "items-center", "justify-between", "px-6", "py-4", "border-b", "border-gray-200"], [1, "text-base", "font-bold", "text-[#1e3a8a]", "uppercase", "tracking-wide"], [1, "text-xs", "text-slate-500", "mt-0.5"], ["type", "button", 1, "text-slate-400", "hover:text-red-500", "text-xl", "leading-none", 3, "click"], [1, "overflow-y-auto", "px-6", "py-4", "flex-1", "custom-scroll", "space-y-4"], [1, "block", "text-[11px]", "font-bold", "text-[#1e3a8a]", "uppercase", "mb-1"], [1, "text-red-500"], ["type", "text", "placeholder", "ej. Formulario de Ingreso", 1, "w-full", "border", "border-slate-300", "rounded", "p-2.5", "text-sm", "outline-none", "focus:border-[#1e3a8a]", "transition-colors", 3, "ngModelChange", "ngModel"], [1, "grid", "grid-cols-2", "gap-4"], ["type", "text", "placeholder", "ej. FI-001", 1, "w-full", "border", "border-slate-300", "rounded", "p-2.5", "text-sm", "outline-none", "focus:border-[#1e3a8a]", "transition-colors", "font-mono", "uppercase", 3, "ngModelChange", "ngModel"], ["type", "number", "min", "1", 1, "w-full", "border", "border-slate-300", "rounded", "p-2.5", "text-sm", "outline-none", "focus:border-[#1e3a8a]", "transition-colors", 3, "ngModelChange", "ngModel"], ["rows", "2", "placeholder", "Descripci\xF3n opcional del formulario", 1, "w-full", "border", "border-slate-300", "rounded", "p-2.5", "text-sm", "outline-none", "focus:border-[#1e3a8a]", "transition-colors", "resize-none", 3, "ngModelChange", "ngModel"], ["type", "date", 1, "w-full", "border", "border-slate-300", "rounded", "p-2.5", "text-sm", "outline-none", "focus:border-[#1e3a8a]", "transition-colors", 3, "ngModelChange", "ngModel"], [1, "w-full", "border", "border-slate-300", "rounded", "p-2.5", "text-sm", "outline-none", "focus:border-[#1e3a8a]", "transition-colors", "bg-white", 3, "ngModelChange", "ngModel"], ["disabled", "", 3, "ngValue"], [3, "ngValue"], [1, "px-6", "py-3", "border-t", "border-gray-200"], [1, "flex", "gap-3"], ["type", "button", 1, "flex-1", "border", "border-gray-300", "text-slate-700", "font-bold", "uppercase", "text-xs", "py-3", "rounded", "hover:bg-gray-50", "disabled:opacity-50", 3, "click", "disabled"], ["type", "button", 1, "flex-1", "bg-[#1e3a8a]", "text-white", "font-bold", "uppercase", "text-xs", "py-3", "rounded", "hover:bg-[#2541b2]", "disabled:opacity-50", "flex", "items-center", "justify-center", "gap-2", 3, "click", "disabled"], [1, "animate-spin", "h-3.5", "w-3.5", "border-2", "border-white", "border-t-transparent", "rounded-full"]], template: function AdminFormularios_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 1)(1, "div", 2);
      \u0275\u0275conditionalCreate(2, AdminFormularios_Conditional_2_Template, 37, 2, "div", 3)(3, AdminFormularios_Conditional_3_Template, 2, 1, "div", 4);
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(4, AdminFormularios_Conditional_4_Template, 58, 10, "div", 5);
    }
    if (rf & 2) {
      \u0275\u0275advance(2);
      \u0275\u0275conditional(!ctx.formularioSeleccionado ? 2 : 3);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.mostrarFormulario ? 4 : -1);
    }
  }, dependencies: [CommonModule, FormsModule, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, NumberValueAccessor, SelectControlValueAccessor, NgControlStatus, MinValidator, NgModel, FormularioDetalle, PageHeader, DatePipe], styles: ["\n\n.animate-in[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_animateIn 0.3s ease-out forwards;\n}\n.fade-in[_ngcontent-%COMP%] {\n  opacity: 0;\n}\n.slide-in-from-bottom-4[_ngcontent-%COMP%] {\n  transform: translateY(1rem);\n}\n.slide-in-from-right-4[_ngcontent-%COMP%] {\n  transform: translateX(1rem);\n}\n@keyframes _ngcontent-%COMP%_animateIn {\n  to {\n    opacity: 1;\n    transform: translate(0);\n  }\n}\n.custom-scroll[_ngcontent-%COMP%]::-webkit-scrollbar {\n  width: 6px;\n  height: 6px;\n}\n.custom-scroll[_ngcontent-%COMP%]::-webkit-scrollbar-track {\n  background: #f1f5f9;\n  border-radius: 4px;\n}\n.custom-scroll[_ngcontent-%COMP%]::-webkit-scrollbar-thumb {\n  background: #cbd5e1;\n  border-radius: 4px;\n}\n.custom-scroll[_ngcontent-%COMP%]::-webkit-scrollbar-thumb:hover {\n  background: #94a3b8;\n}\ninput[_ngcontent-%COMP%]:focus, \nselect[_ngcontent-%COMP%]:focus, \ntextarea[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: #1e3a8a;\n  box-shadow: 0 0 0 1px #1e3a8a;\n}\n/*# sourceMappingURL=admin-formularios.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AdminFormularios, [{
    type: Component,
    args: [{ selector: "app-admin-formularios", standalone: true, imports: [CommonModule, FormsModule, FormularioDetalle, PageHeader], template: `<div class="p-6 bg-slate-50 min-h-screen text-slate-700 font-sans pb-24">
  <div class="max-w-7xl mx-auto">

    @if (!formularioSeleccionado) {
      <div class="animate-in fade-in">

        <app-page-header
          breadcrumbSection="Administraci\xF3n de Formularios"
          title="Administraci\xF3n de Formularios"
          subtitle="Gestione la configuraci\xF3n y atributos de los formularios din\xE1micos."
        >
          <button #pageAction pageAction type="button" (click)="abrirFormNuevo()"
            class="bg-[#1e3a8a] text-white px-6 py-2.5 rounded text-xs font-bold uppercase shadow-md hover:bg-[#2541b2] transition-colors flex items-center gap-2">
            <span class="text-lg leading-none">+</span> Nuevo Formulario
          </button>
        </app-page-header>

        <!-- Buscador -->
        @if (!loading) {
          <div class="flex justify-between items-center mb-4">
            <div class="relative w-80">
              <input type="text" [(ngModel)]="busqueda" (ngModelChange)="filtrar()"
                placeholder="Buscar por nombre, tipo o sigla..."
                class="w-full border border-slate-300 rounded pl-10 pr-4 py-2.5 text-sm outline-none focus:border-[#1e3a8a] transition-colors" />
              <svg class="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <span class="text-xs font-bold text-slate-500 uppercase">
              {{ formulariosFiltrados.length }} de {{ formularios.length }} formularios
            </span>
          </div>
        }

        <!-- Table-card: sin padding, overflow-hidden -->
        <div class="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
          <table class="w-full text-sm border-collapse table-fixed">
            <colgroup>
              <col>
              <col class="w-[190px]">
              <col class="w-[100px]">
              <col class="w-[80px]">
              <col class="w-[80px]">
              <col class="w-[110px]">
              <col class="w-[110px]">
            </colgroup>
            <thead>
              <tr class="bg-slate-50 text-[10px] font-bold text-slate-500 uppercase border-b border-slate-200 tracking-wider">
                <th class="px-3 py-2.5 border-r border-slate-100 text-left">Nombre</th>
                <th class="px-3 py-2.5 border-r border-slate-100 text-left">Tipo de Formulario</th>
                <th class="px-3 py-2.5 border-r border-slate-100 text-center">Sigla</th>
                <th class="px-3 py-2.5 border-r border-slate-100 text-center">Versi\xF3n</th>
                <th class="px-3 py-2.5 border-r border-slate-100 text-center">Estado</th>
                <th class="px-3 py-2.5 border-r border-slate-100 text-center">Fecha Creaci\xF3n</th>
                <th class="px-2 py-2.5 text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              @if (loading) {
                @for (_ of [1,2,3,4,5,6,7,8]; track $index) {
                  <tr class="border-b border-slate-200 animate-pulse">
                    <td class="px-3 py-3 border-r border-slate-100">
                      <div class="h-3 bg-slate-200 rounded w-3/4 mb-1.5"></div>
                      <div class="h-2.5 bg-slate-100 rounded w-1/2"></div>
                    </td>
                    <td class="px-3 py-3 border-r border-slate-100"><div class="h-5 bg-slate-200 rounded w-4/5"></div></td>
                    <td class="px-3 py-3 border-r border-slate-100"><div class="h-3 bg-slate-200 rounded w-1/2 mx-auto"></div></td>
                    <td class="px-3 py-3 border-r border-slate-100"><div class="h-5 bg-slate-200 rounded w-3/5 mx-auto"></div></td>
                    <td class="px-3 py-3 border-r border-slate-100"><div class="h-5 bg-slate-200 rounded w-4/5 mx-auto"></div></td>
                    <td class="px-3 py-3 border-r border-slate-100"><div class="h-3 bg-slate-200 rounded w-3/4 mx-auto"></div></td>
                    <td class="px-2 py-3"><div class="h-7 bg-slate-200 rounded w-20 mx-auto"></div></td>
                  </tr>
                }
              } @else {
                @for (form of formulariosFiltrados; track form.id) {
                  <tr class="border-b border-slate-200 hover:bg-slate-50 transition-colors cursor-pointer" (click)="abrirDetalle(form)">
                    <td class="px-3 py-2.5 border-r border-slate-100">
                      <p class="font-bold text-slate-700 truncate">{{ form.nombre }}</p>
                      <p class="text-[10px] text-slate-400 font-mono mt-0.5 truncate">{{ form.id }}</p>
                    </td>
                    <td class="px-3 py-2.5 border-r border-slate-100">
                      <span class="inline-block bg-blue-50 text-blue-800 border border-blue-200 px-2 py-0.5 rounded text-[10px] font-bold uppercase truncate max-w-full whitespace-nowrap" [title]="form.tipo_formulario">
                        {{ form.tipo_formulario }}
                      </span>
                    </td>
                    <td class="px-3 py-2.5 border-r border-slate-100 text-center font-mono font-bold text-slate-700 text-xs whitespace-nowrap">
                      {{ form.sigla }}
                    </td>
                    <td class="px-3 py-2.5 border-r border-slate-100 text-center">
                      <span class="inline-block bg-slate-100 text-slate-600 font-bold text-xs px-2 py-0.5 rounded">v{{ form.version }}</span>
                    </td>
                    <td class="px-3 py-2.5 border-r border-slate-100 text-center">
                      @if (form.estado) {
                        <span class="block w-full text-center py-0.5 border border-green-400 text-green-700 font-bold text-[10px] rounded bg-green-50 whitespace-nowrap">Activo</span>
                      } @else {
                        <span class="block w-full text-center py-0.5 border border-slate-300 text-slate-500 font-bold text-[10px] rounded bg-slate-50 whitespace-nowrap">Inactivo</span>
                      }
                    </td>
                    <td class="px-3 py-2.5 border-r border-slate-100 text-center text-slate-500 text-xs whitespace-nowrap">
                      {{ form.fecha_creacion | date: 'dd/MM/yyyy' }}
                    </td>
                    <td class="px-2 py-2.5 text-center" (click)="$event.stopPropagation()">
                      <button type="button" (click)="abrirDetalle(form)"
                        class="text-[#1e3a8a] hover:text-white font-bold text-[11px] uppercase px-3 py-1.5 border border-[#1e3a8a] hover:bg-[#1e3a8a] rounded transition-all">
                        Configurar
                      </button>
                    </td>
                  </tr>
                } @empty {
                  <tr>
                    <td colspan="7" class="p-10 text-slate-400 italic text-center">
                      No se encontraron formularios.
                    </td>
                  </tr>
                }
              }
            </tbody>
          </table>
        </div>

      </div>
    } @else {
      <!-- \u2500\u2500 DETALLE \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 -->
      <div class="animate-in slide-in-from-right-4">
        <app-formulario-detalle [formulario]="formularioSeleccionado" (regresar)="regresarLista()">
        </app-formulario-detalle>
      </div>
    }

  </div>
</div>

<!-- \u2500\u2500 MODAL NUEVO FORMULARIO \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 -->
@if (mostrarFormulario) {
  <div
    class="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in p-4"
    (click)="cerrarFormulario()"
  >
    <div
      class="bg-white rounded-lg shadow-2xl w-full max-w-lg flex flex-col max-h-[85vh]"
      (click)="$event.stopPropagation()"
    >
      <!-- Header -->
      <div class="flex items-center justify-between px-6 py-4 border-b border-gray-200">
        <div>
          <h3 class="text-base font-bold text-[#1e3a8a] uppercase tracking-wide">
            Nuevo Formulario
          </h3>
          <p class="text-xs text-slate-500 mt-0.5">
            Completa los datos para registrar el formulario.
          </p>
        </div>
        <button
          type="button"
          (click)="cerrarFormulario()"
          class="text-slate-400 hover:text-red-500 text-xl leading-none"
        >
          &times;
        </button>
      </div>

      <!-- Body -->
      <div class="overflow-y-auto px-6 py-4 flex-1 custom-scroll space-y-4">
        <div>
          <label class="block text-[11px] font-bold text-[#1e3a8a] uppercase mb-1">
            Nombre <span class="text-red-500">*</span>
          </label>
          <input
            type="text"
            [(ngModel)]="formData.nombre"
            placeholder="ej. Formulario de Ingreso"
            class="w-full border border-slate-300 rounded p-2.5 text-sm outline-none focus:border-[#1e3a8a] transition-colors"
          />
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-[11px] font-bold text-[#1e3a8a] uppercase mb-1">
              Sigla <span class="text-red-500">*</span>
            </label>
            <input
              type="text"
              [(ngModel)]="formData.sigla"
              placeholder="ej. FI-001"
              class="w-full border border-slate-300 rounded p-2.5 text-sm outline-none focus:border-[#1e3a8a] transition-colors font-mono uppercase"
            />
          </div>
          <div>
            <label class="block text-[11px] font-bold text-[#1e3a8a] uppercase mb-1">
              Versi\xF3n <span class="text-red-500">*</span>
            </label>
            <input
              type="number"
              [(ngModel)]="formData.version"
              min="1"
              class="w-full border border-slate-300 rounded p-2.5 text-sm outline-none focus:border-[#1e3a8a] transition-colors"
            />
          </div>
        </div>

        <div>
          <label class="block text-[11px] font-bold text-[#1e3a8a] uppercase mb-1">
            Descripci\xF3n
          </label>
          <textarea
            [(ngModel)]="formData.descripcion"
            rows="2"
            placeholder="Descripci\xF3n opcional del formulario"
            class="w-full border border-slate-300 rounded p-2.5 text-sm outline-none focus:border-[#1e3a8a] transition-colors resize-none"
          ></textarea>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-[11px] font-bold text-[#1e3a8a] uppercase mb-1">
              Fecha Emisi\xF3n <span class="text-red-500">*</span>
            </label>
            <input
              type="date"
              [(ngModel)]="formData.fecha_emision"
              class="w-full border border-slate-300 rounded p-2.5 text-sm outline-none focus:border-[#1e3a8a] transition-colors"
            />
          </div>
          <div>
            <label class="block text-[11px] font-bold text-[#1e3a8a] uppercase mb-1">
              Tipo Formulario <span class="text-red-500">*</span>
            </label>
            <select
              [(ngModel)]="formData.ctformulario_id"
              class="w-full border border-slate-300 rounded p-2.5 text-sm outline-none focus:border-[#1e3a8a] transition-colors bg-white"
            >
              <option [ngValue]="0" disabled>Seleccione un tipo...</option>
              @for (tipo of tiposFormulario; track tipo.id) {
                <option [ngValue]="tipo.id">{{ tipo.nombre }}</option>
              }
            </select>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div class="px-6 py-3 border-t border-gray-200">
        <div class="flex gap-3">
          <button
            type="button"
            (click)="cerrarFormulario()"
            [disabled]="guardando"
            class="flex-1 border border-gray-300 text-slate-700 font-bold uppercase text-xs py-3 rounded hover:bg-gray-50 disabled:opacity-50"
          >
            Cancelar
          </button>
          <button
            type="button"
            (click)="guardarFormulario()"
            [disabled]="guardando || !formData.nombre || !formData.sigla"
            class="flex-1 bg-[#1e3a8a] text-white font-bold uppercase text-xs py-3 rounded hover:bg-[#2541b2] disabled:opacity-50 flex items-center justify-center gap-2"
          >
            @if (guardando) {
              <span class="animate-spin h-3.5 w-3.5 border-2 border-white border-t-transparent rounded-full"></span>
            }
            Crear Formulario
          </button>
        </div>
      </div>
    </div>
  </div>
}
`, styles: ["/* src/app/features/formularios/admin-formularios/admin-formularios.css */\n.animate-in {\n  animation: animateIn 0.3s ease-out forwards;\n}\n.fade-in {\n  opacity: 0;\n}\n.slide-in-from-bottom-4 {\n  transform: translateY(1rem);\n}\n.slide-in-from-right-4 {\n  transform: translateX(1rem);\n}\n@keyframes animateIn {\n  to {\n    opacity: 1;\n    transform: translate(0);\n  }\n}\n.custom-scroll::-webkit-scrollbar {\n  width: 6px;\n  height: 6px;\n}\n.custom-scroll::-webkit-scrollbar-track {\n  background: #f1f5f9;\n  border-radius: 4px;\n}\n.custom-scroll::-webkit-scrollbar-thumb {\n  background: #cbd5e1;\n  border-radius: 4px;\n}\n.custom-scroll::-webkit-scrollbar-thumb:hover {\n  background: #94a3b8;\n}\ninput:focus,\nselect:focus,\ntextarea:focus {\n  outline: none;\n  border-color: #1e3a8a;\n  box-shadow: 0 0 0 1px #1e3a8a;\n}\n/*# sourceMappingURL=admin-formularios.css.map */\n"] }]
  }], () => [{ type: ReportFormularioService }, { type: AdminFormularioService }, { type: CatalogoService }, { type: ToastrAlertService }, { type: NgZone }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AdminFormularios, { className: "AdminFormularios", filePath: "src/app/features/formularios/admin-formularios/admin-formularios.ts", lineNumber: 23 });
})();
export {
  AdminFormularios
};
//# sourceMappingURL=chunk-7WBQCRKG.js.map
