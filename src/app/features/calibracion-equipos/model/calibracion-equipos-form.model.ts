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
