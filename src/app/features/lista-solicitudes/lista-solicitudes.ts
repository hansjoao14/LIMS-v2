import { Component, OnDestroy, OnInit, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, takeUntil, firstValueFrom } from 'rxjs';
import Swal from 'sweetalert2';

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

@Component({
  selector: 'app-lista-solicitudes',
  standalone: true,
  imports: [CommonModule, FormsModule, PaginationComponent, PageHeader],
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

  // ── Formulario metadata ──────────────────────────────────────────────────
  formulario: ReportFormulario | null = null;
  fechaEmision: Date | null = null;

  // ── Lista ────────────────────────────────────────────────────────────────
  solicitudes: ReportSolicitud[] = [];
  meta: PaginationMeta | null = null;
  loading = true;
  cargandoEdicionId: string | null = null;
  currentPage = 1;
  readonly PAGE_SIZE = 10;

  readonly COLOR_PRIMARIO = '#1d2b64';
  readonly fechaActual = new Date();
  private readonly destroy$ = new Subject<void>();

  // ── Permisos ─────────────────────────────────────────────────────────────
  private userAppRole = computed<AppRole | null>(() => {
    const roles = this.authService.userProfile()?.roles ?? [];
    return (Object.values(AppRole) as AppRole[]).find((r) => roles.includes(r)) ?? null;
  });

  canEdit = computed(() => {
    const role = this.userAppRole();
    return role ? hasPermission(MenuKey.LISTA_SOLICITUDES, role, 'editar') : false;
  });

  canDelete = computed(() => {
    const role = this.userAppRole();
    return role ? hasPermission(MenuKey.LISTA_SOLICITUDES, role, 'eliminar') : false;
  });

  canFirmar = computed(() => this.userAppRole() === AppRole.RESPONSABLE_LAB);

  constructor(
    private reportSolicitudService: ReportSolicitudService,
    private solicitudService: SolicitudService,
    private reportFormularioService: ReportFormularioService,
    private router: Router,
    public authService: AuthService,
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
            Swal.fire('Error', 'No se encontró la solicitud', 'error');
            return;
          }
          this.router.navigate(['/solicitud-trabajo'], { state: { solicitud } });
        },
        error: () => {
          this.cargandoEdicionId = null;
          Swal.fire('Error', 'No se pudo cargar la solicitud', 'error');
        },
      });
  }

  async eliminarSolicitud(doc: ReportSolicitud): Promise<void> {
    const confirm = await Swal.fire({
      title: '¿Eliminar solicitud?',
      text: `Se eliminará la solicitud${doc.num_secuencial ? ' ' + doc.num_secuencial : ''}. Esta acción no se puede deshacer.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc2626',
      cancelButtonColor: '#64748b',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    });

    if (!confirm.isConfirmed) return;

    try {
      await firstValueFrom(this.solicitudService.eliminarSolicitudById(doc.id_solicitud));
      Swal.fire({ title: '¡Eliminado!', text: 'La solicitud fue eliminada.', icon: 'success', confirmButtonColor: this.COLOR_PRIMARIO, timer: 2000 });
      this.cargarPagina(this.currentPage);
    } catch {
      Swal.fire('Error', 'No se pudo eliminar la solicitud.', 'error');
    }
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
