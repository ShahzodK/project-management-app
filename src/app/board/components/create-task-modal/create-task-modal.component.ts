import { Component, Inject } from '@angular/core';
import { TaskApiService } from './../../services/task-api.service';
import { UserService } from 'src/app/shared/services/user.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-create-task-modal',
  templateUrl: './create-task-modal.component.html',
  styleUrls: ['./create-task-modal.component.scss'],
})
export class CreateTaskModalComponent {

  public taskTitle = '';

  public taskDescription = '';

  constructor(
    private dialogRef: MatDialogRef<CreateTaskModalComponent>,
    private taskApi: TaskApiService,
    private userService: UserService,
    @Inject(MAT_DIALOG_DATA) public stateInfo: { boardId: string, columnId: string },
  ) {}

  public save(): void {
    const userId = this.userService.getUserId();
    const { boardId, columnId } = this.stateInfo;
    this.dialogRef.close(this.taskTitle);
    this.taskApi.createTask(boardId, columnId, this.taskTitle, this.taskDescription, userId ).subscribe();
  }
}
