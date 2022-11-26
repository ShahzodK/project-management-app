import { Component, ElementRef, Input, ViewChild } from '@angular/core';
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
    private taskApiService: TaskApiService,
    private store: Store) {
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
    const dialogConfig = new MatDialogConfig();

    dialogConfig.autoFocus = 'dialog';

    const dialogRef = this.dialog.open(CreateTaskModalComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((task: { title: string, description: string }) => {
      if (!task) return;

      const { title, description } = task;

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
}
