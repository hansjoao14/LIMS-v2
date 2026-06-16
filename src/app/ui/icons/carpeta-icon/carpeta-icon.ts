import { Component, Input } from '@angular/core';
import colors from '../../constants/colors';

@Component({
  selector: 'app-carpeta-icon',
  imports: [],
  templateUrl: './carpeta-icon.html',
  styleUrl: './carpeta-icon.css',
})
export class CarpetaIcon {


    @Input() size = 1;
  @Input() color = colors.white;

}
