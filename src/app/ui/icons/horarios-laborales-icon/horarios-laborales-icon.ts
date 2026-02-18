import { Component, Input } from '@angular/core';
import colors from '../../constants/colors';

@Component({
  selector: 'app-horarios-laborales-icon',
  imports: [],
  templateUrl: './horarios-laborales-icon.html',
  styleUrl: './horarios-laborales-icon.css',
})
export class HorariosLaboralesIcon {



  @Input() size = 1;
  @Input() color = colors.white;
}
