import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IBoard } from '../models/board.model';
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

  public createBoard(board: Omit<IBoard, '_id'>): Observable<IBoard> {
    const { title, owner, users } = board;

    return this.http.post<IBoard>('boards', {
      title,
      owner,
      users,
    });
  }

  public updateBoard(boardId: string, board: Omit<IBoard, '_id'>): Observable<IBoard> {
    const { title, users, owner } = board;

    return this.http.put<IBoard>(`boards/${boardId}`, {
      title,
      users,
      owner,
    });
  }

  public deleteBoard(boardId: string): Observable<Object> {
    return this.http.delete(`boards/${boardId}`);
  }
}

