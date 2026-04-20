import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { EnsayoLaboratorio } from '../../interfaces/solicitud-trabajo/ensayo.interface';

@Injectable({
  providedIn: 'root',
})
export class EnsayoService {
  getEnsayosAire(): Observable<EnsayoLaboratorio[]> {
    return of([
      {
        activo: false,
        ensayo: 'MONÓXIDO DE CARBONO',
        identificacion: 'CO',
        metodoInterno: 'PEE/IAM-Q/07',
        metodoReferencia: 'EPA CTM-030',
        unidad: 'ppm / mg/Nm³*',
      },
      {
        activo: false,
        ensayo: 'MATERIAL PARTICULADO*',
        identificacion: 'MP',
        metodoInterno: 'PEE/IAM-Q/14',
        metodoReferencia: 'EPA 60, Apéndice A, Método 5',
        unidad: 'ppm / mg/Nm³*',
      },
    ]);
  }

  getEnsayosRuido(): Observable<EnsayoLaboratorio[]> {
    return of([
      {
        activo: false,
        ensayo: 'RUIDO AMBIENTAL',
        identificacion: '---',
        metodoInterno: 'PEE/IAM-Q/11',
        metodoReferencia: 'ISO 1996-2:2017',
        unidad: 'dB',
      },
    ]);
  }

  getNotasAgua(): Observable<string[]> {
    return of([
      'Los ensayos marcados con (*) no están incluidos en el Alcance de Acreditación del SAE.',
      'Las muestras serán descartadas del laboratorio en 28 días calendario.',
      'Los resultados serán entregados en 15 días calendario a partir del ingreso de las muestras.',
    ]);
  }

  getNotasAire(): Observable<string[]> {
    return of([
      'Los ensayos marcados con (*) no están incluidos en el Alcance de Acreditación del SAE.',
      'Los resultados serán entregados en 10 días calendario después de realizado el monitoreo.',
    ]);
  }

  getNotasRuido(): Observable<string[]> {
    return of([
      'Los ensayos marcados con (*) no están incluidos en el Alcance de Acreditación del SAE.',
      'Los resultados serán entregados en 10 días calendario después de realizado el monitoreo.',
    ]);
  }
}
