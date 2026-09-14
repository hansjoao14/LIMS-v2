import { Injectable } from '@angular/core';
import { Observable, delay, map, of } from 'rxjs';

import { EstadoOrden } from '../../core/utils/orden-tabla.utils';
import {
  CampoBusquedaGases,
  CampoOrdenGases,
  ReportGasesCombustion,
  ReportGasesCombustionPage,
} from '../../interfaces/gases-combustion/report-gases-combustion.interface';
import { LISTADO_MOCK } from './gases-combustion.mock';

/**
 * Listado de Gases de Combustión.
 *
 * ⚠️ Estado: la vista `REPORTES.vw_gases_combustion_report` y su colección
 * GraphQL todavía no existen — los scripts 01 a 04 están escritos pero sin
 * correr. Mientras tanto este servicio pagina, filtra y ordena el mock **en
 * memoria**, imitando lo que va a hacer el servidor, para que el componente ya
 * quede escrito contra la forma definitiva.
 *
 * Al conectar el backend se reemplaza el cuerpo de `getRegistros` por el
 * `apollo.use('reportes').query(...)` de siempre, calcado de
 * `ReportTicketEntregaService`: el componente no cambia.
 *
 * @see faq-monorepo/docs/gases-combustion.md §8, "Vistas de reportes"
 */

/** Orden inicial del listado: lo último verificado primero. */
export const ORDEN_INICIAL_GASES: EstadoOrden<CampoOrdenGases> = {
  campo: 'fecha_verificacion',
  direccion: 'DESC',
};

/** Columnas de fecha: al ordenarlas por primera vez arrancan en DESC. */
export const CAMPOS_FECHA_GASES: readonly CampoOrdenGases[] = ['fecha_verificacion'];

@Injectable({ providedIn: 'root' })
export class ReportGasesCombustionService {
  /** Latencia simulada. Desaparece junto con el mock. */
  private readonly LATENCIA_MOCK = 300;

  getRegistros(
    page: number,
    take: number,
    campo: CampoBusquedaGases,
    busqueda: string,
    orden: EstadoOrden<CampoOrdenGases>,
  ): Observable<ReportGasesCombustionPage> {
    // return this.apollo
    //   .use('reportes')
    //   .query<{ collectionReportGasesCombustion: ReportGasesCombustionCollectionResponse }>({
    //     query: GET_COLLECTION_REPORT_GASES_COMBUSTION,
    //     variables: { page, take, campo, busqueda, orderBy: { [orden.campo]: orden.direccion } },
    //     fetchPolicy: 'network-only',
    //   })
    //   .pipe(map((r) => ({ ... })));

    return of(LISTADO_MOCK).pipe(
      delay(this.LATENCIA_MOCK),
      map((todos) => this.paginarEnMemoria(todos, page, take, campo, busqueda, orden)),
    );
  }

  /**
   * Baja lógica. Es REST contra `api-solicitud`, no GraphQL: la colección solo
   * lee. Sigue el patrón `disable<Entidad>` del resto del sistema.
   */
  darDeBaja(id: string): Observable<void> {
    // return this.http.patch<void>(`${environment.api_solicitud}/gases-combustion/${id}/disable`, {});
    return of(undefined).pipe(delay(this.LATENCIA_MOCK));
  }

  /**
   * Filtra, ordena y corta la página como lo haría el servidor.
   *
   * Vive acá y no en el componente a propósito: el componente tiene que estar
   * escrito como si la paginación siempre hubiera sido de servidor, para que
   * conectarlo no lo toque. Este método entero se borra con el mock.
   */
  private paginarEnMemoria(
    todos: ReportGasesCombustion[],
    page: number,
    take: number,
    campo: CampoBusquedaGases,
    busqueda: string,
    orden: EstadoOrden<CampoOrdenGases>,
  ): ReportGasesCombustionPage {
    const termino = busqueda.trim().toLowerCase();

    const filtrados = todos.filter((fila) => {
      if (!fila.estado) return false;
      if (!termino) return true;
      return String(fila[campo] ?? '')
        .toLowerCase()
        .includes(termino);
    });

    const signo = orden.direccion === 'ASC' ? 1 : -1;
    const ordenados = [...filtrados].sort((a, b) => {
      const va = a[orden.campo] ?? '';
      const vb = b[orden.campo] ?? '';
      if (va === vb) return 0;
      return va > vb ? signo : -signo;
    });

    const total = ordenados.length;
    const lastPage = Math.max(1, Math.ceil(total / take));
    const actual = Math.min(page, lastPage);
    const desde = (actual - 1) * take;

    return {
      data: ordenados.slice(desde, desde + take),
      meta: {
        total,
        totalPages: lastPage,
        page: actual,
        limit: take,
        skip: desde,
        hasPrevPage: actual > 1,
        hasNextPage: actual < lastPage,
        prevPage: actual > 1 ? actual - 1 : null,
        nextPage: actual < lastPage ? actual + 1 : null,
      },
    };
  }
}
