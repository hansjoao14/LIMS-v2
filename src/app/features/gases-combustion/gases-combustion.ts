import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, forkJoin, startWith, takeUntil } from 'rxjs';

import { PageHeader } from '../../shared/components/page-header/page-header';
import { ReportFormularioService } from '../../services/admin-formularios/report-formulario.service';
import { ReportFormulario } from '../../interfaces/admin-formularios/report-formulario.interface';
import { ToastrAlertService } from '../../services/toastr.service';
import { GasesCombustionService } from '../../services/gases-combustion/gases-combustion.service';
import {
  BloqueMediciones,
  CatalogoPatrones,
  CriterioAceptacion,
  DefinicionGases,
  FilaPatron,
  GasesCombustionMetadata,
  MedicionGas,
  PatronGas,
} from '../../interfaces/gases-combustion/gases-combustion.interface';
import { ControlCalidad } from './control-calidad/control-calidad';
import { MedicionesTabla } from './mediciones/mediciones-tabla';
import { PatronesTabla } from './patrones/patrones-tabla';
import {
  ColumnaPatron,
  ConfigTablaMediciones,
  TABLAS_MEDICIONES,
  TABLA_PATRONES_MEZCLA,
  TABLA_PATRONES_OXIGENO,
} from './model/gases-combustion.model';

/**
 * Registro de Verificación de Gases de Combustión (F-PEE-07-01).
 *
 * Pantalla única: la hoja completa entra en un solo formulario, en el mismo
 * orden del formato impreso — patrones de mezcla, patrones de oxígeno, franja
 * de procedimiento/equipo/año, control de calidad con sus definiciones y las
 * cuatro tablas de mediciones. No es un asistente por pasos ni un CRUD
 * lista + formulario, así que no lleva `steps/` ni `lista/`.
 *
 * El padre es el único que arma el `FormGroup` y el único que habla con el
 * servicio; cada tabla es un hijo que recibe su pedazo del formulario y avisa
 * por `@Output` cuándo agregar o quitar una fila.
 *
 * ⚠️ Los datos todavía salen del mock de `GasesCombustionService` porque el
 * módulo REST no está construido. Los componentes no lo saben: cuando el
 * backend exista, cambia solo el servicio.
 */
@Component({
  selector: 'app-gases-combustion',
  imports: [ReactiveFormsModule, PageHeader, PatronesTabla, ControlCalidad, MedicionesTabla],
  templateUrl: './gases-combustion.html',
  styleUrl: './gases-combustion.css',
})
export class GasesCombustion implements OnInit, OnDestroy {
  private readonly fb = inject(FormBuilder);
  private readonly service = inject(GasesCombustionService);
  private readonly reportFormularioService = inject(ReportFormularioService);
  private readonly toastr = inject(ToastrAlertService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  /**
   * Ítem de catálogo del F-PEE-07-01. Con él, `collectionReportFormulario`
   * devuelve el código, la edición y la fecha de emisión que pinta la cabecera.
   * Es el mismo patrón de `ticket-entrega-muestras` con su TIPO_FORMULARIO_ID.
   */
  readonly TIPO_FORMULARIO_ID = 2137;
  private readonly destroy$ = new Subject<void>();

  // ── Configuración de las tablas (modelo de presentación) ─────────────────
  readonly tablaMezcla = TABLA_PATRONES_MEZCLA;
  readonly tablaOxigeno = TABLA_PATRONES_OXIGENO;
  readonly tablasMediciones = TABLAS_MEDICIONES;

  // ── Datos del servicio ───────────────────────────────────────────────────
  /** Metadata del formato: código, edición y fecha de emisión de la cabecera. */
  formulario: ReportFormulario | null = null;
  /** Franja de la hoja: procedimiento, equipo y año. */
  metadata: GasesCombustionMetadata | null = null;
  catalogo: CatalogoPatrones = { mezcla: [], oxigeno: [] };
  criterios: CriterioAceptacion[] = [];
  definiciones: DefinicionGases[] = [];

  cargando = true;
  guardando = false;

  /** Id del registro en edición. `null` cuando es una hoja nueva. */
  registroId: string | null = null;

  /**
   * Patrones ya registrados arriba, que son las opciones de la columna
   * "No. GAS" de las mediciones. Se recalculan con cada cambio de las dos
   * tablas de patrones en vez de volver a pedirlos al servicio.
   */
  patronesMezclaValor: FilaPatron[] = [];
  patronesOxigenoValor: FilaPatron[] = [];

  readonly form: FormGroup = this.fb.group({
    patronesMezcla: this.fb.array([]),
    patronesOxigeno: this.fb.array([]),
    bloques: this.fb.array([]),
  });

  get patronesMezcla(): FormArray {
    return this.form.get('patronesMezcla') as FormArray;
  }

  get patronesOxigeno(): FormArray {
    return this.form.get('patronesOxigeno') as FormArray;
  }

  get bloques(): FormArray {
    return this.form.get('bloques') as FormArray;
  }

  ngOnInit(): void {
    // `/gases-combustion/:id` edita una hoja existente; `/gases-combustion/nuevo`
    // la crea. El id se lee del snapshot y no de un observable porque cada ruta
    // monta el componente con su propio `loadComponent`: al cambiar de una a
    // otra se recrea.
    this.registroId = this.route.snapshot.paramMap.get('id');

    this.escucharPatrones();
    this.cargarDatos();
  }

  /** Vuelve al listado sin guardar. */
  volverAlListado(): void {
    this.router.navigate(['/gases-combustion']);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  // ── Carga ────────────────────────────────────────────────────────────────

  private cargarDatos(): void {
    this.cargando = true;
    forkJoin({
      formulario: this.reportFormularioService.getFormularioByCTId(this.TIPO_FORMULARIO_ID),
      metadata: this.service.getMetadata(),
      catalogo: this.service.getCatalogoPatrones(),
      criterios: this.service.getCriteriosAceptacion(),
      definiciones: this.service.getDefiniciones(),
      registro: this.service.getRegistro(this.registroId ?? undefined),
    })
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: ({ formulario, metadata, catalogo, criterios, definiciones, registro }) => {
          this.formulario = formulario;
          this.metadata = metadata;
          this.catalogo = catalogo;
          this.criterios = criterios;
          this.definiciones = definiciones;
          this.registroId = registro.id;
          this.precargarFormulario(
            registro.patronesMezcla,
            registro.patronesOxigeno,
            registro.bloques,
          );
          this.cargando = false;
        },
        error: () => {
          this.cargando = false;
          this.toastr.showError(
            'No se pudo cargar el registro de gases de combustión.',
            'Error de carga',
          );
        },
      });
  }

  /** Reconstruye el formulario con lo que devolvió el API. */
  private precargarFormulario(
    mezcla: FilaPatron[],
    oxigeno: FilaPatron[],
    bloques: BloqueMediciones[],
  ): void {
    this.patronesMezcla.clear();
    mezcla.forEach((fila) =>
      this.patronesMezcla.push(this.crearFilaPatron(this.tablaMezcla.columnas, fila)),
    );

    this.patronesOxigeno.clear();
    oxigeno.forEach((fila) =>
      this.patronesOxigeno.push(this.crearFilaPatron(this.tablaOxigeno.columnas, fila)),
    );

    // Un bloque por gas y en el orden de la hoja, exista o no en la respuesta:
    // el índice del FormArray es el mismo que el de `tablasMediciones`.
    this.bloques.clear();
    for (const tabla of this.tablasMediciones) {
      const bloque = bloques.find((item) => item.gas === tabla.gas);
      this.bloques.push(
        this.fb.group({
          gas: [tabla.gas],
          aplica: [bloque?.aplica ?? true],
          filas: this.fb.array((bloque?.filas ?? []).map((fila) => this.crearFilaMedicion(fila))),
        }),
      );
    }
  }

  /** Mantiene al día las opciones de "No. GAS" de las tablas de mediciones. */
  private escucharPatrones(): void {
    this.patronesMezcla.valueChanges
      .pipe(startWith(this.patronesMezcla.value), takeUntil(this.destroy$))
      .subscribe((filas: FilaPatron[]) => (this.patronesMezclaValor = this.soloRegistrados(filas)));

    this.patronesOxigeno.valueChanges
      .pipe(startWith(this.patronesOxigeno.value), takeUntil(this.destroy$))
      .subscribe(
        (filas: FilaPatron[]) => (this.patronesOxigenoValor = this.soloRegistrados(filas)),
      );
  }

  /** Una fila sin patrón elegido todavía no es una opción válida. */
  private soloRegistrados(filas: FilaPatron[]): FilaPatron[] {
    return (filas ?? []).filter((fila) => !!fila.patronId);
  }

  // ── Construcción de filas ────────────────────────────────────────────────

  private crearFilaPatron(columnas: ColumnaPatron[], fila?: FilaPatron): FormGroup {
    const valores = columnas.reduce<Record<string, unknown>>((acc, columna) => {
      acc[columna.gas] = [fila?.valores[columna.gas] ?? null];
      return acc;
    }, {});

    return this.fb.group({
      patronId: [fila?.patronId ?? ''],
      codigoVencimiento: [fila?.codigoVencimiento ?? ''],
      valores: this.fb.group(valores),
    });
  }

  private crearFilaMedicion(fila?: MedicionGas): FormGroup {
    return this.fb.group({
      id: [fila?.id ?? null],
      fecha: [fila?.fecha ?? this.hoy()],
      patronId: [fila?.patronId ?? ''],
      x1: [fila?.x1 ?? null],
      x2: [fila?.x2 ?? null],
      reproducibilidad: [fila?.reproducibilidad ?? null],
      estadoCeldas: [fila?.estadoCeldas ?? ''],
      estadoFiltros: [fila?.estadoFiltros ?? ''],
      observaciones: [fila?.observaciones ?? ''],
      realizadoPor: [fila?.realizadoPor ?? ''],
      revisadoPor: [fila?.revisadoPor ?? ''],
    });
  }

  private hoy(): string {
    return new Date().toISOString().slice(0, 10);
  }

  /**
   * Fecha de emisión del formato como `Date`, que es lo que
   * `<app-page-header>` formatea a dd/MM/yyyy; un string lo imprime tal cual.
   *
   * `vw_formulario_report` la devuelve como milisegundos en un string
   * ("1746057600000"), igual que en ticket-entrega-muestras.
   */
  get fechaEmision(): Date | null {
    const valor = this.formulario?.fecha_emision;
    return valor ? new Date(Number(valor)) : null;
  }

  // ── Acciones de las tablas ───────────────────────────────────────────────

  agregarPatronMezcla(): void {
    this.patronesMezcla.push(this.crearFilaPatron(this.tablaMezcla.columnas));
  }

  agregarPatronOxigeno(): void {
    this.patronesOxigeno.push(this.crearFilaPatron(this.tablaOxigeno.columnas));
  }

  quitarPatronMezcla(indice: number): void {
    this.patronesMezcla.removeAt(indice);
  }

  quitarPatronOxigeno(indice: number): void {
    this.patronesOxigeno.removeAt(indice);
  }

  bloqueDe(indice: number): FormGroup {
    return this.bloques.at(indice) as FormGroup;
  }

  private filasDe(indice: number): FormArray {
    return this.bloqueDe(indice).get('filas') as FormArray;
  }

  agregarMedicion(indice: number): void {
    this.filasDe(indice).push(this.crearFilaMedicion());
  }

  quitarMedicion(indice: number, fila: number): void {
    this.filasDe(indice).removeAt(fila);
  }

  /** Opciones de "No. GAS" según de qué familia de patrones se sirve el gas. */
  patronesDe(config: ConfigTablaMediciones): FilaPatron[] {
    return config.familia === 'mezcla' ? this.patronesMezclaValor : this.patronesOxigenoValor;
  }

  catalogoDe(familia: 'mezcla' | 'oxigeno'): PatronGas[] {
    return familia === 'mezcla' ? this.catalogo.mezcla : this.catalogo.oxigeno;
  }

  // ── Guardar ──────────────────────────────────────────────────────────────

  guardar(): void {
    if (this.guardando) return;

    this.guardando = true;
    const valor = this.form.getRawValue();

    this.service
      .guardar({
        id: this.registroId,
        patronesMezcla: this.soloRegistrados(valor.patronesMezcla),
        patronesOxigeno: this.soloRegistrados(valor.patronesOxigeno),
        // Un gas marcado como no aplicable viaja con su bandera y sin filas:
        // el backend necesita distinguir "no se verificó" de "no se registró".
        bloques: (valor.bloques as BloqueMediciones[]).map((bloque) => ({
          gas: bloque.gas,
          aplica: bloque.aplica,
          filas: bloque.aplica ? bloque.filas : [],
        })),
      })
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (respuesta) => {
          this.registroId = respuesta.id;
          this.guardando = false;
          this.toastr.showSuccess(respuesta.mensaje, 'Registro guardado');
          this.volverAlListado();
        },
        error: () => {
          this.guardando = false;
          this.toastr.showError(
            'No se pudo guardar la verificación. Intenta nuevamente.',
            'Error al guardar',
          );
        },
      });
  }
}
