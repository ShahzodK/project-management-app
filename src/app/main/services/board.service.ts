import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateBoardModalComponent } from '../components/create-board-modal/create-board-modal.component';
import { concatMap, of, Subscription } from 'rxjs';
import { BoardApiService } from './board-api.service';
import { Store } from '@ngrx/store';
import * as BoardActions from './../../redux/actions/board-action';
import { IBoard } from '../models/board.model';


@Injectable({
  providedIn: 'root',
})
export class BoardService {
  public createBoardSub!: Subscription;

  public deletingBoard = '';

  public searchValue = '';

  constructor(
    private dialog: MatDialog,
    private boardApiService: BoardApiService,
    private store: Store,
  ) {
  }

  openCreateBoardModal() {
    const dialogRef = this.dialog.open(CreateBoardModalComponent);

    dialogRef
      .afterClosed()
      .pipe(
        concatMap((createdBoard: { title: string, description: string } | false) => {
          if (!createdBoard) return of(null);

          const { title, description } = createdBoard;

          return this.boardApiService
            .createBoard(title, description);
        }),
      )
      .subscribe((result) => {
        if (result === null) return;

        const { id, title, description } = result;

        const board: IBoard = {
          id,
          title,
          description,
        };

        this.store.dispatch(BoardActions.createBoard({ board }));
      });
  }

}
