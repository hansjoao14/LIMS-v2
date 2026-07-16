import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subject, debounceTime, distinctUntilChanged, takeUntil } from 'rxjs';

import { EnsayoService } from '../../../services/ensayo.service';
import { ItemCatalogoOption } from '../../../interfaces/ensayos/ensayo.interface';
import { PaginationMeta } from '../../../interfaces/catalogos/catalogo.interface';

// Select con búsqueda + paginado para ItemCatalogo, siguiendo el mismo
// patrón de panel (buscar → lista → paginar con botones ‹ ›) usado en
// orden-trabajo-in-situ-formulario.html y plan-muestreo.html.
@Component({
  selector: 'app-item-catalogo-select',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './item-catalogo-select.html',
})
export class ItemCatalogoSelect implements OnInit, OnChanges, OnDestroy {
  @Input() value: number | null = null;
  @Input() disabled = false;
  @Input() placeholder = 'Buscar...';
  /** Si se indica, solo trae los hijos (item_catalogo) de este catalogo_id. */
  @Input() catalogoId: number | null = null;
  @Output() valueChange = new EventEmitter<number | null>();

  readonly PAGE_SIZE = 8;

  panelAbierto = false;
  loading = false;
  busqueda = '';
  opciones: ItemCatalogoOption[] = [];
  meta: PaginationMeta | null = null;
  currentPage = 1;
  selectedLabel = '';

  private readonly destroy$ = new Subject<void>();
  private readonly busqueda$ = new Subject<string>();

  constructor(private ensayoService: EnsayoService) {}

  ngOnInit(): void {
    this.busqueda$
      .pipe(debounceTime(300), distinctUntilChanged(), takeUntil(this.destroy$))
      .subscribe(() => this.cargarPagina(1));
    this.resolverEtiquetaSeleccionada();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['value'] && !changes['value'].firstChange) {
      this.resolverEtiquetaSeleccionada();
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  abrirPanel(): void {
    if (this.disabled) return;
    this.panelAbierto = true;
    if (this.opciones.length === 0) this.cargarPagina(1);
  }

  cerrarPanel(): void {
    this.panelAbierto = false;
  }

  onBusquedaChange(valor: string): void {
    this.busqueda = valor;
    this.busqueda$.next(valor);
  }

  cargarPagina(page: number): void {
    this.loading = true;
    this.currentPage = page;
    this.ensayoService
      .getItemCatalogoOptionsPaginado(page, this.PAGE_SIZE, this.busqueda.trim(), this.catalogoId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: ({ data, meta }) => {
          this.opciones = data;
          this.meta = meta;
          this.loading = false;
        },
        error: () => {
          this.loading = false;
        },
      });
  }

  seleccionar(item: ItemCatalogoOption): void {
    this.value = item.id;
    this.selectedLabel = item.nombre;
    this.valueChange.emit(item.id);
    this.cerrarPanel();
  }

  limpiar(event: MouseEvent): void {
    event.stopPropagation();
    this.value = null;
    this.selectedLabel = '';
    this.valueChange.emit(null);
  }

  private resolverEtiquetaSeleccionada(): void {
    if (!this.value) {
      this.selectedLabel = '';
      return;
    }
    const enOpciones = this.opciones.find((o) => o.id === this.value);
    if (enOpciones) {
      this.selectedLabel = enOpciones.nombre;
      return;
    }
    this.ensayoService
      .getItemCatalogoById(this.value)
      .pipe(takeUntil(this.destroy$))
      .subscribe((item) => {
        this.selectedLabel = item?.nombre ?? '';
      });
  }
}
