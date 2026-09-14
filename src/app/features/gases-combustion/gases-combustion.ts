import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject, forkJoin, of, startWith, switchMap, takeUntil } from 'rxjs';

import { PageHeader } from '../../shared/components/page-header/page-header';
import { ReportFormularioService } from '../../services/admin-formularios/report-formulario.service';
import { ReportFormulario } from '../../interfaces/admin-formularios/report-formulario.interface';
import { ToastrAlertService } from '../../services/toastr.service';
import { AlertService } from '../../services/alert.service';
import { AuthService } from '../auth/service/auth-service';
import {
  ESTADO_GASES,
  GasesCombustionService,
  TIPO_FORMULARIO_GASES,
} from '../../services/gases-combustion/gases-combustion.service';
import {
  BloqueMediciones,
  CatalogoPatrones,
  CatalogosGases,
  CriterioAceptacion,
  FamiliaPatron,
  FilaPatron,
  GasesCombustionDetalleResponse,
  InspeccionSonda,
  MedicionGas,
  PatronGas,
  RegistroGasesCombustion,
} from '../../interfaces/gases-combustion/gases-combustion.interface';
import { ControlCalidad } from './control-calidad/control-calidad';
import { InspeccionSondaTabla } from './inspeccion-sonda/inspeccion-sonda';
import { MedicionesTabla } from './mediciones/mediciones-tabla';
import { PatronesTabla } from './patrones/patrones-tabla';
import {
  ColumnaPatron,
  CONDICIONES_SONDA,
  ConfigTablaMediciones,
  ERRORES_LECTURA,
  lecturaValida,
  parDeLecturas,
  TABLAS_MEDICIONES,
  TABLA_PATRONES_MEZCLA,
  TABLA_PATRONES_OXIGENO,
} from './model/gases-combustion.model';

/**
 * Un problema de la hoja, para el panel de avisos.
 *
 * `bloqueaGuardar` distingue lo que el backend rechaza AL GUARDAR de lo que
 * solo impide numerar. No son lo mismo y confundirlos es molesto: el analista
 * carga la hoja de a poco y tiene que poder guardar a medias.
 */
interface ProblemaHoja {
  texto: string;
  bloqueaGuardar: boolean;
}

/**
 * Registro de Verificación de Gases de Combustión (F-PEE-07-01).
 *
 * Pantalla única: la hoja completa entra en un solo formulario, en el mismo
 * orden del formato impreso — patrones de mezcla, patrones de oxígeno, franja
 * de procedimiento/equipo/año, control de calidad con sus definiciones, las
 * cuatro tablas de mediciones y la inspección trimestral de la sonda. No es un
 * asistente por pasos ni un CRUD lista + formulario, así que no lleva `steps/`.
 *
 * El padre es el único que arma el `FormGroup` y el único que habla con el
 * servicio; cada tabla es un hijo que recibe su pedazo del formulario y avisa
 * por `@Output` cuándo agregar o quitar una fila.
 *
 * **Guardar son dos llamadas y no una**, porque así está partido el backend: al
 * crear va todo junto a `/create-detalle`; al editar, la cabecera por `PUT` y
 * el detalle por `/update-many`. Numerar es aparte: es lo que vuelve oficial a
 * la hoja y después ya no se edita.
 */
@Component({
  selector: 'app-gases-combustion',
  imports: [
    ReactiveFormsModule,
    PageHeader,
    PatronesTabla,
    ControlCalidad,
    MedicionesTabla,
    InspeccionSondaTabla,
  ],
  templateUrl: './gases-combustion.html',
  styleUrl: './gases-combustion.css',
})
export class GasesCombustion implements OnInit, OnDestroy {
  private readonly fb = inject(FormBuilder);
  private readonly service = inject(GasesCombustionService);
  private readonly reportFormularioService = inject(ReportFormularioService);
  private readonly toastr = inject(ToastrAlertService);
  private readonly alertService = inject(AlertService);
  private readonly authService = inject(AuthService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  readonly TIPO_FORMULARIO_ID = TIPO_FORMULARIO_GASES;
  private readonly destroy$ = new Subject<void>();

  // ── Configuración de las tablas (modelo de presentación) ─────────────────
  readonly tablaMezcla = TABLA_PATRONES_MEZCLA;
  readonly tablaOxigeno = TABLA_PATRONES_OXIGENO;
  readonly tablasMediciones = TABLAS_MEDICIONES;

  // ── Datos del servicio ───────────────────────────────────────────────────
  /** Metadata del formato: código, edición y fecha de emisión de la cabecera. */
  formulario: ReportFormulario | null = null;
  /** Catálogos del módulo: franja del formato, definiciones, trimestres. */
  catalogos: CatalogosGases | null = null;
  catalogo: CatalogoPatrones = { mezcla: [], oxigeno: [] };
  criterios: CriterioAceptacion[] = [];

  cargando = true;
  guardando = false;

  /** Id del registro en edición. `null` cuando es una hoja nueva. */
  registroId: string | null = null;
  numSecuencial: string | null = null;
  ctestadoId: number = ESTADO_GASES.PENDIENTE;

  /**
   * Patrones ya registrados arriba, que son las opciones de la columna
   * "No. GAS" de las mediciones. Se recalculan con cada cambio de las dos
   * tablas de patrones en vez de volver a pedirlos al servicio.
   */
  patronesMezclaValor: FilaPatron[] = [];
  patronesOxigenoValor: FilaPatron[] = [];

  readonly form: FormGroup = this.fb.group({
    anio: [new Date().getFullYear(), [Validators.required]],
    fechaVerificacion: [this.hoy(), [Validators.required]],
    observaciones: [''],
    // Quién realizó y quién revisó: una vez por hoja. En la base son columna de
    // cada fila hija y el servicio copia el mismo par en todas al guardar.
    realizadoPorId: [null as string | null],
    realizadoPorNombre: [''],
    revisadoPorId: [null as string | null],
    revisadoPorNombre: [''],
    patronesMezcla: this.fb.array([]),
    patronesOxigeno: this.fb.array([]),
    bloques: this.fb.array([]),
    inspecciones: this.fb.array([]),
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

  get inspecciones(): FormArray {
    return this.form.get('inspecciones') as FormArray;
  }

  /**
   * Una hoja numerada ya es un documento oficial: se muestra pero no se edita.
   * El backend lo revalida y corta con `GASES_COMBUSTION_NO_EDITABLE`.
   */
  get soloLectura(): boolean {
    return this.registroId !== null && this.ctestadoId !== ESTADO_GASES.PENDIENTE;
  }

  get totalMediciones(): number {
    return this.bloques.controls.reduce(
      (total, bloque) => total + ((bloque.get('filas') as FormArray)?.length ?? 0),
      0,
    );
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

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /** Vuelve al listado sin guardar. */
  volverAlListado(): void {
    this.router.navigate(['/gases-combustion']);
  }

  // ── Carga ────────────────────────────────────────────────────────────────

  private cargarDatos(): void {
    this.cargando = true;
    forkJoin({
      formulario: this.reportFormularioService.getFormularioByCTId(this.TIPO_FORMULARIO_ID),
      catalogos: this.service.getCatalogos(),
      catalogo: this.service.getCatalogoPatrones(),
      criterios: this.service.getCriteriosAceptacion(),
      registro: this.service.getRegistro(this.registroId ?? undefined),
    })
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: ({ formulario, catalogos, catalogo, criterios, registro }) => {
          this.formulario = formulario;
          this.catalogos = catalogos;
          this.catalogo = catalogo;
          this.criterios = criterios;
          this.precargarFormulario(registro);
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
  private precargarFormulario(registro: RegistroGasesCombustion): void {
    this.registroId = registro.id;
    this.numSecuencial = registro.numSecuencial;
    this.ctestadoId = registro.ctestadoId;

    const usuario = this.authService.currentUser();

    this.form.patchValue({
      anio: registro.anio,
      fechaVerificacion: registro.fechaVerificacion,
      observaciones: registro.observaciones,
      // En una hoja nueva quien registra es quien tiene la sesión abierta.
      // "Revisado por" queda vacío: no hay endpoint que liste usuarios para
      // elegirlo, la misma deuda de plan-muestreo y ticket-entrega.
      realizadoPorId: registro.realizadoPorId ?? usuario.id,
      realizadoPorNombre: registro.realizadoPorNombre || usuario.nombre,
      revisadoPorId: registro.revisadoPorId,
      revisadoPorNombre: registro.revisadoPorNombre,
    });

    this.patronesMezcla.clear();
    registro.patronesMezcla.forEach((fila) =>
      this.patronesMezcla.push(this.crearFilaPatron(this.tablaMezcla.columnas, fila)),
    );

    this.patronesOxigeno.clear();
    registro.patronesOxigeno.forEach((fila) =>
      this.patronesOxigeno.push(this.crearFilaPatron(this.tablaOxigeno.columnas, fila)),
    );

    // Un bloque por gas y en el orden de la hoja, exista o no en la respuesta:
    // el índice del FormArray es el mismo que el de `tablasMediciones`.
    this.bloques.clear();
    for (const tabla of this.tablasMediciones) {
      const bloque = registro.bloques.find((item) => item.gas === tabla.gas);
      this.bloques.push(
        this.fb.group({
          gas: [tabla.gas],
          filas: this.fb.array((bloque?.filas ?? []).map((fila) => this.crearFilaMedicion(fila))),
        }),
      );
    }

    this.inspecciones.clear();
    registro.inspecciones.forEach((fila) => this.inspecciones.push(this.crearFilaInspeccion(fila)));

    if (this.soloLectura) this.form.disable({ emitEvent: false });
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

  /** Una fila sin cilindro elegido todavía no es una opción válida. */
  private soloRegistrados(filas: FilaPatron[]): FilaPatron[] {
    return (filas ?? []).filter((fila) => fila.cilindroId !== null);
  }

  // ── Construcción de filas ────────────────────────────────────────────────

  private crearFilaPatron(columnas: ColumnaPatron[], fila?: FilaPatron): FormGroup {
    const valores = columnas.reduce<Record<string, unknown>>((acc, columna) => {
      acc[columna.gas] = [fila?.valores[columna.gas] ?? null];
      return acc;
    }, {});

    return this.fb.group({
      id: [fila?.id ?? null],
      cilindroId: [fila?.cilindroId ?? null],
      etiqueta: [fila?.etiqueta ?? ''],
      codigo: [fila?.codigo ?? ''],
      vencimiento: [fila?.vencimiento ?? ''],
      valores: this.fb.group(valores),
    });
  }

  /**
   * Las lecturas se validan en el control, no solo en el panel del pie: así el
   * campo se pinta en rojo apenas se escribe algo imposible. `parDeLecturas` va
   * en el grupo porque necesita ver X1 y X2 a la vez.
   */
  private crearFilaMedicion(fila?: MedicionGas): FormGroup {
    return this.fb.group(
      {
        id: [fila?.id ?? null],
        fecha: [fila?.fecha ?? this.hoy()],
        cilindroId: [fila?.cilindroId ?? null],
        x1: [fila?.x1 ?? null, [lecturaValida]],
        x2: [fila?.x2 ?? null, [lecturaValida]],
        cumple: [fila?.cumple ?? null],
      },
      { validators: [parDeLecturas] },
    );
  }

  private crearFilaInspeccion(fila?: InspeccionSonda): FormGroup {
    return this.fb.group({
      id: [fila?.id ?? null],
      cttrimestreId: [fila?.cttrimestreId ?? null],
      fechaInicio: [fila?.fechaInicio ?? this.hoy()],
      fechaFin: [fila?.fechaFin ?? null],
      medidaFluctuaciones: [fila?.medidaFluctuaciones ?? false],
      termocuplaContacto: [fila?.termocuplaContacto ?? false],
      conexionesFugas: [fila?.conexionesFugas ?? false],
      deformaciones: [fila?.deformaciones ?? false],
      marcasUso: [fila?.marcasUso ?? false],
      ctdiagnosticoId: [fila?.ctdiagnosticoId ?? null],
      observaciones: [fila?.observaciones ?? ''],
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
    this.quitarPatron(this.patronesMezcla, indice);
  }

  quitarPatronOxigeno(indice: number): void {
    this.quitarPatron(this.patronesOxigeno, indice);
  }

  /**
   * Quitar un patrón que alguna medición usa dejaría esa fila apuntando a un
   * cilindro que ya no está en la hoja, y el backend la rechazaría al guardar
   * con `GASES_MEDICION_CILINDRO_SIN_PATRON`. Se avisa acá, que es donde el
   * analista puede arreglarlo.
   */
  private quitarPatron(tabla: FormArray, indice: number): void {
    const cilindroId = tabla.at(indice)?.get('cilindroId')?.value as number | null;

    if (cilindroId !== null && this.medicionesQueUsan(cilindroId) > 0) {
      this.toastr.showWarning(
        'Hay mediciones registradas contra este patrón. Cambiá su cilindro en la tabla de mediciones antes de quitarlo.',
        'El patrón está en uso',
      );
      return;
    }

    tabla.removeAt(indice);
  }

  /** Cuántas mediciones de la hoja se midieron contra ese cilindro. */
  private medicionesQueUsan(cilindroId: number): number {
    return this.bloques.controls.reduce((total, bloque) => {
      const filas = (bloque.get('filas') as FormArray).controls;
      return total + filas.filter((fila) => fila.get('cilindroId')?.value === cilindroId).length;
    }, 0);
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

  agregarInspeccion(): void {
    this.inspecciones.push(this.crearFilaInspeccion());
  }

  quitarInspeccion(indice: number): void {
    this.inspecciones.removeAt(indice);
  }

  /** Opciones de "No. GAS" según de qué familia de patrones se sirve el gas. */
  patronesDe(config: ConfigTablaMediciones): FilaPatron[] {
    return config.familia === 'mezcla' ? this.patronesMezclaValor : this.patronesOxigenoValor;
  }

  catalogoDe(familia: FamiliaPatron): PatronGas[] {
    return familia === 'mezcla' ? this.catalogo.mezcla : this.catalogo.oxigeno;
  }

  // ── Validaciones visibles ────────────────────────────────────────────────

  /**
   * Todo lo que le falta a la hoja, en una sola lista.
   *
   * Son las mismas reglas que aplica el backend —`assertFinalizable` y las
   * validaciones de `create-detalle`—, adelantadas acá para que el analista las
   * vea mientras carga y no recién al recibir un 400. El servidor las vuelve a
   * revisar: esto es comodidad, no seguridad.
   */
  get problemas(): ProblemaHoja[] {
    if (this.cargando) return [];

    const lista: ProblemaHoja[] = [];

    if (this.patronesMezcla.length === 0 && this.patronesOxigeno.length === 0) {
      lista.push({
        texto: 'Registrá al menos un cilindro patrón.',
        bloqueaGuardar: true,
      });
    }
    if (!this.form.get('fechaVerificacion')?.value) {
      lista.push({ texto: 'Falta la fecha de verificación.', bloqueaGuardar: true });
    }
    if (!this.form.get('anio')?.value) {
      lista.push({ texto: 'Falta el año de la hoja.', bloqueaGuardar: true });
    }

    lista.push(...this.problemasDeMediciones());
    lista.push(...this.problemasDeInspecciones());

    if (this.registroId && this.totalMediciones === 0) {
      lista.push({
        texto: 'Sin mediciones cargadas la hoja no se puede numerar.',
        bloqueaGuardar: false,
      });
    }

    return lista;
  }

  get hayBloqueosParaGuardar(): boolean {
    return this.problemas.some((problema) => problema.bloqueaGuardar);
  }

  private problemasDeMediciones(): ProblemaHoja[] {
    const lista: ProblemaHoja[] = [];

    this.tablasMediciones.forEach((tabla, indice) => {
      if (this.bloques.length <= indice) return;

      const filas = (this.bloqueDe(indice).get('filas') as FormArray).controls;
      filas.forEach((fila, numero) => {
        const donde = `${tabla.titulo}, fila ${numero + 1}`;
        const x1 = fila.get('x1');
        const x2 = fila.get('x2');
        const cilindroId = fila.get('cilindroId')?.value as number | null;

        for (const [control, nombre] of [
          [x1, 'X1'],
          [x2, 'X2'],
        ] as const) {
          if (control?.hasError(ERRORES_LECTURA.negativa)) {
            lista.push({
              texto: `${donde}: ${nombre} no puede ser negativo.`,
              bloqueaGuardar: true,
            });
          }
          if (control?.hasError(ERRORES_LECTURA.noNumerica)) {
            lista.push({
              texto: `${donde}: ${nombre} tiene que ser un número.`,
              bloqueaGuardar: true,
            });
          }
        }

        // El CHECK de la base lo rechaza: la segunda lectura no puede ir sola.
        if (fila.hasError('x2SinX1')) {
          lista.push({ texto: `${donde}: hay X2 sin X1.`, bloqueaGuardar: true });
          return;
        }

        // Una fila sin primera lectura no es una medición: no tiene Xmed, ni %R,
        // ni veredicto. Guardarla así se puede; numerar la hoja no.
        const vacio = (valor: unknown) => valor === null || valor === undefined || valor === '';
        if (vacio(x1?.value)) {
          lista.push({ texto: `${donde}: falta X1.`, bloqueaGuardar: false });
          return;
        }

        if (cilindroId === null) {
          lista.push({
            texto: `${donde}: falta elegir el patrón en "No. Gas".`,
            bloqueaGuardar: false,
          });
          return;
        }

        // El patrón tiene que llevar el gas que se le midió, o no hay %R.
        const patron = this.patronesDe(tabla).find((item) => item.cilindroId === cilindroId);
        if (patron && (patron.valores[tabla.gas] ?? null) === null) {
          lista.push({
            texto: `${donde}: el patrón elegido no lleva ${tabla.gas}.`,
            bloqueaGuardar: false,
          });
        }
      });
    });

    return lista;
  }

  /**
   * Una inspección con novedad y sin observaciones la rechaza el backend **al
   * guardar**, no al numerar: por eso bloquea.
   */
  private problemasDeInspecciones(): ProblemaHoja[] {
    const aprobada = (id: number | null) =>
      this.catalogos?.diagnosticos
        .find((item) => item.id === id)
        ?.nombre.trim()
        .toUpperCase() === 'APROBADA';

    return this.inspecciones.controls.reduce<ProblemaHoja[]>((lista, fila, indice) => {
      const diagnosticoId = fila.get('ctdiagnosticoId')?.value as number | null;
      const conNovedad =
        CONDICIONES_SONDA.some((condicion) => fila.get(condicion.control)?.value === true) ||
        (diagnosticoId !== null && diagnosticoId !== undefined && !aprobada(diagnosticoId));

      const observaciones = (fila.get('observaciones')?.value as string) ?? '';
      if (conNovedad && !observaciones.trim()) {
        lista.push({
          texto: `Inspección ${indice + 1}: con novedades las observaciones son obligatorias.`,
          bloqueaGuardar: true,
        });
      }
      return lista;
    }, []);
  }

  // ── Guardar ──────────────────────────────────────────────────────────────

  guardar(): void {
    if (this.guardando || this.soloLectura) return;

    if (this.hayBloqueosParaGuardar) {
      this.toastr.showWarning(
        'Revisá los avisos del pie de la hoja antes de guardar.',
        'Faltan datos',
      );
      return;
    }

    const registro = this.armarRegistro();
    this.guardando = true;
    const usuario = this.authService.currentUser();

    const guardado$: Observable<GasesCombustionDetalleResponse> = this.registroId
      ? this.service
          .actualizarCabecera(this.registroId, registro)
          .pipe(switchMap(() => this.service.actualizarDetalle(registro)))
      : this.service.crear(registro, usuario.id);

    guardado$.pipe(takeUntil(this.destroy$)).subscribe({
      next: (respuesta) => {
        this.guardando = false;
        this.registroId = respuesta?.gasesCombustion?.id ?? this.registroId;
        this.toastr.showSuccess(
          'Verificación de gases de combustión guardada.',
          'Registro guardado',
        );
        this.volverAlListado();
      },
      error: (error: unknown) => {
        this.guardando = false;
        this.mostrarError(error, 'No se pudo guardar la verificación.');
      },
    });
  }

  /**
   * Arma el registro con lo que hay en el formulario. `getRawValue` y no
   * `value`: una hoja en solo lectura tiene los controles deshabilitados y
   * `value` los omitiría.
   */
  private armarRegistro(): RegistroGasesCombustion {
    const valor = this.form.getRawValue();

    return {
      id: this.registroId,
      anio: Number(valor.anio),
      fechaVerificacion: valor.fechaVerificacion,
      observaciones: valor.observaciones ?? '',
      ctestadoId: this.ctestadoId,
      numSecuencial: this.numSecuencial,
      realizadoPorId: valor.realizadoPorId,
      realizadoPorNombre: valor.realizadoPorNombre ?? '',
      revisadoPorId: valor.revisadoPorId,
      revisadoPorNombre: valor.revisadoPorNombre ?? '',
      patronesMezcla: this.soloRegistrados(valor.patronesMezcla),
      patronesOxigeno: this.soloRegistrados(valor.patronesOxigeno),
      bloques: (valor.bloques as BloqueMediciones[]).map((bloque) => ({
        gas: bloque.gas,
        filas: bloque.filas ?? [],
      })),
      inspecciones: (valor.inspecciones as InspeccionSonda[]).filter(
        (fila) => fila.cttrimestreId !== null,
      ),
    };
  }

  /**
   * Los errores de regla de negocio del backend traen un `code`: se traduce a
   * un mensaje que dice qué corregir, en vez de mostrar el texto crudo.
   *
   * @see faq-monorepo/docs/gases-combustion.md §10, tabla de códigos
   */
  private mostrarError(error: unknown, porDefecto: string): void {
    const codigo = (error as { error?: { code?: string; message?: string } })?.error?.code;
    const mensaje = (error as { error?: { message?: string } })?.error?.message;

    const conocidos: Record<string, string> = {
      GASES_COMBUSTION_NO_EDITABLE: 'La hoja ya fue numerada y no admite cambios.',
      GASES_COMBUSTION_DADO_DE_BAJA: 'La hoja está dada de baja.',
      GASES_COMBUSTION_SIN_MEDICIONES: 'Registra al menos una medición antes de numerar.',
      GASES_MEDICION_PATRON_SIN_GAS:
        'Hay una medición contra un patrón que no lleva ese gas: sin la concentración certificada no hay porcentaje de recuperación.',
      GASES_MEDICION_PAR_INCOMPLETO:
        'Hay un par de lecturas a medias: van XR1 y XR2, o ninguna de las dos.',
      GASES_MEDICION_SIN_VEREDICTO:
        'Hay una medición sin CUMPLE: su promedio no cae en ningún rango de criterio vigente.',
      GASES_MEDICION_CILINDRO_SIN_PATRON:
        'Hay una medición contra un cilindro que no está registrado como patrón de la hoja.',
      GASES_INSPECCION_SIN_OBSERVACIONES:
        'Una inspección con novedades o con diagnóstico distinto de APROBADA debe registrar observaciones.',
      GASES_CRITERIO_AMBIGUO:
        'Los criterios de aceptación están mal parametrizados: hay rangos superpuestos.',
    };

    this.alertService.error((codigo && conocidos[codigo]) || mensaje || porDefecto);
  }
}
