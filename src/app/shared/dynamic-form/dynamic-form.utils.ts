import { FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { DynamicField, DynamicGroup } from './dynamic-form.model';

/**
 * Utilidades del formulario dinámico: construcción de controles, motor de
 * dependencias y serialización de respuestas. Compartidas por todos los módulos
 * que usan `construirGrupos`.
 */

export interface GenerarControlesOptions {
  /**
   * Layouts en los que un campo numérico arranca vacío en vez de en cero (una
   * tabla de volúmenes, por ejemplo). Los contadores ± siempre arrancan en 0.
   */
  numeroVacioEnLayouts?: string[];
  /**
   * Arranca los toggles (`tipo_respuesta: 'Boolean'`) en "Sí" en vez de "No".
   * Solo afecta a los controles nuevos: lo que el usuario ya respondió se
   * repuebla después con `patchValue` y siempre gana.
   */
  togglesActivosPorDefecto?: boolean;
}

/**
 * Agrega al FormGroup un control por cada campo de las tarjetas. Nunca recrea
 * el FormGroup: si el control ya existe se respeta su valor.
 */
export function generarControles(
  form: FormGroup,
  grupos: DynamicGroup[],
  options: GenerarControlesOptions = {},
): void {
  for (const grupo of grupos) {
    for (const campo of grupo.campos) {
      if (form.contains(campo.key)) continue;
      form.addControl(
        campo.key,
        new FormControl(
          { value: valorInicial(campo, grupo, options), disabled: campo.hidden },
          validadores(campo, campo.hidden),
        ),
      );
    }
  }
}

/**
 * Motor de dependencias del formulario dinámico (ver
 * docs/formularios-dinamicos-estandar.md, §6). Un campo con `dependsOn` se
 * muestra solo cuando su campo padre toma el `triggerValue`; al ocultarse se
 * deshabilita, se limpia y pierde sus validadores para no bloquear el guardado.
 * Se evalúa una vez al inicio y en cada cambio del formulario.
 */
export function aplicarDependencias(
  form: FormGroup,
  grupos: DynamicGroup[],
  destroy$: Subject<void>,
): void {
  const campos = camposDe(grupos);
  const actualizar = () => actualizarDependientes(form, campos);
  actualizar();
  form.valueChanges.pipe(takeUntil(destroy$)).subscribe(actualizar);
}

function actualizarDependientes(form: FormGroup, campos: DynamicField[]): void {
  for (const campo of campos) {
    if (!campo.dependsOn) {
      sincronizarCampo(form, campo, !!campo.source.hidden);
      continue;
    }
    const padre = campos.find((c) => c.id === campo.dependsOn!.fieldId);
    const valorPadre = padre ? form.get(padre.key)?.value : null;
    sincronizarCampo(form, campo, String(valorPadre ?? '') !== campo.dependsOn.triggerValue);
  }
}

function sincronizarCampo(form: FormGroup, campo: DynamicField, oculto: boolean): void {
  campo.hidden = oculto;
  const control = form.get(campo.key);
  if (!control) return;
  if (oculto) {
    control.disable({ emitEvent: false });
    control.reset(valorReset(campo), { emitEvent: false });
  } else {
    control.enable({ emitEvent: false });
  }
  control.setValidators(validadores(campo, oculto));
  control.updateValueAndValidity({ emitEvent: false });
}

// Valor con el que se limpia un campo al ocultarse, según su tipo de control.
function valorReset(campo: DynamicField): unknown {
  if (campo.controlType === 'toggle') return false;
  if (campo.controlType === 'numero') return 0;
  return '';
}

function valorInicial(
  campo: DynamicField,
  grupo: DynamicGroup,
  options: GenerarControlesOptions,
): unknown {
  if (campo.controlType === 'toggle') return options.togglesActivosPorDefecto ?? false;
  if (campo.controlType === 'numero') {
    return options.numeroVacioEnLayouts?.includes(grupo.layout) ? null : 0;
  }
  return '';
}

function validadores(campo: DynamicField, oculto = false): ValidatorFn[] {
  return campo.required && !oculto ? [Validators.required] : [];
}

/** Todos los campos de un paso, sin la agrupación en tarjetas. */
export function camposDe(grupos: DynamicGroup[]): DynamicField[] {
  return grupos.flatMap((g) => g.campos);
}

/**
 * Forma en la que viajan las respuestas del formulario dinámico: cada valor va
 * en la columna que le corresponde y el resto queda en null. Coincide con
 * `ValorMuestreoPayload` / `ValorOrdenTrabajoPayload`; los módulos que necesiten
 * llaves extra (`valor_uuid`, por ejemplo) extienden este objeto.
 */
export interface ValorDinamicoPayload {
  atributo_formulario_id: string;
  valor_texto: string | null;
  valor_numero: number | null;
  valor_fecha: string | null;
  valor_booleano: boolean | null;
  valor_multiple: string | null;
  estado: boolean;
  valor_catalogo: number;
}

/**
 * Convierte una respuesta al ítem de payload del backend, con el mismo criterio
 * en todos los módulos: los numéricos viajan en `valor_texto`, los selects en
 * `valor_catalogo` y los booleanos en `valor_booleano`.
 */
export function toValorDinamico(campo: DynamicField, valor: unknown): ValorDinamicoPayload {
  const esSelect = campo.controlType === 'select';
  const esToggle = campo.controlType === 'toggle';
  const vacio = valor === null || valor === undefined || valor === '';

  return {
    atributo_formulario_id: String(campo.id),
    valor_texto: esSelect || esToggle ? null : vacio ? null : String(valor),
    valor_numero: null,
    valor_fecha: null,
    valor_booleano: esToggle ? !!valor : null,
    valor_multiple: null,
    estado: true,
    valor_catalogo: esSelect ? Number(valor) || 0 : 0,
  };
}
