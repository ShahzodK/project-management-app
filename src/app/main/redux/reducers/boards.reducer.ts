import { createReducer, on } from '@ngrx/store';
import { IBoardsState } from '../boards.model';
import * as BoardsActions from '../actions/boards.actions';

export const initialState: IBoardsState = {
  boards: [],
};

export const boardsReducer = createReducer(
  initialState,
  on(BoardsActions.fetchBoardsSuccess, (state, { boards }): IBoardsState => ({
    ...state,
    boards,
  })),
  on(BoardsActions.createBoardSuccess, (state, { createdBoard }): IBoardsState => ({
    ...state,
    boards: [...state.boards, createdBoard],
  })),
  on(BoardsActions.deleteBoardSuccess, (state, { id }): IBoardsState => {
    const newBoards = [...state.boards].filter(board => board.id !== id);

    return {
      ...state,
      boards: newBoards,
    };
  }),
);

