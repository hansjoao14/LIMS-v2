import { Component, input, inject, computed, ContentChild, ElementRef, AfterContentInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { AuthService } from '../../../features/auth/service/auth-service';

@Component({
  selector: 'app-page-header',
  standalone: true,
  imports: [],
  templateUrl: './page-header.html',
  providers: [DatePipe],
})
export class PageHeader implements AfterContentInit {
  private datePipe = inject(DatePipe);
  private authService = inject(AuthService);

  breadcrumbSection = input.required<string>();
  title = input<string | null>(null);
  subtitle = input<string | null>(null);
  codigoFormulario = input<string | null>(null);
  edicion = input<string | number | null>(null);
  elaboradoPor = input<string | null>(null);
  fechaSolicitud = input<Date | string | null>(null);

  hasProjectedContent = false;

  @ContentChild('pageAction') pageAction!: ElementRef;

  ngAfterContentInit() {
    this.hasProjectedContent = !!this.pageAction;
  }

  readonly resolvedElaboradoPor = computed(() =>
    this.elaboradoPor() ?? this.authService.userProfile()?.name ?? null
  );

  readonly resolvedFecha = computed(() => {
    const f = this.fechaSolicitud() ?? new Date();
    if (f instanceof Date) return this.datePipe.transform(f, 'dd/MM/yyyy');
    return f;
  });
}
