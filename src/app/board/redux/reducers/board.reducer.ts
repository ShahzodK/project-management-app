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
    return {
      ...state,
      // написал так потому что пока что в эффекте в mergeMap fetchTasksScucess диспатчится
      // на каждый запрос. Когда исправлю, перезаписать без рест и спред
      tasks: [...state.tasks, ...tasks],
    };
  }),
);
