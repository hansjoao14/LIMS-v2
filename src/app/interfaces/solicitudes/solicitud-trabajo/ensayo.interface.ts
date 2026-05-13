export interface EnsayoMuestreo {
  activo: boolean;
  ensayo_id?: number;
  ctambiental_id?: number;
  producto: string;
  parametro: string;
  metodoInterno: string;
  metodoReferencia: string;
}

export interface EnsayoLaboratorio {
  activo: boolean;
  ensayo_id?: number;
  ctambiental_id?: number;
  ensayo: string;
  identificacion: string;
  metodoInterno: string;
  metodoReferencia: string;
  unidad: string;
  naturaleza?: string;
}
