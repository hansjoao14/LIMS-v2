import { Component, Input } from '@angular/core';
import colors from '../../constants/colors';

@Component({
  selector: 'app-notification-icon',
  imports: [],
  templateUrl: './notification-icon.component.html',
  styleUrl: './notification-icon.component.css'
})
export class NotificationIconComponent {


  @Input() size = 1;
  @Input() color = colors.black;

}
