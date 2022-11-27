import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class NotifyService {
  private readonly successText = this.getTranslation('core.notification.success');

  private readonly errorText = this.getTranslation('core.notification.error');

  private readonly closeBtnText = this.getTranslation('core.notification.close-btn');

  private readonly NOT_FOUND_ERR_CODE = 404;

  private readonly SERVER_ERR_CODE = 500;

  constructor(
    private snackbar: MatSnackBar,
    private translateService: TranslateService) { }

  public success(): void {
    this.snackbar.open(this.successText, this.closeBtnText, {
      panelClass: ['notification', 'notification--success'],
      duration: 3000,
    });
  }

  public error(error: HttpErrorResponse): void {
    let errorText = this.errorText;

    if (error) {
      if (error.status === this.NOT_FOUND_ERR_CODE) {
        errorText = this.getTranslation(`core.notification.errors.${this.NOT_FOUND_ERR_CODE}`);
      }

      if (error.status === this.SERVER_ERR_CODE) {
        errorText = this.getTranslation(`core.notification.errors.${this.SERVER_ERR_CODE}`);
      }
    }

    this.snackbar.open(errorText, this.closeBtnText, {
      panelClass: ['notification', 'notification--error'],
      duration: 3000,
    });
  }

  private getTranslation(str: string): string {
    return this.translateService.instant(str);
  }
}
