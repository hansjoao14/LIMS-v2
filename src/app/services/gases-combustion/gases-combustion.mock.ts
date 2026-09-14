/**
 * Datos de ejemplo del Registro de Verificación de Gases de Combustión.
 *
 * ⚠️ TEMPORAL. Existe solo mientras el módulo REST de `api-solicitud` y las
 * vistas de `REPORTES` no están construidos. `GasesCombustionService` es el
 * único que importa este archivo: cuando el backend esté listo se cambian los
 * `of(...)` del servicio por sus `http.get(...)` y este archivo se borra
 * completo, sin tocar componentes.
 */
import { ReportGasesCombustion } from '../../interfaces/gases-combustion/report-gases-combustion.interface';
import {
  BloqueMediciones,
  CatalogoPatrones,
  CriterioAceptacion,
  DefinicionGases,
  GasesCombustionMetadata,
  MedicionGas,
  RegistroGasesCombustion,
} from '../../interfaces/gases-combustion/gases-combustion.interface';

export const METADATA_MOCK: GasesCombustionMetadata = {
  procedimiento: 'PEE/IAM–Q/07 ; I/IAM-Q/08',
  codigoEquipo: 'IMD-21-23 / IMD-21-24',
  anio: 2025,
};

/**
 * Cilindros patrón certificados. `valores` es la concentración nominal de cada
 * cilindro: el valor teórico del porcentaje de recuperación.
 */
export const CATALOGO_PATRONES_MOCK: CatalogoPatrones = {
  mezcla: [
    {
      id: 'M1',
      etiqueta: 'M1',
      familia: 'mezcla',
      codigo: 'EA0035861',
      vencimiento: '20-12-25',
      valores: { NO: 20.1, CO: 20.1, SO2: 20.1 },
    },
    {
      id: 'M2',
      etiqueta: 'M2',
      familia: 'mezcla',
      codigo: 'EA0035862',
      vencimiento: '20-12-30',
      valores: { NO: 48.44, CO: 50.48, SO2: 50.07 },
    },
    {
      id: 'M3',
      etiqueta: 'M3',
      familia: 'mezcla',
      codigo: 'EA0035863',
      vencimiento: '15-06-26',
      valores: { NO: 101.2, CO: 100.75, SO2: 99.8 },
    },
    {
      id: 'M4',
      etiqueta: 'M4',
      familia: 'mezcla',
      codigo: 'EA0035864',
      vencimiento: '15-06-26',
      valores: { NO: 248.6, CO: 250.3, SO2: 251.1 },
    },
    {
      id: 'M5',
      etiqueta: 'M5',
      familia: 'mezcla',
      codigo: 'EA0035865',
      vencimiento: '30-09-27',
      valores: { NO: 492.0, CO: 490.5, SO2: 495.2 },
    },
    {
      id: 'M6',
      etiqueta: 'M6',
      familia: 'mezcla',
      codigo: 'EA0035866',
      vencimiento: '30-09-27',
      valores: { NO: 980.4, CO: 1000.1, SO2: 995.6 },
    },
  ],
  oxigeno: [
    {
      id: 'OX1',
      etiqueta: 'OX1',
      familia: 'oxigeno',
      codigo: 'FFS27856',
      vencimiento: '10-10-26',
      valores: { O2: 6.251 },
    },
    {
      id: 'OX2',
      etiqueta: 'OX2',
      familia: 'oxigeno',
      codigo: 'FFS27857',
      vencimiento: '10-10-26',
      valores: { O2: 12.1 },
    },
    {
      id: 'OX3',
      etiqueta: 'OX3',
      familia: 'oxigeno',
      codigo: 'FFS27858',
      vencimiento: '10-10-26',
      valores: { O2: 17.85 },
    },
  ],
};

/**
 * Criterios de aceptación de la norma. `null` en un gas significa que ese gas
 * no se evalúa en ese rango — se pinta como "---" en la tabla.
 */
export const CRITERIOS_MOCK: CriterioAceptacion[] = [
  {
    id: 'mezcla-20-50',
    grupo: 'MEZCLA_PPM',
    desde: 20,
    hasta: 50,
    repetibilidad: { CO: 1, SO2: 1, NO: 1, O2: null },
    reproducibilidad: { CO: 1, SO2: 1, NO: 1, O2: null },
    veracidad: {
      CO: { min: 90, max: 110 },
      SO2: { min: 90, max: 110 },
      NO: { min: 90, max: 110 },
      O2: null,
    },
  },
  {
    id: 'mezcla-51-100',
    grupo: 'MEZCLA_PPM',
    desde: 51,
    hasta: 100,
    repetibilidad: { CO: 1, SO2: 1, NO: 1, O2: null },
    reproducibilidad: { CO: 1, SO2: 1, NO: 1, O2: null },
    veracidad: {
      CO: { min: 90, max: 110 },
      SO2: { min: 90, max: 110 },
      NO: { min: 90, max: 110 },
      O2: null,
    },
  },
  {
    id: 'mezcla-101-250',
    grupo: 'MEZCLA_PPM',
    desde: 101,
    hasta: 250,
    repetibilidad: { CO: 1, SO2: 1, NO: 1, O2: null },
    reproducibilidad: { CO: 1, SO2: 1, NO: 3, O2: null },
    veracidad: {
      CO: { min: 90, max: 110 },
      SO2: { min: 90, max: 110 },
      NO: { min: 90, max: 110 },
      O2: null,
    },
  },
  {
    id: 'mezcla-251-500',
    grupo: 'MEZCLA_PPM',
    desde: 251,
    hasta: 500,
    repetibilidad: { CO: 2, SO2: 4, NO: 3, O2: null },
    reproducibilidad: { CO: 3, SO2: 3, NO: 8, O2: null },
    veracidad: {
      CO: { min: 90, max: 110 },
      SO2: { min: 90, max: 110 },
      NO: { min: 90, max: 110 },
      O2: null,
    },
  },
  {
    id: 'mezcla-501-1000',
    grupo: 'MEZCLA_PPM',
    desde: 501,
    hasta: 1000,
    repetibilidad: { CO: 2, SO2: 5, NO: 5, O2: null },
    reproducibilidad: { CO: 5, SO2: 5, NO: 16, O2: null },
    veracidad: {
      CO: { min: 90, max: 110 },
      SO2: { min: 90, max: 110 },
      NO: { min: 90, max: 110 },
      O2: null,
    },
  },
  {
    id: 'o2-6-12',
    grupo: 'O2_PORCENTAJE',
    desde: 6.0,
    hasta: 12.0,
    repetibilidad: { CO: null, SO2: null, NO: null, O2: 0.05 },
    reproducibilidad: { CO: null, SO2: null, NO: null, O2: 0.06 },
    veracidad: { CO: null, SO2: null, NO: null, O2: { min: 97.5, max: 102.5 } },
  },
  {
    id: 'o2-12-18',
    grupo: 'O2_PORCENTAJE',
    desde: 12.01,
    hasta: 18.0,
    repetibilidad: { CO: null, SO2: null, NO: null, O2: 0.08 },
    reproducibilidad: { CO: null, SO2: null, NO: null, O2: 0.08 },
    veracidad: { CO: null, SO2: null, NO: null, O2: { min: 97.5, max: 102.5 } },
  },
];

export const DEFINICIONES_MOCK: DefinicionGases[] = [
  { id: 'xmed', texto: 'X₁, X₂, XMED: valores medidos 1, 2 y su promedio.' },
  { id: 'r', texto: 'r95,45%: límite de repetibilidad, número entero.' },
  { id: 'rr', texto: 'R95,45%: límite de reproducibilidad, número entero.' },
  { id: 'porcentaje-r', texto: '%R: porcentaje de recuperación (veracidad).' },
];

/** Arma una fila de medición sin repetir los campos vacíos en cada literal. */
const medicion = (
  id: string,
  fecha: string,
  patronId: string,
  x1: number,
  x2: number,
  reproducibilidad: number | null,
  realizadoPor: string,
): MedicionGas => ({
  id,
  fecha,
  patronId,
  x1,
  x2,
  reproducibilidad,
  estadoCeldas: '',
  estadoFiltros: '',
  observaciones: '',
  realizadoPor,
  revisadoPor: '',
});

const MEDICIONES_MEZCLA_MOCK = (gas: string): MedicionGas[] => [
  medicion(`${gas}-1`, '2024-11-29', 'M1', 19, 19, 1, 'Tec. Jorge Díaz'),
  medicion(`${gas}-2`, '2024-11-29', 'M1', 21, 20, 1, 'Tec. Jorge Díaz'),
  medicion(`${gas}-3`, '2024-11-29', 'M2', 49, 50, 1, 'Tec. Jorge Díaz'),
  medicion(`${gas}-4`, '2024-11-29', 'M3', 99, 100, 2, 'Tec. Ana Lema'),
  medicion(`${gas}-5`, '2024-11-29', 'M4', 246, 248, 3, 'Tec. Ana Lema'),
  medicion(`${gas}-6`, '2024-11-29', 'M5', 492, 492, 4, 'Tec. Ana Lema'),
  medicion(`${gas}-7`, '2024-11-29', 'M6', 970, 975, 5, 'Tec. Ana Lema'),
];

const MEDICIONES_OXIGENO_MOCK: MedicionGas[] = [
  medicion('O2-1', '2024-11-29', 'OX1', 6.24, 6.26, 0.05, 'Tec. Jorge Díaz'),
  medicion('O2-2', '2024-11-29', 'OX1', 6.2, 6.3, 0.05, 'Tec. Jorge Díaz'),
  medicion('O2-3', '2024-11-29', 'OX2', 12.08, 12.11, 0.06, 'Tec. Ana Lema'),
  medicion('O2-4', '2024-11-29', 'OX3', 17.82, 17.88, 0.07, 'Tec. Ana Lema'),
];

const BLOQUES_MOCK: BloqueMediciones[] = [
  { gas: 'CO', aplica: true, filas: MEDICIONES_MEZCLA_MOCK('CO') },
  { gas: 'SO2', aplica: true, filas: MEDICIONES_MEZCLA_MOCK('SO2') },
  { gas: 'NO', aplica: true, filas: MEDICIONES_MEZCLA_MOCK('NO') },
  { gas: 'O2', aplica: true, filas: MEDICIONES_OXIGENO_MOCK },
];

export const REGISTRO_MOCK: RegistroGasesCombustion = {
  id: null,
  patronesMezcla: CATALOGO_PATRONES_MOCK.mezcla.map((patron) => ({
    patronId: patron.id,
    codigoVencimiento: `${patron.codigo} / ${patron.vencimiento}`,
    valores: { ...patron.valores },
  })),
  patronesOxigeno: CATALOGO_PATRONES_MOCK.oxigeno.map((patron) => ({
    patronId: patron.id,
    codigoVencimiento: `${patron.codigo} / ${patron.vencimiento}`,
    valores: { ...patron.valores },
  })),
  bloques: BLOQUES_MOCK,
};

/**
 * Hojas ya registradas, para el listado.
 *
 * Salen de `REPORTES.vw_gases_combustion_report`: por eso traen los nombres ya
 * resueltos y el resumen de mediciones calculado, en vez de ids sueltos.
 */
const hoja = (
  id: string,
  num: string | null,
  anio: number,
  fecha: string,
  analista: string,
  total: number,
  noCumplen: number,
  ctestado_id: number,
  ctestado_nombre: string,
  inspecciones = 0,
): ReportGasesCombustion => ({
  id,
  num_secuencial: num,
  secuencial_id: num ? 'sec-gc' : null,
  ctformulario_id: 2137,
  tipo_formulario: 'Formulario Registro de Verificación Gases de Combustión',
  analista_id: null,
  analista_nombre: analista,
  anio,
  fecha_verificacion: fecha,
  observaciones: null,
  total_mediciones: total,
  mediciones_no_cumplen: noCumplen,
  primera_medicion: fecha,
  ultima_medicion: fecha,
  total_inspecciones: inspecciones,
  ctestado_id,
  ctestado_nombre,
  entidad_id: 'F9687983-F6CF-4706-9004-A1B793E3A987',
  estado: true,
  ruta_archivo_pdf: null,
  creado_en: fecha,
  creado_por: 'system',
  actualizado_en: null,
  actualizado_por: null,
});

export const LISTADO_MOCK: ReportGasesCombustion[] = [
  hoja(
    '9c1f4a2e-7b30-4d51-8a6c-2f5e91d0a4b7',
    'GC-00004-2026',
    2026,
    '2026-09-02',
    'Vinicio Borja',
    12,
    0,
    2,
    'Pendiente',
    1,
  ),
  hoja(
    '4d7e2b91-05c3-4a68-b1f7-8e30c94a2d61',
    'GC-00003-2026',
    2026,
    '2026-06-18',
    'Tec. Ana Lema',
    20,
    2,
    387,
    'Autorizado',
    2,
  ),
  hoja(
    'b82a6f30-9d14-4c75-a0e8-53f1c7b04e29',
    'GC-00002-2026',
    2026,
    '2026-03-11',
    'Tec. Jorge Díaz',
    25,
    4,
    387,
    'Autorizado',
    1,
  ),
  hoja(
    'e51c9704-2a68-4bd3-97f0-1c46b8e5a730',
    'GC-00001-2026',
    2026,
    '2026-01-15',
    'Tec. Jorge Díaz',
    18,
    0,
    387,
    'Autorizado',
    1,
  ),
  hoja(
    '7a0d3c58-6e91-4f27-b3a5-0d92f14c6e83',
    'GC-00009-2025',
    2025,
    '2025-11-29',
    'Tec. Ana Lema',
    25,
    7,
    51,
    'Rechazado',
  ),
  hoja(
    'c36b1e82-4f07-49a5-8d61-2b70e9c4a158',
    null,
    2025,
    '2025-10-04',
    'Vinicio Borja',
    6,
    0,
    388,
    'Creado',
  ),
  hoja(
    '1f94a507-8c26-4e30-b95d-7a013e6c2b48',
    'GC-00007-2025',
    2025,
    '2025-07-22',
    'Tec. Jorge Díaz',
    22,
    1,
    387,
    'Autorizado',
    3,
  ),
  hoja(
    'a25e738c-0b41-4f96-82d7-6c59104ae3b2',
    'GC-00006-2025',
    2025,
    '2025-05-13',
    'Tec. Ana Lema',
    25,
    0,
    387,
    'Autorizado',
    2,
  ),
  hoja(
    '68d0c491-3a75-42eb-9f14-b0e872c5d306',
    'GC-00005-2025',
    2025,
    '2025-02-27',
    'Tec. Jorge Díaz',
    14,
    3,
    387,
    'Autorizado',
    1,
  ),
  hoja(
    '5b17f2ae-9c64-4083-a7d2-e41306b9c5f7',
    'GC-00004-2025',
    2025,
    '2025-01-09',
    'Vinicio Borja',
    19,
    0,
    387,
    'Autorizado',
    1,
  ),
  hoja(
    'd943e60b-17a8-4c52-b8f0-39c7e2a140d6',
    'GC-00003-2024',
    2024,
    '2024-11-29',
    'Tec. Jorge Díaz',
    25,
    5,
    387,
    'Autorizado',
    4,
  ),
  hoja(
    '30f8b125-c4d9-476a-91e3-8b2507fa6c94',
    'GC-00002-2024',
    2024,
    '2024-08-16',
    'Tec. Ana Lema',
    21,
    2,
    387,
    'Autorizado',
    2,
  ),
];
