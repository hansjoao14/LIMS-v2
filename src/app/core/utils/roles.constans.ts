// roles.constants.ts

// 1. Definimos los roles exactos identificados en la matriz de permisos (roles.numbers)
export enum AppRole {
  ADMIN = 'admin',
  DIRECCION = 'direccion_unidad',
  ANALISTA_RESPONSABLE = 'analista_responsable',
  TECNICO = 'tecnico_direccion',
  RESPONSABLE_CAMPO = 'responsable_campo',
}

// 2. Creamos los grupos de acceso con la estructura que tu Guard necesita
export const RoleAccess = {
  // Acceso exclusivo para gestión de configuración y usuarios
  ADMIN_ONLY: [{ role: AppRole.ADMIN }],

  // Acceso para niveles jerárquicos y de supervisión (Dirección y Analistas)
  MANAGEMENT: [
    { role: AppRole.ADMIN },
    { role: AppRole.DIRECCION },
    { role: AppRole.ANALISTA_RESPONSABLE },
  ],

  // Acceso para personal operativo (Técnicos y Responsables de campo)
  OPERATIONAL: [
    { role: AppRole.ADMIN },
    { role: AppRole.TECNICO },
    { role: AppRole.RESPONSABLE_CAMPO },
  ],

  // Acceso total (Equivalente al ALL_USERS de tu ejemplo)
  ALL_USERS: [
    { role: AppRole.ADMIN },
    { role: AppRole.DIRECCION },
    { role: AppRole.ANALISTA_RESPONSABLE },
    { role: AppRole.TECNICO },
    { role: AppRole.RESPONSABLE_CAMPO },
  ],
};
