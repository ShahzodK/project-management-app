import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ITask } from '../models/task.model';

@Injectable()
export class TaskApiService {

  constructor(private http: HttpClient) { }

  public getTasks(boardId: string, columnId: string) {
    return this.http.get<ITask[]>(`boards/${boardId}/columns/${columnId}/tasks`, {
    });
  }

  public getTask(boardId: string, columnId: string, taskId: string) {
    return this.http.get<ITask>(`boards/${boardId}/columns/${columnId}/tasks/${taskId}`);
  }

  public createTask(boardId:string, columnId: string, title: string, description: string, userId: string) {
    return this.http.post<ITask>(`boards/${boardId}/columns/${columnId}/tasks`, {
      title,
      description,
      userId,
    });
  }

  public updateTask(boardId: string, columnId: string, taskId: string, title: string, order: number, description: string, userId:string) {
    return this.http.put<ITask>(`boards/${boardId}/columns/${columnId}/tasks/${taskId}`, {
      title,
      order,
      description,
      userId,
      boardId,
      columnId,
    });
  }

  public deleteTask(boardId: string, columnId: string, taskId: string) {
    return this.http.delete(`boards/${boardId}/columns/${columnId}tasks/${taskId}`);
  }

}
