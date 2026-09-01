import { DynamicFormConfig } from '../../../shared/dynamic-form';

/**
 * Configuración del formulario dinámico de Verificación Intermedia de
 * Calibradores Acústicos (tipo_formulario_id 2087) para el motor de
 * `shared/dynamic-form`.
 *
 * ⚠️ Este formulario llega SIN agrupar desde el backend: de sus 24 preguntas,
 * ninguna trae `grupo_texto` y solo dos traen `seccion`. Tal cual, el motor no
 * renderizaría nada (las preguntas sin `seccion` no pertenecen a ningún paso) y
 * cada pregunta sería su propia tarjeta, porque `grupoDe()` cae al `nombre`.
 *
 * Por eso todo el agrupamiento vive en `ajustesAgrupacion`, siguiendo los cinco
 * bloques del formulario físico: un equipo por tarjeta. Es el parche que el
 * motor prevé, no la solución definitiva: lo correcto es cargar `seccion` y
 * `grupo_texto` en la configuración de BD del formulario 2087 y vaciar el mapa.
 */

/** Única sección: el formulario se llena en una sola pantalla. */
export const SECCION_CALIBRACION = 1;

export const GRUPO_SONOMETRO = 'SONOMETRO';
export const GRUPO_CALIBRADOR = 'CALIBRADOR_PC';
export const GRUPO_PATRON = 'PATRON_PL';
export const GRUPO_ESTACION = 'ESTACION_EM';
export const GRUPO_COMPLEMENTARIOS = 'COMPLEMENTARIOS';

/** Layout propio: cada bloque de equipo se pinta con la plantilla del feature. */
export const LAYOUT_EQUIPO = 'equipo';
export const LAYOUT_COMPLEMENTARIOS = 'complementarios';

// ── Campos del schema ──────────────────────────────────────────────────────
export const CAMPO_COD_SONOMETRO = 'codigo_sonometro';
export const CAMPO_COD_CALIBRADOR = 'calibrador_acustico_campo';
export const CAMPO_COD_PATRON = 'codigo_patron_laboratorio';
export const CAMPO_COD_ESTACION = 'codigo_estacion_metereologica';

export const CAMPO_FECHA_SONOMETRO = 'fecha_ultima_calibracion_sonometro';
export const CAMPO_FECHA_CALIBRADOR = 'fecha_ultima_calibrador_acustico_campo';
export const CAMPO_FECHA_PATRON = 'fecha_ultima_calibracion_patron_laboratorio';

export const CAMPO_LECTURA_PC = 'lectura_observada_sonometro_PC';
export const CAMPO_LECTURA_PL = 'lectura_observada_sonometro_PL';
export const CAMPO_ERROR_PC = 'error_pc_114dB';
export const CAMPO_ERROR_PL = 'error_pl_114dB';
export const CAMPO_TOLERANCIA = 'tolerancia_patron_laboratorio_dB';
export const CAMPO_OBSERVACIONES = 'observaciones';

/**
 * Las cuatro fechas de la estación meteorológica salen de un mismo ítem de
 * catálogo, cuyo `valor` es un JSON con una entrada por magnitud. La clave es
 * el `header` con el que vienen escritas en ese JSON.
 */
export const FECHAS_ESTACION: Record<string, string> = {
  fecha_ultima_calibracion_EM_velocidad_viento:
    'Fecha de última calibración EM - velocidad de viento',
  fecha_ultima_calibracion_EM_direccion_viento:
    'Fecha de última calibración EM - dirección viento',
  fecha_ultima_calibracion_EM_temperatura: 'Fecha de última calibración EM - temperatura',
  fecha_ultima_calibracion_EM_humedad: 'Fecha de última calibración EM - humedad',
};

// ── Catálogos ──────────────────────────────────────────────────────────────
/** Nivel de referencia del sonómetro para cada patrón (columna `valor`). */
export const CATALOGO_VALOR_PL = 1021;
export const CATALOGO_VALOR_PC = 1022;

/** Vigencia de una calibración, en días. */
export const DIAS_VIGENCIA_CALIBRACION = 90;

/** Qué campo de fecha completa cada selector de equipo. */
export const FECHA_POR_EQUIPO: Record<string, string> = {
  [CAMPO_COD_SONOMETRO]: CAMPO_FECHA_SONOMETRO,
  [CAMPO_COD_CALIBRADOR]: CAMPO_FECHA_CALIBRADOR,
  [CAMPO_COD_PATRON]: CAMPO_FECHA_PATRON,
};

// ── Tarjetas de "Fecha de última calibración de los equipos" ────────────────

/** Una tarjeta del bloque de fechas: qué equipo es y con qué icono se pinta. */
export interface TarjetaFecha {
  /** Campo del formulario del que sale la fecha. */
  key: string;
  /** Rótulo del equipo o la magnitud, en la tarjeta. */
  titulo: string;
  /** `d` del `<path>` del icono (heroicons outline, 24x24). */
  icono: string;
}

/** Bloque de tarjetas con su encabezado. */
export interface GrupoFechas {
  titulo: string;
  tarjetas: TarjetaFecha[];
}

const ICONO_SONOMETRO =
  'M9 3h6a1 1 0 011 1v16a1 1 0 01-1 1H9a1 1 0 01-1-1V4a1 1 0 011-1zm1.5 3h3m-3 3h3m-3 3h3';
const ICONO_CALIBRADOR =
  'M11 5L6 9H2v6h4l5 4V5zm4.54 3.46a5 5 0 010 7.07m2.83-9.9a9 9 0 010 12.73';
const ICONO_PATRON = 'M9 3v6l-5.5 9.5A1 1 0 004.4 20h15.2a1 1 0 00.9-1.5L15 9V3M8 3h8M7 14h10';
const ICONO_TEMPERATURA =
  'M12 3a2 2 0 012 2v8.2a4 4 0 11-4 0V5a2 2 0 012-2zm0 12.5a1.5 1.5 0 100 3 1.5 1.5 0 000-3z';
const ICONO_VIENTO = 'M3 8h11a3 3 0 10-3-3M3 12h15a3 3 0 11-3 3M3 16h9a2.5 2.5 0 112.5 2.5';
const ICONO_DIRECCION_VIENTO = 'M12 2l7 20-7-5-7 5 7-20z';
const ICONO_HUMEDAD = 'M12 3s6 6.5 6 10.5a6 6 0 11-12 0C6 9.5 12 3 12 3z';

/**
 * Las siete fechas del formulario, en los dos bloques del F-PEE-11-02:
 * los equipos acústicos y las magnitudes de la estación meteorológica.
 *
 * Es la fuente única del bloque "Fecha de última calibración de los equipos":
 * el orden de la pantalla es el de este arreglo, y sumar una fecha nueva es
 * agregar una entrada, no tocar la plantilla.
 *
 * Los títulos son los del equipo, no el texto de la pregunta del schema
 * ("Fecha de última calibración EM - humedad"): la tarjeta ya dice "última
 * calibración" en su etiqueta, repetirlo en cada título no aporta.
 */
export const GRUPOS_FECHAS: GrupoFechas[] = [
  {
    titulo: 'Acústicos',
    tarjetas: [
      { key: CAMPO_FECHA_SONOMETRO, titulo: 'Sonómetro', icono: ICONO_SONOMETRO },
      {
        key: CAMPO_FECHA_CALIBRADOR,
        titulo: 'Calibrador acústico de campo',
        icono: ICONO_CALIBRADOR,
      },
      { key: CAMPO_FECHA_PATRON, titulo: 'Patrón de laboratorio', icono: ICONO_PATRON },
    ],
  },
  {
    titulo: 'Ambientales',
    tarjetas: [
      {
        key: 'fecha_ultima_calibracion_EM_temperatura',
        titulo: 'Temperatura',
        icono: ICONO_TEMPERATURA,
      },
      {
        key: 'fecha_ultima_calibracion_EM_humedad',
        titulo: 'Humedad',
        icono: ICONO_HUMEDAD,
      },
      {
        key: 'fecha_ultima_calibracion_EM_velocidad_viento',
        titulo: 'Velocidad de viento',
        icono: ICONO_VIENTO,
      },
      {
        key: 'fecha_ultima_calibracion_EM_direccion_viento',
        titulo: 'Dirección de viento',
        icono: ICONO_DIRECCION_VIENTO,
      },
    ],
  },
];

const agrupar = (
  grupo: string,
  nombres: string[],
): Record<string, { seccion: number; grupo: string }> =>
  Object.fromEntries(
    nombres.map((nombre) => [nombre, { seccion: SECCION_CALIBRACION, grupo }]),
  );

export const CALIBRACION_FORM_CONFIG: DynamicFormConfig = {
  grupos: {
    [GRUPO_SONOMETRO]: { titulo: 'Sonómetro', layout: LAYOUT_EQUIPO, orden: 10 },
    [GRUPO_CALIBRADOR]: {
      titulo: 'Calibrador Acústico de Campo (PC)',
      layout: LAYOUT_EQUIPO,
      orden: 20,
    },
    [GRUPO_PATRON]: { titulo: 'Patrón de Laboratorio (PL)', layout: LAYOUT_EQUIPO, orden: 30 },
    [GRUPO_ESTACION]: {
      titulo: 'Estación Meteorológica (EM)',
      layout: LAYOUT_EQUIPO,
      orden: 40,
    },
    [GRUPO_COMPLEMENTARIOS]: {
      titulo: 'Equipos y Accesorios Complementarios',
      layout: LAYOUT_COMPLEMENTARIOS,
      orden: 50,
    },
  },

  ajustesAgrupacion: {
    ...agrupar(GRUPO_SONOMETRO, [
      CAMPO_COD_SONOMETRO,
      CAMPO_FECHA_SONOMETRO,
      CAMPO_LECTURA_PC,
      CAMPO_LECTURA_PL,
      'baterias_adicionales_sonometro',
      'tripode_sonometro',
    ]),
    ...agrupar(GRUPO_CALIBRADOR, [
      CAMPO_COD_CALIBRADOR,
      CAMPO_FECHA_CALIBRADOR,
      CAMPO_ERROR_PC,
    ]),
    ...agrupar(GRUPO_PATRON, [
      CAMPO_COD_PATRON,
      CAMPO_FECHA_PATRON,
      CAMPO_ERROR_PL,
      CAMPO_TOLERANCIA,
    ]),
    ...agrupar(GRUPO_ESTACION, [
      CAMPO_COD_ESTACION,
      ...Object.keys(FECHAS_ESTACION),
      '2_baterias_AAA_adicionales_EM',
      'tripode_estacion_meteorologica',
    ]),
    ...agrupar(GRUPO_COMPLEMENTARIOS, [
      'cargador_baterías_AA_AAA',
      'gps',
      'procesador_formato',
      CAMPO_OBSERVACIONES,
    ]),
  },
};
