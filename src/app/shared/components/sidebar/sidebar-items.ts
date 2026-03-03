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

// Asumo que tienes un ícono genérico, si no usa otro

export interface MenuItem {
  path?: string; // Opcional para carpetas padres
  label: string;
  icon?: Type<any>; // Opcional para hijos
  children?: MenuItem[]; // LISTA DE SUB-ITEMS (Dropdown)
  expanded?: boolean; // Estado del dropdown (Abierto/Cerrado)
  requiredRoles?: string[];
}

export const SIDEBAR_MENU_ITEMS: MenuItem[] = [
  { 
    path: '/dashboard', 
    label: 'Dashboard', 
    icon: HouseComponent, 
    requiredRoles: ['manager', 'admin', 'gestor'] 
  },
  { 
    path: '/solicitud-trabajo', 
    label: 'Solicitud de Trabajo', 
    icon: CarpetaIcon, 
    requiredRoles: ['admin', 'gestor'] 
  },
  { 
    path: '/lista-solicitudes', 
    label: 'Bandeja de solicitudes', 
    icon: ListaSolicitudesIcon, 
    requiredRoles: ['admin', 'gestor'] 
  },
  { 
    label: 'Gestión de Vehiculos',
    icon: CarIcon,
    expanded: false,
    requiredRoles: ['admin', 'gestor'],
    children: [
      { path: '/horarios-laborales', label: 'Horarios laborales', icon: HorariosLaboralesIcon, requiredRoles: ['admin', 'gestor'] },
      { path: '/por-contraloria', label: 'Por contraloria', icon: PorContraloriaIcon, requiredRoles: ['admin', 'gestor'] },
    ]
  },
  { 
    label: 'Operaciones de Campo',
    icon: OperacionesCampoIcon,
    expanded: false,
    requiredRoles: ['manager', 'admin', 'gestor'],
    children: [
      { path: '/orden-trabajo-in-situ', label: 'Orden de trabajo In Situ', icon: OrdenTrabajoInSituIcon, requiredRoles: ['manager', 'admin', 'gestor'] },
      { path: '/plan-muestreo', label: 'Plan de Muestreo', icon: PlanMuestreoIcon, requiredRoles: ['manager', 'admin', 'gestor'] },
    ]
  }
];
