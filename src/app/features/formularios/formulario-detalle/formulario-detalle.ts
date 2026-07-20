import {
  Component,
  EventEmitter,
  Input,
  NgZone,
  OnChanges,
  OnDestroy,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';

import { ReportFormularioService } from '../../../services/admin-formularios/report-formulario.service';
import { ToastrAlertService } from '../../../services/toastr.service';
import { ReportFormulario } from '../../../interfaces/admin-formularios/report-formulario.interface';
import { ReportAtributoFormulario } from '../../../interfaces/admin-formularios/report-atributo-formulario.interface';
import { PaginationMeta } from '../../../interfaces/catalogos/catalogo.interface';
import { AtributoFormComponent } from './atributo-form/atributo-form';
import { PaginationComponent } from '../../../shared/components/pagination/pagination';
import { LoadingComponent } from '../../../shared/components/loading/loading';

@Component({
  selector: 'app-formulario-detalle',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    AtributoFormComponent,
    PaginationComponent,
    LoadingComponent,
  ],
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

  busqueda = '';
  ordenSeccion: 'asc' | 'desc' | null = null;

  mostrarFormulario = false;
  atributoEditando: ReportAtributoFormulario | null = null;

  private readonly destroy$ = new Subject<void>();

  constructor(
    private service: ReportFormularioService,
    private toastr: ToastrAlertService,
    private zone: NgZone,
  ) {}

  ngOnChanges(): void {
    if (this.formulario) {
      this.busqueda = '';
      this.ordenSeccion = null;
      this.cargarPagina(1);
    }
  }

  cargarPagina(page: number): void {
    this.loading = true;
    this.currentPage = page;
    this.atributos = [];

    this.service
      .getAtributosByFormulario(this.formulario.id, page, this.PAGE_SIZE, this.busqueda.trim())
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: ({ data, meta }) => {
          this.zone.run(() => {
            this.atributos = data;
            this.meta = meta;
            this.loading = false;
            this.aplicarOrdenSeccion();
          });
        },
        error: (err) => {
          this.zone.run(() => (this.loading = false));
          this.toastr.showError('No se pudo cargar los atributos del formulario', 'Error');
        },
      });
  }

  onBusquedaChange(valor: string): void {
    this.busqueda = valor;
    this.cargarPagina(1);
  }

  // Ordena la página actualmente cargada por sección — el listado sigue
  // paginado del lado del servidor (orden por defecto), así que este orden
  // solo aplica a los atributos ya traídos, igual que el sort-por-orden que
  // ya hace el service.
  toggleOrdenSeccion(): void {
    this.ordenSeccion =
      this.ordenSeccion === null ? 'asc' : this.ordenSeccion === 'asc' ? 'desc' : null;
    this.aplicarOrdenSeccion();
  }

  private aplicarOrdenSeccion(): void {
    if (this.ordenSeccion === null) return;
    const factor = this.ordenSeccion === 'asc' ? 1 : -1;
    this.atributos = [...this.atributos].sort((a, b) => {
      const sa = a.seccion ?? Number.POSITIVE_INFINITY;
      const sb = b.seccion ?? Number.POSITIVE_INFINITY;
      return (sa - sb) * factor;
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
