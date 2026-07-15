import { Component, inject, OnInit, computed } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { filter } from 'rxjs';
import { CommonModule } from '@angular/common';

import { AuthService } from '../../../features/auth/service/auth-service';
import { SidebarService } from '../../service/sidebar.service';
import { AlertService } from '../../../services/alert.service';
import { MenuItem, SIDEBAR_MENU_ITEMS } from './sidebar-items';
import { CloseSidebarIconComponent } from '../../../ui/icons/close-sidebar-icon/close-sidebar-icon.component';
import { OpenSidebarIconComponent } from '../../../ui/icons/open-sidebar-icon/open-sidebar-icon.component';
import { CloseIconComponent } from '../../../ui/icons/close-icon/close-icon.component';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
    CloseSidebarIconComponent,
    OpenSidebarIconComponent,
    CloseIconComponent,
  ],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar implements OnInit {
  private sidebarService = inject(SidebarService);
  private authService = inject(AuthService);
  private router = inject(Router);
  private alertService = inject(AlertService);

  public collapsed = false;
  public sidebarMobileOpen = this.sidebarService.mobileOpen;

  public menuItems = computed(() => {
    const profile = this.authService.userProfile();
    const userRoles = profile?.roles || [];
    return this.filterMenuByRole(SIDEBAR_MENU_ITEMS, userRoles);
  });

  ngOnInit(): void {
    this.collapsed = !this.sidebarService.isOpen();

    // Cierra el sidebar móvil al navegar a otra ruta
    this.router.events
      .pipe(filter((e) => e instanceof NavigationEnd))
      .subscribe(() => this.sidebarService.closeMobile());
  }

  private filterMenuByRole(items: MenuItem[], userRoles: string[]): MenuItem[] {
    return items
      .filter((item) => {
        if (!item.requiredRoles || item.requiredRoles.length === 0) return true;
        const requiredRolesList = item.requiredRoles.map((r) => r.role);
        return requiredRolesList.some((role) => userRoles.includes(role));
      })
      .map((item) => {
        if (item.children) {
          return { ...item, children: this.filterMenuByRole(item.children, userRoles) };
        }
        return item;
      })
      .filter((item) => !item.children || item.children.length > 0 || item.path);
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

  async logout(): Promise<void> {
    const confirmado = await this.alertService.confirm({
      icon: 'question',
      title: '¿Cerrar sesión?',
      text: 'Se borrarán tus credenciales de acceso.',
      confirmButtonColor: '#28367F',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, salir',
    });
    if (!confirmado) return;
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }
}
