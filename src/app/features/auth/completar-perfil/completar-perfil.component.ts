import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

import { CreateUsuarioRolPayload, KycloackBackendApiService, UsuarioSetup } from '../service/kycloack-backend-api.service';

@Component({
  selector: 'app-completar-perfil',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './completar-perfil.component.html',
  styleUrl: './completar-perfil.component.css'
})
export class CompletarPerfilComponent implements OnInit {
  perfilForm!: FormGroup;
  rolesDisponibles: string[] = [];
  datosUsuarioTemp!: UsuarioSetup;

  // Definimos las direcciones metropolitanas basadas en tu HTML
  direccionesAmbiente = [
    { value: 'cambio-climatico', label: 'Dirección de Cambio Climático' },
    { value: 'regularizacion-control', label: 'Dirección de Regularización y Control Ambiental' },
    { value: 'recursos-naturales', label: 'Dirección Metropolitana Regulación y Control Ambiental' },
    { value: 'politicas-planeamiento', label: 'Dirección de Políticas y Planeamiento Ambiental' }
  ];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private keycloakApi: KycloackBackendApiService,
  ) {
    const navegacion = this.router.getCurrentNavigation();
    const estado = navegacion?.extras.state as { usuarioData: UsuarioSetup, rolesDisponibles: string[] };

    if (estado) {
      this.datosUsuarioTemp = estado.usuarioData;
      this.rolesDisponibles = estado.rolesDisponibles;
    } else {
      this.router.navigate(['/auth/login']);
    }
  }

  ngOnInit(): void {
    if (!this.datosUsuarioTemp) return;
    this.initForm();
  }

  initForm(): void {
    // entidad_id ahora almacenará el string del value seleccionado
    this.perfilForm = this.fb.group({
      entidad_id: ['', [Validators.required]]
    });
  }

  guardarPerfil(): void {
    if (this.perfilForm.invalid) {
      this.perfilForm.markAllAsTouched();
      return;
    }

    const usuarioKeycloak: UsuarioSetup = {
      ...this.datosUsuarioTemp,
      // Nota: Si tu backend espera un ID numérico, deberás mapear estos strings a números.
      // Si el backend acepta el slug/string, se queda así:
      entidad_id: this.perfilForm.value.entidad_id,
      is_completed: true
    };

    const rolesPayload = this.rolesDisponibles.map(rol => ({
      nombre: rol,
      descripcion: `Rol asignado desde Keycloak`
    }));

    const payloadFinal: CreateUsuarioRolPayload = {
      usuarioKeycloak: usuarioKeycloak,
      rol: rolesPayload
    };

    this.keycloakApi.completarPerfilUsuario(payloadFinal).subscribe({
      next: () => {
        Swal.fire({
          title: '¡Datos Registrados!',
          text: `Dirección asignada con éxito.`,
          icon: 'success',
          confirmButtonColor: '#28367F',
          timer: 2000,
          showConfirmButton: false
        }).then(() => {
          this.router.navigate(['/dashboard']);
        });
      },
      error: (err) => {
        console.error('Error al registrar perfil', err);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Hubo un problema al vincular la dirección con tus credenciales.',
          confirmButtonColor: '#28367F'
        });
      }
    });
  }
}
