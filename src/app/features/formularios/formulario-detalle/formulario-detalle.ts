import { Component, EventEmitter, Input, NgZone, OnChanges, OnDestroy, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';

import { ReportFormularioService } from '../../../services/admin-formularios/report-formulario.service';
import { AtributoFormularioService } from '../../../services/admin-formularios/atributo-formulario.service';
import { ToastrAlertService } from '../../../services/toastr.service';
import { ReportFormulario } from '../../../interfaces/admin-formularios/report-formulario.interface';
import { ReportAtributoFormulario } from '../../../interfaces/admin-formularios/report-atributo-formulario.interface';
import { AtributoFormularioPayload } from '../../../interfaces/admin-formularios/atributo-formulario-payload.interface';

@Component({
  selector: 'app-formulario-detalle',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './formulario-detalle.html',
})
export class FormularioDetalle implements OnChanges, OnDestroy {
  @Input() formulario!: ReportFormulario;
  @Output() regresar = new EventEmitter<void>();

  atributos: ReportAtributoFormulario[] = [];
  loading = false;

  mostrarFormulario = false;
  guardando = false;
  atributoEditando: ReportAtributoFormulario | null = null;
  formData: AtributoFormularioPayload = this.emptyForm();

  private readonly destroy$ = new Subject<void>();

  constructor(
    private service: ReportFormularioService,
    private atributoService: AtributoFormularioService,
    private toastr: ToastrAlertService,
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
        error: (err) => {
          this.zone.run(() => (this.loading = false));
          this.toastr.showError(err?.error?.message ?? 'No se pudo cargar los atributos del formulario', 'Error');
        },
      });
  }

  abrirFormNuevo(): void {
    this.atributoEditando = null;
    this.formData = this.emptyForm();
    this.mostrarFormulario = true;
  }

  abrirFormEditar(attr: ReportAtributoFormulario): void {
    this.atributoEditando = attr;
    this.formData = {
      formulario_id: attr.formulario_id,
      nombre: attr.atributo_formulario_nombre,
      pregunta: attr.atributo_formulario_pregunta,
      ayuda: attr.atributo_formulario_ayuda ?? '',
      cttipo_dato_id: attr.ctipo_dato_id,
      ctipo_respuesta_id: attr.ctipo_respuesta_id,
      orden: attr.orden,
      catalogo_id: attr.catalogo_id,
      jornada_id: attr.jornada_id ?? '',
      atributo_id: attr.atributo_id ?? '',
      item_catalogo_id: attr.item_catalogo_id ?? '',
      num_caracter: attr.num_caracter,
      num_rango: attr.num_rango,
      num_atras: attr.num_atras,
      num_adelante: attr.num_adelante,
      is_dependent: attr.is_dependent ?? false,
      is_dependent_catalogo: attr.is_dependent_catalogo ?? false,
    };
    this.mostrarFormulario = true;
  }

  cerrarFormulario(): void {
    this.mostrarFormulario = false;
    this.atributoEditando = null;
  }

  guardar(): void {
    this.guardando = true;
    const op$ = this.atributoEditando
      ? this.atributoService.actualizar(this.atributoEditando.atributo_formulario_id, this.formData)
      : this.atributoService.crear(this.formData);

    op$.pipe(takeUntil(this.destroy$)).subscribe({
      next: () => {
        this.zone.run(() => {
          this.guardando = false;
          const msg = this.atributoEditando ? 'Atributo actualizado correctamente.' : 'Atributo creado correctamente.';
          this.cerrarFormulario();
          this.cargarAtributos();
          this.toastr.showSuccess(msg, 'Éxito');
        });
      },
      error: (err) => {
        this.zone.run(() => {
          this.guardando = false;
          this.toastr.showError(err?.error?.message ?? 'No se pudo guardar el atributo.', 'Error');
        });
      },
    });
  }

  private emptyForm(): AtributoFormularioPayload {
    return {
      formulario_id: this.formulario?.id ?? '',
      nombre: '',
      pregunta: '',
      ayuda: '',
      cttipo_dato_id: 0,
      ctipo_respuesta_id: 0,
      orden: this.atributos.length + 1,
      catalogo_id: null,
      jornada_id: '',
      atributo_id: '',
      item_catalogo_id: '',
      num_caracter: null,
      num_rango: null,
      num_atras: null,
      num_adelante: null,
      is_dependent: false,
      is_dependent_catalogo: false,
    };
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
