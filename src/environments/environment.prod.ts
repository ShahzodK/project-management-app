import { ELocales } from '../app/shared/models';

export const environment = {
  production: true,
  locales: Object.keys(ELocales),
  defaultLocale: ELocales.EN,
  baseUrl: 'https://shocking-monster-70192.herokuapp.com/',
};
