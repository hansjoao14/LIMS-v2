import {
  Component,
  Input,
  Output,
  EventEmitter,
  NgZone,
  OnInit,
  OnDestroy,
  inject,
  computed,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Subject, forkJoin, of, takeUntil } from 'rxjs';

import { AuthService } from '../../auth/service/auth-service';
import { ToastrAlertService } from '../../../services/toastr.service';
import {
  CalibracionEquiposService,
  ENTIDAD_CALIBRACION,
  TIPO_FORMULARIO_CALIBRACION,
} from '../../../services/calibracion-equipos/calibracion-equipos.service';
import {
  CalibracionEquipo,
  CrearCalibracionPayload,
  RespuestaCalibracion,
} from '../../../interfaces/calibracion-equipos/calibracion-equipos.interface';
import { LoadingComponent } from '../../../shared/components/loading/loading';
import {
  DynamicField,
  DynamicGroup,
  aplicarDependencias,
  camposDe,
  construirGrupos,
  generarControles,
  toValorDinamico,
} from '../../../shared/dynamic-form';
import {
  CALIBRACION_FORM_CONFIG,
  CAMPO_ERROR_PC,
  CAMPO_ERROR_PL,
  CAMPO_COD_PATRON,
  CAMPO_COD_SONOMETRO,
  CAMPO_COD_CALIBRADOR,
  CAMPO_FECHA_SONOMETRO,
  CAMPO_LECTURA_PC,
  CAMPO_LECTURA_PL,
  CAMPO_OBSERVACIONES,
  CAMPO_COD_ESTACION,
  CAMPO_TOLERANCIA,
  DIAS_VIGENCIA_CALIBRACION,
  FECHAS_ESTACION,
  FECHA_POR_EQUIPO,
  GRUPOS_FECHAS,
  SECCION_CODIGOS,
  SECCION_FECHAS,
  SECCION_ASEGURAMIENTO,
  SECCION_CHECKLIST,
  SECCION_CALIBRACION,
  SECCION_FALLBACK_POR_CAMPO,
} from '../model/calibracion-equipos-form.model';

/** Estado de vigencia de una calibración, para el aviso junto a la fecha. */
export interface VigenciaCalibracion {
  vencida: boolean;
  dias: number;
  texto: string;
}

@Component({
  selector: 'app-calibracion-equipos-formulario',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    LoadingComponent,
  ],
  templateUrl: './calibracion-equipos-formulario.html',
})
export class CalibracionEquiposFormulario implements OnInit, OnDestroy {
  @Input() editingRecord: CalibracionEquipo | null = null;
  @Output() guardado = new EventEmitter<void>();
  @Output() cancelado = new EventEmitter<void>();

  private authService = inject(AuthService);
  private toastrAlert = inject(ToastrAlertService);
  private calibracionService = inject(CalibracionEquiposService);
  private fb = inject(FormBuilder);
  private zone = inject(NgZone);
  private readonly destroy$ = new Subject<void>();

  form: FormGroup = this.fb.group({});
  grupos: DynamicGroup[] = [];

  /** Secciones realmente presentes en el schema, ya normalizadas y ordenadas. */
  seccionesFormulario: number[] = [];

  /**
   * Metadata original administrada en BD, indexada por nombre del campo.
   * Se conserva fuera de DynamicField porque `construirGrupos()` transforma
   * el schema y no debemos depender de que `source.seccion` permanezca intacto.
   */
  private readonly seccionPorCampo = new Map<string, number>();
  private readonly ordenPorCampo = new Map<string, number>();

  loading = true;
  saving = false;

  readonly nombreAnalista = computed(() => this.authService.userProfile()?.name ?? '—');

  /** Contexto de la verificación: no sale del formulario dinámico. */
  fechaVerificacion: string = new Date().toISOString().split('T')[0];

  /**
   * Nivel de referencia de cada patrón, tal como está cargado en catálogo. No
   * se quema el 114: si mañana cambia el valor definido, cambia acá solo.
   */
  private referencias: Record<string, number | null> = {
    [CAMPO_ERROR_PC]: null,
    [CAMPO_ERROR_PL]: null,
  };

  /** Fecha de calibración que trae cada ítem de catálogo, por id de ítem. */
  private fechasPorItem = new Map<number, string>();
  /** Las cuatro fechas de la estación viven en un JSON dentro del mismo ítem. */
  private fechasEstacionPorItem = new Map<number, Record<string, string>>();

  get modoEdicion(): boolean {
    return !!this.editingRecord;
  }

  ngOnInit(): void {
    if (this.editingRecord?.fecha_verificacion) {
      // Viaje de vuelta: la vista la devuelve ISO y el input la quiere yyyy-MM-dd.
      this.fechaVerificacion = this.editingRecord.fecha_verificacion.slice(0, 10);
    }

    const { id } = this.authService.currentUser();

    forkJoin({
      formulario: this.calibracionService.getFormulario(id),
      referencias: this.calibracionService.getValoresReferencia(),
      // Al editar, las respuestas guardadas se piden junto con el schema para
      // no pintar el formulario vacío y repoblarlo después.
      respuestas: this.editingRecord
        ? this.calibracionService.getRespuestas(this.editingRecord.id)
        : of([] as RespuestaCalibracion[]),
    })
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: ({ formulario, referencias, respuestas }) => {
          this.referencias[CAMPO_ERROR_PC] = referencias.pc;
          this.referencias[CAMPO_ERROR_PL] = referencias.pl;

          const preguntas = (formulario.preguntas ?? []).map((pregunta) => {
            const raw = pregunta.seccion;
            const seccionBD = Number(raw);

            const tieneSeccionBD =
              raw !== null &&
              raw !== undefined &&
              String(raw).trim() !== '' &&
              Number.isFinite(seccionBD) &&
              seccionBD > 0;

            return {
              ...pregunta,
              // La sección configurada en BD siempre gana. El mapa se usa
              // únicamente como fallback para atributos todavía sin sección.
              seccion: tieneSeccionBD
                ? seccionBD
                : (SECCION_FALLBACK_POR_CAMPO[pregunta.nombre] ?? SECCION_CALIBRACION),
            };
          });

          // Conserva la sección y el orden exactamente como quedaron
          // normalizados desde BD (o fallback si BD no trae sección).
          this.seccionPorCampo.clear();
          this.ordenPorCampo.clear();

          for (const pregunta of preguntas) {
            this.seccionPorCampo.set(pregunta.nombre, Number(pregunta.seccion));
            this.ordenPorCampo.set(pregunta.nombre, Number(pregunta.orden ?? 0));
          }

          this.seccionesFormulario = [
            ...new Set(
              preguntas
                .map((pregunta) => Number(pregunta.seccion))
                .filter((seccion) => Number.isFinite(seccion) && seccion > 0),
            ),
          ].sort((a, b) => a - b);

          /**
 * IMPORTANTE:
 * El motor dynamic-form de Calibradores históricamente trabaja como un
 * formulario de una sola pantalla/sección.
 *
 * Las secciones administradas en BD (1, 2, 3, 4, ...)
 * determinan únicamente la ubicación visual de los campos.
 *
 * Para construir TODOS los controles sin perder atributos de las
 * secciones 3, 4 o futuras, se entrega al motor una copia con sección 1.
 */
          const preguntasMotor = preguntas.map((pregunta) => ({
            ...pregunta,
            seccion: SECCION_CALIBRACION,
          }));

          this.grupos = construirGrupos(
            preguntasMotor,
            SECCION_CALIBRACION,
            CALIBRACION_FORM_CONFIG,
          );

          this.grupos = this.seccionesFormulario.flatMap((seccion) =>
            construirGrupos(preguntas, seccion, CALIBRACION_FORM_CONFIG),
          );
          this.marcarDerivados();
          generarControles(this.form, this.grupos);
          aplicarDependencias(this.form, this.grupos, this.destroy$);
          this.cargarFechasDeCatalogo();
          this.escucharSelecciones();
          this.escucharLecturas();
          this.escucharTolerancia();
          this.precargarRespuestas(respuestas);
          this.loading = false;
        },
        error: () => {
          this.loading = false;
          this.toastrAlert.showError(
            'No se pudo cargar el formulario de verificación.',
            'Error',
          );
        },
      });
  }

  /**
   * Repuebla el formulario con lo que se guardó. Los valores viajan con
   * `emitEvent`: así se recalculan los errores y las fechas de catálogo, que
   * son campos derivados y no se toman del registro.
   */
  private precargarRespuestas(respuestas: RespuestaCalibracion[]): void {
    if (!respuestas.length) return;

    const porNombre = new Map(respuestas.map((r) => [r.atributo_formulario_nombre, r]));

    const patch: Record<string, unknown> = {};
    for (const campo of camposDe(this.grupos)) {
      const respuesta = porNombre.get(campo.key);
      if (!respuesta) continue;

      if (campo.controlType === 'select') {
        patch[campo.key] = respuesta.valor_catalogo ?? '';
      } else if (campo.controlType === 'toggle') {
        patch[campo.key] = !!respuesta.valor_booleano;
      } else {
        patch[campo.key] = respuesta.valor_texto ?? respuesta.valor_fecha ?? '';
      }
    }
    this.form.patchValue(patch);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  // ── Campos que el sistema completa ───────────────────────────────────────

  /** Fechas y errores salen del catálogo o de un cálculo: no se teclean. */
  private marcarDerivados(): void {
    const derivados = new Set([
      ...Object.values(FECHA_POR_EQUIPO),
      ...Object.keys(FECHAS_ESTACION),
      CAMPO_ERROR_PC,
      CAMPO_ERROR_PL,
      // Sale de la tabla de factores de corrección, no del teclado.
      CAMPO_TOLERANCIA,
    ]);

    for (const grupo of this.grupos) {
      for (const campo of grupo.campos) {
        if (derivados.has(campo.key)) campo.readonly = true;
      }
    }
  }

  /**
   * Cada ítem de los catálogos de equipos guarda en `valor` la fecha de su
   * última calibración; el de la estación guarda un JSON con las cuatro.
   *
   * El schema del formulario solo devuelve `{ nombre, id }` de cada opción, así
   * que el catálogo se relee por su `catalogo_id` para obtener esos valores.
   */
  private cargarFechasDeCatalogo(): void {
    const selectores = [...Object.keys(FECHA_POR_EQUIPO), CAMPO_COD_ESTACION];

    for (const key of selectores) {
      const catalogoId = this.campoPorKey(key)?.source?.catalogo_id;
      if (!catalogoId) continue;

      const esEstacion = key === CAMPO_COD_ESTACION;

      this.calibracionService
        .getItemsCatalogo(catalogoId)
        .pipe(takeUntil(this.destroy$))
        .subscribe((items) => {
          for (const item of items) {
            if (!item.valor) continue;

            if (esEstacion) {
              this.fechasEstacionPorItem.set(item.id, this.parsearFechasEstacion(item.valor));
            } else {
              this.fechasPorItem.set(item.id, item.valor);
            }
          }

          // El catálogo puede llegar después de que el usuario ya eligió.
          this.recalcularFechas();
        });
    }
  }

  /** Reaplica las fechas del catálogo a lo que ya esté seleccionado. */
  private recalcularFechas(): void {
    for (const [selector, campoFecha] of Object.entries(FECHA_POR_EQUIPO)) {
      const id = Number(this.form.get(selector)?.value);
      if (!id) continue;
      const fecha = this.fechasPorItem.get(id);
      if (fecha) {
        this.form.get(campoFecha)?.setValue(this.aIsoDate(fecha), { emitEvent: false });
      }
    }

    // La fecha del sonómetro entra en la clave de búsqueda de la tolerancia.
    this.refrescarTolerancia();

    const idEstacion = Number(this.form.get(CAMPO_COD_ESTACION)?.value);
    if (!idEstacion) return;

    const fechas = this.fechasEstacionPorItem.get(idEstacion) ?? {};
    for (const [key, fecha] of Object.entries(fechas)) {
      this.form.get(key)?.setValue(this.aIsoDate(fecha), { emitEvent: false });
    }
  }

  /** El `valor` del ítem de estación es un `[{ header, detail }]`. */
  private parsearFechasEstacion(valor: string): Record<string, string> {
    try {
      const entradas = JSON.parse(valor) as { header?: string; detail?: string }[];
      const porHeader = new Map(
        entradas.map((e) => [(e.header ?? '').trim().toLowerCase(), e.detail ?? '']),
      );

      const fechas: Record<string, string> = {};
      for (const [key, header] of Object.entries(FECHAS_ESTACION)) {
        const detalle = porHeader.get(header.trim().toLowerCase());
        if (detalle) fechas[key] = detalle;
      }
      return fechas;
    } catch {
      return {};
    }
  }

  /** Al elegir un equipo se completan sus fechas de calibración. */
  private escucharSelecciones(): void {
    for (const [selector, campoFecha] of Object.entries(FECHA_POR_EQUIPO)) {
      this.form
        .get(selector)
        ?.valueChanges.pipe(takeUntil(this.destroy$))
        .subscribe((id) => {
          const fecha = this.fechasPorItem.get(Number(id));
          this.form
            .get(campoFecha)
            ?.setValue(fecha ? this.aIsoDate(fecha) : '', { emitEvent: false });
        });
    }

    this.form
      .get(CAMPO_COD_ESTACION)
      ?.valueChanges.pipe(takeUntil(this.destroy$))
      .subscribe((id) => {
        const fechas = this.fechasEstacionPorItem.get(Number(id)) ?? {};
        for (const key of Object.keys(FECHAS_ESTACION)) {
          this.form
            .get(key)
            ?.setValue(fechas[key] ? this.aIsoDate(fechas[key]) : '', { emitEvent: false });
        }
      });
  }

  /**
   * El error de cada patrón es la diferencia **en valor absoluto** entre el
   * nivel de referencia del catálogo y la lectura observada:
   *
   *     Excel:  =IF(E24="","",ABS(114-E24))
   *     acá:    lectura vacía → null;  si no → |referencia - observada|
   *
   * El error es una magnitud, no una dirección: mide cuánto se aparta la
   * lectura del patrón, y da igual si se aparta por arriba o por abajo. Sin el
   * valor absoluto salía negativo (lectura 2 sobre 114 daba -112 en vez de 112).
   *
   * El 114 no está quemado como en la planilla: sale de los catálogos 1021 (PL)
   * y 1022 (PC), así que el patrón se puede recalibrar sin tocar el front.
   *
   * Se marcan `readonly` y no `disabled`: `aplicarDependencias` se resuscribe a
   * cada cambio del formulario y vuelve a habilitar todo campo visible, así que
   * un `disable()` no sobrevive al primer tecleo. Además, un control
   * deshabilitado queda fuera de `form.value` y el error no viajaría al guardar.
   */
  private escucharLecturas(): void {
    for (const [lectura, error] of [
      [CAMPO_LECTURA_PC, CAMPO_ERROR_PC],
      [CAMPO_LECTURA_PL, CAMPO_ERROR_PL],
    ]) {
      const controlLectura = this.form.get(lectura);
      const controlError = this.form.get(error);

      if (!controlLectura || !controlError) continue;

      controlLectura.valueChanges.pipe(takeUntil(this.destroy$)).subscribe((valor) => {
        const observada = this.aNumero(valor);
        const referencia = this.referencias[error];

        const desviacion =
          observada === null || referencia === null
            ? null
            : Number(Math.abs(referencia - observada).toFixed(2));

        controlError.setValue(desviacion, { emitEvent: false });
      });
    }
  }

  /**
   * La tolerancia no se teclea: sale de la tabla de factores de corrección,
   * buscada por la combinación de tres campos del formulario.
   *
   *     Excel (E28):
   *       =IFERROR(VLOOKUP(YEAR(E17) & E15 & ROUND(E24,0),
   *                        'Factores de corrección'!$F$4:$L$70, 5, 0),
   *                "INGRESE MEDICIONES")
   *
   * Los tres campos son de bloques distintos de la pantalla, y ninguno es el
   * obvio: el año sale de la fecha del **sonómetro** (no la del patrón), el
   * equipo es el **patrón de laboratorio**, y el nivel es la lectura observada
   * del **PC** redondeada. Cambiar cualquiera de los tres recalcula.
   *
   * Sin coincidencia se deja el control vacío: la plantilla lo muestra como
   * "INGRESE MEDICIONES", igual que el `IFERROR` del formato.
   */
  private escucharTolerancia(): void {
    if (!this.form.get(CAMPO_TOLERANCIA)) return;

    /*
     * Se escucha el SELECTOR del sonómetro, no solo su campo de fecha.
     *
     * La fecha es derivada: la rellena `escucharSelecciones()` con
     * `emitEvent: false` para no disparar la cadena de dependencias, así que
     * suscribirse solo a ella no sirve — no emite nunca. Sin el selector acá, si
     * el sonómetro se elige último (o se cambia después) la tolerancia se queda
     * con el valor viejo o vacía, aunque los tres datos estén completos.
     *
     * `escucharSelecciones()` se suscribe antes que este método, así que cuando
     * corre este handler la fecha ya está puesta en el formulario. La fecha se
     * mantiene en la lista para el camino de edición, donde llega por
     * `patchValue` y sí emite.
     */
    const disparadores = [
      CAMPO_COD_SONOMETRO,
      CAMPO_FECHA_SONOMETRO,
      CAMPO_COD_PATRON,
      CAMPO_LECTURA_PC,
    ]
      .map((key) => this.form.get(key))
      .filter((c): c is NonNullable<typeof c> => !!c);

    for (const disparador of disparadores) {
      disparador.valueChanges
        .pipe(takeUntil(this.destroy$))
        .subscribe(() => this.refrescarTolerancia());
    }

    // Al editar, los tres valores llegan de una sola vez con `patchValue`: sin
    // esta primera pasada la tolerancia quedaría vacía hasta tocar algo.
    this.refrescarTolerancia();
  }

  /**
   * Vuelve a resolver la tolerancia y la escribe en el formulario.
   *
   * Se llama desde las suscripciones y también desde `recalcularFechas()`,
   * porque ese camino rellena las fechas con `emitEvent: false` cuando el
   * catálogo llega después de que el usuario ya eligió el equipo: sin esto la
   * tolerancia se quedaría vacía justo en ese caso.
   */
  private refrescarTolerancia(): void {
    this.form
      .get(CAMPO_TOLERANCIA)
      ?.setValue(this.calcularTolerancia(), { emitEvent: false });
  }

  private calcularTolerancia(): number | null {
    const valores = this.form.getRawValue();

    // El año sale de la fecha del sonómetro, guardada como `yyyy-MM-dd`.
    const anio = Number(String(valores[CAMPO_FECHA_SONOMETRO] ?? '').slice(0, 4));

    /*
     * El selector guarda el id del ítem de catálogo (2101), pero la tabla de
     * factores se indexa por el código visible del equipo ('A-21-45'), que es
     * lo que muestra la celda E15 del formato. Hay que traducirlo.
     */
    const equipoPl = this.nombreDeOpcion(CAMPO_COD_PATRON, valores[CAMPO_COD_PATRON]);

    const lecturaPc = this.aNumero(valores[CAMPO_LECTURA_PC]);

    if (!anio || !equipoPl || lecturaPc === null) return null;

    return this.calibracionService.buscarTolerancia({
      anio,
      equipoPl,
      // `ROUND(E24,0)`: el nivel de la tabla es entero (94, 114…).
      nivel: Math.round(lecturaPc),
    });
  }

  /** Código visible de la opción elegida en un selector de catálogo. */
  private nombreDeOpcion(key: string, valor: unknown): string | null {
    if (valor === null || valor === undefined || valor === '') return null;

    const opcion = this.campoPorKey(key)?.opciones.find(
      (o) => String(o.id) === String(valor),
    );
    return opcion?.nombre ?? null;
  }

  // ── Consultas para la plantilla ──────────────────────────────────────────

  /** Campos de una sección, siempre respetando `seccion` y `orden` de BD. */
  camposDeSeccion(seccion: number): DynamicField[] {
    return camposDe(this.grupos)
      .filter(
        (campo): campo is DynamicField =>
          !!campo && this.seccionPorCampo.get(campo.key) === seccion,
      )
      .sort(
        (a, b) =>
          (this.ordenPorCampo.get(a.key) ?? 0) -
          (this.ordenPorCampo.get(b.key) ?? 0),
      );
  }

  get camposCodigosVista(): DynamicField[] {
    return this.camposDeSeccion(SECCION_CODIGOS);
  }

  get camposAseguramientoVista(): DynamicField[] {
    return this.camposDeSeccion(SECCION_ASEGURAMIENTO);
  }

  get camposChecklistVista(): DynamicField[] {
    return this.camposDeSeccion(SECCION_CHECKLIST);
  }

  /**
   * Campos de la sección de fechas que no forman parte de las siete tarjetas
   * especializadas. Permite incorporar atributos nuevos sin tocar la plantilla.
   */
  get camposFechasAdicionalesVista(): DynamicField[] {
    const clavesTarjeta = new Set(GRUPOS_FECHAS.flatMap((grupo) => grupo.tarjetas.map((t) => t.key)));
    return this.camposDeSeccion(SECCION_FECHAS).filter((campo) => !clavesTarjeta.has(campo.key));
  }

  /**
   * Tarjetas de fechas visibles en la sección 2, ordenadas por el `orden` de BD.
   * El metadata GRUPOS_FECHAS conserva únicamente título e icono.
   */
  get gruposFechasVista() {
    return GRUPOS_FECHAS
      .map((grupo) => ({
        ...grupo,
        tarjetas: grupo.tarjetas
          .filter(
            (tarjeta) =>
              this.seccionPorCampo.get(tarjeta.key) === SECCION_FECHAS,
          )
          .sort(
            (a, b) =>
              (this.ordenPorCampo.get(a.key) ?? 0) -
              (this.ordenPorCampo.get(b.key) ?? 0),
          ),
      }))
      .filter((grupo) => grupo.tarjetas.length > 0);
  }

  /** Secciones distintas de las cuatro base; se renderizan de forma genérica. */
  get seccionesAdicionales(): number[] {
    const base = new Set([
      SECCION_CODIGOS,
      SECCION_FECHAS,
      SECCION_ASEGURAMIENTO,
      SECCION_CHECKLIST,
    ]);
    return this.seccionesFormulario.filter((seccion) => !base.has(seccion));
  }

  tituloSeccion(seccion: number): string {
    switch (seccion) {
      case SECCION_CODIGOS:
        return 'Códigos de Equipos e Instrumentos de Monitoreo';
      case SECCION_FECHAS:
        return 'Detalles de Fechas de los Equipos';
      case SECCION_ASEGURAMIENTO:
        return 'Aseguramiento de la Validez de Resultados';
      case SECCION_CHECKLIST:
        return 'Checklist';
      default:
        return `Sección ${seccion}`;
    }
  }

  esCalculado(key: string): boolean {
    return key === CAMPO_ERROR_PC || key === CAMPO_ERROR_PL || key === CAMPO_TOLERANCIA;
  }

  valorMostrado(key: string): string {
    const valor = this.form.getRawValue()[key];

    if (valor === null || valor === '' || valor === undefined) {
      /*
       * La tolerancia se busca en la tabla de factores; que no haya valor
       * significa que falta alguno de los tres datos de la búsqueda o que esa
       * combinación no está tabulada. Es el `IFERROR` del formato, y ahí dice
       * exactamente esto.
       */
      return key === CAMPO_TOLERANCIA ? 'INGRESE MEDICIONES' : '—';
    }

    return `${valor} dB`;
  }

  fechaMostrada(key: string): string {
    const valor = this.form.getRawValue()[key];
    if (!valor) return '—';
    const [y, m, d] = String(valor).split('-');
    return d ? `${d}/${m}/${y}` : String(valor);
  }

  /**
   * Días que le quedan a una calibración. La vigencia es de 90 días desde la
   * última calibración registrada en catálogo.
   */
  vigencia(key: string): VigenciaCalibracion | null {
    const valor = this.form.getRawValue()[key];
    if (!valor) return null;

    const calibracion = new Date(`${valor}T00:00:00`);
    if (Number.isNaN(calibracion.getTime())) return null;

    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);

    const transcurridos = Math.floor(
      (hoy.getTime() - calibracion.getTime()) / (1000 * 60 * 60 * 24),
    );
    const restantes = DIAS_VIGENCIA_CALIBRACION - transcurridos;

    return restantes > 0
      ? { vencida: false, dias: restantes, texto: `La calibración vence en ${restantes} días` }
      : {
        vencida: true,
        dias: Math.abs(restantes),
        texto: `Calibración vencida hace ${Math.abs(restantes)} días`,
      };
  }

  /**
   * El equipo cumple cuando **los dos** errores caen por debajo de la tolerancia
   * del patrón de laboratorio:
   *
   *     Excel (E29):  =IF(AND(E26<E28, E27<E28), "CUMPLE", "NO CUMPLE")
   *                        E26 = error PC   E27 = error PL   E28 = tolerancia
   *
   * Tres detalles del criterio que son fáciles de perder:
   *
   *  - **Intervienen el PC y el PL**, no solo uno. Basta con que cualquiera de
   *    los dos se pase para que el equipo no cumpla.
   *  - La comparación es estricta (`<`, no `<=`): un error **exactamente igual**
   *    a la tolerancia da NO CUMPLE. Con 0,5 dB de tolerancia, un error de
   *    0,5 dB no pasa.
   *  - **Sin tolerancia da CUMPLE.** Ver la nota de abajo.
   *
   * ⚠️ SIN TOLERANCIA DA CUMPLE, Y ES A PROPÓSITO
   *
   * Cuando la búsqueda en la tabla de factores no encuentra fila, E28 no queda
   * vacía: contiene el texto "INGRESE MEDICIONES". Y en Excel, al comparar
   * tipos distintos, **todo número es menor que cualquier texto**, así que las
   * dos comparaciones dan VERDADERO y la fórmula devuelve CUMPLE.
   *
   * No es una regla de calidad: es cómo Excel ordena tipos. Se replica porque
   * el sistema tiene que dar el mismo resultado que el formato en papel, que es
   * el que se audita — decisión tomada explícitamente, no un descuido.
   *
   * Lo que NO se replica es el extremo de la planilla: con el formulario en
   * blanco, `"" < "INGRESE MEDICIONES"` también es verdadero y el Excel muestra
   * CUMPLE sobre una verificación vacía. Acá, sin las dos lecturas la
   * evaluación queda sin resolver.
   *
   * El `Math.abs` quedó redundante desde que el error se calcula en valor
   * absoluto, pero se mantiene a propósito: al editar una verificación vieja se
   * precarga el error tal como se guardó, y los registros anteriores al arreglo
   * tienen el valor con signo (-112 en vez de 112). Sin esto, uno de esos daría
   * CUMPLE por comparar un negativo contra la tolerancia.
   */
  get evaluacion(): 'CUMPLE' | 'NO CUMPLE' | null {
    const valores = this.form.getRawValue();
    const errorPc = this.aNumero(valores[CAMPO_ERROR_PC]);
    const errorPl = this.aNumero(valores[CAMPO_ERROR_PL]);
    const lecturaPc = this.aNumero(valores[CAMPO_LECTURA_PC]);
    const lecturaPl = this.aNumero(valores[CAMPO_LECTURA_PL]);

    // No evaluar mientras PC y PL no tengan valores mayores que cero.
    if (
      lecturaPc === null ||
      lecturaPl === null ||
      lecturaPc <= 0 ||
      lecturaPl <= 0
    ) {
      return null;
    }

    // Sin lecturas no hay nada que evaluar todavía.
    if (errorPc === null || errorPl === null) return null;

    const tolerancia = this.aNumero(valores[CAMPO_TOLERANCIA]);

    // Tolerancia no encontrada: el equivalente de comparar contra el texto
    // "INGRESE MEDICIONES" en la planilla.
    if (tolerancia === null) return 'CUMPLE';

    const dentroDeTolerancia = (error: number): boolean => Math.abs(error) < tolerancia;

    return dentroDeTolerancia(errorPc) && dentroDeTolerancia(errorPl)
      ? 'CUMPLE'
      : 'NO CUMPLE';
  }

  /** Qué falta para poder evaluar. Solo se ve mientras falten las lecturas. */
  get motivoSinEvaluacion(): string {
    return 'Registra las lecturas observadas PC y PL para evaluar';
  }

  private campoPorKey(key: string): DynamicField | undefined {
    for (const grupo of this.grupos) {
      const campo = grupo.campos.find((c) => c.key === key);
      if (campo) return campo;
    }
    return undefined;
  }

  private aNumero(valor: unknown): number | null {
    const numero = Number(valor);
    return valor === null || valor === '' || valor === undefined || Number.isNaN(numero)
      ? null
      : numero;
  }

  /** El catálogo guarda las fechas como dd/mm/aaaa; el input las quiere ISO. */
  private aIsoDate(fecha: string): string {
    const partes = fecha.trim().split('/');
    if (partes.length !== 3) return fecha.trim();
    const [d, m, y] = partes;
    return `${y}-${m.padStart(2, '0')}-${d.padStart(2, '0')}`;
  }

  /**
   * Payload de la verificación: la cabecera con lo que no sale del formulario
   * dinámico (analista, fecha y evaluación son columnas propias de
   * SOLI_CALIBRACION) y una respuesta por pregunta renderizada.
   */
  private construirPayload(): CrearCalibracionPayload {
    const valores = this.form.getRawValue();
    const { id: usuarioId } = this.authService.currentUser();

    return {
      calibracion: {
        ctformulario_id: TIPO_FORMULARIO_CALIBRACION,
        usuario_id: usuarioId,
        entidad_id: ENTIDAD_CALIBRACION,
        /*
         * El input da "yyyy-MM-dd" y Prisma exige ISO-8601 completo: sin esto
         * responde 400 "premature end of input. Expected ISO-8601 DateTime".
         * `new Date('yyyy-MM-dd')` se interpreta como medianoche UTC, así que
         * el día no se corre. Mismo criterio que `fecha_recepcion` en
         * ticket-entrega y `fecha_emision` en admin-formularios.
         */
        fecha_verificacion: new Date(this.fechaVerificacion).toISOString(),
        evaluacion: this.evaluacion,
        observaciones: (valores[CAMPO_OBSERVACIONES] as string) || null,
      },
      valorCalibracion: camposDe(this.grupos)
        .filter((campo) => !campo.hidden)
        .map((campo) => toValorDinamico(campo, valores[campo.key])),
    };
  }

  async registrar(): Promise<void> {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.toastrAlert.showError('Completa los campos obligatorios.', 'Campos requeridos');
      return;
    }

    if (!this.fechaVerificacion) {
      this.toastrAlert.showError('Indica la fecha de verificación.', 'Campos requeridos');
      return;
    }

    this.saving = true;
    const payload = this.construirPayload();

    try {
      if (this.editingRecord) {
        await this.calibracionService.actualizarVerificacion(this.editingRecord.id, payload);
        this.avisarGuardado('El registro ha sido actualizado correctamente.', '¡Actualizado!');
        return;
      }

      await this.calibracionService.registrarVerificacion(payload);

      /*
       * No se menciona ningún N° Formulario: el registro queda en Pendiente y
       * se numera recién al autorizarlo, desde el listado.
       */
      this.avisarGuardado(
        'La verificación ha sido registrada y queda pendiente de autorización.',
        '¡Guardado!',
      );
    } catch {
      this.zone.run(() => {
        this.saving = false;
        this.toastrAlert.showError('No se pudo guardar el registro.', 'Error');
      });
    }
  }

  /*
   * El guardado resuelve fuera de la zona de Angular: sin `zone.run` el toast y
   * el cambio de vista no se pintan.
   */
  private avisarGuardado(mensaje: string, titulo: string): void {
    this.zone.run(() => {
      this.saving = false;
      this.toastrAlert.showSuccess(mensaje, titulo);
      this.guardado.emit();
    });
  }

  cancelar(): void {
    this.cancelado.emit();
  }
}
