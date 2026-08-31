import { Component, EventEmitter, Input, OnChanges, OnDestroy, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-pdf-viewer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pdf-viewer.html',
})
export class PdfViewerComponent implements OnChanges, OnDestroy {
  @Input() visible = false;
  @Input() loading = false;
  @Input() pdfBlob: Blob | null = null;
  @Input() titulo = 'Documento PDF';
  @Input() nombreArchivo = 'documento.pdf';
  @Output() closed = new EventEmitter<void>();

  pdfUrl: SafeResourceUrl | null = null;
  private objectUrl: string | null = null;

  constructor(private readonly sanitizer: DomSanitizer) {}

  ngOnChanges(): void {
    this.sincronizarUrl();
  }

  ngOnDestroy(): void {
    this.revocarUrl();
  }

  descargar(): void {
    if (!this.objectUrl) return;

    const enlace = document.createElement('a');
    enlace.href = this.objectUrl;
    enlace.download = this.nombreArchivo;
    enlace.click();
  }

  private sincronizarUrl(): void {
    this.revocarUrl();

    if (!this.visible || !this.pdfBlob) return;

    this.objectUrl = URL.createObjectURL(this.pdfBlob);

    /*
     * Sin esto el visor del navegador abre el PDF en su zoom por defecto
     * ("automático"), que en una pantalla alta deja la hoja A4 diminuta en el
     * centro. El fragmento son los PDF Open Parameters: `view=FitH` es el
     * estándar y lo entiende Chrome/Edge, `zoom=page-width` es el equivalente
     * de pdf.js (Firefox). El que no reconoce el suyo lo ignora.
     *
     * Va solo en la URL del iframe: `objectUrl` se queda limpio para el botón
     * de descargar.
     */
    this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      `${this.objectUrl}#view=FitH&zoom=page-width`,
    );
  }

  private revocarUrl(): void {
    if (this.objectUrl) {
      URL.revokeObjectURL(this.objectUrl);
      this.objectUrl = null;
    }
    this.pdfUrl = null;
  }
}
