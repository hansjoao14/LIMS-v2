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
import { AccesoAutorizado } from '../../../ui/icons/acceso-autorizado/acceso-autorizado';
import { RoleAccess } from '../../../core/utils/roles.constans';

export interface MenuItem {
  path?: string;
  label: string;
  icon?: Type<any>;
  children?: MenuItem[];
  expanded?: boolean;
  requiredRoles?: { role: string }[];
}

export const SIDEBAR_MENU_ITEMS: MenuItem[] = [
  {
    path: '/dashboard',
    label: 'Dashboard',
    icon: HouseComponent,
    requiredRoles: RoleAccess.ALL_USERS,
  },
  {
    path: '/solicitud-trabajo',
    label: 'Solicitud de Trabajo',
    icon: CarpetaIcon,
    requiredRoles: RoleAccess.SOLICITUD_TRABAJO,
  },
  {
    label: 'Listado de Solicitudes',
    icon: ListaSolicitudesIcon,
    expanded: false,
    requiredRoles: RoleAccess.LISTA_SOLICITUDES,
    children: [
      {
        path: '/lista-solicitudes',
        label: 'Bandeja de Solicitudes',
        icon: ListaSolicitudesIcon,
        requiredRoles: RoleAccess.LISTA_SOLICITUDES,
      },
      {
        path: '/lista-cotizaciones',
        label: 'Por Autorizar',
        icon: AccesoAutorizado,
        requiredRoles: RoleAccess.LISTA_COTIZACIONES,
      },
    ],
  },
  {
    label: 'Gestión de Vehiculos',
    icon: CarIcon,
    expanded: false,
    requiredRoles: RoleAccess.HORARIOS_LABORALES,
    children: [
      {
        path: '/horarios-laborales',
        label: 'Horarios laborales',
        icon: HorariosLaboralesIcon,
        requiredRoles: RoleAccess.HORARIOS_LABORALES,
      },
      {
        path: '/por-contraloria',
        label: 'Por contraloria',
        icon: PorContraloriaIcon,
        requiredRoles: RoleAccess.POR_CONTRALORIA,
      },
    ],
  },
  {
    label: 'Operaciones de Campo',
    icon: OperacionesCampoIcon,
    expanded: false,
    requiredRoles: RoleAccess.ORDEN_IN_SITU,
    children: [
      {
        path: '/orden-trabajo-in-situ',
        label: 'Orden de trabajo In Situ',
        icon: OrdenTrabajoInSituIcon,
        requiredRoles: RoleAccess.ORDEN_IN_SITU,
      },
      {
        path: '/plan-muestreo',
        label: 'Plan de Muestreo',
        icon: PlanMuestreoIcon,
        requiredRoles: RoleAccess.PLAN_MUESTREO,
      },
    ],
  },
  {
    path: '/admin-formularios',
    label: 'Administración de Formularios',
    icon: CarpetaIcon,
    requiredRoles: RoleAccess.ADMIN_ONLY,
  },
];
