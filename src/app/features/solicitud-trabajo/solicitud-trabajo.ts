import { CommonModule } from '@angular/common';
import { Component, NgZone, OnDestroy, OnInit, AfterViewChecked } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidatorFn,
  Validators,
  FormControl,
} from '@angular/forms';
import { cedulaEcuatoriana, rucEcuatoriano } from '../../core/utils/ecuador-id.validators';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil, firstValueFrom } from 'rxjs';
import * as L from 'leaflet';
import Swal from 'sweetalert2';

import {
  FieldConfig,
  FieldSectionId,
  FormularioLaboratorio,
  JornadaItem,
  Pregunta,
} from './model/solicitud-trabajo.model';
import {
  SolicitudService,
  SolicitudPayload,
  ValorSolicitudItem,
  SolicitudEnsayoItem,
} from '../../services/solicitudes/solicitud-trabajo/solicitud-trabajo.service';
import { EstablecimientoUsuarioService } from '../../services/solicitudes/solicitud-trabajo/establecimiento-usuario.service';
import { EstablecimientoService } from '../../services/solicitudes/solicitud-trabajo/establecimiento.service';
import { EnsayoService } from '../../services/solicitudes/solicitud-trabajo/ensayo.service';
import { DocumentoLegalService } from '../../services/solicitudes/solicitud-trabajo/documento-legal.service';
import { IntegracionService } from '../../services/solicitudes/solicitud-trabajo/integracion.service';
import { PeriodoService } from '../../services/solicitudes/solicitud-trabajo/periodo.service';

import { Establecimiento } from '../../interfaces/solicitudes/solicitud-trabajo/establecimiento.interface';
import { Tecnico } from '../../interfaces/solicitudes/solicitud-trabajo/tecnico.interface';
import {
  EnsayoLaboratorio,
  EnsayoMuestreo,
} from '../../interfaces/solicitudes/solicitud-trabajo/ensayo.interface';
import {
  DatosSRI,
  DatosRegistroCivil,
} from '../../interfaces/solicitudes/solicitud-trabajo/integracion.interface';
import { Step1SolicitudComponent } from './steps/step1-solicitud/step1-solicitud';
import { Step2OperadorComponent } from './steps/step2-operador/step2-operador';
import { Step3CatalogoComponent, MatrizConHijosUI } from './steps/step3-catalogo/step3-catalogo';
import { Step4ConfirmacionComponent } from './steps/step4-confirmacion/step4-confirmacion';
import {
  ReportSolicitud,
  ReportValorSolicitud,
} from '../../interfaces/solicitudes/lista-solicitudes/report-solicitud.interface';
import { ReportSolicitudService } from '../../services/solicitudes/lista-solicitudes/report-solicitud.service';
import { AuthService } from '../auth/service/auth-service';
import { PageHeader } from '../../shared/components/page-header/page-header';

type MotivoFlujo = '' | 'seguimiento' | 'denuncia' | 'licenciamiento';

@Component({
  selector: 'app-solicitud-trabajo',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    Step1SolicitudComponent,
    Step2OperadorComponent,
    Step3CatalogoComponent,
    Step4ConfirmacionComponent,
    PageHeader,
  ],
  templateUrl: './solicitud-trabajo.html',
  styleUrls: ['./solicitud-trabajo.css'],
})
export class SolicitudTrabajo implements OnInit, AfterViewChecked, OnDestroy {
  // ── Formulario dinámico ──────────────────────────────────────────────────
  form: FormGroup;
  formulario: FormularioLaboratorio | null = null;
  fields: FieldConfig[] = [];
  loading = true;

  // ── Navegación por pasos ─────────────────────────────────────────────────
  currentStep = 1;

  // ── Estado de modales ────────────────────────────────────────────────────
  showMapModal = false;
  showTerminosModal = false;
  showConfidencialidadModal = false;

  // ── PDF preview ──────────────────────────────────────────────────────────
  pdfPreviewUrl: SafeResourceUrl | null = null;
  isPdfCargando = false;
  showPdfFinal = false;
  private pdfBlobUrl: string | null = null;

  // ── Modo edición ─────────────────────────────────────────────────────────
  modoEdicion = false;
  // true tras el primer guardado exitoso en esta sesión (aunque no sea
  // modoEdicion): si el usuario regresa a un paso anterior y vuelve a
  // confirmar, evita re-POSTear create-many y duplicar filas ya guardadas.
  private valoresGuardados = false;
  private ensayosGuardados = false;

  // ── Estado de carga ──────────────────────────────────────────────────────
  isGuardando = false;
  isCreandoSolicitud = false;

  // ── Datos de la solicitud registrada ────────────────────────────────────
  solicitudRegistradaId: string | null = null;
  secuencialAsignado: string | null = null;

  // ── Step 1: establecimientos y técnicos ──────────────────────────────────
  establecimientos: Establecimiento[] = [];
  tecnicosFiltrados: Tecnico[] = [];
  selectedTecnicoNombre = 'Usuario';

  // ── Step 2: campos del formulario dinámico ───────────────────────────────
  buscandoIntegracion: { [key: string]: boolean } = {};
  manualSchedules: { fecha_plan: string; inicio_bloque: string; fin_bloque: string }[] = [];

  // ── Step 3: catálogos y ensayos ──────────────────────────────────────────
  catalogosSeleccionados: MatrizConHijosUI[] = [];
  ensayosAire: EnsayoLaboratorio[] = [];
  ensayosRuido: EnsayoLaboratorio[] = [];
  ensayosMuestreo: EnsayoMuestreo[] = [];
  ensayosResiduales: EnsayoLaboratorio[] = [];
  ensayosAirePrevio: EnsayoLaboratorio[] = [];
  ensayosRuidoPrevio: EnsayoLaboratorio[] = [];
  notasAgua: string[] = [];
  notasAire: string[] = [];
  notasRuido: string[] = [];

  // ── Step 4: acuerdos ────────────────────────────────────────────────────
  terminosCondiciones: string[] = [];
  acuerdoConfidencialidad = '';

  // ── Mapa ─────────────────────────────────────────────────────────────────
  private map: L.Map | null = null;
  private marker: L.Marker | null = null;

  // ── Constantes ───────────────────────────────────────────────────────────
  readonly fechaActual = new Date();
  private readonly COLOR_PRIMARIO = '#1e3a8a';
  private readonly destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private service: SolicitudService,
    private establecimientoService: EstablecimientoService,
    private establecimientoUsuarioService: EstablecimientoUsuarioService,
    private ensayoService: EnsayoService,
    private documentoLegalService: DocumentoLegalService,
    private integracionService: IntegracionService,
    private periodoService: PeriodoService,
    private reportSolicitudService: ReportSolicitudService,
    private zone: NgZone,
    private route: ActivatedRoute,
    private authService: AuthService,
    private sanitizer: DomSanitizer,
  ) {
    this.form = this.fb.group({
      entidad_id: ['', Validators.required],
      tecnico_id: ['', Validators.required],
      cargo_usuario: [{ value: '', disabled: true }],
      numero_solicitud: [{ value: '', disabled: true }],
      val_pasaporte: this.fb.control(''),
    });
  }

  // ── Lifecycle ────────────────────────────────────────────────────────────

  ngOnInit(): void {
    this.cargarDatosIniciales();
    this.setupStepOneLogic();
    const solicitud = history.state?.solicitud as ReportSolicitud | undefined;
    if (solicitud?.id_solicitud) {
      this.modoEdicion = true;
      this.solicitudRegistradaId = solicitud.id_solicitud;
      this.cargarStep1DesdeSolicitud(solicitud);
      this.preCargarEnsayosSolicitud(solicitud.id_solicitud);
    }
    this.cargarFormularioDinamico();
  }

  ngAfterViewChecked(): void {
    if (this.showMapModal && !this.map) this.initMap();
  }

  ngOnDestroy(): void {
    this.closeMap();
    this.revocarBlobUrl();
    this.destroy$.next();
    this.destroy$.complete();
  }

  // ── Carga inicial ────────────────────────────────────────────────────────

  private cargarFormularioDinamico(): void {
    const idTipoFormulario = this.route.snapshot.paramMap.get('idTipoFrmulario') || '380';
    const { id } = this.authService.currentUser();

    this.service
      .getFormulario(idTipoFormulario, id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (formulario) => {
          this.formulario = formulario;
          this.fields = formulario.preguntas
            .filter((p) => p.estado !== false)
            .map((p) => this.toFieldConfig(p));
          this.generateControls();
          this.applyDependencyLogic();
          this.loading = false;
          if (this.modoEdicion && this.solicitudRegistradaId) {
            this.preCargarValoresEdicion(this.solicitudRegistradaId);
          }
        },
        error: () => {
          this.loading = false;
          Swal.fire('Error', 'No se pudo cargar el formulario dinámico', 'error');
        },
      });
  }

  private preCargarValoresEdicion(solicitudId: string): void {
    this.reportSolicitudService
      .getValoresSolicitud(solicitudId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (valores: ReportValorSolicitud[]) => {
          const selectPatch: Record<string, unknown> = {};
          const textPatch: Record<string, unknown> = {};

          for (const v of valores) {
            const key = v.atributo_formulario_nombre;
            if (!this.form.get(key)) continue;

            if (v.ctipo_dato_nombre === 'Selección Simple') {
              const catalogo = Number(v.valor_catalogo);
              if (catalogo && catalogo !== 0) selectPatch[key] = catalogo;
            } else if (v.ctipo_dato_nombre === 'Selección Mutiple' && v.valor_multiple) {
              try {
                const guardados: { fecha_plan: string; inicio_bloque: string; fin_bloque: string }[] = JSON.parse(v.valor_multiple);
                this.manualSchedules = guardados.map((g) => ({
                  fecha_plan: g.fecha_plan ?? '',
                  inicio_bloque: g.inicio_bloque ?? '',
                  fin_bloque: g.fin_bloque ?? '',
                }));
              } catch {
                // valor_multiple malformado, se ignora
              }
            } else {
              textPatch[key] = v.valor_texto ?? v.valor_numero ?? v.valor_fecha ?? '';
            }
          }

          // Paso 1: solo selects → dispara updateDependentFields → habilita campos dependientes
          this.form.patchValue(selectPatch);
          // Paso 2: textos sobre controles ya habilitados
          this.form.patchValue(textPatch);
        },
      });
  }

  private cargarDatosIniciales(): void {
    this.establecimientoService
      .getEstablecimientos()
      .pipe(takeUntil(this.destroy$))
      .subscribe((e) => (this.establecimientos = e));

    this.ensayoService
      .getEnsayosAire()
      .pipe(takeUntil(this.destroy$))
      .subscribe((e) => (this.ensayosAire = e));
    this.ensayoService
      .getEnsayosRuido()
      .pipe(takeUntil(this.destroy$))
      .subscribe((e) => (this.ensayosRuido = e));
    this.ensayoService
      .getNotasAgua()
      .pipe(takeUntil(this.destroy$))
      .subscribe((n) => (this.notasAgua = n));
    this.ensayoService
      .getNotasAire()
      .pipe(takeUntil(this.destroy$))
      .subscribe((n) => (this.notasAire = n));
    this.ensayoService
      .getNotasRuido()
      .pipe(takeUntil(this.destroy$))
      .subscribe((n) => (this.notasRuido = n));

    this.documentoLegalService
      .getTerminosCondiciones()
      .pipe(takeUntil(this.destroy$))
      .subscribe((t) => (this.terminosCondiciones = t));
    this.documentoLegalService
      .getAcuerdoConfidencialidad()
      .pipe(takeUntil(this.destroy$))
      .subscribe((a) => (this.acuerdoConfidencialidad = a));
  }

  // ── Step 1 ───────────────────────────────────────────────────────────────

  private setupStepOneLogic(): void {
    this.form
      .get('entidad_id')
      ?.valueChanges.pipe(takeUntil(this.destroy$))
      .subscribe((establecimientoId: string) => {
        this.tecnicosFiltrados = [];
        this.form.patchValue({ tecnico_id: '', cargo_usuario: '' }, { emitEvent: false });
        this.selectedTecnicoNombre = 'Usuario';
        if (!establecimientoId) return;
        this.establecimientoUsuarioService
          .getUsuariosByEstablecimiento(establecimientoId)
          .pipe(takeUntil(this.destroy$))
          .subscribe((tecnicos) => (this.tecnicosFiltrados = tecnicos));
      });

    this.form
      .get('tecnico_id')
      ?.valueChanges.pipe(takeUntil(this.destroy$))
      .subscribe((tecnicoId: string) => {
        const tecnico = this.tecnicosFiltrados.find((t) => t.id === tecnicoId);
        this.selectedTecnicoNombre = tecnico?.nombre || 'Usuario';
        this.form.patchValue({ cargo_usuario: tecnico?.cargo || '' }, { emitEvent: false });
      });
  }

  private cargarStep1DesdeSolicitud(solicitud: ReportSolicitud): void {
    this.establecimientoUsuarioService
      .getUsuariosByEstablecimiento(solicitud.establecimiento_id)
      .pipe(takeUntil(this.destroy$))
      .subscribe((tecnicos) => {
        this.tecnicosFiltrados = tecnicos;
        const tecnico = tecnicos.find((t) => t.id === solicitud.usuario_id);
        this.selectedTecnicoNombre = tecnico?.nombre || 'Usuario';
        this.form.patchValue(
          {
            entidad_id: solicitud.establecimiento_id,
            tecnico_id: solicitud.usuario_id,
            cargo_usuario: tecnico?.cargo || '',
          },
          { emitEvent: false },
        );
      });
  }

  private preCargarEnsayosSolicitud(solicitudId: string): void {
    const ENSAYO_ID_MUESTREO = 19;
    this.reportSolicitudService
      .getEnsayosSolicitud(solicitudId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (ensayos) => {
          const uniqueIds = [...new Set(ensayos.map((e) => Number(e.ctambiental_id)))];
          this.catalogosSeleccionados = [
            {
              collapsed: false,
              matriz: { id: 0, nombre: '', catalogo_id: 0, estado: true, grupo: null, item_catalogo_id: null, orden: null, sigla: null, valor: null },
              hijos: uniqueIds.map((id) => ({
                id,
                activo: true,
                nombre: '',
                catalogo_id: 0,
                estado: true,
                grupo: null,
                item_catalogo_id: null,
                orden: null,
                sigla: null,
                valor: null,
              })),
            },
          ];

          this.ensayosMuestreo = ensayos
            .filter((e) => Number(e.ensayo_id) === ENSAYO_ID_MUESTREO)
            .map((e) => {
              const partes = e.metodo.split(',');
              return {
                activo: true,
                ensayo_id: Number(e.ensayo_id),
                ctambiental_id: Number(e.ctambiental_id),
                producto: e.analisis,
                parametro: e.identificacion,
                metodoInterno: partes[0]?.trim() ?? '',
                metodoReferencia: partes.slice(1).join(',').trim(),
              } as EnsayoMuestreo;
            });

          const nonMuestreo: EnsayoLaboratorio[] = ensayos
            .filter((e) => Number(e.ensayo_id) !== ENSAYO_ID_MUESTREO)
            .map((e) => {
              const partes = e.metodo.split(',');
              return {
                activo: true,
                ensayo_id: Number(e.ensayo_id),
                ctambiental_id: Number(e.ctambiental_id),
                ensayo: e.analisis,
                identificacion: e.identificacion,
                metodoInterno: partes[0]?.trim() ?? '',
                metodoReferencia: partes.slice(1).join(',').trim(),
                unidad: '',
              } as EnsayoLaboratorio;
            });

          this.ensayosResiduales = nonMuestreo;
          this.ensayosAirePrevio = nonMuestreo;
          this.ensayosRuidoPrevio = nonMuestreo;
        },
      });
  }

  get isStepOneReady(): boolean {
    return !!this.form.get('entidad_id')?.value && !!this.form.get('tecnico_id')?.value;
  }

  // Guarda los valores del step2 (formulario dinámico). No navega ni maneja
  // isGuardando/errores: eso lo hace el llamador (aceptarConfidencialidad),
  // que encadena este guardado con el de ensayos y la finalización.
  private async guardarValoresSolicitud(): Promise<void> {
    const raw = this.form.getRawValue();

    const camposNormales: ValorSolicitudItem[] = this.fields
      .filter((f) => !f.hidden && f.controlType !== 'schedule')
      .map((f) => {
        const value = raw[f.key];
        const esSelect = f.controlType === 'select';
        return {
          solicitud_id: this.solicitudRegistradaId,
          atributo_formulario_id: String(f.id),
          valor_texto: !esSelect ? (value ?? null) : null,
          valor_numero: null,
          valor_fecha: null,
          valor_booleano: null,
          valor_multiple: null,
          valor_catalogo: esSelect ? Number(value) || 0 : 0,
          valor_uuid: raw.tecnico_id ?? null,
        };
      });

    const camposSchedule: ValorSolicitudItem[] = this.fields
      .filter((f) => f.controlType === 'schedule')
      .map((f) => ({
        solicitud_id: this.solicitudRegistradaId,
        atributo_formulario_id: String(f.id),
        valor_texto: null,
        valor_numero: null,
        valor_fecha: null,
        valor_booleano: null,
        valor_multiple: this.manualSchedules.length > 0 ? JSON.stringify(this.manualSchedules) : null,
        valor_catalogo: 0,
        valor_uuid: raw.tecnico_id ?? null,
      }));

    const valorSolicitud = [...camposNormales, ...camposSchedule];
    const payload = { valorSolicitud };

    if ((this.modoEdicion || this.valoresGuardados) && this.solicitudRegistradaId) {
      await firstValueFrom(
        this.service.actualizarValoresSolicitud(this.solicitudRegistradaId, payload),
      );
    } else {
      await firstValueFrom(this.service.guardarValoresSolicitud(payload));
    }
    this.valoresGuardados = true;
  }

  // Guarda los ensayos seleccionados en el step3. Misma idea que
  // guardarValoresSolicitud: sin navegación ni manejo de errores propio.
  private async guardarEnsayosSolicitud(): Promise<void> {
    const todos = [
      ...this.ensayosResiduales,
      ...this.ensayosMuestreo,
      ...this.ensayosAire,
      ...this.ensayosRuido,
    ].filter((e) => e.activo && e.ensayo_id && e.ctambiental_id);

    const solicitudEnsayo: SolicitudEnsayoItem[] = todos.map((e) => ({
      solicitud_id: this.solicitudRegistradaId,
      ensayo_id: e.ensayo_id!,
      ctambiental_id: e.ctambiental_id!,
      estado: true,
    }));

    const payload = { solicitudEnsayo };

    if ((this.modoEdicion || this.ensayosGuardados) && this.solicitudRegistradaId) {
      await firstValueFrom(this.service.actualizarEnsayosSolicitud(this.solicitudRegistradaId, payload));
    } else {
      await firstValueFrom(this.service.guardarEnsayosSolicitud(payload));
    }
    this.ensayosGuardados = true;
  }

  private async crearSolicitudYAvanzar(): Promise<void> {
    this.isCreandoSolicitud = true;
    const anio = new Date().getFullYear();
    const mes = new Date().getMonth() + 1;
    const raw = this.form.getRawValue();

    try {
      const ejercicio = await this.periodoService.getEjercicioByAnio(anio);
      if (!ejercicio) throw new Error(`No hay ejercicio activo para el año ${anio}`);

      const periodo = await this.periodoService.getPeriodoByEjercicioAndMes(ejercicio.id, mes);
      if (!periodo) throw new Error(`No hay periodo activo para el mes ${mes}`);

      const { id: userId } = this.authService.currentUser();

      const payload: SolicitudPayload = {
        formulario_id: this.formulario?.formulario_id ?? null,
        usuario_id: userId,
        entidad_id: raw.entidad_id,
        secuencial_id: null,
        ctestado_id: 2,
        periodo_id: periodo.id,
        descripcion: '',
        ejercicio_id: ejercicio.id,
        tecnico_id: raw.tecnico_id,
      };
      const res = await firstValueFrom(this.service.registrarSolicitud(payload));
      this.zone.run(() => {
        this.solicitudRegistradaId = res?.data?.id ?? res?.id ?? null;
        this.isCreandoSolicitud = false;
        this.avanzarPaso();
      });
    } catch (err: any) {
      this.zone.run(() => {
        this.isCreandoSolicitud = false;
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudo registrar la solicitud',
          confirmButtonColor: this.COLOR_PRIMARIO,
        });
      });
    }
  }

  // ── Navegación ───────────────────────────────────────────────────────────

  goToStep(step: number): void {
    if (this.secuencialAsignado) return;
    if (step < 1 || step > 4) return;
    if (step > 1 && !this.isStepOneReady) {
      this.alertCamposObligatorios();
      return;
    }
    if (step >= 3 && this.currentStep === 2 && this.form.invalid) {
      this.form.markAllAsTouched();
      const invalidos = Object.entries(this.form.controls)
        .filter(([, ctrl]) => ctrl.invalid)
        .map(([name]) => this.fields.find((f) => f.key === name && !f.hidden)?.label || name)
        .filter(Boolean);
      Swal.fire({
        icon: 'warning',
        title: 'Complete los campos obligatorios',
        text: invalidos.length ? 'Faltan: ' + invalidos.join(', ') : 'Revise los campos marcados en rojo.',
        confirmButtonColor: this.COLOR_PRIMARIO,
      });
      return;
    }
    if (step === 4 && !this.solicitudRegistradaId) {
      this.alertToast('warning', 'Debe completar el paso 3 antes de continuar');
      return;
    }
    if (step > this.currentStep + 1) return;
    this.currentStep = step;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  goNextStep(): void {
    if (this.currentStep === 1) {
      if (!this.isStepOneReady) {
        this.alertCamposObligatorios();
        return;
      }
      if (this.modoEdicion) {
        this.avanzarPaso();
        return;
      }
      this.crearSolicitudYAvanzar();
      return;
    }

    if (this.currentStep === 2) {
      if (this.form.invalid) {
        this.form.markAllAsTouched();
        const invalidos = Object.entries(this.form.controls)
          .filter(([, ctrl]) => ctrl.invalid)
          .map(([name]) => this.fields.find((f) => f.key === name && !f.hidden)?.label || name)
          .filter(Boolean);
        Swal.fire({
          icon: 'warning',
          title: 'Complete los campos obligatorios',
          text: invalidos.length
            ? 'Faltan: ' + invalidos.join(', ')
            : 'Revise los campos marcados en rojo.',
          confirmButtonColor: this.COLOR_PRIMARIO,
        });
        return;
      }
      // Los valores del step2 quedan en this.form (ya son "temporales") y
      // solo se envían al backend al confirmar en el step4.
      this.avanzarPaso();
      return;
    }
  }

  goPrevStep(): void {
    if (this.secuencialAsignado) return;
    if (this.currentStep > 1) {
      this.currentStep--;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  nuevaSolicitud(): void {
    this.currentStep = 1;
    this.solicitudRegistradaId = null;
    this.secuencialAsignado = null;
    this.catalogosSeleccionados = [];
    this.ensayosMuestreo = [];
    this.ensayosResiduales = [];
    this.manualSchedules = [];
    this.buscandoIntegracion = {};
    this.modoEdicion = false;
    this.valoresGuardados = false;
    this.ensayosGuardados = false;
    this.form.reset();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  onStep3Next(data: MatrizConHijosUI[]): void {
    // Los ensayos seleccionados quedan en memoria (catalogosSeleccionados +
    // ensayosMuestreo/Residuales/Aire/Ruido) y solo se envían al backend al
    // confirmar en el step4.
    this.catalogosSeleccionados = data;
    this.avanzarPaso();
  }

  onEnsayosAireCambiado(ensayos: EnsayoLaboratorio[]): void {
    this.ensayosAire = ensayos;
    this.ensayosAirePrevio = ensayos;
  }

  onEnsayosRuidoCambiado(ensayos: EnsayoLaboratorio[]): void {
    this.ensayosRuido = ensayos;
    this.ensayosRuidoPrevio = ensayos;
  }

  private avanzarPaso(): void {
    this.currentStep++;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  private alertCamposObligatorios(): void {
    this.form.markAllAsTouched();
    Swal.fire({
      icon: 'warning',
      title: 'Atención',
      text: 'Complete los campos obligatorios de la cabecera',
      confirmButtonColor: this.COLOR_PRIMARIO,
    });
  }

  // ── Step 2: integración SRI / Civil ──────────────────────────────────────

  buscarDatosIntegracion(field: FieldConfig): void {
    const control = this.getFieldControl(field.key);
    if (!control.value) {
      this.alertToast('warning', 'Ingrese un documento válido para buscar');
      return;
    }

    const documento = control.value as string;
    this.buscandoIntegracion[field.key] = true;
    const resetBuscando = () => (this.buscandoIntegracion[field.key] = false);

    if (field.integrations.sri) {
      this.integracionService
        .buscarPorSRI(documento)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (datos: DatosSRI) => {
            resetBuscando();
            this.form.patchValue(datos);
            this.alertToast('success', 'Datos SRI recuperados');
          },
          error: resetBuscando,
        });
    } else if (field.integrations.civil) {
      this.integracionService
        .buscarPorRegistroCivil(documento)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (datos: DatosRegistroCivil) => {
            resetBuscando();
            this.form.patchValue(datos);
            this.alertToast('success', 'Datos Registro Civil recuperados');
          },
          error: resetBuscando,
        });
    }
  }

  addManualScheduleItem(entry: { fecha_plan: string; inicio_bloque: string; fin_bloque: string }): void {
    this.manualSchedules = [...this.manualSchedules, entry];
  }

  removeManualScheduleItem(index: number): void {
    this.manualSchedules = this.manualSchedules.filter((_, i) => i !== index);
  }

  // ── Step 4: acuerdos y guardado ──────────────────────────────────────────

  iniciarAcuerdos(): void {
    this.showTerminosModal = true;
  }

  aceptarTerminos(): void {
    this.showTerminosModal = false;
    this.showConfidencialidadModal = true;
  }

  descargarPdf(): void {
    if (!this.pdfBlobUrl) return;
    const a = document.createElement('a');
    a.href = this.pdfBlobUrl;
    a.download = `ReportSolicitud-${this.solicitudRegistradaId ?? 'documento'}.pdf`;
    a.click();
  }

  private revocarBlobUrl(): void {
    if (this.pdfBlobUrl) {
      URL.revokeObjectURL(this.pdfBlobUrl);
      this.pdfBlobUrl = null;
    }
  }

  // Confirmación final del step4: guarda valores (step2), luego ensayos
  // (step3) y recién entonces finaliza la solicitud. Cada llamada espera a
  // que la anterior termine con éxito — si una falla, las siguientes no se
  // ejecutan y se muestra el error correspondiente a esa etapa.
  async aceptarConfidencialidad(): Promise<void> {
    this.isGuardando = true;

    try {
      await this.guardarValoresSolicitud();
    } catch (err: any) {
      this.zone.run(() => {
        this.isGuardando = false;
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudo guardar los valores de la solicitud',
          confirmButtonColor: this.COLOR_PRIMARIO,
        });
      });
      return;
    }

    try {
      await this.guardarEnsayosSolicitud();
    } catch (err: any) {
      this.zone.run(() => {
        this.isGuardando = false;
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudo guardar los ensayos de la solicitud',
          confirmButtonColor: this.COLOR_PRIMARIO,
        });
      });
      return;
    }

    try {
      const finRes = await firstValueFrom(
        this.service.finalizarSolicitud({
          idSolicitud: this.solicitudRegistradaId ?? '',
          identifcadorSecuecnial: 'SOLI_SECU_2025',
          ctestado: 388,
        }),
      );
      this.zone.run(() => {
        this.secuencialAsignado = finRes?.data?.[0]?.secuencialAsignado ?? null;
        this.showConfidencialidadModal = false;
        this.isGuardando = false;
        this.abrirPdfFinal();
      });
    } catch (err: any) {
      this.zone.run(() => {
        this.isGuardando = false;
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudo finalizar la solicitud',
          confirmButtonColor: this.COLOR_PRIMARIO,
        });
      });
    }
  }

  abrirPdfFinal(): void {
    this.showPdfFinal = true;
    this.isPdfCargando = true;
    this.pdfPreviewUrl = null;
    this.revocarBlobUrl();

    if (!this.solicitudRegistradaId) {
      this.isPdfCargando = false;
      return;
    }

    this.service
      .getPdfSolicitud(this.solicitudRegistradaId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (blob) => {
          this.pdfBlobUrl = URL.createObjectURL(blob);
          this.pdfPreviewUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.pdfBlobUrl);
          this.isPdfCargando = false;
        },
        error: () => {
          this.isPdfCargando = false;
        },
      });
  }

  // ── Mapa ─────────────────────────────────────────────────────────────────

  openMap(): void {
    this.showMapModal = true;
  }

  closeMap(): void {
    this.showMapModal = false;
    this.map?.remove();
    this.map = null;
    this.marker = null;
  }

  private initMap(): void {
    this.zone.runOutsideAngular(() => {
      const lat = Number(this.getFieldControl('val_lati')?.value) || -0.1807;
      const lng = Number(this.getFieldControl('val_long')?.value) || -78.4678;

      this.map = L.map('map-container').setView([lat, lng], 14);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(this.map);
      this.marker = L.marker([lat, lng], { draggable: true }).addTo(this.map);
      this.marker.on('dragend', () => {
        const pos = this.marker?.getLatLng();
        if (pos) this.updateCoords(pos.lat, pos.lng);
      });
      this.map.on('click', (e: L.LeafletMouseEvent) => {
        this.marker?.setLatLng(e.latlng);
        this.updateCoords(e.latlng.lat, e.latlng.lng);
      });
      setTimeout(() => this.map?.invalidateSize(), 250);
    });
  }

  private updateCoords(lat: number, lng: number): void {
    this.zone.run(() =>
      this.form.patchValue({ val_lati: lat.toFixed(6), val_long: lng.toFixed(6) }),
    );
  }

  // ── Formulario dinámico ──────────────────────────────────────────────────

  getFieldControl(key: string): FormControl {
    return this.form.get(key) as FormControl;
  }

  get formularioTitulo(): string {
    return this.formulario?.tipo_formulario ?? 'Formulario Solicitud de Trabajo';
  }

  get isPasaporteSelected(): boolean {
    const tipoField = this.fields.find((f) => f.key === 'val_ct_tipo_op');
    if (!tipoField) return false;
    const selectedId = this.getFieldControl('val_ct_tipo_op')?.value;
    return tipoField.options.some(
      (opt) =>
        String(opt.id) === String(selectedId) && opt.nombre?.toLowerCase().includes('pasaporte'),
    );
  }

  get motivoFlujo(): MotivoFlujo {
    const field = this.fields.find((f) => this.isMotivoField(f) && f.options.length > 0);
    if (!field) return '';
    const name =
      field.options
        .find((o) => String(o.id) === String(this.form.get(field.key)?.value))
        ?.nombre?.toLowerCase() || '';
    if (name.includes('seguimiento')) return 'seguimiento';
    if (name.includes('denuncia')) return 'denuncia';
    if (name.includes('licenciamiento')) return 'licenciamiento';
    return '';
  }

  private generateControls(): void {
    for (const field of this.fields) {
      if (this.form.contains(field.key)) continue;
      this.form.addControl(
        field.key,
        this.fb.control(
          { value: '', disabled: field.hidden },
          this.buildValidators(field, field.hidden),
        ),
      );
    }
  }

  private buildValidators(field: FieldConfig, isHidden: boolean): ValidatorFn[] {
    if (field.controlType === 'schedule' || isHidden) return [];
    const validators: ValidatorFn[] = [];
    if (field.required) validators.push(Validators.required);
    if (field.maxLength) validators.push(Validators.maxLength(field.maxLength));
    const key = field.key.toLowerCase();
    if (key.includes('ruc')) validators.push(rucEcuatoriano());
    else if (key.includes('ced')) validators.push(cedulaEcuatoriana());
    return validators;
  }

  private applyDependencyLogic(): void {
    this.updateDependentFields();
    this.form.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.updateDependentFields());
  }

  private updateDependentFields(): void {
    for (const field of this.fields) {
      if (!field.dependsOn) {
        this.syncFieldState(field, field.source.hidden);
        continue;
      }
      const parentField = this.fields.find((c) => c.id === field.dependsOn?.fieldId);
      const parentValue = parentField ? this.getFieldControl(parentField.key)?.value : null;
      this.syncFieldState(field, String(parentValue ?? '') !== field.dependsOn.triggerValue);
    }
    const pasaporteControl = this.form.get('val_pasaporte');
    if (this.isPasaporteSelected) {
      pasaporteControl?.setValidators([Validators.required]);
    } else {
      pasaporteControl?.clearValidators();
      pasaporteControl?.reset('', { emitEvent: false });
    }
    pasaporteControl?.updateValueAndValidity({ emitEvent: false });
  }

  private syncFieldState(field: FieldConfig, hidden: boolean): void {
    field.hidden = hidden;
    const control = this.getFieldControl(field.key);
    if (hidden) {
      control.disable({ emitEvent: false });
      if (field.controlType !== 'coordinates' && field.controlType !== 'schedule')
        control.reset('', { emitEvent: false });
    } else {
      control.enable({ emitEvent: false });
    }
    control.setValidators(this.buildValidators(field, hidden));
    control.updateValueAndValidity({ emitEvent: false });
  }

  private toFieldConfig(pregunta: Pregunta): FieldConfig {
    return {
      id: pregunta.id,
      key: pregunta.nombre,
      label: pregunta.pregunta,
      order: pregunta.orden,
      controlType: this.resolveControlType(pregunta),
      section: this.resolveSection(pregunta),
      placeholder: typeof pregunta.ayuda === 'string' ? pregunta.ayuda : '',
      required: pregunta.obligatorio,
      readonly: false,
      hidden: pregunta.hidden,
      maxLength: typeof pregunta.num_caracter === 'number' ? pregunta.num_caracter : null,
      options: pregunta.catalogos ?? [],
      employeeList: pregunta.listado_empleado ?? [],
      scheduleItems: pregunta.jornada_laboral_item ?? [],
      dependsOn: pregunta.atributo_id
        ? {
            fieldId: String(pregunta.atributo_id),
            triggerValue: String(pregunta.item_catalogo_id ?? ''),
          }
        : undefined,
      integrations: {
        sri: pregunta.is_ws_sri,
        civil: pregunta.is_ws_civil,
        iess: pregunta.is_ws_iess ?? false,
      },
      source: pregunta,
    };
  }

  private resolveControlType(pregunta: Pregunta): FieldConfig['controlType'] {
    if (pregunta.nombre === 'val_lati' || pregunta.nombre === 'val_long') return 'coordinates';
    if (pregunta.tipo_respuesta === 'Selección Simple') return 'select';
    if (pregunta.tipo_respuesta === 'Selección Mutiple') return 'schedule';
    if (pregunta.is_text_area) return 'textarea';
    return 'text';
  }

  private resolveSection(pregunta: Pregunta): FieldSectionId {
    const n = pregunta.nombre;
    if (n === 'val_ct_tipo_op' || n === 'val_ruc_op' || n === 'val_ced_op' || n === 'val_pasaporte')
      return 'identificacion';
    if (n === 'val_lati' || n === 'val_long') return 'ubicacion';
    if (n === 'val_jor_la') return 'horario';
    if (n === 'val_obs') return 'observaciones';
    if (n.includes('motivo')) return 'operador';
    if (n.startsWith('val_ct_') && n !== 'val_ct_tipo_op') return 'contacto';
    return 'operador';
  }

  private isMotivoField(field: FieldConfig): boolean {
    return (
      field.key?.toLowerCase().includes('motivo') || field.label?.toLowerCase().includes('motivo')
    );
  }

  // ── Helpers UI ───────────────────────────────────────────────────────────

  private alertToast(icon: 'success' | 'warning' | 'error', text: string): void {
    Swal.fire({
      icon,
      text,
      confirmButtonColor: this.COLOR_PRIMARIO,
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
    });
  }
}
