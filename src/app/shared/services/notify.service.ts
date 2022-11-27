import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class NotifyService {
  private readonly successLocaleRef = 'core.notification.success';

  private readonly errorLocaleRef = 'core.notification.error';

  private readonly closeBtnLocaleRef = 'core.notification.close-btn';

  private readonly NOT_FOUND_ERR_CODE = 404;

  private readonly SERVER_ERR_CODE = 500;

  private readonly INCORRECT_CREDENTIALS_ERR_CODE = 401;

  private readonly USER_EXISTS_ERR_CODE = 409;

  constructor(
    private snackbar: MatSnackBar,
    private translateService: TranslateService) {
  }

  public success(): void {
    const successText = this.translateService.instant(this.successLocaleRef);
    const closeBtnText = this.translateService.instant(this.closeBtnLocaleRef);

    this.snackbar.open(successText, closeBtnText, {
      panelClass: ['notification', 'notification--success'],
      duration: 3000,
    });
  }

  public error(error: HttpErrorResponse): void {
    const closeBtnText = this.translateService.instant(this.closeBtnLocaleRef);
    let errorText = this.translateService.instant(this.errorLocaleRef);

    if (error.status === this.NOT_FOUND_ERR_CODE) {
      errorText = this.translateService.instant(
        `core.notification.errors.${this.NOT_FOUND_ERR_CODE}`,
      );
    }

    if (error.status === this.SERVER_ERR_CODE) {
      errorText = this.translateService.instant(
        `core.notification.errors.${this.SERVER_ERR_CODE}`,
      );
    }

    if (error.status === this.INCORRECT_CREDENTIALS_ERR_CODE) {
      errorText = this.translateService.instant(
        `core.notification.errors.${this.INCORRECT_CREDENTIALS_ERR_CODE}`,
      );
    }

    if (error.status === this.USER_EXISTS_ERR_CODE) {
      errorText = this.translateService.instant(
        `core.notification.errors.${this.USER_EXISTS_ERR_CODE}`,
      );
    }

    this.snackbar.open(errorText, closeBtnText, {
      panelClass: ['notification', 'notification--error'],
      duration: 3000,
    });
  }
}
