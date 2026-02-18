import { Component, Input } from '@angular/core';
import colors from '../../constants/colors';

@Component({
  selector: 'app-por-contraloria-icon',
  imports: [],
  templateUrl: './por-contraloria-icon.html',
  styleUrl: './por-contraloria-icon.css',
})
export class PorContraloriaIcon {

    @Input() size = 1;
  @Input() color = colors.white;

}
