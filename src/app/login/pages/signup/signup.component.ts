import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

import { UserService } from 'src/app/shared/services/user.service';
import { LoginService } from '../../services/login.service';
import { EmailFieldErrors, NameFieldErrors, PasswordFieldErrors, SignUpFormFields } from '../../models/auth.model';
import { signUpErrorsLocale } from '../../models/locale-errors.const';
import { passwordStrengthValidator } from '../../validators/password-strength.validator';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  public isSignupError = false;

  public errMessage = '';

  public hasNameError = false;

  public hasEmailError = false;

  public hasPasswordError = false;

  signupForm = new FormGroup({
    name: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    email: new FormControl<string>('', [
      Validators.required,
      Validators.email,
    ]),
    password: new FormControl<string>('', [
      Validators.required,
      passwordStrengthValidator(),
    ]),
  });

  constructor(
    private loginService: LoginService,
    private userService: UserService,
    public translateService: TranslateService,
  ) {
  }

  ngOnInit(): void {
    this.signupForm.valueChanges.subscribe(() => {
      if (this.signupForm.valid) {
        this.hasNameError = false;
        this.hasEmailError = false;
        this.hasPasswordError = false;
        return;
      }

      this.checkErrors();
    });
  }

  public signup(): void {
    if (this.signupForm.invalid) return;
    if (!this.name || !this.email || !this.password) return;

    this.loginService.signup(
      this.name.value,
      this.email.value,
      this.password.value,
    ).subscribe({
      next: () => {
        this.isSignupError = false;
        this.signupForm.reset();
      },
      error: (res: HttpErrorResponse) => {
        this.isSignupError = true;
        this.errMessage = `login-module.errors.${res.status}`;
      },
      complete: () => {
        this.userService.check();
      },
    });
  }

  private checkHasError(control: AbstractControl): boolean {
    return !!(control.errors && Object.keys(control.errors).length !== 0);
  }

  private checkErrors() {
    const name = this.name;
    const email = this.email;
    const password = this.password;
    if (!name || !email || !password) return;

    this.hasNameError = this.checkHasError(name);
    this.hasEmailError = this.checkHasError(email);
    this.hasPasswordError = this.checkHasError(password);
  }

  public get name() {
    return this.signupForm.get(SignUpFormFields.NAME);
  }

  public get email() {
    return this.signupForm.get(SignUpFormFields.EMAIL);
  }

  public get password() {
    return this.signupForm.get(SignUpFormFields.PASSWORD);
  }

  public getNameErrorMessage(): string {
    const name = this.name;

    if (name?.hasError(NameFieldErrors.REQUIRED)) return signUpErrorsLocale.name.required;
    if (name?.hasError(NameFieldErrors.MIN_LENGTH)) return signUpErrorsLocale.name.minLength;

    return '';
  }

  public getEmailErrorMessage(): string {
    const email = this.email;

    if (email?.hasError(EmailFieldErrors.REQUIRED)) return signUpErrorsLocale.email.required;
    if (email?.hasError(EmailFieldErrors.EMAIL)) return signUpErrorsLocale.email.email;

    return '';
  }

  public getPasswordErrorMessage(): string {
    const password = this.password;

    switch (true) {
      case password?.hasError(PasswordFieldErrors.REQUIRED):
        return signUpErrorsLocale.password.required;
      case password?.hasError(PasswordFieldErrors.ENOUGH_CHARS):
        return signUpErrorsLocale.password.enough_chars;
      case password?.hasError(PasswordFieldErrors.LOWERCASE) ||
      password?.hasError(PasswordFieldErrors.UPPERCASE):
        return signUpErrorsLocale.password.lowercase;
      case password?.hasError(PasswordFieldErrors.NUMERIC):
        return signUpErrorsLocale.password.numeric;
      case password?.hasError(PasswordFieldErrors.SPECIALS):
        return signUpErrorsLocale.password.specials;
      default:
        return '';
    }
  }
}
