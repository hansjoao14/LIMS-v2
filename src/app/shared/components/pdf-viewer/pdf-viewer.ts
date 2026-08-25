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
    this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.objectUrl);
  }

  private revocarUrl(): void {
    if (this.objectUrl) {
      URL.revokeObjectURL(this.objectUrl);
      this.objectUrl = null;
    }
    this.pdfUrl = null;
  }
}
