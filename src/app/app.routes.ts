import { Routes } from '@angular/router';
import { featuresRoutes } from './features/features.routes';

export const routes: Routes = [
    {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },

  {
    path: '',
    loadComponent: () => import('./shared/components/layout/layout').then(m => m.Layout),
    children: featuresRoutes,
  },
  {
    path: 'login',
    loadComponent: () => import('./features/auth/login/login').then(m => m.Login),
    // canActivate: [AuthenticatedGuard]
    data: {
      title: 'Login',
    },
  },
];