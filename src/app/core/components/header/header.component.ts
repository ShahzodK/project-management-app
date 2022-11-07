import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { resetUser } from 'src/app/redux/actions';

import { selectIsLogged, selectUserName } from 'src/app/redux/selectors';
import { ELocales } from 'src/app/shared/models';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  localeName = 'languages.en';

  userName$ = this.store.select(selectUserName);

  isLogged$ = this.store.select(selectIsLogged);

  constructor(
    private translateService: TranslateService,
    private router: Router,
    private store: Store,
  ) { }

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnInit(): void { }

  public changeLocale() {
    const lang = this.translateService.currentLang === ELocales.EN ? ELocales.RU : ELocales.EN;
    this.translateService.use(lang);
    this.localeName = `languages.${lang}`;
  }

  public logout() {
    localStorage.removeItem('authToken');
    this.store.dispatch(resetUser());
    this.router.navigate(['login']);
  }

}
