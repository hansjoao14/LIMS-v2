import {
  NgxSpinnerComponent,
  NgxSpinnerModule,
  NgxSpinnerService
} from "./chunk-TWSJOXQI.js";
import "./chunk-OKN4JJTM.js";
import {
  Router
} from "./chunk-TEDJSKV5.js";
import {
  DefaultValueAccessor,
  FormsModule,
  NgControlStatus,
  NgControlStatusGroup,
  NgForm,
  NgModel,
  RequiredValidator,
  ɵNgNoValidate
} from "./chunk-J76B35JM.js";
import "./chunk-XTPUTV4O.js";
import {
  require_sweetalert2_all
} from "./chunk-TTWGDTQR.js";
import {
  AuthService,
  CommonModule,
  NgClass
} from "./chunk-FYBL3SR2.js";
import {
  Component,
  ViewChild,
  __toESM,
  setClassMetadata,
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
  ɵɵloadQuery,
  ɵɵproperty,
  ɵɵpureFunction1,
  ɵɵpureFunction2,
  ɵɵqueryRefresh,
  ɵɵreference,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵsanitizeUrl,
  ɵɵtext,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty,
  ɵɵviewQuery
} from "./chunk-4XEQTJJK.js";

// src/app/features/auth/login/login.ts
var import_sweetalert2 = __toESM(require_sweetalert2_all());

// src/app/ui/spinner/spinner.component.ts
var SpinnerComponent = class _SpinnerComponent {
  spinner;
  constructor(spinner) {
    this.spinner = spinner;
  }
  showSpinner() {
    this.spinner.show();
  }
  hideSpinner() {
    this.spinner.hide();
  }
  static \u0275fac = function SpinnerComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _SpinnerComponent)(\u0275\u0275directiveInject(NgxSpinnerService));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _SpinnerComponent, selectors: [["app-spinner"]], decls: 6, vars: 2, consts: [["bdColor", "rgba(0, 0, 0, 0.8)", "size", "large", "color", "#fff", "type", "timer", 3, "fullScreen"], [2, "color", "white"], ["bdColor", "rgba(0, 0, 0, 0.8)", "size", "large", "color", "#fff", "type", "ball-atom", 3, "fullScreen"]], template: function SpinnerComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "ngx-spinner", 0)(1, "p", 1);
      \u0275\u0275text(2, " Loading... ");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(3, "ngx-spinner", 2)(4, "p", 1);
      \u0275\u0275text(5, " Loading... ");
      \u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      \u0275\u0275property("fullScreen", true);
      \u0275\u0275advance(3);
      \u0275\u0275property("fullScreen", true);
    }
  }, dependencies: [NgxSpinnerModule, NgxSpinnerComponent], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SpinnerComponent, [{
    type: Component,
    args: [{ selector: "app-spinner", imports: [NgxSpinnerModule], template: '<ngx-spinner bdColor = "rgba(0, 0, 0, 0.8)" size = "large" color = "#fff" type = "timer" [fullScreen] = "true"><p style="color: white" > Loading... </p></ngx-spinner>\n\n\n\n<ngx-spinner  bdColor = "rgba(0, 0, 0, 0.8)" size = "large" color = "#fff" type = "ball-atom" [fullScreen] = "true"><p style="color: white" > Loading... </p></ngx-spinner>\n' }]
  }], () => [{ type: NgxSpinnerService }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(SpinnerComponent, { className: "SpinnerComponent", filePath: "src/app/ui/spinner/spinner.component.ts", lineNumber: 11 });
})();

// src/app/features/auth/login/login.ts
var _c0 = (a0, a1) => ({ "bg-yellow-400": a0, "bg-white/30": a1 });
var _c1 = (a0) => ({ "border-red-500": a0 });
function Login_Conditional_37_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 23);
    \u0275\u0275text(1, "* Usuario es obligatorio");
    \u0275\u0275elementEnd();
  }
}
function Login_Conditional_45_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 23);
    \u0275\u0275text(1, "* Contrase\xF1a es obligatoria");
    \u0275\u0275elementEnd();
  }
}
var Login = class _Login {
  authService;
  router;
  spinnerComponent;
  user = "";
  password = "";
  passwordVisible = false;
  // 🔁 Carousel
  carouselImages = ["/image 653.png", "/image 653.png", "/image 653.png"];
  currentIndex = 0;
  intervalId;
  constructor(authService, router) {
    this.authService = authService;
    this.router = router;
  }
  ngOnInit() {
    this.startCarousel();
    this.loadSavedCredentials();
  }
  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
  /**
   *  Busca si existen credenciales en el LocalStorage y las setea
   */
  loadSavedCredentials() {
    const savedUser = localStorage.getItem("user");
    const savedPass = localStorage.getItem("password");
    if (savedUser && savedPass) {
      this.user = savedUser;
      this.password = savedPass;
    }
  }
  startCarousel() {
    this.intervalId = setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % this.carouselImages.length;
    }, 4e3);
  }
  togglePassword() {
    this.passwordVisible = !this.passwordVisible;
  }
  login() {
    if (!this.user || !this.password) {
      import_sweetalert2.default.fire("Atenci\xF3n", "Por favor, ingrese sus credenciales", "warning");
      return;
    }
    this.spinnerComponent.showSpinner();
    this.authService.login(this.user, this.password).then(() => {
      localStorage.setItem("user", this.user);
      localStorage.setItem("password", this.password);
      this.spinnerComponent.hideSpinner();
      this.router.navigate(["/dashboard"]);
    }).catch((err) => {
      this.spinnerComponent.hideSpinner();
      import_sweetalert2.default.fire({
        icon: "error",
        title: "Error de autenticaci\xF3n",
        text: "Credenciales incorrectas o error de conexi\xF3n.",
        confirmButtonColor: "#28367F",
        confirmButtonText: "Aceptar"
      });
    });
  }
  static \u0275fac = function Login_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _Login)(\u0275\u0275directiveInject(AuthService), \u0275\u0275directiveInject(Router));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _Login, selectors: [["app-login"]], viewQuery: function Login_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuery(SpinnerComponent, 5);
    }
    if (rf & 2) {
      let _t;
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.spinnerComponent = _t.first);
    }
  }, decls: 49, vars: 25, consts: [["loginForm", "ngForm"], [1, "min-h-screen", "w-full", "flex", "font-sans"], [1, "w-1/2", "hidden", "lg:flex", "flex-col", "justify-center", "items-center", "text-white", "bg-linear-to-b", "from-[#172030]", "via-[#28367F]", "to-[#1275BB]", "px-16", "py-12", "space-y-12"], [1, "text-center", "w-full", "max-w-sm"], [1, "text-4xl", "font-extrabold", "mb-6"], [1, "flex", "justify-center", "items-center", "gap-4"], [1, "text-3xl", "font-extrabold", "text-[#56B0EB]", "pt-1"], [1, "h-14", "w-px", "bg-white/50"], [1, "text-sm", "leading-snug", "font-light", "text-left"], [1, "text-xl", "font-semibold", "mt-6"], [1, "flex", "flex-col", "items-center"], ["alt", "SGIA Info", 1, "w-72", "mb-4", "transition-opacity", "duration-500", 3, "src"], [1, "text-sm", "text-center"], [1, "flex", "gap-2", "mt-4"], [1, "w-2.5", "h-2.5", "rounded-full", 3, "ngClass"], [1, "w-full", "lg:w-1/2", "flex", "flex-col", "justify-center", "items-center", "bg-white", "px-10", "py-8", "relative"], [1, "absolute", "top-8", "left-8", "flex", "items-center", "gap-3"], ["src", "/quitologonew 2.png", "alt", "Quito Logo", 1, "h-25"], [1, "w-full", "max-w-md", "mt-20", "lg:mt-10"], [1, "text-2xl", "font-bold", "text-[#28367F]", "mb-6"], ["novalidate", "", 1, "space-y-4", 3, "ngSubmit"], [1, "text-sm", "font-medium", "text-gray-700"], ["name", "user", "required", "", "type", "email", "placeholder", "Ingresa aqu\xED tu Usuario", 1, "w-full", "px-4", "py-2", "mt-1", "border", "rounded", "focus:outline-none", "focus:ring-2", "focus:ring-[#28367F]", 3, "ngModelChange", "ngModel", "ngClass"], [1, "text-red-500", "text-sm", "mt-1"], [1, "relative"], ["name", "password", "required", "", "placeholder", "Ingresa aqu\xED tu Contrase\xF1a", 1, "w-full", "px-4", "py-2", "mt-1", "border", "rounded", "focus:outline-none", "focus:ring-2", "focus:ring-[#28367F]", 3, "ngModelChange", "ngModel", "type", "ngClass"], [1, "absolute", "inset-y-0", "right-3", "flex", "items-center", "text-gray-400", "cursor-pointer", 3, "click"], [1, "fa", 3, "ngClass"], ["type", "submit", 1, "w-full", "py-3", "bg-[#28367F]", "text-white", "font-semibold", "rounded", "hover:bg-blue-800", "transition"]], template: function Login_Template(rf, ctx) {
    if (rf & 1) {
      const _r1 = \u0275\u0275getCurrentView();
      \u0275\u0275elementStart(0, "div", 1)(1, "div", 2)(2, "div", 3)(3, "h1", 4);
      \u0275\u0275text(4, "BIENVENIDO A");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(5, "div", 5)(6, "p", 6);
      \u0275\u0275text(7, "SGIA");
      \u0275\u0275elementEnd();
      \u0275\u0275element(8, "div", 7);
      \u0275\u0275elementStart(9, "p", 8);
      \u0275\u0275text(10, " Sistema de");
      \u0275\u0275element(11, "br");
      \u0275\u0275text(12, " Gesti\xF3n de la");
      \u0275\u0275element(13, "br");
      \u0275\u0275text(14, " Informaci\xF3n Ambiental ");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(15, "p", 9);
      \u0275\u0275text(16, "LIMS - DMRCA");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(17, "div", 10);
      \u0275\u0275element(18, "img", 11);
      \u0275\u0275elementStart(19, "p", 12);
      \u0275\u0275text(20, "Sistema de Gesti\xF3n de Informaci\xF3n de Laboratorio (LIMS).");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(21, "div", 13);
      \u0275\u0275element(22, "div", 14)(23, "div", 14)(24, "div", 14);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(25, "div", 15)(26, "div", 16);
      \u0275\u0275element(27, "img", 17);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(28, "div", 18)(29, "h2", 19);
      \u0275\u0275text(30, "Iniciar sesi\xF3n");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(31, "form", 20, 0);
      \u0275\u0275listener("ngSubmit", function Login_Template_form_ngSubmit_31_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.login());
      });
      \u0275\u0275elementStart(33, "div")(34, "label", 21);
      \u0275\u0275text(35, "Usuario");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(36, "input", 22);
      \u0275\u0275twoWayListener("ngModelChange", function Login_Template_input_ngModelChange_36_listener($event) {
        \u0275\u0275restoreView(_r1);
        \u0275\u0275twoWayBindingSet(ctx.user, $event) || (ctx.user = $event);
        return \u0275\u0275resetView($event);
      });
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(37, Login_Conditional_37_Template, 2, 0, "p", 23);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(38, "div")(39, "label", 21);
      \u0275\u0275text(40, "Contrase\xF1a");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(41, "div", 24)(42, "input", 25);
      \u0275\u0275twoWayListener("ngModelChange", function Login_Template_input_ngModelChange_42_listener($event) {
        \u0275\u0275restoreView(_r1);
        \u0275\u0275twoWayBindingSet(ctx.password, $event) || (ctx.password = $event);
        return \u0275\u0275resetView($event);
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(43, "span", 26);
      \u0275\u0275listener("click", function Login_Template_span_click_43_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.togglePassword());
      });
      \u0275\u0275element(44, "i", 27);
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(45, Login_Conditional_45_Template, 2, 0, "p", 23);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(46, "button", 28);
      \u0275\u0275text(47, " Ingresar ");
      \u0275\u0275elementEnd()()()()();
      \u0275\u0275element(48, "app-spinner");
    }
    if (rf & 2) {
      const loginForm_r2 = \u0275\u0275reference(32);
      \u0275\u0275advance(18);
      \u0275\u0275property("src", ctx.carouselImages[ctx.currentIndex], \u0275\u0275sanitizeUrl);
      \u0275\u0275advance(4);
      \u0275\u0275property("ngClass", \u0275\u0275pureFunction2(12, _c0, ctx.currentIndex === 0, ctx.currentIndex !== 0));
      \u0275\u0275advance();
      \u0275\u0275property("ngClass", \u0275\u0275pureFunction2(15, _c0, ctx.currentIndex === 1, ctx.currentIndex !== 1));
      \u0275\u0275advance();
      \u0275\u0275property("ngClass", \u0275\u0275pureFunction2(18, _c0, ctx.currentIndex === 2, ctx.currentIndex !== 2));
      \u0275\u0275advance(12);
      \u0275\u0275twoWayProperty("ngModel", ctx.user);
      \u0275\u0275property("ngClass", \u0275\u0275pureFunction1(21, _c1, loginForm_r2.submitted && !ctx.user));
      \u0275\u0275advance();
      \u0275\u0275conditional(loginForm_r2.submitted && !ctx.user ? 37 : -1);
      \u0275\u0275advance(5);
      \u0275\u0275twoWayProperty("ngModel", ctx.password);
      \u0275\u0275property("type", ctx.passwordVisible ? "text" : "password")("ngClass", \u0275\u0275pureFunction1(23, _c1, loginForm_r2.submitted && !ctx.password));
      \u0275\u0275advance(2);
      \u0275\u0275property("ngClass", ctx.passwordVisible ? "fa-eye-slash" : "fa-eye");
      \u0275\u0275advance();
      \u0275\u0275conditional(loginForm_r2.submitted && !ctx.password ? 45 : -1);
    }
  }, dependencies: [SpinnerComponent, FormsModule, \u0275NgNoValidate, DefaultValueAccessor, NgControlStatus, NgControlStatusGroup, RequiredValidator, NgModel, NgForm, CommonModule, NgClass], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(Login, [{
    type: Component,
    args: [{ selector: "app-login", standalone: true, imports: [SpinnerComponent, FormsModule, CommonModule], template: `<!-- login-sgia.component.html -->
<div class="min-h-screen w-full flex font-sans">
  <!-- PANEL IZQUIERDO CENTRADO -->
  <div
    class="w-1/2 hidden lg:flex flex-col justify-center items-center text-white bg-linear-to-b from-[#172030] via-[#28367F] to-[#1275BB] px-16 py-12 space-y-12"
  >
    <!-- Encabezado SGIA -->
 <div class="text-center w-full max-w-sm">
  <h1 class="text-4xl font-extrabold mb-6">BIENVENIDO A</h1>

  <div class="flex justify-center items-center gap-4">
    <p class="text-3xl font-extrabold text-[#56B0EB] pt-1">SGIA</p>
    
    <div class="h-14 w-px bg-white/50"></div>
    
    <p class="text-sm leading-snug font-light text-left">
      Sistema de<br />
      Gesti\xF3n de la<br />
      Informaci\xF3n Ambiental
    </p>
  </div>

  <p class="text-xl font-semibold mt-6">LIMS - DMRCA</p>
</div>

    <!-- Imagen inferior -->
    <div class="flex flex-col items-center">
      <img
        [src]="carouselImages[currentIndex]"
        alt="SGIA Info"
        class="w-72 mb-4 transition-opacity duration-500"
      />

      <p class="text-sm text-center">Sistema de Gesti\xF3n de Informaci\xF3n de Laboratorio (LIMS).</p>

      <div class="flex gap-2 mt-4">
        <div
          class="w-2.5 h-2.5 rounded-full"
          [ngClass]="{
            'bg-yellow-400': currentIndex === 0,
            'bg-white/30': currentIndex !== 0,
          }"
        ></div>
        <div
          class="w-2.5 h-2.5 rounded-full"
          [ngClass]="{
            'bg-yellow-400': currentIndex === 1,
            'bg-white/30': currentIndex !== 1,
          }"
        ></div>
        <div
          class="w-2.5 h-2.5 rounded-full"
          [ngClass]="{
            'bg-yellow-400': currentIndex === 2,
            'bg-white/30': currentIndex !== 2,
          }"
        ></div>
      </div>
    </div>
  </div>

  <!-- PANEL DERECHO (formulario) -->
  <div
    class="w-full lg:w-1/2 flex flex-col justify-center items-center bg-white px-10 py-8 relative"
  >
    <!-- Logo Quito esquina superior izquierda -->
    <div class="absolute top-8 left-8 flex items-center gap-3">
      <img src="/quitologonew 2.png" alt="Quito Logo" class="h-25" />
    </div>

    <!-- Formulario de acceso -->
    <div class="w-full max-w-md mt-20 lg:mt-10">
      <h2 class="text-2xl font-bold text-[#28367F] mb-6">Iniciar sesi\xF3n</h2>

      <form #loginForm="ngForm" (ngSubmit)="login()" class="space-y-4" novalidate>
        <!-- Usuario -->
        <div>
          <label class="text-sm font-medium text-gray-700">Usuario</label>
          <input
            [(ngModel)]="user"
            name="user"
            required
            type="email"
            placeholder="Ingresa aqu\xED tu Usuario"
            class="w-full px-4 py-2 mt-1 border rounded focus:outline-none focus:ring-2 focus:ring-[#28367F]"
            [ngClass]="{ 'border-red-500': loginForm.submitted && !user }"
          />
          @if (loginForm.submitted && !user) {
            <p class="text-red-500 text-sm mt-1">* Usuario es obligatorio</p>
          }
        </div>

        <!-- Contrase\xF1a -->
        <div>
          <label class="text-sm font-medium text-gray-700">Contrase\xF1a</label>
          <div class="relative">
            <input
              [(ngModel)]="password"
              name="password"
              [type]="passwordVisible ? 'text' : 'password'"
              required
              placeholder="Ingresa aqu\xED tu Contrase\xF1a"
              class="w-full px-4 py-2 mt-1 border rounded focus:outline-none focus:ring-2 focus:ring-[#28367F]"
              [ngClass]="{ 'border-red-500': loginForm.submitted && !password }"
            />
            <span
              (click)="togglePassword()"
              class="absolute inset-y-0 right-3 flex items-center text-gray-400 cursor-pointer"
            >
              <i class="fa" [ngClass]="passwordVisible ? 'fa-eye-slash' : 'fa-eye'"></i>
            </span>
          </div>
          @if (loginForm.submitted && !password) {
            <p class="text-red-500 text-sm mt-1">* Contrase\xF1a es obligatoria</p>
          }
        </div>

        <!-- Bot\xF3n -->
        <button
          type="submit"
          class="w-full py-3 bg-[#28367F] text-white font-semibold rounded hover:bg-blue-800 transition"
        >
          Ingresar
        </button>

        <!-- Enlace -->
        <!--     <div class="text-left">
          <a router-link="/login" class="text-sm text-[#1275BB] hover:underline"
            >\xBFOlvidaste tu usuario?</a
          >
        </div> -->
      </form>
    </div>
  </div>
</div>
<app-spinner></app-spinner>
` }]
  }], () => [{ type: AuthService }, { type: Router }], { spinnerComponent: [{
    type: ViewChild,
    args: [SpinnerComponent]
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(Login, { className: "Login", filePath: "src/app/features/auth/login/login.ts", lineNumber: 16 });
})();
export {
  Login
};
//# sourceMappingURL=chunk-KC7S2VBP.js.map
