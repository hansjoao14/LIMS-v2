import { Component, ViewChild, computed, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';
import { AppRole, MenuKey, hasPermission } from '../../core/utils/roles.constans';
import { AuthService } from '../auth/service/auth-service';
import { FieldConfig } from '../solicitud-trabajo/model/solicitud-trabajo.model';
import { ReportFormularioService } from '../../services/admin-formularios/report-formulario.service';
import { ReportFormulario } from '../../interfaces/admin-formularios/report-formulario.interface';
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
export class PorContraloria implements OnInit, OnDestroy {
  @ViewChild(PorContraloriaLista) listaRef!: PorContraloriaLista;

  editingRecord:   ContraloriaRecord | null = null;
  formularioNombre = 'Solicitud de transporte - Contraloría';
  fields:          FieldConfig[] = [];
  formularioId:    string | null = null;

  formulario: ReportFormulario | null = null;
  fechaEmision: Date | null = null;

  private readonly destroy$ = new Subject<void>();

  private userAppRole = computed<AppRole | null>(() => {
    const roles = this.authService.userProfile()?.roles ?? [];
    return (Object.values(AppRole) as AppRole[]).find(r => roles.includes(r)) ?? null;
  });

  canCreate = computed(() => {
    const role = this.userAppRole();
    return role ? hasPermission(MenuKey.POR_CONTRALORIA, role, 'crear') : false;
  });

  constructor(
    private authService: AuthService,
    private reportFormularioService: ReportFormularioService,
  ) {}

  ngOnInit(): void {
    this.reportFormularioService
      .getFormularioByCTId(1003)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (formulario) => {
          this.formulario = formulario;
          if (formulario?.fecha_emision) {
            this.fechaEmision = new Date(Number(formulario.fecha_emision));
          }
        },
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

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
