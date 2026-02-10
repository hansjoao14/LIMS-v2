import { Component, Input } from '@angular/core';
import colors from '../../constants/colors';

@Component({
  selector: 'app-settings',
  imports: [],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})
export class SettingsComponent {

  @Input() size = 1;
  @Input() color = colors.black;

}
