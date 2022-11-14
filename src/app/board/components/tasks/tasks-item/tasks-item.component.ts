import { Component, Input } from '@angular/core';
import { ITask } from '../../../models/task.model';

@Component({
  selector: 'app-tasks-item',
  templateUrl: './tasks-item.component.html',
  styleUrls: ['./tasks-item.component.scss'],
})
export class TasksItemComponent {
  @Input() task: ITask | undefined;
}
