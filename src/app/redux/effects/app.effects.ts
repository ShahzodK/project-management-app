import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of, switchMap } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import * as AppActions from '../actions/app.actions';
import { UserApiService } from '../../user-profile/services/user-api.service';
import { AuthService } from '../../auth/services/auth.service';
import { FullRoutePaths } from '../../core/constants/routes';
import { NotifyService } from '../../shared/services/notify.service';
import jwt_decode from 'jwt-decode';

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

  public loginUser$ = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(AppActions.loginUser, AppActions.signUpUserSuccess),
        switchMap(({ email, password }) =>
          this.authService
            .login(email, password),
        ),
        switchMap(({ token }) => {
          this.notifyService.success();

          return of(
            AppActions.loginUserSuccess({ token }),
            AppActions.fetchUser({ token }),
          );
        },
        ),
        catchError((error) => {
          this.notifyService.error(error);

          return of(
            AppActions.loginUserFailed(),
          );
        },
        ),
      );
  });

  public signUpUser$ = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(AppActions.signUpUser),
        switchMap(({ name, email, password }) =>
          this.authService
            .signup(name, email, password)
            .pipe(
              map(() => ({ email, password })),
            ),
        ),
        map(({ email, password }) =>
          AppActions.signUpUserSuccess({
            email,
            password,
          })),
        catchError((error) => {
          this.notifyService.error(error);

          return of(
            AppActions.signUpUserFailed(),
          );
        },
        ),
      );
  });

  public fetchUser$ = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(AppActions.loginUserSuccess, AppActions.fetchUser),
        switchMap(({ token }) => {
          const id = (jwt_decode(token) as unknown as { id: string }).id;

          return this.userApiService.getUser(id);
        }),
        map((user) => AppActions.fetchUserSuccess({ user })),
        catchError((error) => {
          this.notifyService.error(error);

          return of(
            AppActions.fetchUserFailed(),
          );
        }),
      );
  });

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
