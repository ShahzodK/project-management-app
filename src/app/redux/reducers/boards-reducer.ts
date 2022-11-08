import { createReducer, on } from '@ngrx/store';
import * as BoardActions from '../actions/board-action';
import { IBoard } from './../../main/models/board.model';

export interface IBoardSliceState {
  boards: IBoard[];
}

export const initialState: IBoardSliceState = {
  boards: [],
};

export const boardReducer = createReducer(
  initialState,
  on(BoardActions.saveBoard, (state, { board }): IBoardSliceState => ({
    ...state,
    boards: [...state.boards, board],
  })),
  on(BoardActions.saveBoards, (state, { boards }): IBoardSliceState => ({
    ...state,
    boards,
  })),
);

