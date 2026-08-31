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
  DynamicFormGroupComponent,
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
  CAMPO_LECTURA_PC,
  CAMPO_LECTURA_PL,
  CAMPO_OBSERVACIONES,
  CAMPO_COD_ESTACION,
  CAMPO_TOLERANCIA,
  DIAS_VIGENCIA_CALIBRACION,
  FECHAS_ESTACION,
  FECHA_POR_EQUIPO,
  SECCION_CALIBRACION,
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
    DynamicFormGroupComponent,
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

          this.grupos = construirGrupos(
            formulario.preguntas ?? [],
            SECCION_CALIBRACION,
            CALIBRACION_FORM_CONFIG,
          );
          this.marcarDerivados();
          generarControles(this.form, this.grupos);
          aplicarDependencias(this.form, this.grupos, this.destroy$);
          this.cargarFechasDeCatalogo();
          this.escucharSelecciones();
          this.escucharLecturas();
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
   * El error de cada patrón es la diferencia entre la lectura observada y el
   * valor definido en catálogo para ese nivel.
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
            : Number((observada - referencia).toFixed(2));

        controlError.setValue(desviacion, { emitEvent: false });
      });
    }
  }

  // ── Consultas para la plantilla ──────────────────────────────────────────

  campo(grupo: { campos: DynamicField[] }, key: string): DynamicField | undefined {
    return grupo.campos.find((c) => c.key === key);
  }

  /** Campos del grupo que la plantilla no coloca en un sitio propio. */
  camposSueltos(grupo: { campos: DynamicField[] }, colocados: string[]): DynamicField[] {
    const puestos = new Set(colocados);
    return grupo.campos.filter((c) => !puestos.has(c.key));
  }

  /** Selector de equipo del grupo, si lo tiene. */
  selectorDe(grupo: { campos: DynamicField[] }): DynamicField | undefined {
    return grupo.campos.find((c) => c.controlType === 'select' && this.esSelectorEquipo(c.key));
  }

  private esSelectorEquipo(key: string): boolean {
    return key in FECHA_POR_EQUIPO || key === CAMPO_COD_ESTACION;
  }

  /** Fechas del grupo (vienen de catálogo, se muestran en solo lectura). */
  fechasDe(grupo: { campos: DynamicField[] }): DynamicField[] {
    const claves = new Set([...Object.values(FECHA_POR_EQUIPO), ...Object.keys(FECHAS_ESTACION)]);
    return grupo.campos.filter((c) => claves.has(c.key));
  }

  /** Resto de campos del grupo: lecturas, errores, tolerancia, catálogos SI/NO. */
  camposCapturables(grupo: { campos: DynamicField[] }): DynamicField[] {
    const derivados = new Set([
      ...Object.values(FECHA_POR_EQUIPO),
      ...Object.keys(FECHAS_ESTACION),
    ]);
    const selector = this.selectorDe(grupo)?.key;

    return grupo.campos.filter(
      (c) => !derivados.has(c.key) && c.key !== selector && c.key !== CAMPO_OBSERVACIONES,
    );
  }

  esCalculado(key: string): boolean {
    return key === CAMPO_ERROR_PC || key === CAMPO_ERROR_PL;
  }

  valorMostrado(key: string): string {
    const valor = this.form.getRawValue()[key];
    return valor === null || valor === '' || valor === undefined ? '—' : `${valor} dB`;
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
   * El equipo cumple cuando el error del patrón de laboratorio cae dentro de su
   * tolerancia. Es el criterio del formulario: solo interviene el PL.
   */
  get evaluacion(): 'CUMPLE' | 'NO CUMPLE' | null {
    const tolerancia = this.aNumero(this.form.getRawValue()[CAMPO_TOLERANCIA]);
    const errorPl = this.aNumero(this.form.getRawValue()[CAMPO_ERROR_PL]);

    if (tolerancia === null || errorPl === null) return null;

    return Math.abs(errorPl) <= tolerancia ? 'CUMPLE' : 'NO CUMPLE';
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

      const secuencial = await this.calibracionService.registrarVerificacion(payload);

      this.avisarGuardado(
        secuencial
          ? `La verificación ${secuencial} ha sido registrada correctamente.`
          : 'La verificación ha sido registrada correctamente.',
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
