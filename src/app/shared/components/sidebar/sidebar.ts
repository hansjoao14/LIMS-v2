import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { AuthService } from '../../../features/auth/service/auth-service';
import { SidebarService } from '../../service/sidebar.service';
import { MenuItem, SIDEBAR_MENU_ITEMS } from './sidebar-items';
import { CloseIconComponent } from '../../../ui/icons/close-icon/close-icon.component';
import { CloseSidebarIconComponent } from '../../../ui/icons/close-sidebar-icon/close-sidebar-icon.component';
import { OpenSidebarIconComponent } from '../../../ui/icons/open-sidebar-icon/open-sidebar-icon.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  imports: [
    CloseIconComponent,
    CloseSidebarIconComponent,
    OpenSidebarIconComponent,
    CommonModule,
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {
  private sidebarService = inject(SidebarService);

  public collapsed = false;
  public menuItems: MenuItem[] = SIDEBAR_MENU_ITEMS;

  constructor(
    private authService: AuthService,
    private toast: ToastrService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.collapsed = !this.sidebarService.isOpen();
  }

  toggleSidebar() {
    this.sidebarService.toggle();
    this.collapsed = !this.collapsed;
  }

  // Lógica para abrir/cerrar dropdowns
  toggleSubmenu(item: MenuItem) {
    if (!this.collapsed) {
      item.expanded = !item.expanded;
    } else {
      // Si el menú está colapsado, al dar click expandimos el sidebar primero
      this.collapsed = false;
      setTimeout(() => {
        item.expanded = true;
      }, 100);
    }
  }

  logout(): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Estás a punto de cerrar sesión.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, cerrar sesión',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.authService.logout();
        this.router.navigateByUrl('/login');
      }
    });
  }
}
