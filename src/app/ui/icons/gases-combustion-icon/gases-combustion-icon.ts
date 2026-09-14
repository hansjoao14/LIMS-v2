import { Component, Input } from '@angular/core';
import colors from '../../constants/colors';

@Component({
  selector: 'app-gases-combustion-icon',
  imports: [],
  templateUrl: './gases-combustion-icon.html',
  styleUrl: './gases-combustion-icon.css',
})
export class GasesCombustionIcon {
  @Input() size = 1;
  @Input() color = colors.white;
}
