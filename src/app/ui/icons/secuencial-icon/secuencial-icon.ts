import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-secuencial-icon',
  imports: [],
  templateUrl: './secuencial-icon.html',
  styleUrl: './secuencial-icon.css',
})
export class SecuencialIcon {
  @Input() size = 1;
  @Input() color = '#ffffff';
}
