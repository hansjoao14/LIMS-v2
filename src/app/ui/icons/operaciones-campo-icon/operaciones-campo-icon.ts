import { Component, Input } from '@angular/core';
import colors from '../../constants/colors';

@Component({
  selector: 'app-operaciones-campo-icon',
  imports: [],
  templateUrl: './operaciones-campo-icon.html',
  styleUrl: './operaciones-campo-icon.css',
})
export class OperacionesCampoIcon {
  @Input() size = 1;
  @Input() color = colors.white;
}
