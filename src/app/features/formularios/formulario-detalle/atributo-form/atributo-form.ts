import { Component, EventEmitter, Input, NgZone, OnDestroy, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';

import { AtributoFormularioService } from '../../../../services/admin-formularios/atributo-formulario.service';
import { ReportFormularioService } from '../../../../services/admin-formularios/report-formulario.service';
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
  @Output() cerrado = new EventEmitter<void>();
  @Output() guardado = new EventEmitter<void>();

  formData!: AtributoFormularioPayload;
  guardando = false;

  tiposDato: ItemCatalogo[] = [];
  tiposRespuesta: ItemCatalogo[] = [];
  jornadas: ItemCatalogo[] = [];
  catalogos: Catalogo[] = [];

  itemsCatalogo: ItemCatalogo[] = [];
  cargandoItems = false;
  selectedItemIds: string[] = [];

  atributosDependientes: ReportAtributoFormulario[] = [];
  cargandoDependientes = false;

  private readonly destroy$ = new Subject<void>();

  constructor(
    private atributoService: AtributoFormularioService,
    private reportService: ReportFormularioService,
    private cataloService: CatalogoService,
    private toastr: ToastrAlertService,
    private zone: NgZone,
  ) {}

  ngOnInit(): void {
    this.formData = this.atributo ? this.fromAtributo(this.atributo) : this.emptyForm();
    this.cargarCatalogos();

    if (this.formData.is_dependent) {
      this.cargarAtributosDependientes();
    }

    if (this.formData.catalogo_id && !this.formData.is_dependent) {
      this.selectedItemIds = this.formData.item_catalogo_id
        ? this.formData.item_catalogo_id.split(',').filter(Boolean)
        : [];
      this.cargarItemsCatalogo(this.formData.catalogo_id);
    }
  }

  onCatalogoChange(): void {
    this.selectedItemIds = [];
    this.formData.item_catalogo_id = '';
    this.itemsCatalogo = [];
    if (this.formData.catalogo_id && !this.formData.is_dependent) {
      this.cargarItemsCatalogo(this.formData.catalogo_id);
    }
  }

  cargarItemsCatalogo(catalogoId: number): void {
    this.cargandoItems = true;
    this.cataloService.getItemsByCatalogoId(catalogoId).pipe(takeUntil(this.destroy$)).subscribe({
      next: ({ data }) => {
        this.zone.run(() => {
          this.itemsCatalogo = data;
          this.cargandoItems = false;
        });
      },
      error: (err) => {
        this.zone.run(() => (this.cargandoItems = false));
        this.toastr.showError(err?.error?.message ?? 'No se pudo cargar los items del catálogo', 'Error');
      },
    });
  }

  toggleItem(id: string): void {
    const idx = this.selectedItemIds.indexOf(id);
    if (idx >= 0) {
      this.selectedItemIds.splice(idx, 1);
    } else {
      this.selectedItemIds.push(id);
    }
    this.formData.item_catalogo_id = this.selectedItemIds.join(',');
  }

  isItemSelected(id: string): boolean {
    return this.selectedItemIds.includes(id);
  }

  onIsDependentChange(): void {
    this.formData.item_catalogo_id = '';
    this.selectedItemIds = [];
    if (this.formData.is_dependent) {
      this.itemsCatalogo = [];
      this.cargarAtributosDependientes();
    } else {
      this.atributosDependientes = [];
      if (this.formData.catalogo_id) this.cargarItemsCatalogo(this.formData.catalogo_id);
    }
  }

  cargarAtributosDependientes(): void {
    this.cargandoDependientes = true;
    this.reportService.getAtributosDependientes(this.formulario.id).pipe(takeUntil(this.destroy$)).subscribe({
      next: (data) => {
        this.zone.run(() => {
          this.atributosDependientes = data;
          this.cargandoDependientes = false;
        });
      },
      error: (err) => {
        this.zone.run(() => (this.cargandoDependientes = false));
        this.toastr.showError(err?.error?.message ?? 'No se pudo cargar los atributos dependientes', 'Error');
      },
    });
  }

  private cargarCatalogos(): void {
    this.cataloService.getItemsByCatalogoId(13).pipe(takeUntil(this.destroy$)).subscribe({
      next: ({ data }) => {
        this.tiposDato = data;
        this.tiposRespuesta = data;
      },
      error: (err) => this.toastr.showError(err?.error?.message ?? 'No se pudo cargar los tipos', 'Error'),
    });

    this.cataloService.getItemsByCatalogoId(26).pipe(takeUntil(this.destroy$)).subscribe({
      next: ({ data }) => (this.jornadas = data),
      error: (err) => this.toastr.showError(err?.error?.message ?? 'No se pudo cargar las jornadas', 'Error'),
    });

    this.cataloService.getCollectionCatalogo().pipe(takeUntil(this.destroy$)).subscribe({
      next: (data) => (this.catalogos = data),
      error: (err) => this.toastr.showError(err?.error?.message ?? 'No se pudo cargar los catálogos', 'Error'),
    });
  }

  guardar(): void {
    this.guardando = true;
    console.log('[AtributoForm] payload →', JSON.stringify(this.formData, null, 2));
    const op$ = this.atributo
      ? this.atributoService.actualizar(this.atributo.atributo_formulario_id, this.formData)
      : this.atributoService.crear(this.formData);

    op$.pipe(takeUntil(this.destroy$)).subscribe({
      next: () => {
        this.zone.run(() => {
          this.guardando = false;
          const msg = this.atributo ? 'Atributo actualizado correctamente.' : 'Atributo creado correctamente.';
          this.toastr.showSuccess(msg, 'Éxito');
          this.guardado.emit();
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

  private fromAtributo(attr: ReportAtributoFormulario): AtributoFormularioPayload {
    return {
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
  }

  private emptyForm(): AtributoFormularioPayload {
    return {
      formulario_id: this.formulario?.id ?? '',
      nombre: '',
      pregunta: '',
      ayuda: '',
      cttipo_dato_id: 0,
      ctipo_respuesta_id: 0,
      orden: 1,
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
