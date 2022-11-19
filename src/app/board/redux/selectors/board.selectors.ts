import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IBoardState } from '../board.model';

export const selectBoardState = createFeatureSelector<IBoardState>('board');

export const selectBoard = createSelector(
  selectBoardState,
  (state) => state.board,
);

export const selectColumns = createSelector(
  selectBoardState,
  (state) => state.board.columns,
);

export const selectBoardId = createSelector(
  selectBoardState,
  (state) => state.board.id,
);

// export const selectBoards = createSelector(
//   selectTasksSlice,
//   (state) => state.board.columns[0].
// )
