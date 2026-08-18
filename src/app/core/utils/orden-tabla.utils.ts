/**
 * Ordenamiento por columna para los listados que se sirven de las colecciones
 * GraphQL de api-reportes.
 *
 * El `orderBy` de esas colecciones acepta un único campo con dirección, y el
 * enum del esquema es `ASC` / `DESC` en MAYÚSCULAS: mandar `"desc"` falla con
 * "got invalid value". Por eso la dirección se tipa acá y no se escribe suelta
 * en cada componente.
 *
 * No hay soporte para ordenar por varios campos a la vez, así que al hacer clic
 * en una columna se reemplaza el orden anterior en vez de acumularse.
 */
export type DireccionOrden = 'ASC' | 'DESC';

/** Lo que espera el `orderBy` de la colección: un solo campo. */
export type OrdenTabla<C extends string> = Record<C, DireccionOrden>;

export interface EstadoOrden<C extends string> {
  campo: C;
  direccion: DireccionOrden;
}

/**
 * Calcula el nuevo estado al hacer clic en un encabezado.
 *
 * Si se repite la columna, invierte la dirección. Si es otra, arranca en `ASC`,
 * que es lo que espera el usuario al ordenar por primera vez por un texto o un
 * número. La excepción son las fechas: ahí lo útil es ver primero lo más
 * reciente, así que arrancan en `DESC`.
 */
export function alternarOrden<C extends string>(
  actual: EstadoOrden<C>,
  campo: C,
  camposFecha: readonly C[] = [],
): EstadoOrden<C> {
  if (actual.campo === campo) {
    return { campo, direccion: actual.direccion === 'ASC' ? 'DESC' : 'ASC' };
  }
  return { campo, direccion: camposFecha.includes(campo) ? 'DESC' : 'ASC' };
}

/** Indicador para el encabezado: ▲ / ▼ en la columna activa, vacío en el resto. */
export function iconoOrden<C extends string>(actual: EstadoOrden<C>, campo: C): string {
  if (actual.campo !== campo) return '';
  return actual.direccion === 'ASC' ? '▲' : '▼';
}
