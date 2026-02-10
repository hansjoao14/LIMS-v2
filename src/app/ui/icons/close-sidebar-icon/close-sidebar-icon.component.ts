import { Component, Input } from '@angular/core';
import colors from '../../constants/colors';


@Component({
  selector: 'app-close-sidebar-icon',
  imports: [],
  templateUrl: './close-sidebar-icon.component.html',
  styleUrl: './close-sidebar-icon.component.css',
})
export class CloseSidebarIconComponent {
  @Input() size = 1;
  @Input() color = colors.blue;
}
