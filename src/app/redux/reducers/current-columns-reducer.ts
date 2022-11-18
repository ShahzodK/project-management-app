import { createReducer, on } from '@ngrx/store'; 
import * as CurrentColumnsActions from '../actions/current-columns-action';
import { IColumn } from 'src/app/board/models/column.model';

export interface ICurrentColumnsSliceState {
  currentColumns: IColumn[];
}

export const initialState: ICurrentColumnsSliceState = {
  currentColumns: [],
};

export const currentColumnsReducer = createReducer(
  initialState,
  on(CurrentColumnsActions.createColumns, (state, { currentColumns }): ICurrentColumnsSliceState => ({
    ...state,
    currentColumns,
  })),
  on(CurrentColumnsActions.createColumn, (state, { column }): ICurrentColumnsSliceState => ({
    ...state,
    currentColumns: [...state.currentColumns, column],
  })),
);