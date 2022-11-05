import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ITask } from '../models/task.model';
import { environment } from 'src/environments/environment';

@Injectable()
export class TaskApiService {

  constructor(private http: HttpClient) { }

  public getTasks(boardId: string, columnId: string) {
    return this.http.get<ITask[]>(`${environment.boardsPath}/${boardId}${environment.columnsPath}/${columnId}${environment.tasksPath}`, {
    });
  }

  public getTask(boardId: string, columnId: string, taskId: string) {
    return this.http.get<ITask>(`${environment.boardsPath}/${boardId}${environment.columnsPath}/${columnId}${environment.tasksPath}/${taskId}`);
  }

  public createTask(boardId:string, columnId: string, title: string, description: string, userId: string) {
    return this.http.post<ITask>(`${environment.boardsPath}/${boardId}${environment.columnsPath}/${columnId}${environment.tasksPath}`, {
      title,
      description,
      userId,
    });
  }

  public updateTask(boardId: string, columnId: string, taskId: string, title: string, order: number, description: string, userId:string) {
    return this.http.put<ITask>(`${environment.boardsPath}/${boardId}${environment.columnsPath}/${columnId}${environment.tasksPath}/${taskId}`, {
      title,
      order,
      description,
      userId,
      boardId,
      columnId,
    });
  }

  public deleteTask(boardId: string, columnId: string, taskId: string) {
    return this.http.delete(`${environment.boardsPath}/${boardId}${environment.columnsPath}/${columnId}${environment.tasksPath}/${taskId}`);
  }

}
