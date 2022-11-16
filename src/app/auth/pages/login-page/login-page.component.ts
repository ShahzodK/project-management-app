import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { UserService } from 'src/app/shared/services/user.service';
import { AuthService } from '../../services/auth.service';
import { EmailFieldErrors, PasswordFieldErrors, LoginFormFields } from '../../models/auth.model';
import { loginErrorsLocale } from '../../models/locale-errors.const';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginComponent implements OnInit {
  public hasEmailError = false;

  public hasPasswordError = false;

  public hidePassword = true;

  loginForm = new FormGroup({
    email: new FormControl<string>('', [
      Validators.required,
      Validators.email,
    ]),
    password: new FormControl<string>('', [
      Validators.required,
    ]),
  });

  constructor(
    private authService: AuthService,
    private userService: UserService,
    public translateService: TranslateService,
    private snackBar: MatSnackBar,
  ) {
  }

  ngOnInit(): void {
    this.loginForm.valueChanges.subscribe(() => {
      if (this.loginForm.valid) {
        this.hasEmailError = false;
        this.hasPasswordError = false;
        return;
      }

      this.checkErrors();
    });
  }

  public submit(): void {
    if (this.loginForm.invalid) return;

    this.login();
  }

  public login(): void {
    if (!this.email || !this.password) return;

    this.authService.login(
      this.email.getRawValue(),
      this.password.getRawValue(),
    ).subscribe({
      next: () => {
        this.loginForm.reset();
      },
      error: (res: HttpErrorResponse) => {
        const errorMessage = this.translateService.instant(`auth.forms.errors.server.${res.status}`);
        const closeButtonText = this.translateService.instant('auth.forms.errors.close-btn');

        this.showServerError(errorMessage, closeButtonText);
      },
      complete: () => {
        this.userService.check();
        this.loginForm.reset();
      },
    });
  }

  public get email() {
    return this.loginForm.get(LoginFormFields.EMAIL);
  }

  public get password() {
    return this.loginForm.get(LoginFormFields.PASSWORD);
  }

  private checkHasError(control: AbstractControl): boolean {
    return !!(control.errors && Object.keys(control.errors).length !== 0);
  }

  private checkErrors(): void {
    const email = this.email;
    const password = this.password;
    if (!email || !password) return;

    this.hasEmailError = this.checkHasError(email);
    this.hasPasswordError = this.checkHasError(password);
  }

  public getEmailErrorMessage(): string {
    const email = this.email;

    if (email?.hasError(EmailFieldErrors.REQUIRED)) return loginErrorsLocale.email.required;
    if (email?.hasError(EmailFieldErrors.EMAIL)) return loginErrorsLocale.email.email;

    return '';
  }

  public getPasswordErrorMessage(): string {
    const password = this.password;

    if (password?.hasError(PasswordFieldErrors.REQUIRED)) return loginErrorsLocale.password.required;

    return '';
  }

  private showServerError(errorMessage: string, closeButtonText: string): void {
    this.snackBar.open(errorMessage, closeButtonText, {
      panelClass: 'notification',
      duration: 2000,
    });
  }

  public setHidePassword(): void {
    this.hidePassword = !this.hidePassword;
  }
}
