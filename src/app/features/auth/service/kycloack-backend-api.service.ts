import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

import { Apollo, gql } from 'apollo-angular';
import { environment } from '../../../../environments/environment';

// 1. Interfaz base del usuario
export interface UsuarioSetup {
  usuario: string;
  keycloak_id: string;
  nombre: string;
  apellido: string;
  email: string;
  entidad_id: number | null;
  is_completed: boolean;
}

export interface UpdateUsuarioPayload {
  usuario?: string;
  keycloak_id?: string;
  nombre?: string;
  apellido?: string;
  email?: string;
  estado?: number;
  entidad_id?: number;
  is_completed?: boolean;
}

// 2. Interfaz para el rol dentro del payload
export interface RolPayload {
  nombre: string;
  descripcion: string;
}

// Puedes reutilizar la interfaz Meta de tu entidades.service si prefieres
export interface MetaData {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  skip: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  nextPage: number | null;
  prevPage: number | null;
}

export interface UsuarioKeycloakResult {
  rows: any[]; // Aquí puedes poner una interfaz estricta si tienes el modelo creado
  count: number;
  meta: MetaData;
}
// 3. Interfaz del payload completo esperado por tu API
export interface CreateUsuarioRolPayload {
  usuarioKeycloak: UsuarioSetup;
  rol: RolPayload[];
}

@Injectable({
  providedIn: 'root',
})
export class KycloackBackendApiService {
  private apiUrl = environment.apiUrl; // Usando la variable de tu environment

  public usuarioActualSignal = signal<any | null>(null);

  constructor(
    private http: HttpClient,
    private apollo: Apollo,
  ) {}

  // 👉 2. MÉTODO QUE LLENA EL SIGNAL
  cargarUsuarioGlobal(email: string) {
    this.getUsuariosKeycloakGql(undefined, {
      where: { email: { equals: email } },
      take: 1,
    }).subscribe({
      next: (res) => {
        if (res.rows && res.rows.length > 0) {
          // Guardamos todo tu JSON en el Signal de forma global
          this.usuarioActualSignal.set(res.rows[0]);
        }
      },
      error: (err) => console.error('Error cargando usuario global', err),
    });
  }

  /*  //  Agregamos 'id?: number' como parámetro opcional
  getUsuariosKeycloakGql(id?: number, params?: {
    page?: number; take?: number; where?: any; sort?: any; select?: any;
  }): Observable<UsuarioKeycloakResult> {
    
    // 1. Definimos la consulta GraphQL
    const query = gql`
      query CollectionUsuarioKeycloak($query: UsuarioKeycloakQueryInput) {
        collectionUsuarioKeycloak(query: $query) { 
          data 
          count 
          meta 
        }
      }
    `;

    // 2. Lógica dinámica para el WHERE
    // Si te pasan un params.where previo, lo respetamos, sino inicializamos un objeto vacío
    let finalWhere = params?.where || {};

    // Si viene un ID, lo inyectamos en el where
    if (id) {
      finalWhere = { ...finalWhere, id: { equals: id } };
    }

    // Verificamos si el objeto finalWhere tiene llaves para decidir si lo enviamos o no
    const hasWhere = Object.keys(finalWhere).length > 0;

    // 3. Construimos las variables
    const variables = {
      query: {
        select: {
          id: true,
          usuario: true,
          keycloak_id: true,
          nombre: true,
          apellido: true,
          email: true,
          estado: true,
          entidad_id: true,
          is_completed: true,
          entidadSelect: { 
            id: true, 
            nombre: true 
          },
          ...(params?.select ?? {}),
        },
        ...(hasWhere ? { where: finalWhere } : {}), // 👉 Si no hay where, esto no se envía
        ...(params?.sort ? { sort: params.sort } : {}),
        ...(params?.page ? { page: params.page } : {}),
        ...(params?.take ? { take: params.take } : {}),
      },
    };

    // 4. Ejecutamos la consulta
    return this.apollo
      .watchQuery<{ collectionUsuarioKeycloak: { data: any[]; count: number; meta: MetaData } }>({
        query,
        variables,
        fetchPolicy: 'network-only',
      })
      .valueChanges.pipe(
        map(res => {
          const payload = res.data.collectionUsuarioKeycloak;
          return {
            rows: payload?.data ?? [],
            count: payload?.count ?? 0,
            meta: payload?.meta as MetaData,
          };
        })
      );
  } */

  // Agregamos 'id?: number' como parámetro opcional
  getUsuariosKeycloakGql(
    id?: number,
    params?: {
      page?: number;
      take?: number;
      where?: any;
      sort?: any;
      select?: any;
    },
  ): Observable<UsuarioKeycloakResult> {
    // Mismo estándar que tu SectorEntidad
    const page = params?.page ?? 1;
    const take = params?.take ?? 10;
    const skip = (page - 1) * take; // Transformamos la página para que el backend la entienda

    const QUERY = gql`
      query CollectionUsuarioKeycloak($query: UsuarioKeycloakQueryInput) {
        collectionUsuarioKeycloak(query: $query) {
          data
          count
          meta
        }
      }
    `;

    let finalWhere = params?.where || {};
    if (id) finalWhere = { ...finalWhere, id: { equals: id } };
    const hasWhere = Object.keys(finalWhere).length > 0;

    const variables = {
      query: {
        select: {
          id: true,
          usuario: true,
          keycloak_id: true,
          nombre: true,
          apellido: true,
          email: true,
          estado: true,
          entidad_id: true,
          is_completed: true,
          entidadSelect: { id: true, nombre: true },
          ...(params?.select ?? {}),
        },
        ...(hasWhere ? { where: finalWhere } : {}),
        ...(params?.sort ? { sort: params.sort } : {}),
        take,
        skip, // Obligamos al backend a saltar registros
      },
    };

    return this.apollo
      .query<{ collectionUsuarioKeycloak: { data: any[]; count: number; meta: MetaData } }>({
        query: QUERY,
        variables,
        fetchPolicy: 'no-cache', // 👉 LA MAGIA DE TU PROYECTO PARA QUE NO REPITA LA PÁG 1
      })
      .pipe(
        map((res) => {
          const payload = res.data?.collectionUsuarioKeycloak;
          return {
            rows: payload?.data ?? [],
            count: payload?.count ?? 0,
            meta: payload?.meta as MetaData,
          };
        }),
      );
  }
  decodificarToken(token: string): any {
    try {
      const payload = token.split('.')[1];
      return JSON.parse(window.atob(payload));
    } catch (e) {
      console.error('Error al decodificar el token', e);
      return null;
    }
  }

  // 👉 Nuevo Endpoint y Payload
  completarPerfilUsuario(payload: CreateUsuarioRolPayload): Observable<any> {
    return this.http.post(`${this.apiUrl}usuario-keycloak/create-rol`, payload);
  }

  actualizarUsuario(id: number, payload: Partial<UpdateUsuarioPayload>): Observable<any> {
    // Nota: Usamos put, pero si tu backend en NestJS usa @Patch(), simplemente cambia .put por .patch
    return this.http.put(`${this.apiUrl}usuario-keycloak/update/${id}`, payload);
  }
}
