import { version } from '../../package.json';

/**
 * Environment de DESARROLLO — apunta al backend local (faq-monorepo).
 *
 * Lo activa `ng serve` / `npm start` mediante el `fileReplacements` de la
 * configuración `development` en angular.json. `ng build` (producción) sigue
 * usando environment.ts, que apunta al servidor de test.
 *
 * Requisito: tener el monorepo levantado con `./start-local.sh` desde
 * ../faq-monorepo. Puertos: catálogo 3103, establecimientos 3104,
 * parámetro 3111, reportes 3112, solicitud 3114.
 *
 * OJO con las rutas: en el servidor, nginx quita el prefijo /api/<nombre>
 * (proxy_pass con barra final), así que en local las APIs REST se consumen
 * contra la raíz del puerto, sin prefijo. Los endpoints GraphQL sí conservan
 * su ruta (/graphql-catalogo, etc.).
 */

// Backend local: monorepo NestJS corriendo en esta máquina
const API_CATALOGO = 'http://localhost:3103';
const API_ESTABLECIMIENTOS = 'http://localhost:3104';
const API_PARAMETRO = 'http://localhost:3111';
const API_REPORTES = 'http://localhost:3112';
const API_SOLICITUD = 'http://localhost:3114';

// Estos NO son parte del faq-monorepo y no tienen equivalente local:
// login (Keycloak), subida/descarga de archivos y el GraphQL principal de SGIA.
const SGIA_BASE = 'https://api-sgia.demo-peav-quito.com';

export const environment = {
  production: false,

  // --- Remotos (sin equivalente local) ---
  api_login_kc: 'http://173.212.251.64:5200',
  keycloak_api: 'http://173.212.251.64:8080',
  apiUrl: `${SGIA_BASE}/api/`,
  urlFileName: `${SGIA_BASE}/`,
  urlDownload: `${SGIA_BASE}/api/upload/download`,
  graphql: `${SGIA_BASE}/api/graphql`,

  // --- Backend local: REST ---
  api_catalogo: API_CATALOGO,
  api_formulario: API_PARAMETRO,
  api_reportes: API_REPORTES,
  api_solicitud: API_SOLICITUD,

  // --- Backend local: GraphQL ---
  graphql_catalogo: `${API_CATALOGO}/graphql-catalogo`,
  graphql_establecimiento: `${API_ESTABLECIMIENTOS}/graphql-establecimiento`,
  graphql_reportes: `${API_REPORTES}/graphql-reportes`,

  version,
};
