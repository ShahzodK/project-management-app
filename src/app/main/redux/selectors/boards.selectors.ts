import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IBoardsState } from '../boards.model';

export const selectBoardsState = createFeatureSelector<IBoardsState>('boards');

export const selectBoards = createSelector(
  selectBoardsState,
  (state) => state.boards,
);
