import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ELocales } from 'src/app/shared/models';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  localeName = 'languages.en';

  constructor(private translateService: TranslateService) { }

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnInit(): void { }

  changeLocale() {
    const lang = this.translateService.currentLang === ELocales.EN ? ELocales.RU : ELocales.EN;
    this.translateService.use(lang);
    this.localeName = `languages.${lang}`;
  }
}
