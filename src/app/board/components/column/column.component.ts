import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { TaskApiService } from '../../services/task-api.service';
import { CreateTaskModalComponent } from '../create-task-modal/create-task-modal.component';
import { IColumn } from '../../models/column.model';
import * as BoardActions from '../../redux/actions/board.actions';
import { selectTasks } from '../../redux/selectors/board.selectors';
import { map } from 'rxjs/operators';
import { ConfirmModalComponent } from '../../../shared/components/confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss'],
})
export class ColumnComponent implements OnInit {
  @Input() column!: IColumn;

  @Input() boardId!: string;

  @Input() userId!: string;

  public tasks$ = this.store.select(selectTasks).pipe(
    map((tasks) => tasks.filter(task => task.columnId === this.column.id)),
  );

  constructor(
    private dialog: MatDialog,
    private taskApiService: TaskApiService,
    private store: Store) {
  }

  ngOnInit(): void {
    if (!(this.boardId && this.column)) return;

    console.log('init column', this.column.id);
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

  public showDeleteColumnModal(): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.autoFocus = 'dialog';

    const dialogRef = this.dialog.open(ConfirmModalComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((isConfirmed: boolean) => {
      if (isConfirmed) {
        this.store.dispatch(BoardActions.deleteColumn({
          boardId: this.boardId,
          columnId: this.column.id,
        }));
      }
    });
  }
}
