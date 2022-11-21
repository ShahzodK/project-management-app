import { Component, OnDestroy } from '@angular/core';
import { BoardApiService } from '../../services/board-api.service';
import { BoardService } from '../../services/board.service';
import * as BoardActions from './../../../redux/actions/board-action';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.scss'],
})
export class DeleteModalComponent implements OnDestroy {

  constructor(
    private api: BoardApiService,
    private boardService: BoardService,
    private store: Store,
  ) { }

  public deleteBoardError = false;

  public deleteBoardSub: Subscription | undefined;

  public deleteBoard(): void {
    const id = this.boardService.deletingBoard;

    this.deleteBoardSub = this.api.deleteBoard(id).subscribe({
      next: () => {
        this.boardService.deletingBoard = '';
        this.deleteBoardError = false;
        this.store.dispatch(BoardActions.deleteBoard({ id }));
      },
      error: () => this.deleteBoardError = true,
    });
  }

  cancelDeletingBoard(): void {
    this.boardService.deletingBoard = '';
  }

  ngOnDestroy(): void {
    this.deleteBoardSub?.unsubscribe();
  }
}
