import { Component, Input } from '@angular/core';
import colors from '../../constants/colors';

@Component({
  selector: 'app-ticket-muestras-icon',
  imports: [],
  templateUrl: './ticket-muestras-icon.html',
  styleUrl: './ticket-muestras-icon.css',
})
export class TicketMuestrasIcon {
  @Input() size = 1;
  @Input() color = colors.white;
}
