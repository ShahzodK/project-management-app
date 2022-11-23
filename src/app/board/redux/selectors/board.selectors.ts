import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IBoardState } from '../board.model';

export const selectBoardState = createFeatureSelector<IBoardState>('board');

export const selectBoard = createSelector(
  selectBoardState,
  (state) => state.board,
);

export const selectBoardId = createSelector(
  selectBoardState,
  (state) => state.board._id,
);

export const selectColumns = createSelector(
  selectBoardState,
  (state) => state.columns,
);

export const selectTasks = createSelector(
  selectBoardState,
  (state) => state.tasks);
