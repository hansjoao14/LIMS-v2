import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';
import { ToastrAlertService } from '../../services/toastr.service'; // Ajusta la ruta a tu Toastr
import { AdminFormularioService } from './services/admin-formulario-service';

@Component({
  selector: 'app-admin-formularios',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-formularios.html',
  styleUrl: './admin-formularios.css',
})
export class AdminFormularios implements OnInit, OnDestroy {
  formularios: any[] = [];
  loading: boolean = true;
  private destroy$ = new Subject<void>();

  constructor(
    private adminService: AdminFormularioService,
    private toastr: ToastrAlertService
  ) {}

  ngOnInit(): void {
    this.cargarListaFormularios();
  }

  cargarListaFormularios(): void {
    this.loading = true;
    this.adminService.getFormularios()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => {
          // Asignamos la respuesta de la API (El arreglo que vimos en tu imagen)
          this.formularios = data || [];
          this.loading = false;
        },
        error: (err) => {
          console.error('Error al obtener la lista de formularios:', err);
          this.toastr.showError('No se pudo cargar la lista de formularios desde el servidor.', 'Error de Conexión');
          this.loading = false;
        }
      });
  }

  configurarFormulario(formularioId: string): void {
    // TODO: Aquí navegaremos al componente de edición de preguntas pasándole el ID
    console.log('Ir a configurar formulario:', formularioId);
    this.toastr.showSuccess(`Abriendo configuración del formulario ${formularioId}...`, 'Cargando');
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}