import { Type } from '@angular/core';
import { HouseComponent } from '../../../ui/icons/house/house.component';
import { CarpetaIcon } from '../../../ui/icons/carpeta-icon/carpeta-icon';

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
