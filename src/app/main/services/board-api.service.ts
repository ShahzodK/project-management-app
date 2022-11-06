import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IBoard } from './../models/board.model';

@Injectable({
  providedIn:'root',
})
export class BoardApiService {

  constructor(private http: HttpClient) { }

  public getBoards() {
    return this.http.get<IBoard[]>('boards');
  }

  public getBoard(boardId: string) {
    return this.http.get<IBoard>(`boards/${boardId}`);
  }

  public createBoard(title: string, description: string) {
    return this.http.post<IBoard>('boards', {
      title: title,
      description:description,
    });
  }

  public updateBoard(boardId: string, title: string, description: string) {
    return this.http.put<IBoard>(`boards/${boardId}`, {
      title: title,
      description:description,
    });
  }

  public deleteBoard(boardId: string) {
    return this.http.delete(`boards/${boardId}`);
  }
}

