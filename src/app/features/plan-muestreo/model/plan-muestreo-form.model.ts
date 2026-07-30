import { DynamicFormConfig } from '../../../shared/dynamic-form';

/**
 * Configuración del formulario dinámico del Plan de Muestreo
 * (tipo_formulario_id 2019) para el motor de `shared/dynamic-form`: qué título,
 * layout y orden le toca a cada `grupo_texto`. El motor de agrupación, la
 * construcción de controles y el renderizado son compartidos; aquí solo queda
 * lo propio de este formulario.
 */
export const PLAN_MUESTREO_FORM_CONFIG: DynamicFormConfig = {
  grupos: {
    // Paso 2
    tipo_muestreo: { titulo: 'Tipo de Muestreo', layout: 'campos', orden: 10 },
    preservacion_de_las_muestras: {
      titulo: 'Preservación de las Muestras',
      layout: 'preservacion',
      orden: 30,
    },
    equipos: { titulo: 'Equipos', layout: 'campos', orden: 40 },
    materiales_para_muestreo: { titulo: 'Materiales para Muestreo', layout: 'toggles', orden: 50 },
    condiciones_momento_de_muestreo: {
      titulo: 'Condiciones Momento de Muestreo',
      layout: 'campos',
      orden: 60,
    },
    // Paso 3
    procedimiento_muestreo: {
      titulo: 'Procedimiento de Muestreo del Recurso Hídrico',
      layout: 'estatico',
      orden: 10,
    },
    equipamiento_de_seguridad_seccion: {
      titulo: 'Equipamiento de Seguridad',
      layout: 'campos',
      orden: 20,
    },
    soluciones_buffer_y_estandares: {
      titulo: 'Soluciones Buffer y Estándares',
      layout: 'toggles-2col',
      orden: 30,
    },
    observaciones: { titulo: 'Observaciones', layout: 'campos', orden: 40 },
  },

  // Tarjetas que no salen del formulario dinámico y se arman en la plantilla.
  gruposEstaticos: {
    3: ['procedimiento_muestreo'],
  },

  /**
   * Correcciones de agrupación sobre lo que devuelve la API: estos buffers y
   * estándares llegan con `grupo_texto` = condiciones_momento_de_muestreo (y uno
   * de ellos en la sección 2), pero en el formulario impreso pertenecen a
   * "Soluciones Buffer y Estándares" del paso 3.
   * TODO(backend): corregir la configuración en BD y borrar este mapa.
   */
  ajustesAgrupacion: {
    buffer_de_ph_10_cod_qc_14: { seccion: 3, grupo: 'soluciones_buffer_y_estandares' },
    buffer_ph_4_qc_17: { grupo: 'soluciones_buffer_y_estandares' },
    estandar_oxigeno_disuelto_0_mg_l_rv_42: { grupo: 'soluciones_buffer_y_estandares' },
    estandar_conductividad_1413_cod_rv_63: { grupo: 'soluciones_buffer_y_estandares' },
    estandar_conductividad_147_cod_rv_62: { grupo: 'soluciones_buffer_y_estandares' },
  },
};

/** Layout propio de este formulario: el motor lo delega a la plantilla del paso. */
export const LAYOUT_PRESERVACION = 'preservacion';

/** Los volúmenes de la tabla de preservación arrancan vacíos, no en cero. */
export const LAYOUTS_NUMERO_VACIO = [LAYOUT_PRESERVACION];

/** Alto de los textarea que lo necesitan; el resto usa el valor por defecto. */
export const FILAS_TEXTAREA: Record<string, number> = {
  observaciones: 4,
  equipamiento_de_seguridad: 4,
};

/**
 * Tipo de recipiente de cada preservación. La API todavía no lo devuelve, así
 * que la última columna de la tabla se completa con este mapa.
 * TODO(backend): exponerlo en el formulario dinámico y borrar esta constante.
 */
const TIPO_RECIPIENTE: Record<string, string> = {
  temperatura_0_6_c: 'Vidrio opaco',
  h2so4: 'Vidrio opaco',
  hno3: 'Vidrio opaco',
};

export function tipoRecipiente(key: string): string {
  return TIPO_RECIPIENTE[key] ?? '—';
}
