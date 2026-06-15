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
export class HorariosLaborales implements OnInit, OnDestroy {
  @ViewChild(HorariosLaboralesLista) listaRef!: HorariosLaboralesLista;

  editingRecord:  VehiculoRecord | null = null;
  formularioNombre = 'Solicitud de transporte';
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
    return role ? hasPermission(MenuKey.HORARIOS_LABORALES, role, 'crear') : false;
  });

  constructor(
    private authService: AuthService,
    private reportFormularioService: ReportFormularioService,
  ) {}

  ngOnInit(): void {
    this.reportFormularioService
      .getFormularioByCTId(1002)
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
