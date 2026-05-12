import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { EnsayoLaboratorio } from '../../../interfaces/solicitudes/solicitud-trabajo/ensayo.interface';

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
      'Las muestras serán descartadas del laboratorio en 28 días calendario después de recibidas.',
      'Los resultados serán entregados en 15 días calendario a partir del ingreso de las muestras al Laboratorio IAM-Q.',
      'Los resultados obtenidos podrán utilizarse para elaboración de informes técnicos cuando requiera la Secretaría de Ambiente.',
      'Los resultados de la red de monitoreo del recurso hídrico serán entregados hasta los primeros 15 días del siguiente mes del monitoreo.',
      'Si el plazo establecido para la entrega de los resultados coincide con fin de semana o feriado, los mismos se entregarán al siguiente día hábil.'
    ]);
  }

  getNotasAire(): Observable<string[]> {
    return of([
      'Los ensayos marcados con (*) no están incluidos en el Alcance de Acreditación del SAE.',
      'Los resultados serán entregados en 10 días calendario después de realizado el monitoreo.',
      'Los resultados obtenidos podrán utilizarse para la elaboración de Informes Técnicos cuando requiera la Secretaría de Ambiente.',
      'Si el plazo establecido para la entrega de los resultados coincide con fin de semana o feriado, los mismos se entregarán al siguiente día hábil.'
    ]);
  }

  getNotasRuido(): Observable<string[]> {
    return of([
      'Los ensayos marcados con (*) no están incluidos en el Alcance de Acreditación del SAE.',
      'Los resultados serán entregados en 10 días calendario después de realizado el monitoreo.',
      'Los resultados obtenidos podrán utilizarse para la elaboración de Informes Técnicos cuando requiera la Secretaría de Ambiente.',
      'Si el plazo establecido para la entrega de los resultados coincide con fin de semana o feriado, los mismos se entregarán al siguiente día hábil.'
    ]);
  }
}
