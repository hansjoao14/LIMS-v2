import {
  HttpInterceptorFn,
  HttpRequest,
  HttpHandlerFn,
  HttpErrorResponse,
} from '@angular/common/http';
import { inject } from '@angular/core';

import { catchError, switchMap, throwError, BehaviorSubject, filter, take, of } from 'rxjs';
import { AuthService } from '../../../features/auth/service/auth-service';

let isRefreshing = false;
const refreshTokenSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(
  null,
);

export const tokenRefreshInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
) => {
  const authService = inject(AuthService);
  const token = authService.rawAccessToken;

  // 1. ESTRATEGIA PREVENTIVA: Si sabemos que está vencido, no lo enviamos.
  if (token && authService.isTokenExpired()) {
    return handleTokenRefresh(req, next, authService);
  }

  let authReq = req;
  if (token) {
    authReq = addToken(req, token);
  }

  return next(authReq).pipe(
    catchError((error) => {
      // 2. ESTRATEGIA DE RESCATE: Analizamos el error devuelto
      const isUnauthorized =
        error instanceof HttpErrorResponse &&
        // Caso A: Típico 401
        (error.status === 401 ||
          // Caso B: GraphQL/NestJS con mensaje 'Unauthorized' en array
          (error.status === 400 && error.error?.errors?.[0]?.message === 'Unauthorized') ||
          // Caso C: GraphQL/NestJS con mensaje 'Unauthorized' directo
          (error.status === 400 && error.error?.message === 'Unauthorized') ||
          // 🔥 CASO D: El error específico que te salió ahora
          error.error?.error === 'Token is not active');

      if (isUnauthorized) {
        return handleTokenRefresh(authReq, next, authService);
      }

      return throwError(() => error);
    }),
  );
};

// ==========================================
// HELPERS
// ==========================================

const addToken = (request: HttpRequest<any>, token: string) => {
  return request.clone({
    setHeaders: { Authorization: `Bearer ${token}` },
  });
};

const handleTokenRefresh = (
  request: HttpRequest<any>,
  next: HttpHandlerFn,
  authService: AuthService,
) => {
  if (!isRefreshing) {
    isRefreshing = true;
    refreshTokenSubject.next(null);

    return authService.refreshToken().pipe(
      switchMap((response: any) => {
        isRefreshing = false;
        // Soporte para diferentes formatos de respuesta
        const newToken = response.access_token || response;
        refreshTokenSubject.next(newToken);
        return next(addToken(request, newToken));
      }),
      catchError((err) => {
        isRefreshing = false;
        // Si el refresh también falla, no hay nada más que hacer -> Logout
        authService.logout();
        return throwError(() => err);
      }),
    );
  } else {
    return refreshTokenSubject.pipe(
      filter((token) => token != null),
      take(1),
      switchMap((jwt) => {
        return next(addToken(request, jwt!));
      }),
    );
  }
};
