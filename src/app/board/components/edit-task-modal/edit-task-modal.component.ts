import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-task-modal',
  templateUrl: './edit-task-modal.component.html',
  styleUrls: ['./edit-task-modal.component.scss'],
})
export class EditTaskModalComponent {
  public title = this.data.title;

  public description = this.data.description;

  constructor(
    private dialogRef: MatDialogRef<EditTaskModalComponent>,
    @Inject(MAT_DIALOG_DATA) private data: { title: string, description: string },
  ) {}

  public save(): void {
    if (this.title === this.data.title && this.description === this.data.description) {
      this.dialogRef.close(false);
      return;
    }

    this.dialogRef.close({
      title: this.title,
      description: this.description,
    });
  }
}
