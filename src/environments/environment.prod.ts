import { ELocales } from '../app/shared/models';

export const environment = {
  production: true,
  locales: Object.keys(ELocales),
  defaultLocale: ELocales.EN,
  baseUrl: 'https://final-task-backend-production-b20b.up.railway.app/',
};
