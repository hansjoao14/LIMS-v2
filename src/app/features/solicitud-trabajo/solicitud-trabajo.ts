import { CommonModule } from '@angular/common';
import { Component, NgZone, OnDestroy, OnInit, AfterViewChecked } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidatorFn,
  Validators,
  FormControl,
} from '@angular/forms';
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

  // ── Modo edición ─────────────────────────────────────────────────────────
  modoEdicion = false;

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
  selectedScheduleIndexes = new Set<number>();

  // ── Step 3: catálogos y ensayos ──────────────────────────────────────────
  catalogosSeleccionados: MatrizConHijosUI[] = [];
  ensayosAire: EnsayoLaboratorio[] = [];
  ensayosRuido: EnsayoLaboratorio[] = [];
  ensayosMuestreo: EnsayoMuestreo[] = [];
  ensayosResiduales: EnsayoLaboratorio[] = [];
  ruidoInfo = { tipoUsoSueloOperador: '', tipoUsoSueloPCA: '', direccionPCA: '', telefonoPCA: '' };
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
  readonly numeroSolicitudGenerado = 'ST-' + new Date().getFullYear() + '-001';
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
  ) {
    this.form = this.fb.group({
      entidad_id: ['', Validators.required],
      tecnico_id: ['', Validators.required],
      cargo_usuario: [{ value: '', disabled: true }],
      numero_solicitud: [
        { value: this.numeroSolicitudGenerado, disabled: true },
        Validators.required,
      ],
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
    }
    this.cargarFormularioDinamico();
  }

  ngAfterViewChecked(): void {
    if (this.showMapModal && !this.map) this.initMap();
  }

  ngOnDestroy(): void {
    this.closeMap();
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
                const guardados: JornadaItem[] = JSON.parse(v.valor_multiple);
                const field = this.fields.find((f) => f.key === key);
                if (field) {
                  for (const guardado of guardados) {
                    const idx = field.scheduleItems.findIndex(
                      (item) =>
                        item.fecha_plan === guardado.fecha_plan &&
                        item.inicio_bloque === guardado.inicio_bloque &&
                        item.fin_bloque === guardado.fin_bloque,
                    );
                    if (idx !== -1) this.selectedScheduleIndexes.add(idx);
                  }
                }
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

  get isStepOneReady(): boolean {
    return !!this.form.get('entidad_id')?.value && !!this.form.get('tecnico_id')?.value;
  }

  private async guardarValoresYAvanzar(): Promise<void> {
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
          valor_uuid: raw.tecnico_id ?? '',
        };
      });

    const camposSchedule: ValorSolicitudItem[] = this.fields
      .filter((f) => f.controlType === 'schedule')
      .map((f) => {
        const itemsSeleccionados = (f.scheduleItems ?? []).filter((_, i) =>
          this.selectedScheduleIndexes.has(i),
        );
        return {
          solicitud_id: this.solicitudRegistradaId,
          atributo_formulario_id: String(f.id),
          valor_texto: null,
          valor_numero: null,
          valor_fecha: null,
          valor_booleano: null,
          valor_multiple: itemsSeleccionados.length > 0 ? JSON.stringify(itemsSeleccionados) : null,
          valor_catalogo: 0,
          valor_uuid: raw.tecnico_id ?? '',
        };
      });

    const valorSolicitud = [...camposNormales, ...camposSchedule];
    const payload = { valorSolicitud };

    try {
      if (this.modoEdicion && this.solicitudRegistradaId) {
        await firstValueFrom(this.service.actualizarValoresSolicitud(this.solicitudRegistradaId, payload));
      } else {
        await firstValueFrom(this.service.guardarValoresSolicitud(payload));
      }
      this.zone.run(() => this.avanzarPaso());
    } catch (err: any) {
      const mensaje =
        err?.error?.message ?? err?.message ?? 'No se pudo guardar los valores de la solicitud';
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: mensaje,
        confirmButtonColor: this.COLOR_PRIMARIO,
      });
    }
  }

  // Finalizar solicitud: guardar ensayos y luego marcar solicitud como finalizada
  private async guardarEnsayosYAvanzar(catalogos: MatrizConHijosUI[]): Promise<void> {
    const solicitudEnsayo: SolicitudEnsayoItem[] = catalogos.flatMap((grupo) =>
      grupo.hijos
        .filter((h) => h.activo)
        .map((h) => ({
          solicitud_id: this.solicitudRegistradaId,
          ensayo_id: h.id,
          ctambiental_id: grupo.matriz.id,
        })),
    );

    const payload = { solicitudEnsayo };

    try {
      await firstValueFrom(this.service.guardarEnsayosSolicitud(payload));
      this.zone.run(() => this.avanzarPaso());
    } catch (err: any) {
      const mensaje =
        err?.error?.message ?? err?.message ?? 'No se pudo guardar los ensayos de la solicitud';
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: mensaje,
        confirmButtonColor: this.COLOR_PRIMARIO,
      });
    }
  }

  private async crearSolicitudYAvanzar(): Promise<void> {
    this.isCreandoSolicitud = true;
    const anio = new Date().getFullYear();
    const mes = new Date().getMonth() + 1;
    const raw = this.form.getRawValue();
    console.log(raw);


    try {
      const ejercicio = await this.periodoService.getEjercicioByAnio(anio);
      if (!ejercicio) throw new Error(`No hay ejercicio activo para el año ${anio}`);

      const periodo = await this.periodoService.getPeriodoByEjercicioAndMes(ejercicio.id, mes);
      if (!periodo) throw new Error(`No hay periodo activo para el mes ${mes}`);

      const payload: SolicitudPayload = {
        formulario_id: this.formulario?.formulario_id ?? null,
        usuario_id: raw.tecnico_id,
        entidad_id: raw.entidad_id,
        secuencial_id: null,
        ctestado_id: 2,
        periodo_id: periodo.id,
        descripcion: '',
        ejercicio_id: ejercicio.id,
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
        const mensaje = err?.error?.message ?? err?.message ?? 'No se pudo registrar la solicitud';
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: mensaje,
          confirmButtonColor: this.COLOR_PRIMARIO,
        });
      });
    }
  }

  // ── Navegación ───────────────────────────────────────────────────────────

  goToStep(step: number): void {
    if (step < 1 || step > 4) return;
    if (step > 1 && !this.isStepOneReady) {
      this.alertCamposObligatorios();
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
      this.guardarValoresYAvanzar();
      return;
    }
  }

  goPrevStep(): void {
    if (this.currentStep > 1) {
      this.currentStep--;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  onStep3Next(data: MatrizConHijosUI[]): void {
    this.catalogosSeleccionados = data;
    this.guardarEnsayosYAvanzar(data);
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

  toggleScheduleItem(index: number): void {
    this.selectedScheduleIndexes.has(index)
      ? this.selectedScheduleIndexes.delete(index)
      : this.selectedScheduleIndexes.add(index);
  }

  // ── Step 4: acuerdos y guardado ──────────────────────────────────────────

  iniciarAcuerdos(): void {
    this.showTerminosModal = true;
  }

  aceptarTerminos(): void {
    this.showTerminosModal = false;
    this.showConfidencialidadModal = true;
  }

  async aceptarConfidencialidad(): Promise<void> {
    this.isGuardando = true;
    try {
      const finRes = await firstValueFrom(
        this.service.finalizarSolicitud({
          idSolicitud: this.solicitudRegistradaId ?? '',
          identifcadorSecuecnial: 'SOLI_SECU_2025',
          ctestado: 3,
        }),
      );
      this.zone.run(() => {
        this.secuencialAsignado = finRes?.data?.[0]?.secuencialAsignado ?? null;
        this.showConfidencialidadModal = false;
        this.isGuardando = false;
      });
    } catch (err: any) {
      this.zone.run(() => {
        this.isGuardando = false;
        const mensaje = err?.error?.message ?? err?.message ?? 'No se pudo finalizar la solicitud';
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: mensaje,
          confirmButtonColor: this.COLOR_PRIMARIO,
        });
      });
    }
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
    const tipoField = this.fields.find((f) => f.key === 'val_ct_tipo');
    if (!tipoField) return false;
    const selectedId = this.getFieldControl('val_ct_tipo')?.value;
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
    if (n === 'val_ct_tipo' || n === 'val_ruc_op' || n === 'val_ced_op' || n === 'val_pasaporte')
      return 'identificacion';
    if (n === 'val_lati' || n === 'val_long') return 'ubicacion';
    if (n === 'val_jor_la') return 'horario';
    if (n === 'val_obs') return 'observaciones';
    if (n.includes('motivo')) return 'operador';
    if (n.startsWith('val_ct_') && n !== 'val_ct_tipo') return 'contacto';
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
