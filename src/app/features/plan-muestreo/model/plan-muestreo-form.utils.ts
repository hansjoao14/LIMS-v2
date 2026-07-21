import { FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ValorMuestreoPayload } from '../../../services/solicitudes/plan-muestreo/plan-muestreo.service';
import { PlanMuestreoCampo, PlanMuestreoGrupo } from './plan-muestreo-form.model';

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

/** Todos los campos de un paso, sin la agrupación en tarjetas. */
export function camposDe(grupos: PlanMuestreoGrupo[]): PlanMuestreoCampo[] {
  return grupos.flatMap((g) => g.campos);
}

/**
 * Convierte una respuesta en el ítem `valorMuestreo` del POST create-detalle,
 * con el mismo criterio que `buildValorOrdenTrabajo` de la orden in situ: cada
 * valor viaja en la columna que le corresponde y el resto va en null.
 */
export function toValorMuestreo(campo: PlanMuestreoCampo, valor: unknown): ValorMuestreoPayload {
  const esSelect = campo.controlType === 'select';
  const esToggle = campo.controlType === 'toggle';
  const vacio = valor === null || valor === undefined || valor === '';

  return {
    atributo_formulario_id: String(campo.id),
    // Los numéricos viajan en valor_texto, igual que en el resto de la app.
    valor_texto: esSelect || esToggle ? null : vacio ? null : String(valor),
    valor_numero: null,
    valor_fecha: null,
    valor_booleano: esToggle ? !!valor : null,
    valor_multiple: null,
    estado: true,
    valor_catalogo: esSelect ? Number(valor) || 0 : 0,
  };
}
