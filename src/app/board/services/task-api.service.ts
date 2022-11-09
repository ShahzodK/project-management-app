import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ITask } from '../models/task.model';
import { Observable } from 'rxjs';

@Injectable()
export class TaskApiService {

  constructor(private http: HttpClient) { }

  public getTasks(boardId: string, columnId: string): Observable<ITask[]> {
    return this.http.get<ITask[]>(`boards/${boardId}/columns/${columnId}/tasks`, {
    });
  }

  public getTask(boardId: string, columnId: string, taskId: string): Observable<ITask> {
    return this.http.get<ITask>(`boards/${boardId}/columns/${columnId}/tasks/${taskId}`);
  }

  public createTask(boardId:string, columnId: string, title: string, description: string, userId: string): Observable<ITask> {
    return this.http.post<ITask>(`boards/${boardId}/columns/${columnId}/tasks`, {
      title,
      description,
      userId,
    });
  }

  public updateTask(boardId: string, columnId: string, taskId: string, title: string, order: number, description: string, userId:string): Observable<ITask> {
    return this.http.put<ITask>(`boards/${boardId}/columns/${columnId}/tasks/${taskId}`, {
      title,
      order,
      description,
      userId,
      boardId,
      columnId,
    });
  }

  public deleteTask(boardId: string, columnId: string, taskId: string): Observable<Object> {
    return this.http.delete(`boards/${boardId}/columns/${columnId}tasks/${taskId}`);
  }

}
