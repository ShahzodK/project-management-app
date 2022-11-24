import { createAction, props } from '@ngrx/store';
import { IUser } from '../../user-profile/models/user.model';

export const setLoggedUser = createAction(
  '[App] setUser',
  props<{ user: IUser }>(),
);

export const resetUser = createAction(
  '[App] resetUser',
);
