import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { PageHeader } from '../../shared/components/page-header/page-header';
import { OrdenTrabajoInSituLista } from './lista/orden-trabajo-in-situ-lista';
import { OrdenTrabajoInSituFormulario } from './formulario/orden-trabajo-in-situ-formulario';
import { ReportOrden } from '../../interfaces/solicitudes/orden-trabajo/report-orden.interface';
import { ReportFormularioService } from '../../services/admin-formularios/report-formulario.service';
import { ReportFormulario } from '../../interfaces/admin-formularios/report-formulario.interface';

@Component({
  selector: 'app-orden-trabajo-in-situ',
  imports: [PageHeader, OrdenTrabajoInSituLista, OrdenTrabajoInSituFormulario],
  templateUrl: './orden-trabajo-in-situ.html',
  styleUrl: './orden-trabajo-in-situ.css',
})
export class OrdenTrabajoInSitu implements OnInit, OnDestroy {
  vista: 'lista' | 'formulario' = 'lista';
  editingRecord: ReportOrden | null = null;

  formulario: ReportFormulario | null = null;
  fechaEmision: Date | null = null;

  private readonly destroy$ = new Subject<void>();

  constructor(private reportFormularioService: ReportFormularioService) {}

  ngOnInit(): void {
    this.reportFormularioService
      .getFormularioByCTId(2018)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (formulario) => {
          this.formulario = formulario;
          if (formulario?.fecha_emision) {
            this.fechaEmision = new Date(Number(formulario.fecha_emision));
          }
        },
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  irAFormulario(): void {
    this.editingRecord = null;
    this.vista = 'formulario';
  }

  onEditar(orden: ReportOrden): void {
    this.editingRecord = orden;
    this.vista = 'formulario';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  volverALista(): void {
    this.editingRecord = null;
    this.vista = 'lista';
  }
}
