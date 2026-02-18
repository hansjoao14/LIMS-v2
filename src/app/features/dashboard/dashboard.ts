import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  // Lista de módulos para renderizar dinámicamente
  modulos = [
    { title: 'Solicitud de Trabajo', route: '/solicitud-trabajo', icon: '📝', desc: 'Gestión de requerimientos técnicos' },
    { title: 'Lista de Solicitudes', route: '/lista-solicitudes', icon: '📋', desc: 'Seguimiento de estados y procesos' },
    { title: 'Horarios Laborales', route: '/horarios-laborales', icon: '📅', desc: 'Programación semanal de flota' },
    { title: 'Por Contraloría', route: '/por-contraloria', icon: '⚖️', desc: 'Orden de movilización y control' },
  ];
}