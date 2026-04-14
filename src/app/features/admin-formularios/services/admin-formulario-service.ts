import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment'; // Ajusta la ruta de tu environment si es necesario

@Injectable({
  providedIn: 'root',
})
export class AdminFormularioService {
  
  private api_reportes: string = environment.api_reportes;

  constructor(private http: HttpClient) {}

  /**
   * Obtiene la lista maestra de todos los formularios configurados en el sistema.
   * Basado en la estructura del JSON: [{ formulario_nombre, formulario_id, tipo_formulario, preguntas: [] }]
   */
  getFormularios(): Observable<any[]> {
    // Si tu endpoint para listar todos es diferente, ajústalo aquí. 
    // Usualmente es la ruta base sin el ID.
    const url = `${this.api_reportes}/report-parametro/formulario-dinamico/380`;
    return this.http.get<any[]>(url);
  }
}