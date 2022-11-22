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
  props<{ title: string, description: string }>(),
);

export const createBoardSuccess = createAction(
  '[Boards] Create Success',
  props<{ createdBoard: IBoard }>(),
);

export const createBoardFailed = createAction('[Boards] Create Failed');

export const deleteBoard = createAction(
  '[Boards] Delete',
  props<{ id: string }>(),
);

export const deleteBoardSuccess = createAction(
  '[Boards] Delete Success',
  props<{ id: string }>(),
);


export const deleteBoardFailed = createAction(
  '[Boards] Delete Failed',
);
