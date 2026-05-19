import { Type } from '@angular/core';
import { HouseComponent } from '../../../ui/icons/house/house.component';
import { CarpetaIcon } from '../../../ui/icons/carpeta-icon/carpeta-icon';
import { ListaSolicitudesIcon } from '../../../ui/icons/lista-solicitudes-icon/lista-solicitudes-icon';
import { CarIcon } from '../../../ui/icons/car-icon/car-icon';
import { HorariosLaboralesIcon } from '../../../ui/icons/horarios-laborales-icon/horarios-laborales-icon';
import { PorContraloriaIcon } from '../../../ui/icons/por-contraloria-icon/por-contraloria-icon';
import { OperacionesCampoIcon } from '../../../ui/icons/operaciones-campo-icon/operaciones-campo-icon';
import { OrdenTrabajoInSituIcon } from '../../../ui/icons/orden-trabajo-in-situ-icon/orden-trabajo-in-situ-icon';
import { PlanMuestreoIcon } from '../../../ui/icons/plan-muestreo-icon/plan-muestreo-icon';
import { RoleAccess } from '../../../core/utils/roles.constans';

export interface MenuItem {
  path?: string;
  label: string;
  icon?: Type<any>;
  children?: MenuItem[];
  expanded?: boolean;
  requiredRoles?: any[]; // Cambiado a any[] para soportar la estructura [{role: string}] del Guard
}

export const SIDEBAR_MENU_ITEMS: MenuItem[] = [
  {
    path: '/dashboard',
    label: 'Dashboard',
    icon: HouseComponent,
    requiredRoles: RoleAccess.ALL_USERS, // [admin, direccion, analista, tecnico, responsable]
  },
  {
    label: 'Listado de Solicitudes',
    icon: ListaSolicitudesIcon,
    expanded: false,
    requiredRoles: RoleAccess.MANAGEMENT,
    children: [
      {
        path: '/solicitud-trabajo',
        label: 'Solicitud de Trabajo',
        icon: CarpetaIcon,
        requiredRoles: RoleAccess.MANAGEMENT,
      },
      {
        path: '/lista-solicitudes',
        label: 'Bandeja de Solicitudes',
        icon: ListaSolicitudesIcon,
        requiredRoles: RoleAccess.MANAGEMENT,
      },
      {
        path: '/lista-cotizaciones',
        label: 'Lista de Cotizaciones',
        icon: ListaSolicitudesIcon,
        requiredRoles: RoleAccess.MANAGEMENT,
      },
    ],
  },
  {
    label: 'Gestión de Vehiculos',
    icon: CarIcon,
    expanded: false,
    requiredRoles: RoleAccess.ADMIN_ONLY, // Acceso restringido a administración
    children: [
      {
        path: '/horarios-laborales',
        label: 'Horarios laborales',
        icon: HorariosLaboralesIcon,
        requiredRoles: RoleAccess.ADMIN_ONLY,
      },
      {
        path: '/por-contraloria',
        label: 'Por contraloria',
        icon: PorContraloriaIcon,
        requiredRoles: RoleAccess.MANAGEMENT, // Permite revisión por Analistas/Dirección
      },
    ],
  },
  {
    label: 'Operaciones de Campo',
    icon: OperacionesCampoIcon,
    expanded: false,
    requiredRoles: RoleAccess.OPERATIONAL, // [admin, tecnico, responsable_campo]
    children: [
      {
        path: '/orden-trabajo-in-situ',
        label: 'Orden de trabajo In Situ',
        icon: OrdenTrabajoInSituIcon,
        requiredRoles: RoleAccess.OPERATIONAL,
      },
      {
        path: '/plan-muestreo',
        label: 'Plan de Muestreo',
        icon: PlanMuestreoIcon,
        requiredRoles: RoleAccess.OPERATIONAL,
      },
    ],
  },

  {
    path: '/admin-formularios',
    label: 'Administración de Formularios',
    icon: CarpetaIcon,
    // requiredRoles: RoleAccess.MANAGEMENT // [admin, direccion, analista]
  },
];
