import { Component, Input } from '@angular/core';
import colors from '../../constants/colors';

@Component({
  selector: 'app-plan-muestreo-icon',
  imports: [],
  templateUrl: './plan-muestreo-icon.html',
  styleUrl: './plan-muestreo-icon.css',
})
export class PlanMuestreoIcon {

    @Input() size = 1;
  @Input() color = colors.white;

}
