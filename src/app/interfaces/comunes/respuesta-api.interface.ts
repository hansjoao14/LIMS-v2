/**
 * Sobre con el que un interceptor del backend envuelve todas las respuestas de
 * `api_solicitud`. Hay que sacar `data` o el consumidor recibe el sobre en vez
 * del contenido — y falla en silencio, porque el sobre también es un objeto
 * válido.
 */
export interface RespuestaApi<T> {
  message: string;
  success: boolean;
  data: T;
}
