import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-field-skeleton',
  standalone: true,
  templateUrl: './field-skeleton.html',
})
export class FieldSkeleton {
  // Tailwind v4 detecta estas clases en el archivo: h-8 h-9 h-10 h-11 h-12
  @Input() height = 'h-10';
}
