import { Component, ViewChild, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRole, MenuKey, hasPermission } from '../../core/utils/roles.constans';
import { AuthService } from '../auth/service/auth-service';
import { FieldConfig } from '../solicitud-trabajo/model/solicitud-trabajo.model';
import { PageHeader } from '../../shared/components/page-header/page-header';
import {
  PorContraloriaFormulario, FormularioReadyEvent,
} from './formulario/por-contraloria-formulario';
import { PorContraloriaLista } from './lista/por-contraloria-lista';

type ContraloriaRecord = { id: string } & Record<string, unknown>;

@Component({
  selector: 'app-por-contraloria',
  standalone: true,
  imports: [CommonModule, PageHeader, PorContraloriaFormulario, PorContraloriaLista],
  templateUrl: './por-contraloria.html',
  styleUrls: ['./por-contraloria.css'],
})
export class PorContraloria {
  @ViewChild(PorContraloriaLista) listaRef!: PorContraloriaLista;

  editingRecord:   ContraloriaRecord | null = null;
  formularioNombre = 'Solicitud de transporte - Contraloría';
  fields:          FieldConfig[] = [];
  formularioId:    string | null = null;

  private userAppRole = computed<AppRole | null>(() => {
    const roles = this.authService.userProfile()?.roles ?? [];
    return (Object.values(AppRole) as AppRole[]).find(r => roles.includes(r)) ?? null;
  });

  canCreate = computed(() => {
    const role = this.userAppRole();
    return role ? hasPermission(MenuKey.POR_CONTRALORIA, role, 'crear') : false;
  });

  constructor(private authService: AuthService) {}

  onFormularioReady(event: FormularioReadyEvent): void {
    this.formularioNombre = event.nombre;
    this.fields           = event.fields;
    this.formularioId     = event.formularioId;
  }

  onEditar(record: ContraloriaRecord): void {
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
