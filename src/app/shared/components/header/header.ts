import { Component, inject } from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { filter, map } from 'rxjs';
import { AuthService } from '../../../features/auth/service/auth-service';
import { SidebarService } from '../../service/sidebar.service';
import { AlertService } from '../../../services/alert.service';
import { SettingsComponent } from '../../../ui/icons/settings/settings.component';
import { NotificationIconComponent } from '../../../ui/icons/notification-icon/notification-icon.component';
import { HamburgerIconComponent } from '../../../ui/icons/hamburger-icon/hamburger-icon.component';
import { UserComponent } from '../../../ui/icons/user/user.component';

@Component({
  selector: 'app-header',
  imports: [SettingsComponent, NotificationIconComponent, HamburgerIconComponent, UserComponent],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  public Title: any;
  public userName: string = '';
  public userEmail: string = '';
  public userRoles: string[] = [];

  private sidebarService = inject(SidebarService);

  constructor(
    private authService: AuthService,
    private toast: ToastrService,
    private router: Router,
    private alertService: AlertService,
  ) {
    this.router.events
      .pipe(
        filter((event) => event instanceof ActivationEnd),
        filter((event: ActivationEnd) => event.snapshot.firstChild === null),
        map((event: ActivationEnd) => event.snapshot.data),
      )
      .subscribe((data) => {
        this.Title = data['title'];
        document.title = data['title'];
      });
  }

  ngOnInit(): void {
    this.loadUserData();
  }

  private loadUserData(): void {
    this.userName = localStorage.getItem('user_name') || 'Usuario';
    this.userEmail = localStorage.getItem('user_email') || '';

    const rolesRaw = localStorage.getItem('user_roles');
    if (rolesRaw) {
      try {
        this.userRoles = JSON.parse(rolesRaw);
      } catch (e) {
        this.userRoles = [];
      }
    }
  }

  toggleMobileSidebar(): void {
    this.sidebarService.toggleMobile();
  }

  async logout(): Promise<void> {
    const confirmado = await this.alertService.confirm({
      title: '¿Estás seguro?',
      text: 'Estás a punto de cerrar sesión.',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, cerrar sesión',
    });
    if (!confirmado) return;
    this.authService.logout();
    this.router.navigateByUrl('/login');
    this.alertService.success('Has cerrado sesión correctamente.', '¡Cerrado!');
  }

  notification() {
    this.toast.success('Notificación', 'Esta es una notificación de prueba', {
      timeOut: 3000,
      progressBar: true,
      closeButton: true,
      positionClass: 'toast-top-right',
    });
  }
}
