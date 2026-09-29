import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Subject, finalize, takeUntil, firstValueFrom } from 'rxjs';

import { ReportSolicitudService } from '../../services/solicitudes/lista-solicitudes/report-solicitud.service';
import { SolicitudService } from '../../services/solicitudes/solicitud-trabajo/solicitud-trabajo.service';
import { ReportFormularioService } from '../../services/admin-formularios/report-formulario.service';
import { ReportSolicitud } from '../../interfaces/solicitudes/lista-solicitudes/report-solicitud.interface';
import { ReportFormulario } from '../../interfaces/admin-formularios/report-formulario.interface';
import { PaginationMeta } from '../../interfaces/catalogos/catalogo.interface';
import { PaginationComponent } from '../../shared/components/pagination/pagination';
import { AuthService } from '../auth/service/auth-service';
import { AppRole, MenuKey, hasPermission } from '../../core/utils/roles.constans';
import { PageHeader } from '../../shared/components/page-header/page-header';
import { TableSkeleton } from '../../ui/table-skeleton/table-skeleton';
import { AlertService } from '../../services/alert.service';
import { ToastrAlertService } from '../../services/toastr.service';
import { abrirMenuHaciaArriba } from '../../core/utils/dropdown-position.utils';
import { PdfViewerComponent } from '../../shared/components/pdf-viewer/pdf-viewer';
import { FirmaElectronicaComponent } from '../../shared/components/firma-electronica/firma-electronica';
import {
  CampoFirmaElectronica,
  DatosFirmaElectronica,
  ErrorFirmaElectronica,
} from '../../interfaces/documentos/firma-electronica.interface';
import { FirmaSolicitud } from '../../interfaces/solicitudes/solicitud-trabajo/firma-solicitud.interface';

const ESTADO_PENDIENTE = 2;
const ESTADO_AUTORIZADO = 387;
const ESTADO_CREADO = 388;

@Component({
  selector: 'app-lista-solicitudes',
  standalone: true,
  imports: [
    CommonModule,
    PaginationComponent,
    PageHeader,
    TableSkeleton,
    PdfViewerComponent,
    FirmaElectronicaComponent,
  ],
  templateUrl: './lista-solicitudes.html',
  styleUrls: ['./lista-solicitudes.css'],
})
export class ListaSolicitudes implements OnInit, OnDestroy {
  // ── Firma electrónica ────────────────────────────────────────────────────
  // El modal es el compartido (`shared/components/firma-electronica`), no una
  // copia dentro del feature: acá solo vive su estado.
  mostrarModalFirma = false;
  cargandoPdfFirma = false;
  procesandoFirma = false;
  selectedDoc: ReportSolicitud | null = null;
  pdfFirmaBlob: Blob | null = null;
  errorFirma: ErrorFirmaElectronica | null = null;

  /**
   * Firmas persistidas en backend por solicitud.
   * Mientras una solicitud no tenga su bitácora cargada, no se habilita la
   * acción de firma para evitar ofrecer una firma duplicada.
   */
  private firmasPorSolicitud: Record<string, FirmaSolicitud[]> = {};

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

  // ── Formulario metadata ──────────────────────────────────────────────────
  formulario: ReportFormulario | null = null;
  fechaEmision: Date | null = null;

  // ── Lista ────────────────────────────────────────────────────────────────
  solicitudes: ReportSolicitud[] = [];
  meta: PaginationMeta | null = null;
  loading = true;
  cargandoEdicionId: string | null = null;
  openMenuId: string | null = null;
  currentPage = 1;
  readonly PAGE_SIZE = 10;

  // ── Visor de PDF ─────────────────────────────────────────────────────────
  showPdfModal = false;
  isPdfCargando = false;
  pdfPreviewBlob: Blob | null = null;
  pdfNombre = 'solicitud.pdf';

  readonly COLOR_PRIMARIO = '#1d2b64';
  readonly fechaActual = new Date();
  private readonly destroy$ = new Subject<void>();

  // ── Permisos ─────────────────────────────────────────────────────────────
  /**
   * Se resuelve el rol en cada evaluación.
   *
   * No se usa `computed()` porque `userProfile()` no es una señal reactiva;
   * si el rol todavía no estaba disponible en la primera evaluación,
   * `computed()` podía conservar `null` y dejar ocultas las acciones.
   */
  private userAppRole(): AppRole | null {
    const roles = this.authService.userProfile()?.roles ?? [];

    return (
      (Object.values(AppRole) as AppRole[]).find((role) =>
        roles.includes(role),
      ) ?? null
    );
  }

  canEdit(): boolean {
    const role = this.userAppRole();
    return role
      ? hasPermission(MenuKey.LISTA_SOLICITUDES, role, 'editar')
      : false;
  }

  canDelete(): boolean {
    const role = this.userAppRole();
    return role
      ? hasPermission(MenuKey.LISTA_SOLICITUDES, role, 'eliminar')
      : false;
  }

  canFirmar(): boolean {
    const role = this.userAppRole();

    return (
      role === AppRole.TECNICO_DIRECCION ||
      role === AppRole.RESPONSABLE_LAB
    );
  }

  constructor(
    private reportSolicitudService: ReportSolicitudService,
    private solicitudService: SolicitudService,
    private reportFormularioService: ReportFormularioService,
    private router: Router,
    public authService: AuthService,
    private alertService: AlertService,
    private toastrAlert: ToastrAlertService,
    private zone: NgZone,
  ) {}

  ngOnInit(): void {
    this.cargarFormulario();
    this.cargarPagina(1);
  }

  cargarFormulario(): void {
    this.reportFormularioService
      .getFormularioByCTId(380)
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

  // ── Menú de acciones ─────────────────────────────────────────────────────

  toggleMenu(id: string, event: MouseEvent): void {
    event.stopPropagation();
    this.openMenuId = this.openMenuId === id ? null : id;
  }

  closeMenu(): void {
    this.openMenuId = null;
  }

  abrirHaciaArriba(index: number): boolean {
    return abrirMenuHaciaArriba(index, this.solicitudes.length);
  }

  puedeEditar(doc: ReportSolicitud): boolean {
    return doc.ctestado_id === ESTADO_PENDIENTE && this.canEdit();
  }

  /**
   * Matriz funcional de firma:
   *
   * TECNICO_DIRECCION
   * - Creado + no ha firmado  => mostrar.
   * - Creado + ya firmó       => ocultar.
   * - Autorizado              => ocultar.
   *
   * RESPONSABLE_LAB
   * - Creado                  => ocultar.
   * - Autorizado + no firmó   => mostrar.
   * - Autorizado + ya firmó   => ocultar.
   *
   * La única fuente de verdad sobre las firmas es la bitácora del backend.
   */
  puedeFirmar(doc: ReportSolicitud): boolean {
    const firmas = this.firmasPorSolicitud[doc.id_solicitud];

    if (firmas === undefined) {
      return false;
    }

    if (this.esTecnicoDireccion()) {
      return (
        Number(doc.ctestado_id) === ESTADO_CREADO &&
        firmas.length === 0
      );
    }

    if (this.esResponsableLaboratorio()) {
      return (
        Number(doc.ctestado_id) === ESTADO_AUTORIZADO &&
        !this.usuarioActualYaFirmo(firmas)
      );
    }

    return false;
  }

  private rolesUsuario(): string[] {
    const roles = new Set<string>();

    for (const role of this.authService.userProfile()?.roles ?? []) {
      roles.add(String(role).trim().toLowerCase());
    }

    const payload = this.getTokenPayload();
    const realmRoles = payload?.['realm_access']?.['roles'];

    if (Array.isArray(realmRoles)) {
      for (const role of realmRoles) {
        roles.add(String(role).trim().toLowerCase());
      }
    }

    return [...roles];
  }

  private esTecnicoDireccion(): boolean {
    const roles = this.rolesUsuario();

    return (
      roles.includes(AppRole.TECNICO_DIRECCION) ||
      roles.includes('tecnico_direccion') ||
      roles.includes('tecnico_direccion_unidad')
    );
  }

  private esResponsableLaboratorio(): boolean {
    const roles = this.rolesUsuario();

    return (
      roles.includes(AppRole.RESPONSABLE_LAB) ||
      roles.includes('responsable_lab') ||
      roles.includes('responsable_laboratorio')
    );
  }

  private usuarioActualYaFirmo(firmas: FirmaSolicitud[]): boolean {
    const idsUsuario = new Set<string>();

    const idActual = String(this.authService.currentUser()?.id ?? '')
      .trim()
      .toLowerCase();

    if (idActual) {
      idsUsuario.add(idActual);
    }

    const subToken = String(this.getTokenPayload()?.['sub'] ?? '')
      .trim()
      .toLowerCase();

    if (subToken) {
      idsUsuario.add(subToken);
    }

    const nombreUsuario = this.normalizarTexto(
      this.authService.currentUser()?.nombre ?? '',
    );

    return firmas.some((firma) => {
      const firmaUsuarioId = String(firma.usuario_id ?? '')
        .trim()
        .toLowerCase();

      if (firmaUsuarioId && idsUsuario.has(firmaUsuarioId)) {
        return true;
      }

      const nombreFirmante = this.normalizarTexto(
        firma.nombre_firmante ?? '',
      );

      return (
        nombreUsuario.length > 0 &&
        nombreFirmante.length > 0 &&
        nombreFirmante === nombreUsuario
      );
    });
  }

  private normalizarTexto(valor: string): string {
    return String(valor ?? '')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .trim()
      .replace(/\s+/g, ' ')
      .toLowerCase();
  }

  private getTokenPayload(): Record<string, any> | null {
    const token = this.authService.rawAccessToken;

    if (!token) {
      return null;
    }

    try {
      const payload = token.split('.')[1];

      if (!payload) {
        return null;
      }

      const base64 = payload
        .replace(/-/g, '+')
        .replace(/_/g, '/');

      const padded = base64.padEnd(
        base64.length + ((4 - (base64.length % 4)) % 4),
        '=',
      );

      return JSON.parse(window.atob(padded));
    } catch {
      return null;
    }
  }

  private cargarFirmasSolicitud(doc: ReportSolicitud): void {
    delete this.firmasPorSolicitud[doc.id_solicitud];

    this.solicitudService
      .getFirmasSolicitud(doc.id_solicitud)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (firmas) =>
          this.zone.run(() => {
            this.firmasPorSolicitud = {
              ...this.firmasPorSolicitud,
              [doc.id_solicitud]: firmas ?? [],
            };

            this.solicitudes = [...this.solicitudes];
          }),
        error: (error) => {
          console.error(
            'Error consultando firmas:',
            doc.num_secuencial,
            error,
          );

          delete this.firmasPorSolicitud[doc.id_solicitud];
        },
      });
  }


  // Pendiente: menú con Editar. Autorizado: menú con Imprimir.
  tieneMenu(doc: ReportSolicitud): boolean {
    return this.puedeEditar(doc) || this.esAutorizado(doc);
  }

  // ── Impresión ────────────────────────────────────────────────────────────

  // El PDF solo tiene sentido una vez autorizada la solicitud.
  /**
   * El PDF nace al autorizar, así que una solicitud pendiente no tiene qué
   * imprimir ni qué firmar. También se exige que esté vigente: sobre una dada
   * de baja el backend responde `SOLICITUD_DADA_DE_BAJA`.
   */
  esAutorizado(doc: ReportSolicitud): boolean {
    return doc.ctestado_id === ESTADO_AUTORIZADO && doc.estado_logico_solicitud === true;
  }

  imprimirSolicitud(doc: ReportSolicitud): void {
    if (!this.esAutorizado(doc)) return;

    // Se abre la pestaña inmediatamente para evitar que el navegador
    // la bloquee cuando el PDF llegue de forma asíncrona.
    const nuevaVentana = window.open('', '_blank');

    if (!nuevaVentana) {
      this.toastrAlert.showError(
        'El navegador bloqueó la apertura del documento PDF.',
        'Error',
      );
      return;
    }

    this.solicitudService
      .getPdfDocumentoSolicitud(doc.id_solicitud)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (blob) =>
          this.zone.run(() => {
            const pdfUrl = URL.createObjectURL(blob);
            nuevaVentana.location.href = pdfUrl;

            // El navegador ya cargó la URL; se libera más adelante.
            setTimeout(() => URL.revokeObjectURL(pdfUrl), 60_000);
          }),
        error: () =>
          this.zone.run(() => {
            nuevaVentana.close();
            this.toastrAlert.showError('No se pudo cargar el documento PDF.', 'Error');
          }),
      });
  }

  cerrarPdf(): void {
    this.showPdfModal = false;
    this.pdfPreviewBlob = null;
  }

  cargarPagina(page: number): void {
    this.loading = true;
    this.currentPage = page;

    this.reportSolicitudService
      .getSolicitudes(page, this.PAGE_SIZE)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: ({ data, meta }) =>
          this.zone.run(() => {
            this.firmasPorSolicitud = {};
            this.solicitudes = data;
            this.meta = meta;
            this.loading = false;

            for (const doc of data) {
              this.cargarFirmasSolicitud(doc);
            }
          }),
        error: () => {
          this.loading = false;
          this.alertService.error(
            'No se pudo cargar la lista de solicitudes',
          );
        },
      });
  }

  // ── Firma ────────────────────────────────────────────────────────────────

  editarSolicitud(doc: ReportSolicitud): void {
    this.cargandoEdicionId = doc.id_solicitud;
    this.reportSolicitudService
      .getSolicitudById(doc.id_solicitud)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (solicitud) => {
          this.cargandoEdicionId = null;
          if (!solicitud) {
            this.alertService.error('No se encontró la solicitud');
            return;
          }
          this.router.navigate(['/solicitud-trabajo'], { state: { solicitud } });
        },
        error: () => {
          this.cargandoEdicionId = null;
          this.alertService.error('No se pudo cargar la solicitud');
        },
      });
  }

  async eliminarSolicitud(doc: ReportSolicitud): Promise<void> {
    const confirmado = await this.alertService.confirm({
      title: '¿Eliminar solicitud?',
      text: `Se eliminará la solicitud${doc.num_secuencial ? ' ' + doc.num_secuencial : ''}. Esta acción no se puede deshacer.`,
      confirmButtonColor: '#dc2626',
      cancelButtonColor: '#64748b',
      confirmButtonText: 'Sí, eliminar',
    });

    if (!confirmado) return;

    try {
      await firstValueFrom(this.solicitudService.eliminarSolicitudById(doc.id_solicitud));
      this.alertService.successAutoClose(
        'La solicitud fue eliminada.',
        '¡Eliminado!',
        2000,
        this.COLOR_PRIMARIO,
      );
      this.cargarPagina(this.currentPage);
    } catch {
      this.alertService.error('No se pudo eliminar la solicitud.');
    }
  }

  // ── Firma electrónica ────────────────────────────────────────────────────

  abrirFirma(doc: ReportSolicitud): void {
    if (!this.puedeFirmar(doc)) return;

    this.selectedDoc = doc;
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
      .getPdfDocumentoSolicitud(doc.id_solicitud)
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
    if (!this.selectedDoc || this.procesandoFirma) return;

    const doc = this.selectedDoc;
    const usuario = this.authService.currentUser();

    const usuarioId =
      String(this.getTokenPayload()?.['sub'] ?? '').trim() ||
      String(usuario.id ?? '').trim();

    if (!usuarioId) {
      this.toastrAlert.showError(
        'No se pudo identificar al usuario autenticado.',
        'Error de firma',
      );
      return;
    }

    this.errorFirma = null;
    this.procesandoFirma = true;

    this.solicitudService
      .firmarSolicitud(doc.id_solicitud, {
        ...datos,
        usuarioId,
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

            // Recargar la página vuelve a consultar la lista y la bitácora
            // persistida de firmas, manteniendo la UI sincronizada con backend.
            this.cargarPagina(this.currentPage);
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
    this.selectedDoc = null;
    this.errorFirma = null;
  }

  nombreDocumentoFirma(): string {
    return `${this.selectedDoc?.num_secuencial ?? 'solicitud'}.pdf`;
  }
}
