import { createAction, props } from '@ngrx/store';
import { IBoard } from '../../../main/models/board.model';

export const fetchBoard = createAction(
  '[Board] Fetch',
  props<{ id: string }>(),
);

export const setBoard = createAction(
  '[Board] Set',
  props<{ board: IBoard }>(),
);
