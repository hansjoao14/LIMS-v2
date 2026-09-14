import { Component, input, output } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';

import {
  CriterioAceptacion,
  FilaPatron,
} from '../../../interfaces/gases-combustion/gases-combustion.interface';
import { TableSkeleton } from '../../../ui/table-skeleton/table-skeleton';
import {
  ConfigTablaMediciones,
  ResultadoCumple,
  buscarCriterio,
  evaluarCumple,
  porcentajeRecuperacion,
  promedio,
  repetibilidadObservada,
  valorTeoricoDe,
} from '../model/gases-combustion.model';

/**
 * Tabla de mediciones de un gas. Las cuatro secciones de la hoja (CO, SO2, NO
 * y O2) son este mismo componente con distinta `config`: cambian el rótulo, de
 * qué tabla de patrones salen las opciones y contra qué grupo de criterios se
 * evalúa.
 *
 * Tres columnas no se digitan y por eso van en solo lectura: **Xmed** es el
 * promedio de X1 y X2, **r95,45%** su diferencia absoluta y **%R** el promedio
 * contra la concentración nominal del cilindro elegido. Con esas tres y el
 * criterio del rango se resuelve **CUMPLE**. La reproducibilidad sí se digita:
 * compara corridas distintas, no los dos valores de la misma fila.
 */
@Component({
  selector: 'app-mediciones-tabla',
  imports: [ReactiveFormsModule, TableSkeleton],
  templateUrl: './mediciones-tabla.html',
  styleUrl: './mediciones-tabla.css',
})
export class MedicionesTabla {
  readonly config = input.required<ConfigTablaMediciones>();
  /** Bloque del gas: `{ aplica, filas }`. */
  readonly bloque = input.required<FormGroup>();
  /** Patrones registrados arriba, que son las opciones de "No. GAS". */
  readonly patrones = input.required<FilaPatron[]>();
  readonly criterios = input.required<CriterioAceptacion[]>();
  readonly cargando = input(false);

  readonly agregar = output<void>();
  readonly eliminar = output<number>();

  get aplicaControl(): FormControl {
    return this.bloque().get('aplica') as FormControl;
  }

  get filas(): FormArray {
    return this.bloque().get('filas') as FormArray;
  }

  get aplica(): boolean {
    return this.aplicaControl.value === true;
  }

  // ── Columnas calculadas ──────────────────────────────────────────────────

  /** Concentración nominal del cilindro elegido en la fila. */
  valorTeorico(fila: AbstractControl): number | null {
    const grupo = fila as FormGroup;
    return valorTeoricoDe(this.patrones(), grupo.get('patronId')?.value ?? '', this.config().gas);
  }

  xmed(fila: AbstractControl): number | null {
    const grupo = fila as FormGroup;
    return promedio(this.numero(grupo, 'x1'), this.numero(grupo, 'x2'));
  }

  repetibilidad(fila: AbstractControl): number | null {
    const grupo = fila as FormGroup;
    return repetibilidadObservada(this.numero(grupo, 'x1'), this.numero(grupo, 'x2'));
  }

  recuperacion(fila: AbstractControl): number | null {
    return porcentajeRecuperacion(this.xmed(fila), this.valorTeorico(fila));
  }

  cumple(fila: AbstractControl): ResultadoCumple {
    const grupo = fila as FormGroup;
    const criterio = this.criterioDe(fila);
    return evaluarCumple(
      criterio,
      this.config().gas,
      this.repetibilidad(fila),
      this.numero(grupo, 'reproducibilidad'),
      this.recuperacion(fila),
    );
  }

  /** Criterio de aceptación del rango en el que cae el promedio medido. */
  private criterioDe(fila: AbstractControl): CriterioAceptacion | null {
    return buscarCriterio(this.criterios(), this.config().grupoCriterio, this.xmed(fila));
  }

  // ── Formato ──────────────────────────────────────────────────────────────

  /** Un cálculo sin datos suficientes se muestra vacío, no como cero. */
  texto(valor: number | null, decimales = this.config().decimales): string {
    return valor === null ? '—' : valor.toFixed(decimales);
  }

  textoPorcentaje(valor: number | null): string {
    return valor === null ? '—' : `${valor.toFixed(1)}%`;
  }

  etiquetaPatron(patron: FilaPatron): string {
    return patron.codigoVencimiento
      ? `${patron.patronId} · ${patron.codigoVencimiento}`
      : patron.patronId;
  }

  private numero(grupo: FormGroup, control: string): number | null {
    const valor = grupo.get(control)?.value;
    if (valor === null || valor === undefined || valor === '') return null;
    const parseado = Number(valor);
    return Number.isFinite(parseado) ? parseado : null;
  }
}
