import { Component, input, output } from '@angular/core';
import { AbstractControl, FormArray, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { OpcionCatalogo } from '../../../interfaces/gases-combustion/gases-combustion.interface';
import { TableSkeleton } from '../../../ui/table-skeleton/table-skeleton';
import { CONDICIONES_SONDA } from '../model/gases-combustion.model';

/**
 * Inspección trimestral de la sonda.
 *
 * Sección propia del formato: una fila por trimestre con las cinco condiciones
 * físicas, el diagnóstico y las novedades. **El "sí" de cada condición es la
 * novedad**, no lo normal: la sonda está bien cuando las cinco dan que no.
 *
 * Una inspección con alguna novedad o con diagnóstico distinto de APROBADA
 * exige observaciones. La regla se avisa acá y la vuelve a exigir el backend al
 * numerar la hoja: la pantalla da respuesta inmediata, pero el que manda es el
 * servidor.
 *
 * @see faq-monorepo/docs/gases-combustion.md §7.6 y §10.3
 */
@Component({
  selector: 'app-inspeccion-sonda',
  imports: [ReactiveFormsModule, TableSkeleton],
  templateUrl: './inspeccion-sonda.html',
  styleUrl: './inspeccion-sonda.css',
})
export class InspeccionSondaTabla {
  readonly filas = input.required<FormArray>();
  readonly trimestres = input.required<OpcionCatalogo[]>();
  readonly diagnosticos = input.required<OpcionCatalogo[]>();
  readonly cargando = input(false);
  readonly soloLectura = input(false);

  readonly agregar = output<void>();
  readonly eliminar = output<number>();

  readonly condiciones = CONDICIONES_SONDA;

  /** Nombre del ítem que representa una sonda sin novedades. */
  private readonly DIAGNOSTICO_APROBADA = 'APROBADA';

  grupoDe(fila: AbstractControl): FormGroup {
    return fila as FormGroup;
  }

  /** Alguna de las cinco condiciones marcada, o un diagnóstico que no aprueba. */
  tieneNovedad(fila: AbstractControl): boolean {
    const grupo = this.grupoDe(fila);
    const alguna = this.condiciones.some(
      (condicion) => grupo.get(condicion.control)?.value === true,
    );
    if (alguna) return true;

    const diagnosticoId = grupo.get('ctdiagnosticoId')?.value as number | null;
    if (diagnosticoId === null || diagnosticoId === undefined) return false;

    const diagnostico = this.diagnosticos().find((item) => item.id === diagnosticoId);
    return !!diagnostico && diagnostico.nombre.trim().toUpperCase() !== this.DIAGNOSTICO_APROBADA;
  }

  /** El backend rechaza la numeración si falta la explicación. */
  faltaObservaciones(fila: AbstractControl): boolean {
    const observaciones = (this.grupoDe(fila).get('observaciones')?.value as string) ?? '';
    return this.tieneNovedad(fila) && !observaciones.trim();
  }
}
