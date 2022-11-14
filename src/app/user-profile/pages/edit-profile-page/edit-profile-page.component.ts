import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { UserApiService } from './../../services/user-api.service';
import { UserService } from 'src/app/shared/services/user.service';
import { selectUserLogin, selectUserName } from 'src/app/redux/selectors';
import * as UserActions from '../../../redux/actions/index';

@Component({
  selector: 'app-edit-profile-page',
  templateUrl: './edit-profile-page.component.html',
  styleUrls: ['./edit-profile-page.component.scss'],
})
export class EditProfilePageComponent implements OnInit {

  constructor(
    private store: Store,
    private userApi: UserApiService,
    private userService: UserService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.store.select(selectUserName).pipe(take(1)).subscribe({
      next: (name) => this.nameValue = name,
    });
    this.store.select(selectUserLogin).pipe(take(1)).subscribe({
      next: (login) => this.loginValue = login,
    });

    this.editProfileForm.get('name')!.setValue(this.nameValue);
    this.editProfileForm.get('login')!.setValue(this.loginValue);
  }

  public nameValue = '';

  public loginValue = '';

  public passwordRecommendation = '';

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
        this.UserPasswordStrengthValidator(),
      ],
    }),
  });

  public UserPasswordStrengthValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const passwordValue: string = control.value;
      const pattern = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[$&+,:;=?@#|'<>.^*()%!-]).{8,}$/;
      const specialChars = /[$&+,:;=?@#|'<>.^*()%!-]/;
      const upperCaseChar = /[A-Z]/;
      const lowerCaseChar = /[a-z]/;
      const number = /[0-9]/;
      if (pattern.test(passwordValue)) {
        this.passwordRecommendation = '';
        return null;
      }
      if (passwordValue.length === 0) {
        this.passwordRecommendation = 'login-module.form-errors.password.required';
        return { value: control.value };
      }
      if (passwordValue.length < 8 && passwordValue.length !== 0) {
        this.passwordRecommendation = 'login-module.form-errors.password.enough_chars';
        return { value: control.value };
      }

      switch (false) {
        case lowerCaseChar.test(passwordValue):
          this.passwordRecommendation = 'login-module.form-errors.password.lowercase';
          break;
        case upperCaseChar.test(passwordValue):
          this.passwordRecommendation = 'login-module.form-errors.password.uppercase';
          break;
        case number.test(passwordValue):
          this.passwordRecommendation = 'login-module.form-errors.password.numeric';
          break;
        case specialChars.test(passwordValue):
          this.passwordRecommendation = 'login-module.form-errors.password.specials';
          break;
        default:
          this.passwordRecommendation = '';
          return null;
          break;
      }
      return { value: control.value };
    };
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

    this.userApi.updateUser(this.userService.getUserId(), name, login, password).subscribe({
      next: () => {
        const user = {
          name,
          id,
          login,
        };
        this.store.dispatch(UserActions.setLoggedUser(user));
        this.router.navigateByUrl('main');
      },
    });

  }

}
