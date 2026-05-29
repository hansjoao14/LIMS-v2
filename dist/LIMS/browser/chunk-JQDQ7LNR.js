import {
  META_FIELDS
} from "./chunk-XIRXEHG5.js";
import {
  Apollo,
  gql
} from "./chunk-7OA5XFJQ.js";
import {
  Injectable,
  map,
  setClassMetadata,
  switchMap,
  ɵɵdefineInjectable,
  ɵɵinject
} from "./chunk-4XEQTJJK.js";

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
  constructor(apollo) {
    this.apollo = apollo;
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
  getItemsByCatalogoId(catalogoId) {
    return this.apollo.use(CLIENT_NAME).watchQuery({
      query: GET_ITEMS_BY_CATALOGO_ID,
      variables: { catalogoId }
    }).valueChanges.pipe(map((result) => result.data?.collectionItemCatalogo ?? {
      count: 0,
      data: []
    }));
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
  static \u0275fac = function CatalogoService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CatalogoService)(\u0275\u0275inject(Apollo));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _CatalogoService, factory: _CatalogoService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CatalogoService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [{ type: Apollo }], null);
})();

export {
  CatalogoService
};
//# sourceMappingURL=chunk-JQDQ7LNR.js.map
