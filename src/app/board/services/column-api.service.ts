import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IColumn } from '../models/column.model';

@Injectable()
export class ColumnApiService {

  constructor(private http: HttpClient) { }

  public boardsPath = 'boards';

  public columnsPath = '/columns';

  public getColumns(boardId: string) {
    return this.http.get<IColumn[]>(`${this.boardsPath}/${boardId}${this.columnsPath}`);
  }

  public getColumn(boardId: string, columnId: string) {
    return this.http.get<IColumn>(`${this.boardsPath}/${boardId}${this.columnsPath}/${columnId}`);
  }

  public createColumn(boardId:string, title: string) {
    return this.http.post<IColumn>(`${this.boardsPath}/${boardId}${this.columnsPath}`, {
      title,
    });
  }

  public updateColumn(boardId: string, columnId: string, title: string, order: number) {
    return this.http.put<IColumn>(`${this.boardsPath}/${boardId}${this.columnsPath}/${columnId}`, {
      title,
      order,
    });
  }

  public deleteColumn(boardId: string, columnId: string) {
    return this.http.delete(`${this.boardsPath}/${boardId}${this.columnsPath}/${columnId}`);
  }

}
