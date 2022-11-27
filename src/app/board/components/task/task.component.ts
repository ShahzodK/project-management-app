import { Component, Input } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ITask } from '../../models/task.model';
import * as BoardActions from '../../redux/actions/board.actions';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmModalComponent } from '../../../shared/components/confirm-modal/confirm-modal.component';
import { ModalData, ModalResult, TaskResult } from '../../../shared/models/modal.model';
import { ModalComponent } from '../../../shared/components/modal/modal.component';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent {

  constructor(private dialog: MatDialog, private store: Store, private translateService:TranslateService) {
  }

  @Input() public task!: ITask;

  @Input() public boardId!: string;

  @Input() public columnId!: string;

  public showDeleteTaskModal(event: MouseEvent): void {
    event.stopPropagation();

    const dialogConfig = new MatDialogConfig();

    dialogConfig.autoFocus = 'dialog';

    const dialogRef = this.dialog.open(ConfirmModalComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((isConfirmed: boolean) => {
      if (isConfirmed) {
        this.store.dispatch(BoardActions.deleteTask({
          boardId: this.boardId,
          columnId: this.columnId,
          taskId: this.task._id,
        }));
      }
    });
  }

  public showEditTaskModal(): void {
    const dialogConfig = new MatDialogConfig<ModalData>();

    dialogConfig.autoFocus = 'dialog';

    dialogConfig.data = {
      title: this.translateService.instant('board.edit-task-modal.title'),
      formFields: [
        {
          label: this.translateService.instant('board.edit-task-modal.task-title'),
          name:  this.translateService.instant('board.edit-task-modal.task-title'),
          value: this.task.title,
        },
        {
          label: this.translateService.instant('board.edit-task-modal.description'),
          name: this.translateService.instant('board.edit-task-modal.description'),
          value: this.task.description,
        },
      ],
    };

    const dialogRef = this.dialog.open(ModalComponent, dialogConfig);

    dialogRef
      .afterClosed()
      .subscribe((dialogResult: ModalResult<TaskResult>) => {
        if (!dialogResult) return;

        const { title, description } = dialogResult;

        this.store.dispatch(BoardActions.updateTask({
          newTask: {
            ...this.task,
            title,
            description,
          },
        }));
      },
      );
  }
}
