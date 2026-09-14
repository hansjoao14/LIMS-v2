import { Component, computed, input, output } from '@angular/core';
import { FormArray, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { PatronGas } from '../../../interfaces/gases-combustion/gases-combustion.interface';
import { TableSkeleton } from '../../../ui/table-skeleton/table-skeleton';
import { ConfigTablaPatrones } from '../model/gases-combustion.model';

/** Anchos del `colgroup`, en px. La suma es el `min-width` de la tabla. */
const ANCHO_NUMERO = 110;
const ANCHO_CODIGO = 320;
const ANCHO_VALOR = 140;
const ANCHO_ACCIONES = 64;

/**
 * Tabla de cilindros patrón. Sirve a las dos secciones de la cabecera —
 * "Mezcla, ppm" y "Oxígeno, %"— porque solo cambian el título y las columnas
 * de concentración, que llegan por `config`.
 *
 * Elegir un patrón precarga su código, su vencimiento y sus concentraciones
 * nominales, pero los campos siguen editables: manda el certificado del
 * cilindro, no el catálogo.
 */
@Component({
  selector: 'app-patrones-tabla',
  imports: [ReactiveFormsModule, TableSkeleton],
  templateUrl: './patrones-tabla.html',
  styleUrl: './patrones-tabla.css',
})
export class PatronesTabla {
  readonly config = input.required<ConfigTablaPatrones>();
  readonly filas = input.required<FormArray>();
  readonly catalogo = input.required<PatronGas[]>();
  readonly cargando = input(false);

  readonly agregar = output<void>();
  readonly eliminar = output<number>();

  /** Ancho mínimo de la tabla: la suma del `colgroup`, como pide el estándar. */
  readonly anchoMinimo = computed(
    () =>
      ANCHO_NUMERO + ANCHO_CODIGO + this.config().columnas.length * ANCHO_VALOR + ANCHO_ACCIONES,
  );

  /** Columnas de datos (sin la de acciones), para el skeleton y el colspan. */
  readonly totalColumnas = computed(() => 2 + this.config().columnas.length);

  readonly anchoNumero = ANCHO_NUMERO;
  readonly anchoCodigo = ANCHO_CODIGO;
  readonly anchoValor = ANCHO_VALOR;
  readonly anchoAcciones = ANCHO_ACCIONES;

  grupoDe(indice: number): FormGroup {
    return this.filas().at(indice) as FormGroup;
  }

  /** Precarga código, vencimiento y concentraciones del patrón elegido. */
  onPatronSeleccionado(indice: number, patronId: string): void {
    const patron = this.catalogo().find((item) => item.id === patronId);
    if (!patron) return;

    const grupo = this.grupoDe(indice);
    grupo.patchValue({
      codigoVencimiento: `${patron.codigo} / ${patron.vencimiento}`,
      valores: this.config().columnas.reduce<Record<string, number | null>>((acc, columna) => {
        acc[columna.gas] = patron.valores[columna.gas] ?? null;
        return acc;
      }, {}),
    });
  }
}
