import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateBoardModalComponent } from '../components/create-board-modal/create-board-modal.component';
import { concatMap, of } from 'rxjs';
import { BoardApiService } from './board-api.service';
import { Store } from '@ngrx/store';
import * as BoardActions from './../../redux/actions/board-action';
import { IBoard } from '../models/board.model';
import { ConfirmModalComponent } from '../../shared/components/confirm-modal/confirm-modal.component';
import { FullRoutePaths } from '../../core/constants/routes';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root',
})
export class BoardService {
  public searchValue = '';

  constructor(
    private dialog: MatDialog,
    private boardApiService: BoardApiService,
    private store: Store,
    private router: Router,
  ) {
  }

  public showCreateBoardModal() {
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
        this.router.navigate([FullRoutePaths.MAIN]);
      });
  }

  public showDeleteBoardModal(id: string | undefined): void {
    if (!id) return;

    const dialogRef = this.dialog.open(ConfirmModalComponent);

    dialogRef
      .afterClosed()
      .pipe(
        concatMap((result: boolean) => {
          if (!result) return of(null);

          return this.boardApiService.deleteBoard(id);
        }),
      )
      .subscribe((result) => {
        if (result === null) return;

        this.store.dispatch(BoardActions.deleteBoard({ id }));
      });
  }
}
