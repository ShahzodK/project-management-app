import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateBoardFormComponent } from '../components/create-board-form/create-board-form.component';

@Injectable({
  providedIn: 'root',
})
export class BoardService {

  public deletingBoard = '';

  public searchValue = '';

  public IsCreateBoardModalVisible = false;

  constructor(
    public dialog: MatDialog,
  ) { }


  openDialog() {
    const dialogRef = this.dialog.open(CreateBoardFormComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }


}
