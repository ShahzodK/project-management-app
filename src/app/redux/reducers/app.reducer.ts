import { createReducer, on } from '@ngrx/store';

import * as AppActions from '../actions/app.actions';
import { IAppState } from '../app.model';

export const initialState: IAppState = {
  _id: '',
  isLogged: false,
  userName: '',
  login: '',
  isEditSuccess: false,
};

export const appReducer = createReducer(
  initialState,
  on(AppActions.setLoggedUser, (state, { user }): IAppState => ({
    ...state,
    _id: user._id,
    isLogged: true,
    userName: user.name,
    login: user.login,
  })),
  on(AppActions.resetUser, (state): IAppState => ({
    ...state,
    _id: '',
    isLogged: false,
    userName: '',
    login: '',
  })),
  on(AppActions.updateUserSuccess, (state, {updatedUser}): IAppState => ({
    ...state,
    _id: updatedUser._id,
    userName: updatedUser.name,
    login: updatedUser.login,
  })),
  on(AppActions.setIsEditSuccess, (state, {isSuccess}): IAppState => ({
    ...state,
    isEditSuccess: isSuccess,
  })),
);

