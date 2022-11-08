import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IBoardSliceState } from './../reducers/boards-reducer';

export const selectBoardsSlice = createFeatureSelector<IBoardSliceState>('boards');

export const selectBoards = createSelector(
  selectBoardsSlice,
  (state) => state,
);
