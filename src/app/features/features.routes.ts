import { Routes } from '@angular/router';
import { canActivateWithRealmRoles } from '../core/guards/roles.guard';

/**
 * Defines the feature routes for the application.
 */
export const featuresRoutes: Routes = [
  {
    path: 'dashboard',
    loadComponent: () => import('./dashboard/dashboard').then((m) => m.Dashboard),
    // ✅ Habilitado
    canActivate: [canActivateWithRealmRoles],
    data: {
      title: 'Dashboard',
      // ✅ Habilitado (Ajusta los roles según necesites)
      requiredRoles: [{ role: 'manager' }, { role: 'admin' }, { role: 'gestor' }],
    },
  },
  {
    path: 'solicitud-trabajo',
    loadComponent: () =>
      import('./solicitud-trabajo/solicitud-trabajo').then((m) => m.SolicitudTrabajo),
    // ✅ Habilitado
    canActivate: [canActivateWithRealmRoles],
    data: {
      title: 'Solicitud de Trabajo',
      // ✅ Habilitado (Ajusta los roles según necesites)
      requiredRoles: [{ role: 'admin' }, { role: 'gestor' }],
    },
  },

  {
    path: 'lista-solicitudes',
    loadComponent: () =>
      import('./lista-solicitudes/lista-solicitudes').then((m) => m.ListaSolicitudes),
    // ✅ Habilitado
    canActivate: [canActivateWithRealmRoles],
    data: {
      title: 'Lista de Solicitudes',
      // ✅ Habilitado (Ajusta los roles según necesites)
      requiredRoles: [ { role: 'admin' }, { role: 'gestor' }],
    },
  },

  {
    path: 'horarios-laborales',
    loadComponent: () =>
      import('./horarios-laborales/horarios-laborales').then((m) => m.HorariosLaborales),
    // ✅ Habilitado
    canActivate: [canActivateWithRealmRoles],
    data: {
      title: 'Horarios Laborales',
      // ✅ Habilitado (Ajusta los roles según necesites)
      requiredRoles: [{ role: 'admin' }, { role: 'gestor' }],
    },
  },

  {
    path: 'por-contraloria',
    loadComponent: () => import('./por-contraloria/por-contraloria').then((m) => m.PorContraloria),
    // ✅ Habilitado
    canActivate: [canActivateWithRealmRoles],
    data: {
      title: 'Por Contraloría',
      // ✅ Habilitado (Ajusta los roles según necesites)
      requiredRoles: [{ role: 'admin' }, { role: 'gestor' }],
    },
  },

   {
    path: 'orden-trabajo-in-situ',
    loadComponent: () => import('./orden-trabajo-in-situ/orden-trabajo-in-situ').then((m) => m.OrdenTrabajoInSitu),
    // ✅ Habilitado
    canActivate: [canActivateWithRealmRoles],
    data: {
      title: 'Orden de Trabajo In Situ',
      // ✅ Habilitado (Ajusta los roles según necesites)
      requiredRoles: [{ role: 'manager' }, { role: 'admin' }, { role: 'gestor' }],
    },
  },

   {
    path: 'plan-muestreo',
    loadComponent: () => import('./plan-muestreo/plan-muestreo').then((m) => m.PlanMuestreo),
    // ✅ Habilitado
    canActivate: [canActivateWithRealmRoles],
    data: {
      title: 'Plan de Muestreo',
      // ✅ Habilitado (Ajusta los roles según necesites)
      requiredRoles: [{ role: 'manager' }, { role: 'admin' }, { role: 'gestor' }],
    },
  },
];
