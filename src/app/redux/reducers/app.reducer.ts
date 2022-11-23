import { createReducer, on } from '@ngrx/store';

import * as AppActions from '../actions/app.actions';
import { IAppState } from '../app.model';

export const initialState: IAppState = {
  _id: '',
  isLogged: false,
  userName: '',
  login: '',
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
);

