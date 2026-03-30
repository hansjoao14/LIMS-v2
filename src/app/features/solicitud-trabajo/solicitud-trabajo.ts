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

    return 'Revise el valor ingresado.';
  }

  getCharacterCount(field: FieldConfig): number {
    const value = this.getFieldControl(field.key)?.value;
    return typeof value === 'string' ? value.length : 0;
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
    console.log('Solicitud lista para API:', payload);
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

      const parentField = this.fields.find((candidate) => candidate.id === field.dependsOn?.fieldId);
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

    return {
      formulario_id: this.formulario?.formulario_id ?? null,
      tipo_formulario_id: this.formulario?.tipo_formulario_id ?? null,
      datos_solicitante: this.form.getRawValue(),
      respuestas: answers,
      jornadas_laborales: scheduleField?.scheduleItems ?? [],
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
