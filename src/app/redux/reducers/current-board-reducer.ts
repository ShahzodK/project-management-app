import { createReducer, on } from '@ngrx/store';
import * as currentBoardActions from '../actions/current-board-action';
import { IBoard } from './../../main/models/board.model';

export interface ICurrentBoardSliceState {
  currentBoard: IBoard;
}

export const initialState: ICurrentBoardSliceState = {
  currentBoard: {
    id: '',
    title: '',
    description: '',
    columns: [],
  },
};

export const currentBoardReducer = createReducer(
  initialState,
  on(currentBoardActions.createCurrentBoard, (state, { currentBoard }): ICurrentBoardSliceState => ({
    ...state,
    currentBoard: currentBoard,
  })),
);
