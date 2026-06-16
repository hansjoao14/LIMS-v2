import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-book-icon',
  imports: [],
  templateUrl: './book-icon.html',
  styleUrl: './book-icon.css',
})
export class BookIcon {
  @Input() size = 1;
  @Input() color = '#ffffff';
}
