import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject } from 'rxjs';

import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  sbj?: BehaviorSubject<string>;

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
    private router: Router,
    public translateService: TranslateService,
  ) { }

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnInit(): void {
  }

  public login(): void {
    // @todo replace arguments !!!!
    this.loginService.login('user001', 'userpass@123').subscribe({
      next: (res) => {
        localStorage.setItem('authToken', (res as { token: string }).token);
        this.router.navigate(['']);
      },
      error: () => {
        // @todo handle error !!!
        this.router.navigate(['404']);
      },
    });
  }


  public submit(): void {
    if (this.loginForm.value.loginInput && this.sbj) {
      this.sbj.next(this.loginForm.value.loginInput);
      this.loginForm.setValue({
        loginInput: '',
        passwordInput: '',
      });

      this.login();
    }
  }

  public get loginInput() {
    return this.loginForm.get('loginInput');
  }

  public get passwordInput() {
    return this.loginForm.get('passwordInput');
  }
}
