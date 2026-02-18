import { Component, Input } from '@angular/core';
import colors from '../../constants/colors';

@Component({
  selector: 'app-orden-trabajo-in-situ-icon',
  imports: [],
  templateUrl: './orden-trabajo-in-situ-icon.html',
  styleUrl: './orden-trabajo-in-situ-icon.css',
})
export class OrdenTrabajoInSituIcon {
  @Input() size = 1;
  @Input() color = colors.white;
}
