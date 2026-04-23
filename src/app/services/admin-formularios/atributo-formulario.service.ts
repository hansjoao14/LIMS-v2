import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AtributoFormularioPayload } from '../../interfaces/admin-formularios/atributo-formulario-payload.interface';

@Injectable({ providedIn: 'root' })
export class AtributoFormularioService {
  private base = `${environment.api_formulario}/atributo-formulario`;

  constructor(private http: HttpClient) {}

  crear(payload: AtributoFormularioPayload): Observable<any> {
    return this.http.post(this.base, payload);
  }

  actualizar(id: string, payload: AtributoFormularioPayload): Observable<any> {
    return this.http.put(`${this.base}/${id}`, payload);
  }
}
