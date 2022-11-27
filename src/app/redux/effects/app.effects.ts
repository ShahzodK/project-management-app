import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of, switchMap } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import * as AppActions from '../actions/app.actions';
import { UserApiService } from '../../user-profile/services/user-api.service';
import { AuthService } from '../../auth/services/auth.service';
import { FullRoutePaths } from '../../core/constants/routes';
import { NotifyService } from '../../shared/services/notify.service';

@Injectable({
  providedIn: 'root',
})

export class AppEffects {

  constructor(
    private actions$: Actions,
    private userApiService: UserApiService,
    private authService: AuthService,
    private notifyService: NotifyService,
  ) {
  }

  public updateUser$ = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(AppActions.updateUser),
        switchMap(({ user }) =>
          this.userApiService
            .updateUser(user),
        ),
        map((updatedUser) => {
          this.notifyService.success();

          return AppActions.updateUserSuccess({ updatedUser });
        },
        ),
        catchError((error) => {
          this.notifyService.error(error);

          return of(
            AppActions.updateUserFailed(),
          );
        },
        ),
      );
  });

  public deleteUser$ = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(AppActions.deleteUser),
        switchMap(({ userId }) =>
          this.userApiService
            .deleteUser(userId),
        ),
        map(() => {
          this.notifyService.success();
          this.authService.logout(FullRoutePaths.WELCOME);

          return AppActions.deleteUserSuccess();
        }),
        catchError((error) => {
          this.notifyService.error(error);

          return of(AppActions.deleteUserFailed());
        }),
      );
  });
}
