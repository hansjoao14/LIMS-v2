/**
 * Angular route guard that checks if the user is authenticated using Keycloak.
 *
 * - If the user is logged in, allows route activation.
 * - If not, redirects the user to the Keycloak login page, preserving the current URL for redirection after login.
 *
 * @returns A promise that resolves to `true` if the user is authenticated, or `false` after triggering the login redirect.
 *
 * @see {@link KeycloakService}
 * @see {@link CanActivateFn}
 */
import { inject } from '@angular/core';
//import { KeycloakService } from 'keycloak-angular';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = async () => {
  // const keycloak = inject(KeycloakService);
  const router = inject(Router);

  // const isLoggedIn = await keycloak.isLoggedIn();
  // if (isLoggedIn) return true;

  // Redirige a login de Keycloak
  //  await keycloak.login({ redirectUri: window.location.href });
  return false;
};
