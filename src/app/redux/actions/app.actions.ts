import { createAction, props } from '@ngrx/store';

export const setLoggedUser = createAction(
  '[App] setUser',
  props<{ name: string, id: string, login: string, }>(),
);

export const resetUser = createAction(
  '[App] resetUser',
);
