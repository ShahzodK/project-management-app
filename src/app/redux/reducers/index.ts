import { createReducer, on } from '@ngrx/store';

import * as CommonActions from '../actions';

export interface ICommonSliceState {
  id: string,
  isLogged: boolean,
  userName: string,
  login: string,
}

export const initialState: ICommonSliceState = {
  id: '',
  isLogged: false,
  userName: '',
  login: '',
};

export const commonReducer = createReducer(
  initialState,
  on(CommonActions.setLoggedUser, (state, payload): ICommonSliceState => ({
    ...state,
    id: payload.id,
    isLogged: true,
    userName: payload.name,
    login: payload.login,
  })),
  on(CommonActions.resetUser, (state): ICommonSliceState => ({
    ...state,
    id: '',
    isLogged: false,
    userName: '',
    login: '',
  })),
);

