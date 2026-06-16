import { EnsayoItem, EnsayoItemNode } from '../../interfaces/ensayos/ensayo.interface';
import { ItemCatalogo } from '../../interfaces/catalogos/catalogo.interface';

export function buildFlatNodes(
  ensayoItems: EnsayoItem[],
  externalParents: Map<number, ItemCatalogo>,
  knownIds: Set<number>,
  parentCatId: number | null,
  nivel: number,
): EnsayoItemNode[] {
  const result: EnsayoItemNode[] = [];

  if (parentCatId === null) {
    externalParents.forEach((ext) => {
      const ownParentKnown =
        ext.item_catalogo_id !== null &&
        (knownIds.has(ext.item_catalogo_id!) || externalParents.has(ext.item_catalogo_id!));
      if (!ownParentKnown) {
        result.push({ isExternal: true, nivel, catId: ext.id, catNombre: ext.nombre });
        result.push(...buildFlatNodes(ensayoItems, externalParents, knownIds, ext.id, nivel + 1));
      }
    });

    ensayoItems
      .filter((ei) => {
        const pid = ei.item_catalogo?.item_catalogo_id;
        return pid === null || pid === undefined || (!knownIds.has(pid) && !externalParents.has(pid));
      })
      .forEach((ei) => result.push({ isExternal: false, nivel, ensayoItem: ei }));
  } else {
    ensayoItems
      .filter((ei) => ei.item_catalogo?.item_catalogo_id === parentCatId)
      .forEach((ei) => result.push({ isExternal: false, nivel, ensayoItem: ei }));

    externalParents.forEach((ext) => {
      if (ext.item_catalogo_id === parentCatId) {
        result.push({ isExternal: true, nivel, catId: ext.id, catNombre: ext.nombre });
        result.push(...buildFlatNodes(ensayoItems, externalParents, knownIds, ext.id, nivel + 1));
      }
    });
  }

  return result;
}
