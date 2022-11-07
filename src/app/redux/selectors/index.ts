import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ICommonSliceState } from '../reducers';

export const selectCommonSlice = createFeatureSelector<ICommonSliceState>('common');

export const selectIsLogged = createSelector(
  selectCommonSlice,
  (state) => state.isLogged,
);

export const selectUserName = createSelector(
  selectCommonSlice,
  (state) => state.userName,
);
