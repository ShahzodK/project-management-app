import { Injectable } from '@angular/core';
import { Actions } from '@ngrx/effects';
import { ofType, createEffect } from '@ngrx/effects';
import { catchError, map } from 'rxjs/operators';
import { BoardApiService } from '../../services/board-api.service';
import * as BoardsActions from '../actions/boards.actions';
import { of, switchMap } from 'rxjs';

@Injectable()
export class BoardsEffects {

  constructor(
    private actions$: Actions,
    private boardApiService: BoardApiService,
  ) {}

  public fetchBoards$ = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(BoardsActions.fetchBoards),
        switchMap(() => this.boardApiService.getBoards()),
        map((boards) => BoardsActions.fetchBoardsSuccess({ boards })),
        catchError(() => of(BoardsActions.fetchBoardsFailed())),
      );
  });

  public createBoard$ = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(BoardsActions.createBoard),
        switchMap(({ title, owner, users }) =>
          this.boardApiService.createBoard({ title, owner, users })),
        map((createdBoard) => BoardsActions.createBoardSuccess({ createdBoard })),
        catchError(() => of(BoardsActions.createBoardFailed())),
      );
  });

  public deleteBoard$ = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(BoardsActions.deleteBoard),
        switchMap(({ id }) =>
          this.boardApiService.deleteBoard(id)
            .pipe(
              map(() => ({ id })),
            ),
        ),
        map(({ id }) => BoardsActions.deleteBoardSuccess({ id })),
        catchError(() => of(BoardsActions.deleteBoardFailed())),
      );
  });

}
