import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import Swal from 'sweetalert2';

import { ReportSolicitudService } from '../../services/solicitudes/lista-solicitudes/report-solicitud.service';
import { ReportSolicitud } from '../../interfaces/solicitudes/lista-solicitudes/report-solicitud.interface';
import { PaginationMeta } from '../../interfaces/catalogos/catalogo.interface';

@Component({
  selector: 'app-lista-solicitudes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './lista-solicitudes.html',
  styleUrls: ['./lista-solicitudes.css'],
})
export class ListaSolicitudes implements OnInit, OnDestroy {
  // ── Firma ────────────────────────────────────────────────────────────────
  viewingSignature = false;
  selectedDoc: ReportSolicitud | null = null;
  archivoFirma: File | null = null;
  claveFirma = '';
  isFirmando = false;

  // ── Lista ────────────────────────────────────────────────────────────────
  solicitudes: ReportSolicitud[] = [];
  meta: PaginationMeta | null = null;
  loading = true;
  currentPage = 1;
  readonly PAGE_SIZE = 10;

  readonly COLOR_PRIMARIO = '#1d2b64';
  readonly fechaActual = new Date();
  private readonly destroy$ = new Subject<void>();

  constructor(private reportSolicitudService: ReportSolicitudService) {}

  ngOnInit(): void {
    this.cargarPagina(1);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  cargarPagina(page: number): void {
    this.loading = true;
    this.currentPage = page;
    this.reportSolicitudService
      .getSolicitudes(page, this.PAGE_SIZE)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: ({ data, meta }) => {
          this.solicitudes = data;
          this.meta = meta;
          this.loading = false;
        },
        error: () => {
          this.loading = false;
          Swal.fire('Error', 'No se pudo cargar la lista de solicitudes', 'error');
        },
      });
  }

  get pages(): number[] {
    if (!this.meta) return [];
    return Array.from({ length: this.meta.totalPages }, (_, i) => i + 1);
  }

  // ── Firma ────────────────────────────────────────────────────────────────

  editarSolicitud(doc: ReportSolicitud): void {
    // TODO: navegar a la edición de la solicitud con doc.id_solicitud
    console.log('[Editar solicitud]', doc.id_solicitud);
  }

  abrirPanelFirma(doc: ReportSolicitud): void {
    this.selectedDoc = doc;
    this.archivoFirma = null;
    this.claveFirma = '';
    this.viewingSignature = true;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  regresarLista(): void {
    this.viewingSignature = false;
    this.selectedDoc = null;
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) return;
    const file = input.files[0];
    if (file.name.toLowerCase().endsWith('.p12')) {
      this.archivoFirma = file;
    } else {
      Swal.fire({
        title: 'Archivo no válido',
        text: 'Solo se aceptan certificados digitales en formato .p12',
        icon: 'warning',
        confirmButtonColor: this.COLOR_PRIMARIO,
      });
      input.value = '';
      this.archivoFirma = null;
    }
  }

  ejecutarFirma(): void {
    if (!this.archivoFirma || !this.claveFirma) {
      Swal.fire({
        title: 'Datos Incompletos',
        text: 'Por favor cargue su certificado .p12 e ingrese la contraseña para firmar.',
        icon: 'warning',
        confirmButtonColor: this.COLOR_PRIMARIO,
      });
      return;
    }

    this.isFirmando = true;
    setTimeout(() => {
      this.isFirmando = false;
      Swal.fire({
        title: '¡Documento Firmado!',
        text: `El documento ${this.selectedDoc?.num_secuencial ?? this.selectedDoc?.id_solicitud} ha sido firmado electrónicamente con éxito.`,
        icon: 'success',
        confirmButtonColor: this.COLOR_PRIMARIO,
        timer: 3000,
      }).then(() => this.regresarLista());
    }, 1500);
  }
}
