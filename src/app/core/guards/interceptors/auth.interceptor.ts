/**
 * HTTP interceptor that adds an Authorization header with a Bearer token
 * to outgoing HTTP requests if a valid access token is available.
 *
 * This interceptor retrieves the raw access token from the `AuthService`
 * and clones the request to include the token in the `Authorization` header.
 * If no token is present, the request is sent without modification.
 *
 * @example
 * // Automatically attaches the Authorization header to HTTP requests:
 * this.http.get('/api/protected-resource');
 *
 * @see AuthService
 * @see HttpInterceptor
 */
import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../../../features/auth/service/auth-service';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private auth: AuthService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = this.auth.rawAccessToken; // 🔥 de tu servicio Auth

    if (token) {
      const cloned = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
      return next.handle(cloned);
    }

    return next.handle(req);
  }
}
