export const TERMINOS_CONDICIONES = [
  'Los ensayos marcados con (*) no están incluidos en el Alcance de Acreditación del SAE.',
  'Los resultados serán entregados en 15 días calendario a partir de realizada la toma de muestra para Ensayos Físico-Químico para Aguas Residuales y Superficiales y para Ensayos de Muestreo para Aguas Superficiales.',
  'Los resultados serán entregados en 10 días calendario a partir de realizada la toma de muestra para Ensayos Físico–Químicos de Emisiones Gaseosas de Fuentes Fijas a la Atmósfera y para Ensayos para Acústica Ambiental.',
  'Los resultados obtenidos podrán utilizarse para elaboración de informes técnicos cuando requiera la Secretaría de Ambiente.',
  'Los resultados de la red de monitoreo del recurso hídrico serán entregados hasta los primeros 15 días del siguiente mes del monitoreo.',
  'Si el plazo establecido para la entrega de los resultados coincide con fin de semana o feriado, los mismos se entregarán al siguiente día hábil.',
  'En caso de que el cliente tenga algún reclamo o queja respecto los servicios brindados por IAM-Q, podrá emitir la misma al laboratorio IAM-Q siguiendo lo dispuesto en el procedimiento PG/IAM-Q/11 Quejas.',
];

export const ACUERDO_CONFIDENCIALIDAD = `OBJETO.-
El presente acuerdo tiene por objeto establecer con el cliente, la manera en la que el laboratorio IAM-Q maneja la información obtenida o creada durante la realización de sus actividades, en el servicio solicitado por el cliente.

El laboratorio IAM-Q al ser parte de una entidad del sector público, está obligado a acatar las disposiciones establecidas en la Ley Orgánica de Transparencia y Acceso a La Información, con respecto a la información obtenida o creada durante la realización de sus actividades.

Además, cuando el laboratorio sea requerido por ley o autorizado por las disposiciones contractuales, para revelar información confidencial, notificará mediante memorando u oficio al cliente o a la persona interesada la información proporcionada, salvo que esté prohibido por ley.`;

export const NOTAS_AGUA = [
  'Los ensayos marcados con (*) no están incluidos en el Alcance de Acreditación del SAE.',
  'Las muestras serán descartadas del laboratorio en 28 días calendario después de recibidas.',
  'Los resultados serán entregados en 15 días calendario a partir del ingreso de las muestras al Laboratorio IAM-Q.',
  'Los resultados obtenidos podrán utilizarse para elaboración de informes técnicos cuando requiera la Secretaría de Ambiente.',
  'Los resultados de la red de monitoreo del recurso hídrico serán entregados hasta los primeros 15 días del siguiente mes del monitoreo.',
  'Si el plazo establecido para la entrega de los resultados coincide con fin de semana o feriado, los mismos se entregarán al siguiente día hábil.',
];

export const NOTAS_AIRE = [
  'Los ensayos marcados con (*) no están incluidos en el Alcance de Acreditación del SAE.',
  'Los resultados serán entregados en 10 días calendario después de realizado el monitoreo.',
  'Los resultados obtenidos podrán utilizarse para la elaboración de Informes Técnicos cuando requiera la Secretaría de Ambiente.',
  'Si el plazo establecido para la entrega de los resultados coincide con fin de semana o feriado, los mismos se entregarán al siguiente día hábil.',
];

export const NOTAS_RUIDO = [
  'Los ensayos marcados con (*) no están incluidos en el Alcance de Acreditación del SAE.',
  'Los resultados serán entregados en 10 días calendario después de realizado el monitoreo.',
  'Los resultados obtenidos podrán utilizarse para la elaboración de Informes Técnicos cuando requiera la Secretaría de Ambiente.',
  'Si el plazo establecido para la entrega de los resultados coincide con fin de semana o feriado, los mismos se entregarán al siguiente día hábil.',
];

export const CATALOGO_SERVICIOS_MOCK = [
  {
    matriz: 'AGUA',
    collapsed: false,
    servicios: [
      { nombre: 'AGUAS SUPERFICIALES', aplicable: 'NÚMERO DE MUESTRAS', activo: false, cantidad: null },
      { nombre: 'AGUAS RESIDUALES', aplicable: 'NÚMERO DE MUESTRAS', activo: false, cantidad: null },
    ],
  },
  {
    matriz: 'AIRE',
    collapsed: false,
    servicios: [
      { nombre: 'FUENTES FIJAS DE COMBUSTIÓN', aplicable: 'NÚMERO DE FUENTES', activo: false, cantidad: null },
    ],
  },
  {
    matriz: 'RUIDO',
    collapsed: false,
    servicios: [
      { nombre: 'RUIDO AMBIENTE', aplicable: 'NÚMERO DE PUNTOS CRÍTICOS DE AFECTACIÓN', activo: false, cantidad: null },
    ],
  },
];

export const ENSAYOS_MUESTREO_MOCK = [
  {
    activo: false,
    producto: 'AGUAS SUPERFICIALES',
    parametro: 'SÓLIDOS SUSPENDIDOS TOTALES',
    metodoInterno: 'PEE/IAM-Q/42',
    metodoReferencia: 'NTE INEN ISO 5667-1 | UNE EN ISO 5667-6 | UNE EN ISO 5667-14',
  },
];

export const ENSAYOS_RESIDUALES_MOCK = [
  { activo: false, ensayo: 'DEMANDA QUÍMICA DE OXÍGENO', identificacion: 'DQO', metodoInterno: 'PEE/IAM-Q/03', metodoReferencia: 'APHA 5220 C', unidad: 'mg/L', naturaleza: 'Laboratorio' },
  { activo: false, ensayo: 'SÓLIDOS SUSPENDIDOS TOTALES', identificacion: 'SST', metodoInterno: 'PEE/IAM-Q/02', metodoReferencia: 'APHA 2540 D', unidad: 'mg/L', naturaleza: 'Laboratorio' },
];

export const ENSAYOS_AIRE_MOCK = [
  { activo: false, ensayo: 'MONÓXIDO DE CARBONO', identificacion: 'CO', metodoInterno: 'PEE/IAM-Q/07', metodoReferencia: 'EPA CTM-030', unidad: 'ppm / mg/Nm³*' },
  { activo: false, ensayo: 'DIÓXIDO DE AZUFRE', identificacion: 'SO2', metodoInterno: 'PEE/IAM-Q/07', metodoReferencia: 'EPA CTM-030', unidad: 'ppm / mg/Nm³*' },
];

export const ENSAYOS_RUIDO_MOCK = [
  { activo: false, ensayo: 'RUIDO AMBIENTAL', identificacion: '---', metodoInterno: 'PEE/IAM-Q/11', metodoReferencia: 'ANEXO 5 AM 097A | ISO 1996-2:2017', unidad: 'dB' },
];