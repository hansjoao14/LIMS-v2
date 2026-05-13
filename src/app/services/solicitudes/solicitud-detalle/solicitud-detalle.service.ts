import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import solicitudMock from '../../../data/solicitud.json';

export interface SolicitudDetalle {
  id_solicitud: string;
  formularios: FormularioDetalle[];
}

export interface FormularioDetalle {
  id_formulario: string;
  nombre_formulario: string;
  sigla_formulario: string;
  version_formulario: number;
  nombre_completo: string;
  nombre_cargo: string;
  fecha_emision_solicitud: string;
  num_secuencial_solicitud: string;
  atributos: AtributoDetalle[];
  ensayos: EnsayoDetalle[];
}

export interface AtributoDetalle {
  orden: number;
  id_atributo_formulario: string;
  nombre_atributo_formulario: string;
  pregunta_atributo_formulario: string;
  valor_texto?: string;
  valor_catalogo?: number;
  nombre_valor_catalogo?: string;
  valor_multiple?: string;
  valor_multiple_format?: string;
}

export interface EnsayoDetalle {
  id: string;
  ensayo_id: number;
  metodo: string;
  identificacion: string;
  analisis: string;
  ctambiental_id: number;
  nombre: string;
}

@Injectable({ providedIn: 'root' })
export class SolicitudDetalleService {

  getSolicitudDetalle(id: string): Observable<SolicitudDetalle> {
    console.log('[SolicitudDetalleService] getSolicitudDetalle — id recibido:', id);

    // TODO: reemplazar por REST real:
    // return this.http.get<SolicitudDetalle>(`/api/solicitudes/${id}/detalle`);
    return of(solicitudMock as SolicitudDetalle);
  }
}
