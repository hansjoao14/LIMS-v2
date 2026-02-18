import { Component, Input } from '@angular/core';
import colors from '../../constants/colors';

@Component({
  selector: 'app-lista-solicitudes-icon',
  imports: [],
  templateUrl: './lista-solicitudes-icon.html',
  styleUrl: './lista-solicitudes-icon.css',
})
export class ListaSolicitudesIcon {
  @Input() size = 1;
  @Input() color = colors.white;
}
