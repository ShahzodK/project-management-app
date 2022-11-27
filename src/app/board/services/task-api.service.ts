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

  public getTasksSet(boardId: string) {
    return this.http.get<ITask[]>(`tasksSet/${boardId}`);
  }

  public getTask(boardId: string, columnId: string, taskId: string): Observable<ITask> {
    return this.http.get<ITask>(`boards/${boardId}/columns/${columnId}/tasks/${taskId}`);
  }

  public createTask(task: Omit<ITask, '_id'>): Observable<ITask> {
    const { boardId, columnId, title, description, userId, order, users } = task;

    return this.http.post<ITask>(`boards/${boardId}/columns/${columnId}/tasks`, {
      title,
      description,
      userId,
      order,
      users,
    });
  }

  public updateTask(task: ITask): Observable<ITask> {
    const {
      boardId,
      columnId,
      _id: taskId,
      title,
      order,
      description,
      users,
      userId,
    } = task;

    return this.http.put<ITask>(`boards/${boardId}/columns/${columnId}/tasks/${taskId}`, {
      title,
      order,
      description,
      users,
      userId,
      columnId,
    });
  }

  public updateTaskOrder(tasks: ITask[]): Observable<ITask[]> {
    const taskSetForRequest = [...tasks].map((task: Partial<ITask>, i: number) => {
      const taskClone = { ...task };
      delete taskClone.title ;
      delete taskClone.boardId ;
      delete taskClone.description ;
      delete taskClone.userId ;
      delete taskClone.users;
      taskClone.order = i;
      return taskClone;
    });
    return this.http.patch<ITask[]>('tasksSet',
      taskSetForRequest,
    );
  }

  public deleteTask(boardId: string, columnId: string, taskId: string): Observable<Object> {
    return this.http.delete(`boards/${boardId}/columns/${columnId}/tasks/${taskId}`);
  }

}
