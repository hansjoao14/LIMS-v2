import {
  Router,
  RouterOutlet,
  provideRouter
} from "./chunk-TEDJSKV5.js";
import {
  provideToastr
} from "./chunk-PWNMWNUA.js";
import {
  DomRendererFactory2,
  bootstrapApplication
} from "./chunk-XTPUTV4O.js";
import {
  RoleAccess
} from "./chunk-O4XHAB45.js";
import {
  require_sweetalert2_all
} from "./chunk-TTWGDTQR.js";
import {
  APOLLO_NAMED_OPTIONS,
  ApolloLink,
  InMemoryCache,
  print,
  provideApollo
} from "./chunk-7OA5XFJQ.js";
import {
  AuthService,
  HttpClient,
  HttpContext,
  HttpHeaders,
  environment,
  provideHttpClient,
  registerLocaleData
} from "./chunk-FYBL3SR2.js";
import {
  ANIMATION_MODULE_TYPE,
  ChangeDetectionScheduler,
  Component,
  DOCUMENT,
  EMPTY,
  Injectable,
  InjectionToken,
  Injector,
  NgZone,
  Observable,
  RendererFactory2,
  RuntimeError,
  __spreadProps,
  __spreadValues,
  __toESM,
  inject,
  makeEnvironmentProviders,
  performanceMarkFeature,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵdefineComponent,
  ɵɵdefineInjectable,
  ɵɵelement,
  ɵɵinject,
  ɵɵinvalidFactory
} from "./chunk-4XEQTJJK.js";

// node_modules/@angular/platform-browser/fesm2022/animations-async.mjs
var ANIMATION_PREFIX = "@";
var AsyncAnimationRendererFactory = class _AsyncAnimationRendererFactory {
  doc;
  delegate;
  zone;
  animationType;
  moduleImpl;
  _rendererFactoryPromise = null;
  scheduler = null;
  injector = inject(Injector);
  loadingSchedulerFn = inject(\u0275ASYNC_ANIMATION_LOADING_SCHEDULER_FN, {
    optional: true
  });
  _engine;
  constructor(doc, delegate, zone, animationType, moduleImpl) {
    this.doc = doc;
    this.delegate = delegate;
    this.zone = zone;
    this.animationType = animationType;
    this.moduleImpl = moduleImpl;
  }
  ngOnDestroy() {
    this._engine?.flush();
  }
  loadImpl() {
    const loadFn = () => this.moduleImpl ?? import("./chunk-7FA57MTC.js").then((m) => m);
    let moduleImplPromise;
    if (this.loadingSchedulerFn) {
      moduleImplPromise = this.loadingSchedulerFn(loadFn);
    } else {
      moduleImplPromise = loadFn();
    }
    return moduleImplPromise.catch((e) => {
      throw new RuntimeError(5300, (typeof ngDevMode === "undefined" || ngDevMode) && "Async loading for animations package was enabled, but loading failed. Angular falls back to using regular rendering. No animations will be displayed and their styles won't be applied.");
    }).then(({
      \u0275createEngine,
      \u0275AnimationRendererFactory
    }) => {
      this._engine = \u0275createEngine(this.animationType, this.doc);
      const rendererFactory = new \u0275AnimationRendererFactory(this.delegate, this._engine, this.zone);
      this.delegate = rendererFactory;
      return rendererFactory;
    });
  }
  createRenderer(hostElement, rendererType) {
    const renderer = this.delegate.createRenderer(hostElement, rendererType);
    if (renderer.\u0275type === 0) {
      return renderer;
    }
    if (typeof renderer.throwOnSyntheticProps === "boolean") {
      renderer.throwOnSyntheticProps = false;
    }
    const dynamicRenderer = new DynamicDelegationRenderer(renderer);
    if (rendererType?.data?.["animation"] && !this._rendererFactoryPromise) {
      this._rendererFactoryPromise = this.loadImpl();
    }
    this._rendererFactoryPromise?.then((animationRendererFactory) => {
      const animationRenderer = animationRendererFactory.createRenderer(hostElement, rendererType);
      dynamicRenderer.use(animationRenderer);
      this.scheduler ??= this.injector.get(ChangeDetectionScheduler, null, {
        optional: true
      });
      this.scheduler?.notify(10);
    }).catch((e) => {
      dynamicRenderer.use(renderer);
    });
    return dynamicRenderer;
  }
  begin() {
    this.delegate.begin?.();
  }
  end() {
    this.delegate.end?.();
  }
  whenRenderingDone() {
    return this.delegate.whenRenderingDone?.() ?? Promise.resolve();
  }
  componentReplaced(componentId) {
    this._engine?.flush();
    this.delegate.componentReplaced?.(componentId);
  }
  static \u0275fac = function AsyncAnimationRendererFactory_Factory(__ngFactoryType__) {
    \u0275\u0275invalidFactory();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({
    token: _AsyncAnimationRendererFactory,
    factory: _AsyncAnimationRendererFactory.\u0275fac
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AsyncAnimationRendererFactory, [{
    type: Injectable
  }], () => [{
    type: Document
  }, {
    type: RendererFactory2
  }, {
    type: NgZone
  }, {
    type: void 0
  }, {
    type: Promise
  }], null);
})();
var DynamicDelegationRenderer = class {
  delegate;
  replay = [];
  \u0275type = 1;
  constructor(delegate) {
    this.delegate = delegate;
  }
  use(impl) {
    this.delegate = impl;
    if (this.replay !== null) {
      for (const fn of this.replay) {
        fn(impl);
      }
      this.replay = null;
    }
  }
  get data() {
    return this.delegate.data;
  }
  destroy() {
    this.replay = null;
    this.delegate.destroy();
  }
  createElement(name, namespace) {
    return this.delegate.createElement(name, namespace);
  }
  createComment(value) {
    return this.delegate.createComment(value);
  }
  createText(value) {
    return this.delegate.createText(value);
  }
  get destroyNode() {
    return this.delegate.destroyNode;
  }
  appendChild(parent, newChild) {
    this.delegate.appendChild(parent, newChild);
  }
  insertBefore(parent, newChild, refChild, isMove) {
    this.delegate.insertBefore(parent, newChild, refChild, isMove);
  }
  removeChild(parent, oldChild, isHostElement, requireSynchronousElementRemoval) {
    this.delegate.removeChild(parent, oldChild, isHostElement, requireSynchronousElementRemoval);
  }
  selectRootElement(selectorOrNode, preserveContent) {
    return this.delegate.selectRootElement(selectorOrNode, preserveContent);
  }
  parentNode(node) {
    return this.delegate.parentNode(node);
  }
  nextSibling(node) {
    return this.delegate.nextSibling(node);
  }
  setAttribute(el, name, value, namespace) {
    this.delegate.setAttribute(el, name, value, namespace);
  }
  removeAttribute(el, name, namespace) {
    this.delegate.removeAttribute(el, name, namespace);
  }
  addClass(el, name) {
    this.delegate.addClass(el, name);
  }
  removeClass(el, name) {
    this.delegate.removeClass(el, name);
  }
  setStyle(el, style, value, flags) {
    this.delegate.setStyle(el, style, value, flags);
  }
  removeStyle(el, style, flags) {
    this.delegate.removeStyle(el, style, flags);
  }
  setProperty(el, name, value) {
    if (this.shouldReplay(name)) {
      this.replay.push((renderer) => renderer.setProperty(el, name, value));
    }
    this.delegate.setProperty(el, name, value);
  }
  setValue(node, value) {
    this.delegate.setValue(node, value);
  }
  listen(target, eventName, callback, options) {
    if (this.shouldReplay(eventName)) {
      this.replay.push((renderer) => renderer.listen(target, eventName, callback, options));
    }
    return this.delegate.listen(target, eventName, callback, options);
  }
  shouldReplay(propOrEventName) {
    return this.replay !== null && propOrEventName.startsWith(ANIMATION_PREFIX);
  }
};
var \u0275ASYNC_ANIMATION_LOADING_SCHEDULER_FN = new InjectionToken(typeof ngDevMode !== "undefined" && ngDevMode ? "async_animation_loading_scheduler_fn" : "");
function provideAnimationsAsync(type = "animations") {
  performanceMarkFeature("NgAsyncAnimations");
  if (false) {
    type = "noop";
  }
  return makeEnvironmentProviders([{
    provide: RendererFactory2,
    useFactory: () => {
      return new AsyncAnimationRendererFactory(inject(DOCUMENT), inject(DomRendererFactory2), inject(NgZone), type);
    }
  }, {
    provide: ANIMATION_MODULE_TYPE,
    useValue: type === "noop" ? "NoopAnimations" : "BrowserAnimations"
  }]);
}

// src/app/core/guards/roles.guard.ts
var import_sweetalert2 = __toESM(require_sweetalert2_all());
var canActivateWithRealmRoles = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  if (!authService.rawAccessToken || authService.isTokenExpired()) {
    import_sweetalert2.default.fire({
      icon: "warning",
      title: "Sesi\xF3n expirada",
      text: "Por favor, inicia sesi\xF3n nuevamente.",
      confirmButtonColor: "#28367F"
    });
    return router.createUrlTree(["/login"]);
  }
  const requiredRolesConfig = route.data["requiredRoles"];
  if (!requiredRolesConfig || requiredRolesConfig.length === 0)
    return true;
  let userRoles = authService.userProfile()?.roles;
  if (!userRoles) {
    const storedRoles = localStorage.getItem("user_roles");
    userRoles = storedRoles ? JSON.parse(storedRoles) : [];
  }
  const requiredRolesList = requiredRolesConfig.map((r) => r.role);
  const hasRole = userRoles?.some((role) => requiredRolesList.includes(role));
  console.groupEnd();
  if (hasRole) {
    return true;
  }
  console.error("Acceso Denegado: Roles insuficientes.");
  import_sweetalert2.default.fire({
    icon: "error",
    title: "Acceso Denegado",
    text: `No tienes los permisos necesarios para acceder a esta secci\xF3n. Se requieren roles: ${requiredRolesList.join(", ")}`,
    confirmButtonColor: "#28367F",
    confirmButtonText: "Entendido"
  });
  return router.createUrlTree(["/login"]);
};

// src/app/features/features.routes.ts
var featuresRoutes = [
  {
    path: "dashboard",
    loadComponent: () => import("./chunk-D3V7MOTL.js").then((m) => m.Dashboard),
    canActivate: [canActivateWithRealmRoles],
    data: { title: "Dashboard", requiredRoles: RoleAccess.ALL_USERS }
  },
  {
    path: "solicitud-trabajo",
    loadComponent: () => import("./chunk-QTCIWYIF.js").then((m) => m.SolicitudTrabajo),
    canActivate: [canActivateWithRealmRoles],
    data: { title: "Solicitud de Trabajo", requiredRoles: RoleAccess.SOLICITUD_TRABAJO }
  },
  {
    path: "admin-formularios",
    loadComponent: () => import("./chunk-7WBQCRKG.js").then((m) => m.AdminFormularios),
    canActivate: [canActivateWithRealmRoles],
    data: { title: "Administraci\xF3n de Formularios", requiredRoles: RoleAccess.ADMIN_ONLY }
  },
  {
    path: "lista-solicitudes",
    loadComponent: () => import("./chunk-4S2ZD33S.js").then((m) => m.ListaSolicitudes),
    canActivate: [canActivateWithRealmRoles],
    data: { title: "Lista de Solicitudes", requiredRoles: RoleAccess.LISTA_SOLICITUDES }
  },
  {
    path: "lista-cotizaciones",
    loadComponent: () => import("./chunk-GPESQXAZ.js").then((m) => m.ListaCotizaciones),
    canActivate: [canActivateWithRealmRoles],
    data: { title: "Por Autorizar", requiredRoles: RoleAccess.LISTA_COTIZACIONES }
  },
  {
    path: "horarios-laborales",
    loadComponent: () => import("./chunk-LBSVO4ZE.js").then((m) => m.HorariosLaborales),
    canActivate: [canActivateWithRealmRoles],
    data: { title: "Horarios Laborales", requiredRoles: RoleAccess.HORARIOS_LABORALES }
  },
  {
    path: "por-contraloria",
    loadComponent: () => import("./chunk-GQQVW6WE.js").then((m) => m.PorContraloria),
    canActivate: [canActivateWithRealmRoles],
    data: { title: "Por Contralor\xEDa", requiredRoles: RoleAccess.POR_CONTRALORIA }
  },
  {
    path: "orden-trabajo-in-situ",
    loadComponent: () => import("./chunk-QEWYAT2B.js").then((m) => m.OrdenTrabajoInSitu),
    canActivate: [canActivateWithRealmRoles],
    data: { title: "Orden de Trabajo In Situ", requiredRoles: RoleAccess.ORDEN_IN_SITU }
  },
  {
    path: "plan-muestreo",
    loadComponent: () => import("./chunk-AYM66RGA.js").then((m) => m.PlanMuestreo),
    canActivate: [canActivateWithRealmRoles],
    data: { title: "Plan de Muestreo", requiredRoles: RoleAccess.PLAN_MUESTREO }
  },
  {
    path: "plan-muestreo/paso2",
    loadComponent: () => import("./chunk-FEUPTCDS.js").then((m) => m.PlanMuestreoPaso2),
    canActivate: [canActivateWithRealmRoles],
    data: { title: "Plan de Muestreo - Paso 2", requiredRoles: RoleAccess.PLAN_MUESTREO }
  },
  {
    path: "plan-muestreo/paso3",
    loadComponent: () => import("./chunk-ZUQBYGUV.js").then((m) => m.PlanMuestreoPaso3),
    canActivate: [canActivateWithRealmRoles],
    data: { title: "Plan de Muestreo - Paso 3", requiredRoles: RoleAccess.PLAN_MUESTREO }
  },
  {
    path: "calibracion-equipos",
    loadComponent: () => import("./chunk-WYHIZFKV.js").then((m) => m.CalibracionEquipos),
    canActivate: [canActivateWithRealmRoles],
    data: { title: "Calibraci\xF3n de Equipos", requiredRoles: RoleAccess.CALIBRACION_EQUIPOS }
  }
];

// src/app/app.routes.ts
var routes = [
  {
    path: "",
    redirectTo: "login",
    pathMatch: "full"
  },
  {
    path: "",
    loadComponent: () => import("./chunk-RBB5CGZ2.js").then((m) => m.Layout),
    children: featuresRoutes
  },
  {
    path: "login",
    loadComponent: () => import("./chunk-KC7S2VBP.js").then((m) => m.Login),
    // canActivate: [AuthenticatedGuard]
    data: {
      title: "Login"
    }
  }
];

// node_modules/@angular/common/locales/es-EC.js
var u = void 0;
function plural(val) {
  const n = val, i = Math.floor(Math.abs(val)), v = val.toString().replace(/^[^.]*\.?/, "").length, e = parseInt(val.toString().replace(/^[^e]*(e([-+]?\d+))?/, "$2")) || 0;
  if (n === 1)
    return 1;
  if (e === 0 && (!(i === 0) && (i % 1e6 === 0 && v === 0)) || !(e >= 0 && e <= 5))
    return 4;
  return 5;
}
var es_EC_default = ["es-EC", [["a.\u202Fm.", "p.\u202Fm."], u, ["a.\xA0m.", "p.\xA0m."]], u, [["D", "L", "M", "M", "J", "V", "S"], ["dom", "lun", "mar", "mi\xE9", "jue", "vie", "s\xE1b"], ["domingo", "lunes", "martes", "mi\xE9rcoles", "jueves", "viernes", "s\xE1bado"], ["DO", "LU", "MA", "MI", "JU", "VI", "SA"]], u, [["E", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"], ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sept", "oct", "nov", "dic"], ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"]], u, [["a.C.", "d.C."], u, ["antes de Cristo", "despu\xE9s de Cristo"]], 1, [6, 0], ["d/M/yy", "d MMM y", "d 'de' MMMM 'de' y", "EEEE, d 'de' MMMM 'de' y"], ["h:mm\u202Fa", "h:mm:ss\u202Fa", "h:mm:ss\u202Fa z", "h:mm:ss\u202Fa zzzz"], ["{1}, {0}", u, u, u], [",", ".", ";", "%", "+", "-", "E", "\xD7", "\u2030", "\u221E", "NaN", ":"], ["#,##0.###", "#,##0%", "\xA4#,##0.00;\xA4-#,##0.00", "#E0"], "USD", "$", "d\xF3lar estadounidense", { "AUD": [u, "$"], "BRL": [u, "R$"], "BYN": [u, "\u0440."], "CAD": [u, "$"], "CNY": [u, "\xA5"], "ESP": ["\u20A7"], "EUR": [u, "\u20AC"], "FKP": [u, "FK\xA3"], "GBP": [u, "\xA3"], "HKD": [u, "$"], "ILS": [u, "\u20AA"], "INR": [u, "\u20B9"], "JPY": [u, "\xA5"], "KRW": [u, "\u20A9"], "MXN": [u, "$"], "NZD": [u, "$"], "PHP": [u, "\u20B1"], "RON": [u, "L"], "SSP": [u, "SD\xA3"], "SYP": [u, "S\xA3"], "TWD": [u, "NT$"], "VEF": [u, "BsF"], "VND": [u, "\u20AB"], "XAF": [], "XCD": [u, "$"], "XOF": [] }, "ltr", plural];

// node_modules/@apollo/client/link/batch/batching.js
var OperationBatcher = class {
  // Queue on which the QueryBatcher will operate on a per-tick basis.
  batchesByKey = /* @__PURE__ */ new Map();
  scheduledBatchTimerByKey = /* @__PURE__ */ new Map();
  batchDebounce;
  batchInterval;
  batchMax;
  //This function is called to the queries in the queue to the server.
  batchHandler;
  batchKey;
  constructor({ batchDebounce, batchInterval, batchMax, batchHandler, batchKey }) {
    this.batchDebounce = batchDebounce;
    this.batchInterval = batchInterval;
    this.batchMax = batchMax || 0;
    this.batchHandler = batchHandler;
    this.batchKey = batchKey || (() => "");
  }
  enqueueRequest(request) {
    const requestCopy = __spreadProps(__spreadValues({}, request), {
      next: [],
      error: [],
      complete: [],
      subscribers: /* @__PURE__ */ new Set()
    });
    const key = this.batchKey(request.operation);
    if (!requestCopy.observable) {
      requestCopy.observable = new Observable((observer) => {
        let batch = this.batchesByKey.get(key);
        if (!batch)
          this.batchesByKey.set(key, batch = /* @__PURE__ */ new Set());
        const isFirstEnqueuedRequest = batch.size === 0;
        const isFirstSubscriber = requestCopy.subscribers.size === 0;
        requestCopy.subscribers.add(observer);
        if (isFirstSubscriber) {
          batch.add(requestCopy);
        }
        if (observer.next) {
          requestCopy.next.push(observer.next.bind(observer));
        }
        if (observer.error) {
          requestCopy.error.push(observer.error.bind(observer));
        }
        if (observer.complete) {
          requestCopy.complete.push(observer.complete.bind(observer));
        }
        if (isFirstEnqueuedRequest || this.batchDebounce) {
          this.scheduleQueueConsumption(key);
        }
        if (batch.size === this.batchMax) {
          this.consumeQueue(key);
        }
        return () => {
          if (requestCopy.subscribers.delete(observer) && requestCopy.subscribers.size < 1) {
            if (batch.delete(requestCopy) && batch.size < 1) {
              this.consumeQueue(key);
              batch.subscription?.unsubscribe();
            }
          }
        };
      });
    }
    return requestCopy.observable;
  }
  // Consumes the queue.
  // Returns a list of promises (one for each query).
  consumeQueue(key = "") {
    const batch = this.batchesByKey.get(key);
    this.batchesByKey.delete(key);
    if (!batch || !batch.size) {
      return;
    }
    const operations = [];
    const forwards = [];
    const observables = [];
    const nexts = [];
    const errors = [];
    const completes = [];
    batch.forEach((request) => {
      operations.push(request.operation);
      forwards.push(request.forward);
      observables.push(request.observable);
      nexts.push(request.next);
      errors.push(request.error);
      completes.push(request.complete);
    });
    const batchedObservable = this.batchHandler(operations, forwards);
    const onError = (error) => {
      errors.forEach((rejecters) => {
        if (rejecters) {
          rejecters.forEach((e) => e(error));
        }
      });
    };
    batch.subscription = batchedObservable.subscribe({
      next: (results) => {
        if (!Array.isArray(results)) {
          results = [results];
        }
        if (nexts.length !== results.length) {
          const error = new Error(`server returned results with length ${results.length}, expected length of ${nexts.length}`);
          error.result = results;
          return onError(error);
        }
        results.forEach((result, index) => {
          if (nexts[index]) {
            nexts[index].forEach((next) => next(result));
          }
        });
      },
      error: onError,
      complete: () => {
        completes.forEach((complete) => {
          if (complete) {
            complete.forEach((c) => c());
          }
        });
      }
    });
    return observables;
  }
  scheduleQueueConsumption(key) {
    clearTimeout(this.scheduledBatchTimerByKey.get(key));
    this.scheduledBatchTimerByKey.set(key, setTimeout(() => {
      this.consumeQueue(key);
      this.scheduledBatchTimerByKey.delete(key);
    }, this.batchInterval));
  }
};

// node_modules/@apollo/client/link/batch/batchLink.js
var BatchLink = class extends ApolloLink {
  batcher;
  constructor(options) {
    super();
    const { batchDebounce, batchInterval = 10, batchMax = 0, batchHandler = () => EMPTY, batchKey = () => "" } = options || {};
    this.batcher = new OperationBatcher({
      batchDebounce,
      batchInterval,
      batchMax,
      batchHandler,
      batchKey
    });
  }
  request(operation, forward) {
    return this.batcher.enqueueRequest({ operation, forward });
  }
};

// node_modules/apollo-angular/fesm2022/apollo-angular-http.mjs
var fetch = (req, httpClient, extractFiles) => {
  const shouldUseBody = ["POST", "PUT", "PATCH"].indexOf(req.method.toUpperCase()) !== -1;
  const shouldStringify = (param) => ["variables", "extensions"].indexOf(param.toLowerCase()) !== -1;
  const isBatching = req.body.length;
  let shouldUseMultipart = req.options && req.options.useMultipart;
  let multipartInfo;
  if (shouldUseMultipart) {
    if (isBatching) {
      return new Observable((observer) => observer.error(new Error("File upload is not available when combined with Batching")));
    }
    if (!shouldUseBody) {
      return new Observable((observer) => observer.error(new Error("File upload is not available when GET is used")));
    }
    if (!extractFiles) {
      return new Observable((observer) => observer.error(new Error(`To use File upload you need to pass "extractFiles" function from "extract-files" library to HttpLink's options`)));
    }
    multipartInfo = extractFiles(req.body);
    shouldUseMultipart = !!multipartInfo.files.size;
  }
  let bodyOrParams = {};
  if (isBatching) {
    if (!shouldUseBody) {
      return new Observable((observer) => observer.error(new Error("Batching is not available for GET requests")));
    }
    bodyOrParams = {
      body: req.body
    };
  } else {
    const body = shouldUseMultipart ? multipartInfo.clone : req.body;
    if (shouldUseBody) {
      bodyOrParams = {
        body
      };
    } else {
      const params = Object.keys(req.body).reduce((obj, param) => {
        const value = req.body[param];
        obj[param] = shouldStringify(param) ? JSON.stringify(value) : value;
        return obj;
      }, {});
      bodyOrParams = {
        params
      };
    }
  }
  if (shouldUseMultipart && shouldUseBody) {
    const form = new FormData();
    form.append("operations", JSON.stringify(bodyOrParams.body));
    const map = {};
    const files = multipartInfo.files;
    let i = 0;
    files.forEach((paths) => {
      map[++i] = paths;
    });
    form.append("map", JSON.stringify(map));
    i = 0;
    files.forEach((_, file) => {
      form.append(++i + "", file, file.name);
    });
    bodyOrParams.body = form;
  }
  return httpClient.request(req.method, req.url, __spreadValues(__spreadValues({
    observe: "response",
    responseType: "json",
    reportProgress: false
  }, bodyOrParams), req.options));
};
var mergeHeaders = (source, destination) => {
  if (source && destination) {
    const merged = destination.keys().reduce((headers, name) => headers.set(name, destination.getAll(name)), source);
    return merged;
  }
  return destination || source;
};
var mergeHttpContext = (source, destination) => {
  if (source && destination) {
    return [...source.keys()].reduce((context, name) => context.set(name, source.get(name)), destination);
  }
  return destination || source;
};
function prioritize(...values) {
  return values.find((val) => typeof val !== "undefined");
}
function createHeadersWithClientAwareness(context) {
  let headers = context.headers && context.headers instanceof HttpHeaders ? context.headers : new HttpHeaders(context.headers);
  if (context.clientAwareness) {
    const {
      name,
      version
    } = context.clientAwareness;
    if (name && !headers.has("apollographql-client-name")) {
      headers = headers.set("apollographql-client-name", name);
    }
    if (version && !headers.has("apollographql-client-version")) {
      headers = headers.set("apollographql-client-version", version);
    }
  }
  return headers;
}
var defaults = {
  batchInterval: 10,
  batchMax: 10,
  uri: "graphql",
  method: "POST",
  withCredentials: false,
  includeQuery: true,
  includeExtensions: false,
  useMultipart: false
};
function pick(context, options, key) {
  return prioritize(context[key], options[key], defaults[key]);
}
var HttpBatchLinkHandler = class extends ApolloLink {
  httpClient;
  options;
  batcher;
  batchInterval;
  batchMax;
  print = print;
  constructor(httpClient, options) {
    super();
    this.httpClient = httpClient;
    this.options = options;
    this.batchInterval = options.batchInterval || defaults.batchInterval;
    this.batchMax = options.batchMax || defaults.batchMax;
    if (this.options.operationPrinter) {
      this.print = this.options.operationPrinter;
    }
    const batchHandler = (operations) => {
      return new Observable((observer) => {
        const body = this.createBody(operations);
        const headers = this.createHeaders(operations);
        const context = this.createHttpContext(operations);
        const {
          method,
          uri,
          withCredentials
        } = this.createOptions(operations);
        if (typeof uri === "function") {
          throw new Error(`Option 'uri' is a function, should be a string`);
        }
        const req = {
          method,
          url: uri,
          body,
          options: {
            withCredentials,
            headers,
            context
          }
        };
        const sub = fetch(req, this.httpClient, () => {
          throw new Error("File upload is not available when combined with Batching");
        }).subscribe({
          next: (result) => observer.next(result.body),
          error: (err) => observer.error(err),
          complete: () => observer.complete()
        });
        return () => {
          if (!sub.closed) {
            sub.unsubscribe();
          }
        };
      });
    };
    const batchKey = options.batchKey || ((operation) => {
      return this.createBatchKey(operation);
    });
    this.batcher = new BatchLink({
      batchInterval: this.batchInterval,
      batchMax: this.batchMax,
      batchKey,
      batchHandler
    });
  }
  createOptions(operations) {
    const context = operations[0].getContext();
    return {
      method: pick(context, this.options, "method"),
      uri: pick(context, this.options, "uri"),
      withCredentials: pick(context, this.options, "withCredentials")
    };
  }
  createBody(operations) {
    return operations.map((operation) => {
      const includeExtensions = prioritize(operation.getContext().includeExtensions, this.options.includeExtensions, false);
      const includeQuery = prioritize(operation.getContext().includeQuery, this.options.includeQuery, true);
      const body = {
        operationName: operation.operationName,
        variables: operation.variables
      };
      if (includeExtensions) {
        body.extensions = operation.extensions;
      }
      if (includeQuery) {
        body.query = this.print(operation.query);
      }
      return body;
    });
  }
  createHeaders(operations) {
    return operations.reduce((headers, operation) => {
      const {
        headers: contextHeaders
      } = operation.getContext();
      return contextHeaders ? mergeHeaders(headers, contextHeaders) : headers;
    }, createHeadersWithClientAwareness({
      headers: this.options.headers,
      clientAwareness: operations[0]?.getContext()?.clientAwareness
    }));
  }
  createHttpContext(operations) {
    return operations.reduce((context, operation) => {
      const {
        httpContext
      } = operation.getContext();
      return httpContext ? mergeHttpContext(httpContext, context) : context;
    }, mergeHttpContext(this.options.httpContext, new HttpContext()));
  }
  createBatchKey(operation) {
    const context = operation.getContext();
    if (context.skipBatching) {
      return Math.random().toString(36).substring(2, 11);
    }
    const headers = context.headers && context.headers.keys().map((k) => context.headers.get(k));
    const opts = JSON.stringify({
      includeQuery: context.includeQuery,
      includeExtensions: context.includeExtensions,
      headers
    });
    return prioritize(context.uri, this.options.uri, "") + opts;
  }
  request(op, forward) {
    return this.batcher.request(op, forward);
  }
};
var HttpBatchLink = class _HttpBatchLink {
  httpClient;
  constructor(httpClient) {
    this.httpClient = httpClient;
  }
  create(options) {
    return new HttpBatchLinkHandler(this.httpClient, options);
  }
  static \u0275fac = function HttpBatchLink_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _HttpBatchLink)(\u0275\u0275inject(HttpClient));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({
    token: _HttpBatchLink,
    factory: _HttpBatchLink.\u0275fac,
    providedIn: "root"
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(HttpBatchLink, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [{
    type: HttpClient
  }], null);
})();
var HttpLinkHandler = class extends ApolloLink {
  httpClient;
  options;
  requester;
  print = print;
  constructor(httpClient, options) {
    super();
    this.httpClient = httpClient;
    this.options = options;
    if (this.options.operationPrinter) {
      this.print = this.options.operationPrinter;
    }
    this.requester = (operation) => new Observable((observer) => {
      const context = operation.getContext();
      let method = pick(context, this.options, "method");
      const includeQuery = pick(context, this.options, "includeQuery");
      const includeExtensions = pick(context, this.options, "includeExtensions");
      const url = pick(context, this.options, "uri");
      const withCredentials = pick(context, this.options, "withCredentials");
      const useMultipart = pick(context, this.options, "useMultipart");
      const useGETForQueries = this.options.useGETForQueries === true;
      const httpContext = mergeHttpContext(context.httpContext, mergeHttpContext(this.options.httpContext, new HttpContext()));
      const isQuery = operation.query.definitions.some((def) => def.kind === "OperationDefinition" && def.operation === "query");
      if (useGETForQueries && isQuery) {
        method = "GET";
      }
      const req = {
        method,
        url: typeof url === "function" ? url(operation) : url,
        body: {
          operationName: operation.operationName,
          variables: operation.variables
        },
        options: {
          withCredentials,
          useMultipart,
          headers: this.options.headers,
          context: httpContext
        }
      };
      if (includeExtensions) {
        req.body.extensions = operation.extensions;
      }
      if (includeQuery) {
        req.body.query = this.print(operation.query);
      }
      const headers = createHeadersWithClientAwareness(context);
      req.options.headers = mergeHeaders(req.options.headers, headers);
      const sub = fetch(req, this.httpClient, this.options.extractFiles).subscribe({
        next: (response) => {
          operation.setContext({
            response
          });
          observer.next(response.body);
        },
        error: (err) => observer.error(err),
        complete: () => observer.complete()
      });
      return () => {
        if (!sub.closed) {
          sub.unsubscribe();
        }
      };
    });
  }
  request(op) {
    return this.requester(op);
  }
};
var HttpLink = class _HttpLink {
  httpClient;
  constructor(httpClient) {
    this.httpClient = httpClient;
  }
  create(options) {
    return new HttpLinkHandler(this.httpClient, options);
  }
  static \u0275fac = function HttpLink_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _HttpLink)(\u0275\u0275inject(HttpClient));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({
    token: _HttpLink,
    factory: _HttpLink.\u0275fac,
    providedIn: "root"
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(HttpLink, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [{
    type: HttpClient
  }], null);
})();

// src/app/app.config.ts
registerLocaleData(es_EC_default);
var appConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideToastr({
      progressAnimation: "increasing",
      timeOut: 5e3,
      progressBar: true
    }),
    provideApollo(() => {
      const httpLink = inject(HttpLink);
      return {
        link: httpLink.create({ uri: environment.graphql }),
        cache: new InMemoryCache()
      };
    }),
    {
      provide: APOLLO_NAMED_OPTIONS,
      useFactory: (httpLink) => ({
        catalogo: {
          link: httpLink.create({ uri: environment.graphql_catalogo }),
          cache: new InMemoryCache()
        },
        establecimiento: {
          link: httpLink.create({ uri: environment.graphql_establecimiento }),
          cache: new InMemoryCache()
        },
        reportes: {
          link: httpLink.create({ uri: environment.graphql_reportes }),
          cache: new InMemoryCache()
        }
      }),
      deps: [HttpLink]
    }
  ]
};

// src/app/app.ts
var App = class _App {
  title = signal("LIMS", ...ngDevMode ? [{ debugName: "title" }] : []);
  static \u0275fac = function App_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _App)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _App, selectors: [["app-root"]], decls: 1, vars: 0, template: function App_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275element(0, "router-outlet");
    }
  }, dependencies: [RouterOutlet], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(App, [{
    type: Component,
    args: [{ selector: "app-root", imports: [RouterOutlet], template: "<router-outlet />" }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(App, { className: "App", filePath: "src/app/app.ts", lineNumber: 10 });
})();

// node_modules/zone.js/fesm2015/zone.js
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues2 = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps2 = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
var global = globalThis;
function __symbol__(name) {
  const symbolPrefix = global["__Zone_symbol_prefix"] || "__zone_symbol__";
  return symbolPrefix + name;
}
function initZone() {
  const performance = global["performance"];
  function mark(name) {
    performance && performance["mark"] && performance["mark"](name);
  }
  function performanceMeasure(name, label) {
    performance && performance["measure"] && performance["measure"](name, label);
  }
  mark("Zone");
  const _ZoneImpl = class _ZoneImpl2 {
    constructor(parent, zoneSpec) {
      __publicField(this, "_parent");
      __publicField(this, "_name");
      __publicField(this, "_properties");
      __publicField(this, "_zoneDelegate");
      this._parent = parent;
      this._name = zoneSpec ? zoneSpec.name || "unnamed" : "<root>";
      this._properties = zoneSpec && zoneSpec.properties || {};
      this._zoneDelegate = new _ZoneDelegate(this, this._parent && this._parent._zoneDelegate, zoneSpec);
    }
    static assertZonePatched() {
      if (global["Promise"] !== patches["ZoneAwarePromise"]) {
        throw new Error("Zone.js has detected that ZoneAwarePromise `(window|global).Promise` has been overwritten.\nMost likely cause is that a Promise polyfill has been loaded after Zone.js (Polyfilling Promise api is not necessary when zone.js is loaded. If you must load one, do so before loading zone.js.)");
      }
    }
    static get root() {
      let zone = _ZoneImpl2.current;
      while (zone.parent) {
        zone = zone.parent;
      }
      return zone;
    }
    static get current() {
      return _currentZoneFrame.zone;
    }
    static get currentTask() {
      return _currentTask;
    }
    static __load_patch(name, fn, ignoreDuplicate = false) {
      if (patches.hasOwnProperty(name)) {
        const checkDuplicate = global[__symbol__("forceDuplicateZoneCheck")] === true;
        if (!ignoreDuplicate && checkDuplicate) {
          throw Error("Already loaded patch: " + name);
        }
      } else if (!global["__Zone_disable_" + name]) {
        const perfName = "Zone:" + name;
        mark(perfName);
        patches[name] = fn(global, _ZoneImpl2, _api);
        performanceMeasure(perfName, perfName);
      }
    }
    get parent() {
      return this._parent;
    }
    get name() {
      return this._name;
    }
    get(key) {
      const zone = this.getZoneWith(key);
      if (zone)
        return zone._properties[key];
    }
    getZoneWith(key) {
      let current = this;
      while (current) {
        if (current._properties.hasOwnProperty(key)) {
          return current;
        }
        current = current._parent;
      }
      return null;
    }
    fork(zoneSpec) {
      if (!zoneSpec)
        throw new Error("ZoneSpec required!");
      return this._zoneDelegate.fork(this, zoneSpec);
    }
    wrap(callback, source) {
      if (typeof callback !== "function") {
        throw new Error("Expecting function got: " + callback);
      }
      const _callback = this._zoneDelegate.intercept(this, callback, source);
      const zone = this;
      return function() {
        return zone.runGuarded(_callback, this, arguments, source);
      };
    }
    run(callback, applyThis, applyArgs, source) {
      _currentZoneFrame = { parent: _currentZoneFrame, zone: this };
      try {
        return this._zoneDelegate.invoke(this, callback, applyThis, applyArgs, source);
      } finally {
        _currentZoneFrame = _currentZoneFrame.parent;
      }
    }
    runGuarded(callback, applyThis = null, applyArgs, source) {
      _currentZoneFrame = { parent: _currentZoneFrame, zone: this };
      try {
        try {
          return this._zoneDelegate.invoke(this, callback, applyThis, applyArgs, source);
        } catch (error) {
          if (this._zoneDelegate.handleError(this, error)) {
            throw error;
          }
        }
      } finally {
        _currentZoneFrame = _currentZoneFrame.parent;
      }
    }
    runTask(task, applyThis, applyArgs) {
      if (task.zone != this) {
        throw new Error("A task can only be run in the zone of creation! (Creation: " + (task.zone || NO_ZONE).name + "; Execution: " + this.name + ")");
      }
      const zoneTask = task;
      const { type, data: { isPeriodic = false, isRefreshable = false } = {} } = task;
      if (task.state === notScheduled && (type === eventTask || type === macroTask)) {
        return;
      }
      const reEntryGuard = task.state != running;
      reEntryGuard && zoneTask._transitionTo(running, scheduled);
      const previousTask = _currentTask;
      _currentTask = zoneTask;
      _currentZoneFrame = { parent: _currentZoneFrame, zone: this };
      try {
        if (type == macroTask && task.data && !isPeriodic && !isRefreshable) {
          task.cancelFn = void 0;
        }
        try {
          return this._zoneDelegate.invokeTask(this, zoneTask, applyThis, applyArgs);
        } catch (error) {
          if (this._zoneDelegate.handleError(this, error)) {
            throw error;
          }
        }
      } finally {
        const state = task.state;
        if (state !== notScheduled && state !== unknown) {
          if (type == eventTask || isPeriodic || isRefreshable && state === scheduling) {
            reEntryGuard && zoneTask._transitionTo(scheduled, running, scheduling);
          } else {
            const zoneDelegates = zoneTask._zoneDelegates;
            this._updateTaskCount(zoneTask, -1);
            reEntryGuard && zoneTask._transitionTo(notScheduled, running, notScheduled);
            if (isRefreshable) {
              zoneTask._zoneDelegates = zoneDelegates;
            }
          }
        }
        _currentZoneFrame = _currentZoneFrame.parent;
        _currentTask = previousTask;
      }
    }
    scheduleTask(task) {
      if (task.zone && task.zone !== this) {
        let newZone = this;
        while (newZone) {
          if (newZone === task.zone) {
            throw Error(`can not reschedule task to ${this.name} which is descendants of the original zone ${task.zone.name}`);
          }
          newZone = newZone.parent;
        }
      }
      task._transitionTo(scheduling, notScheduled);
      const zoneDelegates = [];
      task._zoneDelegates = zoneDelegates;
      task._zone = this;
      try {
        task = this._zoneDelegate.scheduleTask(this, task);
      } catch (err) {
        task._transitionTo(unknown, scheduling, notScheduled);
        this._zoneDelegate.handleError(this, err);
        throw err;
      }
      if (task._zoneDelegates === zoneDelegates) {
        this._updateTaskCount(task, 1);
      }
      if (task.state == scheduling) {
        task._transitionTo(scheduled, scheduling);
      }
      return task;
    }
    scheduleMicroTask(source, callback, data, customSchedule) {
      return this.scheduleTask(new ZoneTask(microTask, source, callback, data, customSchedule, void 0));
    }
    scheduleMacroTask(source, callback, data, customSchedule, customCancel) {
      return this.scheduleTask(new ZoneTask(macroTask, source, callback, data, customSchedule, customCancel));
    }
    scheduleEventTask(source, callback, data, customSchedule, customCancel) {
      return this.scheduleTask(new ZoneTask(eventTask, source, callback, data, customSchedule, customCancel));
    }
    cancelTask(task) {
      if (task.zone != this)
        throw new Error("A task can only be cancelled in the zone of creation! (Creation: " + (task.zone || NO_ZONE).name + "; Execution: " + this.name + ")");
      if (task.state !== scheduled && task.state !== running) {
        return;
      }
      task._transitionTo(canceling, scheduled, running);
      try {
        this._zoneDelegate.cancelTask(this, task);
      } catch (err) {
        task._transitionTo(unknown, canceling);
        this._zoneDelegate.handleError(this, err);
        throw err;
      }
      this._updateTaskCount(task, -1);
      task._transitionTo(notScheduled, canceling);
      task.runCount = -1;
      return task;
    }
    _updateTaskCount(task, count) {
      const zoneDelegates = task._zoneDelegates;
      if (count == -1) {
        task._zoneDelegates = null;
      }
      for (let i = 0; i < zoneDelegates.length; i++) {
        zoneDelegates[i]._updateTaskCount(task.type, count);
      }
    }
  };
  __publicField(_ZoneImpl, "__symbol__", __symbol__);
  let ZoneImpl = _ZoneImpl;
  const DELEGATE_ZS = {
    name: "",
    onHasTask: (delegate, _, target, hasTaskState) => delegate.hasTask(target, hasTaskState),
    onScheduleTask: (delegate, _, target, task) => delegate.scheduleTask(target, task),
    onInvokeTask: (delegate, _, target, task, applyThis, applyArgs) => delegate.invokeTask(target, task, applyThis, applyArgs),
    onCancelTask: (delegate, _, target, task) => delegate.cancelTask(target, task)
  };
  class _ZoneDelegate {
    constructor(zone, parentDelegate, zoneSpec) {
      __publicField(this, "_zone");
      __publicField(this, "_taskCounts", {
        "microTask": 0,
        "macroTask": 0,
        "eventTask": 0
      });
      __publicField(this, "_parentDelegate");
      __publicField(this, "_forkDlgt");
      __publicField(this, "_forkZS");
      __publicField(this, "_forkCurrZone");
      __publicField(this, "_interceptDlgt");
      __publicField(this, "_interceptZS");
      __publicField(this, "_interceptCurrZone");
      __publicField(this, "_invokeDlgt");
      __publicField(this, "_invokeZS");
      __publicField(this, "_invokeCurrZone");
      __publicField(this, "_handleErrorDlgt");
      __publicField(this, "_handleErrorZS");
      __publicField(this, "_handleErrorCurrZone");
      __publicField(this, "_scheduleTaskDlgt");
      __publicField(this, "_scheduleTaskZS");
      __publicField(this, "_scheduleTaskCurrZone");
      __publicField(this, "_invokeTaskDlgt");
      __publicField(this, "_invokeTaskZS");
      __publicField(this, "_invokeTaskCurrZone");
      __publicField(this, "_cancelTaskDlgt");
      __publicField(this, "_cancelTaskZS");
      __publicField(this, "_cancelTaskCurrZone");
      __publicField(this, "_hasTaskDlgt");
      __publicField(this, "_hasTaskDlgtOwner");
      __publicField(this, "_hasTaskZS");
      __publicField(this, "_hasTaskCurrZone");
      this._zone = zone;
      this._parentDelegate = parentDelegate;
      this._forkZS = zoneSpec && (zoneSpec && zoneSpec.onFork ? zoneSpec : parentDelegate._forkZS);
      this._forkDlgt = zoneSpec && (zoneSpec.onFork ? parentDelegate : parentDelegate._forkDlgt);
      this._forkCurrZone = zoneSpec && (zoneSpec.onFork ? this._zone : parentDelegate._forkCurrZone);
      this._interceptZS = zoneSpec && (zoneSpec.onIntercept ? zoneSpec : parentDelegate._interceptZS);
      this._interceptDlgt = zoneSpec && (zoneSpec.onIntercept ? parentDelegate : parentDelegate._interceptDlgt);
      this._interceptCurrZone = zoneSpec && (zoneSpec.onIntercept ? this._zone : parentDelegate._interceptCurrZone);
      this._invokeZS = zoneSpec && (zoneSpec.onInvoke ? zoneSpec : parentDelegate._invokeZS);
      this._invokeDlgt = zoneSpec && (zoneSpec.onInvoke ? parentDelegate : parentDelegate._invokeDlgt);
      this._invokeCurrZone = zoneSpec && (zoneSpec.onInvoke ? this._zone : parentDelegate._invokeCurrZone);
      this._handleErrorZS = zoneSpec && (zoneSpec.onHandleError ? zoneSpec : parentDelegate._handleErrorZS);
      this._handleErrorDlgt = zoneSpec && (zoneSpec.onHandleError ? parentDelegate : parentDelegate._handleErrorDlgt);
      this._handleErrorCurrZone = zoneSpec && (zoneSpec.onHandleError ? this._zone : parentDelegate._handleErrorCurrZone);
      this._scheduleTaskZS = zoneSpec && (zoneSpec.onScheduleTask ? zoneSpec : parentDelegate._scheduleTaskZS);
      this._scheduleTaskDlgt = zoneSpec && (zoneSpec.onScheduleTask ? parentDelegate : parentDelegate._scheduleTaskDlgt);
      this._scheduleTaskCurrZone = zoneSpec && (zoneSpec.onScheduleTask ? this._zone : parentDelegate._scheduleTaskCurrZone);
      this._invokeTaskZS = zoneSpec && (zoneSpec.onInvokeTask ? zoneSpec : parentDelegate._invokeTaskZS);
      this._invokeTaskDlgt = zoneSpec && (zoneSpec.onInvokeTask ? parentDelegate : parentDelegate._invokeTaskDlgt);
      this._invokeTaskCurrZone = zoneSpec && (zoneSpec.onInvokeTask ? this._zone : parentDelegate._invokeTaskCurrZone);
      this._cancelTaskZS = zoneSpec && (zoneSpec.onCancelTask ? zoneSpec : parentDelegate._cancelTaskZS);
      this._cancelTaskDlgt = zoneSpec && (zoneSpec.onCancelTask ? parentDelegate : parentDelegate._cancelTaskDlgt);
      this._cancelTaskCurrZone = zoneSpec && (zoneSpec.onCancelTask ? this._zone : parentDelegate._cancelTaskCurrZone);
      this._hasTaskZS = null;
      this._hasTaskDlgt = null;
      this._hasTaskDlgtOwner = null;
      this._hasTaskCurrZone = null;
      const zoneSpecHasTask = zoneSpec && zoneSpec.onHasTask;
      const parentHasTask = parentDelegate && parentDelegate._hasTaskZS;
      if (zoneSpecHasTask || parentHasTask) {
        this._hasTaskZS = zoneSpecHasTask ? zoneSpec : DELEGATE_ZS;
        this._hasTaskDlgt = parentDelegate;
        this._hasTaskDlgtOwner = this;
        this._hasTaskCurrZone = this._zone;
        if (!zoneSpec.onScheduleTask) {
          this._scheduleTaskZS = DELEGATE_ZS;
          this._scheduleTaskDlgt = parentDelegate;
          this._scheduleTaskCurrZone = this._zone;
        }
        if (!zoneSpec.onInvokeTask) {
          this._invokeTaskZS = DELEGATE_ZS;
          this._invokeTaskDlgt = parentDelegate;
          this._invokeTaskCurrZone = this._zone;
        }
        if (!zoneSpec.onCancelTask) {
          this._cancelTaskZS = DELEGATE_ZS;
          this._cancelTaskDlgt = parentDelegate;
          this._cancelTaskCurrZone = this._zone;
        }
      }
    }
    get zone() {
      return this._zone;
    }
    fork(targetZone, zoneSpec) {
      return this._forkZS ? this._forkZS.onFork(this._forkDlgt, this.zone, targetZone, zoneSpec) : new ZoneImpl(targetZone, zoneSpec);
    }
    intercept(targetZone, callback, source) {
      return this._interceptZS ? this._interceptZS.onIntercept(this._interceptDlgt, this._interceptCurrZone, targetZone, callback, source) : callback;
    }
    invoke(targetZone, callback, applyThis, applyArgs, source) {
      return this._invokeZS ? this._invokeZS.onInvoke(this._invokeDlgt, this._invokeCurrZone, targetZone, callback, applyThis, applyArgs, source) : callback.apply(applyThis, applyArgs);
    }
    handleError(targetZone, error) {
      return this._handleErrorZS ? this._handleErrorZS.onHandleError(this._handleErrorDlgt, this._handleErrorCurrZone, targetZone, error) : true;
    }
    scheduleTask(targetZone, task) {
      let returnTask = task;
      if (this._scheduleTaskZS) {
        if (this._hasTaskZS) {
          returnTask._zoneDelegates.push(this._hasTaskDlgtOwner);
        }
        returnTask = this._scheduleTaskZS.onScheduleTask(this._scheduleTaskDlgt, this._scheduleTaskCurrZone, targetZone, task);
        if (!returnTask)
          returnTask = task;
      } else {
        if (task.scheduleFn) {
          task.scheduleFn(task);
        } else if (task.type == microTask) {
          scheduleMicroTask(task);
        } else {
          throw new Error("Task is missing scheduleFn.");
        }
      }
      return returnTask;
    }
    invokeTask(targetZone, task, applyThis, applyArgs) {
      return this._invokeTaskZS ? this._invokeTaskZS.onInvokeTask(this._invokeTaskDlgt, this._invokeTaskCurrZone, targetZone, task, applyThis, applyArgs) : task.callback.apply(applyThis, applyArgs);
    }
    cancelTask(targetZone, task) {
      let value;
      if (this._cancelTaskZS) {
        value = this._cancelTaskZS.onCancelTask(this._cancelTaskDlgt, this._cancelTaskCurrZone, targetZone, task);
      } else {
        if (!task.cancelFn) {
          throw Error("Task is not cancelable");
        }
        value = task.cancelFn(task);
      }
      return value;
    }
    hasTask(targetZone, isEmpty) {
      try {
        this._hasTaskZS && this._hasTaskZS.onHasTask(this._hasTaskDlgt, this._hasTaskCurrZone, targetZone, isEmpty);
      } catch (err) {
        this.handleError(targetZone, err);
      }
    }
    _updateTaskCount(type, count) {
      const counts = this._taskCounts;
      const prev = counts[type];
      const next = counts[type] = prev + count;
      if (next < 0) {
        throw new Error("More tasks executed then were scheduled.");
      }
      if (prev == 0 || next == 0) {
        const isEmpty = {
          microTask: counts["microTask"] > 0,
          macroTask: counts["macroTask"] > 0,
          eventTask: counts["eventTask"] > 0,
          change: type
        };
        this.hasTask(this._zone, isEmpty);
      }
    }
  }
  class ZoneTask {
    constructor(type, source, callback, options, scheduleFn, cancelFn) {
      __publicField(this, "type");
      __publicField(this, "source");
      __publicField(this, "invoke");
      __publicField(this, "callback");
      __publicField(this, "data");
      __publicField(this, "scheduleFn");
      __publicField(this, "cancelFn");
      __publicField(this, "_zone", null);
      __publicField(this, "runCount", 0);
      __publicField(this, "_zoneDelegates", null);
      __publicField(this, "_state", "notScheduled");
      this.type = type;
      this.source = source;
      this.data = options;
      this.scheduleFn = scheduleFn;
      this.cancelFn = cancelFn;
      if (!callback) {
        throw new Error("callback is not defined");
      }
      this.callback = callback;
      const self2 = this;
      if (type === eventTask && options && options.useG) {
        this.invoke = ZoneTask.invokeTask;
      } else {
        this.invoke = function() {
          return ZoneTask.invokeTask.call(global, self2, this, arguments);
        };
      }
    }
    static invokeTask(task, target, args) {
      if (!task) {
        task = this;
      }
      _numberOfNestedTaskFrames++;
      try {
        task.runCount++;
        return task.zone.runTask(task, target, args);
      } finally {
        if (_numberOfNestedTaskFrames == 1) {
          drainMicroTaskQueue();
        }
        _numberOfNestedTaskFrames--;
      }
    }
    get zone() {
      return this._zone;
    }
    get state() {
      return this._state;
    }
    cancelScheduleRequest() {
      this._transitionTo(notScheduled, scheduling);
    }
    _transitionTo(toState, fromState1, fromState2) {
      if (this._state === fromState1 || this._state === fromState2) {
        this._state = toState;
        if (toState == notScheduled) {
          this._zoneDelegates = null;
        }
      } else {
        throw new Error(`${this.type} '${this.source}': can not transition to '${toState}', expecting state '${fromState1}'${fromState2 ? " or '" + fromState2 + "'" : ""}, was '${this._state}'.`);
      }
    }
    toString() {
      if (this.data && typeof this.data.handleId !== "undefined") {
        return this.data.handleId.toString();
      } else {
        return Object.prototype.toString.call(this);
      }
    }
    // add toJSON method to prevent cyclic error when
    // call JSON.stringify(zoneTask)
    toJSON() {
      return {
        type: this.type,
        state: this.state,
        source: this.source,
        zone: this.zone.name,
        runCount: this.runCount
      };
    }
  }
  const symbolSetTimeout = __symbol__("setTimeout");
  const symbolPromise = __symbol__("Promise");
  const symbolThen = __symbol__("then");
  let _microTaskQueue = [];
  let _isDrainingMicrotaskQueue = false;
  let nativeMicroTaskQueuePromise;
  function nativeScheduleMicroTask(func) {
    if (!nativeMicroTaskQueuePromise) {
      if (global[symbolPromise]) {
        nativeMicroTaskQueuePromise = global[symbolPromise].resolve(0);
      }
    }
    if (nativeMicroTaskQueuePromise) {
      let nativeThen = nativeMicroTaskQueuePromise[symbolThen];
      if (!nativeThen) {
        nativeThen = nativeMicroTaskQueuePromise["then"];
      }
      nativeThen.call(nativeMicroTaskQueuePromise, func);
    } else {
      global[symbolSetTimeout](func, 0);
    }
  }
  function scheduleMicroTask(task) {
    if (_numberOfNestedTaskFrames === 0 && _microTaskQueue.length === 0) {
      nativeScheduleMicroTask(drainMicroTaskQueue);
    }
    task && _microTaskQueue.push(task);
  }
  function drainMicroTaskQueue() {
    if (!_isDrainingMicrotaskQueue) {
      _isDrainingMicrotaskQueue = true;
      while (_microTaskQueue.length) {
        const queue = _microTaskQueue;
        _microTaskQueue = [];
        for (let i = 0; i < queue.length; i++) {
          const task = queue[i];
          try {
            task.zone.runTask(task, null, null);
          } catch (error) {
            _api.onUnhandledError(error);
          }
        }
      }
      _api.microtaskDrainDone();
      _isDrainingMicrotaskQueue = false;
    }
  }
  const NO_ZONE = { name: "NO ZONE" };
  const notScheduled = "notScheduled", scheduling = "scheduling", scheduled = "scheduled", running = "running", canceling = "canceling", unknown = "unknown";
  const microTask = "microTask", macroTask = "macroTask", eventTask = "eventTask";
  const patches = {};
  const _api = {
    symbol: __symbol__,
    currentZoneFrame: () => _currentZoneFrame,
    onUnhandledError: noop,
    microtaskDrainDone: noop,
    scheduleMicroTask,
    showUncaughtError: () => !ZoneImpl[__symbol__("ignoreConsoleErrorUncaughtError")],
    patchEventTarget: () => [],
    patchOnProperties: noop,
    patchMethod: () => noop,
    bindArguments: () => [],
    patchThen: () => noop,
    patchMacroTask: () => noop,
    patchEventPrototype: () => noop,
    getGlobalObjects: () => void 0,
    ObjectDefineProperty: () => noop,
    ObjectGetOwnPropertyDescriptor: () => void 0,
    ObjectCreate: () => void 0,
    ArraySlice: () => [],
    patchClass: () => noop,
    wrapWithCurrentZone: () => noop,
    filterProperties: () => [],
    attachOriginToPatched: () => noop,
    _redefineProperty: () => noop,
    patchCallbacks: () => noop,
    nativeScheduleMicroTask
  };
  let _currentZoneFrame = { parent: null, zone: new ZoneImpl(null, null) };
  let _currentTask = null;
  let _numberOfNestedTaskFrames = 0;
  function noop() {
  }
  performanceMeasure("Zone", "Zone");
  return ZoneImpl;
}
function loadZone() {
  var _a;
  const global2 = globalThis;
  const checkDuplicate = global2[__symbol__("forceDuplicateZoneCheck")] === true;
  if (global2["Zone"] && (checkDuplicate || typeof global2["Zone"].__symbol__ !== "function")) {
    throw new Error("Zone already loaded.");
  }
  (_a = global2["Zone"]) != null ? _a : global2["Zone"] = initZone();
  return global2["Zone"];
}
var ObjectGetOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
var ObjectDefineProperty = Object.defineProperty;
var ObjectGetPrototypeOf = Object.getPrototypeOf;
var ObjectCreate = Object.create;
var ArraySlice = Array.prototype.slice;
var ADD_EVENT_LISTENER_STR = "addEventListener";
var REMOVE_EVENT_LISTENER_STR = "removeEventListener";
var ZONE_SYMBOL_ADD_EVENT_LISTENER = __symbol__(ADD_EVENT_LISTENER_STR);
var ZONE_SYMBOL_REMOVE_EVENT_LISTENER = __symbol__(REMOVE_EVENT_LISTENER_STR);
var TRUE_STR = "true";
var FALSE_STR = "false";
var ZONE_SYMBOL_PREFIX = __symbol__("");
function wrapWithCurrentZone(callback, source) {
  return Zone.current.wrap(callback, source);
}
function scheduleMacroTaskWithCurrentZone(source, callback, data, customSchedule, customCancel) {
  return Zone.current.scheduleMacroTask(source, callback, data, customSchedule, customCancel);
}
var zoneSymbol = __symbol__;
var isWindowExists = typeof window !== "undefined";
var internalWindow = isWindowExists ? window : void 0;
var _global = isWindowExists && internalWindow || globalThis;
var REMOVE_ATTRIBUTE = "removeAttribute";
function bindArguments(args, source) {
  for (let i = args.length - 1; i >= 0; i--) {
    if (typeof args[i] === "function") {
      args[i] = wrapWithCurrentZone(args[i], source + "_" + i);
    }
  }
  return args;
}
function patchPrototype(prototype, fnNames) {
  const source = prototype.constructor["name"];
  for (let i = 0; i < fnNames.length; i++) {
    const name = fnNames[i];
    const delegate = prototype[name];
    if (delegate) {
      const prototypeDesc = ObjectGetOwnPropertyDescriptor(prototype, name);
      if (!isPropertyWritable(prototypeDesc)) {
        continue;
      }
      prototype[name] = ((delegate2) => {
        const patched = function() {
          return delegate2.apply(this, bindArguments(arguments, source + "." + name));
        };
        attachOriginToPatched(patched, delegate2);
        return patched;
      })(delegate);
    }
  }
}
function isPropertyWritable(propertyDesc) {
  if (!propertyDesc) {
    return true;
  }
  if (propertyDesc.writable === false) {
    return false;
  }
  return !(typeof propertyDesc.get === "function" && typeof propertyDesc.set === "undefined");
}
var isWebWorker = typeof WorkerGlobalScope !== "undefined" && self instanceof WorkerGlobalScope;
var isNode = !("nw" in _global) && typeof _global.process !== "undefined" && _global.process.toString() === "[object process]";
var isBrowser = !isNode && !isWebWorker && !!(isWindowExists && internalWindow["HTMLElement"]);
var isMix = typeof _global.process !== "undefined" && _global.process.toString() === "[object process]" && !isWebWorker && !!(isWindowExists && internalWindow["HTMLElement"]);
var zoneSymbolEventNames = {};
var enableBeforeunloadSymbol = zoneSymbol("enable_beforeunload");
var wrapFn = function(event) {
  event = event || _global.event;
  if (!event) {
    return;
  }
  let eventNameSymbol = zoneSymbolEventNames[event.type];
  if (!eventNameSymbol) {
    eventNameSymbol = zoneSymbolEventNames[event.type] = zoneSymbol("ON_PROPERTY" + event.type);
  }
  const target = this || event.target || _global;
  const listener = target[eventNameSymbol];
  let result;
  if (isBrowser && target === internalWindow && event.type === "error") {
    const errorEvent = event;
    result = listener && listener.call(this, errorEvent.message, errorEvent.filename, errorEvent.lineno, errorEvent.colno, errorEvent.error);
    if (result === true) {
      event.preventDefault();
    }
  } else {
    result = listener && listener.apply(this, arguments);
    if (
      // https://github.com/angular/angular/issues/47579
      // https://www.w3.org/TR/2011/WD-html5-20110525/history.html#beforeunloadevent
      // This is the only specific case we should check for. The spec defines that the
      // `returnValue` attribute represents the message to show the user. When the event
      // is created, this attribute must be set to the empty string.
      event.type === "beforeunload" && // To prevent any breaking changes resulting from this change, given that
      // it was already causing a significant number of failures in G3, we have hidden
      // that behavior behind a global configuration flag. Consumers can enable this
      // flag explicitly if they want the `beforeunload` event to be handled as defined
      // in the specification.
      _global[enableBeforeunloadSymbol] && // The IDL event definition is `attribute DOMString returnValue`, so we check whether
      // `typeof result` is a string.
      typeof result === "string"
    ) {
      event.returnValue = result;
    } else if (result != void 0 && !result) {
      event.preventDefault();
    }
  }
  return result;
};
function patchProperty(obj, prop, prototype) {
  let desc = ObjectGetOwnPropertyDescriptor(obj, prop);
  if (!desc && prototype) {
    const prototypeDesc = ObjectGetOwnPropertyDescriptor(prototype, prop);
    if (prototypeDesc) {
      desc = { enumerable: true, configurable: true };
    }
  }
  if (!desc || !desc.configurable) {
    return;
  }
  const onPropPatchedSymbol = zoneSymbol("on" + prop + "patched");
  if (obj.hasOwnProperty(onPropPatchedSymbol) && obj[onPropPatchedSymbol]) {
    return;
  }
  delete desc.writable;
  delete desc.value;
  const originalDescGet = desc.get;
  const originalDescSet = desc.set;
  const eventName = prop.slice(2);
  let eventNameSymbol = zoneSymbolEventNames[eventName];
  if (!eventNameSymbol) {
    eventNameSymbol = zoneSymbolEventNames[eventName] = zoneSymbol("ON_PROPERTY" + eventName);
  }
  desc.set = function(newValue) {
    let target = this;
    if (!target && obj === _global) {
      target = _global;
    }
    if (!target) {
      return;
    }
    const previousValue = target[eventNameSymbol];
    if (typeof previousValue === "function") {
      target.removeEventListener(eventName, wrapFn);
    }
    originalDescSet == null ? void 0 : originalDescSet.call(target, null);
    target[eventNameSymbol] = newValue;
    if (typeof newValue === "function") {
      target.addEventListener(eventName, wrapFn, false);
    }
  };
  desc.get = function() {
    let target = this;
    if (!target && obj === _global) {
      target = _global;
    }
    if (!target) {
      return null;
    }
    const listener = target[eventNameSymbol];
    if (listener) {
      return listener;
    } else if (originalDescGet) {
      let value = originalDescGet.call(this);
      if (value) {
        desc.set.call(this, value);
        if (typeof target[REMOVE_ATTRIBUTE] === "function") {
          target.removeAttribute(prop);
        }
        return value;
      }
    }
    return null;
  };
  ObjectDefineProperty(obj, prop, desc);
  obj[onPropPatchedSymbol] = true;
}
function patchOnProperties(obj, properties, prototype) {
  if (properties) {
    for (let i = 0; i < properties.length; i++) {
      patchProperty(obj, "on" + properties[i], prototype);
    }
  } else {
    const onProperties = [];
    for (const prop in obj) {
      if (prop.slice(0, 2) == "on") {
        onProperties.push(prop);
      }
    }
    for (let j = 0; j < onProperties.length; j++) {
      patchProperty(obj, onProperties[j], prototype);
    }
  }
}
var originalInstanceKey = zoneSymbol("originalInstance");
function patchClass(className) {
  const OriginalClass = _global[className];
  if (!OriginalClass)
    return;
  _global[zoneSymbol(className)] = OriginalClass;
  _global[className] = function() {
    const a = bindArguments(arguments, className);
    switch (a.length) {
      case 0:
        this[originalInstanceKey] = new OriginalClass();
        break;
      case 1:
        this[originalInstanceKey] = new OriginalClass(a[0]);
        break;
      case 2:
        this[originalInstanceKey] = new OriginalClass(a[0], a[1]);
        break;
      case 3:
        this[originalInstanceKey] = new OriginalClass(a[0], a[1], a[2]);
        break;
      case 4:
        this[originalInstanceKey] = new OriginalClass(a[0], a[1], a[2], a[3]);
        break;
      default:
        throw new Error("Arg list too long.");
    }
  };
  attachOriginToPatched(_global[className], OriginalClass);
  const instance = new OriginalClass(function() {
  });
  let prop;
  for (prop in instance) {
    if (className === "XMLHttpRequest" && prop === "responseBlob")
      continue;
    (function(prop2) {
      if (typeof instance[prop2] === "function") {
        _global[className].prototype[prop2] = function() {
          return this[originalInstanceKey][prop2].apply(this[originalInstanceKey], arguments);
        };
      } else {
        ObjectDefineProperty(_global[className].prototype, prop2, {
          set: function(fn) {
            if (typeof fn === "function") {
              this[originalInstanceKey][prop2] = wrapWithCurrentZone(fn, className + "." + prop2);
              attachOriginToPatched(this[originalInstanceKey][prop2], fn);
            } else {
              this[originalInstanceKey][prop2] = fn;
            }
          },
          get: function() {
            return this[originalInstanceKey][prop2];
          }
        });
      }
    })(prop);
  }
  for (prop in OriginalClass) {
    if (prop !== "prototype" && OriginalClass.hasOwnProperty(prop)) {
      _global[className][prop] = OriginalClass[prop];
    }
  }
}
function copySymbolProperties(src, dest) {
  if (typeof Object.getOwnPropertySymbols !== "function") {
    return;
  }
  const symbols = Object.getOwnPropertySymbols(src);
  symbols.forEach((symbol) => {
    const desc = Object.getOwnPropertyDescriptor(src, symbol);
    Object.defineProperty(dest, symbol, {
      get: function() {
        return src[symbol];
      },
      set: function(value) {
        if (desc && (!desc.writable || typeof desc.set !== "function")) {
          return;
        }
        src[symbol] = value;
      },
      enumerable: desc ? desc.enumerable : true,
      configurable: desc ? desc.configurable : true
    });
  });
}
var shouldCopySymbolProperties = false;
function patchMethod(target, name, patchFn) {
  let proto = target;
  while (proto && !proto.hasOwnProperty(name)) {
    proto = ObjectGetPrototypeOf(proto);
  }
  if (!proto && target[name]) {
    proto = target;
  }
  const delegateName = zoneSymbol(name);
  let delegate = null;
  if (proto && (!(delegate = proto[delegateName]) || !proto.hasOwnProperty(delegateName))) {
    delegate = proto[delegateName] = proto[name];
    const desc = proto && ObjectGetOwnPropertyDescriptor(proto, name);
    if (isPropertyWritable(desc)) {
      const patchDelegate = patchFn(delegate, delegateName, name);
      proto[name] = function() {
        return patchDelegate(this, arguments);
      };
      attachOriginToPatched(proto[name], delegate);
      if (shouldCopySymbolProperties) {
        copySymbolProperties(delegate, proto[name]);
      }
    }
  }
  return delegate;
}
function patchMacroTask(obj, funcName, metaCreator) {
  let setNative = null;
  function scheduleTask(task) {
    const data = task.data;
    data.args[data.cbIdx] = function() {
      task.invoke.apply(this, arguments);
    };
    setNative.apply(data.target, data.args);
    return task;
  }
  setNative = patchMethod(obj, funcName, (delegate) => function(self2, args) {
    const meta = metaCreator(self2, args);
    if (meta.cbIdx >= 0 && typeof args[meta.cbIdx] === "function") {
      return scheduleMacroTaskWithCurrentZone(meta.name, args[meta.cbIdx], meta, scheduleTask);
    } else {
      return delegate.apply(self2, args);
    }
  });
}
function attachOriginToPatched(patched, original) {
  patched[zoneSymbol("OriginalDelegate")] = original;
}
function isFunction(value) {
  return typeof value === "function";
}
function isNumber(value) {
  return typeof value === "number";
}
var OPTIMIZED_ZONE_EVENT_TASK_DATA = {
  useG: true
};
var zoneSymbolEventNames2 = {};
var globalSources = {};
var EVENT_NAME_SYMBOL_REGX = new RegExp("^" + ZONE_SYMBOL_PREFIX + "(\\w+)(true|false)$");
var IMMEDIATE_PROPAGATION_SYMBOL = zoneSymbol("propagationStopped");
function prepareEventNames(eventName, eventNameToString) {
  const falseEventName = (eventNameToString ? eventNameToString(eventName) : eventName) + FALSE_STR;
  const trueEventName = (eventNameToString ? eventNameToString(eventName) : eventName) + TRUE_STR;
  const symbol = ZONE_SYMBOL_PREFIX + falseEventName;
  const symbolCapture = ZONE_SYMBOL_PREFIX + trueEventName;
  zoneSymbolEventNames2[eventName] = {};
  zoneSymbolEventNames2[eventName][FALSE_STR] = symbol;
  zoneSymbolEventNames2[eventName][TRUE_STR] = symbolCapture;
}
function patchEventTarget(_global2, api, apis, patchOptions) {
  const ADD_EVENT_LISTENER = patchOptions && patchOptions.add || ADD_EVENT_LISTENER_STR;
  const REMOVE_EVENT_LISTENER = patchOptions && patchOptions.rm || REMOVE_EVENT_LISTENER_STR;
  const LISTENERS_EVENT_LISTENER = patchOptions && patchOptions.listeners || "eventListeners";
  const REMOVE_ALL_LISTENERS_EVENT_LISTENER = patchOptions && patchOptions.rmAll || "removeAllListeners";
  const zoneSymbolAddEventListener = zoneSymbol(ADD_EVENT_LISTENER);
  const ADD_EVENT_LISTENER_SOURCE = "." + ADD_EVENT_LISTENER + ":";
  const PREPEND_EVENT_LISTENER = "prependListener";
  const PREPEND_EVENT_LISTENER_SOURCE = "." + PREPEND_EVENT_LISTENER + ":";
  const invokeTask = function(task, target, event) {
    if (task.isRemoved) {
      return;
    }
    const delegate = task.callback;
    if (typeof delegate === "object" && delegate.handleEvent) {
      task.callback = (event2) => delegate.handleEvent(event2);
      task.originalDelegate = delegate;
    }
    let error;
    try {
      task.invoke(task, target, [event]);
    } catch (err) {
      error = err;
    }
    const options = task.options;
    if (options && typeof options === "object" && options.once) {
      const delegate2 = task.originalDelegate ? task.originalDelegate : task.callback;
      target[REMOVE_EVENT_LISTENER].call(target, event.type, delegate2, options);
    }
    return error;
  };
  function globalCallback(context, event, isCapture) {
    event = event || _global2.event;
    if (!event) {
      return;
    }
    const target = context || event.target || _global2;
    const tasks = target[zoneSymbolEventNames2[event.type][isCapture ? TRUE_STR : FALSE_STR]];
    if (tasks) {
      const errors = [];
      if (tasks.length === 1) {
        const err = invokeTask(tasks[0], target, event);
        err && errors.push(err);
      } else {
        const copyTasks = tasks.slice();
        for (let i = 0; i < copyTasks.length; i++) {
          if (event && event[IMMEDIATE_PROPAGATION_SYMBOL] === true) {
            break;
          }
          const err = invokeTask(copyTasks[i], target, event);
          err && errors.push(err);
        }
      }
      if (errors.length === 1) {
        throw errors[0];
      } else {
        for (let i = 0; i < errors.length; i++) {
          const err = errors[i];
          api.nativeScheduleMicroTask(() => {
            throw err;
          });
        }
      }
    }
  }
  const globalZoneAwareCallback = function(event) {
    return globalCallback(this, event, false);
  };
  const globalZoneAwareCaptureCallback = function(event) {
    return globalCallback(this, event, true);
  };
  function patchEventTargetMethods(obj, patchOptions2) {
    if (!obj) {
      return false;
    }
    let useGlobalCallback = true;
    if (patchOptions2 && patchOptions2.useG !== void 0) {
      useGlobalCallback = patchOptions2.useG;
    }
    const validateHandler = patchOptions2 && patchOptions2.vh;
    let checkDuplicate = true;
    if (patchOptions2 && patchOptions2.chkDup !== void 0) {
      checkDuplicate = patchOptions2.chkDup;
    }
    let returnTarget = false;
    if (patchOptions2 && patchOptions2.rt !== void 0) {
      returnTarget = patchOptions2.rt;
    }
    let proto = obj;
    while (proto && !proto.hasOwnProperty(ADD_EVENT_LISTENER)) {
      proto = ObjectGetPrototypeOf(proto);
    }
    if (!proto && obj[ADD_EVENT_LISTENER]) {
      proto = obj;
    }
    if (!proto) {
      return false;
    }
    if (proto[zoneSymbolAddEventListener]) {
      return false;
    }
    const eventNameToString = patchOptions2 && patchOptions2.eventNameToString;
    const taskData = {};
    const nativeAddEventListener = proto[zoneSymbolAddEventListener] = proto[ADD_EVENT_LISTENER];
    const nativeRemoveEventListener = proto[zoneSymbol(REMOVE_EVENT_LISTENER)] = proto[REMOVE_EVENT_LISTENER];
    const nativeListeners = proto[zoneSymbol(LISTENERS_EVENT_LISTENER)] = proto[LISTENERS_EVENT_LISTENER];
    const nativeRemoveAllListeners = proto[zoneSymbol(REMOVE_ALL_LISTENERS_EVENT_LISTENER)] = proto[REMOVE_ALL_LISTENERS_EVENT_LISTENER];
    let nativePrependEventListener;
    if (patchOptions2 && patchOptions2.prepend) {
      nativePrependEventListener = proto[zoneSymbol(patchOptions2.prepend)] = proto[patchOptions2.prepend];
    }
    function buildEventListenerOptions(options, passive) {
      if (!passive) {
        return options;
      }
      if (typeof options === "boolean") {
        return { capture: options, passive: true };
      }
      if (!options) {
        return { passive: true };
      }
      if (typeof options === "object" && options.passive !== false) {
        return __spreadProps2(__spreadValues2({}, options), { passive: true });
      }
      return options;
    }
    const customScheduleGlobal = function(task) {
      if (taskData.isExisting) {
        return;
      }
      return nativeAddEventListener.call(taskData.target, taskData.eventName, taskData.capture ? globalZoneAwareCaptureCallback : globalZoneAwareCallback, taskData.options);
    };
    const customCancelGlobal = function(task) {
      if (!task.isRemoved) {
        const symbolEventNames = zoneSymbolEventNames2[task.eventName];
        let symbolEventName;
        if (symbolEventNames) {
          symbolEventName = symbolEventNames[task.capture ? TRUE_STR : FALSE_STR];
        }
        const existingTasks = symbolEventName && task.target[symbolEventName];
        if (existingTasks) {
          for (let i = 0; i < existingTasks.length; i++) {
            const existingTask = existingTasks[i];
            if (existingTask === task) {
              existingTasks.splice(i, 1);
              task.isRemoved = true;
              if (task.removeAbortListener) {
                task.removeAbortListener();
                task.removeAbortListener = null;
              }
              if (existingTasks.length === 0) {
                task.allRemoved = true;
                task.target[symbolEventName] = null;
              }
              break;
            }
          }
        }
      }
      if (!task.allRemoved) {
        return;
      }
      return nativeRemoveEventListener.call(task.target, task.eventName, task.capture ? globalZoneAwareCaptureCallback : globalZoneAwareCallback, task.options);
    };
    const customScheduleNonGlobal = function(task) {
      return nativeAddEventListener.call(taskData.target, taskData.eventName, task.invoke, taskData.options);
    };
    const customSchedulePrepend = function(task) {
      return nativePrependEventListener.call(taskData.target, taskData.eventName, task.invoke, taskData.options);
    };
    const customCancelNonGlobal = function(task) {
      return nativeRemoveEventListener.call(task.target, task.eventName, task.invoke, task.options);
    };
    const customSchedule = useGlobalCallback ? customScheduleGlobal : customScheduleNonGlobal;
    const customCancel = useGlobalCallback ? customCancelGlobal : customCancelNonGlobal;
    const compareTaskCallbackVsDelegate = function(task, delegate) {
      const typeOfDelegate = typeof delegate;
      return typeOfDelegate === "function" && task.callback === delegate || typeOfDelegate === "object" && task.originalDelegate === delegate;
    };
    const compare = (patchOptions2 == null ? void 0 : patchOptions2.diff) || compareTaskCallbackVsDelegate;
    const unpatchedEvents = Zone[zoneSymbol("UNPATCHED_EVENTS")];
    const passiveEvents = _global2[zoneSymbol("PASSIVE_EVENTS")];
    function copyEventListenerOptions(options) {
      if (typeof options === "object" && options !== null) {
        const newOptions = __spreadValues2({}, options);
        if (options.signal) {
          newOptions.signal = options.signal;
        }
        return newOptions;
      }
      return options;
    }
    const makeAddListener = function(nativeListener, addSource, customScheduleFn, customCancelFn, returnTarget2 = false, prepend = false) {
      return function() {
        const target = this || _global2;
        let eventName = arguments[0];
        if (patchOptions2 && patchOptions2.transferEventName) {
          eventName = patchOptions2.transferEventName(eventName);
        }
        let delegate = arguments[1];
        if (!delegate) {
          return nativeListener.apply(this, arguments);
        }
        if (isNode && eventName === "uncaughtException") {
          return nativeListener.apply(this, arguments);
        }
        let isEventListenerObject = false;
        if (typeof delegate !== "function") {
          if (!delegate.handleEvent) {
            return nativeListener.apply(this, arguments);
          }
          isEventListenerObject = true;
        }
        if (validateHandler && !validateHandler(nativeListener, delegate, target, arguments)) {
          return;
        }
        const passive = !!passiveEvents && passiveEvents.indexOf(eventName) !== -1;
        const options = copyEventListenerOptions(buildEventListenerOptions(arguments[2], passive));
        const signal2 = options == null ? void 0 : options.signal;
        if (signal2 == null ? void 0 : signal2.aborted) {
          return;
        }
        if (unpatchedEvents) {
          for (let i = 0; i < unpatchedEvents.length; i++) {
            if (eventName === unpatchedEvents[i]) {
              if (passive) {
                return nativeListener.call(target, eventName, delegate, options);
              } else {
                return nativeListener.apply(this, arguments);
              }
            }
          }
        }
        const capture = !options ? false : typeof options === "boolean" ? true : options.capture;
        const once = options && typeof options === "object" ? options.once : false;
        const zone = Zone.current;
        let symbolEventNames = zoneSymbolEventNames2[eventName];
        if (!symbolEventNames) {
          prepareEventNames(eventName, eventNameToString);
          symbolEventNames = zoneSymbolEventNames2[eventName];
        }
        const symbolEventName = symbolEventNames[capture ? TRUE_STR : FALSE_STR];
        let existingTasks = target[symbolEventName];
        let isExisting = false;
        if (existingTasks) {
          isExisting = true;
          if (checkDuplicate) {
            for (let i = 0; i < existingTasks.length; i++) {
              if (compare(existingTasks[i], delegate)) {
                return;
              }
            }
          }
        } else {
          existingTasks = target[symbolEventName] = [];
        }
        let source;
        const constructorName = target.constructor["name"];
        const targetSource = globalSources[constructorName];
        if (targetSource) {
          source = targetSource[eventName];
        }
        if (!source) {
          source = constructorName + addSource + (eventNameToString ? eventNameToString(eventName) : eventName);
        }
        taskData.options = options;
        if (once) {
          taskData.options.once = false;
        }
        taskData.target = target;
        taskData.capture = capture;
        taskData.eventName = eventName;
        taskData.isExisting = isExisting;
        const data = useGlobalCallback ? OPTIMIZED_ZONE_EVENT_TASK_DATA : void 0;
        if (data) {
          data.taskData = taskData;
        }
        if (signal2) {
          taskData.options.signal = void 0;
        }
        const task = zone.scheduleEventTask(source, delegate, data, customScheduleFn, customCancelFn);
        if (signal2) {
          taskData.options.signal = signal2;
          const onAbort = () => task.zone.cancelTask(task);
          nativeListener.call(signal2, "abort", onAbort, { once: true });
          task.removeAbortListener = () => signal2.removeEventListener("abort", onAbort);
        }
        taskData.target = null;
        if (data) {
          data.taskData = null;
        }
        if (once) {
          taskData.options.once = true;
        }
        if (typeof task.options !== "boolean") {
          task.options = options;
        }
        task.target = target;
        task.capture = capture;
        task.eventName = eventName;
        if (isEventListenerObject) {
          task.originalDelegate = delegate;
        }
        if (!prepend) {
          existingTasks.push(task);
        } else {
          existingTasks.unshift(task);
        }
        if (returnTarget2) {
          return target;
        }
      };
    };
    proto[ADD_EVENT_LISTENER] = makeAddListener(nativeAddEventListener, ADD_EVENT_LISTENER_SOURCE, customSchedule, customCancel, returnTarget);
    if (nativePrependEventListener) {
      proto[PREPEND_EVENT_LISTENER] = makeAddListener(nativePrependEventListener, PREPEND_EVENT_LISTENER_SOURCE, customSchedulePrepend, customCancel, returnTarget, true);
    }
    proto[REMOVE_EVENT_LISTENER] = function() {
      const target = this || _global2;
      let eventName = arguments[0];
      if (patchOptions2 && patchOptions2.transferEventName) {
        eventName = patchOptions2.transferEventName(eventName);
      }
      const options = arguments[2];
      const capture = !options ? false : typeof options === "boolean" ? true : options.capture;
      const delegate = arguments[1];
      if (!delegate) {
        return nativeRemoveEventListener.apply(this, arguments);
      }
      if (validateHandler && !validateHandler(nativeRemoveEventListener, delegate, target, arguments)) {
        return;
      }
      const symbolEventNames = zoneSymbolEventNames2[eventName];
      let symbolEventName;
      if (symbolEventNames) {
        symbolEventName = symbolEventNames[capture ? TRUE_STR : FALSE_STR];
      }
      const existingTasks = symbolEventName && target[symbolEventName];
      if (existingTasks) {
        for (let i = 0; i < existingTasks.length; i++) {
          const existingTask = existingTasks[i];
          if (compare(existingTask, delegate)) {
            existingTasks.splice(i, 1);
            existingTask.isRemoved = true;
            if (existingTasks.length === 0) {
              existingTask.allRemoved = true;
              target[symbolEventName] = null;
              if (!capture && typeof eventName === "string") {
                const onPropertySymbol = ZONE_SYMBOL_PREFIX + "ON_PROPERTY" + eventName;
                target[onPropertySymbol] = null;
              }
            }
            existingTask.zone.cancelTask(existingTask);
            if (returnTarget) {
              return target;
            }
            return;
          }
        }
      }
      return nativeRemoveEventListener.apply(this, arguments);
    };
    proto[LISTENERS_EVENT_LISTENER] = function() {
      const target = this || _global2;
      let eventName = arguments[0];
      if (patchOptions2 && patchOptions2.transferEventName) {
        eventName = patchOptions2.transferEventName(eventName);
      }
      const listeners = [];
      const tasks = findEventTasks(target, eventNameToString ? eventNameToString(eventName) : eventName);
      for (let i = 0; i < tasks.length; i++) {
        const task = tasks[i];
        let delegate = task.originalDelegate ? task.originalDelegate : task.callback;
        listeners.push(delegate);
      }
      return listeners;
    };
    proto[REMOVE_ALL_LISTENERS_EVENT_LISTENER] = function() {
      const target = this || _global2;
      let eventName = arguments[0];
      if (!eventName) {
        const keys = Object.keys(target);
        for (let i = 0; i < keys.length; i++) {
          const prop = keys[i];
          const match = EVENT_NAME_SYMBOL_REGX.exec(prop);
          let evtName = match && match[1];
          if (evtName && evtName !== "removeListener") {
            this[REMOVE_ALL_LISTENERS_EVENT_LISTENER].call(this, evtName);
          }
        }
        this[REMOVE_ALL_LISTENERS_EVENT_LISTENER].call(this, "removeListener");
      } else {
        if (patchOptions2 && patchOptions2.transferEventName) {
          eventName = patchOptions2.transferEventName(eventName);
        }
        const symbolEventNames = zoneSymbolEventNames2[eventName];
        if (symbolEventNames) {
          const symbolEventName = symbolEventNames[FALSE_STR];
          const symbolCaptureEventName = symbolEventNames[TRUE_STR];
          const tasks = target[symbolEventName];
          const captureTasks = target[symbolCaptureEventName];
          if (tasks) {
            const removeTasks = tasks.slice();
            for (let i = 0; i < removeTasks.length; i++) {
              const task = removeTasks[i];
              let delegate = task.originalDelegate ? task.originalDelegate : task.callback;
              this[REMOVE_EVENT_LISTENER].call(this, eventName, delegate, task.options);
            }
          }
          if (captureTasks) {
            const removeTasks = captureTasks.slice();
            for (let i = 0; i < removeTasks.length; i++) {
              const task = removeTasks[i];
              let delegate = task.originalDelegate ? task.originalDelegate : task.callback;
              this[REMOVE_EVENT_LISTENER].call(this, eventName, delegate, task.options);
            }
          }
        }
      }
      if (returnTarget) {
        return this;
      }
    };
    attachOriginToPatched(proto[ADD_EVENT_LISTENER], nativeAddEventListener);
    attachOriginToPatched(proto[REMOVE_EVENT_LISTENER], nativeRemoveEventListener);
    if (nativeRemoveAllListeners) {
      attachOriginToPatched(proto[REMOVE_ALL_LISTENERS_EVENT_LISTENER], nativeRemoveAllListeners);
    }
    if (nativeListeners) {
      attachOriginToPatched(proto[LISTENERS_EVENT_LISTENER], nativeListeners);
    }
    return true;
  }
  let results = [];
  for (let i = 0; i < apis.length; i++) {
    results[i] = patchEventTargetMethods(apis[i], patchOptions);
  }
  return results;
}
function findEventTasks(target, eventName) {
  if (!eventName) {
    const foundTasks = [];
    for (let prop in target) {
      const match = EVENT_NAME_SYMBOL_REGX.exec(prop);
      let evtName = match && match[1];
      if (evtName && (!eventName || evtName === eventName)) {
        const tasks = target[prop];
        if (tasks) {
          for (let i = 0; i < tasks.length; i++) {
            foundTasks.push(tasks[i]);
          }
        }
      }
    }
    return foundTasks;
  }
  let symbolEventName = zoneSymbolEventNames2[eventName];
  if (!symbolEventName) {
    prepareEventNames(eventName);
    symbolEventName = zoneSymbolEventNames2[eventName];
  }
  const captureFalseTasks = target[symbolEventName[FALSE_STR]];
  const captureTrueTasks = target[symbolEventName[TRUE_STR]];
  if (!captureFalseTasks) {
    return captureTrueTasks ? captureTrueTasks.slice() : [];
  } else {
    return captureTrueTasks ? captureFalseTasks.concat(captureTrueTasks) : captureFalseTasks.slice();
  }
}
function patchEventPrototype(global2, api) {
  const Event = global2["Event"];
  if (Event && Event.prototype) {
    api.patchMethod(Event.prototype, "stopImmediatePropagation", (delegate) => function(self2, args) {
      self2[IMMEDIATE_PROPAGATION_SYMBOL] = true;
      delegate && delegate.apply(self2, args);
    });
  }
}
function patchQueueMicrotask(global2, api) {
  api.patchMethod(global2, "queueMicrotask", (delegate) => {
    return function(self2, args) {
      Zone.current.scheduleMicroTask("queueMicrotask", args[0]);
    };
  });
}
var taskSymbol = zoneSymbol("zoneTask");
function patchTimer(window2, setName, cancelName, nameSuffix) {
  let setNative = null;
  let clearNative = null;
  setName += nameSuffix;
  cancelName += nameSuffix;
  const tasksByHandleId = {};
  function scheduleTask(task) {
    const data = task.data;
    data.args[0] = function() {
      return task.invoke.apply(this, arguments);
    };
    const handleOrId = setNative.apply(window2, data.args);
    if (isNumber(handleOrId)) {
      data.handleId = handleOrId;
    } else {
      data.handle = handleOrId;
      data.isRefreshable = isFunction(handleOrId.refresh);
    }
    return task;
  }
  function clearTask(task) {
    const { handle, handleId } = task.data;
    return clearNative.call(window2, handle != null ? handle : handleId);
  }
  setNative = patchMethod(window2, setName, (delegate) => function(self2, args) {
    var _a;
    if (isFunction(args[0])) {
      const options = {
        isRefreshable: false,
        isPeriodic: nameSuffix === "Interval",
        delay: nameSuffix === "Timeout" || nameSuffix === "Interval" ? args[1] || 0 : void 0,
        args
      };
      const callback = args[0];
      args[0] = function timer() {
        try {
          return callback.apply(this, arguments);
        } finally {
          const { handle: handle2, handleId: handleId2, isPeriodic: isPeriodic2, isRefreshable: isRefreshable2 } = options;
          if (!isPeriodic2 && !isRefreshable2) {
            if (handleId2) {
              delete tasksByHandleId[handleId2];
            } else if (handle2) {
              handle2[taskSymbol] = null;
            }
          }
        }
      };
      const task = scheduleMacroTaskWithCurrentZone(setName, args[0], options, scheduleTask, clearTask);
      if (!task) {
        return task;
      }
      const { handleId, handle, isRefreshable, isPeriodic } = task.data;
      if (handleId) {
        tasksByHandleId[handleId] = task;
      } else if (handle) {
        handle[taskSymbol] = task;
        if (isRefreshable && !isPeriodic) {
          const originalRefresh = handle.refresh;
          handle.refresh = function() {
            const { zone, state } = task;
            if (state === "notScheduled") {
              task._state = "scheduled";
              zone._updateTaskCount(task, 1);
            } else if (state === "running") {
              task._state = "scheduling";
            }
            return originalRefresh.call(this);
          };
        }
      }
      return (_a = handle != null ? handle : handleId) != null ? _a : task;
    } else {
      return delegate.apply(window2, args);
    }
  });
  clearNative = patchMethod(window2, cancelName, (delegate) => function(self2, args) {
    const id = args[0];
    let task;
    if (isNumber(id)) {
      task = tasksByHandleId[id];
      delete tasksByHandleId[id];
    } else {
      task = id == null ? void 0 : id[taskSymbol];
      if (task) {
        id[taskSymbol] = null;
      } else {
        task = id;
      }
    }
    if (task == null ? void 0 : task.type) {
      if (task.cancelFn) {
        task.zone.cancelTask(task);
      }
    } else {
      delegate.apply(window2, args);
    }
  });
}
function patchCustomElements(_global2, api) {
  const { isBrowser: isBrowser2, isMix: isMix2 } = api.getGlobalObjects();
  if (!isBrowser2 && !isMix2 || !_global2["customElements"] || !("customElements" in _global2)) {
    return;
  }
  const callbacks = [
    "connectedCallback",
    "disconnectedCallback",
    "adoptedCallback",
    "attributeChangedCallback",
    "formAssociatedCallback",
    "formDisabledCallback",
    "formResetCallback",
    "formStateRestoreCallback"
  ];
  api.patchCallbacks(api, _global2.customElements, "customElements", "define", callbacks);
}
function eventTargetPatch(_global2, api) {
  if (Zone[api.symbol("patchEventTarget")]) {
    return;
  }
  const { eventNames, zoneSymbolEventNames: zoneSymbolEventNames3, TRUE_STR: TRUE_STR2, FALSE_STR: FALSE_STR2, ZONE_SYMBOL_PREFIX: ZONE_SYMBOL_PREFIX2 } = api.getGlobalObjects();
  for (let i = 0; i < eventNames.length; i++) {
    const eventName = eventNames[i];
    const falseEventName = eventName + FALSE_STR2;
    const trueEventName = eventName + TRUE_STR2;
    const symbol = ZONE_SYMBOL_PREFIX2 + falseEventName;
    const symbolCapture = ZONE_SYMBOL_PREFIX2 + trueEventName;
    zoneSymbolEventNames3[eventName] = {};
    zoneSymbolEventNames3[eventName][FALSE_STR2] = symbol;
    zoneSymbolEventNames3[eventName][TRUE_STR2] = symbolCapture;
  }
  const EVENT_TARGET = _global2["EventTarget"];
  if (!EVENT_TARGET || !EVENT_TARGET.prototype) {
    return;
  }
  api.patchEventTarget(_global2, api, [EVENT_TARGET && EVENT_TARGET.prototype]);
  return true;
}
function patchEvent(global2, api) {
  api.patchEventPrototype(global2, api);
}
function filterProperties(target, onProperties, ignoreProperties) {
  if (!ignoreProperties || ignoreProperties.length === 0) {
    return onProperties;
  }
  const tip = ignoreProperties.filter((ip) => ip.target === target);
  if (tip.length === 0) {
    return onProperties;
  }
  const targetIgnoreProperties = tip[0].ignoreProperties;
  return onProperties.filter((op) => targetIgnoreProperties.indexOf(op) === -1);
}
function patchFilteredProperties(target, onProperties, ignoreProperties, prototype) {
  if (!target) {
    return;
  }
  const filteredProperties = filterProperties(target, onProperties, ignoreProperties);
  patchOnProperties(target, filteredProperties, prototype);
}
function getOnEventNames(target) {
  return Object.getOwnPropertyNames(target).filter((name) => name.startsWith("on") && name.length > 2).map((name) => name.substring(2));
}
function propertyDescriptorPatch(api, _global2) {
  if (isNode && !isMix) {
    return;
  }
  if (Zone[api.symbol("patchEvents")]) {
    return;
  }
  const ignoreProperties = _global2["__Zone_ignore_on_properties"];
  let patchTargets = [];
  if (isBrowser) {
    const internalWindow2 = window;
    patchTargets = patchTargets.concat([
      "Document",
      "SVGElement",
      "Element",
      "HTMLElement",
      "HTMLBodyElement",
      "HTMLMediaElement",
      "HTMLFrameSetElement",
      "HTMLFrameElement",
      "HTMLIFrameElement",
      "HTMLMarqueeElement",
      "Worker"
    ]);
    patchFilteredProperties(internalWindow2, getOnEventNames(internalWindow2), ignoreProperties, ObjectGetPrototypeOf(internalWindow2));
  }
  patchTargets = patchTargets.concat([
    "XMLHttpRequest",
    "XMLHttpRequestEventTarget",
    "IDBIndex",
    "IDBRequest",
    "IDBOpenDBRequest",
    "IDBDatabase",
    "IDBTransaction",
    "IDBCursor",
    "WebSocket"
  ]);
  for (let i = 0; i < patchTargets.length; i++) {
    const target = _global2[patchTargets[i]];
    (target == null ? void 0 : target.prototype) && patchFilteredProperties(target.prototype, getOnEventNames(target.prototype), ignoreProperties);
  }
}
function patchBrowser(Zone3) {
  Zone3.__load_patch("timers", (global2) => {
    const set = "set";
    const clear = "clear";
    patchTimer(global2, set, clear, "Timeout");
    patchTimer(global2, set, clear, "Interval");
    patchTimer(global2, set, clear, "Immediate");
  });
  Zone3.__load_patch("requestAnimationFrame", (global2) => {
    patchTimer(global2, "request", "cancel", "AnimationFrame");
    patchTimer(global2, "mozRequest", "mozCancel", "AnimationFrame");
    patchTimer(global2, "webkitRequest", "webkitCancel", "AnimationFrame");
  });
  Zone3.__load_patch("blocking", (global2, Zone4) => {
    const blockingMethods = ["alert", "prompt", "confirm"];
    for (let i = 0; i < blockingMethods.length; i++) {
      const name = blockingMethods[i];
      patchMethod(global2, name, (delegate, symbol, name2) => {
        return function(s, args) {
          return Zone4.current.run(delegate, global2, args, name2);
        };
      });
    }
  });
  Zone3.__load_patch("EventTarget", (global2, Zone4, api) => {
    patchEvent(global2, api);
    eventTargetPatch(global2, api);
    const XMLHttpRequestEventTarget = global2["XMLHttpRequestEventTarget"];
    if (XMLHttpRequestEventTarget && XMLHttpRequestEventTarget.prototype) {
      api.patchEventTarget(global2, api, [XMLHttpRequestEventTarget.prototype]);
    }
  });
  Zone3.__load_patch("MutationObserver", (global2, Zone4, api) => {
    patchClass("MutationObserver");
    patchClass("WebKitMutationObserver");
  });
  Zone3.__load_patch("IntersectionObserver", (global2, Zone4, api) => {
    patchClass("IntersectionObserver");
  });
  Zone3.__load_patch("FileReader", (global2, Zone4, api) => {
    patchClass("FileReader");
  });
  Zone3.__load_patch("on_property", (global2, Zone4, api) => {
    propertyDescriptorPatch(api, global2);
  });
  Zone3.__load_patch("customElements", (global2, Zone4, api) => {
    patchCustomElements(global2, api);
  });
  Zone3.__load_patch("XHR", (global2, Zone4) => {
    patchXHR(global2);
    const XHR_TASK = zoneSymbol("xhrTask");
    const XHR_SYNC = zoneSymbol("xhrSync");
    const XHR_LISTENER = zoneSymbol("xhrListener");
    const XHR_SCHEDULED = zoneSymbol("xhrScheduled");
    const XHR_URL = zoneSymbol("xhrURL");
    const XHR_ERROR_BEFORE_SCHEDULED = zoneSymbol("xhrErrorBeforeScheduled");
    function patchXHR(window2) {
      const XMLHttpRequest = window2["XMLHttpRequest"];
      if (!XMLHttpRequest) {
        return;
      }
      const XMLHttpRequestPrototype = XMLHttpRequest.prototype;
      function findPendingTask(target) {
        return target[XHR_TASK];
      }
      let oriAddListener = XMLHttpRequestPrototype[ZONE_SYMBOL_ADD_EVENT_LISTENER];
      let oriRemoveListener = XMLHttpRequestPrototype[ZONE_SYMBOL_REMOVE_EVENT_LISTENER];
      if (!oriAddListener) {
        const XMLHttpRequestEventTarget = window2["XMLHttpRequestEventTarget"];
        if (XMLHttpRequestEventTarget) {
          const XMLHttpRequestEventTargetPrototype = XMLHttpRequestEventTarget.prototype;
          oriAddListener = XMLHttpRequestEventTargetPrototype[ZONE_SYMBOL_ADD_EVENT_LISTENER];
          oriRemoveListener = XMLHttpRequestEventTargetPrototype[ZONE_SYMBOL_REMOVE_EVENT_LISTENER];
        }
      }
      const READY_STATE_CHANGE = "readystatechange";
      const SCHEDULED = "scheduled";
      function scheduleTask(task) {
        const data = task.data;
        const target = data.target;
        target[XHR_SCHEDULED] = false;
        target[XHR_ERROR_BEFORE_SCHEDULED] = false;
        const listener = target[XHR_LISTENER];
        if (!oriAddListener) {
          oriAddListener = target[ZONE_SYMBOL_ADD_EVENT_LISTENER];
          oriRemoveListener = target[ZONE_SYMBOL_REMOVE_EVENT_LISTENER];
        }
        if (listener) {
          oriRemoveListener.call(target, READY_STATE_CHANGE, listener);
        }
        const newListener = target[XHR_LISTENER] = () => {
          if (target.readyState === target.DONE) {
            if (!data.aborted && target[XHR_SCHEDULED] && task.state === SCHEDULED) {
              const loadTasks = target[Zone4.__symbol__("loadfalse")];
              if (target.status !== 0 && loadTasks && loadTasks.length > 0) {
                const oriInvoke = task.invoke;
                task.invoke = function() {
                  const loadTasks2 = target[Zone4.__symbol__("loadfalse")];
                  for (let i = 0; i < loadTasks2.length; i++) {
                    if (loadTasks2[i] === task) {
                      loadTasks2.splice(i, 1);
                    }
                  }
                  if (!data.aborted && task.state === SCHEDULED) {
                    oriInvoke.call(task);
                  }
                };
                loadTasks.push(task);
              } else {
                task.invoke();
              }
            } else if (!data.aborted && target[XHR_SCHEDULED] === false) {
              target[XHR_ERROR_BEFORE_SCHEDULED] = true;
            }
          }
        };
        oriAddListener.call(target, READY_STATE_CHANGE, newListener);
        const storedTask = target[XHR_TASK];
        if (!storedTask) {
          target[XHR_TASK] = task;
        }
        sendNative.apply(target, data.args);
        target[XHR_SCHEDULED] = true;
        return task;
      }
      function placeholderCallback() {
      }
      function clearTask(task) {
        const data = task.data;
        data.aborted = true;
        return abortNative.apply(data.target, data.args);
      }
      const openNative = patchMethod(XMLHttpRequestPrototype, "open", () => function(self2, args) {
        self2[XHR_SYNC] = args[2] == false;
        self2[XHR_URL] = args[1];
        return openNative.apply(self2, args);
      });
      const XMLHTTPREQUEST_SOURCE = "XMLHttpRequest.send";
      const fetchTaskAborting = zoneSymbol("fetchTaskAborting");
      const fetchTaskScheduling = zoneSymbol("fetchTaskScheduling");
      const sendNative = patchMethod(XMLHttpRequestPrototype, "send", () => function(self2, args) {
        if (Zone4.current[fetchTaskScheduling] === true) {
          return sendNative.apply(self2, args);
        }
        if (self2[XHR_SYNC]) {
          return sendNative.apply(self2, args);
        } else {
          const options = {
            target: self2,
            url: self2[XHR_URL],
            isPeriodic: false,
            args,
            aborted: false
          };
          const task = scheduleMacroTaskWithCurrentZone(XMLHTTPREQUEST_SOURCE, placeholderCallback, options, scheduleTask, clearTask);
          if (self2 && self2[XHR_ERROR_BEFORE_SCHEDULED] === true && !options.aborted && task.state === SCHEDULED) {
            task.invoke();
          }
        }
      });
      const abortNative = patchMethod(XMLHttpRequestPrototype, "abort", () => function(self2, args) {
        const task = findPendingTask(self2);
        if (task && typeof task.type == "string") {
          if (task.cancelFn == null || task.data && task.data.aborted) {
            return;
          }
          task.zone.cancelTask(task);
        } else if (Zone4.current[fetchTaskAborting] === true) {
          return abortNative.apply(self2, args);
        }
      });
    }
  });
  Zone3.__load_patch("geolocation", (global2) => {
    if (global2["navigator"] && global2["navigator"].geolocation) {
      patchPrototype(global2["navigator"].geolocation, ["getCurrentPosition", "watchPosition"]);
    }
  });
  Zone3.__load_patch("PromiseRejectionEvent", (global2, Zone4) => {
    function findPromiseRejectionHandler(evtName) {
      return function(e) {
        const eventTasks = findEventTasks(global2, evtName);
        eventTasks.forEach((eventTask) => {
          const PromiseRejectionEvent = global2["PromiseRejectionEvent"];
          if (PromiseRejectionEvent) {
            const evt = new PromiseRejectionEvent(evtName, {
              promise: e.promise,
              reason: e.rejection
            });
            eventTask.invoke(evt);
          }
        });
      };
    }
    if (global2["PromiseRejectionEvent"]) {
      Zone4[zoneSymbol("unhandledPromiseRejectionHandler")] = findPromiseRejectionHandler("unhandledrejection");
      Zone4[zoneSymbol("rejectionHandledHandler")] = findPromiseRejectionHandler("rejectionhandled");
    }
  });
  Zone3.__load_patch("queueMicrotask", (global2, Zone4, api) => {
    patchQueueMicrotask(global2, api);
  });
}
function patchPromise(Zone3) {
  Zone3.__load_patch("ZoneAwarePromise", (global2, Zone4, api) => {
    const ObjectGetOwnPropertyDescriptor2 = Object.getOwnPropertyDescriptor;
    const ObjectDefineProperty2 = Object.defineProperty;
    function readableObjectToString(obj) {
      if (obj && obj.toString === Object.prototype.toString) {
        const className = obj.constructor && obj.constructor.name;
        return (className ? className : "") + ": " + JSON.stringify(obj);
      }
      return obj ? obj.toString() : Object.prototype.toString.call(obj);
    }
    const __symbol__2 = api.symbol;
    const _uncaughtPromiseErrors = [];
    const isDisableWrappingUncaughtPromiseRejection = global2[__symbol__2("DISABLE_WRAPPING_UNCAUGHT_PROMISE_REJECTION")] !== false;
    const symbolPromise = __symbol__2("Promise");
    const symbolThen = __symbol__2("then");
    const creationTrace = "__creationTrace__";
    api.onUnhandledError = (e) => {
      if (api.showUncaughtError()) {
        const rejection = e && e.rejection;
        if (rejection) {
          console.error("Unhandled Promise rejection:", rejection instanceof Error ? rejection.message : rejection, "; Zone:", e.zone.name, "; Task:", e.task && e.task.source, "; Value:", rejection, rejection instanceof Error ? rejection.stack : void 0);
        } else {
          console.error(e);
        }
      }
    };
    api.microtaskDrainDone = () => {
      while (_uncaughtPromiseErrors.length) {
        const uncaughtPromiseError = _uncaughtPromiseErrors.shift();
        try {
          uncaughtPromiseError.zone.runGuarded(() => {
            if (uncaughtPromiseError.throwOriginal) {
              throw uncaughtPromiseError.rejection;
            }
            throw uncaughtPromiseError;
          });
        } catch (error) {
          handleUnhandledRejection(error);
        }
      }
    };
    const UNHANDLED_PROMISE_REJECTION_HANDLER_SYMBOL = __symbol__2("unhandledPromiseRejectionHandler");
    function handleUnhandledRejection(e) {
      api.onUnhandledError(e);
      try {
        const handler = Zone4[UNHANDLED_PROMISE_REJECTION_HANDLER_SYMBOL];
        if (typeof handler === "function") {
          handler.call(this, e);
        }
      } catch (err) {
      }
    }
    function isThenable(value) {
      return value && typeof value.then === "function";
    }
    function forwardResolution(value) {
      return value;
    }
    function forwardRejection(rejection) {
      return ZoneAwarePromise.reject(rejection);
    }
    const symbolState = __symbol__2("state");
    const symbolValue = __symbol__2("value");
    const symbolFinally = __symbol__2("finally");
    const symbolParentPromiseValue = __symbol__2("parentPromiseValue");
    const symbolParentPromiseState = __symbol__2("parentPromiseState");
    const source = "Promise.then";
    const UNRESOLVED = null;
    const RESOLVED = true;
    const REJECTED = false;
    const REJECTED_NO_CATCH = 0;
    function makeResolver(promise, state) {
      return (v) => {
        try {
          resolvePromise(promise, state, v);
        } catch (err) {
          resolvePromise(promise, false, err);
        }
      };
    }
    const once = function() {
      let wasCalled = false;
      return function wrapper(wrappedFunction) {
        return function() {
          if (wasCalled) {
            return;
          }
          wasCalled = true;
          wrappedFunction.apply(null, arguments);
        };
      };
    };
    const TYPE_ERROR = "Promise resolved with itself";
    const CURRENT_TASK_TRACE_SYMBOL = __symbol__2("currentTaskTrace");
    function resolvePromise(promise, state, value) {
      const onceWrapper = once();
      if (promise === value) {
        throw new TypeError(TYPE_ERROR);
      }
      if (promise[symbolState] === UNRESOLVED) {
        let then = null;
        try {
          if (typeof value === "object" || typeof value === "function") {
            then = value && value.then;
          }
        } catch (err) {
          onceWrapper(() => {
            resolvePromise(promise, false, err);
          })();
          return promise;
        }
        if (state !== REJECTED && value instanceof ZoneAwarePromise && value.hasOwnProperty(symbolState) && value.hasOwnProperty(symbolValue) && value[symbolState] !== UNRESOLVED) {
          clearRejectedNoCatch(value);
          resolvePromise(promise, value[symbolState], value[symbolValue]);
        } else if (state !== REJECTED && typeof then === "function") {
          try {
            then.call(value, onceWrapper(makeResolver(promise, state)), onceWrapper(makeResolver(promise, false)));
          } catch (err) {
            onceWrapper(() => {
              resolvePromise(promise, false, err);
            })();
          }
        } else {
          promise[symbolState] = state;
          const queue = promise[symbolValue];
          promise[symbolValue] = value;
          if (promise[symbolFinally] === symbolFinally) {
            if (state === RESOLVED) {
              promise[symbolState] = promise[symbolParentPromiseState];
              promise[symbolValue] = promise[symbolParentPromiseValue];
            }
          }
          if (state === REJECTED && value instanceof Error) {
            const trace = Zone4.currentTask && Zone4.currentTask.data && Zone4.currentTask.data[creationTrace];
            if (trace) {
              ObjectDefineProperty2(value, CURRENT_TASK_TRACE_SYMBOL, {
                configurable: true,
                enumerable: false,
                writable: true,
                value: trace
              });
            }
          }
          for (let i = 0; i < queue.length; ) {
            scheduleResolveOrReject(promise, queue[i++], queue[i++], queue[i++], queue[i++]);
          }
          if (queue.length == 0 && state == REJECTED) {
            promise[symbolState] = REJECTED_NO_CATCH;
            let uncaughtPromiseError = value;
            try {
              throw new Error("Uncaught (in promise): " + readableObjectToString(value) + (value && value.stack ? "\n" + value.stack : ""));
            } catch (err) {
              uncaughtPromiseError = err;
            }
            if (isDisableWrappingUncaughtPromiseRejection) {
              uncaughtPromiseError.throwOriginal = true;
            }
            uncaughtPromiseError.rejection = value;
            uncaughtPromiseError.promise = promise;
            uncaughtPromiseError.zone = Zone4.current;
            uncaughtPromiseError.task = Zone4.currentTask;
            _uncaughtPromiseErrors.push(uncaughtPromiseError);
            api.scheduleMicroTask();
          }
        }
      }
      return promise;
    }
    const REJECTION_HANDLED_HANDLER = __symbol__2("rejectionHandledHandler");
    function clearRejectedNoCatch(promise) {
      if (promise[symbolState] === REJECTED_NO_CATCH) {
        try {
          const handler = Zone4[REJECTION_HANDLED_HANDLER];
          if (handler && typeof handler === "function") {
            handler.call(this, { rejection: promise[symbolValue], promise });
          }
        } catch (err) {
        }
        promise[symbolState] = REJECTED;
        for (let i = 0; i < _uncaughtPromiseErrors.length; i++) {
          if (promise === _uncaughtPromiseErrors[i].promise) {
            _uncaughtPromiseErrors.splice(i, 1);
          }
        }
      }
    }
    function scheduleResolveOrReject(promise, zone, chainPromise, onFulfilled, onRejected) {
      clearRejectedNoCatch(promise);
      const promiseState = promise[symbolState];
      const delegate = promiseState ? typeof onFulfilled === "function" ? onFulfilled : forwardResolution : typeof onRejected === "function" ? onRejected : forwardRejection;
      zone.scheduleMicroTask(source, () => {
        try {
          const parentPromiseValue = promise[symbolValue];
          const isFinallyPromise = !!chainPromise && symbolFinally === chainPromise[symbolFinally];
          if (isFinallyPromise) {
            chainPromise[symbolParentPromiseValue] = parentPromiseValue;
            chainPromise[symbolParentPromiseState] = promiseState;
          }
          const value = zone.run(delegate, void 0, isFinallyPromise && delegate !== forwardRejection && delegate !== forwardResolution ? [] : [parentPromiseValue]);
          resolvePromise(chainPromise, true, value);
        } catch (error) {
          resolvePromise(chainPromise, false, error);
        }
      }, chainPromise);
    }
    const ZONE_AWARE_PROMISE_TO_STRING = "function ZoneAwarePromise() { [native code] }";
    const noop = function() {
    };
    const AggregateError = global2.AggregateError;
    class ZoneAwarePromise {
      static toString() {
        return ZONE_AWARE_PROMISE_TO_STRING;
      }
      static resolve(value) {
        if (value instanceof ZoneAwarePromise) {
          return value;
        }
        return resolvePromise(new this(null), RESOLVED, value);
      }
      static reject(error) {
        return resolvePromise(new this(null), REJECTED, error);
      }
      static withResolvers() {
        const result = {};
        result.promise = new ZoneAwarePromise((res, rej) => {
          result.resolve = res;
          result.reject = rej;
        });
        return result;
      }
      static any(values) {
        if (!values || typeof values[Symbol.iterator] !== "function") {
          return Promise.reject(new AggregateError([], "All promises were rejected"));
        }
        const promises = [];
        let count = 0;
        try {
          for (let v of values) {
            count++;
            promises.push(ZoneAwarePromise.resolve(v));
          }
        } catch (err) {
          return Promise.reject(new AggregateError([], "All promises were rejected"));
        }
        if (count === 0) {
          return Promise.reject(new AggregateError([], "All promises were rejected"));
        }
        let finished = false;
        const errors = [];
        return new ZoneAwarePromise((resolve, reject) => {
          for (let i = 0; i < promises.length; i++) {
            promises[i].then((v) => {
              if (finished) {
                return;
              }
              finished = true;
              resolve(v);
            }, (err) => {
              errors.push(err);
              count--;
              if (count === 0) {
                finished = true;
                reject(new AggregateError(errors, "All promises were rejected"));
              }
            });
          }
        });
      }
      static race(values) {
        let resolve;
        let reject;
        let promise = new this((res, rej) => {
          resolve = res;
          reject = rej;
        });
        function onResolve(value) {
          resolve(value);
        }
        function onReject(error) {
          reject(error);
        }
        for (let value of values) {
          if (!isThenable(value)) {
            value = this.resolve(value);
          }
          value.then(onResolve, onReject);
        }
        return promise;
      }
      static all(values) {
        return ZoneAwarePromise.allWithCallback(values);
      }
      static allSettled(values) {
        const P = this && this.prototype instanceof ZoneAwarePromise ? this : ZoneAwarePromise;
        return P.allWithCallback(values, {
          thenCallback: (value) => ({ status: "fulfilled", value }),
          errorCallback: (err) => ({ status: "rejected", reason: err })
        });
      }
      static allWithCallback(values, callback) {
        let resolve;
        let reject;
        let promise = new this((res, rej) => {
          resolve = res;
          reject = rej;
        });
        let unresolvedCount = 2;
        let valueIndex = 0;
        const resolvedValues = [];
        for (let value of values) {
          if (!isThenable(value)) {
            value = this.resolve(value);
          }
          const curValueIndex = valueIndex;
          try {
            value.then((value2) => {
              resolvedValues[curValueIndex] = callback ? callback.thenCallback(value2) : value2;
              unresolvedCount--;
              if (unresolvedCount === 0) {
                resolve(resolvedValues);
              }
            }, (err) => {
              if (!callback) {
                reject(err);
              } else {
                resolvedValues[curValueIndex] = callback.errorCallback(err);
                unresolvedCount--;
                if (unresolvedCount === 0) {
                  resolve(resolvedValues);
                }
              }
            });
          } catch (thenErr) {
            reject(thenErr);
          }
          unresolvedCount++;
          valueIndex++;
        }
        unresolvedCount -= 2;
        if (unresolvedCount === 0) {
          resolve(resolvedValues);
        }
        return promise;
      }
      constructor(executor) {
        const promise = this;
        if (!(promise instanceof ZoneAwarePromise)) {
          throw new Error("Must be an instanceof Promise.");
        }
        promise[symbolState] = UNRESOLVED;
        promise[symbolValue] = [];
        try {
          const onceWrapper = once();
          executor && executor(onceWrapper(makeResolver(promise, RESOLVED)), onceWrapper(makeResolver(promise, REJECTED)));
        } catch (error) {
          resolvePromise(promise, false, error);
        }
      }
      get [Symbol.toStringTag]() {
        return "Promise";
      }
      get [Symbol.species]() {
        return ZoneAwarePromise;
      }
      then(onFulfilled, onRejected) {
        var _a;
        let C = (_a = this.constructor) == null ? void 0 : _a[Symbol.species];
        if (!C || typeof C !== "function") {
          C = this.constructor || ZoneAwarePromise;
        }
        const chainPromise = new C(noop);
        const zone = Zone4.current;
        if (this[symbolState] == UNRESOLVED) {
          this[symbolValue].push(zone, chainPromise, onFulfilled, onRejected);
        } else {
          scheduleResolveOrReject(this, zone, chainPromise, onFulfilled, onRejected);
        }
        return chainPromise;
      }
      catch(onRejected) {
        return this.then(null, onRejected);
      }
      finally(onFinally) {
        var _a;
        let C = (_a = this.constructor) == null ? void 0 : _a[Symbol.species];
        if (!C || typeof C !== "function") {
          C = ZoneAwarePromise;
        }
        const chainPromise = new C(noop);
        chainPromise[symbolFinally] = symbolFinally;
        const zone = Zone4.current;
        if (this[symbolState] == UNRESOLVED) {
          this[symbolValue].push(zone, chainPromise, onFinally, onFinally);
        } else {
          scheduleResolveOrReject(this, zone, chainPromise, onFinally, onFinally);
        }
        return chainPromise;
      }
    }
    ZoneAwarePromise["resolve"] = ZoneAwarePromise.resolve;
    ZoneAwarePromise["reject"] = ZoneAwarePromise.reject;
    ZoneAwarePromise["race"] = ZoneAwarePromise.race;
    ZoneAwarePromise["all"] = ZoneAwarePromise.all;
    const NativePromise = global2[symbolPromise] = global2["Promise"];
    global2["Promise"] = ZoneAwarePromise;
    const symbolThenPatched = __symbol__2("thenPatched");
    function patchThen(Ctor) {
      const proto = Ctor.prototype;
      const prop = ObjectGetOwnPropertyDescriptor2(proto, "then");
      if (prop && (prop.writable === false || !prop.configurable)) {
        return;
      }
      const originalThen = proto.then;
      proto[symbolThen] = originalThen;
      Ctor.prototype.then = function(onResolve, onReject) {
        const wrapped = new ZoneAwarePromise((resolve, reject) => {
          originalThen.call(this, resolve, reject);
        });
        return wrapped.then(onResolve, onReject);
      };
      Ctor[symbolThenPatched] = true;
    }
    api.patchThen = patchThen;
    function zoneify(fn) {
      return function(self2, args) {
        let resultPromise = fn.apply(self2, args);
        if (resultPromise instanceof ZoneAwarePromise) {
          return resultPromise;
        }
        let ctor = resultPromise.constructor;
        if (!ctor[symbolThenPatched]) {
          patchThen(ctor);
        }
        return resultPromise;
      };
    }
    if (NativePromise) {
      patchThen(NativePromise);
      patchMethod(global2, "fetch", (delegate) => zoneify(delegate));
    }
    Promise[Zone4.__symbol__("uncaughtPromiseErrors")] = _uncaughtPromiseErrors;
    return ZoneAwarePromise;
  });
}
function patchToString(Zone3) {
  Zone3.__load_patch("toString", (global2) => {
    const originalFunctionToString = Function.prototype.toString;
    const ORIGINAL_DELEGATE_SYMBOL = zoneSymbol("OriginalDelegate");
    const PROMISE_SYMBOL = zoneSymbol("Promise");
    const ERROR_SYMBOL = zoneSymbol("Error");
    const newFunctionToString = function toString() {
      if (typeof this === "function") {
        const originalDelegate = this[ORIGINAL_DELEGATE_SYMBOL];
        if (originalDelegate) {
          if (typeof originalDelegate === "function") {
            return originalFunctionToString.call(originalDelegate);
          } else {
            return Object.prototype.toString.call(originalDelegate);
          }
        }
        if (this === Promise) {
          const nativePromise = global2[PROMISE_SYMBOL];
          if (nativePromise) {
            return originalFunctionToString.call(nativePromise);
          }
        }
        if (this === Error) {
          const nativeError = global2[ERROR_SYMBOL];
          if (nativeError) {
            return originalFunctionToString.call(nativeError);
          }
        }
      }
      return originalFunctionToString.call(this);
    };
    newFunctionToString[ORIGINAL_DELEGATE_SYMBOL] = originalFunctionToString;
    Function.prototype.toString = newFunctionToString;
    const originalObjectToString = Object.prototype.toString;
    const PROMISE_OBJECT_TO_STRING = "[object Promise]";
    Object.prototype.toString = function() {
      if (typeof Promise === "function" && this instanceof Promise) {
        return PROMISE_OBJECT_TO_STRING;
      }
      return originalObjectToString.call(this);
    };
  });
}
function patchCallbacks(api, target, targetName, method, callbacks) {
  const symbol = Zone.__symbol__(method);
  if (target[symbol]) {
    return;
  }
  const nativeDelegate = target[symbol] = target[method];
  target[method] = function(name, opts, options) {
    if (opts && opts.prototype) {
      callbacks.forEach(function(callback) {
        const source = `${targetName}.${method}::` + callback;
        const prototype = opts.prototype;
        try {
          if (prototype.hasOwnProperty(callback)) {
            const descriptor = api.ObjectGetOwnPropertyDescriptor(prototype, callback);
            if (descriptor && descriptor.value) {
              descriptor.value = api.wrapWithCurrentZone(descriptor.value, source);
              api._redefineProperty(opts.prototype, callback, descriptor);
            } else if (prototype[callback]) {
              prototype[callback] = api.wrapWithCurrentZone(prototype[callback], source);
            }
          } else if (prototype[callback]) {
            prototype[callback] = api.wrapWithCurrentZone(prototype[callback], source);
          }
        } catch (e) {
        }
      });
    }
    return nativeDelegate.call(target, name, opts, options);
  };
  api.attachOriginToPatched(target[method], nativeDelegate);
}
function patchUtil(Zone3) {
  Zone3.__load_patch("util", (global2, Zone4, api) => {
    const eventNames = getOnEventNames(global2);
    api.patchOnProperties = patchOnProperties;
    api.patchMethod = patchMethod;
    api.bindArguments = bindArguments;
    api.patchMacroTask = patchMacroTask;
    const SYMBOL_BLACK_LISTED_EVENTS = Zone4.__symbol__("BLACK_LISTED_EVENTS");
    const SYMBOL_UNPATCHED_EVENTS = Zone4.__symbol__("UNPATCHED_EVENTS");
    if (global2[SYMBOL_UNPATCHED_EVENTS]) {
      global2[SYMBOL_BLACK_LISTED_EVENTS] = global2[SYMBOL_UNPATCHED_EVENTS];
    }
    if (global2[SYMBOL_BLACK_LISTED_EVENTS]) {
      Zone4[SYMBOL_BLACK_LISTED_EVENTS] = Zone4[SYMBOL_UNPATCHED_EVENTS] = global2[SYMBOL_BLACK_LISTED_EVENTS];
    }
    api.patchEventPrototype = patchEventPrototype;
    api.patchEventTarget = patchEventTarget;
    api.ObjectDefineProperty = ObjectDefineProperty;
    api.ObjectGetOwnPropertyDescriptor = ObjectGetOwnPropertyDescriptor;
    api.ObjectCreate = ObjectCreate;
    api.ArraySlice = ArraySlice;
    api.patchClass = patchClass;
    api.wrapWithCurrentZone = wrapWithCurrentZone;
    api.filterProperties = filterProperties;
    api.attachOriginToPatched = attachOriginToPatched;
    api._redefineProperty = Object.defineProperty;
    api.patchCallbacks = patchCallbacks;
    api.getGlobalObjects = () => ({
      globalSources,
      zoneSymbolEventNames: zoneSymbolEventNames2,
      eventNames,
      isBrowser,
      isMix,
      isNode,
      TRUE_STR,
      FALSE_STR,
      ZONE_SYMBOL_PREFIX,
      ADD_EVENT_LISTENER_STR,
      REMOVE_EVENT_LISTENER_STR
    });
  });
}
function patchCommon(Zone3) {
  patchPromise(Zone3);
  patchToString(Zone3);
  patchUtil(Zone3);
}
var Zone2 = loadZone();
patchCommon(Zone2);
patchBrowser(Zone2);

// src/main.ts
bootstrapApplication(App, appConfig).catch((err) => console.error(err));
/*! Bundled license information:

@angular/platform-browser/fesm2022/animations-async.mjs:
  (**
   * @license Angular v21.1.3
   * (c) 2010-2026 Google LLC. https://angular.dev/
   * License: MIT
   *)

@angular/common/locales/es-EC.js:
  (**
   * @license
   * Copyright Google LLC All Rights Reserved.
   *
   * Use of this source code is governed by an MIT-style license that can be
   * found in the LICENSE file at https://angular.dev/license
   *)

zone.js/fesm2015/zone.js:
  (**
   * @license Angular
   * (c) 2010-2025 Google LLC. https://angular.dev/
   * License: MIT
   *)
*/
//# sourceMappingURL=main.js.map
