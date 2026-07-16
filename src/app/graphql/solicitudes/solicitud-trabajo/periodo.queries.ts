import { gql } from 'apollo-angular';
import { META_FIELDS } from '../../fragments';

export const GET_EJERCICIO_BY_ANIO = gql`
  query GetEjercicioByAnio($anio: Int!) {
    collectionEjercicio(
      query: { where: { anio: { equals: $anio }, estado: { equals: true } } }
    ) {
      data {
        anio
        ctestado_id
        descripcion
        id
      }
      meta { ${META_FIELDS} }
    }
  }
`;

export const GET_PERIODO_BY_EJERCICIO_MES = gql`
  query GetPeriodoByEjercicioMes($ejercicioId: Int!, $mes: Int!) {
    collectionPeriodo(
      query: {
        where: {
          ejercicio: { id: { equals: $ejercicioId } }
          estado: { equals: true }
          mes: { equals: $mes }
        }
      }
    ) {
      count
      data {
        ctestado_id
        ejercicio_id
        estado
        id
        mes
        nombre_mes
      }
      meta { ${META_FIELDS} }
    }
  }
`;
