import { createAction, props } from '@ngrx/store';
import { IBoard } from './../../main/models/board.model';

export const saveBoards = createAction(
  '[BOARD] saveBoards',
  props<{ boards: IBoard[] }>(),
);

export const saveBoard = createAction(
  '[BOARD] saveBoard',
  props<{ board: IBoard }>(),
);
