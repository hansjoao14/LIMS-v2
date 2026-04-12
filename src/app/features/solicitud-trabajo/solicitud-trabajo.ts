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
import { ActivatedRoute, Router } from '@angular/router'; // <-- AÑADIDO: ActivatedRoute
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
  showMapModal = false;
  showCatalogo = false;
  showTerminosModal = false;
  showConfidencialidadModal = false;

  readonly terminosCondiciones = [
    'Los ensayos marcados con (*) no están incluidos en el Alcance de Acreditación del SAE.',
    'Los resultados serán entregados en 15 días calendario a partir de realizada la toma de muestra para Ensayos Físico-Químico para Aguas Residuales y Superficiales y para Ensayos de Muestreo para Aguas Superficiales.',
    'Los resultados serán entregados en 10 días calendario a partir de realizada la toma de muestra para Ensayos Físico–Químicos de Emisiones Gaseosas de Fuentes Fijas a la Atmósfera y para Ensayos para Acústica Ambiental.',
    'Los resultados obtenidos podrán utilizarse para elaboración de informes técnicos cuando requiera la Secretaría de Ambiente.',
    'Los resultados de la red de monitoreo del recurso hídrico serán entregados hasta los primeros 15 días del siguiente mes del monitoreo.',
    'Si el plazo establecido para la entrega de los resultados coincide con fin de semana o feriado, los mismos se entregarán al siguiente día hábil.',
    'En caso de que el cliente tenga algún reclamo o queja respecto los servicios brindados por IAM-Q, podrá emitir la misma al laboratorio IAM-Q siguiendo lo dispuesto en el procedimiento PG/IAM-Q/11 Quejas. El mismo es difundido al cliente y además está disponible en el formulario DC-MC-05 Encuesta de Servicios IAM-Q y en las instalaciones del Laboratorio IAM-Q para cuando cualquier parte interesada lo solicite.',
  ];

  readonly acuerdoConfidencialidad = `OBJETO.-
El presente acuerdo tiene por objeto establecer con el cliente, la manera en la que el laboratorio IAM-Q maneja la información obtenida o creada durante la realización de sus actividades, en el servicio solicitado por el cliente.

El laboratorio IAM-Q al ser parte de una entidad del sector público, está obligado a acatar las disposiciones establecidas en la Ley Orgánica de Transparencia y Acceso a La Información, con respecto a la información obtenida o creada durante la realización de sus actividades. La misma que establece:

5. Información Confidencial: Información o documentación, en cualquier formato, final o preparatoria, haya sido o no generada por el sujeto obligado, derivada de los derechos personalísimos y fundamentales, y requiere expresa autorización de su titular para su divulgación, que contiene datos que al revelarse, pudiesen dañar los siguientes intereses privados: a) El derecho a la privacidad, incluyendo privacidad relacionada a la vida, la salud o la seguridad, así como el derecho al honor y la propia imagen; b) Los datos personales cuya difusión requiera el consentimiento de sus titulares y deberán ser tratados según lo dispuesto en la Ley Orgánica de Protección de Datos Personales; c) Los intereses comerciales y económicos legítimos; y, d) Las patentes, derechos de autor y secretos comerciales. (Congreso Nacional del Ecuador, 2023:7)

6. Información Pública: Todo tipo de dato en documentos de cualquier formato, final o preparatoria, haya sido o no generada por el sujeto obligado, que se encuentre en poder de los sujetos obligados por esta Ley, contenidos, creados u obtenidos por ellos, que se encuentren bajo su responsabilidad y custodio o que se hayan producido con recursos del Estado. (Congreso Nacional del Ecuador, 2023:7)

7. Información Reservada: Información o documentación, final o preparatoria, haya sido o no generada por el sujeto obligado, que requiere de forma excepcional limitación en su conocimiento y distribución, de acuerdo a los criterios expresamente establecidos en la ley, y siempre que no sea posible su publicidad bajo un procedimiento de disociación, por existir un riesgo claro, probable y específico de daño a intereses públicos conforme a los requisitos contemplados en esta Ley. No existirá reserva de información en los casos expresamente establecidos en la Constitución de la República del Ecuador y la ley. (Congreso Nacional del Ecuador, 2023:7)

Artículo 32.- Solicitud y Contenido. La solicitud de información puede ser presentada por medio físico o electrónico y deberá contener lo siguiente: 1. Identificación de la persona solicitante; 2. Información de contacto para recibir notificaciones; 3. Descripción precisa de la información solicitada; y, 4. El solicitante deberá especificar en su petición, el tipo de formato físico o digital, en el que desea que se le haga la entrega de la información solicitada. (Congreso Nacional del Ecuador, 2023:25)

De igual manera, la información acerca de la cliente obtenida de fuentes diferentes al cliente seguirá lo dispuesto por la Ley Orgánica de Transparencia y Acceso a La Información.

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
    { activo: false, producto: 'AGUAS SUPERFICIALES', parametro: 'SÓLIDOS SUSPENDIDOS TOTALES', metodoInterno: 'PEE/IAM-Q/42', metodoReferencia: 'NTE INEN ISO 5667-1 | UNE EN ISO 5667-6 | UNE EN ISO 5667-14' },
  ];

  ensayosResiduales = [
    { activo: false, ensayo: 'DEMANDA QUÍMICA DE OXÍGENO', identificacion: 'DQO', metodoInterno: 'PEE/IAM-Q/03', metodoReferencia: 'APHA 5220 C', unidad: 'mg/L', naturaleza: 'Laboratorio' },
    { activo: false, ensayo: 'SÓLIDOS SUSPENDIDOS TOTALES', identificacion: 'SST', metodoInterno: 'PEE/IAM-Q/02', metodoReferencia: 'APHA 2540 D', unidad: 'mg/L', naturaleza: 'Laboratorio' },
    { activo: false, ensayo: 'SÓLIDOS TOTALES*', identificacion: 'ST', metodoInterno: '', metodoReferencia: 'APHA 2540 B', unidad: 'mg/L', naturaleza: 'Laboratorio' },
    { activo: false, ensayo: 'SÓLIDOS DISUELTOS TOTALES*', identificacion: 'STD', metodoInterno: 'PEE/IAM-Q/14', metodoReferencia: 'APHA 2540 C', unidad: 'mg/L', naturaleza: 'Laboratorio' },
    { activo: false, ensayo: 'SÓLIDOS SEDIMENTABLES*', identificacion: 'SS', metodoInterno: '', metodoReferencia: 'APHA 2540 F', unidad: 'ml/L', naturaleza: 'Laboratorio' },
    { activo: false, ensayo: 'CONDUCTIVIDAD ELÉCTRICA*', identificacion: 'CE', metodoInterno: 'PEE/IAM-Q/15', metodoReferencia: 'APHA 2510', unidad: 'Us/cm', naturaleza: 'In situ' },
    { activo: false, ensayo: 'COLOR*', identificacion: 'C', metodoInterno: '', metodoReferencia: 'APHA 2120', unidad: 'Unit Pt-Co', naturaleza: 'Laboratorio' },
    { activo: false, ensayo: 'TEMPERATURA', identificacion: 'T', metodoInterno: 'PEE/IAM-Q/04', metodoReferencia: 'APHA 2550 B', unidad: '°C', naturaleza: 'In situ' },
    { activo: false, ensayo: 'SULFATOS', identificacion: 'SO42-', metodoInterno: 'PEE/IAM-Q/06', metodoReferencia: 'HACH 8051', unidad: 'mg/L', naturaleza: 'Laboratorio' },
    { activo: false, ensayo: 'ACEITES Y GRASAS', identificacion: '-', metodoInterno: 'PEE/IAM-Q/05', metodoReferencia: 'EPA METHOD 1664', unidad: 'mg/L', naturaleza: 'Laboratorio' },
    { activo: false, ensayo: 'TURBIDEZ*', identificacion: '-', metodoInterno: 'PEE/IAM-Q/31', metodoReferencia: 'SM 2130 B', unidad: 'mg/L', naturaleza: 'Laboratorio' },
    { activo: false, ensayo: 'OXÍGENO DISUELTO*', identificacion: 'O', metodoInterno: 'PEE/IAM-Q/44', metodoReferencia: 'SM 4500-O H', unidad: 'mg/L', naturaleza: 'In situ' },
    { activo: false, ensayo: 'NITRITOS*', identificacion: 'NO2-', metodoInterno: '', metodoReferencia: 'APHA 4110 B', unidad: 'mg/L', naturaleza: 'Laboratorio' },
    { activo: false, ensayo: 'NITRATOS*', identificacion: 'NO3-', metodoInterno: '', metodoReferencia: 'APHA 4110 B', unidad: 'mg/L', naturaleza: 'Laboratorio' },
    { activo: false, ensayo: 'SURFACTANTES ANIÓNICOS*', identificacion: 'MBAS', metodoInterno: 'PEE/IAM-Q/46', metodoReferencia: 'TNTplus 874', unidad: 'mg/L', naturaleza: 'Laboratorio' },
  ];

  ensayosAire = [
    { activo: false, ensayo: 'MONÓXIDO DE CARBONO', identificacion: 'CO', metodoInterno: 'PEE/IAM-Q/07', metodoReferencia: 'EPA CTM-030', unidad: 'ppm / mg/Nm³*' },
    { activo: false, ensayo: 'DIÓXIDO DE AZUFRE', identificacion: 'SO2', metodoInterno: 'PEE/IAM-Q/07', metodoReferencia: 'EPA CTM-030', unidad: 'ppm / mg/Nm³*' },
    { activo: false, ensayo: 'ÓXIDOS DE NITRÓGENO', identificacion: 'NOx', metodoInterno: 'PEE/IAM-Q/07', metodoReferencia: 'EPA CTM-030', unidad: 'ppm / mg/Nm³*' },
    { activo: false, ensayo: 'OXÍGENO', identificacion: 'O2', metodoInterno: 'PEE/IAM-Q/07', metodoReferencia: 'EPA CTM-030', unidad: 'ppm / mg/Nm³*' },
    { activo: false, ensayo: 'MATERIAL PARTICULADO*', identificacion: 'MP', metodoInterno: 'PEE/IAM-Q/14', metodoReferencia: 'EPA 60, Apéndice A, Método 5', unidad: 'ppm / mg/Nm³*' },
  ];

  ensayosRuido = [
    { activo: false, ensayo: 'RUIDO AMBIENTAL', identificacion: '---', metodoInterno: 'PEE/IAM-Q/11', metodoReferencia: 'ANEXO 5 AM 097A | ISO 1996-2:2017', unidad: 'dB' },
  ];

  ruidoInfo = {
    tipoUsoSueloOperador: '',
    tipoUsoSueloPCA: '',
    ruidoDiurno: '',
    ruidoNocturno: '',
    direccionPCA: '',
    telefonoPCA: '',
  };

  readonly notasAgua = [
    'Los ensayos marcados con (*) no están incluidos en el Alcance de Acreditación del SAE.',
    'Las muestras serán descartadas del laboratorio en 28 días calendario después de recibidas.',
    'Los resultados serán entregados en 15 días calendario a partir del ingreso de las muestras al Laboratorio IAM-Q.',
    'Los resultados obtenidos podrán utilizarse para elaboración de informes técnicos cuando requiera la Secretaría de Ambiente.',
    'Los resultados de la red de monitoreo del recurso hídrico serán entregados hasta los primeros 15 días del siguiente mes del monitoreo.',
    'Si el plazo establecido para la entrega de los resultados coincide con fin de semana o feriado, los mismos se entregarán al siguiente día hábil.',
  ];

  readonly notasAire = [
    'Los ensayos marcados con (*) no están incluidos en el Alcance de Acreditación del SAE.',
    'Los resultados serán entregados en 10 días calendario después de realizado el monitoreo.',
    'Los resultados obtenidos podrán utilizarse para la elaboración de Informes Técnicos cuando requiera la Secretaría de Ambiente.',
    'Si el plazo establecido para la entrega de los resultados coincide con fin de semana o feriado, los mismos se entregarán al siguiente día hábil.',
  ];

  readonly notasRuido = [
    'Los ensayos marcados con (*) no están incluidos en el Alcance de Acreditación del SAE.',
    'Los resultados serán entregados en 10 días calendario después de realizado el monitoreo.',
    'Los resultados obtenidos podrán utilizarse para la elaboración de Informes Técnicos cuando requiera la Secretaría de Ambiente.',
    'Si el plazo establecido para la entrega de los resultados coincide con fin de semana o feriado, los mismos se entregarán al siguiente día hábil.',
  ];

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
      description: 'Comentarios finales antes del envío a la API.',
    },
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
    private route: ActivatedRoute, // <-- AÑADIDO: Para leer el ID de la URL
    private toastr: ToastrAlertService,
  ) {
    this.form = this.fb.group({
      jefatura_display: this.fb.control({ value: '', disabled: true }),
      solicitado_por: this.fb.control({ value: '', disabled: true }),
      cargo_usuario: this.fb.control({ value: '', disabled: true }),
      val_pasaporte: this.fb.control(''),
    });
  }

  ngOnInit() {
    // <-- AÑADIDO: Obtenemos el ID de la ruta (o usamos 1 por defecto para pruebas si no hay ruta aún)
    const idTipoFormulario = this.route.snapshot.paramMap.get('idTipoFrmulario') || '380'; 

    this.service
      .getFormulario(idTipoFormulario) // <-- AÑADIDO: Le pasamos el ID al servicio modificado
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (formulario) => {
          this.formulario = formulario;
          this.fields = formulario.preguntas
            .filter((pregunta) => pregunta.estado !== false)
            .map((pregunta) => this.toFieldConfig(pregunta));

          this.generateControls();
          this.setUserDataFromLogin();
          this.applyDependencyLogic();
          this.loading = false;
        },
        error: (err) => {
          console.error('Error al cargar formulario', err);
          this.loading = false;
        },
      });
  }

  ngAfterViewChecked() {
    if (this.showMapModal && !this.map) {
      this.initMap();
    }
  }

  get formularioTitulo(): string {
    return this.formulario?.tipo_formulario ?? 'Solicitud de trabajo - Ensayos';
  }

  get sectionsWithVisibleFields() {
    return this.sections.filter((section) => this.getVisibleFields(section.id).length > 0);
  }

  get isPasaporteSelected(): boolean {
    const tipoField = this.fields.find((f) => f.key === 'val_ct_tipo');
    if (!tipoField) return false;
    const selectedId = this.getFieldControl('val_ct_tipo')?.value;
    return tipoField.options.some(
      (opt) => String(opt.id) === String(selectedId) && opt.nombre?.toLowerCase().includes('pasaporte'),
    );
  }

  getFieldControl(key: string): FormControl {
    return this.form.get(key) as FormControl;
  }

  getVisibleFields(sectionId: FieldSectionId): FieldConfig[] {
    return this.fields.filter((field) => field.section === sectionId && !field.hidden);
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

    if (integrations.length > 0) {
      return integrations.join(' | ');
    }

    if (field.maxLength) {
      return `Max ${field.maxLength} caracteres`;
    }

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

  toggleScheduleItem(index: number) {
    if (this.selectedScheduleIndexes.has(index)) {
      this.selectedScheduleIndexes.delete(index);
    } else {
      this.selectedScheduleIndexes.add(index);
    }
  }

  isScheduleSelected(index: number): boolean {
    return this.selectedScheduleIndexes.has(index);
  }

  openMap() {
    this.showMapModal = true;
  }

  closeMap() {
    this.showMapModal = false;
    if (this.map) {
      this.map.remove();
      this.map = null;
    }
    this.marker = null;
  }

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const payload = this.buildPayload();
    const entry = {
      ...payload,
      guardado_en: new Date().toISOString(),
    };

    localStorage.setItem('lims_solicitud_payload', JSON.stringify(entry));
    this.toastr.showSuccess('Solicitud guardada correctamente', 'Éxito');
    console.log('Solicitud guardada en localStorage:', entry);

    this.savedElaboradoPor = this.form.getRawValue().solicitado_por || 'Usuario';
    this.fechaSolicitud = new Date().toLocaleDateString('es-EC', {
      day: '2-digit', month: '2-digit', year: 'numeric',
    });
    this.showCatalogo = true;
  }

  regresarAlFormulario() {
    this.showCatalogo = false;
    this.form.reset();
    this.setUserDataFromLogin();
    this.selectedScheduleIndexes.clear();
    this.catalogoServicios.forEach(g => {
      g.collapsed = false;
      g.servicios.forEach(s => (s.activo = false));
    });
    this.ensayosMuestreo.forEach(f => (f.activo = false));
    this.ensayosResiduales.forEach(f => (f.activo = false));
    this.ensayosAire.forEach(f => (f.activo = false));
    this.ensayosRuido.forEach(f => (f.activo = false));
    this.ruidoInfo = { tipoUsoSueloOperador: '', tipoUsoSueloPCA: '', ruidoDiurno: '', ruidoNocturno: '', direccionPCA: '', telefonoPCA: '' };
    this.updateDependentFields();
  }

  toggleEnsayoMuestreo(idx: number) {
    this.ensayosMuestreo[idx].activo = !this.ensayosMuestreo[idx].activo;
  }

  toggleEnsayoResidual(idx: number) {
    this.ensayosResiduales[idx].activo = !this.ensayosResiduales[idx].activo;
  }

  toggleEnsayoAire(idx: number) {
    this.ensayosAire[idx].activo = !this.ensayosAire[idx].activo;
  }

  toggleEnsayoRuido(idx: number) {
    this.ensayosRuido[idx].activo = !this.ensayosRuido[idx].activo;
  }

  toggleMatrizCollapse(idx: number) {
    this.catalogoServicios[idx].collapsed = !this.catalogoServicios[idx].collapsed;
  }

  toggleServicio(matrizIdx: number, servicioIdx: number) {
    const servicio = this.catalogoServicios[matrizIdx].servicios[servicioIdx];
    servicio.activo = !servicio.activo;
    if (!servicio.activo) servicio.cantidad = null;
  }

  guardarCatalogo() {
    this.showTerminosModal = true;
  }

  aceptarTerminos() {
    this.showTerminosModal = false;
    this.showConfidencialidadModal = true;
  }

  aceptarConfidencialidad() {
    this.showConfidencialidadModal = false;
    this.ejecutarGuardado();
  }

  private ejecutarGuardado() {
    const existing = JSON.parse(localStorage.getItem('lims_solicitud_payload') || '{}');
    existing.catalogo_servicios = this.catalogoServicios.flatMap(g =>
      g.servicios
        .filter(s => s.activo)
        .map(s => ({ matriz: g.matriz, servicio: s.nombre, aplicable: s.aplicable, cantidad: s.cantidad })),
    );
    localStorage.setItem('lims_solicitud_payload', JSON.stringify(existing));
    this.toastr.showSuccess('Catálogo guardado correctamente', 'Éxito');
    this.router.navigate(['/lista-solicitudes']);
  }

  goBack() {
    this.router.navigate(['/lista-solicitudes']);
  }

  private setUserDataFromLogin() {
    const user = this.authService.getCurrentUser();
    if (!user) return;

    this.form.patchValue({
      jefatura_display: user.jefatura || 'N/A',
      solicitado_por: user.name || 'Usuario',
      cargo_usuario: user.cargo || 'N/A',
    });
  }

  private generateControls() {
    for (const field of this.fields) {
      if (this.form.contains(field.key)) continue;

      this.form.addControl(
        field.key,
        this.fb.control('', this.buildValidators(field, field.hidden)),
      );
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

  private applyDependencyLogic() {
    this.updateDependentFields();

    this.form.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.updateDependentFields();
    });
  }

  private updateDependentFields() {
    for (const field of this.fields) {
      if (!field.dependsOn) {
        this.syncFieldState(field, field.source.hidden);
        continue;
      }

      const parentField = this.fields.find(
        (candidate) => candidate.id === field.dependsOn?.fieldId,
      );
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

  private syncFieldState(field: FieldConfig, hidden: boolean) {
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
      placeholder: pregunta.ayuda ?? '',
      required: pregunta.obligatorio,
      readonly: pregunta.readonly,
      hidden: pregunta.hidden,
      maxLength: pregunta.num_caracter,
      options: pregunta.catalogos ?? [],
      scheduleItems: pregunta.jornada_laboral_item ?? [],
      dependsOn: pregunta.atributo_id
        ? {
            fieldId: pregunta.atributo_id,
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
    if (pregunta.nombre === 'val_obs' || (pregunta.num_caracter ?? 0) > 200) return 'textarea';
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

  private initMap() {
    this.zone.runOutsideAngular(() => {
      const latControl = this.getFieldControl('val_lati');
      const longControl = this.getFieldControl('val_long');

      const lat = Number(latControl.value) || -0.1807;
      const lng = Number(longControl.value) || -78.4678;

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

  private updateCoords(lat: number, lng: number) {
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

  ngOnDestroy() {
    this.closeMap();
    this.destroy$.next();
    this.destroy$.complete();
  }
}