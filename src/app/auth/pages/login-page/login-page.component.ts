import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { UserService } from 'src/app/shared/services/user.service';
import { AuthService } from '../../services/auth.service';
import { EmailFieldErrors, PasswordFieldErrors, SignInFormFields } from '../../models/auth.model';
import { signInErrorsLocale } from '../../models/locale-errors.const';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  public isLoginError = false;

  public errMessage = '';

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
    private authService: AuthService,
    private userService: UserService,
    public translateService: TranslateService,
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
        this.isLoginError = false;
        this.loginForm.reset();
      },
      error: (res: HttpErrorResponse) => {
        this.isLoginError = true;
        this.errMessage = `login-module.errors.${res.status}`;
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
}
