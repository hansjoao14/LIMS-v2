import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { FormularioLaboratorio } from '../model/solicitud-trabajo.model';


@Injectable({ providedIn: 'root' })
export class SolicitudService {
  constructor(private http: HttpClient) {}

  getFormulario(): Observable<FormularioLaboratorio> {
    return this.http.get<FormularioLaboratorio[]>('/formulario_laboratorio.json').pipe(
      map((res) => ({
        ...res[0],
        preguntas: [...res[0].preguntas].sort((a, b) => a.orden - b.orden),
      })),
    );
  }
}
