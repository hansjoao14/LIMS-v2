import { CatalogoItem, Pregunta } from '../../solicitud-trabajo/model/solicitud-trabajo.model';

// Motor de renderizado del formulario dinámico del Plan de Muestreo
// (tipo_formulario_id 2019). Las preguntas se reparten entre los pasos por
// `seccion` y dentro de cada paso se agrupan en tarjetas por `grupo_texto`,
// ordenadas por `orden`.

export type PlanMuestreoControlType = 'texto' | 'textarea' | 'numero' | 'select' | 'toggle';

export interface PlanMuestreoCampo {
  id: string;
  key: string; // nombre del control en el FormGroup
  label: string;
  orden: number;
  controlType: PlanMuestreoControlType;
  placeholder: string;
  required: boolean;
  readonly: boolean;
  opciones: CatalogoItem[];
  unidad: string; // sufijo de los contadores ("Horas", "Personas")
  source: Pregunta;
}

export type PlanMuestreoLayout =
  | 'campos' // grid de 2 columnas con label + control
  | 'toggles' // lista de una columna con interruptor SÍ/NO
  | 'toggles-2col' // lo mismo en dos columnas
  | 'preservacion' // tabla preservación / volumen / recipiente
  | 'estatico'; // contenido fijo en la plantilla (no viene de la API)

export interface PlanMuestreoGrupo {
  key: string; // grupo_texto
  titulo: string;
  layout: PlanMuestreoLayout;
  campos: PlanMuestreoCampo[];
}

interface GrupoDef {
  titulo: string;
  layout: PlanMuestreoLayout;
  orden: number;
}

// Presentación de cada `grupo_texto`. Un grupo que no esté aquí igual se
// renderiza: cae en el layout `campos` y su título se deriva de la clave.
const GRUPOS: Record<string, GrupoDef> = {
  // Paso 2
  tipo_muestreo: { titulo: 'Tipo de Muestreo', layout: 'campos', orden: 10 },
  controles_calidad: { titulo: 'Controles de Calidad', layout: 'estatico', orden: 20 },
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
  notas: { titulo: 'Notas', layout: 'estatico', orden: 50 },
};

// Tarjetas que no salen del formulario dinámico y se arman en la plantilla.
const GRUPOS_ESTATICOS: Record<number, string[]> = {
  2: ['controles_calidad'],
  3: ['procedimiento_muestreo', 'notas'],
};

/**
 * Correcciones de agrupación sobre lo que devuelve la API: estos buffers y
 * estándares llegan con `grupo_texto` = condiciones_momento_de_muestreo (y uno
 * de ellos en la sección 2), pero en el formulario impreso pertenecen a
 * "Soluciones Buffer y Estándares" del paso 3.
 * TODO(backend): corregir la configuración en BD y borrar este mapa.
 */
const AJUSTES_AGRUPACION: Record<string, { seccion?: number; grupo?: string }> = {
  buffer_de_ph_10_cod_qc_14: { seccion: 3, grupo: 'soluciones_buffer_y_estandares' },
  buffer_ph_4_qc_17: { grupo: 'soluciones_buffer_y_estandares' },
  estandar_oxigeno_disuelto_0_mg_l_rv_42: { grupo: 'soluciones_buffer_y_estandares' },
  estandar_conductividad_1413_cod_rv_63: { grupo: 'soluciones_buffer_y_estandares' },
  estandar_conductividad_147_cod_rv_62: { grupo: 'soluciones_buffer_y_estandares' },
};

function seccionDe(pregunta: Pregunta): number {
  return AJUSTES_AGRUPACION[pregunta.nombre]?.seccion ?? Number(pregunta.seccion);
}

// Una pregunta sin grupo se muestra en su propia tarjeta.
function grupoDe(pregunta: Pregunta): string {
  return AJUSTES_AGRUPACION[pregunta.nombre]?.grupo ?? pregunta.grupo_texto ?? pregunta.nombre;
}

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

/**
 * Arma las tarjetas de un paso a partir de las preguntas del formulario
 * dinámico: filtra por `seccion`, agrupa por `grupo_texto` y ordena por
 * `orden`. Las preguntas sin `seccion` no pertenecen a ningún paso y se
 * descartan.
 */
export function construirGrupos(preguntas: Pregunta[], seccion: number): PlanMuestreoGrupo[] {
  const porGrupo = new Map<string, PlanMuestreoCampo[]>();

  preguntas
    .filter((p) => p.estado !== false && !p.hidden && seccionDe(p) === seccion)
    .sort((a, b) => a.orden - b.orden)
    .forEach((p) => {
      const key = grupoDe(p);
      const campos = porGrupo.get(key) ?? [];
      campos.push(toCampo(p));
      porGrupo.set(key, campos);
    });

  for (const key of GRUPOS_ESTATICOS[seccion] ?? []) {
    porGrupo.set(key, []);
  }

  return [...porGrupo.entries()]
    .map(([key, campos]) => ({
      key,
      titulo: GRUPOS[key]?.titulo ?? humanizar(key),
      layout: GRUPOS[key]?.layout ?? 'campos',
      campos,
    }))
    .sort((a, b) => (GRUPOS[a.key]?.orden ?? 999) - (GRUPOS[b.key]?.orden ?? 999));
}

function toCampo(pregunta: Pregunta): PlanMuestreoCampo {
  return {
    id: pregunta.id,
    key: pregunta.nombre,
    label: pregunta.pregunta,
    orden: pregunta.orden,
    controlType: resolverControlType(pregunta),
    placeholder: typeof pregunta.ayuda === 'string' ? pregunta.ayuda : '',
    required: !!pregunta.obligatorio,
    readonly: !!pregunta.readonly,
    opciones: pregunta.catalogos ?? [],
    unidad: resolverUnidad(pregunta),
    source: pregunta,
  };
}

function resolverControlType(pregunta: Pregunta): PlanMuestreoControlType {
  if (pregunta.tipo_respuesta === 'Boolean') return 'toggle';
  if (pregunta.tipo_respuesta === 'Selección Simple') return 'select';
  if (pregunta.is_text_area) return 'textarea';
  if (pregunta.tipo_respuesta === 'Numerico') return 'numero';
  return 'texto';
}

// La API no envía la unidad de los contadores, se deduce del nombre.
function resolverUnidad(pregunta: Pregunta): string {
  const nombre = pregunta.nombre.toLowerCase();
  if (nombre.includes('hora')) return 'Horas';
  if (nombre.includes('minuto')) return 'Minutos';
  if (nombre.includes('persona')) return 'Personas';
  return '';
}

function humanizar(key: string): string {
  const texto = key.replace(/_seccion$/, '').replace(/_/g, ' ').trim();
  return texto.charAt(0).toUpperCase() + texto.slice(1);
}
