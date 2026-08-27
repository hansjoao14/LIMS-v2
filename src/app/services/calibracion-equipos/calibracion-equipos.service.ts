import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, map, of, shareReplay } from 'rxjs';

import { environment } from '../../../environments/environment';
import { CalibracionEquipo } from '../../interfaces/calibracion-equipos/calibracion-equipos.interface';
import { ItemCatalogo } from '../../interfaces/catalogos/catalogo.interface';
import { CatalogoService } from '../catalogo.service';
import { FormularioLaboratorio } from '../../shared/dynamic-form';
import {
  CATALOGO_VALOR_PC,
  CATALOGO_VALOR_PL,
} from '../../features/calibracion-equipos/model/calibracion-equipos-form.model';

/** Formulario dinámico "Verificación Intermedia de Calibradores Acústicos". */
export const TIPO_FORMULARIO_CALIBRACION = 2087;

/** Nivel de referencia de cada patrón, tal como está definido en catálogo. */
export interface ValoresReferencia {
  pc: number | null;
  pl: number | null;
}

@Injectable({ providedIn: 'root' })
export class CalibracionEquiposService {
  private readonly http = inject(HttpClient);
  private readonly catalogoService = inject(CatalogoService);
  private readonly apiReportes = environment.api_reportes;

  private formulario$?: Observable<FormularioLaboratorio>;
  private referencias$?: Observable<ValoresReferencia>;
  private readonly items = new Map<number, Observable<ItemCatalogo[]>>();

  /**
   * Schema del formulario dinámico. Se cachea porque no cambia dentro de una
   * sesión y la pantalla lo pide cada vez que se abre.
   */
  getFormulario(idEmpleado: string): Observable<FormularioLaboratorio> {
    if (!this.formulario$) {
      const url = `${this.apiReportes}/report-parametro/formulario-dinamico/${TIPO_FORMULARIO_CALIBRACION}/${idEmpleado}`;

      this.formulario$ = this.http.get<{ data: FormularioLaboratorio }>(url).pipe(
        map((res) => {
          if (!res?.data) {
            throw new Error('La API no devolvió el formulario dinámico');
          }
          return res.data;
        }),
        shareReplay({ bufferSize: 1, refCount: false }),
      );
    }

    return this.formulario$;
  }

  /**
   * Ítems de un catálogo con su columna `valor`, que es donde viven las fechas
   * de última calibración de cada equipo. El schema del formulario dinámico
   * solo devuelve `{ nombre, id }` de cada opción, así que el `valor` hay que
   * pedirlo aparte.
   */
  getItemsCatalogo(catalogoId: number): Observable<ItemCatalogo[]> {
    if (!this.items.has(catalogoId)) {
      this.items.set(
        catalogoId,
        /*
         * Se usa `getAllItemsAdmin` y no `getItemsByCatalogoId`: este último
         * devuelve un `watchQuery().valueChanges`, que emite primero un
         * resultado vacío mientras Apollo resuelve y nunca completa — con él,
         * un `forkJoin` se queda esperando y un `take(1)` se queda con la
         * emisión vacía. `getAllItemsAdmin` hace un `query()` que completa con
         * los datos ya resueltos.
         */
        this.catalogoService.getAllItemsAdmin(catalogoId).pipe(
          map((items) => items.filter((item) => item.estado !== false)),
          shareReplay({ bufferSize: 1, refCount: false }),
        ),
      );
    }

    return this.items.get(catalogoId)!;
  }

  /**
   * Nivel de referencia del sonómetro para cada patrón. Son catálogos de un
   * solo ítem cuyo `valor` es el número: no se quema en el código porque puede
   * recalibrarse sin tocar el front.
   */
  getValoresReferencia(): Observable<ValoresReferencia> {
    if (!this.referencias$) {
      const primerValor = (items: ItemCatalogo[]): number | null => {
        const crudo = items.find((i) => i.valor != null)?.valor;
        const numero = Number(crudo);
        return crudo == null || Number.isNaN(numero) ? null : numero;
      };

      this.referencias$ = forkJoin({
        pc: this.getItemsCatalogo(CATALOGO_VALOR_PC).pipe(map(primerValor)),
        pl: this.getItemsCatalogo(CATALOGO_VALOR_PL).pipe(map(primerValor)),
      }).pipe(shareReplay({ bufferSize: 1, refCount: false }));
    }

    return this.referencias$;
  }

  /*
   * TODO(backend): no existe endpoint ni tabla para las verificaciones. El
   * listado y el guardado quedan en espera de `api-laboratorio`; hasta
   * entonces la lista se pinta vacía y registrar no persiste.
   */
  getCalibraciones(): Observable<CalibracionEquipo[]> {
    return of([]);
  }

  deshabilitarCalibracion(_id: string): Observable<void> {
    return of(undefined);
  }
}
