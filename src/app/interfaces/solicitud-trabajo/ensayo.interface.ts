export interface EnsayoMuestreo {
  activo: boolean;
  producto: string;
  parametro: string;
  metodoInterno: string;
  metodoReferencia: string;
}

export interface EnsayoLaboratorio {
  activo: boolean;
  ensayo: string;
  identificacion: string;
  metodoInterno: string;
  metodoReferencia: string;
  unidad: string;
  naturaleza?: string;
}
