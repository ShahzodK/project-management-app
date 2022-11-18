import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ICurrentBoardSliceState } from './../reducers/current-board-reducer';

export const selectBoardSlice = createFeatureSelector<ICurrentBoardSliceState>('currentBoard');


export const selectBoard = createSelector(
  selectBoardSlice,
  (state) => state.currentBoard,
);

export const selectColumns = createSelector(
  selectBoardSlice,
  (state) => state.currentBoard.columns,
);

// export const selectBoards = createSelector(
//   selectTasksSlice, 
//   (state) => state.currentBoard.columns[0].
// )
