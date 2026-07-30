/**
 * Motor de formularios dinámicos compartido.
 *
 * Punto de entrada único: los módulos importan desde `shared/dynamic-form`, no
 * desde los archivos internos. Ver `docs/formularios-dinamicos-estandar.md`.
 */
export * from './dynamic-form.types';
export * from './dynamic-form.model';
export * from './dynamic-form.utils';
export { DynamicFormGroupComponent } from './dynamic-form-group/dynamic-form-group';
