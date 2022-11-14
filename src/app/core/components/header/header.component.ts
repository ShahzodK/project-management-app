import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { BoardService } from '../../../main/services/board.service';
import { resetUser } from 'src/app/redux/actions';

import { selectIsLogged, selectUserName } from 'src/app/redux/selectors';
import { ELocales } from 'src/app/shared/models';
import { ELocaleTranslations } from 'src/app/shared/consts/locale';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  userName$ = this.store.select(selectUserName);

  isLogged$ = this.store.select(selectIsLogged);

  public locales = this.getLocaleTranslations();

  public selectedLocale: string | undefined;

  constructor(
    private translateService: TranslateService,
    private router: Router,
    private boardService: BoardService,
    private store: Store,
  ) {
  }

  ngOnInit() {
    this.selectedLocale = this.getCurrentLocale();
  }

  public getLocaleTranslations(): string[] {
    return (Object.keys(ELocaleTranslations) as (keyof typeof ELocaleTranslations)[])
      .map(key => ELocaleTranslations[key]);
  }

  public changeLocale(event: MatSelectChange) {
    const selectedLocale = event.value;

    let newLocale;
    switch (true) {
      case selectedLocale === ELocaleTranslations.ELocaleEN:
        newLocale = ELocales.EN;
        break;
      case selectedLocale === ELocaleTranslations.ELocaleRU:
        newLocale = ELocales.RU;
        break;
      case selectedLocale === ELocaleTranslations.ELocaleUZ:
        newLocale = ELocales.UZ;
        break;
      default:
        newLocale = ELocales.EN;
    }

    this.translateService.use(newLocale);
  }

  public logout() {
    localStorage.removeItem('authToken');
    this.store.dispatch(resetUser());
    this.router.navigate(['login']);
  }

  public toggleModal(): void {
    this.boardService.IsCreateBoardModalVisible = !this.boardService.IsCreateBoardModalVisible;
  }

  private getCurrentLocale(): string {
    const currentLang = this.translateService.currentLang as ELocales;

    let currentLocale;
    switch (true) {
      case currentLang === ELocales.EN:
        currentLocale = ELocaleTranslations.ELocaleEN;
        break;
      case currentLang === ELocales.UZ:
        currentLocale = ELocaleTranslations.ELocaleUZ;
        break;
      case currentLang === ELocales.RU:
        currentLocale = ELocaleTranslations.ELocaleRU;
        break;
      default:
        currentLocale = ELocaleTranslations.ELocaleEN;
        break;
    }

    return currentLocale;
  }
}
