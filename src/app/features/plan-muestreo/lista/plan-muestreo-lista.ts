import { Component, NgZone, OnDestroy, OnInit, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Subject, finalize, takeUntil } from 'rxjs';

import { PageHeader } from '../../../shared/components/page-header/page-header';
import { TableSkeleton } from '../../../ui/table-skeleton/table-skeleton';
import { PaginationComponent } from '../../../shared/components/pagination/pagination';
import { PdfViewerComponent } from '../../../shared/components/pdf-viewer/pdf-viewer';
import { PaginationMeta } from '../../../interfaces/catalogos/catalogo.interface';
import { ReportPlanMuestreoService } from '../../../services/solicitudes/plan-muestreo/report-plan-muestreo.service';
import { ReportPlanMuestreo } from '../../../interfaces/solicitudes/plan-muestreo/report-plan-muestreo.interface';
import { ReportFormularioService } from '../../../services/admin-formularios/report-formulario.service';
import { ReportFormulario } from '../../../interfaces/admin-formularios/report-formulario.interface';
import { AlertService } from '../../../services/alert.service';
import { ToastrAlertService } from '../../../services/toastr.service';
import { abrirMenuHaciaArriba } from '../../../core/utils/dropdown-position.utils';
import { AppRole, MenuKey, hasPermission } from '../../../core/utils/roles.constans';
import { AuthService } from '../../auth/service/auth-service';
import {
  IDENTIFICADOR_SECUENCIAL_PLAN_MUESTREO,
  PlanMuestreoService,
} from '../../../services/solicitudes/plan-muestreo/plan-muestreo.service';
import { PlanMuestreoStore } from '../model/plan-muestreo.store';

const ESTADO_FINALIZADO = 2023;

@Component({
  selector: 'app-plan-muestreo-lista',
  standalone: true,
  imports: [CommonModule, PageHeader, TableSkeleton, PaginationComponent, PdfViewerComponent],
  templateUrl: './plan-muestreo-lista.html',
  styleUrl: '../plan-muestreo.css',
})
export class PlanMuestreoLista implements OnInit, OnDestroy {
  // Formulario "PLAN DE MUESTREO", solo para los metadatos de la cabecera.
  readonly TIPO_FORMULARIO_ID = 2019;

  formulario: ReportFormulario | null = null;
  fechaEmision: Date | null = null;

  loading = true;
  planes: ReportPlanMuestreo[] = [];

  meta: PaginationMeta | null = null;
  currentPage = 1;
  readonly PAGE_SIZE = 10;

  openMenuId: string | null = null;
  procesandoId: string | null = null;

  showPdfModal = false;
  isPdfCargando = false;
  pdfPreviewUrl: SafeResourceUrl | null = null;
  private pdfBlobUrl: string | null = null;
  private pdfNombre = 'plan-muestreo.pdf';

  private readonly destroy$ = new Subject<void>();

  private userAppRole = computed<AppRole | null>(() => {
    const roles = this.authService.userProfile()?.roles ?? [];
    return (Object.values(AppRole) as AppRole[]).find((r) => roles.includes(r)) ?? null;
  });

  canCrear = computed(() => {
    const role = this.userAppRole();
    return role ? hasPermission(MenuKey.PLAN_MUESTREO, role, 'crear') : false;
  });

  canDelete = computed(() => {
    const role = this.userAppRole();
    return role ? hasPermission(MenuKey.PLAN_MUESTREO, role, 'eliminar') : false;
  });

  canAutorizar = computed(() => {
    const role = this.userAppRole();
    return role ? hasPermission(MenuKey.PLAN_MUESTREO, role, 'autorizar') : false;
  });

  constructor(
    private router: Router,
    private reportPlanMuestreoService: ReportPlanMuestreoService,
    private reportFormularioService: ReportFormularioService,
    private planMuestreoService: PlanMuestreoService,
    private alertService: AlertService,
    private toastrAlert: ToastrAlertService,
    private zone: NgZone,
    private sanitizer: DomSanitizer,
    private store: PlanMuestreoStore,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.reportFormularioService
      .getFormularioByCTId(this.TIPO_FORMULARIO_ID)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (formulario) => {
          this.formulario = formulario;
          if (formulario?.fecha_emision) {
            this.fechaEmision = new Date(Number(formulario.fecha_emision));
          }
        },
      });

    this.cargarPlanes();
  }

  ngOnDestroy(): void {
    this.revocarPdf();
    this.destroy$.next();
    this.destroy$.complete();
  }

  cargarPlanes(page = this.currentPage): void {
    this.loading = true;
    this.currentPage = page;
    this.reportPlanMuestreoService
      .getPlanes(page, this.PAGE_SIZE)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: ({ data, meta }) => {
          this.planes = data;
          this.meta = meta;
          // Si la página quedó vacía al eliminar el último registro, se
          // retrocede a la anterior.
          if (data.length === 0 && page > 1) {
            this.cargarPlanes(page - 1);
            return;
          }
          this.loading = false;
        },
        error: () => {
          this.loading = false;
          this.alertService.error('No se pudo cargar la lista de planes de muestreo');
        },
      });
  }

  irAPagina(page: number): void {
    this.closeMenu();
    this.cargarPlanes(page);
  }

  // ── Menú contextual ──────────────────────────────────────────────────────

  toggleMenu(id: string, event: MouseEvent): void {
    event.stopPropagation();
    this.openMenuId = this.openMenuId === id ? null : id;
  }

  closeMenu(): void {
    this.openMenuId = null;
  }

  abrirHaciaArriba(index: number): boolean {
    return abrirMenuHaciaArriba(index, this.planes.length);
  }

  // ── Acciones ─────────────────────────────────────────────────────────────

  esFinalizado(plan: ReportPlanMuestreo): boolean {
    return plan.ctestado_id === ESTADO_FINALIZADO;
  }

  // El catálogo nombra al estado "Finalizado Solicitud", pero en el listado de
  // planes el sufijo no aporta: ya se sabe que la fila es un plan.
  etiquetaEstado(plan: ReportPlanMuestreo): string {
    return this.esFinalizado(plan) ? 'Finalizado' : plan.ctestado_nombre;
  }

  // Un plan finalizado ya está autorizado y tiene PDF: no se elimina, aunque el
  // rol tenga el permiso.
  puedeEliminar(plan: ReportPlanMuestreo): boolean {
    return this.canDelete() && !this.esFinalizado(plan);
  }

  async finalizarPlan(plan: ReportPlanMuestreo): Promise<void> {
    const confirmado = await this.alertService.confirm({
      icon: 'question',
      title: '¿Autorizar plan de muestreo?',
      text: `Se autorizará el plan de la solicitud ${plan.solicitud_num_secuencial ?? plan.id}.`,
      confirmButtonColor: '#16a34a',
      confirmButtonText: 'Sí, autorizar',
    });
    if (!confirmado) return;

    this.procesandoId = plan.id;
    this.planMuestreoService
      .finalizarPlan({
        idPlanMuestreo: plan.id,
        identificadorSecuencial: IDENTIFICADOR_SECUENCIAL_PLAN_MUESTREO,
        ctestado: ESTADO_FINALIZADO,
      })
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => {
          this.procesandoId = null;
        }),
      )
      .subscribe({
        next: () =>
          this.zone.run(() => {
            this.toastrAlert.showSuccess('Plan de muestreo autorizado.', '¡Autorizado!');
            this.cargarPlanes();
          }),
        error: () =>
          this.zone.run(() =>
            this.toastrAlert.showError('No se pudo autorizar el plan de muestreo.', 'Error'),
          ),
      });
  }

  async eliminarPlan(plan: ReportPlanMuestreo): Promise<void> {
    if (!this.puedeEliminar(plan)) return;
    const confirmado = await this.alertService.confirm({
      title: '¿Eliminar plan de muestreo?',
      text: `Se eliminará el plan de la solicitud ${plan.solicitud_num_secuencial ?? plan.id}. Esta acción no se puede deshacer.`,
      confirmButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
    });
    if (!confirmado) return;

    this.procesandoId = plan.id;
    this.planMuestreoService
      .deshabilitarPlan(plan.id)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => {
          this.procesandoId = null;
        }),
      )
      .subscribe({
        next: () =>
          this.zone.run(() => {
            this.toastrAlert.showSuccess('Plan de muestreo eliminado.', '¡Eliminado!');
            this.cargarPlanes();
          }),
        error: () =>
          this.zone.run(() =>
            this.toastrAlert.showError('No se pudo eliminar el plan de muestreo.', 'Error'),
          ),
      });
  }

  // ── PDF ──────────────────────────────────────────────────────────────────

  imprimirPlan(plan: ReportPlanMuestreo): void {
    this.showPdfModal = true;
    this.isPdfCargando = true;
    this.pdfPreviewUrl = null;
    this.revocarPdf();
    this.pdfNombre = `${plan.num_secuencial ?? 'plan-muestreo'}.pdf`;

    this.planMuestreoService
      .getPdfPlanMuestreo(plan.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (blob) =>
          this.zone.run(() => {
            this.pdfBlobUrl = URL.createObjectURL(blob);
            this.pdfPreviewUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.pdfBlobUrl);
            this.isPdfCargando = false;
          }),
        error: () =>
          this.zone.run(() => {
            this.isPdfCargando = false;
            this.toastrAlert.showError('No se pudo cargar el documento PDF.', 'Error');
          }),
      });
  }

  cerrarPdf(): void {
    this.showPdfModal = false;
    this.pdfPreviewUrl = null;
    this.revocarPdf();
  }

  descargarPdf(): void {
    if (!this.pdfBlobUrl) return;
    const a = document.createElement('a');
    a.href = this.pdfBlobUrl;
    a.download = this.pdfNombre;
    a.click();
  }

  private revocarPdf(): void {
    if (!this.pdfBlobUrl) return;
    URL.revokeObjectURL(this.pdfBlobUrl);
    this.pdfBlobUrl = null;
  }

  // El asistente arranca siempre en blanco: se descarta cualquier borrador que
  // haya quedado en memoria de un intento anterior.
  nuevoPlan(): void {
    this.store.limpiar();
    this.router.navigate(['/plan-muestreo/nuevo']);
  }
}
