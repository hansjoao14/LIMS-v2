import { Injectable, inject } from '@angular/core';
import { Observable, shareReplay } from 'rxjs';

import { AuthService } from '../../auth/service/auth-service';
import { SolicitudService } from '../../../services/solicitudes/solicitud-trabajo/solicitud-trabajo.service';
import {
  PlanMuestreoDetallePayload,
  ValorMuestreoPayload,
} from '../../../services/solicitudes/plan-muestreo/plan-muestreo.service';
import { FormularioLaboratorio } from '../../solicitud-trabajo/model/solicitud-trabajo.model';
import { PlanMuestreoCampo } from './plan-muestreo-form.model';
import { toValorMuestreo } from './plan-muestreo-form.utils';

/** Datos que el paso 1 deja fijados para el resto del asistente. */
export interface PlanMuestreoContexto {
  solicitudId: string;
  numSecuencial: string;
  tipoAguaId: number | null;
  tipoAguaNombre: string;
  /** Ensayos de la solicitud, ya con la forma de `planMuestreoDetalle`. */
  ensayos: PlanMuestreoDetallePayload[];
}

/**
 * Estado compartido entre los pasos del plan de muestreo. El formulario
 * dinámico se pide una sola vez y las respuestas de cada sección se van
 * acumulando aquí conforme el usuario navega, para armar un único payload al
 * guardar en el último paso.
 */
@Injectable({ providedIn: 'root' })
export class PlanMuestreoStore {
  // Formulario dinámico "PLAN DE MUESTREO".
  readonly TIPO_FORMULARIO_ID = 2019;

  contexto: PlanMuestreoContexto | null = null;

  private formulario$?: Observable<FormularioLaboratorio>;
  private readonly campos = new Map<number, PlanMuestreoCampo[]>();
  private readonly respuestas = new Map<number, Record<string, unknown>>();

  private authService = inject(AuthService);
  private solicitudService = inject(SolicitudService);

  /** Una sola petición por sesión: los pasos comparten la misma respuesta. */
  getFormulario(): Observable<FormularioLaboratorio> {
    if (!this.formulario$) {
      const { id } = this.authService.currentUser();
      this.formulario$ = this.solicitudService
        .getFormulario(this.TIPO_FORMULARIO_ID, id)
        .pipe(shareReplay({ bufferSize: 1, refCount: false }));
    }
    return this.formulario$;
  }

  /** Respuestas ya capturadas de una sección, para repoblar el paso al volver. */
  respuestasDe(seccion: number): Record<string, unknown> {
    return this.respuestas.get(seccion) ?? {};
  }

  /** Se llama al salir de cada paso, con los valores crudos de su FormGroup. */
  guardarSeccion(seccion: number, campos: PlanMuestreoCampo[], valores: Record<string, unknown>): void {
    this.campos.set(seccion, campos);
    this.respuestas.set(seccion, valores);
  }

  /** Obligatorios sin responder en cualquiera de los pasos ya visitados. */
  camposFaltantes(): PlanMuestreoCampo[] {
    const faltantes: PlanMuestreoCampo[] = [];
    for (const [seccion, campos] of this.campos) {
      const valores = this.respuestasDe(seccion);
      for (const campo of campos) {
        const valor = valores[campo.key];
        if (campo.required && (valor === null || valor === undefined || valor === '')) {
          faltantes.push(campo);
        }
      }
    }
    return faltantes;
  }

  /**
   * `valorMuestreo` del payload final: una entrada por pregunta respondida en
   * todos los pasos.
   */
  construirValorMuestreo(): ValorMuestreoPayload[] {
    const items: ValorMuestreoPayload[] = [];
    for (const [seccion, campos] of this.campos) {
      const valores = this.respuestasDe(seccion);
      for (const campo of campos) {
        items.push(toValorMuestreo(campo, valores[campo.key]));
      }
    }
    return items;
  }

  limpiar(): void {
    this.contexto = null;
    this.campos.clear();
    this.respuestas.clear();
  }
}
