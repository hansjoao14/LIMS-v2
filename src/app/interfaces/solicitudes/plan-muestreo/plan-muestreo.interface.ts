/**
 * Contratos del módulo Plan de Muestreo: payloads que consume la API y detalle
 * que devuelve. Los servicios importan de aquí; no declaran tipos propios.
 */

// ── Detalle de un plan ya guardado ─────────────────────────────────────────
// GET /report-solicitud/plan-muestreo/:id. Ojo: `atributos` NO es una lista
// plana como en `SolicitudDetalle`, sino grupos con su `detalle_seccion`.

export interface PlanMuestreoDetalle {
  id_muestreo: string;
  formularios: PlanMuestreoFormularioDetalle[];
}

export interface PlanMuestreoFormularioDetalle {
  id_formulario: string;
  nombre_formulario: string;
  version_formulario: number;
  nombre_completo: string;
  nombre_cargo: string;
  fecha_emision_muestreo: string;
  num_secuencial_muestreo: string;
  establecimiento_muestreo: string;
  descripcion_formulario: string;
  solicitud_id_muestreo: string;
  operador: PlanMuestreoAtributoDetalle[];
  atributos: PlanMuestreoGrupoDetalle[];
  tabla_ensayos: unknown[];
}

export interface PlanMuestreoGrupoDetalle {
  grupo_texto: string;
  detalle_seccion: PlanMuestreoAtributoDetalle[];
}

export interface PlanMuestreoAtributoDetalle {
  orden: number;
  id_atributo_formulario: string;
  nombre_atributo_formulario: string;
  pregunta_atributo_formulario: string;
  valor_texto?: string;
  valor_catalogo?: number;
  nombre_valor_catalogo?: string;
  valor_multiple?: string;
  valor_multiple_format?: string;
  grupo_texto?: string;
}

export interface PlanMuestreoPayload {
  solicitud_id: string;
  usuario_id: string;
  entidad_id: string;
  ctambiente_id: number;
  periodo_id: number;
  secuencial_id: string | null;
  num_secuencial: string | null;
  ctestado_id: number;
  estado: boolean;
  ctformulario_id: number;
}

export interface PlanMuestreoDetallePayload {
  estado: boolean;
  ctambiental_id: number;
  ensayo_id: number;
  cttipo_ensayo_id: number;
}

// A diferencia de ValorOrdenTrabajoPayload, este DTO no admite `valor_uuid`:
// el backend rechaza la propiedad (forbidNonWhitelisted).
export interface ValorMuestreoPayload {
  atributo_formulario_id: string;
  valor_texto: string | null;
  valor_numero: number | null;
  valor_fecha: string | null;
  valor_booleano: boolean | null;
  valor_multiple: string | null;
  estado: boolean;
  valor_catalogo: number;
}

export interface CrearPlanMuestreoConDetallePayload {
  planMuestreo: PlanMuestreoPayload;
  planMuestreoDetalle: PlanMuestreoDetallePayload[];
  valorMuestreo: ValorMuestreoPayload[];
}

// Ojo: este DTO sí tiene los nombres bien escritos, a diferencia del de la
// orden de trabajo (`idOrden` / `identifcadorSecuecnial`). Los mensajes de
// error del backend todavía citan los nombres viejos, pero las llaves que
// valida son estas.
export interface FinalizarPlanMuestreoPayload {
  idPlanMuestreo: string;
  identificadorSecuencial: string;
  ctestado: number;
}
