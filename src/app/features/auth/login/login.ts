import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { SpinnerComponent } from '../../../ui/spinner/spinner.component';
import { AuthService } from '../service/auth-service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
    standalone: true,
  imports: [SpinnerComponent, FormsModule, CommonModule,],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  @ViewChild(SpinnerComponent) spinnerComponent!: SpinnerComponent;

  user: string = 'german.caicedo@quito.gob.ec';
  password: string = 'C@po032786';
  passwordVisible: boolean = false;

  // 🔁 Carousel
  carouselImages: string[] = [
    '/image 264.png',
    '/image 264.png',
    '/image 264.png',
  ];
  currentIndex: number = 0;
  intervalId: any;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.startCarousel();
    this.authService.logout();
  }

  /* ngOnDestroy(): void {
    clearInterval(this.intervalId);
  } */

  // 🔄 Inicia el carrusel
  startCarousel(): void {
    this.intervalId = setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % this.carouselImages.length;
    }, 4000); // cada 4 segundos
  }

  // 👁 Mostrar/Ocultar contraseña
  togglePassword(): void {
    this.passwordVisible = !this.passwordVisible;
  }

  login(): void {
    this.spinnerComponent.showSpinner();

    this.authService
      .login(this.user, this.password)
      .then(() => {
        this.spinnerComponent.hideSpinner();
        this.router.navigate(['/dashboard']);
      })
      .catch((err) => {
        this.spinnerComponent.hideSpinner();
        console.error('Error en login:', err);
        Swal.fire({
          icon: 'error',
          title: 'Error de autenticación',
          text: 'No se pudo establecer conexión con el servidor o las credenciales son incorrectas.',
          confirmButtonColor: '#28367F',
          confirmButtonText: 'Aceptar',
        });
      });
  }

  // 👤 Inicio de sesión
  /*  login(): void {
    /*  if (!this.user || !this.password) {
      return; // evita continuar si hay campos vacíos
    } */
  // this.spinnerComponent.showSpinner();

  /*   setTimeout(() => {
      this.spinnerComponent.hideSpinner();
      this.router.navigate(['/dashboard']);
    }, 2000); */

  /*   this.authService.login(this.user, this.password).subscribe({
      next: (response) => {
        const token = response.token;
        const payload = JSON.parse(atob(token.split('.')[1]));
        const role = payload.role;

        if (role === 'admin') {
          this.router.navigate(['/dashboard']);
        } else {
          this.router.navigate(['/profile']);
        }
      },
      error: (err) => {
        this.spinnerComponent.hideSpinner();
        console.error('Login failed', err);
      },
    }); */
}



