import { Injectable } from '@angular/core';
import { Actions } from '@ngrx/effects';
import { ofType, createEffect } from '@ngrx/effects';
import { map, mergeMap } from 'rxjs/operators';
import { BoardApiService } from './../../main/services/board-api.service';

@Injectable({
  providedIn: 'root',
})
export class BoardEffects {

  constructor(
    private actions$: Actions,
    private api: BoardApiService,
  ) {}

  public types = ['[BOARD] createBoard', '[BOARD] deleteBoard'];

  public getBoards$ = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(...this.types),
        mergeMap(() => this.api.getBoards()
          .pipe(
            map(boards => ({ type: '[Boards] Boards Loaded Success', boards: boards })),
          ),
        ));
  });

}
