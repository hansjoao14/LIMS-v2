import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-pdf-viewer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pdf-viewer.html',
})
export class PdfViewerComponent {
  @Input() visible   = false;
  @Input() loading   = false;
  @Input() pdfUrl: SafeResourceUrl | null = null;
  @Input() titulo    = 'Documento PDF';
  @Output() closed     = new EventEmitter<void>();
  @Output() downloaded = new EventEmitter<void>();
}
