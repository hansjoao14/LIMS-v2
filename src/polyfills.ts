/*
 * pdfjs-dist 6 usa Promise.try(callback, ...args). Algunos Chromium todavía
 * no implementan esa API de ES2025: la página 1 alcanza a mostrarse, pero al
 * pedir la página siguiente el canal del worker lanza un TypeError y deja el
 * RenderTask pendiente. Cargar esta compatibilidad antes de Angular/pdf.js
 * mantiene el mismo comportamiento de la API nativa.
 */

export {};

declare global {
  interface PromiseConstructor {
    try<T, TArgs extends unknown[]>(
      callback: (...args: TArgs) => T | PromiseLike<T>,
      ...args: TArgs
    ): Promise<T>;
  }
}

if (typeof Promise.try !== 'function') {
  Object.defineProperty(Promise, 'try', {
    configurable: true,
    writable: true,
    value<T, TArgs extends unknown[]>(
      callback: (...args: TArgs) => T | PromiseLike<T>,
      ...args: TArgs
    ): Promise<T> {
      return new Promise<T>((resolve) => resolve(callback(...args)));
    },
  });
}
