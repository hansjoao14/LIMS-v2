// src/app/core/utils/roles.constans.ts
var AppRole;
(function(AppRole2) {
  AppRole2["ADMIN"] = "admin_lims";
  AppRole2["TECNICO_DIRECCION"] = "tecnico_direccion_unidad";
  AppRole2["ANALISTA_CALIDAD"] = "analista_calidad";
  AppRole2["RESPONSABLE_LAB"] = "responsable_laboratorio";
  AppRole2["ANALISTA_CAMPO"] = "analista_campo";
  AppRole2["ANALISTA_LAB"] = "analista_laboratorio";
})(AppRole || (AppRole = {}));
var MenuKey;
(function(MenuKey2) {
  MenuKey2["DASHBOARD"] = "DASHBOARD";
  MenuKey2["SOLICITUD_TRABAJO"] = "SOLICITUD_TRABAJO";
  MenuKey2["LISTA_SOLICITUDES"] = "LISTA_SOLICITUDES";
  MenuKey2["LISTA_COTIZACIONES"] = "LISTA_COTIZACIONES";
  MenuKey2["HORARIOS_LABORALES"] = "HORARIOS_LABORALES";
  MenuKey2["POR_CONTRALORIA"] = "POR_CONTRALORIA";
  MenuKey2["ORDEN_TRABAJO_IN_SITU"] = "ORDEN_TRABAJO_IN_SITU";
  MenuKey2["PLAN_MUESTREO"] = "PLAN_MUESTREO";
  MenuKey2["CALIBRACION_EQUIPOS"] = "CALIBRACION_EQUIPOS";
})(MenuKey || (MenuKey = {}));
var MENU_PERMISSIONS = {
  // Inicio de sesión / Dashboard
  [MenuKey.DASHBOARD]: {
    [AppRole.TECNICO_DIRECCION]: ["ver", "editar"],
    [AppRole.ANALISTA_CALIDAD]: ["ver", "editar"],
    [AppRole.RESPONSABLE_LAB]: ["ver", "editar"],
    [AppRole.ANALISTA_CAMPO]: ["ver", "editar"],
    [AppRole.ANALISTA_LAB]: ["ver", "editar"],
    [AppRole.ADMIN]: ["ver", "editar", "eliminar", "crear", "autorizar", "rechazar"]
  },
  // Solicitud de Trabajo – Ensayos F-PG-09-08
  [MenuKey.SOLICITUD_TRABAJO]: {
    [AppRole.TECNICO_DIRECCION]: ["ver", "editar", "crear"],
    [AppRole.ANALISTA_CALIDAD]: ["ver"],
    [AppRole.RESPONSABLE_LAB]: ["ver", "autorizar", "rechazar"],
    [AppRole.ADMIN]: ["ver", "eliminar"]
  },
  // Bandeja de Solicitudes — hereda acciones de SOLICITUD_TRABAJO
  [MenuKey.LISTA_SOLICITUDES]: {
    [AppRole.TECNICO_DIRECCION]: ["ver", "editar"],
    [AppRole.ANALISTA_CALIDAD]: ["ver"],
    [AppRole.RESPONSABLE_LAB]: ["ver", "autorizar", "rechazar"],
    [AppRole.ADMIN]: ["ver", "eliminar"]
  },
  // Por Autorizar (solicitudes pending authorization)
  [MenuKey.LISTA_COTIZACIONES]: {
    [AppRole.RESPONSABLE_LAB]: ["ver", "autorizar", "rechazar"],
    [AppRole.ADMIN]: ["ver"]
  },
  // Matriz de planificación vehicular semanal
  [MenuKey.HORARIOS_LABORALES]: {
    [AppRole.ANALISTA_CALIDAD]: ["ver"],
    [AppRole.RESPONSABLE_LAB]: ["ver", "editar", "crear", "autorizar", "rechazar"],
    [AppRole.ANALISTA_CAMPO]: ["ver"],
    [AppRole.ANALISTA_LAB]: ["ver"],
    [AppRole.ADMIN]: ["ver", "eliminar"]
  },
  // Matriz de datos para la emisión de orden de movilización (Contraloría)
  [MenuKey.POR_CONTRALORIA]: {
    [AppRole.ANALISTA_CALIDAD]: ["ver"],
    [AppRole.RESPONSABLE_LAB]: ["ver", "editar", "crear", "autorizar", "rechazar"],
    [AppRole.ANALISTA_CAMPO]: ["ver"],
    [AppRole.ANALISTA_LAB]: ["ver"],
    [AppRole.ADMIN]: ["ver", "eliminar"]
  },
  // Orden de trabajo in situ F-PG-09-03
  [MenuKey.ORDEN_TRABAJO_IN_SITU]: {
    [AppRole.ANALISTA_CALIDAD]: ["ver"],
    [AppRole.RESPONSABLE_LAB]: ["ver", "editar", "crear", "autorizar", "rechazar"],
    [AppRole.ANALISTA_CAMPO]: ["ver"],
    [AppRole.ANALISTA_LAB]: ["ver"],
    [AppRole.ADMIN]: ["ver", "eliminar"]
  },
  // Plan de muestreo F-PEE-42-01
  [MenuKey.PLAN_MUESTREO]: {
    [AppRole.ANALISTA_CALIDAD]: ["ver"],
    [AppRole.RESPONSABLE_LAB]: ["ver", "editar", "crear", "autorizar", "rechazar"],
    [AppRole.ANALISTA_CAMPO]: ["ver"],
    [AppRole.ANALISTA_LAB]: ["ver"],
    [AppRole.ADMIN]: ["ver", "eliminar"]
  },
  // Calibración de equipos F-PEE-11-02
  [MenuKey.CALIBRACION_EQUIPOS]: {
    [AppRole.ANALISTA_CALIDAD]: ["ver"],
    [AppRole.RESPONSABLE_LAB]: ["ver", "editar", "crear", "eliminar"],
    [AppRole.ANALISTA_CAMPO]: ["ver"],
    [AppRole.ANALISTA_LAB]: ["ver", "editar", "crear"],
    [AppRole.ADMIN]: ["ver", "editar", "crear", "eliminar"]
  }
};
var rolesWithAccess = (menuKey) => Object.keys(MENU_PERMISSIONS[menuKey]).map((role) => ({ role }));
var rolesWithAction = (menuKey, action) => Object.entries(MENU_PERMISSIONS[menuKey]).filter(([, actions]) => actions.includes(action)).map(([role]) => ({ role }));
var RoleAccess = {
  ALL_USERS: rolesWithAccess(MenuKey.DASHBOARD),
  SOLICITUD_TRABAJO: rolesWithAction(MenuKey.SOLICITUD_TRABAJO, "crear"),
  LISTA_SOLICITUDES: rolesWithAccess(MenuKey.LISTA_SOLICITUDES),
  LISTA_COTIZACIONES: rolesWithAccess(MenuKey.LISTA_COTIZACIONES),
  HORARIOS_LABORALES: rolesWithAccess(MenuKey.HORARIOS_LABORALES),
  POR_CONTRALORIA: rolesWithAccess(MenuKey.POR_CONTRALORIA),
  ORDEN_IN_SITU: rolesWithAccess(MenuKey.ORDEN_TRABAJO_IN_SITU),
  PLAN_MUESTREO: rolesWithAccess(MenuKey.PLAN_MUESTREO),
  CALIBRACION_EQUIPOS: rolesWithAccess(MenuKey.CALIBRACION_EQUIPOS),
  ADMIN_ONLY: [{ role: AppRole.ADMIN }]
};
function hasPermission(menuKey, role, action) {
  return MENU_PERMISSIONS[menuKey]?.[role]?.includes(action) ?? false;
}

export {
  AppRole,
  MenuKey,
  MENU_PERMISSIONS,
  RoleAccess,
  hasPermission
};
//# sourceMappingURL=chunk-O4XHAB45.js.map
