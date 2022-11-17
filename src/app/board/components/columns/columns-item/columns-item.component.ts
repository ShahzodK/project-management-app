import { Component, Input, OnChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { TaskApiService } from './../../../services/task-api.service';
import { CreateTaskModalComponent } from '../../create-task-modal/create-task-modal.component';
import { IBoard } from 'src/app/main/models/board.model';
import { IColumn } from '../../../models/column.model';
import { ITask } from '../../../models/task.model';

@Component({
  selector: 'app-columns-item',
  templateUrl: './columns-item.component.html',
  styleUrls: ['./columns-item.component.scss'],
})
export class ColumnsItemComponent implements OnChanges {

  constructor(public dialog: MatDialog, public taskApi: TaskApiService) {}
  
  @Input() column: IColumn | undefined;

  @Input() board: IBoard | undefined;

  public tasks$: Observable<ITask[]> | undefined;

  ngOnChanges(): void {
    if (this.board && this.column) {
      this.taskApi.getTasks(this.board!.id, this.column!.id).subscribe({
        next: () => {
          this.tasks$ = this.taskApi.getTasks(this.board!.id, this.column!.id);
        },
      });
    }
  }


  public openTaskModal(): void {
    const dialogRef = this.dialog.open(CreateTaskModalComponent, {
      data: {
        boardId: this.board?.id,
        columnId: this.column?.id,
      },
    });

    dialogRef.afterClosed().subscribe(
      () => this.tasks$ = this.taskApi.getTasks(this.board!.id, this.column!.id),
    );
  }
}
