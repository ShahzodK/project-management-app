import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of, switchMap } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import * as AppActions from '../actions/app.actions';
import { UserApiService } from '../../user-profile/services/user-api.service';
import { AuthService } from '../../auth/services/auth.service';
import { FullRoutePaths } from '../../core/constants/routes';

@Injectable({
  providedIn: 'root',
})

export class AppEffects {

  constructor(
    private actions$: Actions,
    private userApiService: UserApiService,
    private authService: AuthService,
  ) {
  }

  public deleteUser$ = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(AppActions.deleteUser),
        switchMap(({ userId }) =>
          this.userApiService
            .deleteUser(userId),
        ),
        map(() => {
          this.authService.logout(FullRoutePaths.WELCOME);

          return AppActions.deleteUserSuccess();
        }),
        catchError(() => of(AppActions.deleteUserFailed())),
      );
  });
}
