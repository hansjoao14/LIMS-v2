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
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import * as L from 'leaflet';
import Swal from 'sweetalert2';

import {
  FieldConfig,
  FieldSectionId,
  FormularioLaboratorio,
  Pregunta,
} from './model/solicitud-trabajo.model';
import { SolicitudService } from './service/solicitud-trabajo-service';
import { AuthService } from '../auth/service/auth-service';
import { Step1SolicitudComponent } from './steps/step1-solicitud/step1-solicitud';
import { Step2OperadorComponent } from './steps/step2-operador/step2-operador';
import { Step3CatalogoComponent, MatrizConHijosUI } from './steps/step3-catalogo/step3-catalogo';
import { Step4ConfirmacionComponent } from './steps/step4-confirmacion/step4-confirmacion';

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
  form: FormGroup;
  formulario: FormularioLaboratorio | null = null;
  fields: FieldConfig[] = [];
  loading = true;
  currentStep = 1;

  buscandoIntegracion: { [key: string]: boolean } = {};
  showMapModal = false;
  showTerminosModal = false;
  showConfidencialidadModal = false;

  isGuardando = false;

  private map: L.Map | null = null;
  private marker: L.Marker | null = null;
  private destroy$ = new Subject<void>();

  readonly numeroSolicitudGenerado = 'ST-' + new Date().getFullYear() + '-001';
  fechaActual = new Date();
  readonly COLOR_PRIMARIO = '#1e3a8a';
  readonly STORAGE_KEY = 'lims_solicitudes_trabajo';

  entidadesMock = [
    { id: 'ENT-001', nombre: 'Secretaría de Ambiente' },
    { id: 'ENT-002', nombre: 'Dirección Metropolitana' },
    { id: 'ENT-003', nombre: 'Unidad Técnica Ambiental' },
  ];

  tecnicosMock = [
    { id: 'TEC-001', entidadId: 'ENT-001', nombre: 'Juan Pérez', cargo: 'Analista Ambiental' },
    { id: 'TEC-002', entidadId: 'ENT-001', nombre: 'María López', cargo: 'Técnico de Laboratorio' },
    { id: 'TEC-003', entidadId: 'ENT-002', nombre: 'Carlos Ruiz', cargo: 'Inspector Ambiental' },
  ];
  tecnicosFiltrados: any[] = [];
  selectedTecnicoNombre = 'Usuario';

  readonly terminosCondiciones = [
    'Los ensayos marcados con (*) no están incluidos en el Alcance de Acreditación del SAE.',
    'Los resultados serán entregados en 15 días calendario a partir de realizada la toma de muestra.',
    'Los resultados obtenidos podrán utilizarse para elaboración de informes técnicos.',
    'Si el plazo establecido coincide con fin de semana o feriado, se entregarán al siguiente día hábil.',
  ];

  readonly acuerdoConfidencialidad = `OBJETO.-\nEl presente acuerdo tiene por objeto establecer con el cliente, la manera en la que el laboratorio IAM-Q maneja la información obtenida o creada durante la realización de sus actividades.\n\nEl laboratorio IAM-Q al ser parte de una entidad del sector público, está obligado a acatar las disposiciones establecidas en la Ley Orgánica de Transparencia y Acceso a La Información.\n\nAdemás, cuando el laboratorio sea requerido por ley o autorizado por las disposiciones contractuales, para revelar información confidencial, notificará al cliente salvo que esté prohibido por ley.`;

  selectedScheduleIndexes = new Set<number>();

  ensayosMuestreo = [
    {
      activo: false,
      producto: 'AGUAS SUPERFICIALES',
      parametro: 'SÓLIDOS SUSPENDIDOS TOTALES',
      metodoInterno: 'PEE/IAM-Q/42',
      metodoReferencia: 'NTE INEN ISO 5667-1',
    },
  ];
  ensayosResiduales = [
    {
      activo: false,
      ensayo: 'DEMANDA QUÍMICA DE OXÍGENO',
      identificacion: 'DQO',
      metodoInterno: 'PEE/IAM-Q/03',
      metodoReferencia: 'APHA 5220 C',
      unidad: 'mg/L',
      naturaleza: 'Laboratorio',
    },
    {
      activo: false,
      ensayo: 'SÓLIDOS SUSPENDIDOS TOTALES',
      identificacion: 'SST',
      metodoInterno: 'PEE/IAM-Q/02',
      metodoReferencia: 'APHA 2540 D',
      unidad: 'mg/L',
      naturaleza: 'Laboratorio',
    },
    {
      activo: false,
      ensayo: 'CONDUCTIVIDAD ELÉCTRICA*',
      identificacion: 'CE',
      metodoInterno: 'PEE/IAM-Q/15',
      metodoReferencia: 'APHA 2510',
      unidad: 'Us/cm',
      naturaleza: 'In situ',
    },
    {
      activo: false,
      ensayo: 'TEMPERATURA',
      identificacion: 'T',
      metodoInterno: 'PEE/IAM-Q/04',
      metodoReferencia: 'APHA 2550 B',
      unidad: '°C',
      naturaleza: 'In situ',
    },
  ];
  ensayosAire = [
    {
      activo: false,
      ensayo: 'MONÓXIDO DE CARBONO',
      identificacion: 'CO',
      metodoInterno: 'PEE/IAM-Q/07',
      metodoReferencia: 'EPA CTM-030',
      unidad: 'ppm / mg/Nm³*',
    },
    {
      activo: false,
      ensayo: 'MATERIAL PARTICULADO*',
      identificacion: 'MP',
      metodoInterno: 'PEE/IAM-Q/14',
      metodoReferencia: 'EPA 60, Apéndice A, Método 5',
      unidad: 'ppm / mg/Nm³*',
    },
  ];
  ensayosRuido = [
    {
      activo: false,
      ensayo: 'RUIDO AMBIENTAL',
      identificacion: '---',
      metodoInterno: 'PEE/IAM-Q/11',
      metodoReferencia: 'ISO 1996-2:2017',
      unidad: 'dB',
    },
  ];

  ruidoInfo = { tipoUsoSueloOperador: '', tipoUsoSueloPCA: '', direccionPCA: '', telefonoPCA: '' };

  notasAgua = [
    'Los ensayos marcados con (*) no están incluidos en el Alcance de Acreditación del SAE.',
    'Las muestras serán descartadas del laboratorio en 28 días calendario.',
    'Los resultados serán entregados en 15 días calendario a partir del ingreso de las muestras.',
  ];
  notasAire = [
    'Los ensayos marcados con (*) no están incluidos en el Alcance de Acreditación del SAE.',
    'Los resultados serán entregados en 10 días calendario después de realizado el monitoreo.',
  ];
  notasRuido = [
    'Los ensayos marcados con (*) no están incluidos en el Alcance de Acreditación del SAE.',
    'Los resultados serán entregados en 10 días calendario después de realizado el monitoreo.',
  ];

  constructor(
    private fb: FormBuilder,
    private service: SolicitudService,
    private authService: AuthService,
    private zone: NgZone,
    private router: Router,
    private route: ActivatedRoute,
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

  ngOnInit(): void {
    this.setupStepOneLogic();
    const idTipoFormulario = this.route.snapshot.paramMap.get('idTipoFrmulario') || '380';
    this.service
      .getFormulario(idTipoFormulario)
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
        },
        error: () => {
          this.loading = false;
          Swal.fire('Error', 'No se pudo cargar el formulario dinámico', 'error');
        },
      });
  }

  ngAfterViewChecked(): void {
    if (this.showMapModal && !this.map) this.initMap();
  }

  private setupStepOneLogic(): void {
    this.form
      .get('entidad_id')
      ?.valueChanges.pipe(takeUntil(this.destroy$))
      .subscribe((entidadId: string) => {
        this.tecnicosFiltrados = this.tecnicosMock.filter((t) => t.entidadId === entidadId);
        this.form.patchValue({ tecnico_id: '', cargo_usuario: '' }, { emitEvent: false });
        this.selectedTecnicoNombre = 'Usuario';
      });

    this.form
      .get('tecnico_id')
      ?.valueChanges.pipe(takeUntil(this.destroy$))
      .subscribe((tecnicoId: string) => {
        const tecnico = this.tecnicosMock.find((t) => t.id === tecnicoId);
        this.selectedTecnicoNombre = tecnico?.nombre || 'Usuario';
        this.form.patchValue({ cargo_usuario: tecnico?.cargo || '' }, { emitEvent: false });
      });
  }

  get isStepOneReady(): boolean {
    return !!this.form.get('entidad_id')?.value && !!this.form.get('tecnico_id')?.value;
  }

  goToStep(step: number): void {
    if (step < 1 || step > 4) return;
    if (step > 1 && !this.isStepOneReady) {
      this.form.markAllAsTouched();
      Swal.fire({
        icon: 'warning',
        title: 'Atención',
        text: 'Complete los campos obligatorios de la cabecera',
        confirmButtonColor: this.COLOR_PRIMARIO,
      });
      return;
    }
    if (step > this.currentStep + 1) return;
    this.currentStep = step;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  goNextStep(): void {
    if (this.currentStep === 1) {
      if (!this.isStepOneReady) {
        this.form.markAllAsTouched();
        Swal.fire({
          icon: 'warning',
          title: 'Atención',
          text: 'Complete los campos obligatorios de la cabecera',
          confirmButtonColor: this.COLOR_PRIMARIO,
        });
        return;
      }
      this.currentStep = 2;
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (this.currentStep === 2) {
      if (this.form.invalid) {
        this.form.markAllAsTouched();
        const invalidFields = [];
        for (const name in this.form.controls) {
          if (this.form.controls[name].invalid) {
            const fieldConfig = this.fields.find((f) => f.key === name);
            if (fieldConfig && !fieldConfig.hidden) invalidFields.push(fieldConfig.label || name);
          }
        }
        const mensajeError =
          invalidFields.length > 0
            ? 'Faltan: ' + invalidFields.join(', ')
            : 'Revise los campos requeridos marcados en rojo.';
        Swal.fire({
          icon: 'warning',
          title: 'Complete los campos obligatorios',
          text: mensajeError,
          confirmButtonColor: this.COLOR_PRIMARIO,
        });
        return;
      }
      this.currentStep = 3;
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (this.currentStep === 3) {
      this.currentStep = 4;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  goPrevStep(): void {
    if (this.currentStep > 1) {
      this.currentStep--;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
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
      this.form.patchValue({ val_lati: lat.toFixed(6), val_long: lng.toFixed(6) });
    });
  }

  buscarDatosIntegracion(field: FieldConfig): void {
    const control = this.getFieldControl(field.key);
    if (!control.value) {
      Swal.fire({
        icon: 'warning',
        text: 'Ingrese un documento válido para buscar',
        confirmButtonColor: this.COLOR_PRIMARIO,
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
      });
      return;
    }
    this.buscandoIntegracion[field.key] = true;
    setTimeout(() => {
      this.buscandoIntegracion[field.key] = false;
      if (field.integrations.sri) {
        this.form.patchValue({
          val_razon_op: 'INDUSTRIA ANDINA S.A.',
          val_come_op: 'QUIMANDINA',
          val_dir_op: 'Av. Mariscal Sucre N75-270',
        });
        Swal.fire({
          icon: 'success',
          title: 'SRI',
          text: 'Datos recuperados',
          confirmButtonColor: this.COLOR_PRIMARIO,
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
        });
      } else if (field.integrations.civil) {
        this.form.patchValue({
          val_nom_op: 'JUAN',
          val_ape_op: 'PEREZ',
          val_dire_op: 'Av. Eloy Alfaro',
        });
        Swal.fire({
          icon: 'success',
          title: 'Registro Civil',
          text: 'Datos recuperados',
          confirmButtonColor: this.COLOR_PRIMARIO,
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
        });
      }
    }, 1500);
  }

  catalogosSeleccionados: MatrizConHijosUI[] = [];

  onStep3Next(data: MatrizConHijosUI[]): void {
    this.catalogosSeleccionados = data;
    this.goNextStep();
  }

  toggleScheduleItem(index: number): void {
    this.selectedScheduleIndexes.has(index)
      ? this.selectedScheduleIndexes.delete(index)
      : this.selectedScheduleIndexes.add(index);
  }

  iniciarAcuerdos(): void {
    this.showTerminosModal = true;
  }
  aceptarTerminos(): void {
    this.showTerminosModal = false;
    this.showConfidencialidadModal = true;
  }

  aceptarConfidencialidad(): void {
    this.isGuardando = true;
    const payload = this.buildPayload();
    try {
      const data = localStorage.getItem(this.STORAGE_KEY);
      const solicitudes = data ? JSON.parse(data) : [];
      solicitudes.push({ id_local: crypto.randomUUID(), ...payload });
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(solicitudes));
      this.isGuardando = false;
      this.showConfidencialidadModal = false;
      Swal.fire({
        title: '¡Guardado!',
        text: 'La Solicitud de Trabajo ha sido almacenada correctamente.',
        icon: 'success',
        confirmButtonColor: this.COLOR_PRIMARIO,
        timer: 2500,
      }).then(() => {
        this.router.navigate(['/lista-solicitudes']);
      });
    } catch (e) {
      this.isGuardando = false;
      Swal.fire('Error', 'No se pudo guardar la solicitud en localStorage', 'error');
    }
  }

  private buildPayload() {
    const rawValues = this.form.getRawValue();
    const answers = this.fields
      .filter((f) => !f.hidden && f.controlType !== 'schedule')
      .map((f) => ({
        pregunta_id: f.id,
        nombre: f.key,
        valor: rawValues[f.key],
      }));
    const scheduleField = this.fields.find((f) => f.controlType === 'schedule');
    const selectedJornadas = (scheduleField?.scheduleItems ?? []).filter((_, i) =>
      this.selectedScheduleIndexes.has(i),
    );
    const catalogosArray = this.catalogosSeleccionados.flatMap((g) =>
      g.hijos
        .filter((h) => h.activo)
        .map((h) => ({
          matriz: g.matriz.nombre,
          servicio: h.nombre,
          cantidad: h.cantidad,
        })),
    );
    return {
      formulario_id: this.formulario?.formulario_id ?? null,
      tipo_formulario_id: this.formulario?.tipo_formulario_id ?? null,
      cabecera: {
        entidad_id: rawValues.entidad_id,
        tecnico_id: rawValues.tecnico_id,
        numero_solicitud: rawValues.numero_solicitud,
      },
      datos_solicitante: rawValues,
      respuestas: answers,
      jornadas_laborales: selectedJornadas,
      catalogo_servicios: catalogosArray,
      ensayos: {
        agua_muestreo: this.ensayosMuestreo.filter((f) => f.activo),
        agua_residuales: this.ensayosResiduales.filter((f) => f.activo),
        aire: this.ensayosAire.filter((f) => f.activo),
        ruido: this.ensayosRuido.filter((f) => f.activo),
      },
      ruido_info: this.ruidoInfo,
      estado: 'GENERADA',
      fecha_creacion: new Date().toISOString(),
    };
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
    const selectedId = this.form.get(field.key)?.value;
    const opt = field.options.find((o) => String(o.id) === String(selectedId));
    const name = opt?.nombre?.toLowerCase() || '';
    if (name.includes('seguimiento')) return 'seguimiento';
    if (name.includes('denuncia')) return 'denuncia';
    if (name.includes('licenciamiento')) return 'licenciamiento';
    return '';
  }

  getFieldControl(key: string): FormControl {
    return this.form.get(key) as FormControl;
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
    if (
      pregunta.nombre === 'val_obs' ||
      (typeof pregunta.num_caracter === 'number' && pregunta.num_caracter > 200)
    )
      return 'textarea';
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
      (field.key?.toLowerCase() || '').includes('motivo') ||
      (field.label?.toLowerCase() || '').includes('motivo')
    );
  }

  ngOnDestroy(): void {
    this.closeMap();
    this.destroy$.next();
    this.destroy$.complete();
  }
}
