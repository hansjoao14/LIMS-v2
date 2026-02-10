import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-close-icon',
  imports: [],
  templateUrl: './close-icon.component.html',
  styleUrl: './close-icon.component.css'
})
export class CloseIconComponent {



  @Input() size = 1;
  @Input() color ='#E32C2D';

}
