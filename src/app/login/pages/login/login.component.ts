import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { UserService } from 'src/app/shared/services/user.service';
import { LoginService } from '../../services/login.service';
import { EmailFieldErrors, PasswordFieldErrors, SignInFormFields } from '../../models/auth.model';
import { signInErrorsLocale } from '../../models/locale-errors.const';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public hasEmailError = false;

  public hasPasswordError = false;

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
    private loginService: LoginService,
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

    this.loginService.login(
      this.email.value,
      this.password.value,
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
    return this.loginForm.get(SignInFormFields.EMAIL);
  }

  public get password() {
    return this.loginForm.get(SignInFormFields.PASSWORD);
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

    if (email?.hasError(EmailFieldErrors.REQUIRED)) return signInErrorsLocale.email.required;
    if (email?.hasError(EmailFieldErrors.EMAIL)) return signInErrorsLocale.email.email;

    return '';
  }

  public getPasswordErrorMessage(): string {
    const password = this.password;

    if (password?.hasError(PasswordFieldErrors.REQUIRED)) return signInErrorsLocale.password.required;

    return '';
  }

  private showServerError(errorMessage: string, closeButtonText: string): void {
    this.snackBar.open(errorMessage, closeButtonText, {
      panelClass: 'server-error',
      duration: 2000,
    });
  }

}
