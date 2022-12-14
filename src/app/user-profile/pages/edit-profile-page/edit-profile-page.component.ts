import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';
import { UserApiService } from '../../services/user-api.service';
import {  selectUserLogin, selectUserName } from 'src/app/redux/selectors/app.selectors';
import * as UserActions from '../../../redux/actions/app.actions';
import { passwordStrengthValidator } from 'src/app/core/validators/password-strength.validator';
import { EmailFieldErrors, NameFieldErrors, PasswordFieldErrors } from 'src/app/auth/models/forms.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ConfirmModalComponent } from '../../../shared/components/confirm-modal/confirm-modal.component';
import { formErrorsLocale } from '../../../auth/models/locale-errors.const';
import { AuthService } from '../../../auth/services/auth.service';


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
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar,
    private translateService: TranslateService,
    private dialog: MatDialog,
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

  public setHidePassword(): void {
    this.hidePassword = !this.hidePassword;
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
        return formErrorsLocale.password.required;
      case password.hasError(PasswordFieldErrors.ENOUGH_CHARS):
        return formErrorsLocale.password.enough_chars;
      case password.hasError(PasswordFieldErrors.LOWERCASE) ||
      password?.hasError(PasswordFieldErrors.UPPERCASE):
        return formErrorsLocale.password.lowercase;
      case password.hasError(PasswordFieldErrors.NUMERIC):
        return formErrorsLocale.password.numeric;
      case password.hasError(PasswordFieldErrors.SPECIALS):
        return formErrorsLocale.password.specials;
      default:
        return '';
    }
  }

  public submit(): void {
    if (this.editProfileForm.invalid) {
      this.checkErrors();
      return;
    }

    const id = this.authService.getUserId();
    const name = this.editProfileForm.getRawValue().name;
    const email = this.editProfileForm.getRawValue().email;
    const password = this.editProfileForm.getRawValue().password;

    this.store.dispatch(UserActions.updateUser({
      user: {
        _id: id,
        name,
        login: email,
        password,
      },
    }));
  }

  public showDeleteUserModal(): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.autoFocus = 'dialog';

    const dialogRef = this.dialog.open(ConfirmModalComponent, dialogConfig);

    dialogRef
      .afterClosed()
      .subscribe((isConfirmed: boolean) => {
        if (isConfirmed) {
          const userId = this.authService.getUserId();

          this.store.dispatch(UserActions.deleteUser({ userId }));
        }
      });
  }
}
