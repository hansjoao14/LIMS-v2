import { Component, Input, Output, EventEmitter, OnInit, OnDestroy, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';

import { AuthService } from '../../auth/service/auth-service';
import { ToastrAlertService } from '../../../services/toastr.service';
import { CalibracionEquipo } from '../../../interfaces/calibracion-equipos/calibracion-equipos.interface';

export interface ChecklistItem {
  key: string;
  label: string;
  valor: boolean;
}

const OPCIONES_EQUIPO_STUB = [
  { id: 'EQ-001', codigo: 'SN-001', nombre: 'Sonómetro SVANTEK SV 971A', ultima_calibracion: '2024-11-27' },
  { id: 'EQ-002', codigo: 'SN-002', nombre: 'Sonómetro Brüel & Kjær 2250', ultima_calibracion: '2024-11-28' },
];

const OPCIONES_CALIBRADOR_STUB = [
  { id: 'CA-001', codigo: 'CAL-001', nombre: 'Calibrador Brüel & Kjær 4231', ultima_calibracion: '2024-11-28' },
  { id: 'CA-002', codigo: 'CAL-002', nombre: 'Calibrador G.R.A.S. 42AB', ultima_calibracion: '2024-11-29' },
];

const OPCIONES_PATRON_STUB = [
  { id: 'PL-001', codigo: 'PL-001', nombre: 'Patrón de Laboratorio CESVA SC310', ultima_calibracion: '2024-11-28' },
];

const OPCIONES_ESTACION_STUB = [
  { id: 'ME-001', codigo: 'ME-001', nombre: 'Estación Davis Vantage Pro2', ultima_calibracion: '2024-10-15' },
];

@Component({
  selector: 'app-calibracion-equipos-formulario',
  imports: [CommonModule, FormsModule],
  templateUrl: './calibracion-equipos-formulario.html',
})
export class CalibracionEquiposFormulario implements OnInit, OnDestroy {
  @Input() editingRecord: CalibracionEquipo | null = null;
  @Output() guardado = new EventEmitter<void>();
  @Output() cancelado = new EventEmitter<void>();

  private authService = inject(AuthService);
  private toastrAlert = inject(ToastrAlertService);
  private readonly destroy$ = new Subject<void>();

  saving = false;

  readonly nombreAnalista = computed(() =>
    this.authService.userProfile()?.name ?? '—'
  );

  // Fecha verificación
  fechaVerificacion: string = new Date().toISOString().split('T')[0];

  // Opciones de catálogos (stubs para el modelo)
  opcionesSonometro = OPCIONES_EQUIPO_STUB;
  opcionesCalibrador = OPCIONES_CALIBRADOR_STUB;
  opcionesPatron = OPCIONES_PATRON_STUB;
  opcionesEstacion = OPCIONES_ESTACION_STUB;

  // Selecciones de códigos
  codigoSonometroId: string | null = null;
  codigoCalibradorId: string | null = null;
  codigoPatronId: string | null = null;
  codigoEstacionId: string | null = null;

  // Lecturas
  lecturaPC: string = '';
  lecturaPL: string = '';
  toleranciaPatron: string = '';

  // Checklist
  checklist: ChecklistItem[] = [
    { key: 'bateria_aa_sonometro',   label: '4 Baterías AA adicionales para Sonómetro',                    valor: false },
    { key: 'bateria_aaa_pistofono',  label: '2 Baterías AAA adicionales para Pistófono',                   valor: false },
    { key: 'bateria_aaa_estacion',   label: '2 Baterías AAA adicionales para Estación Meteorológica',       valor: false },
    { key: 'cargador_baterias',      label: 'Cargador para baterías AA y AAA',                              valor: false },
    { key: 'gps',                    label: 'GPS',                                                          valor: false },
    { key: 'tripode_sonometro',      label: 'Trípode para Sonómetro',                                       valor: false },
    { key: 'tripode_estacion',       label: 'Trípode para Estación Meteorológica',                          valor: false },
    { key: 'procesador_formato',     label: 'Procesador con formato F-PEE-11-01 (Laptop, celular o ...)',   valor: false },
  ];

  observaciones: string = '';

  get modoEdicion(): boolean {
    return !!this.editingRecord;
  }

  // Computados de aseguramiento
  get errorPC(): string {
    const lectura = parseFloat(this.lecturaPC);
    if (isNaN(lectura)) return '—';
    return Math.abs(lectura - 114).toFixed(1) + ' DB';
  }

  get errorPL(): string {
    const lectura = parseFloat(this.lecturaPL);
    if (isNaN(lectura)) return '—';
    return Math.abs(lectura - 114).toFixed(1) + ' DB';
  }

  get evaluacion(): 'CUMPLE' | 'NO CUMPLE' | null {
    const tolerancia = parseFloat(this.toleranciaPatron);
    const lecPC = parseFloat(this.lecturaPC);
    const lecPL = parseFloat(this.lecturaPL);
    if (isNaN(tolerancia) || isNaN(lecPC) || isNaN(lecPL)) return null;
    const errPC = Math.abs(lecPC - 114);
    const errPL = Math.abs(lecPL - 114);
    return errPC <= tolerancia && errPL <= tolerancia ? 'CUMPLE' : 'NO CUMPLE';
  }

  get sonometroSeleccionado() {
    return this.opcionesSonometro.find(e => e.id === this.codigoSonometroId) ?? null;
  }

  get calibradorSeleccionado() {
    return this.opcionesCalibrador.find(e => e.id === this.codigoCalibradorId) ?? null;
  }

  get patronSeleccionado() {
    return this.opcionesPatron.find(e => e.id === this.codigoPatronId) ?? null;
  }

  get estacionSeleccionada() {
    return this.opcionesEstacion.find(e => e.id === this.codigoEstacionId) ?? null;
  }

  ngOnInit(): void {
    if (this.editingRecord) {
      this.fechaVerificacion = this.editingRecord.fecha_verificacion ?? new Date().toISOString().split('T')[0];
      this.observaciones     = this.editingRecord.observaciones ?? '';
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  toggleChecklist(item: ChecklistItem): void {
    item.valor = !item.valor;
  }

  cargarArchivos(): void {
    // Integrar con servicio de archivos cuando esté disponible
  }

  verificar(): void {
    // Lógica de verificación
  }

  guardar(): void {
    if (!this.codigoSonometroId || !this.codigoCalibradorId || !this.codigoPatronId) {
      this.toastrAlert.showError('Complete los códigos de equipos requeridos.', 'Campos requeridos');
      return;
    }
    this.saving = true;
    // TODO: integrar con servicio de guardado
    setTimeout(() => {
      this.saving = false;
      this.toastrAlert.showSuccess(
        this.modoEdicion ? 'Registro actualizado correctamente.' : 'Registro guardado correctamente.',
        this.modoEdicion ? '¡Actualizado!' : '¡Guardado!'
      );
      this.guardado.emit();
    }, 800);
  }

  formatFecha(fecha: string | null): string {
    if (!fecha) return '—';
    const [y, m, d] = fecha.split('-');
    return `${d}/${m}/${y}`;
  }
}
