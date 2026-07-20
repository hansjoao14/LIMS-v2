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
import { ItemCatalogo } from '../../../../interfaces/catalogos/catalogo.interface';
import { FieldSkeleton } from '../../../../ui/field-skeleton/field-skeleton';
import { CatalogoSelect } from '../../../../shared/components/catalogo-select/catalogo-select';

@Component({
  selector: 'app-atributo-form',
  standalone: true,
  imports: [CommonModule, FormsModule, FieldSkeleton, CatalogoSelect],
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
    { field: 'obligatorio', label: 'Obligatorio' },
    { field: 'estado', label: 'Activo' },
    { field: 'hidden', label: 'Oculto' },
    { field: 'readonly', label: 'Solo lectura' },
    { field: 'multivaluado', label: 'Multivaluado' },
    { field: 'is_ws_sri', label: 'Integración SRI' },
    { field: 'is_ws_civil', label: 'Integración Civil' },
    { field: 'is_ws_iess', label: 'Integración IESS' },
    { field: 'is_dependent', label: 'Es dependiente' },
    { field: 'is_dependent_catalogo', label: 'Dependiente de catálogo' },
    { field: 'is_list_empleado', label: 'Lista de empleados' },
    { field: 'is_text_area', label: 'Es área de texto' },
  ];

  tiposDato: ItemCatalogo[] = [];
  tiposRespuesta: ItemCatalogo[] = [];
  jornadas: ItemCatalogo[] = [];

  itemsCatalogo: ItemCatalogo[] = [];
  cargandoItems = false;

  // ── Ítems del catálogo del atributo del que se depende (checkbox múltiple) ──
  itemsCatalogoDependencia: ItemCatalogo[] = [];
  cargandoItemsDependencia = false;
  catalogoDependenciaId: number | null = null;
  selectedItemIds = new Set<number>();

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

    if (this.formData.is_dependent && this.formData.atributo_id) {
      const ids = this.formData.item_catalogo_id
        ? this.formData.item_catalogo_id.split(',').map(Number)
        : [];
      this.selectedItemIds = new Set(ids);
      this.cargarItemsDependencia();
    }
  }

  onCatalogoChange(catalogoId: number | null): void {
    this.formData.catalogo_id = catalogoId;
    this.formData.item_catalogo_id = '';
    this.itemsCatalogo = [];
    if (this.formData.catalogo_id) {
      this.cargarItemsCatalogo(this.formData.catalogo_id);
    }
  }

  onSeccionChange(val: string): void {
    const n = parseInt(val, 10);
    this.formData.seccion = isNaN(n) ? null : n;
  }

  // ── Atributo del que se depende: resuelve su catalogo_id y carga sus ítems ──
  onAtributoDependeChange(): void {
    this.selectedItemIds.clear();
    this.formData.item_catalogo_id = null;
    this.itemsCatalogoDependencia = [];
    this.catalogoDependenciaId = null;
    this.cargarItemsDependencia();
  }

  // Si el usuario marca "Es dependiente" después de haber elegido "Depende de"
  onDependienteToggle(): void {
    if (this.formData.is_dependent && this.formData.atributo_id && !this.catalogoDependenciaId) {
      this.cargarItemsDependencia();
    }
  }

  private cargarItemsDependencia(): void {
    if (!this.formData.atributo_id) return;

    const padre = this.atributos.find(
      (a) => a.atributo_formulario_id === this.formData.atributo_id,
    );
    this.catalogoDependenciaId = padre?.catalogo_id ?? null;

    if (!this.catalogoDependenciaId) return;

    this.cargandoItemsDependencia = true;
    this.cataloService
      .getAllItemsAdmin(this.catalogoDependenciaId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (items) => {
          this.zone.run(() => {
            this.itemsCatalogoDependencia = items.filter((i) => i.estado);
            this.cargandoItemsDependencia = false;
          });
        },
        error: () => {
          this.zone.run(() => (this.cargandoItemsDependencia = false));
          this.toastr.showError('No se pudo cargar los ítems del catálogo dependiente.', 'Error');
        },
      });
  }

  toggleItemDependencia(id: number): void {
    if (this.selectedItemIds.has(id)) {
      this.selectedItemIds.delete(id);
    } else {
      this.selectedItemIds.add(id);
    }
    this.syncItemCatalogoId();
  }

  private syncItemCatalogoId(): void {
    const ids = [...this.selectedItemIds].filter((id) => id !== null && id !== undefined);
    this.formData.item_catalogo_id = ids.length ? ids.join(',') : null;
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
      (a) =>
        a.atributo_formulario_id !== this.atributo?.atributo_formulario_id &&
        Number(a.ctipo_respuesta_id) === 73 &&
        String(a.is_list_empleado) !== 'true',
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
        error: (err) => this.toastr.showError('No se pudo cargar los tipos de dato', 'Error'),
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
        error: (err) => this.toastr.showError('No se pudo cargar los tipos de respuesta', 'Error'),
      });

    this.cataloService
      .getItemsByCatalogoId(26)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: ({ data }) => (this.jornadas = data),
        error: (err) => this.toastr.showError('No se pudo cargar las jornadas', 'Error'),
      });
  }

  guardar(): void {
    if (this.formData.is_dependent && this.selectedItemIds.size === 0) {
      this.toastr.showError(
        'Selecciona al menos un ítem del catálogo dependiente.',
        'Campo requerido',
      );
      return;
    }

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
