import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, switchMap  } from 'rxjs';
import { resetUser } from '../../redux/actions';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { SignInResponse, SignUpResponse } from '../models/auth-api.model';


@Injectable({
  providedIn: 'root',
})
export class LoginService {

  constructor(private http: HttpClient, private router: Router, private store: Store) {}

  public login(login: string, password: string): Observable<SignInResponse> {
    return this.http.post<SignInResponse>('signin', {
      login,
      password,
    }).pipe(
      map((signedInUser) => {
        localStorage.setItem('authToken', signedInUser.token);
        this.router.navigate(['']);

        return signedInUser;
      }),
    );
  }

  public signup(name: string, login: string, password: string): Observable<SignInResponse> {
    return this.http.post<SignUpResponse>('signup', {
      name,
      login,
      password,
    }).pipe(
      switchMap(() => this.login(login, password)),
    );
  }

  public logout() {
    localStorage.removeItem('authToken');
    this.store.dispatch(resetUser());
    this.router.navigate(['login']);
  }
}
