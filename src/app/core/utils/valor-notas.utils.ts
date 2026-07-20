export interface NotaValor {
  header: string;
  detail: string;
}

// El campo "valor" de item_catalogo se usa para texto simple (p. ej. "m3")
// en la mayoría de ítems, pero en algunos guarda una lista de notas en JSON
// (ver report-catalogo/ensayo-item). Solo se reconoce como "lista de notas"
// si TODO el contenido es un array de objetos {header, detail} — cualquier
// otra forma de JSON o texto plano se trata como texto simple.
export function parsearNotasValor(raw: string | null | undefined): NotaValor[] | null {
  const texto = (raw ?? '').trim();
  if (!texto.startsWith('[')) return null;
  try {
    const parsed = JSON.parse(texto);
    if (
      Array.isArray(parsed) &&
      parsed.length > 0 &&
      parsed.every((n) => n && typeof n === 'object' && 'header' in n && 'detail' in n)
    ) {
      return parsed.map((n) => ({
        header: String(n.header ?? ''),
        detail: String(n.detail ?? ''),
      }));
    }
  } catch {
    // No era JSON válido — se trata como texto simple.
  }
  return null;
}
