import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateBoardModalComponent } from '../components/create-board-modal/create-board-modal.component';
import { Subscription } from 'rxjs';
import { BoardApiService } from '../services/board-api.service';
import { Store } from '@ngrx/store';
import * as BoardActions from './../../redux/actions/board-action';
import { IBoard } from './../models/board.model';


@Injectable({
  providedIn: 'root',
})
export class BoardService {

  public createBoardSub: Subscription | undefined;

  public boardTitle = '';

  public boardDescription = '';

  public deletingBoard = '';

  public searchValue = '';

  public IsCreateBoardModalVisible = false;

  public boardError = false;

  constructor(
    public dialog: MatDialog,
    private api: BoardApiService,
    private store: Store,
  ) { }


  openCreateBoardModal() {
    const dialogRef = this.dialog.open(CreateBoardModalComponent);

    dialogRef.afterClosed().subscribe(result => {
      this.createNewBoard(result);
    });
  }

  public createNewBoard(result: string): void {
    let resultObj = JSON.parse(result);
    const boardTitle = resultObj.title;
    const boardDescription = resultObj.description;
    // const { boardTitle, boardDescription } = result;
    if (boardTitle && boardDescription) {
      console.log('inside createBoard');
      this.createBoardSub = this.api.createBoard(boardTitle, boardDescription).subscribe({
        next: ({ id, title, description }) => {
          const board: IBoard = {
            id,
            title,
            description,
          };
          this.store.dispatch(BoardActions.createBoard({ board }));
          this.IsCreateBoardModalVisible = false;
          this.boardError = false;
        },
        error: () => this.boardError = true,
      });
    }
  }



}
