import { CommonModule } from '@angular/common';
import { AfterViewChecked, Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
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

/**
 * Componente para la gestión de solicitudes de trabajo en el laboratorio.
 * Maneja formularios dinámicos con validaciones, dependencias entre campos,
 * integración con mapas y gestión de datos del usuario autenticado.
 *
 * @standalone
 * @component
 */

/**
 * Obtiene el control de formulario asociado a una clave específica.
 * @param key - La clave del campo en el formulario
 * @returns El FormControl correspondiente a la clave
 * @throws Si el control no existe en el formulario
 */

/**
 * Obtiene los campos visibles para una sección específica del formulario.
 * @param sectionId - El identificador de la sección
 * @returns Array de campos configurados que pertenecen a la sección y no están ocultos
 */

/**
 * Calcula el número de filas que debe tener un campo de texto según su tipo.
 * @param field - La configuración del campo
 * @returns Número de filas (4 para observaciones, 3 para otros)
 */

/**
 * Determina el tipo de input HTML basado en la clave del campo.
 * @param field - La configuración del campo
 * @returns Tipo de input ('tel' para números/RUC/cédulas, 'text' por defecto)
 */

/**
 * Genera el texto de ayuda o pista para un campo según sus integraciones y límites.
 * @param field - La configuración del campo
 * @returns Texto con servicios integrados o límite de caracteres, null si no aplica
 */

/**
 * Valida si un campo está inválido y ha sido tocado o modificado.
 * @param field - La configuración del campo
 * @returns true si el campo es inválido y ha sido interactuado
 */

/**
 * Obtiene el mensaje de error específico para un campo inválido.
 * @param field - La configuración del campo
 * @returns Mensaje de error descriptivo o null si no hay error
 */

/**
 * Cuenta los caracteres actuales en el valor de un campo.
 * @param field - La configuración del campo
 * @returns Número de caracteres ingresados
 */

/**
 * Abre el modal del mapa para captura de coordenadas geográficas.
 */

/**
 * Cierra el modal del mapa y limpia los recursos asociados.
 */

/**
 * Envía el formulario completo después de validar todos los campos requeridos.
 * Marca todos los campos como tocados si la validación falla.
 * Construye el payload y lo prepara para envío a la API.
 */

/**
 * Asigna los datos del usuario autenticado a los campos correspondientes del formulario.
 * @private
 */

/**
 * Genera dinámicamente los controles del formulario basados en los campos configurados.
 * Evita crear controles duplicados.
 * @private
 */

/**
 * Construye el conjunto de validadores para un campo específico.
 * @private
 * @param field - La configuración del campo
 * @param isHidden - Indica si el campo está oculto
 * @returns Array de validadores correspondientes
 */

/**
 * Aplica la lógica de dependencias entre campos y suscribe a cambios.
 * @private
 */

/**
 * Actualiza el estado de visibilidad y validación de campos dependientes.
 * @private
 */

/**
 * Sincroniza el estado de un campo (oculto, validadores, reset).
 * @private
 * @param field - La configuración del campo
 * @param hidden - Indica si el campo debe estar oculto
 */

/**
 * Convierte una pregunta del API a configuración de campo del formulario.
 * @private
 * @param pregunta - La pregunta del formulario del servidor
 * @returns Configuración de campo procesada
 */

/**
 * Resuelve el tipo de control más apropiado según las características de la pregunta.
 * @private
 * @param pregunta - La pregunta del servidor
 * @returns Tipo de control ('text', 'textarea', 'select', 'coordinates', 'schedule')
 */

/**
 * Determina la sección a la que pertenece una pregunta según su nombre.
 * @private
 * @param pregunta - La pregunta del servidor
 * @returns Identificador de la sección correspondiente
 */

/**
 * Inicializa el mapa interactivo usando Leaflet para captura de coordenadas.
 * Configura marcadores arrastrables y click para actualizar posición.
 * @private
 */

/**
 * Actualiza los valores de latitud y longitud en el formulario.
 * @private
 * @param lat - Latitud capturada
 * @param lng - Longitud capturada
 */

/**
 * Construye el objeto payload con los datos del formulario para enviar a la API.
 * @private
 * @returns Objeto con formulario_id, datos_solicitante, respuestas y jornadas_laborales
 */

/**
 * Normaliza el valor de un control removiendo espacios en blanco si es texto.
 * @private
 * @param control - El control del formulario
 * @returns Valor normalizado
 */

/**
 * Hook del ciclo de vida: Inicializa el componente cargando formulario y datos.
 */

/**
 * Hook del ciclo de vida: Verifica si debe inicializar el mapa cuando es visible.
 */

/**
 * Hook del ciclo de vida: Libera recursos y cancela suscripciones.
 */
@Component({
  selector: 'app-solicitud-trabajo',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
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
  selectedScheduleIndexes = new Set<number>();
  savedElaboradoPor = '';
  fechaSolicitud = '';
  readonly numeroSolicitud = 'ST-' + new Date().getFullYear() + '-001';

  catalogoServicios = [
    {
      matriz: 'AGUA',
      collapsed: false,
      servicios: [
        { nombre: 'AGUAS SUPERFICIALES', aplicable: 'NÚMERO DE MUESTRAS', activo: false },
        { nombre: 'AGUAS RESIDUALES', aplicable: 'NÚMERO DE MUESTRAS', activo: false },
      ],
    },
    {
      matriz: 'AIRE',
      collapsed: false,
      servicios: [
        { nombre: 'FUENTES FIJAS DE COMBUSTIÓN', aplicable: 'NÚMERO DE FUENTES', activo: false },
      ],
    },
    {
      matriz: 'RUIDO',
      collapsed: false,
      servicios: [
        { nombre: 'RUIDO AMBIENTE', aplicable: 'NÚMERO DE PUNTOS CRÍTICOS DE AFECTACIÓN', activo: false },
      ],
    },
  ];

  ensayosMuestreo = [
    { activo: false, producto: 'AGUAS SUPERFICIALES', parametro: 'SÓLIDOS SUSPENDIDOS TOTALES', metodoInterno: 'PEE/IAM-Q/42', metodoReferencia: 'NTE INEN ISO 5667-1 UNE EN ISO 5667-6 UNE EN ISO 5667-14' },
  ];

  ensayosResiduales = [
    { activo: false, ensayo: 'DEMANDA QUÍMICA DE OXÍGENO', identificacion: 'DQO', metodoInterno: 'PEE/IAM-Q/03', metodoReferencia: 'APHA 5220 C', unidad: 'mg/L' },
    { activo: false, ensayo: 'SÓLIDOS SUSPENDIDOS TOTALES', identificacion: 'SST', metodoInterno: 'PEE/IAM-Q/02', metodoReferencia: 'APHA 2540 D', unidad: 'mg/L' },
    { activo: false, ensayo: 'SÓLIDOS TOTALES*', identificacion: 'ST', metodoInterno: '', metodoReferencia: 'APHA 2540 B', unidad: 'mg/L' },
    { activo: false, ensayo: 'SÓLIDOS DISUELTOS TOTALES*', identificacion: 'STD', metodoInterno: 'PEE/IAM-Q/14', metodoReferencia: 'APHA 2540 C', unidad: 'mg/L' },
    { activo: false, ensayo: 'SÓLIDOS SEDIMENTABLES*', identificacion: 'SS', metodoInterno: '', metodoReferencia: 'APHA 2540 D', unidad: 'mL' },
    { activo: false, ensayo: 'CONDUCTIVIDAD ELÉCTRICA*', identificacion: 'CE', metodoInterno: 'PEE/IAM-Q/15', metodoReferencia: 'APHA 2540 D', unidad: 'Us/cm' },
    { activo: false, ensayo: 'COLOR*', identificacion: 'C', metodoInterno: '', metodoReferencia: 'APHA 2540 D', unidad: 'mg/L' },
    { activo: false, ensayo: 'TEMPERATURA', identificacion: 'T', metodoInterno: 'PEE/IAM-Q/04', metodoReferencia: 'APHA 2540 D', unidad: 'mg/L' },
    { activo: false, ensayo: 'SULFATOS', identificacion: 'SO42-', metodoInterno: 'PEE/IAM-Q/06', metodoReferencia: 'APHA 2540 D', unidad: 'mg/L' },
    { activo: false, ensayo: 'ACEITES Y GRASAS', identificacion: '-', metodoInterno: 'PEE/IAM-Q/05', metodoReferencia: 'APHA 2540 D', unidad: 'mg/L' },
    { activo: false, ensayo: 'TURBIDEZ*', identificacion: '-', metodoInterno: 'PEE/IAM-Q/31', metodoReferencia: 'APHA 2540 D', unidad: 'mg/L' },
    { activo: false, ensayo: 'OXÍGENO DISUELTO*', identificacion: 'O', metodoInterno: 'PEE/IAM-Q/44', metodoReferencia: 'APHA 2540 D', unidad: 'mg/L' },
    { activo: false, ensayo: 'NITRITOS*', identificacion: 'NO2-', metodoInterno: '', metodoReferencia: 'APHA 2540 D', unidad: 'mg/L' },
    { activo: false, ensayo: 'NITRATOS*', identificacion: 'NO3-', metodoInterno: '', metodoReferencia: 'APHA 2540 D', unidad: 'mg/L' },
    { activo: false, ensayo: 'SURFACTANTES ANIÓNICOS', identificacion: 'MBAS', metodoInterno: 'PEE/IAM-Q/46', metodoReferencia: 'APHA 2540 D', unidad: 'mg/L' },
  ];

  readonly notasRelevantes = [
    'Los ensayos marcados con (*) no están incluidos en el Alcance de Acreditación del SAE.',
    'Los resultados serán entregados en 10 días calendario después de realizado el monitoreo.',
    'Los resultados obtenidos podrán utilizarse para la elaboración de Informes Técnicos cuando requiera la Secretaría de Ambiente.',
    'Si el plazo establecido coincide con fin de semana o feriado, se entregarán al siguiente día hábil.',
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
    private toastr: ToastrAlertService,
  ) {
    this.form = this.fb.group({
      jefatura_display: this.fb.control({ value: '', disabled: true }),
      solicitado_por: this.fb.control({ value: '', disabled: true }),
      cargo_usuario: this.fb.control({ value: '', disabled: true }),
    });
  }

  ngOnInit() {
    this.service
      .getFormulario()
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
    this.updateDependentFields();
  }

  toggleEnsayoMuestreo(idx: number) {
    this.ensayosMuestreo[idx].activo = !this.ensayosMuestreo[idx].activo;
  }

  toggleEnsayoResidual(idx: number) {
    this.ensayosResiduales[idx].activo = !this.ensayosResiduales[idx].activo;
  }

  toggleMatrizCollapse(idx: number) {
    this.catalogoServicios[idx].collapsed = !this.catalogoServicios[idx].collapsed;
  }

  toggleServicio(matrizIdx: number, servicioIdx: number) {
    this.catalogoServicios[matrizIdx].servicios[servicioIdx].activo =
      !this.catalogoServicios[matrizIdx].servicios[servicioIdx].activo;
  }

  guardarCatalogo() {
    const existing = JSON.parse(localStorage.getItem('lims_solicitud_payload') || '{}');
    existing.catalogo_servicios = this.catalogoServicios.flatMap(g =>
      g.servicios
        .filter(s => s.activo)
        .map(s => ({ matriz: g.matriz, servicio: s.nombre, aplicable: s.aplicable })),
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
