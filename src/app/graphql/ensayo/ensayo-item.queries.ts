import { gql } from 'apollo-angular';
import { META_FIELDS } from '../fragments';
import { ITEM_CATALOGO_OPTION_FIELDS } from './ensayo.fragments';

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
      data { ${ITEM_CATALOGO_OPTION_FIELDS} }
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
      data { ${ITEM_CATALOGO_OPTION_FIELDS} }
      meta { ${META_FIELDS} }
    }
  }
`;

// Igual que GET_ITEM_CATALOGO_OPTIONS_PAGINADO pero excluyendo un id puntual
// (p. ej. el ítem que se está editando, para evitar que se seleccione a sí
// mismo como padre). Busca en TODO item_catalogo, sin acotar por catalogo_id,
// porque el "ítem padre" de un catálogo puede pertenecer a cualquier otro
// catálogo (no hay una relación catálogo→catálogo padre almacenada) y en
// cualquier profundidad (ver ejemplo real: catálogo 1006 con padre en
// catálogo 18, que a su vez tiene su propio padre).
export const GET_ITEM_CATALOGO_OPTIONS_EXCLUDING_PAGINADO = gql`
  query GetItemCatalogoOptionsExcludingPaginado($page: Int, $take: Int, $nombre: String, $excludeId: Int!) {
    collectionItemCatalogo(query: {
      where: { estado: { equals: true }, nombre: { contains: $nombre }, id: { notIn: [$excludeId] } }
      pagination: { page: $page, take: $take }
    }) {
      count
      data { ${ITEM_CATALOGO_OPTION_FIELDS} }
      meta { ${META_FIELDS} }
    }
  }
`;

export const GET_ITEM_CATALOGO_BY_ID = gql`
  query GetItemCatalogoById($id: Int!) {
    collectionItemCatalogo(
      query: { where: { id: { equals: $id } }, pagination: { take: 1, page: null } }
    ) {
      data { ${ITEM_CATALOGO_OPTION_FIELDS} }
    }
  }
`;
