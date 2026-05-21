import { Component, inject, computed } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth/service/auth-service';
import { AppRole, MenuKey, MENU_PERMISSIONS } from '../../core/utils/roles.constans';

interface ModuloDashboard {
  title: string;
  route: string;
  icon: string;
  desc: string;
  menuKey: MenuKey | null;
  adminOnly?: boolean;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  private authService = inject(AuthService);

  private readonly allModulos: ModuloDashboard[] = [
    {
      title: 'Solicitud de Trabajo',
      route: '/solicitud-trabajo',
      icon: '📝',
      desc: 'Gestión de requerimientos técnicos',
      menuKey: MenuKey.SOLICITUD_TRABAJO,
    },
    {
      title: 'Bandeja de Solicitudes',
      route: '/lista-solicitudes',
      icon: '📋',
      desc: 'Seguimiento de estados y procesos',
      menuKey: MenuKey.LISTA_SOLICITUDES,
    },
    {
      title: 'Por Autorizar',
      route: '/lista-cotizaciones',
      icon: '✅',
      desc: 'Solicitudes pendientes de autorización',
      menuKey: MenuKey.LISTA_COTIZACIONES,
    },
    {
      title: 'Horarios Laborales',
      route: '/horarios-laborales',
      icon: '📅',
      desc: 'Programación semanal de flota',
      menuKey: MenuKey.HORARIOS_LABORALES,
    },
    {
      title: 'Por Contraloría',
      route: '/por-contraloria',
      icon: '⚖️',
      desc: 'Orden de movilización y control',
      menuKey: MenuKey.POR_CONTRALORIA,
    },
    {
      title: 'Orden de Trabajo In Situ',
      route: '/orden-trabajo-in-situ',
      icon: '🛠️',
      desc: 'Operaciones directas en campo',
      menuKey: MenuKey.ORDEN_TRABAJO_IN_SITU,
    },
    {
      title: 'Plan de Muestreo',
      route: '/plan-muestreo',
      icon: '🧪',
      desc: 'Planificación de toma de muestras',
      menuKey: MenuKey.PLAN_MUESTREO,
    },
    {
      title: 'Administración de Formularios',
      route: '/admin-formularios',
      icon: '⚙️',
      desc: 'Gestión de formularios del sistema',
      menuKey: null,
      adminOnly: true,
    },
  ];

  public modulosVisibles = computed(() => {
    const roles = this.authService.userProfile()?.roles ?? [];
    const userRole = (Object.values(AppRole) as AppRole[]).find(r => roles.includes(r)) ?? null;

    if (!userRole) return [];

    return this.allModulos.filter(modulo => {
      if (modulo.adminOnly) return userRole === AppRole.ADMIN;
      if (!modulo.menuKey) return false;
      return userRole in MENU_PERMISSIONS[modulo.menuKey];
    });
  });
}
