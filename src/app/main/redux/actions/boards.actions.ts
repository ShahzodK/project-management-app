import { createAction, props } from '@ngrx/store';
import { IBoard } from '../../models/board.model';


export const fetchBoards = createAction(
  '[Boards] Fetch',
);

export const fetchBoardsSuccess = createAction(
  '[Boards] Fetch Success',
  props<{ boards: IBoard[] }>(),
);

export const fetchBoardsFailed = createAction('[Boards] Fetch Failed');

export const createBoard = createAction(
  '[Boards] Create',
  props<{ board: IBoard }>(),
);

export const deleteBoard = createAction(
  '[Boards] Delete',
  props<{ id: string }>(),
);
