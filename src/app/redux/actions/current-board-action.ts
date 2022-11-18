import { createAction, props } from '@ngrx/store';
import { IBoard } from './../../main/models/board.model';

export const createCurrentBoard = createAction(
  '[CURRENT BOARD] createCurrentBoard',
  props<{ currentBoard: IBoard }>(),
);

export const getCurrentBoardId = createAction(
  '[CURRENT BOARD] getCurrentBoardId',
  props<{ id: string }>(),
);
