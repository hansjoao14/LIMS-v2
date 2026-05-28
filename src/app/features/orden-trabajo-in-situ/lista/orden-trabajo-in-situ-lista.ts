import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';

import { ReportOrdenService } from '../../../services/solicitudes/orden-trabajo/report-orden.service';
import { ReportOrden } from '../../../interfaces/solicitudes/orden-trabajo/report-orden.interface';

@Component({
  selector: 'app-orden-trabajo-in-situ-lista',
  imports: [CommonModule],
  templateUrl: './orden-trabajo-in-situ-lista.html',
})
export class OrdenTrabajoInSituLista implements OnInit, OnDestroy {
  @Output() nuevaOrden = new EventEmitter<void>();
  @Output() editar     = new EventEmitter<ReportOrden>();

  loading = true;
  ordenes: ReportOrden[] = [];

  openMenuId: string | null = null;

  private readonly destroy$ = new Subject<void>();

  constructor(private reportOrdenService: ReportOrdenService) {}

  ngOnInit(): void {
    this.cargarOrdenes();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  cargarOrdenes(): void {
    this.loading = true;
    this.reportOrdenService.getOrdenes()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => {
          this.ordenes = data;
          this.loading = false;
        },
        error: () => {
          this.loading = false;
        },
      });
  }

  toggleMenu(id: string, event: MouseEvent): void {
    event.stopPropagation();
    this.openMenuId = this.openMenuId === id ? null : id;
  }

  closeMenu(): void {
    this.openMenuId = null;
  }

  finalizarOrden(orden: ReportOrden): void {
    console.log('[orden-in-situ:finalizar]', orden);
  }

  rechazarOrden(orden: ReportOrden): void {
    console.log('[orden-in-situ:rechazar]', orden);
  }

  editarOrden(orden: ReportOrden): void {
    this.editar.emit(orden);
  }

  eliminarOrden(orden: ReportOrden): void {
    console.log('[orden-in-situ:eliminar]', orden);
  }

  imprimirOrden(orden: ReportOrden): void {
    console.log('[orden-in-situ:imprimir]', orden);
  }
}
