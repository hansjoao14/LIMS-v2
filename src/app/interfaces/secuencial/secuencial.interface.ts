import { PaginationMeta } from '../catalogos/catalogo.interface';

// ── Forma normalizada usada en la UI ──────────────────────────────────────────
export interface Secuencial {
  id: string;
  modulo_establecimiento_id: string;
  modulo_id: string | null;
  modulo_nombre: string | null;
  establecimiento_id: string | null;
  establecimiento_nombre: string | null;
  sigla: string;
  numero: number;
  estado: boolean;
  anio: number;
  numero_secuencial: string;
  ctformulario_id: number;
  formulario_id: string | null;
  formulario_nombre: string | null;
  identificador_secu: string;
  formato: string;
  creado_en: string | null;
  creado_por: string | null;
  actualizado_en: string | null;
  actualizado_por: string | null;
}

// ── Forma cruda tal cual la entrega el backend (todos los campos como String) ─
export interface SecuencialGraphQL {
  id: string;
  modulo_establecimiento_id: string;
  modulo_id: string | null;
  modulo_nombre: string | null;
  establecimiento_id: string | null;
  establecimiento_nombre: string | null;
  sigla: string;
  numero: string;
  estado: string;
  anio: string;
  numero_secuencial: string;
  ctformulario_id: string;
  formulario_id: string | null;
  formulario_nombre: string | null;
  identificador_secu: string;
  formato: string;
  creado_en: string | null;
  creado_por: string | null;
  actualizado_en: string | null;
  actualizado_por: string | null;
}

export interface CollectionSecuencialResponse {
  count: number;
  data: SecuencialGraphQL[];
  meta: PaginationMeta;
}

// ── Constructor visual del campo "formato" ────────────────────────────────────
export type FormatoParteTipo = 'sigla' | 'numero' | 'anio' | 'alias';

export interface FormatoParte {
  tipo: FormatoParteTipo;
  activo: boolean;
  valor: string;
}

export interface FormatoSecuencial {
  formato: {
    sigla?: { valor: string; orden: number };
    numero?: { valor: boolean; orden: number };
    anio?: { valor: boolean; orden: number };
    alias?: { valor: string; orden: number };
    separador: string;
    digitos: number;
  };
}

// El backend espera "formato" como objeto anidado en el body (no como string
// doblemente serializado) al crear/actualizar; al leer via GraphQL sí llega como string.
export interface SecuencialPayload {
  modulo_establecimiento_id: string;
  sigla: string;
  numero: number;
  estado: boolean;
  anio: number;
  numero_secuencial: string;
  ctformulario_id: number;
  identificador_secu: string;
  formato: FormatoSecuencial;
}
