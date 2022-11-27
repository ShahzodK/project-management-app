import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import * as BoardActions from '../../redux/actions/board.actions';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { ColumnResult, ModalData, ModalResult } from '../../../shared/models/modal.model';
import { ModalComponent } from '../../../shared/components/modal/modal.component';

@Component({
  selector: 'app-board-page-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Input() public boardTitle = '';

  @Input() public boardId = '';

  @Output() private back = new EventEmitter();

  public screenWidth: number;


  constructor(public dialog: MatDialog, private store: Store, private translateService: TranslateService) {
    this.screenWidth = window.innerWidth;
  }

  @HostListener('window:resize', ['$event'])
  private getScreenSize(): void {
    this.screenWidth = window.innerWidth;
  }

  public onNavigateBackClick(): void {
    this.back.emit();
  }

  public showCreateColumnModal(): void {
    const dialogConfig = new MatDialogConfig<ModalData>();

    dialogConfig.autoFocus = 'dialog';
    dialogConfig.data = {
      title: this.translateService.instant('board.create-column-modal.title'),
      formFields: [
        {
          label: this.translateService.instant('board.create-column-modal.column-title'),
          name: this.translateService.instant('board.create-column-modal.column-title'),
        },
      ],
    };

    const dialogRef = this.dialog.open(ModalComponent, dialogConfig);

    dialogRef
      .afterClosed()
      .subscribe((dialogResult: ModalResult<ColumnResult>) => {
        if (!dialogResult) return;

        this.store.dispatch(BoardActions.createColumn({
          column: {
            boardId: this.boardId,
            title: dialogResult.title,
          },
        }));
      });
  }
}
