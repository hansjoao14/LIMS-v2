import { FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
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
        new FormControl(
          { value: valorInicial(campo, grupo), disabled: campo.hidden },
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
  grupos: PlanMuestreoGrupo[],
  destroy$: Subject<void>,
): void {
  const campos = camposDe(grupos);
  const actualizar = () => actualizarDependientes(form, campos);
  actualizar();
  form.valueChanges.pipe(takeUntil(destroy$)).subscribe(actualizar);
}

function actualizarDependientes(form: FormGroup, campos: PlanMuestreoCampo[]): void {
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

function sincronizarCampo(form: FormGroup, campo: PlanMuestreoCampo, oculto: boolean): void {
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
function valorReset(campo: PlanMuestreoCampo): unknown {
  if (campo.controlType === 'toggle') return false;
  if (campo.controlType === 'numero') return 0;
  return '';
}

function valorInicial(campo: PlanMuestreoCampo, grupo: PlanMuestreoGrupo): unknown {
  if (campo.controlType === 'toggle') return false;
  // Los volúmenes arrancan vacíos; los contadores (± Horas / Personas) en cero.
  if (campo.controlType === 'numero') return grupo.layout === 'preservacion' ? null : 0;
  return '';
}

function validadores(campo: PlanMuestreoCampo, oculto = false): ValidatorFn[] {
  return campo.required && !oculto ? [Validators.required] : [];
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
