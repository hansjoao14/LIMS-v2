import { gql } from 'apollo-angular';

export const GET_USUARIOS_BY_ESTABLECIMIENTO = gql`
  query CollectionReportEstablecimientoUsuario($establecimientoId: String) {
    collectionReportEstablecimientoUsuario(
      query: { where: { establecimiento_id: { equals: $establecimientoId } } }
    ) {
      count
      data {
        correo
        ctcargo_id
        ctipo_cargo_nombre
        establecimiento_id
        establecimiento_nombre
        establecimiento_usuario_id
        estado
        nombres_completos
        usuario_id
        usuario_usuario
      }
    }
  }
`;
