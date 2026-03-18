import { Component, inject, OnInit, computed } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

import { AuthService } from '../../../features/auth/service/auth-service';
import { SidebarService } from '../../service/sidebar.service';
import { MenuItem, SIDEBAR_MENU_ITEMS } from './sidebar-items';
import { CloseSidebarIconComponent } from "../../../ui/icons/close-sidebar-icon/close-sidebar-icon.component";
import { OpenSidebarIconComponent } from "../../../ui/icons/open-sidebar-icon/open-sidebar-icon.component";
import { CloseIconComponent } from "../../../ui/icons/close-icon/close-icon.component"; // Importa tus items actualizados

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
    CloseSidebarIconComponent,
    OpenSidebarIconComponent,
    CloseIconComponent
],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar implements OnInit {
  private sidebarService = inject(SidebarService);
  private authService = inject(AuthService);
  private router = inject(Router);

  public collapsed = false;

  // 🔄 Menú reactivo: se recalcula cuando cambia el perfil o roles
  public menuItems = computed(() => {
    const profile = this.authService.userProfile();
    // Obtenemos los roles del usuario (como strings desde Keycloak/AuthService)
    const userRoles = profile?.roles || [];
    return this.filterMenuByRole(SIDEBAR_MENU_ITEMS, userRoles);
  });

  ngOnInit(): void {
    this.collapsed = !this.sidebarService.isOpen();
  }

  /**
   * Filtra el menú comparando los strings de userRoles 
   * contra la propiedad .role de los objetos en requiredRoles
   */
  private filterMenuByRole(items: MenuItem[], userRoles: string[]): MenuItem[] {
    return items
      .filter(item => {
        // Si no hay roles requeridos, es público para todos los logueados
        if (!item.requiredRoles || item.requiredRoles.length === 0) return true;

        // Mapeamos el array de objetos [{role: 'admin'}] a strings ['admin'] para comparar
        const requiredRolesList = item.requiredRoles.map(r => r.role);
        
        // Verificamos si el usuario tiene al menos uno de los roles permitidos
        return requiredRolesList.some(role => userRoles.includes(role));
      })
      .map(item => {
        // Procesar hijos de forma recursiva
        if (item.children) {
          return {
            ...item,
            children: this.filterMenuByRole(item.children, userRoles)
          };
        }
        return item;
      })
      // Eliminar carpetas padres que se quedaron sin hijos después del filtrado
      .filter(item => !item.children || item.children.length > 0 || item.path);
  }

  toggleSidebar() {
    this.sidebarService.toggle();
    this.collapsed = !this.collapsed;
  }

  toggleSubmenu(item: MenuItem) {
    if (!this.collapsed) {
      item.expanded = !item.expanded;
    } else {
      this.collapsed = false;
      setTimeout(() => {
        item.expanded = true;
      }, 100);
    }
  }

  logout(): void {
    Swal.fire({
      title: '¿Cerrar sesión?',
      text: 'Se borrarán tus credenciales de acceso.',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#28367F',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, salir',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.authService.logout();
        this.router.navigateByUrl('/login');
      }
    });
  }
}