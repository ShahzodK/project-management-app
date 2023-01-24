import { ELocales } from '../app/shared/enums/locales.enum';

export const environment = {
  production: true,
  locales: Object.keys(ELocales),
  defaultLocale: ELocales.EN,
  baseUrl: 'https://teamwork.herokuapp.com/',
};
