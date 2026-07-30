import { CatalogoItem, EmpleadoItem, JornadaItem, Pregunta } from '../../../shared/dynamic-form';

// El contrato de la API vive en shared/dynamic-form; aquí queda únicamente el
// modelo de presentación propio de la solicitud de trabajo.

export type FieldSectionId =
  'identificacion' | 'operador' | 'ubicacion' | 'horario' | 'contacto' | 'observaciones';

export type FieldControlType =
  'text' | 'textarea' | 'select' | 'employee-list' | 'coordinates' | 'schedule';

export interface FieldConfig {
  id: string;
  key: string;
  label: string;
  order: number;
  controlType: FieldControlType;
  section: FieldSectionId;
  placeholder: string;
  required: boolean;
  readonly: boolean;
  hidden: boolean;
  maxLength: number | null;
  options: CatalogoItem[];
  employeeList: EmpleadoItem[];
  scheduleItems: JornadaItem[];
  dependsOn?: {
    fieldId: string;
    triggerValue: string;
  };
  integrations: {
    sri: boolean;
    civil: boolean;
    iess: boolean;
  };
  source: Pregunta;
}
