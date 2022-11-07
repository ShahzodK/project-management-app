import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

import { UserService } from 'src/app/shared/services/user.service';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public isLoginError?: boolean;

  public errMessage = '';

  loginForm = new FormGroup({
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

  public login(): void {
    if (this.loginInput?.value && this.passwordInput?.value) {
      this.loginService.login(
        this.loginInput.value,
        this.passwordInput.value,
      ).subscribe({
        next: (res) => {
          this.isLoginError = false;
          this.loginForm.reset();
          localStorage.setItem('authToken', (res as { token: string }).token);
          this.router.navigate(['']);
        },
        error: (res: HttpErrorResponse) => {
          this.isLoginError = true;
          this.errMessage = `common.login-module.errors.${res.status}`;
        },
        complete: () => {
          this.userService.check();
        },
      });
    }
  }


  public submit(): void {
    if (this.loginForm.valid) {
      this.login();

      this.loginForm.setValue({
        loginInput: '',
        passwordInput: '',
      });
    }
  }

  public get loginInput() {
    return this.loginForm.get('loginInput');
  }

  public get passwordInput() {
    return this.loginForm.get('passwordInput');
  }
}
