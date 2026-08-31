import { PaginationMeta } from '../catalogos/catalogo.interface';

/**
 * Una verificación intermedia de calibradores acústicos, tal como la devuelve
 * `REPORTES.vw_calibracion_report`. La vista ya resuelve los nombres (analista,
 * calibrador, estado), así que este es el contrato completo de la fila: el
 * front no compone nada.
 */
export interface CalibracionEquipo {
  id: string;
  num_secuencial: string | null;
  secuencial_id: string | null;
  ctformulario_id: number;
  ctformulario_nombre: string | null;
  analista_id: string;
  analista_nombre: string | null;
  fecha_verificacion: string;
  /** `null` mientras la verificación no tenga error PL y tolerancia registrados. */
  evaluacion: 'CUMPLE' | 'NO CUMPLE' | null;
  observaciones: string | null;
  /** Calibrador acústico de campo verificado. */
  tipo_calibrador_id: number | null;
  tipo_calibrador: string | null;
  ctestado_id: number;
  ctestado_nombre: string | null;
  entidad_id: string;
  estado: boolean;
  creado_en: string;
  creado_por: string;
}

export interface CalibracionEquipoCollectionResponse {
  count: number;
  data: CalibracionEquipo[];
  meta: PaginationMeta;
}

/** Una página del listado, ya normalizada para la tabla. */
export interface CalibracionesPage {
  data: CalibracionEquipo[];
  meta: PaginationMeta;
}

/**
 * Una respuesta guardada, desde `REPORTES.vw_valor_calibracion_report`. Se usa
 * para precargar el formulario al editar: `atributo_formulario_nombre` es la
 * clave del control en el `FormGroup`.
 */
export interface RespuestaCalibracion {
  valor_calibracion_id: string;
  calibracion_id: string;
  atributo_formulario_id: string;
  atributo_formulario_nombre: string;
  ctipo_dato_nombre: string;
  valor_texto: string | null;
  valor_numero: string | null;
  valor_fecha: string | null;
  valor_booleano: boolean | null;
  valor_multiple: string | null;
  valor_catalogo: number | null;
  estado: boolean;
}

export interface RespuestaCalibracionCollectionResponse {
  count: number;
  data: RespuestaCalibracion[];
  meta: PaginationMeta;
}

/** Cabecera de la verificación, dentro del payload de `create-detalle`. */
export interface CalibracionPayload {
  ctformulario_id: number;
  usuario_id: string;
  entidad_id: string;
  fecha_verificacion: string;
  evaluacion: string | null;
  observaciones: string | null;
}

/**
 * Una respuesta del formulario dinámico. Coincide con `ValorDinamicoPayload`
 * del motor compartido: los numéricos viajan en `valor_texto`, los selects en
 * `valor_catalogo` y los booleanos en `valor_booleano`.
 */
export interface ValorCalibracionItem {
  atributo_formulario_id: string;
  valor_texto: string | null;
  valor_numero: number | null;
  valor_fecha: string | null;
  valor_booleano: boolean | null;
  valor_multiple: string | null;
  valor_catalogo: number;
  estado: boolean;
}

/** Alta completa: cabecera y respuestas en una sola llamada. */
export interface CrearCalibracionPayload {
  calibracion: CalibracionPayload;
  valorCalibracion: ValorCalibracionItem[];
}

export interface FinalizarCalibracionPayload {
  idCalibracion: string;
  identificadorSecuencial: string;
  ctestado: number;
}

export interface FinalizarCalibracionResponse {
  secuencialAsignado: string;
  secuencialId: string;
}

export interface ItemEquipo {
  id: string;
  codigo: string;
  nombre: string;
  ultima_calibracion: string | null;
}
