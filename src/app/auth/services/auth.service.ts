import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, switchMap  } from 'rxjs';

@Injectable()
export class AuthService {

  constructor(private http: HttpClient) {}

  public login(login: string, password: string): Observable<Object> {
    return this.http.post('signin', {
      login,
      password,
    });
  }

  public signup(name: string, login: string, password: string): Observable<Object> {
    return this.http.post('signup', {
      name,
      login,
      password,
    }).pipe(
      switchMap(() => this.login(login, password)),
    );
  }

}
