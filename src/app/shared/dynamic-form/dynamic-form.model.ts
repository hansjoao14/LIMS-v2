import { CatalogoItem, Pregunta } from './dynamic-form.types';

/**
 * Motor de agrupación del formulario dinámico, compartido por los módulos que
 * renderizan un schema del backend en tarjetas.
 *
 * Las preguntas se reparten entre pasos por `seccion` y dentro de cada paso se
 * agrupan en tarjetas por `grupo_texto`. Todo lo que varía de un módulo a otro
 * — títulos, layouts, orden de las tarjetas, correcciones de agrupación — entra
 * por `DynamicFormConfig`; aquí no se quema nada de ningún feature.
 */

export type DynamicControlType = 'texto' | 'textarea' | 'numero' | 'select' | 'toggle';

/** Layouts que sabe renderizar `<app-dynamic-form-group>`. */
export type DynamicLayoutBase = 'campos' | 'toggles' | 'toggles-2col';

/**
 * Un módulo puede declarar layouts propios (una tabla, un bloque estático); el
 * componente de render los delega a la plantilla que le pase el feature.
 */
export type DynamicLayout = DynamicLayoutBase | (string & {});

export interface DynamicField {
  id: string;
  key: string; // nombre del control en el FormGroup
  label: string;
  orden: number;
  controlType: DynamicControlType;
  placeholder: string;
  required: boolean;
  readonly: boolean;
  opciones: CatalogoItem[];
  unidad: string; // sufijo de los contadores ("Horas", "Personas")
  // Oculto dinámicamente: se recalcula según el valor del campo del que depende.
  hidden: boolean;
  // Presente solo en campos dependientes: se muestran cuando el campo `fieldId`
  // toma el valor `triggerValue`. Deriva de `atributo_id` / `item_catalogo_id`.
  dependsOn?: {
    fieldId: string;
    triggerValue: string;
  };
  source: Pregunta;
}

export interface DynamicGroup {
  key: string; // grupo_texto
  titulo: string;
  layout: DynamicLayout;
  campos: DynamicField[];
}

export interface DynamicGroupDef {
  titulo: string;
  layout: DynamicLayout;
  orden: number;
}

export interface DynamicFormConfig {
  /**
   * Presentación de cada `grupo_texto`. Un grupo que no esté aquí igual se
   * renderiza: cae en el layout `campos` y su título se deriva de la clave.
   */
  grupos?: Record<string, DynamicGroupDef>;
  /** Tarjetas que no salen del schema y se arman en la plantilla del feature. */
  gruposEstaticos?: Record<number, string[]>;
  /**
   * Correcciones de agrupación sobre lo que devuelve la API, por `nombre` de
   * pregunta. Es un parche temporal por módulo: lo correcto es arreglar la
   * configuración en BD y vaciar este mapa.
   */
  ajustesAgrupacion?: Record<string, { seccion?: number; grupo?: string }>;
}

const ORDEN_POR_DEFECTO = 999;

function seccionDe(pregunta: Pregunta, config: DynamicFormConfig): number {
  return config.ajustesAgrupacion?.[pregunta.nombre]?.seccion ?? Number(pregunta.seccion);
}

// Una pregunta sin grupo se muestra en su propia tarjeta.
function grupoDe(pregunta: Pregunta, config: DynamicFormConfig): string {
  return (
    config.ajustesAgrupacion?.[pregunta.nombre]?.grupo ?? pregunta.grupo_texto ?? pregunta.nombre
  );
}

/**
 * Arma las tarjetas de un paso a partir de las preguntas del formulario
 * dinámico: filtra por `seccion`, agrupa por `grupo_texto` y ordena por
 * `orden`. Las preguntas sin `seccion` no pertenecen a ningún paso y se
 * descartan.
 */
export function construirGrupos(
  preguntas: Pregunta[],
  seccion: number,
  config: DynamicFormConfig = {},
): DynamicGroup[] {
  const defs = config.grupos ?? {};
  const porGrupo = new Map<string, DynamicField[]>();

  preguntas
    // Los campos dependientes llegan ocultos: se conservan para que la lógica de
    // dependencia los muestre cuando su campo padre tome el valor disparador.
    .filter(
      (p) =>
        p.estado !== false && (!p.hidden || !!p.atributo_id) && seccionDe(p, config) === seccion,
    )
    .sort((a, b) => a.orden - b.orden)
    .forEach((p) => {
      const key = grupoDe(p, config);
      const campos = porGrupo.get(key) ?? [];
      campos.push(toCampo(p));
      porGrupo.set(key, campos);
    });

  for (const key of config.gruposEstaticos?.[seccion] ?? []) {
    porGrupo.set(key, []);
  }

  return [...porGrupo.entries()]
    .map(([key, campos]) => ({
      key,
      titulo: defs[key]?.titulo ?? humanizar(key),
      layout: defs[key]?.layout ?? 'campos',
      campos,
    }))
    .sort(
      (a, b) =>
        (defs[a.key]?.orden ?? ORDEN_POR_DEFECTO) - (defs[b.key]?.orden ?? ORDEN_POR_DEFECTO),
    );
}

export function toCampo(pregunta: Pregunta): DynamicField {
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
    hidden: !!pregunta.hidden,
    dependsOn: pregunta.atributo_id
      ? {
          fieldId: String(pregunta.atributo_id),
          triggerValue: String(pregunta.item_catalogo_id ?? ''),
        }
      : undefined,
    source: pregunta,
  };
}

export function resolverControlType(pregunta: Pregunta): DynamicControlType {
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

export function humanizar(key: string): string {
  const texto = key
    .replace(/_seccion$/, '')
    .replace(/_/g, ' ')
    .trim();
  return texto.charAt(0).toUpperCase() + texto.slice(1);
}
