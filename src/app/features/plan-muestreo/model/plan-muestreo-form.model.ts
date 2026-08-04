import { DynamicFormConfig } from '../../../shared/dynamic-form';

/**
 * Configuración del formulario dinámico del Plan de Muestreo
 * (tipo_formulario_id 2019) para el motor de `shared/dynamic-form`: qué título,
 * layout y orden le toca a cada `grupo_texto`. El motor de agrupación, la
 * construcción de controles y el renderizado son compartidos; aquí solo queda
 * lo propio de este formulario.
 */
/** Layout propio de este formulario: el motor lo delega a la plantilla del paso. */
export const LAYOUT_PRESERVACION = 'preservacion';

/** Los volúmenes de la tabla de preservación arrancan vacíos, no en cero. */
export const LAYOUTS_NUMERO_VACIO = [LAYOUT_PRESERVACION];

export const PLAN_MUESTREO_FORM_CONFIG: DynamicFormConfig = {
  // La clave es el `grupo_texto` tal como lo envía el backend. `orden` es solo
  // un respaldo: el orden real lo manda `grupo_numerico` de cada pregunta.
  grupos: {
    // Paso 2
    'TIPO DE MUESTREO': { titulo: 'Tipo de Muestreo', layout: 'campos', orden: 10 },
    'PRESERVACIÓN DE LAS MUESTRAS': {
      titulo: 'Preservación de las Muestras',
      layout: LAYOUT_PRESERVACION,
      orden: 20,
    },
    'EQUIPOS MEDICIÓN IN SITU': {
      titulo: 'Equipos de Medición In Situ',
      layout: 'campos',
      orden: 30,
    },
    'EQUIPOS PRESERVACIÓN': { titulo: 'Equipos de Preservación', layout: 'campos', orden: 40 },
    'EQUIPOS MUESTREO': { titulo: 'Equipos de Muestreo', layout: 'toggles', orden: 50 },
    'CONDICIONES MOMENTO DE MUESTREO': {
      titulo: 'Condiciones Momento de Muestreo',
      layout: 'campos',
      orden: 60,
    },
    // Paso 3
    procedimiento_muestreo: {
      titulo: 'Procedimiento de Muestreo del Recurso Hídrico',
      layout: 'estatico',
      orden: 10,
    },
    'EQUIPAMIENTO DE SEGURIDAD': {
      titulo: 'Equipamiento de Seguridad',
      layout: 'campos',
      orden: 20,
    },
    'SOLUCIONES BUFFER Y ESTÁNDARES': {
      titulo: 'Soluciones Buffer y Estándares',
      layout: 'toggles-2col',
      orden: 30,
    },
    OBSERVACIONES: { titulo: 'Observaciones', layout: 'campos', orden: 40 },
  },

  // Tarjetas que no salen del formulario dinámico y se arman en la plantilla.
  gruposEstaticos: {
    3: ['procedimiento_muestreo'],
  },

  // Sin `ajustesAgrupacion`: el backend ya devuelve cada pregunta en su
  // `grupo_texto` y `seccion` correctos. El mapa que había reasignaba 5 de los
  // 8 buffers a otra clave y partía la tarjeta en dos.
};

/** Alto de los textarea que lo necesitan; el resto usa el valor por defecto. */
export const FILAS_TEXTAREA: Record<string, number> = {
  observaciones: 4,
  equipamiento_de_seguridad: 4,
};

/** Tipos de matriz que maneja el plan de muestreo (`ctambiente_id`). */
export const MATRIZ_AGUAS_SUPERFICIALES = 92;
export const MATRIZ_AGUAS_RESIDUALES = 93;

/**
 * Procedimiento de muestreo del recurso hídrico, según el tipo de matriz de la
 * solicitud. La API no lo devuelve todavía.
 * TODO(backend): exponerlo en el detalle y borrar esta constante.
 */
const PROCEDIMIENTO_POR_MATRIZ: Record<number, string> = {
  [MATRIZ_AGUAS_SUPERFICIALES]: 'PEE/IAMQ/42',
  [MATRIZ_AGUAS_RESIDUALES]: 'PG/IAMQ/08',
};

export function procedimientoDeMuestreo(tipoAguaId: number | null | undefined): string {
  return tipoAguaId != null ? (PROCEDIMIENTO_POR_MATRIZ[tipoAguaId] ?? '—') : '—';
}

/**
 * Tipo de recipiente de cada preservación. La API todavía no lo devuelve, así
 * que la última columna de la tabla se completa con este mapa.
 * TODO(backend): exponerlo en el formulario dinámico y borrar esta constante.
 */
const TIPO_RECIPIENTE: Record<string, string> = {
  temperatura_0_6_c: 'Vidrio opaco',
  h2so4: 'Vidrio opaco',
  hno3: 'Vidrio opaco',
};

export function tipoRecipiente(key: string): string {
  return TIPO_RECIPIENTE[key] ?? '—';
}
