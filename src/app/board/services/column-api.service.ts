import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IColumn } from '../models/column.model';

@Injectable()
export class ColumnApiService {

  constructor(private http: HttpClient) { }

  public getColumns(boardId: string): Observable<IColumn[]> {
    return this.http.get<IColumn[]>(`boards/${boardId}/columns`);
  }

  public getColumn(boardId: string, columnId: string): Observable<IColumn> {
    return this.http.get<IColumn>(`boards/${boardId}/columns/${columnId}`);
  }

  public createColumn(boardId:string, title: string): Observable<IColumn> {
    return this.http.post<IColumn>(`boards/${boardId}/columns`, {
      title,
    });
  }

  public updateColumn(boardId: string, columnId: string, title: string, order: number): Observable<IColumn> {
    return this.http.put<IColumn>(`boards/${boardId}/columns/${columnId}`, {
      title,
      order,
    });
  }

  public deleteColumn(boardId: string, columnId: string): Observable<Object> {
    return this.http.delete(`boards/${boardId}/columns/${columnId}`);
  }

}
