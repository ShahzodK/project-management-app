import { createAction, props } from '@ngrx/store';

export const setLoggedUser = createAction(
  '[COMMON] setUser',
  props<{ name: string, id: string, login: string, }>(),
);

export const resetUser = createAction(
  '[COMMON] resetUser',
);
