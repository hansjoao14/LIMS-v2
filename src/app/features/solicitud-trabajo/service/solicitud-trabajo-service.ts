import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { FormularioLaboratorio } from '../model/solicitud-trabajo.model';
import { environment } from '../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class SolicitudService {

  api_reportes: string = environment.api_reportes;

  constructor(private http: HttpClient) {}

  // 1. Agregamos el idTipoFormulario como parámetro
  getFormulario(idTipoFormulario: string | number): Observable<FormularioLaboratorio> {
    
    // 2. Construimos la URL uniendo el environment y el endpoint
    const url = `${this.api_reportes}/report-parametro/formulario-dinamico/${idTipoFormulario}`;

    // 3. Cambiamos el tipo esperado a un objeto único (FormularioLaboratorio) en vez de un array
    return this.http.get<FormularioLaboratorio>(url).pipe(
      map((res) => ({
        ...res, // Tomamos la respuesta directa
        // 4. Verificamos que 'preguntas' exista antes de ordenarlo para evitar errores de undefined
        preguntas: res.preguntas 
          ? [...res.preguntas].sort((a, b) => a.orden - b.orden) 
          : [] 
      }))
    );
  }
}