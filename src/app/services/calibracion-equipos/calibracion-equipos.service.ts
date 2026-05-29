import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CalibracionEquipo } from '../../interfaces/calibracion-equipos/calibracion-equipos.interface';

@Injectable({ providedIn: 'root' })
export class CalibracionEquiposService {

  getCalibraciones(): Observable<CalibracionEquipo[]> {
    return of([]);
  }

  deshabilitarCalibracion(_id: string): Observable<void> {
    return of(undefined);
  }
}
