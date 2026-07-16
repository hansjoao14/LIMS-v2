import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { ReportCatalogoEnsayoItem } from '../../../interfaces/solicitudes/solicitud-trabajo';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EnsayoItemService {
  private readonly apiReportes = environment.api_reportes;

  constructor(private http: HttpClient) {}

  // Un servicio (item_catalogo) activo puede traer varias tablas — p. ej.
  // Aguas Superficiales devuelve una entrada para "Muestreo" y otra para
  // "Físico-Químico", cada una con su propio título, notas y ensayos — por
  // eso se devuelve el array completo, no solo el primer elemento.
  getReportCatalogoEnsayoItem(id: number): Observable<ReportCatalogoEnsayoItem[]> {
    return this.http
      .get<{ message: string; success: boolean; data: ReportCatalogoEnsayoItem[] }>(
        `${this.apiReportes}/report-catalogo/ensayo-item/${id}`,
      )
      .pipe(map((res) => res.data ?? []));
  }
}
