import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { DatosSRI, DatosRegistroCivil } from '../../interfaces/solicitud-trabajo/integracion.interface';

@Injectable({
  providedIn: 'root',
})
export class IntegracionService {
  buscarPorSRI(ruc: string): Observable<DatosSRI> {
    return of({
      val_razon_op: 'INDUSTRIA ANDINA S.A.',
      val_come_op: 'QUIMANDINA',
      val_dir_op: 'Av. Mariscal Sucre N75-270',
    }).pipe(delay(1500));
  }

  buscarPorRegistroCivil(cedula: string): Observable<DatosRegistroCivil> {
    return of({
      val_nom_op: 'JUAN',
      val_ape_op: 'PEREZ',
      val_dire_op: 'Av. Eloy Alfaro',
    }).pipe(delay(1500));
  }
}
