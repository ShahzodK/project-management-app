import { Component, Input } from '@angular/core';
import { ITask } from '../../../models/task.model';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.scss'],
})
export class TasksListComponent {
  @Input() tasks: ITask[] | undefined;
}
