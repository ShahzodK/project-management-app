import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';
import { UserApiService } from '../../services/user-api.service';
import { UserService } from 'src/app/shared/services/user.service';
import { selectUserLogin, selectUserName } from 'src/app/redux/selectors/app.selectors';
import * as UserActions from '../../../redux/actions/app.actions';
import { passwordStrengthValidator } from 'src/app/core/validators/password-strength.validator';
import { signUpErrorsLocale } from 'src/app/auth/models/locale-errors.const';
import { EmailFieldErrors, NameFieldErrors, PasswordFieldErrors } from 'src/app/auth/models/forms.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AppRoutePaths } from '../../../core/enums/routes.enum';


@Component({
  selector: 'app-edit-profile-page',
  templateUrl: './edit-profile-page.component.html',
  styleUrls: ['./edit-profile-page.component.scss'],
})
export class EditProfilePageComponent implements OnInit {

  public hasNameError = false;

  public hasEmailError = false;

  public hasPasswordError = false;

  public hidePassword = true;


  public editProfileForm = new FormGroup({
    name: new FormControl<string>('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.minLength(3),
      ],
    }),
    email: new FormControl<string>('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.email,
      ],
    }),
    password: new FormControl<string>('', {
      nonNullable: true,
      validators: [
        Validators.required,
        passwordStrengthValidator(),
      ],
    }),
  }, {
    updateOn: 'submit',
  });

  constructor(
    private store: Store,
    private userApi: UserApiService,
    private userService: UserService,
    private router: Router,
    private snackBar: MatSnackBar,
    private translateService: TranslateService,
  ) {
  }

  ngOnInit(): void {
    this.store.select(selectUserName).pipe(take(1)).subscribe((name) => {
      this.name!.setValue(name);
    });
    this.store.select(selectUserLogin).pipe(take(1)).subscribe((email) => {
      this.email!.setValue(email);
    });
  }

  public get name() {
    return this.editProfileForm.get('name');
  }

  public get email() {
    return this.editProfileForm.get('email');
  }

  public get password() {
    return this.editProfileForm.get('password');
  }

  private checkErrors() {
    const password = this.password!;
    const name = this.name!;
    const email = this.email!;

    this.hasPasswordError = this.checkHasError(password);
    this.hasNameError = this.checkHasError(name);
    this.hasEmailError = this.checkHasError(email);
  }

  private checkHasError(control: AbstractControl): boolean {
    return !!(control.errors && Object.keys(control.errors).length !== 0);
  }

  public getNameErrorMessage(): string {
    const name = this.name!;

    if (name.hasError(NameFieldErrors.REQUIRED)) return 'auth.forms.errors.client.name.required';
    if (name.hasError(NameFieldErrors.MIN_LENGTH)) return 'auth.forms.errors.client.name.minlength';

    return '';
  }

  public getEmailErrorMessage(): string {
    const email = this.email!;

    switch (true) {
      case email.hasError(EmailFieldErrors.REQUIRED):
        return 'auth.forms.errors.client.email.required';
      case email.hasError(EmailFieldErrors.EMAIL):
        return 'auth.forms.errors.client.email.email';
      default:
        return '';
    }
  }

  public getPasswordErrorMessage(): string {
    const password = this.password!;

    switch (true) {
      case password.hasError(PasswordFieldErrors.REQUIRED):
        return signUpErrorsLocale.password.required;
      case password.hasError(PasswordFieldErrors.ENOUGH_CHARS):
        return signUpErrorsLocale.password.enough_chars;
      case password.hasError(PasswordFieldErrors.LOWERCASE) ||
      password?.hasError(PasswordFieldErrors.UPPERCASE):
        return signUpErrorsLocale.password.lowercase;
      case password.hasError(PasswordFieldErrors.NUMERIC):
        return signUpErrorsLocale.password.numeric;
      case password.hasError(PasswordFieldErrors.SPECIALS):
        return signUpErrorsLocale.password.specials;
      default:
        return '';
    }
  }

  public deleteUser(): void {
    this.userApi.deleteUser(this.userService.getUserId()).subscribe({
      complete: () => {
        this.store.dispatch(UserActions.resetUser());
        this.router.navigate([AppRoutePaths.WELCOME]);
      },
    });
  }

  public submit(): void {
    if (this.editProfileForm.invalid) {
      this.checkErrors();
      return;
    }

    const id = this.userService.getUserId();
    const name = this.editProfileForm.getRawValue().name;
    const email = this.editProfileForm.getRawValue().email;
    const password = this.editProfileForm.getRawValue().password;


    this.userApi.updateUser(this.userService.getUserId(), name, email, password).subscribe(() => {
      const user = {
        name,
        id,
        login: email,
      };

      this.store.dispatch(UserActions.setLoggedUser(user));

      const message = this.translateService.instant('edit-profile.notification.success');
      const buttonText = this.translateService.instant('edit-profile.notification.close-btn');

      this.showSuccessEdit(message, buttonText);
    });
  }

  private showSuccessEdit(message: string, buttonText: string): void {
    this.snackBar.open(message, buttonText, {
      panelClass: 'notification',
    });
  }

  public setHidePassword(): void {
    this.hidePassword = !this.hidePassword;
  }
}
