import { Component, Input } from '@angular/core';
import { IBoard } from 'src/app/main/models/board.model';
import { ITask } from '../../../models/task.model';
import { IColumn } from 'src/app/board/models/column.model';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.scss'],
})
export class TasksListComponent {
  @Input() column: IColumn | undefined;

  @Input() board: IBoard | undefined;

  @Input() tasks: ITask[] = [];
}
