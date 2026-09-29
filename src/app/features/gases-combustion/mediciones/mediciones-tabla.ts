import { Component, input, output } from '@angular/core';
import { AbstractControl, FormArray, FormGroup, ReactiveFormsModule } from '@angular/forms';

import {
  CriterioAceptacion,
  FilaPatron,
} from '../../../interfaces/gases-combustion/gases-combustion.interface';
import { TableSkeleton } from '../../../ui/table-skeleton/table-skeleton';
import {
  ConfigTablaMediciones,
  ERRORES_LECTURA,
  ResultadoCumple,
  buscarCriterio,
  evaluarCumple,
  porcentajeRecuperacion,
  promedio,
  repetibilidadObservada,
  reproducibilidadObservada,
  valorTeoricoDe,
} from '../model/gases-combustion.model';

/**
 * Tabla de mediciones de un gas. Las cuatro secciones de la hoja (CO, SO2, NO
 * y O2) son este mismo componente con distinta `config`: cambian el rótulo, de
 * qué tabla de patrones salen las opciones y contra qué grupo de criterios se
 * evalúa.
 *
 * Cuatro columnas no se digitan y por eso van en solo lectura: **Xmed** es el
 * promedio de las lecturas, **r95,45%** y **R95,45%** la diferencia entre X1 y
 * X2, y **%R** el promedio contra la concentración nominal del cilindro
 * elegido. Con esas y el criterio del rango se resuelve **CUMPLE**.
 *
 * Que r95,45% y R95,45% den lo mismo no es un error: es lo que declara el
 * encabezado de la tabla de control de calidad del formato, que escribe la
 * misma fórmula para las dos. Lo que las distingue es el límite contra el que
 * se compara cada una.
 */
@Component({
  selector: 'app-mediciones-tabla',
  imports: [ReactiveFormsModule, TableSkeleton],
  templateUrl: './mediciones-tabla.html',
  styleUrl: './mediciones-tabla.css',
})
export class MedicionesTabla {
  readonly config = input.required<ConfigTablaMediciones>();
  /** Bloque del gas: `{ gas, filas }`. */
  readonly bloque = input.required<FormGroup>();
  /** Patrones registrados arriba, que son las opciones de "No. GAS". */
  readonly patrones = input.required<FilaPatron[]>();
  readonly criterios = input.required<CriterioAceptacion[]>();
  readonly cargando = input(false);
  readonly soloLectura = input(false);
	readonly agregar = output<void>();
  readonly eliminar = output<number>();

  get filas(): FormArray {
    return this.bloque().get('filas') as FormArray;
  }

  // ── Columnas calculadas ──────────────────────────────────────────────────

  /** Concentración nominal del cilindro elegido en la fila. */
  valorTeorico(fila: AbstractControl): number | null {
    const grupo = fila as FormGroup;
    return valorTeoricoDe(
      this.patrones(),
      (grupo.get('cilindroId')?.value as number | null) ?? null,
      this.config().gas,
    );
  }

  xmed(fila: AbstractControl): number | null {
    const grupo = fila as FormGroup;
    return promedio(this.numero(grupo, 'x1'), this.numero(grupo, 'x2'));
  }

  repetibilidad(fila: AbstractControl): number | null {
    const grupo = fila as FormGroup;
    return repetibilidadObservada(this.numero(grupo, 'x1'), this.numero(grupo, 'x2'));
  }

  reproducibilidad(fila: AbstractControl): number | null {
    const grupo = fila as FormGroup;
    return reproducibilidadObservada(this.numero(grupo, 'x1'), this.numero(grupo, 'x2'));
  }

  recuperacion(fila: AbstractControl): number | null {
    return porcentajeRecuperacion(this.xmed(fila), this.valorTeorico(fila));
  }

  cumple(fila: AbstractControl): ResultadoCumple {
    return evaluarCumple(this.criterioDe(fila), this.config().gas, {
      recuperacion: this.recuperacion(fila),
      repetibilidad: this.repetibilidad(fila),
      reproducibilidad: this.reproducibilidad(fila),
    });
  }

  /** Criterio de aceptación del rango correspondiente al valor certificado del patrón. */
  private criterioDe(fila: AbstractControl): CriterioAceptacion | null {
  const valorTeorico = this.valorTeorico(fila);

  if (valorTeorico === null) {
    return null;
  }

  const valorParaRango = Math.round(valorTeorico);

  return buscarCriterio(
    this.criterios(),
    this.config().grupoCriterio,
    valorParaRango,
  );
}

  /**
   * Por qué una fila quedó sin veredicto.
   *
   * Un guion a secas no distingue "todavía no cargué los datos" de "este gas no
   * se evalúa acá", y las dos cosas se arreglan distinto. Peor: **el promedio
   * fuera de todo rango impide numerar la hoja** —el backend corta con
   * `GASES_MEDICION_SIN_VEREDICTO`—, así que el analista tiene que enterarse
   * mientras carga y no recién al finalizar.
   *
   * `corto` va debajo del guion y `largo` en el `title`.
   */
  motivoSinVeredicto(fila: AbstractControl): { corto: string; largo: string } {
    if (this.xmed(fila) === null) {
      return { corto: 'Falta X1', largo: 'Sin X1 no hay promedio con el que evaluar' };
    }
    if (this.valorTeorico(fila) === null) {
      return {
        corto: 'Sin patrón',
        largo: 'Elegí el cilindro en "No. Gas": sin su concentración certificada no hay %R',
      };
    }
    if (this.criterioDe(fila) === null) {
      return {
        corto: 'Fuera de rango',
        largo:
          'La concentración certificada del patrón no cae en ningún rango de Control de Calidad vigente.',
      };
    }
    return {
      corto: 'No aplica',
      largo: 'Este gas no se evalúa en ese rango: el criterio lo marca con "---"',
    };
  }

  // ── Validación de las lecturas ───────────────────────────────────────────

  /**
   * Qué tiene de malo una lectura, o cadena vacía si está bien.
   *
   * Se muestra apenas se escribe, sin esperar a que el control esté `touched`:
   * son valores imposibles —negativos, o texto que no es número—, no campos
   * incompletos, y avisar tarde obliga a volver sobre la fila.
   */
  errorLectura(fila: AbstractControl, campo: 'x1' | 'x2'): string {
    const control = (fila as FormGroup).get(campo);
    if (control?.hasError(ERRORES_LECTURA.negativa)) return 'No puede ser negativo';
    if (control?.hasError(ERRORES_LECTURA.noNumerica)) return 'Tiene que ser un número';
    if (campo === 'x2' && fila.hasError('x2SinX1')) return 'No hay X2 sin X1';
    return '';
  }

  // ── Formato ──────────────────────────────────────────────────────────────

  /**
   * Decimales de las columnas calculadas: Xmed, r95,45% y R95,45%.
   *
   * Dos para los cuatro gases, sin excepción. El redondeo es **de
   * presentación**: el veredicto, el %R y la búsqueda del criterio se resuelven
   * con el valor exacto, igual que en `textoPorcentaje`. Importa en los bordes,
   * donde un valor que la pantalla escribe redondeado puede caer del otro lado
   * de un límite.
   */
  private readonly DECIMALES_CALCULADOS = 2;

  /** Un cálculo sin datos suficientes se muestra vacío, no como cero. */
  texto(valor: number | null): string {
    return valor === null ? '—' : valor.toFixed(this.DECIMALES_CALCULADOS);
  }

  /**
   * %R como lo imprime la hoja: entero y con el signo de porcentaje.
   *
   * En el libro del Anexo la fórmula es `Xmed / valor nominal` a secas y no
   * redondea nada: el entero sale del formato de porcentaje de la celda. Acá es
   * lo mismo —se redondea al mostrar, no al calcular—, así que **el veredicto
   * se resuelve contra el valor exacto**. Importa en los bordes: un 97,4 % que
   * la pantalla escribe "97%" sigue quedando fuera de un criterio de 97,5.
   */
  textoPorcentaje(valor: number | null): string {
    return valor === null ? '—' : `${valor.toFixed(0)}%`;
  }

  etiquetaPatron(patron: FilaPatron): string {
    const codigo = [patron.codigo, patron.vencimiento].filter(Boolean).join(' / ');
    return codigo ? `${patron.etiqueta} · ${codigo}` : patron.etiqueta;
  }

  private numero(grupo: FormGroup, control: string): number | null {
    const valor = grupo.get(control)?.value;
    if (valor === null || valor === undefined || valor === '') return null;
    const parseado = Number(valor);
    return Number.isFinite(parseado) ? parseado : null;
  }
}
