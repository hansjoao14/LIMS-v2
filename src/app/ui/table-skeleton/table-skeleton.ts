import { Component, Input } from '@angular/core';

@Component({
  selector: 'tbody[appTableSkeleton]',
  standalone: true,
  templateUrl: './table-skeleton.html',
})
export class TableSkeleton {
  @Input() rows = 8;
  @Input() cols = 4;
  @Input() actionButtons = 0;

  // Tailwind v4 escanea este archivo: todas las clases quedan incluidas en el bundle
  readonly widths = ['w-3/4', 'w-4/5', 'w-2/3', 'w-1/2'];

  get rowsArr() { return Array(this.rows).fill(0); }
  get colsArr() { return Array(this.cols).fill(0).map((_, i) => i); }
  get actionArr() { return Array(this.actionButtons).fill(0); }
}
