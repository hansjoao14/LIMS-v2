import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../../../environments/environment';

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
  nombre_ensayo: string;
  parent_ambiental: number;
  metodo: string;
  identificacion: string;
  analisis: string;
  ctambiental_id: number;
  nombre: string;
}

@Injectable({ providedIn: 'root' })
export class SolicitudDetalleService {
  private readonly apiReportes = environment.api_reportes;

  constructor(private http: HttpClient) {}

  getSolicitudDetalle(id: string): Observable<SolicitudDetalle> {
    return this.http
      .get<{ message: string; success: boolean; data: SolicitudDetalle }>(
        `${this.apiReportes}/report-solicitud/${id}`,
      )
      .pipe(map((res) => res.data));
  }
}
