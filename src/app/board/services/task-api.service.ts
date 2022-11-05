import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiDataService } from './../../core/services/api-data.service';
import { ITask } from '../models/task.model';

@Injectable()
export class TaskApiService {

  constructor(private http: HttpClient, private apiData: ApiDataService) { }

  public getTasks(boardId: string, columnId: string) {
    return this.http.get<ITask[]>(`${this.apiData.BASE_URL}${this.apiData.BOARDS_PATH}/${boardId}${this.apiData.COLUMNS_PATH}/${columnId}${this.apiData.TASKS_PATH}`, {
      headers: {
        'Authorization': `Bearer ${this.apiData.API_TOKEN}`,
        'Accept': 'application/json',
      },
    });
  }

  public getTask(boardId: string, columnId: string, taskId: string) {
    return this.http.get<ITask>(`${this.apiData.BASE_URL}${this.apiData.BOARDS_PATH}/${boardId}${this.apiData.COLUMNS_PATH}/${columnId}${this.apiData.TASKS_PATH}/${taskId}`);
  }

  public createTask(boardId:string, columnId: string, title: string, description: string, userId: string) {
    return this.http.post<ITask>(`${this.apiData.BASE_URL}${this.apiData.BOARDS_PATH}/${boardId}${this.apiData.COLUMNS_PATH}/${columnId}${this.apiData.TASKS_PATH}`, {
      title,
      description,
      userId,
    });
  }

  public updateTask(boardId: string, columnId: string, taskId: string, title: string, order: number, description: string, userId:string) {
    return this.http.put<ITask>(`${this.apiData.BASE_URL}${this.apiData.BOARDS_PATH}/${boardId}${this.apiData.COLUMNS_PATH}/${columnId}${this.apiData.TASKS_PATH}/${taskId}`, {
      title,
      order,
      description,
      userId,
      boardId,
      columnId,
    });
  }

  public deleteTask(boardId: string, columnId: string, taskId: string) {
    return this.http.delete(`${this.apiData.BASE_URL}${this.apiData.BOARDS_PATH}/${boardId}${this.apiData.COLUMNS_PATH}/${columnId}${this.apiData.TASKS_PATH}/${taskId}`);
  }

}
