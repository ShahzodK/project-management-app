import { ITask } from './task.model';

export interface IColumn {
  id:string,
  title: string,
  order: number,
  tasks: ITask[];
}

export interface IUpdatedColumn {
  _id: string,
  order: number;
}
