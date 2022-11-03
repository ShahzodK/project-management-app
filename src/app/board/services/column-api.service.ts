import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Column } from '../models/column.model';

@Injectable()
export class ColumnApiService {
  
  constructor(private http: HttpClient) { }

  private BASE_URL = 'https://fathomless-everglades-64985.herokuapp.com';

  private BOARDS_PATH = '/boards';

  private COLUMNS_PATH = '/columns';

  public API_TOKEN = localStorage.getItem('authToken');

  public getColumns(boardId: string) {
    return this.http.get<Column[]>(`${this.BASE_URL}${this.BOARDS_PATH}/${boardId}${this.COLUMNS_PATH}`, {
      headers: {
        'Authorization': `Bearer ${this.API_TOKEN}`,
        'Accept': 'application/json',
      },
    });
  }

  public getColumn(boardId: string, columnId: string) {
    return this.http.get<Column>(`${this.BASE_URL}${this.BOARDS_PATH}/${boardId}${this.COLUMNS_PATH}/${columnId}`, {
      headers: {
        'Authorization': `Bearer ${this.API_TOKEN}`,
        'Accept': 'application/json',
      },
    });
  }

  public createColumn(boardId:string, title: string) {
    return this.http.post<Column>(`${this.BASE_URL}${this.BOARDS_PATH}/${boardId}${this.COLUMNS_PATH}`, {
      title,
    }, {
      headers: {
        'Authorization': `Bearer ${this.API_TOKEN}`,
        'Accept': 'application/json',
      },
    });
  }

  public updateColumn(boardId: string, columnId: string, title: string, order: number) {
    return this.http.put<Column>(`${this.BASE_URL}${this.BOARDS_PATH}/${boardId}${this.COLUMNS_PATH}/${columnId}`, {
      title,
      order,
    }, {
      headers: {
        'Authorization': `Bearer ${this.API_TOKEN}`,
        'Accept': 'application/json',
      },
    });
  }

  public deleteColumn(boardId: string, columnId: string) {
    return this.http.delete(`${this.BASE_URL}${this.BOARDS_PATH}/${boardId}${this.COLUMNS_PATH}/${columnId}`, {
      headers: {
        'Authorization': `Bearer ${this.API_TOKEN}`,
        'Accept': 'application/json',
      },
    });
  }

}
