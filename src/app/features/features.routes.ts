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
    data: { title: 'Administración de Formularios' },
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
    loadComponent: () => import('./plan-muestreo/plan-muestreo').then((m) => m.PlanMuestreo),
    canActivate: [canActivateWithRealmRoles],
    data: { title: 'Plan de Muestreo', requiredRoles: RoleAccess.PLAN_MUESTREO },
  },
  {
    path: 'plan-muestreo/paso2',
    loadComponent: () => import('./plan-muestreo/plan-muestreo-paso2').then((m) => m.PlanMuestreoPaso2),
    canActivate: [canActivateWithRealmRoles],
    data: { title: 'Plan de Muestreo - Paso 2', requiredRoles: RoleAccess.PLAN_MUESTREO },
  },
  {
    path: 'plan-muestreo/paso3',
    loadComponent: () => import('./plan-muestreo/plan-muestreo-paso3').then((m) => m.PlanMuestreoPaso3),
    canActivate: [canActivateWithRealmRoles],
    data: { title: 'Plan de Muestreo - Paso 3', requiredRoles: RoleAccess.PLAN_MUESTREO },
  },
];
