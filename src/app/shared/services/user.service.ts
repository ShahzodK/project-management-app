import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import jwt_decode from 'jwt-decode';
import { Store } from '@ngrx/store';
import { resetUser, setLoggedUser } from 'src/app/redux/actions';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  constructor(private http: HttpClient, private store: Store) {}

  public getUserId(): string {
    const token = localStorage.getItem('authToken');

    if (token) {
      return (jwt_decode(token) as unknown as { userId: string }).userId;
    }

    return '';
  }

  public check(): void {
    const id = this.getUserId();
    if (id.length === 0) {
      this.store.dispatch(resetUser());
    }

    this.http.get(`users/${id}`).subscribe({
      next: (res) => {
        this.store.dispatch(setLoggedUser({
          id: (res as { id: string }).id,
          name: (res as { name: string }).name,
          login: (res as { login: string }).login,
        }));
      },
      error: () => {
        this.store.dispatch(resetUser());
      },
    });
  }

}
