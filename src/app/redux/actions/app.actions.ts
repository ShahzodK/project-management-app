import { createAction, props } from '@ngrx/store';
import { IUser } from '../../user-profile/models/user.model';

export const setLoggedUser = createAction(
  '[App] Set User',
  props<{ user: IUser }>(),
);

export const resetUser = createAction(
  '[App] Reset User',
);

export const deleteUser = createAction(
  '[App] Delete User',
  props<{ userId: string }>(),
);

export const deleteUserSuccess = createAction(
  '[App] Delete User Success',
);

export const deleteUserFailed = createAction(
  '[App] Delete User Failed',
);
