import { Component, OnInit, OnDestroy, NgZone } from '@angular/core';
import { Subject, finalize, takeUntil } from 'rxjs';
import { PageHeader } from '../../shared/components/page-header/page-header';
import { OrdenTrabajoInSituLista } from './lista/orden-trabajo-in-situ-lista';
import { OrdenTrabajoInSituFormulario } from './formulario/orden-trabajo-in-situ-formulario';
import { PdfViewerComponent } from '../../shared/components/pdf-viewer/pdf-viewer';
import { FirmaElectronicaComponent } from '../../shared/components/firma-electronica/firma-electronica';
import { ReportOrden } from '../../interfaces/solicitudes/orden-trabajo/report-orden.interface';
import { ReportFormularioService } from '../../services/admin-formularios/report-formulario.service';
import { OrdenTrabajoService } from '../../services/solicitudes/orden-trabajo/orden-trabajo.service';
import { AuthService } from '../auth/service/auth-service';
import { ToastrAlertService } from '../../services/toastr.service';
import { ReportFormulario } from '../../interfaces/admin-formularios/report-formulario.interface';
import {
  CampoFirmaElectronica,
  DatosFirmaElectronica,
  ErrorFirmaElectronica,
} from '../../interfaces/documentos/firma-electronica.interface';

@Component({
  selector: 'app-orden-trabajo-in-situ',
  imports: [
    PageHeader,
    OrdenTrabajoInSituLista,
    OrdenTrabajoInSituFormulario,
    PdfViewerComponent,
    FirmaElectronicaComponent,
  ],
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

  mostrarModalFirma = false;
  cargandoPdfFirma = false;
  procesandoFirma = false;
  ordenFirmando: ReportOrden | null = null;
  pdfFirmaBlob: Blob | null = null;
  errorFirma: ErrorFirmaElectronica | null = null;

  /**
   * Códigos que el firmador devuelve para algo que el usuario puede corregir
   * sin salir del modal, y el paso al que corresponde cada uno. Lo que no está
   * acá (orden sin autorizar, PDF ausente, fallo del firmador) no se arregla
   * reintentando: eso cierra el modal y se avisa por toast.
   */
  private readonly camposPorCodigoFirma: Record<string, CampoFirmaElectronica> = {
    CERTIFICADO_INVALIDO: 'password',
    PASSWORD_REQUERIDA: 'password',
    CERTIFICADO_VACIO: 'certificado',
    POSICION_FIRMA_INVALIDA: 'posicion',
  };

  private readonly destroy$ = new Subject<void>();

  constructor(
    private reportFormularioService: ReportFormularioService,
    private ordenTrabajoService: OrdenTrabajoService,
    private authService: AuthService,
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

  // ── Firma electrónica ────────────────────────────────────────────────────

  abrirFirma(orden: ReportOrden): void {
    this.ordenFirmando = orden;
    this.pdfFirmaBlob = null;
    this.errorFirma = null;
    this.cargandoPdfFirma = true;
    this.procesandoFirma = false;
    this.mostrarModalFirma = true;

    /*
     * El mismo PDF que se imprime: el congelado, que trae las firmas ya
     * estampadas. Regenerarlo perdería las anteriores.
     */
    this.ordenTrabajoService
      .getPdfOrden(orden.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (blob) =>
          this.zone.run(() => {
            this.pdfFirmaBlob = blob;
            this.cargandoPdfFirma = false;
          }),
        error: () =>
          this.zone.run(() => {
            this.cargandoPdfFirma = false;
            this.cerrarFirma();
            this.toastrAlert.showError('No se pudo cargar el documento para firmarlo.', 'Error');
          }),
      });
  }

  confirmarFirma(datos: DatosFirmaElectronica): void {
    if (!this.ordenFirmando || this.procesandoFirma) return;

    const orden = this.ordenFirmando;
    const usuario = this.authService.currentUser();

    this.errorFirma = null;
    this.procesandoFirma = true;

    this.ordenTrabajoService
      .firmarOrden(orden.id, {
        ...datos,
        usuarioId: usuario.id,
        nombreFirmante: usuario.nombre,
      })
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => {
          this.procesandoFirma = false;
        }),
      )
      .subscribe({
        next: (respuesta) =>
          this.zone.run(() => {
            this.cerrarFirma();
            this.toastrAlert.showSuccess(
              `El documento quedó con ${respuesta.totalFirmas} firma(s).`,
              '¡Firmado!',
            );
          }),
        error: (error) =>
          this.zone.run(() => {
            this.mostrarErrorDeFirma(error);
          }),
      });
  }

  /**
   * Un error de contraseña o de posición se muestra dentro del modal, junto al
   * paso que hay que corregir: cerrarlo obligaría a volver a cargar el PDF y a
   * reubicar la firma solo por haberse equivocado al teclear. El resto son
   * condiciones del documento que no cambian por reintentar, y esos sí cierran.
   */
  private mostrarErrorDeFirma(error: unknown): void {
    const respuesta = (error as { error?: { message?: string; code?: string } })?.error;

    const mensaje =
      respuesta?.message || 'No se pudo firmar el documento. Revisa el certificado y su contraseña.';

    const campo = respuesta?.code ? this.camposPorCodigoFirma[respuesta.code] : undefined;

    // Sin código no se puede clasificar (típicamente un fallo de red): se deja
    // en el modal como error general, porque reintentar sí tiene sentido.
    if (campo || !respuesta?.code) {
      this.errorFirma = { mensaje, campo: campo ?? 'general' };
      return;
    }

    // `finalize` corre después de este handler, así que la bandera sigue en
    // alto y la guarda de `cerrarFirma()` bloquearía el cierre.
    this.procesandoFirma = false;
    this.cerrarFirma();
    this.toastrAlert.showError(mensaje, 'Error de firma');
  }

  cerrarFirma(): void {
    if (this.procesandoFirma) return;

    this.mostrarModalFirma = false;
    this.cargandoPdfFirma = false;
    this.pdfFirmaBlob = null;
    this.ordenFirmando = null;
    this.errorFirma = null;
  }

  nombreDocumentoFirma(): string {
    if (!this.ordenFirmando) return 'orden-trabajo.pdf';
    return `${this.ordenFirmando.num_secuencial ?? 'orden-trabajo'}.pdf`;
  }
}
