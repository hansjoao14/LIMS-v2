import {
  SolicitudDetalleService
} from "./chunk-ZPRPER5R.js";
import {
  CatalogoService
} from "./chunk-JQDQ7LNR.js";
import {
  PeriodoService
} from "./chunk-YDUHZXBQ.js";
import {
  ToastrAlertService
} from "./chunk-ECH5TBPN.js";
import "./chunk-PWNMWNUA.js";
import {
  DefaultValueAccessor,
  FormBuilder,
  FormControlName,
  FormGroupDirective,
  FormGroupName,
  FormsModule,
  MaxLengthValidator,
  NgControlStatus,
  NgControlStatusGroup,
  NgModel,
  NgSelectOption,
  ReactiveFormsModule,
  SelectControlValueAccessor,
  Validators,
  ɵNgNoValidate,
  ɵNgSelectMultipleOption
} from "./chunk-J76B35JM.js";
import "./chunk-XTPUTV4O.js";
import {
  AppRole,
  MenuKey,
  hasPermission
} from "./chunk-O4XHAB45.js";
import {
  ReportSolicitudService
} from "./chunk-IW66RJTG.js";
import {
  require_sweetalert2_all
} from "./chunk-TTWGDTQR.js";
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
  AuthService,
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
  __toESM,
  computed,
  finalize,
  firstValueFrom,
  map,
  setClassMetadata,
  takeUntil,
  ɵsetClassDebugInfo,
  ɵɵNgOnChangesFeature,
  ɵɵadvance,
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
  ɵɵdomProperty,
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
  ɵɵtextInterpolate3
} from "./chunk-4XEQTJJK.js";

// src/app/features/orden-trabajo-in-situ/lista/orden-trabajo-in-situ-lista.ts
var import_sweetalert2 = __toESM(require_sweetalert2_all());

// src/app/services/solicitudes/orden-trabajo/report-orden.service.ts
var CLIENT_NAME = "reportes";
var GET_COLLECTION_REPORT_ORDEN_DETALLE = gql`
  query CollectionReportOrdenDetalle {
    collectionReportOrdenDetalle(query: { where: { estado: { equals: true } } }) {
      data {
        id
        orden_trabajo_id
        solicitud_ensayo_id
        analisis
        identificacion
        metodo
        ctambiente_id
        ctambiente_nombre
        ctambiente_id_padre
        ctambiente_nombre_padre
        ensayo_id_ensayo
        estado
      }
    }
  }
`;
var GET_COLLECTION_REPORT_ORDEN = gql`
  query CollectionReportOrden {
    collectionReportOrden(query: { where: { estado: { equals: true } } }) {

      count
      data {
        actualizado_en
        actualizado_por
        creado_en
        creado_por
        ctambiente_id
        ctambiente_nombre
        ctcaracteristica_horaria_id
        ctcaracteristica_horaria_nombre
        ctestado_id
        ctestado_nombre
        ctformulario_id
        ctformulario_nombre
        ctpunto_critico_id
        ctpunto_critico_nombre
        ctuso_suelo_id
        ctuso_suelo_nombre
        direccion_pca
        entidad_id
        entidad_nombre
        estado
        id
        num_secuencial
        observacion
        periodo_anio
        periodo_id
        periodo_nombre_mes
        secuencial_id
        solicitud_id
        solicitud_num_secuencial
        telefono_pca
        usuario_id
        usuario_nombre_completo
      }
      meta { ${META_FIELDS} }
    }
  }
`;
var ReportOrdenService = class _ReportOrdenService {
  apollo;
  constructor(apollo) {
    this.apollo = apollo;
  }
  getDetallesByOrdenId(ordenId) {
    return this.apollo.use(CLIENT_NAME).query({
      query: GET_COLLECTION_REPORT_ORDEN_DETALLE,
      fetchPolicy: "network-only"
    }).pipe(map((r) => (r.data?.collectionReportOrdenDetalle?.data ?? []).filter((d) => d.orden_trabajo_id === ordenId)));
  }
  getOrdenes() {
    return this.apollo.use(CLIENT_NAME).query({
      query: GET_COLLECTION_REPORT_ORDEN,
      fetchPolicy: "network-only"
    }).pipe(map((result) => result.data?.collectionReportOrden?.data ?? []));
  }
  static \u0275fac = function ReportOrdenService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ReportOrdenService)(\u0275\u0275inject(Apollo));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _ReportOrdenService, factory: _ReportOrdenService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ReportOrdenService, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], () => [{ type: Apollo }], null);
})();

// src/app/services/solicitudes/orden-trabajo/orden-trabajo.service.ts
var OrdenTrabajoService = class _OrdenTrabajoService {
  http;
  apiSolicitud = environment.api_solicitud;
  constructor(http) {
    this.http = http;
  }
  crearOrdenTrabajoConDetalle(payload) {
    return this.http.post(`${this.apiSolicitud}/orden-trabajo/create-detalle`, payload);
  }
  actualizarOrden(id, payload) {
    return this.http.put(`${this.apiSolicitud}/orden-trabajo/${id}`, payload);
  }
  autorizarOrden(payload) {
    return this.http.post(`${this.apiSolicitud}/orden-trabajo/finalizar`, payload);
  }
  deshabilitarOrden(id) {
    return this.http.patch(`${this.apiSolicitud}/orden-trabajo/${id}/disable`, {});
  }
  static \u0275fac = function OrdenTrabajoService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _OrdenTrabajoService)(\u0275\u0275inject(HttpClient));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _OrdenTrabajoService, factory: _OrdenTrabajoService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(OrdenTrabajoService, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], () => [{ type: HttpClient }], null);
})();

// src/app/features/orden-trabajo-in-situ/lista/orden-trabajo-in-situ-lista.ts
var _c0 = () => [1, 2, 3, 4, 5, 6, 7, 8];
var _forTrack0 = ($index, $item) => $item.id;
function OrdenTrabajoInSituLista_Conditional_36_For_1_Template(rf, ctx) {
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
    \u0275\u0275domElement(10, "div", 22);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(11, "td", 20);
    \u0275\u0275domElement(12, "div", 24);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(13, "td", 20);
    \u0275\u0275domElement(14, "div", 21);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(15, "td", 25)(16, "div", 26);
    \u0275\u0275domElement(17, "div", 27)(18, "div", 27)(19, "div", 27);
    \u0275\u0275domElementEnd()()();
  }
}
function OrdenTrabajoInSituLista_Conditional_36_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275repeaterCreate(0, OrdenTrabajoInSituLista_Conditional_36_For_1_Template, 20, 0, "tr", 19, \u0275\u0275repeaterTrackByIndex);
  }
  if (rf & 2) {
    \u0275\u0275repeater(\u0275\u0275pureFunction0(0, _c0));
  }
}
function OrdenTrabajoInSituLista_Conditional_37_For_1_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "span", 32);
    \u0275\u0275text(1);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const orden_r1 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(orden_r1.ctestado_nombre);
  }
}
function OrdenTrabajoInSituLista_Conditional_37_For_1_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "span", 33);
    \u0275\u0275text(1);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const orden_r1 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(orden_r1.ctestado_nombre);
  }
}
function OrdenTrabajoInSituLista_Conditional_37_For_1_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "span", 34);
    \u0275\u0275text(1);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const orden_r1 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(orden_r1.ctestado_nombre);
  }
}
function OrdenTrabajoInSituLista_Conditional_37_For_1_Conditional_20_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "button", 39);
    \u0275\u0275domListener("click", function OrdenTrabajoInSituLista_Conditional_37_For_1_Conditional_20_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r2);
      const orden_r1 = \u0275\u0275nextContext().$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.finalizarOrden(orden_r1));
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275domElementStart(1, "svg", 40);
    \u0275\u0275domElement(2, "path", 41);
    \u0275\u0275domElementEnd()();
  }
  if (rf & 2) {
    const orden_r1 = \u0275\u0275nextContext().$implicit;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275domProperty("disabled", ctx_r2.procesandoId === orden_r1.id);
  }
}
function OrdenTrabajoInSituLista_Conditional_37_For_1_Conditional_21_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "button", 42);
    \u0275\u0275domListener("click", function OrdenTrabajoInSituLista_Conditional_37_For_1_Conditional_21_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r4);
      const orden_r1 = \u0275\u0275nextContext().$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.rechazarOrden(orden_r1));
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275domElementStart(1, "svg", 40);
    \u0275\u0275domElement(2, "path", 43);
    \u0275\u0275domElementEnd()();
  }
  if (rf & 2) {
    const orden_r1 = \u0275\u0275nextContext().$implicit;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275domProperty("disabled", ctx_r2.procesandoId === orden_r1.id);
  }
}
function OrdenTrabajoInSituLista_Conditional_37_For_1_Conditional_22_Conditional_4_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "button", 54);
    \u0275\u0275domListener("click", function OrdenTrabajoInSituLista_Conditional_37_For_1_Conditional_22_Conditional_4_Conditional_1_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r7);
      const orden_r1 = \u0275\u0275nextContext(3).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      ctx_r2.editarOrden(orden_r1);
      return \u0275\u0275resetView(ctx_r2.closeMenu());
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275domElementStart(1, "svg", 52);
    \u0275\u0275domElement(2, "path", 55);
    \u0275\u0275domElementEnd();
    \u0275\u0275text(3, " Editar ");
    \u0275\u0275domElementEnd();
  }
}
function OrdenTrabajoInSituLista_Conditional_37_For_1_Conditional_22_Conditional_4_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "button", 56);
    \u0275\u0275domListener("click", function OrdenTrabajoInSituLista_Conditional_37_For_1_Conditional_22_Conditional_4_Conditional_2_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r8);
      const orden_r1 = \u0275\u0275nextContext(3).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      ctx_r2.eliminarOrden(orden_r1);
      return \u0275\u0275resetView(ctx_r2.closeMenu());
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275domElementStart(1, "svg", 52);
    \u0275\u0275domElement(2, "path", 57);
    \u0275\u0275domElementEnd();
    \u0275\u0275text(3, " Eliminar ");
    \u0275\u0275domElementEnd();
  }
}
function OrdenTrabajoInSituLista_Conditional_37_For_1_Conditional_22_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "div", 47);
    \u0275\u0275conditionalCreate(1, OrdenTrabajoInSituLista_Conditional_37_For_1_Conditional_22_Conditional_4_Conditional_1_Template, 4, 0, "button", 48);
    \u0275\u0275conditionalCreate(2, OrdenTrabajoInSituLista_Conditional_37_For_1_Conditional_22_Conditional_4_Conditional_2_Template, 4, 0, "button", 49);
    \u0275\u0275domElementStart(3, "div", 50)(4, "button", 51);
    \u0275\u0275domListener("click", function OrdenTrabajoInSituLista_Conditional_37_For_1_Conditional_22_Conditional_4_Template_button_click_4_listener() {
      \u0275\u0275restoreView(_r6);
      const orden_r1 = \u0275\u0275nextContext(2).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      ctx_r2.imprimirOrden(orden_r1);
      return \u0275\u0275resetView(ctx_r2.closeMenu());
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275domElementStart(5, "svg", 52);
    \u0275\u0275domElement(6, "path", 53);
    \u0275\u0275domElementEnd();
    \u0275\u0275text(7, " Imprimir ");
    \u0275\u0275domElementEnd()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(4);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.canEdit() ? 1 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.canDelete() ? 2 : -1);
  }
}
function OrdenTrabajoInSituLista_Conditional_37_For_1_Conditional_22_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "div", 38)(1, "button", 44);
    \u0275\u0275domListener("click", function OrdenTrabajoInSituLista_Conditional_37_For_1_Conditional_22_Template_button_click_1_listener($event) {
      \u0275\u0275restoreView(_r5);
      const orden_r1 = \u0275\u0275nextContext().$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.toggleMenu(orden_r1.id, $event));
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275domElementStart(2, "svg", 45);
    \u0275\u0275domElement(3, "path", 46);
    \u0275\u0275domElementEnd()();
    \u0275\u0275conditionalCreate(4, OrdenTrabajoInSituLista_Conditional_37_For_1_Conditional_22_Conditional_4_Template, 8, 2, "div", 47);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const orden_r1 = \u0275\u0275nextContext().$implicit;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275conditional(ctx_r2.openMenuId === orden_r1.id ? 4 : -1);
  }
}
function OrdenTrabajoInSituLista_Conditional_37_For_1_Template(rf, ctx) {
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
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(9, "td", 30);
    \u0275\u0275text(10);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(11, "td", 16);
    \u0275\u0275conditionalCreate(12, OrdenTrabajoInSituLista_Conditional_37_For_1_Conditional_12_Template, 2, 1, "span", 32)(13, OrdenTrabajoInSituLista_Conditional_37_For_1_Conditional_13_Template, 2, 1, "span", 33)(14, OrdenTrabajoInSituLista_Conditional_37_For_1_Conditional_14_Template, 2, 1, "span", 34);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(15, "td", 35);
    \u0275\u0275text(16);
    \u0275\u0275pipe(17, "date");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(18, "td", 17)(19, "div", 26);
    \u0275\u0275conditionalCreate(20, OrdenTrabajoInSituLista_Conditional_37_For_1_Conditional_20_Template, 3, 1, "button", 36);
    \u0275\u0275conditionalCreate(21, OrdenTrabajoInSituLista_Conditional_37_For_1_Conditional_21_Template, 3, 1, "button", 37);
    \u0275\u0275conditionalCreate(22, OrdenTrabajoInSituLista_Conditional_37_For_1_Conditional_22_Template, 5, 1, "div", 38);
    \u0275\u0275domElementEnd()()();
  }
  if (rf & 2) {
    const orden_r1 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", orden_r1.num_secuencial ?? "\u2014", " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", orden_r1.solicitud_num_secuencial, " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", orden_r1.ctambiente_nombre, " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2(" ", orden_r1.periodo_nombre_mes, " ", orden_r1.periodo_anio, " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", orden_r1.usuario_nombre_completo, " ");
    \u0275\u0275advance(2);
    \u0275\u0275conditional(orden_r1.ctestado_id === 3 ? 12 : orden_r1.ctestado_id === 388 ? 13 : 14);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(17, 11, +orden_r1.creado_en, "dd/MM/yyyy"), " ");
    \u0275\u0275advance(4);
    \u0275\u0275conditional(ctx_r2.canFinalizar() ? 20 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.canRechazar() ? 21 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.canEdit() || ctx_r2.canDelete() ? 22 : -1);
  }
}
function OrdenTrabajoInSituLista_Conditional_37_ForEmpty_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "tr")(1, "td", 58);
    \u0275\u0275text(2, "No hay registros.");
    \u0275\u0275domElementEnd()();
  }
}
function OrdenTrabajoInSituLista_Conditional_37_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275repeaterCreate(0, OrdenTrabajoInSituLista_Conditional_37_For_1_Template, 23, 14, "tr", 28, _forTrack0, false, OrdenTrabajoInSituLista_Conditional_37_ForEmpty_2_Template, 3, 0, "tr");
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275repeater(ctx_r2.ordenes);
  }
}
function OrdenTrabajoInSituLista_Conditional_38_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "div", 59);
    \u0275\u0275domListener("click", function OrdenTrabajoInSituLista_Conditional_38_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r9);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.closeMenu());
    });
    \u0275\u0275domElementEnd();
  }
}
var ESTADO_FINALIZADO = 3;
var ESTADO_RECHAZADO = 51;
var OrdenTrabajoInSituLista = class _OrdenTrabajoInSituLista {
  reportOrdenService;
  ordenTrabajoService;
  authService;
  zone;
  toastrAlert;
  nuevaOrden = new EventEmitter();
  editar = new EventEmitter();
  loading = true;
  ordenes = [];
  openMenuId = null;
  procesandoId = null;
  destroy$ = new Subject();
  userAppRole = computed(() => {
    const roles = this.authService.userProfile()?.roles ?? [];
    return Object.values(AppRole).find((r) => roles.includes(r)) ?? null;
  }, ...ngDevMode ? [{ debugName: "userAppRole" }] : []);
  canFinalizar = computed(() => {
    const role = this.userAppRole();
    return role ? hasPermission(MenuKey.ORDEN_TRABAJO_IN_SITU, role, "autorizar") : false;
  }, ...ngDevMode ? [{ debugName: "canFinalizar" }] : []);
  canRechazar = computed(() => {
    const role = this.userAppRole();
    return role ? hasPermission(MenuKey.ORDEN_TRABAJO_IN_SITU, role, "rechazar") : false;
  }, ...ngDevMode ? [{ debugName: "canRechazar" }] : []);
  canEdit = computed(() => {
    const role = this.userAppRole();
    return role ? hasPermission(MenuKey.ORDEN_TRABAJO_IN_SITU, role, "editar") : false;
  }, ...ngDevMode ? [{ debugName: "canEdit" }] : []);
  canDelete = computed(() => {
    const role = this.userAppRole();
    return role ? hasPermission(MenuKey.ORDEN_TRABAJO_IN_SITU, role, "eliminar") : false;
  }, ...ngDevMode ? [{ debugName: "canDelete" }] : []);
  constructor(reportOrdenService, ordenTrabajoService, authService, zone, toastrAlert) {
    this.reportOrdenService = reportOrdenService;
    this.ordenTrabajoService = ordenTrabajoService;
    this.authService = authService;
    this.zone = zone;
    this.toastrAlert = toastrAlert;
  }
  ngOnInit() {
    this.cargarOrdenes();
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  cargarOrdenes() {
    this.loading = true;
    this.reportOrdenService.getOrdenes().pipe(takeUntil(this.destroy$)).subscribe({
      next: (data) => {
        this.ordenes = data;
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
  getIdentificadorSecuencial(orden) {
    const nombre = (orden.ctambiente_nombre ?? "").toLowerCase();
    return nombre.includes("ruido") ? "ORD_RDO" : "ORD_AIR";
  }
  async finalizarOrden(orden) {
    const confirm = await import_sweetalert2.default.fire({
      icon: "question",
      title: "\xBFAutorizar orden?",
      text: `Se autorizar\xE1 la orden ${orden.num_secuencial ?? orden.id}.`,
      showCancelButton: true,
      confirmButtonColor: "#16a34a",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "S\xED, autorizar",
      cancelButtonText: "Cancelar"
    });
    if (!confirm.isConfirmed)
      return;
    this.procesandoId = orden.id;
    const payload = {
      idOrden: orden.id,
      identifcadorSecuecnial: this.getIdentificadorSecuencial(orden),
      ctestado: ESTADO_FINALIZADO
    };
    this.ordenTrabajoService.autorizarOrden(payload).pipe(takeUntil(this.destroy$), finalize(() => {
      this.procesandoId = null;
    })).subscribe({
      next: () => this.zone.run(() => {
        this.toastrAlert.showSuccess("Orden autorizada correctamente.", "\xA1Autorizado!");
        this.cargarOrdenes();
      }),
      error: () => this.zone.run(() => this.toastrAlert.showError("No se pudo autorizar la orden.", "Error"))
    });
  }
  async rechazarOrden(orden) {
    const { isConfirmed } = await import_sweetalert2.default.fire({
      icon: "warning",
      title: "Rechazar orden",
      text: `Se rechazar\xE1 la orden ${orden.num_secuencial ?? orden.id}.`,
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "S\xED, rechazar",
      cancelButtonText: "Cancelar"
    });
    if (!isConfirmed)
      return;
    this.procesandoId = orden.id;
    this.ordenTrabajoService.actualizarOrden(orden.id, {
      solicitud_id: orden.solicitud_id,
      usuario_id: orden.usuario_id,
      entidad_id: orden.entidad_id,
      ctambiente_id: orden.ctambiente_id,
      periodo_id: orden.periodo_id,
      secuencial_id: orden.secuencial_id,
      num_secuencial: orden.num_secuencial,
      ctuso_suelo_id: orden.ctuso_suelo_id,
      ctcaracteristica_horaria_id: orden.ctcaracteristica_horaria_id,
      ctpunto_critico_id: orden.ctpunto_critico_id,
      direccion_pca: orden.direccion_pca,
      telefono_pca: orden.telefono_pca,
      observacion: orden.observacion,
      ctestado_id: ESTADO_RECHAZADO,
      estado: orden.estado,
      ctformulario_id: orden.ctformulario_id
    }).pipe(takeUntil(this.destroy$), finalize(() => {
      this.procesandoId = null;
    })).subscribe({
      next: () => this.zone.run(() => {
        this.toastrAlert.showWarning("Orden rechazada.", "Rechazado");
        this.cargarOrdenes();
      }),
      error: () => this.zone.run(() => this.toastrAlert.showError("No se pudo rechazar la orden.", "Error"))
    });
  }
  editarOrden(orden) {
    this.editar.emit(orden);
  }
  async eliminarOrden(orden) {
    const confirm = await import_sweetalert2.default.fire({
      icon: "warning",
      title: "\xBFEliminar orden?",
      text: `Se eliminar\xE1 la orden ${orden.num_secuencial ?? orden.id}. Esta acci\xF3n no se puede deshacer.`,
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "S\xED, eliminar",
      cancelButtonText: "Cancelar"
    });
    if (!confirm.isConfirmed)
      return;
    this.procesandoId = orden.id;
    this.ordenTrabajoService.deshabilitarOrden(orden.id).pipe(takeUntil(this.destroy$), finalize(() => {
      this.procesandoId = null;
    })).subscribe({
      next: () => this.zone.run(() => {
        this.toastrAlert.showSuccess("Orden eliminada correctamente.", "\xA1Eliminado!");
        this.cargarOrdenes();
      }),
      error: () => this.zone.run(() => this.toastrAlert.showError("No se pudo eliminar la orden.", "Error"))
    });
  }
  imprimirOrden(orden) {
    console.log("[orden-in-situ:imprimir]", orden);
  }
  static \u0275fac = function OrdenTrabajoInSituLista_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _OrdenTrabajoInSituLista)(\u0275\u0275directiveInject(ReportOrdenService), \u0275\u0275directiveInject(OrdenTrabajoService), \u0275\u0275directiveInject(AuthService), \u0275\u0275directiveInject(NgZone), \u0275\u0275directiveInject(ToastrAlertService));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _OrdenTrabajoInSituLista, selectors: [["app-orden-trabajo-in-situ-lista"]], outputs: { nuevaOrden: "nuevaOrden", editar: "editar" }, decls: 39, vars: 2, consts: [[1, "bg-white", "rounded-lg", "shadow-sm", "border", "border-slate-200", "p-6"], [1, "flex", "justify-end", "mb-4"], ["type", "button", 1, "bg-[#1e3a8a]", "text-white", "px-5", "py-2", "rounded", "text-sm", "font-bold", "shadow-md", "hover:bg-[#2541b2]", "transition-all", "flex", "items-center", "gap-2", 3, "click"], ["fill", "none", "viewBox", "0 0 24 24", "stroke", "currentColor", 1, "w-4", "h-4"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M12 4v16m8-8H4"], [1, "border", "border-slate-200", "rounded"], [1, "w-full", "text-sm", "border-collapse", "table-fixed"], [1, "w-[140px]"], [1, "w-[130px]"], [1, "w-[100px]"], [1, "w-[160px]"], [1, "w-[110px]"], [1, "w-[120px]"], [1, "w-[118px]"], [1, "bg-slate-50", "text-[10px]", "font-bold", "text-slate-500", "uppercase", "border-b", "border-slate-200", "tracking-wider"], [1, "px-3", "py-2.5", "border-r", "border-slate-100", "text-left"], [1, "px-3", "py-2.5", "border-r", "border-slate-100", "text-center"], [1, "px-2", "py-2.5", "text-center"], [1, "fixed", "inset-0", "z-40"], [1, "border-b", "border-slate-200", "animate-pulse"], [1, "px-3", "py-3", "border-r", "border-slate-100"], [1, "h-3", "bg-slate-200", "rounded", "w-3/4"], [1, "h-3", "bg-slate-200", "rounded", "w-4/5"], [1, "h-3", "bg-slate-200", "rounded", "w-3/4", "mx-auto"], [1, "h-5", "bg-slate-200", "rounded", "w-4/5", "mx-auto"], [1, "px-2", "py-3"], [1, "flex", "items-center", "justify-center", "gap-1.5"], [1, "h-8", "w-8", "bg-slate-200", "rounded"], [1, "border-b", "border-slate-100", "hover:bg-slate-50", "transition-colors"], [1, "px-3", "py-2.5", "border-r", "border-slate-100", "text-xs", "font-semibold", "text-[#1e3a8a]", "truncate"], [1, "px-3", "py-2.5", "border-r", "border-slate-100", "text-xs", "text-slate-600", "truncate"], [1, "px-3", "py-2.5", "border-r", "border-slate-100", "text-xs", "text-slate-600", "text-center"], [1, "text-[10px]", "font-bold", "px-2", "py-0.5", "rounded", "border", "border-green-400", "text-green-700", "bg-green-50"], [1, "text-[10px]", "font-bold", "px-2", "py-0.5", "rounded", "border", "border-blue-400", "text-blue-700", "bg-blue-50"], [1, "text-[10px]", "font-bold", "px-2", "py-0.5", "rounded", "border", "border-slate-300", "text-slate-500", "bg-slate-50"], [1, "px-3", "py-2.5", "border-r", "border-slate-100", "text-xs", "text-slate-500"], ["type", "button", "title", "Autorizar", 1, "h-8", "w-8", "flex", "items-center", "justify-center", "rounded", "border", "border-green-400", "text-green-700", "bg-green-50", "hover:bg-green-100", "disabled:opacity-40", "disabled:cursor-not-allowed", "transition-colors", "shrink-0", 3, "disabled"], ["type", "button", "title", "Rechazar", 1, "h-8", "w-8", "flex", "items-center", "justify-center", "rounded", "border", "border-red-300", "text-red-600", "bg-red-50", "hover:bg-red-100", "disabled:opacity-40", "disabled:cursor-not-allowed", "transition-colors", "shrink-0", 3, "disabled"], [1, "relative"], ["type", "button", "title", "Autorizar", 1, "h-8", "w-8", "flex", "items-center", "justify-center", "rounded", "border", "border-green-400", "text-green-700", "bg-green-50", "hover:bg-green-100", "disabled:opacity-40", "disabled:cursor-not-allowed", "transition-colors", "shrink-0", 3, "click", "disabled"], ["fill", "none", "viewBox", "0 0 24 24", "stroke", "currentColor", 1, "h-3.5", "w-3.5"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"], ["type", "button", "title", "Rechazar", 1, "h-8", "w-8", "flex", "items-center", "justify-center", "rounded", "border", "border-red-300", "text-red-600", "bg-red-50", "hover:bg-red-100", "disabled:opacity-40", "disabled:cursor-not-allowed", "transition-colors", "shrink-0", 3, "click", "disabled"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"], ["type", "button", "title", "M\xE1s acciones", 1, "h-8", "w-8", "flex", "items-center", "justify-center", "rounded", "border", "border-slate-300", "text-slate-500", "bg-white", "hover:bg-slate-100", "transition-colors", "shrink-0", 3, "click"], ["fill", "currentColor", "viewBox", "0 0 20 20", 1, "h-4", "w-4"], ["d", "M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"], [1, "absolute", "right-0", "top-full", "mt-1", "z-50", "bg-white", "border", "border-slate-200", "rounded-lg", "shadow-lg", "py-1", "w-40"], ["type", "button", 1, "w-full", "flex", "items-center", "gap-2.5", "px-3", "py-2", "text-xs", "text-amber-700", "hover:bg-amber-50"], ["type", "button", 1, "w-full", "flex", "items-center", "gap-2.5", "px-3", "py-2", "text-xs", "text-red-600", "hover:bg-red-50"], [1, "border-t", "border-slate-100", "mt-1", "pt-1"], ["type", "button", 1, "w-full", "flex", "items-center", "gap-2.5", "px-3", "py-2", "text-xs", "text-slate-600", "hover:bg-slate-50", 3, "click"], ["fill", "none", "viewBox", "0 0 24 24", "stroke", "currentColor", 1, "h-3.5", "w-3.5", "shrink-0"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"], ["type", "button", 1, "w-full", "flex", "items-center", "gap-2.5", "px-3", "py-2", "text-xs", "text-amber-700", "hover:bg-amber-50", 3, "click"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"], ["type", "button", 1, "w-full", "flex", "items-center", "gap-2.5", "px-3", "py-2", "text-xs", "text-red-600", "hover:bg-red-50", 3, "click"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"], ["colspan", "8", 1, "p-10", "text-slate-400", "italic", "text-center"], [1, "fixed", "inset-0", "z-40", 3, "click"]], template: function OrdenTrabajoInSituLista_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275domElementStart(0, "div", 0)(1, "div", 1)(2, "button", 2);
      \u0275\u0275domListener("click", function OrdenTrabajoInSituLista_Template_button_click_2_listener() {
        return ctx.nuevaOrden.emit();
      });
      \u0275\u0275namespaceSVG();
      \u0275\u0275domElementStart(3, "svg", 3);
      \u0275\u0275domElement(4, "path", 4);
      \u0275\u0275domElementEnd();
      \u0275\u0275text(5, " Nueva Orden ");
      \u0275\u0275domElementEnd()();
      \u0275\u0275namespaceHTML();
      \u0275\u0275domElementStart(6, "div", 5)(7, "table", 6)(8, "colgroup");
      \u0275\u0275domElement(9, "col", 7)(10, "col", 8)(11, "col", 9)(12, "col", 8)(13, "col", 10)(14, "col", 11)(15, "col", 12)(16, "col", 13);
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(17, "thead")(18, "tr", 14)(19, "th", 15);
      \u0275\u0275text(20, "N\xB0 Orden");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(21, "th", 15);
      \u0275\u0275text(22, "N\xB0 Solicitud");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(23, "th", 15);
      \u0275\u0275text(24, "Ambiente");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(25, "th", 15);
      \u0275\u0275text(26, "Periodo");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(27, "th", 15);
      \u0275\u0275text(28, "Responsable");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(29, "th", 16);
      \u0275\u0275text(30, "Estado");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(31, "th", 15);
      \u0275\u0275text(32, "Fecha creaci\xF3n");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(33, "th", 17);
      \u0275\u0275text(34, "Acciones");
      \u0275\u0275domElementEnd()()();
      \u0275\u0275domElementStart(35, "tbody");
      \u0275\u0275conditionalCreate(36, OrdenTrabajoInSituLista_Conditional_36_Template, 2, 1)(37, OrdenTrabajoInSituLista_Conditional_37_Template, 3, 1);
      \u0275\u0275domElementEnd()()()();
      \u0275\u0275conditionalCreate(38, OrdenTrabajoInSituLista_Conditional_38_Template, 1, 0, "div", 18);
    }
    if (rf & 2) {
      \u0275\u0275advance(36);
      \u0275\u0275conditional(ctx.loading ? 36 : 37);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.openMenuId !== null ? 38 : -1);
    }
  }, dependencies: [CommonModule, DatePipe], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(OrdenTrabajoInSituLista, [{
    type: Component,
    args: [{ selector: "app-orden-trabajo-in-situ-lista", imports: [CommonModule], template: `<div class="bg-white rounded-lg shadow-sm border border-slate-200 p-6">

  <!-- Bot\xF3n nueva orden -->
  <div class="flex justify-end mb-4">
    <button type="button" (click)="nuevaOrden.emit()"
      class="bg-[#1e3a8a] text-white px-5 py-2 rounded text-sm font-bold shadow-md hover:bg-[#2541b2] transition-all flex items-center gap-2">
      <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
      </svg>
      Nueva Orden
    </button>
  </div>

  <!-- Tabla con skeleton loader -->
  <div class="border border-slate-200 rounded">
    <table class="w-full text-sm border-collapse table-fixed">
      <colgroup>
        <col class="w-[140px]">
        <col class="w-[130px]">
        <col class="w-[100px]">
        <col class="w-[130px]">
        <col class="w-[160px]">
        <col class="w-[110px]">
        <col class="w-[120px]">
        <col class="w-[118px]">
      </colgroup>
      <thead>
        <tr class="bg-slate-50 text-[10px] font-bold text-slate-500 uppercase border-b border-slate-200 tracking-wider">
          <th class="px-3 py-2.5 border-r border-slate-100 text-left">N\xB0 Orden</th>
          <th class="px-3 py-2.5 border-r border-slate-100 text-left">N\xB0 Solicitud</th>
          <th class="px-3 py-2.5 border-r border-slate-100 text-left">Ambiente</th>
          <th class="px-3 py-2.5 border-r border-slate-100 text-left">Periodo</th>
          <th class="px-3 py-2.5 border-r border-slate-100 text-left">Responsable</th>
          <th class="px-3 py-2.5 border-r border-slate-100 text-center">Estado</th>
          <th class="px-3 py-2.5 border-r border-slate-100 text-left">Fecha creaci\xF3n</th>
          <th class="px-2 py-2.5 text-center">Acciones</th>
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
              <td class="px-3 py-3 border-r border-slate-100"><div class="h-3 bg-slate-200 rounded w-4/5"></div></td>
              <td class="px-3 py-3 border-r border-slate-100"><div class="h-5 bg-slate-200 rounded w-4/5 mx-auto"></div></td>
              <td class="px-3 py-3 border-r border-slate-100"><div class="h-3 bg-slate-200 rounded w-3/4"></div></td>
              <td class="px-2 py-3">
                <div class="flex items-center justify-center gap-1.5">
                  <div class="h-8 w-8 bg-slate-200 rounded"></div>
                  <div class="h-8 w-8 bg-slate-200 rounded"></div>
                  <div class="h-8 w-8 bg-slate-200 rounded"></div>
                </div>
              </td>
            </tr>
          }
        } @else {
          @for (orden of ordenes; track orden.id) {
            <tr class="border-b border-slate-100 hover:bg-slate-50 transition-colors">
              <td class="px-3 py-2.5 border-r border-slate-100 text-xs font-semibold text-[#1e3a8a] truncate">
                {{ orden.num_secuencial ?? '\u2014' }}
              </td>
              <td class="px-3 py-2.5 border-r border-slate-100 text-xs text-slate-600 truncate">
                {{ orden.solicitud_num_secuencial }}
              </td>
              <td class="px-3 py-2.5 border-r border-slate-100 text-xs text-slate-600 truncate">
                {{ orden.ctambiente_nombre }}
              </td>
              <td class="px-3 py-2.5 border-r border-slate-100 text-xs text-slate-600 text-center">
                {{ orden.periodo_nombre_mes }} {{ orden.periodo_anio }}
              </td>
              <td class="px-3 py-2.5 border-r border-slate-100 text-xs text-slate-600 truncate">
                {{ orden.usuario_nombre_completo }}
              </td>
              <td class="px-3 py-2.5 border-r border-slate-100 text-center">
                @if (orden.ctestado_id === 3) {
                  <span class="text-[10px] font-bold px-2 py-0.5 rounded border border-green-400 text-green-700 bg-green-50">{{ orden.ctestado_nombre }}</span>
                } @else if (orden.ctestado_id === 388) {
                  <span class="text-[10px] font-bold px-2 py-0.5 rounded border border-blue-400 text-blue-700 bg-blue-50">{{ orden.ctestado_nombre }}</span>
                } @else {
                  <span class="text-[10px] font-bold px-2 py-0.5 rounded border border-slate-300 text-slate-500 bg-slate-50">{{ orden.ctestado_nombre }}</span>
                }
              </td>
              <td class="px-3 py-2.5 border-r border-slate-100 text-xs text-slate-500">
                {{ +orden.creado_en | date:'dd/MM/yyyy' }}
              </td>
              <td class="px-2 py-2.5 text-center">
                <div class="flex items-center justify-center gap-1.5">
                  @if (canFinalizar()) {
                    <button type="button" title="Autorizar"
                      (click)="finalizarOrden(orden)"
                      [disabled]="procesandoId === orden.id"
                      class="h-8 w-8 flex items-center justify-center rounded border border-green-400 text-green-700 bg-green-50 hover:bg-green-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors shrink-0">
                      <svg class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </button>
                  }
                  @if (canRechazar()) {
                    <button type="button" title="Rechazar"
                      (click)="rechazarOrden(orden)"
                      [disabled]="procesandoId === orden.id"
                      class="h-8 w-8 flex items-center justify-center rounded border border-red-300 text-red-600 bg-red-50 hover:bg-red-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors shrink-0">
                      <svg class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </button>
                  }
                  @if (canEdit() || canDelete()) {
                  <div class="relative">
                    <button type="button" title="M\xE1s acciones"
                      (click)="toggleMenu(orden.id, $event)"
                      class="h-8 w-8 flex items-center justify-center rounded border border-slate-300 text-slate-500 bg-white hover:bg-slate-100 transition-colors shrink-0">
                      <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"/>
                      </svg>
                    </button>
                    @if (openMenuId === orden.id) {
                      <div class="absolute right-0 top-full mt-1 z-50 bg-white border border-slate-200 rounded-lg shadow-lg py-1 w-40">
                        @if (canEdit()) {
                          <button type="button" (click)="editarOrden(orden); closeMenu()"
                            class="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-amber-700 hover:bg-amber-50">
                            <svg class="h-3.5 w-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                            Editar
                          </button>
                        }
                        @if (canDelete()) {
                          <button type="button" (click)="eliminarOrden(orden); closeMenu()"
                            class="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-red-600 hover:bg-red-50">
                            <svg class="h-3.5 w-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                            Eliminar
                          </button>
                        }
                        <div class="border-t border-slate-100 mt-1 pt-1">
                          <button type="button" (click)="imprimirOrden(orden); closeMenu()"
                            class="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-slate-600 hover:bg-slate-50">
                            <svg class="h-3.5 w-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                            </svg>
                            Imprimir
                          </button>
                        </div>
                      </div>
                    }
                  </div>
                  }
                </div>
              </td>
            </tr>
          } @empty {
            <tr>
              <td colspan="8" class="p-10 text-slate-400 italic text-center">No hay registros.</td>
            </tr>
          }
        }
      </tbody>
    </table>
  </div>

</div>

@if (openMenuId !== null) {
  <div class="fixed inset-0 z-40" (click)="closeMenu()"></div>
}
` }]
  }], () => [{ type: ReportOrdenService }, { type: OrdenTrabajoService }, { type: AuthService }, { type: NgZone }, { type: ToastrAlertService }], { nuevaOrden: [{
    type: Output
  }], editar: [{
    type: Output
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(OrdenTrabajoInSituLista, { className: "OrdenTrabajoInSituLista", filePath: "src/app/features/orden-trabajo-in-situ/lista/orden-trabajo-in-situ-lista.ts", lineNumber: 21 });
})();

// src/app/features/orden-trabajo-in-situ/formulario/orden-trabajo-in-situ-formulario.ts
var import_sweetalert22 = __toESM(require_sweetalert2_all());
var _c02 = () => ({ standalone: true });
var _forTrack02 = ($index, $item) => $item.id;
var _forTrack1 = ($index, $item) => $item.id_solicitud;
var _forTrack2 = ($index, $item) => $item.pregunta;
function OrdenTrabajoInSituFormulario_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 5);
    \u0275\u0275element(1, "span", 50);
    \u0275\u0275elementEnd();
  }
}
function OrdenTrabajoInSituFormulario_Conditional_12_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 53);
    \u0275\u0275listener("click", function OrdenTrabajoInSituFormulario_Conditional_12_Conditional_3_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.limpiarSolicitud());
    });
    \u0275\u0275text(1, " \u2715 ");
    \u0275\u0275elementEnd();
  }
}
function OrdenTrabajoInSituFormulario_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 9)(1, "span", 51);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(3, OrdenTrabajoInSituFormulario_Conditional_12_Conditional_3_Template, 2, 0, "button", 52);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r1.solicitudSeleccionada.num_secuencial ?? ctx_r1.solicitudSeleccionada.id_solicitud, " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(!ctx_r1.modoEdicion ? 3 : -1);
  }
}
function OrdenTrabajoInSituFormulario_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 54);
    \u0275\u0275listener("click", function OrdenTrabajoInSituFormulario_Conditional_13_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.abrirPanel());
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 55);
    \u0275\u0275element(2, "path", 56);
    \u0275\u0275elementEnd();
    \u0275\u0275text(3, " Buscar solicitud finalizada... ");
    \u0275\u0275elementEnd();
  }
}
function OrdenTrabajoInSituFormulario_Conditional_14_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 60);
    \u0275\u0275text(1, "Buscando...");
    \u0275\u0275elementEnd();
  }
}
function OrdenTrabajoInSituFormulario_Conditional_14_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 60);
    \u0275\u0275text(1, "No se encontraron solicitudes finalizadas.");
    \u0275\u0275elementEnd();
  }
}
function OrdenTrabajoInSituFormulario_Conditional_14_Conditional_7_For_2_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 68);
    \u0275\u0275text(1, "Urgente");
    \u0275\u0275elementEnd();
  }
}
function OrdenTrabajoInSituFormulario_Conditional_14_Conditional_7_For_2_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 69);
    \u0275\u0275text(1, "Normal");
    \u0275\u0275elementEnd();
  }
}
function OrdenTrabajoInSituFormulario_Conditional_14_Conditional_7_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "li", 64);
    \u0275\u0275listener("click", function OrdenTrabajoInSituFormulario_Conditional_14_Conditional_7_For_2_Template_li_click_0_listener() {
      const sol_r6 = \u0275\u0275restoreView(_r5).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.seleccionarSolicitud(sol_r6));
    });
    \u0275\u0275elementStart(1, "div", 65)(2, "span", 66);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span", 67);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(6, OrdenTrabajoInSituFormulario_Conditional_14_Conditional_7_For_2_Conditional_6_Template, 2, 0, "span", 68)(7, OrdenTrabajoInSituFormulario_Conditional_14_Conditional_7_For_2_Conditional_7_Template, 2, 0, "span", 69);
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
function OrdenTrabajoInSituFormulario_Conditional_14_Conditional_7_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 63)(1, "span", 70);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 71)(4, "button", 72);
    \u0275\u0275listener("click", function OrdenTrabajoInSituFormulario_Conditional_14_Conditional_7_Conditional_3_Template_button_click_4_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.cargarPagina(ctx_r1.currentPage - 1));
    });
    \u0275\u0275text(5, "\u2039");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "button", 72);
    \u0275\u0275listener("click", function OrdenTrabajoInSituFormulario_Conditional_14_Conditional_7_Conditional_3_Template_button_click_6_listener() {
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
    \u0275\u0275textInterpolate3(" P\xE1gina ", ctx_r1.meta.page, " de ", ctx_r1.meta.totalPages, " \xB7 ", ctx_r1.meta.total, " resultados ");
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", !ctx_r1.meta.hasPrevPage);
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", !ctx_r1.meta.hasNextPage);
  }
}
function OrdenTrabajoInSituFormulario_Conditional_14_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "ul", 61);
    \u0275\u0275repeaterCreate(1, OrdenTrabajoInSituFormulario_Conditional_14_Conditional_7_For_2_Template, 8, 3, "li", 62, _forTrack1);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(3, OrdenTrabajoInSituFormulario_Conditional_14_Conditional_7_Conditional_3_Template, 8, 5, "div", 63);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.solicitudesFinalizadas);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.meta && ctx_r1.meta.totalPages > 1 ? 3 : -1);
  }
}
function OrdenTrabajoInSituFormulario_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 11)(1, "div", 57)(2, "input", 58);
    \u0275\u0275listener("ngModelChange", function OrdenTrabajoInSituFormulario_Conditional_14_Template_input_ngModelChange_2_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onBusquedaChange($event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "button", 59);
    \u0275\u0275listener("click", function OrdenTrabajoInSituFormulario_Conditional_14_Template_button_click_3_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.cerrarPanel());
    });
    \u0275\u0275text(4, "\u2715");
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(5, OrdenTrabajoInSituFormulario_Conditional_14_Conditional_5_Template, 2, 0, "p", 60)(6, OrdenTrabajoInSituFormulario_Conditional_14_Conditional_6_Template, 2, 0, "p", 60)(7, OrdenTrabajoInSituFormulario_Conditional_14_Conditional_7_Template, 4, 1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275property("ngModel", ctx_r1.busqueda)("ngModelOptions", \u0275\u0275pureFunction0(3, _c02));
    \u0275\u0275advance(3);
    \u0275\u0275conditional(ctx_r1.loadingBusqueda ? 5 : ctx_r1.solicitudesFinalizadas.length === 0 ? 6 : 7);
  }
}
function OrdenTrabajoInSituFormulario_For_24_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 14);
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
function OrdenTrabajoInSituFormulario_Conditional_60_For_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 6)(1, "label", 7);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 73);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const attr_r9 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(attr_r9.pregunta);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", attr_r9.valor || "\u2014", " ");
  }
}
function OrdenTrabajoInSituFormulario_Conditional_60_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "section", 27)(1, "div", 20)(2, "h4", 21);
    \u0275\u0275text(3, "Operador");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "div", 22);
    \u0275\u0275repeaterCreate(5, OrdenTrabajoInSituFormulario_Conditional_60_For_6_Template, 5, 2, "div", 6, _forTrack2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275repeater(ctx_r1.operadorAtributos);
  }
}
function OrdenTrabajoInSituFormulario_Conditional_83_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td", 74);
    \u0275\u0275text(2, "No hay ensayos para el tipo de ensayo seleccionado.");
    \u0275\u0275elementEnd()();
  }
}
function OrdenTrabajoInSituFormulario_For_85_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr", 37)(1, "td", 75)(2, "div", 76)(3, "div", 77);
    \u0275\u0275element(4, "span", 78);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "span", 79);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(7, "td", 80);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "td", 80);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "td", 80);
    \u0275\u0275text(12);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "td", 80);
    \u0275\u0275text(14);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "td", 81);
    \u0275\u0275text(16);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    let tmp_11_0;
    let tmp_12_0;
    let tmp_13_0;
    let tmp_14_0;
    let tmp_15_0;
    let tmp_16_0;
    let tmp_17_0;
    let tmp_18_0;
    let tmp_19_0;
    let tmp_20_0;
    let tmp_21_0;
    let tmp_22_0;
    const ensayo_r10 = ctx.$implicit;
    \u0275\u0275advance(3);
    \u0275\u0275classProp("bg-[#1e3a8a]", (tmp_11_0 = ensayo_r10.get("seleccionado")) == null ? null : tmp_11_0.value)("bg-slate-300", !((tmp_12_0 = ensayo_r10.get("seleccionado")) == null ? null : tmp_12_0.value));
    \u0275\u0275advance();
    \u0275\u0275classProp("translate-x-4", (tmp_13_0 = ensayo_r10.get("seleccionado")) == null ? null : tmp_13_0.value)("translate-x-0", !((tmp_14_0 = ensayo_r10.get("seleccionado")) == null ? null : tmp_14_0.value));
    \u0275\u0275advance();
    \u0275\u0275classProp("text-[#1e3a8a]", (tmp_15_0 = ensayo_r10.get("seleccionado")) == null ? null : tmp_15_0.value)("text-slate-400", !((tmp_16_0 = ensayo_r10.get("seleccionado")) == null ? null : tmp_16_0.value));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ((tmp_17_0 = ensayo_r10.get("seleccionado")) == null ? null : tmp_17_0.value) ? "S\xED" : "No", " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(((tmp_18_0 = ensayo_r10.get("ensayo")) == null ? null : tmp_18_0.value) || "\u2014");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(((tmp_19_0 = ensayo_r10.get("identificacion")) == null ? null : tmp_19_0.value) || "\u2014");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(((tmp_20_0 = ensayo_r10.get("metodoInterno")) == null ? null : tmp_20_0.value) || "\u2014");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(((tmp_21_0 = ensayo_r10.get("metodoReferencia")) == null ? null : tmp_21_0.value) || "\u2014");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(((tmp_22_0 = ensayo_r10.get("unidad")) == null ? null : tmp_22_0.value) || "\u2014");
  }
}
function OrdenTrabajoInSituFormulario_Conditional_86_For_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 14);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const op_r11 = ctx.$implicit;
    \u0275\u0275property("ngValue", op_r11.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(op_r11.nombre);
  }
}
function OrdenTrabajoInSituFormulario_Conditional_86_Conditional_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 84);
    \u0275\u0275text(1, "Este campo es obligatorio.");
    \u0275\u0275elementEnd();
  }
}
function OrdenTrabajoInSituFormulario_Conditional_86_Conditional_16_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 84);
    \u0275\u0275text(1, "Este campo es obligatorio.");
    \u0275\u0275elementEnd();
  }
}
function OrdenTrabajoInSituFormulario_Conditional_86_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 85)(1, "label", 82);
    \u0275\u0275text(2, " Otro - Uso de suelo del Operador ");
    \u0275\u0275elementStart(3, "span", 8);
    \u0275\u0275text(4, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275element(5, "input", 90);
    \u0275\u0275conditionalCreate(6, OrdenTrabajoInSituFormulario_Conditional_86_Conditional_16_Conditional_6_Template, 2, 0, "span", 84);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_2_0;
    let tmp_3_0;
    let tmp_4_0;
    let tmp_5_0;
    let tmp_6_0;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275classProp("text-red-600", ((tmp_2_0 = ctx_r1.form.get("usoSuelo.usoSueloOperadorOtro")) == null ? null : tmp_2_0.invalid) && ((tmp_2_0 = ctx_r1.form.get("usoSuelo.usoSueloOperadorOtro")) == null ? null : tmp_2_0.touched))("text-[#1e3a8a]", !(((tmp_3_0 = ctx_r1.form.get("usoSuelo.usoSueloOperadorOtro")) == null ? null : tmp_3_0.invalid) && ((tmp_3_0 = ctx_r1.form.get("usoSuelo.usoSueloOperadorOtro")) == null ? null : tmp_3_0.touched)));
    \u0275\u0275advance(4);
    \u0275\u0275classProp("border-red-400", ((tmp_4_0 = ctx_r1.form.get("usoSuelo.usoSueloOperadorOtro")) == null ? null : tmp_4_0.invalid) && ((tmp_4_0 = ctx_r1.form.get("usoSuelo.usoSueloOperadorOtro")) == null ? null : tmp_4_0.touched))("border-slate-300", !(((tmp_5_0 = ctx_r1.form.get("usoSuelo.usoSueloOperadorOtro")) == null ? null : tmp_5_0.invalid) && ((tmp_5_0 = ctx_r1.form.get("usoSuelo.usoSueloOperadorOtro")) == null ? null : tmp_5_0.touched)));
    \u0275\u0275advance();
    \u0275\u0275conditional(((tmp_6_0 = ctx_r1.form.get("usoSuelo.usoSueloOperadorOtro")) == null ? null : tmp_6_0.invalid) && ((tmp_6_0 = ctx_r1.form.get("usoSuelo.usoSueloOperadorOtro")) == null ? null : tmp_6_0.touched) ? 6 : -1);
  }
}
function OrdenTrabajoInSituFormulario_Conditional_86_For_26_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 14);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const op_r12 = ctx.$implicit;
    \u0275\u0275property("ngValue", op_r12.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(op_r12.nombre);
  }
}
function OrdenTrabajoInSituFormulario_Conditional_86_Conditional_27_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 84);
    \u0275\u0275text(1, "Este campo es obligatorio.");
    \u0275\u0275elementEnd();
  }
}
function OrdenTrabajoInSituFormulario_Conditional_86_Conditional_28_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 84);
    \u0275\u0275text(1, "Este campo es obligatorio.");
    \u0275\u0275elementEnd();
  }
}
function OrdenTrabajoInSituFormulario_Conditional_86_Conditional_28_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 85)(1, "label", 82);
    \u0275\u0275text(2, " Otro - Uso de suelo del PCA ");
    \u0275\u0275elementStart(3, "span", 8);
    \u0275\u0275text(4, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275element(5, "input", 91);
    \u0275\u0275conditionalCreate(6, OrdenTrabajoInSituFormulario_Conditional_86_Conditional_28_Conditional_6_Template, 2, 0, "span", 84);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_2_0;
    let tmp_3_0;
    let tmp_4_0;
    let tmp_5_0;
    let tmp_6_0;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275classProp("text-red-600", ((tmp_2_0 = ctx_r1.form.get("usoSuelo.usoSueloPcaOtro")) == null ? null : tmp_2_0.invalid) && ((tmp_2_0 = ctx_r1.form.get("usoSuelo.usoSueloPcaOtro")) == null ? null : tmp_2_0.touched))("text-[#1e3a8a]", !(((tmp_3_0 = ctx_r1.form.get("usoSuelo.usoSueloPcaOtro")) == null ? null : tmp_3_0.invalid) && ((tmp_3_0 = ctx_r1.form.get("usoSuelo.usoSueloPcaOtro")) == null ? null : tmp_3_0.touched)));
    \u0275\u0275advance(4);
    \u0275\u0275classProp("border-red-400", ((tmp_4_0 = ctx_r1.form.get("usoSuelo.usoSueloPcaOtro")) == null ? null : tmp_4_0.invalid) && ((tmp_4_0 = ctx_r1.form.get("usoSuelo.usoSueloPcaOtro")) == null ? null : tmp_4_0.touched))("border-slate-300", !(((tmp_5_0 = ctx_r1.form.get("usoSuelo.usoSueloPcaOtro")) == null ? null : tmp_5_0.invalid) && ((tmp_5_0 = ctx_r1.form.get("usoSuelo.usoSueloPcaOtro")) == null ? null : tmp_5_0.touched)));
    \u0275\u0275advance();
    \u0275\u0275conditional(((tmp_6_0 = ctx_r1.form.get("usoSuelo.usoSueloPcaOtro")) == null ? null : tmp_6_0.invalid) && ((tmp_6_0 = ctx_r1.form.get("usoSuelo.usoSueloPcaOtro")) == null ? null : tmp_6_0.touched) ? 6 : -1);
  }
}
function OrdenTrabajoInSituFormulario_Conditional_86_For_38_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 14);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const op_r13 = ctx.$implicit;
    \u0275\u0275property("ngValue", op_r13.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(op_r13.nombre);
  }
}
function OrdenTrabajoInSituFormulario_Conditional_86_Conditional_39_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 84);
    \u0275\u0275text(1, "Este campo es obligatorio.");
    \u0275\u0275elementEnd();
  }
}
function OrdenTrabajoInSituFormulario_Conditional_86_Conditional_46_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 84);
    \u0275\u0275text(1, "Este campo es obligatorio.");
    \u0275\u0275elementEnd();
  }
}
function OrdenTrabajoInSituFormulario_Conditional_86_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "section", 38)(1, "div", 20)(2, "h4", 21);
    \u0275\u0275text(3, "Tipos de uso de suelo");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "div", 22)(5, "div", 6)(6, "label", 82);
    \u0275\u0275text(7, " Uso de suelo del Operador ");
    \u0275\u0275elementStart(8, "span", 8);
    \u0275\u0275text(9, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "select", 83)(11, "option", 13);
    \u0275\u0275text(12, "Seleccione...");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(13, OrdenTrabajoInSituFormulario_Conditional_86_For_14_Template, 2, 2, "option", 14, _forTrack02);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(15, OrdenTrabajoInSituFormulario_Conditional_86_Conditional_15_Template, 2, 0, "span", 84);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(16, OrdenTrabajoInSituFormulario_Conditional_86_Conditional_16_Template, 7, 9, "div", 85);
    \u0275\u0275elementStart(17, "div", 6)(18, "label", 82);
    \u0275\u0275text(19, " Uso de suelo del punto cr\xEDtico de afectaci\xF3n (PCA) ");
    \u0275\u0275elementStart(20, "span", 8);
    \u0275\u0275text(21, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(22, "select", 86)(23, "option", 13);
    \u0275\u0275text(24, "Seleccione...");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(25, OrdenTrabajoInSituFormulario_Conditional_86_For_26_Template, 2, 2, "option", 14, _forTrack02);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(27, OrdenTrabajoInSituFormulario_Conditional_86_Conditional_27_Template, 2, 0, "span", 84);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(28, OrdenTrabajoInSituFormulario_Conditional_86_Conditional_28_Template, 7, 9, "div", 85);
    \u0275\u0275elementStart(29, "div", 6)(30, "label", 82);
    \u0275\u0275text(31, " Caracterizaci\xF3n horaria ");
    \u0275\u0275elementStart(32, "span", 8);
    \u0275\u0275text(33, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(34, "select", 87)(35, "option", 13);
    \u0275\u0275text(36, "Seleccione...");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(37, OrdenTrabajoInSituFormulario_Conditional_86_For_38_Template, 2, 2, "option", 14, _forTrack02);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(39, OrdenTrabajoInSituFormulario_Conditional_86_Conditional_39_Template, 2, 0, "span", 84);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(40, "div", 6)(41, "label", 82);
    \u0275\u0275text(42, " Direcci\xF3n PCA ");
    \u0275\u0275elementStart(43, "span", 8);
    \u0275\u0275text(44, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275element(45, "input", 88);
    \u0275\u0275conditionalCreate(46, OrdenTrabajoInSituFormulario_Conditional_86_Conditional_46_Template, 2, 0, "span", 84);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(47, "div", 6)(48, "label", 7);
    \u0275\u0275text(49, "Tel\xE9fono PCA");
    \u0275\u0275elementEnd();
    \u0275\u0275element(50, "input", 89);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    let tmp_1_0;
    let tmp_2_0;
    let tmp_3_0;
    let tmp_4_0;
    let tmp_7_0;
    let tmp_9_0;
    let tmp_10_0;
    let tmp_11_0;
    let tmp_12_0;
    let tmp_15_0;
    let tmp_17_0;
    let tmp_18_0;
    let tmp_19_0;
    let tmp_20_0;
    let tmp_23_0;
    let tmp_24_0;
    let tmp_25_0;
    let tmp_26_0;
    let tmp_27_0;
    let tmp_28_0;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(6);
    \u0275\u0275classProp("text-red-600", ((tmp_1_0 = ctx_r1.form.get("usoSuelo.usoSueloOperadorId")) == null ? null : tmp_1_0.invalid) && ((tmp_1_0 = ctx_r1.form.get("usoSuelo.usoSueloOperadorId")) == null ? null : tmp_1_0.touched))("text-[#1e3a8a]", !(((tmp_2_0 = ctx_r1.form.get("usoSuelo.usoSueloOperadorId")) == null ? null : tmp_2_0.invalid) && ((tmp_2_0 = ctx_r1.form.get("usoSuelo.usoSueloOperadorId")) == null ? null : tmp_2_0.touched)));
    \u0275\u0275advance(4);
    \u0275\u0275classProp("border-red-400", ((tmp_3_0 = ctx_r1.form.get("usoSuelo.usoSueloOperadorId")) == null ? null : tmp_3_0.invalid) && ((tmp_3_0 = ctx_r1.form.get("usoSuelo.usoSueloOperadorId")) == null ? null : tmp_3_0.touched))("border-slate-300", !(((tmp_4_0 = ctx_r1.form.get("usoSuelo.usoSueloOperadorId")) == null ? null : tmp_4_0.invalid) && ((tmp_4_0 = ctx_r1.form.get("usoSuelo.usoSueloOperadorId")) == null ? null : tmp_4_0.touched)));
    \u0275\u0275advance();
    \u0275\u0275property("ngValue", null);
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r1.usoSueloOpciones);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(((tmp_7_0 = ctx_r1.form.get("usoSuelo.usoSueloOperadorId")) == null ? null : tmp_7_0.invalid) && ((tmp_7_0 = ctx_r1.form.get("usoSuelo.usoSueloOperadorId")) == null ? null : tmp_7_0.touched) ? 15 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.esOtrosOperador ? 16 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275classProp("text-red-600", ((tmp_9_0 = ctx_r1.form.get("usoSuelo.usoSueloPcaId")) == null ? null : tmp_9_0.invalid) && ((tmp_9_0 = ctx_r1.form.get("usoSuelo.usoSueloPcaId")) == null ? null : tmp_9_0.touched))("text-[#1e3a8a]", !(((tmp_10_0 = ctx_r1.form.get("usoSuelo.usoSueloPcaId")) == null ? null : tmp_10_0.invalid) && ((tmp_10_0 = ctx_r1.form.get("usoSuelo.usoSueloPcaId")) == null ? null : tmp_10_0.touched)));
    \u0275\u0275advance(4);
    \u0275\u0275classProp("border-red-400", ((tmp_11_0 = ctx_r1.form.get("usoSuelo.usoSueloPcaId")) == null ? null : tmp_11_0.invalid) && ((tmp_11_0 = ctx_r1.form.get("usoSuelo.usoSueloPcaId")) == null ? null : tmp_11_0.touched))("border-slate-300", !(((tmp_12_0 = ctx_r1.form.get("usoSuelo.usoSueloPcaId")) == null ? null : tmp_12_0.invalid) && ((tmp_12_0 = ctx_r1.form.get("usoSuelo.usoSueloPcaId")) == null ? null : tmp_12_0.touched)));
    \u0275\u0275advance();
    \u0275\u0275property("ngValue", null);
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r1.usoSueloOpciones);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(((tmp_15_0 = ctx_r1.form.get("usoSuelo.usoSueloPcaId")) == null ? null : tmp_15_0.invalid) && ((tmp_15_0 = ctx_r1.form.get("usoSuelo.usoSueloPcaId")) == null ? null : tmp_15_0.touched) ? 27 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.esOtrosPca ? 28 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275classProp("text-red-600", ((tmp_17_0 = ctx_r1.form.get("usoSuelo.caracterizacionId")) == null ? null : tmp_17_0.invalid) && ((tmp_17_0 = ctx_r1.form.get("usoSuelo.caracterizacionId")) == null ? null : tmp_17_0.touched))("text-[#1e3a8a]", !(((tmp_18_0 = ctx_r1.form.get("usoSuelo.caracterizacionId")) == null ? null : tmp_18_0.invalid) && ((tmp_18_0 = ctx_r1.form.get("usoSuelo.caracterizacionId")) == null ? null : tmp_18_0.touched)));
    \u0275\u0275advance(4);
    \u0275\u0275classProp("border-red-400", ((tmp_19_0 = ctx_r1.form.get("usoSuelo.caracterizacionId")) == null ? null : tmp_19_0.invalid) && ((tmp_19_0 = ctx_r1.form.get("usoSuelo.caracterizacionId")) == null ? null : tmp_19_0.touched))("border-slate-300", !(((tmp_20_0 = ctx_r1.form.get("usoSuelo.caracterizacionId")) == null ? null : tmp_20_0.invalid) && ((tmp_20_0 = ctx_r1.form.get("usoSuelo.caracterizacionId")) == null ? null : tmp_20_0.touched)));
    \u0275\u0275advance();
    \u0275\u0275property("ngValue", null);
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r1.caracterizacionOpciones);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(((tmp_23_0 = ctx_r1.form.get("usoSuelo.caracterizacionId")) == null ? null : tmp_23_0.invalid) && ((tmp_23_0 = ctx_r1.form.get("usoSuelo.caracterizacionId")) == null ? null : tmp_23_0.touched) ? 39 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275classProp("text-red-600", ((tmp_24_0 = ctx_r1.form.get("usoSuelo.direccionPca")) == null ? null : tmp_24_0.invalid) && ((tmp_24_0 = ctx_r1.form.get("usoSuelo.direccionPca")) == null ? null : tmp_24_0.touched))("text-[#1e3a8a]", !(((tmp_25_0 = ctx_r1.form.get("usoSuelo.direccionPca")) == null ? null : tmp_25_0.invalid) && ((tmp_25_0 = ctx_r1.form.get("usoSuelo.direccionPca")) == null ? null : tmp_25_0.touched)));
    \u0275\u0275advance(4);
    \u0275\u0275classProp("border-red-400", ((tmp_26_0 = ctx_r1.form.get("usoSuelo.direccionPca")) == null ? null : tmp_26_0.invalid) && ((tmp_26_0 = ctx_r1.form.get("usoSuelo.direccionPca")) == null ? null : tmp_26_0.touched))("border-slate-300", !(((tmp_27_0 = ctx_r1.form.get("usoSuelo.direccionPca")) == null ? null : tmp_27_0.invalid) && ((tmp_27_0 = ctx_r1.form.get("usoSuelo.direccionPca")) == null ? null : tmp_27_0.touched)));
    \u0275\u0275advance();
    \u0275\u0275conditional(((tmp_28_0 = ctx_r1.form.get("usoSuelo.direccionPca")) == null ? null : tmp_28_0.invalid) && ((tmp_28_0 = ctx_r1.form.get("usoSuelo.direccionPca")) == null ? null : tmp_28_0.touched) ? 46 : -1);
  }
}
function OrdenTrabajoInSituFormulario_Conditional_108_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 92);
    \u0275\u0275text(1);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.modoEdicion ? "Actualizando..." : "Guardando...", " ");
  }
}
function OrdenTrabajoInSituFormulario_Conditional_109_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275textInterpolate1(" ", ctx_r1.modoEdicion ? "ACTUALIZAR" : "GUARDAR", " ");
  }
}
var TECNICOS_HARDCODED = [
  { id: "jose-luis-montenegro", nombre: "Jos\xE9 Luis Montenegro", cargo: "T\xE9cnico/a de Muestreo en Campo" }
];
var OrdenTrabajoInSituFormulario = class _OrdenTrabajoInSituFormulario {
  fb;
  reportSolicitudService;
  solicitudDetalleService;
  catalogoService;
  ordenTrabajoService;
  reportOrdenService;
  authService;
  periodoService;
  toastrAlert;
  editingRecord = null;
  guardado = new EventEmitter();
  cancelado = new EventEmitter();
  modoEdicion = false;
  form;
  CATALOGO_TIPO_ENSAYO = 17;
  CATALOGO_USO_SUELO = 1003;
  CATALOGO_CARACTERIZACION = 1005;
  TIPOS_ENSAYO_PERMITIDOS = [90, 91];
  OTROS_ID = 2015;
  tiposEnsayo = [];
  usoSueloOpciones = [];
  caracterizacionOpciones = [];
  loadingTipos = true;
  tipoEnsayoId = null;
  panelAbierto = false;
  loadingBusqueda = false;
  todasSolicitudes = [];
  solicitudesFinalizadas = [];
  meta = null;
  currentPage = 1;
  PAGE_SIZE = 8;
  busqueda = "";
  solicitudSeleccionada = null;
  loadingDetalle = false;
  saving = false;
  tecnicos = TECNICOS_HARDCODED;
  operadorAtributos = [];
  destroy$ = new Subject();
  get esOtrosOperador() {
    return this.form.get("usoSuelo.usoSueloOperadorId")?.value === this.OTROS_ID;
  }
  get esOtrosPca() {
    return this.form.get("usoSuelo.usoSueloPcaId")?.value === this.OTROS_ID;
  }
  get ensayosArray() {
    return this.form.get("ensayos");
  }
  constructor(fb, reportSolicitudService, solicitudDetalleService, catalogoService, ordenTrabajoService, reportOrdenService, authService, periodoService, toastrAlert) {
    this.fb = fb;
    this.reportSolicitudService = reportSolicitudService;
    this.solicitudDetalleService = solicitudDetalleService;
    this.catalogoService = catalogoService;
    this.ordenTrabajoService = ordenTrabajoService;
    this.reportOrdenService = reportOrdenService;
    this.authService = authService;
    this.periodoService = periodoService;
    this.toastrAlert = toastrAlert;
    this.form = this.fb.group({
      solicitudTrabajoNo: [""],
      ordenTrabajoNo: [""],
      fechaMaximaEntrega: [""],
      fechaEmision: [""],
      cliente: this.fb.group({
        solicitadoPor: [""],
        direccion: [""],
        solicitudNo: [""],
        correoElectronico: [""]
      }),
      operador: this.fb.group({
        razonSocial: [""],
        nombreComercial: [""],
        ruc: [""],
        direccion: [""]
      }),
      ensayos: this.fb.array([]),
      observaciones: [""],
      usoSuelo: this.fb.group({
        usoSueloOperadorId: [null, Validators.required],
        usoSueloOperadorOtro: [""],
        usoSueloPcaId: [null, Validators.required],
        usoSueloPcaOtro: [""],
        caracterizacionId: [null, Validators.required],
        direccionPca: ["", Validators.required],
        telefonoPca: [""]
      })
    });
  }
  ngOnChanges(changes) {
    if (changes["editingRecord"] && this.editingRecord) {
      this.cargarParaEditar(this.editingRecord);
    }
    if (changes["editingRecord"] && !this.editingRecord) {
      this.modoEdicion = false;
    }
  }
  ngOnInit() {
    this.catalogoService.getItemsByCatalogoId(this.CATALOGO_TIPO_ENSAYO).pipe(takeUntil(this.destroy$)).subscribe({ next: (res) => {
      this.tiposEnsayo = res.data.filter((t) => this.TIPOS_ENSAYO_PERMITIDOS.includes(t.id));
      this.loadingTipos = false;
    } });
    this.catalogoService.getItemsByCatalogoId(this.CATALOGO_USO_SUELO).pipe(takeUntil(this.destroy$)).subscribe({ next: (res) => {
      this.usoSueloOpciones = res.data;
    } });
    this.catalogoService.getItemsByCatalogoId(this.CATALOGO_CARACTERIZACION).pipe(takeUntil(this.destroy$)).subscribe({ next: (res) => {
      this.caracterizacionOpciones = res.data;
    } });
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
        import_sweetalert22.default.fire("Error", "No se pudo cargar la lista de solicitudes", "error");
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
    this.ensayosArray.clear();
    this.operadorAtributos = [];
  }
  onTipoEnsayoChange() {
    if (!this.solicitudSeleccionada)
      return;
    this.cargarDetalle();
  }
  cargarDetalle() {
    this.loadingDetalle = true;
    this.solicitudDetalleService.getSolicitudDetalle(this.solicitudSeleccionada.id_solicitud).pipe(takeUntil(this.destroy$)).subscribe({
      next: (detalle) => {
        this.poblarFormulario(detalle);
        this.loadingDetalle = false;
      },
      error: () => {
        this.loadingDetalle = false;
        import_sweetalert22.default.fire("Error", "No se pudo cargar el detalle de la solicitud", "error");
      }
    });
  }
  poblarFormulario(detalle) {
    const f = detalle.formularios?.[0];
    if (!f)
      return;
    const attr = (nombre) => f.atributos?.find((a) => a.nombre_atributo_formulario === nombre)?.valor_texto ?? "";
    const fechaEmision = f.fecha_emision_solicitud ? new Date(f.fecha_emision_solicitud) : null;
    const fechaMaxima = fechaEmision ? new Date(new Date(fechaEmision).setDate(fechaEmision.getDate() + 15)).toISOString().split("T")[0] : "";
    this.form.patchValue({
      solicitudTrabajoNo: f.num_secuencial_solicitud,
      fechaEmision: fechaEmision ? fechaEmision.toISOString().split("T")[0] : "",
      fechaMaximaEntrega: fechaMaxima,
      cliente: {
        solicitadoPor: f.nombre_completo,
        correoElectronico: attr("val_correo")
      }
    });
    this.operadorAtributos = (f.atributos ?? []).filter((a) => a.nombre_atributo_formulario.endsWith("_op")).sort((a, b) => a.orden - b.orden).map((a) => ({
      pregunta: a.pregunta_atributo_formulario,
      valor: a.nombre_valor_catalogo || a.valor_multiple_format || a.valor_texto || ""
    }));
    const ensayosFiltrados = (f.ensayos ?? []).filter((e) => this.tipoEnsayoId === null || e.parent_ambiental === this.tipoEnsayoId);
    this.ensayosArray.clear();
    for (const e of ensayosFiltrados) {
      const partes = (e.metodo ?? "").split(",");
      this.ensayosArray.push(this.fb.group({
        ensayoId: [e.id ?? ""],
        seleccionado: [true],
        ensayo: [e.analisis ?? ""],
        identificacion: [e.identificacion ?? ""],
        metodoInterno: [partes[0]?.trim() ?? ""],
        metodoReferencia: [partes.slice(1).join(",").trim()],
        unidad: [""]
      }));
    }
  }
  cargarParaEditar(orden) {
    this.modoEdicion = true;
    this.tipoEnsayoId = orden.ctambiente_id;
    const fechaEmision = orden.creado_en ? (/* @__PURE__ */ new Date(+orden.creado_en)).toISOString().split("T")[0] : "";
    this.form.patchValue({
      solicitudTrabajoNo: orden.solicitud_num_secuencial,
      ordenTrabajoNo: orden.num_secuencial ?? "",
      fechaEmision,
      observaciones: orden.observacion ?? "",
      cliente: { solicitadoPor: orden.usuario_nombre_completo },
      usoSuelo: {
        usoSueloOperadorId: orden.ctuso_suelo_id,
        usoSueloPcaId: orden.ctpunto_critico_id,
        caracterizacionId: orden.ctcaracteristica_horaria_id,
        direccionPca: orden.direccion_pca ?? "",
        telefonoPca: orden.telefono_pca ?? ""
      }
    });
    this.solicitudSeleccionada = { id_solicitud: orden.solicitud_id };
    this.loadingDetalle = true;
    this.reportOrdenService.getDetallesByOrdenId(orden.id).pipe(takeUntil(this.destroy$)).subscribe({
      next: (detalles) => {
        this.ensayosArray.clear();
        for (const d of detalles) {
          const partes = (d.metodo ?? "").split(",");
          this.ensayosArray.push(this.fb.group({
            ensayoId: [d.solicitud_ensayo_id],
            seleccionado: [true],
            ensayo: [d.analisis ?? ""],
            identificacion: [d.identificacion ?? ""],
            metodoInterno: [partes[0]?.trim() ?? ""],
            metodoReferencia: [partes.slice(1).join(",").trim()],
            unidad: [""]
          }));
        }
        this.loadingDetalle = false;
      },
      error: () => {
        this.loadingDetalle = false;
      }
    });
  }
  limpiarSolicitud() {
    this.solicitudSeleccionada = null;
    this.tipoEnsayoId = null;
    this.busqueda = "";
    this.operadorAtributos = [];
    this.form.reset();
    this.ensayosArray.clear();
  }
  // ── Ensayos ──────────────────────────────────────────────────────────────
  get ensayosControls() {
    return this.ensayosArray.controls;
  }
  toggleEnsayo(index) {
    const control = this.ensayosArray.at(index).get("seleccionado");
    control?.setValue(!control.value);
  }
  // ── Guardar ──────────────────────────────────────────────────────────────
  async guardar() {
    if (!this.solicitudSeleccionada) {
      this.toastrAlert.showWarning("Seleccione una solicitud de trabajo antes de guardar.", "Requerido");
      return;
    }
    if (!this.tipoEnsayoId) {
      this.toastrAlert.showWarning("Seleccione el tipo de ensayo antes de guardar.", "Requerido");
      return;
    }
    if (this.tipoEnsayoId === 91) {
      const usoSuelo = this.form.get("usoSuelo");
      usoSuelo.markAllAsTouched();
      const camposRequeridos = ["usoSueloOperadorId", "usoSueloPcaId", "caracterizacionId", "direccionPca"];
      const hayInvalidos = camposRequeridos.some((c) => usoSuelo.get(c)?.invalid);
      if (hayInvalidos) {
        this.toastrAlert.showWarning("Complete todos los campos obligatorios antes de guardar.", "Requerido");
        return;
      }
    }
    this.saving = true;
    const raw = this.form.getRawValue();
    const { id: userId } = this.authService.currentUser();
    try {
      if (this.modoEdicion) {
        const ordenPayload = {
          solicitud_id: this.solicitudSeleccionada.id_solicitud,
          usuario_id: userId,
          entidad_id: this.editingRecord.entidad_id,
          ctambiente_id: this.tipoEnsayoId,
          periodo_id: this.editingRecord.periodo_id,
          secuencial_id: this.editingRecord.secuencial_id ?? null,
          num_secuencial: this.editingRecord.num_secuencial ?? null,
          ctuso_suelo_id: raw.usoSuelo.usoSueloOperadorId ?? null,
          ctcaracteristica_horaria_id: raw.usoSuelo.caracterizacionId ?? null,
          ctpunto_critico_id: raw.usoSuelo.usoSueloPcaId ?? null,
          direccion_pca: raw.usoSuelo.direccionPca || null,
          telefono_pca: raw.usoSuelo.telefonoPca || null,
          observacion: raw.observaciones || null,
          ctestado_id: this.editingRecord.ctestado_id,
          estado: this.editingRecord.estado,
          ctformulario_id: this.editingRecord.ctformulario_id
        };
        await firstValueFrom(this.ordenTrabajoService.actualizarOrden(this.editingRecord.id, ordenPayload));
        this.toastrAlert.showSuccess("La orden de trabajo In Situ ha sido actualizada.", "\xA1Actualizado!");
        this.guardado.emit();
        return;
      }
      const opcionesUsuario = this.tecnicos.map((u) => `<option value="${u.id}">${u.nombre} \u2014 ${u.cargo}</option>`).join("");
      const swalResult = await import_sweetalert22.default.fire({
        title: "T\xE9cnico asignado",
        html: `
          <label style="font-size:11px;font-weight:700;color:#1e3a8a;text-transform:uppercase;display:block;text-align:left;margin-bottom:4px;">
            T\xE9cnico asignado *
          </label>
          <select id="swal-usuario" class="swal2-input" style="margin:0;width:100%;">
            <option value="">Seleccione...</option>
            ${opcionesUsuario}
          </select>
        `,
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#1e3a8a",
        cancelButtonColor: "#64748b",
        confirmButtonText: "Continuar",
        cancelButtonText: "Cancelar",
        focusConfirm: false,
        preConfirm: () => {
          const sel = document.getElementById("swal-usuario");
          if (!sel?.value) {
            import_sweetalert22.default.showValidationMessage("Debe seleccionar un t\xE9cnico asignado");
            return false;
          }
          return { usuario: sel.value };
        }
      });
      if (!swalResult.isConfirmed || !swalResult.value) {
        this.saving = false;
        return;
      }
      const tecnicoSeleccionado = this.tecnicos.find((u) => u.id === swalResult.value.usuario) ?? null;
      console.log("[orden-in-situ:tecnico]", JSON.parse(JSON.stringify({ tecnicoSeleccionado })));
      const now = /* @__PURE__ */ new Date();
      const ejercicio = await this.periodoService.getEjercicioByAnio(now.getFullYear());
      if (!ejercicio)
        throw new Error(`No hay ejercicio activo para ${now.getFullYear()}`);
      const periodo = await this.periodoService.getPeriodoByEjercicioAndMes(ejercicio.id, now.getMonth() + 1);
      if (!periodo)
        throw new Error(`No hay periodo activo para el mes ${now.getMonth() + 1}`);
      const ensayosSeleccionados = raw.ensayos.filter((e) => e.seleccionado && e.ensayoId);
      const payload = {
        ordenTrabajo: {
          solicitud_id: this.solicitudSeleccionada.id_solicitud,
          usuario_id: userId,
          entidad_id: "F9687983-F6CF-4706-9004-A1B793E3A987",
          ctambiente_id: this.tipoEnsayoId,
          periodo_id: periodo.id,
          secuencial_id: null,
          num_secuencial: null,
          ctuso_suelo_id: raw.usoSuelo.usoSueloOperadorId ?? null,
          ctcaracteristica_horaria_id: raw.usoSuelo.caracterizacionId ?? null,
          ctpunto_critico_id: raw.usoSuelo.usoSueloPcaId ?? null,
          direccion_pca: raw.usoSuelo.direccionPca || null,
          telefono_pca: raw.usoSuelo.telefonoPca || null,
          observacion: raw.observaciones || null,
          ctestado_id: 2,
          estado: true,
          ctformulario_id: 0
        },
        ordenTrabajoDetalle: ensayosSeleccionados.map((e) => ({
          solicitud_ensayo_id: e.ensayoId,
          estado: true
        }))
      };
      console.log("[orden-in-situ:guardar]", JSON.parse(JSON.stringify(payload)));
      await firstValueFrom(this.ordenTrabajoService.crearOrdenTrabajoConDetalle(payload));
      this.toastrAlert.showSuccess("La orden de trabajo In Situ ha sido guardada.", "\xA1Guardado!");
      this.guardado.emit();
    } catch {
      this.toastrAlert.showError("No se pudo guardar la orden de trabajo.", "Error");
    } finally {
      this.saving = false;
    }
  }
  static \u0275fac = function OrdenTrabajoInSituFormulario_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _OrdenTrabajoInSituFormulario)(\u0275\u0275directiveInject(FormBuilder), \u0275\u0275directiveInject(ReportSolicitudService), \u0275\u0275directiveInject(SolicitudDetalleService), \u0275\u0275directiveInject(CatalogoService), \u0275\u0275directiveInject(OrdenTrabajoService), \u0275\u0275directiveInject(ReportOrdenService), \u0275\u0275directiveInject(AuthService), \u0275\u0275directiveInject(PeriodoService), \u0275\u0275directiveInject(ToastrAlertService));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _OrdenTrabajoInSituFormulario, selectors: [["app-orden-trabajo-in-situ-formulario"]], inputs: { editingRecord: "editingRecord" }, outputs: { guardado: "guardado", cancelado: "cancelado" }, features: [\u0275\u0275NgOnChangesFeature], decls: 110, vars: 19, consts: [[1, "bg-white", "rounded-lg", "shadow-sm", "border", "border-slate-200", "p-8"], [3, "formGroup"], [1, "mb-6", "border-b", "border-slate-300", "pb-4"], [1, "text-lg", "font-bold", "text-[#1e3a8a]", "mb-1"], [1, "relative", "grid", "grid-cols-1", "sm:grid-cols-2", "md:grid-cols-4", "gap-x-8", "gap-y-6", "mb-8"], [1, "absolute", "inset-0", "z-10", "flex", "items-center", "justify-center", "bg-white/60", "rounded"], [1, "flex", "flex-col"], [1, "block", "text-[11px]", "font-bold", "text-[#1e3a8a]", "uppercase", "mb-1"], [1, "text-red-500"], [1, "flex", "items-center", "justify-between", "bg-blue-50", "border", "border-blue-300", "rounded", "px-3", "py-2", "gap-2"], ["type", "button", 1, "w-full", "flex", "items-center", "gap-2", "bg-white", "border", "border-dashed", "border-slate-300", "text-slate-500", "px-3", "py-2.5", "rounded", "text-sm", "hover:border-[#1e3a8a]", "hover:text-[#1e3a8a]", "transition-colors"], [1, "relative", "mt-1.5", "bg-white", "border", "border-slate-200", "rounded-lg", "shadow-xl", "z-50", "overflow-hidden"], [1, "w-full", "border", "border-slate-300", "bg-white", "text-slate-700", "p-2.5", "rounded", "text-sm", "outline-none", "focus:border-[#1e3a8a]", "transition-opacity", "duration-300", "disabled:opacity-40", "disabled:cursor-not-allowed", 3, "ngModelChange", "disabled", "ngModel", "ngModelOptions"], ["disabled", "", 3, "ngValue"], [3, "ngValue"], ["formControlName", "ordenTrabajoNo", "placeholder", "Se genera autom\xE1ticamente al guardar", "readonly", "", 1, "w-full", "border", "border-slate-200", "bg-slate-50", "text-slate-400", "p-2.5", "rounded", "text-sm", "outline-none", "cursor-not-allowed"], ["type", "date", "formControlName", "fechaEmision", "readonly", "", 1, "w-full", "border", "border-slate-200", "bg-slate-50", "text-slate-500", "p-2.5", "rounded", "text-sm", "outline-none", "cursor-not-allowed"], ["type", "date", "formControlName", "fechaMaximaEntrega", "readonly", "", 1, "w-full", "border", "border-slate-200", "bg-slate-50", "text-slate-500", "p-2.5", "rounded", "text-sm", "outline-none", "cursor-not-allowed"], [1, "text-[10px]", "text-slate-400", "mt-1"], ["formGroupName", "cliente", 1, "border", "border-slate-200", "rounded-sm", "overflow-hidden", "shadow-sm", "mb-6"], [1, "bg-[#f8fafc]", "border-b", "border-slate-200", "px-5", "py-3"], [1, "font-bold", "text-[#1e3a8a]", "text-sm", "uppercase"], [1, "p-5", "grid", "grid-cols-1", "md:grid-cols-2", "gap-6"], ["formControlName", "solicitadoPor", "readonly", "", 1, "w-full", "border", "border-slate-200", "bg-slate-50", "text-slate-500", "p-2.5", "rounded", "text-sm", "outline-none", "cursor-not-allowed"], ["formControlName", "direccion", "readonly", "", 1, "w-full", "border", "border-slate-200", "bg-slate-50", "text-slate-500", "p-2.5", "rounded", "text-sm", "outline-none", "cursor-not-allowed"], ["formControlName", "solicitudNo", "readonly", "", 1, "w-full", "border", "border-slate-200", "bg-slate-50", "text-slate-500", "p-2.5", "rounded", "text-sm", "outline-none", "cursor-not-allowed"], ["formControlName", "correoElectronico", "readonly", "", 1, "w-full", "border", "border-slate-200", "bg-slate-50", "text-slate-500", "p-2.5", "rounded", "text-sm", "outline-none", "cursor-not-allowed"], [1, "border", "border-slate-200", "rounded-sm", "overflow-hidden", "shadow-sm", "mb-8"], [1, "bg-slate-100", "text-center", "py-2.5", "px-4", "rounded", "text-[11px]", "font-bold", "text-[#1e3a8a]", "uppercase", "tracking-widest", "mb-4"], [1, "mb-8"], [1, "text-sm", "font-bold", "text-[#1e3a8a]", "uppercase", "mb-3"], [1, "border", "border-gray-200", "rounded", "overflow-hidden", "shadow-sm", "overflow-x-auto", "custom-scroll"], [1, "w-full", "text-sm", "border-collapse"], [1, "bg-slate-50", "text-[10px]", "font-bold", "text-slate-500", "uppercase", "border-b", "border-gray-200", "tracking-wider"], [1, "px-3", "py-2.5", "border-r", "border-gray-100", "text-center", "w-[100px]"], [1, "px-3", "py-2.5", "border-r", "border-gray-100", "text-left"], [1, "px-3", "py-2.5", "text-left"], [1, "border-b", "border-gray-100", "hover:bg-slate-50", "transition-colors"], ["formGroupName", "usoSuelo", 1, "border", "border-slate-200", "rounded-sm", "overflow-hidden", "shadow-sm", "mb-8", "animate-in", "fade-in"], [1, "border", "border-slate-200", "rounded-sm", "overflow-hidden", "shadow-sm", "mb-6"], [1, "text-slate-400", "font-normal", "normal-case", "text-xs"], [1, "p-5"], ["formControlName", "observaciones", "placeholder", "Ingrese observaciones adicionales...", 1, "w-full", "border", "border-slate-300", "rounded", "p-3", "text-sm", "resize-none", "outline-none", "focus:border-[#1e3a8a]", "bg-white", "text-slate-700", 3, "rows"], [1, "bg-slate-50", "border", "border-slate-200", "rounded", "p-4", "mb-6"], [1, "text-[11px]", "font-bold", "text-slate-800", "mb-2"], [1, "list-decimal", "pl-4", "space-y-1"], [1, "text-[11px]", "text-slate-600", "leading-tight"], [1, "flex", "items-center", "gap-3", "pt-4", "border-t", "border-slate-300"], ["type", "button", 1, "border", "border-slate-300", "text-slate-600", "px-6", "py-2.5", "rounded", "text-sm", "font-bold", "hover:bg-slate-50", "transition-all", 3, "click"], ["type", "button", 1, "bg-[#1e3a8a]", "text-white", "px-8", "py-2.5", "rounded", "text-sm", "font-bold", "shadow-md", "hover:bg-[#2541b2]", "transition-all", "disabled:opacity-60", "disabled:cursor-not-allowed", "flex", "items-center", "gap-2", 3, "click", "disabled"], [1, "animate-spin", "h-5", "w-5", "border-2", "border-[#1e3a8a]", "border-t-transparent", "rounded-full"], [1, "font-bold", "text-[#1e3a8a]", "text-sm", "truncate"], ["type", "button", "title", "Cambiar solicitud", 1, "shrink-0", "text-slate-400", "hover:text-red-500", "text-sm", "leading-none", "transition-colors"], ["type", "button", "title", "Cambiar solicitud", 1, "shrink-0", "text-slate-400", "hover:text-red-500", "text-sm", "leading-none", "transition-colors", 3, "click"], ["type", "button", 1, "w-full", "flex", "items-center", "gap-2", "bg-white", "border", "border-dashed", "border-slate-300", "text-slate-500", "px-3", "py-2.5", "rounded", "text-sm", "hover:border-[#1e3a8a]", "hover:text-[#1e3a8a]", "transition-colors", 3, "click"], ["fill", "none", "viewBox", "0 0 24 24", "stroke", "currentColor", 1, "w-4", "h-4", "shrink-0"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"], [1, "flex", "items-center", "gap-2", "px-3", "py-2", "border-b", "border-slate-200", "bg-slate-50"], ["type", "text", "placeholder", "Buscar por No. secuencial, solicitante o formulario...", "autofocus", "", 1, "flex-1", "border", "border-slate-300", "rounded", "px-3", "py-2", "text-sm", "outline-none", "focus:border-[#1e3a8a]", 3, "ngModelChange", "ngModel", "ngModelOptions"], ["type", "button", 1, "text-slate-400", "hover:text-red-500", "text-xl", "leading-none", 3, "click"], [1, "py-5", "text-center", "text-sm", "text-slate-400", "italic"], [1, "max-h-72", "overflow-y-auto", "custom-scroll"], [1, "px-3.5", "py-2.5", "border-b", "border-slate-100", "cursor-pointer", "hover:bg-blue-50", "transition-colors", "flex", "items-center", "justify-between", "gap-2"], [1, "flex", "items-center", "justify-between", "px-3.5", "py-2", "border-t", "border-slate-200", "bg-slate-50"], [1, "px-3.5", "py-2.5", "border-b", "border-slate-100", "cursor-pointer", "hover:bg-blue-50", "transition-colors", "flex", "items-center", "justify-between", "gap-2", 3, "click"], [1, "flex", "flex-col", "min-w-0"], [1, "font-bold", "text-[#1e3a8a]", "text-xs", "truncate"], [1, "text-[10px]", "text-slate-400", "truncate"], [1, "shrink-0", "text-[9px]", "font-bold", "px-2", "py-0.5", "rounded", "border", "border-red-400", "text-red-700", "bg-red-50"], [1, "shrink-0", "text-[9px]", "font-bold", "px-2", "py-0.5", "rounded", "border", "border-slate-300", "text-slate-500", "bg-slate-50"], [1, "text-[11px]", "text-slate-400"], [1, "flex", "gap-1"], ["type", "button", 1, "w-7", "h-7", "flex", "items-center", "justify-center", "border", "border-slate-200", "rounded", "bg-white", "text-[#1e3a8a]", "hover:bg-blue-50", "disabled:opacity-40", "disabled:cursor-not-allowed", "transition-colors", 3, "click", "disabled"], [1, "w-full", "border", "border-slate-200", "bg-slate-50", "text-slate-700", "p-2.5", "rounded", "text-sm"], ["colspan", "6", 1, "p-10", "text-slate-400", "italic", "text-center"], [1, "px-3", "py-2.5", "border-r", "border-gray-100", "text-center"], [1, "flex", "items-center", "justify-center", "gap-1.5"], [1, "relative", "inline-flex", "h-5", "w-9", "items-center", "rounded-full", "transition-colors"], [1, "inline-block", "h-3.5", "w-3.5", "transform", "rounded-full", "bg-white", "shadow", "transition-transform"], [1, "text-[11px]", "font-bold", "w-5"], [1, "px-3", "py-2.5", "border-r", "border-gray-100", "text-slate-600", "text-xs"], [1, "px-3", "py-2.5", "text-slate-600", "text-xs"], [1, "block", "text-[11px]", "font-bold", "uppercase", "mb-1"], ["formControlName", "usoSueloOperadorId", 1, "w-full", "border", "bg-white", "text-slate-700", "p-2.5", "rounded", "text-sm", "outline-none", "focus:border-[#1e3a8a]", "transition-colors"], [1, "text-red-500", "text-[11px]", "mt-1"], [1, "flex", "flex-col", "animate-in", "fade-in"], ["formControlName", "usoSueloPcaId", 1, "w-full", "border", "bg-white", "text-slate-700", "p-2.5", "rounded", "text-sm", "outline-none", "focus:border-[#1e3a8a]", "transition-colors"], ["formControlName", "caracterizacionId", 1, "w-full", "border", "bg-white", "text-slate-700", "p-2.5", "rounded", "text-sm", "outline-none", "focus:border-[#1e3a8a]", "transition-colors"], ["formControlName", "direccionPca", "placeholder", "Ej: Av. Eloy Alfaro N43-185 y Jos\xE9 Queri", "maxlength", "128", 1, "w-full", "border", "bg-white", "text-slate-700", "p-2.5", "rounded", "text-sm", "outline-none", "focus:border-[#1e3a8a]", "transition-colors"], ["formControlName", "telefonoPca", "placeholder", "Ej: 098483595", "maxlength", "10", 1, "w-full", "border", "border-slate-300", "bg-white", "text-slate-700", "p-2.5", "rounded", "text-sm", "outline-none", "focus:border-[#1e3a8a]", "transition-colors"], ["formControlName", "usoSueloOperadorOtro", "placeholder", "Especifique el uso de suelo", "maxlength", "32", 1, "w-full", "border", "bg-white", "text-slate-700", "p-2.5", "rounded", "text-sm", "outline-none", "focus:border-[#1e3a8a]", "transition-colors"], ["formControlName", "usoSueloPcaOtro", "placeholder", "Especifique el uso de suelo", "maxlength", "32", 1, "w-full", "border", "bg-white", "text-slate-700", "p-2.5", "rounded", "text-sm", "outline-none", "focus:border-[#1e3a8a]", "transition-colors"], [1, "animate-spin", "h-4", "w-4", "border-2", "border-white", "border-t-transparent", "rounded-full"]], template: function OrdenTrabajoInSituFormulario_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "form", 1)(2, "div", 2)(3, "h3", 3);
      \u0275\u0275text(4, "Informaci\xF3n de la Orden");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(5, "div", 4);
      \u0275\u0275conditionalCreate(6, OrdenTrabajoInSituFormulario_Conditional_6_Template, 2, 0, "div", 5);
      \u0275\u0275elementStart(7, "div", 6)(8, "label", 7);
      \u0275\u0275text(9, " Solicitud de trabajo No ");
      \u0275\u0275elementStart(10, "span", 8);
      \u0275\u0275text(11, "*");
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(12, OrdenTrabajoInSituFormulario_Conditional_12_Template, 4, 2, "div", 9)(13, OrdenTrabajoInSituFormulario_Conditional_13_Template, 4, 0, "button", 10);
      \u0275\u0275conditionalCreate(14, OrdenTrabajoInSituFormulario_Conditional_14_Template, 8, 4, "div", 11);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(15, "div", 6)(16, "label", 7);
      \u0275\u0275text(17, " Tipo de Ensayo ");
      \u0275\u0275elementStart(18, "span", 8);
      \u0275\u0275text(19, "*");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(20, "select", 12);
      \u0275\u0275listener("ngModelChange", function OrdenTrabajoInSituFormulario_Template_select_ngModelChange_20_listener($event) {
        ctx.tipoEnsayoId = +$event;
        return ctx.onTipoEnsayoChange();
      });
      \u0275\u0275elementStart(21, "option", 13);
      \u0275\u0275text(22, "Seleccione un tipo...");
      \u0275\u0275elementEnd();
      \u0275\u0275repeaterCreate(23, OrdenTrabajoInSituFormulario_For_24_Template, 2, 2, "option", 14, _forTrack02);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(25, "div", 6)(26, "label", 7);
      \u0275\u0275text(27, "Orden de trabajo No");
      \u0275\u0275elementEnd();
      \u0275\u0275element(28, "input", 15);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(29, "div", 6)(30, "label", 7);
      \u0275\u0275text(31, "Fecha de emisi\xF3n");
      \u0275\u0275elementEnd();
      \u0275\u0275element(32, "input", 16);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(33, "div", 6)(34, "label", 7);
      \u0275\u0275text(35, "Fecha m\xE1xima de entrega");
      \u0275\u0275elementEnd();
      \u0275\u0275element(36, "input", 17);
      \u0275\u0275elementStart(37, "p", 18);
      \u0275\u0275text(38, "Generada autom\xE1ticamente (15 d\xEDas tras la emisi\xF3n)");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(39, "section", 19)(40, "div", 20)(41, "h4", 21);
      \u0275\u0275text(42, "Cliente");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(43, "div", 22)(44, "div", 6)(45, "label", 7);
      \u0275\u0275text(46, "Solicitado por");
      \u0275\u0275elementEnd();
      \u0275\u0275element(47, "input", 23);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(48, "div", 6)(49, "label", 7);
      \u0275\u0275text(50, "Direcci\xF3n");
      \u0275\u0275elementEnd();
      \u0275\u0275element(51, "input", 24);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(52, "div", 6)(53, "label", 7);
      \u0275\u0275text(54, "Solicitud No. (Fecha; hora)");
      \u0275\u0275elementEnd();
      \u0275\u0275element(55, "input", 25);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(56, "div", 6)(57, "label", 7);
      \u0275\u0275text(58, "Correo electr\xF3nico");
      \u0275\u0275elementEnd();
      \u0275\u0275element(59, "input", 26);
      \u0275\u0275elementEnd()()();
      \u0275\u0275conditionalCreate(60, OrdenTrabajoInSituFormulario_Conditional_60_Template, 7, 0, "section", 27);
      \u0275\u0275elementStart(61, "div", 28);
      \u0275\u0275text(62, " AN\xC1LISIS REQUERIDO IN SITU ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(63, "div", 29)(64, "h4", 30);
      \u0275\u0275text(65, "Ensayos Fisico-Qu\xEDmicos de Emisiones Gaseosas...");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(66, "div", 31)(67, "table", 32)(68, "thead")(69, "tr", 33)(70, "th", 34);
      \u0275\u0275text(71, "AN\xC1LISIS");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(72, "th", 35);
      \u0275\u0275text(73, "ENSAYO");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(74, "th", 35);
      \u0275\u0275text(75, "IDENTIFICACI\xD3N");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(76, "th", 35);
      \u0275\u0275text(77, "M\xC9TODO INTERNO");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(78, "th", 35);
      \u0275\u0275text(79, "M\xC9TODO REFERENCIA");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(80, "th", 36);
      \u0275\u0275text(81, "UNIDAD");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(82, "tbody");
      \u0275\u0275conditionalCreate(83, OrdenTrabajoInSituFormulario_Conditional_83_Template, 3, 0, "tr");
      \u0275\u0275repeaterCreate(84, OrdenTrabajoInSituFormulario_For_85_Template, 17, 18, "tr", 37, \u0275\u0275repeaterTrackByIndex);
      \u0275\u0275elementEnd()()()();
      \u0275\u0275conditionalCreate(86, OrdenTrabajoInSituFormulario_Conditional_86_Template, 51, 41, "section", 38);
      \u0275\u0275elementStart(87, "section", 39)(88, "div", 20)(89, "h4", 21);
      \u0275\u0275text(90, "Observaciones ");
      \u0275\u0275elementStart(91, "span", 40);
      \u0275\u0275text(92, "(opcional)");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(93, "div", 41)(94, "textarea", 42);
      \u0275\u0275text(95, "        ");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(96, "div", 43)(97, "p", 44);
      \u0275\u0275text(98, "\u24D8 Notas Importantes:");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(99, "ul", 45)(100, "li", 46);
      \u0275\u0275text(101, "Los ensayos marcados con (*) no est\xE1n incluidos en el alcance de acreditaci\xF3n del SAE.");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(102, "li", 46);
      \u0275\u0275text(103, "Los resultados obtenidos podr\xE1n utilizarse para la elaboraci\xF3n de informes t\xE9cnicos cuando as\xED lo requiera la Secretar\xEDa de Ambiente.");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(104, "div", 47)(105, "button", 48);
      \u0275\u0275listener("click", function OrdenTrabajoInSituFormulario_Template_button_click_105_listener() {
        return ctx.cancelado.emit();
      });
      \u0275\u0275text(106, " Cancelar ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(107, "button", 49);
      \u0275\u0275listener("click", function OrdenTrabajoInSituFormulario_Template_button_click_107_listener() {
        return ctx.guardar();
      });
      \u0275\u0275conditionalCreate(108, OrdenTrabajoInSituFormulario_Conditional_108_Template, 2, 1)(109, OrdenTrabajoInSituFormulario_Conditional_109_Template, 1, 1);
      \u0275\u0275elementEnd()()()();
    }
    if (rf & 2) {
      \u0275\u0275advance();
      \u0275\u0275property("formGroup", ctx.form);
      \u0275\u0275advance(4);
      \u0275\u0275classProp("pointer-events-none", ctx.loadingDetalle);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.loadingDetalle ? 6 : -1);
      \u0275\u0275advance(6);
      \u0275\u0275conditional(ctx.solicitudSeleccionada ? 12 : 13);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.panelAbierto ? 14 : -1);
      \u0275\u0275advance(6);
      \u0275\u0275classProp("opacity-50", ctx.loadingTipos);
      \u0275\u0275property("disabled", ctx.loadingTipos || !ctx.solicitudSeleccionada || ctx.modoEdicion)("ngModel", ctx.tipoEnsayoId)("ngModelOptions", \u0275\u0275pureFunction0(18, _c02));
      \u0275\u0275advance();
      \u0275\u0275property("ngValue", null);
      \u0275\u0275advance(2);
      \u0275\u0275repeater(ctx.tiposEnsayo);
      \u0275\u0275advance(37);
      \u0275\u0275conditional(ctx.operadorAtributos.length > 0 ? 60 : -1);
      \u0275\u0275advance(23);
      \u0275\u0275conditional(ctx.ensayosControls.length === 0 ? 83 : -1);
      \u0275\u0275advance();
      \u0275\u0275repeater(ctx.ensayosControls);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.tipoEnsayoId === 91 ? 86 : -1);
      \u0275\u0275advance(8);
      \u0275\u0275property("rows", 3);
      \u0275\u0275advance(13);
      \u0275\u0275property("disabled", ctx.saving);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.saving ? 108 : 109);
    }
  }, dependencies: [CommonModule, ReactiveFormsModule, \u0275NgNoValidate, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, SelectControlValueAccessor, NgControlStatus, NgControlStatusGroup, MaxLengthValidator, FormGroupDirective, FormControlName, FormGroupName, FormsModule, NgModel], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(OrdenTrabajoInSituFormulario, [{
    type: Component,
    args: [{ selector: "app-orden-trabajo-in-situ-formulario", imports: [CommonModule, ReactiveFormsModule, FormsModule], template: `<div class="bg-white rounded-lg shadow-sm border border-slate-200 p-8">
  <form [formGroup]="form">

    <!-- Step-header (Nivel 2A) -->
    <div class="mb-6 border-b border-slate-300 pb-4">
      <h3 class="text-lg font-bold text-[#1e3a8a] mb-1">Informaci\xF3n de la Orden</h3>
    </div>

    <!-- Top fields -->
    <div class="relative grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-6 mb-8"
         [class.pointer-events-none]="loadingDetalle">
      @if (loadingDetalle) {
        <div class="absolute inset-0 z-10 flex items-center justify-center bg-white/60 rounded">
          <span class="animate-spin h-5 w-5 border-2 border-[#1e3a8a] border-t-transparent rounded-full"></span>
        </div>
      }

      <!-- Solicitud de trabajo No -->
      <div class="flex flex-col">
        <label class="block text-[11px] font-bold text-[#1e3a8a] uppercase mb-1">
          Solicitud de trabajo No <span class="text-red-500">*</span>
        </label>

        @if (solicitudSeleccionada) {
          <div class="flex items-center justify-between bg-blue-50 border border-blue-300 rounded px-3 py-2 gap-2">
            <span class="font-bold text-[#1e3a8a] text-sm truncate">
              {{ solicitudSeleccionada.num_secuencial ?? solicitudSeleccionada.id_solicitud }}
            </span>
            @if (!modoEdicion) {
              <button type="button" (click)="limpiarSolicitud()" title="Cambiar solicitud"
                class="shrink-0 text-slate-400 hover:text-red-500 text-sm leading-none transition-colors">
                \u2715
              </button>
            }
          </div>
        } @else {
          <button type="button" (click)="abrirPanel()"
            class="w-full flex items-center gap-2 bg-white border border-dashed border-slate-300 text-slate-500 px-3 py-2.5 rounded text-sm hover:border-[#1e3a8a] hover:text-[#1e3a8a] transition-colors">
            <svg class="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
            </svg>
            Buscar solicitud finalizada...
          </button>
        }

        @if (panelAbierto) {
          <div class="relative mt-1.5 bg-white border border-slate-200 rounded-lg shadow-xl z-50 overflow-hidden">
            <div class="flex items-center gap-2 px-3 py-2 border-b border-slate-200 bg-slate-50">
              <input
                type="text"
                class="flex-1 border border-slate-300 rounded px-3 py-2 text-sm outline-none focus:border-[#1e3a8a]"
                placeholder="Buscar por No. secuencial, solicitante o formulario..."
                [ngModel]="busqueda"
                [ngModelOptions]="{standalone: true}"
                (ngModelChange)="onBusquedaChange($event)"
                autofocus
              />
              <button type="button" (click)="cerrarPanel()" class="text-slate-400 hover:text-red-500 text-xl leading-none">\u2715</button>
            </div>

            @if (loadingBusqueda) {
              <p class="py-5 text-center text-sm text-slate-400 italic">Buscando...</p>
            } @else if (solicitudesFinalizadas.length === 0) {
              <p class="py-5 text-center text-sm text-slate-400 italic">No se encontraron solicitudes finalizadas.</p>
            } @else {
              <ul class="max-h-72 overflow-y-auto custom-scroll">
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
                <div class="flex items-center justify-between px-3.5 py-2 border-t border-slate-200 bg-slate-50">
                  <span class="text-[11px] text-slate-400">
                    P\xE1gina {{ meta.page }} de {{ meta.totalPages }} \xB7 {{ meta.total }} resultados
                  </span>
                  <div class="flex gap-1">
                    <button type="button" [disabled]="!meta.hasPrevPage" (click)="cargarPagina(currentPage - 1)"
                      class="w-7 h-7 flex items-center justify-center border border-slate-200 rounded bg-white text-[#1e3a8a] hover:bg-blue-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors">\u2039</button>
                    <button type="button" [disabled]="!meta.hasNextPage" (click)="cargarPagina(currentPage + 1)"
                      class="w-7 h-7 flex items-center justify-center border border-slate-200 rounded bg-white text-[#1e3a8a] hover:bg-blue-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors">\u203A</button>
                  </div>
                </div>
              }
            }
          </div>
        }
      </div>

      <!-- Tipo de Ensayo -->
      <div class="flex flex-col">
        <label class="block text-[11px] font-bold text-[#1e3a8a] uppercase mb-1">
          Tipo de Ensayo <span class="text-red-500">*</span>
        </label>
        <select
          class="w-full border border-slate-300 bg-white text-slate-700 p-2.5 rounded text-sm outline-none focus:border-[#1e3a8a] transition-opacity duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
          [disabled]="loadingTipos || !solicitudSeleccionada || modoEdicion"
          [class.opacity-50]="loadingTipos"
          [ngModel]="tipoEnsayoId"
          [ngModelOptions]="{standalone: true}"
          (ngModelChange)="tipoEnsayoId = +$event; onTipoEnsayoChange()">
          <option [ngValue]="null" disabled>Seleccione un tipo...</option>
          @for (tipo of tiposEnsayo; track tipo.id) {
            <option [ngValue]="tipo.id">{{ tipo.nombre }}</option>
          }
        </select>
      </div>

      <!-- Orden de trabajo No -->
      <div class="flex flex-col">
        <label class="block text-[11px] font-bold text-[#1e3a8a] uppercase mb-1">Orden de trabajo No</label>
        <input
          class="w-full border border-slate-200 bg-slate-50 text-slate-400 p-2.5 rounded text-sm outline-none cursor-not-allowed"
          formControlName="ordenTrabajoNo"
          placeholder="Se genera autom\xE1ticamente al guardar"
          readonly
        />
      </div>

      <!-- Fecha de emisi\xF3n -->
      <div class="flex flex-col">
        <label class="block text-[11px] font-bold text-[#1e3a8a] uppercase mb-1">Fecha de emisi\xF3n</label>
        <input
          class="w-full border border-slate-200 bg-slate-50 text-slate-500 p-2.5 rounded text-sm outline-none cursor-not-allowed"
          type="date" formControlName="fechaEmision" readonly
        />
      </div>

      <!-- Fecha m\xE1xima de entrega -->
      <div class="flex flex-col">
        <label class="block text-[11px] font-bold text-[#1e3a8a] uppercase mb-1">Fecha m\xE1xima de entrega</label>
        <input
          class="w-full border border-slate-200 bg-slate-50 text-slate-500 p-2.5 rounded text-sm outline-none cursor-not-allowed"
          type="date" formControlName="fechaMaximaEntrega" readonly
        />
        <p class="text-[10px] text-slate-400 mt-1">Generada autom\xE1ticamente (15 d\xEDas tras la emisi\xF3n)</p>
      </div>

    </div>

    <!-- Section-card: Cliente (Nivel 2B) -->
    <section class="border border-slate-200 rounded-sm overflow-hidden shadow-sm mb-6" formGroupName="cliente">
      <div class="bg-[#f8fafc] border-b border-slate-200 px-5 py-3">
        <h4 class="font-bold text-[#1e3a8a] text-sm uppercase">Cliente</h4>
      </div>
      <div class="p-5 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="flex flex-col">
          <label class="block text-[11px] font-bold text-[#1e3a8a] uppercase mb-1">Solicitado por</label>
          <input class="w-full border border-slate-200 bg-slate-50 text-slate-500 p-2.5 rounded text-sm outline-none cursor-not-allowed"
            formControlName="solicitadoPor" readonly />
        </div>
        <div class="flex flex-col">
          <label class="block text-[11px] font-bold text-[#1e3a8a] uppercase mb-1">Direcci\xF3n</label>
          <input class="w-full border border-slate-200 bg-slate-50 text-slate-500 p-2.5 rounded text-sm outline-none cursor-not-allowed"
            formControlName="direccion" readonly />
        </div>
        <div class="flex flex-col">
          <label class="block text-[11px] font-bold text-[#1e3a8a] uppercase mb-1">Solicitud No. (Fecha; hora)</label>
          <input class="w-full border border-slate-200 bg-slate-50 text-slate-500 p-2.5 rounded text-sm outline-none cursor-not-allowed"
            formControlName="solicitudNo" readonly />
        </div>
        <div class="flex flex-col">
          <label class="block text-[11px] font-bold text-[#1e3a8a] uppercase mb-1">Correo electr\xF3nico</label>
          <input class="w-full border border-slate-200 bg-slate-50 text-slate-500 p-2.5 rounded text-sm outline-none cursor-not-allowed"
            formControlName="correoElectronico" readonly />
        </div>
      </div>
    </section>

    <!-- Section-card: Operador (Nivel 2B) -->
    @if (operadorAtributos.length > 0) {
      <section class="border border-slate-200 rounded-sm overflow-hidden shadow-sm mb-8">
        <div class="bg-[#f8fafc] border-b border-slate-200 px-5 py-3">
          <h4 class="font-bold text-[#1e3a8a] text-sm uppercase">Operador</h4>
        </div>
        <div class="p-5 grid grid-cols-1 md:grid-cols-2 gap-6">
          @for (attr of operadorAtributos; track attr.pregunta) {
            <div class="flex flex-col">
              <label class="block text-[11px] font-bold text-[#1e3a8a] uppercase mb-1">{{ attr.pregunta }}</label>
              <div class="w-full border border-slate-200 bg-slate-50 text-slate-700 p-2.5 rounded text-sm">
                {{ attr.valor || '\u2014' }}
              </div>
            </div>
          }
        </div>
      </section>
    }

    <!-- Separador de secci\xF3n -->
    <div class="bg-slate-100 text-center py-2.5 px-4 rounded text-[11px] font-bold text-[#1e3a8a] uppercase tracking-widest mb-4">
      AN\xC1LISIS REQUERIDO IN SITU
    </div>

    <!-- Table-card: Ensayos (Nivel 2C) -->
    <div class="mb-8">
      <h4 class="text-sm font-bold text-[#1e3a8a] uppercase mb-3">Ensayos Fisico-Qu\xEDmicos de Emisiones Gaseosas...</h4>
      <div class="border border-gray-200 rounded overflow-hidden shadow-sm overflow-x-auto custom-scroll">
        <table class="w-full text-sm border-collapse">
          <thead>
            <tr class="bg-slate-50 text-[10px] font-bold text-slate-500 uppercase border-b border-gray-200 tracking-wider">
              <th class="px-3 py-2.5 border-r border-gray-100 text-center w-[100px]">AN\xC1LISIS</th>
              <th class="px-3 py-2.5 border-r border-gray-100 text-left">ENSAYO</th>
              <th class="px-3 py-2.5 border-r border-gray-100 text-left">IDENTIFICACI\xD3N</th>
              <th class="px-3 py-2.5 border-r border-gray-100 text-left">M\xC9TODO INTERNO</th>
              <th class="px-3 py-2.5 border-r border-gray-100 text-left">M\xC9TODO REFERENCIA</th>
              <th class="px-3 py-2.5 text-left">UNIDAD</th>
            </tr>
          </thead>
          <tbody>
            @if (ensayosControls.length === 0) {
              <tr>
                <td colspan="6" class="p-10 text-slate-400 italic text-center">No hay ensayos para el tipo de ensayo seleccionado.</td>
              </tr>
            }
            @for (ensayo of ensayosControls; track i; let i = $index) {
              <tr class="border-b border-gray-100 hover:bg-slate-50 transition-colors">
                <td class="px-3 py-2.5 border-r border-gray-100 text-center">
                  <div class="flex items-center justify-center gap-1.5">
                    <div class="relative inline-flex h-5 w-9 items-center rounded-full transition-colors"
                         [class.bg-[#1e3a8a]]="ensayo.get('seleccionado')?.value"
                         [class.bg-slate-300]="!ensayo.get('seleccionado')?.value">
                      <span class="inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow transition-transform"
                            [class.translate-x-4]="ensayo.get('seleccionado')?.value"
                            [class.translate-x-0.5]="!ensayo.get('seleccionado')?.value"></span>
                    </div>
                    <span class="text-[11px] font-bold w-5"
                          [class.text-[#1e3a8a]]="ensayo.get('seleccionado')?.value"
                          [class.text-slate-400]="!ensayo.get('seleccionado')?.value">
                      {{ ensayo.get('seleccionado')?.value ? 'S\xED' : 'No' }}
                    </span>
                  </div>
                </td>
                <td class="px-3 py-2.5 border-r border-gray-100 text-slate-600 text-xs">{{ ensayo.get('ensayo')?.value || '\u2014' }}</td>
                <td class="px-3 py-2.5 border-r border-gray-100 text-slate-600 text-xs">{{ ensayo.get('identificacion')?.value || '\u2014' }}</td>
                <td class="px-3 py-2.5 border-r border-gray-100 text-slate-600 text-xs">{{ ensayo.get('metodoInterno')?.value || '\u2014' }}</td>
                <td class="px-3 py-2.5 border-r border-gray-100 text-slate-600 text-xs">{{ ensayo.get('metodoReferencia')?.value || '\u2014' }}</td>
                <td class="px-3 py-2.5 text-slate-600 text-xs">{{ ensayo.get('unidad')?.value || '\u2014' }}</td>
              </tr>
            }
          </tbody>
        </table>
      </div>
    </div>

    <!-- Section: Tipos de uso de suelo \u2014 solo visible cuando se selecciona Ruido (id=91) -->
    @if (tipoEnsayoId === 91) {
      <section class="border border-slate-200 rounded-sm overflow-hidden shadow-sm mb-8 animate-in fade-in" formGroupName="usoSuelo">
        <div class="bg-[#f8fafc] border-b border-slate-200 px-5 py-3">
          <h4 class="font-bold text-[#1e3a8a] text-sm uppercase">Tipos de uso de suelo</h4>
        </div>
        <div class="p-5 grid grid-cols-1 md:grid-cols-2 gap-6">

          <!-- Uso de suelo del Operador -->
          <div class="flex flex-col">
            <label class="block text-[11px] font-bold uppercase mb-1"
              [class.text-red-600]="form.get('usoSuelo.usoSueloOperadorId')?.invalid && form.get('usoSuelo.usoSueloOperadorId')?.touched"
              [class.text-[#1e3a8a]]="!(form.get('usoSuelo.usoSueloOperadorId')?.invalid && form.get('usoSuelo.usoSueloOperadorId')?.touched)">
              Uso de suelo del Operador <span class="text-red-500">*</span>
            </label>
            <select formControlName="usoSueloOperadorId"
              class="w-full border bg-white text-slate-700 p-2.5 rounded text-sm outline-none focus:border-[#1e3a8a] transition-colors"
              [class.border-red-400]="form.get('usoSuelo.usoSueloOperadorId')?.invalid && form.get('usoSuelo.usoSueloOperadorId')?.touched"
              [class.border-slate-300]="!(form.get('usoSuelo.usoSueloOperadorId')?.invalid && form.get('usoSuelo.usoSueloOperadorId')?.touched)">
              <option [ngValue]="null" disabled>Seleccione...</option>
              @for (op of usoSueloOpciones; track op.id) {
                <option [ngValue]="op.id">{{ op.nombre }}</option>
              }
            </select>
            @if (form.get('usoSuelo.usoSueloOperadorId')?.invalid && form.get('usoSuelo.usoSueloOperadorId')?.touched) {
              <span class="text-red-500 text-[11px] mt-1">Este campo es obligatorio.</span>
            }
          </div>

          <!-- Otro - Uso de suelo del Operador -->
          @if (esOtrosOperador) {
            <div class="flex flex-col animate-in fade-in">
              <label class="block text-[11px] font-bold uppercase mb-1"
                [class.text-red-600]="form.get('usoSuelo.usoSueloOperadorOtro')?.invalid && form.get('usoSuelo.usoSueloOperadorOtro')?.touched"
                [class.text-[#1e3a8a]]="!(form.get('usoSuelo.usoSueloOperadorOtro')?.invalid && form.get('usoSuelo.usoSueloOperadorOtro')?.touched)">
                Otro - Uso de suelo del Operador <span class="text-red-500">*</span>
              </label>
              <input formControlName="usoSueloOperadorOtro"
                class="w-full border bg-white text-slate-700 p-2.5 rounded text-sm outline-none focus:border-[#1e3a8a] transition-colors"
                [class.border-red-400]="form.get('usoSuelo.usoSueloOperadorOtro')?.invalid && form.get('usoSuelo.usoSueloOperadorOtro')?.touched"
                [class.border-slate-300]="!(form.get('usoSuelo.usoSueloOperadorOtro')?.invalid && form.get('usoSuelo.usoSueloOperadorOtro')?.touched)"
                placeholder="Especifique el uso de suelo" maxlength="32" />
              @if (form.get('usoSuelo.usoSueloOperadorOtro')?.invalid && form.get('usoSuelo.usoSueloOperadorOtro')?.touched) {
                <span class="text-red-500 text-[11px] mt-1">Este campo es obligatorio.</span>
              }
            </div>
          }

          <!-- Uso de suelo del PCA -->
          <div class="flex flex-col">
            <label class="block text-[11px] font-bold uppercase mb-1"
              [class.text-red-600]="form.get('usoSuelo.usoSueloPcaId')?.invalid && form.get('usoSuelo.usoSueloPcaId')?.touched"
              [class.text-[#1e3a8a]]="!(form.get('usoSuelo.usoSueloPcaId')?.invalid && form.get('usoSuelo.usoSueloPcaId')?.touched)">
              Uso de suelo del punto cr\xEDtico de afectaci\xF3n (PCA) <span class="text-red-500">*</span>
            </label>
            <select formControlName="usoSueloPcaId"
              class="w-full border bg-white text-slate-700 p-2.5 rounded text-sm outline-none focus:border-[#1e3a8a] transition-colors"
              [class.border-red-400]="form.get('usoSuelo.usoSueloPcaId')?.invalid && form.get('usoSuelo.usoSueloPcaId')?.touched"
              [class.border-slate-300]="!(form.get('usoSuelo.usoSueloPcaId')?.invalid && form.get('usoSuelo.usoSueloPcaId')?.touched)">
              <option [ngValue]="null" disabled>Seleccione...</option>
              @for (op of usoSueloOpciones; track op.id) {
                <option [ngValue]="op.id">{{ op.nombre }}</option>
              }
            </select>
            @if (form.get('usoSuelo.usoSueloPcaId')?.invalid && form.get('usoSuelo.usoSueloPcaId')?.touched) {
              <span class="text-red-500 text-[11px] mt-1">Este campo es obligatorio.</span>
            }
          </div>

          <!-- Otro - Uso de suelo del PCA -->
          @if (esOtrosPca) {
            <div class="flex flex-col animate-in fade-in">
              <label class="block text-[11px] font-bold uppercase mb-1"
                [class.text-red-600]="form.get('usoSuelo.usoSueloPcaOtro')?.invalid && form.get('usoSuelo.usoSueloPcaOtro')?.touched"
                [class.text-[#1e3a8a]]="!(form.get('usoSuelo.usoSueloPcaOtro')?.invalid && form.get('usoSuelo.usoSueloPcaOtro')?.touched)">
                Otro - Uso de suelo del PCA <span class="text-red-500">*</span>
              </label>
              <input formControlName="usoSueloPcaOtro"
                class="w-full border bg-white text-slate-700 p-2.5 rounded text-sm outline-none focus:border-[#1e3a8a] transition-colors"
                [class.border-red-400]="form.get('usoSuelo.usoSueloPcaOtro')?.invalid && form.get('usoSuelo.usoSueloPcaOtro')?.touched"
                [class.border-slate-300]="!(form.get('usoSuelo.usoSueloPcaOtro')?.invalid && form.get('usoSuelo.usoSueloPcaOtro')?.touched)"
                placeholder="Especifique el uso de suelo" maxlength="32" />
              @if (form.get('usoSuelo.usoSueloPcaOtro')?.invalid && form.get('usoSuelo.usoSueloPcaOtro')?.touched) {
                <span class="text-red-500 text-[11px] mt-1">Este campo es obligatorio.</span>
              }
            </div>
          }

          <!-- Caracterizaci\xF3n horaria -->
          <div class="flex flex-col">
            <label class="block text-[11px] font-bold uppercase mb-1"
              [class.text-red-600]="form.get('usoSuelo.caracterizacionId')?.invalid && form.get('usoSuelo.caracterizacionId')?.touched"
              [class.text-[#1e3a8a]]="!(form.get('usoSuelo.caracterizacionId')?.invalid && form.get('usoSuelo.caracterizacionId')?.touched)">
              Caracterizaci\xF3n horaria <span class="text-red-500">*</span>
            </label>
            <select formControlName="caracterizacionId"
              class="w-full border bg-white text-slate-700 p-2.5 rounded text-sm outline-none focus:border-[#1e3a8a] transition-colors"
              [class.border-red-400]="form.get('usoSuelo.caracterizacionId')?.invalid && form.get('usoSuelo.caracterizacionId')?.touched"
              [class.border-slate-300]="!(form.get('usoSuelo.caracterizacionId')?.invalid && form.get('usoSuelo.caracterizacionId')?.touched)">
              <option [ngValue]="null" disabled>Seleccione...</option>
              @for (op of caracterizacionOpciones; track op.id) {
                <option [ngValue]="op.id">{{ op.nombre }}</option>
              }
            </select>
            @if (form.get('usoSuelo.caracterizacionId')?.invalid && form.get('usoSuelo.caracterizacionId')?.touched) {
              <span class="text-red-500 text-[11px] mt-1">Este campo es obligatorio.</span>
            }
          </div>

          <!-- Direcci\xF3n PCA -->
          <div class="flex flex-col">
            <label class="block text-[11px] font-bold uppercase mb-1"
              [class.text-red-600]="form.get('usoSuelo.direccionPca')?.invalid && form.get('usoSuelo.direccionPca')?.touched"
              [class.text-[#1e3a8a]]="!(form.get('usoSuelo.direccionPca')?.invalid && form.get('usoSuelo.direccionPca')?.touched)">
              Direcci\xF3n PCA <span class="text-red-500">*</span>
            </label>
            <input formControlName="direccionPca"
              class="w-full border bg-white text-slate-700 p-2.5 rounded text-sm outline-none focus:border-[#1e3a8a] transition-colors"
              [class.border-red-400]="form.get('usoSuelo.direccionPca')?.invalid && form.get('usoSuelo.direccionPca')?.touched"
              [class.border-slate-300]="!(form.get('usoSuelo.direccionPca')?.invalid && form.get('usoSuelo.direccionPca')?.touched)"
              placeholder="Ej: Av. Eloy Alfaro N43-185 y Jos\xE9 Queri" maxlength="128" />
            @if (form.get('usoSuelo.direccionPca')?.invalid && form.get('usoSuelo.direccionPca')?.touched) {
              <span class="text-red-500 text-[11px] mt-1">Este campo es obligatorio.</span>
            }
          </div>

          <!-- Tel\xE9fono PCA -->
          <div class="flex flex-col">
            <label class="block text-[11px] font-bold text-[#1e3a8a] uppercase mb-1">Tel\xE9fono PCA</label>
            <input formControlName="telefonoPca"
              class="w-full border border-slate-300 bg-white text-slate-700 p-2.5 rounded text-sm outline-none focus:border-[#1e3a8a] transition-colors"
              placeholder="Ej: 098483595" maxlength="10" />
          </div>

        </div>
      </section>
    }

    <!-- Observaciones (opcional) -->
    <section class="border border-slate-200 rounded-sm overflow-hidden shadow-sm mb-6">
      <div class="bg-[#f8fafc] border-b border-slate-200 px-5 py-3">
        <h4 class="font-bold text-[#1e3a8a] text-sm uppercase">Observaciones <span class="text-slate-400 font-normal normal-case text-xs">(opcional)</span></h4>
      </div>
      <div class="p-5">
        <textarea
          formControlName="observaciones"
          [rows]="3"
          class="w-full border border-slate-300 rounded p-3 text-sm resize-none outline-none focus:border-[#1e3a8a] bg-white text-slate-700"
          placeholder="Ingrese observaciones adicionales...">
        </textarea>
      </div>
    </section>

    <!-- Notas -->
    <div class="bg-slate-50 border border-slate-200 rounded p-4 mb-6">
      <p class="text-[11px] font-bold text-slate-800 mb-2">\u24D8 Notas Importantes:</p>
      <ul class="list-decimal pl-4 space-y-1">
        <li class="text-[11px] text-slate-600 leading-tight">Los ensayos marcados con (*) no est\xE1n incluidos en el alcance de acreditaci\xF3n del SAE.</li>
        <li class="text-[11px] text-slate-600 leading-tight">Los resultados obtenidos podr\xE1n utilizarse para la elaboraci\xF3n de informes t\xE9cnicos cuando as\xED lo requiera la Secretar\xEDa de Ambiente.</li>
      </ul>
    </div>

    <!-- Nav buttons est\xE1ndar -->
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
          {{ modoEdicion ? 'Actualizando...' : 'Guardando...' }}
        } @else {
          {{ modoEdicion ? 'ACTUALIZAR' : 'GUARDAR' }}
        }
      </button>
    </div>

  </form>
</div>
` }]
  }], () => [{ type: FormBuilder }, { type: ReportSolicitudService }, { type: SolicitudDetalleService }, { type: CatalogoService }, { type: OrdenTrabajoService }, { type: ReportOrdenService }, { type: AuthService }, { type: PeriodoService }, { type: ToastrAlertService }], { editingRecord: [{
    type: Input
  }], guardado: [{
    type: Output
  }], cancelado: [{
    type: Output
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(OrdenTrabajoInSituFormulario, { className: "OrdenTrabajoInSituFormulario", filePath: "src/app/features/orden-trabajo-in-situ/formulario/orden-trabajo-in-situ-formulario.ts", lineNumber: 29 });
})();

// src/app/features/orden-trabajo-in-situ/orden-trabajo-in-situ.ts
function OrdenTrabajoInSitu_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "app-orden-trabajo-in-situ-lista", 5);
    \u0275\u0275listener("nuevaOrden", function OrdenTrabajoInSitu_Conditional_4_Template_app_orden_trabajo_in_situ_lista_nuevaOrden_0_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.irAFormulario());
    })("editar", function OrdenTrabajoInSitu_Conditional_4_Template_app_orden_trabajo_in_situ_lista_editar_0_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onEditar($event));
    });
    \u0275\u0275elementEnd();
  }
}
function OrdenTrabajoInSitu_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "app-orden-trabajo-in-situ-formulario", 6);
    \u0275\u0275listener("guardado", function OrdenTrabajoInSitu_Conditional_5_Template_app_orden_trabajo_in_situ_formulario_guardado_0_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.volverALista());
    })("cancelado", function OrdenTrabajoInSitu_Conditional_5_Template_app_orden_trabajo_in_situ_formulario_cancelado_0_listener() {
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
var OrdenTrabajoInSitu = class _OrdenTrabajoInSitu {
  vista = "lista";
  editingRecord = null;
  irAFormulario() {
    this.editingRecord = null;
    this.vista = "formulario";
  }
  onEditar(orden) {
    this.editingRecord = orden;
    this.vista = "formulario";
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  volverALista() {
    this.editingRecord = null;
    this.vista = "lista";
  }
  static \u0275fac = function OrdenTrabajoInSitu_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _OrdenTrabajoInSitu)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _OrdenTrabajoInSitu, selectors: [["app-orden-trabajo-in-situ"]], decls: 6, vars: 2, consts: [[1, "p-6", "bg-slate-50", "min-h-screen", "text-slate-700", "font-sans", "pb-24"], [1, "max-w-7xl", "mx-auto"], [1, "animate-in", "fade-in"], ["breadcrumbSection", "Operaciones de campo", "title", "Orden de trabajo In Situ", "subtitle", "Aqu\xED podr\xE1s visualizar los detalles de la orden de trabajo In Situ", "codigoFormulario", "F-PG-09-03", "edicion", "16"], [3, "editingRecord"], [3, "nuevaOrden", "editar"], [3, "guardado", "cancelado", "editingRecord"]], template: function OrdenTrabajoInSitu_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div", 2);
      \u0275\u0275element(3, "app-page-header", 3);
      \u0275\u0275conditionalCreate(4, OrdenTrabajoInSitu_Conditional_4_Template, 1, 0, "app-orden-trabajo-in-situ-lista");
      \u0275\u0275conditionalCreate(5, OrdenTrabajoInSitu_Conditional_5_Template, 1, 1, "app-orden-trabajo-in-situ-formulario", 4);
      \u0275\u0275elementEnd()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(4);
      \u0275\u0275conditional(ctx.vista === "lista" ? 4 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.vista === "formulario" ? 5 : -1);
    }
  }, dependencies: [PageHeader, OrdenTrabajoInSituLista, OrdenTrabajoInSituFormulario], styles: ["\n\n.animate-in[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_animateIn 0.3s ease-out forwards;\n}\n.fade-in[_ngcontent-%COMP%] {\n  opacity: 0;\n}\n.slide-in-from-bottom-4[_ngcontent-%COMP%] {\n  transform: translateY(1rem);\n}\n.slide-in-from-right-4[_ngcontent-%COMP%] {\n  transform: translateX(1rem);\n}\n@keyframes _ngcontent-%COMP%_animateIn {\n  to {\n    opacity: 1;\n    transform: translate(0);\n  }\n}\n.custom-scroll[_ngcontent-%COMP%]::-webkit-scrollbar {\n  width: 6px;\n  height: 6px;\n}\n.custom-scroll[_ngcontent-%COMP%]::-webkit-scrollbar-track {\n  background: #f1f5f9;\n  border-radius: 4px;\n}\n.custom-scroll[_ngcontent-%COMP%]::-webkit-scrollbar-thumb {\n  background: #cbd5e1;\n  border-radius: 4px;\n}\n.custom-scroll[_ngcontent-%COMP%]::-webkit-scrollbar-thumb:hover {\n  background: #94a3b8;\n}\ninput[_ngcontent-%COMP%]:focus, \nselect[_ngcontent-%COMP%]:focus, \ntextarea[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: #1e3a8a;\n  box-shadow: 0 0 0 1px #1e3a8a;\n}\n/*# sourceMappingURL=orden-trabajo-in-situ.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(OrdenTrabajoInSitu, [{
    type: Component,
    args: [{ selector: "app-orden-trabajo-in-situ", imports: [PageHeader, OrdenTrabajoInSituLista, OrdenTrabajoInSituFormulario], template: `<div class="p-6 bg-slate-50 min-h-screen text-slate-700 font-sans pb-24">
  <div class="max-w-7xl mx-auto">
    <div class="animate-in fade-in">

      <app-page-header
        breadcrumbSection="Operaciones de campo"
        title="Orden de trabajo In Situ"
        subtitle="Aqu\xED podr\xE1s visualizar los detalles de la orden de trabajo In Situ"
        codigoFormulario="F-PG-09-03"
        edicion="16"
      />

      @if (vista === 'lista') {
        <app-orden-trabajo-in-situ-lista
          (nuevaOrden)="irAFormulario()"
          (editar)="onEditar($event)"
        />
      }

      @if (vista === 'formulario') {
        <app-orden-trabajo-in-situ-formulario
          [editingRecord]="editingRecord"
          (guardado)="volverALista()"
          (cancelado)="volverALista()"
        />
      }

    </div>
  </div>
</div>
`, styles: ["/* src/app/features/orden-trabajo-in-situ/orden-trabajo-in-situ.css */\n.animate-in {\n  animation: animateIn 0.3s ease-out forwards;\n}\n.fade-in {\n  opacity: 0;\n}\n.slide-in-from-bottom-4 {\n  transform: translateY(1rem);\n}\n.slide-in-from-right-4 {\n  transform: translateX(1rem);\n}\n@keyframes animateIn {\n  to {\n    opacity: 1;\n    transform: translate(0);\n  }\n}\n.custom-scroll::-webkit-scrollbar {\n  width: 6px;\n  height: 6px;\n}\n.custom-scroll::-webkit-scrollbar-track {\n  background: #f1f5f9;\n  border-radius: 4px;\n}\n.custom-scroll::-webkit-scrollbar-thumb {\n  background: #cbd5e1;\n  border-radius: 4px;\n}\n.custom-scroll::-webkit-scrollbar-thumb:hover {\n  background: #94a3b8;\n}\ninput:focus,\nselect:focus,\ntextarea:focus {\n  outline: none;\n  border-color: #1e3a8a;\n  box-shadow: 0 0 0 1px #1e3a8a;\n}\n/*# sourceMappingURL=orden-trabajo-in-situ.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(OrdenTrabajoInSitu, { className: "OrdenTrabajoInSitu", filePath: "src/app/features/orden-trabajo-in-situ/orden-trabajo-in-situ.ts", lineNumber: 13 });
})();
export {
  OrdenTrabajoInSitu
};
//# sourceMappingURL=chunk-QEWYAT2B.js.map
