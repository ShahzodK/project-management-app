import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Board } from './../models/board.model';

@Injectable()
export class BoardApiService {

  constructor(private http: HttpClient) { }

  private BASE_URL = 'https://fathomless-everglades-64985.herokuapp.com';

  private BOARDS_PATH = '/boards';

  public API_TOKEN = localStorage.getItem('authToken');

  public getBoards() {
    return this.http.get<Board[]>(`${this.BASE_URL}${this.BOARDS_PATH}`, {
      headers: {
        'Authorization': `Bearer ${this.API_TOKEN}`,
        'Accept': 'application/json',
      },
    });
  }

  public getBoard(id: string) {
    return this.http.get<Board>(`${this.BASE_URL}${this.BOARDS_PATH}/${id}`, {
      headers: {
        'Authorization': `Bearer ${this.API_TOKEN}`,
        'Accept': 'application/json',
      },
    });
  }

  public createBoard(title: string, description: string) {
    return this.http.post<Board>(`${this.BASE_URL}${this.BOARDS_PATH}`, {
      title: title,
      description:description,
    }, {
      headers: {
        'Authorization': `Bearer ${this.API_TOKEN}`,
        'Accept': 'application/json',
      },
    });
  }

  public updateBoard(id: string, title: string, description: string) {
    return this.http.put<Board>(`${this.BASE_URL}${this.BOARDS_PATH}/${id}`, {
      title: title,
      description:description,
    }, {
      headers: {
        'Authorization': `Bearer ${this.API_TOKEN}`,
        'Accept': 'application/json',
      },
    });
  }

  public deleteBoard(id: string) {
    return this.http.delete(`${this.BASE_URL}${this.BOARDS_PATH}/${id}`, {
      headers: {
        'Authorization': `Bearer ${this.API_TOKEN}`,
        'Accept': 'application/json',
      },
    });
  }
}

