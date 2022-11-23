import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IAppState } from '../app.model';

export const selectAppState = createFeatureSelector<IAppState>('app');

export const selectIsLogged = createSelector(
  selectAppState,
  (state) => state.isLogged,
);

export const selectUserName = createSelector(
  selectAppState,
  (state) => state.userName,
);

export const selectUserLogin = createSelector(
  selectAppState,
  (state) => state.login,
);

export const selectUserId = createSelector(
  selectAppState,
  (state) => state.id,
);
