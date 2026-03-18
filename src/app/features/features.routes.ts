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
    data: {
      title: 'Dashboard',
      requiredRoles: RoleAccess.ALL_USERS, // Permite: admin, direccion, analista, tecnico, responsable
    },
  },
  {
    path: 'solicitud-trabajo',
    loadComponent: () =>
      import('./solicitud-trabajo/solicitud-trabajo').then((m) => m.SolicitudTrabajo),
    canActivate: [canActivateWithRealmRoles],
    data: {
      title: 'Solicitud de Trabajo',
      requiredRoles: RoleAccess.MANAGEMENT, // Permite: admin, direccion, analista
    },
  },
  {
    path: 'lista-solicitudes',
    loadComponent: () =>
      import('./lista-solicitudes/lista-solicitudes').then((m) => m.ListaSolicitudes),
    canActivate: [canActivateWithRealmRoles],
    data: {
      title: 'Lista de Solicitudes',
      requiredRoles: RoleAccess.MANAGEMENT, // Permite: admin, direccion, analista
    },
  },
  {
    path: 'horarios-laborales',
    loadComponent: () =>
      import('./horarios-laborales/horarios-laborales').then((m) => m.HorariosLaborales),
    canActivate: [canActivateWithRealmRoles],
    data: {
      title: 'Horarios Laborales',
      requiredRoles: RoleAccess.ADMIN_ONLY, // Solo Administradores
    },
  },
  {
    path: 'por-contraloria',
    loadComponent: () => import('./por-contraloria/por-contraloria').then((m) => m.PorContraloria),
    canActivate: [canActivateWithRealmRoles],
    data: {
      title: 'Por Contraloría',
      requiredRoles: RoleAccess.MANAGEMENT, // Permite: admin, direccion, analista
    },
  },
  {
    path: 'orden-trabajo-in-situ',
    loadComponent: () => 
      import('./orden-trabajo-in-situ/orden-trabajo-in-situ').then((m) => m.OrdenTrabajoInSitu),
    canActivate: [canActivateWithRealmRoles],
    data: {
      title: 'Orden de Trabajo In Situ',
      requiredRoles: RoleAccess.OPERATIONAL, // Permite: admin, tecnico, responsable_campo
    },
  },
  {
    path: 'plan-muestreo',
    loadComponent: () => import('./plan-muestreo/plan-muestreo').then((m) => m.PlanMuestreo),
    canActivate: [canActivateWithRealmRoles],
    data: {
      title: 'Plan de Muestreo',
      requiredRoles: RoleAccess.OPERATIONAL, // Permite: admin, tecnico, responsable_campo
    },
  },
];