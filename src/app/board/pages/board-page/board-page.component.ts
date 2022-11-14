import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { IColumn } from '../../models/column.model';
import { IBoard } from '../../../main/models/board.model';
import { ColumnApiService } from '../../services/column-api.service';
import { BoardApiService } from '../../../main/services/board-api.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CreateColumnModalComponent } from '../../components/create-column-modal/create-column-modal.component';


@Component({
  selector: 'app-board-page',
  templateUrl: './board-page.component.html',
  styleUrls: ['./board-page.component.scss'],
})
export class BoardPageComponent implements OnInit, OnDestroy {
  public board!: IBoard;

  public columns$!: Observable<IColumn[]>;

  private routeParamsSub!: Subscription;

  private boardSub!: Subscription;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private boardApiService: BoardApiService,
    private columnApiService: ColumnApiService,
    public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.routeParamsSub = this.route.paramMap.subscribe((params) => {
      const boardID = params.get('id');

      if (!boardID) throw new Error("Board don't have an ID: URL doesn't contain board's ID");

      this.boardSub = this.boardApiService.getBoard(boardID).subscribe(board => {
        this.board = board;
      },
      );

      this.columns$ = this.getColumns$(boardID);
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
        this.columnApiService.createColumn(this.board!.id, columnData).subscribe(() => {
          this.columns$ = this.getColumns$(this.board!.id);
        });
      },
    );
  }
}
