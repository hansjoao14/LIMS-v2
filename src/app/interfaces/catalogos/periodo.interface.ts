export interface Ejercicio {
  anio: number;
  ctestado_id: number;
  descripcion: string;
  id: number;
}

export interface EjercicioCollectionResponse {
  data: Ejercicio[];
}

export interface Periodo {
  ctestado_id: number;
  ejercicio_id: number;
  estado: boolean;
  id: number;
  mes: number;
  nombre_mes: string;
}

export interface PeriodoCollectionResponse {
  count: number;
  data: Periodo[];
}
