import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IColumn } from '../models/column.model';
import { environment } from 'src/environments/environment';

@Injectable()
export class ColumnApiService {

  constructor(private http: HttpClient) { }

  public getColumns(boardId: string) {
    return this.http.get<IColumn[]>(`${environment.boardsPath}/${boardId}${environment.columnsPath}`);
  }

  public getColumn(boardId: string, columnId: string) {
    return this.http.get<IColumn>(`${environment.boardsPath}/${boardId}${environment.columnsPath}/${columnId}`);
  }

  public createColumn(boardId:string, title: string) {
    return this.http.post<IColumn>(`${environment.boardsPath}/${boardId}${environment.columnsPath}`, {
      title,
    });
  }

  public updateColumn(boardId: string, columnId: string, title: string, order: number) {
    return this.http.put<IColumn>(`${environment.boardsPath}/${boardId}${environment.columnsPath}/${columnId}`, {
      title,
      order,
    });
  }

  public deleteColumn(boardId: string, columnId: string) {
    return this.http.delete(`${environment.boardsPath}/${boardId}${environment.columnsPath}/${columnId}`);
  }

}
