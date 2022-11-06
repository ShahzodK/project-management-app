import { createReducer, on } from '@ngrx/store';

import * as CommonActions from '../actions';

export interface ICommonSliceState {
  isLogged: boolean,
  userName?: string,
}

export const initialState: ICommonSliceState = {
  isLogged: false,
  userName: undefined,
};

export const commonReducer = createReducer(
  initialState,
  on(CommonActions.setLoggedUser, (state, payload): ICommonSliceState => ({
    ...state,
    isLogged: true,
    userName: payload.name,
  })),
  on(CommonActions.resetUser, (state): ICommonSliceState => ({
    ...state,
    isLogged: false,
    userName: undefined,
  })),
);
