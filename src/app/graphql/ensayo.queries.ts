import { gql } from 'apollo-angular';
import { META_FIELDS } from './fragments';

export const GET_COLLECTION_ENSAYO_ADMIN = gql`
  query CollectionEnsayoAdmin($page: Int, $take: Int, $analisis: String) {
    collectionEnsayo(query: {
      where: { analisis: { contains: $analisis } }
      pagination: { page: $page, take: $take }
    }) {
      count
      data { id analisis identificacion metodo ctunidad_id estado }
      meta { ${META_FIELDS} }
    }
  }
`;

export const GET_ENSAYO_ITEMS = gql`
  query GetEnsayoItems($ensayoId: Int) {
    collectionEnsayoItem(
      query: { where: { ensayo_id: { equals: $ensayoId } }, pagination: { take: 100, page: null } }
    ) {
      count
      data {
        ctambiental_id
        cttipo_ensayo_id
        ensayo_id
        estado
        item_catalogo {
          id
          nombre
          catalogo_id
          item_catalogo_id
        }
      }
    }
  }
`;

export const GET_ITEM_CATALOGO_OPTIONS_PAGINADO = gql`
  query GetItemCatalogoOptionsPaginado($page: Int, $take: Int, $nombre: String) {
    collectionItemCatalogo(query: {
      where: { estado: { equals: true }, nombre: { contains: $nombre } }
      pagination: { page: $page, take: $take }
    }) {
      count
      data { id nombre catalogo_id }
      meta { ${META_FIELDS} }
    }
  }
`;

// Igual que GET_ITEM_CATALOGO_OPTIONS_PAGINADO pero acotada a los hijos de un
// catalogo_id específico (p. ej. 18 = Tipo Ambiental), en vez de todo item_catalogo.
export const GET_ITEM_CATALOGO_OPTIONS_BY_CATALOGO_PAGINADO = gql`
  query GetItemCatalogoOptionsByCatalogoPaginado($page: Int, $take: Int, $nombre: String, $catalogoId: Int) {
    collectionItemCatalogo(query: {
      where: { estado: { equals: true }, nombre: { contains: $nombre }, catalogo_id: { equals: $catalogoId } }
      pagination: { page: $page, take: $take }
    }) {
      count
      data { id nombre catalogo_id }
      meta { ${META_FIELDS} }
    }
  }
`;

export const GET_ENSAYO_BY_ID = gql`
  query GetEnsayoById($id: Int!) {
    collectionEnsayo(
      query: { where: { id: { equals: $id } }, pagination: { take: 1, page: null } }
    ) {
      data {
        id
        analisis
        identificacion
        metodo
        ctunidad_id
        estado
      }
    }
  }
`;

export const GET_ITEM_CATALOGO_BY_ID = gql`
  query GetItemCatalogoById($id: Int!) {
    collectionItemCatalogo(
      query: { where: { id: { equals: $id } }, pagination: { take: 1, page: null } }
    ) {
      data {
        id
        nombre
        catalogo_id
      }
    }
  }
`;
