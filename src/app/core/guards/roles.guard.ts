import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../features/auth/service/auth-service';

export const canActivateWithRealmRoles: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // 1. Validar si hay Token (Si no, al Login)
  if (!authService.rawAccessToken || authService.isTokenExpired()) {
    console.warn('⛔ Guard: No hay token o expiró. Redirigiendo al Login.');
    return router.createUrlTree(['/login']);
  }

  // 2. Obtener roles requeridos desde la ruta (features.routes.ts)
  // La ruta tiene: data: { requiredRoles: [{ role: 'admin' }] }
  const requiredRolesConfig = route.data['requiredRoles'] as Array<{ role: string }> | undefined;

  // Si la ruta NO pide roles, dejamos pasar (pública o solo autenticada)
  if (!requiredRolesConfig || requiredRolesConfig.length === 0) {
    return true;
  }

  // 3. Obtener roles del usuario desde el AuthService
  // Intentamos obtenerlo del perfil reactivo, si es nulo, buscamos en localStorage
  let userRoles = authService.userProfile()?.roles;

  if (!userRoles) {
    // Fallback: Si se recargó la página y el signal está vacío, leemos de localStorage
    const storedRoles = localStorage.getItem('user_roles');
    if (storedRoles) {
      userRoles = JSON.parse(storedRoles);
    } else {
      userRoles = [];
    }
  }

  // 4. Lógica de Comparación (Crucial)
  // Convertimos la config [{role: 'admin'}] a un array simple ['admin'] para comparar fácil
  const requiredRolesList = requiredRolesConfig.map((r) => r.role);

  // Verificamos si el usuario tiene AL MENOS UNO de los roles requeridos
  const hasRole = userRoles?.some((role) => requiredRolesList.includes(role));

  console.group('Roles Guard Debug');
  console.log('Ruta:', route.routeConfig?.path);
  console.log('Roles Requeridos:', requiredRolesList);
  console.log('Roles Usuario:', userRoles);
  console.log('¿Permitido?:', hasRole);
  console.groupEnd();

  if (hasRole) {
    return true;
  }

  // 5. Si falla, redirigir a una página de "Prohibido" o al Dashboard
  console.error('⛔ Acceso Denegado: Roles insuficientes.');

  // Opción A: Mandar a una página de error 403
  // return router.createUrlTree(['/forbidden']);

  // Opción B: Mandar al home/dashboard si ya está logueado pero no tiene permiso
  return router.createUrlTree(['/login']);
};
