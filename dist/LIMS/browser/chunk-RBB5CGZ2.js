import {
  ActivationEnd,
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet
} from "./chunk-TEDJSKV5.js";
import {
  ToastrService
} from "./chunk-PWNMWNUA.js";
import "./chunk-XTPUTV4O.js";
import {
  RoleAccess
} from "./chunk-O4XHAB45.js";
import {
  require_sweetalert2_all
} from "./chunk-TTWGDTQR.js";
import {
  AuthService,
  CommonModule,
  NgClass,
  NgComponentOutlet,
  environment
} from "./chunk-FYBL3SR2.js";
import {
  Component,
  Injectable,
  Input,
  __spreadProps,
  __spreadValues,
  __toESM,
  computed,
  filter,
  inject,
  map,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵclassMap,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵdefineInjectable,
  ɵɵdirectiveInject,
  ɵɵdomElement,
  ɵɵdomElementEnd,
  ɵɵdomElementStart,
  ɵɵelement,
  ɵɵelementContainer,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnamespaceSVG,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵpureFunction1,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIdentity,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-4XEQTJJK.js";

// src/app/shared/service/sidebar.service.ts
var SidebarService = class _SidebarService {
  // Usamos una Signal: true = Abierto, false = Cerrado
  isOpen = signal(true, ...ngDevMode ? [{ debugName: "isOpen" }] : []);
  toggle() {
    this.isOpen.update((val) => !val);
  }
  static \u0275fac = function SidebarService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _SidebarService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _SidebarService, factory: _SidebarService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SidebarService, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], null, null);
})();

// src/app/shared/components/header/header.ts
var import_sweetalert2 = __toESM(require_sweetalert2_all());

// src/app/ui/constants/colors.ts
var colors = {
  white: "#F5F5F5",
  black: "#000000",
  green: "#06d79c",
  red: "#ef5350",
  blue: "##214B93",
  primary: "#1d2b64"
};
var colors_default = colors;

// src/app/ui/icons/settings/settings.component.ts
var SettingsComponent = class _SettingsComponent {
  size = 1;
  color = colors_default.black;
  static \u0275fac = function SettingsComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _SettingsComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _SettingsComponent, selectors: [["app-settings"]], inputs: { size: "size", color: "color" }, decls: 2, vars: 3, consts: [["xmlns", "http://www.w3.org/2000/svg", "viewBox", "0 0 24 24", "aria-hidden", "true", 1, "h-5", "w-5", "text-blue-gray-500"], ["fill-rule", "evenodd", "d", "M11.078 2.25c-.917 0-1.699.663-1.85 1.567L9.05 4.889c-.02.12-.115.26-.297.348a7.493 7.493 0 00-.986.57c-.166.115-.334.126-.45.083L6.3 5.508a1.875 1.875 0 00-2.282.819l-.922 1.597a1.875 1.875 0 00.432 2.385l.84.692c.095.078.17.229.154.43a7.598 7.598 0 000 1.139c.015.2-.059.352-.153.43l-.841.692a1.875 1.875 0 00-.432 2.385l.922 1.597a1.875 1.875 0 002.282.818l1.019-.382c.115-.043.283-.031.45.082.312.214.641.405.985.57.182.088.277.228.297.35l.178 1.071c.151.904.933 1.567 1.85 1.567h1.844c.916 0 1.699-.663 1.85-1.567l.178-1.072c.02-.12.114-.26.297-.349.344-.165.673-.356.985-.57.167-.114.335-.125.45-.082l1.02.382a1.875 1.875 0 002.28-.819l.923-1.597a1.875 1.875 0 00-.432-2.385l-.84-.692c-.095-.078-.17-.229-.154-.43a7.614 7.614 0 000-1.139c-.016-.2.059-.352.153-.43l.84-.692c.708-.582.891-1.59.433-2.385l-.922-1.597a1.875 1.875 0 00-2.282-.818l-1.02.382c-.114.043-.282.031-.449-.083a7.49 7.49 0 00-.985-.57c-.183-.087-.277-.227-.297-.348l-.179-1.072a1.875 1.875 0 00-1.85-1.567h-1.843zM12 15.75a3.75 3.75 0 100-7.5 3.75 3.75 0 000 7.5z", "clip-rule", "evenodd"]], template: function SettingsComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275namespaceSVG();
      \u0275\u0275domElementStart(0, "svg", 0);
      \u0275\u0275domElement(1, "path", 1);
      \u0275\u0275domElementEnd();
    }
    if (rf & 2) {
      \u0275\u0275attribute("fill", ctx.color)("width", 40 * ctx.size)("height", 40 * ctx.size);
    }
  }, encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SettingsComponent, [{
    type: Component,
    args: [{ selector: "app-settings", imports: [], template: '<svg\n  xmlns="http://www.w3.org/2000/svg"\n  viewBox="0 0 24 24"\n  [attr.fill]="color"\n  [attr.width]="40 * size"\n  [attr.height]="40 * size"\n  aria-hidden="true"\n  class="h-5 w-5 text-blue-gray-500"\n>\n  <path\n    fill-rule="evenodd"\n    d="M11.078 2.25c-.917 0-1.699.663-1.85 1.567L9.05 4.889c-.02.12-.115.26-.297.348a7.493 7.493 0 00-.986.57c-.166.115-.334.126-.45.083L6.3 5.508a1.875 1.875 0 00-2.282.819l-.922 1.597a1.875 1.875 0 00.432 2.385l.84.692c.095.078.17.229.154.43a7.598 7.598 0 000 1.139c.015.2-.059.352-.153.43l-.841.692a1.875 1.875 0 00-.432 2.385l.922 1.597a1.875 1.875 0 002.282.818l1.019-.382c.115-.043.283-.031.45.082.312.214.641.405.985.57.182.088.277.228.297.35l.178 1.071c.151.904.933 1.567 1.85 1.567h1.844c.916 0 1.699-.663 1.85-1.567l.178-1.072c.02-.12.114-.26.297-.349.344-.165.673-.356.985-.57.167-.114.335-.125.45-.082l1.02.382a1.875 1.875 0 002.28-.819l.923-1.597a1.875 1.875 0 00-.432-2.385l-.84-.692c-.095-.078-.17-.229-.154-.43a7.614 7.614 0 000-1.139c-.016-.2.059-.352.153-.43l.84-.692c.708-.582.891-1.59.433-2.385l-.922-1.597a1.875 1.875 0 00-2.282-.818l-1.02.382c-.114.043-.282.031-.449-.083a7.49 7.49 0 00-.985-.57c-.183-.087-.277-.227-.297-.348l-.179-1.072a1.875 1.875 0 00-1.85-1.567h-1.843zM12 15.75a3.75 3.75 0 100-7.5 3.75 3.75 0 000 7.5z"\n    clip-rule="evenodd"\n  ></path>\n</svg>\n' }]
  }], null, { size: [{
    type: Input
  }], color: [{
    type: Input
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(SettingsComponent, { className: "SettingsComponent", filePath: "src/app/ui/icons/settings/settings.component.ts", lineNumber: 10 });
})();

// src/app/ui/icons/notification-icon/notification-icon.component.ts
var NotificationIconComponent = class _NotificationIconComponent {
  size = 1;
  color = colors_default.black;
  static \u0275fac = function NotificationIconComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _NotificationIconComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _NotificationIconComponent, selectors: [["app-notification-icon"]], inputs: { size: "size", color: "color" }, decls: 2, vars: 3, consts: [["xmlns", "http://www.w3.org/2000/svg", "viewBox", "0 0 24 24", "aria-hidden", "true", 1, "h-5", "w-5", "text-blue-gray-500"], ["fill-rule", "evenodd", "d", "M5.25 9a6.75 6.75 0 0113.5 0v.75c0 2.123.8 4.057 2.118 5.52a.75.75 0 01-.297 1.206c-1.544.57-3.16.99-4.831 1.243a3.75 3.75 0 11-7.48 0 24.585 24.585 0 01-4.831-1.244.75.75 0 01-.298-1.205A8.217 8.217 0 005.25 9.75V9zm4.502 8.9a2.25 2.25 0 104.496 0 25.057 25.057 0 01-4.496 0z", "clip-rule", "evenodd"]], template: function NotificationIconComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275namespaceSVG();
      \u0275\u0275domElementStart(0, "svg", 0);
      \u0275\u0275domElement(1, "path", 1);
      \u0275\u0275domElementEnd();
    }
    if (rf & 2) {
      \u0275\u0275attribute("fill", ctx.color)("width", 40 * ctx.size)("height", 40 * ctx.size);
    }
  }, encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NotificationIconComponent, [{
    type: Component,
    args: [{ selector: "app-notification-icon", imports: [], template: '<svg\n  xmlns="http://www.w3.org/2000/svg"\n  viewBox="0 0 24 24"\n  [attr.fill]="color"\n  [attr.width]="40 * size"\n  [attr.height]="40 * size"\n  aria-hidden="true"\n  class="h-5 w-5 text-blue-gray-500"\n>\n  <path\n    fill-rule="evenodd"\n    d="M5.25 9a6.75 6.75 0 0113.5 0v.75c0 2.123.8 4.057 2.118 5.52a.75.75 0 01-.297 1.206c-1.544.57-3.16.99-4.831 1.243a3.75 3.75 0 11-7.48 0 24.585 24.585 0 01-4.831-1.244.75.75 0 01-.298-1.205A8.217 8.217 0 005.25 9.75V9zm4.502 8.9a2.25 2.25 0 104.496 0 25.057 25.057 0 01-4.496 0z"\n    clip-rule="evenodd"\n  ></path>\n</svg>\n' }]
  }], null, { size: [{
    type: Input
  }], color: [{
    type: Input
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(NotificationIconComponent, { className: "NotificationIconComponent", filePath: "src/app/ui/icons/notification-icon/notification-icon.component.ts", lineNumber: 10 });
})();

// src/app/ui/icons/hamburger-icon/hamburger-icon.component.ts
var HamburgerIconComponent = class _HamburgerIconComponent {
  size = 1;
  color = colors_default.black;
  static \u0275fac = function HamburgerIconComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _HamburgerIconComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _HamburgerIconComponent, selectors: [["app-hamburger-icon"]], inputs: { size: "size", color: "color" }, decls: 2, vars: 3, consts: [["xmlns", "http://www.w3.org/2000/svg", "viewBox", "0 0 24 24", "aria-hidden", "true", "stroke-width", "3", 1, "h-6", "w-6", "text-blue-gray-500"], ["fill-rule", "evenodd", "d", "M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z", "clip-rule", "evenodd"]], template: function HamburgerIconComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275namespaceSVG();
      \u0275\u0275domElementStart(0, "svg", 0);
      \u0275\u0275domElement(1, "path", 1);
      \u0275\u0275domElementEnd();
    }
    if (rf & 2) {
      \u0275\u0275attribute("fill", ctx.color)("width", 40 * ctx.size)("height", 40 * ctx.size);
    }
  }, encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(HamburgerIconComponent, [{
    type: Component,
    args: [{ selector: "app-hamburger-icon", imports: [], template: '<svg\n  xmlns="http://www.w3.org/2000/svg"\n  viewBox="0 0 24 24"\n  [attr.fill]="color"\n  [attr.width]="40 * size"\n  [attr.height]="40 * size"\n  aria-hidden="true"\n  stroke-width="3"\n  class="h-6 w-6 text-blue-gray-500"\n>\n  <path\n    fill-rule="evenodd"\n    d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"\n    clip-rule="evenodd"\n  ></path>\n</svg>\n' }]
  }], null, { size: [{
    type: Input
  }], color: [{
    type: Input
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(HamburgerIconComponent, { className: "HamburgerIconComponent", filePath: "src/app/ui/icons/hamburger-icon/hamburger-icon.component.ts", lineNumber: 10 });
})();

// src/app/ui/icons/user/user.component.ts
var UserComponent = class _UserComponent {
  size = 1;
  color = colors_default.black;
  static \u0275fac = function UserComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _UserComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _UserComponent, selectors: [["app-user"]], inputs: { size: "size", color: "color" }, decls: 2, vars: 3, consts: [["xmlns", "http://www.w3.org/2000/svg", "viewBox", "0 0 24 24", "aria-hidden", "true", 1, "h-5", "w-5", "text-blue-gray-500"], ["fill-rule", "evenodd", "d", "M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z", "clip-rule", "evenodd"]], template: function UserComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275namespaceSVG();
      \u0275\u0275domElementStart(0, "svg", 0);
      \u0275\u0275domElement(1, "path", 1);
      \u0275\u0275domElementEnd();
    }
    if (rf & 2) {
      \u0275\u0275attribute("fill", ctx.color)("width", 40 * ctx.size)("height", 40 * ctx.size);
    }
  }, encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(UserComponent, [{
    type: Component,
    args: [{ selector: "app-user", imports: [], template: '<svg\n  xmlns="http://www.w3.org/2000/svg"\n  viewBox="0 0 24 24"\n  [attr.fill]="color"\n  [attr.width]="40 * size"\n  [attr.height]="40 * size"\n  aria-hidden="true"\n  class="h-5 w-5 text-blue-gray-500"\n>\n  <path\n    fill-rule="evenodd"\n    d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"\n    clip-rule="evenodd"\n  ></path>\n</svg>\n' }]
  }], null, { size: [{
    type: Input
  }], color: [{
    type: Input
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(UserComponent, { className: "UserComponent", filePath: "src/app/ui/icons/user/user.component.ts", lineNumber: 10 });
})();

// src/app/shared/components/header/header.ts
function Header_Conditional_23_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 17);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.userRoles[0], " ");
  }
}
function Header_Conditional_26_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 27);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const role_r2 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("+ ", role_r2);
  }
}
function Header_Conditional_26_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 19);
    \u0275\u0275repeaterCreate(1, Header_Conditional_26_For_2_Template, 2, 1, "span", 27, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r0.userRoles.slice(1));
  }
}
var Header = class _Header {
  authService;
  toast;
  router;
  Title;
  // Variables para mostrar en la interfaz
  userName = "";
  userEmail = "";
  userRoles = [];
  constructor(authService, toast, router) {
    this.authService = authService;
    this.toast = toast;
    this.router = router;
    this.router.events.pipe(filter((event) => event instanceof ActivationEnd), filter((event) => event.snapshot.firstChild === null), map((event) => event.snapshot.data)).subscribe((data) => {
      this.Title = data["title"];
      document.title = data["title"];
    });
  }
  ngOnInit() {
    this.loadUserData();
  }
  loadUserData() {
    this.userName = localStorage.getItem("user_name") || "Usuario";
    this.userEmail = localStorage.getItem("user_email") || "";
    const rolesRaw = localStorage.getItem("user_roles");
    if (rolesRaw) {
      try {
        this.userRoles = JSON.parse(rolesRaw);
      } catch (e) {
        this.userRoles = [];
      }
    }
  }
  logout() {
    import_sweetalert2.default.fire({
      title: "\xBFEst\xE1s seguro?",
      text: "Est\xE1s a punto de cerrar sesi\xF3n.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "S\xED, cerrar sesi\xF3n",
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
        this.authService.logout();
        this.router.navigateByUrl("/login");
        import_sweetalert2.default.fire("\xA1Cerrado!", "Has cerrado sesi\xF3n correctamente.", "success");
      }
    });
  }
  notification() {
    this.toast.success("Notificaci\xF3n", "Esta es una notificaci\xF3n de prueba", {
      timeOut: 3e3,
      progressBar: true,
      closeButton: true,
      positionClass: "toast-top-right"
    });
  }
  static \u0275fac = function Header_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _Header)(\u0275\u0275directiveInject(AuthService), \u0275\u0275directiveInject(ToastrService), \u0275\u0275directiveInject(Router));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _Header, selectors: [["app-header"]], decls: 43, vars: 6, consts: [[1, "flex", "flex-col-reverse", "justify-between", "gap-6", "md:flex-row", "md:items-center"], [1, "capitalize"], ["aria-label", "breadcrumb", 1, "w-max"], [1, "flex", "flex-wrap", "items-center", "w-full", "bg-opacity-60", "rounded-md", "bg-transparent", "p-0", "transition-all"], [1, "flex", "items-center", "text-blue-gray-900", "antialiased", "font-sans", "text-sm", "font-normal", "leading-normal", "cursor-pointer", "transition-colors", "duration-300", "hover:text-light-blue-500"], ["href", "#"], [1, "block", "antialiased", "font-sans", "text-sm", "leading-normal", "text-blue-900", "font-normal", "opacity-50", "transition-all", "hover:text-blue-500", "hover:opacity-100"], [1, "text-gray-500", "text-sm", "antialiased", "font-sans", "font-normal", "leading-normal", "mx-2", "pointer-events-none", "select-none"], [1, "flex", "items-center", "text-blue-900", "antialiased", "font-sans", "text-sm", "font-normal", "leading-normal", "cursor-pointer", "transition-colors", "duration-300", "hover:text-blue-500"], [1, "block", "antialiased", "font-sans", "text-sm", "leading-normal", "text-blue-gray-900", "font-normal"], [1, "block", "antialiased", "tracking-normal", "font-sans", "text-base", "font-semibold", "leading-relaxed", "text-gray-900"], [1, "flex", "items-center", "gap-4"], [1, "flex", "items-center", "bg-gray-50", "border", "border-gray-200", "rounded-xl", "p-1.5", "pr-4", "gap-3", "shadow-sm", "hover:bg-gray-100", "transition-all", "duration-300"], [1, "flex", "h-10", "w-10", "items-center", "justify-center", "rounded-lg", "bg-blue-600", "text-white", "font-bold", "shadow-md"], [1, "flex", "flex-col"], [1, "flex", "items-center", "gap-2"], [1, "text-sm", "font-semibold", "text-blue-900", "leading-none"], [1, "bg-blue-100", "text-blue-700", "text-[9px]", "font-extrabold", "px-1.5", "py-0.5", "rounded", "uppercase", "tracking-wider"], [1, "text-[11px]", "text-gray-500", "font-medium"], [1, "flex", "gap-1", "mt-0.5"], [1, "flex", "items-center"], ["type", "button", 1, "relative", "middle", "none", "font-sans", "font-medium", "text-center", "uppercase", "transition-all", "w-10", "h-10", "rounded-lg", "text-gray-500", "hover:bg-blue-gray-500/10", "grid", "xl:hidden"], [1, "absolute", "top-1/2", "left-1/2", "transform", "-translate-y-1/2", "-translate-x-1/2"], ["type", "button", 1, "middle", "none", "font-sans", "font-bold", "center", "uppercase", "transition-all", "text-xs", "py-3", "rounded-lg", "text-gray-500", "hover:bg-blue-gray-500/10", "hidden", "items-center", "gap-1", "px-4", "xl:flex", 3, "click"], ["type", "button", 1, "relative", "middle", "none", "font-sans", "font-medium", "text-center", "uppercase", "transition-all", "w-10", "h-10", "rounded-lg", "text-gray-500", "hover:bg-blue-gray-500/10", "grid", "xl:hidden", 3, "click"], ["type", "button", 1, "relative", "middle", "none", "font-sans", "font-medium", "text-center", "uppercase", "transition-all", "w-10", "h-10", "rounded-lg", "text-gray-500", "hover:bg-blue-gray-500/10"], ["type", "button", 1, "relative", "middle", "none", "font-sans", "font-medium", "text-center", "uppercase", "transition-all", "w-10", "h-10", "rounded-lg", "text-gray-500", "hover:bg-blue-gray-500/10", 3, "click"], [1, "text-[9px]", "text-gray-400", "italic"]], template: function Header_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "nav", 2)(3, "ol", 3)(4, "li", 4)(5, "a", 5)(6, "p", 6);
      \u0275\u0275text(7);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(8, "span", 7);
      \u0275\u0275text(9, "/");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(10, "li", 8)(11, "p", 9);
      \u0275\u0275text(12, " SGIA ");
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(13, "h6", 10);
      \u0275\u0275text(14, " SGIA ");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(15, "div", 11)(16, "div", 12)(17, "div", 13);
      \u0275\u0275text(18);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(19, "div", 14)(20, "div", 15)(21, "span", 16);
      \u0275\u0275text(22);
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(23, Header_Conditional_23_Template, 2, 1, "span", 17);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(24, "span", 18);
      \u0275\u0275text(25);
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(26, Header_Conditional_26_Template, 3, 0, "div", 19);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(27, "div", 20)(28, "button", 21)(29, "span", 22);
      \u0275\u0275element(30, "app-hamburger-icon");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(31, "button", 23);
      \u0275\u0275listener("click", function Header_Template_button_click_31_listener() {
        return ctx.logout();
      });
      \u0275\u0275element(32, "app-user");
      \u0275\u0275text(33, " Cerrar sesi\xF3n ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(34, "button", 24);
      \u0275\u0275listener("click", function Header_Template_button_click_34_listener() {
        return ctx.logout();
      });
      \u0275\u0275elementStart(35, "span", 22);
      \u0275\u0275element(36, "app-user");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(37, "button", 25)(38, "span", 22);
      \u0275\u0275element(39, "app-settings");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(40, "button", 26);
      \u0275\u0275listener("click", function Header_Template_button_click_40_listener() {
        return ctx.notification();
      });
      \u0275\u0275elementStart(41, "span", 22);
      \u0275\u0275element(42, "app-notification-icon");
      \u0275\u0275elementEnd()()()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(7);
      \u0275\u0275textInterpolate1(" ", ctx.Title, " ");
      \u0275\u0275advance(11);
      \u0275\u0275textInterpolate1(" ", ctx.userName.charAt(0), " ");
      \u0275\u0275advance(4);
      \u0275\u0275textInterpolate(ctx.userName);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.userRoles.length > 0 ? 23 : -1);
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.userEmail);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.userRoles.length > 1 ? 26 : -1);
    }
  }, dependencies: [SettingsComponent, NotificationIconComponent, HamburgerIconComponent, UserComponent], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(Header, [{
    type: Component,
    args: [{ selector: "app-header", imports: [SettingsComponent, NotificationIconComponent, HamburgerIconComponent, UserComponent], template: '<div\n  class="flex flex-col-reverse justify-between gap-6 md:flex-row md:items-center"\n>\n  <div class="capitalize">\n    <nav aria-label="breadcrumb" class="w-max">\n      <ol\n        class="flex flex-wrap items-center w-full bg-opacity-60 rounded-md bg-transparent p-0 transition-all"\n      >\n        <li\n          class="flex items-center text-blue-gray-900 antialiased font-sans text-sm font-normal leading-normal cursor-pointer transition-colors duration-300 hover:text-light-blue-500"\n        >\n          <a href="#">\n            <p\n              class="block antialiased font-sans text-sm leading-normal text-blue-900 font-normal opacity-50 transition-all hover:text-blue-500 hover:opacity-100"\n            >\n              {{ Title }}\n            </p>\n          </a>\n          <span\n            class="text-gray-500 text-sm antialiased font-sans font-normal leading-normal mx-2 pointer-events-none select-none"\n            >/</span\n          >\n        </li>\n        <li\n          class="flex items-center text-blue-900 antialiased font-sans text-sm font-normal leading-normal cursor-pointer transition-colors duration-300 hover:text-blue-500"\n        >\n          <p\n            class="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal"\n          >\n            SGIA\n          </p>\n        </li>\n      </ol>\n    </nav>\n    <h6\n      class="block antialiased tracking-normal font-sans text-base font-semibold leading-relaxed text-gray-900"\n    >\n      SGIA\n    </h6>\n  </div>\n\n  <div class="flex items-center gap-4">\n   <div class="flex items-center bg-gray-50 border border-gray-200 rounded-xl p-1.5 pr-4 gap-3 shadow-sm hover:bg-gray-100 transition-all duration-300">\n  \n  <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600 text-white font-bold shadow-md">\n    {{ userName.charAt(0) }}\n  </div>\n\n  <div class="flex flex-col">\n    <div class="flex items-center gap-2">\n      <span class="text-sm font-semibold text-blue-900 leading-none">{{ userName }}</span>\n      @if (userRoles.length > 0) {\n        <span class="bg-blue-100 text-blue-700 text-[9px] font-extrabold px-1.5 py-0.5 rounded uppercase tracking-wider">\n          {{ userRoles[0] }}\n        </span>\n      }\n    </div>\n    <span class="text-[11px] text-gray-500 font-medium">{{ userEmail }}</span>\n    \n    @if (userRoles.length > 1) {\n      <div class="flex gap-1 mt-0.5">\n        @for (role of userRoles.slice(1); track role) {\n          <span class="text-[9px] text-gray-400 italic">+ {{ role }}</span>\n        }\n      </div>\n    }\n  </div>\n</div>\n\n    <div class="flex items-center">\n      <button\n        class="relative middle none font-sans font-medium text-center uppercase transition-all w-10 h-10 rounded-lg text-gray-500 hover:bg-blue-gray-500/10 grid xl:hidden"\n        type="button"\n      >\n        <span\n          class="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2"\n        >\n          <app-hamburger-icon></app-hamburger-icon>\n        </span>\n      </button>\n\n      <button\n        (click)="logout()"\n        class="middle none font-sans font-bold center uppercase transition-all text-xs py-3 rounded-lg text-gray-500 hover:bg-blue-gray-500/10 hidden items-center gap-1 px-4 xl:flex"\n        type="button"\n      >\n        <app-user></app-user> Cerrar sesi\xF3n\n      </button>\n\n      <button\n        (click)="logout()"\n        class="relative middle none font-sans font-medium text-center uppercase transition-all w-10 h-10 rounded-lg text-gray-500 hover:bg-blue-gray-500/10 grid xl:hidden"\n        type="button"\n      >\n        <span\n          class="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2"\n        >\n          <app-user></app-user>\n        </span>\n      </button>\n\n      <button\n        class="relative middle none font-sans font-medium text-center uppercase transition-all w-10 h-10 rounded-lg text-gray-500 hover:bg-blue-gray-500/10"\n        type="button"\n      >\n        <span\n          class="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2"\n        >\n          <app-settings></app-settings>\n        </span>\n      </button>\n\n      <button\n        (click)="notification()"\n        class="relative middle none font-sans font-medium text-center uppercase transition-all w-10 h-10 rounded-lg text-gray-500 hover:bg-blue-gray-500/10"\n        type="button"\n      >\n        <span\n          class="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2"\n        >\n          <app-notification-icon></app-notification-icon>\n        </span>\n      </button>\n    </div>\n  </div>\n</div>\n\n' }]
  }], () => [{ type: AuthService }, { type: ToastrService }, { type: Router }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(Header, { className: "Header", filePath: "src/app/shared/components/header/header.ts", lineNumber: 18 });
})();

// src/app/shared/components/sidebar/sidebar.ts
var import_sweetalert22 = __toESM(require_sweetalert2_all());

// src/app/ui/icons/house/house.component.ts
var HouseComponent = class _HouseComponent {
  size = 0.9;
  color = "#E32C2D";
  static \u0275fac = function HouseComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _HouseComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _HouseComponent, selectors: [["app-house"]], inputs: { size: "size", color: "color" }, decls: 2, vars: 2, consts: [["width", "28", "height", "25", "viewBox", "0 0 28 25", "fill", "none", "xmlns", "http://www.w3.org/2000/svg"], ["d", "M13.6095 0C13.6095 0 5.19065 7.26746 0.485859 11.2033C0.209586 11.4537 0 11.8185 0 12.2485C0 13.0011 0.608344 13.6095 1.36095 13.6095H4.08284V23.1361C4.08284 23.8887 4.69119 24.4971 5.44379 24.4971H9.52663C10.2792 24.4971 10.8876 23.8874 10.8876 23.1361V17.6923H16.3314V23.1361C16.3314 23.8874 16.9397 24.4971 17.6923 24.4971H21.7752C22.5278 24.4971 23.1361 23.8887 23.1361 23.1361V13.6095H25.858C26.6106 13.6095 27.219 13.0011 27.219 12.2485C27.219 11.8185 27.0094 11.4537 26.6977 11.2033C22.0256 7.26746 13.6095 0 13.6095 0Z", "fill", "white"]], template: function HouseComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275namespaceSVG();
      \u0275\u0275domElementStart(0, "svg", 0);
      \u0275\u0275domElement(1, "path", 1);
      \u0275\u0275domElementEnd();
    }
    if (rf & 2) {
      \u0275\u0275attribute("width", 29 * ctx.size)("height", 25 * ctx.size);
    }
  }, encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(HouseComponent, [{
    type: Component,
    args: [{ selector: "app-house", imports: [], template: '<svg\n  width="28"\n  height="25"\n    [attr.width]="29 * size"\n  [attr.height]="25 * size"\n  viewBox="0 0 28 25"\n  fill="none"\n  xmlns="http://www.w3.org/2000/svg"\n>\n  <path\n    d="M13.6095 0C13.6095 0 5.19065 7.26746 0.485859 11.2033C0.209586 11.4537 0 11.8185 0 12.2485C0 13.0011 0.608344 13.6095 1.36095 13.6095H4.08284V23.1361C4.08284 23.8887 4.69119 24.4971 5.44379 24.4971H9.52663C10.2792 24.4971 10.8876 23.8874 10.8876 23.1361V17.6923H16.3314V23.1361C16.3314 23.8874 16.9397 24.4971 17.6923 24.4971H21.7752C22.5278 24.4971 23.1361 23.8887 23.1361 23.1361V13.6095H25.858C26.6106 13.6095 27.219 13.0011 27.219 12.2485C27.219 11.8185 27.0094 11.4537 26.6977 11.2033C22.0256 7.26746 13.6095 0 13.6095 0Z"\n    fill="white"\n  />\n</svg>\n' }]
  }], null, { size: [{
    type: Input
  }], color: [{
    type: Input
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(HouseComponent, { className: "HouseComponent", filePath: "src/app/ui/icons/house/house.component.ts", lineNumber: 9 });
})();

// src/app/ui/icons/carpeta-icon/carpeta-icon.ts
var CarpetaIcon = class _CarpetaIcon {
  size = 1;
  color = colors_default.black;
  static \u0275fac = function CarpetaIcon_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CarpetaIcon)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _CarpetaIcon, selectors: [["app-carpeta-icon"]], inputs: { size: "size", color: "color" }, decls: 4, vars: 2, consts: [["viewBox", "0 0 35 30", "fill", "none", "xmlns", "http://www.w3.org/2000/svg", "aria-hidden", "true"], ["d", "M1.99286 11.2153L1.82781 2.45023C1.88282 2.29086 2.31685 1.99206 2.64083 1.99206H10.1294C10.2211 1.99206 10.3128 2.0319 10.3862 2.0983L12.2018 3.85795C12.6052 4.24972 13.1309 4.46222 13.675 4.46222H28.646C28.8599 4.46222 29.0372 4.65478 29.0372 4.88719V5.777H30.8711V4.88719C30.8711 3.55252 29.8747 2.47016 28.646 2.47016H13.675C13.5833 2.47016 13.4916 2.43696 13.4182 2.36391L11.6027 0.610899C11.1931 0.219125 10.6735 0 10.1294 0H2.64083C1.41822 0 0 1.0558 0 2.43697L0.2812 17.7823C0.2812 17.7624 2.00354 11.2353 1.99286 11.2153Z", "fill", "currentColor"], ["d", "M33.6757 8.95776C33.2602 8.35496 32.628 8.00391 31.9357 8.00391H6.7809C5.79349 8.00391 4.94457 8.71268 4.6676 9.75924C4.6676 9.78574 0.898602 24.5108 0.898602 24.5108C0.823343 24.8404 0.782702 25.1484 0.838394 25.4647C0.982893 26.657 1.89204 27.5645 2.99987 27.5645H20.5443C20.2343 26.5013 20.4044 24.7228 20.3637 23.5901V20.9074C20.3637 19.3839 21.2187 18.079 22.4289 17.5358C22.3807 14.9111 23.9853 12.6538 26.1738 11.9785C29.0246 11.018 32.2459 13.2718 32.64 16.5425L34.0369 11.0645C34.2235 10.3358 34.0971 9.5672 33.6757 8.95776Z", "fill", "currentColor"], ["d", "M33.0443 19.8014C32.6286 19.0802 31.8844 18.9786 31.1403 19.0303C31.1086 18.3005 31.2244 16.8357 31.0197 16.1386C29.8901 11.882 24.1879 12.6944 24.1148 17.13V19.0303H23.5246C22.644 19.032 21.9363 19.8117 21.938 20.7515V23.5398C21.9395 23.989 21.9364 25.8256 21.938 26.2456C21.9205 27.922 23.2469 29.3627 24.7938 29.3437H30.4551C32.029 29.3437 33.311 27.953 33.311 26.2456V20.7513C33.3142 20.4122 33.214 20.0768 33.0443 19.8014ZM26.5138 24.0218C26.5423 22.44 28.7113 22.4365 28.7351 24.0218C28.7033 25.6088 26.5519 25.6018 26.5138 24.0218ZM26.0187 17.1298C26.0711 14.8165 29.1777 14.8338 29.2364 17.1298V19.0301H26.0187V17.1298Z", "fill", "currentColor"]], template: function CarpetaIcon_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275namespaceSVG();
      \u0275\u0275domElementStart(0, "svg", 0);
      \u0275\u0275domElement(1, "path", 1)(2, "path", 2)(3, "path", 3);
      \u0275\u0275domElementEnd();
    }
    if (rf & 2) {
      \u0275\u0275attribute("width", 20 * ctx.size)("height", 22 * ctx.size);
    }
  }, encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CarpetaIcon, [{
    type: Component,
    args: [{ selector: "app-carpeta-icon", imports: [], template: '<svg\n  [attr.width]="20 * size"\n  [attr.height]="22 * size"\n  viewBox="0 0 35 30"\n  fill="none"\n  xmlns="http://www.w3.org/2000/svg"\n  aria-hidden="true"\n>\n  <path\n    d="M1.99286 11.2153L1.82781 2.45023C1.88282 2.29086 2.31685 1.99206 2.64083 1.99206H10.1294C10.2211 1.99206 10.3128 2.0319 10.3862 2.0983L12.2018 3.85795C12.6052 4.24972 13.1309 4.46222 13.675 4.46222H28.646C28.8599 4.46222 29.0372 4.65478 29.0372 4.88719V5.777H30.8711V4.88719C30.8711 3.55252 29.8747 2.47016 28.646 2.47016H13.675C13.5833 2.47016 13.4916 2.43696 13.4182 2.36391L11.6027 0.610899C11.1931 0.219125 10.6735 0 10.1294 0H2.64083C1.41822 0 0 1.0558 0 2.43697L0.2812 17.7823C0.2812 17.7624 2.00354 11.2353 1.99286 11.2153Z"\n    fill="currentColor"\n  />\n  <path\n    d="M33.6757 8.95776C33.2602 8.35496 32.628 8.00391 31.9357 8.00391H6.7809C5.79349 8.00391 4.94457 8.71268 4.6676 9.75924C4.6676 9.78574 0.898602 24.5108 0.898602 24.5108C0.823343 24.8404 0.782702 25.1484 0.838394 25.4647C0.982893 26.657 1.89204 27.5645 2.99987 27.5645H20.5443C20.2343 26.5013 20.4044 24.7228 20.3637 23.5901V20.9074C20.3637 19.3839 21.2187 18.079 22.4289 17.5358C22.3807 14.9111 23.9853 12.6538 26.1738 11.9785C29.0246 11.018 32.2459 13.2718 32.64 16.5425L34.0369 11.0645C34.2235 10.3358 34.0971 9.5672 33.6757 8.95776Z"\n    fill="currentColor"\n  />\n  <path\n    d="M33.0443 19.8014C32.6286 19.0802 31.8844 18.9786 31.1403 19.0303C31.1086 18.3005 31.2244 16.8357 31.0197 16.1386C29.8901 11.882 24.1879 12.6944 24.1148 17.13V19.0303H23.5246C22.644 19.032 21.9363 19.8117 21.938 20.7515V23.5398C21.9395 23.989 21.9364 25.8256 21.938 26.2456C21.9205 27.922 23.2469 29.3627 24.7938 29.3437H30.4551C32.029 29.3437 33.311 27.953 33.311 26.2456V20.7513C33.3142 20.4122 33.214 20.0768 33.0443 19.8014ZM26.5138 24.0218C26.5423 22.44 28.7113 22.4365 28.7351 24.0218C28.7033 25.6088 26.5519 25.6018 26.5138 24.0218ZM26.0187 17.1298C26.0711 14.8165 29.1777 14.8338 29.2364 17.1298V19.0301H26.0187V17.1298Z"\n    fill="currentColor"\n  />\n</svg>\n' }]
  }], null, { size: [{
    type: Input
  }], color: [{
    type: Input
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(CarpetaIcon, { className: "CarpetaIcon", filePath: "src/app/ui/icons/carpeta-icon/carpeta-icon.ts", lineNumber: 10 });
})();

// src/app/ui/icons/lista-solicitudes-icon/lista-solicitudes-icon.ts
var ListaSolicitudesIcon = class _ListaSolicitudesIcon {
  size = 1;
  color = colors_default.white;
  static \u0275fac = function ListaSolicitudesIcon_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ListaSolicitudesIcon)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ListaSolicitudesIcon, selectors: [["app-lista-solicitudes-icon"]], inputs: { size: "size", color: "color" }, decls: 2, vars: 3, consts: [["viewBox", "0 0 30 30", "xmlns", "http://www.w3.org/2000/svg"], ["d", "M29.9994 17.8845V27.0893C29.9994 28.6931 28.6927 29.9998 27.0889 29.9998H2.91053C1.30669 29.9998 0 28.6931 0 27.0893V17.8845C0 17.8614 0.00576915 17.8412 0.00576915 17.821C0.00865391 17.7806 0.0115383 17.7402 0.0173074 17.6999C0.0230766 17.6595 0.0346151 17.622 0.043269 17.5816C0.0490377 17.5614 0.0490376 17.5383 0.0576915 17.5181L4.09628 5.40311C4.25493 4.93293 4.69627 4.61562 5.19244 4.61562H8.07701C8.71451 4.61562 9.23084 5.13195 9.23084 5.76945C9.23084 6.40696 8.71451 6.92328 8.07701 6.92328H6.02319L2.75496 16.7306H8.03082C8.88465 16.7306 9.64042 17.2412 9.95482 18.0345L10.5894 19.6152H19.4106L20.0423 18.0345C20.3596 17.2412 21.1154 16.7306 21.9663 16.7306H27.2422L23.9768 6.92328H21.923C21.2855 6.92328 20.7692 6.40696 20.7692 5.76945C20.7692 5.13195 21.2855 4.61562 21.923 4.61562H24.8076C25.3037 4.61562 25.7451 4.93293 25.9008 5.40599L29.9394 17.521C29.9452 17.5412 29.9481 17.5614 29.9538 17.5845C29.9654 17.622 29.974 17.6624 29.9798 17.7027C29.9856 17.7431 29.9884 17.7835 29.9913 17.8239C29.9942 17.8412 30 17.8614 30 17.8845L29.9994 17.8845ZM9.56796 11.2008L14.1833 15.8161C14.2381 15.8709 14.2958 15.917 14.3592 15.9603C14.3881 15.9805 14.4198 15.992 14.4487 16.0093C14.4862 16.0295 14.5208 16.0497 14.5583 16.067C14.5958 16.0815 14.6362 16.093 14.6765 16.1045C14.7083 16.1132 14.74 16.1276 14.7746 16.1334C14.8496 16.1449 14.9246 16.1536 14.9996 16.1536C15.0746 16.1536 15.1496 16.1449 15.2246 16.1305C15.2592 16.1247 15.291 16.1103 15.3227 16.1016C15.3631 16.0901 15.4006 16.0814 15.441 16.0641C15.4785 16.0468 15.5131 16.0266 15.5506 16.0065C15.5794 15.9891 15.6111 15.9776 15.64 15.9574C15.7035 15.9141 15.764 15.868 15.816 15.8132L20.4313 11.1979C20.8813 10.7479 20.8813 10.0181 20.4313 9.56519C19.9813 9.11518 19.2486 9.11518 18.7986 9.56519L16.1534 12.2132V1.15383C16.1534 0.516325 15.6371 0 14.9996 0C14.3621 0 13.8458 0.516325 13.8458 1.15383V12.2132L11.2006 9.56807C10.7506 9.11806 10.0179 9.11806 9.56792 9.56807C9.1179 10.0181 9.11795 10.7507 9.56796 11.2008Z"]], template: function ListaSolicitudesIcon_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275namespaceSVG();
      \u0275\u0275domElementStart(0, "svg", 0);
      \u0275\u0275domElement(1, "path", 1);
      \u0275\u0275domElementEnd();
    }
    if (rf & 2) {
      \u0275\u0275attribute("width", 25 * ctx.size)("height", 25 * ctx.size);
      \u0275\u0275advance();
      \u0275\u0275attribute("fill", ctx.color);
    }
  }, encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ListaSolicitudesIcon, [{
    type: Component,
    args: [{ selector: "app-lista-solicitudes-icon", imports: [], template: '<svg\n  [attr.width]="25 * size"\n  [attr.height]="25 * size"\n  viewBox="0 0 30 30"\n\n  xmlns="http://www.w3.org/2000/svg"\n>\n  <path\n    d="M29.9994 17.8845V27.0893C29.9994 28.6931 28.6927 29.9998 27.0889 29.9998H2.91053C1.30669 29.9998 0 28.6931 0 27.0893V17.8845C0 17.8614 0.00576915 17.8412 0.00576915 17.821C0.00865391 17.7806 0.0115383 17.7402 0.0173074 17.6999C0.0230766 17.6595 0.0346151 17.622 0.043269 17.5816C0.0490377 17.5614 0.0490376 17.5383 0.0576915 17.5181L4.09628 5.40311C4.25493 4.93293 4.69627 4.61562 5.19244 4.61562H8.07701C8.71451 4.61562 9.23084 5.13195 9.23084 5.76945C9.23084 6.40696 8.71451 6.92328 8.07701 6.92328H6.02319L2.75496 16.7306H8.03082C8.88465 16.7306 9.64042 17.2412 9.95482 18.0345L10.5894 19.6152H19.4106L20.0423 18.0345C20.3596 17.2412 21.1154 16.7306 21.9663 16.7306H27.2422L23.9768 6.92328H21.923C21.2855 6.92328 20.7692 6.40696 20.7692 5.76945C20.7692 5.13195 21.2855 4.61562 21.923 4.61562H24.8076C25.3037 4.61562 25.7451 4.93293 25.9008 5.40599L29.9394 17.521C29.9452 17.5412 29.9481 17.5614 29.9538 17.5845C29.9654 17.622 29.974 17.6624 29.9798 17.7027C29.9856 17.7431 29.9884 17.7835 29.9913 17.8239C29.9942 17.8412 30 17.8614 30 17.8845L29.9994 17.8845ZM9.56796 11.2008L14.1833 15.8161C14.2381 15.8709 14.2958 15.917 14.3592 15.9603C14.3881 15.9805 14.4198 15.992 14.4487 16.0093C14.4862 16.0295 14.5208 16.0497 14.5583 16.067C14.5958 16.0815 14.6362 16.093 14.6765 16.1045C14.7083 16.1132 14.74 16.1276 14.7746 16.1334C14.8496 16.1449 14.9246 16.1536 14.9996 16.1536C15.0746 16.1536 15.1496 16.1449 15.2246 16.1305C15.2592 16.1247 15.291 16.1103 15.3227 16.1016C15.3631 16.0901 15.4006 16.0814 15.441 16.0641C15.4785 16.0468 15.5131 16.0266 15.5506 16.0065C15.5794 15.9891 15.6111 15.9776 15.64 15.9574C15.7035 15.9141 15.764 15.868 15.816 15.8132L20.4313 11.1979C20.8813 10.7479 20.8813 10.0181 20.4313 9.56519C19.9813 9.11518 19.2486 9.11518 18.7986 9.56519L16.1534 12.2132V1.15383C16.1534 0.516325 15.6371 0 14.9996 0C14.3621 0 13.8458 0.516325 13.8458 1.15383V12.2132L11.2006 9.56807C10.7506 9.11806 10.0179 9.11806 9.56792 9.56807C9.1179 10.0181 9.11795 10.7507 9.56796 11.2008Z"\n    [attr.fill]="color"\n  />\n</svg>\n' }]
  }], null, { size: [{
    type: Input
  }], color: [{
    type: Input
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ListaSolicitudesIcon, { className: "ListaSolicitudesIcon", filePath: "src/app/ui/icons/lista-solicitudes-icon/lista-solicitudes-icon.ts", lineNumber: 10 });
})();

// src/app/ui/icons/car-icon/car-icon.ts
var CarIcon = class _CarIcon {
  size = 1;
  color = "#ffffff";
  static \u0275fac = function CarIcon_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CarIcon)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _CarIcon, selectors: [["app-car-icon"]], inputs: { size: "size", color: "color" }, decls: 2, vars: 2, consts: [["viewBox", "0 0 29 26", "fill", "none", "xmlns", "http://www.w3.org/2000/svg"], ["d", "M5.11889 24.911C5.11889 25.288 4.81347 25.5934 4.43639 25.5934H1.70641C1.32933 25.5934 1.02391 25.288 1.02391 24.911V22.5222H5.11889V24.911ZM27.641 24.911C27.641 25.288 27.3356 25.5934 26.9585 25.5934H24.2285C23.8515 25.5934 23.546 25.288 23.546 24.911V22.5222H27.641V24.911ZM4.4685 10.5788C4.49068 10.6402 4.51798 10.7016 4.55381 10.7613L4.59646 10.8262L7.47832 14.9297C8.11644 15.8391 9.15899 16.38 10.2714 16.38H18.3932C19.4698 16.38 20.4816 15.8715 21.1249 15.0133L21.1863 14.9297L24.0682 10.8262C24.1245 10.746 24.1672 10.6641 24.1962 10.5788H26.6173C27.7485 10.5788 28.6648 11.495 28.6648 12.6263V20.4751C28.6648 20.8521 28.3594 21.1576 27.9823 21.1576H0.682495C0.305417 21.1576 0 20.8521 0 20.4751V12.6263C0 11.495 0.916269 10.5788 2.04749 10.5788L4.4685 10.5788ZM3.41232 13.9912C2.65815 13.9912 2.04733 14.6021 2.04733 15.3562C2.04733 16.1104 2.65815 16.7212 3.41232 16.7212C4.1665 16.7212 4.77731 16.1104 4.77731 15.3562C4.77731 14.6021 4.1665 13.9912 3.41232 13.9912ZM25.2522 13.65C24.498 13.65 23.8872 14.2608 23.8872 15.015C23.8872 15.7692 24.498 16.38 25.2522 16.38C26.0063 16.38 26.6172 15.7692 26.6172 15.015C26.6172 14.2608 26.0063 13.65 25.2522 13.65ZM20.0687 14.1448C19.6865 14.6908 19.0603 15.015 18.3932 15.015H10.2714C9.60427 15.015 8.97808 14.6908 8.59588 14.1448L6.09111 10.5787H22.5732L20.0687 14.1448ZM20.8126 0C21.7527 0 22.5717 0.638117 22.7987 1.54928L23.9504 6.14263H25.5935C26.1583 6.14263 26.6173 6.60162 26.6173 7.1664C26.6173 7.73118 26.1583 8.19016 25.5935 8.19016H24.4623L24.7199 9.21393H3.94497L4.20261 8.19016H2.73012C2.16534 8.19016 1.70636 7.73118 1.70636 7.1664C1.70636 6.60162 2.16534 6.14263 2.73012 6.14263H4.71449L5.8662 1.54928C6.09312 0.63816 6.91211 0 7.85227 0H20.8126Z", "fill", "white"]], template: function CarIcon_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275namespaceSVG();
      \u0275\u0275domElementStart(0, "svg", 0);
      \u0275\u0275domElement(1, "path", 1);
      \u0275\u0275domElementEnd();
    }
    if (rf & 2) {
      \u0275\u0275attribute("width", 25 * ctx.size)("height", 25 * ctx.size);
    }
  }, encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CarIcon, [{
    type: Component,
    args: [{ selector: "app-car-icon", imports: [], template: '<svg\n  [attr.width]="25 * size"\n  [attr.height]="25 * size"\n  viewBox="0 0 29 26"\n  fill="none"\n  xmlns="http://www.w3.org/2000/svg"\n>\n  <path\n    d="M5.11889 24.911C5.11889 25.288 4.81347 25.5934 4.43639 25.5934H1.70641C1.32933 25.5934 1.02391 25.288 1.02391 24.911V22.5222H5.11889V24.911ZM27.641 24.911C27.641 25.288 27.3356 25.5934 26.9585 25.5934H24.2285C23.8515 25.5934 23.546 25.288 23.546 24.911V22.5222H27.641V24.911ZM4.4685 10.5788C4.49068 10.6402 4.51798 10.7016 4.55381 10.7613L4.59646 10.8262L7.47832 14.9297C8.11644 15.8391 9.15899 16.38 10.2714 16.38H18.3932C19.4698 16.38 20.4816 15.8715 21.1249 15.0133L21.1863 14.9297L24.0682 10.8262C24.1245 10.746 24.1672 10.6641 24.1962 10.5788H26.6173C27.7485 10.5788 28.6648 11.495 28.6648 12.6263V20.4751C28.6648 20.8521 28.3594 21.1576 27.9823 21.1576H0.682495C0.305417 21.1576 0 20.8521 0 20.4751V12.6263C0 11.495 0.916269 10.5788 2.04749 10.5788L4.4685 10.5788ZM3.41232 13.9912C2.65815 13.9912 2.04733 14.6021 2.04733 15.3562C2.04733 16.1104 2.65815 16.7212 3.41232 16.7212C4.1665 16.7212 4.77731 16.1104 4.77731 15.3562C4.77731 14.6021 4.1665 13.9912 3.41232 13.9912ZM25.2522 13.65C24.498 13.65 23.8872 14.2608 23.8872 15.015C23.8872 15.7692 24.498 16.38 25.2522 16.38C26.0063 16.38 26.6172 15.7692 26.6172 15.015C26.6172 14.2608 26.0063 13.65 25.2522 13.65ZM20.0687 14.1448C19.6865 14.6908 19.0603 15.015 18.3932 15.015H10.2714C9.60427 15.015 8.97808 14.6908 8.59588 14.1448L6.09111 10.5787H22.5732L20.0687 14.1448ZM20.8126 0C21.7527 0 22.5717 0.638117 22.7987 1.54928L23.9504 6.14263H25.5935C26.1583 6.14263 26.6173 6.60162 26.6173 7.1664C26.6173 7.73118 26.1583 8.19016 25.5935 8.19016H24.4623L24.7199 9.21393H3.94497L4.20261 8.19016H2.73012C2.16534 8.19016 1.70636 7.73118 1.70636 7.1664C1.70636 6.60162 2.16534 6.14263 2.73012 6.14263H4.71449L5.8662 1.54928C6.09312 0.63816 6.91211 0 7.85227 0H20.8126Z"\n    fill="white"\n  />\n</svg>\n' }]
  }], null, { size: [{
    type: Input
  }], color: [{
    type: Input
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(CarIcon, { className: "CarIcon", filePath: "src/app/ui/icons/car-icon/car-icon.ts", lineNumber: 9 });
})();

// src/app/ui/icons/horarios-laborales-icon/horarios-laborales-icon.ts
var HorariosLaboralesIcon = class _HorariosLaboralesIcon {
  size = 1;
  color = colors_default.white;
  static \u0275fac = function HorariosLaboralesIcon_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _HorariosLaboralesIcon)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _HorariosLaboralesIcon, selectors: [["app-horarios-laborales-icon"]], inputs: { size: "size", color: "color" }, decls: 3, vars: 4, consts: [["viewBox", "0 0 28 24", "fill", "none", "xmlns", "http://www.w3.org/2000/svg"], ["d", "M15.5094 0V2.63984C20.6041 2.63984 24.749 6.7851 24.749 11.8794C24.749 16.9738 20.6041 21.119 15.5094 21.119C10.4147 21.119 6.26982 16.9734 6.26982 11.8794H9.89981L4.95008 5.27967L0 11.8794H3.62999C3.62999 18.43 8.95922 23.7589 15.5094 23.7589C22.0596 23.7589 27.3889 18.43 27.3889 11.8794C27.3889 5.32889 22.0596 0 15.5094 0Z"], ["d", "M19.9357 15.3723L16.1693 11.6058V5.2793H14.8495V12.1523L19.0026 16.3054L19.9357 15.3723Z"]], template: function HorariosLaboralesIcon_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275namespaceSVG();
      \u0275\u0275domElementStart(0, "svg", 0);
      \u0275\u0275domElement(1, "path", 1)(2, "path", 2);
      \u0275\u0275domElementEnd();
    }
    if (rf & 2) {
      \u0275\u0275attribute("width", 30 * ctx.size)("height", 30 * ctx.size);
      \u0275\u0275advance();
      \u0275\u0275attribute("fill", ctx.color);
      \u0275\u0275advance();
      \u0275\u0275attribute("fill", ctx.color);
    }
  }, encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(HorariosLaboralesIcon, [{
    type: Component,
    args: [{ selector: "app-horarios-laborales-icon", imports: [], template: '<svg\n  [attr.width]="30 * size"\n  [attr.height]="30 * size"\n  viewBox="0 0 28 24"\n  fill="none"\n  xmlns="http://www.w3.org/2000/svg"\n>\n  <path\n    d="M15.5094 0V2.63984C20.6041 2.63984 24.749 6.7851 24.749 11.8794C24.749 16.9738 20.6041 21.119 15.5094 21.119C10.4147 21.119 6.26982 16.9734 6.26982 11.8794H9.89981L4.95008 5.27967L0 11.8794H3.62999C3.62999 18.43 8.95922 23.7589 15.5094 23.7589C22.0596 23.7589 27.3889 18.43 27.3889 11.8794C27.3889 5.32889 22.0596 0 15.5094 0Z"\n    [attr.fill]="color"\n  />\n  <path\n    d="M19.9357 15.3723L16.1693 11.6058V5.2793H14.8495V12.1523L19.0026 16.3054L19.9357 15.3723Z"\n    [attr.fill]="color"\n  />\n</svg>\n' }]
  }], null, { size: [{
    type: Input
  }], color: [{
    type: Input
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(HorariosLaboralesIcon, { className: "HorariosLaboralesIcon", filePath: "src/app/ui/icons/horarios-laborales-icon/horarios-laborales-icon.ts", lineNumber: 10 });
})();

// src/app/ui/icons/por-contraloria-icon/por-contraloria-icon.ts
var PorContraloriaIcon = class _PorContraloriaIcon {
  size = 1;
  color = colors_default.white;
  static \u0275fac = function PorContraloriaIcon_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _PorContraloriaIcon)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _PorContraloriaIcon, selectors: [["app-por-contraloria-icon"]], inputs: { size: "size", color: "color" }, decls: 11, vars: 12, consts: [["viewBox", "0 0 29 23", "fill", "none", "xmlns", "http://www.w3.org/2000/svg"], ["d", "M0 2.75195H8.76696V22.0999H6.08347L6.08381 20.1473L2.66471 20.149L2.65766 22.0999H0V2.75195ZM0.831546 18.6989H7.93575V17.3387H0.831546V18.6989ZM0.831546 15.4794H7.93575V14.1189H0.831546V15.4794ZM0.831546 12.2596H7.93575V10.8994H0.831546V12.2596ZM0.831546 9.04004H7.93575V7.67985H0.831546V9.04004ZM0.831546 5.82086H7.93575V4.45999H0.831546V5.82086Z"], ["d", "M11.9412 18.7754H10.2784V22.2059H11.9412V18.7754Z"], ["d", "M11.9415 15.5234H10.2788V17.0346H11.9415V15.5234Z"], ["d", "M11.9415 12.5H10.2788V14.0111H11.9415V12.5Z"], ["d", "M14.889 18.7754H13.2262V22.2059H14.889V18.7754Z"], ["d", "M14.889 15.5234H13.2262V17.0346H14.889V15.5234Z"], ["d", "M17.8368 18.7754H16.1741V22.2059H17.8368V18.7754Z"], ["d", "M17.8368 15.5234H16.1741V17.0346H17.8368V15.5234Z"], ["d", "M28.1139 14.8649L23.2192 9.96983C24.5234 7.53121 24.1501 4.42507 22.0959 2.3712C20.8782 1.1539 19.2114 0.484034 17.49 0.484034C16.4471 0.484034 15.5002 0.733599 14.4939 1.19818V0H6.44339V1.00631H13.4876V1.88985C13.4876 2.04012 13.1353 2.24843 12.9629 2.42084C11.9013 3.4825 11.2743 4.69611 11.1264 6.37329H10.1332V7.71503H11.1566C11.2368 8.38591 11.4008 9.05678 11.6457 9.39221H10.1332V11.0694H11.8104V10.1171C12.1458 10.6109 12.5024 11.0278 12.9156 11.4407C13.3171 11.8422 13.831 12.0757 14.309 12.4111H13.1521V14.0883H14.8293V12.7999C15.1647 12.9861 15.8356 13.13 16.171 13.2256V14.0883H17.8482V13.3644C18.8545 13.3202 19.7488 13.0636 20.5881 12.6124L25.4774 17.5044C25.842 17.869 26.318 18.0512 26.7956 18.0512C27.273 18.0512 27.75 17.869 28.1146 17.5044C28.8435 16.7758 28.8428 15.5934 28.1139 14.8649ZM21.1536 10.5434C20.1879 11.5088 18.9038 12.0405 17.5386 12.0405C16.1734 12.0405 14.8897 11.5088 13.9243 10.5434C12.9586 9.57771 12.4269 8.29366 12.4269 6.92843C12.4269 5.56287 12.9586 4.27949 13.9243 3.31377C14.8897 2.34839 16.1734 1.81706 17.5386 1.81706C18.9038 1.81706 20.1879 2.34872 21.1536 3.31377C23.1464 5.30694 23.1464 8.55027 21.1536 10.5434Z"], ["d", "M13.3795 8.10531C13.2568 8.10531 13.1464 8.02011 13.1192 7.89566C12.7895 6.38217 13.2464 4.82542 14.3406 3.73122C15.1939 2.87687 16.3297 2.40625 17.5386 2.40625C17.6859 2.40625 17.8053 2.52533 17.8053 2.67292C17.8053 2.82051 17.6862 2.93959 17.5386 2.93959C16.4726 2.93959 15.4707 3.35453 14.7179 4.10825C13.7522 5.0733 13.3494 6.44692 13.6405 7.78195C13.6717 7.92619 13.5808 8.06808 13.4369 8.09927C13.4174 8.1033 13.398 8.10531 13.3795 8.10531Z"]], template: function PorContraloriaIcon_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275namespaceSVG();
      \u0275\u0275domElementStart(0, "svg", 0);
      \u0275\u0275domElement(1, "path", 1)(2, "path", 2)(3, "path", 3)(4, "path", 4)(5, "path", 5)(6, "path", 6)(7, "path", 7)(8, "path", 8)(9, "path", 9)(10, "path", 10);
      \u0275\u0275domElementEnd();
    }
    if (rf & 2) {
      \u0275\u0275attribute("width", 30 * ctx.size)("height", 30 * ctx.size);
      \u0275\u0275advance();
      \u0275\u0275attribute("fill", ctx.color);
      \u0275\u0275advance();
      \u0275\u0275attribute("fill", ctx.color);
      \u0275\u0275advance();
      \u0275\u0275attribute("fill", ctx.color);
      \u0275\u0275advance();
      \u0275\u0275attribute("fill", ctx.color);
      \u0275\u0275advance();
      \u0275\u0275attribute("fill", ctx.color);
      \u0275\u0275advance();
      \u0275\u0275attribute("fill", ctx.color);
      \u0275\u0275advance();
      \u0275\u0275attribute("fill", ctx.color);
      \u0275\u0275advance();
      \u0275\u0275attribute("fill", ctx.color);
      \u0275\u0275advance();
      \u0275\u0275attribute("fill", ctx.color);
      \u0275\u0275advance();
      \u0275\u0275attribute("fill", ctx.color);
    }
  }, encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PorContraloriaIcon, [{
    type: Component,
    args: [{ selector: "app-por-contraloria-icon", imports: [], template: '<svg\n  [attr.width]="30 * size"\n  [attr.height]="30 * size"\n  viewBox="0 0 29 23"\n  fill="none"\n  xmlns="http://www.w3.org/2000/svg"\n>\n  <path\n    d="M0 2.75195H8.76696V22.0999H6.08347L6.08381 20.1473L2.66471 20.149L2.65766 22.0999H0V2.75195ZM0.831546 18.6989H7.93575V17.3387H0.831546V18.6989ZM0.831546 15.4794H7.93575V14.1189H0.831546V15.4794ZM0.831546 12.2596H7.93575V10.8994H0.831546V12.2596ZM0.831546 9.04004H7.93575V7.67985H0.831546V9.04004ZM0.831546 5.82086H7.93575V4.45999H0.831546V5.82086Z"\n    [attr.fill]="color"\n  />\n  <path d="M11.9412 18.7754H10.2784V22.2059H11.9412V18.7754Z" [attr.fill]="color" />\n  <path d="M11.9415 15.5234H10.2788V17.0346H11.9415V15.5234Z" [attr.fill]="color" />\n  <path d="M11.9415 12.5H10.2788V14.0111H11.9415V12.5Z" [attr.fill]="color" />\n  <path d="M14.889 18.7754H13.2262V22.2059H14.889V18.7754Z" [attr.fill]="color" />\n  <path d="M14.889 15.5234H13.2262V17.0346H14.889V15.5234Z" [attr.fill]="color" />\n  <path d="M17.8368 18.7754H16.1741V22.2059H17.8368V18.7754Z" [attr.fill]="color" />\n  <path d="M17.8368 15.5234H16.1741V17.0346H17.8368V15.5234Z" [attr.fill]="color" />\n  <path\n    d="M28.1139 14.8649L23.2192 9.96983C24.5234 7.53121 24.1501 4.42507 22.0959 2.3712C20.8782 1.1539 19.2114 0.484034 17.49 0.484034C16.4471 0.484034 15.5002 0.733599 14.4939 1.19818V0H6.44339V1.00631H13.4876V1.88985C13.4876 2.04012 13.1353 2.24843 12.9629 2.42084C11.9013 3.4825 11.2743 4.69611 11.1264 6.37329H10.1332V7.71503H11.1566C11.2368 8.38591 11.4008 9.05678 11.6457 9.39221H10.1332V11.0694H11.8104V10.1171C12.1458 10.6109 12.5024 11.0278 12.9156 11.4407C13.3171 11.8422 13.831 12.0757 14.309 12.4111H13.1521V14.0883H14.8293V12.7999C15.1647 12.9861 15.8356 13.13 16.171 13.2256V14.0883H17.8482V13.3644C18.8545 13.3202 19.7488 13.0636 20.5881 12.6124L25.4774 17.5044C25.842 17.869 26.318 18.0512 26.7956 18.0512C27.273 18.0512 27.75 17.869 28.1146 17.5044C28.8435 16.7758 28.8428 15.5934 28.1139 14.8649ZM21.1536 10.5434C20.1879 11.5088 18.9038 12.0405 17.5386 12.0405C16.1734 12.0405 14.8897 11.5088 13.9243 10.5434C12.9586 9.57771 12.4269 8.29366 12.4269 6.92843C12.4269 5.56287 12.9586 4.27949 13.9243 3.31377C14.8897 2.34839 16.1734 1.81706 17.5386 1.81706C18.9038 1.81706 20.1879 2.34872 21.1536 3.31377C23.1464 5.30694 23.1464 8.55027 21.1536 10.5434Z"\n    [attr.fill]="color"\n  />\n  <path\n    d="M13.3795 8.10531C13.2568 8.10531 13.1464 8.02011 13.1192 7.89566C12.7895 6.38217 13.2464 4.82542 14.3406 3.73122C15.1939 2.87687 16.3297 2.40625 17.5386 2.40625C17.6859 2.40625 17.8053 2.52533 17.8053 2.67292C17.8053 2.82051 17.6862 2.93959 17.5386 2.93959C16.4726 2.93959 15.4707 3.35453 14.7179 4.10825C13.7522 5.0733 13.3494 6.44692 13.6405 7.78195C13.6717 7.92619 13.5808 8.06808 13.4369 8.09927C13.4174 8.1033 13.398 8.10531 13.3795 8.10531Z"\n    [attr.fill]="color"\n  />\n</svg>\n' }]
  }], null, { size: [{
    type: Input
  }], color: [{
    type: Input
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(PorContraloriaIcon, { className: "PorContraloriaIcon", filePath: "src/app/ui/icons/por-contraloria-icon/por-contraloria-icon.ts", lineNumber: 10 });
})();

// src/app/ui/icons/operaciones-campo-icon/operaciones-campo-icon.ts
var OperacionesCampoIcon = class _OperacionesCampoIcon {
  size = 1;
  color = colors_default.white;
  static \u0275fac = function OperacionesCampoIcon_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _OperacionesCampoIcon)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _OperacionesCampoIcon, selectors: [["app-operaciones-campo-icon"]], inputs: { size: "size", color: "color" }, decls: 2, vars: 2, consts: [["viewBox", "0 0 28 28", "fill", "none", "xmlns", "http://www.w3.org/2000/svg"], ["fill-rule", "evenodd", "clip-rule", "evenodd", "d", "M8.18012 14.5005L4.08628 20.2044C6.5871 21.7003 8.85205 21.9883 11.6932 21.4622C14.1308 21.0101 16.3644 20.1789 18.8518 20.0441L14.8696 14.5006V8.7661H15.6121C15.7773 8.7661 15.911 8.63243 15.911 8.46717V6.56664C15.911 6.40138 15.7773 6.26771 15.6121 6.26771H7.43903C7.27377 6.26771 7.1401 6.40138 7.13888 6.56664V8.46717C7.1401 8.63243 7.27377 8.7661 7.43903 8.7661H8.18149L8.18012 14.5005ZM7.11805 0C7.80704 0 8.4292 0.415574 8.69291 1.05233C8.9566 1.68908 8.81078 2.4218 8.3235 2.90911C7.83622 3.3976 7.10225 3.54344 6.4655 3.27852C5.82874 3.01483 5.41317 2.39387 5.41317 1.70367C5.41439 0.763146 6.17629 0 7.11805 0ZM11.5255 4.5082C11.1318 4.5082 10.7757 4.27124 10.625 3.90669C10.4744 3.54335 10.5582 3.12413 10.8365 2.84584C11.1147 2.56635 11.534 2.48371 11.8973 2.6344C12.2619 2.78508 12.4988 3.13991 12.4988 3.53483C12.4988 4.07194 12.0626 4.5082 11.5255 4.5082ZM28.0078 0.471289V2.27945C28.0066 2.53706 27.7988 2.74607 27.5412 2.74607H26.7124V6.23361H23.9638C23.7001 6.2409 23.4886 6.4572 23.4886 6.72089C23.4886 6.98579 23.7001 7.2021 23.9638 7.20817H26.7112V9.59233L25.3381 9.59354C25.0744 9.59962 24.863 9.81592 24.863 10.0796C24.863 10.3445 25.0744 10.5608 25.3381 10.5669H26.7112V12.9523H23.9638C23.6952 12.9523 23.4765 13.1698 23.4765 13.4383C23.4765 13.7081 23.6952 13.9256 23.9638 13.9256H26.7112V16.311H25.3381C25.0744 16.3171 24.863 16.5334 24.863 16.7983C24.863 17.062 25.0744 17.2783 25.3381 17.2843H26.7112L26.7124 19.6697H23.9638C23.7001 19.6758 23.4886 19.8921 23.4886 20.157C23.4886 20.4207 23.7001 20.637 23.9638 20.643H26.7112V24.1281C26.6954 25.6337 25.4705 26.8464 23.9638 26.8464C22.4582 26.8464 21.2321 25.6337 21.2163 24.1281V2.74744H20.3887C20.1311 2.74623 19.9221 2.53844 19.9221 2.28082V0.471446C19.9221 0.213833 20.1311 0.00603679 20.3887 0.00482357H27.5411C27.7987 0.00603865 28.0066 0.213676 28.0078 0.471289ZM3.51511 20.9977C9.77189 24.7879 14.1952 20.9977 19.5358 20.9977L20.243 21.9832V24.1268C20.2467 25.636 21.1593 26.9946 22.5543 27.5692C22.2505 27.8511 21.8483 28.0054 21.4339 27.9969H1.61704C1.00094 28.0066 0.433468 27.6591 0.162485 27.105C-0.108495 26.5509 -0.0368003 25.8898 0.349619 25.4086L3.51511 20.9977Z", "fill", "white"]], template: function OperacionesCampoIcon_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275namespaceSVG();
      \u0275\u0275domElementStart(0, "svg", 0);
      \u0275\u0275domElement(1, "path", 1);
      \u0275\u0275domElementEnd();
    }
    if (rf & 2) {
      \u0275\u0275attribute("width", 28 * ctx.size)("height", 28 * ctx.size);
    }
  }, encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(OperacionesCampoIcon, [{
    type: Component,
    args: [{ selector: "app-operaciones-campo-icon", imports: [], template: '<svg\n  [attr.width]="28 * size"\n  [attr.height]="28 * size"\n  viewBox="0 0 28 28"\n  fill="none"\n  xmlns="http://www.w3.org/2000/svg"\n>\n  <path\n    fill-rule="evenodd"\n    clip-rule="evenodd"\n    d="M8.18012 14.5005L4.08628 20.2044C6.5871 21.7003 8.85205 21.9883 11.6932 21.4622C14.1308 21.0101 16.3644 20.1789 18.8518 20.0441L14.8696 14.5006V8.7661H15.6121C15.7773 8.7661 15.911 8.63243 15.911 8.46717V6.56664C15.911 6.40138 15.7773 6.26771 15.6121 6.26771H7.43903C7.27377 6.26771 7.1401 6.40138 7.13888 6.56664V8.46717C7.1401 8.63243 7.27377 8.7661 7.43903 8.7661H8.18149L8.18012 14.5005ZM7.11805 0C7.80704 0 8.4292 0.415574 8.69291 1.05233C8.9566 1.68908 8.81078 2.4218 8.3235 2.90911C7.83622 3.3976 7.10225 3.54344 6.4655 3.27852C5.82874 3.01483 5.41317 2.39387 5.41317 1.70367C5.41439 0.763146 6.17629 0 7.11805 0ZM11.5255 4.5082C11.1318 4.5082 10.7757 4.27124 10.625 3.90669C10.4744 3.54335 10.5582 3.12413 10.8365 2.84584C11.1147 2.56635 11.534 2.48371 11.8973 2.6344C12.2619 2.78508 12.4988 3.13991 12.4988 3.53483C12.4988 4.07194 12.0626 4.5082 11.5255 4.5082ZM28.0078 0.471289V2.27945C28.0066 2.53706 27.7988 2.74607 27.5412 2.74607H26.7124V6.23361H23.9638C23.7001 6.2409 23.4886 6.4572 23.4886 6.72089C23.4886 6.98579 23.7001 7.2021 23.9638 7.20817H26.7112V9.59233L25.3381 9.59354C25.0744 9.59962 24.863 9.81592 24.863 10.0796C24.863 10.3445 25.0744 10.5608 25.3381 10.5669H26.7112V12.9523H23.9638C23.6952 12.9523 23.4765 13.1698 23.4765 13.4383C23.4765 13.7081 23.6952 13.9256 23.9638 13.9256H26.7112V16.311H25.3381C25.0744 16.3171 24.863 16.5334 24.863 16.7983C24.863 17.062 25.0744 17.2783 25.3381 17.2843H26.7112L26.7124 19.6697H23.9638C23.7001 19.6758 23.4886 19.8921 23.4886 20.157C23.4886 20.4207 23.7001 20.637 23.9638 20.643H26.7112V24.1281C26.6954 25.6337 25.4705 26.8464 23.9638 26.8464C22.4582 26.8464 21.2321 25.6337 21.2163 24.1281V2.74744H20.3887C20.1311 2.74623 19.9221 2.53844 19.9221 2.28082V0.471446C19.9221 0.213833 20.1311 0.00603679 20.3887 0.00482357H27.5411C27.7987 0.00603865 28.0066 0.213676 28.0078 0.471289ZM3.51511 20.9977C9.77189 24.7879 14.1952 20.9977 19.5358 20.9977L20.243 21.9832V24.1268C20.2467 25.636 21.1593 26.9946 22.5543 27.5692C22.2505 27.8511 21.8483 28.0054 21.4339 27.9969H1.61704C1.00094 28.0066 0.433468 27.6591 0.162485 27.105C-0.108495 26.5509 -0.0368003 25.8898 0.349619 25.4086L3.51511 20.9977Z"\n    fill="white"\n  />\n</svg>\n' }]
  }], null, { size: [{
    type: Input
  }], color: [{
    type: Input
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(OperacionesCampoIcon, { className: "OperacionesCampoIcon", filePath: "src/app/ui/icons/operaciones-campo-icon/operaciones-campo-icon.ts", lineNumber: 10 });
})();

// src/app/ui/icons/orden-trabajo-in-situ-icon/orden-trabajo-in-situ-icon.ts
var OrdenTrabajoInSituIcon = class _OrdenTrabajoInSituIcon {
  size = 1;
  color = colors_default.white;
  static \u0275fac = function OrdenTrabajoInSituIcon_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _OrdenTrabajoInSituIcon)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _OrdenTrabajoInSituIcon, selectors: [["app-orden-trabajo-in-situ-icon"]], inputs: { size: "size", color: "color" }, decls: 11, vars: 2, consts: [["viewBox", "0 0 39 28", "fill", "none", "xmlns", "http://www.w3.org/2000/svg"], ["d", "M35.5639 19.0242V19.026C35.5833 19.398 35.5939 19.7823 35.6009 20.1684C34.5272 20.3306 33.4765 20.4752 32.4398 20.6074V16.6741C32.4398 16.2016 32.6478 15.7591 33.0127 15.4576L34.8022 13.959C35.2183 15.5634 35.4669 17.2135 35.5639 19.0226L35.5639 19.0242Z", "fill", "white"], ["d", "M24.6329 0.880653L23.7267 6.08504C23.5945 6.84668 22.9369 7.40029 22.1629 7.40029H16.2707C15.4985 7.40029 14.8408 6.84844 14.7069 6.0868L13.7795 0.776349C17.3038 -0.292061 21.1047 -0.258571 24.6329 0.882134L24.6329 0.880653Z", "fill", "white"], ["d", "M7.6797 5.7864L10.2802 10.989C10.3736 11.1741 10.5605 11.2816 10.7544 11.2816C10.8338 11.2816 10.9149 11.264 10.9907 11.2252C11.2516 11.0948 11.3574 10.7774 11.2269 10.5147L8.49774 5.05624C9.7971 3.99135 11.3204 3.12396 13.0076 2.49805L13.6652 6.26921C13.8874 7.5386 14.9822 8.45893 16.271 8.45893H22.1632C23.452 8.45893 24.5468 7.5386 24.769 6.26921L25.4036 2.62501C26.2005 2.93883 26.9763 3.29674 27.6991 3.72515C28.4713 4.18177 29.1783 4.70013 29.8342 5.26074L27.2072 10.5166C27.0768 10.7775 27.1826 11.0948 27.4435 11.2271C27.5193 11.2641 27.6004 11.2835 27.6797 11.2835C27.8737 11.2835 28.0606 11.176 28.154 10.9908L30.6434 6.01031C31.7876 7.15273 32.7097 8.4539 33.355 9.88546C33.8063 10.8851 34.1748 11.8653 34.4833 12.8509L32.3377 14.6474C31.7312 15.1482 31.3839 15.8886 31.3839 16.6767V20.744C27.3395 21.2254 23.5382 21.4757 19.7479 21.4969V19.7144C22.1245 19.45 23.9792 17.4313 23.9792 14.9858C23.9792 12.3606 21.8441 10.2255 19.2189 10.2255C17.5723 10.2255 16.1177 11.0665 15.2627 12.3411H12.872C12.5793 12.3411 12.3431 12.5774 12.3431 12.8701V17.1014C12.3431 17.394 12.5793 17.6303 12.872 17.6303H15.2627C16.0243 18.7657 17.262 19.5555 18.6901 19.7142V21.4966C14.8995 21.4755 11.0985 21.2251 7.05408 20.7438V16.6765C7.05408 15.8866 6.70676 15.1479 6.10379 14.649L3.77479 12.7008C3.9652 12.0256 4.17852 11.3503 4.43239 10.6628C5.11644 8.82391 6.23422 7.17192 7.68167 5.78784L7.6797 5.7864Z", "fill", "white"], ["d", "M19.2168 11.2793C17.1717 11.2793 15.5145 12.9366 15.5145 14.9817C15.5145 17.0268 17.1717 18.6841 19.2168 18.6841C21.2619 18.6841 22.9192 17.0268 22.9192 14.9817C22.9192 12.9366 21.2619 11.2793 19.2168 11.2793ZM19.2168 17.626C17.757 17.626 16.5723 16.4413 16.5723 14.9815C16.5723 13.5216 17.757 12.3369 19.2168 12.3369C20.6766 12.3369 21.8614 13.5216 21.8614 14.9815C21.8614 16.4413 20.6766 17.626 19.2168 17.626Z", "fill", "white"], ["d", "M20.8038 14.9813C20.8038 17.0969 17.6303 17.0969 17.6303 14.9813C17.6303 12.8656 20.8038 12.8656 20.8038 14.9813Z", "fill", "white"], ["d", "M14.7332 16.568H13.3986V13.3945H14.7332C14.5569 13.8917 14.4564 14.4241 14.4564 14.9813C14.4564 15.5384 14.5569 16.0708 14.7332 16.568Z", "fill", "white"], ["d", "M2.82605 20.1669C2.83486 17.7885 3.03938 15.7769 3.48365 13.8359L5.42477 15.4615C5.78619 15.7612 5.99422 16.2037 5.99422 16.6762V20.6095C4.95578 20.4773 3.9015 20.331 2.82605 20.1688V20.1669Z", "fill", "white"], ["d", "M36.0135 23.0713C35.92 23.0942 33.7162 23.6495 32.3763 24.4358C30.1461 25.7405 25.0773 27.1456 19.2171 27.1456C13.3569 27.1456 8.28609 25.7405 6.05783 24.4358C4.71613 23.6495 2.51409 23.0941 2.42067 23.0713C0.973222 22.7081 0 21.9817 0 21.2641C0 20.6576 0.692895 20.0529 1.77363 19.6615C1.76834 19.9683 1.76129 20.2733 1.76305 20.5907C1.76305 20.6101 1.77186 20.6259 1.77363 20.6435C1.78421 20.8904 1.95698 21.1072 2.21086 21.146C3.67771 21.3717 5.10223 21.5692 6.50034 21.7402C6.50739 21.7402 6.51445 21.7455 6.52326 21.7455C6.52502 21.7455 6.52679 21.7437 6.52855 21.7437C10.9468 22.2849 15.0706 22.5565 19.194 22.5582C19.2028 22.5582 19.2099 22.5635 19.2169 22.5635C19.2258 22.5635 19.2328 22.56 19.2399 22.5582C23.3636 22.5565 27.4872 22.285 31.9053 21.7437C31.9071 21.7437 31.9089 21.7455 31.9106 21.7455C31.9177 21.7455 31.9247 21.7419 31.9336 21.7402C33.3317 21.5692 34.7562 21.3717 36.223 21.146C36.4787 21.1072 36.6532 20.8886 36.6603 20.6383C36.662 20.6189 36.6708 20.603 36.6708 20.5836C36.6673 20.2663 36.6532 19.963 36.6444 19.6562C37.7357 20.0441 38.4339 20.6524 38.4339 21.2641C38.4339 21.9835 37.461 22.7098 36.0135 23.0713Z", "fill", "white"]], template: function OrdenTrabajoInSituIcon_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275namespaceSVG();
      \u0275\u0275domElementStart(0, "svg", 0);
      \u0275\u0275domElement(1, "path", 1)(2, "path", 2)(3, "path", 3)(4, "path", 4)(5, "path", 5)(6, "path", 6)(7, "path", 7)(8, "path", 8)(9, "path", 5)(10, "path", 5);
      \u0275\u0275domElementEnd();
    }
    if (rf & 2) {
      \u0275\u0275attribute("width", 25 * ctx.size)("height", 25 * ctx.size);
    }
  }, encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(OrdenTrabajoInSituIcon, [{
    type: Component,
    args: [{ selector: "app-orden-trabajo-in-situ-icon", imports: [], template: '<svg  [attr.width]="25 * size"\n  [attr.height]="25 * size" viewBox="0 0 39 28" fill="none" xmlns="http://www.w3.org/2000/svg">\n  <path\n    d="M35.5639 19.0242V19.026C35.5833 19.398 35.5939 19.7823 35.6009 20.1684C34.5272 20.3306 33.4765 20.4752 32.4398 20.6074V16.6741C32.4398 16.2016 32.6478 15.7591 33.0127 15.4576L34.8022 13.959C35.2183 15.5634 35.4669 17.2135 35.5639 19.0226L35.5639 19.0242Z"\n    fill="white"\n  />\n  <path\n    d="M24.6329 0.880653L23.7267 6.08504C23.5945 6.84668 22.9369 7.40029 22.1629 7.40029H16.2707C15.4985 7.40029 14.8408 6.84844 14.7069 6.0868L13.7795 0.776349C17.3038 -0.292061 21.1047 -0.258571 24.6329 0.882134L24.6329 0.880653Z"\n    fill="white"\n  />\n  <path\n    d="M7.6797 5.7864L10.2802 10.989C10.3736 11.1741 10.5605 11.2816 10.7544 11.2816C10.8338 11.2816 10.9149 11.264 10.9907 11.2252C11.2516 11.0948 11.3574 10.7774 11.2269 10.5147L8.49774 5.05624C9.7971 3.99135 11.3204 3.12396 13.0076 2.49805L13.6652 6.26921C13.8874 7.5386 14.9822 8.45893 16.271 8.45893H22.1632C23.452 8.45893 24.5468 7.5386 24.769 6.26921L25.4036 2.62501C26.2005 2.93883 26.9763 3.29674 27.6991 3.72515C28.4713 4.18177 29.1783 4.70013 29.8342 5.26074L27.2072 10.5166C27.0768 10.7775 27.1826 11.0948 27.4435 11.2271C27.5193 11.2641 27.6004 11.2835 27.6797 11.2835C27.8737 11.2835 28.0606 11.176 28.154 10.9908L30.6434 6.01031C31.7876 7.15273 32.7097 8.4539 33.355 9.88546C33.8063 10.8851 34.1748 11.8653 34.4833 12.8509L32.3377 14.6474C31.7312 15.1482 31.3839 15.8886 31.3839 16.6767V20.744C27.3395 21.2254 23.5382 21.4757 19.7479 21.4969V19.7144C22.1245 19.45 23.9792 17.4313 23.9792 14.9858C23.9792 12.3606 21.8441 10.2255 19.2189 10.2255C17.5723 10.2255 16.1177 11.0665 15.2627 12.3411H12.872C12.5793 12.3411 12.3431 12.5774 12.3431 12.8701V17.1014C12.3431 17.394 12.5793 17.6303 12.872 17.6303H15.2627C16.0243 18.7657 17.262 19.5555 18.6901 19.7142V21.4966C14.8995 21.4755 11.0985 21.2251 7.05408 20.7438V16.6765C7.05408 15.8866 6.70676 15.1479 6.10379 14.649L3.77479 12.7008C3.9652 12.0256 4.17852 11.3503 4.43239 10.6628C5.11644 8.82391 6.23422 7.17192 7.68167 5.78784L7.6797 5.7864Z"\n    fill="white"\n  />\n  <path\n    d="M19.2168 11.2793C17.1717 11.2793 15.5145 12.9366 15.5145 14.9817C15.5145 17.0268 17.1717 18.6841 19.2168 18.6841C21.2619 18.6841 22.9192 17.0268 22.9192 14.9817C22.9192 12.9366 21.2619 11.2793 19.2168 11.2793ZM19.2168 17.626C17.757 17.626 16.5723 16.4413 16.5723 14.9815C16.5723 13.5216 17.757 12.3369 19.2168 12.3369C20.6766 12.3369 21.8614 13.5216 21.8614 14.9815C21.8614 16.4413 20.6766 17.626 19.2168 17.626Z"\n    fill="white"\n  />\n  <path\n    d="M20.8038 14.9813C20.8038 17.0969 17.6303 17.0969 17.6303 14.9813C17.6303 12.8656 20.8038 12.8656 20.8038 14.9813Z"\n    fill="white"\n  />\n  <path\n    d="M14.7332 16.568H13.3986V13.3945H14.7332C14.5569 13.8917 14.4564 14.4241 14.4564 14.9813C14.4564 15.5384 14.5569 16.0708 14.7332 16.568Z"\n    fill="white"\n  />\n  <path\n    d="M2.82605 20.1669C2.83486 17.7885 3.03938 15.7769 3.48365 13.8359L5.42477 15.4615C5.78619 15.7612 5.99422 16.2037 5.99422 16.6762V20.6095C4.95578 20.4773 3.9015 20.331 2.82605 20.1688V20.1669Z"\n    fill="white"\n  />\n  <path\n    d="M36.0135 23.0713C35.92 23.0942 33.7162 23.6495 32.3763 24.4358C30.1461 25.7405 25.0773 27.1456 19.2171 27.1456C13.3569 27.1456 8.28609 25.7405 6.05783 24.4358C4.71613 23.6495 2.51409 23.0941 2.42067 23.0713C0.973222 22.7081 0 21.9817 0 21.2641C0 20.6576 0.692895 20.0529 1.77363 19.6615C1.76834 19.9683 1.76129 20.2733 1.76305 20.5907C1.76305 20.6101 1.77186 20.6259 1.77363 20.6435C1.78421 20.8904 1.95698 21.1072 2.21086 21.146C3.67771 21.3717 5.10223 21.5692 6.50034 21.7402C6.50739 21.7402 6.51445 21.7455 6.52326 21.7455C6.52502 21.7455 6.52679 21.7437 6.52855 21.7437C10.9468 22.2849 15.0706 22.5565 19.194 22.5582C19.2028 22.5582 19.2099 22.5635 19.2169 22.5635C19.2258 22.5635 19.2328 22.56 19.2399 22.5582C23.3636 22.5565 27.4872 22.285 31.9053 21.7437C31.9071 21.7437 31.9089 21.7455 31.9106 21.7455C31.9177 21.7455 31.9247 21.7419 31.9336 21.7402C33.3317 21.5692 34.7562 21.3717 36.223 21.146C36.4787 21.1072 36.6532 20.8886 36.6603 20.6383C36.662 20.6189 36.6708 20.603 36.6708 20.5836C36.6673 20.2663 36.6532 19.963 36.6444 19.6562C37.7357 20.0441 38.4339 20.6524 38.4339 21.2641C38.4339 21.9835 37.461 22.7098 36.0135 23.0713Z"\n    fill="white"\n  />\n  <path\n    d="M20.8038 14.9813C20.8038 17.0969 17.6303 17.0969 17.6303 14.9813C17.6303 12.8656 20.8038 12.8656 20.8038 14.9813Z"\n    fill="white"\n  />\n  <path\n    d="M20.8038 14.9813C20.8038 17.0969 17.6303 17.0969 17.6303 14.9813C17.6303 12.8656 20.8038 12.8656 20.8038 14.9813Z"\n    fill="white"\n  />\n</svg>\n' }]
  }], null, { size: [{
    type: Input
  }], color: [{
    type: Input
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(OrdenTrabajoInSituIcon, { className: "OrdenTrabajoInSituIcon", filePath: "src/app/ui/icons/orden-trabajo-in-situ-icon/orden-trabajo-in-situ-icon.ts", lineNumber: 10 });
})();

// src/app/ui/icons/plan-muestreo-icon/plan-muestreo-icon.ts
var PlanMuestreoIcon = class _PlanMuestreoIcon {
  size = 1;
  color = colors_default.white;
  static \u0275fac = function PlanMuestreoIcon_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _PlanMuestreoIcon)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _PlanMuestreoIcon, selectors: [["app-plan-muestreo-icon"]], inputs: { size: "size", color: "color" }, decls: 6, vars: 2, consts: [["viewBox", "0 0 21 33", "fill", "none", "xmlns", "http://www.w3.org/2000/svg"], ["d", "M6.32774 4.48047H14.3642C14.6676 4.48047 14.9133 4.78386 14.9133 5.0296V7.97157C14.9133 8.27497 14.6676 8.52071 14.3642 8.52071H6.32774C6.02435 8.52071 5.77861 8.21731 5.77861 7.97157V5.0296C5.77861 4.72621 6.02435 4.48047 6.32774 4.48047Z", "fill", "white"], ["d", "M13.4335 1.64739C13.4335 0.738595 12.6949 0 11.7861 0H8.90454C7.99574 0 7.25714 0.738595 7.25714 1.64739V3.38128H13.4334L13.4335 1.64739Z", "fill", "white"], ["d", "M10.6754 24.0182C13.141 21.8903 15.7095 20.9211 17.9759 21.2849C18.5402 21.3755 19.0728 21.5567 19.5767 21.8052L13.4345 12.5619V9.61719H7.2582V12.5619L0.639799 22.5204C0.63019 22.5355 0.621953 22.552 0.612343 22.5671C0.90201 22.8321 1.22874 23.1176 1.59256 23.41C6.7254 21.2904 9.66218 23.1382 10.6754 24.0182ZM11.7627 17.2336C12.0661 17.2336 12.3118 17.4793 12.3118 17.7827C12.3118 18.0861 12.0661 18.3318 11.7627 18.3318C11.4593 18.3318 11.2136 18.0861 11.2136 17.7827C11.2136 17.4793 11.4593 17.2336 11.7627 17.2336ZM9.21883 15.3748C9.52223 15.3748 9.76797 15.6205 9.76797 15.9239C9.76797 16.2273 9.52223 16.473 9.21883 16.473C8.91544 16.473 8.6697 16.2273 8.6697 15.9239C8.6697 15.6205 8.91544 15.3748 9.21883 15.3748ZM9.47967 19.4684C10.0865 19.4684 10.5779 19.9598 10.5779 20.5666C10.5779 21.1734 10.0865 21.6649 9.47967 21.6649C8.87287 21.6649 8.38141 21.1734 8.38141 20.5666C8.38141 19.9598 8.87287 19.4684 9.47967 19.4684Z", "fill", "white"], ["d", "M20.6273 23.9834C19.8324 23.0993 18.8783 22.5433 17.8006 22.3703C15.6617 22.0271 13.1482 23.1226 10.725 25.4551C9.68023 26.46 8.45295 26.9693 7.07065 26.9693C6.98553 26.9693 6.90179 26.9666 6.8153 26.9638C4.24537 26.8499 1.71796 25.0322 0.139271 23.6333C-0.0693992 24.3966 -0.0474337 25.2162 0.231251 25.974L1.8649 30.4289C2.41815 31.9363 3.86785 32.9494 5.47424 32.9494H15.2145C16.8207 32.9494 18.2704 31.9363 18.8238 30.4289L20.4589 25.9726C20.6936 25.3301 20.743 24.6423 20.6277 23.9834L20.6273 23.9834Z", "fill", "white"], ["d", "M6.86707 25.8654C8.00242 25.9176 8.98533 25.5511 9.85298 24.7603C8.99908 24.0629 6.68587 22.7286 2.63326 24.1838C3.90314 25.0541 5.39811 25.8009 6.86707 25.8654Z", "fill", "white"]], template: function PlanMuestreoIcon_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275namespaceSVG();
      \u0275\u0275domElementStart(0, "svg", 0);
      \u0275\u0275domElement(1, "path", 1)(2, "path", 2)(3, "path", 3)(4, "path", 4)(5, "path", 5);
      \u0275\u0275domElementEnd();
    }
    if (rf & 2) {
      \u0275\u0275attribute("width", 25 * ctx.size)("height", 25 * ctx.size);
    }
  }, encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PlanMuestreoIcon, [{
    type: Component,
    args: [{ selector: "app-plan-muestreo-icon", imports: [], template: '<svg\n  [attr.width]="25 * size"\n  [attr.height]="25 * size"\n  viewBox="0 0 21 33"\n  fill="none"\n  xmlns="http://www.w3.org/2000/svg"\n>\n  <path\n    d="M6.32774 4.48047H14.3642C14.6676 4.48047 14.9133 4.78386 14.9133 5.0296V7.97157C14.9133 8.27497 14.6676 8.52071 14.3642 8.52071H6.32774C6.02435 8.52071 5.77861 8.21731 5.77861 7.97157V5.0296C5.77861 4.72621 6.02435 4.48047 6.32774 4.48047Z"\n    fill="white"\n  />\n  <path\n    d="M13.4335 1.64739C13.4335 0.738595 12.6949 0 11.7861 0H8.90454C7.99574 0 7.25714 0.738595 7.25714 1.64739V3.38128H13.4334L13.4335 1.64739Z"\n    fill="white"\n  />\n  <path\n    d="M10.6754 24.0182C13.141 21.8903 15.7095 20.9211 17.9759 21.2849C18.5402 21.3755 19.0728 21.5567 19.5767 21.8052L13.4345 12.5619V9.61719H7.2582V12.5619L0.639799 22.5204C0.63019 22.5355 0.621953 22.552 0.612343 22.5671C0.90201 22.8321 1.22874 23.1176 1.59256 23.41C6.7254 21.2904 9.66218 23.1382 10.6754 24.0182ZM11.7627 17.2336C12.0661 17.2336 12.3118 17.4793 12.3118 17.7827C12.3118 18.0861 12.0661 18.3318 11.7627 18.3318C11.4593 18.3318 11.2136 18.0861 11.2136 17.7827C11.2136 17.4793 11.4593 17.2336 11.7627 17.2336ZM9.21883 15.3748C9.52223 15.3748 9.76797 15.6205 9.76797 15.9239C9.76797 16.2273 9.52223 16.473 9.21883 16.473C8.91544 16.473 8.6697 16.2273 8.6697 15.9239C8.6697 15.6205 8.91544 15.3748 9.21883 15.3748ZM9.47967 19.4684C10.0865 19.4684 10.5779 19.9598 10.5779 20.5666C10.5779 21.1734 10.0865 21.6649 9.47967 21.6649C8.87287 21.6649 8.38141 21.1734 8.38141 20.5666C8.38141 19.9598 8.87287 19.4684 9.47967 19.4684Z"\n    fill="white"\n  />\n  <path\n    d="M20.6273 23.9834C19.8324 23.0993 18.8783 22.5433 17.8006 22.3703C15.6617 22.0271 13.1482 23.1226 10.725 25.4551C9.68023 26.46 8.45295 26.9693 7.07065 26.9693C6.98553 26.9693 6.90179 26.9666 6.8153 26.9638C4.24537 26.8499 1.71796 25.0322 0.139271 23.6333C-0.0693992 24.3966 -0.0474337 25.2162 0.231251 25.974L1.8649 30.4289C2.41815 31.9363 3.86785 32.9494 5.47424 32.9494H15.2145C16.8207 32.9494 18.2704 31.9363 18.8238 30.4289L20.4589 25.9726C20.6936 25.3301 20.743 24.6423 20.6277 23.9834L20.6273 23.9834Z"\n    fill="white"\n  />\n  <path\n    d="M6.86707 25.8654C8.00242 25.9176 8.98533 25.5511 9.85298 24.7603C8.99908 24.0629 6.68587 22.7286 2.63326 24.1838C3.90314 25.0541 5.39811 25.8009 6.86707 25.8654Z"\n    fill="white"\n  />\n</svg>\n' }]
  }], null, { size: [{
    type: Input
  }], color: [{
    type: Input
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(PlanMuestreoIcon, { className: "PlanMuestreoIcon", filePath: "src/app/ui/icons/plan-muestreo-icon/plan-muestreo-icon.ts", lineNumber: 10 });
})();

// src/app/ui/icons/acceso-autorizado/acceso-autorizado.ts
var AccesoAutorizado = class _AccesoAutorizado {
  size = 1.2;
  color = "#ffffff";
  static \u0275fac = function AccesoAutorizado_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AccesoAutorizado)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AccesoAutorizado, selectors: [["app-acceso-autorizado"]], inputs: { size: "size", color: "color" }, decls: 3, vars: 4, consts: [["xmlns", "http://www.w3.org/2000/svg", "viewBox", "0 0 186 183", "fill", "none"], ["d", "M136.31,110.47c-3.85,5.82-7.42,11.53-11.3,17.01-9.58,13.5-20.94,25.36-33.78,35.79-1.46,1.19-2.46,1.16-3.92-.04-32.95-27.11-54.38-61.4-64.04-102.97-1.31-5.66-2.1-11.44-3.09-17.17-.3-1.74.28-2.66,1.97-3.26,13.5-4.75,27.33-8.08,41.53-9.92,13.2-1.71,26.44-2.09,39.71-1.15,18.17,1.29,35.85,4.96,53.02,11.05,1.94.69,2.4,1.51,1.88,4.14-1.55,7.88-3.15,15.76-4.83,23.62-.24,1.14-.12,1.65.94,2.22,8.48,4.56,12.97,14.13,11.22,23.74-1.69,9.28-9.43,16.6-18.86,17.93-3.64.51-7.15.09-10.44-1ZM122.98,121.97c-20.05-18.12-50.23-16.14-67.33.06,9.51,13.71,20.73,25.85,33.65,36.55,12.91-10.7,24.15-22.82,33.68-36.61ZM89.34,104.18c13.81-.08,24.75-11.11,24.69-24.88-.07-13.64-11.22-24.69-24.84-24.61-13.68.08-24.76,11.31-24.66,24.99.1,13.52,11.3,24.58,24.82,24.5ZM126.05,89.38c.04,9.67,7.88,17.49,17.5,17.46,9.71-.03,17.6-7.94,17.56-17.6-.04-9.65-7.9-17.47-17.53-17.44-9.78.03-17.57,7.84-17.52,17.58Z"], ["d", "M141.11,93.62c3.16-3.16,6.16-6.16,9.17-9.16.43-.43.84-.88,1.31-1.27,1.05-.87,2.4-.82,3.3.07.93.92,1.02,2.24.11,3.28-.86.99-1.83,1.89-2.76,2.82-2.97,2.97-5.94,5.95-8.92,8.91-1.6,1.59-2.73,1.61-4.29.08-2.06-2.03-4.1-4.07-6.12-6.12-1.26-1.28-1.38-2.71-.37-3.75,1.05-1.09,2.51-.96,3.86.37,1.54,1.53,3.06,3.09,4.72,4.77Z"]], template: function AccesoAutorizado_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275namespaceSVG();
      \u0275\u0275domElementStart(0, "svg", 0);
      \u0275\u0275domElement(1, "path", 1)(2, "path", 2);
      \u0275\u0275domElementEnd();
    }
    if (rf & 2) {
      \u0275\u0275attribute("width", 25 * ctx.size)("height", 25 * ctx.size);
      \u0275\u0275advance();
      \u0275\u0275attribute("fill", ctx.color);
      \u0275\u0275advance();
      \u0275\u0275attribute("fill", ctx.color);
    }
  }, encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AccesoAutorizado, [{
    type: Component,
    args: [{ selector: "app-acceso-autorizado", imports: [], template: '<svg\n  [attr.width]="25 * size"\n  [attr.height]="25 * size"\n  xmlns="http://www.w3.org/2000/svg"\n  viewBox="0 0 186 183"\n  fill="none"\n>\n  <path\n    [attr.fill]="color"\n    d="M136.31,110.47c-3.85,5.82-7.42,11.53-11.3,17.01-9.58,13.5-20.94,25.36-33.78,35.79-1.46,1.19-2.46,1.16-3.92-.04-32.95-27.11-54.38-61.4-64.04-102.97-1.31-5.66-2.1-11.44-3.09-17.17-.3-1.74.28-2.66,1.97-3.26,13.5-4.75,27.33-8.08,41.53-9.92,13.2-1.71,26.44-2.09,39.71-1.15,18.17,1.29,35.85,4.96,53.02,11.05,1.94.69,2.4,1.51,1.88,4.14-1.55,7.88-3.15,15.76-4.83,23.62-.24,1.14-.12,1.65.94,2.22,8.48,4.56,12.97,14.13,11.22,23.74-1.69,9.28-9.43,16.6-18.86,17.93-3.64.51-7.15.09-10.44-1ZM122.98,121.97c-20.05-18.12-50.23-16.14-67.33.06,9.51,13.71,20.73,25.85,33.65,36.55,12.91-10.7,24.15-22.82,33.68-36.61ZM89.34,104.18c13.81-.08,24.75-11.11,24.69-24.88-.07-13.64-11.22-24.69-24.84-24.61-13.68.08-24.76,11.31-24.66,24.99.1,13.52,11.3,24.58,24.82,24.5ZM126.05,89.38c.04,9.67,7.88,17.49,17.5,17.46,9.71-.03,17.6-7.94,17.56-17.6-.04-9.65-7.9-17.47-17.53-17.44-9.78.03-17.57,7.84-17.52,17.58Z"\n  />\n  <path\n    [attr.fill]="color"\n    d="M141.11,93.62c3.16-3.16,6.16-6.16,9.17-9.16.43-.43.84-.88,1.31-1.27,1.05-.87,2.4-.82,3.3.07.93.92,1.02,2.24.11,3.28-.86.99-1.83,1.89-2.76,2.82-2.97,2.97-5.94,5.95-8.92,8.91-1.6,1.59-2.73,1.61-4.29.08-2.06-2.03-4.1-4.07-6.12-6.12-1.26-1.28-1.38-2.71-.37-3.75,1.05-1.09,2.51-.96,3.86.37,1.54,1.53,3.06,3.09,4.72,4.77Z"\n  />\n</svg>\n' }]
  }], null, { size: [{
    type: Input
  }], color: [{
    type: Input
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AccesoAutorizado, { className: "AccesoAutorizado", filePath: "src/app/ui/icons/acceso-autorizado/acceso-autorizado.ts", lineNumber: 9 });
})();

// src/app/ui/icons/calibracion-equipos-icon/calibracion-equipos-icon.ts
var CalibracionEquiposIcon = class _CalibracionEquiposIcon {
  size = 1;
  color = colors_default.white;
  static \u0275fac = function CalibracionEquiposIcon_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CalibracionEquiposIcon)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _CalibracionEquiposIcon, selectors: [["app-calibracion-equipos-icon"]], inputs: { size: "size", color: "color" }, decls: 8, vars: 9, consts: [["viewBox", "0 0 24 24", "fill", "none", "xmlns", "http://www.w3.org/2000/svg"], ["d", "M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z"], ["d", "M12 6C8.69 6 6 8.69 6 12C6 15.31 8.69 18 12 18C15.31 18 18 15.31 18 12C18 8.69 15.31 6 12 6ZM12 16C9.79 16 8 14.21 8 12C8 9.79 9.79 8 12 8C14.21 8 16 9.79 16 12C16 14.21 14.21 16 12 16Z"], ["cx", "12", "cy", "12", "r", "2"], ["x1", "12", "y1", "2", "x2", "12", "y2", "5", "stroke-width", "2", "stroke-linecap", "round"], ["x1", "12", "y1", "19", "x2", "12", "y2", "22", "stroke-width", "2", "stroke-linecap", "round"], ["x1", "2", "y1", "12", "x2", "5", "y2", "12", "stroke-width", "2", "stroke-linecap", "round"], ["x1", "19", "y1", "12", "x2", "22", "y2", "12", "stroke-width", "2", "stroke-linecap", "round"]], template: function CalibracionEquiposIcon_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275namespaceSVG();
      \u0275\u0275domElementStart(0, "svg", 0);
      \u0275\u0275domElement(1, "path", 1)(2, "path", 2)(3, "circle", 3)(4, "line", 4)(5, "line", 5)(6, "line", 6)(7, "line", 7);
      \u0275\u0275domElementEnd();
    }
    if (rf & 2) {
      \u0275\u0275attribute("width", 25 * ctx.size)("height", 25 * ctx.size);
      \u0275\u0275advance();
      \u0275\u0275attribute("fill", ctx.color);
      \u0275\u0275advance();
      \u0275\u0275attribute("fill", ctx.color);
      \u0275\u0275advance();
      \u0275\u0275attribute("fill", ctx.color);
      \u0275\u0275advance();
      \u0275\u0275attribute("stroke", ctx.color);
      \u0275\u0275advance();
      \u0275\u0275attribute("stroke", ctx.color);
      \u0275\u0275advance();
      \u0275\u0275attribute("stroke", ctx.color);
      \u0275\u0275advance();
      \u0275\u0275attribute("stroke", ctx.color);
    }
  }, encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CalibracionEquiposIcon, [{
    type: Component,
    args: [{ selector: "app-calibracion-equipos-icon", imports: [], template: '<svg\n  [attr.width]="25 * size"\n  [attr.height]="25 * size"\n  viewBox="0 0 24 24"\n  fill="none"\n  xmlns="http://www.w3.org/2000/svg"\n>\n  <path\n    d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z"\n    [attr.fill]="color"\n  />\n  <path\n    d="M12 6C8.69 6 6 8.69 6 12C6 15.31 8.69 18 12 18C15.31 18 18 15.31 18 12C18 8.69 15.31 6 12 6ZM12 16C9.79 16 8 14.21 8 12C8 9.79 9.79 8 12 8C14.21 8 16 9.79 16 12C16 14.21 14.21 16 12 16Z"\n    [attr.fill]="color"\n  />\n  <circle cx="12" cy="12" r="2" [attr.fill]="color" />\n  <line x1="12" y1="2" x2="12" y2="5" [attr.stroke]="color" stroke-width="2" stroke-linecap="round" />\n  <line x1="12" y1="19" x2="12" y2="22" [attr.stroke]="color" stroke-width="2" stroke-linecap="round" />\n  <line x1="2" y1="12" x2="5" y2="12" [attr.stroke]="color" stroke-width="2" stroke-linecap="round" />\n  <line x1="19" y1="12" x2="22" y2="12" [attr.stroke]="color" stroke-width="2" stroke-linecap="round" />\n</svg>\n' }]
  }], null, { size: [{
    type: Input
  }], color: [{
    type: Input
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(CalibracionEquiposIcon, { className: "CalibracionEquiposIcon", filePath: "src/app/ui/icons/calibracion-equipos-icon/calibracion-equipos-icon.ts", lineNumber: 10 });
})();

// src/app/shared/components/sidebar/sidebar-items.ts
var SIDEBAR_MENU_ITEMS = [
  {
    path: "/dashboard",
    label: "Dashboard",
    icon: HouseComponent,
    requiredRoles: RoleAccess.ALL_USERS
  },
  {
    path: "/solicitud-trabajo",
    label: "Solicitud de Trabajo",
    icon: CarpetaIcon,
    requiredRoles: RoleAccess.SOLICITUD_TRABAJO
  },
  {
    label: "Listado de Solicitudes",
    icon: ListaSolicitudesIcon,
    expanded: false,
    requiredRoles: RoleAccess.LISTA_SOLICITUDES,
    children: [
      {
        path: "/lista-solicitudes",
        label: "Bandeja de Solicitudes",
        icon: ListaSolicitudesIcon,
        requiredRoles: RoleAccess.LISTA_SOLICITUDES
      },
      {
        path: "/lista-cotizaciones",
        label: "Por Autorizar",
        icon: AccesoAutorizado,
        requiredRoles: RoleAccess.LISTA_COTIZACIONES
      }
    ]
  },
  {
    label: "Gesti\xF3n de Vehiculos",
    icon: CarIcon,
    expanded: false,
    requiredRoles: RoleAccess.HORARIOS_LABORALES,
    children: [
      {
        path: "/horarios-laborales",
        label: "Horarios laborales",
        icon: HorariosLaboralesIcon,
        requiredRoles: RoleAccess.HORARIOS_LABORALES
      },
      {
        path: "/por-contraloria",
        label: "Por contraloria",
        icon: PorContraloriaIcon,
        requiredRoles: RoleAccess.POR_CONTRALORIA
      }
    ]
  },
  {
    label: "Operaciones de Campo",
    icon: OperacionesCampoIcon,
    expanded: false,
    requiredRoles: RoleAccess.ORDEN_IN_SITU,
    children: [
      {
        path: "/orden-trabajo-in-situ",
        label: "Orden de trabajo In Situ",
        icon: OrdenTrabajoInSituIcon,
        requiredRoles: RoleAccess.ORDEN_IN_SITU
      },
      {
        path: "/plan-muestreo",
        label: "Plan de Muestreo",
        icon: PlanMuestreoIcon,
        requiredRoles: RoleAccess.PLAN_MUESTREO
      }
    ]
  },
  {
    path: "/calibracion-equipos",
    label: "Calibraci\xF3n de equipos",
    icon: CalibracionEquiposIcon,
    requiredRoles: RoleAccess.CALIBRACION_EQUIPOS
  },
  {
    path: "/admin-formularios",
    label: "Administraci\xF3n de Formularios",
    icon: CarpetaIcon,
    requiredRoles: RoleAccess.ADMIN_ONLY
  }
];

// src/app/ui/icons/close-sidebar-icon/close-sidebar-icon.component.ts
var CloseSidebarIconComponent = class _CloseSidebarIconComponent {
  size = 1;
  color = colors_default.blue;
  static \u0275fac = function CloseSidebarIconComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CloseSidebarIconComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _CloseSidebarIconComponent, selectors: [["app-close-sidebar-icon"]], inputs: { size: "size", color: "color" }, decls: 2, vars: 2, consts: [["xmlns", "http://www.w3.org/2000/svg", "fill", "none", "viewBox", "0 0 24 24", "stroke-width", "1.5", "stroke", "currentColor", 1, "size-6"], ["stroke-linecap", "round", "stroke-linejoin", "round", "d", "M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75"]], template: function CloseSidebarIconComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275namespaceSVG();
      \u0275\u0275domElementStart(0, "svg", 0);
      \u0275\u0275domElement(1, "path", 1);
      \u0275\u0275domElementEnd();
    }
    if (rf & 2) {
      \u0275\u0275attribute("width", 24 * ctx.size)("height", 31 * ctx.size);
    }
  }, encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CloseSidebarIconComponent, [{
    type: Component,
    args: [{ selector: "app-close-sidebar-icon", imports: [], template: '<svg\n  xmlns="http://www.w3.org/2000/svg"\n  fill="none"\n  viewBox="0 0 24 24"\n  [attr.width]="24 * size"\n  [attr.height]="31 * size"\n  stroke-width="1.5"\n  stroke="currentColor"\n  class="size-6"\n>\n  <path\n    stroke-linecap="round"\n    stroke-linejoin="round"\n    d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75"\n  />\n</svg>\n' }]
  }], null, { size: [{
    type: Input
  }], color: [{
    type: Input
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(CloseSidebarIconComponent, { className: "CloseSidebarIconComponent", filePath: "src/app/ui/icons/close-sidebar-icon/close-sidebar-icon.component.ts", lineNumber: 11 });
})();

// src/app/ui/icons/open-sidebar-icon/open-sidebar-icon.component.ts
var OpenSidebarIconComponent = class _OpenSidebarIconComponent {
  size = 1;
  color = "#E32C2D";
  static \u0275fac = function OpenSidebarIconComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _OpenSidebarIconComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _OpenSidebarIconComponent, selectors: [["app-open-sidebar-icon"]], inputs: { size: "size", color: "color" }, decls: 2, vars: 2, consts: [["xmlns", "http://www.w3.org/2000/svg", "fill", "none", "viewBox", "0 0 24 24", "stroke-width", "1.5", "stroke", "currentColor", 1, "size-6"], ["stroke-linecap", "round", "stroke-linejoin", "round", "d", "M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15M12 9l3 3m0 0-3 3m3-3H2.25"]], template: function OpenSidebarIconComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275namespaceSVG();
      \u0275\u0275domElementStart(0, "svg", 0);
      \u0275\u0275domElement(1, "path", 1);
      \u0275\u0275domElementEnd();
    }
    if (rf & 2) {
      \u0275\u0275attribute("width", 24 * ctx.size)("height", 24 * ctx.size);
    }
  }, encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(OpenSidebarIconComponent, [{
    type: Component,
    args: [{ selector: "app-open-sidebar-icon", imports: [], template: '<svg\n  xmlns="http://www.w3.org/2000/svg"\n  fill="none"\n  viewBox="0 0 24 24"\n  [attr.width]="24 * size"\n  [attr.height]="24 * size"\n  stroke-width="1.5"\n  stroke="currentColor"\n  class="size-6"\n>\n  <path\n    stroke-linecap="round"\n    stroke-linejoin="round"\n    d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15M12 9l3 3m0 0-3 3m3-3H2.25"\n  />\n</svg>\n' }]
  }], null, { size: [{
    type: Input
  }], color: [{
    type: Input
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(OpenSidebarIconComponent, { className: "OpenSidebarIconComponent", filePath: "src/app/ui/icons/open-sidebar-icon/open-sidebar-icon.component.ts", lineNumber: 9 });
})();

// src/app/ui/icons/close-icon/close-icon.component.ts
var CloseIconComponent = class _CloseIconComponent {
  size = 1;
  color = "#E32C2D";
  static \u0275fac = function CloseIconComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CloseIconComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _CloseIconComponent, selectors: [["app-close-icon"]], inputs: { size: "size", color: "color" }, decls: 4, vars: 2, consts: [["viewBox", "0 0 20 22", "fill", "none", "xmlns", "http://www.w3.org/2000/svg"], ["d", "M6.07031 11.1406H19.1074", "stroke", "white", "stroke-width", "1.35803", "stroke-miterlimit", "10", "stroke-linecap", "round", "stroke-linejoin", "round"], ["d", "M9.96297 1H3.26338C1.99589 1 1 1.99589 1 3.17284V19.0165C1 20.284 1.99589 21.2798 3.26338 21.2798H9.96297", "stroke", "white", "stroke-width", "1.35803", "stroke-miterlimit", "10", "stroke-linecap", "round", "stroke-linejoin", "round"], ["d", "M15.667 7.7002L19.1073 11.1405L15.667 14.5809", "stroke", "white", "stroke-width", "1.35803", "stroke-miterlimit", "10", "stroke-linecap", "round", "stroke-linejoin", "round"]], template: function CloseIconComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275namespaceSVG();
      \u0275\u0275domElementStart(0, "svg", 0);
      \u0275\u0275domElement(1, "path", 1)(2, "path", 2)(3, "path", 3);
      \u0275\u0275domElementEnd();
    }
    if (rf & 2) {
      \u0275\u0275attribute("width", 20 * ctx.size)("height", 22 * ctx.size);
    }
  }, encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CloseIconComponent, [{
    type: Component,
    args: [{ selector: "app-close-icon", imports: [], template: '<svg\n  [attr.width]="20 * size"\n  [attr.height]="22 * size"\n  viewBox="0 0 20 22"\n  fill="none"\n  xmlns="http://www.w3.org/2000/svg"\n>\n  <path\n    d="M6.07031 11.1406H19.1074"\n    stroke="white"\n    stroke-width="1.35803"\n    stroke-miterlimit="10"\n    stroke-linecap="round"\n    stroke-linejoin="round"\n  />\n  <path\n    d="M9.96297 1H3.26338C1.99589 1 1 1.99589 1 3.17284V19.0165C1 20.284 1.99589 21.2798 3.26338 21.2798H9.96297"\n    stroke="white"\n    stroke-width="1.35803"\n    stroke-miterlimit="10"\n    stroke-linecap="round"\n    stroke-linejoin="round"\n  />\n  <path\n    d="M15.667 7.7002L19.1073 11.1405L15.667 14.5809"\n    stroke="white"\n    stroke-width="1.35803"\n    stroke-miterlimit="10"\n    stroke-linecap="round"\n    stroke-linejoin="round"\n  />\n</svg>\n' }]
  }], null, { size: [{
    type: Input
  }], color: [{
    type: Input
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(CloseIconComponent, { className: "CloseIconComponent", filePath: "src/app/ui/icons/close-icon/close-icon.component.ts", lineNumber: 9 });
})();

// src/app/shared/components/sidebar/sidebar.ts
var _c0 = (a0) => ({ "bg-white/5": a0 });
var _forTrack0 = ($index, $item) => $item.label;
function Sidebar_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 2);
    \u0275\u0275element(1, "img", 13);
    \u0275\u0275elementEnd();
  }
}
function Sidebar_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "app-close-sidebar-icon");
  }
}
function Sidebar_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "app-open-sidebar-icon");
  }
}
function Sidebar_For_9_Conditional_0_ng_container_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainer(0);
  }
}
function Sidebar_For_9_Conditional_0_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 17);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r1 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(item_r1.label);
  }
}
function Sidebar_For_9_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "li")(1, "a", 15)(2, "div", 8);
    \u0275\u0275template(3, Sidebar_For_9_Conditional_0_ng_container_3_Template, 1, 0, "ng-container", 16);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(4, Sidebar_For_9_Conditional_0_Conditional_4_Template, 2, 1, "span", 17);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const item_r1 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("routerLink", item_r1.path);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngComponentOutlet", item_r1.icon ?? null);
    \u0275\u0275advance();
    \u0275\u0275conditional(!ctx_r1.collapsed ? 4 : -1);
  }
}
function Sidebar_For_9_Conditional_1_ng_container_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainer(0);
  }
}
function Sidebar_For_9_Conditional_1_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 17);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r1 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(item_r1.label);
  }
}
function Sidebar_For_9_Conditional_1_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 22);
    \u0275\u0275element(1, "path", 23);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r1 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275classProp("rotate-180", item_r1.expanded);
  }
}
function Sidebar_For_9_Conditional_1_Conditional_7_For_2_ng_container_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainer(0);
  }
}
function Sidebar_For_9_Conditional_1_Conditional_7_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "li")(1, "a", 24);
    \u0275\u0275template(2, Sidebar_For_9_Conditional_1_Conditional_7_For_2_ng_container_2_Template, 1, 0, "ng-container", 16);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const subItem_r4 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275property("routerLink", subItem_r4.path);
    \u0275\u0275advance();
    \u0275\u0275property("ngComponentOutlet", subItem_r4.icon ?? null);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("\xA0\xA0 ", subItem_r4.label, " ");
  }
}
function Sidebar_For_9_Conditional_1_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "ul", 21);
    \u0275\u0275repeaterCreate(1, Sidebar_For_9_Conditional_1_Conditional_7_For_2_Template, 4, 3, "li", null, _forTrack0);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r1 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275advance();
    \u0275\u0275repeater(item_r1.children);
  }
}
function Sidebar_For_9_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "li", 14)(1, "button", 18);
    \u0275\u0275listener("click", function Sidebar_For_9_Conditional_1_Template_button_click_1_listener() {
      \u0275\u0275restoreView(_r3);
      const item_r1 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.toggleSubmenu(item_r1));
    });
    \u0275\u0275elementStart(2, "div", 19)(3, "div", 8);
    \u0275\u0275template(4, Sidebar_For_9_Conditional_1_ng_container_4_Template, 1, 0, "ng-container", 16);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(5, Sidebar_For_9_Conditional_1_Conditional_5_Template, 2, 1, "span", 17);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(6, Sidebar_For_9_Conditional_1_Conditional_6_Template, 2, 2, ":svg:svg", 20);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(7, Sidebar_For_9_Conditional_1_Conditional_7_Template, 3, 0, "ul", 21);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r1 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("ngClass", \u0275\u0275pureFunction1(5, _c0, item_r1.expanded));
    \u0275\u0275advance(3);
    \u0275\u0275property("ngComponentOutlet", item_r1.icon ?? null);
    \u0275\u0275advance();
    \u0275\u0275conditional(!ctx_r1.collapsed ? 5 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(!ctx_r1.collapsed ? 6 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(item_r1.expanded && !ctx_r1.collapsed ? 7 : -1);
  }
}
function Sidebar_For_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, Sidebar_For_9_Conditional_0_Template, 5, 3, "li");
    \u0275\u0275conditionalCreate(1, Sidebar_For_9_Conditional_1_Template, 8, 7, "li", 14);
  }
  if (rf & 2) {
    const item_r1 = ctx.$implicit;
    \u0275\u0275conditional(!item_r1.children ? 0 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(item_r1.children ? 1 : -1);
  }
}
function Sidebar_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 10);
    \u0275\u0275text(1, "Cerrar sesi\xF3n");
    \u0275\u0275elementEnd();
  }
}
function Sidebar_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 12)(1, "div", 25);
    \u0275\u0275text(2, "SGIA");
    \u0275\u0275elementEnd();
    \u0275\u0275element(3, "div", 26);
    \u0275\u0275elementStart(4, "div", 27)(5, "p");
    \u0275\u0275text(6, "Sistema de");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "p");
    \u0275\u0275text(8, "Gesti\xF3n de la");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "p");
    \u0275\u0275text(10, "Informaci\xF3n Ambiental");
    \u0275\u0275elementEnd()()();
  }
}
var Sidebar = class _Sidebar {
  sidebarService = inject(SidebarService);
  authService = inject(AuthService);
  router = inject(Router);
  collapsed = false;
  // 🔄 Menú reactivo: se recalcula cuando cambia el perfil o roles
  menuItems = computed(() => {
    const profile = this.authService.userProfile();
    const userRoles = profile?.roles || [];
    return this.filterMenuByRole(SIDEBAR_MENU_ITEMS, userRoles);
  }, ...ngDevMode ? [{ debugName: "menuItems" }] : []);
  ngOnInit() {
    this.collapsed = !this.sidebarService.isOpen();
  }
  /**
   * Filtra el menú comparando los strings de userRoles
   * contra la propiedad .role de los objetos en requiredRoles
   */
  filterMenuByRole(items, userRoles) {
    return items.filter((item) => {
      if (!item.requiredRoles || item.requiredRoles.length === 0)
        return true;
      const requiredRolesList = item.requiredRoles.map((r) => r.role);
      return requiredRolesList.some((role) => userRoles.includes(role));
    }).map((item) => {
      if (item.children) {
        return __spreadProps(__spreadValues({}, item), {
          children: this.filterMenuByRole(item.children, userRoles)
        });
      }
      return item;
    }).filter((item) => !item.children || item.children.length > 0 || item.path);
  }
  toggleSidebar() {
    this.sidebarService.toggle();
    this.collapsed = !this.collapsed;
  }
  toggleSubmenu(item) {
    if (!this.collapsed) {
      item.expanded = !item.expanded;
    } else {
      this.collapsed = false;
      setTimeout(() => {
        item.expanded = true;
      }, 100);
    }
  }
  logout() {
    import_sweetalert22.default.fire({
      title: "\xBFCerrar sesi\xF3n?",
      text: "Se borrar\xE1n tus credenciales de acceso.",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#28367F",
      cancelButtonColor: "#d33",
      confirmButtonText: "S\xED, salir",
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
        this.authService.logout();
        this.router.navigateByUrl("/login");
      }
    });
  }
  static \u0275fac = function Sidebar_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _Sidebar)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _Sidebar, selectors: [["app-sidebar"]], decls: 17, vars: 6, consts: [[1, "bg-linear-to-br", "from-[#172030]", "via-[#28367F]", "to-[#1275BB]", "fixed", "left-4", "top-4", "z-50", "h-[calc(100vh-32px)]", "rounded-xl", "transition-all", "duration-300", "overflow-hidden", "flex", "flex-col", "shadow-2xl", 3, "ngClass"], [1, "flex", "items-center", "justify-between", "border-b", "border-white/20", "px-4", "py-4", "shrink-0"], ["routerLink", "/dashboard", 1, "cursor-pointer", "block"], [1, "w-8", "h-8", "flex", "items-center", "justify-center", "rounded-lg", "text-white", "hover:bg-white/10", "active:bg-white/30", "transition-colors", 3, "click"], [1, "flex-1", "overflow-y-auto", "px-2", "py-4", "scrollbar-hide"], [1, "flex", "flex-col", "gap-1"], [1, "px-2", "pb-4", "shrink-0", "mt-2"], [1, "w-full", "flex", "items-center", "gap-3", "px-3", "py-3", "rounded-lg", "text-white", "hover:bg-red-500/20", "active:bg-red-500/40", "transition-colors", "cursor-pointer", 3, "click"], [1, "w-6", "h-6", "flex", "items-center", "justify-center"], [1, "h-full", "w-full"], [1, "font-medium", "text-sm"], [1, "px-4", "pb-6", "shrink-0"], [1, "flex", "items-center", "space-x-2", "text-white"], ["src", "/logodondgerman.png", "alt", "logo", 1, "h-9", "object-contain"], [1, "flex", "flex-col"], ["routerLinkActive", "bg-gradient-to-tr from-blue-600 to-blue-400 shadow-lg font-bold", 1, "flex", "items-center", "gap-3", "px-3", "py-3", "rounded-lg", "text-white", "hover:bg-white/10", "transition-colors", "cursor-pointer", 3, "routerLink"], [4, "ngComponentOutlet"], [1, "font-medium", "text-sm", "capitalize", "truncate"], [1, "flex", "items-center", "justify-between", "gap-3", "px-3", "py-3", "rounded-lg", "text-white", "hover:bg-white/10", "transition-colors", "cursor-pointer", "w-full", "text-left", 3, "click", "ngClass"], [1, "flex", "items-center", "gap-3"], ["fill", "none", "viewBox", "0 0 24 24", "stroke", "currentColor", 1, "w-4", "h-4", "transition-transform", "duration-200", 3, "rotate-180"], [1, "flex", "flex-col", "gap-1", "mt-1", "ml-4", "border-l", "border-white/20", "pl-2", "transition-all", "duration-300"], ["fill", "none", "viewBox", "0 0 24 24", "stroke", "currentColor", 1, "w-4", "h-4", "transition-transform", "duration-200"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M19 9l-7 7-7-7"], ["routerLinkActive", "text-[#56B0EB] font-bold", 1, "flex", "items-center", "px-3", "py-2", "rounded-lg", "text-gray-300", "hover:text-white", "hover:bg-white/5", "transition-colors", "text-sm", 3, "routerLink"], [1, "text-[#56B0EB]", "font-bold", "text-xl"], [1, "h-8", "w-px", "bg-white/50"], [1, "text-[10px]", "leading-tight", "opacity-80"]], template: function Sidebar_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "aside", 0)(1, "div", 1);
      \u0275\u0275conditionalCreate(2, Sidebar_Conditional_2_Template, 2, 0, "a", 2);
      \u0275\u0275elementStart(3, "button", 3);
      \u0275\u0275listener("click", function Sidebar_Template_button_click_3_listener() {
        return ctx.toggleSidebar();
      });
      \u0275\u0275conditionalCreate(4, Sidebar_Conditional_4_Template, 1, 0, "app-close-sidebar-icon");
      \u0275\u0275conditionalCreate(5, Sidebar_Conditional_5_Template, 1, 0, "app-open-sidebar-icon");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(6, "nav", 4)(7, "ul", 5);
      \u0275\u0275repeaterCreate(8, Sidebar_For_9_Template, 2, 2, null, null, _forTrack0);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(10, "div", 6)(11, "button", 7);
      \u0275\u0275listener("click", function Sidebar_Template_button_click_11_listener() {
        return ctx.logout();
      });
      \u0275\u0275elementStart(12, "div", 8);
      \u0275\u0275element(13, "app-close-icon", 9);
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(14, Sidebar_Conditional_14_Template, 2, 0, "span", 10);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(15, "div", 11);
      \u0275\u0275conditionalCreate(16, Sidebar_Conditional_16_Template, 11, 0, "div", 12);
      \u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      \u0275\u0275property("ngClass", ctx.collapsed ? "w-20" : "w-72");
      \u0275\u0275advance(2);
      \u0275\u0275conditional(!ctx.collapsed ? 2 : -1);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(!ctx.collapsed ? 4 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.collapsed ? 5 : -1);
      \u0275\u0275advance(3);
      \u0275\u0275repeater(ctx.menuItems());
      \u0275\u0275advance(6);
      \u0275\u0275conditional(!ctx.collapsed ? 14 : -1);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(!ctx.collapsed ? 16 : -1);
    }
  }, dependencies: [
    CommonModule,
    NgClass,
    NgComponentOutlet,
    RouterLink,
    RouterLinkActive,
    CloseSidebarIconComponent,
    OpenSidebarIconComponent,
    CloseIconComponent
  ], styles: ["\n\naside[_ngcontent-%COMP%] {\n  transition: width 0.3s ease;\n}\naside[_ngcontent-%COMP%]   nav[_ngcontent-%COMP%]::-webkit-scrollbar {\n  width: 4px;\n}\naside[_ngcontent-%COMP%]   nav[_ngcontent-%COMP%]::-webkit-scrollbar-thumb {\n  background-color: rgba(255, 255, 255, 0.3);\n  border-radius: 2px;\n}\n/*# sourceMappingURL=sidebar.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(Sidebar, [{
    type: Component,
    args: [{ selector: "app-sidebar", standalone: true, imports: [
      CommonModule,
      RouterLink,
      RouterLinkActive,
      CloseSidebarIconComponent,
      OpenSidebarIconComponent,
      CloseIconComponent
    ], template: `<aside
  [ngClass]="collapsed ? 'w-20' : 'w-72'"
  class="bg-linear-to-br from-[#172030] via-[#28367F] to-[#1275BB] fixed left-4 top-4 z-50 h-[calc(100vh-32px)] rounded-xl transition-all duration-300 overflow-hidden flex flex-col shadow-2xl"
>
  <div
    class="flex items-center justify-between border-b border-white/20 px-4 py-4 shrink-0"
  >
    @if (!collapsed) {
      <a routerLink="/dashboard" class="cursor-pointer block">
        <img src="/logodondgerman.png" alt="logo" class="h-9 object-contain" />
      </a>
    }
    <button
      (click)="toggleSidebar()"
      class="w-8 h-8 flex items-center justify-center rounded-lg text-white hover:bg-white/10 active:bg-white/30 transition-colors"
    >
      @if (!collapsed) {
        <app-close-sidebar-icon></app-close-sidebar-icon>
      }
      @if (collapsed) {
        <app-open-sidebar-icon></app-open-sidebar-icon>
      }
    </button>
  </div>

  <nav class="flex-1 overflow-y-auto px-2 py-4 scrollbar-hide">
    <ul class="flex flex-col gap-1">
      @for (item of menuItems(); track item.label) {
        @if (!item.children) {
          <li>
            <a
              [routerLink]="item.path"
              routerLinkActive="bg-gradient-to-tr from-blue-600 to-blue-400 shadow-lg font-bold"
              class="flex items-center gap-3 px-3 py-3 rounded-lg text-white hover:bg-white/10 transition-colors cursor-pointer"
            >
              <div class="w-6 h-6 flex items-center justify-center">
                <ng-container
                  *ngComponentOutlet="item.icon ?? null"
                ></ng-container>
              </div>

              @if (!collapsed) {
                <span class="font-medium text-sm capitalize truncate">{{
                  item.label
                }}</span>
              }
            </a>
          </li>
        }

        @if (item.children) {
          <li class="flex flex-col">
            <button
              (click)="toggleSubmenu(item)"
              class="flex items-center justify-between gap-3 px-3 py-3 rounded-lg text-white hover:bg-white/10 transition-colors cursor-pointer w-full text-left"
              [ngClass]="{ 'bg-white/5': item.expanded }"
            >
              <div class="flex items-center gap-3">
                <div class="w-6 h-6 flex items-center justify-center">
                  <ng-container
                    *ngComponentOutlet="item.icon ?? null"
                  ></ng-container>
                </div>
                @if (!collapsed) {
                  <span class="font-medium text-sm capitalize truncate">{{
                    item.label
                  }}</span>
                }
              </div>

              @if (!collapsed) {
                <svg
                  class="w-4 h-4 transition-transform duration-200"
                  [class.rotate-180]="item.expanded"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              }
            </button>

            @if (item.expanded && !collapsed) {
              <ul
                class="flex flex-col gap-1 mt-1 ml-4 border-l border-white/20 pl-2 transition-all duration-300"
              >
                @for (subItem of item.children; track subItem.label) {
                  <li>
                    <a
                      [routerLink]="subItem.path"
                      routerLinkActive="text-[#56B0EB] font-bold"
                      class="flex items-center px-3 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/5 transition-colors text-sm"
                    >
                     <ng-container
                    *ngComponentOutlet="subItem.icon ?? null"
                  ></ng-container>&nbsp;&nbsp;

                      {{ subItem.label }}
                    </a>
                  </li>
                }
              </ul>
            }
          </li>
        }
      }
    </ul>
  </nav>

  <div class="px-2 pb-4 shrink-0 mt-2">
    <button
      (click)="logout()"
      class="w-full flex items-center gap-3 px-3 py-3 rounded-lg text-white hover:bg-red-500/20 active:bg-red-500/40 transition-colors cursor-pointer"
    >
      <div class="w-6 h-6 flex items-center justify-center">
        <app-close-icon class="h-full w-full"></app-close-icon>
      </div>
      @if (!collapsed) {
        <span class="font-medium text-sm">Cerrar sesi\xF3n</span>
      }
    </button>
  </div>

  <div class="px-4 pb-6 shrink-0">
    @if (!collapsed) {
      <div class="flex items-center space-x-2 text-white">
        <div class="text-[#56B0EB] font-bold text-xl">SGIA</div>
        <div class="h-8 w-px bg-white/50"></div>
        <div class="text-[10px] leading-tight opacity-80">
          <p>Sistema de</p>
          <p>Gesti\xF3n de la</p>
          <p>Informaci\xF3n Ambiental</p>
        </div>
      </div>
    }
  </div>
</aside>

`, styles: ["/* src/app/shared/components/sidebar/sidebar.css */\naside {\n  transition: width 0.3s ease;\n}\naside nav::-webkit-scrollbar {\n  width: 4px;\n}\naside nav::-webkit-scrollbar-thumb {\n  background-color: rgba(255, 255, 255, 0.3);\n  border-radius: 2px;\n}\n/*# sourceMappingURL=sidebar.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(Sidebar, { className: "Sidebar", filePath: "src/app/shared/components/sidebar/sidebar.ts", lineNumber: 27 });
})();

// src/app/shared/components/footer/footer.ts
var Footer = class _Footer {
  appVersion = environment.version;
  year = (/* @__PURE__ */ new Date()).getFullYear();
  static \u0275fac = function Footer_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _Footer)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _Footer, selectors: [["app-footer"]], decls: 9, vars: 2, consts: [[1, "bg-gray-100", "py-4", "text-center", "text-sm", "text-gray-700"], [1, "flex", "w-full", "flex-wrap", "items-center", "justify-center", "gap-6", "px-2", "md:justify-between"], [1, "block", "antialiased", "font-sans", "text-sm", "leading-normal", "font-normal", "text-inherit"], ["href", "/dashboard", 1, "transition-colors", "hover:text-blue-500"], [1, "version"]], template: function Footer_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275domElementStart(0, "footer", 0)(1, "div", 1)(2, "p", 2);
      \u0275\u0275text(3);
      \u0275\u0275domElementStart(4, "a", 3);
      \u0275\u0275text(5, "FONDO AMBIENTAL");
      \u0275\u0275domElementEnd();
      \u0275\u0275text(6, "\xA0\xA0\xA0 ");
      \u0275\u0275domElementStart(7, "span", 4);
      \u0275\u0275text(8);
      \u0275\u0275domElementEnd()()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate1(" \xA9 ", ctx.year, ", ");
      \u0275\u0275advance(5);
      \u0275\u0275textInterpolate1("Versi\xF3n ", ctx.appVersion);
    }
  }, encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(Footer, [{
    type: Component,
    args: [{ selector: "app-footer", imports: [], template: '<footer class="bg-gray-100 py-4 text-center text-sm text-gray-700">\n  <div class="flex w-full flex-wrap items-center justify-center gap-6 px-2 md:justify-between">\n    <p class="block antialiased font-sans text-sm leading-normal font-normal text-inherit">\n      \xA9 {{ year }},\n      <a href="/dashboard" class="transition-colors hover:text-blue-500">FONDO AMBIENTAL</a\n      >&nbsp;&nbsp;&nbsp;\n      <span class="version">Versi\xF3n {{ appVersion }}</span>\n    </p>\n  </div>\n</footer>\n' }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(Footer, { className: "Footer", filePath: "src/app/shared/components/footer/footer.ts", lineNumber: 10 });
})();

// src/app/shared/components/layout/layout.ts
var Layout = class _Layout {
  sidebarService = inject(SidebarService);
  static \u0275fac = function Layout_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _Layout)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _Layout, selectors: [["app-layout"]], decls: 9, vars: 2, consts: [[1, "min-h-screen", "bg-gray-50/50"], [1, "p-4", "flex", "flex-col", "min-h-screen", "transition-all", "duration-300", "ease-in-out"], [1, "sticky", "top-2", "z-50", "block", "w-full", "max-w-full", "bg-gray-50/80", "backdrop-blur-md", "border", "border-white/30", "text-white", "shadow-sm", "rounded-xl", "transition-all", "px-4", "py-2"], [1, "mt-6", "flex-1", "overflow-auto"], [1, "text-blue-gray-600", "mt-4"]], template: function Layout_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0);
      \u0275\u0275element(1, "app-sidebar");
      \u0275\u0275elementStart(2, "div", 1)(3, "nav", 2);
      \u0275\u0275element(4, "app-header");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(5, "div", 3);
      \u0275\u0275element(6, "router-outlet");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(7, "footer", 4);
      \u0275\u0275element(8, "app-footer");
      \u0275\u0275elementEnd()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(2);
      \u0275\u0275classMap(ctx.sidebarService.isOpen() ? "xl:ml-80" : "xl:ml-22");
    }
  }, dependencies: [Header, Sidebar, RouterOutlet, Footer, CommonModule], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(Layout, [{
    type: Component,
    args: [{ selector: "app-layout", imports: [Header, Sidebar, RouterOutlet, Footer, CommonModule], template: `<div class="min-h-screen bg-gray-50/50">
  <app-sidebar></app-sidebar>

  <div
    class="p-4 flex flex-col min-h-screen transition-all duration-300 ease-in-out"
    [class]="sidebarService.isOpen() ? 'xl:ml-80' : 'xl:ml-22'"
  >
    <nav
      class="sticky top-2 z-50 block w-full max-w-full bg-gray-50/80 backdrop-blur-md border border-white/30 text-white shadow-sm rounded-xl transition-all px-4 py-2"
    >
      <app-header></app-header>
    </nav>

    <div class="mt-6 flex-1 overflow-auto">
      <router-outlet></router-outlet>
    </div>

    <footer class="text-blue-gray-600 mt-4">
      <app-footer></app-footer>
    </footer>
  </div>
</div>
` }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(Layout, { className: "Layout", filePath: "src/app/shared/components/layout/layout.ts", lineNumber: 15 });
})();
export {
  Layout
};
//# sourceMappingURL=chunk-RBB5CGZ2.js.map
