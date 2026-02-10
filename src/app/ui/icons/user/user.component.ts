import { Component, Input } from '@angular/core';
import colors from '../../constants/colors';

@Component({
  selector: 'app-user',
  imports: [],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {

  @Input() size = 1;
  @Input() color = colors.black;

}
