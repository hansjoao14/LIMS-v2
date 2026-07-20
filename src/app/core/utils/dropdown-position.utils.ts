// Los contenedores de tabla en este proyecto usan overflow-x-auto, lo que
// recorta también el eje vertical (comportamiento estándar del navegador) —
// para las últimas filas el menú contextual debe abrirse hacia arriba en vez
// de hacia abajo para no quedar cortado por ese borde.
export function abrirMenuHaciaArriba(index: number, total: number): boolean {
  return total > 2 && index >= total - 2;
}
