import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { FormularioPayload } from '../../../../interfaces/admin-formularios/formulario-payload.interface';

@Injectable({ providedIn: 'root' })
export class AdminFormularioService {
  private base = `${environment.api_formulario}/formulario`;

  constructor(private http: HttpClient) {}

  crear(payload: FormularioPayload): Observable<any> {
    return this.http.post(this.base, payload);
  }

  actualizar(id: string, payload: FormularioPayload): Observable<any> {
    return this.http.put(`${this.base}/${id}`, payload);
  }
}
