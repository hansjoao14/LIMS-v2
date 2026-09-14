import { Routes } from '@angular/router';
import { canActivateWithRealmRoles } from '../core/guards/roles.guard';
import { RoleAccess } from '../core/utils/roles.constans';

/**
 * Defines the feature routes for the application using centralized RoleAccess.
 */
export const featuresRoutes: Routes = [
  {
    path: 'dashboard',
    loadComponent: () => import('./dashboard/dashboard').then((m) => m.Dashboard),
    canActivate: [canActivateWithRealmRoles],
    data: { title: 'Dashboard', requiredRoles: RoleAccess.ALL_USERS },
  },
  {
    path: 'solicitud-trabajo',
    loadComponent: () =>
      import('./solicitud-trabajo/solicitud-trabajo').then((m) => m.SolicitudTrabajo),
    canActivate: [canActivateWithRealmRoles],
    data: { title: 'Solicitud de Trabajo', requiredRoles: RoleAccess.SOLICITUD_TRABAJO },
  },
  {
    path: 'admin-formularios',
    loadComponent: () =>
      import('./formularios/admin-formularios/admin-formularios').then((m) => m.AdminFormularios),
    canActivate: [canActivateWithRealmRoles],
    data: { title: 'Administración de Formularios', requiredRoles: RoleAccess.ADMIN_ONLY },
  },
  {
    path: 'lista-solicitudes',
    loadComponent: () =>
      import('./lista-solicitudes/lista-solicitudes').then((m) => m.ListaSolicitudes),
    canActivate: [canActivateWithRealmRoles],
    data: { title: 'Lista de Solicitudes', requiredRoles: RoleAccess.LISTA_SOLICITUDES },
  },
  {
    path: 'lista-cotizaciones',
    loadComponent: () =>
      import('./lista-cotizaciones/lista-cotizaciones').then((m) => m.ListaCotizaciones),
    canActivate: [canActivateWithRealmRoles],
    data: { title: 'Por Autorizar', requiredRoles: RoleAccess.LISTA_COTIZACIONES },
  },
  {
    path: 'horarios-laborales',
    loadComponent: () =>
      import('./horarios-laborales/horarios-laborales').then((m) => m.HorariosLaborales),
    canActivate: [canActivateWithRealmRoles],
    data: { title: 'Horarios Laborales', requiredRoles: RoleAccess.HORARIOS_LABORALES },
  },
  {
    path: 'por-contraloria',
    loadComponent: () => import('./por-contraloria/por-contraloria').then((m) => m.PorContraloria),
    canActivate: [canActivateWithRealmRoles],
    data: { title: 'Por Contraloría', requiredRoles: RoleAccess.POR_CONTRALORIA },
  },
  {
    path: 'orden-trabajo-in-situ',
    loadComponent: () =>
      import('./orden-trabajo-in-situ/orden-trabajo-in-situ').then((m) => m.OrdenTrabajoInSitu),
    canActivate: [canActivateWithRealmRoles],
    data: { title: 'Orden de Trabajo In Situ', requiredRoles: RoleAccess.ORDEN_IN_SITU },
  },
  {
    path: 'plan-muestreo',
    loadComponent: () =>
      import('./plan-muestreo/lista/plan-muestreo-lista').then((m) => m.PlanMuestreoLista),
    canActivate: [canActivateWithRealmRoles],
    data: { title: 'Plan de Muestreo', requiredRoles: RoleAccess.PLAN_MUESTREO },
  },
  {
    path: 'plan-muestreo/nuevo',
    loadComponent: () =>
      import('./plan-muestreo/steps/step1-solicitud/step1-solicitud').then(
        (m) => m.Step1SolicitudComponent,
      ),
    canActivate: [canActivateWithRealmRoles],
    data: { title: 'Plan de Muestreo - Paso 1', requiredRoles: RoleAccess.PLAN_MUESTREO_CREAR },
  },
  {
    path: 'plan-muestreo/paso2',
    loadComponent: () =>
      import('./plan-muestreo/steps/step2-planificacion/step2-planificacion').then(
        (m) => m.Step2PlanificacionComponent,
      ),
    canActivate: [canActivateWithRealmRoles],
    data: { title: 'Plan de Muestreo - Paso 2', requiredRoles: RoleAccess.PLAN_MUESTREO_CREAR },
  },
  {
    path: 'plan-muestreo/paso3',
    loadComponent: () =>
      import('./plan-muestreo/steps/step3-procedimiento/step3-procedimiento').then(
        (m) => m.Step3ProcedimientoComponent,
      ),
    canActivate: [canActivateWithRealmRoles],
    data: { title: 'Plan de Muestreo - Paso 3', requiredRoles: RoleAccess.PLAN_MUESTREO_CREAR },
  },
  {
    path: 'ticket-entrega-muestras',
    loadComponent: () =>
      import('./ticket-entrega-muestras/lista/ticket-entrega-muestras-lista').then(
        (m) => m.TicketEntregaMuestrasLista,
      ),
    canActivate: [canActivateWithRealmRoles],
    data: {
      title: 'Ticket de Entrega de Muestras',
      requiredRoles: RoleAccess.TICKET_ENTREGA_MUESTRAS,
    },
  },
  {
    path: 'ticket-entrega-muestras/nuevo',
    loadComponent: () =>
      import('./ticket-entrega-muestras/ticket-entrega-muestras').then(
        (m) => m.TicketEntregaMuestras,
      ),
    canActivate: [canActivateWithRealmRoles],
    data: {
      title: 'Ticket de Entrega de Muestras - Nuevo',
      requiredRoles: RoleAccess.TICKET_ENTREGA_MUESTRAS_CREAR,
    },
  },
  {
    path: 'calibracion-equipos',
    loadComponent: () =>
      import('./calibracion-equipos/calibracion-equipos').then((m) => m.CalibracionEquipos),
    canActivate: [canActivateWithRealmRoles],
    data: { title: 'Calibración de Equipos', requiredRoles: RoleAccess.CALIBRACION_EQUIPOS },
  },
  {
    path: 'gases-combustion',
    loadComponent: () =>
      import('./gases-combustion/lista/gases-combustion-lista').then((m) => m.GasesCombustionLista),
    canActivate: [canActivateWithRealmRoles],
    data: {
      title: 'Registro de Verificación - Gases de Combustión',
      requiredRoles: RoleAccess.GASES_COMBUSTION,
    },
  },
  {
    path: 'gases-combustion/nuevo',
    loadComponent: () =>
      import('./gases-combustion/gases-combustion').then((m) => m.GasesCombustion),
    canActivate: [canActivateWithRealmRoles],
    data: {
      title: 'Gases de Combustión - Nueva Verificación',
      requiredRoles: RoleAccess.GASES_COMBUSTION_CREAR,
    },
  },
  {
    // Editar. Va después de 'nuevo' para que ese literal gane sobre el :id.
    path: 'gases-combustion/:id',
    loadComponent: () =>
      import('./gases-combustion/gases-combustion').then((m) => m.GasesCombustion),
    canActivate: [canActivateWithRealmRoles],
    data: {
      title: 'Gases de Combustión - Editar Verificación',
      requiredRoles: RoleAccess.GASES_COMBUSTION_CREAR,
    },
  },
  {
    path: 'admin-catalogos',
    loadComponent: () => import('./admin-catalogos/admin-catalogos').then((m) => m.AdminCatalogos),
    canActivate: [canActivateWithRealmRoles],
    data: { title: 'Administración de Catálogos', requiredRoles: RoleAccess.ADMIN_CATALOGOS },
  },
  {
    path: 'admin-ensayos',
    loadComponent: () => import('./admin-ensayos/admin-ensayos').then((m) => m.AdminEnsayos),
    canActivate: [canActivateWithRealmRoles],
    data: { title: 'Administración de Ensayos', requiredRoles: RoleAccess.ADMIN_ENSAYOS },
  },
  {
    path: 'secuencial',
    loadComponent: () => import('./secuencial/secuencial').then((m) => m.Secuencial),
    canActivate: [canActivateWithRealmRoles],
    data: { title: 'Administración de Secuenciales', requiredRoles: RoleAccess.SECUENCIAL },
  },
];
