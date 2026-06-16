import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-flask-icon',
  imports: [],
  templateUrl: './flask-icon.html',
  styleUrl: './flask-icon.css',
})
export class FlaskIcon {
  @Input() size = 1;
  @Input() color = '#ffffff';
}
