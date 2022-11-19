import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IBoardState } from '../board.model';

export const selectBoardSlice = createFeatureSelector<IBoardState>('board');

export const selectBoard = createSelector(
  selectBoardSlice,
  (state) => state.board,
);

export const selectColumns = createSelector(
  selectBoardSlice,
  (state) => state.board.columns,
);

// export const selectBoards = createSelector(
//   selectTasksSlice,
//   (state) => state.board.columns[0].
// )
