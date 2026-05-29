import { Component, Input } from '@angular/core';
import colors from '../../constants/colors';

@Component({
  selector: 'app-calibracion-equipos-icon',
  imports: [],
  templateUrl: './calibracion-equipos-icon.html',
  styleUrl: './calibracion-equipos-icon.css',
})
export class CalibracionEquiposIcon {
  @Input() size = 1;
  @Input() color = colors.white;
}
