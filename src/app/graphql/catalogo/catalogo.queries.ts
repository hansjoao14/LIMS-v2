import { gql } from 'apollo-angular';
import { META_FIELDS } from '../fragments';
import { CATALOGO_FIELDS, ITEM_CATALOGO_FIELDS } from './catalogo.fragments';

export const GET_CATALOGO = gql`
  query GetCatalogo {
    catalogo {
      id
      nombre
      descripcion
    }
  }
`;

export const GET_COLLECTION_CATALOGO = gql`
  query CollectionCatalogo {
    collectionCatalogo(query: { pagination: { page: null, take: 100 } }) {
      count
      data { ${CATALOGO_FIELDS} }
      meta { ${META_FIELDS} }
    }
  }
`;

export const GET_COLLECTION_CATALOGO_ADMIN = gql`
  query CollectionCatalogoAdmin($page: Int, $take: Int, $nombre: String) {
    collectionCatalogo(query: {
      where: { nombre: { contains: $nombre } }
      pagination: { page: $page, take: $take }
    }) {
      count
      data { ${CATALOGO_FIELDS} }
      meta { ${META_FIELDS} }
    }
  }
`;

export const GET_ITEMS_BY_CATALOGO_ID = gql`
  query CollectionItemCatalogo($catalogoId: Int!) {
    collectionItemCatalogo(
      query: { where: { catalogo_id: { equals: $catalogoId }, estado: { equals: true } } }
    ) {
      count
      data { ${ITEM_CATALOGO_FIELDS} }
      meta { ${META_FIELDS} }
    }
  }
`;

export const GET_ALL_ITEMS_ADMIN = gql`
  query GetAllItemsAdmin($catalogoId: Int!, $page: Int, $take: Int) {
    collectionItemCatalogo(
      query: {
        where: { catalogo_id: { equals: $catalogoId } },
        pagination: { page: $page, take: $take }
      }
    ) {
      count
      data { ${ITEM_CATALOGO_FIELDS} }
      meta { ${META_FIELDS} }
    }
  }
`;

export const GET_ITEMS_BY_IDS = gql`
  query GetItemsByIds($ids: [Int!]!) {
    collectionItemCatalogo(
      query: { where: { id: { in: $ids } } }
    ) {
      data {
        id
        nombre
        catalogo_id
        item_catalogo_id
      }
    }
  }
`;

export const GET_CHILDREN_BY_PARENT_IDS = gql`
  query CollectionItemCatalogoChildren($parentIds: [Int!]!) {
    collectionItemCatalogo(
      query: { where: { estado: { equals: true }, item_catalogo_id: { in: $parentIds } } }
    ) {
      count
      data { ${ITEM_CATALOGO_FIELDS} }
      meta { ${META_FIELDS} }
    }
  }
`;
