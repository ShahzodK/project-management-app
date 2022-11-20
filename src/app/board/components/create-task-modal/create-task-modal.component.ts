import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

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
  ) {}

  public save(): void {
    this.dialogRef.close({
      taskTitle: this.taskTitle,
      taskDescription: this.taskDescription,
    });
  }
}
