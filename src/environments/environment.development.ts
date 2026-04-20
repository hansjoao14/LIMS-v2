import { version } from '../../package.json';
export const environment = {
  production: false,
  api_login_kc: 'http://173.212.251.64:3700',

  apiUrl: 'https://api-sgia.demo-peav-quito.com/api/',
  urlFileName: 'https://api-sgia.demo-peav-quito.com/',
  urlDownload: 'https://api-sgia.demo-peav-quito.com/api/upload/download',

  api_reportes:'https://api-lims-test.demo-peav-quito.com/api/reportes',

  keycloak_api: 'http://185.197.251.149:8080',
  graphql: 'https://api-sgia.demo-peav-quito.com/api/graphql',
  graphql_catalogo: 'https://api-lims-test.demo-peav-quito.com/graphql-catalogo',

  version,
};
