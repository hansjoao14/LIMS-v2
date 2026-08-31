import { Component, NgZone, OnDestroy } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';

import { PageHeader } from '../../shared/components/page-header/page-header';
import { CalibracionEquiposLista } from './lista/calibracion-equipos-lista';
import { CalibracionEquiposFormulario } from './formulario/calibracion-equipos-formulario';
import { PdfViewerComponent } from '../../shared/components/pdf-viewer/pdf-viewer';
import { CalibracionEquipo } from '../../interfaces/calibracion-equipos/calibracion-equipos.interface';
import { CalibracionEquiposService } from '../../services/calibracion-equipos/calibracion-equipos.service';
import { ToastrAlertService } from '../../services/toastr.service';

@Component({
  selector: 'app-calibracion-equipos',
  imports: [
    PageHeader,
    CalibracionEquiposLista,
    CalibracionEquiposFormulario,
    PdfViewerComponent,
  ],
  templateUrl: './calibracion-equipos.html',
  styleUrl: './calibracion-equipos.css',
})
export class CalibracionEquipos implements OnDestroy {
  vista: 'lista' | 'formulario' = 'lista';
  editingRecord: CalibracionEquipo | null = null;

  // Estado del visor de PDF. Vive acá y no en la lista porque el modal se
  // declara fuera del `.animate-in`, que está en esta plantilla.
  showPdfModal = false;
  isPdfCargando = false;
  pdfPreviewBlob: Blob | null = null;
  pdfNombre = 'verificacion-calibradores.pdf';

  private readonly destroy$ = new Subject<void>();

  constructor(
    private calibracionService: CalibracionEquiposService,
    private toastrAlert: ToastrAlertService,
    private zone: NgZone,
  ) {}

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  irAFormulario(): void {
    this.editingRecord = null;
    this.vista = 'formulario';
  }

  onEditar(record: CalibracionEquipo): void {
    this.editingRecord = record;
    this.vista = 'formulario';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  volverALista(): void {
    this.editingRecord = null;
    this.vista = 'lista';
  }

  /**
   * La lista decide qué verificaciones se pueden imprimir; el padre solo carga
   * el documento y lo muestra, porque el visor tiene que quedar fuera del
   * `.animate-in` para ocupar la pantalla completa.
   */
  onImprimir(item: CalibracionEquipo): void {
    this.showPdfModal = true;
    this.isPdfCargando = true;
    this.pdfPreviewBlob = null;
    this.pdfNombre = `${item.num_secuencial ?? 'verificacion-calibradores'}.pdf`;

    this.calibracionService
      .getPdfCalibracion(item.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (blob) =>
          this.zone.run(() => {
            this.pdfPreviewBlob = blob;
            this.isPdfCargando = false;
          }),
        error: () =>
          this.zone.run(() => {
            this.showPdfModal = false;
            this.isPdfCargando = false;
            this.toastrAlert.showError('No se pudo cargar el documento PDF.', 'Error');
          }),
      });
  }

  cerrarPdf(): void {
    this.showPdfModal = false;
    this.pdfPreviewBlob = null;
  }
}
