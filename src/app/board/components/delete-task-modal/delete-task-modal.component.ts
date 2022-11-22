import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-task-modal',
  templateUrl: './delete-task-modal.component.html',
  styleUrls: ['./delete-task-modal.component.scss'],
})
export class DeleteTaskModalComponent {

  constructor(
    public dialogRef: MatDialogRef<DeleteTaskModalComponent>,
  ) { }

  public confirm() {
    this.dialogRef.close(true);
  }
}
