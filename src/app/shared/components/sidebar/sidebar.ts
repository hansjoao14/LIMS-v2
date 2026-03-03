import { Component, inject, OnInit, computed } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

import { AuthService } from '../../../features/auth/service/auth-service';
import { SidebarService } from '../../service/sidebar.service';
import { MenuItem, SIDEBAR_MENU_ITEMS } from './sidebar-items';

// Iconos
import { CloseIconComponent } from '../../../ui/icons/close-icon/close-icon.component';
import { CloseSidebarIconComponent } from '../../../ui/icons/close-sidebar-icon/close-sidebar-icon.component';
import { OpenSidebarIconComponent } from '../../../ui/icons/open-sidebar-icon/open-sidebar-icon.component';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
    CloseIconComponent,
    CloseSidebarIconComponent,
    OpenSidebarIconComponent
  ],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar implements OnInit {
  private sidebarService = inject(SidebarService);
  private authService = inject(AuthService);
  private router = inject(Router);

  public collapsed = false;

  // 🔄 Menú reactivo: se recalcula automáticamente cuando cambia el perfil del usuario
  public menuItems = computed(() => {
    const profile = this.authService.userProfile();
    const roles = profile?.roles || [];
    return this.filterMenuByRole(SIDEBAR_MENU_ITEMS, roles);
  });

  ngOnInit(): void {
    this.collapsed = !this.sidebarService.isOpen();
  }

  /**
   * Filtra el menú de forma recursiva según los roles del usuario
   */
  private filterMenuByRole(items: MenuItem[], userRoles: string[]): MenuItem[] {
    return items
      .filter(item => {
        if (!item.requiredRoles || item.requiredRoles.length === 0) return true;
        return item.requiredRoles.some(role => userRoles.includes(role));
      })
      .map(item => {
        if (item.children) {
          return {
            ...item,
            children: this.filterMenuByRole(item.children, userRoles)
          };
        }
        return item;
      })
      // No mostrar categorías padres si se quedaron sin hijos o no tienen ruta propia
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
        // El authService.logout() ya limpia el localStorage (user_email, roles, tokens, etc)
        this.authService.logout();
        this.router.navigateByUrl('/login');
      }
    });
  }
}