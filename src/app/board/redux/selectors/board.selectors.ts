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

export const selectTasks = (columnId: string) => createSelector(
  selectColumns,
  (columns) => {
    const currentColumn = columns.find(column => column.id === columnId);
    if (!currentColumn) return;

    console.log(currentColumn.tasks);

    return currentColumn.tasks;
  },
);

// export const selectTasks = createSelector(
//   selectBoardState,
//   (state) => {
//     return state.tasks;
//   }
// )
