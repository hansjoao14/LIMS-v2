import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';

import { SecuencialService } from '../../../services/secuencial.service';
import { CatalogoService } from '../../../services/catalogo.service';
import { ToastrAlertService } from '../../../services/toastr.service';
import { Secuencial, SecuencialPayload, FormatoSecuencial } from '../../../interfaces/secuencial/secuencial.interface';
import { ItemCatalogo } from '../../../interfaces/catalogos/catalogo.interface';
import { FieldSkeleton } from '../../../ui/field-skeleton/field-skeleton';

// Catálogo #9 = "Formularios" (item_catalogo.id ⇒ ctformulario_id)
const CATALOGO_FORMULARIOS_ID = 9;

type FormatoParteTipo = 'sigla' | 'numero' | 'anio' | 'alias';

interface FormatoParteUI {
  tipo: FormatoParteTipo;
  label: string;
  activo: boolean;
  valor: string;
}

const PARTES_DEFAULT: FormatoParteUI[] = [
  { tipo: 'sigla', label: 'Sigla / Prefijo', activo: true, valor: '' },
  { tipo: 'numero', label: 'Número secuencial', activo: true, valor: '' },
  { tipo: 'anio', label: 'Año', activo: true, valor: '' },
  { tipo: 'alias', label: 'Alias / Sufijo', activo: false, valor: '' },
];

@Component({
  selector: 'app-secuencial-formulario',
  imports: [CommonModule, FormsModule, FieldSkeleton],
  templateUrl: './secuencial-formulario.html',
})
export class SecuencialFormulario implements OnInit, OnDestroy {
  @Input() editingRecord: Secuencial | null = null;
  @Output() guardado = new EventEmitter<Secuencial>();
  @Output() cancelado = new EventEmitter<void>();

  private readonly destroy$ = new Subject<void>();

  saving = false;
  loadingFormularios = true;
  formularios: ItemCatalogo[] = [];

  identificadorSecu = '';
  sigla = '';
  moduloEstablecimientoId = '';
  ctformularioId: number | null = null;
  anio = new Date().getFullYear();
  numero = 0;
  estado = true;

  formatoPartes: FormatoParteUI[] = PARTES_DEFAULT.map(p => ({ ...p }));
  separador = '-';
  digitos = 5;

  get modoEdicion(): boolean {
    return !!this.editingRecord;
  }

  get partesActivas(): FormatoParteUI[] {
    return this.formatoPartes.filter(p => p.activo);
  }

  get preview(): string {
    const partes = this.partesActivas.map(p => {
      switch (p.tipo) {
        case 'sigla':
          return p.valor.trim() || 'SIGLA';
        case 'alias':
          return p.valor.trim() || 'ALIAS';
        case 'numero':
          return String(this.numero || 1).padStart(this.digitos, '0');
        case 'anio':
          return String(this.anio || new Date().getFullYear());
      }
    });
    return partes.join(this.separador);
  }

  constructor(
    private secuencialService: SecuencialService,
    private catService: CatalogoService,
    private toastrAlert: ToastrAlertService,
  ) {}

  ngOnInit(): void {
    this.cargarFormularios();

    if (this.editingRecord) {
      const r = this.editingRecord;
      this.identificadorSecu = r.identificador_secu;
      this.sigla = r.sigla;
      this.moduloEstablecimientoId = r.modulo_establecimiento_id;
      this.ctformularioId = r.ctformulario_id;
      this.anio = r.anio;
      this.numero = r.numero;
      this.estado = r.estado;
      this.parseFormato(r.formato);
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private cargarFormularios(): void {
    this.loadingFormularios = true;
    this.catService.getAllItemsAdmin(CATALOGO_FORMULARIOS_ID)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (items) => {
          this.formularios = items;
          this.loadingFormularios = false;
        },
        error: () => { this.loadingFormularios = false; },
      });
  }

  private parseFormato(formatoJson: string): void {
    try {
      const parsed = JSON.parse(formatoJson);
      const f = parsed?.formato ?? {};
      this.separador = f.separador ?? '-';
      this.digitos = f.digitos ?? 5;

      const tipos: FormatoParteTipo[] = ['sigla', 'numero', 'anio', 'alias'];
      const activos = tipos
        .filter(t => f[t] !== undefined)
        .sort((a, b) => f[a].orden - f[b].orden);
      const inactivos = tipos.filter(t => f[t] === undefined);

      this.formatoPartes = [...activos, ...inactivos].map(t => ({
        tipo: t,
        label: PARTES_DEFAULT.find(p => p.tipo === t)!.label,
        activo: f[t] !== undefined,
        valor: (t === 'sigla' || t === 'alias') ? (f[t]?.valor ?? '') : '',
      }));
    } catch {
      this.formatoPartes = PARTES_DEFAULT.map(p => ({ ...p }));
    }
  }

  private buildFormato(): FormatoSecuencial {
    const activas = this.partesActivas;
    const formato: Record<string, unknown> = {
      separador: this.separador,
      digitos: this.digitos,
    };
    activas.forEach((p, idx) => {
      const orden = idx + 1;
      if (p.tipo === 'numero' || p.tipo === 'anio') {
        formato[p.tipo] = { valor: true, orden };
      } else {
        formato[p.tipo] = { valor: p.valor.trim(), orden };
      }
    });
    return { formato } as FormatoSecuencial;
  }

  toggleParte(parte: FormatoParteUI): void {
    if (parte.tipo === 'sigla') return; // la sigla siempre es obligatoria en el formato
    parte.activo = !parte.activo;
  }

  moverArriba(index: number): void {
    if (index <= 0) return;
    this.swap(index, index - 1);
  }

  moverAbajo(index: number): void {
    if (index >= this.formatoPartes.length - 1) return;
    this.swap(index, index + 1);
  }

  private swap(i: number, j: number): void {
    const arr = this.formatoPartes;
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }

  guardar(): void {
    if (!this.identificadorSecu.trim()) {
      this.toastrAlert.showError('El identificador es obligatorio.', 'Campo requerido');
      return;
    }
    if (!this.sigla.trim()) {
      this.toastrAlert.showError('La sigla es obligatoria.', 'Campo requerido');
      return;
    }
    if (!this.moduloEstablecimientoId.trim()) {
      this.toastrAlert.showError('El módulo-establecimiento es obligatorio.', 'Campo requerido');
      return;
    }
    if (!this.ctformularioId) {
      this.toastrAlert.showError('Debes seleccionar un formulario.', 'Campo requerido');
      return;
    }

    this.saving = true;

    const payload: SecuencialPayload = {
      modulo_establecimiento_id: this.moduloEstablecimientoId.trim(),
      sigla: this.sigla.trim(),
      numero: this.numero,
      estado: this.estado,
      anio: this.anio,
      numero_secuencial: this.preview,
      ctformulario_id: this.ctformularioId,
      identificador_secu: this.identificadorSecu.trim(),
      formato: this.buildFormato(),
    };

    const op$ = this.modoEdicion
      ? this.secuencialService.updateSecuencial(this.editingRecord!.id, payload)
      : this.secuencialService.createSecuencial(payload);

    op$.pipe(takeUntil(this.destroy$)).subscribe({
      next: (result) => {
        this.saving = false;
        this.toastrAlert.showSuccess(
          this.modoEdicion ? 'Secuencial actualizado correctamente.' : 'Secuencial creado correctamente.',
          this.modoEdicion ? '¡Actualizado!' : '¡Creado!',
        );
        this.guardado.emit(result);
      },
      error: () => {
        this.saving = false;
        this.toastrAlert.showError('No se pudo guardar el secuencial.', 'Error');
      },
    });
  }
}
