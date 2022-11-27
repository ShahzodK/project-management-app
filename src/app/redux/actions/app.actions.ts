import { createAction, props } from '@ngrx/store';
import { IUser } from '../../user-profile/models/user.model';

export const loginUser = createAction(
  '[App] Login User',
  props<{ email: string; password: string; }>(),
);

export const loginUserSuccess = createAction(
  '[App] Login User Success',
  props<{ token: string }>(),
);

export const loginUserFailed = createAction(
  '[App] Login User Failed',
);

export const signUpUser = createAction(
  '[App] Sign Up User',
  props<{ name: string, email: string; password: string; }>(),
);

export const signUpUserSuccess = createAction(
  '[App] Sign Up User Success',
  props<{ email: string; password: string; }>(),
);

export const signUpUserFailed = createAction(
  '[App] Login User Failed',
);

export const fetchUser = createAction(
  '[App] Fetch User',
  props<{ token: string }>(),
);

export const fetchUserSuccess = createAction(
  '[App] Fetch User Success',
  props<{ user: IUser }>(),
);

export const fetchUserFailed = createAction(
  '[App] Fetch User Failed',
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

export const updateUser = createAction(
  '[App] Update User',
  props<{ user: IUser }>(),
);

export const updateUserSuccess = createAction(
  '[App] Update User Success',
  props<{ updatedUser: IUser }>(),
);

export const updateUserFailed = createAction(
  '[App] Update User Failed',
);


export const resetUser = createAction(
  '[App] Reset User',
);
