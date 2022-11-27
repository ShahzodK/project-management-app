import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { environment } from 'src/environments/environment';
import { Store } from '@ngrx/store';
import * as AppActions from './redux/actions/app.actions';
import { AuthService } from './auth/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'Teamwork';

  languages: { id: string, title: string }[] = [];

  constructor(
    private translateService: TranslateService,
    private authService: AuthService,
    private store: Store,
  ) {
  }

  ngOnInit(): void {
    this.translateService.setDefaultLang(environment.defaultLocale);
    this.translateService.use(environment.defaultLocale);

    const token = this.authService.getToken();
    if (token) {
      this.store.dispatch(AppActions.fetchUser({ token }));
    }
  }
}
