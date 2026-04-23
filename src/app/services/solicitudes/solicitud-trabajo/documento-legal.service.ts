import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DocumentoLegalService {
  getTerminosCondiciones(): Observable<string[]> {
    return of([
      'Los ensayos marcados con (*) no están incluidos en el Alcance de Acreditación del SAE.',
      'Los resultados serán entregados en 15 días calendario a partir de realizada la toma de muestra.',
      'Los resultados obtenidos podrán utilizarse para elaboración de informes técnicos.',
      'Si el plazo establecido coincide con fin de semana o feriado, se entregarán al siguiente día hábil.',
    ]);
  }

  getAcuerdoConfidencialidad(): Observable<string> {
    return of(
      `OBJETO.-\nEl presente acuerdo tiene por objeto establecer con el cliente, la manera en la que el laboratorio IAM-Q maneja la información obtenida o creada durante la realización de sus actividades.\n\nEl laboratorio IAM-Q al ser parte de una entidad del sector público, está obligado a acatar las disposiciones establecidas en la Ley Orgánica de Transparencia y Acceso a La Información.\n\nAdemás, cuando el laboratorio sea requerido por ley o autorizado por las disposiciones contractuales, para revelar información confidencial, notificará al cliente salvo que esté prohibido por ley.`,
    );
  }
}
