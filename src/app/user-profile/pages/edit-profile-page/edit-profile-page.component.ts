import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { UserApiService } from './../../services/user-api.service';
import { UserService } from 'src/app/shared/services/user.service';
import { selectUserLogin, selectUserName } from 'src/app/redux/selectors';
import * as UserActions from '../../../redux/actions/index';
import { passwordStrengthValidator } from 'src/app/login/validators/password-strength.validator';

@Component({
  selector: 'app-edit-profile-page',
  templateUrl: './edit-profile-page.component.html',
  styleUrls: ['./edit-profile-page.component.scss'],
})
export class EditProfilePageComponent implements OnInit {

  constructor(
    private store: Store,
    private api: UserApiService,
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

  public nameValue: string = '';

  public loginValue: string = '';

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

  public deleteUser(): void {
    this.api.deleteUser(this.userService.getUserId()).subscribe({
      complete: () => {
        this.store.dispatch(UserActions.resetUser());
        this.router.navigateByUrl('home');
      },
    });
  }

  public submit(): void {
    console.log('submitted');
    const id = this.userService.getUserId();
    const name = this.editProfileForm.getRawValue().name;
    const login = this.editProfileForm.getRawValue().login;
    const password = this.editProfileForm.getRawValue().password;
    if (this.editProfileForm.valid) {
      this.api.updateUser(this.userService.getUserId(), name, login, password).subscribe({
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

}
