import { Component, computed, input } from '@angular/core';

import {
  CriterioAceptacion,
  DefinicionGases,
  GasId,
  GrupoCriterio,
} from '../../../interfaces/gases-combustion/gases-combustion.interface';
import { LoadingComponent } from '../../../shared/components/loading/loading';
import { TableSkeleton } from '../../../ui/table-skeleton/table-skeleton';
import {
  ETIQUETA_GRUPO_CRITERIO,
  GASES_CONTROL_CALIDAD,
  ORDEN_GRUPOS_CRITERIO,
} from '../model/gases-combustion.model';

/** Criterios de un grupo de rangos, con su rótulo ya resuelto. */
interface GrupoDeCriterios {
  grupo: GrupoCriterio;
  etiqueta: string;
  filas: CriterioAceptacion[];
}

/**
 * Control de calidad: los límites de repetibilidad, reproducibilidad y
 * veracidad por rango, más el glosario del formulario.
 *
 * Es solo lectura a propósito. Son valores de la norma, no del operador: la
 * pantalla los muestra y los usa para evaluar la columna CUMPLE de cada
 * medición.
 */
@Component({
  selector: 'app-control-calidad',
  imports: [LoadingComponent, TableSkeleton],
  templateUrl: './control-calidad.html',
  styleUrl: './control-calidad.css',
})
export class ControlCalidad {
  readonly criterios = input.required<CriterioAceptacion[]>();
  readonly definiciones = input.required<DefinicionGases[]>();
  readonly cargando = input(false);

  readonly gases = GASES_CONTROL_CALIDAD;

  /** Los tres bloques de columnas: repetibilidad, reproducibilidad y veracidad. */
  readonly bloquesDeColumnas = [1, 2, 3];

  /**
   * Agrupa los rangos para poder rotular el grupo con un `rowspan`.
   *
   * El orden de los grupos lo fija `ORDEN_GRUPOS_CRITERIO`, no el de llegada:
   * los criterios vienen ordenados por rango ascendente y así el oxígeno —6 a
   * 18— quedaría antes que la mezcla —20 a 1000—, al revés que en el formato
   * impreso. Dentro de cada grupo sí manda el orden de llegada, que ya es por
   * rango.
   */
  readonly grupos = computed<GrupoDeCriterios[]>(() => {
    const porGrupo = new Map<GrupoCriterio, CriterioAceptacion[]>();
    for (const criterio of this.criterios()) {
      const filas = porGrupo.get(criterio.grupo) ?? [];
      filas.push(criterio);
      porGrupo.set(criterio.grupo, filas);
    }

    const conocidos = ORDEN_GRUPOS_CRITERIO.filter((grupo) => porGrupo.has(grupo));
    // Un grupo que no esté en la lista igual se pinta, al final: es preferible
    // a que desaparezca de la tabla sin que nadie se entere.
    const resto = [...porGrupo.keys()].filter((grupo) => !conocidos.includes(grupo));

    return [...conocidos, ...resto].map((grupo) => ({
      grupo,
      etiqueta: ETIQUETA_GRUPO_CRITERIO[grupo] ?? grupo,
      filas: porGrupo.get(grupo) ?? [],
    }));
  });

  /** Un gas sin límite en ese rango se pinta "---", como en la hoja impresa. */
  textoLimite(valor: number | null | undefined): string {
    return valor === null || valor === undefined ? '---' : `${valor}`;
  }

  textoVeracidad(criterio: CriterioAceptacion, gas: GasId): string {
    const rango = criterio.veracidad[gas];
    return rango ? `${rango.min}-${rango.max}` : '---';
  }
}
