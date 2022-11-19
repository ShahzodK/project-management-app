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
        ofType(BoardsActions.fetchBoards, BoardsActions.createBoard, BoardsActions.deleteBoard),
        switchMap(() => this.boardApiService.getBoards()),
        map((boards) => BoardsActions.fetchBoardsSuccess({ boards })),
        catchError(() => of(BoardsActions.fetchBoardsFailed())),
      );
  });

}
