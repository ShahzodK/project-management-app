import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map } from 'rxjs/operators';
import * as BoardActions from '../actions/board.actions';
import { BoardApiService } from 'src/app/main/services/board-api.service';
import { switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class BoardEffects {

  constructor(
    private actions$: Actions,
    private boardApiService: BoardApiService,
  ) {
  }

  public fetchBoard$ = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(BoardActions.fetchBoard),
        switchMap(({ id }) => this.boardApiService.getBoard(id)),
        map(board => BoardActions.setBoard({ board })),
      );
  });
}
