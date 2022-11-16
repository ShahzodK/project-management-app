import { Subscription } from 'rxjs';
import { Component, OnDestroy } from '@angular/core';
import { BoardApiService } from '../../services/board-api.service';
import { BoardService } from '../../services/board.service';
import { Store } from '@ngrx/store';
import * as BoardActions from './../../../redux/actions/board-action';
import { IBoard } from './../../models/board.model';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-create-board-form',
  templateUrl: './create-board-form.component.html',
  styleUrls: ['./create-board-form.component.scss'],
})
export class CreateBoardFormComponent implements OnDestroy {

  constructor(
    public boardService: BoardService,
    private api: BoardApiService,
    private store: Store,
    // private dialogRef: MatDialogRef<CreateBoardFormComponent>,
    public dialog: MatDialog,
  ) { }


  public boardTitle = '';

  public boardDescription = '';

  public isClicked = false;

  public boardError = false;

  public createBoardSub: Subscription | undefined;

  public submit(): void {
    const boardTitle = this.boardTitle;
    const boardDescription = this.boardDescription;
    if (boardTitle && boardDescription) {
      this.createBoardSub = this.api.createBoard(boardTitle, boardDescription).subscribe({
        next: ({ id, title, description }) => {
          const board: IBoard = {
            id,
            title,
            description,
          };
          this.store.dispatch(BoardActions.createBoard({ board }));
          this.boardService.IsCreateBoardModalVisible = false;
          this.boardError = false;
          this.boardTitle = '';
          this.boardDescription = '';
        },
        error: () => this.boardError = true,
      });
    }
  }

  openDialog() {
    const dialogRef = this.dialog.open(CreateBoardFormComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }


  public showCreateBoardForm(): void {
    this.isClicked = true;
  }

  ngOnDestroy(): void {
    this.createBoardSub?.unsubscribe();
  }
}
