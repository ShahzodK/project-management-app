import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IUser } from '../models/user.model';

@Injectable()
export class UserApiService {

  constructor(private http: HttpClient) { }

  public updateUser(id: string, name: string, login: string, password: string): Observable<IUser> {
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
