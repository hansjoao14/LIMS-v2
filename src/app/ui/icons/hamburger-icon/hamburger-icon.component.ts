import { Component, Input } from '@angular/core';
import colors from '../../constants/colors';

@Component({
  selector: 'app-hamburger-icon',
  imports: [],
  templateUrl: './hamburger-icon.component.html',
  styleUrl: './hamburger-icon.component.css'
})
export class HamburgerIconComponent {

  @Input() size = 1;
  @Input() color = colors.black;

}
