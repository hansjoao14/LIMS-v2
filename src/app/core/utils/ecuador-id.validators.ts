/**
 * Validadores para cédula y RUC ecuatorianos.
 *
 * Cédula:    10 dígitos — módulo 10
 * RUC persona natural:  13 dígitos — primeros 10 = cédula válida + 001
 * RUC sociedad privada: 13 dígitos — tercer dígito = 9, módulo 11
 * RUC sociedad pública: 13 dígitos — tercer dígito = 6, módulo 11
 */

import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/** Resultado de la validación */
export interface IdValidationResult {
  valid: boolean;
  message: string;
}

// ---------------------------------------------------------------------------
// Helpers internos
// ---------------------------------------------------------------------------

function soloDigitos(value: string): boolean {
  return /^\d+$/.test(value);
}

function provinciaValida(value: string): boolean {
  const provincia = parseInt(value.substring(0, 2), 10);
  return provincia >= 1 && provincia <= 24;
}

/**
 * Módulo 10 — usado para cédula y RUC persona natural.
 * Coeficientes: 2,1,2,1,2,1,2,1,2
 */
function modulo10(value: string): boolean {
  const coeficientes = [2, 1, 2, 1, 2, 1, 2, 1, 2];
  const digitoVerificador = parseInt(value[9], 10);

  let suma = 0;
  for (let i = 0; i < 9; i++) {
    let producto = parseInt(value[i], 10) * coeficientes[i];
    if (producto >= 10) producto -= 9;
    suma += producto;
  }

  const residuo = suma % 10;
  const resultado = residuo === 0 ? 0 : 10 - residuo;
  return resultado === digitoVerificador;
}

/**
 * Módulo 11 — usado para RUC sociedad privada (tercer dígito = 9).
 * Coeficientes: 4,3,2,7,6,5,4,3,2
 */
function modulo11Privada(value: string): boolean {
  const coeficientes = [4, 3, 2, 7, 6, 5, 4, 3, 2];
  const digitoVerificador = parseInt(value[9], 10);

  let suma = 0;
  for (let i = 0; i < 9; i++) {
    suma += parseInt(value[i], 10) * coeficientes[i];
  }

  const residuo = suma % 11;
  const resultado = residuo === 0 ? 0 : 11 - residuo;
  return resultado === digitoVerificador;
}

/**
 * Módulo 11 — usado para RUC sociedad pública (tercer dígito = 6).
 * Coeficientes: 3,2,7,6,5,4,3,2
 */
function modulo11Publica(value: string): boolean {
  const coeficientes = [3, 2, 7, 6, 5, 4, 3, 2];
  const digitoVerificador = parseInt(value[8], 10);

  let suma = 0;
  for (let i = 0; i < 8; i++) {
    suma += parseInt(value[i], 10) * coeficientes[i];
  }

  const residuo = suma % 11;
  const resultado = residuo === 0 ? 0 : 11 - residuo;
  return resultado === digitoVerificador;
}

// ---------------------------------------------------------------------------
// Validador de cédula
// ---------------------------------------------------------------------------

/**
 * Valida una cédula ecuatoriana de 10 dígitos.
 */
export function validarCedula(value: string): IdValidationResult {
  const cedula = value.trim();

  if (!soloDigitos(cedula)) {
    return { valid: false, message: 'La cédula solo debe contener dígitos.' };
  }
  if (cedula.length !== 10) {
    return { valid: false, message: 'La cédula debe tener exactamente 10 dígitos.' };
  }
  if (!provinciaValida(cedula)) {
    return { valid: false, message: 'El código de provincia es inválido (01–24).' };
  }
  const tercerDigito = parseInt(cedula[2], 10);
  if (tercerDigito >= 6) {
    return { valid: false, message: 'El tercer dígito de la cédula es inválido (0–5).' };
  }
  if (!modulo10(cedula)) {
    return { valid: false, message: 'El dígito verificador de la cédula es incorrecto.' };
  }

  return { valid: true, message: 'Cédula válida.' };
}

// ---------------------------------------------------------------------------
// Validador de RUC
// ---------------------------------------------------------------------------

/**
 * Valida un RUC ecuatoriano de 13 dígitos.
 * Detecta automáticamente el tipo: persona natural, privada o pública.
 */
export function validarRuc(value: string): IdValidationResult {
  const ruc = value.trim();

  if (!soloDigitos(ruc)) {
    return { valid: false, message: 'El RUC solo debe contener dígitos.' };
  }
  if (ruc.length !== 13) {
    return { valid: false, message: 'El RUC debe tener exactamente 13 dígitos.' };
  }
  if (!provinciaValida(ruc)) {
    return { valid: false, message: 'El código de provincia es inválido (01–24).' };
  }

  const tercerDigito = parseInt(ruc[2], 10);
  const establecimiento = ruc.substring(10);

  // RUC persona natural — tercer dígito 0–5
  if (tercerDigito < 6) {
    if (establecimiento !== '001') {
      return { valid: false, message: 'El RUC de persona natural debe terminar en 001.' };
    }
    if (!modulo10(ruc)) {
      return { valid: false, message: 'El dígito verificador del RUC (persona natural) es incorrecto.' };
    }
    return { valid: true, message: 'RUC persona natural válido.' };
  }

  // RUC sociedad pública — tercer dígito 6
  if (tercerDigito === 6) {
    if (parseInt(establecimiento, 10) < 1) {
      return { valid: false, message: 'El establecimiento del RUC público debe ser mayor a 000.' };
    }
    if (!modulo11Publica(ruc)) {
      return { valid: false, message: 'El dígito verificador del RUC (sociedad pública) es incorrecto.' };
    }
    return { valid: true, message: 'RUC sociedad pública válido.' };
  }

  // RUC sociedad privada — tercer dígito 9
  if (tercerDigito === 9) {
    if (parseInt(establecimiento, 10) < 1) {
      return { valid: false, message: 'El establecimiento del RUC privado debe ser mayor a 000.' };
    }
    if (!modulo11Privada(ruc)) {
      return { valid: false, message: 'El dígito verificador del RUC (sociedad privada) es incorrecto.' };
    }
    return { valid: true, message: 'RUC sociedad privada válido.' };
  }

  return { valid: false, message: 'Tipo de RUC no reconocido (tercer dígito inválido).' };
}

// ---------------------------------------------------------------------------
// Validador unificado
// ---------------------------------------------------------------------------

/**
 * Detecta automáticamente si es cédula (10 dígitos) o RUC (13 dígitos) y valida.
 */
export function validarIdentificacion(value: string): IdValidationResult {
  const id = value.trim();

  if (id.length === 10) return validarCedula(id);
  if (id.length === 13) return validarRuc(id);

  return {
    valid: false,
    message: 'Ingrese 10 dígitos para cédula o 13 dígitos para RUC.',
  };
}

// ---------------------------------------------------------------------------
// Angular ValidatorFn wrappers
// ---------------------------------------------------------------------------

/** ValidatorFn para cédula ecuatoriana — usar en controles reactivos. */
export function cedulaEcuatoriana(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (!value) return null;
    const result = validarCedula(String(value));
    return result.valid ? null : { cedulaInvalida: result.message };
  };
}

/** ValidatorFn para RUC ecuatoriano — usar en controles reactivos. */
export function rucEcuatoriano(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (!value) return null;
    const result = validarRuc(String(value));
    return result.valid ? null : { rucInvalido: result.message };
  };
}
