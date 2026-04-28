import { version } from '../../package.json';

export const environment = {
  production: true,
  api_login_kc: '',

  apiUrl: '/proxy/sgia/api/',
  urlFileName: '/proxy/sgia/',
  urlDownload: '/proxy/sgia/api/upload/download',

  api_reportes: '/proxy/reportes',
  api_solicitud: '/proxy/solicitud',
  api_formulario: '/proxy/parametro',

  keycloak_api: 'http://185.197.251.149:8080',
  graphql: '/proxy/graphql',
  graphql_catalogo: '/proxy/graphql-catalogo',
  graphql_establecimiento: '/proxy/graphql-establecimiento',
  graphql_reportes: '/proxy/graphql-reportes',

  version,
};
