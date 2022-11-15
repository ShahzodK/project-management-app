import { Component, OnInit } from '@angular/core';
import { ELocales } from '../../../shared/models';
import { ELocaleTranslations } from '../../../shared/consts/locale';
import { TranslateService } from '@ngx-translate/core';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-locale-toggler',
  templateUrl: './locale-toggler.component.html',
  styleUrls: ['./locale-toggler.component.scss'],
})
export class LocaleTogglerComponent implements OnInit {
  public selectedLocale!: string;

  public locales: string[] = this.getLocaleTranslations();

  constructor(private translateService: TranslateService) { }

  ngOnInit(): void {
    this.selectedLocale = this.getCurrentLocale();
  }

  public getLocaleTranslations(): string[] {
    return (Object.keys(ELocaleTranslations) as (keyof typeof ELocaleTranslations)[])
      .map(key => ELocaleTranslations[key]);
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
}
