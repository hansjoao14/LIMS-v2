import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationMeta } from '../../../interfaces/catalogos/catalogo.interface';

export type PageItem = number | '...';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pagination.html',
})
export class PaginationComponent {
  @Input() meta: PaginationMeta | null = null;
  @Input() currentPage = 1;
  @Input() itemsShown = 0;
  @Input() itemLabel = 'registros';
  @Output() pageChange = new EventEmitter<number>();

  get pageItems(): PageItem[] {
    if (!this.meta) return [];
    const total = this.meta.totalPages;
    const cur = this.currentPage;

    if (total <= 7) {
      return Array.from({ length: total }, (_, i) => i + 1);
    }

    const items: PageItem[] = [1];

    if (cur > 3) items.push('...');

    const start = Math.max(2, cur - 1);
    const end = Math.min(total - 1, cur + 1);
    for (let i = start; i <= end; i++) items.push(i);

    if (cur < total - 2) items.push('...');
    items.push(total);

    return items;
  }

  isNumber(item: PageItem): item is number {
    return typeof item === 'number';
  }
}
