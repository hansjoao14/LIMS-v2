import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, delay, of, shareReplay } from 'rxjs';

import { environment } from '../../../environments/environment';
import {
  CatalogoPatrones,
  CriterioAceptacion,
  DefinicionGases,
  GasesCombustionMetadata,
  GuardarGasesCombustionPayload,
  GuardarGasesCombustionResponse,
  RegistroGasesCombustion,
} from '../../interfaces/gases-combustion/gases-combustion.interface';
import {
  CATALOGO_PATRONES_MOCK,
  CRITERIOS_MOCK,
  DEFINICIONES_MOCK,
  METADATA_MOCK,
  REGISTRO_MOCK,
} from './gases-combustion.mock';

/**
 * Registro de Verificación de Gases de Combustión (F-PEE-07-01).
 *
 * ⚠️ Estado: la pantalla ya está terminada, el backend del módulo todavía no.
 * Mientras tanto cada método devuelve el dato de `gases-combustion.mock.ts`
 * con un `delay` corto para que los estados de carga de la UI se ejerciten de
 * verdad. **Ningún componente conoce el mock**: hablan solo con este servicio.
 *
 * Para pasar a datos reales, cada método ya trae comentada la llamada que le
 * toca — se descomenta, se borra el `of(...)` y se elimina el archivo de mock.
 * El módulo REST propio va en `api-solicitud` y el listado, cuando exista, sale
 * de `REPORTES.vw_gases_combustion_report` (ver CLAUDE.md, "Guardar un
 * formulario dinámico").
 */
@Injectable({ providedIn: 'root' })
export class GasesCombustionService {
  private readonly http = inject(HttpClient);

  /** Base del módulo REST. Nunca una URL literal en el componente. */
  private readonly baseUrl = `${environment.api_solicitud}/gases-combustion`;

  /** Latencia simulada. Desaparece junto con el mock. */
  private readonly LATENCIA_MOCK = 350;

  /**
   * Los criterios de aceptación y el catálogo de patrones son tablas de
   * referencia: no cambian durante la sesión y los piden varias tablas de la
   * pantalla, así que se cachean con `shareReplay` igual que el schema en
   * `plan-muestreo.store`.
   */
  private catalogoPatrones$?: Observable<CatalogoPatrones>;
  private criterios$?: Observable<CriterioAceptacion[]>;

  /**
   * Franja de la hoja: procedimiento, equipo y año.
   *
   * ⚠️ El código del formato, la edición y la fecha de emisión NO salen de acá.
   * Los pide `ReportFormularioService.getFormularioByCTId(2137)`, que ya existe
   * y es el estándar del sistema. Este método solo devuelve lo que es propio de
   * la hoja.
   */
  getMetadata(): Observable<GasesCombustionMetadata> {
    // return this.http.get<GasesCombustionMetadata>(`${this.baseUrl}/metadata`);
    return of(METADATA_MOCK).pipe(delay(this.LATENCIA_MOCK));
  }

  /** Cilindros patrón certificados, separados por familia. */
  getCatalogoPatrones(): Observable<CatalogoPatrones> {
    // this.catalogoPatrones$ ??= this.http.get<CatalogoPatrones>(`${this.baseUrl}/patrones`).pipe(shareReplay(1));
    this.catalogoPatrones$ ??= of(CATALOGO_PATRONES_MOCK).pipe(
      delay(this.LATENCIA_MOCK),
      shareReplay(1),
    );
    return this.catalogoPatrones$;
  }

  /** Límites de repetibilidad, reproducibilidad y veracidad por rango. */
  getCriteriosAceptacion(): Observable<CriterioAceptacion[]> {
    // this.criterios$ ??= this.http.get<CriterioAceptacion[]>(`${this.baseUrl}/criterios`).pipe(shareReplay(1));
    this.criterios$ ??= of(CRITERIOS_MOCK).pipe(delay(this.LATENCIA_MOCK), shareReplay(1));
    return this.criterios$;
  }

  /** Glosario que se muestra bajo la tabla de control de calidad. */
  getDefiniciones(): Observable<DefinicionGases[]> {
    // return this.http.get<DefinicionGases[]>(`${this.baseUrl}/definiciones`);
    return of(DEFINICIONES_MOCK).pipe(delay(this.LATENCIA_MOCK));
  }

  /**
   * Registro con el que se precarga la pantalla. Sin `id` devuelve el borrador
   * inicial; con `id` (edición) devolverá el registro guardado.
   */
  getRegistro(id?: string): Observable<RegistroGasesCombustion> {
    // return this.http.get<RegistroGasesCombustion>(id ? `${this.baseUrl}/${id}` : `${this.baseUrl}/borrador`);
    return of({ ...REGISTRO_MOCK, id: id ?? null }).pipe(delay(this.LATENCIA_MOCK));
  }

  /** Guarda la verificación completa (patrones + mediciones de los 4 gases). */
  guardar(payload: GuardarGasesCombustionPayload): Observable<GuardarGasesCombustionResponse> {
    // return payload.id
    //   ? this.http.put<GuardarGasesCombustionResponse>(`${this.baseUrl}/${payload.id}`, payload)
    //   : this.http.post<GuardarGasesCombustionResponse>(this.baseUrl, payload);
    return of({
      id: payload.id ?? 'borrador-local',
      mensaje: 'Verificación de gases de combustión guardada.',
    }).pipe(delay(this.LATENCIA_MOCK));
  }
}
