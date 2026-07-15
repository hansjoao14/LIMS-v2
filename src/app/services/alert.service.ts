import { Injectable } from '@angular/core';
import Swal, { SweetAlertIcon } from 'sweetalert2';

/** Color de marca usado por defecto en los diálogos (mismo valor que COLOR_PRIMARIO en las features actuales). */
export const ALERT_PRIMARY_COLOR = '#1e3a8a';

export interface ConfirmOptions {
  title: string;
  text?: string;
  icon?: SweetAlertIcon;
  confirmButtonText?: string;
  cancelButtonText?: string;
  confirmButtonColor?: string;
  cancelButtonColor?: string;
}

/**
 * Wrapper de SweetAlert2 con las variantes que se repiten en las features
 * del proyecto (diálogos de error/éxito/advertencia y toasts), para no
 * reimplementar `Swal.fire({...})` con el mismo `confirmButtonColor` en
 * cada componente.
 */
@Injectable({
  providedIn: 'root',
})
export class AlertService {
  success(
    text: string,
    title = 'Éxito',
    confirmButtonText?: string,
    confirmButtonColor?: string,
  ): void {
    Swal.fire({
      icon: 'success',
      title,
      text,
      confirmButtonColor: confirmButtonColor ?? ALERT_PRIMARY_COLOR,
      confirmButtonText,
    });
  }

  error(
    text: string,
    title = 'Error',
    confirmButtonText?: string,
    confirmButtonColor?: string,
  ): void {
    Swal.fire({
      icon: 'error',
      title,
      text,
      confirmButtonColor: confirmButtonColor ?? ALERT_PRIMARY_COLOR,
      confirmButtonText,
    });
  }

  warning(
    text: string,
    title = 'Atención',
    confirmButtonText?: string,
    confirmButtonColor?: string,
  ): void {
    Swal.fire({
      icon: 'warning',
      title,
      text,
      confirmButtonColor: confirmButtonColor ?? ALERT_PRIMARY_COLOR,
      confirmButtonText,
    });
  }

  toast(icon: SweetAlertIcon, text: string): void {
    Swal.fire({
      icon,
      text,
      confirmButtonColor: ALERT_PRIMARY_COLOR,
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
    });
  }

  /** Éxito que se autocierra sin botón de confirmar (útil antes de navegar o refrescar). */
  async successAutoClose(
    text: string,
    title = 'Éxito',
    timerMs = 2000,
    confirmButtonColor?: string,
  ): Promise<void> {
    await Swal.fire({
      icon: 'success',
      title,
      text,
      confirmButtonColor: confirmButtonColor ?? ALERT_PRIMARY_COLOR,
      timer: timerMs,
      showConfirmButton: false,
    });
  }

  /** Diálogo de confirmar/cancelar. Devuelve true si el usuario confirmó. */
  async confirm(options: ConfirmOptions): Promise<boolean> {
    const result = await Swal.fire({
      icon: options.icon ?? 'warning',
      title: options.title,
      text: options.text,
      showCancelButton: true,
      confirmButtonText: options.confirmButtonText ?? 'Sí',
      cancelButtonText: options.cancelButtonText ?? 'Cancelar',
      confirmButtonColor: options.confirmButtonColor ?? ALERT_PRIMARY_COLOR,
      cancelButtonColor: options.cancelButtonColor ?? '#6b7280',
    });
    return result.isConfirmed;
  }
}
