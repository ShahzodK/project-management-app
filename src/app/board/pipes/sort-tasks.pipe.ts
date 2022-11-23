import { Pipe, PipeTransform } from '@angular/core';
import { ITask } from '../models/task.model';

@Pipe({
  name: 'sortTasks',
})
export class SortTasksPipe implements PipeTransform {

  transform(tasks: ITask[], key: string): ITask[] {
    if (!tasks.length) return tasks;

    return [...tasks].sort((taskA, taskB) => {
      const propA = taskA[key as keyof ITask] as any | number | bigint;
      const propB = taskB[key as keyof ITask] as any | number | bigint;

      return propA - propB;
    });
  }

}
