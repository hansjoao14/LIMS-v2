import { Component } from '@angular/core';
import { PageHeader } from '../../shared/components/page-header/page-header';
import { CatalogoLista } from './catalogo/lista/catalogo-lista';
import { CatalogoFormulario } from './catalogo/formulario/catalogo-formulario';
import { ItemCatalogoLista } from './item-catalogo/lista/item-catalogo-lista';
import { ItemCatalogoFormulario } from './item-catalogo/formulario/item-catalogo-formulario';
import { Catalogo, ItemCatalogo } from '../../interfaces/catalogos/catalogo.interface';

@Component({
  selector: 'app-admin-catalogos',
  imports: [PageHeader, CatalogoLista, CatalogoFormulario, ItemCatalogoLista, ItemCatalogoFormulario],
  templateUrl: './admin-catalogos.html',
})
export class AdminCatalogos {
  vista: 'main' | 'form-catalogo' | 'form-item' = 'main';
  selectedCatalogo: Catalogo | null = null;
  editingCatalogo: Catalogo | null = null;
  editingItem: ItemCatalogo | null = null;
  reloadItemsTrigger = 0;

  onSelectCatalogo(c: Catalogo): void {
    this.selectedCatalogo = c;
  }

  onNuevoCatalogo(): void {
    this.editingCatalogo = null;
    this.vista = 'form-catalogo';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  onEditarCatalogo(c: Catalogo): void {
    this.editingCatalogo = c;
    this.vista = 'form-catalogo';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  onCatalogoGuardado(c: Catalogo): void {
    this.selectedCatalogo = c;
    this.vista = 'main';
    this.editingCatalogo = null;
  }

  onNuevoItem(): void {
    this.editingItem = null;
    this.vista = 'form-item';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  onEditarItem(item: ItemCatalogo): void {
    this.editingItem = item;
    this.vista = 'form-item';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  onItemGuardado(): void {
    this.vista = 'main';
    this.editingItem = null;
    this.reloadItemsTrigger++;
  }

  volverALista(): void {
    this.editingCatalogo = null;
    this.editingItem = null;
    this.vista = 'main';
  }
}
