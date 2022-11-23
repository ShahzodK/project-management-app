import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import jwt_decode from 'jwt-decode';
import { Store } from '@ngrx/store';
import { resetUser, setLoggedUser } from 'src/app/redux/actions/app.actions';
import { IUser } from '../../user-profile/models/user.model';

@Injectable()
export class UserService {

  constructor(private http: HttpClient, private store: Store) {}

  public getUserId(): string {
    const token = localStorage.getItem('authToken');

    if (token) {
      return (jwt_decode(token) as unknown as { id: string }).id;
    }

    return '';
  }

  public check(): void {
    const id = this.getUserId();
    if (id.length === 0) {
      this.store.dispatch(resetUser());
      return;
    }

    this.http.get<IUser>(`users/${id}`).subscribe({
      next: (user) => {
        this.store.dispatch(setLoggedUser({
          user: {
            _id: user._id,
            name: user.name,
            login: user.login,
          },
        }));
      },
      error: () => {
        this.store.dispatch(resetUser());
      },
    });
  }

}
