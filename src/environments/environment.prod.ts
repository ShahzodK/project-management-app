import { ELocales } from 'src/app/shared/models';

export const environment = {
  production: true,
  locales: Object.keys(ELocales),
  defaultLocale: ELocales.EN,
};
