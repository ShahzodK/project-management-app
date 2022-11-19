import { createAction, props } from '@ngrx/store';
import { IBoard } from '../../../main/models/board.model';
import { IColumn } from '../../models/column.model';

export const fetchBoard = createAction(
  '[Board] Fetch',
  props<{ id: string }>(),
);

export const fetchBoardSuccess = createAction(
  '[Board] Fetch Success',
  props<{ board: IBoard }>(),
);

export const fetchBoardFailed = createAction(
  '[Board] Fetch Failed',
);


export const createColumn = createAction(
  '[Board] Create Column',
  props<{ boardId: string, columnTitle: string }>(),
);

export const createColumnSuccess = createAction(
  '[Board] Create Column Success',
  props<{ boardId: string }>(),
);

export const createColumnFailed = createAction(
  '[Board] Create Column Failed',
);

export const fetchColumns = createAction(
  '[Board] Fetch Columns',
  props<{ boardId: string }>(),
);

export const fetchColumnsSuccess = createAction(
  '[Board] Fetch Columns Success',
  props<{ columns: IColumn[] }>(),
);

export const fetchColumnsFailed = createAction(
  '[Board] Fetch Columns Failed',
);
