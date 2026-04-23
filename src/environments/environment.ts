import { version } from '../../package.json';

const SGIA_BASE = 'https://api-sgia.demo-peav-quito.com';
const LIMS_BASE = 'https://api-lims-test.demo-peav-quito.com';

export const environment = {
  production: false,
  api_login_kc: 'http://173.212.251.64:3700',
  apiUrl: `${SGIA_BASE}/api/`,
  urlFileName: `${SGIA_BASE}/`,
  urlDownload: `${SGIA_BASE}/api/upload/download`,

  api_reportes: `${LIMS_BASE}/api/reportes`,
  api_solicitud: `${LIMS_BASE}/api/solicitud`,
  api_formulario: `${LIMS_BASE}/api/parametro`,

  keycloak_api: 'http://185.197.251.149:8080',
  graphql: `${SGIA_BASE}/api/graphql`,
  graphql_catalogo: `${LIMS_BASE}/graphql-catalogo`,
  graphql_establecimiento: `${LIMS_BASE}/graphql-establecimiento`,
  graphql_reportes: `${LIMS_BASE}/graphql-reportes`,

  //api_login_kc: 'http://localhost:3700',

  version,
};
