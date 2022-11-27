import { Injectable } from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class NotifyService {
  private readonly successText = this.translateService.instant('notification.success');
  private readonly errorText = this.translateService.instant('notification.error');
  private readonly closeBtnText = this.translateService.instant('notification.close-btn');

  constructor(
    private snackbar: MatSnackBar,
    private translateService: TranslateService) { }

  public success(): void {
    this.snackbar.open(this.successText, this.closeBtnText, {
      panelClass: ['notification', 'notification--success'],
      duration: 3000,
    });
  }

  public error(errorLocaleText?: string): void {
    let errorText = errorLocaleText
      ? this.translateService.instant(errorLocaleText)
      : this.errorText;

    this.snackbar.open(errorText, this.closeBtnText, {
      panelClass: ['notification', 'notification--error'],
      duration: 3000,
    });
  }
}
