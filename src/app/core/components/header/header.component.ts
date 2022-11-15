import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { BoardService } from '../../../main/services/board.service';

import { selectIsLogged, selectUserName } from 'src/app/redux/selectors';
import { Subscription } from 'rxjs';
import { ELocales } from 'src/app/shared/models';
import { LoginService } from '../../../login/services/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  public localeName = 'languages.en';

  public userName$ = this.store.select(selectUserName);

  public isLogged$ = this.store.select(selectIsLogged);

  public isWelcomePage: boolean | null = null;
  private URLSub!: Subscription;

  constructor(
    private translateService: TranslateService,
    private router: Router,
    private loginService: LoginService,
    private boardService: BoardService,
    private store: Store,
  ) { }

  ngOnInit(): void {
    this.URLSub = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isWelcomePage = event.urlAfterRedirects.includes('welcome');
      }
    },
    );
  }

  ngOnDestroy(): void {
    this.URLSub.unsubscribe();
  }

  public changeLocale(): void {
    const lang = this.translateService.currentLang === ELocales.EN ? ELocales.RU : ELocales.EN;
    this.translateService.use(lang);
    this.localeName = `languages.${lang}`;
  }

  public logout(): void {
    this.loginService.logout();
  }

  public toggleModal(): void {
    this.boardService.IsCreateBoardModalVisible = !this.boardService.IsCreateBoardModalVisible;
  }

}
