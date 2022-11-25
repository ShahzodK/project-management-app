import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IColumn } from '../models/column.model';

@Injectable({
  providedIn: 'root',
})
export class ColumnApiService {

  constructor(private http: HttpClient) { }

  public getColumns(boardId: string): Observable<IColumn[]> {
    return this.http.get<IColumn[]>(`boards/${boardId}/columns`);
  }

  public getColumn(boardId: string, columnId: string): Observable<IColumn> {
    return this.http.get<IColumn>(`boards/${boardId}/columns/${columnId}`);
  }

  public createColumn(column: Omit<IColumn, '_id'>): Observable<IColumn> {
    const { title, order, boardId } = column;

    return this.http.post<IColumn>(`boards/${boardId}/columns`, {
      title,
      order,
    });
  }

  public updateColumn(column: IColumn): Observable<IColumn> {
    const { title, order, boardId, _id: columnId } = column;

    return this.http.put<IColumn>(`boards/${boardId}/columns/${columnId}`, {
      title,
      order,
    });
  }

  public deleteColumn(boardId: string, columnId: string): Observable<Object> {
    return this.http.delete(`boards/${boardId}/columns/${columnId}`);
  }
}
