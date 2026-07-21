import {
  META_FIELDS
} from "./chunk-XIRXEHG5.js";
import {
  Apollo,
  gql
} from "./chunk-DPKW7NRU.js";
import {
  HttpClient,
  environment
} from "./chunk-CIDLATYD.js";
import {
  Injectable,
  map,
  setClassMetadata,
  switchMap,
  ɵɵdefineInjectable,
  ɵɵinject
} from "./chunk-WHOAKDIK.js";

// src/app/services/catalogo.service.ts
var CLIENT_NAME = "catalogo";
var GET_CATALOGO = gql`
  query GetCatalogo {
    catalogo {
      id
      nombre
      descripcion
    }
  }
`;
var GET_COLLECTION_CATALOGO = gql`
  query CollectionCatalogo {
    collectionCatalogo(query: { pagination: { page: null, take: 100 } }) {
      count
      data {
        descripcion
        estado
        id
        nombre
      }
      meta { ${META_FIELDS} }
    }
  }
`;
var GET_COLLECTION_CATALOGO_ADMIN = gql`
  query CollectionCatalogoAdmin($page: Int, $take: Int, $nombre: String) {
    collectionCatalogo(query: {
      where: { nombre: { contains: $nombre } }
      pagination: { page: $page, take: $take }
    }) {
      count
      data {
        descripcion
        estado
        id
        nombre
      }
      meta { ${META_FIELDS} }
    }
  }
`;
var GET_ITEMS_BY_CATALOGO_ID = gql`
  query CollectionItemCatalogo($catalogoId: Int!) {
    collectionItemCatalogo(
      query: { where: { catalogo_id: { equals: $catalogoId }, estado: { equals: true } } }
    ) {
      count
      data {
        catalogo_id
        estado
        grupo
        id
        item_catalogo_id
        nombre
        orden
        sigla
        valor
      }
      meta { ${META_FIELDS} }
    }
  }
`;
var GET_ALL_ITEMS_ADMIN = gql`
  query GetAllItemsAdmin($catalogoId: Int!, $page: Int, $take: Int) {
    collectionItemCatalogo(
      query: {
        where: { catalogo_id: { equals: $catalogoId } },
        pagination: { page: $page, take: $take }
      }
    ) {
      count
      data {
        catalogo_id
        estado
        grupo
        id
        item_catalogo_id
        nombre
        orden
        sigla
        valor
      }
      meta { ${META_FIELDS} }
    }
  }
`;
var GET_ITEMS_BY_IDS = gql`
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
var GET_CHILDREN_BY_PARENT_IDS = gql`
  query CollectionItemCatalogoChildren($parentIds: [Int!]!) {
    collectionItemCatalogo(
      query: { where: { estado: { equals: true }, item_catalogo_id: { in: $parentIds } } }
    ) {
      count
      data {
        catalogo_id
        estado
        grupo
        id
        item_catalogo_id
        nombre
        orden
        sigla
        valor
      }
      meta { ${META_FIELDS} }
    }
  }
`;
var CatalogoService = class _CatalogoService {
  apollo;
  http;
  baseCatalogo = `${environment.api_catalogo}/catalogo`;
  baseItemCatalogo = `${environment.api_catalogo}/item-catalogo`;
  constructor(apollo, http) {
    this.apollo = apollo;
    this.http = http;
  }
  getCatalogo() {
    return this.apollo.watchQuery({ query: GET_CATALOGO }).valueChanges.pipe(map((result) => result.data?.catalogo ?? []));
  }
  getCollectionCatalogo() {
    return this.apollo.use(CLIENT_NAME).watchQuery({
      query: GET_COLLECTION_CATALOGO,
      fetchPolicy: "cache-first"
    }).valueChanges.pipe(map((result) => result.data?.collectionCatalogo?.data ?? []));
  }
  getCollectionCatalogoAdmin(page, limit, nombre = "") {
    return this.apollo.use(CLIENT_NAME).query({
      query: GET_COLLECTION_CATALOGO_ADMIN,
      variables: { page, take: limit, nombre },
      fetchPolicy: "network-only"
    }).pipe(map((result) => ({
      data: result.data?.collectionCatalogo?.data ?? [],
      meta: result.data?.collectionCatalogo?.meta
    })));
  }
  getItemsByCatalogoId(catalogoId) {
    return this.apollo.use(CLIENT_NAME).watchQuery({
      query: GET_ITEMS_BY_CATALOGO_ID,
      variables: { catalogoId }
    }).valueChanges.pipe(map((result) => result.data?.collectionItemCatalogo ?? {
      count: 0,
      data: []
    }));
  }
  getAllItemsAdmin(catalogoId) {
    return this.apollo.use(CLIENT_NAME).query({
      query: GET_ALL_ITEMS_ADMIN,
      variables: { catalogoId, page: null, take: 200 },
      fetchPolicy: "network-only"
    }).pipe(map((result) => result.data?.collectionItemCatalogo?.data ?? []));
  }
  getItemsByIds(ids) {
    return this.apollo.use(CLIENT_NAME).query({
      query: GET_ITEMS_BY_IDS,
      variables: { ids },
      fetchPolicy: "network-only"
    }).pipe(map((result) => result.data?.collectionItemCatalogo?.data ?? []));
  }
  getChildrenByParentIds(parentIds) {
    return this.apollo.use(CLIENT_NAME).watchQuery({
      query: GET_CHILDREN_BY_PARENT_IDS,
      variables: { parentIds }
    }).valueChanges.pipe(map((result) => result.data?.collectionItemCatalogo ?? {
      count: 0,
      data: []
    }));
  }
  getMatricesConHijos(catalogoId) {
    return this.getItemsByCatalogoId(catalogoId).pipe(switchMap((response) => {
      const matrices = response.data;
      const parentIds = matrices.map((m) => m.id);
      return this.getChildrenByParentIds(parentIds).pipe(map((hijosResponse) => {
        return matrices.map((matriz) => ({
          matriz,
          hijos: hijosResponse.data.filter((h) => h.item_catalogo_id === matriz.id)
        }));
      }));
    }));
  }
  // ── Catálogo mutations ────────────────────────────────────────────────────
  createCatalogo(payload) {
    return this.http.post(this.baseCatalogo, payload);
  }
  updateCatalogo(id, payload) {
    return this.http.put(`${this.baseCatalogo}/${id}`, payload);
  }
  toggleCatalogo(id, estado) {
    return this.http.patch(`${this.baseCatalogo}/${id}/disable`, { estado });
  }
  // ── ItemCatálogo mutations ────────────────────────────────────────────────
  createItemCatalogo(payload) {
    return this.http.post(this.baseItemCatalogo, payload);
  }
  updateItemCatalogo(id, payload) {
    return this.http.put(`${this.baseItemCatalogo}/${id}`, payload);
  }
  toggleItemCatalogo(id, estado) {
    return this.http.patch(`${this.baseItemCatalogo}/${id}/disable`, { estado });
  }
  static \u0275fac = function CatalogoService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CatalogoService)(\u0275\u0275inject(Apollo), \u0275\u0275inject(HttpClient));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _CatalogoService, factory: _CatalogoService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CatalogoService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [{ type: Apollo }, { type: HttpClient }], null);
})();

export {
  CatalogoService
};
//# sourceMappingURL=chunk-OZ4IZHSX.js.map
