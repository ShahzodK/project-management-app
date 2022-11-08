import { createAction, props } from '@ngrx/store';
import { IBoard } from './../../main/models/board.model';

export const getBoards = createAction(
  '[BOARD] getBoards',
  props<{ boards: IBoard[] }>(),
);

export const createBoard = createAction(
  '[BOARD] createBoard',
  props<{ board: IBoard }>(),
);

export const deleteBoard = createAction(
  '[BOARD] deleteBoard',
  props<{ id: string }>(),
);
