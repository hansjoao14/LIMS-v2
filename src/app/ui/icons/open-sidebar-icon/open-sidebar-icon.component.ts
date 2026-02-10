import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-open-sidebar-icon',
  imports: [],
  templateUrl: './open-sidebar-icon.component.html',
  styleUrl: './open-sidebar-icon.component.css',
})
export class OpenSidebarIconComponent {
  @Input() size = 1;
  @Input() color = '#E32C2D';
}
