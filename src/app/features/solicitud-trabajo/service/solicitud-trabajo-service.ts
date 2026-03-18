import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Pregunta } from '../model/solicitud-trabajo.model';


@Injectable({ providedIn: 'root' })
export class SolicitudService {
  constructor(private http: HttpClient) {}

  getFormulario(): Observable<Pregunta[]> {
    return this.http.get<any[]>('/formulario_laboratorio.json').pipe(
      map(res => res[0].preguntas.sort((a: any, b: any) => a.orden - b.orden))
    );
  }
}