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
  on(BoardActions.createBoard, (state, { board }): IBoardSliceState => ({
    ...state,
    boards: [...state.boards, board],
  })),
  on(BoardActions.getBoards, (state, { boards }): IBoardSliceState => ({
    ...state,
    boards,
  })),
  on(BoardActions.deleteBoard, (state, { id }): IBoardSliceState => ({
    ...state,
    boards: state.boards.filter(board => board.id !== id ),
  })),
);

