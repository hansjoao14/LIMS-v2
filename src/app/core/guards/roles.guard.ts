import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../features/auth/service/auth-service';
import Swal from 'sweetalert2'; // 👈 Importamos Swal

export const canActivateWithRealmRoles: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // 1. Validar si hay Token
  if (!authService.rawAccessToken || authService.isTokenExpired()) {
    Swal.fire({
      icon: 'warning',
      title: 'Sesión expirada',
      text: 'Por favor, inicia sesión nuevamente.',
      confirmButtonColor: '#28367F',
    });
    return router.createUrlTree(['/login']);
  }

  const requiredRolesConfig = route.data['requiredRoles'] as Array<{ role: string }> | undefined;
  if (!requiredRolesConfig || requiredRolesConfig.length === 0) return true;

  let userRoles = authService.userProfile()?.roles;
  if (!userRoles) {
    const storedRoles = localStorage.getItem('user_roles');
    userRoles = storedRoles ? JSON.parse(storedRoles) : [];
  }

  const requiredRolesList = requiredRolesConfig.map((r) => r.role);
  const hasRole = userRoles?.some((role) => requiredRolesList.includes(role));

  // DEBUG LOGS
  // console.group('Roles Guard Debug');
  // console.log('Roles Requeridos:', requiredRolesList);
  // console.log('Roles Usuario:', userRoles);
  console.groupEnd();

  if (hasRole) {
    return true;
  }

  // 2. DISPARAR ALERTA SI NO TIENE ROLES
  console.error('Acceso Denegado: Roles insuficientes.');

  Swal.fire({
    icon: 'error',
    title: 'Acceso Denegado',
    text: `No tienes los permisos necesarios para acceder a esta sección. Se requieren roles: ${requiredRolesList.join(', ')}`,
    confirmButtonColor: '#28367F',
    confirmButtonText: 'Entendido',
  });

  return router.createUrlTree(['/login']);
};
