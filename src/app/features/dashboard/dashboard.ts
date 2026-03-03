import { Component, inject, computed } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth/service/auth-service';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  private authService = inject(AuthService);

  // 1. Definimos la lista maestra con los roles requeridos
  private allModulos = [
    { 
      title: 'Solicitud de Trabajo', 
      route: '/solicitud-trabajo', 
      icon: '📝', 
      desc: 'Gestión de requerimientos técnicos',
      roles: ['admin', 'gestor'] 
    },
    { 
      title: 'Lista de Solicitudes', 
      route: '/lista-solicitudes', 
      icon: '📋', 
      desc: 'Seguimiento de estados y procesos',
      roles: ['admin', 'gestor'] 
    },
    { 
      title: 'Horarios Laborales', 
      route: '/horarios-laborales', 
      icon: '📅', 
      desc: 'Programación semanal de flota',
      roles: ['admin', 'gestor'] 
    },
    { 
      title: 'Por Contraloría', 
      route: '/por-contraloria', 
      icon: '⚖️', 
      desc: 'Orden de movilización y control',
      roles: ['admin', 'gestor'] 
    },
    { 
      title: 'Orden de Trabajo In Situ', 
      route: '/orden-trabajo-in-situ', 
      icon: '🛠️', 
      desc: 'Operaciones directas en campo',
      roles: ['manager', 'admin', 'gestor'] 
    },
    { 
      title: 'Plan de Muestreo', 
      route: '/plan-muestreo', 
      icon: '🧪', 
      desc: 'Planificación de toma de muestras',
      roles: ['manager', 'admin', 'gestor'] 
    },
  ];

  // 2. Creamos un Signal computado que filtra automáticamente
  public modulosVisibles = computed(() => {
    const userRoles = this.authService.userProfile()?.roles || [];
    
    return this.allModulos.filter(modulo => 
      modulo.roles.some(role => userRoles.includes(role))
    );
  });
}