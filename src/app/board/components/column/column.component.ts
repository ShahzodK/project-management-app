import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { IColumn } from '../../models/column.model';
import * as BoardActions from '../../redux/actions/board.actions';
import { selectTasks } from '../../redux/selectors/board.selectors';
import { map } from 'rxjs/operators';
import { ConfirmModalComponent } from '../../../shared/components/confirm-modal/confirm-modal.component';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { TranslateService } from '@ngx-translate/core';
import { ITask } from '../../models/task.model';
import { updateArrayOrder } from 'src/app/shared/consts/updateArrayOrder';
import { ModalComponent } from '../../../shared/components/modal/modal.component';
import { ModalData, ModalResult, TaskResult } from '../../../shared/models/modal.model';

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss'],
})
export class ColumnComponent {
  @Input() public column!: IColumn;

  @Input() public boardId!: string;

  @Input() public userId!: string;

  @ViewChild('tasksContainer') tasksContainerRef!: ElementRef;

  public tasks$ = this.store.select(selectTasks).pipe(
    map((tasks) => tasks.filter(task => task.columnId === this.column._id)),
  );

  public isEditingTitle: boolean = false;

  constructor(
    private dialog: MatDialog,
    private store: Store,
    private translateService: TranslateService) {
  }

  public editColumn(): void {
    this.isEditingTitle = true;
  }

  public cancelEditTitle(): void {
    this.isEditingTitle = false;
  }

  public submitEditTitle(newTitle: string): void {
    this.isEditingTitle = false;

    if (newTitle === this.column.title) return;

    const newColumn: IColumn = {
      ...this.column,
      title: newTitle,
    };

    this.store.dispatch(BoardActions.updateColumnTitle({
      newColumn,
    }));
  }

  public showCreateTaskModal(): void {
    const dialogConfig = new MatDialogConfig<ModalData>();

    dialogConfig.autoFocus = 'dialog';
    dialogConfig.data = {
      title: this.translateService.instant('board.create-task-modal.title'),
      formFields: [
        {
          label: this.translateService.instant('board.create-task-modal.task-title'),
          name: this.translateService.instant('board.create-task-modal.task-title'),
        },
        {
          label: this.translateService.instant('board.create-task-modal.description'),
          name: this.translateService.instant('board.create-task-modal.description'),
        },
      ],
    };

    const dialogRef = this.dialog.open<ModalComponent>(ModalComponent, dialogConfig);

    dialogRef
      .afterClosed()
      .subscribe((dialogResult: ModalResult<TaskResult>) => {
        if (!dialogResult) return;

        const { title, description } = dialogResult;

        const $tasks = this.tasksContainerRef.nativeElement.children;

        this.store.dispatch(BoardActions.createTask({
          task: {
            boardId: this.boardId,
            columnId: this.column._id,
            title,
            description,
            userId: this.userId,
            users: [],
            order: $tasks.length,
          },
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
          columnId: this.column._id,
        }));
      }
    });
  }

  public reorderTasks(event: CdkDragDrop<any[]>, tasks: ITask[]) {
    if (event.previousIndex !== event.currentIndex) {
      const updatedTasks: ITask[] = updateArrayOrder(tasks, event.previousIndex, event.currentIndex);
      this.store.dispatch(BoardActions.updateTaskOrder({ updatedTasks }));
    }

  }

}
