import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { BoardService } from './../../../main/services/board.service';

import { ELocales } from 'src/app/shared/models';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  localeName = 'languages.en';

  constructor(
    private translateService: TranslateService,
    private router: Router,
    public boardService: BoardService,
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
    this.router.navigate(['login']);
  }

}
