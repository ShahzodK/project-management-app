import { createReducer, on } from '@ngrx/store';
import { IBoardState } from '../board.model';
import * as BoardActions from '../actions/board.actions';

export const initialState: IBoardState = {
  board: {
    id: '',
    title: '',
    description: '',
    columns: [],
  },
  columns: [],
  tasks: [],
};

export const boardReducer = createReducer(
  initialState,
  on(BoardActions.fetchBoardSuccess, (state, { board }): IBoardState => ({
    ...state,
    board: board,
  })),
  on(BoardActions.fetchColumnsSuccess, (state, { columns }): IBoardState => ({
    ...state,
    columns,
  })),
  on(BoardActions.fetchTasksSuccess, (state, { tasks }): IBoardState => {
    // const newColumns = [...state.columns].map(column => {
    //   if (column.id === columnId) {
    //     column = {
    //       ...column,
    //       tasks
    //     };
    //   }
    //   return column;
    // })
    //
    // return {
    //   ...state,
    //   // board: {
    //   //   ...state.board,
    //   //   columns: newColumns
    //   // }
    //   columns: newColumns
    // }
    console.log(tasks)
    return {
      ...state,
      tasks,
    };
  }),
);
