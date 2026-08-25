import { Component, OnInit, OnDestroy, NgZone } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { PageHeader } from '../../shared/components/page-header/page-header';
import { OrdenTrabajoInSituLista } from './lista/orden-trabajo-in-situ-lista';
import { OrdenTrabajoInSituFormulario } from './formulario/orden-trabajo-in-situ-formulario';
import { PdfViewerComponent } from '../../shared/components/pdf-viewer/pdf-viewer';
import { ReportOrden } from '../../interfaces/solicitudes/orden-trabajo/report-orden.interface';
import { ReportFormularioService } from '../../services/admin-formularios/report-formulario.service';
import { OrdenTrabajoService } from '../../services/solicitudes/orden-trabajo/orden-trabajo.service';
import { ToastrAlertService } from '../../services/toastr.service';
import { ReportFormulario } from '../../interfaces/admin-formularios/report-formulario.interface';

@Component({
  selector: 'app-orden-trabajo-in-situ',
  imports: [PageHeader, OrdenTrabajoInSituLista, OrdenTrabajoInSituFormulario, PdfViewerComponent],
  templateUrl: './orden-trabajo-in-situ.html',
  styleUrl: './orden-trabajo-in-situ.css',
})
export class OrdenTrabajoInSitu implements OnInit, OnDestroy {
  vista: 'lista' | 'formulario' = 'lista';
  editingRecord: ReportOrden | null = null;

  formulario: ReportFormulario | null = null;
  fechaEmision: Date | null = null;

  showPdfModal = false;
  isPdfCargando = false;
  pdfPreviewBlob: Blob | null = null;
  pdfNombre = 'orden-trabajo.pdf';

  private readonly destroy$ = new Subject<void>();

  constructor(
    private reportFormularioService: ReportFormularioService,
    private ordenTrabajoService: OrdenTrabajoService,
    private toastrAlert: ToastrAlertService,
    private zone: NgZone,
  ) {}

  ngOnInit(): void {
    this.reportFormularioService
      .getFormularioByCTId(2018)
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

  irAFormulario(): void {
    this.editingRecord = null;
    this.vista = 'formulario';
  }

  onEditar(orden: ReportOrden): void {
    this.editingRecord = orden;
    this.vista = 'formulario';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  volverALista(): void {
    this.editingRecord = null;
    this.vista = 'lista';
  }

  /**
   * La lista decide qué órdenes se pueden imprimir; el padre solo carga el
   * documento y lo muestra, porque el visor tiene que quedar fuera del
   * `.animate-in` para ocupar la pantalla completa.
   */
  imprimirOrden(orden: ReportOrden): void {
    this.showPdfModal = true;
    this.isPdfCargando = true;
    this.pdfPreviewBlob = null;
    this.pdfNombre = `${orden.num_secuencial ?? 'orden-trabajo'}.pdf`;

    this.ordenTrabajoService
      .getPdfOrden(orden.id)
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
