import { Component, ViewChild, computed, OnInit, OnDestroy, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject, finalize, takeUntil } from 'rxjs';
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
import { PdfViewerComponent } from '../../shared/components/pdf-viewer/pdf-viewer';
import { FirmaElectronicaComponent } from '../../shared/components/firma-electronica/firma-electronica';
import { SolicitudService } from '../../services/solicitudes/solicitud-trabajo/solicitud-trabajo.service';
import { ToastrAlertService } from '../../services/toastr.service';
import { ReportSolicitud } from '../../interfaces/solicitudes/lista-solicitudes/report-solicitud.interface';
import {
  CampoFirmaElectronica,
  DatosFirmaElectronica,
  ErrorFirmaElectronica,
} from '../../interfaces/documentos/firma-electronica.interface';

type ContraloriaRecord = { id: string } & Record<string, unknown>;

@Component({
  selector: 'app-por-contraloria',
  standalone: true,
  imports: [
    CommonModule,
    PageHeader,
    PorContraloriaFormulario,
    PorContraloriaLista,
    PdfViewerComponent,
    FirmaElectronicaComponent,
  ],
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

  // Los dos modales viven acá y no en la lista porque son `position: fixed` y
  // el `.animate-in` de esta plantilla los confinaría a su caja.
  showPdfModal = false;
  isPdfCargando = false;
  pdfPreviewBlob: Blob | null = null;
  pdfNombre = 'orden-movilizacion.pdf';

  mostrarModalFirma = false;
  cargandoPdfFirma = false;
  procesandoFirma = false;
  registroFirmando: ContraloriaRecord | null = null;
  pdfFirmaBlob: Blob | null = null;
  errorFirma: ErrorFirmaElectronica | null = null;

  /**
   * Códigos que el firmador devuelve para algo que el usuario puede corregir
   * sin salir del modal, y el paso al que corresponde cada uno. Lo que no está
   * acá (solicitud sin autorizar, PDF ausente, fallo del firmador) no se
   * arregla reintentando: eso cierra el modal y se avisa por toast.
   */
  private readonly camposPorCodigoFirma: Record<string, CampoFirmaElectronica> = {
    CERTIFICADO_INVALIDO: 'password',
    PASSWORD_REQUERIDA: 'password',
    CERTIFICADO_VACIO: 'certificado',
    POSICION_FIRMA_INVALIDA: 'posicion',
  };

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
    private solicitudService: SolicitudService,
    private toastrAlert: ToastrAlertService,
    private zone: NgZone,
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

  // ── Imprimir ─────────────────────────────────────────────────────────────

  /**
   * Imprime el PDF **congelado**, no el preview de `api_reportes`.
   *
   * Desde que el módulo firma, imprimir tiene que devolver el mismo archivo que
   * se firmó — con las firmas estampadas. El de reportes lo regenera desde cero
   * y siempre saldría sin firmar, así que quien acabara de firmar imprimiría un
   * documento en blanco y creería que la firma se perdió.
   * (CLAUDE.md, "Imprimir un documento": cuál de los dos PDF pedir.)
   */
  onImprimir(record: ContraloriaRecord): void {
    this.showPdfModal = true;
    this.isPdfCargando = true;
    this.pdfPreviewBlob = null;
    this.pdfNombre = this.nombreDocumento(record);

    this.solicitudService
      .getPdfDocumentoSolicitud(record.id)
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

  abrirFirma(record: ContraloriaRecord): void {
    this.registroFirmando = record;
    this.pdfFirmaBlob = null;
    this.errorFirma = null;
    this.cargandoPdfFirma = true;
    this.procesandoFirma = false;
    this.mostrarModalFirma = true;

    /*
     * El mismo PDF que se imprime: el congelado, que trae las firmas ya
     * estampadas. Regenerarlo perdería las anteriores.
     */
    this.solicitudService
      .getPdfDocumentoSolicitud(record.id)
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
    if (!this.registroFirmando || this.procesandoFirma) return;

    const record = this.registroFirmando;
    const usuario = this.authService.currentUser();

    this.errorFirma = null;
    this.procesandoFirma = true;

    this.solicitudService
      .firmarSolicitud(record.id, {
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
      respuesta?.message ||
      'No se pudo firmar el documento. Revisa el certificado y su contraseña.';

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
    this.registroFirmando = null;
    this.errorFirma = null;
  }

  nombreDocumentoFirma(): string {
    return this.registroFirmando
      ? this.nombreDocumento(this.registroFirmando)
      : 'orden-movilizacion.pdf';
  }

  private nombreDocumento(record: ContraloriaRecord): string {
    const sol = record['_solicitud'] as ReportSolicitud | undefined;
    return `${sol?.num_secuencial ?? 'orden-movilizacion'}.pdf`;
  }
}
