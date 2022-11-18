import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectBoard, selectColumns } from './../../../redux/selectors/current-board-selector';
import * as currentBoardActions from './../../../redux/actions/current-board-action';
import { IColumn } from '../../models/column.model';
import { ColumnApiService } from '../../services/column-api.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CreateColumnModalComponent } from '../../components/create-column-modal/create-column-modal.component';


@Component({
  selector: 'app-board-page',
  templateUrl: './board-page.component.html',
  styleUrls: ['./board-page.component.scss'],
})
export class BoardPageComponent implements OnInit, OnDestroy {
  public board$ = this.store.select(selectBoard);

  private routeParamsSub!: Subscription;

  private boardSub!: Subscription;

  public columns$ = this.store.select(selectColumns);

  public boardID: string | undefined;


  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private columnApiService: ColumnApiService,
    public dialog: MatDialog,
    public store: Store,
  ) {
  }

  ngOnInit(): void {
    this.routeParamsSub = this.route.paramMap.subscribe((params) => {
      this.boardID = params.get('id')!;

      if (!this.boardID) throw new Error("Board don't have an ID: URL doesn't contain board's ID");

      // this.boardSub  = this.store.select(selectBoard).subscribe(board => {
      //   this.board = board;
      // });

      this.store.dispatch(currentBoardActions.getCurrentBoardId({ id: this.boardID }));

      this.columns$ = this.getColumns$(this.boardID);
    });

  }

  ngOnDestroy(): void {
    this.routeParamsSub?.unsubscribe();
    this.boardSub?.unsubscribe();
  }

  public navigateBack(): void {
    this.location.back();
  }

  private getColumns$(boardID: string): Observable<IColumn[]> {
    return this.columnApiService.getColumns(boardID);
  }

  public createColumn(): void {
    this.openModal();
  }

  private openModal(): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = 'dialog';
    dialogConfig.disableClose = false;

    const dialogRef = this.dialog.open(CreateColumnModalComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      columnData => {
        this.columnApiService.createColumn(this.boardID!, columnData).subscribe(() => {
          this.columns$ = this.getColumns$(this.boardID!);
        });
      },
    );
  }
}
