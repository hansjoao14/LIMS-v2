import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-car-icon',
  imports: [],
  templateUrl: './car-icon.html',
  styleUrl: './car-icon.css',
})
export class CarIcon {


  @Input() size = 1;
  @Input() color ='#E32C2D';

}
