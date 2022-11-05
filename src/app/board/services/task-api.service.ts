import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ITask } from '../models/task.model';

@Injectable()
export class TaskApiService {

  constructor(private http: HttpClient) { }

  public boardsPath = 'boards';

  public columnsPath = '/columns';

  public tasksPath = '/tasks';

  public getTasks(boardId: string, columnId: string) {
    return this.http.get<ITask[]>(`${this.boardsPath}/${boardId}${this.columnsPath}/${columnId}${this.tasksPath}`, {
    });
  }

  public getTask(boardId: string, columnId: string, taskId: string) {
    return this.http.get<ITask>(`${this.boardsPath}/${boardId}${this.columnsPath}/${columnId}${this.tasksPath}/${taskId}`);
  }

  public createTask(boardId:string, columnId: string, title: string, description: string, userId: string) {
    return this.http.post<ITask>(`${this.boardsPath}/${boardId}${this.columnsPath}/${columnId}${this.tasksPath}`, {
      title,
      description,
      userId,
    });
  }

  public updateTask(boardId: string, columnId: string, taskId: string, title: string, order: number, description: string, userId:string) {
    return this.http.put<ITask>(`${this.boardsPath}/${boardId}${this.columnsPath}/${columnId}${this.tasksPath}/${taskId}`, {
      title,
      order,
      description,
      userId,
      boardId,
      columnId,
    });
  }

  public deleteTask(boardId: string, columnId: string, taskId: string) {
    return this.http.delete(`${this.boardsPath}/${boardId}${this.columnsPath}/${columnId}${this.tasksPath}/${taskId}`);
  }

}
