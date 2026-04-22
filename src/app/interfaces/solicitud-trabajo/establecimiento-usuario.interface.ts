export interface EstablecimientoUsuario {
  correo: string;
  ctcargo_id: string;
  ctipo_cargo_nombre: string;
  establecimiento_id: string;
  establecimiento_nombre: string;
  establecimiento_usuario_id: string;
  estado: boolean;
  nombres_completos: string;
  persona_id: string;
  usuario_id: string;
  usuario_usuario: string;
}

export interface EstablecimientoUsuarioCollectionResponse {
  count: number;
  data: EstablecimientoUsuario[];
}
