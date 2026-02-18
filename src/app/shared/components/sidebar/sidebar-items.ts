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
}

export const SIDEBAR_MENU_ITEMS: MenuItem[] = [
  { path: '/dashboard', label: 'Dashboard', icon: HouseComponent },

  { path: '/solicitud-trabajo', label: 'Solicitud de Trabajo', icon: CarpetaIcon },
   { path: '/lista-solicitudes', label: 'Bandeja de solicitudes', icon: ListaSolicitudesIcon },

  { 
    label: 'Gestión de Vehiculos',
    icon: CarIcon,
    expanded: false,
    children: [
      { path: '/horarios-laborales', label: 'Horarios laborales', icon: HorariosLaboralesIcon },
      { path: '/por-contraloria', label: 'Por contraloria', icon: PorContraloriaIcon },

     
    ]
  },

    { 
    label: 'Operaciones de Campo',
    icon: OperacionesCampoIcon,
    expanded: false,
    children: [
      { path: '/orden-trabajo-in-situ', label: 'Orden de trabajo In Situ', icon: OrdenTrabajoInSituIcon },
      { path: '/plan-muestreo', label: 'Plan de Muestreo', icon: PlanMuestreoIcon },

     
    ]
  },





  /* // DROPDOWN: CATÁLOGOS BASE
  { 
    label: 'Catálogos Base',
    icon: EntidadesComponent,
    expanded: false,
    children: [
      { path: '/entidades', label: 'Entidades' },
      { path: '/periodos', label: 'Períodos' },
   
      { path: '/formulas', label: 'Fórmulas' },
      { path: '/cobeneficios', label: 'Cobeneficios' },
      { path: '/amenazas', label: 'Amenazas' },
      { path: '/accion-cobeneficio', label: 'Acción-Cobeneficio' },
      { path: '/accion-amenaza', label: 'Acción-Amenaza' },
     
    ]
  },

  // DROPDOWN: ESTRUCTURA SECTORIAL
  {
    label: 'Estructura Sectorial',
    icon: SectorIconComponent,
    expanded: false,
    children: [
      { path: '/sector', label: 'Sector' },
      { path: '/sector-entidad', label: 'Sector-Entidad' },
      { path: '/accion', label: 'Línea de Acción' },
   

    ]
  },

  // DROPDOWN: MEDICIÓN Y METAS
  {
    label: 'Medición y Metas',
    icon: MetasGeneralesIconComponent,
    expanded: false,
    children: [
      { path: '/metas-generales', label: 'Metas Generales' },
      { path: '/meta-sectorial', label: 'Meta Sectorial' },
      { path: '/escenario', label: 'Escenario' },
      { path: '/medicion', label: 'Medición' },
      { path: '/indicadores', label: 'Indicadores' },
    ]
  } */
];
