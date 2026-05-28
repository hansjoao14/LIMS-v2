import { Component, ViewChild, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRole, MenuKey, hasPermission } from '../../core/utils/roles.constans';
import { AuthService } from '../auth/service/auth-service';
import { FieldConfig } from '../solicitud-trabajo/model/solicitud-trabajo.model';
import { PageHeader } from '../../shared/components/page-header/page-header';
import {
  HorariosLaboralesFormulario, FormularioReadyEvent,
} from './formulario/horarios-laborales-formulario';
import { HorariosLaboralesLista } from './lista/horarios-laborales-lista';

type VehiculoRecord = { id: string } & Record<string, unknown>;

@Component({
  selector: 'app-horarios-laborales',
  standalone: true,
  imports: [CommonModule, PageHeader, HorariosLaboralesFormulario, HorariosLaboralesLista],
  templateUrl: './horarios-laborales.html',
  styleUrls: ['./horarios-laborales.css'],
})
export class HorariosLaborales {
  @ViewChild(HorariosLaboralesLista) listaRef!: HorariosLaboralesLista;

  editingRecord:  VehiculoRecord | null = null;
  formularioNombre = 'Solicitud de transporte';
  fields:          FieldConfig[] = [];
  formularioId:    number | null = null;

  private userAppRole = computed<AppRole | null>(() => {
    const roles = this.authService.userProfile()?.roles ?? [];
    return (Object.values(AppRole) as AppRole[]).find(r => roles.includes(r)) ?? null;
  });

  canCreate = computed(() => {
    const role = this.userAppRole();
    return role ? hasPermission(MenuKey.HORARIOS_LABORALES, role, 'crear') : false;
  });

  constructor(private authService: AuthService) {}

  onFormularioReady(event: FormularioReadyEvent): void {
    this.formularioNombre = event.nombre;
    this.fields           = event.fields;
    this.formularioId     = event.formularioId;
  }

  onEditar(record: VehiculoRecord): void {
    this.editingRecord = record;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  onGuardado(): void {
    this.editingRecord = null;
    this.listaRef?.cargarDatos();
  }

  onCancelado(): void {
    this.editingRecord = null;
  }
}
