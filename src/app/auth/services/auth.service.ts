import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable  } from 'rxjs';
import { resetUser } from '../../redux/actions/app.actions';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { ILoginResponse, ISignUpResponse } from '../models/auth.model';
import { FullRoutePaths } from '../../core/constants/routes';
import { AppRoutePaths } from '../../core/enums/routes.enum';
import { IUser } from '../../user-profile/models/user.model';
import jwt_decode from 'jwt-decode';
import { TOKEN } from '../../core/token';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router, private store: Store) {}

  public login(login: string, password: string): Observable<ILoginResponse> {
    return this.http.post<ILoginResponse>('auth/signin', {
      login,
      password,
    }).pipe(
      map((signedInUser) => {
        localStorage.setItem(TOKEN, signedInUser.token);
        this.router.navigate([AppRoutePaths.MAIN]);

        return signedInUser;
      }),
    );
  }

  public signup(name: string, login: string, password: string): Observable<ISignUpResponse> {
    return this.http.post<IUser>('auth/signup', {
      name,
      login,
      password,
    });
  }

  public logout(path = FullRoutePaths.LOGIN): void {
    localStorage.removeItem(TOKEN);
    this.store.dispatch(resetUser());
    this.router.navigate([path]);
  }

  public isLoggedIn(): boolean {
    return !!localStorage.getItem(TOKEN);
  }

  public getToken(): string | null {
    return localStorage.getItem(TOKEN);
  }

  public getUserId(): string {
    const token = this.getToken();

    if (token) {
      return (jwt_decode(token) as unknown as { id: string }).id;
    }

    return '';
  }
}
