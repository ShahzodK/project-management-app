import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { catchError, map } from 'rxjs/operators';
import * as BoardActions from '../actions/board.actions';
import { BoardApiService } from 'src/app/main/services/board-api.service';
import { of, switchMap } from 'rxjs';
import { ColumnApiService } from '../../services/column-api.service';
import { Store } from '@ngrx/store';
import { selectBoardId } from '../selectors/board.selectors';

@Injectable({
  providedIn: 'root',
})

export class BoardEffects {

  constructor(
    private actions$: Actions,
    private boardApiService: BoardApiService,
    private columnApiService: ColumnApiService,
    private store: Store,
  ) {
  }

  public fetchBoard$ = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(BoardActions.fetchBoard),
        switchMap(({ id }) => this.boardApiService.getBoard(id)),
        map(board => BoardActions.fetchBoardSuccess({ board })),
        catchError(() => of(BoardActions.fetchBoardFailed())),
      );
  });

  public createColumn$ = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(BoardActions.createColumn),
        switchMap(({ boardId, columnTitle }) =>
          this.columnApiService.createColumn(boardId, columnTitle)),
        concatLatestFrom(() => this.store.select(selectBoardId)),
        switchMap(([, boardId]) =>
          of(
            BoardActions.createColumnSuccess({ boardId }),
            BoardActions.fetchColumns({ boardId }),
          ),
        ),
        catchError(() => of(BoardActions.createColumnFailed())),
      );
  });

  public fetchColumns$ = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(BoardActions.fetchColumns, BoardActions.createColumnSuccess),
        switchMap(({ boardId }) =>
          this.columnApiService.getColumns(boardId)),
        map(columns => BoardActions.fetchColumnsSuccess({ columns })),
        catchError(() => of(BoardActions.fetchColumnsFailed())),
      );
  });
}
