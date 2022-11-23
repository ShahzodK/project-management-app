import { Component, Input } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ITask } from '../../models/task.model';
import * as BoardActions from '../../redux/actions/board.actions';
import { Store } from '@ngrx/store';
import { ConfirmModalComponent } from '../../../shared/components/confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent {

  constructor(private dialog: MatDialog, private store: Store) {}

  @Input() boardId!: string;

  @Input() columnId!: string;

  @Input() task!: ITask;

  public showDeleteTaskModal(): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.autoFocus = 'dialog';

    const dialogRef = this.dialog.open(ConfirmModalComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((isConfirmed: boolean) => {
      if (isConfirmed) {
        this.store.dispatch(BoardActions.deleteTask({
          boardId: this.boardId,
          columnId: this.columnId,
          taskId: this.task.id,
        }));
      }
    });
  }
}
