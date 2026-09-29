import { Component } from '@angular/core';
import { PageHeader } from '../../shared/components/page-header/page-header';
import { ControlBienesFormulario } from './formulario/control-bienes-formulario';

@Component({
  selector: 'app-control-bienes',
  standalone: true,
  imports: [PageHeader, ControlBienesFormulario],
  templateUrl: './control-bienes.html',
  styleUrls: ['./control-bienes.css'],
})
export class ControlBienes {}
