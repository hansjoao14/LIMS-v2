import { Component, EventEmitter, Input, NgZone, OnChanges, OnDestroy, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';
import Swal from 'sweetalert2';

import { ReportFormularioService } from '../../../../../services/admin-formularios/report-formulario.service';
import { ReportFormulario } from '../../../../../interfaces/admin-formularios/report-formulario.interface';
import { ReportAtributoFormulario } from '../../../../../interfaces/admin-formularios/report-atributo-formulario.interface';

@Component({
  selector: 'app-admin-formulario-detalle',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-formulario-detalle.html',
})
export class AdminFormularioDetalleComponent implements OnChanges, OnDestroy {
  @Input() formulario!: ReportFormulario;
  @Output() regresar = new EventEmitter<void>();

  atributos: ReportAtributoFormulario[] = [];
  loading = false;

  private readonly destroy$ = new Subject<void>();

  constructor(
    private service: ReportFormularioService,
    private zone: NgZone,
  ) {}

  ngOnChanges(): void {
    if (this.formulario) this.cargarAtributos();
  }

  private cargarAtributos(): void {
    this.loading = true;
    this.atributos = [];

    this.service
      .getAtributosByFormulario(this.formulario.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => {
          this.zone.run(() => {
            this.atributos = data;
            this.loading = false;
          });
        },
        error: () => {
          this.zone.run(() => (this.loading = false));
          Swal.fire('Error', 'No se pudo cargar los atributos del formulario', 'error');
        },
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
