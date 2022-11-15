import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { UserApiService } from '../../services/user-api.service';
import { UserService } from 'src/app/shared/services/user.service';
import { selectUserLogin, selectUserName } from 'src/app/redux/selectors';
import * as UserActions from '../../../redux/actions/index';
import { passwordStrengthValidator } from 'src/app/login/validators/password-strength.validator';
import { PasswordFieldErrors } from 'src/app/login/models/auth.model';
import { signUpErrorsLocale } from 'src/app/login/models/locale-errors.const';

@Component({
  selector: 'app-edit-profile-page',
  templateUrl: './edit-profile-page.component.html',
  styleUrls: ['./edit-profile-page.component.scss'],
})
export class EditProfilePageComponent implements OnInit {

  public hasPasswordError = false;

  public nameValue = '';

  public loginValue = '';

  public passwordRecommendation = '';

  constructor(
    private store: Store,
    private userApi: UserApiService,
    private userService: UserService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.editProfileForm.valueChanges.subscribe(() => {
      if (this.editProfileForm.valid) {
        this.hasPasswordError = false;
        return;
      }

      this.checkErrors();
    });

    this.store.select(selectUserName).pipe(take(1)).subscribe({
      next: (name) => this.nameValue = name,
    });
    this.store.select(selectUserLogin).pipe(take(1)).subscribe({
      next: (login) => this.loginValue = login,
    });

    this.editProfileForm.get('name')!.setValue(this.nameValue);
    this.editProfileForm.get('login')!.setValue(this.loginValue);
  }

  public editProfileForm = new FormGroup({
    name: new FormControl<string>('', {
      nonNullable:true,
      validators: [
        Validators.required,
        Validators.minLength(3),
      ],
    }),
    login: new FormControl<string>('', {
      nonNullable:true,
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
  });

  private checkHasError(control: AbstractControl): boolean {
    return !!(control.errors && Object.keys(control.errors).length !== 0);
  }

  private checkErrors() {
    const password = this.password;
    if (!password) return;

    this.hasPasswordError = this.checkHasError(password);
  }

  public get password() {
    return this.editProfileForm.get('password');
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


  public deleteUser(): void {
    this.userApi.deleteUser(this.userService.getUserId()).subscribe({
      complete: () => {
        this.store.dispatch(UserActions.resetUser());
        this.router.navigateByUrl('home');
      },
    });
  }

  public submit(): void {
    const id = this.userService.getUserId();
    const name = this.editProfileForm.getRawValue().name;
    const login = this.editProfileForm.getRawValue().login;
    const password = this.editProfileForm.getRawValue().password;
    if (this.editProfileForm.invalid) {
      return;
    }

    this.userApi.updateUser(this.userService.getUserId(), name, login, password).subscribe(() =>{
        const user = {
          name,
          id,
          login,
        };

        this.store.dispatch(UserActions.setLoggedUser(user));
    });

  }

}
