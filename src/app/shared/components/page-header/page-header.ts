import { Component, input, inject, computed } from '@angular/core';
import { DatePipe } from '@angular/common';
import { AuthService } from '../../../features/auth/service/auth-service';

@Component({
  selector: 'app-page-header',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './page-header.html',
  providers: [DatePipe],
})
export class PageHeader {
  private datePipe = inject(DatePipe);
  private authService = inject(AuthService);

  breadcrumbSection = input.required<string>();
  title = input<string | null>(null);
  subtitle = input<string | null>(null);
  codigoFormulario = input<string | null>(null);
  edicion = input<string | number | null>(null);
  elaboradoPor = input<string | null>(null);
  fechaSolicitud = input<Date | string | null>(null);

  readonly resolvedElaboradoPor = computed(() =>
    this.elaboradoPor() ?? this.authService.userProfile()?.name ?? null
  );

  readonly resolvedFecha = computed(() => {
    const f = this.fechaSolicitud() ?? new Date();
    if (f instanceof Date) return this.datePipe.transform(f, 'dd/MM/yyyy');
    return f;
  });

  get hasRightSection(): boolean {
    return !!(
      this.codigoFormulario() ||
      this.resolvedElaboradoPor() ||
      this.resolvedFecha() ||
      this.edicion()
    );
  }
}
