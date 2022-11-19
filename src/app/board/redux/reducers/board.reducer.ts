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
};

export const boardReducer = createReducer(
  initialState,
  on(BoardActions.setBoard, (state, { board }): IBoardState => ({
    ...state,
    board: board,
  })),
);
