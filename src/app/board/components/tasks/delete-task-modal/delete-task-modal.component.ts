import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TaskApiService } from './../../../services/task-api.service';

@Component({
  selector: 'app-delete-task-modal',
  templateUrl: './delete-task-modal.component.html',
  styleUrls: ['./delete-task-modal.component.scss'],
})
export class DeleteTaskModalComponent {

  constructor(
    private taskApi: TaskApiService,    
    public dialogRef: MatDialogRef<DeleteTaskModalComponent>,
    @Inject(MAT_DIALOG_DATA) public stateInfo: { boardId: string, columnId: string, taskId: string },
  ) { }

  public closeModal() {
    this.dialogRef.close();
  }

  public confirmDelete() {
    const { boardId, columnId, taskId } = this.stateInfo;
    this.dialogRef.close();
    this.taskApi.deleteTask(boardId, columnId, taskId ).subscribe();
  }

}
