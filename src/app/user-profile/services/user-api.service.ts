import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IUser } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserApiService {

  constructor(private http: HttpClient) { }

  public updateUser(user: IUser): Observable<IUser> {
    const {_id: id, name, login, password} = user;

    return this.http.put<IUser>(`users/${id}`, {
      name,
      login,
      password,
    });
  }

  public deleteUser(id: string): Observable<Object> {
    return this.http.delete(`users/${id}`);
  }

}
