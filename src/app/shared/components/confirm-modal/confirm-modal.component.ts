import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss'],
})
export class ConfirmModalComponent {

  constructor(private dialogRef: MatDialogRef<ConfirmModalComponent>) { }

  public confirm(): void {
    this.dialogRef.close(true);
  }
}
