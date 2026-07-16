import { gql } from 'apollo-angular';
import { META_FIELDS } from '../fragments';

export const GET_COLLECTION_SECUENCIAL_ADMIN = gql`
  query CollectionSecuencialAdmin($page: Int, $take: Int, $busqueda: String) {
    collectionSecuencial(query: {
      where: { identificador_secu: { contains: $busqueda } }
      pagination: { page: $page, take: $take }
    }) {
      count
      data {
        actualizado_en
        actualizado_por
        anio
        creado_en
        creado_por
        ctformulario_id
        establecimiento_id
        establecimiento_nombre
        estado
        formato
        formulario_id
        formulario_nombre
        id
        identificador_secu
        modulo_establecimiento_id
        modulo_id
        modulo_nombre
        numero
        numero_secuencial
        sigla
      }
      meta { ${META_FIELDS} }
    }
  }
`;
