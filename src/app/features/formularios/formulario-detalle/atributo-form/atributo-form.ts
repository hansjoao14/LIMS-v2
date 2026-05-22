import { Component, EventEmitter, Input, NgZone, OnDestroy, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';

import { AtributoFormularioService } from '../../../../services/admin-formularios/atributo-formulario.service';
import { CatalogoService } from '../../../../services/catalogo.service';
import { ToastrAlertService } from '../../../../services/toastr.service';
import { ReportFormulario } from '../../../../interfaces/admin-formularios/report-formulario.interface';
import { ReportAtributoFormulario } from '../../../../interfaces/admin-formularios/report-atributo-formulario.interface';
import { AtributoFormularioPayload } from '../../../../interfaces/admin-formularios/atributo-formulario-payload.interface';
import { Catalogo, ItemCatalogo } from '../../../../interfaces/catalogos/catalogo.interface';

@Component({
  selector: 'app-atributo-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './atributo-form.html',
})
export class AtributoFormComponent implements OnInit, OnDestroy {
  @Input() formulario!: ReportFormulario;
  @Input() atributo: ReportAtributoFormulario | null = null;
  @Input() atributos: ReportAtributoFormulario[] = [];
  @Output() cerrado = new EventEmitter<void>();
  @Output() guardado = new EventEmitter<void>();

  formData!: AtributoFormularioPayload;
  guardando = false;

  readonly booleanOptions: { field: keyof AtributoFormularioPayload; label: string }[] = [
    { field: 'obligatorio',          label: 'Obligatorio'             },
    { field: 'estado',               label: 'Activo'                  },
    { field: 'hidden',               label: 'Oculto'                  },
    { field: 'readonly',             label: 'Solo lectura'            },
    { field: 'multivaluado',         label: 'Multivaluado'            },
    { field: 'is_ws_sri',            label: 'Integración SRI'         },
    { field: 'is_ws_civil',          label: 'Integración Civil'       },
    { field: 'is_ws_iess',           label: 'Integración IESS'        },
    { field: 'is_dependent',         label: 'Es dependiente'          },
    { field: 'is_dependent_catalogo',label: 'Dependiente de catálogo' },
    { field: 'is_list_empleado',     label: 'Lista de empleados'      },
    { field: 'is_text_area',         label: 'Es área de texto'        },
  ];

  tiposDato: ItemCatalogo[] = [];
  tiposRespuesta: ItemCatalogo[] = [];
  jornadas: ItemCatalogo[] = [];
  catalogos: Catalogo[] = [];

  itemsCatalogo: ItemCatalogo[] = [];
  cargandoItems = false;

  private readonly destroy$ = new Subject<void>();

  constructor(
    private atributoService: AtributoFormularioService,
    private cataloService: CatalogoService,
    private toastr: ToastrAlertService,
    private zone: NgZone,
  ) {}

  ngOnInit(): void {
    this.formData = new AtributoFormularioPayload(
      this.formulario?.id ?? '',
      this.atributo ?? undefined,
    );
    this.cargarCatalogos();

    if (this.formData.catalogo_id) {
      this.cargarItemsCatalogo(this.formData.catalogo_id);
    }
  }

  onCatalogoChange(): void {
    this.formData.item_catalogo_id = '';
    this.itemsCatalogo = [];
    if (this.formData.catalogo_id) {
      this.cargarItemsCatalogo(this.formData.catalogo_id);
    }
  }

  cargarItemsCatalogo(catalogoId: number): void {
    this.cargandoItems = true;
    this.cataloService
      .getItemsByCatalogoId(catalogoId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: ({ data }) => {
          this.zone.run(() => {
            this.itemsCatalogo = data;
            this.cargandoItems = false;
          });
        },
        error: (err) => {
          this.zone.run(() => (this.cargandoItems = false));
          this.toastr.showError('No se pudo cargar los items del catálogo', 'Error');
        },
      });
  }

  get atributosDependibles(): ReportAtributoFormulario[] {
    return this.atributos.filter(
      (a) => a.atributo_formulario_id !== this.atributo?.atributo_formulario_id,
    );
  }

  onTipoRespuestaChange(): void {
    if (this.formData.ctipo_respuesta_id) {
      this.cargarTiposDato([this.formData.ctipo_respuesta_id]);
    } else {
      this.tiposDato = [];
      this.formData.cttipo_dato_id = 0;
    }
  }

  private cargarTiposDato(parentIds: number[]): void {
    this.cataloService
      .getChildrenByParentIds(parentIds)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: ({ data }) => (this.tiposDato = data),
        error: (err) =>
          this.toastr.showError('No se pudo cargar los tipos de dato', 'Error'),
      });
  }

  private cargarCatalogos(): void {
    if (this.formData.ctipo_respuesta_id) {
      this.cargarTiposDato([this.formData.ctipo_respuesta_id]);
    }

    this.cataloService
      .getItemsByCatalogoId(13)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: ({ data }) => (this.tiposRespuesta = data),
        error: (err) =>
          this.toastr.showError('No se pudo cargar los tipos de respuesta', 'Error'),
      });

    this.cataloService
      .getItemsByCatalogoId(26)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: ({ data }) => (this.jornadas = data),
        error: (err) =>
          this.toastr.showError('No se pudo cargar las jornadas', 'Error'),
      });

    this.cataloService
      .getCollectionCatalogo()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => (this.catalogos = data),
        error: (err) =>
          this.toastr.showError('No se pudo cargar los catálogos', 'Error'),
      });
  }

  guardar(): void {
    this.guardando = true;
    const payload = {
      ...this.formData,
      atributo_id: this.formData.atributo_id || null,
      item_catalogo_id: this.formData.item_catalogo_id || null,
      jornada_id: this.formData.jornada_id || null,
    };
    const op$ = this.atributo
      ? this.atributoService.actualizar(this.atributo.atributo_formulario_id, payload)
      : this.atributoService.crear(payload);

    op$.pipe(takeUntil(this.destroy$)).subscribe({
      next: () => {
        this.zone.run(() => {
          this.guardando = false;
          const msg = this.atributo
            ? 'Atributo actualizado correctamente.'
            : 'Atributo creado correctamente.';
          this.toastr.showSuccess(msg, 'Éxito');
          this.guardado.emit();
        });
      },
      error: (err) => {
        this.zone.run(() => {
          this.guardando = false;
          this.toastr.showError('No se pudo guardar el atributo.', 'Error');
        });
      },
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
