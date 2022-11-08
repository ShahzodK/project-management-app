import {HttpErrorResponse} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';

import {UserService} from 'src/app/shared/services/user.service';
import {LoginService} from '../../services/login.service';
import {EmailFieldErrors, PasswordFieldErrors, SignInFormFields} from "../../models/auth.model";
import {signInErrorsLocale} from "../../models/locale-errors.const";
import {passwordStrengthValidator} from "../../validators/password-strength.validator";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public isLoginError?: boolean;

  public errMessage = '';
  public hasEmailError: boolean = false;
  public hasPasswordError: boolean = false;

  loginForm = new FormGroup({
    email: new FormControl<string>('', [
      Validators.required,
      Validators.email,
    ]),
    password: new FormControl<string>('', [
      Validators.required,
      passwordStrengthValidator()
    ]),
  });

  constructor(
    private loginService: LoginService,
    private userService: UserService,
    private router: Router,
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

    this.loginService.login(
      this.email.value,
      this.password.value,
    ).subscribe({
      next: (res) => {
        this.isLoginError = false;
        this.loginForm.reset();
        localStorage.setItem('authToken', (res as { token: string }).token);
        this.router.navigate(['']);
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

  private checkErrors() {
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
