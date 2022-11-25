import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IBoard } from 'src/app/main/models/board.model';
import { ConfirmModalComponent } from '../../../shared/components/confirm-modal/confirm-modal.component';
import { Store } from '@ngrx/store';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import * as BoardsActions from '../../redux/actions/boards.actions';

@Component({
  selector: 'app-board-item',
  templateUrl: './board-item.component.html',
  styleUrls: ['./board-item.component.scss'],
})
export class BoardItemComponent {
  @Output() public boardClick = new EventEmitter<string>();


  @Input() public board: IBoard | undefined;

  constructor(
    private store: Store,
    private dialog: MatDialog) { }

  public onBoardClick(): void {
    this.boardClick.emit(this.board?._id);
  }

  public onDeleteClick(event: MouseEvent): void {
    event.stopPropagation();

    if (!this.board?._id) return;

    const dialogConfig = new MatDialogConfig();

    dialogConfig.autoFocus = 'dialog';

    const dialogRef = this.dialog.open(ConfirmModalComponent, dialogConfig);

    dialogRef
      .afterClosed()
      .subscribe((isConfirmed: boolean) => {
        if (!isConfirmed) return;
        if (!this.board) return;

        this.store.dispatch(BoardsActions.deleteBoard({
          id: this.board._id,
        }));
      });
  }
}
