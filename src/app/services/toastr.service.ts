import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
/**
 * Service for displaying toast notifications using ngx-toastr.
 * Provides methods to show success, error, warning, and info alerts with customizable options.
 *
 * @example
 * constructor(private toastrAlertService: ToastrAlertService) {}
 *
 * this.toastrAlertService.showSuccess('Operation completed', 'Success');
 */
@Injectable({
  providedIn: 'root',
})
export class ToastrAlertService {
  constructor(private toastr: ToastrService) {}

  showSuccess(message: string | undefined, title: string | undefined) {
    this.toastr.success(message, title, {
      timeOut: 3000, 
      progressBar: true, 
      progressAnimation: 'increasing', 
      positionClass: 'toast-top-right', 
      closeButton: true, 
      tapToDismiss: true,

      enableHtml: true, 
    });
  }

  showError(message: string | undefined, title: string | undefined) {
    this.toastr.error(message, title, {
      timeOut: 5000,
      progressBar: true,
      progressAnimation: 'decreasing',
      positionClass: 'toast-top-right',
      closeButton: true,
      tapToDismiss: true,

      enableHtml: true,
    });
  }

  showWarning(message: string | undefined, title: string | undefined) {
    this.toastr.warning(message, title, {
      timeOut: 4000,
      progressBar: true,
      progressAnimation: 'decreasing',
      positionClass: 'toast-top-right',
      closeButton: true,
      tapToDismiss: true,

      enableHtml: true,
    });
  }

  showInfo(message: string | undefined, title: string | undefined) {
    this.toastr.info(message, title, {
      timeOut: 3500,
      progressBar: true,
      progressAnimation: 'increasing',
      positionClass: 'toast-top-right',
      closeButton: true,
      tapToDismiss: true,

      enableHtml: true,
    });
  }
}
