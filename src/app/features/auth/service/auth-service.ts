import { HttpClient } from '@angular/common/http';
import { computed, Injectable, signal } from '@angular/core';
import { Subscription, lastValueFrom, Observable, throwError, tap, catchError, timer } from 'rxjs';
import { environment } from '../../../../environments/environment';

export interface UserData {
  email: string;
  name: string;
  roles: string[];
  cargo?: string;
  jefatura?: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private API_URL = environment.api_login_kc;
  private refreshIntervalSub?: Subscription;

  // 1. Estado Reactivo (Signals)
  userProfile = signal<UserData | null>(null);

  // 2. Computed values
  currentUser = computed(() => ({
    id: '32BADAE5-44E8-4417-9247-E900ED8250B5',
    nombre: this.userProfile()?.name ?? '',
    email: this.userProfile()?.email ?? 'juan.perez@company.com',
  }));

  isAdmin = computed(() => this.userProfile()?.roles.includes('admin') ?? false);
  isManager = computed(() => this.userProfile()?.roles.includes('manager') ?? false);

  constructor(private http: HttpClient) {
    this.loadProfileFromStorage();
    if (this.rawAccessToken && !this.isTokenExpired()) {
      this.startAutoRefresh();
    }
  }

  // ============================================================
  // 🔓 MÉTODOS PÚBLICOS
  // ============================================================

  public getCurrentUser(): UserData | null {
    return this.userProfile();
  }

  get rawAccessToken(): string | null {
    return localStorage.getItem('access_token');
  }

  public isTokenExpired(): boolean {
    const token = this.rawAccessToken;
    if (!token) return true;

    try {
      const payload = token.split('.')[1];
      if (!payload) return true;

      const decoded = JSON.parse(window.atob(payload));
      if (!decoded.exp) return true;

      const expirationDate = decoded.exp * 1000;
      // Expira si faltan menos de 10 segundos
      return Date.now() > (expirationDate - 10000);
    } catch (e) {
      return true;
    }
  }

  async login(username: string, password: string): Promise<any> {
    const body = { username, password };
    try {
      const response: any = await lastValueFrom(
        this.http.post(`${this.API_URL}/login`, body)
      );

      this.saveTokens(response);
      this.startAutoRefresh();
      return response;
    } catch (error: any) {
      console.error('❌ Error de autenticación:', error);
      throw error;
    }
  }

  refreshToken(): Observable<any> {
    const refresh_token = localStorage.getItem('refresh_token');
    if (!refresh_token) {
      this.logout();
      return throwError(() => new Error('No refresh token found'));
    }

    return this.http.post(`${this.API_URL}/refresh`, { refresh_token }).pipe(
      tap((response: any) => {
        this.saveTokens(response);
        this.startAutoRefresh();
      }),
      catchError((error) => {
        this.logout();
        return throwError(() => error);
      })
    );
  }

  logout(): void {
    this.stopAutoRefresh();
    const refresh_token = localStorage.getItem('refresh_token');

    this.clearTokens();
    this.userProfile.set(null);

    if (refresh_token) {
      this.http.post(`${this.API_URL}/logout`, { refresh_token }).subscribe({
        error: (err) => console.warn('Backend logout failed', err)
      });
    }
  }

  hasRole(role: string): boolean {
    return this.userProfile()?.roles.includes(role) || false;
  }

  // ============================================================
  // 🔒 MÉTODOS PRIVADOS Y HELPERS
  // ============================================================

  private saveTokens(data: any) {
    if (data.access_token) {
      localStorage.setItem('access_token', data.access_token);
      this.decodeAndSaveProfile(data.access_token);
    }
    if (data.refresh_token) localStorage.setItem('refresh_token', data.refresh_token);
    if (data.id_token) localStorage.setItem('id_token', data.id_token);
  }

  private decodeAndSaveProfile(token: string) {
    try {
      const payload = token.split('.')[1];
      const decoded = JSON.parse(window.atob(payload));

      const profile: UserData = {
        email: decoded.email,
        name: decoded.name || decoded.preferred_username,
        roles: decoded.realm_access?.roles || [],
        // Captura de atributos personalizados de Keycloak
        cargo: decoded.cargo || 'Analista de Laboratorio',
        jefatura: decoded.jefatura || 'Dirección Metropolitana Regulación y Control Ambiental'
      };

      this.userProfile.set(profile);

      // Sincronización con LocalStorage
      localStorage.setItem('user_email', profile.email || '');
      localStorage.setItem('user_name', profile.name || '');
      localStorage.setItem('user_cargo', profile.cargo || '');
      localStorage.setItem('user_jefatura', profile.jefatura || '');
      localStorage.setItem('user_roles', JSON.stringify(profile.roles));

    } catch (error) {
      console.error('Error decodificando token:', error);
    }
  }

  private loadProfileFromStorage() {
    const token = this.rawAccessToken;
    if (token) {
      this.decodeAndSaveProfile(token);
    }
  }

  private clearTokens() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('user_email');
    localStorage.removeItem('user_name');
    localStorage.removeItem('user_cargo');
    localStorage.removeItem('user_jefatura');
    localStorage.removeItem('user_roles');
  }

  private startAutoRefresh() {
    this.stopAutoRefresh();
    // Refrescar cada 14 minutos (asumiendo que el token dura 15)
    const intervalMs = 14 * 60 * 1000;

    this.refreshIntervalSub = timer(intervalMs, intervalMs).subscribe(() => {
      this.refreshToken().subscribe({
        error: () => this.stopAutoRefresh()
      });
    });
  }

  private stopAutoRefresh() {
    if (this.refreshIntervalSub) {
      this.refreshIntervalSub.unsubscribe();
      this.refreshIntervalSub = undefined;
    }
  }

}
