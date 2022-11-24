import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CreateColumnModalComponent } from '../create-column-modal/create-column-modal.component';
import * as BoardActions from '../../redux/actions/board.actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-board-page-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Input() public boardTitle = '';

  @Input() public boardId = '';

  @Output() private back = new EventEmitter();


  constructor(public dialog: MatDialog, private store: Store) {
  }

  public onNavigateBackClick(): void {
    this.back.emit();
  }

  public showCreateColumnModal(): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.autoFocus = 'dialog';

    const dialogRef = this.dialog.open(CreateColumnModalComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(title => {
      if (!title) return;

      this.store.dispatch(BoardActions.createColumn({
        column: {
          boardId: this.boardId, title,
        },
      }));
    });
  }
}
