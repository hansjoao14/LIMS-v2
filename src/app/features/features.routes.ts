import { Routes } from '@angular/router';
import { canActivateWithRealmRoles } from '../core/guards/roles.guard';

/**
 * Defines the feature routes for the application.
 */
export const featuresRoutes: Routes = [
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./dashboard/dashboard').then((m) => m.Dashboard),
    // ✅ Habilitado
    canActivate: [canActivateWithRealmRoles],
    data: {
      title: 'Dashboard',
      // ✅ Habilitado (Ajusta los roles según necesites)
      requiredRoles: [
        { role: 'manager' },
        { role: 'admin' },
        { role: 'gestor' },
      ],
    },
  },
 
];