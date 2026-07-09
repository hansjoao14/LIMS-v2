// ─── Roles (values must match Keycloak realm role names) ────────────────────
export enum AppRole {
  ADMIN              = 'admin_lims',               // AD  – Administrador
  TECNICO_DIRECCION  = 'tecnico_direccion_unidad',  // T   – Técnico de Dirección/Unidad
  ANALISTA_CALIDAD   = 'analista_calidad',          // ACAL – Analista de calidad
  RESPONSABLE_LAB    = 'responsable_laboratorio',   // RLAB – Responsable de laboratorio
  ANALISTA_CAMPO     = 'analista_campo',            // AC  – Analista de campo
  ANALISTA_LAB       = 'analista_laboratorio',      // AL  – Analista de laboratorio
}

// ─── Menu identifiers ────────────────────────────────────────────────────────
export enum MenuKey {
  DASHBOARD              = 'DASHBOARD',
  SOLICITUD_TRABAJO      = 'SOLICITUD_TRABAJO',
  LISTA_SOLICITUDES      = 'LISTA_SOLICITUDES',
  LISTA_COTIZACIONES     = 'LISTA_COTIZACIONES',
  HORARIOS_LABORALES     = 'HORARIOS_LABORALES',
  POR_CONTRALORIA        = 'POR_CONTRALORIA',
  ORDEN_TRABAJO_IN_SITU  = 'ORDEN_TRABAJO_IN_SITU',
  PLAN_MUESTREO          = 'PLAN_MUESTREO',
  CALIBRACION_EQUIPOS    = 'CALIBRACION_EQUIPOS',
  ADMIN_CATALOGOS        = 'ADMIN_CATALOGOS',
  ADMIN_ENSAYOS          = 'ADMIN_ENSAYOS',
  SECUENCIAL             = 'SECUENCIAL',
}

// ─── Actions ─────────────────────────────────────────────────────────────────
export type Action = 'ver' | 'editar' | 'eliminar' | 'crear' | 'autorizar' | 'rechazar';

// ─── Permission matrix (from F-PG-09 access control table) ───────────────────
export const MENU_PERMISSIONS: Record<MenuKey, Partial<Record<AppRole, Action[]>>> = {

  // Inicio de sesión / Dashboard
  [MenuKey.DASHBOARD]: {
    [AppRole.TECNICO_DIRECCION]: ['ver', 'editar'],
    [AppRole.ANALISTA_CALIDAD]:  ['ver', 'editar'],
    [AppRole.RESPONSABLE_LAB]:   ['ver', 'editar'],
    [AppRole.ANALISTA_CAMPO]:    ['ver', 'editar'],
    [AppRole.ANALISTA_LAB]:      ['ver', 'editar'],
    [AppRole.ADMIN]:             ['ver', 'editar', 'eliminar', 'crear', 'autorizar', 'rechazar'],
  },

  // Solicitud de Trabajo – Ensayos F-PG-09-08
  [MenuKey.SOLICITUD_TRABAJO]: {
    [AppRole.TECNICO_DIRECCION]: ['ver', 'editar', 'crear'],
    [AppRole.ANALISTA_CALIDAD]:  ['ver'],
    [AppRole.RESPONSABLE_LAB]:   ['ver', 'autorizar', 'rechazar'],
    [AppRole.ADMIN]:             ['ver', 'eliminar'],
  },

  // Bandeja de Solicitudes — hereda acciones de SOLICITUD_TRABAJO
  [MenuKey.LISTA_SOLICITUDES]: {
    [AppRole.TECNICO_DIRECCION]: ['ver', 'editar'],
    [AppRole.ANALISTA_CALIDAD]:  ['ver'],
    [AppRole.RESPONSABLE_LAB]:   ['ver', 'autorizar', 'rechazar'],
    [AppRole.ADMIN]:             ['ver', 'eliminar'],
  },

  // Por Autorizar (solicitudes pending authorization)
  [MenuKey.LISTA_COTIZACIONES]: {
    [AppRole.RESPONSABLE_LAB]: ['ver', 'autorizar', 'rechazar'],
    [AppRole.ADMIN]:           ['ver'],
  },

  // Matriz de planificación vehicular semanal
  [MenuKey.HORARIOS_LABORALES]: {
    [AppRole.ANALISTA_CALIDAD]: ['ver'],
    [AppRole.RESPONSABLE_LAB]:  ['ver', 'editar', 'crear', 'autorizar', 'rechazar'],
    [AppRole.ANALISTA_CAMPO]:   ['ver'],
    [AppRole.ANALISTA_LAB]:     ['ver'],
    [AppRole.ADMIN]:            ['ver', 'eliminar'],
  },

  // Matriz de datos para la emisión de orden de movilización (Contraloría)
  [MenuKey.POR_CONTRALORIA]: {
    [AppRole.ANALISTA_CALIDAD]: ['ver'],
    [AppRole.RESPONSABLE_LAB]:  ['ver', 'editar', 'crear', 'autorizar', 'rechazar'],
    [AppRole.ANALISTA_CAMPO]:   ['ver'],
    [AppRole.ANALISTA_LAB]:     ['ver'],
    [AppRole.ADMIN]:            ['ver', 'eliminar'],
  },

  // Orden de trabajo in situ F-PG-09-03
  [MenuKey.ORDEN_TRABAJO_IN_SITU]: {
    [AppRole.ANALISTA_CALIDAD]: ['ver'],
    [AppRole.RESPONSABLE_LAB]:  ['ver', 'editar', 'crear', 'autorizar', 'rechazar'],
    [AppRole.ANALISTA_CAMPO]:   ['ver'],
    [AppRole.ANALISTA_LAB]:     ['ver'],
    [AppRole.ADMIN]:            ['ver', 'eliminar'],
  },

  // Plan de muestreo F-PEE-42-01
  [MenuKey.PLAN_MUESTREO]: {
    [AppRole.ANALISTA_CALIDAD]: ['ver'],
    [AppRole.RESPONSABLE_LAB]:  ['ver', 'editar', 'crear', 'autorizar', 'rechazar'],
    [AppRole.ANALISTA_CAMPO]:   ['ver'],
    [AppRole.ANALISTA_LAB]:     ['ver'],
    [AppRole.ADMIN]:            ['ver', 'eliminar'],
  },

  // Calibración de equipos F-PEE-11-02
  [MenuKey.CALIBRACION_EQUIPOS]: {
    [AppRole.ANALISTA_CALIDAD]: ['ver'],
    [AppRole.RESPONSABLE_LAB]:  ['ver', 'editar', 'crear', 'eliminar'],
    [AppRole.ANALISTA_CAMPO]:   ['ver'],
    [AppRole.ANALISTA_LAB]:     ['ver', 'editar', 'crear'],
    [AppRole.ADMIN]:            ['ver', 'editar', 'crear', 'eliminar'],
  },

  // Administración de catálogos e ítems
  [MenuKey.ADMIN_CATALOGOS]: {
    [AppRole.ADMIN]: ['ver', 'editar', 'crear', 'eliminar'],
  },

  // Administración de ensayos
  [MenuKey.ADMIN_ENSAYOS]: {
    [AppRole.ADMIN]: ['ver', 'editar', 'crear', 'eliminar'],
  },

  // Administración de secuenciales
  [MenuKey.SECUENCIAL]: {
    [AppRole.ADMIN]: ['ver', 'editar', 'crear', 'eliminar'],
  },
};

// ─── Route-guard groups (who can access the route at all) ────────────────────
const rolesWithAccess = (menuKey: MenuKey) =>
  (Object.keys(MENU_PERMISSIONS[menuKey]) as AppRole[]).map((role) => ({ role }));

const rolesWithAction = (menuKey: MenuKey, action: Action) =>
  (Object.entries(MENU_PERMISSIONS[menuKey]) as [AppRole, Action[]][])
    .filter(([, actions]) => actions.includes(action))
    .map(([role]) => ({ role }));

export const RoleAccess = {
  ALL_USERS:          rolesWithAccess(MenuKey.DASHBOARD),
  SOLICITUD_TRABAJO:  rolesWithAction(MenuKey.SOLICITUD_TRABAJO, 'crear'),
  LISTA_SOLICITUDES:  rolesWithAccess(MenuKey.LISTA_SOLICITUDES),
  LISTA_COTIZACIONES: rolesWithAccess(MenuKey.LISTA_COTIZACIONES),
  HORARIOS_LABORALES: rolesWithAccess(MenuKey.HORARIOS_LABORALES),
  POR_CONTRALORIA:    rolesWithAccess(MenuKey.POR_CONTRALORIA),
  ORDEN_IN_SITU:          rolesWithAccess(MenuKey.ORDEN_TRABAJO_IN_SITU),
  PLAN_MUESTREO:          rolesWithAccess(MenuKey.PLAN_MUESTREO),
  CALIBRACION_EQUIPOS:    rolesWithAccess(MenuKey.CALIBRACION_EQUIPOS),
  ADMIN_CATALOGOS:        rolesWithAccess(MenuKey.ADMIN_CATALOGOS),
  ADMIN_ENSAYOS:          rolesWithAccess(MenuKey.ADMIN_ENSAYOS),
  SECUENCIAL:             rolesWithAccess(MenuKey.SECUENCIAL),
  ADMIN_ONLY:             [{ role: AppRole.ADMIN }],
};

// ─── Helper ───────────────────────────────────────────────────────────────────
export function hasPermission(menuKey: MenuKey, role: AppRole, action: Action): boolean {
  return MENU_PERMISSIONS[menuKey]?.[role]?.includes(action) ?? false;
}
