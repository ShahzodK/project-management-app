import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { BoardService } from '../../../main/services/board.service';

import { selectIsLogged, selectUserName } from 'src/app/redux/selectors';
import { ELocales } from 'src/app/shared/models';
import { LoginService } from '../../../login/services/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  public localeName = 'languages.en';

  public userName$ = this.store.select(selectUserName);

  public isLogged$ = this.store.select(selectIsLogged);

  constructor(
    private translateService: TranslateService,
    private router: Router,
    private loginService: LoginService,
    private store: Store,
    public boardService: BoardService,
  ) { }

  public changeLocale(): void {
    const lang = this.translateService.currentLang === ELocales.EN ? ELocales.RU : ELocales.EN;
    this.translateService.use(lang);
    this.localeName = `languages.${lang}`;
  }

  public logout(): void {
    this.loginService.logout();
  }

}
