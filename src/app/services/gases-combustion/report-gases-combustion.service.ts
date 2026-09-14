import { Injectable, inject } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable, map } from 'rxjs';

import { EstadoOrden } from '../../core/utils/orden-tabla.utils';
import { PaginationMeta } from '../../interfaces/catalogos/catalogo.interface';
import {
  CampoBusquedaGases,
  CampoOrdenGases,
  CollectionResponse,
  ReportGasesCombustion,
  ReportGasesCombustionPage,
} from '../../interfaces/gases-combustion/report-gases-combustion.interface';
import { GET_COLLECTION_REPORT_GASES_COMBUSTION } from '../../graphql/gases-combustion/gases-combustion.queries';
import { GasesCombustionService } from './gases-combustion.service';

const CLIENTE_REPORTES = 'reportes';

/**
 * Orden inicial del listado: lo último verificado primero.
 *
 * Por `fecha_verificacion` y no por `num_secuencial`: el número recién se
 * asigna al numerar la hoja, así que las pendientes lo tienen en NULL y
 * quedarían al final, justo las que hay que atender.
 */
export const ORDEN_INICIAL_GASES: EstadoOrden<CampoOrdenGases> = {
  campo: 'fecha_verificacion',
  direccion: 'DESC',
};

/** Columnas de fecha: al ordenarlas por primera vez arrancan en DESC. */
export const CAMPOS_FECHA_GASES: readonly CampoOrdenGases[] = ['fecha_verificacion'];

/**
 * Listado de hojas de verificación de gases de combustión.
 *
 * Va por GraphQL contra `api-reportes`, igual que el resto de los listados; la
 * escritura vive en `GasesCombustionService`. La baja lógica se delega ahí en
 * vez de duplicar la llamada REST.
 */
@Injectable({ providedIn: 'root' })
export class ReportGasesCombustionService {
  private readonly apollo = inject(Apollo);
  private readonly gasesService = inject(GasesCombustionService);

  /**
   * Una página del listado. `campo` y `busqueda` son el buscador: se filtra por
   * UN campo a la vez porque el WhereInput no expone `OR`. El filtro va en el
   * `where` del servidor para no romper la paginación.
   */
  getRegistros(
    page = 1,
    take = 10,
    campo: CampoBusquedaGases | null = null,
    busqueda = '',
    orden: EstadoOrden<CampoOrdenGases> = ORDEN_INICIAL_GASES,
  ): Observable<ReportGasesCombustionPage> {
    const termino = busqueda.trim();

    return this.apollo
      .use(CLIENTE_REPORTES)
      .query<{ collectionReportGasesCombustion: CollectionResponse<ReportGasesCombustion> }>({
        query: GET_COLLECTION_REPORT_GASES_COMBUSTION,
        variables: {
          q: {
            where: {
              // La vista no filtra el estado: lo expone como columna. Sin esta
              // condición, una hoja dada de baja seguiría apareciendo.
              estado: { equals: true },
              // La clave solo se agrega si hay texto: `contains: null` lo
              // rechaza Prisma ("Argument `contains` must not be null").
              ...(campo && termino ? { [campo]: { contains: termino } } : {}),
            },
            pagination: { page, take },
            orderBy: { [orden.campo]: orden.direccion },
          },
        },
        fetchPolicy: 'network-only',
      })
      .pipe(
        map((resultado) => {
          const coleccion = resultado.data?.collectionReportGasesCombustion;
          return {
            data: coleccion?.data ?? [],
            meta: (coleccion?.meta ?? null) as PaginationMeta | null,
          };
        }),
      );
  }

  /**
   * Baja lógica. Es REST contra `api-solicitud`: la colección solo lee. Sigue
   * el patrón `disable<Entidad>` del resto del sistema.
   */
  darDeBaja(id: string): Observable<unknown> {
    return this.gasesService.darDeBaja(id);
  }
}
