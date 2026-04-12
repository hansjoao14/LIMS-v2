import { CommonModule } from '@angular/common';
import { AfterViewChecked, Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import * as L from 'leaflet';

import {
  FieldConfig,
  FieldSectionConfig,
  FieldSectionId,
  FormularioLaboratorio,
  Pregunta,
} from './model/solicitud-trabajo.model';
import { SolicitudService } from './service/solicitud-trabajo-service';
import { AuthService } from '../auth/service/auth-service';
import { ToastrAlertService } from '../../services/toastr.service';
import { cedulaEcuatoriana, rucEcuatoriano } from '../../core/utils/ecuador-id.validators';

type MotivoFlujo = '' | 'seguimiento' | 'denuncia' | 'licenciamiento';

@Component({
  selector: 'app-solicitud-trabajo',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './solicitud-trabajo.html',
  styleUrls: ['./solicitud-trabajo.css'],
})
export class SolicitudTrabajo implements OnInit, AfterViewChecked, OnDestroy {
  form: FormGroup;
  formulario: FormularioLaboratorio | null = null;
  fields: FieldConfig[] = [];
  loading = true;

  currentStep = 0;
  showMapModal = false;
  showTerminosModal = false;
  showConfidencialidadModal = false;

  readonly stepLabels = [
    'Entidad y técnico',
    'Formulario',
    'Catálogo',
    'Confirmación',
  ];

  entidadesMock = [
    { id: 'ENT-001', nombre: 'Secretaría de Ambiente' },
    { id: 'ENT-002', nombre: 'Dirección Metropolitana' },
    { id: 'ENT-003', nombre: 'Unidad Técnica Ambiental' },
  ];

  tecnicosMock = [
    { id: 'TEC-001', entidadId: 'ENT-001', nombre: 'Juan Pérez', cargo: 'Analista Ambiental' },
    { id: 'TEC-002', entidadId: 'ENT-001', nombre: 'María López', cargo: 'Técnico de Laboratorio' },
    { id: 'TEC-003', entidadId: 'ENT-002', nombre: 'Carlos Ruiz', cargo: 'Inspector Ambiental' },
    { id: 'TEC-004', entidadId: 'ENT-003', nombre: 'Ana Torres', cargo: 'Coordinadora Técnica' },
  ];

  tecnicosFiltrados: Array<{
    id: string;
    entidadId: string;
    nombre: string;
    cargo: string;
  }> = [];

  selectedEntidadNombre = '';
  selectedTecnicoNombre = '';

  readonly sections: FieldSectionConfig[] = [
    {
      id: 'identificacion',
      title: 'Identificación',
      description: 'Define el tipo de identificación y habilita los campos relacionados.',
    },
    {
      id: 'operador',
      title: 'Información del operador',
      description: 'Datos principales del operador que solicita el servicio.',
    },
    {
      id: 'ubicacion',
      title: 'Ubicación',
      description: 'Coordenadas geográficas capturadas desde el mapa.',
    },
    {
      id: 'horario',
      title: 'Jornadas laborales',
      description: 'Disponibilidad horaria del operador según el formulario.',
    },
    {
      id: 'contacto',
      title: 'Contacto del caso',
      description: 'Información adicional para denuncias o seguimiento.',
    },
    {
      id: 'observaciones',
      title: 'Observaciones',
      description: 'Comentarios finales antes del envío.',
    },
  ];

  readonly terminosCondiciones = [
    'Los ensayos marcados con (*) no están incluidos en el Alcance de Acreditación del SAE.',
    'Los resultados serán entregados en 15 días calendario a partir de realizada la toma de muestra para Ensayos Físico-Químico para Aguas Residuales y Superficiales y para Ensayos de Muestreo para Aguas Superficiales.',
    'Los resultados serán entregados en 10 días calendario a partir de realizada la toma de muestra para Ensayos Físico–Químicos de Emisiones Gaseosas de Fuentes Fijas a la Atmósfera y para Ensayos para Acústica Ambiental.',
    'Los resultados obtenidos podrán utilizarse para elaboración de informes técnicos cuando requiera la Secretaría de Ambiente.',
    'Los resultados de la red de monitoreo del recurso hídrico serán entregados hasta los primeros 15 días del siguiente mes del monitoreo.',
    'Si el plazo establecido para la entrega de los resultados coincide con fin de semana o feriado, los mismos se entregarán al siguiente día hábil.',
    'En caso de que el cliente tenga algún reclamo o queja respecto los servicios brindados por IAM-Q, podrá emitir la misma al laboratorio IAM-Q siguiendo lo dispuesto en el procedimiento PG/IAM-Q/11 Quejas.',
  ];

  readonly acuerdoConfidencialidad = `OBJETO.-
El presente acuerdo tiene por objeto establecer con el cliente, la manera en la que el laboratorio IAM-Q maneja la información obtenida o creada durante la realización de sus actividades, en el servicio solicitado por el cliente.

El laboratorio IAM-Q al ser parte de una entidad del sector público, está obligado a acatar las disposiciones establecidas en la Ley Orgánica de Transparencia y Acceso a La Información, con respecto a la información obtenida o creada durante la realización de sus actividades.

Además, cuando el laboratorio sea requerido por ley o autorizado por las disposiciones contractuales, para revelar información confidencial, notificará mediante memorando u oficio al cliente o a la persona interesada la información proporcionada, salvo que esté prohibido por ley.`;

  selectedScheduleIndexes = new Set<number>();
  savedElaboradoPor = '';
  fechaSolicitud = '';
  readonly numeroSolicitud = 'ST-' + new Date().getFullYear() + '-001';

  catalogoServicios = [
    {
      matriz: 'AGUA',
      collapsed: false,
      servicios: [
        { nombre: 'AGUAS SUPERFICIALES', aplicable: 'NÚMERO DE MUESTRAS', activo: false, cantidad: null as number | null },
        { nombre: 'AGUAS RESIDUALES', aplicable: 'NÚMERO DE MUESTRAS', activo: false, cantidad: null as number | null },
      ],
    },
    {
      matriz: 'AIRE',
      collapsed: false,
      servicios: [
        { nombre: 'FUENTES FIJAS DE COMBUSTIÓN', aplicable: 'NÚMERO DE FUENTES', activo: false, cantidad: null as number | null },
      ],
    },
    {
      matriz: 'RUIDO',
      collapsed: false,
      servicios: [
        { nombre: 'RUIDO AMBIENTE', aplicable: 'NÚMERO DE PUNTOS CRÍTICOS DE AFECTACIÓN', activo: false, cantidad: null as number | null },
      ],
    },
  ];

  ensayosMuestreo = [
    {
      activo: false,
      producto: 'AGUAS SUPERFICIALES',
      parametro: 'SÓLIDOS SUSPENDIDOS TOTALES',
      metodoInterno: 'PEE/IAM-Q/42',
      metodoReferencia: 'NTE INEN ISO 5667-1 | UNE EN ISO 5667-6 | UNE EN ISO 5667-14',
    },
  ];

  ensayosResiduales = [
    { activo: false, ensayo: 'DEMANDA QUÍMICA DE OXÍGENO', identificacion: 'DQO', metodoInterno: 'PEE/IAM-Q/03', metodoReferencia: 'APHA 5220 C', unidad: 'mg/L', naturaleza: 'Laboratorio' },
    { activo: false, ensayo: 'SÓLIDOS SUSPENDIDOS TOTALES', identificacion: 'SST', metodoInterno: 'PEE/IAM-Q/02', metodoReferencia: 'APHA 2540 D', unidad: 'mg/L', naturaleza: 'Laboratorio' },
  ];

  ensayosAire = [
    { activo: false, ensayo: 'MONÓXIDO DE CARBONO', identificacion: 'CO', metodoInterno: 'PEE/IAM-Q/07', metodoReferencia: 'EPA CTM-030', unidad: 'ppm / mg/Nm³*' },
    { activo: false, ensayo: 'DIÓXIDO DE AZUFRE', identificacion: 'SO2', metodoInterno: 'PEE/IAM-Q/07', metodoReferencia: 'EPA CTM-030', unidad: 'ppm / mg/Nm³*' },
  ];

  ensayosRuido = [
    { activo: false, ensayo: 'RUIDO AMBIENTAL', identificacion: '---', metodoInterno: 'PEE/IAM-Q/11', metodoReferencia: 'ANEXO 5 AM 097A | ISO 1996-2:2017', unidad: 'dB' },
  ];

  ruidoInfo = {
    tipoUsoSueloOperador: '',
    tipoUsoSueloPCA: '',
    direccionPCA: '',
    telefonoPCA: '',
  };

  readonly notasAgua = [
    'Los ensayos marcados con (*) no están incluidos en el Alcance de Acreditación del SAE.',
    'Las muestras serán descartadas del laboratorio en 28 días calendario después de recibidas.',
    'Los resultados serán entregados en 15 días calendario a partir del ingreso de las muestras al Laboratorio IAM-Q.',
    'Los resultados obtenidos podrán utilizarse para elaboración de informes técnicos cuando requiera la Secretaría de Ambiente.',
  ];

  readonly notasAire = [
    'Los ensayos marcados con (*) no están incluidos en el Alcance de Acreditación del SAE.',
    'Los resultados serán entregados en 10 días calendario después de realizado el monitoreo.',
    'Los resultados obtenidos podrán utilizarse para la elaboración de Informes Técnicos cuando requiera la Secretaría de Ambiente.',
  ];

  readonly notasRuido = [
    'Los ensayos marcados con (*) no están incluidos en el Alcance de Acreditación del SAE.',
    'Los resultados serán entregados en 10 días calendario después de realizado el monitoreo.',
    'Los resultados obtenidos podrán utilizarse para la elaboración de Informes Técnicos cuando requiera la Secretaría de Ambiente.',
  ];

  private map: L.Map | null = null;
  private marker: L.Marker | null = null;
  private destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private service: SolicitudService,
    private authService: AuthService,
    private zone: NgZone,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrAlertService,
  ) {
    this.form = this.fb.group({
      entidad_id: this.fb.control('', Validators.required),
      tecnico_id: this.fb.control('', Validators.required),

      jefatura_display: this.fb.control({ value: '', disabled: true }),
      solicitado_por: this.fb.control({ value: '', disabled: true }),
      cargo_usuario: this.fb.control({ value: '', disabled: true }),

      motivo_flujo: this.fb.control<MotivoFlujo>('', Validators.required),
      val_pasaporte: this.fb.control(''),
    });
  }

  ngOnInit(): void {
    this.setupStepOneLogic();

    const idTipoFormulario = this.route.snapshot.paramMap.get('idTipoFrmulario') || '380';

    this.service.getFormulario(idTipoFormulario)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (formulario) => {
          this.formulario = formulario;
          this.fields = formulario.preguntas
            .filter((pregunta) => pregunta.estado !== false)
            .map((pregunta) => this.toFieldConfig(pregunta));

          this.generateControls();
          this.setUserDataFallback();
          this.applyDependencyLogic();
          this.loading = false;
        },
        error: (err) => {
          console.error('Error al cargar formulario', err);
          this.loading = false;
          this.toastr.showError('No se pudo cargar el formulario', 'Error');
        },
      });
  }

  ngAfterViewChecked(): void {
    if (this.showMapModal && !this.map) {
      this.initMap();
    }
  }

  get formularioTitulo(): string {
    return this.formulario?.tipo_formulario ?? 'Solicitud de trabajo - Ensayos';
  }

  get isPasaporteSelected(): boolean {
    const tipoField = this.fields.find((f) => f.key === 'val_ct_tipo');
    if (!tipoField) return false;
    const selectedId = this.getFieldControl('val_ct_tipo')?.value;
    return tipoField.options.some(
      (opt) => String(opt.id) === String(selectedId) && opt.nombre?.toLowerCase().includes('pasaporte'),
    );
  }

  get isStepOneReady(): boolean {
    return !!this.form.get('entidad_id')?.value && !!this.form.get('tecnico_id')?.value;
  }

  get motivoFlujo(): MotivoFlujo {
    return (this.form.get('motivo_flujo')?.value || '') as MotivoFlujo;
  }

  getFieldControl(key: string): FormControl {
    return this.form.get(key) as FormControl;
  }

  getSectionFields(sectionId: FieldSectionId): FieldConfig[] {
    return this.fields.filter(
      (field) => field.section === sectionId && !field.hidden && !this.isMotivoField(field),
    );
  }

  getMotivoBaseFields(): FieldConfig[] {
    return this.fields.filter(
      (field) => !field.hidden && this.isMotivoField(field) && !this.isMotivoSpecificField(field),
    );
  }

  getMotivoSpecificFields(flow: MotivoFlujo): FieldConfig[] {
    if (!flow) return [];
    return this.fields.filter(
      (field) => !field.hidden && this.matchesMotivoFlow(field, flow),
    );
  }

  getFieldRows(field: FieldConfig): number {
    return field.key === 'val_obs' ? 4 : 3;
  }

  getFieldInputType(field: FieldConfig): string {
    const key = field.key.toLowerCase();
    if (key.includes('ruc') || key.includes('ced') || key.includes('num')) return 'tel';
    return 'text';
  }

  getFieldHint(field: FieldConfig): string | null {
    const integrations = [];
    if (field.integrations.sri) integrations.push('Consulta SRI');
    if (field.integrations.civil) integrations.push('Registro civil');
    if (field.integrations.iess) integrations.push('Consulta IESS');

    if (integrations.length > 0) return integrations.join(' | ');
    if (field.maxLength) return `Max ${field.maxLength} caracteres`;
    return null;
  }

  isFieldInvalid(field: FieldConfig): boolean {
    const control = this.getFieldControl(field.key);
    return control.invalid && (control.touched || control.dirty);
  }

  getFieldError(field: FieldConfig): string | null {
    const control = this.getFieldControl(field.key);

    if (!this.isFieldInvalid(field)) return null;
    if (control.hasError('required')) return 'Este campo es obligatorio.';
    if (control.hasError('maxlength')) return `Máximo ${field.maxLength} caracteres.`;
    if (control.hasError('cedulaInvalida')) return control.getError('cedulaInvalida');
    if (control.hasError('rucInvalido')) return control.getError('rucInvalido');
    return 'Revise el valor ingresado.';
  }

  getCharacterCount(field: FieldConfig): number {
    const value = this.getFieldControl(field.key)?.value;
    return typeof value === 'string' ? value.length : 0;
  }

  toggleScheduleItem(index: number): void {
    if (this.selectedScheduleIndexes.has(index)) {
      this.selectedScheduleIndexes.delete(index);
    } else {
      this.selectedScheduleIndexes.add(index);
    }
  }

  isScheduleSelected(index: number): boolean {
    return this.selectedScheduleIndexes.has(index);
  }

  goToStep(step: number): void {
    if (step < 0 || step > 3) return;

    if (step === 1 && !this.isStepOneReady) {
      this.form.get('entidad_id')?.markAsTouched();
      this.form.get('tecnico_id')?.markAsTouched();
      return;
    }

    if (step > this.currentStep + 1) return;
    this.currentStep = step;
  }

  goNextStep(): void {
    if (this.currentStep === 0) {
      if (!this.isStepOneReady) {
        this.form.get('entidad_id')?.markAsTouched();
        this.form.get('tecnico_id')?.markAsTouched();
        return;
      }
      this.currentStep = 1;
      return;
    }

    if (this.currentStep === 1) {
      this.submit();
      return;
    }

    if (this.currentStep === 2) {
      this.guardarCatalogo();
    }
  }

  goPrevStep(): void {
    if (this.currentStep > 0) this.currentStep--;
  }

  openMap(): void {
    this.showMapModal = true;
  }

  closeMap(): void {
    this.showMapModal = false;
    if (this.map) {
      this.map.remove();
      this.map = null;
    }
    this.marker = null;
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const payload = this.buildPayload();

    const entry = {
      ...payload,
      guardado_en: new Date().toISOString(),
      metadata_inicio: {
        entidad_id: this.form.get('entidad_id')?.value,
        entidad_nombre: this.selectedEntidadNombre,
        tecnico_id: this.form.get('tecnico_id')?.value,
        tecnico_nombre: this.selectedTecnicoNombre,
        cargo: this.form.getRawValue().cargo_usuario,
      },
    };

    this.service.saveSolicitud(entry).subscribe({
      next: () => {
        this.savedElaboradoPor = this.form.getRawValue().solicitado_por || 'Usuario';
        this.fechaSolicitud = new Date().toLocaleDateString('es-EC', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
        });

        this.toastr.showSuccess('Formulario guardado correctamente', 'Éxito');
        this.currentStep = 2;
      },
      error: (err) => {
        console.error('Error al guardar formulario', err);
        this.toastr.showError('No se pudo guardar el formulario', 'Error');
      },
    });
  }

  guardarCatalogo(): void {
    this.currentStep = 3;
    this.showTerminosModal = true;
  }

  aceptarTerminos(): void {
    this.showTerminosModal = false;
    this.showConfidencialidadModal = true;
  }

  aceptarConfidencialidad(): void {
    this.showConfidencialidadModal = false;
    this.ejecutarGuardado();
  }

  toggleEnsayoMuestreo(idx: number): void {
    this.ensayosMuestreo[idx].activo = !this.ensayosMuestreo[idx].activo;
  }

  toggleEnsayoResidual(idx: number): void {
    this.ensayosResiduales[idx].activo = !this.ensayosResiduales[idx].activo;
  }

  toggleEnsayoAire(idx: number): void {
    this.ensayosAire[idx].activo = !this.ensayosAire[idx].activo;
  }

  toggleEnsayoRuido(idx: number): void {
    this.ensayosRuido[idx].activo = !this.ensayosRuido[idx].activo;
  }

  toggleMatrizCollapse(idx: number): void {
    this.catalogoServicios[idx].collapsed = !this.catalogoServicios[idx].collapsed;
  }

  toggleServicio(matrizIdx: number, servicioIdx: number): void {
    const servicio = this.catalogoServicios[matrizIdx].servicios[servicioIdx];
    servicio.activo = !servicio.activo;
    if (!servicio.activo) servicio.cantidad = null;
  }

  private ejecutarGuardado(): void {
    const existing = this.service.getSolicitudLocal<any>() || {};

    existing.catalogo_servicios = this.catalogoServicios.flatMap((g) =>
      g.servicios
        .filter((s) => s.activo)
        .map((s) => ({
          matriz: g.matriz,
          servicio: s.nombre,
          aplicable: s.aplicable,
          cantidad: s.cantidad,
        })),
    );

    existing.ensayos = {
      agua_muestreo: this.ensayosMuestreo.filter((f) => f.activo),
      agua_residuales: this.ensayosResiduales.filter((f) => f.activo),
      aire: this.ensayosAire.filter((f) => f.activo),
      ruido: this.ensayosRuido.filter((f) => f.activo),
    };

    existing.ruido_info = this.ruidoInfo;

    existing.acuerdos = {
      terminos_aceptados: true,
      confidencialidad_aceptada: true,
      fecha_aceptacion: new Date().toISOString(),
    };

    existing.metadata = {
      numero_solicitud: this.numeroSolicitud,
      fecha_solicitud: this.fechaSolicitud,
      elaborado_por: this.savedElaboradoPor,
    };

    this.service.saveSolicitud(existing).subscribe({
      next: () => {
        this.toastr.showSuccess('Solicitud guardada correctamente', 'Éxito');
        this.router.navigate(['/lista-solicitudes']);
      },
      error: (err) => {
        console.error('Error al guardar solicitud', err);
        this.toastr.showError('No se pudo guardar la solicitud', 'Error');
      },
    });
  }

  private setupStepOneLogic(): void {
    this.form.get('entidad_id')?.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((entidadId: string) => {
        this.tecnicosFiltrados = this.tecnicosMock.filter((t) => t.entidadId === entidadId);

        const entidad = this.entidadesMock.find((e) => e.id === entidadId);
        this.selectedEntidadNombre = entidad?.nombre || '';

        this.form.patchValue(
          {
            tecnico_id: '',
            solicitado_por: '',
            cargo_usuario: '',
            jefatura_display: this.selectedEntidadNombre,
          },
          { emitEvent: false },
        );

        this.selectedTecnicoNombre = '';
      });

    this.form.get('tecnico_id')?.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((tecnicoId: string) => {
        const tecnico = this.tecnicosMock.find((t) => t.id === tecnicoId);

        this.selectedTecnicoNombre = tecnico?.nombre || '';

        this.form.patchValue(
          {
            solicitado_por: tecnico?.nombre || '',
            cargo_usuario: tecnico?.cargo || '',
          },
          { emitEvent: false },
        );
      });
  }

  private setUserDataFallback(): void {
    const user = this.authService.getCurrentUser();
    if (!user) return;

    if (!this.form.getRawValue().solicitado_por) {
      this.form.patchValue({ solicitado_por: user.name || 'Usuario' });
    }

    if (!this.form.getRawValue().cargo_usuario) {
      this.form.patchValue({ cargo_usuario: user.cargo || 'N/A' });
    }

    if (!this.form.getRawValue().jefatura_display) {
      this.form.patchValue({ jefatura_display: user.jefatura || 'N/A' });
    }
  }

  private generateControls(): void {
    for (const field of this.fields) {
      if (this.form.contains(field.key)) continue;
      this.form.addControl(field.key, this.fb.control('', this.buildValidators(field, field.hidden)));
    }
  }

  private buildValidators(field: FieldConfig, isHidden: boolean): ValidatorFn[] {
    if (field.controlType === 'schedule') return [];

    const validators: ValidatorFn[] = [];

    if (!isHidden && field.required && !field.readonly) {
      validators.push(Validators.required);
    }

    if (field.maxLength) {
      validators.push(Validators.maxLength(field.maxLength));
    }

    if (!isHidden) {
      if (field.key === 'val_ced_op' || field.key === 'val_ct_ced') validators.push(cedulaEcuatoriana());
      if (field.key === 'val_ruc_op') validators.push(rucEcuatoriano());
    }

    return validators;
  }

  private applyDependencyLogic(): void {
    this.updateDependentFields();

    this.form.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.updateDependentFields();
    });
  }

  private updateDependentFields(): void {
    for (const field of this.fields) {
      if (!field.dependsOn) {
        this.syncFieldState(field, field.source.hidden);
        continue;
      }

      const parentField = this.fields.find((candidate) => candidate.id === field.dependsOn?.fieldId);
      const parentValue = parentField ? this.getFieldControl(parentField.key)?.value : null;
      const isVisible = String(parentValue ?? '') === field.dependsOn.triggerValue;

      this.syncFieldState(field, !isVisible);
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
    control.setValidators(this.buildValidators(field, hidden));

    if (hidden && field.controlType !== 'coordinates' && field.controlType !== 'schedule') {
      control.reset('', { emitEvent: false });
    }

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
      readonly: pregunta.readonly,
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
    if (pregunta.nombre === 'val_obs' || (typeof pregunta.num_caracter === 'number' && pregunta.num_caracter > 200)) {
      return 'textarea';
    }
    return 'text';
  }

  private resolveSection(pregunta: Pregunta): FieldSectionId {
    if (pregunta.nombre === 'val_ct_tipo') return 'identificacion';
    if (pregunta.nombre === 'val_lati' || pregunta.nombre === 'val_long') return 'ubicacion';
    if (pregunta.nombre === 'val_jor_la') return 'horario';
    if (pregunta.nombre === 'val_obs') return 'observaciones';
    if (pregunta.nombre.startsWith('val_ct_')) return 'contacto';
    return 'operador';
  }

  private isMotivoField(field: FieldConfig): boolean {
    const key = field.key?.toLowerCase() || '';
    const label = field.label?.toLowerCase() || '';
    return key.includes('motivo') || label.includes('motivo');
  }

  private isMotivoSpecificField(field: FieldConfig): boolean {
    const text = `${field.key} ${field.label}`.toLowerCase();
    return text.includes('seguimiento') || text.includes('denuncia') || text.includes('licenciamiento');
  }

  private matchesMotivoFlow(field: FieldConfig, flow: MotivoFlujo): boolean {
    const text = `${field.key} ${field.label}`.toLowerCase();
    return text.includes(flow);
  }

  private initMap(): void {
    this.zone.runOutsideAngular(() => {
      const latControl = this.getFieldControl('val_lati');
      const longControl = this.getFieldControl('val_long');

      const lat = Number(latControl?.value) || -0.1807;
      const lng = Number(longControl?.value) || -78.4678;

      this.map = L.map('map-container').setView([lat, lng], 14);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(this.map);
      this.marker = L.marker([lat, lng], { draggable: true }).addTo(this.map);

      this.marker.on('dragend', () => {
        const position = this.marker?.getLatLng();
        if (position) this.updateCoords(position.lat, position.lng);
      });

      this.map.on('click', (event: L.LeafletMouseEvent) => {
        this.marker?.setLatLng(event.latlng);
        this.updateCoords(event.latlng.lat, event.latlng.lng);
      });

      setTimeout(() => this.map?.invalidateSize(), 250);
    });
  }

  private updateCoords(lat: number, lng: number): void {
    this.zone.run(() => {
      this.form.patchValue({
        val_lati: lat.toFixed(6),
        val_long: lng.toFixed(6),
      });
    });
  }

  private buildPayload() {
    const answers = this.fields
      .filter((field) => !field.hidden && field.controlType !== 'schedule')
      .map((field) => ({
        pregunta_id: field.id,
        nombre: field.key,
        valor: this.normalizeValue(this.getFieldControl(field.key)),
      }));

    const scheduleField = this.fields.find((field) => field.controlType === 'schedule');
    const selectedJornadas = (scheduleField?.scheduleItems ?? []).filter((_, i) =>
      this.selectedScheduleIndexes.has(i),
    );

    return {
      formulario_id: this.formulario?.formulario_id ?? null,
      tipo_formulario_id: this.formulario?.tipo_formulario_id ?? null,
      datos_solicitante: this.form.getRawValue(),
      respuestas: answers,
      jornadas_laborales: selectedJornadas,
    };
  }

  private normalizeValue(control: AbstractControl | null) {
    const value = control?.value;
    return typeof value === 'string' ? value.trim() : value;
  }

  ngOnDestroy(): void {
    this.closeMap();
    this.destroy$.next();
    this.destroy$.complete();
  }
}