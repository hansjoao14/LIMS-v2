import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationMeta } from '../../../interfaces/catalogos/catalogo.interface';

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

  get pages(): number[] {
    if (!this.meta) return [];
    return Array.from({ length: this.meta.totalPages }, (_, i) => i + 1);
  }
}
