import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { TaskApiService } from '../../services/task-api.service';
import { CreateTaskModalComponent } from '../create-task-modal/create-task-modal.component';
import { IColumn } from '../../models/column.model';
import { ITask } from '../../models/task.model';
import * as BoardActions from '../../redux/actions/board.actions';
import { selectTasks } from '../../redux/selectors/board.selectors';

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss'],
})
export class ColumnComponent implements OnInit {
  @Input() column!: IColumn;

  @Input() boardId!: string;

  @Input() userId!: string;

  public tasks$: Observable<ITask[] | undefined> | undefined;
  // public tasks$ = this.store.select(selectTasks);

  constructor(
    private dialog: MatDialog,
    private taskApiService: TaskApiService,
    private store: Store) {}

  ngOnInit(): void {
    if (!(this.boardId && this.column)) return;

    console.log('init', this.boardId, this.column.id);

    this.store.dispatch(BoardActions.fetchTasks({
      boardId: this.boardId,
      columnId: this.column.id,
    }));

    this.tasks$ = this.store.select(selectTasks(this.column.id));
  }

  public openCreateTaskModal(): void {
    const dialogRef = this.dialog.open(CreateTaskModalComponent);

    dialogRef.afterClosed().subscribe((task: { taskTitle: string, taskDescription: string }) => {
      if (!task) return;

      const { taskTitle, taskDescription } = task;

      this.store.dispatch(BoardActions.createTask({
        boardId: this.boardId,
        columnId: this.column.id,
        taskTitle,
        taskDescription,
        userId: this.userId,
      }));
    },
    );
  }
}
