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
  NgZone,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GlobalWorkerOptions, getDocument } from 'pdfjs-dist';
import { CertificadoP12StorageService } from '../../../services/documentos/certificado-p12-storage.service';
import Swal from 'sweetalert2';

import {
  CampoFirmaElectronica,
  DatosFirmaElectronica,
  ErrorFirmaElectronica,
  PosicionFirmaPdf,
} from '../../../interfaces/documentos/firma-electronica.interface';

/*
 * Los tipos no se declaran acá: en este repo todos los contratos viven en
 * `src/app/interfaces/` y los componentes los importan (ver CLAUDE.md).
 */

interface RectanguloVisual {
  left: number;
  top: number;
  width: number;
  height: number;
}

@Component({
  selector: 'app-firma-electronica',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './firma-electronica.html',
  styleUrls: ['./firma-electronica.scss'],
})
export class FirmaElectronicaComponent implements OnInit, AfterViewInit, OnChanges, OnDestroy {
  @Input() mostrar = false;
  @Input() pdfBlob: Blob | null = null;
  @Input() nombreDocumento = 'permiso.pdf';
  @Input() cargandoPdf = false;
  @Input() procesando = false;
  /**
   * Error devuelto por el firmador. Lo muestra el paso al que apunta, para que
   * el usuario corrija sin salir del modal.
   */
  @Input() errorFirma: ErrorFirmaElectronica | null = null;

  @Output() cerrar = new EventEmitter<void>();
  @Output() firmar = new EventEmitter<DatosFirmaElectronica>();

  @ViewChild('pdfCanvas')
  private pdfCanvas?: ElementRef<HTMLCanvasElement>;

  @ViewChild('visorPdf')
  private visorPdf?: ElementRef<HTMLDivElement>;

  @ViewChild('paginaPdf')
  private paginaPdf?: ElementRef<HTMLDivElement>;

  @ViewChild('inputPassword')
  private inputPassword?: ElementRef<HTMLInputElement>;

  paginaActual = 1;
  totalPaginas = 0;
  zoom = 1;

  pdfCargandoInterno = false;
  renderizandoPagina = false;
  errorPdf = '';

  archivoP12Base64 = '';
  nombreArchivoP12 = '';
  passwordP12 = '';
  mostrarPassword = false;
  arrastrandoArchivo = false;
  errorArchivo = '';

  posicionVisual: RectanguloVisual | null = null;
  posicionPdf: PosicionFirmaPdf | null = null;

  /*
   * Copia local del `errorFirma` recibido. El componente necesita poder
   * borrarlo en cuanto el usuario corrige el dato señalado, y un `@Input` no
   * se muta: el padre sigue siendo el dueño de lo que envía.
   */
  errorMostrado: ErrorFirmaElectronica | null = null;

  private pdfDocument: any = null;
  private pdfLoadingTask: any = null;
  private viewport: any = null;
  private renderTask: any = null;
  private blobCargado: Blob | null = null;
  private vistaInicializada = false;
  private tokenCarga = 0;
  /**
   * Identifica la última página/zoom solicitados.
   *
   * `getPage()` es asíncrono. Si el usuario avanza varias páginas rápido,
   * una petición anterior puede terminar después y empezar a pintar sobre el
   * mismo canvas que la nueva. El resultado es una hoja incompleta: primero se
   * ven fondos y tablas, pero faltan textos, logos, notas o firmas.
   */
  private tokenRender = 0;

  /** Listeners sueltos que hay que soltar al destruir el componente. */
  private readonly alDestruir: Array<() => void> = [];

  arrastrandoFirma = false;
  private offsetArrastreX = 0;
  private offsetArrastreY = 0;

  private readonly anchoFirmaPdf = 170;
  private readonly altoFirmaPdf = 50;

  constructor(
    private certificadoStorage: CertificadoP12StorageService,
    private zone: NgZone,
  ) {
    if (typeof document !== 'undefined') {
      GlobalWorkerOptions.workerSrc = new URL(
        'assets/pdfjs/pdf.worker.min.mjs',
        document.baseURI,
      ).toString();
    }
  }

  ngOnInit(): void {
    void this.cargarCertificadoGuardado();
  }
  ngAfterViewInit(): void {
    this.vistaInicializada = true;
    this.programarCargaPdf();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['mostrar'] && !this.mostrar) {
      this.tokenCarga++;
      this.reiniciarFormulario();
      this.destruirDocumentoPdf();
      return;
    }

    if (changes['pdfBlob'] || (changes['mostrar'] && this.mostrar)) {
      this.programarCargaPdf();
    }

    if (changes['errorFirma']) {
      this.recibirErrorFirma();
    }
  }

  /**
   * Un error de contraseña deja el campo listo para reescribirla: seleccionado
   * y con el foco puesto. Los demás solo se muestran en su paso.
   */
  private recibirErrorFirma(): void {
    this.errorMostrado = this.errorFirma;

    if (this.errorFirma?.campo !== 'password') {
      return;
    }

    setTimeout(() => {
      const campo = this.inputPassword?.nativeElement;
      campo?.focus();
      campo?.select();
    });
  }

  /** El error deja de tener sentido apenas el usuario toca lo que se le señaló. */
  limpiarErrorDe(campo: CampoFirmaElectronica): void {
    if (this.errorMostrado?.campo === campo) {
      this.errorMostrado = null;
    }
  }

  hayErrorEn(campo: CampoFirmaElectronica): boolean {
    return this.errorMostrado?.campo === campo;
  }

  ngOnDestroy(): void {
    this.tokenCarga++;
    this.destruirDocumentoPdf();
    this.alDestruir.forEach((soltar) => soltar());
    this.alDestruir.length = 0;
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.mostrar && !this.procesando) {
      this.solicitarCierre();
    }
  }

  private programarCargaPdf(): void {
    if (!this.vistaInicializada || !this.mostrar || !this.pdfBlob) {
      return;
    }

    setTimeout(() => {
      void this.cargarPdf();
    });
  }

  private async cargarPdf(): Promise<void> {
    if (!this.pdfBlob || !this.pdfCanvas || this.blobCargado === this.pdfBlob) {
      return;
    }

    const tokenActual = ++this.tokenCarga;

    this.pdfCargandoInterno = true;
    this.errorPdf = '';
    this.destruirDocumentoPdf(false);

    try {
      const buffer = await this.pdfBlob.arrayBuffer();
      const tareaCarga = getDocument({
        data: new Uint8Array(buffer),
      });
      this.pdfLoadingTask = tareaCarga;

      const documento = await tareaCarga.promise;

      if (tokenActual !== this.tokenCarga) {
        await tareaCarga.destroy();
        if (this.pdfLoadingTask === tareaCarga) this.pdfLoadingTask = null;
        return;
      }

      /*
       * Dentro de la zona de Angular.
       *
       * pdf.js resuelve sus promesas desde un Web Worker, fuera de la zona, así
       * que asignar `totalPaginas` a secas no dispara la detección de cambios.
       * El canvas igual se dibuja —eso lo hace pdf.js sin pasar por Angular— y
       * por eso confunde: el documento aparece pero la interfaz sigue mostrando
       * "Cargando documento..." y "1 / 1", con el estado real ya actualizado por
       * debajo.
       *
       * En el proyecto del que viene este componente no hacía falta; acá sí.
       */
      this.zone.run(() => {
        this.pdfDocument = documento;
        this.blobCargado = this.pdfBlob;
        this.totalPaginas = documento.numPages;
        this.paginaActual = 1;
        this.zoom = 1;
        this.posicionVisual = null;
        this.posicionPdf = null;
      });

      await this.renderizarPagina();
    } catch (error) {
      if (tokenActual === this.tokenCarga && (error as { name?: string })?.name !== 'AbortException') {
        console.error('No se pudo renderizar el PDF:', error);
        this.zone.run(() => (this.errorPdf = 'No se pudo visualizar el documento PDF.'));
      }
    } finally {
      if (tokenActual === this.tokenCarga) {
        this.zone.run(() => (this.pdfCargandoInterno = false));
      }
    }
  }

  async renderizarPagina(): Promise<void> {
    if (!this.pdfDocument || !this.pdfCanvas || !this.visorPdf) {
      return;
    }

    const tokenActual = ++this.tokenRender;
    const paginaObjetivo = this.paginaActual;
    const zoomObjetivo = this.zoom;
    let tareaDeEsteRender: any = null;
    this.zone.run(() => {
      this.renderizandoPagina = true;
      this.errorPdf = '';
    });

    /*
     * No se dibuja con la pestaña oculta.
     *
     * pdf.js avanza el render por tandas encadenadas con
     * requestAnimationFrame, y el navegador lo suspende en las pestañas que no
     * están visibles. Un render arrancado ahí se queda clavado en la primera
     * operación: la promesa nunca resuelve y el "Cargando documento..." no se
     * apaga nunca. Esperar a que la pestaña esté visible lo convierte en algo
     * que se resuelve solo al volver.
     */
    await this.esperarPestanaVisible();

    if (tokenActual !== this.tokenRender) {
      return;
    }

    try {
      if (this.renderTask) {
        /*
         * Cada tarea pinta en su propio canvas temporal. Por eso se puede
         * cancelar una solicitud vieja sin esperar su promesa: nunca comparte
         * el lienzo visible con la página nueva.
         */
        const anterior = this.renderTask;
        try {
          anterior.cancel();
        } catch {
          // Ya terminó o ya estaba cancelado.
        }
        if (this.renderTask === anterior) {
          this.renderTask = null;
        }
      }

      if (tokenActual !== this.tokenRender) {
        return;
      }

      const pagina = await this.pdfDocument.getPage(paginaObjetivo);

      // Una navegación más reciente ganó mientras getPage() resolvía. Esta
      // página vieja no debe tocar dimensiones ni contexto del canvas.
      if (tokenActual !== this.tokenRender) {
        return;
      }

      const viewportBase = pagina.getViewport({ scale: 1 });

      const anchoDisponible = Math.max(320, this.visorPdf.nativeElement.clientWidth - 36);

      // El tope alto deja que una hoja A4 aproveche todo el ancho del visor
      // ensanchado; sin él el ajuste se quedaba corto y la letra salía pequeña.
      const escalaAjuste = Math.min(2.4, Math.max(0.45, anchoDisponible / viewportBase.width));

      const escala = escalaAjuste * zoomObjetivo;
      const viewport = pagina.getViewport({ scale: escala });
      this.viewport = viewport;

      /*
       * pdf.js no vuelve a pintar directamente sobre el canvas que Angular
       * mantiene en el DOM. En Chromium, reutilizar ese mismo canvas al pasar
       * de página puede dejar RenderTask.promise pendiente para siempre. Se
       * renderiza en un lienzo nuevo, aislado, y solo al completarse se copia
       * el bitmap al canvas visible de una sola vez.
       */
      const canvasTemporal = document.createElement('canvas');
      const contextoTemporal = canvasTemporal.getContext('2d');

      if (!contextoTemporal) {
        throw new Error('No fue posible obtener el contexto del canvas.');
      }

      const densidad = Math.min(window.devicePixelRatio || 1, 2);

      canvasTemporal.width = Math.floor(viewport.width * densidad);
      canvasTemporal.height = Math.floor(viewport.height * densidad);

      const parametrosRender: any = {
        canvasContext: contextoTemporal,
        viewport,
        transform: densidad !== 1 ? [densidad, 0, 0, densidad, 0, 0] : undefined,
      };

      const tareaActual = pagina.render(parametrosRender);
      tareaDeEsteRender = tareaActual;
      this.renderTask = tareaActual;
      await tareaActual.promise;

      if (tokenActual !== this.tokenRender) {
        return;
      }

      const canvasVisible = this.pdfCanvas.nativeElement;
      canvasVisible.width = canvasTemporal.width;
      canvasVisible.height = canvasTemporal.height;
      canvasVisible.style.width = `${Math.floor(viewport.width)}px`;
      canvasVisible.style.height = `${Math.floor(viewport.height)}px`;

      const contextoVisible = canvasVisible.getContext('2d');
      if (!contextoVisible) {
        throw new Error('No fue posible actualizar el canvas visible.');
      }

      contextoVisible.clearRect(0, 0, canvasVisible.width, canvasVisible.height);
      contextoVisible.drawImage(canvasTemporal, 0, 0);

      this.zone.run(() => this.actualizarMarcadorDesdePdf());
    } catch (error: any) {
      if (
        tokenActual === this.tokenRender &&
        error?.name !== 'RenderingCancelledException'
      ) {
        console.error('Error renderizando la página:', error);
        this.zone.run(() => (this.errorPdf = 'No se pudo renderizar la página seleccionada.'));
      }
    } finally {
      // Es indispensable soltar también las tareas completadas. Si queda la
      // referencia de la página 1, el siguiente cambio intenta cancelarla y
      // puede quedar esperando una promesa que pdf.js ya cerró internamente.
      if (this.renderTask === tareaDeEsteRender) {
        this.renderTask = null;
      }

      if (tokenActual === this.tokenRender) {
        this.zone.run(() => (this.renderizandoPagina = false));
      }
    }
  }

  cambiarPagina(direccion: number): void {
    const nuevaPagina = this.paginaActual + direccion;

    if (
      nuevaPagina < 1 ||
      nuevaPagina > this.totalPaginas ||
      this.pdfCargandoInterno ||
      this.renderizandoPagina
    ) {
      return;
    }

    this.paginaActual = nuevaPagina;
    void this.renderizarPagina();
  }

  cambiarZoom(delta: number): void {
    if (this.renderizandoPagina) {
      return;
    }

    const nuevoZoom = Number(Math.min(2, Math.max(0.6, this.zoom + delta)).toFixed(2));

    if (nuevoZoom === this.zoom) {
      return;
    }

    this.zoom = nuevoZoom;
    void this.renderizarPagina();
  }

  seleccionarPosicion(event: MouseEvent): void {
    if (
      !this.viewport ||
      !this.paginaPdf ||
      this.pdfCargandoInterno ||
      this.renderizandoPagina
    ) {
      return;
    }

    // Reubicar la firma responde a un error de posición: deja de aplicar.
    this.limpiarErrorDe('posicion');

    const rectPagina = this.paginaPdf.nativeElement.getBoundingClientRect();
    const anchoVisual = this.anchoFirmaPdf * this.viewport.scale;
    const altoVisual = this.altoFirmaPdf * this.viewport.scale;

    const left = this.limitar(
      event.clientX - rectPagina.left - anchoVisual / 2,
      0,
      this.viewport.width - anchoVisual,
    );

    const top = this.limitar(
      event.clientY - rectPagina.top - altoVisual / 2,
      0,
      this.viewport.height - altoVisual,
    );

    this.posicionVisual = {
      left,
      top,
      width: anchoVisual,
      height: altoVisual,
    };

    this.actualizarPosicionPdf();
  }

  iniciarArrastreFirma(event: PointerEvent): void {
    if (!this.posicionVisual || !this.paginaPdf) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();

    const rectPagina = this.paginaPdf.nativeElement.getBoundingClientRect();

    this.arrastrandoFirma = true;
    this.offsetArrastreX = event.clientX - rectPagina.left - this.posicionVisual.left;
    this.offsetArrastreY = event.clientY - rectPagina.top - this.posicionVisual.top;

    const elemento = event.currentTarget as HTMLElement;
    elemento.setPointerCapture(event.pointerId);
  }

  moverFirma(event: PointerEvent): void {
    if (!this.arrastrandoFirma || !this.posicionVisual || !this.paginaPdf || !this.viewport) {
      return;
    }

    event.preventDefault();

    const rectPagina = this.paginaPdf.nativeElement.getBoundingClientRect();

    const left = this.limitar(
      event.clientX - rectPagina.left - this.offsetArrastreX,
      0,
      this.viewport.width - this.posicionVisual.width,
    );

    const top = this.limitar(
      event.clientY - rectPagina.top - this.offsetArrastreY,
      0,
      this.viewport.height - this.posicionVisual.height,
    );

    this.posicionVisual = {
      ...this.posicionVisual,
      left,
      top,
    };

    this.actualizarPosicionPdf();
  }

  terminarArrastreFirma(): void {
    this.arrastrandoFirma = false;
  }

  private actualizarPosicionPdf(): void {
    if (!this.viewport || !this.posicionVisual) {
      return;
    }

    const { left, top, width, height } = this.posicionVisual;

    const esquinas = [
      this.viewport.convertToPdfPoint(left, top),
      this.viewport.convertToPdfPoint(left + width, top),
      this.viewport.convertToPdfPoint(left, top + height),
      this.viewport.convertToPdfPoint(left + width, top + height),
    ];

    const valoresX = esquinas.map((punto: number[]) => punto[0]);
    const valoresY = esquinas.map((punto: number[]) => punto[1]);

    const minimoX = Math.min(...valoresX);
    const maximoX = Math.max(...valoresX);
    const minimoY = Math.min(...valoresY);
    const maximoY = Math.max(...valoresY);

    this.posicionPdf = {
      pagina: this.paginaActual,
      x: this.redondear(minimoX),
      y: this.redondear(minimoY),
      ancho: this.redondear(maximoX - minimoX),
      alto: this.redondear(maximoY - minimoY),
    };
  }

  private actualizarMarcadorDesdePdf(): void {
    if (!this.viewport || !this.posicionPdf || this.posicionPdf.pagina !== this.paginaActual) {
      this.posicionVisual = null;
      return;
    }

    const posicion = this.posicionPdf;

    const superiorIzquierda = this.viewport.convertToViewportPoint(
      posicion.x,
      posicion.y + posicion.alto,
    );

    const inferiorDerecha = this.viewport.convertToViewportPoint(
      posicion.x + posicion.ancho,
      posicion.y,
    );

    this.posicionVisual = {
      left: Math.min(superiorIzquierda[0], inferiorDerecha[0]),
      top: Math.min(superiorIzquierda[1], inferiorDerecha[1]),
      width: Math.abs(inferiorDerecha[0] - superiorIzquierda[0]),
      height: Math.abs(inferiorDerecha[1] - superiorIzquierda[1]),
    };
  }

  seleccionarArchivo(event: Event): void {
    const input = event.target as HTMLInputElement;
    const archivo = input.files?.[0];

    if (archivo) {
      void this.procesarArchivoP12(archivo);
    }

    input.value = '';
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    this.arrastrandoArchivo = true;
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    this.arrastrandoArchivo = false;
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    this.arrastrandoArchivo = false;

    const archivo = event.dataTransfer?.files?.[0];

    if (archivo) {
      void this.procesarArchivoP12(archivo);
    }
  }

  private async procesarArchivoP12(archivo: File): Promise<void> {
    this.errorArchivo = '';
    this.errorMostrado = null;

    if (!archivo.name.toLowerCase().endsWith('.p12')) {
      this.errorArchivo = 'Solo se permiten certificados en formato .p12.';
      return;
    }

    if (archivo.size === 0) {
      this.errorArchivo = 'El archivo .p12 está vacío. Selecciona un certificado válido.';
      return;
    }

    const limiteBytes = 10 * 1024 * 1024;

    if (archivo.size > limiteBytes) {
      this.errorArchivo = 'El archivo .p12 no puede superar los 10 MB.';
      return;
    }

    try {
      const base64 = await this.convertirArchivoABase64(archivo);

      await this.certificadoStorage.guardar(archivo.name, base64);

      this.archivoP12Base64 = base64;
      this.nombreArchivoP12 = archivo.name;
      this.passwordP12 = '';

      void Swal.fire({
        icon: 'success',
        title: 'Certificado guardado',
        text: 'El certificado .p12 quedó guardado en este navegador. La contraseña deberá ingresarse en cada firma.',
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

  private convertirArchivoABase64(archivo: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const lector = new FileReader();

      lector.onload = () => {
        const resultado = String(lector.result || '');
        const base64 = resultado.includes(',') ? resultado.split(',')[1] : resultado;

        resolve(base64);
      };

      lector.onerror = () => reject(lector.error);
      lector.readAsDataURL(archivo);
    });
  }

  async limpiarArchivo(): Promise<void> {
    const resultado = await Swal.fire({
      icon: 'warning',
      title: '¿Eliminar certificado?',
      text: 'El archivo .p12 será eliminado de este navegador.',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#dc2626',
      cancelButtonColor: '#64748b',
    });

    if (!resultado.isConfirmed) {
      return;
    }

    try {
      await this.certificadoStorage.eliminar();

      this.archivoP12Base64 = '';
      this.nombreArchivoP12 = '';
      this.passwordP12 = '';

      this.posicionVisual = null;
      this.posicionPdf = null;

      void Swal.fire({
        icon: 'success',
        title: 'Certificado eliminado',
        text: 'El certificado fue eliminado del navegador.',
        timer: 1800,
        showConfirmButton: false,
      });
    } catch (error) {
      console.error('No se pudo eliminar el certificado:', error);

      void Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo eliminar el certificado guardado.',
        confirmButtonColor: '#243b83',
      });
    }
  }

  /**
   * Lo que todavía falta para poder firmar, en el orden de los pasos.
   *
   * Es la misma lista que evalúa `puedeFirmar()`, pero en texto: el botón
   * deshabilitado no explica por qué lo está, y esto sí.
   */
  requisitosPendientes(): string[] {
    const faltantes: string[] = [];

    if (!this.posicionPdf) {
      faltantes.push('ubicar la firma en el documento');
    }

    if (!this.archivoP12Base64) {
      faltantes.push('seleccionar el certificado .p12');
    }

    if (!this.passwordP12.trim()) {
      faltantes.push('ingresar la contraseña del certificado');
    }

    return faltantes;
  }

  /** Motivo por el que el botón está bloqueado, para el `title` del botón. */
  motivoBloqueo(): string {
    if (this.procesando) {
      return 'Firmando el documento...';
    }

    if (this.errorPdf) {
      return 'No se puede firmar: el documento no se pudo cargar.';
    }

    if (this.cargandoPdf || this.pdfCargandoInterno || this.renderizandoPagina) {
      return 'Espera a que termine de cargar el documento.';
    }

    const faltantes = this.requisitosPendientes();

    return faltantes.length ? `Falta ${faltantes.join(', ')}.` : 'Firmar el documento';
  }

  puedeFirmar(): boolean {
    return Boolean(
      this.requisitosPendientes().length === 0 &&
      !this.procesando &&
      !this.pdfCargandoInterno &&
      !this.renderizandoPagina &&
      !this.cargandoPdf &&
      // Sin documento a la vista no hay nada que firmar: la posición guardada
      // correspondería a un render que falló.
      !this.errorPdf,
    );
  }

  confirmarFirma(): void {
    if (!this.puedeFirmar() || !this.posicionPdf) {
      return;
    }

    this.errorMostrado = null;

    this.firmar.emit({
      archivoP12Base64: this.archivoP12Base64,
      passwordP12: this.passwordP12,
      posicionFirma: {
        ...this.posicionPdf,
      },
    });
  }

  solicitarCierre(): void {
    if (this.procesando) {
      return;
    }

    this.cerrar.emit();
  }

  cerrarDesdeFondo(event: MouseEvent): void {
    if (event.target === event.currentTarget) {
      this.solicitarCierre();
    }
  }

  detenerClick(event: MouseEvent): void {
    event.stopPropagation();
  }

  private reiniciarFormulario(): void {
    /*
     * El certificado no se elimina porque está almacenado
     * en IndexedDB.
     */

    // La contraseña siempre se borra.
    this.passwordP12 = '';
    this.mostrarPassword = false;

    this.arrastrandoArchivo = false;
    this.errorArchivo = '';
    this.errorMostrado = null;
    this.errorPdf = '';
    this.renderizandoPagina = false;

    this.posicionVisual = null;
    this.posicionPdf = null;

    this.paginaActual = 1;
    this.totalPaginas = 0;
    this.zoom = 1;
  }

  private destruirDocumentoPdf(limpiarBlob: boolean = true): void {
    // Invalida también los getPage() que sigan pendientes y que todavía no
    // hayan creado una RenderTask cancelable.
    this.tokenRender++;
    this.renderizandoPagina = false;

    if (this.renderTask) {
      try {
        this.renderTask.cancel();
      } catch (error) {
        console.debug('No se pudo cancelar el renderizado:', error);
      }

      this.renderTask = null;
    }

    const tareaCarga = this.pdfLoadingTask ?? this.pdfDocument?.loadingTask;
    this.pdfLoadingTask = null;
    this.pdfDocument = null;

    if (tareaCarga) {
      void tareaCarga.destroy().catch((error: unknown) =>
        console.debug('No se pudo destruir el worker del PDF:', error),
      );
    }

    this.viewport = null;

    if (limpiarBlob) {
      this.blobCargado = null;
    }
  }

  /** Resuelve cuando la pestaña está visible; de inmediato si ya lo está. */
  private esperarPestanaVisible(): Promise<void> {
    if (typeof document === 'undefined' || document.visibilityState === 'visible') {
      return Promise.resolve();
    }

    return new Promise((resolve) => {
      const alCambiar = () => {
        if (document.visibilityState !== 'visible') return;
        document.removeEventListener('visibilitychange', alCambiar);
        resolve();
      };

      document.addEventListener('visibilitychange', alCambiar);
      this.alDestruir.push(() => document.removeEventListener('visibilitychange', alCambiar));
    });
  }

  private limitar(valor: number, minimo: number, maximo: number): number {
    return Math.min(Math.max(valor, minimo), Math.max(minimo, maximo));
  }

  private redondear(valor: number): number {
    return Number(valor.toFixed(2));
  }

  private async cargarCertificadoGuardado(): Promise<void> {
    try {
      const certificado = await this.certificadoStorage.obtener();

      if (!certificado) {
        return;
      }

      this.archivoP12Base64 = certificado.base64;
      this.nombreArchivoP12 = certificado.nombre;
    } catch (error) {
      console.error('No se pudo recuperar el certificado guardado:', error);

      void Swal.fire({
        icon: 'warning',
        title: 'Certificado no recuperado',
        text: 'No se pudo recuperar el certificado almacenado en este navegador.',
        confirmButtonColor: '#243b83',
      });
    }
  }
}
