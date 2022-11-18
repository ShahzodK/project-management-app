import { Injectable } from '@angular/core';
import { Actions } from '@ngrx/effects';
import { ofType, createEffect } from '@ngrx/effects';
import { map, mergeMap } from 'rxjs/operators';
import * as currentBoardActions from '../actions/current-board-action';
import { BoardApiService } from 'src/app/main/services/board-api.service';

@Injectable({
  providedIn: 'root',
})

export class CurrentBoardEffects {

  constructor(
    private actions$: Actions,
    private boardApi: BoardApiService,
  ) {}

  public getCurrentBoard$ = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(currentBoardActions.getCurrentBoardId),
        mergeMap((action: { id: string, type: string }) => {
          console.log(action);
          return this.boardApi.getBoard(action.id).pipe(
            map(board => {
              console.log(board);
              return currentBoardActions.createCurrentBoard({ currentBoard: board });
            }),
          );
        },
        ),
      );
  });
}
