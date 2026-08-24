import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GlobalWorkerOptions, getDocument } from 'pdfjs-dist';
import Swal from 'sweetalert2';

import {
  DatosFirmaElectronica,
  PosicionFirmaPdf,
} from '../../../interfaces/solicitudes/plan-muestreo/firma-plan-muestreo.interface';
import { CertificadoP12StorageService } from '../../../services/solicitudes/plan-muestreo/certificado-p12-storage.service';

/** Recuadro de la firma en coordenadas de pantalla (CSS), no del PDF. */
interface RectanguloVisual {
  left: number;
  top: number;
  width: number;
  height: number;
}

/**
 * Modal para firmar electrónicamente un PDF.
 *
 * Renderiza el documento con pdf.js, deja elegir dónde va la firma haciendo
 * clic (y ajustarla arrastrando), y emite el certificado junto con la posición
 * ya convertida al sistema de coordenadas del PDF.
 *
 * No conoce ningún endpoint ni al usuario logueado: recibe un Blob y emite los
 * datos de la firma. Eso lo hace reutilizable para los otros documentos del
 * flujo (orden de trabajo, ticket de entrega) sin tocarlo.
 */
@Component({
  selector: 'app-firma-electronica',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './firma-electronica.html',
})
export class FirmaElectronicaComponent implements OnInit, AfterViewInit, OnChanges, OnDestroy {
  @Input() mostrar = false;
  @Input() pdfBlob: Blob | null = null;
  @Input() nombreDocumento = 'documento.pdf';
  /** El padre está cargando el PDF desde el API. */
  @Input() cargandoPdf = false;
  /** El padre está enviando la firma al backend. */
  @Input() procesando = false;

  @Output() cerrar = new EventEmitter<void>();
  @Output() firmar = new EventEmitter<DatosFirmaElectronica>();

  @ViewChild('pdfCanvas') private pdfCanvas?: ElementRef<HTMLCanvasElement>;
  @ViewChild('visorPdf') private visorPdf?: ElementRef<HTMLDivElement>;
  @ViewChild('paginaPdf') private paginaPdf?: ElementRef<HTMLDivElement>;

  paginaActual = 1;
  totalPaginas = 0;
  zoom = 1;

  renderizando = false;
  errorPdf = '';

  archivoP12Base64 = '';
  nombreArchivoP12 = '';
  passwordP12 = '';
  cargo = '';
  mostrarPassword = false;
  arrastrandoArchivo = false;
  errorArchivo = '';

  posicionVisual: RectanguloVisual | null = null;
  posicionPdf: PosicionFirmaPdf | null = null;
  arrastrandoFirma = false;

  /** Tamaño por defecto del recuadro, en puntos del PDF. */
  private readonly ANCHO_FIRMA = 170;
  private readonly ALTO_FIRMA = 50;

  private readonly LIMITE_BYTES_P12 = 10 * 1024 * 1024;

  private pdfDocument: any = null;
  private viewport: any = null;
  private renderTask: any = null;
  private blobCargado: Blob | null = null;
  private vistaLista = false;

  /**
   * Cada carga de PDF se numera. Si el usuario abre otro documento antes de que
   * termine el anterior, la carga vieja se descarta al volver y no pisa a la
   * nueva.
   */
  private tokenCarga = 0;

  private offsetArrastreX = 0;
  private offsetArrastreY = 0;

  constructor(private certificadoStorage: CertificadoP12StorageService) {
    /*
     * El worker se sirve desde assets. `angular.json` lo copia de
     * node_modules/pdfjs-dist en cada build, así que no queda una copia
     * desactualizada en el repo.
     */
    if (typeof document !== 'undefined') {
      GlobalWorkerOptions.workerSrc = new URL(
        'assets/pdfjs/pdf.worker.min.mjs',
        document.baseURI,
      ).toString();
    }
  }

  ngOnInit(): void {
    void this.recuperarCertificadoGuardado();
  }

  ngAfterViewInit(): void {
    this.vistaLista = true;
    this.programarCarga();
  }

  ngOnChanges(cambios: SimpleChanges): void {
    if (cambios['mostrar'] && !this.mostrar) {
      this.limpiarFormulario();
      this.destruirDocumento();
      return;
    }

    if (cambios['pdfBlob'] || (cambios['mostrar'] && this.mostrar)) {
      this.programarCarga();
    }
  }

  ngOnDestroy(): void {
    this.tokenCarga++;
    this.destruirDocumento();
  }

  @HostListener('document:keydown.escape')
  alPresionarEscape(): void {
    if (this.mostrar && !this.procesando) {
      this.solicitarCierre();
    }
  }

  // ── Render del PDF ────────────────────────────────────────────────────────

  /**
   * El `setTimeout` deja que Angular pinte el `@if` del modal antes de buscar
   * el canvas: sin eso, `@ViewChild` todavía es undefined la primera vez.
   */
  private programarCarga(): void {
    if (!this.vistaLista || !this.mostrar || !this.pdfBlob) return;
    setTimeout(() => void this.cargarPdf());
  }

  private async cargarPdf(): Promise<void> {
    if (!this.pdfBlob || !this.pdfCanvas || this.blobCargado === this.pdfBlob) return;

    const token = ++this.tokenCarga;

    this.renderizando = true;
    this.errorPdf = '';
    this.destruirDocumento(false);

    try {
      const buffer = await this.pdfBlob.arrayBuffer();
      const documento = await getDocument({ data: new Uint8Array(buffer) }).promise;

      if (token !== this.tokenCarga) {
        // Llegó tarde: ya se pidió otro documento. Se libera y se descarta.
        void documento.loadingTask.destroy();
        return;
      }

      this.pdfDocument = documento;
      this.blobCargado = this.pdfBlob;
      this.totalPaginas = documento.numPages;
      this.paginaActual = 1;
      this.zoom = 1;
      this.posicionVisual = null;
      this.posicionPdf = null;

      await this.renderizarPagina();
    } catch (error) {
      console.error('No se pudo renderizar el PDF:', error);
      this.errorPdf = 'No se pudo mostrar el documento PDF.';
    } finally {
      if (token === this.tokenCarga) this.renderizando = false;
    }
  }

  async renderizarPagina(): Promise<void> {
    if (!this.pdfDocument || !this.pdfCanvas || !this.visorPdf) return;

    try {
      this.renderTask?.cancel();

      const pagina = await this.pdfDocument.getPage(this.paginaActual);
      const base = pagina.getViewport({ scale: 1 });

      // La hoja se ajusta al ancho disponible, con topes para que no quede
      // ilegible en pantallas chicas ni gigante en monitores anchos.
      const anchoDisponible = Math.max(320, this.visorPdf.nativeElement.clientWidth - 36);
      const escalaAjuste = Math.min(1.7, Math.max(0.45, anchoDisponible / base.width));

      this.viewport = pagina.getViewport({ scale: escalaAjuste * this.zoom });

      const canvas = this.pdfCanvas.nativeElement;
      const contexto = canvas.getContext('2d');
      if (!contexto) throw new Error('No se pudo obtener el contexto del canvas.');

      // En pantallas retina se dibuja al doble de resolución y se escala por
      // CSS, si no el texto del PDF se ve borroso.
      const densidad = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.floor(this.viewport.width * densidad);
      canvas.height = Math.floor(this.viewport.height * densidad);
      canvas.style.width = `${Math.floor(this.viewport.width)}px`;
      canvas.style.height = `${Math.floor(this.viewport.height)}px`;

      this.renderTask = pagina.render({
        canvasContext: contexto,
        viewport: this.viewport,
        transform: densidad !== 1 ? [densidad, 0, 0, densidad, 0, 0] : undefined,
      });

      await this.renderTask.promise;

      // Al cambiar de página o zoom, el recuadro se vuelve a ubicar a partir de
      // las coordenadas del PDF, que son las que no cambian.
      this.reubicarMarcador();
    } catch (error: any) {
      if (error?.name !== 'RenderingCancelledException') {
        console.error('Error renderizando la página:', error);
        this.errorPdf = 'No se pudo mostrar la página seleccionada.';
      }
    }
  }

  cambiarPagina(direccion: number): void {
    const destino = this.paginaActual + direccion;
    if (destino < 1 || destino > this.totalPaginas || this.renderizando) return;

    this.paginaActual = destino;
    void this.renderizarPagina();
  }

  cambiarZoom(delta: number): void {
    const nuevo = Number(Math.min(2, Math.max(0.6, this.zoom + delta)).toFixed(2));
    if (nuevo === this.zoom) return;

    this.zoom = nuevo;
    void this.renderizarPagina();
  }

  // ── Posición de la firma ──────────────────────────────────────────────────

  /** Clic en la hoja: centra el recuadro donde se hizo clic. */
  seleccionarPosicion(evento: MouseEvent): void {
    if (!this.viewport || !this.paginaPdf || this.renderizando) return;

    const hoja = this.paginaPdf.nativeElement.getBoundingClientRect();
    const ancho = this.ANCHO_FIRMA * this.viewport.scale;
    const alto = this.ALTO_FIRMA * this.viewport.scale;

    this.posicionVisual = {
      left: this.limitar(evento.clientX - hoja.left - ancho / 2, 0, this.viewport.width - ancho),
      top: this.limitar(evento.clientY - hoja.top - alto / 2, 0, this.viewport.height - alto),
      width: ancho,
      height: alto,
    };

    this.actualizarPosicionPdf();
  }

  iniciarArrastre(evento: PointerEvent): void {
    if (!this.posicionVisual || !this.paginaPdf) return;

    evento.preventDefault();
    evento.stopPropagation();

    const hoja = this.paginaPdf.nativeElement.getBoundingClientRect();

    this.arrastrandoFirma = true;
    this.offsetArrastreX = evento.clientX - hoja.left - this.posicionVisual.left;
    this.offsetArrastreY = evento.clientY - hoja.top - this.posicionVisual.top;

    // Con pointer capture el arrastre sigue funcionando aunque el cursor se
    // salga del recuadro.
    (evento.currentTarget as HTMLElement).setPointerCapture(evento.pointerId);
  }

  moverFirma(evento: PointerEvent): void {
    if (!this.arrastrandoFirma || !this.posicionVisual || !this.paginaPdf || !this.viewport) {
      return;
    }

    evento.preventDefault();

    const hoja = this.paginaPdf.nativeElement.getBoundingClientRect();

    this.posicionVisual = {
      ...this.posicionVisual,
      left: this.limitar(
        evento.clientX - hoja.left - this.offsetArrastreX,
        0,
        this.viewport.width - this.posicionVisual.width,
      ),
      top: this.limitar(
        evento.clientY - hoja.top - this.offsetArrastreY,
        0,
        this.viewport.height - this.posicionVisual.height,
      ),
    };

    this.actualizarPosicionPdf();
  }

  terminarArrastre(): void {
    this.arrastrandoFirma = false;
  }

  /**
   * Pasa el recuadro de coordenadas de pantalla a coordenadas del PDF.
   *
   * Se convierten las cuatro esquinas y se toma el mínimo/máximo en vez de
   * convertir solo la esquina superior izquierda: el viewport puede venir
   * rotado (una página apaisada), y ahí "arriba-izquierda" en pantalla no es la
   * misma esquina que en el PDF.
   */
  private actualizarPosicionPdf(): void {
    if (!this.viewport || !this.posicionVisual) return;

    const { left, top, width, height } = this.posicionVisual;

    const esquinas = [
      this.viewport.convertToPdfPoint(left, top),
      this.viewport.convertToPdfPoint(left + width, top),
      this.viewport.convertToPdfPoint(left, top + height),
      this.viewport.convertToPdfPoint(left + width, top + height),
    ];

    const xs = esquinas.map((punto: number[]) => punto[0]);
    const ys = esquinas.map((punto: number[]) => punto[1]);

    const minX = Math.min(...xs);
    const minY = Math.min(...ys);

    this.posicionPdf = {
      pagina: this.paginaActual,
      x: this.redondear(minX),
      y: this.redondear(minY),
      ancho: this.redondear(Math.max(...xs) - minX),
      alto: this.redondear(Math.max(...ys) - minY),
    };
  }

  /** Camino inverso: del PDF a la pantalla, tras cambiar de página o zoom. */
  private reubicarMarcador(): void {
    if (!this.viewport || !this.posicionPdf || this.posicionPdf.pagina !== this.paginaActual) {
      this.posicionVisual = null;
      return;
    }

    const { x, y, ancho, alto } = this.posicionPdf;

    const superior = this.viewport.convertToViewportPoint(x, y + alto);
    const inferior = this.viewport.convertToViewportPoint(x + ancho, y);

    this.posicionVisual = {
      left: Math.min(superior[0], inferior[0]),
      top: Math.min(superior[1], inferior[1]),
      width: Math.abs(inferior[0] - superior[0]),
      height: Math.abs(inferior[1] - superior[1]),
    };
  }

  // ── Certificado ───────────────────────────────────────────────────────────

  seleccionarArchivo(evento: Event): void {
    const input = evento.target as HTMLInputElement;
    const archivo = input.files?.[0];

    if (archivo) void this.procesarArchivoP12(archivo);

    // Se limpia para que elegir el mismo archivo otra vez vuelva a disparar el
    // change.
    input.value = '';
  }

  alArrastrarSobre(evento: DragEvent): void {
    evento.preventDefault();
    this.arrastrandoArchivo = true;
  }

  alSalirArrastre(evento: DragEvent): void {
    evento.preventDefault();
    this.arrastrandoArchivo = false;
  }

  alSoltarArchivo(evento: DragEvent): void {
    evento.preventDefault();
    this.arrastrandoArchivo = false;

    const archivo = evento.dataTransfer?.files?.[0];
    if (archivo) void this.procesarArchivoP12(archivo);
  }

  private async procesarArchivoP12(archivo: File): Promise<void> {
    this.errorArchivo = '';

    if (!archivo.name.toLowerCase().endsWith('.p12')) {
      this.errorArchivo = 'Solo se aceptan certificados con extensión .p12';
      return;
    }

    if (archivo.size > this.LIMITE_BYTES_P12) {
      this.errorArchivo = 'El certificado no puede superar los 10 MB.';
      return;
    }

    try {
      const base64 = await this.aBase64(archivo);
      await this.certificadoStorage.guardar(archivo.name, base64);

      this.archivoP12Base64 = base64;
      this.nombreArchivoP12 = archivo.name;
      this.passwordP12 = '';

      void Swal.fire({
        icon: 'success',
        title: 'Certificado guardado',
        text: 'El certificado quedó guardado en este navegador. La contraseña se pide en cada firma.',
        timer: 2600,
        showConfirmButton: false,
      });
    } catch (error) {
      console.error('No se pudo guardar el certificado:', error);
      this.errorArchivo = 'No se pudo leer o guardar el certificado seleccionado.';
      this.archivoP12Base64 = '';
      this.nombreArchivoP12 = '';
      this.passwordP12 = '';
    }
  }

  async quitarCertificado(): Promise<void> {
    const { isConfirmed } = await Swal.fire({
      icon: 'warning',
      title: '¿Eliminar certificado?',
      text: 'El archivo .p12 se borrará de este navegador.',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#dc2626',
      cancelButtonColor: '#64748b',
    });

    if (!isConfirmed) return;

    try {
      await this.certificadoStorage.eliminar();

      this.archivoP12Base64 = '';
      this.nombreArchivoP12 = '';
      this.passwordP12 = '';
    } catch (error) {
      console.error('No se pudo eliminar el certificado:', error);
      void Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo eliminar el certificado guardado.',
        confirmButtonColor: '#1e3a8a',
      });
    }
  }

  private aBase64(archivo: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const lector = new FileReader();

      lector.onload = () => {
        const resultado = String(lector.result ?? '');
        // readAsDataURL devuelve 'data:...;base64,XXXX'; el backend acepta
        // ambas formas, pero se guarda el Base64 pelado.
        resolve(resultado.includes(',') ? resultado.split(',')[1] : resultado);
      };

      lector.onerror = () => reject(lector.error);
      lector.readAsDataURL(archivo);
    });
  }

  private async recuperarCertificadoGuardado(): Promise<void> {
    try {
      const certificado = await this.certificadoStorage.obtener();
      if (!certificado) return;

      this.archivoP12Base64 = certificado.base64;
      this.nombreArchivoP12 = certificado.nombre;
    } catch (error) {
      // No es bloqueante: el usuario puede volver a elegir el archivo.
      console.error('No se pudo recuperar el certificado guardado:', error);
    }
  }

  // ── Acciones ──────────────────────────────────────────────────────────────

  puedeFirmar(): boolean {
    return Boolean(
      this.archivoP12Base64 &&
        this.passwordP12.trim() &&
        this.posicionPdf &&
        !this.procesando &&
        !this.renderizando &&
        !this.cargandoPdf,
    );
  }

  confirmarFirma(): void {
    if (!this.puedeFirmar() || !this.posicionPdf) return;

    this.firmar.emit({
      archivoP12Base64: this.archivoP12Base64,
      passwordP12: this.passwordP12,
      cargo: this.cargo.trim() || undefined,
      posicionFirma: { ...this.posicionPdf },
    });
  }

  solicitarCierre(): void {
    if (this.procesando) return;
    this.cerrar.emit();
  }

  cerrarDesdeFondo(evento: MouseEvent): void {
    if (evento.target === evento.currentTarget) this.solicitarCierre();
  }

  // ── Utilidades ────────────────────────────────────────────────────────────

  /**
   * Al cerrar se borra la contraseña y la posición, pero **no** el certificado:
   * ese vive en IndexedDB justamente para no volver a pedirlo en cada firma.
   */
  private limpiarFormulario(): void {
    this.passwordP12 = '';
    this.mostrarPassword = false;
    this.cargo = '';

    this.arrastrandoArchivo = false;
    this.errorArchivo = '';
    this.errorPdf = '';

    this.posicionVisual = null;
    this.posicionPdf = null;

    this.paginaActual = 1;
    this.totalPaginas = 0;
    this.zoom = 1;
  }

  private destruirDocumento(limpiarBlob = true): void {
    if (this.renderTask) {
      try {
        this.renderTask.cancel();
      } catch {
        // Cancelar un render ya terminado lanza; no hay nada que hacer.
      }
      this.renderTask = null;
    }

    if (this.pdfDocument) {
      // `destroy()` vive en el loadingTask, no en el proxy del documento: es lo
      // que libera al worker, no solo la caché de páginas (`cleanup()`).
      void this.pdfDocument.loadingTask?.destroy();
      this.pdfDocument = null;
    }

    this.viewport = null;
    if (limpiarBlob) this.blobCargado = null;
  }

  private limitar(valor: number, minimo: number, maximo: number): number {
    return Math.min(Math.max(valor, minimo), Math.max(minimo, maximo));
  }

  private redondear(valor: number): number {
    return Number(valor.toFixed(2));
  }
}
