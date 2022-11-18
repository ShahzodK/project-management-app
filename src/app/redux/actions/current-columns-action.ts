import { createAction, props } from '@ngrx/store';
import { IColumn } from './../../board/models/column.model';


export const getCurrentBoardId = createAction(
  '[CURRENT COLUMN] getCurrentBoardId',
  props<{ id: string }>(),
);

export const createColumn = createAction(
  '[CURRENT COLUMN] createColumn',
  props<{ column: IColumn }>(),
);

export const createColumns = createAction(
  '[CURRENT COLUMN] createColumns',
  props<{ currentColumns: IColumn[] }>(),
);