import { Component, computed, input, output } from '@angular/core';
import { FormArray, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { PatronGas } from '../../../interfaces/gases-combustion/gases-combustion.interface';
import { TableSkeleton } from '../../../ui/table-skeleton/table-skeleton';
import { ConfigTablaPatrones } from '../model/gases-combustion.model';

/** Anchos del `colgroup`, en px. La suma es el `min-width` de la tabla. */
const ANCHO_NUMERO = 110;
const ANCHO_CODIGO = 220;
const ANCHO_VENCIMIENTO = 150;
const ANCHO_VALOR = 140;
const ANCHO_ACCIONES = 64;

/**
 * Tabla de cilindros patrón. Sirve a las dos secciones de la cabecera —
 * "Mezcla, ppm" y "Oxígeno, %"— porque solo cambian el título y las columnas
 * de concentración, que llegan por `config`.
 *
 * Elegir un cilindro precarga su código y su vencimiento, que quedan editables
 * porque manda el certificado, y sus concentraciones, que **no** se editan: son
 * del cilindro y se guardan como copia para que una corrección del catálogo no
 * cambie un %R ya firmado.
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
  /** Una hoja ya numerada se muestra pero no se edita. */
  readonly soloLectura = input(false);

  readonly agregar = output<void>();
  readonly eliminar = output<number>();

  /** Ancho mínimo de la tabla: la suma del `colgroup`, como pide el estándar. */
  readonly anchoMinimo = computed(
    () =>
      ANCHO_NUMERO +
      ANCHO_CODIGO +
      ANCHO_VENCIMIENTO +
      this.config().columnas.length * ANCHO_VALOR +
      ANCHO_ACCIONES,
  );

  /** Columnas de datos (sin la de acciones), para el skeleton y el colspan. */
  readonly totalColumnas = computed(() => 3 + this.config().columnas.length);

  readonly anchoNumero = ANCHO_NUMERO;
  readonly anchoCodigo = ANCHO_CODIGO;
  readonly anchoVencimiento = ANCHO_VENCIMIENTO;
  readonly anchoValor = ANCHO_VALOR;
  readonly anchoAcciones = ANCHO_ACCIONES;

  grupoDe(indice: number): FormGroup {
    return this.filas().at(indice) as FormGroup;
  }

  /**
   * Precarga código, vencimiento y concentraciones del cilindro elegido.
   *
   * El `<select>` entrega siempre texto, así que el id vuelve a número antes de
   * buscarlo: `cilindro_id` es un entero en la base y comparar '3' con 3 con
   * `===` no encuentra nada.
   */
  onPatronSeleccionado(indice: number, valor: string): void {
    const cilindroId = valor ? Number(valor) : null;
    const grupo = this.grupoDe(indice);
    const patron = this.catalogo().find((item) => item.id === cilindroId);

    if (!patron) {
      grupo.patchValue({ cilindroId: null, etiqueta: '', codigo: '', vencimiento: '' });
      return;
    }

    grupo.patchValue({
      cilindroId: patron.id,
      etiqueta: patron.etiqueta,
      codigo: patron.codigo,
      vencimiento: patron.vencimiento,
      valores: this.config().columnas.reduce<Record<string, number | null>>((acc, columna) => {
        acc[columna.gas] = patron.valores[columna.gas] ?? null;
        return acc;
      }, {}),
    });
  }

  /** Un certificado vencido se avisa, pero no se bloquea: puede ser histórico. */
  estaVencido(indice: number): boolean {
    const cilindroId = this.grupoDe(indice).get('cilindroId')?.value as number | null;
    return this.catalogo().find((item) => item.id === cilindroId)?.vencido === true;
  }

  /** Un cálculo sin dato se muestra vacío, no como cero. */
  texto(valor: number | null | undefined): string {
    return valor === null || valor === undefined ? '—' : `${valor}`;
  }
}
