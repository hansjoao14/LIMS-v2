import { gql } from 'apollo-angular';
import { META_FIELDS } from '../fragments';

/**
 * Colecciones de gases de combustión en `api-reportes`.
 *
 * Seis, una por vista. El `where` va como variable y no escrito en el
 * documento, para armarlo en TypeScript según lo que haga falta; el WhereInput
 * no expone `OR`, así que el buscador del listado filtra por un campo a la vez.
 *
 * ⚠️ **Toda query manda `estado: { equals: true }`.** Las vistas no filtran el
 * estado: lo exponen como columna para que el `where` decida. Sin esa condición,
 * después de la primera edición cada fila sale dos veces — la vigente y la que
 * quedó dada de baja.
 *
 * @see faq-monorepo/docs/gases-combustion.md §8
 */

const REPORT_GASES_COMBUSTION_FIELDS = `
  id
  num_secuencial
  secuencial_id
  ctformulario_id
  tipo_formulario
  analista_id
  analista_nombre
  anio
  fecha_verificacion
  observaciones
  total_mediciones
  mediciones_no_cumplen
  primera_medicion
  ultima_medicion
  total_inspecciones
  ctestado_id
  ctestado_nombre
  entidad_id
  estado
  ruta_archivo_pdf
  creado_en
  creado_por
`;

const REPORT_GASES_PATRON_FIELDS = `
  id
  gases_combustion_id
  cilindro_id
  etiqueta
  familia
  codigo_patron
  vencimiento_patron
  codigo_vencimiento
  valor_no
  valor_co
  valor_so2
  valor_o2
  orden
  estado
`;

const REPORT_GASES_MEDICION_FIELDS = `
  id
  gases_combustion_id
  ctgas_id
  gas_sigla
  gas_nombre
  gases_patron_id
  patron_etiqueta
  fecha_medicion
  x1
  x2
  xmed
  r_observada
  rr_observada
  porcentaje_recuperacion
  valor_teorico
  cumple
  criterio_limite_id
  observaciones
  realizado_por_id
  realizado_por_nombre
  revisado_por_id
  revisado_por_nombre
  orden
  estado
`;

const REPORT_GASES_INSPECCION_SONDA_FIELDS = `
  id
  gases_combustion_id
  cttrimestre_id
  trimestre_nombre
  trimestre_sigla
  fecha_inicio
  fecha_fin
  medida_fluctuaciones
  termocupla_contacto
  conexiones_fugas
  deformaciones
  marcas_uso
  tiene_novedad
  ctdiagnostico_id
  diagnostico_nombre
  observaciones
  realizado_por_id
  realizado_por_nombre
  revisado_por_id
  revisado_por_nombre
  orden
  estado
`;

const REPORT_GASES_CRITERIO_FIELDS = `
  id
  grupo
  desde
  hasta
  orden
  vigente_desde
  vigente_hasta
  estado
  repetibilidad_co
  repetibilidad_so2
  repetibilidad_no
  repetibilidad_o2
  reproducibilidad_co
  reproducibilidad_so2
  reproducibilidad_no
  reproducibilidad_o2
  veracidad_min_co
  veracidad_max_co
  veracidad_min_so2
  veracidad_max_so2
  veracidad_min_no
  veracidad_max_no
  veracidad_min_o2
  veracidad_max_o2
`;

const REPORT_GASES_CILINDRO_FIELDS = `
  id
  etiqueta
  familia
  codigo
  vencimiento
  codigo_vencimiento
  vencido
  valor_no
  valor_co
  valor_so2
  valor_o2
  orden
  estado
`;

/** Listado paginado de hojas de verificación. */
export const GET_COLLECTION_REPORT_GASES_COMBUSTION = gql`
  query CollectionReportGasesCombustion($q: ReportGasesCombustionQueryInput) {
    collectionReportGasesCombustion(query: $q) {
      count
      data { ${REPORT_GASES_COMBUSTION_FIELDS} }
      meta { ${META_FIELDS} }
    }
  }
`;

/** Una hoja por id, para precargar la pantalla al editar. */
export const GET_REPORT_GASES_COMBUSTION_BY_ID = gql`
  query ReportGasesCombustionById($id: String!) {
    collectionReportGasesCombustion(
      query: { where: { id: { equals: $id } }, pagination: { page: 1, take: 1 } }
    ) {
      data { ${REPORT_GASES_COMBUSTION_FIELDS} }
    }
  }
`;

/** Patrones de una hoja, en el orden en que se imprimen. */
export const GET_REPORT_GASES_PATRON = gql`
  query ReportGasesPatron($id: String!) {
    collectionReportGasesPatron(
      query: {
        where: { gases_combustion_id: { equals: $id }, estado: { equals: true } }
        orderBy: { orden: ASC }
        pagination: { page: null, take: 100 }
      }
    ) {
      data { ${REPORT_GASES_PATRON_FIELDS} }
    }
  }
`;

/** Mediciones de una hoja, con los cálculos ya resueltos por la vista. */
export const GET_REPORT_GASES_MEDICION = gql`
  query ReportGasesMedicion($id: String!) {
    collectionReportGasesMedicion(
      query: {
        where: { gases_combustion_id: { equals: $id }, estado: { equals: true } }
        # 200 es el tope del PaginationInput. Alcanza de sobra: una hoja son
        # cuatro gases con unas pocas mediciones cada uno.
        orderBy: { orden: ASC }
        pagination: { page: null, take: 200 }
      }
    ) {
      data { ${REPORT_GASES_MEDICION_FIELDS} }
    }
  }
`;

/** Inspecciones trimestrales de la sonda de una hoja. */
export const GET_REPORT_GASES_INSPECCION_SONDA = gql`
  query ReportGasesInspeccionSonda($id: String!) {
    collectionReportGasesInspeccionSonda(
      query: {
        where: { gases_combustion_id: { equals: $id }, estado: { equals: true } }
        orderBy: { orden: ASC }
        pagination: { page: null, take: 100 }
      }
    ) {
      data { ${REPORT_GASES_INSPECCION_SONDA_FIELDS} }
    }
  }
`;

/**
 * Criterios de aceptación vigentes. No se filtra la vigencia acá: la hoja los
 * pinta completos y el backend es quien decide cuál aplicó a cada medición.
 */
export const GET_REPORT_GASES_CRITERIO = gql`
  query ReportGasesCriterio {
    collectionReportGasesCriterio(
      query: {
        where: { estado: { equals: true } }
        orderBy: { desde: ASC }
        pagination: { page: null, take: 100 }
      }
    ) {
      data { ${REPORT_GASES_CRITERIO_FIELDS} }
    }
  }
`;

/** Cilindros patrón del catálogo, para el combo de la tabla de patrones. */
export const GET_REPORT_GASES_CILINDRO = gql`
  query ReportGasesCilindro {
    collectionReportGasesCilindro(
      query: {
        where: { estado: { equals: true } }
        orderBy: { orden: ASC }
        pagination: { page: null, take: 100 }
      }
    ) {
      data { ${REPORT_GASES_CILINDRO_FIELDS} }
    }
  }
`;

/**
 * Ids de los catálogos del módulo, buscados por nombre.
 *
 * Va con `query` y no con el `watchQuery` de `CatalogoService`: un `watchQuery`
 * con `cache-first` puede emitir una primera vez sin datos, y un `take(1)`
 * encima se queda con ese vacío y además **cancela la petición en vuelo** —se ve
 * como un request fallido en la pestaña de red—. Una consulta que completa sola
 * no tiene ese problema.
 */
export const GET_IDS_CATALOGOS_GASES = gql`
  query IdsCatalogosGases($nombres: [String!]!) {
    collectionCatalogo(
      query: { where: { nombre: { in: $nombres } }, pagination: { page: null, take: 100 } }
    ) {
      data {
        id
        nombre
      }
    }
  }
`;

/**
 * Los cinco catálogos de la pantalla en **una** consulta, con alias.
 *
 * Se piden por id porque así es el `where` de la colección, pero esos ids no se
 * escriben en ningún lado: los resuelve el servicio por nombre contra
 * `collectionCatalogo`. Son IDENTITY y no coinciden entre ambientes, que es
 * justo lo que advierte el script 01 del módulo.
 */
export const GET_CATALOGOS_GASES = gql`
  query CatalogosGases(
    $gases: Int!
    $definiciones: Int!
    $formato: Int!
    $trimestre: Int!
    $diagnostico: Int!
  ) {
    gases: collectionItemCatalogo(
      query: {
        where: { catalogo_id: { equals: $gases }, estado: { equals: true } }
        pagination: { page: null, take: 100 }
      }
    ) {
      data {
        id
        nombre
        sigla
        orden
        item_catalogo_id
      }
    }
    definiciones: collectionItemCatalogo(
      query: {
        where: { catalogo_id: { equals: $definiciones }, estado: { equals: true } }
        pagination: { page: null, take: 100 }
      }
    ) {
      data {
        id
        nombre
        sigla
        orden
        item_catalogo_id
      }
    }
    formato: collectionItemCatalogo(
      query: {
        where: { catalogo_id: { equals: $formato }, estado: { equals: true } }
        pagination: { page: null, take: 100 }
      }
    ) {
      data {
        id
        nombre
        sigla
        orden
        item_catalogo_id
      }
    }
    trimestre: collectionItemCatalogo(
      query: {
        where: { catalogo_id: { equals: $trimestre }, estado: { equals: true } }
        pagination: { page: null, take: 100 }
      }
    ) {
      data {
        id
        nombre
        sigla
        orden
        item_catalogo_id
      }
    }
    diagnostico: collectionItemCatalogo(
      query: {
        where: { catalogo_id: { equals: $diagnostico }, estado: { equals: true } }
        pagination: { page: null, take: 100 }
      }
    ) {
      data {
        id
        nombre
        sigla
        orden
        item_catalogo_id
      }
    }
  }
`;
