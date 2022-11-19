import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, switchMap  } from 'rxjs';
import { resetUser } from '../../redux/actions/app.actions';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { ILoginResponse, ISignUpResponse } from '../models/auth.model';
import { FullRoutePaths } from '../../core/constants/routes';
import { AppRoutePaths } from '../../core/enums/routes.enum';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router, private store: Store) {}

  public login(login: string, password: string): Observable<ILoginResponse> {
    return this.http.post<ILoginResponse>('signin', {
      login,
      password,
    }).pipe(
      map((signedInUser) => {
        localStorage.setItem('authToken', signedInUser.token);
        this.router.navigate([AppRoutePaths.MAIN]);

        return signedInUser;
      }),
    );
  }

  public signup(name: string, login: string, password: string): Observable<ILoginResponse> {
    return this.http.post<ISignUpResponse>('signup', {
      name,
      login,
      password,
    }).pipe(
      switchMap(() => this.login(login, password)),
    );
  }

  public logout(): void {
    localStorage.removeItem('authToken');
    this.store.dispatch(resetUser());
    this.router.navigate([FullRoutePaths.LOGIN]);
  }

  public isLoggedIn(): boolean {
    return !!localStorage.getItem('authToken');
  }
}
