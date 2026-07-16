import { gql } from 'apollo-angular';
import { META_FIELDS } from '../fragments';
import { ENSAYO_FIELDS } from './ensayo.fragments';

export const GET_COLLECTION_ENSAYO_ADMIN = gql`
  query CollectionEnsayoAdmin($page: Int, $take: Int, $analisis: String) {
    collectionEnsayo(query: {
      where: { analisis: { contains: $analisis } }
      pagination: { page: $page, take: $take }
    }) {
      count
      data { ${ENSAYO_FIELDS} }
      meta { ${META_FIELDS} }
    }
  }
`;

export const GET_ENSAYO_BY_ID = gql`
  query GetEnsayoById($id: Int!) {
    collectionEnsayo(
      query: { where: { id: { equals: $id } }, pagination: { take: 1, page: null } }
    ) {
      data { ${ENSAYO_FIELDS} }
    }
  }
`;
