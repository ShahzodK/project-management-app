import { ELocales } from '../app/shared/models';

export const environment = {
  production: true,
  locales: Object.keys(ELocales),
  defaultLocale: ELocales.EN,
  baseUrl: 'https://project-management-shahzodk.herokuapp.com/',
};
