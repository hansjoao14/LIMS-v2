import { Component, EventEmitter, Input, NgZone, OnChanges, OnDestroy, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';

import { ReportFormularioService } from '../../../services/admin-formularios/report-formulario.service';
import { ToastrAlertService } from '../../../services/toastr.service';
import { ReportFormulario } from '../../../interfaces/admin-formularios/report-formulario.interface';
import { ReportAtributoFormulario } from '../../../interfaces/admin-formularios/report-atributo-formulario.interface';
import { PaginationMeta } from '../../../interfaces/catalogos/catalogo.interface';
import { AtributoFormComponent } from './atributo-form/atributo-form';
import { PaginationComponent } from '../../../shared/components/pagination/pagination';

@Component({
  selector: 'app-formulario-detalle',
  standalone: true,
  imports: [CommonModule, AtributoFormComponent, PaginationComponent],
  templateUrl: './formulario-detalle.html',
})
export class FormularioDetalle implements OnChanges, OnDestroy {
  @Input() formulario!: ReportFormulario;
  @Output() regresar = new EventEmitter<void>();

  atributos: ReportAtributoFormulario[] = [];
  meta: PaginationMeta | null = null;
  loading = false;
  currentPage = 1;
  readonly PAGE_SIZE = 10;

  mostrarFormulario = false;
  atributoEditando: ReportAtributoFormulario | null = null;

  private readonly destroy$ = new Subject<void>();

  constructor(
    private service: ReportFormularioService,
    private toastr: ToastrAlertService,
    private zone: NgZone,
  ) {}

  ngOnChanges(): void {
    if (this.formulario) this.cargarPagina(1);
  }

  cargarPagina(page: number): void {
    this.loading = true;
    this.currentPage = page;
    this.atributos = [];

    this.service
      .getAtributosByFormulario(this.formulario.id, page, this.PAGE_SIZE)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: ({ data, meta }) => {
          this.zone.run(() => {
            this.atributos = data;
            this.meta = meta;
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
    this.cargarPagina(this.currentPage);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
