import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { SpinnerComponent } from '../../../ui/spinner/spinner.component';
import { AuthService } from '../service/auth-service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [SpinnerComponent, FormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login implements OnInit, OnDestroy {
  @ViewChild(SpinnerComponent) spinnerComponent!: SpinnerComponent;

  user: string = '';
  password: string = '';
  passwordVisible: boolean = false;

  // 🔁 Carousel
  carouselImages: string[] = [
    '/image 653.png',
    '/image 653.png',
    '/image 653.png',
  ];
  currentIndex: number = 0;
  intervalId: any;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.startCarousel();
    
    // 1. Intentar cargar credenciales recordadas del localStorage
    this.loadSavedCredentials();
    
    // Nota: Si decides que el logout() debe borrar el storage, 
    // asegúrate de llamar a logout ANTES de loadSavedCredentials o 
    // manejarlo según tu lógica de negocio.
  }

  ngOnDestroy(): void {
    // 🧹 Limpieza del intervalo para evitar procesos en segundo plano
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  /**
   *  Busca si existen credenciales en el LocalStorage y las setea
   */
  private loadSavedCredentials(): void {
    const savedUser = localStorage.getItem('user');
    const savedPass = localStorage.getItem('password');

    if (savedUser && savedPass) {
      this.user = savedUser;
      this.password = savedPass;
      console.log('Credenciales cargadas desde el almacenamiento local.');
    }
  }

  startCarousel(): void {
    this.intervalId = setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % this.carouselImages.length;
    }, 4000);
  }

  togglePassword(): void {
    this.passwordVisible = !this.passwordVisible;
  }

  login(): void {
    if (!this.user || !this.password) {
      Swal.fire('Atención', 'Por favor, ingrese sus credenciales', 'warning');
      return;
    }

    this.spinnerComponent.showSpinner();

    this.authService
      .login(this.user, this.password)
      .then(() => {
        //  Guardamos en localStorage al tener un login exitoso
        localStorage.setItem('user', this.user);
        localStorage.setItem('password', this.password);

        this.spinnerComponent.hideSpinner();
        this.router.navigate(['/dashboard']);
      })
      .catch((err) => {
        this.spinnerComponent.hideSpinner();
        console.error('Error en login:', err);
        Swal.fire({
          icon: 'error',
          title: 'Error de autenticación',
          text: 'Credenciales incorrectas o error de conexión.',
          confirmButtonColor: '#28367F',
          confirmButtonText: 'Aceptar',
        });
      });
  }
}