import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectBoard, selectColumns } from '../../redux/selectors/board.selectors';
import * as BoardActions from '../../redux/actions/board.actions';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CreateColumnModalComponent } from '../../components/create-column-modal/create-column-modal.component';
import { selectUserId } from '../../../redux/selectors/app.selectors';


@Component({
  selector: 'app-board-page',
  templateUrl: './board-page.component.html',
  styleUrls: ['./board-page.component.scss'],
})
export class BoardPageComponent implements OnInit, OnDestroy {
  public board$ = this.store.select(selectBoard);

  public columns$ = this.store.select(selectColumns);

  private routeParamsSub!: Subscription;

  private boardId: string | null = null;

  public userId$ = this.store.select(selectUserId);

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    public dialog: MatDialog,
    public store: Store,
  ) {
  }

  ngOnInit(): void {
    this.routeParamsSub = this.route.paramMap.subscribe((params) => {
      const boardId = params.get('id')!;

      if (!boardId) throw this.getBoardIdError();

      this.store.dispatch(BoardActions.boardPageOpened({ boardId }));

      this.boardId = boardId;

      this.columns$.subscribe((columns) => {
        this.store.dispatch(BoardActions.fetchTasks({
          boardId: boardId,
          columnIds: columns.map(column => column.id),
        }));
      });
    });
  }

  private getBoardIdError(): Error {
    return new Error("Board don't have an ID: URL doesn't contain board's ID");
  }

  ngOnDestroy(): void {
    this.routeParamsSub.unsubscribe();
  }

  public navigateBack(): void {
    this.location.back();
  }

  public showCreateColumnModal(): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.autoFocus = 'dialog';

    const dialogRef = this.dialog.open(CreateColumnModalComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      columnTitle => {
        if (!columnTitle) return;
        if (!this.boardId) throw this.getBoardIdError();

        this.store.dispatch(BoardActions.createColumn({
          boardId: this.boardId,
          columnTitle,
        }));
      },
    );
  }
}
