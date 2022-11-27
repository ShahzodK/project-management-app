import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from '../../services/auth.service';
import { EmailFieldErrors, NameFieldErrors, PasswordFieldErrors, SignUpFormFields } from '../../models/forms.model';
import { passwordStrengthValidator } from '../../../core/validators/password-strength.validator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '../../../core/services/user.service';
import { formErrorsLocale } from '../../models/locale-errors.const';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.scss'],
})
export class SignupPageComponent implements OnInit {
  public hasNameError: boolean = false;

  public hasEmailError = false;

  public hasPasswordError = false;

  public hidePassword = true;

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
    private authService: AuthService,
    private userService: UserService,
    public translateService: TranslateService,
    private snackBar: MatSnackBar,
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

    this.authService.signup(
      this.name.getRawValue(),
      this.email.getRawValue(),
      this.password.getRawValue(),
    ).subscribe({
      next: () => {
        this.signupForm.reset();
      },
      error: (res: HttpErrorResponse) => {
        const errorMessage = this.translateService.instant(`auth.forms.errors.server.${res.status}`);
        const closeButtonText = this.translateService.instant('auth.forms.errors.close-btn');

        this.showServerError(errorMessage, closeButtonText);
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

    if (name?.hasError(NameFieldErrors.REQUIRED)) return formErrorsLocale.name.required;
    if (name?.hasError(NameFieldErrors.MIN_LENGTH)) return formErrorsLocale.name.minLength;

    return '';
  }

  public getEmailErrorMessage(): string {
    const email = this.email;

    if (email?.hasError(EmailFieldErrors.REQUIRED)) return formErrorsLocale.email.required;
    if (email?.hasError(EmailFieldErrors.EMAIL)) return formErrorsLocale.email.email;

    return '';
  }

  public getPasswordErrorMessage(): string {
    const password = this.password;

    switch (true) {
      case password?.hasError(PasswordFieldErrors.REQUIRED):
        return formErrorsLocale.password.required;
      case password?.hasError(PasswordFieldErrors.ENOUGH_CHARS):
        return formErrorsLocale.password.enough_chars;
      case password?.hasError(PasswordFieldErrors.LOWERCASE) ||
      password?.hasError(PasswordFieldErrors.UPPERCASE):
        return formErrorsLocale.password.lowercase;
      case password?.hasError(PasswordFieldErrors.NUMERIC):
        return formErrorsLocale.password.numeric;
      case password?.hasError(PasswordFieldErrors.SPECIALS):
        return formErrorsLocale.password.specials;
      default:
        return '';
    }
  }

  private showServerError(errorMessage: string, closeButtonText: string): void {
    this.snackBar.open(errorMessage, closeButtonText, {
      panelClass: ['notification', 'notification--error'],
      duration: 2000,
    });
  }

  public setHidePassword(): void {
    this.hidePassword = !this.hidePassword;
  }
}
