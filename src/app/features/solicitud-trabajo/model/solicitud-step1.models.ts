export interface EntidadItem {
  id: string;
  nombre: string;
}

export interface TecnicoItem {
  id: string;
  entidadId: string;
  nombre: string;
  cargo: string;
}