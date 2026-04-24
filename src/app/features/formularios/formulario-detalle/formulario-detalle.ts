import { Component, EventEmitter, Input, NgZone, OnChanges, OnDestroy, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';

import { ReportFormularioService } from '../../../services/admin-formularios/report-formulario.service';
import { ToastrAlertService } from '../../../services/toastr.service';
import { ReportFormulario } from '../../../interfaces/admin-formularios/report-formulario.interface';
import { ReportAtributoFormulario } from '../../../interfaces/admin-formularios/report-atributo-formulario.interface';
import { AtributoFormComponent } from './atributo-form/atributo-form';

@Component({
  selector: 'app-formulario-detalle',
  standalone: true,
  imports: [CommonModule, AtributoFormComponent],
  templateUrl: './formulario-detalle.html',
})
export class FormularioDetalle implements OnChanges, OnDestroy {
  @Input() formulario!: ReportFormulario;
  @Output() regresar = new EventEmitter<void>();

  atributos: ReportAtributoFormulario[] = [];
  loading = false;

  mostrarFormulario = false;
  atributoEditando: ReportAtributoFormulario | null = null;

  private readonly destroy$ = new Subject<void>();

  constructor(
    private service: ReportFormularioService,
    private toastr: ToastrAlertService,
    private zone: NgZone,
  ) {}

  ngOnChanges(): void {
    if (this.formulario) this.cargarAtributos();
  }

  cargarAtributos(): void {
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
        error: (err) => {
          this.zone.run(() => (this.loading = false));
          this.toastr.showError(err?.error?.message ?? 'No se pudo cargar los atributos del formulario', 'Error');
        },
      });
  }

  abrirFormNuevo(): void {
    this.atributoEditando = null;
    this.mostrarFormulario = true;
  }

  abrirFormEditar(attr: ReportAtributoFormulario): void {
    this.atributoEditando = attr;
    this.mostrarFormulario = true;
  }

  cerrarFormulario(): void {
    this.mostrarFormulario = false;
    this.atributoEditando = null;
  }

  shortTipoRespuesta(nombre: string): string {
    return nombre?.split(' ').pop() ?? nombre ?? '';
  }

  onGuardado(): void {
    this.cerrarFormulario();
    this.cargarAtributos();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
