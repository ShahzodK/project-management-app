import { createReducer, on } from '@ngrx/store';

import * as AppActions from '../actions/app.actions';
import { IAppState } from '../app.model';

export const initialState: IAppState = {
  id: '',
  isLogged: false,
  userName: '',
  login: '',
};

export const appReducer = createReducer(
  initialState,
  on(AppActions.setLoggedUser, (state, payload): IAppState => ({
    ...state,
    id: payload.id,
    isLogged: true,
    userName: payload.name,
    login: payload.login,
  })),
  on(AppActions.resetUser, (state): IAppState => ({
    ...state,
    id: '',
    isLogged: false,
    userName: '',
    login: '',
  })),
);

