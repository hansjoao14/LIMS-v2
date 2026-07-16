import { gql } from 'apollo-angular';

export const GET_ESTABLECIMIENTOS = gql`
  query CollectionEstablecimientos {
    collectionEstablecimientos {
      data {
        id
        nombre
        descripcion
        direccion
        dpa_id
        establecimiento_id
        estado
        nui
        representante_legal
      }
    }
  }
`;
