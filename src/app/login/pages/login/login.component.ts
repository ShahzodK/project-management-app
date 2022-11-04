import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

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
      },
      error: () => {
        // @todo handle error !!!
        this.router.navigate(['404']);
      },
    });
  }
}
