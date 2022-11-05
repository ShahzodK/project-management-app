import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IBoard } from './../models/board.model';
import { environment } from 'src/environments/environment';

@Injectable()
export class BoardApiService {

  constructor(private http: HttpClient) { }

  public boardsPath = 'boards';

  public getBoards() {
    return this.http.get<IBoard[]>(`${this.boardsPath}`);
  }

  public getBoard(boardId: string) {
    return this.http.get<IBoard>(`${this.boardsPath}/${boardId}`);
  }

  public createBoard(title: string, description: string) {
    return this.http.post<IBoard>(`${this.boardsPath}`, {
      title: title,
      description:description,
    });
  }

  public updateBoard(boardId: string, title: string, description: string) {
    return this.http.put<IBoard>(`${this.boardsPath}/${boardId}`, {
      title: title,
      description:description,
    });
  }

  public deleteBoard(boardId: string) {
    return this.http.delete(`${environment.baseUrl}${this.boardsPath}/${boardId}`);
  }
}

