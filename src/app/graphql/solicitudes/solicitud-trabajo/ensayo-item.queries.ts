import { gql } from 'apollo-angular';

export const GET_ENSAYOS_BY_CT_AMBIENTAL = gql`
  query CollectionEnsayoItem($ctambientalId: Int!) {
    collectionEnsayoItem(
      query: {
        where: { ctambiental_id: { equals: $ctambientalId }, ensayo: { estado: { equals: true } } }
        pagination: { page: 1, take: 100 }
      }
    ) {
      count
      data {
        ctambiental_id
        ensayo_id
        estado
        ensayo {
          analisis
          ctunidad_id
          estado
          id
          identificacion
          metodo
          item_catalogo {
            id
            nombre
            sigla
            valor
          }
        }
      }
    }
  }
`;
