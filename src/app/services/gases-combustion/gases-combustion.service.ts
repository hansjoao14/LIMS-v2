import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Apollo } from 'apollo-angular';
import { Observable, forkJoin, map, shareReplay, switchMap, take } from 'rxjs';

import { environment } from '../../../environments/environment';
import { ItemCatalogo } from '../../interfaces/catalogos/catalogo.interface';
import {
  GET_CATALOGOS_GASES,
  GET_IDS_CATALOGOS_GASES,
  GET_REPORT_GASES_CILINDRO,
  GET_REPORT_GASES_COMBUSTION_BY_ID,
  GET_REPORT_GASES_CRITERIO,
  GET_REPORT_GASES_INSPECCION_SONDA,
  GET_REPORT_GASES_MEDICION,
  GET_REPORT_GASES_PATRON,
} from '../../graphql/gases-combustion/gases-combustion.queries';
import {
  ActualizarCabeceraGasesPayload,
  ActualizarDetalleGasesPayload,
  BloqueMediciones,
  CatalogoPatrones,
  CatalogosGases,
  CrearGasesCombustionDetallePayload,
  CriterioAceptacion,
  DefinicionGases,
  FamiliaPatron,
  FilaPatron,
  FinalizarGasesPayload,
  FinalizarGasesResponse,
  GasId,
  GasesCombustionDetalleResponse,
  GasesInspeccionSondaPayload,
  GasesMedicionPayload,
  GasesPatronPayload,
  GrupoCriterio,
  InspeccionSonda,
  MedicionGas,
  OpcionCatalogo,
  PatronGas,
  RegistroGasesCombustion,
  ValoresPorGas,
} from '../../interfaces/gases-combustion/gases-combustion.interface';
import {
  ReportGasesCilindro,
  ReportGasesCombustion,
  ReportGasesCriterio,
  ReportGasesInspeccionSonda,
  ReportGasesMedicion,
  ReportGasesPatron,
} from '../../interfaces/gases-combustion/report-gases-combustion.interface';

const CLIENTE_REPORTES = 'reportes';
const CLIENTE_CATALOGO = 'catalogo';

/**
 * Ítem de catálogo del F-PEE-07-01. Con él, `collectionReportFormulario`
 * devuelve el código del formato, la edición y la fecha de emisión de la
 * cabecera. Mismo patrón que `ticket-entrega-muestras`.
 */
export const TIPO_FORMULARIO_GASES = 2137;

/**
 * Identificador de la configuración de secuencial que numera la hoja.
 *
 * Lo manda el front en el body de `/finalizar`, igual que
 * `IDENTIFICADOR_SECUENCIAL_TICKET_ENTREGA` ('TM') y que el 'PM' de plan de
 * muestreo: quién numera con qué lo decide el front, y el backend solo ejecuta
 * el SP con lo que le llega.
 *
 * Es la columna `identificador_secu` de `PARA_SECUENCIAL`. Tiene que coincidir
 * con el `@identificador` del script `04_sp_secuencial_gases_combustion.sql` o
 * el SP corta con "No existe un secuencial configurado para el identificador
 * indicado". Con el formato que hoy tiene esa fila, la hoja queda numerada como
 * `RVGC-00002-2026`.
 */
export const IDENTIFICADOR_SECUENCIAL_GASES = 'RVGC';

/**
 * Estados del catálogo "Estado de Registro" (catalogo_id = 1).
 *
 * Al numerar la hoja queda **directo en "Finalizado Solicitud" (2023)**, que es
 * la convención de los documentos que se numeran en el sistema: la misma de
 * plan de muestreo, orden de trabajo y ticket de entrega. No pasa por "Creado"
 * (388) ni por "Autorizado" (387): no hay un paso de aprobación intermedio.
 *
 * El catálogo tiene tres estados que dicen "Finalizado" —3, 52 y 2023—; el que
 * usa el sistema para esto es el 2023, y el front lo muestra como "Finalizado"
 * a secas: el sufijo "Solicitud" no aporta cuando ya se sabe que la fila es una
 * hoja de verificación.
 */
export const ESTADO_GASES = {
  PENDIENTE: 2,
  FINALIZADO: 2023,
  RECHAZADO: 51,
} as const;

/**
 * Nombres de los catálogos del módulo. **Se cruzan por nombre, nunca por id**:
 * los ids son IDENTITY y no coinciden entre ambientes, que es justo lo que
 * advierte el script 01 del módulo. Lo mismo vale para los gases, que se cruzan
 * por `sigla`.
 */
const CATALOGOS = {
  gases: 'Gases de Combustión',
  definiciones: 'Definiciones Gases de Combustión',
  formato: 'Formato Gases de Combustión',
  trimestre: 'Trimestre',
  diagnostico: 'Diagnóstico de Sonda',
} as const;

/** Siglas de los ítems padre de la franja del formato. */
const SIGLA_PROCEDIMIENTO = 'PROC';
const SIGLA_EQUIPO = 'EQUIPO';

/**
 * Entidad a la que se asocia la hoja.
 *
 * ⚠️ Es el único valor que sigue quemado en el módulo, y no por decisión de
 * esta pantalla: **no hay endpoint que devuelva la entidad del usuario**. Es la
 * misma deuda que arrastra `plan-muestreo` (ver el `//TODO: Cambiar el
 * entidad_id` de `step3-procedimiento.ts`) y se resuelve cuando exista ese
 * endpoint, en los dos módulos a la vez.
 */
const ENTIDAD_ID_PENDIENTE = 'F9687983-F6CF-4706-9004-A1B793E3A987';

/** Respuesta cruda de una colección: solo interesa `data`. */
interface RespuestaColeccion<T> {
  data: T[];
}

/**
 * Registro de Verificación de Gases de Combustión (F-PEE-07-01).
 *
 * Escribir es REST contra `api-solicitud`; leer es siempre una colección de
 * `api-reportes`. Este servicio es el único que conoce las dos formas: traduce
 * las filas de las vistas —snake_case, decimales como texto— a los tipos que
 * maneja la pantalla, y de vuelta a los payloads de los DTOs.
 *
 * @see faq-monorepo/docs/gases-combustion.md §10
 */
@Injectable({ providedIn: 'root' })
export class GasesCombustionService {
  private readonly http = inject(HttpClient);
  private readonly apollo = inject(Apollo);

  private readonly baseUrl = `${environment.api_solicitud}/gases-combustion`;

  /**
   * Catálogos, cilindros y criterios son tablas de referencia: no cambian
   * durante la sesión y los piden varias tablas de la pantalla, así que se
   * cachean con `shareReplay` igual que el schema en `plan-muestreo.store`.
   */
  private catalogos$?: Observable<CatalogosGases>;
  private catalogoPatrones$?: Observable<CatalogoPatrones>;
  private criterios$?: Observable<CriterioAceptacion[]>;

  // ── Catálogos ────────────────────────────────────────────────────────────

  /**
   * Los cinco catálogos del módulo, resueltos por nombre. Son dos viajes: uno
   * para traducir los nombres a ids y otro que trae los ítems de los cinco de
   * una sola vez, con alias.
   */
  getCatalogos(): Observable<CatalogosGases> {
    this.catalogos$ ??= this.apollo
      .use(CLIENTE_CATALOGO)
      .query<{ collectionCatalogo: RespuestaColeccion<{ id: number; nombre: string }> }>({
        query: GET_IDS_CATALOGOS_GASES,
        variables: { nombres: Object.values(CATALOGOS) },
        fetchPolicy: 'cache-first',
      })
      .pipe(
        map((resultado) => resultado.data?.collectionCatalogo?.data ?? []),
        switchMap((catalogos) => this.pedirItems(catalogos)),
        shareReplay(1),
      );
    return this.catalogos$;
  }

  private pedirItems(catalogos: { id: number; nombre: string }[]): Observable<CatalogosGases> {
    const idDe = (nombre: string) =>
      catalogos.find((catalogo) => catalogo.nombre === nombre)?.id ?? 0;

    return this.apollo
      .use(CLIENTE_CATALOGO)
      .query<Record<keyof typeof CATALOGOS, RespuestaColeccion<ItemCatalogo>>>({
        query: GET_CATALOGOS_GASES,
        variables: {
          gases: idDe(CATALOGOS.gases),
          definiciones: idDe(CATALOGOS.definiciones),
          formato: idDe(CATALOGOS.formato),
          trimestre: idDe(CATALOGOS.trimestre),
          diagnostico: idDe(CATALOGOS.diagnostico),
        },
        fetchPolicy: 'cache-first',
      })
      .pipe(map((resultado) => this.armarCatalogos(resultado.data)));
  }

  private armarCatalogos(
    datos?: Record<keyof typeof CATALOGOS, RespuestaColeccion<ItemCatalogo>> | null,
  ): CatalogosGases {
    const gases = datos?.gases?.data ?? [];
    const formato = datos?.formato?.data ?? [];

    return {
      gasesPorSigla: gases.reduce<Partial<Record<GasId, number>>>((acc, item) => {
        if (item.sigla) acc[item.sigla as GasId] = item.id;
        return acc;
      }, {}),
      procedimiento: this.valorDeLaFranja(formato, SIGLA_PROCEDIMIENTO),
      codigoEquipo: this.valorDeLaFranja(formato, SIGLA_EQUIPO),
      definiciones: this.ordenar(datos?.definiciones?.data ?? []).map<DefinicionGases>((item) => ({
        id: item.id,
        texto: item.nombre,
      })),
      trimestres: this.aOpciones(datos?.trimestre?.data ?? []),
      diagnosticos: this.aOpciones(datos?.diagnostico?.data ?? []),
    };
  }

  /**
   * "Procedimiento" y "Código del equipo" son ítems padre con sus valores
   * colgando como hijos. Son fijos del formato, no dato de cada hoja: por eso
   * salen del catálogo y no de una tabla propia.
   */
  private valorDeLaFranja(items: ItemCatalogo[], sigla: string): string {
    const padre = items.find((item) => item.sigla === sigla && !item.item_catalogo_id);
    if (!padre) return '';
    return this.ordenar(items.filter((item) => item.item_catalogo_id === padre.id))
      .map((item) => item.nombre)
      .join(' ; ');
  }

  private aOpciones(items: ItemCatalogo[]): OpcionCatalogo[] {
    return this.ordenar(items).map((item) => ({
      id: item.id,
      nombre: item.nombre,
      sigla: item.sigla,
    }));
  }

  private ordenar(items: ItemCatalogo[]): ItemCatalogo[] {
    return [...items].sort((a, b) => (a.orden ?? 0) - (b.orden ?? 0));
  }

  // ── Referencia: cilindros y criterios ────────────────────────────────────

  /** Cilindros patrón certificados, separados por familia. */
  getCatalogoPatrones(): Observable<CatalogoPatrones> {
    this.catalogoPatrones$ ??= this.apollo
      .use(CLIENTE_REPORTES)
      .query<{ collectionReportGasesCilindro: RespuestaColeccion<ReportGasesCilindro> }>({
        query: GET_REPORT_GASES_CILINDRO,
        fetchPolicy: 'cache-first',
      })
      .pipe(
        map((resultado) => {
          const filas = resultado.data?.collectionReportGasesCilindro?.data ?? [];
          const patrones = filas.map((fila) => this.aPatronGas(fila));
          return {
            mezcla: patrones.filter((patron) => patron.familia === 'mezcla'),
            oxigeno: patrones.filter((patron) => patron.familia === 'oxigeno'),
          };
        }),
        shareReplay(1),
      );
    return this.catalogoPatrones$;
  }

  /** Límites de repetibilidad, reproducibilidad y veracidad por rango. */
  getCriteriosAceptacion(): Observable<CriterioAceptacion[]> {
    this.criterios$ ??= this.apollo
      .use(CLIENTE_REPORTES)
      .query<{ collectionReportGasesCriterio: RespuestaColeccion<ReportGasesCriterio> }>({
        query: GET_REPORT_GASES_CRITERIO,
        fetchPolicy: 'cache-first',
      })
      .pipe(
        map((resultado) =>
          (resultado.data?.collectionReportGasesCriterio?.data ?? []).map((fila) =>
            this.aCriterio(fila),
          ),
        ),
        shareReplay(1),
      );
    return this.criterios$;
  }

  // ── El registro ──────────────────────────────────────────────────────────

  /**
   * Registro con el que se precarga la pantalla. Sin `id` devuelve una hoja en
   * blanco del año en curso; con `id` junta las cuatro colecciones de esa hoja.
   */
  getRegistro(id?: string): Observable<RegistroGasesCombustion> {
    if (!id) {
      return this.getCatalogoPatrones().pipe(
        take(1),
        map((catalogo) => this.hojaEnBlanco(catalogo)),
      );
    }

    return forkJoin({
      cabecera: this.consultarUno<ReportGasesCombustion>(
        GET_REPORT_GASES_COMBUSTION_BY_ID,
        'collectionReportGasesCombustion',
        id,
      ),
      patrones: this.consultar<ReportGasesPatron>(
        GET_REPORT_GASES_PATRON,
        'collectionReportGasesPatron',
        id,
      ),
      mediciones: this.consultar<ReportGasesMedicion>(
        GET_REPORT_GASES_MEDICION,
        'collectionReportGasesMedicion',
        id,
      ),
      inspecciones: this.consultar<ReportGasesInspeccionSonda>(
        GET_REPORT_GASES_INSPECCION_SONDA,
        'collectionReportGasesInspeccionSonda',
        id,
      ),
    }).pipe(
      map(({ cabecera, patrones, mediciones, inspecciones }) => ({
        id,
        anio: cabecera?.anio ?? new Date().getFullYear(),
        fechaVerificacion: this.soloFecha(cabecera?.fecha_verificacion) || this.hoy(),
        observaciones: cabecera?.observaciones ?? '',
        ctestadoId: cabecera?.ctestado_id ?? ESTADO_GASES.PENDIENTE,
        numSecuencial: cabecera?.num_secuencial ?? null,
        // Quien registra la hoja es el analista de la cabecera: es el mismo dato
        // que se copia en cada fila hija.
        realizadoPorId: cabecera?.analista_id ?? null,
        realizadoPorNombre: cabecera?.analista_nombre ?? '',
        revisadoPorId: this.revisorDe(mediciones, inspecciones).id,
        revisadoPorNombre: this.revisorDe(mediciones, inspecciones).nombre,
        patronesMezcla: patrones
          .filter((fila) => this.familiaDe(fila.familia) === 'mezcla')
          .map((fila) => this.aFilaPatron(fila)),
        patronesOxigeno: patrones
          .filter((fila) => this.familiaDe(fila.familia) === 'oxigeno')
          .map((fila) => this.aFilaPatron(fila)),
        bloques: this.agruparMediciones(mediciones, patrones),
        inspecciones: inspecciones.map((fila) => this.aInspeccion(fila)),
      })),
    );
  }

  /**
   * Hoja nueva, con las dos tablas de patrones ya armadas.
   *
   * El formato impreso no trae esas tablas en blanco: lista los cilindros
   * certificados del laboratorio, y el analista completa las mediciones contra
   * ellos. Por eso una hoja nueva arranca con una fila por cilindro vigente del
   * catálogo, con su código y su vencimiento copiados. Los dos campos quedan
   * editables —manda el certificado, no el catálogo— y la fila se puede quitar
   * si ese cilindro no se usó.
   */
  private hojaEnBlanco(catalogo: CatalogoPatrones): RegistroGasesCombustion {
    return {
      id: null,
      anio: new Date().getFullYear(),
      fechaVerificacion: this.hoy(),
      observaciones: '',
      ctestadoId: ESTADO_GASES.PENDIENTE,
      numSecuencial: null,
      realizadoPorId: null,
      realizadoPorNombre: '',
      revisadoPorId: null,
      revisadoPorNombre: '',
      patronesMezcla: catalogo.mezcla.map((patron) => this.aFilaDesdeCilindro(patron)),
      patronesOxigeno: catalogo.oxigeno.map((patron) => this.aFilaDesdeCilindro(patron)),
      bloques: [],
      inspecciones: [],
    };
  }

  /**
   * Un cilindro del catálogo como fila de patrón todavía sin guardar. Las
   * concentraciones viajan como copia: si mañana se corrige el catálogo, el %R
   * de una hoja ya firmada no puede cambiar.
   */
  private aFilaDesdeCilindro(patron: PatronGas): FilaPatron {
    return {
      id: null,
      cilindroId: patron.id,
      etiqueta: patron.etiqueta,
      codigo: patron.codigo,
      vencimiento: patron.vencimiento,
      valores: patron.valores,
    };
  }

  // ── Escritura ────────────────────────────────────────────────────────────

  /**
   * Alta completa. La cabecera, los patrones, las mediciones y las inspecciones
   * viajan juntas: el backend las guarda en una transacción porque las
   * mediciones necesitan el id del patrón, que recién existe ahí adentro.
   */
  crear(
    registro: RegistroGasesCombustion,
    usuarioId: string,
  ): Observable<GasesCombustionDetalleResponse> {
    return this.getCatalogos().pipe(
      take(1),
      switchMap((catalogos) => {
        const payload: CrearGasesCombustionDetallePayload = {
          gasesCombustion: {
            ctformulario_id: TIPO_FORMULARIO_GASES,
            usuario_id: usuarioId,
            entidad_id: ENTIDAD_ID_PENDIENTE,
            anio: registro.anio,
            fecha_verificacion: this.aISO(registro.fechaVerificacion),
            observaciones: registro.observaciones || null,
          },
          patrones: this.aPayloadPatrones(registro, catalogos),
          mediciones: this.aPayloadMediciones(registro, catalogos, false),
          inspecciones: this.aPayloadInspecciones(registro),
        };
        return this.http.post<GasesCombustionDetalleResponse>(
          `${this.baseUrl}/create-detalle`,
          payload,
        );
      }),
    );
  }

  /** Reemplaza el detalle de una hoja que ya existe. */
  actualizarDetalle(registro: RegistroGasesCombustion): Observable<GasesCombustionDetalleResponse> {
    return this.getCatalogos().pipe(
      take(1),
      switchMap((catalogos) => {
        const payload: ActualizarDetalleGasesPayload = {
          patrones: this.aPayloadPatrones(registro, catalogos),
          mediciones: this.aPayloadMediciones(registro, catalogos, true),
          inspecciones: this.aPayloadInspecciones(registro),
        };
        return this.http.put<GasesCombustionDetalleResponse>(
          `${this.baseUrl}/${registro.id}/update-many`,
          payload,
        );
      }),
    );
  }

  /** Actualiza solo la cabecera. El detalle va por `actualizarDetalle`. */
  actualizarCabecera(id: string, registro: RegistroGasesCombustion): Observable<unknown> {
    const payload: ActualizarCabeceraGasesPayload = {
      anio: registro.anio,
      fecha_verificacion: this.aISO(registro.fechaVerificacion),
      observaciones: registro.observaciones || null,
    };
    return this.http.put(`${this.baseUrl}/${id}`, payload);
  }

  /** Numera la hoja. Después de esto ya no se edita. */
  finalizar(id: string): Observable<FinalizarGasesResponse[]> {
    const payload: FinalizarGasesPayload = {
      idGasesCombustion: id,
      identificadorSecuencial: IDENTIFICADOR_SECUENCIAL_GASES,
      ctestado: ESTADO_GASES.FINALIZADO,
    };
    return this.http.post<FinalizarGasesResponse[]>(`${this.baseUrl}/finalizar`, payload);
  }

  /** Baja lógica. No borra: la hoja deja de aparecer en el listado. */
  darDeBaja(id: string): Observable<unknown> {
    return this.http.patch(`${this.baseUrl}/${id}/disable`, {});
  }

  // ── Traducción: vista → pantalla ─────────────────────────────────────────

  private aPatronGas(fila: ReportGasesCilindro): PatronGas {
    return {
      id: fila.id,
      etiqueta: fila.etiqueta,
      familia: this.familiaDe(fila.familia),
      codigo: fila.codigo,
      vencimiento: this.soloFecha(fila.vencimiento),
      codigoVencimiento: fila.codigo_vencimiento,
      vencido: fila.vencido === true,
      valores: this.valoresPorGas(fila),
    };
  }

  private aFilaPatron(fila: ReportGasesPatron): FilaPatron {
    return {
      id: fila.id,
      cilindroId: fila.cilindro_id,
      etiqueta: fila.etiqueta ?? '',
      codigo: fila.codigo_patron,
      vencimiento: this.soloFecha(fila.vencimiento_patron),
      valores: this.valoresPorGas(fila),
    };
  }

  /**
   * Agrupa las mediciones por gas usando la **sigla** que trae la vista, no el
   * `ctgas_id`: así la pantalla no depende de ids que cambian entre ambientes.
   */
  private agruparMediciones(
    mediciones: ReportGasesMedicion[],
    patrones: ReportGasesPatron[],
  ): BloqueMediciones[] {
    const cilindroPorPatron = new Map(patrones.map((fila) => [fila.id, fila.cilindro_id]));
    const porGas = new Map<GasId, MedicionGas[]>();

    for (const fila of mediciones) {
      const gas = fila.gas_sigla as GasId | null;
      if (!gas) continue;
      const filas = porGas.get(gas) ?? [];
      filas.push({
        id: fila.id,
        fecha: this.soloFecha(fila.fecha_medicion),
        cilindroId: fila.gases_patron_id
          ? (cilindroPorPatron.get(fila.gases_patron_id) ?? null)
          : null,
        x1: this.numero(fila.x1),
        x2: this.numero(fila.x2),
        observaciones: fila.observaciones ?? '',
        realizadoPorId: fila.realizado_por_id,
        realizadoPorNombre: fila.realizado_por_nombre?.trim() ?? '',
        revisadoPorId: fila.revisado_por_id,
        revisadoPorNombre: fila.revisado_por_nombre?.trim() ?? '',
        cumple: fila.cumple,
      });
      porGas.set(gas, filas);
    }

    return [...porGas.entries()].map(([gas, filas]) => ({ gas, filas }));
  }

  private aInspeccion(fila: ReportGasesInspeccionSonda): InspeccionSonda {
    return {
      id: fila.id,
      cttrimestreId: fila.cttrimestre_id,
      fechaInicio: this.soloFecha(fila.fecha_inicio),
      fechaFin: fila.fecha_fin ? this.soloFecha(fila.fecha_fin) : null,
      medidaFluctuaciones: fila.medida_fluctuaciones,
      termocuplaContacto: fila.termocupla_contacto,
      conexionesFugas: fila.conexiones_fugas,
      deformaciones: fila.deformaciones,
      marcasUso: fila.marcas_uso,
      ctdiagnosticoId: fila.ctdiagnostico_id,
      observaciones: fila.observaciones ?? '',
      realizadoPorId: fila.realizado_por_id,
      realizadoPorNombre: fila.realizado_por_nombre?.trim() ?? '',
      revisadoPorId: fila.revisado_por_id,
      revisadoPorNombre: fila.revisado_por_nombre?.trim() ?? '',
    };
  }

  /**
   * Quién revisó la hoja. En la base es columna de cada fila hija, pero el
   * formato lo trae una sola vez, así que se toma de la primera fila que lo
   * tenga: al guardar, todas llevan el mismo par.
   */
  private revisorDe(
    mediciones: ReportGasesMedicion[],
    inspecciones: ReportGasesInspeccionSonda[],
  ): { id: string | null; nombre: string } {
    const conRevisor =
      mediciones.find((fila) => fila.revisado_por_id) ??
      inspecciones.find((fila) => fila.revisado_por_id);

    return {
      id: conRevisor?.revisado_por_id ?? null,
      nombre: conRevisor?.revisado_por_nombre ?? '',
    };
  }

  private aCriterio(fila: ReportGasesCriterio): CriterioAceptacion {
    const veracidad = (min: string | null, max: string | null) => {
      const desde = this.numero(min);
      const hasta = this.numero(max);
      return desde === null || hasta === null ? null : { min: desde, max: hasta };
    };

    return {
      id: fila.id,
      grupo: fila.grupo as GrupoCriterio,
      desde: this.numero(fila.desde) ?? 0,
      hasta: this.numero(fila.hasta) ?? 0,
      repetibilidad: {
        CO: this.numero(fila.repetibilidad_co),
        SO2: this.numero(fila.repetibilidad_so2),
        NO: this.numero(fila.repetibilidad_no),
        O2: this.numero(fila.repetibilidad_o2),
      },
      reproducibilidad: {
        CO: this.numero(fila.reproducibilidad_co),
        SO2: this.numero(fila.reproducibilidad_so2),
        NO: this.numero(fila.reproducibilidad_no),
        O2: this.numero(fila.reproducibilidad_o2),
      },
      veracidad: {
        CO: veracidad(fila.veracidad_min_co, fila.veracidad_max_co),
        SO2: veracidad(fila.veracidad_min_so2, fila.veracidad_max_so2),
        NO: veracidad(fila.veracidad_min_no, fila.veracidad_max_no),
        O2: veracidad(fila.veracidad_min_o2, fila.veracidad_max_o2),
      },
    };
  }

  // ── Traducción: pantalla → payload ───────────────────────────────────────

  private aPayloadPatrones(
    registro: RegistroGasesCombustion,
    catalogos: CatalogosGases,
  ): GasesPatronPayload[] {
    const todos = [...registro.patronesMezcla, ...registro.patronesOxigeno];

    return todos
      .filter((fila) => fila.cilindroId !== null)
      .map((fila, indice) => ({
        ...(fila.id ? { id: fila.id } : {}),
        cilindro_id: fila.cilindroId as number,
        codigo_patron: fila.codigo,
        vencimiento_patron: this.aISO(fila.vencimiento),
        orden: indice,
        valores: this.aPayloadValores(fila.valores, catalogos),
      }));
  }

  /**
   * Una concentración por gas del cilindro. Se mandan también las nulas: en la
   * hoja un gas sin concentración es un "---" explícito, no un dato ausente.
   */
  private aPayloadValores(valores: ValoresPorGas<number>, catalogos: CatalogosGases) {
    return Object.entries(valores)
      .map(([sigla, valor]) => ({
        ctgas_id: catalogos.gasesPorSigla[sigla as GasId] ?? 0,
        valor_nominal: this.aDecimal(valor),
      }))
      .filter((valor) => valor.ctgas_id > 0);
  }

  /**
   * La medición referencia la fila de patrón de la hoja, pero la pantalla
   * razona en cilindros, que es lo que el analista ve en la columna "No. GAS".
   *
   * Al crear la hoja los patrones todavía no tienen id, así que va
   * `patron_cilindro_id` y el backend lo resuelve. Al editar ya se conocen los
   * ids, pero se sigue mandando el cilindro cuando la fila de patrón es nueva.
   */
  private aPayloadMediciones(
    registro: RegistroGasesCombustion,
    catalogos: CatalogosGases,
    conIds: boolean,
  ): GasesMedicionPayload[] {
    const patronPorCilindro = new Map(
      [...registro.patronesMezcla, ...registro.patronesOxigeno]
        .filter((fila) => fila.cilindroId !== null && fila.id)
        .map((fila) => [fila.cilindroId as number, fila.id as string]),
    );

    const payload: GasesMedicionPayload[] = [];

    for (const bloque of registro.bloques) {
      const ctgasId = catalogos.gasesPorSigla[bloque.gas];
      if (!ctgasId) continue;

      bloque.filas.forEach((fila, indice) => {
        const patronId = conIds && fila.cilindroId ? patronPorCilindro.get(fila.cilindroId) : null;

        payload.push({
          ctgas_id: ctgasId,
          ...(patronId
            ? { gases_patron_id: patronId }
            : { patron_cilindro_id: fila.cilindroId ?? null }),
          fecha_medicion: this.aISO(fila.fecha),
          x1: this.aDecimal(fila.x1),
          x2: this.aDecimal(fila.x2),
          observaciones: fila.observaciones || null,
          realizado_por_id: fila.realizadoPorId,
          revisado_por_id: fila.revisadoPorId,
          orden: indice,
        });
      });
    }

    return payload;
  }

  private aPayloadInspecciones(registro: RegistroGasesCombustion): GasesInspeccionSondaPayload[] {
    return registro.inspecciones
      .filter((fila) => fila.cttrimestreId !== null)
      .map((fila, indice) => ({
        cttrimestre_id: fila.cttrimestreId as number,
        fecha_inicio: this.aISO(fila.fechaInicio),
        fecha_fin: fila.fechaFin ? this.aISO(fila.fechaFin) : null,
        medida_fluctuaciones: fila.medidaFluctuaciones,
        termocupla_contacto: fila.termocuplaContacto,
        conexiones_fugas: fila.conexionesFugas,
        deformaciones: fila.deformaciones,
        marcas_uso: fila.marcasUso,
        ctdiagnostico_id: fila.ctdiagnosticoId,
        observaciones: fila.observaciones || null,
        realizado_por_id: fila.realizadoPorId,
        revisado_por_id: fila.revisadoPorId,
        orden: indice,
      }));
  }

  // ── Utilidades ───────────────────────────────────────────────────────────

  private consultar<T>(query: unknown, coleccion: string, id: string): Observable<T[]> {
    return this.apollo
      .use(CLIENTE_REPORTES)
      .query<Record<string, RespuestaColeccion<T>>>({
        query: query as never,
        variables: { id },
        fetchPolicy: 'network-only',
      })
      .pipe(map((resultado) => resultado.data?.[coleccion]?.data ?? []));
  }

  private consultarUno<T>(query: unknown, coleccion: string, id: string): Observable<T | null> {
    return this.consultar<T>(query, coleccion, id).pipe(map((filas) => filas[0] ?? null));
  }

  /** Las cuatro concentraciones de una fila, indexadas por sigla de gas. */
  private valoresPorGas(fila: {
    valor_no: string | null;
    valor_co: string | null;
    valor_so2: string | null;
    valor_o2: string | null;
  }): ValoresPorGas<number> {
    return {
      NO: this.numero(fila.valor_no),
      CO: this.numero(fila.valor_co),
      SO2: this.numero(fila.valor_so2),
      O2: this.numero(fila.valor_o2),
    };
  }

  /**
   * La familia viaja como MEZCLA u OXIGENO: es el dominio del CHECK de
   * `CT_GAS_CILINDRO`. La pantalla la nombra en minúscula, que es como la
   * rotulan las dos tablas del formato.
   */
  private familiaDe(familia: string | null): FamiliaPatron {
    return familia?.toUpperCase() === 'OXIGENO' ? 'oxigeno' : 'mezcla';
  }

  /**
   * Un decimal listo para viajar al backend: **texto, no número**.
   *
   * El DTO valida las columnas `decimal` con `@IsDecimal`, que solo acepta
   * cadenas. Mandar `20.1` como número devuelve un 400 con "is not a valid
   * decimal number" por cada campo.
   */
  private aDecimal(valor: number | null | undefined): string | null {
    return valor === null || valor === undefined ? null : String(valor);
  }

  /** Los decimales llegan como texto para no perder precisión. */
  private numero(valor: string | null | undefined): number | null {
    if (valor === null || valor === undefined || valor === '') return null;
    const parseado = Number(valor);
    return Number.isFinite(parseado) ? parseado : null;
  }

  /**
   * `yyyy-MM-dd` para un `<input type="date">`, sin pasar por la zona horaria:
   * recortar el ISO evita que una fecha en UTC medianoche retroceda un día.
   */
  private soloFecha(valor: string | null | undefined): string {
    if (!valor) return '';
    if (/^\d+$/.test(valor)) return new Date(Number(valor)).toISOString().slice(0, 10);
    return valor.slice(0, 10);
  }

  /** Y de vuelta: el backend valida `IsDateString`, así que va el ISO completo. */
  private aISO(fecha: string): string {
    return fecha ? `${fecha.slice(0, 10)}T00:00:00.000Z` : fecha;
  }

  private hoy(): string {
    return new Date().toISOString().slice(0, 10);
  }
}
