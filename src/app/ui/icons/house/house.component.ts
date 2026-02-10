import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-house',
  imports: [],
  templateUrl: './house.component.html',
  styleUrl: './house.component.css'
})
export class HouseComponent {

  @Input() size = 0.9;
  @Input() color ='#E32C2D';

}
