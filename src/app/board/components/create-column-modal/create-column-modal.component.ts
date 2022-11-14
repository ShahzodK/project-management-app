import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-create-column-modal',
  templateUrl: './create-column-modal.component.html',
  styleUrls: ['./create-column-modal.component.scss'],
})
export class CreateColumnModalComponent {
  public columnTitle = '';

  constructor(private dialogRef: MatDialogRef<CreateColumnModalComponent>) {}

  public save(): void {
    this.dialogRef.close(this.columnTitle);
  }
}
