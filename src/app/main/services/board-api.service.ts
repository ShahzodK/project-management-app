import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IBoard } from './../models/board.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn:'root',
})
export class BoardApiService {

  constructor(private http: HttpClient) { }

  public getBoards(): Observable<IBoard[]> {
    return this.http.get<IBoard[]>('boards');
  }

  public getBoard(boardId: string): Observable<IBoard> {
    return this.http.get<IBoard>(`boards/${boardId}`);
  }

  public createBoard(title: string, description: string): Observable<IBoard> {
    return this.http.post<IBoard>('boards', {
      title: title,
      description:description,
    });
  }

  public updateBoard(boardId: string, title: string, description: string): Observable<IBoard> {
    return this.http.put<IBoard>(`boards/${boardId}`, {
      title: title,
      description:description,
    });
  }

  public deleteBoard(boardId: string): Observable<Object> {
    return this.http.delete(`boards/${boardId}`);
  }
}

