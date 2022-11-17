import { Component, Input } from '@angular/core';
import { DeleteTaskModalComponent } from './../delete-task-modal/delete-task-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { ITask } from '../../../models/task.model';
import { IColumn } from 'src/app/board/models/column.model';
import { IBoard } from 'src/app/main/models/board.model';

@Component({
  selector: 'app-tasks-item',
  templateUrl: './tasks-item.component.html',
  styleUrls: ['./tasks-item.component.scss'],
})
export class TasksItemComponent {

  constructor(public dialog: MatDialog) {}

  @Input() column: IColumn | undefined;

  @Input() board: IBoard | undefined;
  
  @Input() task: ITask | undefined;

  public showDeleteTaskModal(): void {
    const dialogRef = this.dialog.open(DeleteTaskModalComponent, {
      width: '250px',
      data: {
        boardId: this.board?.id,
        columnId: this.column?.id,
        taskId: this.task?.id,
      },
    });
    dialogRef.afterClosed().subscribe()
  }
}
