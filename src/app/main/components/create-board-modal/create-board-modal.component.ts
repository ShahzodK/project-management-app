import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-create-board-form',
  templateUrl: './create-board-modal.component.html',
  styleUrls: ['./create-board-modal.component.scss'],
})
export class CreateBoardModalComponent {
  public boardTitle = '';

  public boardDescription = '';

  constructor(
    private dialogRef: MatDialogRef<CreateBoardModalComponent>,
  ) { }

  save() {
    this.dialogRef.close({
      title: this.boardTitle,
      description: this.boardDescription,
    });
  }
}
