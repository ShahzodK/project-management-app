import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

import { UserService } from 'src/app/shared/services/user.service';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  public isSignupError?: boolean;

  public errMessage = '';

  signupForm = new FormGroup({
    nameInput: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    loginInput: new FormControl<string>('', [
      Validators.required,
      Validators.email,
    ]),
    passwordInput: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(8),
      Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/),
    ]),
  });

  constructor(
    private loginService: LoginService,
    private userService: UserService,
    private router: Router,
    public translateService: TranslateService,
  ) { }

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnInit(): void {
  }

  public signup() {
    if (this.nameInput?.value && this.loginInput?.value && this.passwordInput?.value) {
      this.loginService.signup(
        this.nameInput.value,
        this.loginInput.value,
        this.passwordInput.value,
      ).subscribe({
        next: (res) => {
          this.isSignupError = false;
          this.signupForm.reset();
          localStorage.setItem('authToken', (res as { token: string }).token);
          this.router.navigate(['']);
        },
        error: (res: HttpErrorResponse) => {
          this.isSignupError = true;
          this.errMessage = `common.login-module.errors.${res.status}`;
        },
        complete: () => {
          this.userService.check();
        },
      });
    }
  }

  public get nameInput() {
    return this.signupForm.get('nameInput');
  }

  public get loginInput() {
    return this.signupForm.get('loginInput');
  }

  public get passwordInput() {
    return this.signupForm.get('passwordInput');
  }

}
