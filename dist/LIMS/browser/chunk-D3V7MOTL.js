import {
  RouterLink,
  RouterModule
} from "./chunk-TEDJSKV5.js";
import "./chunk-XTPUTV4O.js";
import {
  AppRole,
  MENU_PERMISSIONS,
  MenuKey
} from "./chunk-O4XHAB45.js";
import {
  AuthService,
  CommonModule
} from "./chunk-FYBL3SR2.js";
import {
  Component,
  computed,
  inject,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵdefineComponent,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵproperty,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵtext,
  ɵɵtextInterpolate
} from "./chunk-4XEQTJJK.js";

// src/app/features/dashboard/dashboard.ts
var _forTrack0 = ($index, $item) => $item.title;
function Dashboard_For_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 8)(1, "div", 10);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 11)(4, "h3");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "p");
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "div", 12)(9, "span");
    \u0275\u0275text(10, "Ingresar");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "i", 13);
    \u0275\u0275text(12, "\u2192");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const item_r1 = ctx.$implicit;
    \u0275\u0275property("routerLink", item_r1.route);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r1.icon);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(item_r1.title);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r1.desc);
  }
}
function Dashboard_ForEmpty_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 9)(1, "p");
    \u0275\u0275text(2, "No tienes m\xF3dulos asignados a tu rol actual.");
    \u0275\u0275elementEnd()();
  }
}
var Dashboard = class _Dashboard {
  authService = inject(AuthService);
  allModulos = [
    {
      title: "Solicitud de Trabajo",
      route: "/solicitud-trabajo",
      icon: "\u{1F4DD}",
      desc: "Gesti\xF3n de requerimientos t\xE9cnicos",
      menuKey: MenuKey.SOLICITUD_TRABAJO
    },
    {
      title: "Bandeja de Solicitudes",
      route: "/lista-solicitudes",
      icon: "\u{1F4CB}",
      desc: "Seguimiento de estados y procesos",
      menuKey: MenuKey.LISTA_SOLICITUDES
    },
    {
      title: "Por Autorizar",
      route: "/lista-cotizaciones",
      icon: "\u2705",
      desc: "Solicitudes pendientes de autorizaci\xF3n",
      menuKey: MenuKey.LISTA_COTIZACIONES
    },
    {
      title: "Horarios Laborales",
      route: "/horarios-laborales",
      icon: "\u{1F4C5}",
      desc: "Programaci\xF3n semanal de flota",
      menuKey: MenuKey.HORARIOS_LABORALES
    },
    {
      title: "Por Contralor\xEDa",
      route: "/por-contraloria",
      icon: "\u2696\uFE0F",
      desc: "Orden de movilizaci\xF3n y control",
      menuKey: MenuKey.POR_CONTRALORIA
    },
    {
      title: "Orden de Trabajo In Situ",
      route: "/orden-trabajo-in-situ",
      icon: "\u{1F6E0}\uFE0F",
      desc: "Operaciones directas en campo",
      menuKey: MenuKey.ORDEN_TRABAJO_IN_SITU
    },
    {
      title: "Plan de Muestreo",
      route: "/plan-muestreo",
      icon: "\u{1F9EA}",
      desc: "Planificaci\xF3n de toma de muestras",
      menuKey: MenuKey.PLAN_MUESTREO
    },
    {
      title: "Administraci\xF3n de Formularios",
      route: "/admin-formularios",
      icon: "\u2699\uFE0F",
      desc: "Gesti\xF3n de formularios del sistema",
      menuKey: null,
      adminOnly: true
    }
  ];
  modulosVisibles = computed(() => {
    const roles = this.authService.userProfile()?.roles ?? [];
    const userRole = Object.values(AppRole).find((r) => roles.includes(r)) ?? null;
    if (!userRole)
      return [];
    return this.allModulos.filter((modulo) => {
      if (modulo.adminOnly)
        return userRole === AppRole.ADMIN;
      if (!modulo.menuKey)
        return false;
      return userRole in MENU_PERMISSIONS[modulo.menuKey];
    });
  }, ...ngDevMode ? [{ debugName: "modulosVisibles" }] : []);
  static \u0275fac = function Dashboard_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _Dashboard)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _Dashboard, selectors: [["app-dashboard"]], decls: 14, vars: 1, consts: [[1, "p-6", "bg-slate-50", "min-h-screen", "text-slate-700", "font-sans", "pb-24"], [1, "max-w-7xl", "mx-auto"], [1, "animate-in", "fade-in"], [1, "mb-10"], [1, "text-3xl", "font-light", "text-[#1d2b64]"], [1, "font-extrabold", "text-[#2a41a3]"], [1, "text-slate-500", "mt-2", "text-[15px]"], [1, "grid", "grid-cols-1", "md:grid-cols-2", "lg:grid-cols-3", "gap-6"], [1, "card-item", 3, "routerLink"], [1, "col-span-3", "p-10", "text-slate-400", "italic", "text-center"], [1, "card-icon"], [1, "card-body"], [1, "card-footer"], [1, "arrow-icon"]], template: function Dashboard_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "div", 3)(4, "h1", 4);
      \u0275\u0275text(5, " Panel Principal ");
      \u0275\u0275elementStart(6, "span", 5);
      \u0275\u0275text(7, "SGIA");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(8, "p", 6);
      \u0275\u0275text(9, " Bienvenido al Sistema de Gesti\xF3n Institucional Ambiental. Seleccione un m\xF3dulo para continuar. ");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(10, "div", 7);
      \u0275\u0275repeaterCreate(11, Dashboard_For_12_Template, 13, 4, "a", 8, _forTrack0, false, Dashboard_ForEmpty_13_Template, 3, 0, "div", 9);
      \u0275\u0275elementEnd()()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(11);
      \u0275\u0275repeater(ctx.modulosVisibles());
    }
  }, dependencies: [CommonModule, RouterModule, RouterLink], styles: ["\n\n.card-item[_ngcontent-%COMP%] {\n  text-decoration: none;\n  background: #ffffff;\n  border-radius: 12px;\n  padding: 24px;\n  display: flex;\n  flex-direction: column;\n  transition: all 0.3s ease;\n  border: 1px solid #e2e8f0;\n  position: relative;\n  overflow: hidden;\n}\n.card-item[_ngcontent-%COMP%]:hover {\n  transform: translateY(-5px);\n  box-shadow: 0 12px 20px -5px rgba(0, 0, 0, 0.1);\n  border-color: #1d2b64;\n}\n.card-icon[_ngcontent-%COMP%] {\n  font-size: 32px;\n  margin-bottom: 16px;\n  background: #f1f5f9;\n  width: 60px;\n  height: 60px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border-radius: 10px;\n}\n.card-body[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  color: #1e293b;\n  font-size: 18px;\n  margin: 0 0 8px 0;\n  font-weight: 600;\n}\n.card-body[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: #64748b;\n  font-size: 14px;\n  line-height: 1.5;\n  margin-bottom: 20px;\n}\n.card-footer[_ngcontent-%COMP%] {\n  margin-top: auto;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  color: #1d2b64;\n  font-weight: bold;\n  font-size: 13px;\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n}\n.arrow-icon[_ngcontent-%COMP%] {\n  transition: transform 0.3s ease;\n}\n.card-item[_ngcontent-%COMP%]:hover   .arrow-icon[_ngcontent-%COMP%] {\n  transform: translateX(5px);\n}\n/*# sourceMappingURL=dashboard.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(Dashboard, [{
    type: Component,
    args: [{ selector: "app-dashboard", standalone: true, imports: [CommonModule, RouterModule], template: '<div class="p-6 bg-slate-50 min-h-screen text-slate-700 font-sans pb-24">\n  <div class="max-w-7xl mx-auto">\n    <div class="animate-in fade-in">\n\n      <div class="mb-10">\n        <h1 class="text-3xl font-light text-[#1d2b64]">\n          Panel Principal <span class="font-extrabold text-[#2a41a3]">SGIA</span>\n        </h1>\n        <p class="text-slate-500 mt-2 text-[15px]">\n          Bienvenido al Sistema de Gesti\xF3n Institucional Ambiental. Seleccione un m\xF3dulo para continuar.\n        </p>\n      </div>\n\n      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">\n        @for (item of modulosVisibles(); track item.title) {\n          <a [routerLink]="item.route" class="card-item">\n            <div class="card-icon">{{ item.icon }}</div>\n            <div class="card-body">\n              <h3>{{ item.title }}</h3>\n              <p>{{ item.desc }}</p>\n            </div>\n            <div class="card-footer">\n              <span>Ingresar</span>\n              <i class="arrow-icon">\u2192</i>\n            </div>\n          </a>\n        } @empty {\n          <div class="col-span-3 p-10 text-slate-400 italic text-center">\n            <p>No tienes m\xF3dulos asignados a tu rol actual.</p>\n          </div>\n        }\n      </div>\n\n    </div>\n  </div>\n</div>\n', styles: ["/* src/app/features/dashboard/dashboard.css */\n.card-item {\n  text-decoration: none;\n  background: #ffffff;\n  border-radius: 12px;\n  padding: 24px;\n  display: flex;\n  flex-direction: column;\n  transition: all 0.3s ease;\n  border: 1px solid #e2e8f0;\n  position: relative;\n  overflow: hidden;\n}\n.card-item:hover {\n  transform: translateY(-5px);\n  box-shadow: 0 12px 20px -5px rgba(0, 0, 0, 0.1);\n  border-color: #1d2b64;\n}\n.card-icon {\n  font-size: 32px;\n  margin-bottom: 16px;\n  background: #f1f5f9;\n  width: 60px;\n  height: 60px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border-radius: 10px;\n}\n.card-body h3 {\n  color: #1e293b;\n  font-size: 18px;\n  margin: 0 0 8px 0;\n  font-weight: 600;\n}\n.card-body p {\n  color: #64748b;\n  font-size: 14px;\n  line-height: 1.5;\n  margin-bottom: 20px;\n}\n.card-footer {\n  margin-top: auto;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  color: #1d2b64;\n  font-weight: bold;\n  font-size: 13px;\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n}\n.arrow-icon {\n  transition: transform 0.3s ease;\n}\n.card-item:hover .arrow-icon {\n  transform: translateX(5px);\n}\n/*# sourceMappingURL=dashboard.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(Dashboard, { className: "Dashboard", filePath: "src/app/features/dashboard/dashboard.ts", lineNumber: 23 });
})();
export {
  Dashboard
};
//# sourceMappingURL=chunk-D3V7MOTL.js.map
