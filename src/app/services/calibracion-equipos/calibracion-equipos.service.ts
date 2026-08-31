import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Apollo } from 'apollo-angular';
import { Observable, firstValueFrom, forkJoin, map, shareReplay } from 'rxjs';

import { environment } from '../../../environments/environment';
import {
  CalibracionEquipoCollectionResponse,
  CalibracionesPage,
  CrearCalibracionPayload,
  FinalizarCalibracionPayload,
  FinalizarCalibracionResponse,
  RespuestaCalibracion,
  RespuestaCalibracionCollectionResponse,
} from '../../interfaces/calibracion-equipos/calibracion-equipos.interface';
import { ItemCatalogo, PaginationMeta } from '../../interfaces/catalogos/catalogo.interface';
import { FactorCorreccion } from '../../interfaces/calibracion-equipos/factor-correccion.interface';
import FACTORES_DE_CORRECCION from '../../data/factores_de_correccion.json';
import {
  GET_COLLECTION_REPORT_CALIBRACION,
  GET_RESPUESTAS_CALIBRACION,
} from '../../graphql/calibracion-equipos/report-calibracion.queries';
import { CatalogoService } from '../catalogo.service';
import { FormularioLaboratorio } from '../../shared/dynamic-form';
import {
  CATALOGO_VALOR_PC,
  CATALOGO_VALOR_PL,
} from '../../features/calibracion-equipos/model/calibracion-equipos-form.model';

/** Cliente Apollo de api-reportes, donde viven las colecciones del módulo. */
const CLIENT_REPORTES = 'reportes';

/** Formulario dinámico "Verificación Intermedia de Calibradores Acústicos". */
export const TIPO_FORMULARIO_CALIBRACION = 2087;

/**
 * Secuencial del formulario 2087 (`PARA_SECUENCIAL.identificador_secu`). De él
 * sale el "N° Formulario" que se asigna al registrar la verificación.
 */
export const IDENTIFICADOR_SECUENCIAL_CALIBRACION = 'cion-test';

/**
 * "Autorizado" del catálogo Estado de Registro. Calibración sigue la convención
 * del resto del sistema (solicitudes, horarios laborales, por contraloría) y no
 * la del flujo de muestreo, que graba 2023 — ver "Estados del flujo" en el
 * CLAUDE.md del monorepo.
 *
 * Es el estado con el que la verificación recibe su N° Formulario: el
 * secuencial se asigna al autorizar, no al guardar.
 */
const ESTADO_AUTORIZADO = 387;

/** "Rechazado". Una verificación rechazada no llega a numerarse. */
const ESTADO_RECHAZADO = 51;

/*
 * TODO: entidad quemada, igual que en `por-contraloria` y `horarios-laborales`.
 * El perfil del usuario todavía no trae el establecimiento al que pertenece.
 */
export const ENTIDAD_CALIBRACION = 'F9687983-F6CF-4706-9004-A1B793E3A987';

/** Nivel de referencia de cada patrón, tal como está definido en catálogo. */
export interface ValoresReferencia {
  pc: number | null;
  pl: number | null;
}

/**
 * Tabla de factores de corrección indexada por su clave de búsqueda.
 *
 * Se arma una sola vez al cargar el módulo: son 66 filas que no cambian en
 * ejecución, así que un `Map` evita recorrer el arreglo en cada tecleo de la
 * lectura observada.
 */
const FACTORES_POR_CLAVE = new Map<string, FactorCorreccion>(
  (FACTORES_DE_CORRECCION as FactorCorreccion[]).map((factor) => [factor.id, factor]),
);

@Injectable({ providedIn: 'root' })
export class CalibracionEquiposService {
  private readonly http = inject(HttpClient);
  private readonly apollo = inject(Apollo);
  private readonly catalogoService = inject(CatalogoService);
  private readonly apiReportes = environment.api_reportes;
  private readonly apiSolicitud = environment.api_solicitud;

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

  /**
   * Tolerancia del patrón de laboratorio, desde la tabla de factores de
   * corrección. Es el `VLOOKUP` del formato:
   *
   *     =IFERROR(VLOOKUP(YEAR(E17) & E15 & ROUND(E24,0),
   *                      'Factores de corrección'!$F$4:$L$70, 5, 0),
   *              "INGRESE MEDICIONES")
   *
   *     E17 = fecha de última calibración del SONÓMETRO  → de ahí sale el año
   *     E15 = código del PATRÓN DE LABORATORIO (PL)
   *     E24 = lectura observada PC, redondeada a entero  → el nivel verificado
   *
   * La quinta columna del rango `F:L` es `tolerancia`, que es justo el quinto
   * campo de cada fila del JSON después de `id` (fca, fcd, fcmax, **tolerancia**,
   * histeresis, incertidumbre).
   *
   * Devuelve `null` cuando no hay coincidencia — el equivalente del
   * `IFERROR`—, que es lo que el formulario muestra como "INGRESE MEDICIONES".
   */
  buscarTolerancia(params: {
    /** Año de la última calibración del sonómetro. */
    anio: number;
    /** Código del patrón de laboratorio, p. ej. `A-21-45`. */
    equipoPl: string;
    /** Nivel verificado, ya redondeado a entero. */
    nivel: number;
  }): number | null {
    const clave = `${params.anio}${params.equipoPl}${params.nivel}`;
    return FACTORES_POR_CLAVE.get(clave)?.tolerancia ?? null;
  }

  // ── Guardado ─────────────────────────────────────────────────────────────

  /**
   * Registra una verificación: cabecera y respuestas en una sola llamada
   * (`create-detalle`, igual que plan-muestreo).
   *
   * **No asigna el N° Formulario.** La verificación nace en "Pendiente" (2, el
   * default de la tabla) y sin secuencial; el número se asigna al autorizarla,
   * que es cuando el registro pasa a ser oficial. Antes se llamaba a
   * `finalizar` acá mismo, así que todo registro nacía numerado aunque nadie lo
   * hubiera revisado.
   *
   * Devuelve el id de la verificación creada.
   */
  async registrarVerificacion(payload: CrearCalibracionPayload): Promise<string> {
    const creada = await firstValueFrom(
      this.http.post<{ data?: { calibracion?: { id?: string } } }>(
        `${this.apiSolicitud}/calibracion/create-detalle`,
        payload,
      ),
    );

    const idCalibracion = creada?.data?.calibracion?.id ?? null;
    if (!idCalibracion) {
      throw new Error('La API no devolvió el identificador de la verificación');
    }

    return idCalibracion;
  }

  /**
   * Autoriza la verificación: le asigna el N° Formulario y la deja en
   * "Autorizado", en una sola operación.
   *
   * Las dos cosas van juntas porque las hace el mismo SP
   * (`sp_generar_secuencial_calibracion`), que numera y cambia el estado dentro
   * de la misma transacción: no puede quedar un registro autorizado sin número
   * ni uno numerado sin autorizar.
   *
   * Devuelve el número asignado.
   */
  autorizarCalibracion(idCalibracion: string): Observable<string | null> {
    return this.http
      .post<{ data?: FinalizarCalibracionResponse[] }>(
        `${this.apiSolicitud}/calibracion/finalizar`,
        {
          idCalibracion,
          identificadorSecuencial: IDENTIFICADOR_SECUENCIAL_CALIBRACION,
          ctestado: ESTADO_AUTORIZADO,
        } as FinalizarCalibracionPayload,
      )
      .pipe(map((res) => res?.data?.[0]?.secuencialAsignado ?? null));
  }

  /**
   * Rechaza la verificación. No pasa por el SP del secuencial a propósito: un
   * registro rechazado no consume un número de formulario.
   */
  rechazarCalibracion(idCalibracion: string): Observable<void> {
    return this.http.put<void>(`${this.apiSolicitud}/calibracion/${idCalibracion}`, {
      ctestado_id: ESTADO_RECHAZADO,
    });
  }

  /**
   * Guarda los cambios de una verificación: la cabecera por un lado y el
   * formulario completo por otro. `update-many` da de baja las respuestas
   * anteriores e inserta las nuevas, así que se manda todo el formulario.
   */
  async actualizarVerificacion(
    idCalibracion: string,
    payload: CrearCalibracionPayload,
  ): Promise<void> {
    const { ctformulario_id, usuario_id, entidad_id, ...cabecera } = payload.calibracion;

    await firstValueFrom(
      this.http.put(`${this.apiSolicitud}/calibracion/${idCalibracion}`, cabecera),
    );

    await firstValueFrom(
      this.http.put(
        `${this.apiSolicitud}/calibracion/valor-calibracion/update-many/${idCalibracion}`,
        { valorCalibracion: payload.valorCalibracion },
      ),
    );
  }

  /**
   * PDF del F-PEE-11-02. Sale de `api_reportes` porque calibración todavía no
   * congela ni firma su documento: no hay un archivo archivado que devolver, se
   * regenera en cada llamada.
   *
   * Si algún día se le suma firma electrónica, esta llamada tiene que pasar a
   * `{api_solicitud}/calibracion/:id/pdf` — el congelado, con las firmas
   * estampadas. Ver "Imprimir un documento" en el CLAUDE.md del front.
   */
  getPdfCalibracion(id: string): Observable<Blob> {
    return this.http.get(`${this.apiReportes}/report-solicitud/pdf-calibracion/${id}`, {
      responseType: 'blob',
    });
  }

  /** Baja lógica: la verificación queda con `estado = 0`, no se borra. */
  deshabilitarCalibracion(id: string): Observable<void> {
    return this.http.patch<void>(`${this.apiSolicitud}/calibracion/${id}/disable`, {});
  }

  // ── Consultas ────────────────────────────────────────────────────────────

  /**
   * Listado paginado. Sale de `REPORTES.vw_calibracion_report` a través de su
   * colección GraphQL, como manda el estándar de listados: acá no se compone
   * ninguna fila ni se pagina en memoria.
   */
  getCalibraciones(page: number, limit: number): Observable<CalibracionesPage> {
    return this.apollo
      .use(CLIENT_REPORTES)
      .query<{ collectionReportCalibracion: CalibracionEquipoCollectionResponse }>({
        query: GET_COLLECTION_REPORT_CALIBRACION,
        variables: { page, take: limit },
        fetchPolicy: 'network-only',
      })
      .pipe(
        map((result) => ({
          data: result.data?.collectionReportCalibracion?.data ?? [],
          meta: result.data?.collectionReportCalibracion?.meta as PaginationMeta,
        })),
      );
  }

  /** Respuestas guardadas de una verificación, para precargarlas al editar. */
  getRespuestas(idCalibracion: string): Observable<RespuestaCalibracion[]> {
    return this.apollo
      .use(CLIENT_REPORTES)
      .query<{ collectionReportValorCalibracion: RespuestaCalibracionCollectionResponse }>({
        query: GET_RESPUESTAS_CALIBRACION,
        variables: { idCalibracion },
        fetchPolicy: 'network-only',
      })
      .pipe(map((result) => result.data?.collectionReportValorCalibracion?.data ?? []));
  }
}
