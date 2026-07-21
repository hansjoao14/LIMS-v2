export interface ValorSolicitudItem {
  solicitud_id: string | null;
  atributo_formulario_id: string;
  valor_texto: string | null;
  // TODO(backend): create-many valida este campo con @IsDecimal() y @IsNumber()
  // a la vez, así que ni el número ni su texto lo pasan. Hasta que se corrija,
  // los valores numéricos se envían en valor_texto y este va siempre en null.
  valor_numero: number | null;
  valor_fecha: string | null;
  valor_booleano: boolean | null;
  valor_multiple: string | null;
  valor_catalogo: number;
  valor_uuid: string | null;
  estado?: boolean;
}

export interface SolicitudEnsayoItem {
  solicitud_id: string | null;
  ensayo_id: number;
  ctambiental_id: number;
  estado?: boolean;
  cttipo_ensayo_id: number;
}

export interface FinalizarSolicitudPayload {
  idSolicitud: string;
  identifcadorSecuecnial: string;
  ctestado: number;
}

export interface SolicitudPayload {
  formulario_id: string | number | null;
  usuario_id: string;
  entidad_id: string;
  secuencial_id: null;
  ctestado_id: number;
  periodo_id: number | null;
  descripcion: string;
  ejercicio_id: number;
  tecnico_id: string | null;
}
