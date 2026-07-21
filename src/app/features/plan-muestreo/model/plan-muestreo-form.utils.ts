import { FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { PlanMuestreoCampo, PlanMuestreoGrupo } from './plan-muestreo-form.model';

export interface ValorPlanMuestreo {
  atributo_formulario_id: string;
  valor_texto: string;
}

/**
 * Agrega al FormGroup un control por cada campo de las tarjetas. Nunca recrea
 * el FormGroup: si el control ya existe se respeta su valor.
 */
export function generarControles(form: FormGroup, grupos: PlanMuestreoGrupo[]): void {
  for (const grupo of grupos) {
    for (const campo of grupo.campos) {
      if (form.contains(campo.key)) continue;
      form.addControl(
        campo.key,
        new FormControl(valorInicial(campo, grupo), validadores(campo)),
      );
    }
  }
}

function valorInicial(campo: PlanMuestreoCampo, grupo: PlanMuestreoGrupo): unknown {
  if (campo.controlType === 'toggle') return false;
  // Los volúmenes arrancan vacíos; los contadores (± Horas / Personas) en cero.
  if (campo.controlType === 'numero') return grupo.layout === 'preservacion' ? null : 0;
  return '';
}

function validadores(campo: PlanMuestreoCampo): ValidatorFn[] {
  return campo.required ? [Validators.required] : [];
}

/**
 * Payload estándar de respuestas: un registro por campo visible, con el id del
 * atributo del formulario y el valor en texto.
 */
export function construirValores(form: FormGroup, grupos: PlanMuestreoGrupo[]): ValorPlanMuestreo[] {
  const valores = form.getRawValue();
  return grupos
    .flatMap((g) => g.campos)
    .map((campo) => ({
      atributo_formulario_id: campo.id,
      valor_texto: String(valores[campo.key] ?? ''),
    }));
}
