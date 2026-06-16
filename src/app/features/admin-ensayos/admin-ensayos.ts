import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageHeader } from '../../shared/components/page-header/page-header';
import { EnsayoLista } from './ensayo/lista/ensayo-lista';
import { EnsayoFormulario } from './ensayo/formulario/ensayo-formulario';
import { EnsayoItemLista } from './ensayo-item/lista/ensayo-item-lista';
import { EnsayoItemFormulario } from './ensayo-item/formulario/ensayo-item-formulario';
import { Ensayo, EnsayoItem } from '../../interfaces/ensayos/ensayo.interface';

@Component({
  selector: 'app-admin-ensayos',
  imports: [CommonModule, PageHeader, EnsayoLista, EnsayoFormulario, EnsayoItemLista, EnsayoItemFormulario],
  templateUrl: './admin-ensayos.html',
})
export class AdminEnsayos {
  vista: 'main' | 'form-ensayo' | 'form-item' = 'main';
  selectedEnsayo: Ensayo | null = null;
  editingEnsayo: Ensayo | null = null;
  editingItem: EnsayoItem | null = null;
  reloadItemsTrigger = 0;

  onSeleccionar(e: Ensayo): void {
    this.selectedEnsayo = e;
  }

  onNuevoEnsayo(): void {
    this.editingEnsayo = null;
    this.vista = 'form-ensayo';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  onEditarEnsayo(e: Ensayo): void {
    this.editingEnsayo = e;
    this.vista = 'form-ensayo';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  onGuardadoEnsayo(e: Ensayo): void {
    this.selectedEnsayo = e;
    this.vista = 'main';
    this.editingEnsayo = null;
  }

  onCanceladoEnsayo(): void {
    this.editingEnsayo = null;
    this.vista = 'main';
  }

  onNuevoItem(): void {
    this.editingItem = null;
    this.vista = 'form-item';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  onEditarItem(item: EnsayoItem): void {
    this.editingItem = item;
    this.vista = 'form-item';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  onGuardadoItem(): void {
    this.vista = 'main';
    this.editingItem = null;
    this.reloadItemsTrigger++;
  }

  onCanceladoItem(): void {
    this.editingItem = null;
    this.vista = 'main';
  }
}
